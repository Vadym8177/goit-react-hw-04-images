import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from '../../components/styles.module.css';
import PropTypes from 'prop-types';

const modal = document.querySelector('#modal');
export class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }
  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.onBackDropClick}>
        <div>
          <img src={image} alt="#" className={css.Modal} />
        </div>
      </div>,
      modal
    );
  }
}
