export class For extends HTMLElement {
  from = 0;
  to = 0;
  toRepeat = "";
  iterator = "i";
  mySlot : HTMLSlotElement;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    if (this.hasAttribute("data-from")) this.from = +this.dataset.from!;
    if (this.hasAttribute("data-to")) this.to = +this.dataset.to!;
    if (this.hasAttribute("data-i")) this.iterator = this.dataset.i!;
    this.toRepeat = this.innerHTML
    this.innerHTML = "" 
    this.mySlot = document.createElement("slot");
    this.shadowRoot?.appendChild(this.mySlot)
  }

  connectedCallback() {
    let content = "";
    // console.log(this.toRepeat);
    
    for (let i = this.from; i <= this.to; i++) {
      content += this.toRepeat
        .replace(new RegExp("\\${"+this.iterator+"}", "g"), i + "")
        // .replace(/\$\{/+this.iterator+/\}/g, i + "")
    }
    // console.log(content);
    this.mySlot.innerHTML = content;
  }
}
