import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface IStatus {
   stateInstance: 'authorized' | 'notAuthorized'
}

export interface IAuthParams {
   id: string
   token: string
}

export const getStatus = createAsyncThunk<IStatus, IAuthParams, {rejectValue: IError}>('userData/getStatus', 
   async (params, {rejectWithValue}) => {
      try {

         const res = await fetch(`https://api.green-api.com/waInstance${params.id}/getStateInstance/${params.token}`)

            if(!res.ok){
               return rejectWithValue({
                  status: res.status,
                  message: res.statusText
               })
            }

         const resJson: IStatus = await res.json()
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

export interface ILogoutResponce {
   'isLogout': boolean
}

export const logout = createAsyncThunk<ILogoutResponce, IAuthParams, {rejectValue: IError}>('userData/logout', 
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

export interface IQr {
   type: string
   message: string
}


export const getQr = createAsyncThunk<IQr, IAuthParams, {rejectValue: IError}>('userData/getQr', 
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

export const setSettings = createAsyncThunk<void, IAuthParams>('userData/setSettings', 
   async (params) => {

      const data = {
         'webhookUrl': '',
         'webhookUrlToken': '',
         'delaySendMessagesMilliseconds': 1000,
         'markIncomingMessagesReaded': 'no',
         'markIncomingMessagesReadedOnReply': 'no',
         'outgoingWebhook': 'no',
         'outgoingMessageWebhook': 'no',
         'outgoingAPIMessageWebhook': 'no',
         'incomingWebhook': 'yes',
         'stateWebhook': 'yes',
         'keepOnlineStatus': 'no'
      }

      const res = await fetch(`https://api.green-api.com/waInstance${params.id}/setSettings/${params.token}`, {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(data)
      })

   }
)

export interface IError {
   status: number
   message: string
}

export interface IUserSliceState {
   id: string | null,
   token: string | null,
   authStatus: 'notAuthorized' | 'authorized' | null
   qr: string | null 

   isLoading: boolean
   error: IError | null
}

const initialState: IUserSliceState = {
   id: null,
   token: null,
   authStatus: null,
   qr: null,

   isLoading: false,
   error: null,
}

export const userDataSlice = createSlice({
   name: 'userData',
   initialState,

   reducers: {

      setAuthStatus: (state, action: PayloadAction<'notAuthorized' | 'authorized' | null>) => {
         state.authStatus = action.payload
      },

      resetAuthDataSlice: (state) => {
         state.id = null
         state.token = null
         state.authStatus = null
         state.qr = null
         state.error = null
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

export const { setAuthStatus, resetAuthDataSlice } = userDataSlice.actions

export default userDataSlice.reducer