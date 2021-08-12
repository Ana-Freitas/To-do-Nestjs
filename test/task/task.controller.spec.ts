import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../../src/task/task.controller';
import { TaskService } from '../../src/task/task.service';

import sinon = require("sinon");
import { expect } from "chai";
import { Task } from '../../src/task/dto/task.entity';

describe('TaskController', () => {
  let controller: TaskController;
  let testingModule: TestingModule;
  let service: TaskService;

  const mockAllTasks = [
    new Task(1, 'string', 'string', false),
    new Task(2, 'string', 'teste', false),
    new Task(3, 'string', 'teste', false),
    new Task(4, 'string', 'teste', false),
    new Task(5, 'string', 'teste', false),
  ];

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
                {
                  provide: TaskService,
                  useValue: {
                    getAll: () => mockAllTasks,
                    getTask: () => null,
                    deleteTask: () => null,
                    postTask: () => null
                  }
                }
              ],
    }).compile();

    controller = testingModule.get<TaskController>(TaskController);
    service = testingModule.get<TaskService>(TaskService);
  });

  after(async function () {
    testingModule.close();
  });

  it('should be defined', () => {
    expect(controller).to.be.not.undefined;
    expect(service).to.be.not.undefined;
  });

  describe('GET All task', () => {
    it('Should be check length tasks', async () => {
      const allTasks = sinon.stub(service, "getAll");
      const responseTasks = await controller.getAllTask();

      expect(responseTasks).to.be.lengthOf(5);

      sinon.assert.calledOnce(allTasks);
      allTasks.restore();
    });

    it('Should check type of tasks', async () => {
      const allTasks = sinon.spy(service, "getAll");
      const responseTasks = await controller.getAllTask();

      expect(typeof(responseTasks)).to.be.deep.equal(typeof(Array<Task>()));

      sinon.assert.calledOnce(allTasks);
      allTasks.restore();
    });

    it("Should check if haven't tasks", async () => {
      const allTasks = sinon.stub(service, "getAll");
      allTasks.resolves(null)
      const responseTasks = await controller.getAllTask();

      expect(responseTasks).to.be.deep.equal({ message: 'No tasks'});

      sinon.assert.calledOnce(allTasks);
      allTasks.restore();
    });
  })

  describe('GET a task', () => {
    it('Should check if find task by id', async () => {
      const responseTasks = await controller.getTask(99);
      expect(responseTasks).to.be.deep.equal({ message: 'Task not found'});
    });

    it('Should to return task', async () => {
      const task = sinon.stub(service, "getTask");
      task.resolves(new Task(3, 'string', 'string', false))
      const responseTask = await controller.getTask(1);

      expect(responseTask).with.property('id').not.be.equal(1);

      sinon.assert.calledOnce(task);
      task.restore();
    });
  });

  describe('DELETE task', () => {
    it('Should delete a task', async () => {
      const deleteT = sinon.stub(service, "deleteTask");
      deleteT.resolves(mockAllTasks[0]);

      const deleteTask = await controller.deleteTask(1);
      expect(deleteTask).with.property('_title').is.equal('string');
    })

    it('Should return null because task not exists', async () => {
      const deleteTask = await controller.deleteTask(99);
      expect(deleteTask).to.be.null;
    })
  });

  describe('POST task', () => {
    it('Should create a task', () => {
        const postTask = sinon.stub(service, "postTask");
        let taskCreate = new Task(1, 'string', 'string', false);
        postTask.resolves(1);

        const result = controller.postTask(taskCreate);

        expect(result).to.be.not.undefined.not.null;
        postTask.calledWith(taskCreate);
        postTask.restore();
    })
  })


}); 