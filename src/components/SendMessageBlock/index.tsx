import { useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../../redux/store'
import { selectChatSelector, sendMessage, getMessages } from '../../redux/slices/selectChatSlice'
import { userDataSelector } from '../../redux/slices/userDataSlice'
import SendButtonUI from '../../UI/SendButton'
import SendTextareaUI from '../../UI/SendTextarea'
import style from './sendMessageBlock.module.css'

const EnteredTextBlock: React.FC = () => {
   const dispatch = useAppDispatch()
   const [message, setMessage] = useState<string>('')
   const { selectedChats } = useSelector(selectChatSelector)
   const { id, token } = useSelector(userDataSelector)

   const sendButtonHandler = async() => {
      if(id && token && selectedChats){
         await dispatch(sendMessage({id, token, chatId: selectedChats.id, message}))
         setTimeout(() => {
            dispatch(getMessages({id, token, chatId: selectedChats.id}))
         }, 2000)
         setMessage('')
      }
   }

   const enterKeyHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if(event.key === 'Enter' && message.trim()) {
         sendButtonHandler()
      }
   }

   return(
      <div className={style.wrapper}>
         <SendTextareaUI value={message} setValue={(e) => setMessage(e.target.value)} placeholder='Введите текст' onKeyDown={enterKeyHandler} />
         {message.trim() && <SendButtonUI onClick={sendButtonHandler} />}
      </div>
   )
}

export default EnteredTextBlock