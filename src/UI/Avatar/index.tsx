import style from './avatar.module.css'

type AvatarProps = {
   avatarUrl?: string
   className?: string
}

const AvatarUI: React.FC<AvatarProps> = ({ avatarUrl, className }) => {
   return(
      <div className={`${style.avatar} ${className}`}>
         {avatarUrl && <img className={style.avatar__image} src={avatarUrl} alt="" />}
         {!avatarUrl && <img className={style.avatar__stockImage} src="/img/avaIcon.png" alt="" />}
      </div> 
   )
}

export default AvatarUI