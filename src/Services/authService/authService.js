
import {http} from '../httpService';

class AuthService {

    async login(loginInput) {
      let result = await http.post('/api/auth/login', loginInput);
      if(result === undefined) return result;
      return result.data;
    }

    async getSessionInformation() {
      let result = await http.get('/api/auth/me');
      if(result === undefined) return result;
      return result.data;
    }

  }
  
  export default new AuthService();
  