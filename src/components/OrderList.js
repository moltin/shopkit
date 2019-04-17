import React, { useEffect } from 'react'
import { useStore, useActions } from 'easy-peasy'

import { Heading } from './typography'
import { RouteHeader } from './Modal/Header'
import OrderItem from './OrderItem'

function OrdersList() {
  const { orders } = useStore(({ user }) => user)
  const { getOrders } = useActions(({ user }) => user)

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <React.Fragment>
      <RouteHeader>
        <Heading>Your orders</Heading>
      </RouteHeader>

      <div>
        {orders.map(order => (
          <OrderItem key={order.id} {...order} />
        ))}
      </div>
    </React.Fragment>
  )
}

export default OrdersList
