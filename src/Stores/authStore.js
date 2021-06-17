import { makeAutoObservable } from "mobx"
import authService from '../Services/authService/authService';

class AuthStore {
   session = {
    department: 0,
    email: "",
    id:0,
    name: "",
    title:""
   }
   
   constructor() {
    makeAutoObservable(this)
   }
  
    async login(loginInput){
        var res = await authService.login(loginInput);
        return res;
    }

    async getSessionInformation(){
      var res = await authService.getSessionInformation();
      if(res !== undefined){
        this.session = res.payload;
      }
    }
  }
  
  export default AuthStore;