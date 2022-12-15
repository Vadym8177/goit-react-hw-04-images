import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import css from '../../components/styles.module.css';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ webformatURL, tags, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItemImage}
          onClick={toggleModal}
        />
      </li>
      {showModal && <Modal onClose={toggleModal} image={largeImageURL} />}
    </>
  );
}

ImageGalleryItem.ropTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};
