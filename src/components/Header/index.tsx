import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { resetChatSlice } from '../../redux/slices/chatsSlice'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { resetSelectedChatSlice } from '../../redux/slices/selectedChatSlice'
import { resetNotificationSlice } from '../../redux/slices/notificationSlice'
import { userDataSelector, logout } from '../../redux/slices/userDataSlice'

import ButtonUI from '../../UI/Button'
import style from './header.module.css'

const Header: React.FC = () => {

   const dispatch = useAppDispatch()
   const { id, token, authStatus } = useSelector(userDataSelector)
   const [ _, __, deleteLocalstorage ] = useLocalStorage()
   
   const isAuth = Boolean(authStatus === 'authorized')

   const logOutButtonHandler = async() => {
      if(id && token){
         await dispatch(logout({id, token}))
         dispatch(resetSelectedChatSlice())
         dispatch(resetNotificationSlice())
         dispatch(resetChatSlice())
         deleteLocalstorage('APPWHATSAUTH')
      }
   }

   return(
      <header className={style.header}>
         <div className={style.logo}>
            <img className={style.logo__image} src='/img/appWhats.png' alt='' />
            AppWhats
         </div>
         <div className={style.status}>
            <div className={`${style.status__indicator} ${isAuth && style.indicator__green}`} />
            {isAuth ? 'Авторизован' : 'Не авторизован'}
            {isAuth &&
               <ButtonUI className={style.status__logoutButton} onClick={logOutButtonHandler}>
                  <img height='10px' src='/img/logout.png' alt='' />
               </ButtonUI>
            }
         </div>
      </header>
   )
   
}  

export default Header