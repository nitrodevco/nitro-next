import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1697_layout_pets_xml` (layout "ctlg_pets", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutPets_1697LayoutProps {
    ctlgPets?: LayoutPets_1697LayoutCtlgPetsProps;
    layout?: BoxLayout;
}

export const LayoutPets_1697Layout = ({ ctlgPets, layout }: LayoutPets_1697LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutPets_1697LayoutCtlgPets {...ctlgPets} />
        </Region>
    );
};

/** Named region `colourGridWidget` of LayoutPets_1697Layout - configured through the parent's `colourGridWidget` prop. */
export interface LayoutPets_1697LayoutColourGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutPets_1697LayoutColourGridWidget = ({ layout }: LayoutPets_1697LayoutColourGridWidgetProps) => {
    return (
        <Region
            name="colourGridWidget"
            params={16}
            layout={{ position: 'absolute', left: 7, width: 347, top: 152, height: 73, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutPets_1697Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutPets_1697LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutPets_1697LayoutPurchaseWidget = ({ layout }: LayoutPets_1697LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 345, height: 30, ...layout }}
        />
    );
};

/** Named region `addOnBadgeViewWidget` of LayoutPets_1697Layout - configured through the parent's `addOnBadgeViewWidget` prop. */
export interface LayoutPets_1697LayoutAddOnBadgeViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutPets_1697LayoutAddOnBadgeViewWidget = ({ layout }: LayoutPets_1697LayoutAddOnBadgeViewWidgetProps) => {
    return (
        <Region
            name="addOnBadgeViewWidget"
            params={16}
            layout={{ position: 'absolute', left: 30, width: 40, top: 85, height: 40, ...layout }}
        />
    );
};

/** Named region `petsWidget` of LayoutPets_1697Layout - configured through the parent's `petsWidget` prop. */
export interface LayoutPets_1697LayoutPetsWidgetProps {
    addOnBadgeViewWidget?: LayoutPets_1697LayoutAddOnBadgeViewWidgetProps;
    captionCtlgText1?: string;
    captionCtlgText2?: string;
    captionCtlgText3?: string;
    colourGridWidget?: LayoutPets_1697LayoutColourGridWidgetProps;
    layout?: BoxLayout;
    onTypeDropMenu?: () => void;
    purchaseWidget?: LayoutPets_1697LayoutPurchaseWidgetProps;
    srcCtlgTeaserimg1?: string;
}

export const LayoutPets_1697LayoutPetsWidget = ({ addOnBadgeViewWidget, captionCtlgText1, captionCtlgText2, captionCtlgText3, colourGridWidget, layout, onTypeDropMenu, purchaseWidget, srcCtlgTeaserimg1 }: LayoutPets_1697LayoutPetsWidgetProps) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');

    return (
        <Region
            name="petsWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 359, top: 75, height: 377, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 30, height: 127 }}
            />
            <Region
                name="ctlg_text_1"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 62, top: 270, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText1 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="ctlg_text_2"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 62, top: 135, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText2 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="ctlg_text_3"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 62, top: 226, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText3 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Dropmenu
                variant="3"
                name="type_drop_menu"
                params={17}
                onPointerTap={onTypeDropMenu}
                layout={{ position: 'absolute', left: 10, width: 340, top: 244, height: 25 }}
            />
            <Border
                variant="4"
                params={16}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 10, width: 340, top: 288, height: 25 }}
            >
                <TextInput
                    value={nameInputTextValue}
                    onChange={setNameInputTextValue}
                    maxLength={15}
                    layout={{ position: 'absolute', left: 4, width: 325, top: 4, height: 17 }}
                />
            </Border>
            <LayoutPets_1697LayoutColourGridWidget {...colourGridWidget} />
            <LayoutPets_1697LayoutPurchaseWidget {...purchaseWidget} />
            <LayoutPets_1697LayoutAddOnBadgeViewWidget {...addOnBadgeViewWidget} />
        </Region>
    );
};

/** Named region `colourGridWidget` of LayoutPets_1697Layout - configured through the parent's `colourGridWidget` prop. */
export interface LayoutPets_1697LayoutColourGridWidget2Props {
    layout?: BoxLayout;
}

export const LayoutPets_1697LayoutColourGridWidget2 = ({ layout }: LayoutPets_1697LayoutColourGridWidget2Props) => {
    return (
        <Region
            name="colourGridWidget"
            params={16}
            layout={{ position: 'absolute', left: 5, width: 350, top: 173, height: 70, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutPets_1697Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutPets_1697LayoutPurchaseWidget2Props {
    layout?: BoxLayout;
}

export const LayoutPets_1697LayoutPurchaseWidget2 = ({ layout }: LayoutPets_1697LayoutPurchaseWidget2Props) => {
    return (
        <Region
            name="purchaseWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 345, height: 30, ...layout }}
        />
    );
};

/** Named region `addOnBadgeViewWidget` of LayoutPets_1697Layout - configured through the parent's `addOnBadgeViewWidget` prop. */
export interface LayoutPets_1697LayoutAddOnBadgeViewWidget2Props {
    layout?: BoxLayout;
}

export const LayoutPets_1697LayoutAddOnBadgeViewWidget2 = ({ layout }: LayoutPets_1697LayoutAddOnBadgeViewWidget2Props) => {
    return (
        <Region
            name="addOnBadgeViewWidget"
            params={16}
            layout={{ position: 'absolute', left: 30, width: 40, top: 85, height: 40, ...layout }}
        />
    );
};

/** Named region `newPetsWidget` of LayoutPets_1697Layout - configured through the parent's `newPetsWidget` prop. */
export interface LayoutPets_1697LayoutNewPetsWidgetProps {
    addOnBadgeViewWidget?: LayoutPets_1697LayoutAddOnBadgeViewWidget2Props;
    captionCtlgText2?: string;
    captionCtlgText3?: string;
    captionPetBreedText?: string;
    colourGridWidget?: LayoutPets_1697LayoutColourGridWidget2Props;
    layout?: BoxLayout;
    purchaseWidget?: LayoutPets_1697LayoutPurchaseWidget2Props;
    srcCtlgTeaserimg1?: string;
}

export const LayoutPets_1697LayoutNewPetsWidget = ({ addOnBadgeViewWidget, captionCtlgText2, captionCtlgText3, captionPetBreedText, colourGridWidget, layout, purchaseWidget, srcCtlgTeaserimg1 }: LayoutPets_1697LayoutNewPetsWidgetProps) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');

    return (
        <Region
            name="newPetsWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 359, top: 75, height: 375, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 30, height: 127 }}
            />
            <Region
                name="pet_breed_text"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 340, top: 136, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPetBreedText ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                name="ctlg_text_3"
                params={16}
                layout={{ position: 'absolute', left: 12, width: 340, top: 156, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCtlgText3 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <LayoutPets_1697LayoutColourGridWidget2 {...colourGridWidget} />
            <Region
                name="ctlg_text_2"
                params={16}
                layout={{ position: 'absolute', left: 12, width: 339, top: 253, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCtlgText2 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Border
                variant="4"
                params={16}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 10, width: 340, top: 275, height: 25 }}
            >
                <TextInput
                    value={nameInputTextValue}
                    onChange={setNameInputTextValue}
                    maxLength={16}
                    layout={{ position: 'absolute', left: 4, width: 325, top: 4, height: 17 }}
                />
            </Border>
            <LayoutPets_1697LayoutPurchaseWidget2 {...purchaseWidget} />
            <LayoutPets_1697LayoutAddOnBadgeViewWidget2 {...addOnBadgeViewWidget} />
        </Region>
    );
};

/** Named region `ctlg_pets` of LayoutPets_1697Layout - configured through the parent's `ctlgPets` prop. */
export interface LayoutPets_1697LayoutCtlgPetsProps {
    captionCtlgPrice1?: string;
    layout?: BoxLayout;
    newPetsWidget?: LayoutPets_1697LayoutNewPetsWidgetProps;
    petsWidget?: LayoutPets_1697LayoutPetsWidgetProps;
}

export const LayoutPets_1697LayoutCtlgPets = ({ captionCtlgPrice1, layout, newPetsWidget, petsWidget }: LayoutPets_1697LayoutCtlgPetsProps) => {
    return (
        <Region
            name="ctlg_pets"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <LayoutPets_1697LayoutPetsWidget {...petsWidget} />
            <LayoutPets_1697LayoutNewPetsWidget {...newPetsWidget} />
            <Region
                name="ctlg_price_1"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 267, width: 78, top: 426, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionCtlgPrice1 ?? '0'}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 78, align: 'right' }}
                />
            </Region>
        </Region>
    );
};
