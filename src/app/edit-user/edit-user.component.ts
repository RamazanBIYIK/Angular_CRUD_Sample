import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserModel } from "../model/user/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { ApiService } from "../api.service";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.css"]
})
export class EditUserComponent implements OnInit {
  user: UserModel;
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    var userId = window.localStorage.getItem("editUserId"); //normalde let vardı. Ben var verdim.
    if (!userId) {
      alert("Geçersiz işlem!!!");
      this.router.navigate(["list-user"]);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [""],
      username: ["", Validators.required],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      age: ["", Validators.required],
      salary: ["", Validators.required]
    });

    this.apiService.getUserById(+userId).subscribe(data => {
      this.editForm.setValue = data.result;
    });
  }

onSubmit(){
  this.apiService.updateUser(this.editForm.value).pipe(first()).subscribe(
    data=>{
      if(data.statusCode==200){
        alert('Kullancı başarıyla update edildi.');
        this.router.navigate(['list-user']);
      }
      else{
        alert(data.message);
      }
    },
    error=>{
      alert(error);
    }
    
  )
}

}
