import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from '../../components/styles.module.css';
import PropTypes from 'prop-types';

const modal = document.querySelector('#modal');
export function Modal({ image, onClose }) {
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [onClose]);

  const onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={onBackDropClick}>
      <div>
        <img src={image} alt="#" className={css.Modal} />
      </div>
    </div>,
    modal
  );
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
