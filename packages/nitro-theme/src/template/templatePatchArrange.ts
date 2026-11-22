/**
 * Not Flash's: a patch's `arrange` op - what `api.templates.arrange` does, written as data, so a theme
 * with no code (a plugin's `template-patches.json`, a hotel's patch in the admin panel) moves and sizes
 * an element once the window is laid out, from what the layout measured and from the window's context:
 * a catalogue page's title beside its teaser picture, the page under a header only some pages show.
 *
 * Each of `x`, `y`, `width`, `height` is a number or a formula, worked out after the window's own
 * `arrange` (and the patches' in their order) and given to the element in one `setRectangle`, as the
 * window's code sizes one - a field not given keeps the element's. A formula reads:
 * - `${<element>.<measure>}`: an element's `x`, `y`, `width`, `height`, `textWidth` or `textHeight`
 *   as laid out so far - an earlier op's change included; `${window.<measure>}` the window itself;
 * - `${ctx.<key>}`: the window's context, as a module's arrange is given it (no value: `null`);
 * - numbers, `'text'`, `true` / `false` / `null`; `+ - * / %`, `== != < <= > >=`, `&& || !`,
 *   `a ? b : c` and brackets; `min`, `max`, `round`, `floor`, `ceil`, `abs` and `oneOf(value, a, b, ...)`.
 * A `${style:<name>}` is filled as the patch file is read, as anywhere in a patch.
 *
 * Kept free of runtime imports beyond the template helpers, so a test runs it under Node.
 */
import type { TemplateWindows } from './templateBindings';
import type { LayoutWindow } from './templateLayout';
import type { TemplateContext } from './templatePatch';
import { templateBindElement } from './templatePatchBind';

/** The fields an `arrange` op may give, in the order they are worked out. */
export const TEMPLATE_ARRANGE_FIELDS = [ 'x', 'y', 'width', 'height' ] as const;

export type TemplateArrangeField = typeof TEMPLATE_ARRANGE_FIELDS[number];

/** What a formula may read of an element. */
export const TEMPLATE_ARRANGE_MEASURES = [ 'x', 'y', 'width', 'height', 'textWidth', 'textHeight' ] as const;

type Measure = typeof TEMPLATE_ARRANGE_MEASURES[number];

/** The name a formula reads the window itself by. */
export const TEMPLATE_ARRANGE_WINDOW = 'window';

/**
 * How long a formula may be, how deep it may nest (brackets, calls, choices and signs, each a level of
 * the recursive parser) and how many values a call may take; past them it is refused, never read.
 * Turbo's patch check caps the same (`TemplateArrangeFormula.cs`), where a deep one would overflow the
 * server's stack.
 */
export const TEMPLATE_ARRANGE_MAX_LENGTH = 500;
export const TEMPLATE_ARRANGE_MAX_DEPTH = 32;
export const TEMPLATE_ARRANGE_MAX_ARGS = 16;

/** The functions a formula may call, and how many arguments each takes (at least, at most). */
const FUNCTIONS: Readonly<Record<string, readonly [ number, number ]>> = {
    min: [ 1, Infinity ],
    max: [ 1, Infinity ],
    round: [ 1, 1 ],
    floor: [ 1, 1 ],
    ceil: [ 1, 1 ],
    abs: [ 1, 1 ],
    oneOf: [ 2, Infinity ],
};

/** Moves and sizes `element` once the window is laid out: each field a number or a formula. */
export interface TemplateArrangeOp {
    element: string;
    arrange: Partial<Record<TemplateArrangeField, number | string>>;
}

export const isTemplateArrangeOp = (op: object): op is TemplateArrangeOp => 'arrange' in op;

type Value = number | string | boolean | null;

type Node
    = | { kind: 'value'; value: Value }
        | { kind: 'ctx'; key: string }
        | { kind: 'measure'; element: string; measure: Measure }
        | { kind: 'style'; name: string }
        | { kind: 'unary'; operator: '-' | '!'; operand: Node }
        | { kind: 'binary'; operator: string; left: Node; right: Node }
        | { kind: 'if'; test: Node; then: Node; otherwise: Node }
        | { kind: 'call'; name: string; args: Node[] };

type Token = { kind: 'number' | 'string' | 'ref' | 'name' | 'operator'; text: string; value?: Value };

const OPERATORS = [ '||', '&&', '==', '!=', '<=', '>=', '<', '>', '+', '-', '*', '/', '%', '!', '?', ':', '(', ')', ',' ];

