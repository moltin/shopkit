import React from 'react'
import styled from 'styled-components'

export default function Label({
  htmlFor,
  label,
  children,
  required,
  ...props
}) {
  return (
    <StyledLabel htmlFor={htmlFor} {...props}>
      {children || label} {required && <Required>*</Required>}
    </StyledLabel>
  )
}

const StyledLabel = styled.label`
  display: inline-flex;
  // color: ${props => (props.error ? props.theme.error : props.theme.dark)};
  color: ${props => props.theme.dark};
  cursor: pointer;
  font-weight: 500;
  margin: 0.75rem 0;
`

const Required = styled.span`
  margin-left: 0.25rem;
  color: ${props => props.theme.placeholder};
  font-weight: 400;
`
