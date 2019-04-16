import styled from 'styled-components'

export const Heading = styled.h2`
  color: ${props => props.theme.dark};
  font-weight: 700;
  font-size: ${props => props.theme.textLarge};
  margin: 0;
`

export const Text = styled.p`
  color: ${props => props.theme.placeholder};
  margin: 0;
  line-height: 1.5;
`

export const Link = styled.a`
  color: ${props => props.theme.dark};
  text-decoration: underline;

  &:hover {
    color: ${props => props.theme.primary};
  }
`
