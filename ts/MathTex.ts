import katex from 'katex';

export class MathTex extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    (this.shadowRoot as ShadowRoot).innerHTML=`<h3>
    <slot></slot></h3>`;
  }

  connectedCallback() {
    katex.render(this.innerText, this)
  }
}


