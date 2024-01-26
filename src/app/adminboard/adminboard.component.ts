import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adminboard',
  standalone: true,
  imports: [],
  templateUrl: './adminboard.component.html',
  styleUrl: './adminboard.component.css'
})
export class AdminboardComponent implements OnInit{

  content?: string; 

  constructor(private userService: UserService){} 
  ngOnInit(): void {
     this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if(err.error) {
          try {
            const res = JSON.parse(err.error); 
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
     });
  }

}
