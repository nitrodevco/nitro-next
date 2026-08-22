/**
 * theme/AccordionItem.tsx renders nothing of its own - it's a bare `AccordionItemContext.
 * Provider` wrapping `children`, with no host element, no className, no styling. That makes
 * it renderer-agnostic in the same way AccordionContext itself is (see ./AccordionContext.tsx
 * for the fuller reasoning), so it is reused verbatim from '#base/theme-core' rather than forked.
 */
export { AccordionItem } from '#base/theme-core';
