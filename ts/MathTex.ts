import katex from "katex";
import { diffArrays, diffChars } from "diff";
import { treeDiffer } from "./treeDiff/treeDiffer-dist";

export class MathTex extends HTMLElement {
  mySlot: HTMLSlotElement;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.mySlot = document.createElement("slot");

    (
      this.shadowRoot as ShadowRoot
    ).innerHTML = `<link rel="stylesheet" href="./node_modules/katex/dist/katex.min.css" />
    <style>
    .change {
      background-color: yellow !important;
  }
  .insert {
      background-color: green !important;
  }
  .remove {
      background-color: red !important;
  }</style>`;
    this.shadowRoot?.appendChild(this.mySlot);
  }

  connectedCallback() {
    // let latex = this.getAttribute("latex") || "";
    let latex = this.innerText;
    this.innerText = "";
    // console.log("MATH", latex, this);
    // this.mySlot.innerHTML = katex.renderToString(latex);
    katex.render(latex, this.mySlot, {output: 'mathml'});
    // console.log(this.mySlot.innerHTML);
    if (this.hasAttribute("data-math-transition")) {
      new TransMath(this);
    }
  }
}

export class TransMath {
  static transMath = new Map();
  source: MathTex;
  target: MathTex | undefined;

  constructor(math: MathTex) {
    this.source = math;
    console.log("math", math);

    if (TransMath.transMath.has(math.id)) {
      this.target = math;
      TransMath.transMath.get(math.id).target = math;

      TransMath.transMath.get(math.id).computeTransition();
    } else {
      TransMath.transMath.set(math.id, this);
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

    console.log("diff");
    // diff.forEach(v => {
    //   console.log(v);
    // })

    console.log(this.source.mySlot);
    console.log(this.target.mySlot);
    const sour = new treeDiffer.Tree(
      this.source.mySlot,
      treeDiffer.TreeNode,
      {}
    );
    const tar = new treeDiffer.Tree(
      this.target.mySlot,
      treeDiffer.TreeNode,
      {}
    );

    console.log(sour);
    console.log(tar);
    let diff = new treeDiffer.Differ(sour, tar).transactions[
      sour.orderedNodes.length - 1
    ][tar.orderedNodes.length - 1];
    console.log(diff);

    for (let i = 0, ilen = diff.length; i < ilen; i++) {
      if (diff[i][0] !== null && diff[i][1] !== null) {
        if (
          sour.orderedNodes[diff[i][0]] !== undefined &&
          sour.orderedNodes[diff[i][0]].node.classList !== undefined
        )
          sour.orderedNodes[diff[i][0]].node.classList.add("change");
        if (
          tar.orderedNodes[diff[i][1]] !== undefined &&
          tar.orderedNodes[diff[i][1]].node.classList !== undefined
        )
          tar.orderedNodes[diff[i][1]].node.classList.add("change");
      } else if (diff[i][0]) {
        if (
          sour.orderedNodes[diff[i][0]] !== undefined &&
          sour.orderedNodes[diff[i][0]].node.classList !== undefined
        )
          sour.orderedNodes[diff[i][0]].node.classList.add("remove");
      } else if (diff[i][1]) {
        if (
          tar.orderedNodes[diff[i][1]] !== undefined &&
          tar.orderedNodes[diff[i][1]].node.classList !== undefined
        )
          tar.orderedNodes[diff[i][1]].node.classList.add("insert");
      }
    }

    // for (const ltr of this.source.letters) {
    //   if (intersection.has(ltr.innerText)) {
    //     ltr.classList.add("notNew");
    //     let targetEl = this.target.letters.item([...this.target.math].findIndex(val => {
    //         return val===ltr.innerText;
    //     }));
    //     if(targetEl === null) return
    //     ltr.dataset.dx = String(targetEl.getBoundingClientRect().left - ltr.getBoundingClientRect().left);
    //     ltr.dataset.dy = String(targetEl.getBoundingClientRect().top - ltr.getBoundingClientRect().top);
    //   } else {
    //     ltr.classList.add("remove");
    //   }
    // }

    // for (const ltr of this.target.letters) {
    //   if (intersection.has(ltr.innerText)) {
    //     ltr.classList.add("notNew");
    //   } else {
    //     ltr.classList.add("create");
    //   }
    // }
  }

  // animIn() {
  //   if(this.target === undefined) return
  //   for (const ltr of this.target.letters) {
  //       if(ltr.classList.contains("notNew")) {
  //           showInEnd(ltr);
  //       } else {
  //           fadeIn(ltr);
  //       }
  //   }
  // }

  // animOut() {
  //   for (const ltr of this.source.letters) {
  //       if(ltr.classList.contains("notNew")) {
  //           let dx = ltr.dataset.dx || 0
  //           let dy = ltr.dataset.dy || 0
  //           moveBy(ltr, +dx, +dy);
  //       } else {
  //           fadeOut(ltr);
  //       }
  //   }
  // }
}
