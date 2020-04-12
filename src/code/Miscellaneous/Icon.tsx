import * as React from "react"
import { useContext } from "react"
//import { ThemeContext } from "styled-components"
import { ControlType, addPropertyControls } from "framer"
import { IconCheck } from "../canvas"

/*type Props = //OmitTheme<IconComponentProps> &
    //OmitTheme<CircleIconProps> &
    Partial<{
        theme: string
        intent: string
        pattern: string
        canvasSize: boolean
        size: number
        circle: boolean
        width: number
        height: number
    }> & {
        icon: string
    }

const defaults: Props = {
    theme: "light",
    intent: "primary",
    pattern: "primary",
    icon: "Battery",
    canvasSize: true,
    size: 24,
    circle: true,
    //name: "anchor",
}*/

export const Icon = ({ name, ...props }) => {
    //const themeContext = useContext(ThemeContext)
    //const { width, height, size, ...rest } = props
    console.log(`received ${name}`)
    const IconComponent = IconCheck
    console.log("IconComponent", IconComponent)
    //const { theme, canvasSize, width, height, size, circle, ...rest } = props
    //const IconWrapper = circle ? BaseCircleIcon : BaseIcon

    return <IconComponent {...props} />
}

Icon.defaultProps = {
    //...defaults,
    name: "Battery",
    //height: defaults.size,
    //width: defaults.size,
}

addPropertyControls(Icon, {
    circle: {
        type: ControlType.Boolean,
        title: "Circle",
    },
    name: {
        type: ControlType.String,
        defaultValue: "Battery",
    },
    //...themeControls(defaults.theme),
    //...intentControls(defaults.intent),
    //...patternControls(defaults.pattern, true, "circle"),
    /*canvasSize: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: defaults.canvasSize,
        enabledTitle: "Canvas",
        disabledTitle: "Manual",
    },
    size: {
        type: ControlType.Number,
        title: " ",
        defaultValue: defaults.size,
        min: 0,
        hidden: ({ canvasSize }) => canvasSize,
    },
    */

    //...iconControls(defaults.icon),
})
