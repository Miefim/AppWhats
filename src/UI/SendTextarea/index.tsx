import style from './sendTextarea.module.css'

type SendTextareaUIProps = {
   setValue: React.ChangeEventHandler<HTMLTextAreaElement>
   value?: string
   placeholder?: string
   className?: string
   onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
}

const SendTextareaUI: React.FC<SendTextareaUIProps> = ({ value, setValue, placeholder, className, onKeyDown }) => {
   return(
      <textarea 
         className={`${style.textarea} ${className}`} 
         onChange={setValue}
         onKeyDown={onKeyDown}
         value={value} 
         placeholder={placeholder} 
      />
   )
}

export default SendTextareaUI