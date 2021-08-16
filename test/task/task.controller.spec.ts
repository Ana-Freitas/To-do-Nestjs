import { Test, TestingModule } from "@nestjs/testing";
import { TaskController } from "../../src/task/task.controller";
import { TaskService } from "../../src/task/task.service";

import sinon = require("sinon");
import { expect } from "chai";
import { Task } from "../../src/task/dto/task.entity";
import { CreateTaskDto } from "../../src/task/dto/create-task.dto";


describe("TaskController", () => {
  let controller: TaskController;
  let testingModule: TestingModule;
  let service: TaskService;

  const mockAllTasks = new Array();
  for(let id = 0; id < 5; id++){
    mockAllTasks.push({ _id: id+1, title: "string", description: "string", user: 1 });
  }

  const mockUpdate = { _id: 1, title: "atualizada", description: "string" };

  const mockByUser = [
    { _id: 1, title: "atualizada", description: "string" , user: 1},
    { _id: 2, title: "atualizada", description: "string" , user: 1},
  ]

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
                {
                  provide: TaskService,
                  useValue: {
                    findAll: () => mockAllTasks,
                    findOne: () => mockAllTasks[1],
                    delete: () => mockAllTasks[0],
                    create: () => mockAllTasks[2],
                    updateTask: () => mockUpdate,
                    findByUser: () => mockByUser
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

  it("should be defined", () => {
    expect(controller).to.be.not.undefined;
    expect(service).to.be.not.undefined;
  });

  describe("GET All task", () => {
    it("Should be check length tasks", async () => {
      const allTasks = sinon.spy(service, "findAll");
      const responseTasks = await controller.getAllTask();

      expect(responseTasks).to.be.lengthOf(5);

      sinon.assert.calledOnce(allTasks);
      allTasks.restore();
    });

    it("Should check type of tasks", async () => {
      const allTasks = sinon.spy(service, "findAll");
      const responseTasks = await controller.getAllTask();

      expect(typeof(responseTasks)).to.be.deep.equal(typeof(Array<Task>()));

      sinon.assert.calledOnce(allTasks);
      allTasks.restore();
    });

    it("Should check if haven't tasks", async () => {
      const allTasks = sinon.stub(service, "findAll");
      allTasks.resolves(null)
      const responseTasks = await controller.getAllTask();

      expect(responseTasks).to.be.deep.equal({ message: "No tasks"});

      sinon.assert.calledOnce(allTasks);
      allTasks.restore();
    });
  })

  describe("GET All user task's", () =>{

    const request = { 
      user: { userId: 1, username: "Teste" }
    };

    it("Should return all user task's ", async () => {

      const getByUser = sinon.spy(service, "findByUser");
      const allTask = await controller.getTaskByUser(request);

      expect(allTask).to.be.not.undefined.not.null;
      expect(allTask).to.be.lengthOf(mockByUser.length);

      getByUser.calledOnceWith(request.user.userId);
      getByUser.restore();

    })

    it("Shouldn't return undefined ", async () => {
      const getByUser = sinon.stub(service, "findByUser");
      getByUser.resolves(null);

      const allTask = await controller.getTaskByUser(request);

      expect(allTask).to.be.null;

      getByUser.calledOnceWith(request.user.userId);
      getByUser.restore();

    })
  })

  describe("GET a task", () => {
    it("Should check if find task by id", async () => {
      const findOne = sinon.stub(service, "findOne");
      findOne.resolves(null);

      const responseTasks = await controller.getTask(99);
      expect(responseTasks).to.be.deep.equal({ message: "Task not found"});

      sinon.assert.calledOnce(findOne);
      findOne.restore();
    });

    it("Should to return task", async () => {
      const responseTask = await controller.getTask(2);
      expect(responseTask).with.property("_id").to.be.equal(2);
    });

  });

  describe("DELETE task", () => {
    const token = { user: { userId: 1, username: "Teste" }};
    it("Should delete a task", async () => {
      const deleteTask = await controller.deleteTask(1, token);
      expect(deleteTask).with.property("title").is.equal("string");
    })

    it("Should return null because task not exists", async () => {
      const deleteT = sinon.stub(service, "delete");
      deleteT.resolves(null);
      const deleteTask = await controller.deleteTask(99, token);
      expect(deleteTask).to.be.null;

      deleteT.calledOnceWith(1, token.user.userId);
      deleteT.restore();
    })
  });

  describe("POST task", () => {

    const token = { user: { userId: 1, username: "Teste" }};

    it("Should create a task", async () => {
        let taskCreate: CreateTaskDto = {
          _id: 3,
          title: "string",
          description: "string",
          createDate: new Date(),
          finishDate: new Date(),
          isDone: false
        }

        const result = await controller.postTask(token, taskCreate);
        expect(result).to.be.not.undefined.not.null;
        expect(result).with.property("_id").to.be.equal(3);
    })

    it("Shouldn't create a task", async () => {
      const create = sinon.stub(service, "create");
      create.resolves(undefined);

      const result = await controller.postTask(token, null);
      expect(result).to.be.undefined;

      create.calledOnceWith(null, token);
      create.restore();

    });
  })

  describe("PATCH task", () => {
    it("Should return task updated", async () => {
      const updateTask = sinon.spy(service, "updateTask");

      const taskUpdate = { 
        body: {description: "atualizada"},
        user: { userId: 1, username: "Teste" }
      };

      const task = await controller.updateTask(1,taskUpdate);
      expect(task).to.be.not.null.not.undefined;
      expect(task).with.property('_id').to.be.equal(1);

      updateTask.calledOnceWith(1, taskUpdate.body, taskUpdate.user.userId );
      updateTask.restore();
    });
  })
}); 