import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFilteredContacts, getIsLoading, getError } from 'redux/selectors';
import PropTypes from 'prop-types';
import css from './Contacts.module.css';
import { fetchContacts, deleteContact } from 'redux/operations';

export const ContactList = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {filteredContacts.map(({ id, name, phone }) => (
          <li className={css.contactItem} key={id}>
            <p>
              {name}: {phone}
            </p>
            <button
              className={css.button}
              type="button"
              onClick={() => onDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
};
