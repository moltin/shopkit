import React from 'react'
import { Field } from 'react-final-form'
import classNames from 'classnames'

import Label from './Label'

const CustomSelect = ({ label, input, meta, options }) => {
  const error = meta.error && meta.touched

  return (
    <div className="shopkit-input-group">
      {label && (
        <Label htmlFor={name} error={error}>
          {label}
        </Label>
      )}

      <div className="shopkit-relative shopkit-rounded shopkit-w-full">
        <select
          {...input}
          className={classNames(
            'shopkit-input shopkit-pr-8 shopkit-appearance-none focus:shopkit-outline-none',
            {
              error,
              empty: input.value === ''
            }
          )}
        >
          <option value="">Select</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label || opt.value}
            </option>
          ))}
        </select>
        <div className="shopkit-pointer-events-none shopkit-absolute shopkit-inset-y-0 shopkit-right-0 shopkit-flex shopkit-items-center shopkit-px-2 shopkit-text-light">
          <svg
            className="shopkit-fill-current shopkit-h-4 shopkit-w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {error && <span className="shopkit-error-message">{meta.error}</span>}
    </div>
  )
}

export default function FieldSelect({ name, options, ...rest }) {
  return (
    <Field name={name} component={CustomSelect} options={options} {...rest} />
  )
}
