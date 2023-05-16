import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getChats } from '../../redux/slices/chatsSlice'
import { useAppDispatch } from '../../redux/store'
import { userDataSelector } from '../../redux/slices/userDataSlice'
import { selectedChatSliceSelector, sendMessage, getMessages } from '../../redux/slices/selectedChatSlice'

import SendButtonUI from '../../UI/SendButton'
import SendTextareaUI from '../../UI/SendTextarea'
import style from './sendMessageBlock.module.css'

const EnteredTextBlock: React.FC = () => {

   const dispatch = useAppDispatch()
   const { id, token } = useSelector(userDataSelector)
   const { selectedChat } = useSelector(selectedChatSliceSelector)
   const [ message, setMessage ] = useState<string>('')

   const sendButtonHandler = async() => {
      if(id && token && selectedChat){
         await dispatch(sendMessage({id, token, chatId: selectedChat.id, message}))
         setMessage('')
         setTimeout(async() => {
            const isNewChat = !selectedChat.name && !selectedChat.type
            await dispatch(getMessages({id, token, chatId: selectedChat.id}))
            if(isNewChat) await dispatch(getChats({id, token}))
         }, 2000)
      }
   }

   const enterKeyHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if(event.key === 'Enter' && message.trim()) {
         sendButtonHandler()
      }
   }

   return(
      <div className={style.wrapper}>
         <SendTextareaUI 
            value={message} 
            setValue={(e) => setMessage(e.target.value)} 
            placeholder='Введите текст' 
            onKeyDown={enterKeyHandler} 
         />
         {message.trim() && <SendButtonUI onClick={sendButtonHandler} />}
      </div>
   )

}

export default EnteredTextBlock