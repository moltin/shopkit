import { action, thunk, select } from 'easy-peasy'

export default {
  id: null,
  meta: null,
  items: [],

  isEmpty: select(({ items }) => items.length === 0),

  count: select(({ items }) =>
    items.reduce((sum, { quantity }) => sum + quantity, 0)
  ),

  cartItems: select(({ items }) =>
    items.filter(({ type }) => type === 'cart_item' || type === 'custom_item')
  ),

  taxItems: select(({ items }) =>
    items.filter(({ type }) => type === 'tax_item')
  ),

  promotionItems: select(({ items }) =>
    items.filter(({ type }) => type === 'promotion_item')
  ),

  subTotal: select(({ meta }) =>
    meta ? meta.display_price.without_tax.formatted : 0
  ),

  setCartId: action((state, cartId) => {
    state.id = cartId
  }),

  setCart: action((state, { data, meta }) => {
    state.items = data
    state.meta = meta
  }),

  getCart: thunk(async (actions, id, { injections: { api } }) => {
    const payload = await api.get(`carts/${id}/items`)

    actions.setCart(payload)
  }),

  deleteCart: thunk(async (actions, id, { injections: { api } }) => {
    await api.delete(`carts/${id}`)

    actions.setCart({ data: [], meta: null })
  }),

  addToCart: thunk(
    async (
      actions,
      { quantity = 1, type = 'cart_item', ...rest },
      { getState, injections: { api } }
    ) => {
      const { id: cartId } = getState()

      const payload = await api.post(`carts/${cartId}/items`, {
        type,
        quantity,
        ...rest
      })

      actions.setCart(payload)
    }
  ),

  updateItem: thunk(
    async (actions, { id, quantity }, { getState, injections: { api } }) => {
      const { id: cartId } = getState()

      const payload = await api.put(`carts/${cartId}/items/${id}`, {
        type: 'cart_item',
        id,
        quantity
      })

      actions.setCart(payload)
    }
  ),

  removeItem: thunk(async (actions, id, { getState, injections: { api } }) => {
    const { id: cartId } = getState()

    const payload = await api.delete(`carts/${cartId}/items/${id}`)

    actions.setCart(payload)
  }),

  addPromotion: thunk(
    async (actions, code, { getState, injections: { api } }) => {
      const { id: cartId } = getState()

      const payload = await api.post(`carts/${cartId}/items`, {
        type: 'promotion_item',
        code
      })

      actions.setCart(payload)
    }
  )
}
