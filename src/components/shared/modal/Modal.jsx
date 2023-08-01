import React, { useEffect } from 'react';
import './Modal.css';

function Modal({ titleModal, btnTxt, isOpen, onClose, children }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="modal">
            <h2 className="modal-content">{titleModal}</h2>
            {children}
            <button onClick={onClose} className="btn-close">
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;