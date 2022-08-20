export class DrawGraph extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });


    let graph = 
    `<svg version="1.1" width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <line x1="50" y1="350" x2="350" y2="350" stroke="black" />
    <line x1="350" y1="350" x2="340" y2="360" stroke="black" />
    <line x1="350" y1="350" x2="340" y2="340" stroke="black" />
    <line x1="50" y1="50" x2="50" y2="350" stroke="black" />
    <line x1="50" y1="50" x2="60" y2="60" stroke="black" />
    <line x1="50" y1="50" x2="40" y2="60" stroke="black" />`;
    for (let i = 1; i <= 5; i++) {
      graph+=`<line x1="${50+i*50}" y1="340" x2="${50+i*50}" y2="360" stroke="black" />`
      graph+=`<line x1="40" y1="${50+i*50}" x2="60" y2="${50+i*50}" stroke="black" />`
    }
    if(this.hasAttribute("data-fce")) {
      let path = `M 50 350\n`
      let samples = 10
      let dx = 250/samples
      for(let i=0;i<=samples;i++) {
        path += ` L ${50+i*dx},${350-0.004*(i*dx)**2}\n`
      }
      graph+=`<path fill="none" stroke="red" d="${path}" />`
    }
    graph+=`</svg>`;
    (this.shadowRoot as ShadowRoot).innerHTML = graph
  }

//   connectedCallback() {}
}


