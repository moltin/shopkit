import React from 'react'
import ReactDOM from 'react-dom'
import { MoltinClient } from '@moltin/request'
import { createStore, StoreProvider } from 'easy-peasy'
import { ThemeProvider } from 'styled-components'
import 'arrive';

import model from './model'

import Modal from './components/Modal'
import BuyButton from './components/BuyButton'
import CartButton from './components/CartButton'
import LoginButton from './components/LoginButton'

import theme from './theme'

function init(document) {
  const script = document.querySelector('script[data-moltin-client-id]')

  if (!script) {
    console.error(
      'You must provide a Moltin Client ID to enable the Moltin Btn'
    )
    return
  }

  const {
    moltinClientId: client_id,
    moltinStripePublishableKey,
    moltinCurrency: currency
  } = script.dataset

  if (!moltinStripePublishableKey) {
    console.error(
      'You must provide your Stripe Publishable Key to enable the Moltin Btn'
    )
    return
  }

  const buttons = [...document.querySelectorAll('.moltin-buy-button')]
  const cartBtns = [...document.querySelectorAll('.moltin-cart-button')]
  const loginBtns = [...document.querySelectorAll('.moltin-login-button')]

  const cart = document.createElement('div')
  document.body.appendChild(cart)

  const api = new MoltinClient({
    client_id,
    application: 'moltin-btn',
    ...(currency && { currency })
  })

  const store = createStore(model, {
    injections: {
      api
    }
  })

  document.arrive(
    ".moltin-buy-button",
    { existing: true },
    (el) => ReactDOM.render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <BuyButton {...el.dataset} />
        </ThemeProvider>
      </StoreProvider>,
      el
    )
  );

  document.arrive(
    ".moltin-cart-button",
    { existing: true },
    (el) => ReactDOM.render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <CartButton {...el.dataset} />
        </ThemeProvider>
      </StoreProvider>,
      el
    )
  );

  document.arrive(
    ".moltin-login-button",
    { existing: true },
    (el) => ReactDOM.render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <LoginButton {...el.dataset} />
        </ThemeProvider>
      </StoreProvider>,
      el
    )
  );

  ReactDOM.render(
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Modal stripeKey={moltinStripePublishableKey} />
      </ThemeProvider>
    </StoreProvider>,
    cart
  )
}

if (document.readyState === 'complete') {
  init(document)
}

window.addEventListener('load', function() {
  init(document)
})
