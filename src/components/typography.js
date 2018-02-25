import styled from "styled-components"

export const H1 = styled.h1`
  font-size: 30px;
  color: red;
`

const IH2 = H1.withComponent("h2")
export const H2 = IH2.extend`
  font-size: 24px;
`

const IH3 = H1.withComponent("h3")
export const H3 = IH3.extend`
  font-size: 18px;
`

const IH4 = H1.withComponent("h4")
export const H4 = IH4.extend`
  font-size: 15px;
  color: green;
`
