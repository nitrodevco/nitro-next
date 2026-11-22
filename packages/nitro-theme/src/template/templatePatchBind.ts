/**
 * Not Flash's: a patch's `bind` op - what `api.templates.bind` does, written as data, so a theme with
 * no code (a plugin's `template-patches.json`, a hotel's patch in the admin panel) gives an element a
 * value per window or per row of a list: a catalogue tab's icon from the tab's page.
 *
 * Its values may hold placeholders, filled each time the binding is drawn:
 * - `${ctx.<key>}`: the window's context (for a row, the row's own over it), as a module's binding
 *   function is given it;
 * - `${item.<key>}`: with `items`, the row drawn - `key`, `index`, `list` - or its own context's key;
 * - `${text.<key>}`: the text of that key;
 * - `${style:<name>}`: a theme style property, filled as the patch file is read.
 * A value that is one placeholder keeps the value's type (a colour stays a number); one inside text is
 * written into it. A relative `asset` is a file beside the patch: the owning plugin's `wwwroot`.
 *
 * Kept free of runtime imports beyond the template helpers, so a test runs it under Node.
 */
import type { TemplateBinding, TemplateItemContext } from './templateBindings';
import type { TemplateContext } from './templatePatch';
import { ownedElementName } from './templatePatch';

/** The binding fields a `bind` op may give, and the type each takes. */
export const TEMPLATE_BIND_FIELDS = {
    caption: 'string',
    htmlText: 'string',
    tooltip: 'string',
    asset: 'string',
    helpPage: 'string',
    visible: 'boolean',
    background: 'boolean',
    greyscale: 'boolean',
    disabled: 'boolean',
    selected: 'boolean',
    italic: 'boolean',
    underline: 'boolean',
    crop: 'boolean',
    color: 'number',
    backgroundColor: 'number',
    etchingColor: 'number',
    alpha: 'number',
    blend: 'number',
    rotation: 'number',
} as const satisfies Partial<Record<keyof TemplateBinding, 'string' | 'number' | 'boolean'>>;

export type TemplateBindField = keyof typeof TEMPLATE_BIND_FIELDS;

/** What a `bind` op gives: binding fields, each a value of its type or text with placeholders. */
export type TemplateBindValues = Partial<Record<TemplateBindField, string | number | boolean>>;

/**
 * Binds `element` as `api.templates.bind(template, element, binding, { items, override })` does:
 * without `override` an element its owner added (named as the op's other ops name it), with it one
 * the window's code binds, named as the code names it.
 */
export interface TemplateBindOp {
    element: string;
    bind: TemplateBindValues;
    items?: boolean;
    override?: boolean;
}

export const isTemplateBindOp = (op: object): op is TemplateBindOp => 'bind' in op;

