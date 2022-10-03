import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ImCross } from 'react-icons/im';
import s from '../ModalTestConfirm/ModalTestConfirm.module.css';

export default function ModalDelete({ onClickYes, onClickNo, onCloseModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button className={s.btnClose} type="button" onClick={onCloseModal}>
          <ImCross className={s.btnCloseIcon} />
        </button>
        <p className={s.title}>Are you sure you want to delete the test?</p>

        <div className={s.buttonsWrap}>
          <button
            className={s.buttonYes}
            onClick={() => onClickYes()}
            type="button"
            style={{ padding: '10px' }}
          >
            Yes
          </button>
          <img
            src="https://i.postimg.cc/kMYCLKYY/simons-cat-no-bad.png"
            border="0"
            alt="simons-cat-no-bad"
            width="50px"
            height="50px"
          />
          <button
            className={s.buttonNo}
            onClick={() => onClickNo()}
            type="button"
            style={{ padding: '10px' }}
          >
            No
          </button>
        </div>
      </div>
    </div>,
    document.querySelector('#modalRoot')
  );
}
