import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';
import css from './Contacts.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <div>
      <label className={css.formLabel}>
        Find contacts by name
        <input
          className={css.formInput}
          type="text"
          value={filter}
          onChange={event => dispatch(setFilter(event.target.value.trim()))}
        />
      </label>
    </div>
  );
};
