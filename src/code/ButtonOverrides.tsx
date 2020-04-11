import { Override, Data } from "framer"
//import { FlowController } from "framer-controller"
//import { useSwitch } from "@framer/tishogeorgiev.switch"

// Switch

// Checkbox
/*
const state = Data({
  termsOk: false,
})*/

export const ContinueButton: Override = props => {
    //const controls = useSwitch()

    return {
        //disabled: !state.termsOk,
        onClick: () => {
            // TODO: Remove button on last page or allow func to be overridden
            // TODO: Add previous button and wizard steps (prev not on controller.root)
            //console.log(controls.getSwitches())
        },
    }
}

export const PreviousButton: Override = props => {
    //const controls = useSwitch()

    return {
        //additionalClassName: controller.root ? "hidden" : "visible",
        onClick: () => {
            // console.log("prev")
            //controls.setSwitchState("sharedStep", 1)
        },
    }
}

/*export function TermsCheckbox(): Override {
    return {
        onValueChange: isChecked => {
            state.termsOk = isChecked
        },
    }
}*/
