import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { List, Item, Name, Number } from './ContactList.styled';
import { Button } from '../Button';

export const ContactList = ({ list, onDelete }) => {
  return (
    <Box
      display="block"
      p={2}
      bg="bgComponent"
      width="50%"
      borderRadius="normal"
      boxShadow="basic"
    >
      <List>
        {list.map(item => (
          <Item key={item.id}>
            <Name>{item.name + ':'}</Name>
            <Number>{item.number}</Number>
            <Button
              type="button"
              onClick={() => {
                onDelete(item.id);
              }}
            >
              Delete
            </Button>
          </Item>
        ))}
      </List>
    </Box>
  );
};

ContactList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
