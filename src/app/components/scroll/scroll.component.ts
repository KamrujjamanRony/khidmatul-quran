import { Component } from '@angular/core';

@Component({
  selector: 'app-scroll',
  imports: [],
  templateUrl: './scroll.component.html',
  styleUrl: './scroll.component.css'
})
export class ScrollComponent {

  constructor() { }

  ngOnInit(): void {

    // Get the button
    const myButton = document.getElementById("btn-back-to-top");

    if (myButton) {
      // When the user scrolls down 20px from the top of the document, show the button
      const scrollFunction = () => {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          myButton.classList.remove("hidden");
        } else {
          myButton.classList.add("hidden");
        }
      };

      const backToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      // When the user clicks on the button, scroll to the top of the document
      myButton.addEventListener("click", backToTop);

      window.addEventListener("scroll", scrollFunction);
    }
  }

}
