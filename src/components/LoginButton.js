import React from 'react'
import { useActions } from 'easy-peasy'

import { PrimaryButton } from './Button'

function LoginButton({ text }) {
  const { goToLogin } = useActions(({ modal }) => modal)

  return (
    <PrimaryButton className="shopkit-login-button" onClick={goToLogin}>
      {text}
    </PrimaryButton>
  )
}

LoginButton.defaultProps = {
  text: 'Login'
}

export default LoginButton
