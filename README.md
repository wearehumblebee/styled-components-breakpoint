[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![codecov](https://codecov.io/gh/wearehumblebee/styled-components-breakpoint/branch/master/graph/badge.svg)](https://codecov.io/gh/wearehumblebee/styled-components-breakpoint)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)]()

## Styled Components Breakpoint 💅
This package provides a friendly API for working with breakpoints in [Styled Components](https://www.styled-components.com/). It allows you to set up any number of breakpoints with a naming convention of your choice.
Once set up you'll have three main ways of interacting with your breakpoints `up` (min-width), `down` (max-width), and `only` (a range between two breakpoints).

---

### Installation
```sh
yarn install @humblebee/styled-components-breakpoint
# or
npm install @humblebee/styled-components-breakpoint
```
---

### Usage and example

The default export of `styled-components-breakpoint` is a function that accepts a config object with your breakpoints. This will return an instance with utility functions for each breakpoint.
I'd recommend that you store this instance in a separate file that can later be imported and used by any component.

Coming from form SASS I like to think of these kind of utility functions for `styled-components` in terms of `mixins`. I also think it makes seance to keep these "mixins" close to our projects themes (if any exist), to make them easier to discover when working on other styles. With this in mind the folder structure could look something like this:

.
+--componsnts
|  +--Button.js
+--themes
|  +--mixins.js


`themes/mixins.js`
```javascript
import styledBreakpoint from '@humblebee/styled-components-breakpoint';

// Create an instance of styled-components-breakpoint and pass it an object of breakpoints.
export const breakpoint = styledBreakpoint({
  xs: 320,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
});
```

`components/Button.js`
```javascript
// Styled Components
import styled from 'styled-components';
// Our breakpoint instance/mixin
import { breakpoint } from '../../theme/mixins';

const Button = styled.button`
    background: white;
    ${breakpoint.m}`
      background: palevioletred;
    `
  `
});
```

In the above example we create an instance of `styled-components-breakpoint` in a file called `themes/mixins.js` and export it with the name `breakpoint`.
We then import `breakpoint` in a separate file called `components/Button.js` and use it inside the styling of our `styled-component` button.
The function `breakpoint.m` will result in the following media query: `'@media only screen and (min-width: 768px)'`, giving our button component a `background-color` of `palevioletred` when the viewport is wider than 768px.

## API

Continuing on the above example, you have access to all the other breakpoints in the same manner, in our case: `breakpoint.xs`, `breakpoint.s`, `breakpoint.m`, `breakpoint.l`, `breakpoint.xl`. As mentioned in the intro you can add as many breakpoints as you like with any naming convention you prefer. If you prefer the naming convention used in Twitter Bootstrap, your config object would look like this.

```javascript
export const breakpoint = styledBreakpoint({
  xs: 320,
  sm: 576,
  md: 768,
  lq: 992,
  xl: 1200,
});
```

---

#### breakpoint.up.m

In the "Usage and example" section we made use of the function `breakpoint.m`, this is a shorthand for writing `breakpoint.up.m`. The reason for this shorthand is to encourage the usage of mobile-first breakpoints, i.e. `min-width` media queries.

The functions `breakpoint.m` and `breakpoint.up.m` are the same.

```javascript
const Button = styled.button`
    background: white;
    ${breakpoint.up.m}`
      background: palevioletred;
    `
  `
});
```

#### breakpoint.down.m

In contrast to `breakpoint.up`, `breakpoint.down` goes the opposite direction and returns a `max-width` media query. The example below would return the media query `@media only screen and (min-width: 768px)`.

```javascript
const Button = styled.button`
    background: white;
    ${breakpoint.down.m}`
      background: palevioletred;
    `
  `
});
```

#### breakpoint.only.m(breakpoint?)

Unlike `up` and `down`, the `only` function accepts an optional breakpoint argument in the form of a string. This argument is used to return a range media query, between the breakpoint used in the executing function and the passed argument.
For example, executing `breakpoint.only.m('xl')`, will return a range between the `m` and `xl` breakpoints.
```javascript
`breakpoint.only.m('xl')`
// Will return:
// @media only screen and (min-width: 768px) and (max-width: 1200px)
```

It works just as well to pass a smaller breakpoint than the executing function. For example starting at breakpoint `m` and going down to `s`.
```javascript
`breakpoint.only.m('s')`
// Will return:
// @media only screen and (max-width: 768px) and (min-width: 576px)
```

If no argument is passed the next upper breakpoint will be used implicitly. For example, executing `breakpoint.only.m()`, will return a range between the `m` and `l` breakpoints.

```javascript
`breakpoint.only.m()`
// Will return:
// @media only screen and (min-width: 768px) and (max-width: 992px)
```

**Important! Even if no breakpoint argument is passed to `only`, it is still necessary to actually execute the function. If not no media query will be returned.**

**Correct: breakpoint.only.m()**

**Wrong: breakpoint.only.m**

---

Happy coding! Wishes the bees at [Humblebee](https://humblebee.se) 🐝
