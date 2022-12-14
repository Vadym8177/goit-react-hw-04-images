import { Component } from 'react';
import { FaSistrix } from 'react-icons/fa';
import css from '../../components/styles.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    imgName: '',
  };

  onInputChange = e => {
    this.setState({ imgName: e.currentTarget.value.toLowerCase() });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { imgName } = this.state;

    if (imgName.trim() === '') {
      alert('введите хоть что-то');
      return;
    }
    this.props.onSubmit(imgName);
    this.setState({ imgName: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onFormSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <FaSistrix />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            name="imgName"
            value={this.state.imgName}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}
