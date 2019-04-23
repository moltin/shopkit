import React from 'react'
import styled from 'styled-components'

import { RouteHeader } from './Modal/Header'
import { Heading } from './typography'
import Checkbox from './Checkbox'
import AddressFields from './AddressFields'
import Input from './Input'
import { PrimaryButton } from './Button'
import PaymentForm from './PaymentForm'
import AddressPreview from './AddressPreview'

const Wrapper = styled.div`
  margin-top: 0.5rem;
  border-top: 1px solid ${props => props.theme.divider};
  padding: 0.75rem 0 1.5rem;
`

function BillingForm({
  form,
  billingIsShipping,
  billing_address,
  shipping_address,
  createCustomer,
  submitting,
  invalid,
  loading,
  goToShipping,
  stripe,
  onStripeChange,
  total
}) {
  const payButtonText = loading ? 'Processing' : `Pay ${total}`

  return (
    <div>
      <RouteHeader>
        <Heading>Billing information</Heading>
      </RouteHeader>

      <div>
        <Checkbox name="billingIsShipping" label="Same as shipping address" />

        {!billingIsShipping && (
          <AddressFields
            isEditing={billing_address}
            type="billing"
            form={form}
          />
        )}
      </div>

      <Wrapper>
        <Input type="email" name="customer.email" label="Email" autoFocus />

        <PaymentForm values={stripe} onChange={onStripeChange} form={form} />
      </Wrapper>

      <Wrapper>
        <Checkbox
          name="createCustomer"
          label="Save this information for next time"
        />

        {createCustomer && (
          <Input type="password" name="customer.password" label="Password" />
        )}
      </Wrapper>

      <div>
        <PrimaryButton
          block
          disabled={submitting || invalid || loading}
          type="submit"
        >
          {payButtonText}
        </PrimaryButton>
      </div>

      <AddressPreview
        type="Shipping"
        handleClick={goToShipping}
        address={shipping_address}
      />
    </div>
  )
}

export default BillingForm
