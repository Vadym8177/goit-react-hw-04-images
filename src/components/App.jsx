import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import PropTypes from 'prop-types';

import css from '../components/styles.module.css';

export class App extends Component {
  static propTypes = {
    state: PropTypes.shape({
      imgName: PropTypes.string.isRequired,
      page: PropTypes.number.isRequired,
      img: PropTypes.array.isRequired,
      isLoading: PropTypes.bool.isRequired,
    }),
  };

  state = {
    imgName: '',
    page: 1,
    img: [],
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imgName, page } = this.state;
    if (prevState.imgName !== imgName || prevState.page !== page) {
      this.setState({ isLoading: true });
      fetch(`https://pixabay.com/api/?q=${imgName}&page=${page}&key=29444023-fe7d4e5e60b2e765be0bef471&image_type=photo&orientation=horizontal&per_page=12
`)
        .then(r => {
          if (r.ok) {
            return r.json();
          }
          return Promise.reject(new Error('Oops error'));
        })
        .then(data => {
          this.setState(prevState => ({
            img: [
              ...prevState.img,
              ...data.hits.map(img => {
                const { largeImageURL, webformatURL, tags, id } = img;
                return {
                  largeImageURL: largeImageURL,
                  webformatURL: webformatURL,
                  tags: tags,
                  id: id,
                };
              }),
            ],
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleFormSubmit = imgName => {
    this.setState({ imgName, page: 1, img: [] });
  };

  nextPage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  render() {
    const { img, isLoading } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {img.length !== 0 && <ImageGallery images={img} />}
        {isLoading && <Loader />}
        {img.length > 11 && <Button loadMoreBtn={this.nextPage} />}
      </div>
    );
  }
}
