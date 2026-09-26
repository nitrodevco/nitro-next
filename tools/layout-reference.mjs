/**
 * Checks a window's pinned Flash sources and emits compact evidence through the existing
 * layout generator. AS3 controllers remain the authority for runtime behaviour.
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [ manifestPath, outputPath ] = process.argv.slice(2);

if (!manifestPath || !outputPath) {
    throw new Error('Usage: node tools/layout-reference.mjs <manifest.json> <report.json>');
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const config = JSON.parse(readFileSync(resolve(repo, 'packages/nitro-react/public/config/nitro-config.json'), 'utf8'));

if (manifest.revision !== config['production.version']) throw new Error('Reference revision differs from production.version; review the source upgrade first');
if (!manifest.sources?.length || !manifest.states?.length) throw new Error('Manifest requires pinned sources and visual states');

// Validate every input before invoking the generator or writing output.
const sources = manifest.sources.map((source) => {
    const root = process.env[source.root];

    if (!root) throw new Error(`Set ${source.root} to the reference directory for ${source.path}`);

    const path = resolve(root, source.path);
    const sha256 = createHash('sha256').update(readFileSync(path)).digest('hex');

    if (sha256 !== source.sha256) throw new Error(`Source changed: ${source.path}; expected ${source.sha256}, got ${sha256}. Review before updating the manifest.`);

    return { ...source, absolutePath: path };
});
const layouts = [];

for (const source of sources.filter(source => source.kind === 'layout')) {
    const result = spawnSync(process.execPath, [ resolve(repo, 'packages/nitro-react/scripts/generate-layout-views.ts'), '--report', source.absolutePath ], { cwd: repo, encoding: 'utf8' });

    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(result.stderr || `Generator failed: ${result.status}`);

    const report = JSON.parse(result.stdout);

    if (report.sha256 !== source.sha256) throw new Error(`Source changed during report: ${source.path}`);
    layouts.push({ source: source.path, ...report });
}

if (!layouts.length) throw new Error('Manifest requires at least one layout');

const report = {
    feature: manifest.feature,
    revision: manifest.revision,
    sources: manifest.sources,
    states: manifest.states,
    contracts: manifest.contracts ?? [],
    layouts,
    visualAcceptance: 'Not verified by this command. Capture the listed states at matching scale, locale and data; align window bounds and inspect differences against official references.',
};
const output = resolve(outputPath);
const summaryPath = `${output}.md`;

if ([ output, summaryPath ].some(target => sources.some(source => source.absolutePath.toLowerCase() === target.toLowerCase()) || resolve(manifestPath).toLowerCase() === target.toLowerCase())) {
    throw new Error('Report output must not overwrite a reference input or manifest');
}
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
const cell = value => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
const summary = [
    `# ${manifest.feature}: ${manifest.revision}`, '',
    'Pinned source hashes verified. Visual equivalence is not verified by this report.', '',
    '## Controller contracts', '', ...report.contracts.map(contract => `- ${contract}`), '',
    '## Required visual states', '', ...report.states.map(state => `- ${state}`), '',
];

for (const layout of layouts) {
    summary.push(
        `## ${layout.layout.name}`,
        '',
        '| Control | Type | x,y,w,h | Style | Parent resize | Self resize | Clip |',
        '|---|---|---|---|---|---|---|',
    );
    for (const control of layout.controls) {
        const a = control.attributes;

        summary.push(`| ${cell(control.path)} | ${control.type} | ${[ a.x, a.y, a.width, a.height ].map(value => value ?? 0).join(',')} | ${cell(control.textStyle ?? a.style)} | ${control.parentResize.join('/')} | ${control.selfResize.join('/')} | ${control.clipping} |`);
    }
    summary.push('', 'Review before wiring:', '', ...layout.review.map(item => `- ${item}`), '');
}
summary.push('Full attributes, ordered source variables, filters and hashes are in the adjacent JSON report.', '');
writeFileSync(summaryPath, summary.join('\n'));
console.log(`Checked ${sources.length} pinned sources; wrote ${layouts.length} layouts to ${output}`);
console.log(`${layouts.reduce((count, layout) => count + layout.review.length, 0)} review items. Visual acceptance remains required.`);
