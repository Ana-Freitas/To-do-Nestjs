// import { Test, TestingModule } from '@nestjs/testing';
// import { TaskService } from '../../src/task/task.service';
// import { expect } from "chai";
// import sinon = require("sinon");
// import { CreateTaskDto } from '../../src/task/dto/create-task.dto';
// import { TaskDocument, TaskSchema } from '../../src/task/dto/task.schema';
// import * as mongoose from 'mongoose';

// describe('TaskService', () => {
//     let service: TaskService;
//     let testingModule: TestingModule;

//     const createDate = new Date();
//     const finishDate = new Date()
//     const mockAllTasks = new Array();
//     for(let id = 0; id < 5; id++){
//         mockAllTasks.push({ _id: id+1, title: "string", description: "string", createDate: createDate, finishDate: finishDate, isDone: false });
//     }

//     const mock = {
// 		getById: () => null,
// 		getAll: () => null,
// 		remove: () => null,
// 		save: () => null
//     }

//     const TASK_MODEL:mongoose.Model<TaskDocument> =  mongoose.model('TaskModel', TaskSchema);
//     let model_task;

//     beforeEach(async () => {
//         testingModule = await Test.createTestingModule({
//             providers: [TaskService,
//                 {
//                     provide: TASK_MODEL,
//                     useFactory: () => mock
//                 }
                
//             ],
//         }).compile();

//         service = testingModule.get<TaskService>(TaskService);
//         model_task = await testingModule.get<mongoose.Model<TaskDocument>>(TASK_MODEL);
        
//     });

//     after(async function () {
//         testingModule.close();
//     });

//     it('should be defined', () => {
//         expect(service).to.be.not.undefined;
//     });

//     describe('Get all task', () => {
//         it('Should return anything', async () => {
//             const allTasks = await service.findAll();
//             expect(allTasks).to.be.not.undefined.not.null;
//         })

//         it('Should return all tasks', async () => {
//             const allTasks = await service.findAll();
//             expect(allTasks).to.be.lengthOf(mockAllTasks.length)
//         })
//     })

//     describe('Get a task', () => {
//         it('Should return anything', async () => {
//             const task = await service.findOne(1);
//             expect(task).to.be.not.undefined.not.null;
//         });

//         it('Should return a task', async () => {
//             const task = await service.findOne(1);
//             expect(task).with.property('title').equal('string');
//         })
//     })

//         describe('Get a task', () => {
//             describe('Get By Id', () => {
//                 it('Should return anything', async () => {
//                     const task = await service.findOne(1);
//                     expect(task).to.be.not.undefined.not.null;
//                 });
        
//                 it('Should return a task', async () => {
//                     const task = await service.findOne(1);
//                     expect(task).with.property('title').equal('string');
//                 })
//             })

//             describe('Get By User', () => {

//             })

//     })

//     describe('Post  task', () => {
//         it('Should return task added', async () => {
//             const task: CreateTaskDto = {
//                 _id: 3,
//                 title: 'string',
//                 description: 'string',
//                 createDate: createDate,
//                 finishDate: finishDate,
//                 isDone: false
//             }
//             const index = await service.create(task, 1);
//             expect(index).to.be.not.undefined.not.null;
//             expect(index).to.be.deep.equal(task);
//         });
//     });

//     // describe('Delete a  task', () => {
//     //     it('Should return a task deleted', async () => {
//     //         const taskDeleted = await service.deleteTask(1);
//     //         expect(taskDeleted).to.be.not.undefined.not.null;
//     //         expect(taskDeleted).with.property('id').equal(1);
//     //     });
//     // });
// });