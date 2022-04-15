import './Modal.component.css'

const Modal = ({children, title, opened, onClose}) => {
    return <div className={`modal fade ${opened ? 'show' : ''}`} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
          <button type="button" className="btn btn-mutted close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  </div>
}

export default Modal