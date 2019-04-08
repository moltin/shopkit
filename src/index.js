import React from 'react'
import ReactDOM from 'react-dom'
import { createClient } from '@moltin/request'
import { createStore, StoreProvider } from 'easy-peasy'

import model from './model'

import Modal from './components/Modal'
import BuyButton from './components/BuyButton'
import CartButton from './components/CartButton'
import LoginButton from './components/LoginButton'

import './themes/default.css'

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

  const buttons = [...document.querySelectorAll('.moltin-buy-btn')]
  const cartBtns = [...document.querySelectorAll('.moltin-cart-btn')]
  const loginBtns = [...document.querySelectorAll('.moltin-login-btn')]

  const cart = document.createElement('div')
  document.body.appendChild(cart)

  const api = new createClient({
    client_id,
    application: 'moltin-btn',
    ...(currency && { currency })
  })

  const store = createStore(model, {
    injections: {
      api
    }
  })

  buttons.forEach(el =>
    ReactDOM.render(
      <StoreProvider store={store}>
        <BuyButton {...el.dataset} />
      </StoreProvider>,
      el
    )
  )

  cartBtns.forEach(el => {
    ReactDOM.render(
      <StoreProvider store={store}>
        <CartButton {...el.dataset} />
      </StoreProvider>,
      el
    )
  })

  loginBtns.forEach(el => {
    ReactDOM.render(
      <StoreProvider store={store}>
        <LoginButton {...el.dataset} />
      </StoreProvider>,
      el
    )
  })

  ReactDOM.render(
    <StoreProvider store={store}>
      <Modal stripeKey={moltinStripePublishableKey} />
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
