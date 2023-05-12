import AvatarUI from '../Avatar'
import style from './chatListItem.module.css'

type ChatItemProps = {
   chatName: string
   className?: string
   avatar?: string
}

const ChatItem: React.FC<ChatItemProps> = ({ className, chatName, avatar }) => {
   return(
      <div className={`${style.chatItem} ${className}`}>
         <AvatarUI avatarUrl={avatar} className={style.chatItem__avatar} />
         <div className={style.chatItem__chatName}>
            {chatName}
         </div>
      </div>
   )
}

export default ChatItem