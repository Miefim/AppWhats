import style from './button.module.css'

type ButtonUIProps = {
   children: JSX.Element | string
   onClick: React.MouseEventHandler<HTMLButtonElement>
   className?: string
}

const ButtonUI: React.FC<ButtonUIProps> = ({ onClick, children, className }) => {

   return(
      <button className={`${style.button} ${className}`} onClick={onClick}>
         {children}
      </button>
   )
   
}

export default ButtonUI