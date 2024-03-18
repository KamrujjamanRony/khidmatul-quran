import { Component } from '@angular/core';
import { arabiData } from '../../features/data/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arabic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arabic.component.html',
  styleUrl: './arabic.component.css'
})
export class ArabicComponent {
  arabicLanguage: any[] = arabiData;
  toggleCollapse(index: number): void {
    this.arabicLanguage[index].isExpanded = !this.arabicLanguage[index].isExpanded;
  }

//   chartOptions = {
//     animationEnabled: true,
//     title: {
//       text: "Haemoglobin Electrophoresis"
//     },
//     axisY: {
//       title: "Area",
//     },
//     axisX: {
//       title: "Time",
//     },
//     data: [{
//       type: "splineArea",
//       color: "rgba(54,158,173,.7)",
//       dataPoints: chartData1.map(person => ({
//         label: person?.name,
//         y: person?.units
//       }))
//     }]
//   };

//   let i = 0;

}
