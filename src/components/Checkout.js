import React, { useState } from 'react'
import { useStore, useActions } from 'easy-peasy'
import { Form } from 'react-final-form'
import { CardElement, injectStripe } from 'react-stripe-elements'
import styled from 'styled-components'

import { shippingValidation, billingValidation } from '../validation/checkout'
import { RouteHeader } from './Modal/Header'
import { Heading } from './typography'
import AddressFields from './AddressFields'
import Label from './Label'
import Input, { ErrorAlert } from './Input'
import Checkbox from './Checkbox'
import { PrimaryButton } from './Button'
import OrderConfirmation from './OrderConfirmation'

const Wrapper = styled.div`
  margin-top: 0.5rem;
  border-top: 1px solid ${props => props.theme.divider};
  padding: 0.75rem 0 1.5rem;
`

const StripeInput = styled.div`
  .StripeElement {
    background-color: ${props => props.theme.white};
    border: 1px solid ${props => props.theme.border};
    border-radius: 0.25rem;
    padding: 0.75rem 1rem;
  }
`

function Checkout({ stripe }) {
  const [initialValues, setInitialValues] = useState({
    billingIsShipping: true
  })
  const [checkedOut, setCheckedOut] = useState(false)
  const [order, setOrder] = useState(null)
  const { route } = useStore(({ modal }) => modal)
  const { id: cartId, subTotal } = useStore(({ cart }) => cart)
  const { createOrder, payForOrder, setDirty } = useActions(
    ({ checkout }) => checkout
  )
  const { goToBilling } = useActions(({ modal }) => modal)
  const { deleteCart } = useActions(({ cart }) => cart)

  function validate(values) {
    if (route === 'shipping') {
      return shippingValidation(values)
    } else {
      return billingValidation(values)
    }
  }

  async function onSubmit(values) {
    if (route === 'shipping') {
      setInitialValues(values)
      goToBilling()
      return
    }

    let order
    let orderError
    let token

    const { shipping_address } = values

    try {
      order = await createOrder(values)
      console.log({ order })
      setOrder(order)
    } catch (error) {
      orderError = error
      console.log({ orderError })
    }

    try {
      token = await stripe.createToken({
        name: `${shipping_address.first_name} ${shipping_address.last_name}`,
        address_line1: shipping_address.line_1,
        address_line2: shipping_address.line_2,
        address_city: shipping_address.city,
        address_state: shipping_address.county,
        address_zip: shipping_address.postcode,
        address_country: shipping_address.country
      })
    } catch (tokenError) {
      console.log('Failed to create token', tokenError)
    }

    try {
      const payment = await payForOrder({
        orderId: order.id,
        token: token.token.id
      })

      setCheckedOut(true)
      deleteCart(cartId)
    } catch (paymentError) {
      console.log({ paymentError })
    }
  }

  return checkedOut ? (
    <OrderConfirmation order={order} />
  ) : (
    <Form onSubmit={onSubmit} initialValues={initialValues} validate={validate}>
      {({ handleSubmit, submitting, invalid, values, form, pristine }) => {
        if (
          !values.createCustomer &&
          values.customer &&
          values.customer.password
        ) {
          delete values.customer.password
        }

        if (values.billingIsShipping) {
          delete values.billing_address
        }

        const onStripeChange = e => form.change('stripe', e)

        setDirty(!pristine)

        return (
          <form onSubmit={handleSubmit}>
            {route === 'shipping' ? (
              <div>
                <RouteHeader>
                  <Heading>Shipping information</Heading>
                </RouteHeader>

                <div>
                  <AddressFields
                    isEditing={values.shipping_address}
                    type="shipping"
                    form={form}
                  />
                </div>

                <div className="shopkit-mt-6">
                  <PrimaryButton
                    block
                    disabled={submitting || invalid}
                    type="submit"
                  >
                    Continue to billing information
                  </PrimaryButton>
                </div>
              </div>
            ) : (
              <div>
                <RouteHeader>
                  <Heading>Billing information</Heading>
                </RouteHeader>

                <div>
                  <Checkbox
                    name="billingIsShipping"
                    label="Same as shipping address"
                  />

                  {!values.billingIsShipping && (
                    <AddressFields
                      isEditing={values.billing_address}
                      type="billing"
                      form={form}
                    />
                  )}
                </div>

                <Wrapper>
                  <Input
                    type="email"
                    name="customer.email"
                    label="Email"
                    autoFocus
                  />

                  <StripeInput>
                    <Label htmlFor="payment">Payment card</Label>
                    <CardElement
                      onChange={onStripeChange}
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
                    {values.stripe && values.stripe.error && (
                      <ErrorAlert>{values.stripe.error.message}</ErrorAlert>
                    )}
                  </StripeInput>
                </Wrapper>

                <Wrapper>
                  <Checkbox
                    name="createCustomer"
                    label="Save this information for next time"
                  />

                  {values.createCustomer && (
                    <Input
                      type="password"
                      name="customer.password"
                      label="Password"
                    />
                  )}
                </Wrapper>

                <div>
                  <PrimaryButton
                    block
                    disabled={submitting || invalid}
                    type="submit"
                  >
                    Pay {subTotal}
                  </PrimaryButton>
                </div>
              </div>
            )}
          </form>
        )
      }}
    </Form>
  )
}

export default injectStripe(Checkout)
