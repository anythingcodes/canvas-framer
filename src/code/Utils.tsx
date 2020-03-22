import { css } from "styled-components"

const screenReaderStyles = css`
    position: absolute;
    top: 0;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
`

export default {
    screenReaderStyles,
}
