import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ImCross } from 'react-icons/im';
import s from './ModalTestConfirm.module.css';

export default function ModalTestConfirm({
  titleTest,
  onClickYes,
  onClickNo,
  onCloseModal,
}) {
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
        <p className={s.title}>
          Would you like to continue the{' '}
          <span className={s.accentTitle}>{titleTest}</span> test?
        </p>
        <div className={s.buttonsWrap}>
          <button
            className={s.buttonYes}
            onClick={() => onClickYes()}
            type="button"
          >
            Yes, continue
          </button>
          <button
            className={s.buttonNo}
            onClick={() => onClickNo()}
            type="button"
          >
            No, start again
          </button>
        </div>
      </div>
    </div>,
    document.querySelector('#modalRoot')
  );
}
