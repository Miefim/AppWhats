import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import userData from "./slices/userDataSlice"
import notificationSlice from "./slices/notificationSlice"

export const store = configureStore({

   reducer: {

      userData,
      notificationSlice
      
   }
   
})

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()