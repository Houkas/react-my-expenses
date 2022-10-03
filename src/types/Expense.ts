export class Expense{

    private _date: string;
    private _amount: number;
    private _title: string;
    private _category: string;
    private _type: string;
    id!: number;

    constructor(title: string, category: string, date: string, amount: number, type: string) {
        this._date = date;
        this._amount = amount;
        this._title = title;
        this._category = category;
        this._type = type;
    }

    get date(): string {
        return this._date;
    }

    set date(value: string) {
        this._date = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }
}