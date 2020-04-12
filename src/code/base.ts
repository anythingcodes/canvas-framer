import React from "react"
import icons from "./iconsObject"

export type IconName = keyof typeof icons

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    readonly name: IconName
    readonly color?: string
    readonly screenReaderText?: string
    readonly size?: string | number
}

export interface IconComponentProps extends IconProps {
    readonly name: IconName
    circle: boolean
}
