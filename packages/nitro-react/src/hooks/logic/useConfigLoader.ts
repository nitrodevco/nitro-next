import { useEffect } from 'react';

import { useConfigurationStore } from '#base/stores';

export const useConfigLoader = () => {
    const setConfig = useConfigurationStore(x => x.setConfig);

    useEffect(() => {
        setConfig({
            'production.version': 'WIN63-202601121721-391685409',
            'gamedata.urls.externalTexts': 'https://assets.nitrodev.co/gamedata/ExternalTexts.json',
            'furnituredata.url': 'https://assets.nitrodev.co/gamedata/FurnitureData.json',
            'asset.urls.generic': 'https://assets.nitrodev.co/bundled/generic/%libname%.nitro',
            'asset.urls.furni': 'https://assets.nitrodev.co/bundled/furniture/%libname%.nitro',
            'asset.urls.icons.furni': 'https://assets.nitrodev.co/images/furni-icons/%libname%%param%_icon.png',
            'asset.urls.pet': 'https://assets.nitrodev.co/bundled/pet/%libname%.nitro',
            'fps.limit': 60,
            'socket.url': 'ws://localhost:9001',
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
    }, []);
};
