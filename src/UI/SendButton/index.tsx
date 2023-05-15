import style from './sendButton.module.css'

type SendButtonUIProps = {
   onClick: React.MouseEventHandler<HTMLButtonElement>
   className?: string
}

const SendButtonUI: React.FC<SendButtonUIProps> = ({ onClick, className }) => {

   return(
      <button className={`${style.sendButton} ${className}`} onClick={onClick}>
         <img src='/img/send.png' height='20px' alt='' />
      </button>
   )
   
}

export default SendButtonUI