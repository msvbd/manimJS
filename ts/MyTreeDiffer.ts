type DiffType = {
  sources: Map<Element, Element | undefined>;
  targets: Map<Element, Element | undefined>;
};

export class MyTreeDiffer {
  rootNode1: Element;
  rootNode2: Element;

  endNodes1: Element[];
  endNodes2: Element[];

  // diff: ArrayChange<Element>[];
  diff: DiffType;

  constructor(rootNode1: Element, rootNode2: Element) {
    this.rootNode1 = rootNode1;
    this.rootNode2 = rootNode2;

    this.endNodes1 = this.getEndNodes(this.rootNode1);
    this.endNodes2 = this.getEndNodes(this.rootNode2);

    // this.diff = diffArrays(this.endNodes1, this.endNodes2);
    // this.diff = diffArrays([8, 1, 2, 4, 7], [1, 2, 3, 4, 5, 6, 7, 8], {
    //   comparator: (left: number, right: number) => {
    //     return left == right;
    //   },
    // });
    this.diff = this.makeDiff();
  }

  makeDiff() {
    const diff: DiffType = { sources: new Map(), targets: new Map() };
    let eq: boolean = false;

    for (const el of this.endNodes1) {
      diff.sources.set(el, undefined);
    }

    for (const el of this.endNodes2) {
      diff.targets.set(el, undefined);
    }

    for (const node1 of this.endNodes1) {
      eq = false;
      for (const node2 of this.endNodes2) {
        if (
          this.isEqual(node1, node2) &&
          diff.sources.get(node1) === undefined &&
          diff.targets.get(node2) === undefined
        ) {
          eq = true;
          diff.sources.set(node1, node2);
          diff.targets.set(node2, node1);
          break;
        }
      }
      if (eq) continue;
    }

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
