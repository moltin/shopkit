import styled, { css } from 'styled-components'

const Button = styled.button.attrs({
  className: 'moltin-shopkit shopkit-button'
})`
  appearance: none;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  color: ${props => props.theme.placeholder};
  font-family: inherit;
  font-weight: 500;
  font-size: 100%;
  padding: ${props => (props.noPadding ? 0 : '0.75rem 1rem')};
  outline: none;

  &:hover,
  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  &:hover {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }

  ${({ block }) =>
    block &&
    css`
      width: 100%;
    `};

  ${({ large, theme }) =>
    large &&
    css`
      padding: 1rem;
    `};
`

export const PrimaryButton = styled(Button).attrs({
  className: 'shopkit-primary-button'
})`
  background-color: ${props => props.theme.primary};
  border-color: ${props => props.theme.white};
  color: ${props => props.theme.white};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`

export const TextButton = styled(Button)`
  color: ${props => props.theme.dark};
  font-weight: 500;
  font-size: ${props => props.theme.textSmall} !important;
  text-decoration: underline;
  padding: 0;

  &:hover {
    color: ${props => props.theme.primary};
  }
`

export default Button
