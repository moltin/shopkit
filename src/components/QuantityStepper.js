import React from 'react'
import styled from 'styled-components'

import Button from './Button'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`

const Quantity = styled.span`
  color: ${props => props.theme.dark};
  font-weight: 500;
  padding: 0.25rem 0;
`

const SVG = styled.svg`
  stroke: currentColor;
  width: 10px;
  height: 10px;
`

export default function QuantityStepper({ itemId, quantity, updateItem }) {
  const increase = () => updateItem({ id: itemId, quantity: quantity + 1 })
  const decrease = () => updateItem({ id: itemId, quantity: quantity - 1 })

  return (
    <Wrapper>
      <Button noPadding onClick={increase}>
        <SVG
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="6"
          viewBox="0 0 10 6"
        >
          <polyline
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
            points="0 4 4 0 8 4"
            transform="translate(1 1)"
          />
        </SVG>
      </Button>
      <Quantity>{quantity}</Quantity>
      <Button noPadding onClick={decrease}>
        <SVG
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="6"
          viewBox="0 0 10 6"
        >
          <polyline
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
            points="0 44 4 48 8 44"
            transform="translate(1 -43)"
          />
        </SVG>
      </Button>
    </Wrapper>
  )
}
