import React from 'react'
import styled from 'styled-components'
import { useStore, useActions } from 'easy-peasy'

import PoweredBy from '../PoweredBy'
import { Text, Link } from '../typography'

function ModalFooter() {
  const { route } = useStore(({ modal }) => modal)
  const { goToLogin } = useActions(({ modal }) => modal)

  return (
    <Wrapper>
      {/* <GuestCTA>
        <Text>
          Already have an account?
          <br />
          <Link href="javascript:void()" onClick={goToLogin}>
            Login to your account
          </Link>
        </Text>
      </GuestCTA> */}

      <PoweredBy />
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  margin-top: 1.5rem;
`

const GuestCTA = styled.div`
  text-align: center;
  margin: 1.5rem;

  a {
    font-weight: 500;
  }
`

export default ModalFooter
