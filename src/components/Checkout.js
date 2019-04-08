import React, { useState } from 'react'
import { useStore, useActions } from 'easy-peasy'
import { Form, Field } from 'react-final-form'
import { CardElement, injectStripe } from 'react-stripe-elements'

import { shippingValidation, billingValidation } from '../validation/checkout'
import AddressFields from './AddressFields'
import Label from './Label'
import Input from './Input'
import Checkbox from './Checkbox'
import OrderConfirmation from './OrderConfirmation'

function Checkout({ stripe }) {
  const [initialValues, setInitialValues] = useState({
    billingIsShipping: true
  })
  const [checkedOut, setCheckedOut] = useState(false)
  const [order, setOrder] = useState(null)
  const { route } = useStore(({ modal }) => modal)
  const { id: cartId, subTotal } = useStore(({ cart }) => cart)
  const { createOrder, payForOrder } = useActions(({ checkout }) => checkout)
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

      // console.log(token)
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
      {({ handleSubmit, submitting, invalid, values, form }) => {
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

        const countryCode =
          values && values.billing_address && values.billing_address.country

        const onStripeChange = e => form.change('stripe', e)

        return (
          <form onSubmit={handleSubmit}>
            {route === 'shipping' ? (
              <div>
                <h2 className="shopkit-w-full shopkit-text-center shopkit-text-default shopkit-text-lg shopkit-font-medium shopkit-mt-2 shopkit-mb-6 shopkit-block">
                  Shipping information
                </h2>

                <div>
                  <AddressFields
                    isEditing={values.shipping_address}
                    type="shipping"
                    form={form}
                  />
                </div>

                <div className="shopkit-mt-6">
                  <button
                    className="shopkit-btn shopkit-primary-btn block"
                    disabled={submitting || invalid}
                    type="submit"
                  >
                    Continue to billing information
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="shopkit-w-full shopkit-text-center shopkit-text-default shopkit-text-lg shopkit-font-medium shopkit-mt-2 shopkit-mb-6 shopkit-block">
                  Billing information
                </h2>

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

                <div className="shopkit-my-2 shopkit-py-4 shopkit-border-t shopkit-border-b shopkit-border-lighter">
                  <Input
                    type="email"
                    name="customer.email"
                    label="Email"
                    autoFocus
                  />

                  <div>
                    <Label htmlFor="payment">Payment card</Label>
                    <CardElement
                      onChange={onStripeChange}
                      hidePostalCode={true}
                      id="payment"
                      style={{
                        base: {
                          color: '#333333',
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontSize: '1rem',
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
                      <span className="shopkit-error-message">
                        {values.stripe.error.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
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
                </div>

                <div>
                  <button
                    className="shopkit-btn shopkit-primary-btn block"
                    disabled={submitting || invalid}
                    type="submit"
                  >
                    Place order and pay {subTotal}
                  </button>
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
