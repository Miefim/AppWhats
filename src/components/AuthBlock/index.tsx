import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../redux/store'
import { userDataSelector, getStatus, getQr, setSettings } from '../../redux/slices/userDataSlice'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import InputUI from '../../UI/Input'
import ButtonUI from '../../UI/Button'
import LoaderUI from '../../UI/Loader'
import style from './authBlock.module.css'

const AuthBlock: React.FC = () => {

   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const { id, token, authStatus, qr, isLoading, error } = useSelector(userDataSelector)
   const [idValue, setIdValue] = useState<string>('1101818648')
   const [tokenValue, setTokenValue] = useState<string>('ab651bd328014604bac32d83e67f712e44c52b2531c04e10b7')
   const [getLocalStorage, setLocalStorage] = useLocalStorage() 

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
                  <div className={style.authForm__err}>{error && 'Неверный token или id'}</div>
                  <InputUI 
                     className={style.authForm__input} 
                     placeholder='idInstance' 
                     onChange={(e) => setIdValue(e.target.value)}
                     value={idValue}
                     maxLength={10}
                  />
                  <InputUI 
                     className={style.authForm__input}
                     placeholder='apiTokenInstance' 
                     onChange={(e) => setTokenValue(e.target.value)}
                     value={tokenValue}
                  />
                  <ButtonUI className={style.authForm__button} onClick={enterButtonHandler}>
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
                  {!isLoading && <img src={`data:image/png;base64,${qr}`} alt="" />}
                  {isLoading && <LoaderUI />}
                  <ButtonUI onClick={getQrButtonHandler}>Получить новый QR-код</ButtonUI>
               </div>
            }
         </div>
      )
   }
}

export default AuthBlock