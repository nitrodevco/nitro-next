import { useTranslation } from '#base/context';
import { BoxLayout, Button, ContainerButton, Frame, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `845_rentablespace_xml` (layout "rentablespace", 256x224) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RentablespaceLayoutProps {
    layout?: BoxLayout;
    onCancelRentButton?: () => void;
    onClose?: () => void;
    onErrorButtonClose?: () => void;
    onRentButton?: () => void;
}

export const RentablespaceLayout = ({ layout, onCancelRentButton, onClose, onErrorButtonClose, onRentButton }: RentablespaceLayoutProps) => {
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
                    <Region
                        name="rent_instructions"
                        params={8388624}
                        layout={{ width: 241, height: 22, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('rentablespace.widget.instructions')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 241 }}
                        />
                    </Region>
                    <ContainerButton
                        variant="3"
                        name="rent_button"
                        params={147665}
                        onPointerTap={onRentButton}
                        layout={{ width: 270, height: 44, flexShrink: 0 }}
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
                                    text="100 x"
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
                                    text={t('rentablespace.widget.rent')}
                                    textStyle="text-style-u-headline-medium"
                                />
                            </Region>
                        </Region>
                    </ContainerButton>
                    <Region
                        name="cant_rent_error"
                        params={147472}
                        layout={{ width: 245, height: 40, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Only HabboClub members can rent spaces."
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 245 }}
                        />
                    </Region>
                    <Icon
                        variant="15"
                        name="icon_habboclub"
                        params={16}
                        layout={{ width: 37, height: 40, flexShrink: 0 }}
                    />
                </Region>
                <Region
                    name="rented_view"
                    params={8536080}
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 245, top: 4, height: 97, flexDirection: 'column', gap: 5 }}
                >
                    <Region
                        name="rented_to_label"
                        params={16}
                        layout={{ width: 268, height: 29, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('rentablespace.widget.rented_to_label')}
                            textStyle="text-style-u-headline-small"
                        />
                    </Region>
                    <Region
                        name="renter_name"
                        params={16}
                        layout={{ width: 37, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="User"
                            textStyle="text-style-u-italic"
                        />
                    </Region>
                    <Region
                        name="time_label"
                        params={16}
                        layout={{ width: 249, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('rentablespace.widget.expires_label')}
                            textStyle="text-style-u-headline-small"
                        />
                    </Region>
                    <Region
                        name="time_remaining_label"
                        params={16}
                        layout={{ width: 113, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="5 days and 2 hours"
                            textStyle="text-style-u-italic"
                        />
                    </Region>
                    <Region
                        visible={false}
                        layout={{ width: 204, height: 30, flexShrink: 0 }}
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
                </Region>
                <Region
                    name="error_view"
                    params={131088}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 253, top: 0, height: 182, flexDirection: 'column' }}
                >
                    <Region
                        name="error_message"
                        params={16}
                        layout={{ width: 252, height: 119, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Somebody else already rented this space."
                            textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 252 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="error_button_close"
                        params={147473}
                        onPointerTap={onErrorButtonClose}
                        layout={{ width: 169, height: 22, flexShrink: 0 }}
                    >
                        {t('rentablespace.widget.close')}
                    </Button>
                </Region>
            </Region>
        </Frame>
    );
};
