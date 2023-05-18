import { Component } from 'react';
import { Container } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = event.target.elements;
    const { contacts } = this.state;
    const form = event.currentTarget;

    if (contacts.find(item => item.name === name.value)) {
      return alert(`Contact "${name.value}" is already in contacts list`);
    }

    const addContact = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };
    this.setState(prevState => {
      return { contacts: [addContact, ...prevState.contacts] };
    });
    form.reset();
  };

  handleSearch = event => {
    this.setState({ filter: event.target.value.toLowerCase() });
  };

  handleClick = id => {
    const { contacts } = this.state;
    this.setState({ contacts: contacts.filter(item => item.id !== id) });
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit}></ContactForm>
        <h2>Contacts</h2>
        <Filter handelSearch={this.handleSearch}></Filter>
        <ContactList
          contacts={filteredContacts}
          handleClick={this.handleClick}
        ></ContactList>
      </Container>
    );
  }
}

export default App;
