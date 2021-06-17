import TodoStore from './todoStore';
import TaskStore from './taskStore';
import AuthStore from './authStore';

export default function initializeStores() {
    return {
      todoStore:new TodoStore(),
      taskStore:new TaskStore(),
      authStore:new AuthStore()
    }
  }
  