import React from 'react'

import Promotion from './Promotion'
import Form from './Form'

export default function PromotionManager({
  promotionItems,
  addPromotion,
  removePromotion
}) {
  const hasPromotion = !!promotionItems.length
  const [promotion] = promotionItems

  return (
    <div className="shopkit-cart__promotion">
      {hasPromotion ? (
        <Promotion removePromotion={removePromotion} {...promotion} />
      ) : (
        <Form addPromotion={addPromotion} />
      )}
    </div>
  )
}
