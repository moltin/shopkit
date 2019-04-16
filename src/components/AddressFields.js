import React, { useState } from 'react'
import styled from 'styled-components'

import { TextButton } from './Button'
import Input from './Input'
import Select from './Select'
import PlacesSuggest from './PlacesSuggest'
import { Grid, GridCol } from './Grid'

import countryOptions from '../countries'

const SearchWrapper = styled.div`
  padding: 0 0 1.5rem;
`

const FieldsWrapper = styled.div`
  border-top: 1px solid ${props => props.theme.divider};
  padding: 0.75rem 0 1.5rem;
`

const StyledTextButton = styled(TextButton)`
  margin-top: 0.5rem !important;
  display: inline-block !important;
`

export default function AddressFields({
  isEditing = false,
  type: shortType,
  form
}) {
  const [editing, setEditing] = useState(isEditing)
  const type = `${shortType}_address`
  const isShipping = shortType === 'shipping'

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
      <SearchWrapper>
        <PlacesSuggest
          label={shortType}
          onChange={({ suggestion }) => {
            onPlacesChange(type, suggestion)
            setEditing(true)
          }}
          onClear={() => onPlacesClear(type)}
        />

        {!editing && (
          <StyledTextButton onClick={() => setEditing(true)}>
            Enter address manually
          </StyledTextButton>
        )}
      </SearchWrapper>

      {editing && (
        <FieldsWrapper>
          <Grid>
            <GridCol>
              <Input
                autoFocus
                name={`${type}.first_name`}
                label="First name"
                required
              />
            </GridCol>

            <GridCol>
              <Input name={`${type}.last_name`} label="Last name" required />
            </GridCol>
          </Grid>

          <Input name={`${type}.line_1`} label="Address line 1" required />
          <Input name={`${type}.line_2`} label="Address line 2" />

          <Grid>
            <GridCol>
              <Input name={`${type}.city`} label="City" required />
            </GridCol>

            <GridCol>
              <Input name={`${type}.county`} label="State / County" required />
            </GridCol>
          </Grid>

          <Grid>
            <GridCol>
              <Input
                name={`${type}.postcode`}
                label="ZIP / Postcode"
                required
              />
            </GridCol>

            <GridCol>
              <Select
                name={`${type}.country`}
                label="Country"
                options={countryOptions}
                required
              />
            </GridCol>
          </Grid>

          {isShipping && (
            <React.Fragment>
              <Input name={`${type}.phone_number`} label="Phone number" />

              <Input
                name={`${type}.instructions`}
                label="Delivery instructions"
                placeholder="E.g. Leave in garage"
              />
            </React.Fragment>
          )}
        </FieldsWrapper>
      )}
    </React.Fragment>
  )
}
