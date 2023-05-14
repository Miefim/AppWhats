import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../../redux/store'
import { chatSliceSelector, getChats, resetCount } from '../../redux/slices/chatsSlice'
import { setSelectedChat, selectChatSelector } from '../../redux/slices/selectChatSlice'
import { userDataSelector } from '../../redux/slices/userDataSlice' 
import LoaderUI from '../../UI/Loader'
import ChatListItem from '../../UI/ChatListItem'
import style from './chatsList.module.css'

const ChatsList: React.FC = () => {
   const dispatch = useAppDispatch()

   const { chats, isLoading } = useSelector(chatSliceSelector)
   const { id, token } = useSelector(userDataSelector)
   const { selectedChats } = useSelector(selectChatSelector)

   useEffect(() => {
      if(id && token) dispatch(getChats({id, token})) 
   },[])

   const itemClickHandler = (e: React.MouseEvent<HTMLDivElement> ) => {
      const id = e.currentTarget.dataset.id
      const type = e.currentTarget.dataset.type
      const name = e.currentTarget.dataset.name
      if(id && type && name){
         dispatch(setSelectedChat({id, type, name}))
         dispatch(resetCount(id))
      }
   }

   if(isLoading){
      return(
         <div className={style.chatsList}>
            <div className={style.chatsList__loaderContainer}>
               <LoaderUI />
            </div>
         </div>
      )
   }
   return(
      <div className={style.chatsList}>
         {
            chats.map(chat => 
               <ChatListItem 
                  id={chat.id}
                  chatName={chat.name}
                  type={chat.type} 
                  onClick={itemClickHandler} 
                  className={chat.id === selectedChats?.id ? style.chatsListItem__active : ''}
                  key={chat.id}
                  count={chat.count}
               />
            ) 
         }
      </div>
   )
}

export default ChatsList
