import { ExpenseCategory } from "./ExpenseCategory";

export class ExpenseUserSettings{

    private _salary: number;
    private _expenseCategories: ExpenseCategory[];

    constructor(salary: number, expenseCategories: ExpenseCategory[]){
        this._salary = salary;
        this._expenseCategories = expenseCategories;
    }

    get salary(){
        return this._salary;
    }

    set salary(value: number){
        this._salary = value;
    }

    get expenseCategories(){
        return this._expenseCategories;
    }

    set expenseCategories(value: ExpenseCategory[]){
        this._expenseCategories = value;
    }

}