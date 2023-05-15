import style from './input.module.css'

type InputUIProps = {
   onChange: React.ChangeEventHandler<HTMLInputElement>
   value?: string
   className?: string
   placeholder?: string
   maxLength?: number
   type?: string
}

const InputUI: React.FC<InputUIProps> = ({ onChange, value, className, placeholder, maxLength, type = 'text' }) => {

   return(
      <input 
         onChange={onChange} 
         value={value} 
         className={`${style.input} ${className}`} 
         placeholder={placeholder} 
         maxLength={maxLength}
         type={type}
      />
   )
   
}

export default InputUI