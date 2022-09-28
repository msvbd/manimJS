type DiffType = {
  sources: Map<Element, Element | undefined>;
  targets: Map<Element, Element | undefined>;
};

type Distance = {
  source: Element;
  target: Element;
  dist: number;
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
    const dists: Map<Element, Distance[]> = new Map();

    for (const el of this.endNodes1) {
      diff.sources.set(el, undefined);
    }

    for (const el of this.endNodes2) {
      diff.targets.set(el, undefined);
    }

    for (const node1 of this.endNodes1) {
      if (this.isEmpty(node1)) continue;
      for (const node2 of this.endNodes2) {
        if (this.isEqual(node1, node2)) {
          if (!dists.has(node1)) dists.set(node1, []);
          dists.get(node1)?.push({
            source: node1,
            target: node2,
            dist: this.getDistance(node1, node2),
          });
        }
      }
    }

    for (const dist of dists) {
      const minDist = dist[1].sort((a: Distance, b: Distance) => {
        return a.dist - b.dist;
      });
      for (const ds of minDist) {
        if(diff.sources.get(ds.source) !== undefined) continue
        if(diff.targets.get(ds.target) !== undefined) continue

        diff.sources.set(ds.source, ds.target);
        diff.targets.set(ds.target, ds.source);
      }
    }

    //console.log(diff.sources);
    // asdf;

    // for (const node1 of this.endNodes1) {
    //   const minDist = dists
    //     .filter((v: Distance) => {
    //       return this.isEqual(v.source, node1);
    //     })
    //     .sort((a: Distance, b: Distance) => {
    //       return a.dist - b.dist;
    //     })[0];

    //   if (minDist === undefined) continue;

    //   diff.sources.set(minDist.source, minDist.target);
    //   diff.targets.set(minDist.target, minDist.source);
    //   // diff.sources.set(node1, node2);
    //   // diff.targets.set(node2, node1);
    // }

    // console.log(dists);
    // asdf;

    return diff;
  }

  getDistance(node1: Element, node2: Element): number {
    const dx =
      node1.getBoundingClientRect().left - node2.getBoundingClientRect().left;
    const dy =
      node1.getBoundingClientRect().top - node2.getBoundingClientRect().top;

    return Math.sqrt(dx ** 2 + dy ** 2);
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

  isEmpty(node: Element) {
    return !/\S/.test(node.innerHTML);
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
