export class For extends HTMLElement {
  from = 0;
  to = 0;
  step = 1;
  toRepeat = "";
  iterator = "i";
  mySlot: HTMLSlotElement;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    if (this.hasAttribute("data-from")) this.from = +this.dataset.from!;
    if (this.hasAttribute("data-to")) this.to = +this.dataset.to!;
    if (this.hasAttribute("data-i")) this.iterator = this.dataset.i!;
    if (this.hasAttribute("data-step"))
      this.step = this.dataset.step === undefined ? 1 : +this.dataset.step;

    if (this.step === 0) this.step = 1;
    if (this.from > this.to && this.step > 0) this.step *= -1;

    this.toRepeat = this.innerHTML;
    this.innerHTML = "";
    this.mySlot = document.createElement("slot");
    this.shadowRoot?.appendChild(this.mySlot);
  }

  connectedCallback() {
    let MAXITER = 100;
    let ITER = 0;
    let content = "";
    let sgn = Math.sign(this.step)

    for (
      let i = this.from;
      i * sgn  <= this.to * sgn;
      i += this.step
    ) {
      content += this.toRepeat.replace(
        new RegExp("\\${" + this.iterator + "}", "g"),
        i + ""
      );
      ITER++;
      if (ITER > MAXITER) break;
    }
    this.mySlot.innerHTML = content;
  }
}
