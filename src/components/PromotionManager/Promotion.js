import React from 'react'

export default function Promotion({ id, sku, removePromotion }) {
  return (
    <div className="shopkit-cart__promotion-item shopkit-flex shopkit-justify-between shopkit-items-center">
      <p className="shopkit-text-light">Promotion applied</p>
      <p>{sku}</p>
      <button onClick={() => removePromotion(id)}>Remove promotion</button>
    </div>
  )
}
