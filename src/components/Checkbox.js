import React from 'react'
import { Field } from 'react-final-form'
import styled from 'styled-components'

import Label from './Label'

const CheckWrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: relative;
  margin: 0 0.5rem 0 0;
`

const StyledCheckbox = styled.input.attrs({
  type: 'checkbox',
  className: 'shopkit-primary'
})`
  appearance: none;
  background-color: ${props => props.theme.primary};
  border-radius: 0.25rem;
  border: 0;
  outline: none;
  padding: 0.25rem;
  font-size: ${props => props.theme.textBase};
  cursor: pointer;
  width: 18px;
  height: 18px;
  margin: 0;
`

const CheckmarkBox = styled.span`
  display: flex;
  position: absolute;
  color: ${props => props.theme.white};
  align-items: center;
  justify-content: center;
`

const Checkmark = styled.svg`
  fill: currentColor;
  height: 12px;
`

export default function Checkbox({ label, name, checked, ...props }) {
  return (
    <Field type="checkbox" name={name} {...props}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched
        const checked = input.value

        return (
          <Label htmlFor={name} error={error}>
            <CheckWrapper>
              <StyledCheckbox id={name} name={name} {...input} />
              {checked && (
                <CheckmarkBox>
                  <Checkmark
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                  >
                    <defs>
                      <path
                        id="checkmark-a"
                        d="M3.73843172,9.39326445 L1.24436482,6.84988183 C0.918545061,6.51761957 0.918545061,5.98056138 1.24436482,5.64829912 C1.57018458,5.31603686 2.0968293,5.31603686 2.42264906,5.64829912 L4.33340277,7.59683459 L9.57735094,2.2491967 C9.9031707,1.91693443 10.4298154,1.91693443 10.7556352,2.2491967 C11.0814549,2.58145896 11.0814549,3.11851714 10.7556352,3.4507794 L4.92837383,9.39326445 C4.60615176,9.72185789 4.07856154,9.72702291 3.7499681,9.40480083 C3.74608509,9.40099311 3.74223944,9.39714747 3.73843172,9.39326445 Z"
                      />
                    </defs>
                    <use
                      fillRule="evenodd"
                      transform="translate(-1 -2)"
                      xlinkHref="#checkmark-a"
                    />
                  </Checkmark>
                </CheckmarkBox>
              )}
            </CheckWrapper>
            {label}
          </Label>
        )
      }}
    </Field>
  )
}
