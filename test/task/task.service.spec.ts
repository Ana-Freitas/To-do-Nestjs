import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../../src/task/task.service';
import { expect } from "chai";
import sinon = require("sinon");
import { TaskDocument } from '../../src/task/dto/task.schema';
import * as mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateTaskDto } from '../../src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';

describe('TaskService', () => {
    let service: TaskService;
    let testingModule: TestingModule;

    const createDate = new Date();
    const finishDate = new Date()
    const mockAllTasks = new Array();

    for(let id = 0; id < 5; id++){
        mockAllTasks.push({ _id: id+1, title: "string", description: "string", createDate: createDate, finishDate: finishDate, isDone: false, user: 1 });
    }

    for(let id = 5; id < 10; id++){
        mockAllTasks.push({ _id: id+1, title: "string", description: "string", createDate: createDate, finishDate: finishDate, isDone: false, user: 2});
    }

    const mockModel = {
		find: () => mockAllTasks,
        findOne: () => mockAllTasks[0],
        findOneAndUpdate: () => mockAllTasks[0],
        findOneAndDelete: () => mockAllTasks[0],
        findById: () => mockAllTasks[0],
        prototype:  {
            save: () =>  mockAllTasks[0],
            constructor(taskModel): void {}
        },
        
    }

    let model_task: mongoose.Model<TaskDocument>;

    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            providers: [TaskService,
                {
                    provide: getModelToken("TaskModel"),
                    useFactory: () => mockModel
                }
                
            ],
        }).compile();

        service = await testingModule.get<TaskService>(TaskService);
        model_task = await testingModule.get<mongoose.Model<TaskDocument>>(getModelToken("TaskModel"));
        
    });

    after(async function () {
        testingModule.close();
    });

    it('should be defined', () => {
        expect(service).to.be.not.undefined;
    });

    describe('Get all task', () => {

        it('Should return anything', async () => {
            const findMongo = sinon.spy(model_task, "find");
            const allTasks = await service.findAll();
            expect(allTasks).to.be.not.undefined.not.null;
            findMongo.calledOnce;
            findMongo.restore();
        })

        it('Should return all tasks', async () => {
            const findMongo = sinon.spy(model_task, "find");
            const allTasks = await service.findAll();
            expect(allTasks).to.be.lengthOf(mockAllTasks.length)
            findMongo.calledOnce;
            findMongo.restore();
        })
    })

   

        describe('Get a task', () => {
            describe('Get task by Id', () => {
                it('Should return anything', async () => {
                    const findMongo = sinon.spy(model_task, "findById");
                    const task = await service.findOne(1);
        
                    expect(task).to.be.not.undefined.not.null;
        
                    findMongo.calledOnce;
                    findMongo.restore();
                });
        
                it("Should return a task with title equal 'string'", async () => {
                    const findMongo = sinon.spy(model_task, "findById");
                    const task = await service.findOne(1);
                    
                    expect(task).with.property('title').equal('string');
        
                    findMongo.calledOnce;
                    findMongo.restore();
                })
            })

            describe('Get By User', () => {
                it('Should return all anything', async () => {
                    const findMongo = sinon.stub(model_task, "find");
                    findMongo.resolves(mockAllTasks.filter(x=> x.user == 2));

                    const taskUser = await service.findByUser(2);
                    expect(taskUser).to.be.not.null.not.undefined;
                    expect(taskUser.length).to.be.greaterThan(0);
                    
                    findMongo.calledOnce;
                    findMongo.restore();
                })

                it('Should return all tasks by user', async () => {
                    const findMongo = sinon.stub(model_task, "find");
                    findMongo.resolves(mockAllTasks.filter(x=> x.user == 2));

                    const taskUser= await service.findByUser(2);
                    expect(taskUser).to.be.not.null.not.undefined;
                    expect(taskUser[0]).with.property('user').to.be.equal(2);

                    findMongo.calledOnce;
                    findMongo.restore();
                })
            })
    })

    describe('Delete a  task', () => {
        it('Should return a task deleted', async () => {
            const taskDeleted = await service.delete(1, 1);
            expect(taskDeleted).to.be.not.undefined.not.null;
            expect(taskDeleted).with.property('_id').equal(1);
            expect(taskDeleted).with.property('user').equal(1);
        });
    });

    describe('Update a  task', () => {
        it('Should return a task updated', async () => {

            const task: UpdateTaskDto = {
                description: 'Apenas um teste',
            }

            const taskDeleted = await service.updateTask(1, task, 1);

            expect(taskDeleted).to.be.not.undefined.not.null;
            expect(taskDeleted).with.property('_id').equal(1);
            expect(taskDeleted).with.property('user').equal(1);
        });
    });

    // describe('Post  task', () => {
    //     it('Should return task added', async () => {
    //          const findMongo = sinon.stub(model_task, "findById");
    //          findMongo.resolves(null);

    //          const task: CreateTaskDto = {
    //             _id: 1,
    //             title: 'string',
    //             description: 'string',
    //             createDate: createDate,
    //             finishDate: finishDate,
    //             isDone: false,
    //         }

    //         const save = sinon.spy(model_task.prototype, "save");
    //         const constructorInstance = sinon.spy(model_task.prototype, "constructor");

    //         const index = await service.create(task, 1);
    //         expect(index).to.be.not.undefined.not.null;
    //         // expect(index).to.be.deep.equal(task);

    //         save.calledWithNew();
    //         save.restore();

    //         constructorInstance.calledWith(task);
    //         save.restore();


    //         findMongo.calledOnce;
    //         findMongo.restore();
    //     });
    // });

});