import React from 'react'
import { Field } from 'react-final-form'
import classNames from 'classnames'

import Label from './Label'

export default function Input({
  label,
  name,
  autoFocus,
  type,
  placeholder,
  ...props
}) {
  return (
    <Field name={name} {...props}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched

        const inputClass = classNames('shopkit-input', {
          'shopkit-border-warning': error
        })

        return (
          <div className="shopkit-input-group">
            {label && (
              <Label htmlFor={name} error={error}>
                {label}
              </Label>
            )}

            <input
              type={type}
              id={name}
              autoFocus={autoFocus}
              placeholder={placeholder || label}
              className={inputClass}
              {...input}
            />

            {!props.hideError && error && (
              <span className="shopkit-error-message">{meta.error}</span>
            )}
          </div>
        )
      }}
    </Field>
  )
}
