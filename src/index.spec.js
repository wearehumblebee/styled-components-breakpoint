import {
  // mediaRules,
  mediaWidthRule,
  ruleTemplate,
  mediaTemplate,
  getMedia,
  getSmallestMedia,
  getNextMedia,
  mediaRules,
} from './';

const breakpoints = {
  xs: 320,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
};

describe('mediaWidthRule', () => {
  it('returns min-witdh for string "up"', () => {
    expect(mediaWidthRule('up')).toBe('min-width');
  });
  it('returns max-witdh for string "down"', () => {
    expect(mediaWidthRule('down')).toBe('max-width');
  });
  it('returns min-width when rule is not found', () => {
    expect(mediaWidthRule('unknown')).toBe('min-width');
  });
  it('returns min-width when rule is undefined', () => {
    expect(mediaWidthRule()).toBe('min-width');
  });
});

describe('ruleTemplate', () => {
  it('Returns a width rule', () => {
    expect(ruleTemplate('min-width', 600)).toEqual('(min-width: 600px)');
  })
});

describe('mediaTemplate', () => {
  it('Returns a @media query', () => {
    expect(mediaTemplate('(min-width: 600px)')).toEqual('@media only screen and (min-width: 600px)');
  })
});

test('getSmallestMedia', () => {
  expect(getSmallestMedia(breakpoints)).toEqual(320);
});

describe('getNextMedia', () => {
  it('finds the next breakpoint and returns it as a number', () => {
    expect(getNextMedia({ xs: 10, s: 20, m: 30, l: 40 }, 20)).toEqual(30);
  });
  it('throws an error if the passed width is equal to the widest breakpoint', () => {
    expect(() => { getNextMedia({ xs: 10, s: 20, m: 30, l: 40 }, 40); }).toThrow();
  })
});


describe('mediaRules', () => {
  it('returns min-width when the rule is "up"', () => {
    expect(mediaRules(breakpoints, 'm', 'up')).toBe('(min-width: 768px)');
  })
  it('returns max-width rule when the rule is "down"', () => {
    expect(mediaRules(breakpoints, 'm', 'down')).toBe('(max-width: 768px)');
  })
  it('returns a range rule between min and max-width when both width and bound is present', () => {
    expect(mediaRules(breakpoints, 'm', 'only', 'l')).toBe('(min-width: 768px) and (max-width: 992px)');
  })
  it('returns a range rule between max and min-width when the bound is lower than the width', () => {
    expect(mediaRules(breakpoints, 'm', 'only', 's')).toBe('(max-width: 768px) and (min-width: 576px)');
  })
  it('returns a range rule between the width and the next upper breakpoint when the rule is "only" and the bound is undefined', () => {
    expect(mediaRules(breakpoints, 'm', 'only')).toBe('(min-width: 768px) and (max-width: 992px)');
  })
})
