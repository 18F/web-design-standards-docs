---
permalink: /getting-started/developers/
layout: styleguide
title: For developers
category: Getting started
lead: The UI components are built on a solid HTML foundation, progressively enhanced to provide core experiences across browsers. All users will have access to the same critical information and experiences regardless of what browser they use, although those experiences will render better in newer browsers. If JavaScript fails, users will still get a robust HTML foundation.
subnav:
- text: Installation
  href: '#installation'
- text: CSS architecture
  href: '#css-architecture'
- text: Customization
  href: '#customization-and-theming'
- text: Where things live
  href: '#where-things-live'
- text: Accessibility
  href: '#notes-on-accessibility'
- text: Contributions
  href: '#contribution-guidelines'
---

## Installation

Here are a few different ways to use the Standards within your project.

### Download

To use the Web Design Standards on your project, you’ll need to include the CSS and JavaScript files in each HTML page in your project.

First, download the Web Design Standards assets:

<a class="link-download" href="https://github.com/18F/web-design-standards/releases/download/v{{ site.data.uswds_version }}/uswds-{{ site.data.uswds_version }}.zip">Download code</a>
<span class="link-download-subtext">Version {{ site.data.uswds_version }}</span>

Then, add the following folders into a relevant place in your code base — likely a directory where you keep third-party libraries:

```
uswds-{{ site.data.uswds_version }}/
├── js/
│   ├── uswds.min.js.map
│   ├── uswds.min.js
│   └── uswds.js
├── css/
│   ├── uswds.min.css.map
│   ├── uswds.min.css
│   └── uswds.css
├── img/
└── fonts/
```

Refer to these files by adding the following `<link>` and `<script>` elements
into your HTML pages:

Add this to your `<head>` element:

```html
<link rel="stylesheet" href="/path/to/your/assets/css/lib/uswds.min.css">
```

Add this before the closing `</body>` tag:

```html
<script src="/path/to/your/assets/js/lib/uswds.min.js"></script>
```

We offer two versions — a minified version, and an un-minified one. Use the minified version in a production environment or to reduce the file size
of your downloaded assets. And the un-minified version is better if you are in a
development environment or would like to debug the CSS or JavaScript assets in
the browser. The examples above recommend using the minified versions.

And that’s it — you should be set to use the Standards.

### Using npm

If you have `node` installed on your machine, you can use npm to install the Standards. Add `uswds`
to your project’s `package.json` as a dependency:

```shell
npm install --save uswds
```

The package will be installed in `node_modules/uswds`. You can use the un-compiled files
found in the `src/` or the compiled files in the `dist/` directory.

```
node_modules/uswds/
├── dist/
│   ├── css/
│   ├── fonts/
│   ├── img/
│   ├── js/
└── src/
    ├── fonts/
    ├── img/
    ├── js/
    └── stylesheets/
```

`require('uswds')` will load all of the U.S. Web Design Standard’s JavaScript onto the page. The `uswds` module itself does not export anything.

The main Sass (SCSS) source file is here:

```
node_modules/uswds/src/stylesheets/all.scss
```

The non-minified CSS that’s been precompiled is here:

```
node_modules/uswds/dist/css/uswds.css
```

### Using another framework or package manager

