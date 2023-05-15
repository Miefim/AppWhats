import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import userData from './slices/userDataSlice'
import notification from './slices/notificationSlice'
import chats from './slices/chatsSlice'
import selectedChat from './slices/selectedChatSlice'

export const store = configureStore({

   reducer: {

      userData,
      notification,
      chats,
      selectedChat
      
   }
   
})

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()