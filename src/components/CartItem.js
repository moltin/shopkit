import React, { useState } from 'react'
import classNames from 'classnames'

function CartItem({
  id,
  name,
  sku,
  quantity,
  meta,
  image: { href },
  removeFromCart
}) {
  const {
    display_price: {
      without_tax: {
        unit: { formatted: unit },
        value: { formatted: value }
      }
    }
  } = meta
  const [removing, setRemoving] = useState(false)

  async function onRemove() {
    await setRemoving(true)
    await removeFromCart(id)
  }

  const cartItemClass = classNames('shopkit-cart-item', {
    'shopkit-cart-item--removing': removing
  })

  return (
    <div className={cartItemClass}>
      <div className="shopkit-cart-item__photo">
        {href && <img src={href} title={name} alt={name} width="50" />}
        <div className="shopkit-cart-item__quantity">{quantity}</div>
      </div>

      <div className="shopkit-cart-item__info">
        <div>
          <h3 className="shopkit-cart-item__info--name">{name}</h3>
          <p className="shopkit-cart-item__sku">{sku}</p>
        </div>

        <div className="shopkit-cart-item__info--total">
          <p className="shopkit-cart-item__info--total-value">{value}</p>
          {quantity > 1 && (
            <p className="shopkit-cart-item__info--unit-value">{unit} each</p>
          )}
        </div>
      </div>

      <button
        className="shopkit-text-light shopkit-ml-4 md:shopkit-ml-6 shopkit-shopkit-btn"
        onClick={onRemove}
      >
        <svg
          className="shopkit-fill-current shopkit-w-3 shopkit-h-3"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
        >
          <path
            fillRule="evenodd"
            d="M431,49.5857864 L434.292893,46.2928932 C434.683418,45.9023689 435.316582,45.9023689 435.707107,46.2928932 C436.097631,46.6834175 436.097631,47.3165825 435.707107,47.7071068 L432.414214,51 L435.707107,54.2928932 C436.097631,54.6834175 436.097631,55.3165825 435.707107,55.7071068 C435.316582,56.0976311 434.683418,56.0976311 434.292893,55.7071068 L431,52.4142136 L427.707107,55.7071068 C427.316582,56.0976311 426.683418,56.0976311 426.292893,55.7071068 C425.902369,55.3165825 425.902369,54.6834175 426.292893,54.2928932 L429.585786,51 L426.292893,47.7071068 C425.902369,47.3165825 425.902369,46.6834175 426.292893,46.2928932 C426.683418,45.9023689 427.316582,45.9023689 427.707107,46.2928932 L431,49.5857864 Z"
            transform="translate(-426 -46)"
          />
        </svg>
      </button>
    </div>
  )
}

export default CartItem
