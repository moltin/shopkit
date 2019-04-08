import React, { useEffect } from 'react'
import { useStore, useActions } from 'easy-peasy'
import { createCartIdentifier } from '@moltin/request'

import useLocalStorage from '../hooks/useLocalStorage'

function CartButton({ moltinText, moltinShowTotal }) {
  const { count, subTotal } = useStore(({ cart }) => cart)
  const {
    initialize,
    modal: { goToCart }
  } = useActions(actions => actions)

  const [cartId, setCartId] = useLocalStorage('mcart', createCartIdentifier())
  const [customerToken, setCustomerToken] = useLocalStorage('mtoken', null)
  const [customerId, setCustomerId] = useLocalStorage('mcustomer', null)

  const btnSuffix =
    subTotal || count
      ? ` (${moltinShowTotal ? subTotal : `${count} items`})`
      : null

  useEffect(() => {
    initialize({ cartId, customerToken, customerId })
    setCartId(cartId)
  }, [cartId])

  return (
    <button className="shopkit-btn shopkit-cart-btn" onClick={goToCart}>
      {moltinText}
      {btnSuffix}
    </button>
  )
}

CartButton.defaultProps = {
  moltinText: 'Cart',
  moltinShowTotal: false
}

export default CartButton
