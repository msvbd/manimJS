import { fadeIn, fadeOut, moveBy, showInEnd } from "./animations";

/* text transition */
export class Text {
  el: HTMLElement;
  id: string;
  text: string;
  letters: HTMLCollectionOf<HTMLSpanElement>;
  constructor(el: HTMLElement) {
    this.el = el;
    this.id = el.dataset.id || "0";
    this.text = el.textContent || "";
    this.letters = this.splitMe();
    new TransText(this);
  }
  splitMe() {
    let splited = "";
    for (const ltr of [...this.text]) {
      splited += `<span>${ltr}</span>`;
    }
    console.log(splited);
    this.el.innerHTML = splited;

    return this.el.getElementsByTagName("span");
  }
}

export class TransText {
  static transTexts = new Map();
  source: Text;
  target: Text | undefined;
  constructor(text: Text) {
    this.source = text;
    if (TransText.transTexts.has(text.id)) {
      this.target = text;
      TransText.transTexts.get(text.id).target = text;
      TransText.transTexts.get(text.id).computeTransition();
    } else {
      TransText.transTexts.set(text.id, this);
    }
  }
  computeTransition() {
    let setSource = new Set(this.source.text);
    if (this.target === undefined) return;
    let setTarget = new Set(this.target.text);

    let intersection = new Set([...setSource].filter((v) => setTarget.has(v)));

    for (const ltr of this.source.letters) {
      if (intersection.has(ltr.innerText)) {
        ltr.classList.add("notNew");
        let targetEl = this.target.letters.item([...this.target.text].findIndex(val => {
            return val===ltr.innerText;
        }));
        if(targetEl === null) return
        ltr.dataset.dx = String(targetEl.getBoundingClientRect().left - ltr.getBoundingClientRect().left);
        ltr.dataset.dy = String(targetEl.getBoundingClientRect().top - ltr.getBoundingClientRect().top); 
      } else {
        ltr.classList.add("remove");
      }
    }

    for (const ltr of this.target.letters) {
      if (intersection.has(ltr.innerText)) {
        ltr.classList.add("notNew");
      } else {
        ltr.classList.add("create");
      }
    }
  }

  animIn() {
    if(this.target === undefined) return
    for (const ltr of this.target.letters) {
        if(ltr.classList.contains("notNew")) {
            showInEnd(ltr);
        } else {
            fadeIn(ltr);
        }
    }
  }

  animOut() {
    for (const ltr of this.source.letters) {
        if(ltr.classList.contains("notNew")) {
            let dx = ltr.dataset.dx || 0
            let dy = ltr.dataset.dy || 0
            moveBy(ltr, +dx, +dy);
        } else {
            fadeOut(ltr);
        }
    }
  }
}

