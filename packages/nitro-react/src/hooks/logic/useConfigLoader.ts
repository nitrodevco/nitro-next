import { useEffect } from 'react';

import { useConfigurationStore } from '../../stores/useConfigurationStore';

export const useConfigLoader = () => {
    const configNeedsUpdate = useConfigurationStore(state => state.configNeedsUpdate);
    const setConfig = useConfigurationStore(state => state.setConfig);

    useEffect(() => {
        if (!configNeedsUpdate) return;

        setConfig({
            'furnituredata.url': 'https://assets.nitrodev.co/gamedata/FurnitureData.json',
            'asset.urls.generic': 'https://assets.nitrodev.co/bundled/generic/%libname%.nitro',
            'asset.urls.furni': 'https://assets.nitrodev.co/bundled/furniture/%libname%.nitro',
            'asset.urls.icons.furni': 'https://assets.nitrodev.co/images/furni-icons/%libname%%param%_icon.png',
            'asset.urls.pet': 'https://assets.nitrodev.co/bundled/pet/%libname%.nitro',
            'renderer.petTypes': [
                'dog',
                'cat',
                'croco',
                'terrier',
                'bear',
                'pig',
                'lion',
                'rhino',
                'spider',
                'turtle',
                'chicken',
                'frog',
                'dragon',
                'monster',
                'monkey',
                'horse',
                'monsterplant',
                'bunnyeaster',
                'bunnyevil',
                'bunnydepressed',
                'bunnylove',
                'pigeongood',
                'pigeonevil',
                'demonmonkey',
                'bearbaby',
                'terrierbaby',
                'gnome',
                'gnome',
                'kittenbaby',
                'puppybaby',
                'pigletbaby',
                'haloompa',
                'fools',
                'pterosaur',
                'velociraptor',
                'cow',
                'LeetPen',
                'bbwibb',
                'elephants',
            ],
        });
    }, [configNeedsUpdate]);

    return null;
};
