import { Override, Data } from "framer"
import { FlowController } from "framer-controller"

// Checkbox
const state = Data({
    termsOk: false,
})

export const ContinueButton: Override = props => {
    return {
        disabled: !state.termsOk,
        additionalClassName:
            controller.current >= controller.pagesTotal - 1
                ? "hidden"
                : "visible",
        onClick: () => {
            // TODO: Remove button on last page or allow func to be overridden
            // TODO: Add previous button and wizard steps (prev not on controller.root)
            if (controller.current >= controller.pagesTotal - 1) {
                return
            }
            controller.showNext(controller.current + 1)
        },
    }
}

export const PreviousButton: Override = props => {
    return {
        additionalClassName: controller.root ? "hidden" : "visible",
        onClick: () => {
            controller.showPrevious()
        },
    }
}

export function TermsCheckbox(): Override {
    return {
        onValueChange: isChecked => {
            state.termsOk = isChecked
        },
    }
}

// Steps flow
export const controller = new FlowController()

export const Flow: Override = props => {
    controller.connect(props)
    return {
        ...controller.state,
        variants: {
            // Old page moves from current to behind
            behind: {
                y: "0%",
                filter: "brightness(50%)",
                transition: {
                    //type: "spring"
                    ease: [0.23, -0.04, 0.31, 1.01],
                    duration: 1.36,
                },
            },
            // Component's current page
            current: {
                y: "0%",
                filter: "brightness(100%)",
                transition: {
                    ease: [0.23, -0.04, 0.31, 1.01],
                    duration: 1.36,
                },
            },
            // When navigate to a page, next page moves from ahead to current
            ahead: {
                y: "100%",
                filter: "brightness(100%)",
                transition: {
                    ease: [0.23, -0.04, 0.31, 1.01],
                    duration: 1.28,
                },
            },
        },
    }
}
