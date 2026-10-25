import assert from 'node:assert/strict';
import { test } from 'node:test';

import { clientModuleLinkConflicts, routeClientModuleLink } from '../src/commands/client-modules/clientModuleLinkRoutes';

const handler = (moduleKey: string, prefix: string, path?: string) => ({ moduleKey, prefix, path });

// Six modules registered one prefix: a link meant for one module reached the others too.
void test('a link goes to the most specific path that matches, else to every handler of the whole prefix', () => {
    const handlers = [ handler('collections', 'myhotel'), handler('community', 'myhotel', 'news/*'), handler('view', 'myhotel', 'news/promo'), handler('economy', 'myhotel', 'values') ];
    const route = (link: string) => routeClientModuleLink(handlers, link).map(each => each.moduleKey);

    assert.deepEqual(route('myhotel/news/promo'), [ 'view' ]);
    assert.deepEqual(route('myhotel/news/12'), [ 'community' ]);
    assert.deepEqual(route('myhotel/values/page/2'), [ 'economy' ]);
    assert.deepEqual(route('myhotel/collections'), [ 'collections' ]);
    assert.deepEqual(route('other/news'), []);
});

void test('two modules on one prefix and path are a conflict; one module twice, or different paths, are not', () => {
    const conflicts = clientModuleLinkConflicts([ handler('a', 'myhotel'), handler('b', 'myhotel'), handler('a', 'myhotel', 'x'), handler('a', 'myhotel', '/x/'), handler('c', 'myhotel', 'y') ]);

    assert.deepEqual(conflicts, [ { prefix: 'myhotel', path: '', modules: [ 'a', 'b' ] } ]);
});
