import React from 'react'
import { useActions } from 'easy-peasy'

function BuyButton({
  moltinProductId,
  moltinOpenCart,
  moltinType,
  moltinText,
  ...props
}) {
  if (moltinType !== 'custom' && !moltinProductId) {
    console.warn('No product ID provided to Moltin Btn.')
    return null
  }

  const { addToCart } = useActions(({ cart }) => cart)
  const { goToCart } = useActions(({ modal }) => modal)

  function add() {
    moltinType !== 'custom'
      ? addToCart({ id: moltinProductId })
      : addToCart({
          type: 'custom_item',
          name: props.moltinProductName,
          sku: props.moltinProductSku,
          price: {
            amount: parseInt(props.moltinProductPrice, 10)
          }
        })

    moltinOpenCart && goToCart()
  }

  return (
    <button className="shopkit-btn shopkit-buy-btn" onClick={add}>
      {moltinText}
    </button>
  )
}

BuyButton.defaultProps = {
  moltinText: 'Add to Cart',
  moltinOpenCart: false
}

export default BuyButton
