import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IChatFullInfo } from './chatsSlice'
import { GetUserParams, Error } from './userDataSlice'

export interface IMessage {
   type: 'outgoing' | 'incoming'
   idMessage: string
   timestamp: number
   typeMessage: string
   chatId: string
   textMessage: string
   statusMessage: string
   sendByApi: boolean
}

export interface IGetMessageParams extends GetUserParams {
   chatId: string,
}

export const getMessages = createAsyncThunk<IMessage[], IGetMessageParams, {rejectValue: Error}>('selectedChat/getMessages', 
   async(params, {rejectWithValue}) => {

      try {

         const res = await fetch(`https://api.green-api.com/waInstance${params.id}/getChatHistory/${params.token}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               'chatId': `${params.chatId}`,
               'count': 500
            })
         })
         const json = await res.json()
         return json

      } catch (error) {

         return rejectWithValue({
            status: 500,
            message: 'Ошибка сервера'
         })

      }

   }
)

export interface ISendMessageResponse {
   idMessage: string
}

export interface ISendMessageParams extends IGetMessageParams {
   message: string
}

export const sendMessage = createAsyncThunk<ISendMessageResponse, ISendMessageParams, {rejectValue: Error}>('selectedChat/sendMessage', 
   async(params, {rejectWithValue}) => {

      try {

         const res = await fetch(`https://api.green-api.com/waInstance${params.id}/sendMessage/${params.token}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               'chatId': params.chatId,
               'message': params.message
            })
         })
         const json = await res.json()
         return json

      } catch (error) {

         return rejectWithValue({
            status: 500,
            message: 'Ошибка сервера'
         })

      }

   }
)

export interface ISelectedChatSliceState {
   selectedChat: IChatFullInfo | null
   messages: IMessage[]

   isLoading: boolean
   error: Error | null
}

const initialState: ISelectedChatSliceState = {
   selectedChat: null,
   messages: [],

   isLoading: false,
   error: null
}

export const selectedChatSlice = createSlice({
   name: 'selectedChat',
   initialState,

   reducers: {

      resetSelectedChatSlice: (state) => {
         state.selectedChat = null
         state.messages = []
         state.error = null
      },

      setSelectedChat: (state, action: PayloadAction<IChatFullInfo>) => {
         state.selectedChat = action.payload
      }

   },

   extraReducers: (builder) => {

      builder.addCase(getMessages.pending, (state) => {
         state.isLoading = true
         state.error = null
      })
      builder.addCase(getMessages.fulfilled, (state, action) => {
         state.isLoading = false
         state.messages = action.payload  
      })
      builder.addCase(getMessages.rejected, (state, action) => {
         state.isLoading = false
         if(action.payload) state.error = action.payload
      })

      builder.addCase(sendMessage.pending, (state) => {
         state.isLoading = true
         state.error = null
      })
      builder.addCase(sendMessage.fulfilled, (state) => {
         state.isLoading = false 
      })
      builder.addCase(sendMessage.rejected, (state, action) => {
         state.isLoading = false
         if(action.payload) state.error = action.payload
      })

   }
})

export const selectedChatSliceSelector = (state: RootState) => state.selectedChat

export const { setSelectedChat, resetSelectedChatSlice } = selectedChatSlice.actions 

export default selectedChatSlice.reducer