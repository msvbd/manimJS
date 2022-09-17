import { Diff } from "diff";

type DiffType = { el: Element; type: string }[];

export class MyTreeDiffer {
  rootNode1: Element;
  rootNode2: Element;

  endNodes1: Element[];
  endNodes2: Element[];

  diff: DiffType;

  constructor(rootNode1: Element, rootNode2: Element) {
    this.rootNode1 = rootNode1;
    this.rootNode2 = rootNode2;

    this.endNodes1 = this.getEndNodes(this.rootNode1);
    this.endNodes2 = this.getEndNodes(this.rootNode2);

    this.diff = this.makeDiff();
  }

  makeDiff() {
    const diff: DiffType = [];
    let eq: boolean = false;
    let node1Stat: Map<Element, string> = new Map();
    let node2Stat: Map<Element, string> = new Map();

    this.endNodes1.forEach((val) => {
      node1Stat.set(val, "remove");
    });

    this.endNodes2.forEach((val) => {
      node2Stat.set(val, "insert");
    });

    for (const node1 of this.endNodes1) {
      eq = false;
      for (const node2 of this.endNodes2) {
        if (this.isEqual(node1, node2)) {
          eq = true;
          node1Stat.set(node1, "");
          node2Stat.set(node2, "");
          continue;
        }
      }
      if (eq) continue;
    }

    this.endNodes1.forEach((val) => {
      if (node1Stat.get(val) !== "") {
        diff.push({el: val, type: "remove"});
        val.classList.add("remove");
      }
    });

    this.endNodes2.forEach((val) => {
      if (node2Stat.get(val) !== "") {
        diff.push({el: val, type: "insert"});
        val.classList.add("insert");
      }
    });

    return diff;
  }

  getEndNodes(node: Element): Element[] {
    const endNodes: Element[] = [];
    const nodeChildren = node.children;
    if (nodeChildren.length == 0) return [node];

    for (const child of nodeChildren) {
      endNodes.push(...this.getEndNodes(child));
    }
    return endNodes;
  }

  isEqual(node1: Element, node2: Element): boolean {
    return node1.innerHTML == node2.innerHTML && node1.tagName == node2.tagName;
    // if (node1.nodeType != node2.nodeType) return false;
    // if (node1.nodeType == Node.TEXT_NODE && node2.nodeType == Node.TEXT_NODE)
    //   return node1.textContent == node1.textContent;

    // if (
    //   node1.nodeType == Node.ELEMENT_NODE &&
    //   node2.nodeType == Node.ELEMENT_NODE
    // )
    //   return (node1 as Element).tagName == (node2 as Element).tagName;

    // return false;
  }
}
