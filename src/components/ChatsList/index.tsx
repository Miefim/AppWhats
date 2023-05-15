import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/store'
import { userDataSelector } from '../../redux/slices/userDataSlice'
import { setSelectedChat, selectedChatSliceSelector } from '../../redux/slices/selectedChatSlice'
import { 
   chatsSliceSelector,
   resetCount, 
   getChats, 
   getContacts, 
   setChatsFullInfo,
   IChatFullInfo 
} from '../../redux/slices/chatsSlice'

import ModalUI from '../../UI/Modal'
import InputUI from '../../UI/Input'
import LoaderUI from '../../UI/Loader'
import ButtonUI from '../../UI/Button'
import AddNewChat from '../AddNewChat'
import ChatListItem from '../../UI/ChatListItem'
import style from './chatsList.module.css'

const ChatsList: React.FC = () => {

   const dispatch = useAppDispatch()
   const { id, token } = useSelector(userDataSelector)
   const { selectedChat } = useSelector(selectedChatSliceSelector)
   const { chats, contacts, chatsFullInfo, isLoading } = useSelector(chatsSliceSelector)
   const [ searchValue, setSearchValue ] = useState<string>('')
   const [ modalVisible, setModalVisible ] = useState<boolean>(false)
   
   const foundChats = chatsFullInfo.filter(chat => chat?.name?.toLowerCase().includes(searchValue.toLowerCase()) || chat.id.includes(searchValue))
   const isFoundChat = Boolean(searchValue && !foundChats.length)
   const renderArr = searchValue ? foundChats : chatsFullInfo
   
   useEffect(() => {

      setModalVisible(false)
      
   },[selectedChat])

   useEffect(() => {

      if(id && token){
         dispatch(getChats({id, token}))
         dispatch(getContacts({id, token}))
      }

   },[])

   useEffect(() => {

      const chatsFullInfo: IChatFullInfo[] = []
      chats.forEach(chat => {
         const findContacts = contacts.find(contact => contact.id === chat.id)
         if(findContacts){
            chatsFullInfo.push({
               id: chat.id,
               name: findContacts.name,
               type: findContacts.type
            })
         }
         else{
            chatsFullInfo.push({id: chat.id}) 
         }
      })
      dispatch(setChatsFullInfo(chatsFullInfo))
      const foundFullInfoForSelectedChat = chatsFullInfo.find(chat => chat.id === selectedChat?.id)
      if(foundFullInfoForSelectedChat) dispatch(setSelectedChat(foundFullInfoForSelectedChat))

   }, [chats, contacts])

   const itemClickHandler = (e: React.MouseEvent<HTMLDivElement> ) => {
      const id = e.currentTarget.dataset.id
      const type = e.currentTarget.dataset.type
      const name = e.currentTarget.dataset.name
      if(id){
         dispatch(setSelectedChat({id, type, name}))
         dispatch(resetCount(id))
      }
   }

   if(isLoading){
      return(
         <div className={style.chatsList}>
            <div className={style.chatsList__flexContainer}>
               <LoaderUI />
            </div>
         </div>
      )
   }
   return(
      <div className={style.chatsList}>
         <div className={style.chatsList__headerList}>
            <InputUI 
               onChange={e => setSearchValue(e.target.value)} 
               value={searchValue}
               className={style.headerList__searchInput} 
               placeholder='Поиск чата' 
            />
            <ButtonUI className={style.headerList__addChatButton} onClick={() => setModalVisible(true)}>
               <img height='20px' src='/img/new-message.png' alt='' />
            </ButtonUI>
            {searchValue &&
               <ButtonUI className={style.headerList__clearInput} onClick={() => setSearchValue('')}>
                  <img height='10px' src='/img/close.png' alt='' />
               </ButtonUI>
            }
         </div>
         <div className={style.chatsList__list}>
            {isFoundChat && <div className={style.chatsList__flexContainer}>Ничего не найдено</div>}
            {!chatsFullInfo.length && <div className={style.chatsList__flexContainer}>Нет чатов</div> }
            {
               renderArr.map(chat => 
                  <ChatListItem 
                     id={chat.id}
                     chatName={chat.name}
                     type={chat.type} 
                     onClick={itemClickHandler} 
                     className={chat.id === selectedChat?.id ? style.chatsListItem__active : ''}
                     key={chat.id}
                     count={chat.count}
                  />
               ) 
            }
         </div>
         <ModalUI visible={modalVisible} setVisible={() => setModalVisible(false)}>
            <AddNewChat />
         </ModalUI>
      </div>
   )

}

export default ChatsList