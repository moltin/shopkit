import React from 'react'
import styled from 'styled-components'

import { TextButton } from './Button'

const Wrapper = styled.div`
  border-radius: 0.25rem;
  border: 1px solid ${props => props.theme.border};
  padding: 1rem;
  margin: 1.5rem 0;
`

const Heading = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const Title = styled.p`
  margin: 0;
  font-weight: 500;
`

const Content = styled.p`
  margin: 0;
`

function AddressPreview({ type: shortType, handleClick, address }) {
  const type = `${shortType} address`
  const formattedAddress = address
    ? Object.values({
        line_1: address.line_1,
        ...(address.line_2 && { line_2: address.line_2 }),
        city: address.city,
        county: address.county,
        postcode: address.postcode
      })
        .join(', ')
        .slice(0, -1)
    : null

  if (!formattedAddress) return null

  return (
    <Wrapper>
      <Heading>
        <Title>{type}</Title>
        <TextButton onClick={handleClick}>Change</TextButton>
      </Heading>
      <Content>{formattedAddress}</Content>
    </Wrapper>
  )
}

export default AddressPreview
