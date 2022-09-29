# manimJS

This is the first code version and contains many problems.
You have been warned.

The functional part of the code is written in TypeScript and wrapped by Webpack.

## how to use

Everything you need is the `./css` and `./js` folders in this repository. And you can use demo.html as a template.

You can use the `css/manimjs.css` for styling your presentation but beware. Rewriting the existing style can break the presentation style.
Or you can style your elements directly via the `style` attribute.

### demo.html file structure

The `Body` element contains `<div id="manim"></div>` which wrappes, `<div id="frames"></div>` which contains frames of your presentation.

Frame = `section` element.

```html
...
<body>
<div id="manim">
    <div id="frames">
       <!-- Empty frame at the beginning. -->
        <section></section>

        <!-- Initial Frame -->
        <!-- The span element is transparent but reserves a space for the next frame. -->
        <!-- Default animation is "fade in" and "fade out". -->
        <section>
          ...
        </section>
        <section>
          ...
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

The attribute specifies the appearing animation method.

Possible `VALUE`s:

* `"fade"` - *(default)*
* `"move"` - element moves from the right side into the slide
* `"rotate"` - element moves from the right side into the slide and rotate

Example:

```html
<section>
    <h2 data-anim-out="move">Charts</h2>
    <p data-anim-in="move" data-anim-out="move">via chart.js</p>
</section>
```

#### data-anim-out

`<ELEMENT data-anim-out=VALUE></ELEMENT>`

The attribute specifies the disappearing animation method.

Possible `VALUE`s:

* `"fade"` - *(default)*
* `"move"` - element moves from the slide to the left side
* `"rotate"` - element moves from the slide to the left side and rotate

Example:

```html
<section>
    <h2 data-anim-out="move">Charts</h2>
    <p data-anim-in="move" data-anim-out="move">via chart.js</p>
</section>
```

#### data-text-transition

`<ELEMENT data-text-transition data-id=ID></ELEMENT>`

The `ID` pairs two elements in consecutive frames and has to be unique.
You can use it to change the element's position via `style`.
The attribute also transfigures one text to another. Existing letters in both texts move into new positions, and the other letters appear or disappear with the fade effect.

Example:

```html
<section>
    <h1 data-text-transition data-id="manimjs2" style="top: -20%">
    I'm ManimJS
    </h1>
</section>
<section>
    <h1 data-text-transition data-id="manimjs2">I'm awesome</h1>
</section>
```

#### data-math-transition

`<ELEMENT data-math-transition data-id=ID></ELEMENT>`

The `ID` pairs two elements in consecutive frames and has to be unique.
You can use it to change the element's position via `style`.
The attribute also transfigures one equation to another. Existing symbols in both equation move into new positions, and the other symbols appears or disappears by the fade effect.

Example:

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

There are three implemented web components: `draw-graph-chartjs`, `math-tex` and `for-loop`.

#### draw-graph-chartjs

This component renders charts based on a dataset.
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

Attributes:

* `data-x` - dataset of x values, separated by spaces, should have the same length as `data-y`
* `data-y` - dataset of y values, separated by spaces, should have the same length as `data-x`
* `data-color` *(optional)* - color of data: "red", "#f00", "#ff0000", "rgb(255,0,0)"
* `data-type` *(optional)*  - drawing method: "scatter", "line", "bar"
* `data-label` *(optional)* - dataset label

Example:

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

This component renders equations written in tex math notation.
Component uses [KaTeX](https://github.com/KaTeX/KaTeX) - [https://katex.org/](https://katex.org/).

```html
<math-tex
    [data-math-transition]
    [data-id=ID]>
    TEX_MATH_EQUATION
</math-tex>
```

Attributes:

* `data-math-transition` *(optional)* - set equation a as a part of transition effect, see [data-math-transition](#data-math-transition)
* `data-id` *(optional)* - uniquily identifie transition between two equations, see [data-math-transition](#data-math-transition)

Example:

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

*Note: There is a safe limit for the number of iterations set to 100.*

Attributes:

`data-from` - starting value of iterator - *default value* = "0"
`data-to` - ending value of iterator - *default value* = "0"
`data-step` - step of iterator - *default value if to > from* = "1" - *default value if from > to* = "-1"
`data-i` - name of iterator variable - *default value* = "i"

Example:

```html
<ul>
    <for-loop data-from="8" data-to="4">
        <li><math-tex>x^{${i}}</math-tex></li>
    </for-loop>
</ul>
```
