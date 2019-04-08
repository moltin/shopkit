import React from 'react'
import { Field } from 'react-final-form'
import classNames from 'classnames'

export default function Checkbox({ label, name, checked, ...props }) {
  return (
    <Field type="checkbox" name={name} {...props}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched
        const checked = input.value

        const labelClass = classNames(
          'shopkit-my-4 shopkit-inline-flex shopkit-text-default shopkit-cursor-pointer',
          {
            'shopkit-text-warning': error
          }
        )

        const checkboxClass = classNames(
          'shopkit-appearance-none shopkit-border-none shopkit-outline-none shopkit-p-2 shopkit-relative shopkit-bg-primary shopkit-cursor-pointer shopkit-rounded shopkit-text-base',
          {
            // 'shopkit-bg-red shopkit-text-white': error
          }
        )

        return (
          <label htmlFor={name} error={error} className={labelClass}>
            <div className="shopkit-flex shopkit-items-center shopkit-justify-center shopkit-mr-3 shopkit-relative shopkit-text-base">
              <input
                type="checkbox"
                id={name}
                name={name}
                className={checkboxClass}
                {...input}
              />
              {checked && (
                <span className="shopkit-absolute shopkit-text-white shopkit-flex shopkit-items-center shopkit-justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 10 7"
                    className="shopkit-w-3 shopkit-h-4 shopkit-stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1L3.5 6 1 3.727"
                    />
                  </svg>
                </span>
              )}
            </div>
            {label}
          </label>
        )
      }}
    </Field>
  )
}
