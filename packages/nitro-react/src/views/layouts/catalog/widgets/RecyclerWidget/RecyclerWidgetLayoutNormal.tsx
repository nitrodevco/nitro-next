import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Icon, Region, ThemeText } from '#base/theme';

import { RecyclerWidgetLayoutIndicatorWrapper, RecyclerWidgetLayoutIndicatorWrapperProps } from './RecyclerWidgetLayoutIndicatorWrapper';
import { RecyclerWidgetLayoutSlotsWrapper, RecyclerWidgetLayoutSlotsWrapperProps } from './RecyclerWidgetLayoutSlotsWrapper';

/** Named region `normal` of RecyclerWidgetLayout - configured through the parent's `normal` prop. */
export interface RecyclerWidgetLayoutNormalProps {
    captionDucketCost?: string;
    indicatorWrapper?: RecyclerWidgetLayoutIndicatorWrapperProps;
    layout?: BoxLayout;
    onRecyclerRecycle?: () => void;
    slotsWrapper?: RecyclerWidgetLayoutSlotsWrapperProps;
    spacer?: ReactNode;
    spacer2?: ReactNode;
    visibleSpacer?: boolean;
}

export const RecyclerWidgetLayoutNormal = ({ captionDucketCost, indicatorWrapper, layout, onRecyclerRecycle, slotsWrapper, spacer, spacer2, visibleSpacer }: RecyclerWidgetLayoutNormalProps) => {
    const t = useTranslation();

    return (
        <Region
            name="normal"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', marginLeft: -140, marginRight: 140, width: 42, top: 7, height: 30, flexDirection: 'row' }}>
                <ThemeText
                    text={captionDucketCost ?? '50'}
                    name="ducket_cost"
                    layout={{ width: 17, height: 17, flexShrink: 0 }}
                />
                <Region
                    name="spacer"
                    layout={{ width: 2, height: 30, flexShrink: 0 }}
                >
                    {spacer}
                </Region>
                <Icon
                    variant="32"
                    name="ducket_icon"
                    layout={{ width: 23, height: 21, flexShrink: 0 }}
                />
                {(visibleSpacer ?? false) && (
                    <Region
                        name="spacer"
                        layout={{ width: 10, height: 30, flexShrink: 0 }}
                    >
                        {spacer2}
                    </Region>
                )}
            </Region>
            <Button
                variant="6"
                name="recycler_recycle"
                tintColor="#00aa00"
                onPointerTap={onRecyclerRecycle}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 19, width: 194, top: 41, height: 30 }}
            >
                {t('catalog.recycler.button.recycle')}
            </Button>
            <RecyclerWidgetLayoutSlotsWrapper {...slotsWrapper} />
            <RecyclerWidgetLayoutIndicatorWrapper {...indicatorWrapper} />
        </Region>
    );
};
