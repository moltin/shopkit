import React from 'react'

export default function QuantityStepper({ itemId, quantity, updateItem }) {
  const increase = () => updateItem({ id: itemId, quantity: quantity + 1 })
  const decrease = () => updateItem({ id: itemId, quantity: quantity - 1 })

  return (
    <div>
      {quantity !== 1 && <button onClick={decrease}>-</button>}

      <span>{quantity}</span>
      <button onClick={increase}>+</button>
    </div>
  )
}
