import React, { useState } from 'react'
import { useActions } from 'easy-peasy'
import { Form } from 'react-final-form'

import { Heading } from './typography'
import { RouteHeader } from './Modal/Header'
import Input from './Input'
import { PrimaryButton } from './Button'
import { loginValidation } from '../validation/auth'

function LoginForm() {
  const [error, setError] = useState(null)
  const { login } = useActions(({ user }) => user)
  const { goToOrders } = useActions(({ modal }) => modal)

  const onSubmit = async ({ email, password }) => {
    try {
      await login({ email, password })
      goToOrders()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <React.Fragment>
      <RouteHeader>
        <Heading>Login</Heading>
      </RouteHeader>

      <Form onSubmit={onSubmit} validate={loginValidation}>
        {({ handleSubmit, submitting, invalid, pristine }) => {
          pristine && setError(null)

          return (
            <form onSubmit={handleSubmit}>
              <Input label="Email address" name="email" type="email" />
              <Input
                label="Password"
                name="password"
                type="password"
                error={error}
              />

              <PrimaryButton
                block
                marginTop
                type="submit"
                disabled={submitting || invalid}
              >
                Login
              </PrimaryButton>
            </form>
          )
        }}
      </Form>
    </React.Fragment>
  )
}

export default LoginForm
