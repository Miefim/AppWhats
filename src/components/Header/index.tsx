import { useSelector } from 'react-redux'

import { userDataSelector } from '../../redux/slices/userDataSlice'
import style from './header.module.css'

const Header: React.FC = () => {
   const { authStatus } = useSelector(userDataSelector)
   const isAuth = Boolean(authStatus === 'authorized')

   return(
      <header className={style.header}>
         <div className={style.logo}>
            <img className={style.logo__image} src="/img/appWhats.png" alt="" />
            AppWhats
         </div>
         <div className={style.status}>
            <div className={`${style.status__indicator} ${isAuth && style.indicator__green}`} />
            {isAuth ? 'Авторизован' : 'Не авторизован'}
         </div>
      </header>
   )
}  

export default Header