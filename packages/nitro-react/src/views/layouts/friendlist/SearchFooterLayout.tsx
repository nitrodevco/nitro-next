import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1499_search_footer_xml` (layout "search_footer", 223x41) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SearchFooterLayoutProps {
    layout?: BoxLayout;
    onSearchBut?: () => void;
    srcSearch?: string;
}

export const SearchFooterLayout = ({ layout, onSearchBut, srcSearch }: SearchFooterLayoutProps) => {
    const t = useTranslation();
    const [ searchStrValue, setSearchStrValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 223, height: 41, ...layout }}>
            <Region
                name="footer"
                params={16}
                backgroundColor="#b6b6b6"
                layout={{ position: 'absolute', left: 0, width: 223, top: 0, height: 41 }}
            >
                <Border
                    variant="0"
                    name="border"
                    params={144}
                    tintColor="#848484"
                    layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 31 }}
                >
                    <TextInput
                        value={searchStrValue}
                        onChange={setSearchStrValue}
                        backgroundColor="#ffffff"
                        layout={{ position: 'absolute', left: 6, right: 82, top: 5, height: 20 }}
                    />
                    <ContainerButton
                        variant="0"
                        name="search_but"
                        params={81}
                        onPointerTap={onSearchBut}
                        layout={{ position: 'absolute', right: 7, width: 70, top: 5, height: 21 }}
                    >
                        <ThemeImage
                            name="search"
                            params={131089}
                            src={srcSearch}
                            layout={{ position: 'absolute', left: 5, width: 12, top: 4, height: 12 }}
                        />
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 20, width: 50, top: 3, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('generic.search')} />
                        </Region>
                    </ContainerButton>
                </Border>
            </Region>
        </Region>
    );
};
