import {http} from '../httpService';

class TaskService {

    async create(taskInput) {
      let result = await http.post('/api/task', taskInput);
      if(result === undefined) return result;
      return result.data;
    }

    async getAll() {
      let result = await http.get('/api/task');
      if(result === undefined) return result;
      return result.data;
    }

    async completedTask(id){
      let result = await http.get('/api/task/complete/' + id);
      if(result === undefined) return result;
      return result.data;
    }

    async rejectTask(id){
      let result = await http.get('/api/task/reject/' + id);
      if(result === undefined) return result;
      return result.data;
    }

    async resetData(){
      let result = await http.get('/api/task/reset-data/');
      if(result === undefined) return result;
      return result.data;
    }

}
  
export default new TaskService();