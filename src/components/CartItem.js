import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { TextButton } from './Button'
import ShopkitIcon from './ShopkitIcon'
import QuantityStepper from './QuantityStepper'

const Wrapper = styled.div`
  display: flex;
  padding: 0.75rem 0;
  width: 100%;

  ${({ removing }) =>
    removing &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
    `};
`

const PhotoBox = styled.div`
  border: 1px solid ${props => props.theme.border};
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 1rem;
  width: 75px;
  height: 75px;

  img {
    max-width: 100%;
    border-radius: 0.25rem;
    overflow: hidden;
  }
`

// const Quantity = styled.span`
//   align-items: center;
//   background-color: ${props => props.theme.primary};
//   border-radius: 100%;
//   color: ${props => props.theme.white};
//   display: flex;
//   font-weight: 700;
//   font-size: ${props => props.theme.textSmall};
//   justify-content: center;
//   right: 0;
//   position: absolute;
//   text-align: center;
//   top: 0;
//   width: 22px;
//   height: 22px;
//   margin-top: -11px;
//   margin-right: -11px;
// `

const Info = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  font-size: ${props => props.theme.textBase};
  justify-content: space-between;
  color: ${props => props.theme.dark};
  margin: 0;
  line-height: 1.5;
`

const ProductName = styled.p`
  color: ${props => props.theme.dark};
  font-size: ${props => props.theme.textBase};
  font-weight: 500;
  margin: 0;
`

const Price = styled.p`
  color: ${props => props.theme.placeholder};
  font-size: ${props => props.theme.textSmall};
  margin: 0;
`

const StyledButton = styled(TextButton)`
  font-size: ${props => props.theme.textSmall};
  text-decoration: none;
  margin-top: 0.5rem;
`

// const ProductPrice = styled.span`
//   color: ${props => props.theme.placeholder};
//   font-weight: 500;
//   font-size: ${props => props.theme.textSmall};
//   margin: 0;
// `

// const UnitValue = styled.span`
//   color: ${props => props.theme.placeholder};
//   margin: 0;
// `

const Extra = styled.div`
  margin-left: 1.5rem;
`

function CartItem({
  id,
  name,
  quantity,
  meta,
  image: { href },
  updateItem,
  removeFromCart
}) {
  const {
    display_price: {
      without_tax: {
        unit: { formatted: unit }
        // value: { formatted: value }
      }
    }
  } = meta
  const [removing, setRemoving] = useState(false)

  const handleRemoveFromCart = async () => {
    await setRemoving(true)
    await removeFromCart(id)
  }

  const handleQuantityUpdate = async data => {
    const { quantity: qty } = data

    if (qty === 0) {
      handleRemoveFromCart()
    } else {
      await updateItem(data)
    }
  }

  return (
    <Wrapper removing={removing}>
      <PhotoBox>
        {href ? <img src={href} title={name} alt={name} /> : <ShopkitIcon />}
        {/* <Quantity>{quantity}</Quantity> */}
      </PhotoBox>

      <Info>
        <div>
          <ProductName>{name}</ProductName>
          <Price>{unit}</Price>
          {/* <ProductPrice>{value}</ProductPrice> */}
          {/* {quantity > 1 && <UnitValue> {unit} each</UnitValue>} */}
          <StyledButton noPadding onClick={handleRemoveFromCart}>
            Remove
          </StyledButton>
        </div>
      </Info>

      <Extra>
        <QuantityStepper
          itemId={id}
          quantity={quantity}
          updateItem={handleQuantityUpdate}
        />
      </Extra>
    </Wrapper>
  )
}

export default CartItem
