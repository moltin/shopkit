import React from 'react'
import styled, { css } from 'styled-components'

const SVG = styled.svg`
  display: inline;
  margin-right: 0.25rem;
`

const Spinner = () => (
  <SVG
    version="1.1"
    id="loader-1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="16px"
    height="16px"
    viewBox="0 0 50 50"
  >
    <path
      fill="currentColor"
      d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </path>
  </SVG>
)

const StyledButton = styled.button.attrs({
  className: 'moltin-shopkit shopkit-button'
})`
  box-sizing: border-box;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif;
  font-size: 15px;
  appearance: none;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  color: ${props => props.theme.placeholder};
  font-weight: 500;
  padding: ${props => (props.noPadding ? 0 : '0.75rem 1rem')};
  outline: none;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
  }

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

  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: 1.5rem;
    `};

  ${({ large }) =>
    large &&
    css`
      padding: 1rem;
    `};
`

function Button({ loading, children, ...rest }) {
  return (
    <StyledButton {...rest}>
      {loading && <Spinner />}
      {children}
    </StyledButton>
  )
}

export const PrimaryButton = styled(Button).attrs({
  className: 'shopkit-primary-button shopkit-primary'
})`
  background-color: ${props => props.theme.primary};
  border-color: ${props => props.theme.white};
  color: ${props => props.theme.white};
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
