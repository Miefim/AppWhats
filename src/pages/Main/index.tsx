import PageWrapper from "../../PageWrapper"
import ChatsList from "../../components/ChatsList"
import ChatBlock from "../../components/ChatBlock"
import style from './mainPage.module.css'

const MainPage: React.FC = () => {
   return(
      <PageWrapper>
         <div className={style.mainPageContainer}>
            <ChatsList />
            <ChatBlock />
         </div>
      </PageWrapper>
   )
}

export default MainPage