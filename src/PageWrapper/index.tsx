import Header from "../components/Header"
import style from './pageWrapper.module.css'

type PageWrapperProps = {
   children: JSX.Element
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
   return(
      <div className={style.pageWrapper}>
         <Header /> 
         {children}
      </div>
   )
}

export default PageWrapper