import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `945_mysterytrophy_xml` (layout "mysterytrophy", 475x270) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MysterytrophyLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onOk?: () => void;
}

export const MysterytrophyLayout = ({ layout, onClose, onOk }: MysterytrophyLayoutProps) => {
    const t = useTranslation();
    const [ inputValue, setInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="mysterytrophy_main_container"
            name="mysterytrophy_main_container"
            params={32801}
            caption={t('mysterytrophy.name.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 475, height: 270, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="mysterytrophy.header.background.border"
                    params={144}
                    backgroundColor="#376275"
                    layout={{ position: 'absolute', left: 1, width: 473, top: 0, height: 100 }}
                >
                    <Region
                        name="mysterytrophy.header.background.body"
                        params={144}
                        backgroundColor="#0e3f52"
                        layout={{ position: 'absolute', left: 2, width: 469, top: 2, height: 95 }}
                    />
                    <ThemeImage
                        name="mysterytrophy.header.icon"
                        params={16}
                        src="${image.library.url}client_static/alert_mystTrophy.png"
                        layout={{ position: 'absolute', left: 3, width: 85, top: 5, height: 93 }}
                    />
                    <Region
                        name="mysterytrophy.header"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 475, top: 0, height: 90 }}
                    >
                        <Region
                            name="mysterytrophy.header.title"
                            params={16}
                            layout={{ position: 'absolute', left: 95, width: 317, top: 11, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('mysterytrophy.header.title')}
                                textStyle="text-style-u-headline-big"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            name="mysterytrophy.header.description"
                            params={16}
                            layout={{ position: 'absolute', left: 95, width: 354, top: 41, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('mysterytrophy.header.description')}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 354 }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 475, top: 100, height: 90 }}
                >
                    <Border
                        variant="0"
                        name="input_border"
                        params={16}
                        layout={{ position: 'absolute', left: 17, width: 417, top: 15, height: 65 }}
                    >
                        <TextInput
                            value={inputValue}
                            onChange={setInputValue}
                            maxLength={500}
                            multiline
                            layout={{ position: 'absolute', left: 7, width: 380, top: 6, height: 50 }}
                        />
                        <ThemeImage
                            params={16}
                            src={layoutImage('common_small_pen.png')}
                            layout={{ position: 'absolute', left: 390, width: 17, top: 20, height: 18 }}
                        />
                    </Border>
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: -1, width: 475, top: 186, height: 51 }}
                >
                    <Region
                        name="cancel"
                        params={1041}
                        layout={{ position: 'absolute', left: 177, width: 101, top: 11, height: 32 }}
                    >
                        <Region
                            name="cancel"
                            params={3280}
                            layout={{ position: 'absolute', left: 9, width: 83, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('generic.cancel')}
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="ok"
                        params={132113}
                        tintColor="#00aa00"
                        onPointerTap={onOk}
                        layout={{ position: 'absolute', left: 319, width: 130, top: 10, height: 33, minWidth: 130 }}
                    >
                        {t('generic.ok')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};
