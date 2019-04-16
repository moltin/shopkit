import React from 'react'
import AlgoliaPlaces from 'algolia-places-react'
import styled from 'styled-components'

import Label from './Label'

const options = {
  appId: 'plEPUZAA2D2L',
  apiKey: '4c9f0832a65f800e31b0d50f44670b1f',
  type: ['city', 'address'],
  useDeviceLocation: false,
  style: false
}

export default function PlacesSuggest({ label, ...props }) {
  const id = `${label}_suggest`

  return (
    <AlgoliaSearch>
      {label && <Label htmlFor={id}>Search for your {label} address</Label>}

      <AlgoliaPlaces
        id={id}
        options={options}
        placeholder="Start typing an address"
        name="new-password"
        {...props}
      />
    </AlgoliaSearch>
  )
}

const AlgoliaSearch = styled.div`
  .algolia-places-nostyle {
    width: 100%;
  }

  .ap-nostyle-input {
    background-color: ${props => props.theme.white};
    border-radius: 0.25rem;
    border: 1px solid ${props => props.theme.border};
    color: ${props => props.theme.dark};
    display: block;
    font-family: inherit;
    font-size: 100%;
    font-weight: 400;
    padding: 0.75rem 1rem;
    margin: 0;
    overflow: visible;
    outline: none;
    width: 100%;

    &::-webkit-input-placeholder {
      color: ${props => props.theme.placeholder};
    }
    &::-moz-placeholder {
      color: ${props => props.theme.placeholder};
    }
    &:-ms-input-placeholder {
      color: ${props => props.theme.placeholder};
    }
    &:-moz-placeholder {
      color: ${props => props.theme.placeholder};
    }

    &:hover {
      cursor: text;
    }
  }

  .ap-nostyle-icon-pin,
  .ap-nostyle-input-icon,
  .ap-nostyle-suggestion-icon,
  .ap-suggestion-icon {
    display: none;
  }

  .ap-nostyle-dropdown-menu {
    background-color: ${props => props.theme.white};
    border-radius: 0.25rem;
    border: 1px solid ${props => props.theme.border};
    margin-top: 0.5rem;
    width: 100%;
    overflow: hidden;
  }

  .ap-nostyle-suggestion,
  .ap-suggestion {
    padding: 0.75rem 1rem;
    color: ${props => props.theme.placeholder};
    font-size: ${props => props.theme.textSmall};
    font-style: normal;
    font-weight: 500;
    border-bottom: 1px solid ${props => props.theme.cursor};
    line-height: 1.5;
  }

  .ap-nostyle-suggestion em,
  .ap-suggestion em {
    font-style: normal;
    color: ${props => props.theme.primary};
  }

  .ap-nostyle-cursor,
  .ap-cursor {
    background-color: ${props => props.theme.cursor};
  }

  .ap-nostyle-name,
  .ap-name {
    color: ${props => props.theme.dark};
    font-size: ${props => props.theme.textSmall};
    font-weight: 500;
  }

  .ap-nostyle-address,
  .ap-address {
    color: ${props => props.theme.placeholder};
    font-size: ${props => props.theme.textSmall};
    margin-left: 0.5rem;
  }

  .ap-nostyle-input-icon.ap-nostyle-icon-clear {
    background-color: ${props => props.theme.white};
    appearance: none;
    border: 0;
    cursor: pointer;
    outline: none;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    margin-top: 0.5rem;
    margin-right: 1px;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.placeholder};
    z-index: 5;

    svg {
      fill: currentColor;
      width: 10px;
      height: 10px;
    }

    &:hover,
    &:focus {
      outline: none;
    }

    &::-moz-focus-inner {
      border-style: none;
      padding: 0;
    }
  }
`
