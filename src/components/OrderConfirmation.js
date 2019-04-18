import React from 'react'
import { useActions } from 'easy-peasy'
import styled, { keyframes } from 'styled-components'

import { Heading, Text } from './typography'
import { PrimaryButton } from './Button'

const stroke = keyframes`
  100% {
    stroke-dashoffset: 300;
  }
`

const scale = keyframes`
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(0.9, 0.9, 1);
  }
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const curve = `cubic-bezier(0.650, 0.000, 0.450, 1.000)`

const Wrapper = styled.div`
  text-align: center;
`

const AnimatedHeading = styled(Heading)`
  animation: ${fadeIn} 0.3s;
  margin-bottom: 0.5rem;
`

const AnimatedText = styled(Text)`
  animation: ${fadeIn} 0.3s;
  margin-bottom: 1rem;
`

const AnimatedButton = styled(PrimaryButton)`
  animation: ${fadeIn} 0.3s;
`

const Tick = styled.div`
  width: 80px;
  height: 80px;
  margin: 3rem auto;
  animation: ${fadeIn} 0.3s;

  .success {
    display: block;
    stroke-width: 2;
    stroke: #fff;
    animation: ${scale} 0.3s ease-in-out 0.8s both;
    color: ${props => props.theme.primary};
  }

  .circle {
    stroke-dasharray: 800;
    stroke-dashoffset: 800;
    stroke-width: 2;
    stroke: currentColor;
    fill: none;
    animation: ${stroke} 0.5s ${curve} forwards;
  }

  .checkmark {
    transform-origin: 50% 50%;
    stroke-dasharray: 146;
    stroke-dashoffset: 146;
    animation: ${stroke} 0.2s ${curve} 0.9s forwards;
    stroke: currentColor;
  }
`

export default function({}) {
  const { continueShopping } = useActions(({ modal }) => modal)

  return (
    <Wrapper>
      <Tick>
        <svg
          className="success shopkit-primary-text"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          <g fill="none" fillRule="evenodd">
            <circle className="circle" cx="40" cy="40" r="39" strokeWidth="2" />
            <polyline
              className="checkmark"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              points="24.5 41.5 34.5 51.5 55.5 30.5"
            />
          </g>
        </svg>
      </Tick>

      <AnimatedHeading>Order confirmed!</AnimatedHeading>

      <AnimatedText>Thank you for your order.</AnimatedText>

      <AnimatedButton onClick={continueShopping}>
        Continue shopping
      </AnimatedButton>
    </Wrapper>
  )
}
