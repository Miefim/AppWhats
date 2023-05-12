import style from './header.module.css'

const Header: React.FC = () => {
   return(
      <header className={style.header}>
         <div className={style.logo}>
            <img className={style.logo__image} src="/img/appWhats.png" alt="" />
            AppWhats
         </div>
         <div className={style.status}>
            <div className={style.status__circle} />
            Авторизован
         </div>
      </header>
   )
}  

export default Header