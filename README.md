# manimJS

This is the first code version and contains many problems.
You have been warned.

It is written in TypeScript and wrapped by Webpack

## how to use

Everything what you need is css and js folders in this repository. And you can use demo.html as a template.

You can use css/manimjs.css for styling your presentation but beware. Rewriting existing style can broke presentation style.
Or you can style your elements directly via `style` atribute.

### demo.html file structure

`Body` element contains `<div id="manim"></div>` which wrappes, in this moment only `<div id="frames"></div>` which contains frames of your presentation.

Frame = `section` element.

```html
...
<body>
<div id="manim">
    <div id="frames">
    <!-- empty frame at the beggining -->
    <section></section>

    <!-- initial frame -->
    <!-- span tag is transparent but reserve space for next frame -->
    <!-- default animation is fade in and fade out -->
    <section>
        <h1>Hi <span style="opacity: 0">I'm ManimJS</span></h1>
    </section>
    <section>
        <h1>Hi I'm ManimJS</h1>
    </section>

    ...

    </div>
</div>
</body>
...
```

### implemented attributes

#### data-anim-in

`<ELEMENT data-anim-in=VALUE></ELEMENT>`

The atribute specifies appearing animation method.

Possible `VALUE`s:

* `"fade"` - *(default)*
* `"move"` - element move from right side into slide
* `"rotate"` - element move from right side into side and rotate (I know it sounds stupid...)

example:

```html
<section>
    <h2 data-anim-out="move">Charts</h2>
    <p data-anim-in="move" data-anim-out="move">via chart.js</p>
</section>
```

#### data-anim-out

`<ELEMENT data-anim-out=VALUE></ELEMENT>`

The atribute specifies disappearing animation method.

Possible `VALUE`s:

* `"fade"` - *(default)*
* `"move"` - element move from slide to left side
* `"rotate"` - element move from slide to left side and rotate (I know it sounds stupid...)

example:

```html
<section>
    <h2 data-anim-out="move">Charts</h2>
    <p data-anim-in="move" data-anim-out="move">via chart.js</p>
</section>
```

#### data-text-transition

`<ELEMENT data-text-transition data-id=ID></ELEMENT>`

`ID` pairs two elements in consequence frame and have to be unique.
You can use it for chanig position of element via `style`.
Atribute also tranfigue one text to another. Existing letter in both text move into new position and the other letters appears or disappers by fade effect.

example:

```html
<section>
    <h1 data-text-transition data-id="manimjs2" style="top: -20%">
    Hi I'm ManimJS
    </h1>
</section>
<section>
    <h1 data-text-transition data-id="manimjs2">I'm awesome</h1>
</section>
```

#### data-math-transition

`<ELEMENT data-math-transition data-id=ID></ELEMENT>`

`ID` pairs two elements in consequence frame and have to be unique.
You can use it for chanig position of element via `style`.
Atribute also tranfigue one equation to another. Existing symbols in both equation move into new position and the other symbols appears or disappers by fade effect.

example:

```html
<section>
    <math-tex data-math-transition data-id="pyeq"
    >a^2 + b^2 - c^2 = 0</math-tex
    >
</section>
<section>
    <math-tex data-math-transition data-id="pyeq"
    >a^2 + b^2 = c^2</math-tex
    >
</section>
```

### implemented elements

There are three implemented web components: `draw-graph-chartjs`, `math-tex` and `for-loop`

#### draw-graph-chartjs

This component render charts based on dataset.
Component uses [chart.js](https://github.com/chartjs/Chart.js) - [https://www.chartjs.org/](https://www.chartjs.org/).

```html
<draw-graph-chartjs
    data-x=XDATA
    data-y=YDATA
    [data-color=COLOR]
    [data-type=TYPE]
    [data-label=LABEL]>
</draw-graph-chartjs>
```

atributes:

* `data-x` - dataset of x values, separate by space, should have the same length as `daty-y`
* `data-y` - dataset of y values, separate by space, should have the same length as `daty-x`
* `data-color` *(optional)* - color of data: "red", "#f00", "#ff0000", "rgb(255,0,0)"
* `data-type` *(optional)*  - drawing method: "scatter", "line", "bar"
* `data-label` *(optional)* - dataset label

example:

```html
<draw-graph-chartjs
    data-x="1 2 3 4 5"
    data-y="1 4 9 12 10"
    data-color="#f00"
    data-type="bar"
    data-label="Useless data"
></draw-graph-chartjs>
```

#### math-tex

This component render equation from tex math notation.
Component uses [KaTeX](https://github.com/KaTeX/KaTeX) - [https://katex.org/](https://katex.org/).

```html
<math-tex
    [data-math-transition]
    [data-id=ID]>
    TEX_MATH_EQUATION
</math-tex>
```

atributes:

* `data-math-transition` *(optional)* - labeling equationa as a part of transition effect, see [data-math-transition](#data-math-transition)
* `data-id` *(optional)* - uniquily identifie transition between two equations, see [data-math-transition](#data-math-transition)

example:

```html
<math-tex
    data-math-transition data-id="pyeq">
    a^2 + b^2 = c^2
</math-tex>
```

#### for-loop

```html
<for-loop
    data-from=FROM
    data-to=TO
    data-i=ITERATOR>
    ... ${ITERATOR}...
</for-loop>
```

*Note: There is safe limit for number of iteration set to 100.*

atributes:

`data-from` - starting number of iterator - *default value* = "0"
`data-to` - ending number of iterator - *default value* = "0"
`data-step` - step of iterator - *default value if to > from* = "1" - *default value if from > to* = "-1"
`data-i` - iterator variable - *default value* = "i"

example:

```html
<ul>
    <for-loop data-from="0" data-to="4">
        <li><math-tex>x^{${i}}</math-tex></li>
    </for-loop>
</ul>
```
