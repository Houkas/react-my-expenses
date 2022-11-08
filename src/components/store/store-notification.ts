import create from "zustand"

interface Notification {
    isDisplayed: boolean,
    setIsDisplayed: (value: boolean) => void,
}

const useStoreNotif = create<Notification>((set) => ({
    isDisplayed: false,
    setIsDisplayed: (value: boolean) => set(
        () => ({ isDisplayed: value })
    )
}));



export default useStoreNotif;