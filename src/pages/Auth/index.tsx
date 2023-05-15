import AuthBlock from '../../components/AuthBlock'
import PageWrapper from '../../PageWrapper'
import style from './authPage.module.css'

const AuthPage: React.FC = () => {

   return(
      <PageWrapper>
         <div className={style.authPageContainer}>
            <AuthBlock />
         </div>
      </PageWrapper>
   )

}

export default AuthPage