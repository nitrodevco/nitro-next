import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `951_new_furni_chooser_view_xml` (layout "new_chooser_view", 413x354) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFurniChooserViewLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onUsernameDropdown?: () => void;
}

export const NewFurniChooserViewLayout = ({ layout, onClose, onUsernameDropdown }: NewFurniChooserViewLayoutProps) => {
    const t = useTranslation();
    const [ textInputValue, setTextInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            params={98305}
            caption={t('widget.chooser.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 413, height: 354, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="105"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 229, top: 18, height: 26 }}
                >
                    <Region
                        name="search_placeholder"
                        params={16}
                        layout={{ position: 'absolute', left: 6, width: 116, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('new_chooser.search')}
                            textOptions={{ fill: '#666666' }}
                        />
                    </Region>
                    <TextInput
                        value={textInputValue}
                        onChange={setTextInputValue}
                        textColor="#666666"
                        layout={{ position: 'absolute', left: 6, width: 200, top: 4, height: 18 }}
                    />
                    <Region
                        name="clear_button"
                        params={17}
                        visible={false}
                        layout={{ position: 'absolute', left: 206, width: 20, top: 3, height: 20 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('icons_close.png')}
                            layout={{ position: 'absolute', left: 4, width: 11, top: 4, height: 12 }}
                        />
                    </Region>
                </Border>
                <Dropmenu
                    variant="3"
                    name="username_dropdown"
                    params={17}
                    onPointerTap={onUsernameDropdown}
                    layout={{ position: 'absolute', left: 244, width: 152, top: 18, height: 25 }}
                />
                <Region
                    name="table_container"
                    params={2064}
                    layout={{ position: 'absolute', left: 6, width: 389, top: 53, height: 240 }}
                />
                <Region
                    name="amount_indicator"
                    params={1040}
                    layout={{ position: 'absolute', left: 6, width: 215, top: 300, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={t('new_furni_chooser.amount_indicator')} />
                </Region>
            </Region>
        </Frame>
    );
};
