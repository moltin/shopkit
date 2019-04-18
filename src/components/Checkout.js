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
import AddressPreview from './AddressPreview'
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

function PaymentForm({ onChange, values }) {
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
      {values && values.error && (
        <ErrorAlert>{values.error.message}</ErrorAlert>
      )}
    </StripeInput>
  )
}

function Checkout({ stripe }) {
  const [order, setOrder] = useState(null)
  const [initialValues, setInitialValues] = useState({
    ...order,
    billingIsShipping: true
  })
  const [paid, setPaid] = useState(false)
  const { route } = useStore(({ modal }) => modal)
  const { id: cartId, subTotal } = useStore(({ cart }) => cart)
  const { createOrder, payForOrder, setDirty } = useActions(
    ({ checkout }) => checkout
  )
  const { goToBilling, goToShipping } = useActions(({ modal }) => modal)
  const { deleteCart } = useActions(({ cart }) => cart)
  const [paymentError, setPaymentError] = useState(null)
  const [loading, setLoading] = useState(false)

  function validate(values) {
    if (route === 'shipping') {
      return shippingValidation(values)
    } else {
      return billingValidation(values)
    }
  }

  async function handlePayment(orderId, token) {
    await setPaymentError(null)

    try {
      setLoading(true)

      await payForOrder({
        orderId,
        token: token.token.id
      })

      setPaid(true)
      deleteCart(cartId)
    } catch (paymentError) {
      console.log({ paymentError })
      setPaymentError(paymentError)
    }

    setLoading(false)
  }

  async function onSubmit(values) {
    if (route === 'shipping') {
      setInitialValues(values)
      goToBilling()
      return
    }

    let newOrder
    let orderError
    let token

    if (!order) {
      try {
        newOrder = await createOrder(values)
        await setOrder(newOrder)
      } catch (error) {
        orderError = error
        console.log({ orderError })
      }
    }

    try {
      const { shipping_address } = newOrder

      token = await stripe.createToken({
        name: `${shipping_address.first_name} ${shipping_address.last_name}`,
        address_line1: shipping_address.line_1,
        address_line2: shipping_address.line_2,
        address_city: shipping_address.city,
        address_state: shipping_address.county,
        address_zip: shipping_address.postcode,
        address_country: shipping_address.country
      })

      console.log("Jamie's token", token)
    } catch (tokenError) {
      console.log('Failed to create token', tokenError)
    }

    await handlePayment(newOrder.id, token)
  }

  return paid ? (
    <OrderConfirmation order={order} />
  ) : (
    <Form onSubmit={onSubmit} initialValues={initialValues} validate={validate}>
      {({ handleSubmit, submitting, invalid, values, form, dirty }) => {
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

        setDirty(dirty)

        if (order && !paid) {
          return (
            <form onSubmit={handleSubmit}>
              <RouteHeader>
                <Heading>Pay for your order</Heading>
              </RouteHeader>

              <div>{paymentError}</div>

              <PaymentForm values={values.stripe} onChange={onStripeChange} />

              <div>
                <PrimaryButton
                  block
                  disabled={submitting || invalid || loading}
                  type="submit"
                >
                  {loading ? 'Processing payment' : `Pay ${subTotal}`}
                </PrimaryButton>
              </div>
            </form>
          )
        }

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

                  <PaymentForm
                    values={values.stripe}
                    onChange={onStripeChange}
                  />
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
                    disabled={submitting || invalid || loading}
                    type="submit"
                  >
                    {loading ? 'Processing payment' : `Pay ${subTotal}`}
                  </PrimaryButton>
                </div>

                <AddressPreview
                  type="Shipping"
                  handleClick={goToShipping}
                  address={values.shipping_address}
                />
              </div>
            )}
          </form>
        )
      }}
    </Form>
  )
}

export default injectStripe(Checkout)
