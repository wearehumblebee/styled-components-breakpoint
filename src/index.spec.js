import media, {
  // mediaRules,
  mediaWidthRule,
  ruleTemplate,
  mediaTemplate,
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
  });
});

describe('mediaTemplate', () => {
  it('Returns a @media query', () => {
    expect(mediaTemplate('(min-width: 600px)')).toEqual('@media only screen and (min-width: 600px)');
  });
});

test('getSmallestMedia', () => {
  expect(getSmallestMedia(breakpoints)).toEqual(320);
});

describe('getNextMedia', () => {
  it('finds the next breakpoint and returns it as a number', () => {
    expect(getNextMedia({
      xs: 10, s: 20, m: 30, l: 40,
    }, 20)).toEqual(30);
  });
  it('throws an error if the passed width is equal to the widest breakpoint', () => {
    expect(() => {
      getNextMedia({
        xs: 10, s: 20, m: 30, l: 40,
      }, 40);
    }).toThrow();
  });
});


describe('mediaRules', () => {
  it('returns min-width when the rule is "up"', () => {
    expect(mediaRules(breakpoints, 'm', 'up')).toBe('(min-width: 768px)');
  });
  it('returns max-width rule when the rule is "down"', () => {
    expect(mediaRules(breakpoints, 'm', 'down')).toBe('(max-width: 768px)');
  });
  it('returns a range rule between min and max-width when both width and bound are present', () => {
    expect(mediaRules(breakpoints, 'm', 'only', 'l')).toBe('(min-width: 768px) and (max-width: 992px)');
  });
  it('returns a range rule between max and min-width when the bound is lower than the width', () => {
    expect(mediaRules(breakpoints, 'm', 'only', 's')).toBe('(max-width: 768px) and (min-width: 576px)');
  });
  it('returns a range rule between the width and the next upper breakpoint when the rule is "only" and the bound is undefined', () => {
    expect(mediaRules(breakpoints, 'm', 'only')).toBe('(min-width: 768px) and (max-width: 992px)');
  });
});

describe('breakpoint', () => {
  const bp = media(breakpoints);
  // it('returns a set of shorthand functions', () => {
  //
  // })
  describe('utilities', () => {
    describe('only', () => {
      it('Implicitly returns a range media query between breakpoint "m" and the next upper breakpoint', () => {
        expect(bp.only('m')`baground: red;`[1]).toMatch('@media only screen and (min-width: 768px) and (max-width: 992px)');
      });
      it('Returns a range media query between the first and second arguemt', () => {
        expect(bp.only('m', 'xl')`baground: red;`[1]).toMatch('@media only screen and (min-width: 768px) and (max-width: 1200px)');
      });
      it('Returns a range media query stating from a higher breakpoint going down', () => {
        expect(bp.only('xl', 'm')`baground: red;`[1]).toMatch('@media only screen and (max-width: 1200px) and (min-width: 768px)');
      });
    });
    describe('down', () => {
      it('Returns a max-widht media query', () => {
        expect(bp.down('m')`baground: red;`[1]).toMatch('@media only screen and (max-width: 768px)');
      });
    });
    describe('up', () => {
      it('Returns a min-widht media query', () => {
        expect(bp.up('m')`baground: red;`[1]).toMatch('@media only screen and (min-width: 768px)');
      });
    });
    describe('shorthand', () => {
      it('Returns the min-widht media query for breakpoint xs', () => {
        expect(bp.xs`baground: red;`[1]).toMatch('@media only screen and (min-width: 320px)');
      });
      it('Returns the min-widht media query for breakpoint s', () => {
        expect(bp.s`baground: red;`[1]).toMatch('@media only screen and (min-width: 576px)');
      });
      it('Returns the min-widht media query for breakpoint m', () => {
        expect(bp.m`baground: red;`[1]).toMatch('@media only screen and (min-width: 768px)');
      });
      it('Returns the min-widht media query for breakpoint l', () => {
        expect(bp.l`baground: red;`[1]).toMatch('@media only screen and (min-width: 992px)');
      });
      it('Returns the min-widht media query for breakpoint xl', () => {
        expect(bp.xl`baground: red;`[1]).toMatch('@media only screen and (min-width: 1200px)');
      });
    });
    describe('list', () => {
      it('stores an array of breakpoints in the order they where defined', () => {
        expect(bp.list).toEqual(['xs', 's', 'm', 'l', 'xl']);
      })
    });
  });
});
