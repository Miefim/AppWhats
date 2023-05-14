import { useSelector } from 'react-redux'

import { selectChatSelector } from '../../redux/slices/selectChatSlice'
import AvatarUI from '../../UI/Avatar'
import style from './chatHeader.module.css'

const ChatHeader: React.FC = () => {
   const { selectedChats } = useSelector(selectChatSelector)
   const chatName = selectedChats?.name
   const avatar = ''
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