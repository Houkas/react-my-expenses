import create from "zustand"

interface Notification {
    isDisplayed: boolean,
    setIsDisplayed: (value: boolean) => void,
    isSignUpSuccessDisplayed: boolean,
    setIsSignUpSuccessDisplayed: (value: boolean) => void,
}

const useStoreNotif = create<Notification>((set) => ({
    isDisplayed: false,
    setIsDisplayed: (value: boolean) => set(
        () => ({ isDisplayed: value })
    ),
    isSignUpSuccessDisplayed: false,
    setIsSignUpSuccessDisplayed: (value: boolean) => set(
        () => ({ isSignUpSuccessDisplayed: value })
    )
}));



export default useStoreNotif;