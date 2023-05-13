import style from './loader.module.css'

type LoaderProps = {
   className?: string
}

const LoaderUI: React.FC<LoaderProps> = ({ className }) => {
   return(
      <img className={`${style.loader} ${className}`} src="img/loader.png" alt="" />
   )
}

export default LoaderUI