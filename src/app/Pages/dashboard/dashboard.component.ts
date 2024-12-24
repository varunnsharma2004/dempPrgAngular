import { Component, Inject, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';   
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupComponent } from '../../Model/add-group/add-group.component';
import { DataServiceService } from '../../Service/data-service.service';
import { AddTaskComponent } from '../add-task/add-task.component';
@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,MatToolbarModule,MatButtonModule,MatLabel,MatFormField,MatIconModule,CommonModule,MatSelect,MatOption],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  priority:String[]=['High',"Normal","Low"];
  Status:String[]=['In-Progress',"Complete","Close","Reopen","New"];
  UserTaskBook:any[]=[]
  Groups:any
  seeds:any;
  constructor(private modaleService:MatDialog,private data:DataServiceService,@Inject(PLATFORM_ID) private platformId: Object){

    this.Groups=this. getGroup() 
    if(this.Groups.length==0)
    this.Groups=this.data.Group;
    console.log(this.Groups)
    this.seeds=this.data.seed;
    debugger
    
  }

 
  getGroup() {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem('group');
      if (storedData) {
        return JSON.parse(storedData);
      }
    }
    return []; // Return empty array if no data or in non-browser environments
  }
  openModal(): void {
    this.modaleService.open(AddGroupComponent, {
      width: '400px',   
      height: '200px',
      data: {
        title: 'My Custom Title',  
      }
    
    });
  }
  openTaskModal(grpName:any){
    this.modaleService.open(AddTaskComponent,{
      width: '500px',   
      height: '600px',
      data: grpName

    })
  }
  removeGroup(id:any)
  {
    this.Groups.splice(id,1);
    this.data.setGroup(this.Groups)
  }
  updateTask(data:any,update=true){
    this.modaleService.open(AddTaskComponent,{
      width: '500px',   
      height: '600px',
      data: [data,update]

    })
  }
}
