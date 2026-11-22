/**
 * Not Flash's: the key that names a template element as a patch's `element` or a binding's key does,
 * from the chain of elements the window's root holds it by. The extension inspector names what it
 * finds under the pointer by it (`inspectKey`), the skin map the elements that draw a skin
 * (`buildSkinMap`). Pure: no Pixi, so a Node tool reads templates with it too.
 */
import { resolveTemplateNames } from './templateBindings';
import type { TemplateElement } from './templateData';

/**
 * `''` the window itself (`chain[0]`), `'name'`, `'panel/@2'`, `'@0/@1'`: the last element's own name
 * when that finds it, else the nearest named ancestor that does and the child indexes under it.
 * `undefined` for an element the template does not have - a clone a list's code made.
 */
export const templateElementKey = (chain: readonly TemplateElement[]): string | undefined => {
    const root = chain[0];
    const target = chain[chain.length - 1];
    const roots = [ root ];
    const finds = (key: string) => resolveTemplateNames(roots, [ key ]).targets.get(key) === target;

    if (target === root) return '';

    if (target.name && finds(target.name)) return target.name;

    // Index steps from `from` (a chain position) down to the target.
    const indexes = (from: number): string[] | undefined => {
        const steps: string[] = [];

        for (let at = from + 1; at < chain.length; at++) {
            const index = chain[at - 1].children.indexOf(chain[at]);

            if (index < 0) return undefined;

            steps.push(`@${index}`);
        }

        return steps;
    };

    for (let at = chain.length - 2; at >= 1; at--) {
        const name = chain[at].name;

        if (!name || resolveTemplateNames(roots, [ name ]).targets.get(name) !== chain[at]) continue;

        const steps = indexes(at);
        const key = steps && [ name, ...steps ].join('/');

        if (key && finds(key)) return key;
    }

    // From the window itself: a leading `@N` counts in its children.
    const steps = indexes(0);
    const key = steps?.join('/');

    return (key && finds(key)) ? key : undefined;
};
