import { BoxLayout, ButtonThick, Region, ThemeText } from '#base/theme';

/** Row template `action_container` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutActionContainerItemProps {
    captionMaybeLaterLink?: string;
    layout?: BoxLayout;
    onBuyNowButton?: () => void;
    onMaybeLaterRegion?: () => void;
    visibleBuyNowButton?: boolean;
    visibleMaybeLaterLink?: boolean;
    visibleMaybeLaterRegion?: boolean;
}

export const ClubExtendConfirmationLayoutActionContainerItem = ({ captionMaybeLaterLink, layout, onBuyNowButton, onMaybeLaterRegion, visibleBuyNowButton, visibleMaybeLaterLink, visibleMaybeLaterRegion }: ClubExtendConfirmationLayoutActionContainerItemProps) => {
    return (
        <Region
            name="action_container"
            layout={{ width: 285, height: 40, flexShrink: 0, maxWidth: 285, ...layout }}
        >
            {(visibleBuyNowButton ?? true) && (
                <ButtonThick
                    variant="3"
                    name="buy_now_button"
                    onPointerTap={onBuyNowButton}
                    layout={{ position: 'absolute', right: 0, width: 150, top: 0, height: 30, maxWidth: 150 }}
                />
            )}
            {(visibleMaybeLaterRegion ?? true) && (
                <Region
                    name="maybe_later_region"
                    onPointerTap={onMaybeLaterRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 5, top: 0, height: 32 }}
                >
                    {(visibleMaybeLaterLink ?? true) && (
                        <ThemeText
                            text={captionMaybeLaterLink ?? ''}
                            textStyle="text-style-u-regular"
                            name="maybe_later_link"
                            layout={{ position: 'absolute', left: 0, top: 5, height: 4 }}
                        />
                    )}
                </Region>
            )}
        </Region>
    );
};
