import { useState } from 'react';
import { FaSistrix } from 'react-icons/fa';
import css from '../../components/styles.module.css';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [imgName, setImgName] = useState('');

  const onInputChange = e => {
    setImgName(e.currentTarget.value.toLowerCase());
  };

  const onFormSubmit = e => {
    e.preventDefault();

    if (imgName.trim() === '') {
      alert('введите хоть что-то');
      return;
    }
    onSubmit(imgName);
    setImgName('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onFormSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <FaSistrix />
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          name="imgName"
          value={imgName}
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
