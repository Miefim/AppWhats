import style from './modal.module.css'

type ModalUIProps = {
   visible: boolean
   setVisible: React.MouseEventHandler<HTMLDivElement> 
   children?: JSX.Element
}

const ModalUI: React.FC<ModalUIProps> = ({ visible, children, setVisible }) => {

   return(
      <div className={`${style.modal} ${visible && style.modal__visible}`} onClick={setVisible}>
         <div className={style.modal__content} onClick={e => e.stopPropagation()}>{children}</div>
      </div>
   )

}

export default ModalUI