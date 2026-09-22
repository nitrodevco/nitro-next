import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, ContainerButton, LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/**
 * The search tab's `search_footer` (223x41 on `0xb6b6b6`, stretched to the tab's width): a
 * `0x848484` border at (5, 5) with the white, black-bordered `search_str` input and the style-0
 * `search_but` container button 7 from the right. `SearchView.onSearchStrInput` cuts the input
 * at 25 characters. The button's `<bitmap name="search">` is filled with the friend list's
 * `search_png` library bitmap - not an icon-set style.
 */
export const FriendListSearchFooter = () => {
    const [ value, setValue ] = useState('');
    const t = useTranslation();

    return (
        <Region
            backgroundColor="#b6b6b6"
            layout={{ position: 'relative', width: '100%', height: 41, flexShrink: 0 }}
        >
            <Border
                variant="0"
                tintColor="#848484"
                layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 31 }}
            >
                <TextInput
                    value={value}
                    onChange={setValue}
                    maxLength={25}
                    flashPlacement
                    border="#000000"
                    alwaysShowSelection
                    backgroundColor="#ffffff"
                    focusedBackgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 6, right: 82, top: 5, height: 20 }}
                />
                <ContainerButton
                    variant="0"
                    layout={{ position: 'absolute', right: 7, top: 5, width: 70, height: 21, overflow: 'hidden' }}
                >
                    <ThemeImage
                        name="search"
                        src={LayoutImage('friend-list/friendlist_search.png')}
                        bitmap={{}}
                        hitThreshold={10}
                        layout={{ position: 'absolute', left: 5, top: 4, width: 12, height: 12 }}
                    />
                    <ThemeText
                        text={t('generic.search')}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 20, top: 3, width: 50, height: 20 }}
                    />
                </ContainerButton>
            </Border>
        </Region>
    );
};