const tokenize = (text: string): Token[] => {
    const tokens: Token[] = [];
    let at = 0;

    while (at < text.length) {
        const rest = text.slice(at);
        const space = /^\s+/.exec(rest);

        if (space) {
            at += space[0].length;

            continue;
        }

        const number = /^(?:0x[0-9a-fA-F]+|\d+(?:\.\d+)?|\.\d+)/.exec(rest);

        if (number) {
            tokens.push({ kind: 'number', text: number[0], value: Number(number[0]) });
            at += number[0].length;

            continue;
        }

        if (rest.startsWith('${')) {
            const end = rest.indexOf('}');

            if (end < 0) throw new Error(`a \${ has no closing } (${rest})`);

            const name = rest.slice(2, end);

            if (name.includes('${')) throw new Error(`a placeholder is inside another (${rest.slice(0, end + 1)}): they do not nest`);

            tokens.push({ kind: 'ref', text: name });
            at += end + 1;

            continue;
        }

        if (rest[0] === '\'') {
            const string = /^'((?:[^'\\]|\\.)*)'/.exec(rest);

            if (!string) throw new Error(`a text in quotes has no closing quote (${rest})`);

            tokens.push({ kind: 'string', text: string[0], value: string[1].replace(/\\(.)/g, '$1') });
            at += string[0].length;

            continue;
        }

        const name = /^[A-Za-z_][A-Za-z0-9_]*/.exec(rest);

        if (name) {
            tokens.push({ kind: 'name', text: name[0] });
            at += name[0].length;

            continue;
        }

        const operator = OPERATORS.find(candidate => rest.startsWith(candidate));

        if (!operator) throw new Error(`'${rest[0]}' is no part of a formula`);

        tokens.push({ kind: 'operator', text: operator });
        at += operator.length;
    }

    return tokens;
};

const reference = (name: string): Node => {
    if (name.startsWith('ctx.') && name.length > 4) return { kind: 'ctx', key: name.slice(4) };

    if (/^style:[A-Za-z0-9._:-]+$/.test(name)) return { kind: 'style', name: name.slice(6) };

    if (/^(item|text)\./.test(name)) throw new Error(`\${${name}}: an arrange reads the window, its elements and \${ctx.<key>}, not a row's or a text's value`);

    const dot = name.lastIndexOf('.');
    const element = (dot > 0) ? name.slice(0, dot) : '';
    const measure = name.slice(dot + 1) as Measure;

    if ((dot <= 0) || !TEMPLATE_ARRANGE_MEASURES.includes(measure)) throw new Error(`\${${name}} reads nothing: write \${<element>.<measure>} (${TEMPLATE_ARRANGE_MEASURES.join(', ')}), \${${TEMPLATE_ARRANGE_WINDOW}.<measure>} or \${ctx.<key>}`);

    return { kind: 'measure', element, measure };
};

