import React from 'react'
import styled from 'styled-components'
import { CardElement } from 'react-stripe-elements'

import Label from './Label'
import { ErrorAlert } from './Input'

const StripeInput = styled.div`
  .StripeElement {
    background-color: ${props => props.theme.white};
    border: 1px solid ${props => props.theme.border};
    border-radius: 0.25rem;
    padding: 0.75rem 1rem;
  }
`

function PaymentForm({ form, error }) {
  const onChange = e => form.change('stripe', e)

  return (
    <StripeInput>
      <Label htmlFor="payment">Payment card</Label>
      <CardElement
        onChange={onChange}
        hidePostalCode={true}
        id="payment"
        style={{
          base: {
            color: '#273142',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: '15px',
            '::placeholder': {
              color: '#58697F'
            }
          },
          invalid: {
            color: '#E62F17',
            ':focus': {
              color: '#E62F17'
            }
          }
        }}
      />
      {error && <ErrorAlert>{error.message}</ErrorAlert>}
    </StripeInput>
  )
}

export default PaymentForm
