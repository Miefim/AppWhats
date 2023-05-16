import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { setSelectedChat } from '../../redux/slices/selectedChatSlice'
import { numberValidator } from '../../helpers/numberValidator'
import { chatsSliceSelector } from '../../redux/slices/chatsSlice'

import InputUI from '../../UI/Input'
import ButtonUI from '../../UI/Button'
import style from './addNewChat.module.css'

const AddNewChat: React.FC = () => {

   const dispatch = useAppDispatch()
   const { chatsFullInfo } = useSelector(chatsSliceSelector)
   const [ number, setNumber ] = useState<string>('')
   const [ validErr, setValidErr ] = useState<string>('')

   const addNewChatHandler = () => {
      setValidErr('')
      const isValid = numberValidator(number)
      
      if(typeof isValid === 'string'){
         setValidErr(isValid)
      }
      else {
         const fontsChats = chatsFullInfo.find(chat => chat.id.includes(number))
         if(fontsChats){
            dispatch(setSelectedChat(fontsChats))
            setNumber('')
         }
         else {
            dispatch(setSelectedChat({id: `${number}@c.us`}))
            setNumber('')
         }
      }
   }

   return(
      <div className={style.newChat}>
         <h3 className={style.newChat__title}>Добавление нового чата</h3>
         <InputUI className={style.newChat__input} value={number} onChange={e => setNumber(e.target.value)} placeholder='79000000000' type='number' />
         <ButtonUI onClick={addNewChatHandler}>Добавить</ButtonUI>
         {validErr && <div className={style.newChat__error}>{validErr}</div>}
      </div>
   )
   
}

export default AddNewChat