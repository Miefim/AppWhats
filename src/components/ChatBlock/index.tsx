import { useSelector } from 'react-redux'
import { selectedChatSliceSelector } from '../../redux/slices/selectedChatSlice'

import ChatHeader from '../ChatHeader'
import MessageBlock from '../MessageBlock'
import SendMessageBlock from '../SendMessageBlock'
import style from './chatBlock.module.css'

const ChatBlock: React.FC = () => {
   
   const { selectedChat } = useSelector(selectedChatSliceSelector)

   return(
      <div className={style.messageBlock}>
         {
            !selectedChat 
            ?
               <div className={style.messageBlock__welcomeWindow}>
                  <img 
                     alt='' 
                     width='100px' 
                     src='/img/appwhatswelcome.png' 
                     className={style.welcomeWindow__logo} 
                  />
                  <h1 className={style.welcomeWindow__title}>AppWhats лучший мессенджер на Земле!!!</h1>
                  <a 
                     target='_blank' 
                     href='https://efimovdev.ru/'
                     className={style.welcomeWindow__author} 
                  >
                     Efimovdev
                  </a>
               </div>
            :
               <>
                  <div className={style.messageBlock__header}>
                     <ChatHeader />
                  </div>
                  <div className={style.messageBlock__body}>
                     <MessageBlock />
                  </div>
                  <div className={style.messageBlock__footer}>
                     <SendMessageBlock />
                  </div>
               </>     
         }
      </div>
   )

}

export default ChatBlock