import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { ClientModuleMessageOf, ClientModuleMessageSchema } from '../src/index';

type Same<A, B> = [ A ] extends [ B ] ? ([ B ] extends [ A ] ? true : false) : false;

// The schema Turbo sends for `SkillsState(int Total, ImmutableArray<Skill> Skills, bool Max)`, as JSON.
const SKILLS_STATE = [
    [ 'total', 'int' ],
    [ 'skills', [ 'array', [ 'object', [ [ 'name', 'string' ], [ 'level', 'int' ], [ 'xp', 'long' ] ] ] ] ],
    [ 'max', 'bool' ],
] as const satisfies ClientModuleMessageSchema;

type SkillsState = ClientModuleMessageOf<typeof SKILLS_STATE>;

// Fails the SDK's type check when the mapping changes.
const typed: Same<SkillsState, { total: number; skills: { name: string; level: number; xp: number }[]; max: boolean }> = true;

void test('a message schema written as const types the data a module reads', () => {
    const state: SkillsState = { total: 1, skills: [ { name: 'mining', level: 2, xp: 150 } ], max: false };

    assert.equal(typed, true);
    assert.equal(SKILLS_STATE.length, 3);
    assert.equal(state.skills[0].name, 'mining');
});

// `WithDictionary(Dictionary<string, int> Counts, IReadOnlyDictionary<string, Inner> Records, ...)`: a map reads as an object.
const WITH_DICTIONARY = [
    [ 'counts', [ 'map', 'int' ] ],
    [ 'records', [ 'map', [ 'object', [ [ 'label', 'string' ] ] ] ] ],
] as const satisfies ClientModuleMessageSchema;

const typedMap: Same<ClientModuleMessageOf<typeof WITH_DICTIONARY>, { counts: Record<string, number>; records: Record<string, { label: string }> }> = true;

void test('a map in a schema types a string-keyed object', () => {
    assert.equal(typedMap, true);
    assert.equal(WITH_DICTIONARY.length, 2);
});
