import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `945_mysterytrophy_xml` (layout "mysterytrophy", 475x270) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MysterytrophyLayoutProps {
    cancel?: MysterytrophyLayoutCancelProps;
    layout?: BoxLayout;
    mysterytrophyHeaderBackgroundBorder?: MysterytrophyLayoutMysterytrophyHeaderBackgroundBorderProps;
    onClose?: () => void;
    onOk?: () => void;
}

export const MysterytrophyLayout = ({ cancel, layout, mysterytrophyHeaderBackgroundBorder, onClose, onOk }: MysterytrophyLayoutProps) => {
    const t = useTranslation();
    const [ inputValue, setInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="mysterytrophy_main_container"
            name="mysterytrophy_main_container"
            caption={t('mysterytrophy.name.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 475, height: 270, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <MysterytrophyLayoutMysterytrophyHeaderBackgroundBorder {...mysterytrophyHeaderBackgroundBorder} />
                <Region layout={{ position: 'absolute', left: 0, width: 475, top: 100, height: 90 }}>
                    <Border
                        variant="0"
                        name="input_border"
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
                            src={layoutImage('common_small_pen.png')}
                            layout={{ position: 'absolute', left: 390, width: 17, top: 20, height: 18 }}
                        />
                    </Border>
                </Region>
                <Region layout={{ position: 'absolute', left: -1, width: 475, top: 186, height: 51 }}>
                    <MysterytrophyLayoutCancel {...cancel} />
                    <ButtonThick
                        variant="5"
                        name="ok"
                        tintColor="#00aa00"
                        onPointerTap={onOk}
                        layout={{ position: 'absolute', left: 319, width: 130, bottom: 8, height: 33, minWidth: 130 }}
                    >
                        {t('generic.ok')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `mysterytrophy.header.background.body` of MysterytrophyLayout - configured through the parent's `mysterytrophyHeaderBackgroundBody` prop. */
export interface MysterytrophyLayoutMysterytrophyHeaderBackgroundBodyProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const MysterytrophyLayoutMysterytrophyHeaderBackgroundBody = ({ layout, tags }: MysterytrophyLayoutMysterytrophyHeaderBackgroundBodyProps) => {
    return (
        <Region
            name="mysterytrophy.header.background.body"
            tags={tags}
            backgroundColor="#0e3f52"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 95, ...layout }}
        />
    );
};

/** Named region `mysterytrophy.header` of MysterytrophyLayout - configured through the parent's `mysterytrophyHeader` prop. */
export interface MysterytrophyLayoutMysterytrophyHeaderProps {
    captionMysterytrophyHeaderDescription?: string;
    captionMysterytrophyHeaderTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const MysterytrophyLayoutMysterytrophyHeader = ({ captionMysterytrophyHeaderDescription, captionMysterytrophyHeaderTitle, layout, tags }: MysterytrophyLayoutMysterytrophyHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mysterytrophy.header"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 475, top: 0, height: 90, ...layout }}
        >
            <Region
                name="mysterytrophy.header.title"
                layout={{ position: 'absolute', left: 95, width: 317, top: 11, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMysterytrophyHeaderTitle ?? t('mysterytrophy.header.title')}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="mysterytrophy.header.description"
                layout={{ position: 'absolute', left: 95, width: 354, top: 41, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMysterytrophyHeaderDescription ?? t('mysterytrophy.header.description')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 354 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `mysterytrophy.header.background.border` of MysterytrophyLayout - configured through the parent's `mysterytrophyHeaderBackgroundBorder` prop. */
export interface MysterytrophyLayoutMysterytrophyHeaderBackgroundBorderProps {
    layout?: BoxLayout;
    mysterytrophyHeader?: MysterytrophyLayoutMysterytrophyHeaderProps;
    mysterytrophyHeaderBackgroundBody?: MysterytrophyLayoutMysterytrophyHeaderBackgroundBodyProps;
    srcMysterytrophyHeaderIcon?: string;
    tags?: string[];
}

export const MysterytrophyLayoutMysterytrophyHeaderBackgroundBorder = ({ layout, mysterytrophyHeader, mysterytrophyHeaderBackgroundBody, srcMysterytrophyHeaderIcon, tags }: MysterytrophyLayoutMysterytrophyHeaderBackgroundBorderProps) => {
    return (
        <Region
            name="mysterytrophy.header.background.border"
            tags={tags}
            backgroundColor="#376275"
            layout={{ position: 'absolute', left: 1, right: 1, top: 0, height: 100, ...layout }}
        >
            <MysterytrophyLayoutMysterytrophyHeaderBackgroundBody {...mysterytrophyHeaderBackgroundBody} />
            <ThemeImage
                name="mysterytrophy.header.icon"
                src={srcMysterytrophyHeaderIcon ?? '${image.library.url}client_static/alert_mystTrophy.png'}
                layout={{ position: 'absolute', left: 3, width: 85, top: 5, height: 93 }}
            />
            <MysterytrophyLayoutMysterytrophyHeader {...mysterytrophyHeader} />
        </Region>
    );
};

/** Named region `cancel` of MysterytrophyLayout - configured through the parent's `cancel` prop. */
export interface MysterytrophyLayoutCancelProps {
    captionCancel?: string;
    layout?: BoxLayout;
    onCancel?: () => void;
    tags?: string[];
}

export const MysterytrophyLayoutCancel = ({ captionCancel, layout, onCancel, tags }: MysterytrophyLayoutCancelProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel"
            tags={tags}
            onPointerTap={onCancel}
            cursor="pointer"
            layout={{ position: 'absolute', left: 177, width: 101, bottom: 8, height: 32, justifyContent: 'center', ...layout }}
        >
            <Region
                name="cancel"
                layout={{ position: 'absolute', width: 83, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCancel ?? t('generic.cancel')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#333333' }}
                />
            </Region>
        </Region>
    );
};
