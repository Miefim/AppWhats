import ChatListItem from '../../UI/ChatListItem'
import style from './chatsList.module.css'

const ChatsList: React.FC = () => {
   return(
      <div className={style.chatsList}>
         <ChatListItem chatName='+79210096938'/>
         <ChatListItem chatName='+79210096938' avatar='/img/avaicon.png'/>
         <ChatListItem chatName='+79210096938'/>
         <ChatListItem chatName='+79210096938'/>
         <ChatListItem chatName='+79210096938'/>
         <ChatListItem chatName='+79210096938'/>
         <ChatListItem chatName='+79210096938'/>
         <ChatListItem chatName='+79210096938'/>
         <ChatListItem chatName='+79210096938'/>
         <ChatListItem chatName='+79210096938'/>
         <ChatListItem chatName='+79210096938'/>
         <ChatListItem chatName='+79210096938'/>
      </div>
   )
}

export default ChatsList
