import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useAppDispatch } from '../../redux/store'
import { userDataSelector } from '../../redux/slices/userDataSlice'
import { selectedChatSliceSelector, getMessages } from '../../redux/slices/selectedChatSlice'

import LoaderUI from '../../UI/Loader'
import MessageUI from '../../UI/Message'
import style from './messageBlock.module.css'

const MessageBlock: React.FC = () => {

   const dispatch = useAppDispatch()
   const { id, token } = useSelector(userDataSelector)
   const { selectedChat, messages, isLoading } = useSelector(selectedChatSliceSelector)
   const endMessageRef = useRef<HTMLDivElement>(null)

   useEffect(() => {

      endMessageRef.current?.scrollIntoView()

   })
   
   useEffect(() => {

      if(selectedChat && id && token) dispatch(getMessages({id, token, chatId: selectedChat.id}))

   },[selectedChat])

   if(isLoading){
      return(
         <div className={style.messageBlock}>
            <div className={style.messageBlock__loaderWrapper}>
               <LoaderUI />
            </div>
         </div>
      )
   }
   else{
      return(
         <div className={style.messageBlock}>
            {Array.isArray(messages) &&
               [...messages].reverse().map((message, i) => {
                  if(message.typeMessage === 'textMessage' || message.typeMessage === 'extendedTextMessage'){
                     return(
                        <MessageUI type={message.type} refs={endMessageRef} key={i}>
                           {message.textMessage}
                        </MessageUI>
                     )
                  }
               })    
            }
         </div>
      )
   }
   
}

export default MessageBlock