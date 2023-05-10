import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getContacts, getFilter } from 'redux/selectors';
import PropTypes from 'prop-types';
import css from './Contacts.module.css';
import { fetchContacts, deleteContact } from 'redux/operations';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  //const isLoading = useSelector(getIsLoading);
  //const error = useSelector(getError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  //фільтруємо контакти//
  const filteredContacts = contacts?.filter(contact =>
    contact?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={css.list}>
      {filteredContacts.map(({ id, name, phone }) => (
        <li className={css.contactItem} key={id}>
          <span className={css.spanName}>{name}: </span>
          <span className={css.spanNumber}>{phone}</span>
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
