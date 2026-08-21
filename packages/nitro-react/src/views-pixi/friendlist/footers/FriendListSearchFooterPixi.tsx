import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, Box, Button, getPixiTextStyle, NitroIcon, TextInput } from '#base/theme-pixi';

/** Pixi port of views/friendlist/footers/FriendListSearchFooter.tsx. */
export const FriendListSearchFooterPixi = () => {
    const [value, setValue] = useState('');
    const t = useTranslation();

    return (
        <Box layout={{ height: 40, flexShrink: 0, paddingLeft: 6, paddingRight: 6, paddingTop: 5, paddingBottom: 5 }}>
            <Border tintColor="#838383" layout={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 6, paddingRight: 6, gap: 4 }}>
                <TextInput value={value} onChange={setValue} fontSize={9} layout={{ flex: 1, height: 21 }} />
                <Button variant="0" layout={{ flexShrink: 0, height: 21, flexDirection: 'row', alignItems: 'center', gap: 4, paddingLeft: 6, paddingRight: 6, paddingTop: 4, paddingBottom: 4 }}>
                    <NitroIcon icon="icon-search-outline" layout={{}} />
                    <pixiText layout={{}} text={t('generic.search')} style={getPixiTextStyle('text-style-regular', { fill: '#000000' })} />
                </Button>
            </Border>
        </Box>
    );
};