/** Recursive descent over the tokens, loosest first: `?:`, `||`, `&&`, comparison, `+ -`, `* / %`, unary. */
const parse = (text: string): Node => {
    if (text.length > TEMPLATE_ARRANGE_MAX_LENGTH) throw new Error(`a formula is at most ${TEMPLATE_ARRANGE_MAX_LENGTH} characters, not ${text.length}: split it over ops (a later op reads what an earlier one set)`);

    const tokens = tokenize(text);
    let at = 0;
    let depth = 0;
    /** `read` one level deeper, refused past the cap. */
    const nested = <T>(read: () => T): T => {
        if (++depth > TEMPLATE_ARRANGE_MAX_DEPTH) throw new Error(`a formula nests at most ${TEMPLATE_ARRANGE_MAX_DEPTH} deep (brackets, calls, choices and signs inside one another)`);

        const node = read();

        depth--;

        return node;
    };
    const peek = (operator: string) => (tokens[at]?.kind === 'operator') && (tokens[at].text === operator);
    const expect = (operator: string) => {
        if (!peek(operator)) throw new Error(`'${operator}' was expected ${tokens[at] ? `before '${tokens[at].text}'` : 'at the end'}`);

        at++;
    };
    const binary = (operators: readonly string[], next: () => Node) => (): Node => {
        let left = next();

        while (operators.some(peek)) {
            const operator = tokens[at++].text;

            left = { kind: 'binary', operator, left, right: next() };
        }

        return left;
    };

    const primary = (): Node => {
        const token = tokens[at++];

        if (!token) throw new Error('the formula ends where a value was expected');

        if (token.kind === 'number' || token.kind === 'string') return { kind: 'value', value: token.value ?? null };

        if (token.kind === 'ref') return reference(token.text);

        if (token.kind === 'name') {
            if (token.text === 'true' || token.text === 'false') return { kind: 'value', value: token.text === 'true' };

            if (token.text === 'null') return { kind: 'value', value: null };

            const arity = FUNCTIONS[token.text];

            if (!arity) throw new Error(`'${token.text}' is no function (${Object.keys(FUNCTIONS).join(', ')}); an element is read as \${<element>.<measure>}`);

            expect('(');

            const args: Node[] = [];

            if (!peek(')')) {
                do {
                    if (args.length >= TEMPLATE_ARRANGE_MAX_ARGS) throw new Error(`${token.text} takes at most ${TEMPLATE_ARRANGE_MAX_ARGS} values`);

                    args.push(expression());
                }
                while (peek(',') && ++at);
            }

            expect(')');

            if (args.length < arity[0] || args.length > arity[1]) throw new Error(`${token.text} takes ${arity[0] === arity[1] ? arity[0] : `at least ${arity[0]}`} value(s), not ${args.length}`);

            return { kind: 'call', name: token.text, args };
        }

        if (token.text === '(') {
            const inner = expression();

            expect(')');

            return inner;
        }

        throw new Error(`'${token.text}' is where a value was expected`);
    };

    const unary = (): Node => {
        if (peek('-') || peek('!')) {
            const operator = tokens[at++].text as '-' | '!';

            return { kind: 'unary', operator, operand: nested(unary) };
        }

        return primary();
    };

    const product = binary([ '*', '/', '%' ], unary);
    const sum = binary([ '+', '-' ], product);
    const comparison = binary([ '==', '!=', '<=', '>=', '<', '>' ], sum);
    const and = binary([ '&&' ], comparison);
    const or = binary([ '||' ], and);

    const expression = (): Node => nested(() => {
        const test = or();

        if (!peek('?')) return test;

        at++;

        const then = expression();

        expect(':');

        return { kind: 'if', test, then, otherwise: expression() };
    });

    const node = expression();

    if (at < tokens.length) throw new Error(`'${tokens[at].text}' follows a whole formula`);

    return node;
};

/** Each formula parsed once: a patch is drawn many times. */
const parsed = new Map<string, Node | Error>();

const parseCached = (text: string): Node | Error => {
    let node = parsed.get(text);

    if (!node) {
        try {
            node = parse(text);
        } catch (error) {
            node = (error instanceof Error) ? error : new Error(String(error));
        }

        parsed.set(text, node);
    }

    return node;
};

const nodeOf = (value: number | string): Node | Error => ((typeof value === 'number') ? { kind: 'value', value } : parseCached(value));

/** What is wrong with an `arrange` op, a sentence each: none for one a client arranges. */
export const templateArrangeProblems = (op: TemplateArrangeOp): string[] => {
    const problems: string[] = [];

    if (!op.arrange || typeof op.arrange !== 'object' || Array.isArray(op.arrange) || !Object.keys(op.arrange).length) {
        problems.push(`"arrange" is an object of ${TEMPLATE_ARRANGE_FIELDS.join(', ')}, each a number or a formula.`);

        return problems;
    }

    for (const [ field, value ] of Object.entries(op.arrange)) {
        if (!TEMPLATE_ARRANGE_FIELDS.includes(field as TemplateArrangeField)) {
            problems.push(`arrange has ${field}, which it does not set (${TEMPLATE_ARRANGE_FIELDS.join(', ')}).`);

            continue;
        }

        if (typeof value === 'number') {
            if (!Number.isFinite(value)) problems.push(`arrange's ${field} is a number.`);

            continue;
        }

        if (typeof value !== 'string' || !value.trim()) {
            problems.push(`arrange's ${field} is a number or a formula.`);

            continue;
        }

        const node = parseCached(value);

        if (node instanceof Error) problems.push(`arrange's ${field} (${value}): ${node.message}.`);
    }

    return problems;
};

/** The elements an `arrange` op's formulas read, as written: the patched template has to have each. */
export const templateArrangeReads = (op: TemplateArrangeOp): string[] => {
    const reads = new Set<string>();
    const walk = (node: Node) => {
        if (node.kind === 'measure' && node.element !== TEMPLATE_ARRANGE_WINDOW) reads.add(node.element);
        else if (node.kind === 'unary') walk(node.operand);
        else if (node.kind === 'binary') {
            walk(node.left);
            walk(node.right);
        } else if (node.kind === 'if') {
            walk(node.test);
            walk(node.then);
            walk(node.otherwise);
        } else if (node.kind === 'call') node.args.forEach(walk);
    };

    for (const value of Object.values(op.arrange ?? {})) {
        if (typeof value !== 'string') continue;

        const node = parseCached(value);

        if (!(node instanceof Error)) walk(node);
    }

    return [ ...reads ];
};

