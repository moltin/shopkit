import React from 'react'
import styled from 'styled-components'

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
    <Wrapper>
      {hasPromotion ? (
        <Promotion removePromotion={removePromotion} {...promotion} />
      ) : (
        <Form addPromotion={addPromotion} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0;
  padding: 0.75rem 0 1.5rem;
  border-top: 1px solid ${props => props.theme.divider};
`
