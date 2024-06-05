import { Observable } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [RouterLink]
})
export class SidebarComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {}

}
