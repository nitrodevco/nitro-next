/**
 * theme/AccordionContext.tsx is pure React Context + hooks - `createContext`/`useContext`
 * only, zero JSX, zero DOM dependency (no className, no host element, no styling of any
 * kind). It behaves identically whether the tree underneath is rendered by react-dom or
 * react-pixi, so it is reused verbatim from '#base/theme' here instead of being forked, the
 * same way VariantCascadeContext/useCascadedVariant/VARIANT_CASCADE_CONFIG are reused
 * verbatim elsewhere in this package (see e.g. Border.tsx, ContentArea.tsx). This file exists
 * so theme-pixi call sites can `import { useAccordion } from '#base/theme-pixi'` alongside
 * the rest of the Accordion family without reaching into '#base/theme' directly - unlike
 * VariantCascadeContext (an internal implementation detail no view ever imports directly),
 * useAccordion/useAccordionItem/AccordionContext are part of the public API a Pixi view needs.
 *
 * Note: `eslint-plugin-react-refresh`'s `only-export-components` rule flags the two hook
 * re-exports below with a false-positive warning (not an error). It special-cases
 * `export const X = createContext(...)` declarations, but can't see through a bare
 * `export { X } from 'module'` re-export to know `AccordionContext`/`AccordionItemContext`
 * are contexts rather than components, so it falls back to a PascalCase-name heuristic,
 * assumes they're components, and then flags the lowercase `useAccordion`/`useAccordionItem`
 * exports as "non-component" in what it thinks is a component file. Confirmed by reading the
 * rule's source (node_modules/eslint-plugin-react-refresh) - there is no re-export form that
 * avoids this without either duplicating the createContext(...) calls (defeating the verbatim
 * reuse this file exists for) or dropping the AccordionContext/AccordionItemContext exports
 * entirely (which Accordion.tsx needs for its `.Provider`). Left as a harmless warn-level
 * warning rather than worked around.
 */
export {
    AccordionContext,
    type AccordionContextValue,
    AccordionItemContext,
    type AccordionType,
    useAccordion,
    useAccordionItem,
} from '#base/theme';
