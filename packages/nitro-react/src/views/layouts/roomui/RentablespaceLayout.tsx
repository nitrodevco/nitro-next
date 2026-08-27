import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ContainerButton, Frame, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `845_rentablespace_xml` (layout "rentablespace", 256x224) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RentablespaceLayoutProps {
    itemsErrorView?: ReactNode;
    itemsRentedView?: ReactNode;
    itemsRentView?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const RentablespaceLayout = ({ itemsErrorView, itemsRentedView, itemsRentView, layout, onClose }: RentablespaceLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={164097}
            caption={t('rentablespace.widget.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 256, height: 224, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="rent_view"
                    params={8519696}
                    layout={{ position: 'absolute', left: 2, width: 243, top: 4, height: 216, flexDirection: 'column', gap: 10 }}
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
                <Region
                    name="rented_view"
                    params={8536080}
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 245, top: 4, height: 97, flexDirection: 'column', gap: 5 }}
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
                <Region
                    name="error_view"
                    params={131088}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 253, top: 0, height: 182, flexDirection: 'column' }}
                >
                    {itemsErrorView ?? (
                        <>
                            <RentablespaceLayoutErrorMessageItem />
                            <RentablespaceLayoutErrorButtonCloseItem />
                        </>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `rent_instructions` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutRentInstructionsItemProps {
    captionRentInstructions?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutRentInstructionsItem = ({ captionRentInstructions, layout }: RentablespaceLayoutRentInstructionsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rent_instructions"
            params={8388624}
            layout={{ width: 241, height: 22, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
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
}

export const RentablespaceLayoutRentButtonItem = ({ captionPriceLabel, captionRentLabel, layout, onRentButton }: RentablespaceLayoutRentButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="3"
            name="rent_button"
            params={147665}
            onPointerTap={onRentButton}
            layout={{ width: 270, height: 44, flexShrink: 0, ...layout }}
        >
            <Region
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 270, top: 0, height: 44, flexDirection: 'row', gap: 5 }}
            >
                <Region
                    name="price_label"
                    params={16}
                    layout={{ width: 56, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPriceLabel ?? '100 x'}
                        textStyle="text-style-u-headline-medium"
                    />
                </Region>
                <Icon
                    variant="10"
                    params={16}
                    layout={{ width: 28, height: 24, flexShrink: 0 }}
                />
                <Region
                    name="rent_label"
                    params={16}
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
}

export const RentablespaceLayoutCantRentErrorItem = ({ captionCantRentError, layout }: RentablespaceLayoutCantRentErrorItemProps) => {
    return (
        <Region
            name="cant_rent_error"
            params={147472}
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
}

export const RentablespaceLayoutIconHabboclubItem = ({ layout }: RentablespaceLayoutIconHabboclubItemProps) => {
    return (
        <Icon
            variant="15"
            name="icon_habboclub"
            params={16}
            layout={{ width: 37, height: 40, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `rented_to_label` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutRentedToLabelItemProps {
    captionRentedToLabel?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutRentedToLabelItem = ({ captionRentedToLabel, layout }: RentablespaceLayoutRentedToLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rented_to_label"
            params={16}
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
}

export const RentablespaceLayoutRenterNameItem = ({ captionRenterName, layout }: RentablespaceLayoutRenterNameItemProps) => {
    return (
        <Region
            name="renter_name"
            params={16}
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
}

export const RentablespaceLayoutTimeLabelItem = ({ captionTimeLabel, layout }: RentablespaceLayoutTimeLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="time_label"
            params={16}
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
}

export const RentablespaceLayoutTimeRemainingLabelItem = ({ captionTimeRemainingLabel, layout }: RentablespaceLayoutTimeRemainingLabelItemProps) => {
    return (
        <Region
            name="time_remaining_label"
            params={16}
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
    visibleCancelRentButton?: boolean;
}

export const RentablespaceLayoutCancelRentButtonItem = ({ layout, onCancelRentButton, visibleCancelRentButton }: RentablespaceLayoutCancelRentButtonItemProps) => {
    const t = useTranslation();

    return (
        <Region
            visible={visibleCancelRentButton ?? false}
            layout={{ width: 204, height: 30, flexShrink: 0, ...layout }}
        >
            <Button
                variant="3"
                name="cancel_rent_button"
                params={131281}
                onPointerTap={onCancelRentButton}
                layout={{ width: '100%', height: '100%' }}
            >
                {t('rentablespace.widget.cancel_rent')}
            </Button>
        </Region>
    );
};

/** Row template `error_message` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutErrorMessageItemProps {
    captionErrorMessage?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutErrorMessageItem = ({ captionErrorMessage, layout }: RentablespaceLayoutErrorMessageItemProps) => {
    return (
        <Region
            name="error_message"
            params={16}
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
}

export const RentablespaceLayoutErrorButtonCloseItem = ({ layout, onErrorButtonClose }: RentablespaceLayoutErrorButtonCloseItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="error_button_close"
            params={147473}
            onPointerTap={onErrorButtonClose}
            layout={{ width: 169, height: 22, flexShrink: 0, ...layout }}
        >
            {t('rentablespace.widget.close')}
        </Button>
    );
};
