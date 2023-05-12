import style from './message.module.css'

type MessageUIProps = {
   children: string
   type?: 'incoming'
}

const MessageUI: React.FC<MessageUIProps> = ({ children, type }) => {
   return(
      <div className={`${style.outgoingMessage} ${type && style.incomingMessage}`}>
         <div className={`${style.outgoingMessageArrow} ${type && style.incomingMessageArrow}`} />
         {children}
      </div> 
   )
}

export default MessageUI