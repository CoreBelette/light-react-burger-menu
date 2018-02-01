light-react-burger-menu
=================

It's lighter than react-burger-menu, by only including the necessary style(slide for now). The minified version goes from 38kb(react-burger-menu v2.2.0) to 24kb(light-react-burger-menu 0.3.0). Good if you want to save as much as possible.

**Note:** To get the benefit of smaller size, you need [webpack tree shaking](https://webpack.js.org/guides/tree-shaking/) if you use npm and webpack in your configuration. If you just use the dist files, they are already downsized.  

It supports screen readers.

This is a work in progress 🔧

To get a working burger menu check the original version : [negomi/react-burger-menu](https://github.com/negomi/react-burger-menu)

## Demo & examples

<s>Live demo: [negomi.github.io/react-burger-menu](https://negomi.github.io/react-burger-menu/)</s>


To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

## Tests

The test suite uses [Mocha](https://mochajs.org/), [Chai](https://chaijs.com/) and [Sinon](https://sinonjs.org/), with [jsdom](https://github.com/tmpvar/jsdom).

*You will need at least Node v4.0.0 to run the tests, due to jsdom depending on it.*

To run the tests once, run:

```
npm test
```

To run them with a watcher, run:

```
npm run test:watch
```

## Installation

The easiest way to use react-burger-menu is to install it from npm and include it in your own React build process (using [Browserify](https://browserify.org), [Webpack](https://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-burger-menu.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install light-react-burger-menu --save
```

## Usage

Items for the sidebar should be passed as child elements of the component using JSX.

``` javascript
import { slide as Menu } from 'light-react-burger-menu'

class Example extends React.Component {
  showSettings (event) {
    event.preventDefault();
    .
    .
    .
  }

  render () {
    return (
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    );
  }
}
```

### Animations

The example above imported `slide` which renders a menu that slides in on the page when the burger icon is clicked. To use a different animation you can substitute `slide` with any of the following (check out the [demo](https://negomi.github.io/react-burger-menu/) to see the animations in action):

* `slide`
* <s>`stack`
* `elastic`
* `bubble`
* `push`
* `pushRotate`
* `scaleDown`
* `scaleRotate`
* `fallDown`
* `reveal`</s>

### Properties

<s>
Some animations require certain other elements to be on your page:

* **Page wrapper** - an element wrapping the rest of the content on your page (except elements with fixed positioning - see [the wiki](https://github.com/negomi/react-burger-menu/wiki/FAQ#i-have-a-fixed-header-but-its-scrolling-with-the-rest-of-the-page-when-i-open-the-menu) for details), placed after the menu component

  ``` javascript
  <Menu pageWrapId={ "page-wrap" } />
  <main id="page-wrap">
    .
    .
    .
  </main>
  ```

* **Outer container** - an element containing everything, including the menu component
  ``` javascript
  <div id="outer-container">
    <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
    <main id="page-wrap">
      .
      .
      .
    </main>
  </div>
  ```

If you are using an animation that requires either/both of these elements, you need to give the element an ID, and pass that ID to the menu component as the `pageWrapId` and `outerContainerId` props respectively.

Check this table to see which animations require these elements:

Animation | `pageWrapId` | `outerContainerId`
--- | :---: | :---:
`slide` | |
`stack` | |
`elastic` | &#x2713; | &#x2713;
`bubble` | |
`push` | &#x2713; | &#x2713;
`pushRotate` |  &#x2713;  |  &#x2713;
`scaleDown` |  &#x2713;  |  &#x2713;
`scaleRotate` |  &#x2713;  |  &#x2713;
`fallDown` |  &#x2713;  |  &#x2713;
`reveal` |  &#x2713;  |  &#x2713;

</s>

#### Position

The menu opens from the left by default. To have it open from the right, use the `right` prop. It's just a boolean so you don't need to specify a value. Then set the position of the button using CSS.

``` javascript
<Menu right />
```

#### Width

You can specify the width of the menu with the `width` prop. The default is `300`.

``` javascript
<Menu width={ 280 } />
<Menu width={ '280px' } />
<Menu width={ '20%' } />
```

#### Open state

You can control whether the sidebar is open or closed with the `isOpen` prop. This is useful if you need to close the menu after a user clicks on an item in it, for example, or if you want to open the menu from some other button in addition to the standard burger icon. The default value is `false`.

``` javascript
// To render the menu open
<Menu isOpen />
<Menu isOpen={ true } />

// To render the menu closed
<Menu isOpen={ false } />
```

You can see a more detailed example of how to use `isOpen` [here](https://github.com/negomi/react-burger-menu/wiki/FAQ#i-want-to-control-the-open-state-programmatically-but-i-dont-understand-how-to-use-the-isopen-prop).

*Note: If you want to render the menu open initially, you will need to set this property in your parent component's `componentDidMount()` function.*

#### State change

You can detect whether the sidebar is open or closed by passing a callback function to `onStateChange`. The callback will receive an object containing the new state as its first argument.

``` javascript
var isMenuOpen = function(state) {
  return state.isOpen;
};

<Menu onStateChange={ isMenuOpen } />
```

#### Overlay

You can turn off the default overlay with `noOverlay`.

``` javascript
<Menu noOverlay />
```

You can disable the overlay click event (i.e. prevent overlay clicks from closing the menu) with `disableOverlayClick`. This can either be a boolean, or a function that returns a boolean.

``` javascript
<Menu disableOverlayClick />
<Menu disableOverlayClick={() => shouldDisableOverlayClick()} />
```

#### Custom icons

You can replace the default bars that make up the burger and cross icons with custom `ReactElement`s. Pass them as the `customBurgerIcon` and `customCrossIcon` props respectively.

```javascript
<Menu customBurgerIcon={ <img src="img/icon.svg" /> } />
<Menu customCrossIcon={ <img src="img/cross.svg" /> } />
```

You should adjust their size using the `.bm-burger-button` and `.bm-cross-button` classes, but the element itself will have the class `.bm-icon` or `.bm-cross` if you need to access it directly.

You can also disable the icon elements so they won't be included at all, by passing `false` to these props.

```javascript
<Menu customBurgerIcon={ false } />
<Menu customCrossIcon={ false } />
```

This can be useful if you want exclusive external control of the menu, using the `isOpen` prop.

#### Custom ID and/or classNames

There are optional `id` and `className` props, which will simply add an ID or custom className to the rendered menu's outermost element. This is not required for any functionality, but could be useful for things like styling with CSS modules.

``` javascript
<Menu id={ "sidebar" } className={ "my-menu" } />
```

You can also pass custom classNames to the other elements:

``` javascript
<Menu burgerButtonClassName={ "my-class" } />
<Menu burgerBarClassName={ "my-class" } />
<Menu crossButtonClassName={ "my-class" } />
<Menu crossClassName={ "my-class" } />
<Menu menuClassName={ "my-class" } />
<Menu morphShapeClassName={ "my-class" } />
<Menu itemListClassName={ "my-class" } />
<Menu overlayClassName={ "my-class" } />
```

And to the `body` element (applied when the menu is open):
```javascript
<Menu bodyClassName={ "my-class" } />
```

### Styling

All the animations are handled internally by the component. However, the visual styles (colors, fonts etc.) are not, and need to be supplied, either with CSS or with a JavaScript object passed as the `styles` prop.

#### CSS

The component has the following helper classes:

``` css
/* Position and sizing of burger button */
.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: #373a47;
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #bdc3c7;
}

/* General sidebar styles */
.bm-menu {
  background: #373a47;
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: #373a47;
}

/* Wrapper for item list */
.bm-item-list {
  color: #b8b7ad;
  padding: 0.8em;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
```

#### JavaScript

The same styles can be written as a JavaScript object like this:

```javascript
var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

<Menu styles={ styles } />
```

### Browser support

Because this project uses CSS3 features, it's only meant for modern browsers. Some browsers currently fail to apply some of the animations correctly.

Chrome and Firefox have full support, but Safari and IE have strange behavior for some of the menus.

### Help

Check the FAQ (https://github.com/negomi/react-burger-menu/wiki/FAQ) to see if your question has been answered already, or [open a new issue](https://github.com/negomi/react-burger-menu/issues).

### License

MIT
