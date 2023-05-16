import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IAuthParams, IError } from './userDataSlice'

export interface IChat {
   id: string
   archive: boolean
   notSpam: boolean
   ephemeralExpiration: number
   ephemeralSettingTimestamp: number
}

export const getChats = createAsyncThunk<IChat[], IAuthParams, {rejectValue: IError}>('chats/getChats', 
   async(params, {rejectWithValue}) => {

      try {

         const res = await fetch(`https://api.green-api.com/waInstance${params.id}/getChats/${params.token}`)
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

export interface IContact {
   id: string
   name: string
   type: string
}

export const getContacts = createAsyncThunk<IContact[], IAuthParams, {rejectValue: IError}>('chats/getContacts', 
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

export interface IChatFullInfo {
   id: string
   name?: string
   type?: string
   count?: number
}

export interface IChatsSliceState {
   chats: IChat[]
   contacts: IContact[]
   chatsFullInfo: IChatFullInfo[]
   
   isLoading: boolean
   error: IError | null
}

const initialState: IChatsSliceState = {
   chats: [],
   contacts: [],
   chatsFullInfo: [],

   isLoading: false,
   error: null
}

export const chatsSlice = createSlice({
   name: 'chats',
   initialState,

   reducers: {

      setChatsFullInfo: (state, action: PayloadAction<IChatFullInfo[]>) => {
         state.chatsFullInfo = action.payload
      },

      incrementCount: (state, action: PayloadAction<string>) => {
         const chat = state.chatsFullInfo.find(chat => chat.id === action.payload)
         if(chat){
            chat.count ? chat.count = chat.count + 1 : chat.count = 1
         }
      },
      
      resetCount: (state, action: PayloadAction<string>) => {
         const chat = state.chatsFullInfo.find(chat => chat.id === action.payload)
         if(chat){
            chat.count = 0
         }
      },

      resetChatSlice: (state) => {
         state.chats = []
         state.contacts = []
         state.chatsFullInfo = []
         state.error = null
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
 
      builder.addCase(getContacts.pending, (state, action) => { 
         state.isLoading = true 
         state.error = null
      })
      builder.addCase(getContacts.fulfilled, (state, action) => {
         state.isLoading = false
         state.contacts = action.payload 
      })
      builder.addCase(getContacts.rejected, (state, action) => { 
         state.isLoading = false
         if(action.payload) state.error = action.payload 
      })

   }
})

export const chatsSliceSelector = (state: RootState) => state.chats

export const { setChatsFullInfo, incrementCount, resetCount, resetChatSlice } = chatsSlice.actions

export default chatsSlice.reducer