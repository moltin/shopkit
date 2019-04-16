import React, { useEffect } from 'react'
import { useStore, useActions } from 'easy-peasy'
import { createCartIdentifier } from '@moltin/request'

import { PrimaryButton } from './Button'

import useLocalStorage from '../hooks/useLocalStorage'

function CartButton({ moltinText, moltinShowTotal }) {
  const { count, subTotal } = useStore(({ cart }) => cart)
  const {
    initialize,
    modal: { goToCart }
  } = useActions(actions => actions)

  const [cartId, setCartId] = useLocalStorage('mcart', createCartIdentifier())
  // const [customerToken, setCustomerToken] = useLocalStorage('mtoken', null)
  // const [customerId, setCustomerId] = useLocalStorage('mcustomer', null)

  const btnSuffix =
    subTotal || count
      ? ` (${moltinShowTotal ? subTotal : `${count} items`})`
      : null

  useEffect(() => {
    // initialize({ cartId, customerToken, customerId })
    initialize({ cartId })
    setCartId(cartId)
  }, [cartId])

  return (
    <PrimaryButton className="shopkit-cart-button" onClick={goToCart}>
      {moltinText}
      {btnSuffix}
    </PrimaryButton>
  )
}

CartButton.defaultProps = {
  moltinText: 'Cart',
  moltinShowTotal: false
}

export default CartButton
