/**
 * The navigator in the preview host's design window, drawn by the game's own `NavigatorView` with sample
 * rooms - the top level tabs and a search result of two categories - as `NavigatorMetaData` and
 * `NavigatorSearchResultSet` would fill it, in rows (all rooms) or in tiles (the public tab) by the state, so its room rows are drawn
 * inside it and a press names them (`DesignPreviewView`). Nothing is sent. Not a Flash feature.
 */
import { IRoomInfo, ISearchResultList, ITopLevelContext } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { navigatorStore } from '#base/context/navigator';
import { systemStore } from '#base/context/system';
import { NavigatorView } from '#base/views/navigator/NavigatorView';

import { designState, NAVIGATOR_WINDOW } from './designStates';

const CONTEXTS: ITopLevelContext[] = [ 'official_view', 'hotel_view', 'roomads_view', 'myworld_view' ].map(searchCode => ({ searchCode, quickLinks: [] }));

/** A room as a search result lists it. */
const room = (roomId: number, name: string, ownerName: string, population: number, playersMax: number) => ({
    roomId, name, ownerId: roomId, ownerName, doorMode: 0, population, playersMax, description: `${name} - come and hang out`, tradeType: 0, score: 3, ranking: 0, categoryId: 1, tags: [],
    officialRoomPicRef: '', groupId: 0, groupName: '', groupBadge: '', adName: '', adDescription: '', adExpiresIn: 0, showOwner: true, allowPets: false, displayAd: false,
}) as unknown as IRoomInfo;

const block = (searchCode: string, text: string, viewMode: number, rooms: IRoomInfo[]): ISearchResultList => ({ searchCode, text, actionAllowed: 1, forceClosed: false, viewMode, guestRooms: rooms });

export const DesignNavigatorView = ({ state }: { state: string }) => {
    useEffect(() => {
        const own = navigatorStore.getState();

        systemStore.getState().showWindow('navigator');

        return () => navigatorStore.setState(own, true);
    }, []);

    // After the view's own opening search: the sample result in its place.
    useEffect(() => {
        const viewMode = designState(NAVIGATOR_WINDOW, state)?.viewMode ?? 0;
        const { setTopLevelContexts, setTopLevelContext, setSearchResult, setIsSearching } = navigatorStore.getState();

        setTopLevelContexts(CONTEXTS);
        // Tiles are the public tab's (`official_view` keeps each block's view mode); elsewhere only a perk may toggle them.
        const context = viewMode ? CONTEXTS[0] : CONTEXTS[1];

        setTopLevelContext(context);
        setSearchResult({ searchCodeOriginal: context.searchCode, filteringData: '', blocks: [
            block('popular', 'Popular rooms', viewMode, [ room(1, 'Welcome Lounge', 'Habbo', 24, 50), room(2, 'Rooftop Rumble', 'Frank', 12, 25), room(3, 'Coffee House', 'Bonnie', 6, 25), room(4, 'Habbo Lido', 'Habbo', 40, 75) ]),
            block('new_ads', 'Events', viewMode, [ room(5, 'Quiz night', 'Marcy', 8, 30), room(6, 'Builders meet', 'Pixel', 3, 20) ]),
        ] });
        setIsSearching(false);
    }, [ state ]);

    return <NavigatorView />;
};
