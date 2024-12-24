import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { DataServiceService } from '../../Service/data-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-group',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css'
})
export class AddGroupComponent {

  constructor(private data:DataServiceService,private modaleService:MatDialog){
  console.log(this.data.getGroup())
  }
  GroupName:String='';
addGroup(groupNameInput: any){
  if(this.GroupName!=='' || this.GroupName){
  this.data.addTaskGroup(this.GroupName);

  this.modaleService.closeAll();
  
  Swal.fire({
    title: "Group Created",
    text: "Your Group is Created",
    icon: "success"
  });

}
  else
  groupNameInput.control.markAsTouched();
}
}
