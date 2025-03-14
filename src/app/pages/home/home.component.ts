import { Component } from '@angular/core';
import { BannerComponent } from "../../components/banner/banner.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [BannerComponent]
})
export class HomeComponent {
}
