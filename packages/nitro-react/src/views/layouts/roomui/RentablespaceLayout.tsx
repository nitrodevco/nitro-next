import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ContainerButton, Frame, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `845_rentablespace_xml` (layout "rentablespace", 256x224) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RentablespaceLayoutProps {
    errorView?: RentablespaceLayoutErrorViewProps;
    layout?: BoxLayout;
    onClose?: () => void;
    rentedView?: RentablespaceLayoutRentedViewProps;
    rentView?: RentablespaceLayoutRentViewProps;
}

export const RentablespaceLayout = ({ errorView, layout, onClose, rentedView, rentView }: RentablespaceLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('rentablespace.widget.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 256, height: 224, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <RentablespaceLayoutRentView {...rentView} />
                <RentablespaceLayoutRentedView {...rentedView} />
                <RentablespaceLayoutErrorView {...errorView} />
            </Region>
        </Frame>
    );
};

/** Row template `rent_instructions` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutRentInstructionsItemProps {
    captionRentInstructions?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentablespaceLayoutRentInstructionsItem = ({ captionRentInstructions, layout, tags }: RentablespaceLayoutRentInstructionsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rent_instructions"
            tags={tags}
            layout={{ width: 241, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRentInstructions ?? t('rentablespace.widget.instructions')}
                textOptions={{ wordWrap: true, wordWrapWidth: 241 }}
            />
        </Region>
    );
};

/** Row template `rent_button` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutRentButtonItemProps {
    captionPriceLabel?: string;
    captionRentLabel?: string;
    layout?: BoxLayout;
    onRentButton?: () => void;
    tags?: string[];
}

export const RentablespaceLayoutRentButtonItem = ({ captionPriceLabel, captionRentLabel, layout, onRentButton, tags }: RentablespaceLayoutRentButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="3"
            name="rent_button"
            tags={tags}
            onPointerTap={onRentButton}
            layout={{ width: 270, height: 44, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', gap: 5 }}>
                <Region
                    name="price_label"
                    layout={{ width: 56, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPriceLabel ?? '100 x'}
                        textStyle="text-style-u-headline-medium"
                    />
                </Region>
                <Icon
                    variant="10"
                    layout={{ width: 28, height: 24, flexShrink: 0 }}
                />
                <Region
                    name="rent_label"
                    layout={{ width: 176, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRentLabel ?? t('rentablespace.widget.rent')}
                        textStyle="text-style-u-headline-medium"
                    />
                </Region>
            </Region>
        </ContainerButton>
    );
};

/** Row template `cant_rent_error` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutCantRentErrorItemProps {
    captionCantRentError?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentablespaceLayoutCantRentErrorItem = ({ captionCantRentError, layout, tags }: RentablespaceLayoutCantRentErrorItemProps) => {
    return (
        <Region
            name="cant_rent_error"
            tags={tags}
            layout={{ width: 245, height: 40, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCantRentError ?? 'Only HabboClub members can rent spaces.'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 245 }}
            />
        </Region>
    );
};

/** Row template `icon_habboclub` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutIconHabboclubItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const RentablespaceLayoutIconHabboclubItem = ({ layout, tags }: RentablespaceLayoutIconHabboclubItemProps) => {
    return (
        <Icon
            variant="15"
            name="icon_habboclub"
            tags={tags}
            layout={{ width: 37, height: 40, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `rent_view` of RentablespaceLayout - configured through the parent's `rentView` prop. */
