import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from '../model/user/user.model';
import {ApiService} from '../api.service'



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: UserModel[];
  constructor(private router:Router, private apiService:ApiService) { }

  ngOnInit() {
    debugger;
    if(!window.localStorage.getItem('token')){
      debugger;
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getLast10Users().subscribe(data=>{
      debugger;
      this.users=data.result;
    })

  };

  deleteUser(user: UserModel): void {
    this.apiService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user:UserModel):void{
    window.localStorage.removeItem('editUserId');
    window.localStorage.setItem("editUserId",user.id.toString())
    this.router.navigate(['edit-user']);
    
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };

}
