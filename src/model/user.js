import { action, thunk, select } from 'easy-peasy'

export default {
  id: null,
  token: null,
  orders: [],

  loggedIn: select(({ id, token }) => id && token),

  setCustomerId: action((state, customerId) => {
    state.id = customerId
  }),

  setCustomerToken: action((state, customerToken) => {
    state.token = customerToken
  }),

  // getUser: thunk(async (actions, {customerId, customerToken}, { injections: { api } }) => {
  //   const payload = await api.get(`carts/${id}/items`)

  //   actions.setCart(payload)
  // }),

  getOrders: thunk(
    async (actions, _, { getState, dispatch, injections: { api } }) => {
      const { token } = await getState()
      const { data } = await api.get(`orders?include=items`, {
        'X-Moltin-Customer-Token': token
      })

      actions.setOrders(data)
      return data
    }
  ),

  login: thunk(
    async (_, { email, password }, { dispatch, injections: { api } }) => {
      try {
        const { data } = await api.post(`customers/tokens`, {
          type: 'token',
          email,
          password
        })

        dispatch.user.setCustomerId(data.customer_id)
        dispatch.user.setCustomerToken(data.token)

        return data
      } catch (error) {
        console.log(error.message)
        throw new Error('Incorrect email or password. Try again.')
      }
    }
  ),

  setOrders: action((state, orders) => {
    state.orders = orders
  })
}
