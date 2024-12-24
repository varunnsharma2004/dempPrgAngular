import { Component, Inject } from '@angular/core';
import { DataServiceService } from '../../Service/data-service.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-add-task',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  priority:any;
  Status:any;
  AddTask:FormGroup;
  isUpdate=false;
  GroupName='';
  id: number = 0;
 
  constructor(private data:DataServiceService,
    @Inject(MAT_DIALOG_DATA) public GrpName: any,
    private model:MatDialog
    ){


      if(typeof GrpName=='string'){
      this.GroupName=GrpName;
      this.isUpdate=false
      }
       this.AddTask=new FormGroup({
      "GroupName":new FormControl(this.GroupName),
      "Title":new FormControl('',[Validators.required]),
      "priority":new FormControl('',[Validators.required]),
      "Status":new FormControl('',[Validators.required]),
      "discription":new FormControl('',[Validators.required]),
    })
 
      if(typeof GrpName=='object'){
        this.isUpdate=true;
        this.id=GrpName[0].Task_id;
        console.log(GrpName,this.id);
         this.AddTask.get("Title")?.setValue(GrpName[0].Title)
          this.AddTask.get("GroupName")?.setValue(GrpName[0].GroupName)
          this.AddTask.get("priority")?.setValue(GrpName[0].Priority)
          this.AddTask.get("Status")?.setValue(GrpName[0].Status)
          this.AddTask.get("discription")?.setValue(GrpName[0].Discription)
      }
      



    this.Status=this.data.Status;
    this.priority=this.data.priority;
   

  }

  taskCreate()
  {
    
    let obj={
      Title:this.AddTask.get("Title")?.value,
  Task_id:Math.floor(Math.random() * 9000) + 1000,
  GroupName:this.AddTask.get("GroupName")?.value,
  Priority:this.AddTask.get("priority")?.value,
  Status:this.AddTask.get("Status")?.value,
  Discription:this.AddTask.get("discription")?.value,
    }
    debugger
    this.data.seed.push(obj);
    if(this.data.seed){
      console.log(this.data.seed)
      localStorage.setItem('taskData', JSON.stringify(this.data.seed));  
      this.model.closeAll();

    }
  }
  UpdateTask(){
    let obj={

      Title:this.AddTask.get("Title")?.value,
      
  Task_id:this.id,
  GroupName:this.AddTask.get("GroupName")?.value,
  Priority:this.AddTask.get("priority")?.value,
  Status:this.AddTask.get("Status")?.value,
  Discription:this.AddTask.get("discription")?.value,
    }
    this.data.updateArrayById(this.id,obj);
    this.model.closeAll();
  }

}
