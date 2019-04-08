import React, { useState } from 'react'

import Input from './Input'
import Select from './Select'
import PlacesSuggest from './PlacesSuggest'

import countryOptions from '../countries'

export default function AddressFields({
  isEditing = false,
  type: shortType,
  form
}) {
  const [editing, setEditing] = useState(isEditing)

  const type = `${shortType}_address`

  function onPlacesChange(type, { name, city, county, countryCode, postcode }) {
    form.change(`${type}.line_1`, name)
    form.change(`${type}.city`, city)
    form.change(`${type}.county`, county)
    form.change(`${type}.country`, countryCode.toUpperCase())
    form.change(`${type}.postcode`, postcode)
  }

  function onPlacesClear(type) {
    form.change(`${type}.line_1`, '')
    form.change(`${type}.city`, '')
    form.change(`${type}.county`, '')
    form.change(`${type}.country`, '')
    form.change(`${type}.postcode`, '')
  }

  return (
    <React.Fragment>
      {/* <div> */}
      {!editing && (
        <PlacesSuggest
          label={shortType}
          onChange={({ suggestion }) => {
            onPlacesChange(type, suggestion)
            setEditing(true)
          }}
          onClear={() => onPlacesClear(type)}
        />
      )}

      {/* <button onClick={() => setEditing(true)}>Enter address manually</button> */}
      {/* </div> */}

      {editing && (
        <React.Fragment>
          <div className="md:shopkit-flex shopkit--mx-2">
            <div className="shopkit-w-full shopkit-px-2">
              <Input
                autoFocus
                name={`${type}.first_name`}
                label="First name"
                required
              />
            </div>

            <div className="shopkit-w-full shopkit-px-2">
              <Input name={`${type}.last_name`} label="Last name" required />
            </div>
          </div>

          {/* <button onClick={() => setEditing(false)}>Select new address</button> */}
          <div className="md:shopkit-flex shopkit--mx-2">
            <div className="shopkit-w-full shopkit-px-2">
              <Input name={`${type}.line_1`} label="Address line 1" required />
            </div>
          </div>

          <div className="md:shopkit-flex shopkit--mx-2">
            <div className="shopkit-w-full shopkit-px-2">
              <Input name={`${type}.line_2`} label="Address line 2" />
            </div>
          </div>

          <div className="md:shopkit-flex shopkit--mx-2">
            <div className="shopkit-w-full shopkit-px-2">
              <Input name={`${type}.city`} label="City" required />
            </div>
          </div>

          <div className="md:shopkit-flex shopkit--mx-2">
            <div className="shopkit-w-full shopkit-px-2">
              <Input
                name={`${type}.county`}
                label="State / County / Region"
                required
              />
            </div>

            <div className="shopkit-w-full shopkit-px-2">
              <Input
                name={`${type}.postcode`}
                label="ZIP / Postcode"
                required
              />
            </div>
          </div>

          <div className="md:shopkit-flex shopkit--mx-2">
            <div className="shopkit-w-full shopkit-px-2">
              <Select
                name={`${type}.country`}
                label="Country"
                options={countryOptions}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
