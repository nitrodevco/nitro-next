import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1610_layout_trophies_xml` (layout "ctlg_trophies", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutTrophies_1610LayoutProps {
    ctlgTrophies?: LayoutTrophies_1610LayoutCtlgTrophiesProps;
    layout?: BoxLayout;
}

export const LayoutTrophies_1610Layout = ({ ctlgTrophies, layout }: LayoutTrophies_1610LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutTrophies_1610LayoutCtlgTrophies {...ctlgTrophies} />
        </Region>
    );
};

/** Named region `trophyWidget` of LayoutTrophies_1610Layout - configured through the parent's `trophyWidget` prop. */
export interface LayoutTrophies_1610LayoutTrophyWidgetProps {
    layout?: BoxLayout;
    onCtlgNextmodelButton?: () => void;
    onCtlgPrevmodelButton?: () => void;
    srcCtlgTeaserimg1?: string;
}

export const LayoutTrophies_1610LayoutTrophyWidget = ({ layout, onCtlgNextmodelButton, onCtlgPrevmodelButton, srcCtlgTeaserimg1 }: LayoutTrophies_1610LayoutTrophyWidgetProps) => {
    return (
        <Region
            name="trophyWidget"
            tags={[ 'EMBEDDED' ]}
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 145, height: 135, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={2192}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <ContainerButton
                variant="3"
                name="ctlg_prevmodel_button"
                params={393233}
                onPointerTap={onCtlgPrevmodelButton}
                layout={{ position: 'absolute', right: 215, width: 30, top: 101, height: 30, maxWidth: 100 }}
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
                layout={{ position: 'absolute', right: 120, width: 30, top: 101, height: 30, maxWidth: 100 }}
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

/** Named region `colourGridWidget` of LayoutTrophies_1610Layout - configured through the parent's `colourGridWidget` prop. */
export interface LayoutTrophies_1610LayoutColourGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutTrophies_1610LayoutColourGridWidget = ({ layout }: LayoutTrophies_1610LayoutColourGridWidgetProps) => {
    return (
        <Region
            name="colourGridWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 285, height: 40, ...layout }}
        />
    );
};

/** Named region `textInputWidget` of LayoutTrophies_1610Layout - configured through the parent's `textInputWidget` prop. */
export interface LayoutTrophies_1610LayoutTextInputWidgetProps {
    layout?: BoxLayout;
}

export const LayoutTrophies_1610LayoutTextInputWidget = ({ layout }: LayoutTrophies_1610LayoutTextInputWidgetProps) => {
    const [ inputTextValue, setInputTextValue ] = useState('');

    return (
        <Region
            name="textInputWidget"
            tags={[ 'EMBEDDED' ]}
            params={2192}
            layout={{ position: 'absolute', left: 6, right: 5, top: 7, bottom: 6, ...layout }}
        >
            <TextInput
                value={inputTextValue}
                onChange={setInputTextValue}
                maxLength={300}
                multiline
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
        </Region>
    );
};

/** Named region `purchaseWidget` of LayoutTrophies_1610Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutTrophies_1610LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutTrophies_1610LayoutPurchaseWidget = ({ layout }: LayoutTrophies_1610LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30, ...layout }}
        />
    );
};

/** Named region `ctlg_trophies` of LayoutTrophies_1610Layout - configured through the parent's `ctlgTrophies` prop. */
export interface LayoutTrophies_1610LayoutCtlgTrophiesProps {
    captionTrophyDescription?: string;
    captionTrophyEnscription?: string;
    colourGridWidget?: LayoutTrophies_1610LayoutColourGridWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: LayoutTrophies_1610LayoutPurchaseWidgetProps;
    textInputWidget?: LayoutTrophies_1610LayoutTextInputWidgetProps;
    trophyWidget?: LayoutTrophies_1610LayoutTrophyWidgetProps;
}

export const LayoutTrophies_1610LayoutCtlgTrophies = ({ captionTrophyDescription, captionTrophyEnscription, colourGridWidget, layout, purchaseWidget, textInputWidget, trophyWidget }: LayoutTrophies_1610LayoutCtlgTrophiesProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_trophies"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="trophy.description"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 190, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrophyDescription ?? t('loremipsum.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                />
            </Region>
            <LayoutTrophies_1610LayoutTrophyWidget {...trophyWidget} />
            <LayoutTrophies_1610LayoutColourGridWidget {...colourGridWidget} />
            <Region
                name="trophy.enscription"
                params={16}
                layout={{ position: 'absolute', left: 6, width: 355, top: 326, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrophyEnscription ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 355 }}
                />
            </Region>
            <Border
                variant="5"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 340, bottom: 37 }}
            >
                <LayoutTrophies_1610LayoutTextInputWidget {...textInputWidget} />
            </Border>
            <LayoutTrophies_1610LayoutPurchaseWidget {...purchaseWidget} />
        </Region>
    );
};
