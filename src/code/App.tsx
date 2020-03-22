import { Override, Data } from "framer"

const state = Data({
    termsOk: false,
})

export function ContinueButton(): Override {
    console.log(`ContinueButton disabled?: ${!state.termsOk}`)
    return {
        disabled: !state.termsOk,
    }
}

export function TermsCheckbox(): Override {
    return {
        onValueChange: isChecked => {
            state.termsOk = isChecked
        },
    }
}
