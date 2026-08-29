import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1143_coins_chest_contents_xml` (layout "coins_chest_contents", 413x263) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CoinsChestContentsLayoutProps {
    coinsChest?: CoinsChestContentsLayoutCoinsChestProps;
    layout?: BoxLayout;
}

export const CoinsChestContentsLayout = ({ coinsChest, layout }: CoinsChestContentsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 413, height: 263, ...layout }}>
            <CoinsChestContentsLayoutCoinsChest {...coinsChest} />
        </Region>
    );
};

/** Row template `coins_amount_txt` of CoinsChestContentsLayout - pass real rows through its `items…` slot. */
export interface CoinsChestContentsLayoutCoinsAmountTxtItemProps {
    captionCoinsAmountTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CoinsChestContentsLayoutCoinsAmountTxtItem = ({ captionCoinsAmountTxt, layout, tags }: CoinsChestContentsLayoutCoinsAmountTxtItemProps) => {
    return (
        <Region
            name="coins_amount_txt"
            tags={tags}
            layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionCoinsAmountTxt ?? '0'} />
        </Region>
    );
};

/** Row template `coin_icon` of CoinsChestContentsLayout - pass real rows through its `items…` slot. */
export interface CoinsChestContentsLayoutCoinIconItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CoinsChestContentsLayoutCoinIconItem = ({ layout, tags }: CoinsChestContentsLayoutCoinIconItemProps) => {
    return (
        <Icon
            variant="35"
            name="coin_icon"
            tags={tags}
            layout={{ width: 13, height: 15, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `balance_container` of CoinsChestContentsLayout - configured through the parent's `balanceContainer` prop. */
export interface CoinsChestContentsLayoutBalanceContainerProps {
    itemsBalanceContainer?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CoinsChestContentsLayoutBalanceContainer = ({ itemsBalanceContainer, layout, tags }: CoinsChestContentsLayoutBalanceContainerProps) => {
    return (
        <Region
            name="balance_container"
            tags={tags}
            layout={{ position: 'absolute', width: 24, top: 22, height: 15, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsBalanceContainer ?? (
                <>
                    <CoinsChestContentsLayoutCoinsAmountTxtItem />
                    <CoinsChestContentsLayoutCoinIconItem />
                </>
            )}
        </Region>
    );
};

/** Named region `balance_cont` of CoinsChestContentsLayout - configured through the parent's `balanceCont` prop. */
export interface CoinsChestContentsLayoutBalanceContProps {
    balanceContainer?: CoinsChestContentsLayoutBalanceContainerProps;
    captionBalanceTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CoinsChestContentsLayoutBalanceCont = ({ balanceContainer, captionBalanceTxt, layout, tags }: CoinsChestContentsLayoutBalanceContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="balance_cont"
            tags={tags}
            layout={{ position: 'absolute', left: 9, width: 54, top: 68, height: 47, justifyContent: 'center', ...layout }}
        >
            <Region
                name="balance_txt"
                layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 45, top: 7, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionBalanceTxt ?? t('wiredchests.coin_chest.balance')} />
            </Region>
            <CoinsChestContentsLayoutBalanceContainer {...balanceContainer} />
        </Region>
    );
};

/** Row template `withdraw_input` of CoinsChestContentsLayout - pass real rows through its `items…` slot. */
export interface CoinsChestContentsLayoutWithdrawInputItemProps {
    layout?: BoxLayout;
}

export const CoinsChestContentsLayoutWithdrawInputItem = ({ layout }: CoinsChestContentsLayoutWithdrawInputItemProps) => {
    const [ withdrawInputValue, setWithdrawInputValue ] = useState('');

    return (
        <TextInput
            value={withdrawInputValue}
            onChange={setWithdrawInputValue}
            layout={{ width: 27, height: 19, flexShrink: 0, minWidth: 27, maxWidth: 27, ...layout }}
        />
    );
};

/** Row template `withdraw_btn` of CoinsChestContentsLayout - pass real rows through its `items…` slot. */
export interface CoinsChestContentsLayoutWithdrawBtnItemProps {
    layout?: BoxLayout;
    onWithdrawBtn?: () => void;
    tags?: string[];
}

export const CoinsChestContentsLayoutWithdrawBtnItem = ({ layout, onWithdrawBtn, tags }: CoinsChestContentsLayoutWithdrawBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="withdraw_btn"
            tags={tags}
            onPointerTap={onWithdrawBtn}
            layout={{ width: 73, height: 22, flexShrink: 0, minWidth: 60, ...layout }}
        >
            {t('wiredchests.withdraw')}
        </Button>
    );
};

/** Named region `withdraw_cont` of CoinsChestContentsLayout - configured through the parent's `withdrawCont` prop. */
export interface CoinsChestContentsLayoutWithdrawContProps {
    itemsWithdrawCont?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CoinsChestContentsLayoutWithdrawCont = ({ itemsWithdrawCont, layout, tags }: CoinsChestContentsLayoutWithdrawContProps) => {
    return (
        <Region
            name="withdraw_cont"
            tags={tags}
            layout={{ position: 'absolute', right: 59, bottom: 182, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsWithdrawCont ?? (
                <>
                    <CoinsChestContentsLayoutWithdrawInputItem />
                    <CoinsChestContentsLayoutWithdrawBtnItem />
                </>
            )}
        </Region>
    );
};

/** Named region `moving_container` of CoinsChestContentsLayout - configured through the parent's `movingContainer` prop. */
export interface CoinsChestContentsLayoutMovingContainerProps {
    balanceCont?: CoinsChestContentsLayoutBalanceContProps;
    layout?: BoxLayout;
    srcBgImg?: string;
    tags?: string[];
    withdrawCont?: CoinsChestContentsLayoutWithdrawContProps;
}

export const CoinsChestContentsLayoutMovingContainer = ({ balanceCont, layout, srcBgImg, tags, withdrawCont }: CoinsChestContentsLayoutMovingContainerProps) => {
    return (
        <Region
            name="moving_container"
            tags={tags}
            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 324, alignSelf: 'center', marginTop: 6.5, marginBottom: -6.5, height: 228, ...layout }}
        >
            <ThemeImage
                name="bg_img"
                src={srcBgImg ?? layoutImage('wired_chests_images_light_coins_chest_balance_zero.png')}
                layout={{ position: 'absolute', left: 0, top: 0 }}
            />
            <CoinsChestContentsLayoutBalanceCont {...balanceCont} />
            <CoinsChestContentsLayoutWithdrawCont {...withdrawCont} />
        </Region>
    );
};

/** Named region `coins_chest` of CoinsChestContentsLayout - configured through the parent's `coinsChest` prop. */
export interface CoinsChestContentsLayoutCoinsChestProps {
    layout?: BoxLayout;
    movingContainer?: CoinsChestContentsLayoutMovingContainerProps;
    tags?: string[];
}

export const CoinsChestContentsLayoutCoinsChest = ({ layout, movingContainer, tags }: CoinsChestContentsLayoutCoinsChestProps) => {
    return (
        <Region
            name="coins_chest"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 413, top: 0, height: 263, justifyContent: 'center', ...layout }}
        >
            <CoinsChestContentsLayoutMovingContainer {...movingContainer} />
        </Region>
    );
};
