import css from '../../components/styles.module.css';
import PropTypes from 'prop-types';

export function Button({ loadMoreBtn }) {
  return (
    <div className={css.ButtonBox}>
      <button type="button" onClick={loadMoreBtn} className={css.Button}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  loadMoreBtn: PropTypes.func.isRequired,
};
