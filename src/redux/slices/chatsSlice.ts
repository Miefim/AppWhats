import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from "../store"
import { GetUserParams, Error } from './userDataSlice'

export interface IGetChatsResponse {
   id: string
   name: string
   type: string
   count?: number
}

export const getChats = createAsyncThunk<IGetChatsResponse[], GetUserParams, {rejectValue: Error}>("chats/getChats", 
   async(params, {rejectWithValue}) => {

      try {

         const res = await fetch(`https://api.green-api.com/waInstance${params.id}/getContacts/${params.token}`)
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

interface ChatsSlice {
   chats: IGetChatsResponse[]

   isLoading: boolean
   error: Error | null
}

const initialState: ChatsSlice = {
   chats: [],

   isLoading: false,
   error: null
}

export const chatsSlice = createSlice({
   name: 'chats',
   initialState,

   reducers: {

      incrementCount: (state, action: PayloadAction<string>) => {
         const chat = state.chats.find(chat => chat.id === action.payload)
         if(chat){
            chat.count ? chat.count = chat.count + 1 : chat.count = 1
         }
      },

      resetCount: (state, action: PayloadAction<string>) => {
         const chat = state.chats.find(chat => chat.id === action.payload)
         if(chat){
            chat.count = 0
         }
      }

   },

   extraReducers: (builder) => {

      builder.addCase(getChats.pending, (state, action) => { 
         state.isLoading = true 
         state.error = null
      })
      builder.addCase(getChats.fulfilled, (state, action) => {
         state.isLoading = false
         state.chats = action.payload 
      })
      builder.addCase(getChats.rejected, (state, action) => { 
         state.isLoading = false
         if(action.payload) state.error = action.payload 
      })

   }
})

export const chatSliceSelector = (state: RootState) => state.chats

export const { incrementCount, resetCount } = chatsSlice.actions

export default chatsSlice.reducer