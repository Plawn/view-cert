import { useCallback } from "react";
import { atom, SetterOrUpdater, useSetRecoilState } from "recoil";

export type SnackbarType = "error" | "warning" | "information" | "check";

export type SnackbarState = {
    message: string;
    type: SnackbarType;
} | undefined;

export const messageAtom = atom<SnackbarState>({
    key: 'message',
    default: undefined,
})

const defaultMessages = {
    "error": "Failed",
    "check": "Success",
    "information": "",
    "warning": "Warning",
}


export const clearSnackbar = (setter: SetterOrUpdater<SnackbarState>) => setter(undefined);

export const useSnackbar = () => {
    const setSnackbar = useSetRecoilState(messageAtom);
    const f = useCallback((type: SnackbarType | "clear", message?: string) => {
        if (type === "clear") {
            setSnackbar(undefined);
        } else {
            setSnackbar({
                message: message || defaultMessages[type],
                type: type,
            })
        }
    }, [setSnackbar])
    return f;
}
