import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { ChestGenericLayoutFooterOptions, ChestGenericLayoutFooterOptionsProps } from './ChestGenericLayoutFooterOptions';
import { ChestGenericLayoutLockInfoBubbleTexts, ChestGenericLayoutLockInfoBubbleTextsProps } from './ChestGenericLayoutLockInfoBubbleTexts';
import { ChestGenericLayoutStartDepositBtnItem } from './ChestGenericLayoutStartDepositBtnItem';
import { ChestGenericLayoutViewLogsBtnItem } from './ChestGenericLayoutViewLogsBtnItem';
import { ChestGenericLayoutWithdrawAllBtnItem } from './ChestGenericLayoutWithdrawAllBtnItem';

/** Row template `footer` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutFooterItemProps {
    captionItemCountTextBottom?: string;
    footerOptions?: ChestGenericLayoutFooterOptionsProps;
    itemsFooterButtonsLeft?: ReactNode;
    itemsFooterButtonsLeft2?: ReactNode;
    layout?: BoxLayout;
    layout1?: ReactNode;
    lockInfoBubbleTexts?: ChestGenericLayoutLockInfoBubbleTextsProps;
    onLockInfoButton?: () => void;
    splitter?: ReactNode;
    visibleButtonRow?: boolean;
    visibleButtonRowFooterButtonsLeft?: boolean;
    visibleFooterButtonsLeft?: boolean;
    visibleFooterOptions?: boolean;
    visibleItemCountTextBottom?: boolean;
    visibleLayout1?: boolean;
    visibleLayout2?: boolean;
    visibleLockInfoBubble?: boolean;
    visibleLockInfoBubbleTexts?: boolean;
    visibleLockInfoButton?: boolean;
    visibleSplitter?: boolean;
}

export const ChestGenericLayoutFooterItem = ({ captionItemCountTextBottom, footerOptions, itemsFooterButtonsLeft, itemsFooterButtonsLeft2, layout, layout1, lockInfoBubbleTexts, onLockInfoButton, splitter, visibleButtonRow, visibleButtonRowFooterButtonsLeft, visibleFooterButtonsLeft, visibleFooterOptions, visibleItemCountTextBottom, visibleLayout1, visibleLayout2, visibleLockInfoBubble, visibleLockInfoBubbleTexts, visibleLockInfoButton, visibleSplitter }: ChestGenericLayoutFooterItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="footer"
            layout={{ width: 460, height: 123, flexShrink: 0, ...layout }}
        >
            {(visibleLayout1 ?? true) && (
                <Region
                    name="layout_1"
                    backgroundColor="#dadada"
                    layout={{ position: 'absolute', left: 1, right: 1, top: 0, bottom: 13 }}
                >
                    {layout1}
                </Region>
            )}
            {(visibleLayout2 ?? true) && (
                <Border
                    variant="2"
                    name="layout_2"
                    tintColor="#dadada"
                    layout={{ position: 'absolute', left: 1, right: 1, bottom: 0, height: 36 }}
                />
            )}
            {(visibleSplitter ?? true) && (
                <Region
                    name="splitter"
                    backgroundColor="#c0c0c0"
                    layout={{ position: 'absolute', left: 1, right: 1, top: 0, height: 1 }}
                >
                    {splitter}
                </Region>
            )}
            {(visibleLockInfoButton ?? true) && (
                <Region
                    name="lock_info_button"
                    onPointerTap={onLockInfoButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 19, width: 18, top: 6, height: 18 }}
                >
                    <ThemeImage
                        src={layoutImage('icons_info_grey.png')}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                    />
                </Region>
            )}
            {(visibleLockInfoBubble ?? false) && (
                <Bubble
                    variant="7"
                    name="lock_info_bubble"
                    pointer="left"
                    layout={{ position: 'absolute', left: 440, width: 385, top: -245, height: 536 }}
                >
                    {(visibleLockInfoBubbleTexts ?? true) && (
                        <ChestGenericLayoutLockInfoBubbleTexts {...lockInfoBubbleTexts} />
                    )}
                </Bubble>
            )}
            {(visibleFooterOptions ?? true) && (
                <ChestGenericLayoutFooterOptions {...footerOptions} />
            )}
            {(visibleButtonRow ?? true) && (
                <Region
                    name="button_row"
                    layout={{ position: 'absolute', left: 0, right: 0, bottom: 6, height: 30 }}
                >
                    {(visibleFooterButtonsLeft ?? true) && (
                        <Region
                            name="footer_buttons_left"
                            layout={{ position: 'absolute', left: 17, width: 194, top: 0, bottom: 0, flexDirection: 'row', gap: 13 }}
                        >
                            {itemsFooterButtonsLeft ?? (
                                <>
                                    <ChestGenericLayoutWithdrawAllBtnItem />
                                    <ChestGenericLayoutStartDepositBtnItem />
                                </>
                            )}
                        </Region>
                    )}
                    {(visibleButtonRowFooterButtonsLeft ?? true) && (
                        <Region
                            name="footer_buttons_left"
                            layout={{ position: 'absolute', right: 17, width: 73, top: 0, bottom: 0, flexDirection: 'row', gap: 10 }}
                        >
                            {itemsFooterButtonsLeft2 ?? (
                                <ChestGenericLayoutViewLogsBtnItem />
                            )}
                        </Region>
                    )}
                    {(visibleItemCountTextBottom ?? false) && (
                        <Region
                            name="item_count_text_bottom"
                            layout={{ position: 'absolute', right: 15, width: 184, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionItemCountTextBottom ?? t('wiredchests.space_used')}
                        </Region>
                    )}
                </Region>
            )}
        </Region>
    );
};
