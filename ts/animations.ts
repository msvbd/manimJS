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

export function fadeOut(el: HTMLElement) {
  anim(1, 0, (val: number) => {
    el.style.opacity = val + "";
  });
}
export function fadeIn(el: HTMLElement) {
  anim(0, 1, (val: number) => {
    el.style.opacity = val + "";
  });
}
export function showOut(el: HTMLElement) {
  anim(1, 0, (val: number) => {
    el.style.opacity = Math.ceil(val) + "";
  });
}
export function showIn(el: HTMLElement) {
  el.style.opacity = "1";
}
export function showInEnd(el: HTMLElement) {
  anim(0, 1, (val: number) => {
    el.style.opacity = Math.floor(val) + "";
  });
}
export function moveOut(el: HTMLElement) {
  anim(1, 0, (val: number) => {
    el.style.opacity = "1";
    el.style.transform = "translate(" + (-400 + val * 400) + "px, 0px)";
  });
}
export function moveBy(el: HTMLElement, dx : number, dy : number) {
  // let curLeft = el.style.left;
  // let curTop = el.style.top;
  // console.log(curLeft);
  // console.log(curTop);
  anim(0, 1, (val: number) => {
    el.style.opacity = "1";
    // el.style.transform = `translate(${val*dx}px, 100px)`;
    el.style.position = `relative`;
    el.style.left = `${val*dx}px`;
    el.style.top = `${val*dy}px`;
    // el.style.transform = "translate(" + (400 - val * 400) + "px, 0px)";
  });
}
export function moveIn(el: HTMLElement) {
  anim(0, 1, (val: number) => {
    el.style.opacity = 1 + "";
    el.style.transform = "translate(" + (400 - val * 400) + "px, 0px)";
  });
}
export function turnRedOut(el: HTMLElement) {
  anim(0, 1, (val: number) => {
    // el.style.opacity = Math.ceil(val) + "";
    el.style.color = `rgb(${255 * val},0,0)`;
  });
}
export function turnRedIn(el: HTMLElement) {
  anim(1, 0, (val: number) => {
    // el.style.opacity = 1 + "";
    el.style.color = `rgb(${255 * val},0,0)`;
  });
}
export function rotateOut(el: HTMLElement) {
  anim(1, 0, (val: number) => {
    el.style.opacity = Math.ceil(val) + "";
    el.style.transformOrigin = "center";
    el.style.transform =
      "translate(" +
      (-400 + val * 400) +
      "px, 0px) rotate(" +
      val * 360 +
      "deg)";
  });
}
export function rotateIn(el: HTMLElement) {
  anim(0, 1, (val: number) => {
    el.style.opacity = 1 + "";
    el.style.transformOrigin = "center";
    el.style.transform =
      "translate(" +
      (400 - val * 400) +
      "px, 0px) rotate(" +
      -val * 360 +
      "deg)";
  });
}
