import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import styled, { css } from "styled-components"
import { colors } from "./canvas"

//import { rem } from 'polished';

const baseStyles = css`
  line-height: 1.2;
  font-family: 'Avenir Next';
  font-weight: normal;
`

const h1 = styled.h1`
  ${baseStyles}
  font-size: 33px;
`

const h2 = styled.h2`
  ${baseStyles};
  font-size: 28px;
`

const h3 = styled.h3`
  ${baseStyles};
  font-size: 23px;
`

const h4 = styled.h4`
  ${baseStyles};
  font-size: 24px;
`

const h5 = styled.h4`
  ${baseStyles};
  font-size: 15px;
`

const h6 = styled.h4`
  ${baseStyles};
  font-size: 11px;
`

const Headings = {
    h1,
    h2,
    h3,
    h4,
}

export default Headings
