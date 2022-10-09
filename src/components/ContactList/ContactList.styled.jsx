import styled from 'styled-components';

export const List = styled.ul``;

export const Item = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => `${props.theme.space[0]}px`};
  align-items: center;
  &:not(:last-child) {
    margin-bottom: ${props => `${props.theme.space[1]}px`};
  }
`;

export const Name = styled.p`
  margin-right: ${props => `${props.theme.space[1]}px`};
`;

export const Number = styled.p``;
