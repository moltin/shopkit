import React from 'react'
import { Field } from 'react-final-form'
import styled from 'styled-components'

import Label from './Label'
import { ErrorAlert } from './Input'

const SelectGroup = styled.div`
  width: 100%;
`

const SelectWrapper = styled.div`
  background-color: ${props => props.theme.white};
  border: 1px solid
    ${props => (props.error ? props.theme.error : props.theme.border)};
  border-radius: 0.25rem;
  position: relative;
`

const StyledSelect = styled.select`
  appearance: none;
  background-color: ${props => props.theme.white};
  border: 0;
  color: ${props => props.theme.dark};
  display: block;
  font-family: inherit;
  font-size: 100%;
  font-weight: 400;
  padding: 0.75rem 1.5rem 0.75rem 1rem;
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
    cursor: pointer;
  }

  &:focus,
  &:active {
    outline: none;
  }
`

const Icon = styled.div`
  align-items: center;
  background-color: ${props => props.theme.white};
  bottom: 0;
  border-left: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.placeholder};
  display: flex;
  padding: 0 0.75rem;
  position: absolute;
  pointer-events: none;
  right: 0;
  top: 0;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`

const SVG = styled.svg`
  fill: currentColor;
  height: 12px;
`

const CustomSelect = ({ label, input, meta, options, required }) => {
  const error = meta.error && meta.touched

  return (
    <SelectGroup>
      {label && (
        <Label htmlFor={name} error={error} required={required}>
          {label}
        </Label>
      )}

      <SelectWrapper error={error}>
        <StyledSelect {...input}>
          <option value="">Select</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label || opt.value}
            </option>
          ))}
        </StyledSelect>

        <Icon>
          <SVG
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 8 12"
          >
            <defs>
              <path
                id="mask-a"
                d="M6.04038059,8.04038059 C6.29422138,7.7865398 6.70577862,7.7865398 6.95961941,8.04038059 C7.2134602,8.29422138 7.2134602,8.70577862 6.95961941,8.95961941 L4.45961941,11.4596194 C4.20577862,11.7134602 3.79422138,11.7134602 3.54038059,11.4596194 L1.04038059,8.95961941 C0.786539803,8.70577862 0.786539803,8.29422138 1.04038059,8.04038059 C1.29422138,7.7865398 1.70577862,7.7865398 1.95961941,8.04038059 L4,10.0807612 L6.04038059,8.04038059 Z M4,1.91923882 L1.95961941,3.95961941 C1.70577862,4.2134602 1.29422138,4.2134602 1.04038059,3.95961941 C0.786539803,3.70577862 0.786539803,3.29422138 1.04038059,3.04038059 L3.54038059,0.540380592 C3.79422138,0.286539803 4.20577862,0.286539803 4.45961941,0.540380592 L6.95961941,3.04038059 C7.2134602,3.29422138 7.2134602,3.70577862 6.95961941,3.95961941 C6.70577862,4.2134602 6.29422138,4.2134602 6.04038059,3.95961941 L4,1.91923882 Z"
              />
            </defs>
            <use xlinkHref="#mask-a" />
          </SVG>
        </Icon>
      </SelectWrapper>

      {error && <ErrorAlert>{meta.error}</ErrorAlert>}
    </SelectGroup>
  )
}

export default function FieldSelect({ name, options, ...rest }) {
  return (
    <Field name={name} component={CustomSelect} options={options} {...rest} />
  )
}
