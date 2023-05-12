import style from './sendTextarea.module.css'

type SendTextareaUIProps = {
   setValue: React.ChangeEventHandler<HTMLTextAreaElement>
   value?: string
   placeholder?: string
   className?: string
}

const SendTextareaUI: React.FC<SendTextareaUIProps> = ({ value, setValue, placeholder, className }) => {
   return(
      <textarea 
         className={`${style.textarea} ${className}`} 
         onChange={setValue} 
         value={value} 
         placeholder={placeholder} 
      />
   )
}

export default SendTextareaUI