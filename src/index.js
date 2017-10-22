// @flow
import { css } from 'styled-components';

// Flow-types
type Rule = 'up' | 'down' | 'only';
type Breakpoints = {[string]: number};

// Breakpoint
export const mediaWidthRule = (rule: Rule) => (
  `${{ up: 'min', down: 'max' }[rule] || 'min'}-width`
);

export const ruleTemplate = (rule: Rule, width: number) => `(${rule}: ${width}px)`;
export const mediaTemplate = (rules: string) => (
  `@media only screen and ${rules}`
);

export const getSmallestMedia = (breakpoints: Breakpoints): number => {
  const keys: string[] = Object.keys(breakpoints);

  return (
    Number(keys.reduce((acc: ?number, key: string): number => {
      if (acc) {
        return acc > breakpoints[key] ? breakpoints[key] : acc;
      }
      return breakpoints[key];
    }, undefined))
  );
};

export const getNextMedia = (breakpoints: Breakpoints, width: number): number => {
  const keys: string[] = Object.keys(breakpoints);

  const nextBreakpoint = Number(keys.reduce((acc: ?number, key: string): number => {
    const current = breakpoints[key];
    if (acc && width - current <= 0) {
      return width - acc > Math.abs(width - current) || width - acc === 0 ? current : acc;
    }
    return getSmallestMedia(breakpoints);
  }, undefined));

  if (nextBreakpoint === width) {
    throw new Error(`The breakpoint of value ${nextBreakpoint} is the heighst there is, did you mean to use "[media].up"?`);
  }
  return nextBreakpoint;
};

export const mediaRules =
(breakpoints: Breakpoints, widthKey: string, rule: Rule, boundKey?: string) => {
  const width = breakpoints[widthKey];
  const bound = breakpoints[boundKey];
  let baseWidthRule = mediaWidthRule(rule);
  let boudWidthRule;

  let baseRule = ruleTemplate(baseWidthRule, width);
  let boundRule;

  if (bound && width) {
    // Get correct rule based on width relative to bound
    baseWidthRule = mediaWidthRule(bound <= width ? 'down' : 'up');
    boudWidthRule = mediaWidthRule(bound <= width ? 'up' : 'down');

    baseRule = ruleTemplate(mediaWidthRule(bound <= width ? 'down' : 'up'), width);
    boundRule = ruleTemplate(boudWidthRule, bound);
    return [].concat([baseRule], bound ? [boundRule] : []).join(' and ');
  }

  if (!bound && rule === 'only') {
    // Get correct rule based on width relative to bound
    boudWidthRule = mediaWidthRule(bound <= width ? 'up' : 'down');
    boundRule = ruleTemplate(boudWidthRule, getNextMedia(breakpoints, width));
  }

  return [].concat([baseRule], boundRule ? [boundRule] : []).join(' and ');
};

export const getMixin = (breakpoints: Breakpoints, key: string, rule: Rule = 'up') => (bound: string) => (
  (...args) => css`
      ${mediaTemplate(mediaRules(breakpoints, key, rule, bound))}{
        ${css(...args)}
      }
    `
);

export const getMediaShorthands = (breakpoints, rule) => (
  Object.keys(breakpoints).reduce((acc: Object, key: string) => ({
    ...acc,
    [key]: getMixin(breakpoints, key, rule)(),
  }), {})
);

export const getMedia = (breakpoints: Breakpoints) => {
  const mediasUp = getMediaShorthands(breakpoints, 'up');

  return ({
    ...mediasUp,
    up: (widthKey: string) => getMixin(breakpoints, widthKey, 'up')(),
    down: (widthKey: string) => getMixin(breakpoints, widthKey, 'down')(),
    only: (widthKey: string, boundKey: string) => getMixin(breakpoints, widthKey, 'only')(boundKey),
  });
};

export default getMedia;
