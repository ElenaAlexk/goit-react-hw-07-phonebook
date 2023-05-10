import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import css from './Contacts.module.css';

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch(); //посилання на функцію відправки action//

  const handleSubmit = event => {
    event.preventDefault();
    const contact = {
      id: nanoid(),
      name: event.target.elements.name.value,
      number: event.target.elements.number.value,
    };

    //перевірка чи існує такий контакт вже//
    const existingContact = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (existingContact) {
      return alert(`${contact.name}: is already in contacts`);
    }

    //викликаємо генератор екшену та передаємо текст завдання для payload//
    dispatch(addContact(contact));
    event.target.reset(); //очищаємо форму//
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.formLabel} htmlFor="">
        Name
        <input
          className={css.formInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          id={nanoid()}
          required
        />
      </label>
      <label className={css.formLabel} htmlFor="">
        Number
        <input
          className={css.formInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          id={nanoid()}
          required
        />
      </label>
      <button className={css.btnSubmit} type="submit">
        Add contact
      </button>
    </form>
  );
};
