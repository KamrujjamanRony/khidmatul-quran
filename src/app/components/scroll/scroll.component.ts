import { Component } from '@angular/core';
import { Ripple, initTE } from "tw-elements";

@Component({
  selector: 'app-scroll',
  standalone: true,
  imports: [],
  templateUrl: './scroll.component.html',
  styleUrl: './scroll.component.css'
})
export class ScrollComponent {

  constructor() { }

  ngOnInit(): void {
    // Initialize TE and Ripple
    initTE({ Ripple },
      { allowReinits: true });

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
