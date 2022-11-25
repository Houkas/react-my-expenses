import create from "zustand"

interface Salary {
    salary: number | null,
    setSalary: (salary: number | null) => void,
}

const useStoreSalary = create<Salary>((set) => ({
    salary: null,
    setSalary: (salary: number | null) => set(
        () => ({ salary: salary })
    ),
}));

export default useStoreSalary;