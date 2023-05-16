import style from './sendTextarea.module.css'

type SendTextareaUIProps = {
   setValue: React.ChangeEventHandler<HTMLTextAreaElement>
   value?: string
   className?: string
   placeholder?: string
   onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
}

const SendTextareaUI: React.FC<SendTextareaUIProps> = ({ setValue, value, className, placeholder, onKeyDown }) => {

   return(
      <textarea 
         onChange={setValue}
         value={value} 
         className={`${style.textarea} ${className}`} 
         placeholder={placeholder} 
         onKeyDown={onKeyDown}
      />
   )
   
}

export default SendTextareaUI