/** A formula's element that the window drawn does not have: the field is left as the layout put it. */
class Unread extends Error {}

const truthy = (value: Value) => (value !== null) && (value !== false) && (value !== 0) && (value !== '') && !Number.isNaN(value);

const numberOf = (value: Value) => ((typeof value === 'number') ? value : (typeof value === 'boolean') ? (value ? 1 : 0) : (typeof value === 'string' && value.trim()) ? Number(value) : NaN);

const equal = (a: Value, b: Value) => ((a === null || b === null) ? a === b : (typeof a === typeof b) ? a === b : String(a) === String(b));

const evaluate = (node: Node, read: (element: string) => LayoutWindow | undefined, context: TemplateContext): Value => {
    const run = (next: Node) => evaluate(next, read, context);

    switch (node.kind) {
        case 'value':
            return node.value;
        case 'ctx':
            return context[node.key] ?? null;
        case 'style':
            throw new Unread(`\${style:${node.name}}`);
        case 'measure': {
            const window = read(node.element);

            if (!window) throw new Unread(`'${node.element}'`);

            return window[node.measure];
        }
        case 'unary':
            return (node.operator === '!') ? !truthy(run(node.operand)) : -numberOf(run(node.operand));
        case 'if':
            return truthy(run(node.test)) ? run(node.then) : run(node.otherwise);
        case 'call': {
            if (node.name === 'oneOf') {
                const [ first, ...rest ] = node.args.map(run);

                return rest.some(value => equal(first, value));
            }

            const args = node.args.map(arg => numberOf(run(arg)));

            switch (node.name) {
                case 'min': return Math.min(...args);
                case 'max': return Math.max(...args);
                case 'round': return Math.round(args[0]);
                case 'floor': return Math.floor(args[0]);
                case 'ceil': return Math.ceil(args[0]);
                default: return Math.abs(args[0]);
            }
        }
        case 'binary': {
            if (node.operator === '&&') {
                const left = run(node.left);

                return truthy(left) ? run(node.right) : left;
            }

            if (node.operator === '||') {
                const left = run(node.left);

                return truthy(left) ? left : run(node.right);
            }

            const left = run(node.left);
            const right = run(node.right);

            if (node.operator === '==') return equal(left, right);

            if (node.operator === '!=') return !equal(left, right);

            const a = numberOf(left);
            const b = numberOf(right);

            switch (node.operator) {
                case '<': return a < b;
                case '<=': return a <= b;
                case '>': return a > b;
                case '>=': return a >= b;
                case '+': return a + b;
                case '-': return a - b;
                case '*': return a * b;
                case '/': return a / b;
                default: return a % b;
            }
        }
    }
};

/**
 * Runs `op` for `owner` on a laid-out window: its fields worked out from the window as laid out so far,
 * then set in one `setRectangle`. An element an owner added is named by its short name (`isOwned` of
 * its owned name), the window's own as its code names it. A field whose formula reads an element the
 * window lacks, or gives no number (a context key with no value in a sum), keeps the layout's and is
 * passed to `miss`; `false` when nothing was set (the element missing, every field missed).
 */
export const runTemplateArrange = (owner: string, op: TemplateArrangeOp, windows: TemplateWindows, context: TemplateContext, isOwned: (ownedName: string) => boolean, miss: (what: string) => void): boolean => {
    const keyOf = (element: string) => templateBindElement(owner, { element, override: true }, isOwned);
    const read = (element: string) => ((element === TEMPLATE_ARRANGE_WINDOW || element === '') ? windows.root() : windows.find(keyOf(element)));
    const target = read(op.element);

    if (!target) {
        miss(`'${op.element}'`);

        return false;
    }

    const rect = { x: target.x, y: target.y, width: target.width, height: target.height };
    let set = false;

    for (const field of TEMPLATE_ARRANGE_FIELDS) {
        const value = op.arrange[field];

        if (value === undefined) continue;

        const node = nodeOf(value);

        if (node instanceof Error) {
            miss(field);

            continue;
        }

        try {
            const result = numberOf(evaluate(node, read, context));

            if (!Number.isFinite(result)) {
                miss(field);

                continue;
            }

            rect[field] = result;
            set = true;
        } catch (error) {
            if (!(error instanceof Unread)) throw error;

            miss(error.message);
        }
    }

    if (set) target.setRectangle(rect.x, rect.y, rect.width, rect.height);

    return set;
};
