import React from 'react'
import { useActions } from 'easy-peasy'

export default function({ meta }) {
  const { continueShopping } = useActions(({ modal }) => modal)

  return (
    <div className="shopkit-order-confirmed">
      <div className="confirmation-circle shopkit-text-primary shopkit-my-6 shopkit-text-center">
        <svg
          className="shopkit-stroke-current shopkit-w-20 shopkit-h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 80 80"
        >
          <g fill="none" fillRule="evenodd">
            <circle cx="40" cy="40" r="39" strokeWidth="2" />
            <polyline
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              points="24.5 41.5 34.5 51.5 55.5 30.5"
            />
          </g>
        </svg>
      </div>

      <div className="shopkit-my-6 shopkit-text-center">
        <h2 className="shopkit-w-full shopkit-text-center shopkit-text-default shopkit-text-lg shopkit-font-medium shopkit-mt-2 shopkit-mb-3 shopkit-block">
          Order confirmed!
        </h2>

        <p className="shopkit-text-default shopkit-text-base shopkit-m-0 shopkit-my-0 shopkit-mb-6">
          Thank you for your order.
        </p>

        <button
          onClick={continueShopping}
          className="shopkit-btn shopkit-primary-btn"
        >
          Continue shopping
        </button>
      </div>

      {/* <div className="shopkit-order-summary">
        <div className="shopkit-order-summary--title">Order summary</div>
        <div className="shopkit-order-summary--items">Items</div>
        <div className="shopkit-order-summary--total">
          <span className="shopkit-order__total--title">Total</span>
          <span className="shopkit-order__total--subtotal">
            {meta.display_price.with_tax.formatted}
          </span>
        </div>
      </div> */}
    </div>
  )
}
