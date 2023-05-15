import style from './message.module.css'

type MessageUIProps = {
   children: string
   refs: React.LegacyRef<HTMLDivElement>
   type?: 'incoming' | 'outgoing'
}

const MessageUI: React.FC<MessageUIProps> = ({ children, type, refs }) => {

   return(
      <div className={`${style.outgoingMessage} ${type === 'incoming' && style.incomingMessage}`} ref={refs}>
         <div className={`${style.outgoingMessageArrow} ${type === 'incoming' && style.incomingMessageArrow}`} />
         <div className={style.messageText}>{children}</div>
      </div> 
   )
   
}

export default MessageUI