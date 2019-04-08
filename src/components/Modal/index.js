import React, { useRef } from 'react'
import { useStore, useActions } from 'easy-peasy'
import { StripeProvider, Elements } from 'react-stripe-elements'
import classNames from 'classnames'

import useOnClickOutside from '../../hooks/useOnClickOutside'
import useScript from '../../hooks/useScript'

import Header from './Header'
import Cart from '../Cart'
import Checkout from '../Checkout'
import PoweredBy from '../PoweredBy'

function renderRoute(route) {
  switch (route) {
    case 'shipping':
    case 'billing':
      return (
        <Elements>
          <Checkout />
        </Elements>
      )

    case 'login':
      return <div>Login page!</div>

    case 'orders':
      return <div>Previous orders page!</div>

    case 'cart':
    default:
      return <Cart />
  }
}

export default function Modal({ stripeKey }) {
  const { open, route } = useStore(({ modal }) => modal)
  const { closeModal } = useActions(({ modal }) => modal)
  const [stripeLoaded, stripeError] = useScript('https://js.stripe.com/v3')
  const ref = useRef()

  useOnClickOutside(ref, closeModal)

  if (stripeError) {
    console.error(stripeError)
    return null
  }

  if (stripeLoaded && !stripeError) {
    return (
      <StripeProvider apiKey={stripeKey}>
        <React.Fragment>
          <div
            ref={ref}
            className={classNames('shopkit shopkit-modal', {
              'shopkit-modal-open': open
            })}
          >
            <Header route={route} />

            {renderRoute(route)}

            <PoweredBy />
          </div>

          <div
            className={classNames('shopkit-overlay', {
              'shopkit-overlay-open': open
            })}
          />
        </React.Fragment>
      </StripeProvider>
    )
  }

  return null
}
