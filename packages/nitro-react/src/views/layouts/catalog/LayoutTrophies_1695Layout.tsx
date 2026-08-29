import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1695_layout_trophies_xml` (layout "ctlg_trophies", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutTrophies_1695LayoutProps {
    ctlgTrophies?: LayoutTrophies_1695LayoutCtlgTrophiesProps;
    layout?: BoxLayout;
}

export const LayoutTrophies_1695Layout = ({ ctlgTrophies, layout }: LayoutTrophies_1695LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutTrophies_1695LayoutCtlgTrophies {...ctlgTrophies} />
        </Region>
    );
};

/** Named region `trophyWidget` of LayoutTrophies_1695Layout - configured through the parent's `trophyWidget` prop. */
export interface LayoutTrophies_1695LayoutTrophyWidgetProps {
    layout?: BoxLayout;
    onCtlgNextmodelButton?: () => void;
    onCtlgPrevmodelButton?: () => void;
    srcCtlgTeaserimg1?: string;
}

export const LayoutTrophies_1695LayoutTrophyWidget = ({ layout, onCtlgNextmodelButton, onCtlgPrevmodelButton, srcCtlgTeaserimg1 }: LayoutTrophies_1695LayoutTrophyWidgetProps) => {
    return (
        <Region
            name="trophyWidget"
            tags={[ 'EMBEDDED' ]}
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 165, height: 127, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 127 }}
            />
            <ContainerButton
                variant="3"
                name="ctlg_prevmodel_button"
                params={393233}
                onPointerTap={onCtlgPrevmodelButton}
                layout={{ position: 'absolute', right: 200, width: 30, top: 96, height: 30, maxWidth: 100 }}
            >
                <Icon
                    variant="2"
                    name="icon"
                    params={16}
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 9, width: 13, top: 8, height: 13 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="3"
                name="ctlg_nextmodel_button"
                params={393233}
                onPointerTap={onCtlgNextmodelButton}
                layout={{ position: 'absolute', right: 140, width: 30, top: 96, height: 30, maxWidth: 100 }}
            >
                <Icon
                    variant="3"
                    name="icon"
                    params={16}
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 9, width: 13, top: 8, height: 13 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Named region `colourGridWidget` of LayoutTrophies_1695Layout - configured through the parent's `colourGridWidget` prop. */
export interface LayoutTrophies_1695LayoutColourGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutTrophies_1695LayoutColourGridWidget = ({ layout }: LayoutTrophies_1695LayoutColourGridWidgetProps) => {
    return (
        <Region
            name="colourGridWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 295, height: 40, ...layout }}
        />
    );
};

/** Named region `textInputWidget` of LayoutTrophies_1695Layout - configured through the parent's `textInputWidget` prop. */
export interface LayoutTrophies_1695LayoutTextInputWidgetProps {
    layout?: BoxLayout;
}

export const LayoutTrophies_1695LayoutTextInputWidget = ({ layout }: LayoutTrophies_1695LayoutTextInputWidgetProps) => {
    const [ inputTextValue, setInputTextValue ] = useState('');

    return (
        <Region
            name="textInputWidget"
            params={16}
            layout={{ position: 'absolute', left: 6, width: 349, top: 7, height: 58, ...layout }}
        >
            <TextInput
                value={inputTextValue}
                onChange={setInputTextValue}
                maxLength={300}
                multiline
                layout={{ position: 'absolute', left: 0, width: 349, top: 0, height: 58 }}
            />
        </Region>
    );
};

/** Named region `purchaseWidget` of LayoutTrophies_1695Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutTrophies_1695LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutTrophies_1695LayoutPurchaseWidget = ({ layout }: LayoutTrophies_1695LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30, ...layout }}
        />
    );
};

/** Named region `ctlg_trophies` of LayoutTrophies_1695Layout - configured through the parent's `ctlgTrophies` prop. */
export interface LayoutTrophies_1695LayoutCtlgTrophiesProps {
    captionTrophyDescription?: string;
    captionTrophyEnscription?: string;
    colourGridWidget?: LayoutTrophies_1695LayoutColourGridWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: LayoutTrophies_1695LayoutPurchaseWidgetProps;
    textInputWidget?: LayoutTrophies_1695LayoutTextInputWidgetProps;
    trophyWidget?: LayoutTrophies_1695LayoutTrophyWidgetProps;
}

export const LayoutTrophies_1695LayoutCtlgTrophies = ({ captionTrophyDescription, captionTrophyEnscription, colourGridWidget, layout, purchaseWidget, textInputWidget, trophyWidget }: LayoutTrophies_1695LayoutCtlgTrophiesProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_trophies"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="trophy.description"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 70, height: 135, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrophyDescription ?? t('loremipsum.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                />
            </Region>
            <LayoutTrophies_1695LayoutTrophyWidget {...trophyWidget} />
            <LayoutTrophies_1695LayoutColourGridWidget {...colourGridWidget} />
            <Region
                name="trophy.enscription"
                params={16}
                layout={{ position: 'absolute', left: 3, width: 356, top: 339, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrophyEnscription ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 356 }}
                />
            </Region>
            <Border
                variant="5"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 355, height: 70 }}
            >
                <LayoutTrophies_1695LayoutTextInputWidget {...textInputWidget} />
            </Border>
            <LayoutTrophies_1695LayoutPurchaseWidget {...purchaseWidget} />
        </Region>
    );
};
