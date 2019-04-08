import React from 'react'
import { Field } from 'react-final-form'

export default function Error({ name }) {
  return (
    <Field name={name} subscription={{ touched: true, error: true }}>
      {({ meta: { error }, ...rest }) => {
        console.log({ error })
        console.log({ rest })

        return error ? (
          <span className="shopkit-error-message">{error}</span>
        ) : null
      }}
    </Field>
  )
}
