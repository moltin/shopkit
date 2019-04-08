import { action } from 'easy-peasy'

export default {
  id: null,
  token: null,

  setCustomerId: action((state, customerId) => {
    state.id = customerId
  }),

  setCustomerToken: action((state, customerToken) => {
    state.token = customerToken
  })

  // getUser: thunk(async (actions, {customerId, customerToken}, { injections: { api } }) => {
  //   const payload = await api.get(`carts/${id}/items`)

  //   actions.setCart(payload)
  // }),
}
