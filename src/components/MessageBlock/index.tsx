import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../../redux/store'
import { selectChatSelector, getMessages } from '../../redux/slices/selectChatSlice'
import { userDataSelector } from '../../redux/slices/userDataSlice'
import LoaderUI from '../../UI/Loader'
import MessageUI from '../../UI/Message'
import style from './messageBlock.module.css'

const MessageBlock: React.FC = () => {
   const dispatch = useAppDispatch()
   const { selectedChats, messages, isLoading } = useSelector(selectChatSelector)
   const { id, token } = useSelector(userDataSelector)
   const endMessageRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      endMessageRef.current?.scrollIntoView()
   })
   
   useEffect(() => {
      if(selectedChats && id && token) dispatch(getMessages({id, token, chatId: selectedChats.id}))  
   },[selectedChats])

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
               [...messages].reverse().map((message, i, arr) => {
                  if(message.typeMessage === 'textMessage' || message.typeMessage === 'extendedTextMessage'){
                     return(
                        <MessageUI type={message.type} key={i} refs={endMessageRef}>
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