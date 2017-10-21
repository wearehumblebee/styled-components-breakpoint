[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![codecov](https://codecov.io/gh/wearehumblebee/styled-components-breakpoint/branch/master/graph/badge.svg)](https://codecov.io/gh/wearehumblebee/styled-components-breakpoint)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)]()

## Styled Components Breakpoint 💅
This package provides a set of utility functions for working with CSS media queries in [Styled Components](https://www.styled-components.com/).

#### Why do I need this?
Media queries can easily become unwieldy and difficult to read at first glance, and we usually want a way to make them reusable through out our project. In SASS and LESS this problem is often solved using mixins. Mixins help to abstracting the otherwise verbose nature of media queries, making them both more readable and easier to type.
This library provides a small set of utiltiy functions that solves these same problems for dealing with media queries in [Styled Components](https://www.styled-components.com/).

This library allows you to set up any number of breakpoints with a naming convention of your choice.
Once set up you'll have three main utility functions for each breakpoint: `up` (min-width), `down` (max-width), and `only` (a range between two media queries).

---

### Installation
```sh
yarn install @humblebee/styled-components-breakpoint
# or
npm install @humblebee/styled-components-breakpoint
```
---

### Usage and examples

The default export of `styled-components-breakpoint` is a function that accepts a `config` object with your breakpoints. This will return an instance with the utility function `up`, `down` and `only`.

```javascript
import styledBreakpoint from '@humblebee/styled-components-breakpoint';

// Creates an instance of styled-components-breakpoint with an object of breakpoints.
export const breakpoint = styledBreakpoint({
  xs: 320,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
});
```

In the example above the `const breakpoint` With this config in place you can make use of the breakpoints in the following way:

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

To encourage mobile first media queries (min-width) there is a shorthand, or alias if you will. `breakpoint.m` is an alias for `breakppoint.up('m')`.

```javascript
`breakpoint.m'`
// Will return:
// @media only screen and (min-width: 768px)
```
---

### Usage with styled components
In the following example we create a styled button component.

Here's an example folder structure. I like to keep my mixins close to my other global styles to make them easy to discover, in this case the theme folder.
```
.
+--componsnts
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

// The first function "breakpoint.down(s)" will give the styled button component a font size of 12px, at a breakpoint lover than "s", i.e. max-width(320px).

// The second function "breakpoint.m", uses the short hand version of `"breakpoint.up.('m')"`, and will give the button a background of palevioletred  at a breakpoint higher than "m", i.e. min-width(768).
const Button = styled.button`
    background: white;
    font-size: 18px;
    ${breakpoint.down(s)}`
      font-size: 12px;
    `
    ${breakpoint.m}`
      background: palevioletred;
    `
  `
});
```
---

#### Recommended read
For more on "mixins" in [Styled Components](https://www.styled-components.com/).

---

Happy coding!
/The bees at [Humblebee](http://humblebee.se) 🐝
