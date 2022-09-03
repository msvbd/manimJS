import katex from "katex";
import { fadeIn, fadeOut, moveIn, moveOut, showIn, showOut } from "./animations";
import { DrawGraph } from "./DrawGraph";
import { For } from "./For";
import { Text, TransText } from "./textTransform";
import { MathTex } from "./MathTex";

let slides = document.querySelectorAll(
  "#frames > section"
) as NodeListOf<HTMLElement>;
let slideNumber = 0;
let numOfSlides = slides.length;


/* init transform text */
const textsTrans = document.querySelectorAll(
  "[data-text-transition]"
) as NodeListOf<HTMLElement>;

for (const text of textsTrans) {
  new Text(text);
}


update();

/* web component definition */
customElements.define("for-loop", For);
customElements.define("math-tex", MathTex);
customElements.define("draw-graph", DrawGraph);

/* interaction */
document.addEventListener("click", (e: Event) => {
  slideNumber++;
  if (slideNumber >= numOfSlides) slideNumber = 0;
  update();
});

/* functions */
function update() {
  slides.forEach((slide, i) => {
    if (slide.classList.contains("visible")) {
      for (const element of slide.children) {
        AnimOutElement(element as HTMLElement);
      }
      slide.classList.remove("visible");
    }
    if (i === slideNumber) {
      slide.style.opacity = "1";
      for (const element of slide.children) {        
        AnimInElement(element as HTMLElement);
      }
      slide.classList.add("visible");
    }
  });
}

function AnimOutElement(el: HTMLElement) {
  if (el instanceof DrawGraph) {
    el.animOut();
    return;
  }
  if (el.hasAttribute("data-text-transition")) {
    TransText.transTexts.get(el.dataset.id).animOut()
    showOut(el)
    // fadeOut(el)
    return;
  }
  switch (el.dataset.animOut) {
    case "fade":
      fadeOut(el);
      break;
    case "move":
      moveOut(el);
      break;
    default:
      fadeOut(el);
      break;
  }
}

function AnimInElement(el: HTMLElement) {
  if (el instanceof DrawGraph) {
    el.animIn();
    return;
  }
  if (el.hasAttribute("data-text-transition")) {
    TransText.transTexts.get(el.dataset.id).animIn()
    showIn(el)
    // fadeIn(el)
    return;
  }
  switch (el.dataset.animIn) {
    case "fade":
      fadeIn(el);
      break;
    case "move":
      moveIn(el);
      break;
    default:
      fadeIn(el);
      break;
  }
}
