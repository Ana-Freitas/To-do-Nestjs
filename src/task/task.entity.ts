export class Task{

    private _id: number;
    private _title: string;
    private _description: string;
    private _createDate: Date;
    private _finishDate: Date;
    private _isDone: boolean; 

    constructor(id: number, title:string, description: string, isDone: boolean){
        this._id = id;
        this._title = title;
        this._description = description;
        this._isDone = isDone
        this._finishDate = new Date();
        this._createDate = new Date();
    }

    public set finishDate(value: Date){
        this._finishDate = value;
    }

    public set createDate(value: Date){
        this._createDate = value;
    }

    public get id(){
        return this._id;
    }
} 