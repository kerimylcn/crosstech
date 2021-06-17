import { makeAutoObservable } from "mobx";
import taskService from "../Services/taskService/taskService";

class TaskStore {
  tasks = []; // task listesi
  completedTasks = [];
  rejectedTasks = [];
  pendingTasks = [];
  selectedTask = {
    id: 0,
    title: "",
    description: "",
    status: 0,
    assignedDepartment: 0,
    user: {
      name: "",
      id: 0,
    },
  };

  constructor() {
    makeAutoObservable(this);
  }

  async resetData() {
    await taskService.resetData();
    this.tasks = [];
    this.taskGroups();
  }

  selectTask(id) {
    var selectedTask = this.tasks.find((x) => x.id === id);
    if (selectedTask !== undefined) {
      this.selectTask = selectedTask;
    }
  }

  async rejectTask(id) {
    var res = await taskService.rejectTask(id);

    var findTaskIndex = this.tasks.findIndex((x) => x.id === id);
    if (findTaskIndex !== -1) {
      var preData = Array.from(this.tasks);
      preData[findTaskIndex].status = 2;
      this.tasks = preData;
    }
    this.taskGroups();
  }

  async completedTask(id) {
    var res = await taskService.completedTask(id);

    var findTaskIndex = this.tasks.findIndex((x) => x.id === id);
    if (findTaskIndex !== -1) {
      var preData = Array.from(this.tasks);
      preData[findTaskIndex].status = 1;
      this.tasks = preData;
    }
    this.taskGroups();
  }

  async create(taskInput) {
    var res = await taskService.create(taskInput);
    if (res !== undefined) {
      this.tasks.push(res.payload);
    }
    this.taskGroups();
  }

  async getAll() {
    var res = await taskService.getAll();
    if (res !== undefined) {
      this.tasks = res.payload;
      console.log(res.pasyload);
    }
    this.taskGroups();
  }

  getRejectedasks() {
    return this.tasks.filter((x) => x.status === 1 && x.status === 0);
  }
  getCompletedTasks() {
    return this.tasks.filter((x) => x.status === 0 && x.status === 2);
  }
  getPendingTasks() {
    return this.tasks.fill((x) => x.status === 1 && x.status === 2);
  }

  taskGroups() {
    this.completedTasks = [];
    this.rejectedTasks = [];
    this.pendingTasks = [];
    this.tasks.forEach((item) => {
      switch (item.status) {
        case 0:
          this.pendingTasks.push(item);
          break;
        case 1:
          this.completedTasks.push(item);
          break;
        case 2:
          this.rejectedTasks.push(item);
          break;
      }
    });
  }

  addTask = (task) => {
    this.tasks.push(task);
  };

  removeTask = (id) => {
    const removeArr = [...this.tasks].filter((todo) => todo.id !== id);
    this.tasks = removeArr;
  };
}

export default TaskStore;
