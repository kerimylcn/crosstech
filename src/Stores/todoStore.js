import { makeAutoObservable } from "mobx"


class TodoStore {
   testCounter = 0;
   tasks = []; // task listesi

   constructor() {
    makeAutoObservable(this)
}
  
    addCounter = async () => {
      this.testCounter += 1;
    };

    addTask = async (newTask) => {
      this.tasks.push(newTask);
    }
  }
  
  export default TodoStore;