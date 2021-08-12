import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../../src/task/task.service';
import { expect } from "chai";
import sinon = require("sinon");
import { Task } from '../../src/task/dto/task.entity';

describe('TaskService', () => {
    let service: TaskService;
    let testingModule: TestingModule;

    const mockAllTasks = [
        new Task(1, 'string', 'string', false),
        new Task(2, 'string', 'teste', false),
        new Task(3, 'string', 'teste', false),
        new Task(4, 'string', 'teste', false),
        new Task(5, 'string', 'teste', false),
    ];

    const mockService = {
        getTask: (id: number) => mockAllTasks[0],
        getAll: () => mockAllTasks,
        postTask: (task: Task) => 0,
        deleteTask: (id: number) =>  mockAllTasks[0]
    }

    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: TaskService,
                    useValue: mockService
                },
            ],
        }).compile();

        service = testingModule.get<TaskService>(TaskService);
    });

    after(async function () {
        testingModule.close();
    });

    it('should be defined', () => {
        expect(service).to.be.not.undefined;
    });

    describe('Get all task', () => {
        it('Should return anything', async () => {
            const allTasks = await service.getAll();
            expect(allTasks).to.be.not.undefined.not.null;
        })

        it('Should return all tasks', async () => {
            const allTasks = await service.getAll();
            expect(allTasks).to.be.lengthOf(mockAllTasks.length)
        })
    })

    describe('Get a task', () => {
        it('Should return anything', async () => {
            const task = await service.getTask(1);
            expect(task).to.be.not.undefined.not.null;
        });

        it('Should return a task', async () => {
            const task = await service.getTask(1);
            expect(task).with.property('_title').equal('string');
        })
    })

    describe('Post  task', () => {
        it('Should return index task', async () => {
            const task = new Task(1, 'string', 'string', false);
            const index = await service.postTask(task);
            expect(index).to.be.not.undefined.not.null;
            expect(index).to.be.equal(0);
        });
    });

    describe('Delete a  task', () => {
        it('Should return a task deleted', async () => {
            const taskDeleted = await service.deleteTask(1);
            expect(taskDeleted).to.be.not.undefined.not.null;
            expect(taskDeleted).with.property('id').equal(1);
        });
    });
});