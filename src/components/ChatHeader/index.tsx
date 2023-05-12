import AvatarUI from '../../UI/Avatar'
import style from './chatHeader.module.css'

const ChatHeader: React.FC = () => {
   const avatar = ''
   const chatName = 79210096938
   return(
      <div className={style.chatHeader}>
         <AvatarUI avatarUrl={avatar} className={style.chatHeader__avatar} />
         <div className={style.chatHeader__chatName}>
            {chatName}
         </div>
      </div>
   )
}

export default ChatHeader