[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![codecov](https://codecov.io/gh/wearehumblebee/styled-components-breakpoint/branch/master/graph/badge.svg)](https://codecov.io/gh/wearehumblebee/styled-components-breakpoint)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)]()
[![npm](https://img.shields.io/npm/dw/@humblebee/styled-components-breakpoint.svg)]()
[![npm](https://img.shields.io/npm/dm/@humblebee/styled-components-breakpoint.svg)]() [![Greenkeeper badge](https://badges.greenkeeper.io/wearehumblebee/styled-components-breakpoint.svg)](https://greenkeeper.io/)

## Styled Components Breakpoint 💅
This library provides utility functions for dealing with media queries, to make them reusable and easier to read. It can be used as an alternative to SASS/LESS mixins.

More on mixins and [Styled Components](https://www.styled-components.com/) in [this article](https://github.com/styled-components/styled-components/blob/master/docs/tips-and-tricks.md).

---

### Installation
```sh
yarn install @humblebee/styled-components-breakpoint
# or
npm install @humblebee/styled-components-breakpoint
```
---

### Usage and setup

The default export of `styled-components-breakpoint` is a function that accepts a `config` object of breakpoints. This will return an object with three main utility methods/mixins: `up` (min-width), `down` (max-width) and `only` (a range between two media queries), all described in detail below.

```javascript
import styledBreakpoint from '@humblebee/styled-components-breakpoint';

// Creates an object with breakpoint utility methods.
export const breakpoint = styledBreakpoint({
  xxs: 0,
  xs: 320,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
});
```

#### Up
```javascript
breakpoint.up('m')
// Will return a media query with a min-width of 768
// @media only screen and (min-width: 768px)
```

#### Down
```javascript
breakpoint.down('m')
// Will return a media query with a max-width of 768
// @media only screen and (max-width: 768px)
```

#### Only
```javascript
breakpoint.only('m')
// Will return a range media query between "m" and the next upper breakpoint "l"
// @media only screen and (min-width: 768px) and (max-width: 1200px)
```

```javascript
breakpoint.only('m', 'xl')
// Will return a range media query between "m" and the breakpoint passed as the second argument, "xl"
// @media only screen and (min-width: 768px) and (max-width: 1200px)
```

#### Shorthand

There is also a shorthand for mobile first media queries (min-width). Calling `breakpoint.m` is the same as `breakpoint.up('m')`.

```javascript
breakpoint.m
// Will return a media query with a min-width of 768
// @media only screen and (min-width: 768px)
```
---

### Usage with styled components
In the following example we create a styled button component.

This is the folder structure we'll be working with.
```
.
+--components
|  +--Button.js
+--themes
|  +--mixins.js
```

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
  font-size: 18px;
  ${breakpoint.down('s')`
    font-size: 12px;
  `}
  ${breakpoint.s`
    background: palevioletred;
  `}
`;
```

The first mixin `breakpoint.down('s')`, will give the styled button component a font size of 12px, at a breakpoint bellow "s", i.e. max-width(320px).

The second mixin `breakpoint.m`, uses the short hand version of `breakpoint.up.('m')`, and will give the button a background of `palevioletred`, at a breakpoint above "m", i.e. min-width(768).

---

Happy coding!

/ The bees at [Humblebee](http://humblebee.se) 🐝
