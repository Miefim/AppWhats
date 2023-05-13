import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { GetUserParams, Error } from "./userDataSlice"

export type INotification = {
   receiptId: number
   body: {
      typeWebhook: string
      instanceData: {
         idInstance: number
         wid: string
         typeInstance: string
      }
      timestamp: number
      stateInstance: string
   }
}

export const getNotification = createAsyncThunk<INotification | null, GetUserParams, {rejectValue: Error}>("notification/getNotification", 
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

interface DeleteNotificationParams extends GetUserParams {
   notificationId: number
}

export const deleteNotification = createAsyncThunk<INotification, DeleteNotificationParams, {rejectValue: Error}>("notification/deleteNotification", 
   async (params, {rejectWithValue}) => {
      try {

         const res = await fetch(`https://api.green-api.com/waInstance${params.id}/deleteNotification/${params.token}/${params.notificationId}`, {
            method: "DELETE"
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

export type NotificationSliceState = {
   notification: INotification | null
}

const initialState: NotificationSliceState = {
   notification: null,
}

export const notification = createSlice({
   name: 'notification',
   initialState,

   reducers: {},

   extraReducers: (builder) => {

      builder.addCase(getNotification.fulfilled, (state, action) => {
         
         if(state.notification !== action.payload){
            state.notification = action.payload 
         }
         
      })

   }
})

export const notificationSelector = (state: RootState) => state.notificationSlice

export default notification.reducer