import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1592_layout_pets_xml` (layout "ctlg_pets", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutPets_1592LayoutProps {
    ctlgPets?: LayoutPets_1592LayoutCtlgPetsProps;
    layout?: BoxLayout;
}

export const LayoutPets_1592Layout = ({ ctlgPets, layout }: LayoutPets_1592LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutPets_1592LayoutCtlgPets {...ctlgPets} />
        </Region>
    );
};

/** Named region `addOnBadgeViewWidget` of LayoutPets_1592Layout - configured through the parent's `addOnBadgeViewWidget` prop. */
export interface LayoutPets_1592LayoutAddOnBadgeViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutPets_1592LayoutAddOnBadgeViewWidget = ({ layout }: LayoutPets_1592LayoutAddOnBadgeViewWidgetProps) => {
    return (
        <Region
            name="addOnBadgeViewWidget"
            params={16}
            layout={{ position: 'absolute', left: 307, width: 40, top: 178, height: 40, ...layout }}
        />
    );
};

/** Named region `colourGridWidget` of LayoutPets_1592Layout - configured through the parent's `colourGridWidget` prop. */
export interface LayoutPets_1592LayoutColourGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutPets_1592LayoutColourGridWidget = ({ layout }: LayoutPets_1592LayoutColourGridWidgetProps) => {
    return (
        <Region
            name="colourGridWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 245, height: 80, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutPets_1592Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutPets_1592LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutPets_1592LayoutPurchaseWidget = ({ layout }: LayoutPets_1592LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 1, height: 30, ...layout }}
        />
    );
};

/** Named region `petsWidget` of LayoutPets_1592Layout - configured through the parent's `petsWidget` prop. */
export interface LayoutPets_1592LayoutPetsWidgetProps {
    addOnBadgeViewWidget?: LayoutPets_1592LayoutAddOnBadgeViewWidgetProps;
    captionCtlgText1?: string;
    captionCtlgText2?: string;
    captionCtlgText3?: string;
    colourGridWidget?: LayoutPets_1592LayoutColourGridWidgetProps;
    layout?: BoxLayout;
    onTypeDropMenu?: () => void;
    purchaseWidget?: LayoutPets_1592LayoutPurchaseWidgetProps;
    srcCtlgTeaserimg1?: string;
}

export const LayoutPets_1592LayoutPetsWidget = ({ addOnBadgeViewWidget, captionCtlgText1, captionCtlgText2, captionCtlgText3, colourGridWidget, layout, onTypeDropMenu, purchaseWidget, srcCtlgTeaserimg1 }: LayoutPets_1592LayoutPetsWidgetProps) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');

    return (
        <Region
            name="petsWidget"
            tags={[ 'EMBEDDED' ]}
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <LayoutPets_1592LayoutAddOnBadgeViewWidget {...addOnBadgeViewWidget} />
            <LayoutPets_1592LayoutColourGridWidget {...colourGridWidget} />
            <Region
                name="ctlg_text_1"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 62, top: 380, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText1 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="ctlg_text_2"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 62, top: 225, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText2 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="ctlg_text_3"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 62, top: 326, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                layout={{ position: 'absolute', left: 10, width: 340, top: 344, height: 25 }}
            />
            <Border
                variant="4"
                params={16}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 10, width: 340, top: 398, height: 25 }}
            >
                <TextInput
                    value={nameInputTextValue}
                    onChange={setNameInputTextValue}
                    maxLength={15}
                    layout={{ position: 'absolute', left: 4, width: 325, top: 4, height: 17 }}
                />
            </Border>
            <LayoutPets_1592LayoutPurchaseWidget {...purchaseWidget} />
        </Region>
    );
};

/** Named region `colourGridWidget` of LayoutPets_1592Layout - configured through the parent's `colourGridWidget` prop. */
export interface LayoutPets_1592LayoutColourGridWidget2Props {
    layout?: BoxLayout;
}

export const LayoutPets_1592LayoutColourGridWidget2 = ({ layout }: LayoutPets_1592LayoutColourGridWidget2Props) => {
    return (
        <Region
            name="colourGridWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 245, height: 80, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutPets_1592Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutPets_1592LayoutPurchaseWidget2Props {
    layout?: BoxLayout;
}

export const LayoutPets_1592LayoutPurchaseWidget2 = ({ layout }: LayoutPets_1592LayoutPurchaseWidget2Props) => {
    return (
        <Region
            name="purchaseWidget"
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 1, height: 30, ...layout }}
        />
    );
};

/** Named region `addOnBadgeViewWidget` of LayoutPets_1592Layout - configured through the parent's `addOnBadgeViewWidget` prop. */
export interface LayoutPets_1592LayoutAddOnBadgeViewWidget2Props {
    layout?: BoxLayout;
}

export const LayoutPets_1592LayoutAddOnBadgeViewWidget2 = ({ layout }: LayoutPets_1592LayoutAddOnBadgeViewWidget2Props) => {
    return (
        <Region
            name="addOnBadgeViewWidget"
            params={16}
            layout={{ position: 'absolute', left: 13, width: 40, top: 177, height: 40, ...layout }}
        />
    );
};

/** Named region `newPetsWidget` of LayoutPets_1592Layout - configured through the parent's `newPetsWidget` prop. */
export interface LayoutPets_1592LayoutNewPetsWidgetProps {
    addOnBadgeViewWidget?: LayoutPets_1592LayoutAddOnBadgeViewWidget2Props;
    captionCtlgText2?: string;
    captionCtlgText3?: string;
    captionPetBreedText?: string;
    colourGridWidget?: LayoutPets_1592LayoutColourGridWidget2Props;
    layout?: BoxLayout;
    purchaseWidget?: LayoutPets_1592LayoutPurchaseWidget2Props;
    srcCtlgTeaserimg1?: string;
}

export const LayoutPets_1592LayoutNewPetsWidget = ({ addOnBadgeViewWidget, captionCtlgText2, captionCtlgText3, captionPetBreedText, colourGridWidget, layout, purchaseWidget, srcCtlgTeaserimg1 }: LayoutPets_1592LayoutNewPetsWidgetProps) => {
    const t = useTranslation();
    const [ nameInputTextValue, setNameInputTextValue ] = useState('');

    return (
        <Region
            name="newPetsWidget"
            tags={[ 'EMBEDDED' ]}
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <Region
                name="pet_breed_text"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 74, top: 16, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPetBreedText ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="ctlg_text_3"
                params={16}
                layout={{ position: 'absolute', left: 12, width: 62, top: 326, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText3 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <LayoutPets_1592LayoutColourGridWidget2 {...colourGridWidget} />
            <Region
                name="ctlg_text_2"
                params={16}
                layout={{ position: 'absolute', left: 12, width: 62, top: 363, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgText2 ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Border
                variant="4"
                params={16}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 10, width: 340, top: 385, height: 25 }}
            >
                <TextInput
                    value={nameInputTextValue}
                    onChange={setNameInputTextValue}
                    maxLength={16}
                    layout={{ position: 'absolute', left: 4, width: 325, top: 4, height: 17 }}
                />
            </Border>
            <LayoutPets_1592LayoutPurchaseWidget2 {...purchaseWidget} />
            <LayoutPets_1592LayoutAddOnBadgeViewWidget2 {...addOnBadgeViewWidget} />
        </Region>
    );
};

/** Named region `ctlg_pets` of LayoutPets_1592Layout - configured through the parent's `ctlgPets` prop. */
export interface LayoutPets_1592LayoutCtlgPetsProps {
    layout?: BoxLayout;
    newPetsWidget?: LayoutPets_1592LayoutNewPetsWidgetProps;
    petsWidget?: LayoutPets_1592LayoutPetsWidgetProps;
}

export const LayoutPets_1592LayoutCtlgPets = ({ layout, newPetsWidget, petsWidget }: LayoutPets_1592LayoutCtlgPetsProps) => {
    return (
        <Region
            name="ctlg_pets"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <LayoutPets_1592LayoutPetsWidget {...petsWidget} />
            <LayoutPets_1592LayoutNewPetsWidget {...newPetsWidget} />
        </Region>
    );
};
