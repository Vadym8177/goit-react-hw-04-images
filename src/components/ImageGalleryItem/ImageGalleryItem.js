import { Component } from 'react';
import { Modal } from '../Modal/Modal';
import css from '../../components/styles.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
    largeImageURL: PropTypes.string,
  };
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            src={webformatURL}
            alt={tags}
            className={css.ImageGalleryItemImage}
            onClick={this.toggleModal}
          />
        </li>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal} image={largeImageURL} />
        )}
      </>
    );
  }
}
