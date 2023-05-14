import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"

export type GetStatusResponse = {
   stateInstance: 'authorized' | 'notAuthorized'
}

export type GetUserParams = {
   id: string
   token: string
}

export const getStatus = createAsyncThunk<GetStatusResponse, GetUserParams, {rejectValue: Error}>("userData/getStatus", 
   async (params, {rejectWithValue}) => {
      try {

         const res = await fetch(`https://api.green-api.com/waInstance${params.id}/getStateInstance/${params.token}`)

            if(!res.ok){
               return rejectWithValue({
                  status: res.status,
                  message: res.statusText
               })
            }

         const resJson: GetStatusResponse = await res.json()
         return resJson

      } 
      catch (error) { 

         return rejectWithValue({
            status: 500,
            message: 'Ошибка сервера'
         })
         
      }
   }
)

export interface LogoutResponce {
   "isLogout": boolean
}

export const logout = createAsyncThunk<LogoutResponce, GetUserParams, {rejectValue: Error}>("userData/logout", 
   async (params, {rejectWithValue}) => {
      try {

         const res = await fetch(`https://api.green-api.com/waInstance${params.id}/logout/${params.token}`)
         const resJson = await res.json()
         return resJson

      } 
      catch (error) { 

         return rejectWithValue({
            status: 500,
            message: 'Ошибка сервера'
         })
         
      }
   }
)

export type GetQrResponse = {
   type: string
   message: string
}


export const getQr = createAsyncThunk<GetQrResponse, GetUserParams, {rejectValue: Error}>("userData/getQr", 
   async (params, {rejectWithValue}) => {
      try {

         const res = await fetch(`https://api.green-api.com/waInstance${params.id}/qr/${params.token}`)

         const resJson = await res.json()
         return resJson

      } 
      catch (error) { 

         return rejectWithValue({
            status: 500,
            message: 'Ошибка сервера'
         })
         
      }
   }
)

export const setSettings = createAsyncThunk<void, GetUserParams>("userData/setSettings", 
   async (params) => {

      const data = {
         "webhookUrl": "",
         "webhookUrlToken": "",
         "delaySendMessagesMilliseconds": 1000,
         "markIncomingMessagesReaded": "no",
         "markIncomingMessagesReadedOnReply": "no",
         "outgoingWebhook": "no",
         "outgoingMessageWebhook": "no",
         "outgoingAPIMessageWebhook": "no",
         "incomingWebhook": "yes",
         "stateWebhook": "yes",
         "keepOnlineStatus": "no"
      }

      const res = await fetch(`https://api.green-api.com/waInstance${params.id}/setSettings/${params.token}`, {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(data)
      })

   }
)

export type Error = {
   status: number
   message: string
}

export type UserSliceState = {
   id: string | null,
   token: string | null,
   authStatus: 'notAuthorized' | 'authorized' | null
   qr: string | null 

   isLoading: boolean
   error: Error | null
}

const initialState: UserSliceState = {
   id: null,
   token: null,
   authStatus: null,
   qr: null,

   isLoading: false,
   error: null,
}

export const userData = createSlice({
   name: 'userData',
   initialState,

   reducers: {

      setAuthStatus: (state, action: PayloadAction<'notAuthorized' | 'authorized' | null>) => {
         state.authStatus = action.payload
      },

      resetAuthData: (state) => {
         state.id = null
         state.token = null
         state.authStatus = null
         state.qr = null
      }

   },

   extraReducers: (builder) => {

      builder.addCase(getStatus.pending, (state) => {
         state.isLoading = true
         state.error = null
      })
      builder.addCase(getStatus.fulfilled, (state, action) => {
         state.isLoading = false
         state.authStatus = action.payload.stateInstance
         state.id = action.meta.arg.id
         state.token = action.meta.arg.token
      })
      builder.addCase(getStatus.rejected, (state, action) => {
         state.isLoading = false
         if(action.payload) state.error = action.payload
      })

      builder.addCase(getQr.pending, (state) => {
         state.isLoading = true
         state.error = null
      })
      builder.addCase(getQr.fulfilled, (state, action) => {
         state.isLoading = false
         state.qr = action.payload.message
      })
      builder.addCase(getQr.rejected, (state, action) => {
         state.isLoading = false
         if(action.payload) state.error = action.payload
      })

      builder.addCase(logout.pending, (state) => {
         state.isLoading = true
         state.error = null
      })
      builder.addCase(logout.fulfilled, (state) => {
         state.isLoading = false
         state.id = null
         state.token = null
         state.authStatus = null
         state.qr = null
      })
      builder.addCase(logout.rejected, (state, action) => {
         state.isLoading = false
         if(action.payload) state.error = action.payload
      })

   }
})

export const userDataSelector = (state: RootState) => state.userData

export const { setAuthStatus, resetAuthData } = userData.actions

export default userData.reducer