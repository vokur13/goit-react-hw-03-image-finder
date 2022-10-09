import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Box } from '../Box';
import { Label, Input } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  const filterID = nanoid();

  return (
    <Box
      display="block"
      p={2}
      mb={3}
      bg="bgComponent"
      width="50%"
      borderRadius="normal"
      boxShadow="basic"
    >
      <Label htmlFor={filterID}>Find contacts by name</Label>
      <Input id={filterID} type="text" value={value} onChange={onChange} />
    </Box>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
