import React from 'react'
import { Field } from 'react-final-form'
import styled from 'styled-components'

import Label from './Label'

export default function Input({
  label,
  name,
  autoFocus,
  type,
  placeholder,
  error: propsError,
  required,
  ...props
}) {
  return (
    <Field name={name} {...props}>
      {({ meta, input, ...rest }) => {
        const error = propsError || (meta.error && meta.touched)

        return (
          <InputGroup>
            {label && (
              <Label htmlFor={name} error={error} required={required}>
                {label}
              </Label>
            )}

            <StyledInput
              type={type}
              id={name}
              autoFocus={autoFocus}
              placeholder={placeholder || label}
              error={error}
              {...input}
              {...rest}
            />

            {!props.hideError && error && (
              <ErrorAlert>{propsError || meta.error}</ErrorAlert>
            )}
          </InputGroup>
        )
      }}
    </Field>
  )
}

const InputGroup = styled.div`
  width: 100%;
`

const StyledInput = styled.input`
  background-color: ${props => props.theme.white};
  border-radius: 0.25rem;
  border: 1px solid
    ${props => (props.error ? props.theme.error : props.theme.border)};
  color: ${props => props.theme.dark};
  display: block;
  font-family: inherit;
  font-size: 100%;
  font-weight: 400;
  padding: 0.75rem 1rem;
  margin: 0;
  overflow: visible;
  outline: none;
  width: 100%;

  &::-webkit-input-placeholder {
    color: ${props => props.theme.placeholder};
  }
  &::-moz-placeholder {
    color: ${props => props.theme.placeholder};
  }
  &:-ms-input-placeholder {
    color: ${props => props.theme.placeholder};
  }
  &:-moz-placeholder {
    color: ${props => props.theme.placeholder};
  }

  &:hover {
    cursor: text;
  }
`

export const ErrorAlert = styled.span`
  color: ${props => props.theme.error};
  display: inline-block;
  padding-top: 0.75rem;
`
