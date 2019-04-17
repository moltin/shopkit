import React from 'react'
import styled, { css } from 'styled-components'

import Button from './Button'

const Badge = styled.span`
  background-color: ${props => props.theme.success};
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.textSmall};
  font-weight: 500;
  padding: 0.3rem 0.5rem;
  border-radius: 0.25rem;

  ${({ status }) =>
    status === 'cancelled' &&
    css`
      background-color: ${props => props.theme.error};
    `};
`

const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.divider};
  border-radius: 0.25rem;
  margin: 1.5rem 0;

  &:hover {
    border-color: ${props => props.theme.border};

    button {
      border-bottom-color: ${props => props.theme.border};
    }
  }
`

const StatusBar = styled(Button)`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.divider};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
`

const Summary = styled.div`
  padding: 1.25rem 1rem;
  display: flex;
  align-items: start;
  justify-content: space-between;
`

const StyledDate = styled.span`
  color: ${props => props.theme.dark};
  font-size: ${props => props.theme.textBase};
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;

  svg {
    margin-left: 0.75rem;
    fill: ${props => props.theme.placeholder};
    height: 12px;
    display: inline-block;
  }
`

function OrderItem({ id, status, meta }) {
  const {
    timestamps: { created_at },
    display_price
  } = meta
  const formattedDate = new Date(created_at).toLocaleDateString()

  return (
    <Wrapper>
      <StatusBar block onClick={() => console.log(id)}>
        <StyledDate>
          {formattedDate}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="11"
            viewBox="0 0 6 11"
          >
            <path
              fillRule="evenodd"
              d="M167.780171,31.6586372 L163.812386,27.5 L167.780171,23.3413628 C168.073276,23.0341595 168.073276,22.5376058 167.780171,22.2304025 C167.487067,21.9231992 167.013301,21.9231992 166.720196,22.2304025 L162.207036,26.9606483 C161.919004,27.2625343 161.919004,27.7374657 162.207036,28.0393517 L166.720196,32.7695975 C167.013301,33.0768008 167.487067,33.0768008 167.780171,32.7695975 C167.926349,32.6163887 167.999813,32.415253 167.999813,32.2141174 C167.999813,32.0129817 167.926349,31.811846 167.780171,31.6586372 Z"
              transform="matrix(-1 0 0 1 168 -22)"
            />
          </svg>
        </StyledDate>
        <Badge status>{status}</Badge>
      </StatusBar>
      <Summary>
        <div>
          <p>Total</p>
          <p>{display_price.with_tax.formatted}</p>
        </div>
        <div>
          <p>Items</p>
          <p>3</p>
        </div>
      </Summary>
    </Wrapper>
  )
}

export default OrderItem
