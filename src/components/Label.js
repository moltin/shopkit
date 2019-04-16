import React from 'react'
import styled from 'styled-components'

export default function Label({ htmlFor, label, children, ...props }) {
  return (
    <StyledLabel htmlFor={htmlFor} {...props}>
      {children || label}
    </StyledLabel>
  )
}

const StyledLabel = styled.label`
  display: inline-flex;
  color: ${props => (props.error ? props.theme.error : props.theme.dark)};
  font-weight: 500;
  margin: 0.75rem 0;
`