/** The placeholder roots a `bind` value may name. */
const PLACEHOLDER = /\$\{([^}]*)\}/g;
const WHOLE_PLACEHOLDER = /^\$\{([^}]*)\}$/;
const ROOTED = /^(ctx|item|text)\.(.+)$/;
const STYLE = /^style:[A-Za-z0-9._:-]+$/;
/** An address of its own: a scheme, a path from the host's root, or a hotel variable the window fills. */
const NOT_RELATIVE = /^(?:[a-z][a-z\d+.-]*:|\/|\$\{)/i;

/**
 * The element key a `bind` op's binding takes, as the window's bindings are keyed: each part an
 * element `owner` added (`isOwned` of its owned name) by its owned name - and, without `override`,
 * the element itself always, as a module's `bind` names only what it added.
 */
export const templateBindElement = (owner: string, op: Pick<TemplateBindOp, 'element' | 'override'>, isOwned: (ownedName: string) => boolean) => {
    const parts = op.element.split('/');

    return parts.map((part, index) => (((op.override !== true) && (index === parts.length - 1)) || isOwned(ownedElementName(owner, part)) ? ownedElementName(owner, part) : part)).join('/');
};

interface AddedInput { name?: string; bindAs?: string; children?: AddedInput[] }

/**
 * The owned names of the elements `ops` add (`insert`'s `add`, `wrap`), their children's too: what a
 * `bind` op beside them names by the short name (`templateBindElement`'s `isOwned`).
 */
export const templatePatchAddedNames = (owner: string, ops: readonly object[]): Set<string> => {
    const names = new Set<string>();
    const add = (input: AddedInput | undefined) => {
        if (!input || typeof input !== 'object') return;

        const name = input.name ?? input.bindAs;

        if (typeof name === 'string') names.add(ownedElementName(owner, name));

        if (Array.isArray(input.children)) input.children.forEach(add);
    };

    for (const op of ops) {
        if ('add' in op) add(op.add as AddedInput);
        else if ('wrap' in op) add(op.wrap as AddedInput);
    }

    return names;
};

/** What is wrong with a `bind` op, a sentence each: none for one a client binds. */
export const templateBindProblems = (op: TemplateBindOp): string[] => {
    const problems: string[] = [];

    if ((op.items !== undefined) && (typeof op.items !== 'boolean')) problems.push('"items" is true or false.');

    if ((op.override !== undefined) && (typeof op.override !== 'boolean')) problems.push('"override" is true or false.');

    if (op.element === '' && op.override !== true) problems.push('The window itself (\'\') is the code\'s: bind it with "override": true.');

    if (!op.bind || typeof op.bind !== 'object' || Array.isArray(op.bind) || !Object.keys(op.bind).length) {
        problems.push(`"bind" is an object of binding fields (${Object.keys(TEMPLATE_BIND_FIELDS).join(', ')}).`);

        return problems;
    }

    for (const [ field, value ] of Object.entries(op.bind)) {
        const type = TEMPLATE_BIND_FIELDS[field as TemplateBindField] as string | undefined;

        if (!type) {
            problems.push(`bind has ${field}, which is no binding field (${Object.keys(TEMPLATE_BIND_FIELDS).join(', ')}).`);

            continue;
        }

        if (typeof value === 'string') {
            for (const [ , name ] of value.matchAll(PLACEHOLDER)) {
                const rooted = ROOTED.exec(name);

                // `${text.icon.${item.index}}`: filled once, from the key as written, the outer names a
                // text no hotel has ("icon.${item.index") and the inner is never filled.
                if (name.includes('${')) problems.push(`bind's ${field} puts a placeholder inside another (${value}): placeholders are filled once and do not nest, so it names no key. Bind each row's own value (\${item.<key>}) or one whole key.`);
                else if (!rooted && !STYLE.test(name)) problems.push(`bind's ${field} names \${${name}}: a placeholder is \${ctx.<key>}, \${item.<key>}, \${text.<key>} or \${style:<name>}.`);
                else if (rooted?.[1] === 'item' && op.items !== true) problems.push(`bind's ${field} names \${${name}}, which a row has: give the op "items": true.`);
            }

            // A value of another type is written as text, filled or not.
            if (type !== 'string' && !WHOLE_PLACEHOLDER.test(value) && !value.includes('${') && coerce(value, type) === undefined) problems.push(`bind's ${field} is ${type === 'number' ? 'a number (a colour 0xAARRGGBB, as 4285229153)' : 'true or false'}.`);

            continue;
        }

        if (typeof value !== type) problems.push(`bind's ${field} is ${type === 'number' ? 'a number (a colour 0xAARRGGBB, as 4285229153)' : type === 'boolean' ? 'true or false' : 'text'}.`);
    }

    return problems;
};

/** What a `bind` op's placeholders are filled from, for one window or row as it is drawn. */
export interface TemplateBindScope {
    /** The window's context, a row's own laid over it. */
    context: TemplateContext;
    /** The row drawn, for an `items` binding. */
    item?: TemplateItemContext;
    /** The row's own context. */
    itemContext?: TemplateContext;
    /** A text by its key. */
    text: (key: string) => string;
    /** What a relative `asset` is resolved against: the patch file's url (or a module's base). */
    base?: string;
}

const coerce = (value: unknown, type: string): string | number | boolean | undefined => {
    if (typeof value === type) return value as string | number | boolean;

    if (type === 'string') return (typeof value === 'number' || typeof value === 'boolean') ? String(value) : undefined;

    if (type === 'boolean') return (value === 'true') ? true : (value === 'false') ? false : undefined;

    if (typeof value !== 'string' || !value.trim()) return undefined;

    const number = Number(value);

    return Number.isFinite(number) ? number : undefined;
};

/** `path` read from beside `base`; as it is when `base` has no folder to be beside (a `data:` url). */
const beside = (path: string, base: string) => {
    try {
        return new URL(path, base).href;
    } catch {
        return path;
    }
};

const lookup = (name: string, scope: TemplateBindScope): string | number | boolean | undefined => {
    const rooted = ROOTED.exec(name);

    if (!rooted) return undefined;

    const [ , root, key ] = rooted;

    if (root === 'text') return scope.text(key);

    if (root === 'ctx') return scope.context[key] ?? undefined;

    if (!scope.item) return undefined;

    if (key === 'key' || key === 'index' || key === 'list') return scope.item[key];

    return scope.itemContext?.[key] ?? undefined;
};

/**
 * A `bind` op's values as the binding they make for `scope`. A field whose placeholder has no value
 * there (a context key the window does not give), or whose value is not of its type, is left out -
 * the window's own drawn - and passed to `miss`, the placeholder or the field.
 */
export const resolveTemplateBind = (values: TemplateBindValues, scope: TemplateBindScope, miss: (what: string) => void): TemplateBinding => {
    const binding: Record<string, unknown> = {};

    for (const [ field, value ] of Object.entries(values)) {
        const type = TEMPLATE_BIND_FIELDS[field as TemplateBindField] as string | undefined;

        if (!type || value === undefined) continue;

        let resolved: unknown = value;

        if (typeof value === 'string') {
            const whole = WHOLE_PLACEHOLDER.exec(value);
            let missing: string | undefined;

            if (whole) {
                resolved = lookup(whole[1], scope);

                if (resolved === undefined) missing = `\${${whole[1]}}`;
            } else {
                resolved = value.replace(PLACEHOLDER, (token, name: string) => {
                    const found = lookup(name, scope);

                    if (found === undefined) missing ??= token;

                    return (found === undefined) ? token : String(found);
                });
            }

            if (missing !== undefined) {
                miss(missing);

                continue;
            }
        }

        const typed = coerce(resolved, type);

        if (typed === undefined) {
            miss(field);

            continue;
        }

        binding[field] = (field === 'asset' && scope.base && !NOT_RELATIVE.test(typed as string)) ? beside(typed as string, scope.base) : typed;
    }

    return binding;
};
