import AvatarUI from '../Avatar'
import style from './chatListItem.module.css'

type ChatItemProps = {
   chatName: string
   id: string
   type: string
   className?: string
   avatar?: string
   onClick?: React.MouseEventHandler<HTMLDivElement> 
   count?: number
}

const ChatItem: React.FC<ChatItemProps> = ({ chatName, id, type, className, avatar, onClick, count }) => {
   return(
      <div 
         className={`${style.chatItem} ${className}`} 
         onClick={onClick} 
         data-id={id} 
         data-type={type} 
         data-name={chatName}
      >
         <AvatarUI avatarUrl={avatar} className={style.chatItem__avatar} />
         <div className={style.chatItem__chatName}>
            {chatName}
         </div>
         {count && count > 0 ? <div className={style.chatItem__count}>{count}</div> : ''}
      </div>
   )
}

export default ChatItem