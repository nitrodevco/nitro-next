import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Icon, Region, ThemeText } from '#base/theme';

import { TransactionOverviewLayoutPairItem } from './TransactionOverviewLayoutPairItem';
import { TransactionOverviewLayoutPairItem2 } from './TransactionOverviewLayoutPairItem2';

/** Named region `header` of TransactionOverviewLayout - configured through the parent's `header` prop. */
export interface TransactionOverviewLayoutHeaderProps {
    captionWarningText?: string;
    itemsKeyValuePairs?: ReactNode;
    layout?: BoxLayout;
    onRefreshBtn?: () => void;
    visibleSearchingIcon?: boolean;
    visibleWarningText?: boolean;
}

export const TransactionOverviewLayoutHeader = ({ captionWarningText, itemsKeyValuePairs, layout, onRefreshBtn, visibleSearchingIcon, visibleWarningText }: TransactionOverviewLayoutHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 62, ...layout }}
        >
            {(visibleWarningText ?? false) && (
                <Region
                    name="warning_text"
                    layout={{ position: 'absolute', left: 10, right: 9, top: 10, bottom: -6, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionWarningText ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 861 }}
                    />
                </Region>
            )}
            <Region
                name="key_value_pairs"
                layout={{ position: 'absolute', left: 15, width: 400, top: 13, height: 42, flexDirection: 'column', gap: 2 }}
            >
                {itemsKeyValuePairs ?? (
                    <>
                        <TransactionOverviewLayoutPairItem />
                        <TransactionOverviewLayoutPairItem2 />
                    </>
                )}
            </Region>
            <Button
                variant="3"
                name="refresh_btn"
                onPointerTap={onRefreshBtn}
                layout={{ position: 'absolute', right: 17, width: 62, top: 13, height: 30 }}
            >
                {t('wiredchests.logs.refresh')}
            </Button>
            {(visibleSearchingIcon ?? false) && (
                <Icon
                    variant="23"
                    name="searching_icon"
                    layout={{ position: 'absolute', left: 777, width: 15, top: 20, height: 15 }}
                />
            )}
        </Region>
    );
};
