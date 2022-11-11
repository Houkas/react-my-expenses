import create from "zustand"

interface Notification {
    notification: {
        isDisplayed: boolean,
        type: string,
        message: string
    },
    setNotification: (isDisplayed: boolean, type: string, message: string) => void,

}

const useStoreNotif = create<Notification>((set) => ({
    notification: {
        isDisplayed: false,
        type: '',
        message: ''
    },
    setNotification: (isDisplayed: boolean, type: string, message: string) => set(
        () => ({ notification: {
            isDisplayed : isDisplayed,
            type: type,
             message : message
        } })
    ),
}));



export default useStoreNotif;