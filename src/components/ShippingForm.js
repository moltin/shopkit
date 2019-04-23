import React from 'react'

import { RouteHeader } from './Modal/Header'
import { Heading } from './typography'
import AddressFields from './AddressFields'
import { PrimaryButton } from './Button'

function ShippingForm({ form, shipping_address, submitting, invalid }) {
  return (
    <div>
      <RouteHeader>
        <Heading>Shipping information</Heading>
      </RouteHeader>

      <div>
        <AddressFields
          isEditing={shipping_address}
          type="shipping"
          form={form}
        />
      </div>

      <div>
        <PrimaryButton block disabled={submitting || invalid} type="submit">
          Continue to billing information
        </PrimaryButton>
      </div>
    </div>
  )
}

export default ShippingForm
