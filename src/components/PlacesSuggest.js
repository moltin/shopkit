import React from 'react'
import AlgoliaPlaces from 'algolia-places-react'

import Label from './Label'

const options = {
  appId: 'plEPUZAA2D2L',
  apiKey: '4c9f0832a65f800e31b0d50f44670b1f',
  type: ['city', 'address'],
  useDeviceLocation: false,
  style: false,
  autoComplete: false
}

export default function PlacesSuggest({ label, ...props }) {
  const id = `${label}_suggest`

  return (
    <div>
      {label && <Label htmlFor={id}>Search for your {label} address</Label>}

      <AlgoliaPlaces
        id={id}
        autoComplete="off"
        options={options}
        placeholder="Start typing an address"
        {...props}
      />
    </div>
  )
}