If you’re using another framework or package manager that doesn’t support NPM, you can find the source files in this repository and use them in your project. Otherwise, we recommend that you follow the [download instructions](#download). Please note that the core team [isn’t responsible for all frameworks’ implementations](https://github.com/18F/web-design-standards/issues/877).

If you’re interested in maintaining a package that helps us distribute the U.S. Web Design Standards, the project’s build system can help you create distribution bundles to use in your project. Please read our [contribution guidelines][] to locally build distributions for your framework or package manager.

### Need installation help?

Do you have questions or need help with setup? Did you run into any weird errors while following these instructions? Feel free to open an issue here:

[https://github.com/18F/web-design-standards/issues](https://github.com/18F/web-design-standards/issues).

You can also email us directly at [uswebdesignstandards@gsa.gov](mailto:uswebdesignstandards@gsa.gov).

## CSS architecture

* The CSS foundation of this site is built with the **[Sass](https://sass-lang.com)** preprocessor language.
* Uses **[Bourbon](http://bourbon.io/)** for its simple and lightweight Sass mixin library, and the **[Neat](http://neat.bourbon.io/)** library for the grid framework. Bourbon and Neat are open-source products from **[thoughtbot](https://thoughtbot.com/)**.
* The CSS organization and naming conventions follow **[18F’s CSS Coding Styleguide](https://pages.18f.gov/frontend/css-coding-styleguide/)**.
* CSS selectors are **prefixed** with `usa` (For example: `.usa-button`). This identifier helps the design system avoid conflicts with other styles on a site which are not part of the U.S. Web Design Standards.
* Uses a **[modified BEM](https://pages.18f.gov/frontend/css-coding-styleguide/naming/)** approach created by 18F for naming CSS selectors. Objects in CSS are separated by single dashes. Multi-word objects are separated by an underscore (For example: `.usa-button-cool_feature-active`).
* Uses **modular CSS** for scalable, modular, and flexible code.
* Uses **nesting** when appropriate. Nest minimally with up to two levels of nesting.
* Hard-coded magic numbers are avoided and, if necessary, defined in the `core/variables` scss file.
* Media queries are built **mobile first**.
* **Spacing units** are as much as possible defined as rem or em units so they scale appropriately with text size. Pixels can be used for detail work and should not exceed 5px (For example: 3px borders).

**For more information, visit:
[https://pages.18f.gov/frontend/css-coding-styleguide/](https://pages.18f.gov/frontend/css-coding-styleguide/)**

## JS customization

**Unfortunately, customizing the JavaScript for the standards currently requires NodeJS and a module bundler like Browserify or Webpack. We apologize for this inconvenience, and are working to resolve it in a future release of the Standards.**

The JavaScript for the standards is separated into components in the same manner as the visual interface which is all initialized with event handlers when the DOM is ready. These components are accessible as CommonJS modules that can be required in other JavaScript files which then must be built for the browser. The components are currently not accessible in the global browser scope, but can be extended to be included by requiring `components` and setting it to a global scope:

```js
window.uswds = require('./components');
```

Each component has a standardized interface that can be used to extend it further. The components store a HTML class name (e.g. `.usa-accordion-button[aria-controls]`) that's used to link HTML elements with the JS component, so when a component is initialized, it will search through the current HTML DOM finding all elements that match its class and inialize the component JavaScript for those elements. The primary methods each component has are as follows:

- `on`: Initialize a component's JavaScript behavior by passing the root element, such as `window.document`.
- `off`: The opposite of `on`, de-initializes a component, removing any JavaScript event handlers on the component.
- `hide`: Hide the whole component.
- `show`: Shows a whole, hidden component.
- `toggle`: Toggles the visibility of a component on and off based on the previous state.

Some components have additional methods for manipulating specific aspects of them based on what they are and what they do. These can be found in the component's JS file.

## Customization and theming

The Standards can be customized to use different typography, colors and grid systems. The easiest way to do this is to use Sass and override the Standards’ global variables. If it isn’t possible to use Sass, do theming by overriding the CSS rules in the Standards set.

To start theming through Sass, copy the `core/variables` file into your own project’s Sass folder, changing applicable variable values, and importing it before the WDS. Below is an example of customizing the import of the Standards all.scss file.

```scss
// src/main.scss
@import 'path/to/my/scss/files/main/scss/my-custom-vars';
@import 'lib/uswds/src/stylesheets/all';
```

```scss
// path/to/my/scss/files/main/scss/my-custom_vars.scss

// Colors
$color-primary: #2c3e50;
$color-secondary: #ad2020;
$color-secondary-dark: #b0392e;

// Typography
$font-serif: 'Georgia', 'Times', serif;
$h2-font-size: 2rem;
$h3-font-size: 1.75rem;
$heading-line-height: 1.4;

// Grid/breakpoints
$small-screen:  540px !default;
$medium-screen: 620px !default;
$large-screen:  1120px !default;
```

NOTE: If you plan on upgrading to newer versions of the Standards in the future, or are not using your own forked version of the Standards, try to avoid making changes in the Standards folder themselves. Doing so could make it impossible to upgrade in the future without undoing your custom changes.

### Main variables that can be customized
* Colors can be found in the `core/variables` [file, line 35](https://github.com/18F/web-design-standards/blob/develop/src/stylesheets/core/_variables.scss#L35).
* Font families can be found in the `core/variables` [file, line 28](https://github.com/18F/web-design-standards/blob/develop/src/stylesheets/core/_variables.scss#L28).
* Typography sizing can be found in `core/variables` [file, line 13](https://github.com/18F/web-design-standards/blob/develop/src/stylesheets/core/_variables.scss#L13).
* Grid and breakpoint settings can be found in `core/variables` [file, line 87](https://github.com/18F/web-design-standards/blob/develop/src/stylesheets/core/_variables.scss#L87).


## Where things live

* **HTML** markup for the components is located in: `src/html` in the site root.
* **Sass** styles are located in: `src/stylesheets/ (/core, /elements, /components)`. **Compiled CSS** is located in the [downloadable zip file]({{ site.repos[0].url }}/releases/download/v{{ site.data.uswds_version }}/uswds-{{ site.data.uswds_version }}.zip) .
* **JS** is located in: `src/js/components (accordion.js, toggle-field-mark.js, toggle-form-input.js, validator.js)`.
* **Fonts** are located in: `src/fonts`.
* **Images** and icons are located in: `src/img`.

## Browser support

We’ve designed the Standards to support older and newer browsers through progressive enhancement. The Standards will officially support any browser **above 2% usage** as defined on [analytics.usa.gov](https://analytics.usa.gov/). This currently means the Standards supports the newest versions of Chrome, Firefox, Safari and Internet Explorer 11 and up. Due to what browsers the Standards originally supported, the Standards will continue to support Internet Explorer 9 and up until the next major release, `2.0`.

## Accessibility

The Standards also meet the [WCAG 2.0 AA accessibility guidelines](https://www.w3.org/TR/WCAG20/) and are compliant with [Section 508 of the Rehabilitation Act](http://www.section508.gov/). We’re happy to answer questions about accessibility — email us for more information.

## Contribution guidelines

We’re so glad you’re thinking about contributing to the Standards! You can find our complete [contribution guidelines][] in our repo — please review them before submitting your contribution.

If you have any questions about these guidelines (or the Standards, more generally), don’t hesitate to [email us](mailto:uswebdesignstandards@gsa.gov) — we’ll get back to you within 48 hours.

[contribution guidelines]: https://github.com/18F/web-design-standards/blob/develop/CONTRIBUTING.md
