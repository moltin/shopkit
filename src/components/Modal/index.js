import React, { useRef } from 'react'
import { useStore, useActions } from 'easy-peasy'
import { StripeProvider, Elements } from 'react-stripe-elements'
import styled from 'styled-components'

import useOnClickOutside from '../../hooks/useOnClickOutside'
import useScript from '../../hooks/useScript'

import Header from './Header'
import Footer from './Footer'
import LoginForm from '../LoginForm'
import OrderList from '../OrderList'
import Cart from '../Cart'
import Checkout from '../Checkout'

function renderRoute(route) {
  switch (route) {
    case 'login':
      return <LoginForm />

    case 'orders': {
      return <OrderList />
    }

    case 'shipping':
    case 'billing':
      return (
        <Elements>
          <Checkout />
        </Elements>
      )

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
          <StyledModal open={open} ref={ref}>
            <div>
              <Header route={route} />
              {renderRoute(route)}
            </div>

            <Footer />
          </StyledModal>

          <ModalOverlay open={open} />
        </React.Fragment>
      </StripeProvider>
    )
  }

  return null
}

const StyledModal = styled.div.attrs({
  className: 'moltin-shopkit shopkit-modal'
})`
  transition: all 0.3s ease;
  background-color: #fff;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  overflow-y: scroll;
  height: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 1000000001;
  padding: 1.5rem;
  width: 100%;
  // font-size: 0.9375rem;
  border-width: 0;
  max-width: 500px;
  opacity: ${props => (props.open ? 1 : 0)};
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  transform: translateX(${props => (props.open ? 0 : '525px')});
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-sizing: border-box;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif;
  font-size: 15px;

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
  }
`

const ModalOverlay = styled.div.attrs({
  className: 'shopkit-modal-overlay'
})`
  transition: all 0.3s ease;
  background-color: #333;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000000000;
  opacity: ${props => (props.open ? 0.3 : 0)};
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  overflow-x: ${props => (props.open ? 100 : 0)};
`
