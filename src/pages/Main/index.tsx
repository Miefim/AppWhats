import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { userDataSelector } from '../../redux/slices/userDataSlice'
import PageWrapper from "../../PageWrapper"
import ChatsList from "../../components/ChatsList"
import ChatBlock from "../../components/ChatBlock"
import style from './mainPage.module.css'

const MainPage: React.FC = () => {
   const navigate = useNavigate()
   const { authStatus } = useSelector(userDataSelector)

   useEffect(() => {
      if(authStatus === 'notAuthorized' || !authStatus){
         navigate('/')
      }
   },[authStatus]) 

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