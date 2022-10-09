import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Box } from '../Box';
import { Form, Label, Input } from './ContactForm.styled';
import { Button } from '../Button';

export class ContactForm extends Component {
  nameId = nanoid();
  numberID = nanoid();

  state = { name: '', number: '' };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  //   checkChange = e => {
  //     const { name } = e.target;
  //     return !this.state[name] ? false : true;
  //   };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <Box
        display="block"
        p={2}
        mb={4}
        bg="bgComponent"
        width="50%"
        borderRadius="normal"
        boxShadow="basic"
      >
        <Form onSubmit={this.handleSubmit}>
          <Label htmlFor={this.nameId}>Name</Label>
          <Input
            type="text"
            name="name"
            id={this.nameId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChange}
          />
          <Label htmlFor={this.numberID}>Number</Label>
          <Input
            type="tel"
            name="number"
            id={this.numberID}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleChange}
          />
          <Button type="submit" disabled={!this.state.name}>
            Add contact
          </Button>
        </Form>
      </Box>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
