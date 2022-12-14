import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../../components/styles.module.css';
import PropTypes from 'prop-types';

export function ImageGallery({ images }) {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, ...props }) => (
        <ImageGalleryItem key={id} {...props} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })),
};