export interface RentablespaceLayoutRentViewProps {
    itemsRentView?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentablespaceLayoutRentView = ({ itemsRentView, layout, tags }: RentablespaceLayoutRentViewProps) => {
    return (
        <Region
            name="rent_view"
            tags={tags}
            layout={{ position: 'absolute', left: 2, minWidth: 243, top: 4, minHeight: 216, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsRentView ?? (
                <>
                    <RentablespaceLayoutRentInstructionsItem />
                    <RentablespaceLayoutRentButtonItem />
                    <RentablespaceLayoutCantRentErrorItem />
                    <RentablespaceLayoutIconHabboclubItem />
                </>
            )}
        </Region>
    );
};

/** Row template `rented_to_label` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutRentedToLabelItemProps {
    captionRentedToLabel?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentablespaceLayoutRentedToLabelItem = ({ captionRentedToLabel, layout, tags }: RentablespaceLayoutRentedToLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rented_to_label"
            tags={tags}
            layout={{ width: 268, height: 29, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRentedToLabel ?? t('rentablespace.widget.rented_to_label')}
                textStyle="text-style-u-headline-small"
            />
        </Region>
    );
};

/** Row template `renter_name` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutRenterNameItemProps {
    captionRenterName?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentablespaceLayoutRenterNameItem = ({ captionRenterName, layout, tags }: RentablespaceLayoutRenterNameItemProps) => {
    return (
        <Region
            name="renter_name"
            tags={tags}
            layout={{ width: 37, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRenterName ?? 'User'}
                textStyle="text-style-u-italic"
            />
        </Region>
    );
};

/** Row template `time_label` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutTimeLabelItemProps {
    captionTimeLabel?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentablespaceLayoutTimeLabelItem = ({ captionTimeLabel, layout, tags }: RentablespaceLayoutTimeLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="time_label"
            tags={tags}
            layout={{ width: 249, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTimeLabel ?? t('rentablespace.widget.expires_label')}
                textStyle="text-style-u-headline-small"
            />
        </Region>
    );
};

/** Row template `time_remaining_label` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutTimeRemainingLabelItemProps {
    captionTimeRemainingLabel?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentablespaceLayoutTimeRemainingLabelItem = ({ captionTimeRemainingLabel, layout, tags }: RentablespaceLayoutTimeRemainingLabelItemProps) => {
    return (
        <Region
            name="time_remaining_label"
            tags={tags}
            layout={{ width: 113, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTimeRemainingLabel ?? '5 days and 2 hours'}
                textStyle="text-style-u-italic"
            />
        </Region>
    );
};

/** Row template `cancel_rent_button` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutCancelRentButtonItemProps {
    layout?: BoxLayout;
    onCancelRentButton?: () => void;
    tags?: string[];
    visibleCancelRentButton?: boolean;
}

export const RentablespaceLayoutCancelRentButtonItem = ({ layout, onCancelRentButton, tags, visibleCancelRentButton }: RentablespaceLayoutCancelRentButtonItemProps) => {
    const t = useTranslation();

    return (
        <Region
            visible={visibleCancelRentButton ?? false}
            layout={{ width: 204, height: 30, flexShrink: 0, ...layout }}
        >
            <Button
                variant="3"
                name="cancel_rent_button"
                tags={tags}
                onPointerTap={onCancelRentButton}
                layout={{ width: '100%', height: '100%' }}
            >
                {t('rentablespace.widget.cancel_rent')}
            </Button>
        </Region>
    );
};

/** Named region `rented_view` of RentablespaceLayout - configured through the parent's `rentedView` prop. */
export interface RentablespaceLayoutRentedViewProps {
    itemsRentedView?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentablespaceLayoutRentedView = ({ itemsRentedView, layout, tags }: RentablespaceLayoutRentedViewProps) => {
    return (
        <Region
            name="rented_view"
            tags={tags}
            visible={false}
            layout={{ position: 'absolute', left: 2, top: 4, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsRentedView ?? (
                <>
                    <RentablespaceLayoutRentedToLabelItem />
                    <RentablespaceLayoutRenterNameItem />
                    <RentablespaceLayoutTimeLabelItem />
                    <RentablespaceLayoutTimeRemainingLabelItem />
                    <RentablespaceLayoutCancelRentButtonItem />
                </>
            )}
        </Region>
    );
};

/** Row template `error_message` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutErrorMessageItemProps {
    captionErrorMessage?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentablespaceLayoutErrorMessageItem = ({ captionErrorMessage, layout, tags }: RentablespaceLayoutErrorMessageItemProps) => {
    return (
        <Region
            name="error_message"
            tags={tags}
            layout={{ width: 252, height: 119, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionErrorMessage ?? 'Somebody else already rented this space.'}
                textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 252 }}
            />
        </Region>
    );
};

/** Row template `error_button_close` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutErrorButtonCloseItemProps {
    layout?: BoxLayout;
    onErrorButtonClose?: () => void;
    tags?: string[];
}

export const RentablespaceLayoutErrorButtonCloseItem = ({ layout, onErrorButtonClose, tags }: RentablespaceLayoutErrorButtonCloseItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="error_button_close"
            tags={tags}
            onPointerTap={onErrorButtonClose}
            layout={{ width: 169, height: 22, flexShrink: 0, ...layout }}
        >
            {t('rentablespace.widget.close')}
        </Button>
    );
};

/** Named region `error_view` of RentablespaceLayout - configured through the parent's `errorView` prop. */
export interface RentablespaceLayoutErrorViewProps {
    itemsErrorView?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentablespaceLayoutErrorView = ({ itemsErrorView, layout, tags }: RentablespaceLayoutErrorViewProps) => {
    return (
        <Region
            name="error_view"
            tags={tags}
            visible={false}
            layout={{ position: 'absolute', left: 0, minWidth: 253, top: 0, minHeight: 182, flexDirection: 'column', ...layout }}
        >
            {itemsErrorView ?? (
                <>
                    <RentablespaceLayoutErrorMessageItem />
                    <RentablespaceLayoutErrorButtonCloseItem />
                </>
            )}
        </Region>
    );
};
