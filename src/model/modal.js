import { action, select, thunk } from 'easy-peasy'

import { changeRoute } from '../utils'

export default {
  route: 'cart',
  open: false,

  checkingOut: select(({ route }) => ['shipping', 'billing'].includes(route)),

  goToCart: changeRoute('cart'),
  goToShipping: changeRoute('shipping'),
  goToBilling: changeRoute('billing'),
  goToConfirmation: changeRoute('confirmation'),
  goToOrders: changeRoute('orders'),
  goToLogin: changeRoute('login'),

  toggle: action(state => {
    state.open = !state.open
  }),

  openCart: action(state => {
    state.open = true
    state.route = 'cart'
  }),

  closeModal: thunk(async (actions, _, { getStoreState, getState }) => {
    const { checkingOut } = await getState()
    const {
      checkout: { completed }
    } = await getStoreState()

    if (!completed && checkingOut) return

    actions.close()
  }),

  close: action(state => {
    state.open = false
  }),

  continueShopping: action(state => {
    state.open = false
    state.route = 'cart'
  })
}
