export class Expense{

    private _date: string;
    private _amount: number;
    private _title: string;
    private _category_id: number;
    private _type: string;
    id!: number | null;

    constructor(id: number | null, title: string, category_id: number, date: string, amount: number, type: string) {
        this._date = date;
        this._amount = amount;
        this._title = title;
        this._category_id = category_id;
        this._type = type;
        this.id = id;
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

    get category_id(): number {
        return this._category_id;
    }

    set category_id(value: number) {
        this._category_id = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }
}