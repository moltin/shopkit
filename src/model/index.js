import { thunk } from 'easy-peasy'

import modal from './modal'
import user from './user'
import cart from './cart'
import checkout from './checkout'

export default {
  initialize: thunk(
    async (_, { cartId, customerId, customerToken }, { dispatch }) => {
      await dispatch.cart.getCart(cartId)
      await dispatch.cart.setCartId(cartId)
      await dispatch.user.setCustomerId(customerId)
    }
  ),
  modal,
  user,
  cart,
  checkout
}
