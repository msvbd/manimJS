# manimJS

## to-do

* [x] simple fade transition between slides
* [x] support text
* [x] support equations
* [x] support graphs
* [x] animate each object separately
* [x] set animation of each element
* [x] how to handle special animation for web component?
* [x] for element
* [x] transition between text
  * [x] docompose content into separate span elements
  * [x] label each spant based on "new", "same position", "new position"
  * [x] create effects for each span type
* [ ] section = keyframe and contains only changes, objects are labeled by name
* [x] transition between equations
* [ ] transition between graphs
* [ ] api for easy adding user defined stuff
* [ ] more then one step transitions
* [x] jak stylovat shadow dom? - dá se tam link případně , leze všechno hodit do slotu a stylovat to zvenč

## reports

**17.9.2022**
Zkusil bych na diff tree pužít funkci array diff vypadá, že by to mohla zvládnou lépe než moje verze. A nebo tam zatím nech tu mojí uvidíš co z toho bude :D

**30.8.2022**
Dostáváme se k problému, jak stylovat věci v shadowDOM, MathTex by měl být červeny, přidal jsem mu tam třída, ketrá by to měla zařídit, ale nefuguje to.

**29.8.2022**
Tak nějak for loop nedělá to co bych čekal, že dělat bude o_O Zkus ty veci pridat az v connction

**28.8.2022**
no něco jsem udělal a bylo to super :) připravil jsem možnost vytvořit vlastní animace v web component. Asi bych takhle udělal i text. resp. Na pozadí bych uživatelem vytvořený objekt předělal na web componentu s vlastní animací? A ta vlastní animace by obsahovala výpočet přechodu mezi texty.

**27.8.2022**
začal jsem text, ale myslím, že by chtělo to nejdřív předělat do stavu, kdy se animuje každý objekt na scéně zvlášť a ne celá scéne.
Taky se mi moc nezdá ten postup, který jsem zvolil pro text.

**20.8.2022**
Tři body jsem splnil, to není špatný :) Vypadá to zatím dobře a použitelně o_O Grafy budou větší oříšek a přechody textu a hlavně rovnic to teprve.
