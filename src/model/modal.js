import { action, select } from 'easy-peasy'

import { changeRoute } from '../utils'

export default {
  route: 'cart',
  // route: 'billing',
  open: false,
  // open: true,

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

  closeModal: action(state => {
    if (state.checkingOut) return

    state.open = false
  }),

  continueShopping: action(state => {
    state.open = false
    state.route = 'cart'
  })
}
