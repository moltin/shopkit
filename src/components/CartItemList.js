import React from 'react'
import { useActions } from 'easy-peasy'
import styled from 'styled-components'

import CartItem from './CartItem'
import PromotionManager from './PromotionManager'

const Wrapper = styled.main`
  padding-bottom: 0.75rem;
`

export default function CartItemList({ items, promotionItems }) {
  const { updateItem, removeItem, addPromotion } = useActions(
    ({ cart }) => cart
  )

  return (
    <React.Fragment>
      <Wrapper>
        {items.map(item => (
          <CartItem
            key={item.id}
            removeFromCart={removeItem}
            updateItem={updateItem}
            {...item}
          />
        ))}
      </Wrapper>

      <PromotionManager
        promotionItems={promotionItems}
        addPromotion={addPromotion}
        removePromotion={removeItem}
      />
    </React.Fragment>
  )
}
