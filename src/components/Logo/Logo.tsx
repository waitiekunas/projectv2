import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  margin-left: 1%;
  margin-right: 1%;
  cursor: pointer;
`
type Props = {
  src: string
  link: string
}
export const Logo: React.FC<Props> = ({ src, link }) => {
  return (
    <Wrapper>
      <Link to={link}>
        <img src={src} className="logo" alt="logo" />
      </Link>
    </Wrapper>
  )
}
