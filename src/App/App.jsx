import React, { Component } from 'react';
import { Box } from '../components/Box';
import { ContactForm } from '../components/ContactForm';
import { Filter } from '../components/Filter';
import { ContactList } from '../components/ContactList';
import { nanoid } from 'nanoid';
import { save, load } from '../utils/storage';

const STORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    //     contacts: [
    //             { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //             { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //             { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //             { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    //     ],
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (load(STORAGE_KEY)) {
      this.setState({ contacts: load(STORAGE_KEY) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      save(STORAGE_KEY, contacts);
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const checkName = this.state.contacts.some(item =>
      item.name.toLowerCase().includes(contact.name.toLowerCase())
    );

    checkName
      ? alert(`${contact.name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));

    //     this.setState(({ contacts }) => ({
    //       contacts: contacts.some(item =>
    //         item.name.toLowerCase().includes(contact.name.toLowerCase())
    //           ? alert(`${contact.name} is already in contacts`)
    //           : [contact, ...contacts]
    //       ),
    //     }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredItems = () => {
    const { contacts, filter } = this.state;
    const normilizedFilter = filter.toLowerCase();
    return contacts.filter(item =>
      item.name.toLowerCase().includes(normilizedFilter)
    );
  };

  deleteItem = itemID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== itemID),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredItem = this.getFilteredItems();

    return (
      <Box width={1} p={4} bg="bgBasic" as="main">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList onDelete={this.deleteItem} list={filteredItem} />
      </Box>
    );
  }
}
