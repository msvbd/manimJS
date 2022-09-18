import katex from "katex";
import { fadeIn, fadeOut, showInEnd, moveBy } from "./animations";
// import { diffArrays, diffChars } from "diff";
import { MyTreeDiffer } from "./myTreeDiffer";

export class MathTex extends HTMLElement {
  mySlot: HTMLSlotElement;
  transition: TransMath | undefined;
  dataId: string | undefined;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.mySlot = document.createElement("slot");

    this.dataId = this.dataset.id;
      

    (
      this.shadowRoot as ShadowRoot
    ).innerHTML = `<link rel="stylesheet" href="./node_modules/katex/dist/katex.min.css" />`;
    this.shadowRoot?.appendChild(this.mySlot);
  }

  connectedCallback() {
    let latex = this.innerText;
    this.innerText = "";
    katex.render(latex, this.mySlot);
    if (this.hasAttribute("data-math-transition")) {
      this.transition = new TransMath(this);
    }
  }

  animIn() {
    if (this.transition === undefined) {
      fadeIn(this);
      return;
    }

    console.log("animIn not undefined");
    this.transition.animIn();
  }

  animOut() {
    if (this.transition === undefined) {
      fadeOut(this);
      return;
    }

    console.log("animOut not undefined");
    this.transition.animOut();
  }
}

export class TransMath {
  static transMath : Map<string, TransMath> = new Map();
  source: MathTex;
  target: MathTex | undefined;
  diff: MyTreeDiffer | undefined;

  constructor(math: MathTex) {
    this.source = math;
    console.log("math", math);

    if(math.dataId === undefined) return;
    
    const me = TransMath.transMath.get(math.dataId);
    if (me !== undefined) {
      this.target = math;
      me.target = math;

      me.computeTransition();
    } else {
      TransMath.transMath.set(math.dataId, this);
    }
  }

  computeTransition() {
    // let setSource = new Set(this.source.mySlot.innerHTML);
    // if (this.target === undefined) return;
    // let setTarget = new Set(this.target.mySlot.innerHTML);

    // let intersection = new Set([...setSource].filter((v) => setTarget.has(v)));

    if (this.target === undefined) return;
    //const diff = diffChars(this.source.mySlot.innerHTML, this.target.mySlot.innerHTML)
    // const diff = diffArrays([...this.source.mySlot.firstElementChild!.firstElementChild!.children], [...this.target.mySlot.firstElementChild!.firstElementChild!.children])

    // console.log(this.source.mySlot.innerHTML);
    // console.log(this.target.mySlot.innerHTML);

    // console.log("diff");
    // diff.forEach(v => {
    //   console.log(v);
    // })

    this.diff = new MyTreeDiffer(this.source.mySlot, this.target.mySlot);
    // console.log(this.diff.diff);

    for (const ltr of this.diff.diff.sources) {
      if (ltr[1] === undefined) {
        ltr[0].classList.add("remove");
        continue;
      }
      (ltr[0] as HTMLElement).dataset.dx = String(
        ltr[1].getBoundingClientRect().left -
          ltr[0].getBoundingClientRect().left
      );
      (ltr[0] as HTMLElement).dataset.dy = String(
        ltr[1].getBoundingClientRect().top - ltr[0].getBoundingClientRect().top
      );
      ltr[0].classList.add("notNew");

    }

    for (const ltr of this.diff.diff.targets) {
      if (ltr[1] === undefined) {
        ltr[0].classList.add("insert");
        continue;
      }
      ltr[0].classList.add("notNew");
    }

  }

  animIn() {
    if (this.diff === undefined) return;

    for (const ltr of this.diff.diff.targets) {
      if (ltr[0].classList.contains("notNew")) {
        showInEnd(ltr[0] as HTMLElement);
      } else {
        fadeIn(ltr[0] as HTMLElement);
      }
    }
    // for (const ltr of this.diff.diff.sources) {
    //   fadeIn(ltr[0] as HTMLElement);
    // }
  }

  animOut() {
    if (this.diff === undefined) return;

    for (const ltr of this.diff.diff.sources) {
      if (ltr[0].classList.contains("notNew")) {
        let dx = (ltr[0] as HTMLElement).dataset.dx || 0;
        let dy = (ltr[0] as HTMLElement).dataset.dy || 0;
        moveBy(ltr[0] as HTMLElement, +dx, +dy);
      } else {
        fadeOut(ltr[0] as HTMLElement);
      }
    }
    for (const ltr of this.diff.diff.targets) {
      fadeOut(ltr[0] as HTMLElement);
    }
  }
}
