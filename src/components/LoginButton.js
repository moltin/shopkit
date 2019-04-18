import React from 'react'
import { useActions, useStore } from 'easy-peasy'

import { PrimaryButton } from './Button'

function LoginButton({ loginText, ordersText }) {
  const { goToLogin, goToOrders } = useActions(({ modal }) => modal)
  const { loggedIn } = useStore(({ user }) => user)

  return (
    <PrimaryButton
      className="shopkit-login-button"
      onClick={loggedIn ? goToOrders : goToLogin}
    >
      {loggedIn ? ordersText : loginText}
    </PrimaryButton>
  )
}

LoginButton.defaultProps = {
  loginText: 'Login',
  ordersText: 'My Orders'
}

export default LoginButton
