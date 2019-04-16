import React from 'react'
import styled from 'styled-components'

import Label from '../Label'
import { PrimaryButton } from '../Button'

export default function Promotion({ id, sku, removePromotion }) {
  return (
    <div>
      <Label>Gift card or discount code</Label>

      <Wrapper>
        <SKU>{sku}</SKU>
        <PrimaryButton onClick={() => removePromotion(id)}>
          Remove
        </PrimaryButton>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SKU = styled.span`
  color: ${props => props.theme.dark};
`
