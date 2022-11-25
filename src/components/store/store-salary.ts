import create from "zustand"

interface Salary {
    salary: number | null,
    setSalary: (salary: number) => void,
}

const useStoreSalary = create<Salary>((set) => ({
    salary: null,
    setSalary: (salary: number) => set(
        () => ({ salary: salary })
    ),
}));

export default useStoreSalary;