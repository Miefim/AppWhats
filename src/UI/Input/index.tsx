import style from './input.module.css'

type InputUIProps = {
   onChange: React.ChangeEventHandler<HTMLInputElement>
   value?: string
   placeholder?: string
   className?: string
   maxLength?: number
   type?: string
}

const InputUI: React.FC<InputUIProps> = ({ value, onChange, placeholder, className, maxLength, type = 'text' }) => {
   return(
      <input 
         className={`${style.input} ${className}`} 
         value={value} onChange={onChange} 
         placeholder={placeholder} 
         type={type}
         maxLength={maxLength}
      />
   )
}

export default InputUI