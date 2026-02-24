import { useConfigurationStore } from '../../stores/useConfigurationStore';

export const useConfigLoader = () => {
    const setConfigValue = useConfigurationStore(state => state.setConfigValue);

    setConfigValue('asset.urls.generic', 'https://assets.nitrodev.co/bundled/generic/%libname%.nitro');
    setConfigValue('asset.urls.furni', 'https://assets.nitrodev.co/bundled/furniture/%libname%.nitro');
    setConfigValue('asset.urls.icons.furni', 'https://assets.nitrodev.co/images/furni-icons/%libname%%param%_icon.png');
    setConfigValue('asset.urls.pet', 'https://assets.nitrodev.co/bundled/pet/%libname%.nitro');
    setConfigValue('renderer.petTypes', [
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
    ]);

    return null;
};
