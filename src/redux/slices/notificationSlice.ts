import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IAuthParams, IError } from './userDataSlice'

export interface INotification {
   receiptId: number
   body: {
      typeWebhook: string
      instanceData: {
         idInstance: number
         wid: string
         typeInstance: string
      }
      senderData: {
         chatId: string
      }
      timestamp: number
      stateInstance: string
   }
}

export const getNotification = createAsyncThunk<INotification | null, IAuthParams, {rejectValue: IError}>('notification/getNotification', 
   async (params, {rejectWithValue}) => {
      try {

         const res = await fetch(`https://api.green-api.com/waInstance${params.id}/receiveNotification/${params.token}`)
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

export interface IDeleteNotificationParams extends IAuthParams {
   notificationId: number
}

export const deleteNotification = createAsyncThunk<INotification, IDeleteNotificationParams, {rejectValue: IError}>('notification/deleteNotification', 
   async (params, {rejectWithValue}) => {
      try {

         const res = await fetch(`https://api.green-api.com/waInstance${params.id}/deleteNotification/${params.token}/${params.notificationId}`, {
            method: 'DELETE'
         })

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

export interface INotificationSliceState {
   notification: INotification | null
}

const initialState: INotificationSliceState = {
   notification: null,
}

export const notificationSlice = createSlice({
   name: 'notification',
   initialState,

   reducers: {

      resetNotificationSlice: (state) => {
         state.notification = null
      }

   },

   extraReducers: (builder) => {

      builder.addCase(getNotification.fulfilled, (state, action) => {  
         if(state.notification !== action.payload){
            state.notification = action.payload 
         } 
      })

   }
})

export const notificationSliceSelector = (state: RootState) => state.notification

export const { resetNotificationSlice } = notificationSlice.actions 

export default notificationSlice.reducer