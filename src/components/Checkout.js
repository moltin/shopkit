import React, { useState } from 'react'
import { useStore, useActions } from 'easy-peasy'
import { Form } from 'react-final-form'
import { injectStripe } from 'react-stripe-elements'

import { shippingValidation, billingValidation } from '../validation/checkout'
import { RouteHeader } from './Modal/Header'
import { Heading } from './typography'
import { PrimaryButton } from './Button'
import OrderConfirmation from './OrderConfirmation'
import ShippingForm from './ShippingForm'
import BillingForm from './BillingForm'
import PaymentForm from './PaymentForm'

function Checkout({ stripe }) {
  const [order, setOrder] = useState(null)
  const [initialValues, setInitialValues] = useState({
    ...order,
    billingIsShipping: true
  })
  const [paid, setPaid] = useState(false)
  const { route } = useStore(({ modal }) => modal)
  const { id: cartId, total } = useStore(({ cart }) => cart)
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

        setDirty(dirty)

        if (order && !paid) {
          return (
            <form onSubmit={handleSubmit}>
              <RouteHeader>
                <Heading>Pay for your order</Heading>
              </RouteHeader>

              <div>{paymentError}</div>

              <PaymentForm form={form} />

              <div>
                <PrimaryButton
                  block
                  disabled={submitting || invalid || loading}
                  type="submit"
                >
                  Pay
                </PrimaryButton>
              </div>
            </form>
          )
        }

        return (
          <form onSubmit={handleSubmit}>
            {route === 'shipping' ? (
              <ShippingForm
                form={form}
                shipping_address={values.shipping_address}
                submitting={submitting}
                invalid={invalid}
              />
            ) : (
              <BillingForm
                form={form}
                billingIsShipping={values.billingIsShipping}
                billing_address={values.billing_address}
                shipping_address={values.shipping_address}
                createCustomer={values.createCustomer}
                submitting={submitting}
                invalid={invalid}
                loading={loading}
                goToShipping={goToShipping}
                stripe={stripe}
                total={total}
              />
            )}
          </form>
        )
      }}
    </Form>
  )
}

export default injectStripe(Checkout)
