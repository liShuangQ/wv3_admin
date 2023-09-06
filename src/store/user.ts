import { defineStore } from "pinia";
export default defineStore("user", {
  state: () => {
    return {
      info:{},
    };
  },
  actions: {
    getInfo():any {
      return this.info;
    },
    setInfo(d:any):void{
      this.info = d
    },

  },
});
