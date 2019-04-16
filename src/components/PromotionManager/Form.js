import React, { useState } from 'react'
import { Form } from 'react-final-form'
import styled from 'styled-components'

import Label from '../Label'
import Input from '../Input'
import { PrimaryButton } from '../Button'

export default function PromotionForm({ addPromotion }) {
  const [error, setError] = useState(null)

  const onSubmit = async ({ code }) => {
    try {
      await addPromotion(code)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Label htmlFor="code">Gift card or discount code</Label>

          <Row>
            <Input
              name="code"
              placeholder="Enter a code"
              error={error}
              autoComplete="off"
            />
            <StyledButton
              primary
              type="submit"
              disabled={submitting || pristine}
            >
              Apply
            </StyledButton>
          </Row>
        </form>
      )}
    </Form>
  )
}

const Row = styled.div`
  align-items: start;
  display: flex;
  width: 100%;
`

const StyledButton = styled(PrimaryButton)`
  margin-left: 0.5rem;
`
