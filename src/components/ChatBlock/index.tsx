import { useSelector } from 'react-redux'

import { selectChatSelector } from '../../redux/slices/selectChatSlice'
import ChatHeader from '../ChatHeader'
import SendMessageBlock from '../SendMessageBlock'
import MessageBlock from '../MessageBlock'
import style from './chatBlock.module.css'

const ChatBlock: React.FC = () => {
   const { selectedChats } = useSelector(selectChatSelector)
   return(
      <div className={style.messageBlock}>
         {
            !selectedChats 
            ?
               <div className={style.messageBlock__welcomeWindow}>
                  <img className={style.welcomeWindow__logo} src="/img/appwhatswelcome.png" width='100px' alt="" />
                  <h1 className={style.welcomeWindow__title}>AppWhats лучший мессенджер на Земле!!!</h1>
                  <a className={style.welcomeWindow__author} target='_blank' href="https://efimovdev.ru/">Efimovdev</a>
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