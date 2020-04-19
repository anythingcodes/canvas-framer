import * as React from "react"
import { Stack } from "framer"

type Props = {
    center: boolean
    placeholders: any
}

export const centerLayout: React.FC<Props> = props => {
    const { center = true, children } = props

    return props.placeholders === null && center ? (
        <Stack alignment="center" distribution="center" size="100%">
            {children}
        </Stack>
    ) : (
        <React.Fragment>{children}</React.Fragment>
    )
}
