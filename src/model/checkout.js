import { thunk } from 'easy-peasy'

import { changeRoute } from '../utils'

export default {
  route: 'shipping',

  goToShipping: changeRoute('shipping'),
  goToPayment: changeRoute('payment'),

  createOrder: thunk(
    async (
      _,
      {
        customer: initialCustomer,
        shipping_address,
        billing_address = shipping_address
      },
      { getStoreState, dispatch, injections: { api } }
    ) => {
      const {
        cart: { id: cartId }
      } = getStoreState()

      const customer = {
        name: `${billing_address.first_name} ${billing_address.last_name}`,
        ...initialCustomer
      }

      const createCustomer = customer && customer.password
      let customerId

      if (createCustomer) {
        const { data: newCustomer } = await api.post(`customers`, {
          type: 'customer',
          ...customer
        })

        customerId = newCustomer.id

        const { data: customerAuth } = await api.post(`customers/tokens`, {
          type: 'token',
          email: customer.email,
          password: customer.password
        })

        dispatch.user.setCustomerId(customerId)
        dispatch.user.setCustomerToken(customerAuth.token)
      }

      const { data } = await api.post(`carts/${cartId}/checkout`, {
        ...(createCustomer ? { customer: { id: customerId } } : { customer }),
        shipping_address,
        billing_address
      })

      return data
    }
  ),

  payForOrder: thunk(async (_, { orderId, token }, { injections: { api } }) => {
    const { payment } = await api.post(`orders/${orderId}/payments`, {
      gateway: 'stripe',
      method: 'purchase',
      payment: token
    })

    return payment
  })
}
