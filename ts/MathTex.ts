import katex from 'katex';

export class MathTex extends HTMLElement {
  mySlot : HTMLSlotElement

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.mySlot = document.createElement("slot");

    (this.shadowRoot as ShadowRoot).innerHTML=
    `<link rel="stylesheet" href="./node_modules/katex/dist/katex.min.css" />`
    this.shadowRoot?.appendChild(this.mySlot)
  }

  connectedCallback() {
    // let latex = this.getAttribute("latex") || "";
    let latex = this.innerText;
    this.innerText = "";
    // console.log("MATH", latex, this);
    katex.render(latex, this.mySlot);
  }
}


