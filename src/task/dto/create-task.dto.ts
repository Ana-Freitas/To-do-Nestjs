export class CreateTaskDto {
    readonly _id: number;
    readonly title: string;
    readonly description: string;
    readonly createDate: Date;
    readonly finishDate: Date;
    readonly isDone: boolean;
}