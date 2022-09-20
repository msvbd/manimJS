import { fadeIn, fadeOut, rotateIn, rotateOut } from "./animations";
import chart, { Chart } from "../node_modules/chart.js/dist/chart";
import {
  ChartType,
  DatasetChartOptions,
  ScriptableAndArray,
  ScriptableChartContext,
  ScriptableContext,
} from "../node_modules/chart.js/types/index.esm";

export class DrawGraphChartJS extends HTMLElement {
  myCanvas: HTMLCanvasElement;
  color: string;
  x: (number | string)[];
  y: (number | string)[];
  type: string;
  label: string | undefined;
  myChart: any;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.myCanvas = document.createElement("canvas");
    this.myCanvas.innerText =
      "Your browser does not support the canvas element.";
    this.myCanvas.width = 600;

    this.color = this.dataset.color || "#fff";
    this.x = parseArray(this.dataset.x) || [];
    this.y = parseArray(this.dataset.y) || [];
    this.type = this.dataset.type || "line";
    this.label = this.dataset.label;

    this.shadowRoot?.append(this.myCanvas);

    const delayBetweenPoints = 100;
    let started: { [key: number]: boolean };

    const data = {
      labels: this.x,
      datasets: [
        {
          label: this.label,
          backgroundColor: this.color,
          borderColor: this.color,
          data: this.y,
        },
      ],
    };

    let changed = false;
    const config = {
      type: this.type,
      data: data,
      options: {},
    };

    this.myChart = new Chart(this.myCanvas, config);
  }

  animIn() {
    // console.log("animIn");
    fadeIn(this);
  }

  animOut() {
    // console.log("animOut");

    fadeOut(this);
  }

  //   connectedCallback() {}
}

function parseArray(s: string | undefined): (number | string)[] | undefined {
  if (s === undefined) return;
  const arr = s.split(/\W+/);
  if (arr.length == 0) return;
  return arr;
}
