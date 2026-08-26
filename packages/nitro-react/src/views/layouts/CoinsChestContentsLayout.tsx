import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1143_coins_chest_contents_xml` (layout "coins_chest_contents", 413x263) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CoinsChestContentsLayoutProps {
    layout?: BoxLayout;
    onWithdrawBtn?: () => void;
}

export const CoinsChestContentsLayout = ({ layout, onWithdrawBtn }: CoinsChestContentsLayoutProps) => {
    const t = useTranslation();
    const [ withdrawInputValue, setWithdrawInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 413, height: 263, ...layout }}>
            <Region
                name="coins_chest"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 413, top: 0, height: 263 }}
            >
                <Region
                    name="moving_container"
                    params={3280}
                    layout={{ position: 'absolute', left: 44, width: 324, top: 24, height: 228 }}
                >
                    <ThemeImage
                        name="bg_img"
                        params={12582928}
                        src={layoutImage('wired_chests_images_light_coins_chest_balance_zero.png')}
                        layout={{ position: 'absolute', left: 0, width: 324, top: 0, height: 228 }}
                    />
                    <Region
                        name="balance_cont"
                        params={16}
                        layout={{ position: 'absolute', left: 9, width: 54, top: 68, height: 47 }}
                    >
                        <Region
                            name="balance_txt"
                            params={786448}
                            layout={{ position: 'absolute', left: 2, width: 45, top: 7, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('wiredchests.coin_chest.balance')} />
                        </Region>
                        <Region
                            name="balance_container"
                            params={786448}
                            layout={{ position: 'absolute', left: 15, width: 24, top: 22, height: 15, flexDirection: 'row', gap: 1 }}
                        >
                            <Region
                                name="coins_amount_txt"
                                params={16}
                                layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="0" />
                            </Region>
                            <Icon
                                variant="35"
                                name="coin_icon"
                                params={17}
                                layout={{ width: 13, height: 15, flexShrink: 0 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="withdraw_cont"
                        params={934992}
                        layout={{ position: 'absolute', left: 160, width: 105, top: 18, height: 28, flexDirection: 'row', gap: 5 }}
                    >
                        <TextInput
                            value={withdrawInputValue}
                            onChange={setWithdrawInputValue}
                            layout={{ width: 27, height: 19, flexShrink: 0, minWidth: 27, maxWidth: 27 }}
                        />
                        <Button
                            variant="3"
                            name="withdraw_btn"
                            params={393233}
                            onPointerTap={onWithdrawBtn}
                            layout={{ width: 73, height: 22, flexShrink: 0, minWidth: 60 }}
                        >
                            {t('wiredchests.withdraw')}
                        </Button>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
