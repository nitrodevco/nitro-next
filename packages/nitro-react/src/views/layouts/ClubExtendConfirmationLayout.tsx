import { BoxLayout, ButtonThick, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1625_club_extend_confirmation_xml` (layout "extend_confirmation", 450x235) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubExtendConfirmationLayoutProps {
    layout?: BoxLayout;
    onBuyNowButton?: () => void;
    onClose?: () => void;
}

export const ClubExtendConfirmationLayout = ({ layout, onBuyNowButton, onClose }: ClubExtendConfirmationLayoutProps) => {
    return (
        <Frame
            variant="3"
            id="frame_title"
            name="frame_title"
            params={33025}
            tintColor="#007a98"
            onClose={onClose}
            layout={{ width: 450, height: 235, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="background_container"
                    params={16}
                    backgroundColor="#bcbdbc"
                    layout={{ position: 'absolute', left: 1, width: 448, top: 0, height: 25 }}
                />
                <Icon
                    variant="18"
                    name="club_level_icon"
                    params={16}
                    layout={{ position: 'absolute', left: 25, width: 85, top: 25, height: 40 }}
                />
                <Region
                    name="itemlist_vertical"
                    params={8388624}
                    layout={{ position: 'absolute', left: 140, width: 285, top: 25, height: 175, flexDirection: 'column' }}
                >
                    <Region
                        name="extend_title"
                        params={16}
                        layout={{ width: 266, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    />
                    <Region
                        name="normal_price_container"
                        params={16}
                        layout={{ width: 285, height: 30, flexShrink: 0 }}
                    >
                        <Region
                            name="normal_price_label"
                            params={1048592}
                            layout={{ position: 'absolute', left: 0, width: 4, top: 15, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        />
                        <Region
                            name="normal_price_price_left"
                            params={1048592}
                            layout={{ position: 'absolute', left: 150, width: 30, top: 15, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        />
                        <ThemeImage
                            name="normal_price_icon_left"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 180, width: 30, top: 0, height: 25 }}
                        />
                        <Region
                            name="plus"
                            params={16}
                            layout={{ position: 'absolute', left: 212, width: 10, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text=" "
                                textStyle="text-style-u-regular"
                                textOptions={{ align: 'right' }}
                            />
                        </Region>
                        <Region
                            name="normal_price_price_right"
                            params={1048592}
                            layout={{ position: 'absolute', left: 220, width: 30, top: 15, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        />
                        <Icon
                            variant="0"
                            name="normal_price_icon_right"
                            params={16}
                            layout={{ position: 'absolute', left: 255, width: 30, top: 0, height: 25 }}
                        />
                    </Region>
                    <Region
                        name="you_save_container"
                        params={16}
                        layout={{ width: 285, height: 30, flexShrink: 0 }}
                    >
                        <Region
                            name="you_save_label"
                            params={1048592}
                            layout={{ position: 'absolute', left: 0, width: 4, top: 15, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        />
                        <Region
                            name="you_save_price_left"
                            params={1048592}
                            layout={{ position: 'absolute', left: 150, width: 30, top: 15, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        />
                        <ThemeImage
                            name="you_save_icon_left"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 180, width: 30, top: 0, height: 25 }}
                        />
                        <Region
                            name="plus"
                            params={16}
                            layout={{ position: 'absolute', left: 212, width: 10, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text=" "
                                textStyle="text-style-u-regular"
                                textOptions={{ align: 'right' }}
                            />
                        </Region>
                        <Region
                            name="you_save_price_right"
                            params={1048592}
                            layout={{ position: 'absolute', left: 220, width: 30, top: 15, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        />
                        <Icon
                            variant="0"
                            name="you_save_icon_right"
                            params={16}
                            layout={{ position: 'absolute', left: 255, width: 30, top: 0, height: 25 }}
                        />
                    </Region>
                    <Region
                        name="total_amount_line"
                        params={16}
                        backgroundColor="#007a98"
                        layout={{ width: 285, height: 3, flexShrink: 0 }}
                    />
                    <Region
                        name="spacer"
                        params={16}
                        layout={{ width: 100, height: 8, flexShrink: 0 }}
                    />
                    <Region
                        name="your_price_container"
                        params={16}
                        layout={{ width: 285, height: 31, flexShrink: 0 }}
                    >
                        <Region
                            name="your_price_label"
                            params={1048592}
                            layout={{ position: 'absolute', left: 0, width: 4, top: 15, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        />
                        <Region
                            name="your_price_price_left"
                            params={1048592}
                            layout={{ position: 'absolute', left: 150, width: 30, top: 15, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        />
                        <ThemeImage
                            name="your_price_icon_left"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 180, width: 30, top: 0, height: 25 }}
                        />
                        <Region
                            name="plus"
                            params={16}
                            layout={{ position: 'absolute', left: 212, width: 10, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text=" "
                                textStyle="text-style-u-bold"
                                textOptions={{ align: 'right' }}
                            />
                        </Region>
                        <Region
                            name="your_price_price_right"
                            params={1048592}
                            layout={{ position: 'absolute', left: 220, width: 30, top: 15, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        />
                        <Icon
                            variant="0"
                            name="your_price_icon_right"
                            params={16}
                            layout={{ position: 'absolute', left: 255, width: 30, top: 0, height: 25 }}
                        />
                    </Region>
                    <Region
                        name="offer_expiration"
                        params={16}
                        layout={{ width: 244, height: 9, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    />
                    <Region
                        params={16}
                        layout={{ width: 100, height: 10, flexShrink: 0 }}
                    />
                    <Region
                        name="action_container"
                        params={16}
                        layout={{ width: 285, height: 40, flexShrink: 0, maxWidth: 285 }}
                    >
                        <ButtonThick
                            variant="3"
                            name="buy_now_button"
                            params={393233}
                            onPointerTap={onBuyNowButton}
                            layout={{ position: 'absolute', left: 135, width: 150, top: 0, height: 30, maxWidth: 150 }}
                        />
                        <Region
                            name="maybe_later_region"
                            params={131089}
                            layout={{ position: 'absolute', left: 0, width: 5, top: 0, height: 32 }}
                        >
                            <Region
                                name="maybe_later_link"
                                params={4194320}
                                layout={{ position: 'absolute', left: 0, width: 4, top: 5, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            />
                        </Region>
                    </Region>
                </Region>
                <ThemeImage
                    name="club_teaser"
                    params={1049712}
                    src={undefined}
                    layout={{ position: 'absolute', left: 1, width: 40, top: 110, height: 144 }}
                />
            </Region>
        </Frame>
    );
};
