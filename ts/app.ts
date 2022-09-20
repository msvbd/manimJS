// import katex from "katex";
import {
  fadeIn,
  fadeOut,
  moveIn,
  moveOut,
  rotateIn,
  rotateOut,
  showIn,
  showInEnd,
  showOut,
} from "./animations";
import { DrawGraph } from "./DrawGraph";
import { For } from "./For";
import { Text, TransText } from "./textTransform";
import { MathTex, TransMath } from "./MathTex";
import { DrawGraphChartJS } from "./DrawGraph_chartJS";

let slides = document.querySelectorAll(
  "#frames > section"
) as NodeListOf<HTMLElement>;
let slideNumber:number = +window.location.hash.slice(1) || 0;
let numOfSlides:number = slides.length;

if(!window.location.hash) {
  window.location.hash = slideNumber+"";
}

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
customElements.define("draw-graph-chartjs", DrawGraphChartJS);

/* interaction */
document.addEventListener("keydown", (e: KeyboardEvent) => {
  if(e.key === "ArrowRight") {
    slideNumber++;
  } else
  if(e.key === "ArrowLeft") {
    slideNumber--;
  } else {return}
  
  if (slideNumber < 0) slideNumber = numOfSlides;
  if (slideNumber >= numOfSlides) slideNumber = 0;
  window.location.hash = slideNumber+"";
  update();
});
// document.addEventListener("click", (e: Event) => {
//   slideNumber++;
//   if (slideNumber >= numOfSlides) slideNumber = 0;
//   window.location.hash = slideNumber+"";
//   update();
// });

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
  if (el instanceof DrawGraphChartJS) {
    el.animOut();
    return;
  }
  if (el instanceof MathTex) {
    const me = TransMath.transMath.get(el.dataId || '');
    if(me !== undefined)
      me.animOut()
    // el.animOut();
    showOut(el);
    return;
  }
  if (el.hasAttribute("data-text-transition")) {
    TransText.transTexts.get(el.dataset.id).animOut();
    showOut(el);
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
    case "rotate":
      rotateOut(el);
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
  if (el instanceof DrawGraphChartJS) {
    el.animIn();
    return;
  }
  if (el instanceof MathTex) {
    const me = TransMath.transMath.get(el.dataId || '');
    if(me === undefined) console.warn("anim in is undefined", TransMath.transMath);
    
    if(me !== undefined) 
      me.animIn()
    // el.animIn();
    showIn(el);
    return;
  }
  if (el.hasAttribute("data-text-transition")) {
    TransText.transTexts.get(el.dataset.id).animIn();
    showIn(el);
    //fadeIn(el)
    return;
  }
  switch (el.dataset.animIn) {
    case "fade":
      fadeIn(el);
      break;
    case "move":
      moveIn(el);
      break;
    case "rotate":
      rotateIn(el);
      break;
    default:
      fadeIn(el);
      break;
  }
}
