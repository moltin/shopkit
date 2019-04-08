import React from 'react'
import { useActions } from 'easy-peasy'

function LoginButton({ text }) {
  const { goToLogin } = useActions(({ modal }) => modal)

  return (
    <button className="shopkit-btn shopkit-login-btn" onClick={goToLogin}>
      {text}
    </button>
  )
}

LoginButton.defaultProps = {
  text: 'Login'
}

export default LoginButton
