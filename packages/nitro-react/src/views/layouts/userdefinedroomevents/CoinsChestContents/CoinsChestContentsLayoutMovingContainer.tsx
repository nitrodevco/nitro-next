import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CoinsChestContentsLayoutCoinIconItem } from './CoinsChestContentsLayoutCoinIconItem';
import { CoinsChestContentsLayoutCoinsAmountTxtItem } from './CoinsChestContentsLayoutCoinsAmountTxtItem';
import { CoinsChestContentsLayoutWithdrawBtnItem } from './CoinsChestContentsLayoutWithdrawBtnItem';
import { CoinsChestContentsLayoutWithdrawInputItem } from './CoinsChestContentsLayoutWithdrawInputItem';

/** Named region `moving_container` of CoinsChestContentsLayout - configured through the parent's `movingContainer` prop. */
export interface CoinsChestContentsLayoutMovingContainerProps {
    captionBalanceTxt?: string;
    itemsBalanceContainer?: ReactNode;
    itemsWithdrawCont?: ReactNode;
    layout?: BoxLayout;
    srcBgImg?: string;
}

export const CoinsChestContentsLayoutMovingContainer = ({ captionBalanceTxt, itemsBalanceContainer, itemsWithdrawCont, layout, srcBgImg }: CoinsChestContentsLayoutMovingContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="moving_container"
            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 324, alignSelf: 'center', marginTop: 6.5, marginBottom: -6.5, height: 228, ...layout }}
        >
            <ThemeImage
                name="bg_img"
                src={srcBgImg ?? layoutImage('wired_chests_images_light_coins_chest_balance_zero.png')}
                layout={{ position: 'absolute', left: 0, top: 0 }}
            />
            <Region
                name="balance_cont"
                layout={{ position: 'absolute', left: 9, width: 54, top: 68, height: 47, justifyContent: 'center' }}
            >
                <Region
                    name="balance_txt"
                    layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 45, top: 7, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionBalanceTxt ?? t('wiredchests.coin_chest.balance')}
                </Region>
                <Region
                    name="balance_container"
                    layout={{ position: 'absolute', width: 24, top: 22, height: 15, flexDirection: 'row', gap: 1 }}
                >
                    {itemsBalanceContainer ?? (
                        <>
                            <CoinsChestContentsLayoutCoinsAmountTxtItem />
                            <CoinsChestContentsLayoutCoinIconItem />
                        </>
                    )}
                </Region>
            </Region>
            <Region
                name="withdraw_cont"
                layout={{ position: 'absolute', right: 59, bottom: 182, flexDirection: 'row', gap: 5 }}
            >
                {itemsWithdrawCont ?? (
                    <>
                        <CoinsChestContentsLayoutWithdrawInputItem />
                        <CoinsChestContentsLayoutWithdrawBtnItem />
                    </>
                )}
            </Region>
        </Region>
    );
};
