import React from 'react'
import { useStore, useActions } from 'easy-peasy'
import styled from 'styled-components'

import { PrimaryButton } from './Button'
import { Heading } from './typography'
import CartItemList from './CartItemList'
import { RouteHeader } from './Modal/Header'
import { pluralize } from '../utils'

export default function Cart() {
  const { isEmpty, cartItems, promotionItems, subTotal, count } = useStore(
    ({ cart }) => cart
  )
  const { goToShipping } = useActions(({ modal }) => modal)

  return (
    <StyledCart>
      <RouteHeader>
        <Heading>Your shopping cart</Heading>
      </RouteHeader>

      {isEmpty ? (
        <CartEmpty>Your cart is empty</CartEmpty>
      ) : (
        <React.Fragment>
          <CartItemList
            isEmpty={isEmpty}
            items={cartItems}
            promotionItems={promotionItems}
          />

          {!isEmpty && (
            <React.Fragment>
              <CartTotalRow>
                <CartTotalTitle>Total</CartTotalTitle>
                <CartTotalSubTotal>{subTotal}</CartTotalSubTotal>
              </CartTotalRow>

              <PrimaryButton block large onClick={goToShipping}>
                Checkout with {pluralize(count, 'item')}
              </PrimaryButton>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </StyledCart>
  )
}

const StyledCart = styled.div.attrs({
  className: 'moltin-shopkit shopkit-cart'
})``

const CartEmpty = styled.p`
  color: ${props => props.theme.dark};
  text-align: center;
  margin: 1.5rem 0;
`

const CartTotalRow = styled.div`
  border-top: 1px solid ${props => props.theme.divider};
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CartTotalTitle = styled.span`
  color: ${props => props.theme.dark};
  font-weight: 500;
  font-size: ${props => props.theme.textLarge};
`

const CartTotalSubTotal = styled.span`
  color: ${props => props.theme.dark};
  font-weight: 500;
  font-size: ${props => props.theme.textExtraLarge};
`
