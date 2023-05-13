import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"

import { useAppDispatch } from './redux/store'
import { userDataSelector, setAuthStatus } from './redux/slices/userDataSlice'
import { getNotification, notificationSelector, deleteNotification } from './redux/slices/notificationSlice'
import MainPage from "./pages/Main"
import AuthPage from "./pages/Auth"

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<AuthPage />} />
    <Route path="/main" element={<MainPage />} />
  </>
))

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { id, token, authStatus } = useSelector(userDataSelector)
  const { notification } = useSelector(notificationSelector)

  useEffect(() => {
    setInterval(() => {
      if(id && token){
        dispatch(getNotification({id, token}))
      }
    }, 10000)
  },[id])

  useEffect(() => {
    if(notification && id && token){
      if(notification.body.typeWebhook === 'stateInstanceChanged'){
        if(notification.body.stateInstance === 'notAuthorized'){
          authStatus !== 'notAuthorized' && dispatch(setAuthStatus('notAuthorized'))
          dispatch(deleteNotification({id, token, notificationId: notification.receiptId})) 
        }
        else if(notification.body.stateInstance === 'authorized'){
          authStatus !== 'authorized' && dispatch(setAuthStatus('authorized'))
          dispatch(deleteNotification({id, token, notificationId: notification.receiptId})) 
        }
      }
    }
  },[notification])

  return (

    <RouterProvider router={router}/>
 
  )
}

export default App
