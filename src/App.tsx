import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { useAppDispatch } from './redux/store'
import { incrementCount } from './redux/slices/chatsSlice'
import { userDataSelector, setAuthStatus } from './redux/slices/userDataSlice'
import { getMessages, selectedChatSliceSelector } from './redux/slices/selectedChatSlice'
import { getNotification, notificationSliceSelector, deleteNotification } from './redux/slices/notificationSlice'

import MainPage from './pages/Main'
import AuthPage from './pages/Auth'

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<AuthPage />} />
    <Route path='/main' element={<MainPage />} />
  </>
))

const App: React.FC = () => {
  
  const dispatch = useAppDispatch()
  const { notification } = useSelector(notificationSliceSelector)
  const { selectedChat } = useSelector(selectedChatSliceSelector)
  const { id, token, authStatus } = useSelector(userDataSelector)

  useEffect(() => {

    setInterval(() => {
      if(id && token){
        dispatch(getNotification({id, token}))
      }
    }, 10000)

  },[id])

  useEffect(() => {

    processingIncomingNotification()

  },[notification])

  const processingIncomingNotification = () => {
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
      else if(notification.body.typeWebhook === 'incomingMessageReceived'){
        if(notification.body.senderData.chatId === selectedChat?.id){
          dispatch(getMessages({id, token, chatId: selectedChat?.id}))
          dispatch(deleteNotification({id, token, notificationId: notification.receiptId}))
        }
        else {
          dispatch(incrementCount(notification.body.senderData.chatId))
          dispatch(deleteNotification({id, token, notificationId: notification.receiptId}))
        }
      }
      else{
        dispatch(deleteNotification({id, token, notificationId: notification.receiptId}))
      }
    }
  }

  return (

    <RouterProvider router={router}/>
 
  )

}

export default App
