import { Component } from '@angular/core';
import { Card1Component } from "../../../components/shared/text/card1";

@Component({
    selector: 'app-shajara',
    templateUrl: './shajara.component.html',
    styleUrl: './shajara.component.css',
    imports: [Card1Component]
})
export class ShajaraComponent {
    download(): void {
        const pdfUrl = '../../../../assets/shajara.pdf';
        const fileName = 'shajara.pdf';
    
        // Create an anchor element
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = fileName;
    
        // Append the anchor element to the body
        document.body.appendChild(a);
    
        // Programmatically trigger a click event on the anchor element
        a.click();
    
        // Remove the anchor element from the body
        document.body.removeChild(a);
      }
}
