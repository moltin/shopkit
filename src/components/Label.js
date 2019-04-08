import React from 'react'
import classNames from 'classnames'

export default function Label({ htmlFor, error, label, children, noMargin }) {
  const labelClass = classNames(
    'shopkit-inline-block shopkit-text-default shopkit-font-medium',
    {
      'shopkit-text-warning': error,
      'shopkit-mb-2': !noMargin
    }
  )

  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {children || label}
    </label>
  )
}
