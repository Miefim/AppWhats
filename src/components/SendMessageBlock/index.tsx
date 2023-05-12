import { useState } from 'react'

import SendButtonUI from '../../UI/SendButton'
import SendTextareaUI from '../../UI/SendTextarea'
import style from './sendMessageBlock.module.css'

const EnteredTextBlock: React.FC = () => {
   const [message, setMessage] = useState<string>('')
   const sendButtonHandler = () => {}
   return(
      <div className={style.wrapper}>
         <SendTextareaUI value={message} setValue={(e) => setMessage(e.target.value)} placeholder='Введите текст' />
         {message && <SendButtonUI onClick={sendButtonHandler} />}
      </div>
   )
}

export default EnteredTextBlock