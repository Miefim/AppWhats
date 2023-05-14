import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import userData from "./slices/userDataSlice"
import notification from "./slices/notificationSlice"
import chats from './slices/chatsSlice'
import selectChatSlice from "./slices/selectChatSlice"

export const store = configureStore({

   reducer: {

      userData,
      notification,
      chats,
      selectChatSlice
      
   }
   
})

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()