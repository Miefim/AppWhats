import style from './input.module.css'

type InputUIProps = {
   onChange: React.ChangeEventHandler<HTMLInputElement>
   value?: string
   placeholder?: string
   className?: string
}

const InputUI: React.FC<InputUIProps> = ({ value, onChange, placeholder, className }) => {
   return(
      <input 
         className={`${style.input} ${className}`} 
         value={value} onChange={onChange} 
         placeholder={placeholder} 
         type="text" 
      />
   )
}

export default InputUI