import React from 'react'
import { Form } from 'react-final-form'

import Label from '../Label'
import Input from '../Input'

export default function PromotionForm({ addPromotion }) {
  const onSubmit = ({ code }) => addPromotion(code)

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Label htmlFor="code">Gift card or discount code</Label>

          <div className="shopkit-flex shopkit-items-center">
            <div className="shopkit-w-full shopkit-mr-3">
              <Input name="code" placeholder="Enter a code" hideError />
            </div>

            <button
              type="submit"
              className="shopkit-btn shopkit-primary-btn"
              disabled={submitting || pristine}
            >
              Apply
            </button>
          </div>
        </form>
      )}
    </Form>
  )
}
