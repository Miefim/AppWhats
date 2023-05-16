import { useSelector } from 'react-redux'
import { selectedChatSliceSelector } from '../../redux/slices/selectedChatSlice'

import AvatarUI from '../../UI/Avatar'
import style from './chatHeader.module.css'

const ChatHeader: React.FC = () => {

   const { selectedChat } = useSelector(selectedChatSliceSelector)
   const chatName = selectedChat?.name ?  selectedChat?.name : selectedChat?.id
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