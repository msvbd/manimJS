import { DrawGraph } from "./DrawGraph";
import { MathTex } from "./MathTex";

let slides = document.querySelectorAll("#frames > section") as NodeListOf<HTMLElement>;
let slideNumber = 0;
let numOfSlides = slides.length;

update();

customElements.define("math-tex", MathTex)
customElements.define("draw-graph", DrawGraph)

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
      hideSlide(slide);
      slide.classList.remove("visible");
    }
    if (i === slideNumber) {
      showSlide(slide);
      slide.classList.add("visible");
    }
  });
}

function hideSlide(slide: HTMLElement) {
  anim(1, 0, (val: number) => {
    slide.style.opacity = val + "";
  });
}

function showSlide(slide: HTMLElement) {
  anim(0, 1, (val: number) => {
    //console.log("callback", val);
    slide.style.opacity = val + "";
  });
}

function anim(initVal: number, endValue: number, cb: (curVal: number) => void) {
  let startTime = Date.now();
  let curTime: number;
  let duration = 1000;

  step();

  function step() {
    curTime = Date.now();
    let time = curTime - startTime;

    let param = Math.min(time / duration, 1);
    let newVal =
      initVal + (endValue - initVal) * (-(Math.cos(Math.PI * param) - 1) / 2);
    // let newVal = initVal + (endValue - initVal) * param;

    cb(newVal);

    if (time <= duration) {
      window.requestAnimationFrame(step);
    }
  }
}
