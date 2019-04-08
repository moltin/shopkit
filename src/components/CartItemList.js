import React from 'react'
import { useActions } from 'easy-peasy'

import CartItem from './CartItem'
import PromotionManager from './PromotionManager'

export default function CartItemList({ items, promotionItems }) {
  const { updateItem, removeItem, addPromotion } = useActions(
    ({ cart }) => cart
  )

  return (
    <div className="cart-item-list">
      {items.map(item => (
        <CartItem
          key={item.id}
          removeFromCart={removeItem}
          updateItem={updateItem}
          {...item}
        />
      ))}

      <PromotionManager
        promotionItems={promotionItems}
        addPromotion={addPromotion}
        removePromotion={removeItem}
      />
    </div>
  )
}
