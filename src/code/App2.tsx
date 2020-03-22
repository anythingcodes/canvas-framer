import * as React from "react"
import { Override, Data } from "framer"

// Learn more: https://framer.com/docs/overrides/

const appState = Data({
    taps: 0,
})

export function TapFrame(props): Override {
    return {
        borderRadius: 12,
        whileTap: {
            scale: 0.9,
        },
        onTap: () => {
            appState.taps += 1
        },
    }
}

export function RotateFrame(props): Override {
    return {
        animate: {
            rotate: appState.taps * 90,
        },
    }
}

export function TextElement(props): Override {
    return {
        text: appState.taps,
    }
}
