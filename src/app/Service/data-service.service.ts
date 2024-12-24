import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, findIndex } from 'rxjs';
import { Task } from '../task.model';
 

@Injectable({
  providedIn: 'root'
})
export class DataServiceService  {
  priority:String[]=['High',"Normal","Low"];
  Status:String[]=['In-Progress',"Complete","Close","Reopen","New"];
TaskBook=[];
Group:any=['School','Home','Tution'];
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
  
  }
seed:Task[]=[];
Seed: BehaviorSubject<any> = new BehaviorSubject<any>(this.seed);
grpData:BehaviorSubject<any> = new BehaviorSubject<any>(this.Group);

setGroup(group: any) {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('group', JSON.stringify(group));
  }
}
getGroup()
{
return localStorage.getItem('group');
}
setSeed(seed:any): void {
  localStorage.setItem('taskData', JSON.stringify(seed));  
}
 getSeed(){
  return  localStorage.getItem('taskData');
 
}

  addTaskGroup(name:any){
    this.Group.push(name);
    this.setGroup(this.Group);
    debugger
  }

  findTaskIndex(id: number): number {
    return this.seed.findIndex((rs) => rs.Task_id === id);
  }
  updateArrayById(id: number, updatedData: any): void {
    const indx = this.findTaskIndex(id);   

    if (indx !== -1) {
      this.seed[indx] = { ...this.seed[indx], ...updatedData };
      console.log(`Task with ID ${id} has been updated.`);
    } else {
      console.log(`Task with ID ${id} not found.`);
    }
  }
}
