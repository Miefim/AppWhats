import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/store'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { 
   getQr, 
   getStatus, 
   setSettings, 
   userDataSelector, 
   resetAuthDataSlice 
} from '../../redux/slices/userDataSlice'
import InputUI from '../../UI/Input'
import ButtonUI from '../../UI/Button'
import LoaderUI from '../../UI/Loader'
import style from './authBlock.module.css'

const AuthBlock: React.FC = () => {

   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const { id, token, authStatus, qr, isLoading, error } = useSelector(userDataSelector)
   const [ idValue, setIdValue ] = useState<string>('')
   const [ tokenValue, setTokenValue ] = useState<string>('')
   const [ getLocalStorage, setLocalStorage, deleteLocalstorage ] = useLocalStorage() 

   const authData = getLocalStorage('APPWHATSAUTH')
   
   useEffect(() => {

      if(authData){
         dispatch(getStatus({id: authData.id, token: authData.token}))
      }

   },[])
   
   useEffect(() => {

      if(id && token){
         setLocalStorage('APPWHATSAUTH', {
            id, 
            token,
         })
         dispatch(setSettings({id, token}))
      }
      if(authStatus === 'authorized'){
         navigate('/main')
      }
      else if(id && token && authStatus === 'notAuthorized'){
         dispatch(getQr({id, token}))
      }
      
   },[authStatus])
   
   const enterButtonHandler = () => {  
      dispatch(getStatus({id: idValue, token: tokenValue}))
   }

   const getQrButtonHandler = () => {
      if(id && token){
         dispatch(getQr({id, token}))
      }
   }

   const otherInstansClickHandler = () => {
      dispatch(resetAuthDataSlice())
      deleteLocalstorage('APPWHATSAUTH')
   }
      
   if(isLoading){
      return (
         <div className={style.authBlock}>
            <LoaderUI />
         </div>
      )  
   }
   else{
      return(
         <div className={style.authBlock}>
            {!id &&
               <div className={style.authForm}>
                  <h3 className={style.authForm__title}>Введите данные своего инстанса</h3>
                  <div className={style.authForm__helper}>
                     Данные можно получить, зарегистрировавшись на ресурсе <br />
                     <a className={style.helper__link} target='_blanc' href='https://green-api.com/index.html'>GREEN API</a>
                  </div>
                  <div className={style.authForm__err}>{error && 'Неверный token или id'}</div>
                  <InputUI 
                     onChange={(e) => setIdValue(e.target.value)}
                     value={idValue}
                     className={style.authForm__input} 
                     placeholder='idInstance' 
                     maxLength={10}
                  />
                  <InputUI 
                     onChange={(e) => setTokenValue(e.target.value)}
                     value={tokenValue}
                     className={style.authForm__input}
                     placeholder='apiTokenInstance' 
                  />
                  <ButtonUI className={style.authForm__enterButton} onClick={enterButtonHandler}>
                     {isLoading ? <LoaderUI className={style.authForm__loader} /> : 'Ввод'}
                  </ButtonUI>
               </div>
            }
            {(id && authStatus === 'notAuthorized') &&
               <div className={style.authForm}>
                  <h3 className={style.authForm__title}>Авторизуйтесь через свое приложение WhatsApp</h3>
                  <p className={style.authForm__helper}>
                     Для этого зайдите в настройки приложения, нажмите на изображение с QR-кодом и нажмите сканировать
                  </p>
                  {!isLoading && <img src={`data:image/png;base64,${qr}`} alt='' />}
                  {isLoading && <LoaderUI />}
                  <ButtonUI className={style.authForm__qrButton} onClick={getQrButtonHandler}>Получить новый QR-код</ButtonUI>
                  <ButtonUI onClick={otherInstansClickHandler}>Ввести другие данные инстанса</ButtonUI>
               </div>
            }
         </div>
      )
   }
   
}

export default AuthBlock