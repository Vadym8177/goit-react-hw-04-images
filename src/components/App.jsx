import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import css from '../components/styles.module.css';

export function App() {
  const [imgName, setImgName] = useState('');
  const [page, setPage] = useState(1);
  const [img, setImg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!imgName) return;
    setIsLoading(true);

    fetch(`https://pixabay.com/api/?q=${imgName}&page=${page}&key=29444023-fe7d4e5e60b2e765be0bef471&image_type=photo&orientation=horizontal&per_page=12
`)
      .then(r => {
        if (r.ok) {
          return r.json();
        }
        return Promise.reject(new Error('Oops error'));
      })
      .then(data => {
        setImg(img => [
          ...img,
          ...data.hits.map(img => {
            const { largeImageURL, webformatURL, tags, id } = img;
            return {
              largeImageURL: largeImageURL,
              webformatURL: webformatURL,
              tags: tags,
              id: id,
            };
          }),
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [imgName, page]);

  const handleFormSubmit = imgName => {
    setImgName(imgName);
    setPage(1);
    setImg([]);
  };

  const nextPage = () => {
    setPage(prev => prev + 1);
  };
  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {img.length !== 0 && <ImageGallery images={img} />}
      {isLoading && <Loader />}
      {img.length > 11 && <Button loadMoreBtn={nextPage} />}
    </div>
  );
}
