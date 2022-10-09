import styled from 'styled-components';

export const Form = styled.form``;

export const Label = styled.label`
  display: block;
  width: 100%;
  padding: ${props => `${props.theme.space[1]}px`};
`;

export const Input = styled.input`
  width: 75%;
  padding: ${props => `${props.theme.space[1]}px`};
  &:not(:last-child) {
    margin-bottom: ${props => `${props.theme.space[2]}px`};
  }
`;
