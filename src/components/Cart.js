import React from 'react'
import { useStore, useActions } from 'easy-peasy'

import CartItemList from './CartItemList'

export default function Cart() {
  const { isEmpty, cartItems, promotionItems, subTotal, count } = useStore(
    ({ cart }) => cart
  )
  const { goToShipping } = useActions(({ modal }) => modal)

  return (
    <div className="shopkit-cart">
      <h2 className="shopkit-w-full shopkit-text-center shopkit-text-default shopkit-text-lg shopkit-font-medium shopkit-mt-2 shopkit-mb-6 shopkit-block">
        Your shopping cart
      </h2>

      {isEmpty ? (
        <p className="shopkit-cart--empty">Your cart is empty</p>
      ) : (
        <React.Fragment>
          <CartItemList
            isEmpty={isEmpty}
            items={cartItems}
            promotionItems={promotionItems}
          />

          {!isEmpty && (
            <React.Fragment>
              <div className="shopkit-cart__total">
                <span className="shopkit-cart__total--title">Total</span>
                <span className="shopkit-cart__total--subtotal">
                  {subTotal}
                </span>
              </div>

              <button
                className="shopkit-btn shopkit-primary-btn block"
                onClick={goToShipping}
              >
                Checkout with {count} items
              </button>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  )
}
