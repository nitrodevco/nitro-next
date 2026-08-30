import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `indicator_wrapper` of RecyclerWidgetLayout - configured through the parent's `indicatorWrapper` prop. */
export interface RecyclerWidgetLayoutIndicatorWrapperProps {
    layout?: BoxLayout;
    onAbortRegion?: () => void;
    srcIndicator?: string;
    srcPointerArrow?: string;
    srcPointerBase?: string;
    visibleAbortRegion?: boolean;
}

export const RecyclerWidgetLayoutIndicatorWrapper = ({ layout, onAbortRegion, srcIndicator, srcPointerArrow, srcPointerBase, visibleAbortRegion }: RecyclerWidgetLayoutIndicatorWrapperProps) => {
    const t = useTranslation();

    return (
        <Region
            name="indicator_wrapper"
            layout={{ position: 'absolute', left: 214, right: 23, bottom: 8, height: 115, minWidth: 123, maxWidth: 123, minHeight: 115, maxHeight: 115, ...layout }}
        >
            <Region
                name="layout"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    src={layoutImage('recycler_furnimatic_container_left.png')}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 115 }}
                />
                <ThemeImage
                    src={layoutImage('recycler_furnimatic_container_slice.png')}
                    layout={{ position: 'absolute', left: 15, right: 12, top: 0, height: 115 }}
                />
                <ThemeImage
                    src={layoutImage('recycler_furnimatic_container_right.png')}
                    layout={{ position: 'absolute', right: 0, width: 13, top: 0, height: 115 }}
                />
            </Region>
            <Region
                name="indicator"
                layout={{ position: 'absolute', left: 1, width: 123, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="indicator"
                    src={srcIndicator ?? layoutImage('recycler_furnimatic_indicator.png')}
                    layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 115 }}
                />
                <Region
                    name="indicator_pointer"
                    layout={{ position: 'absolute', left: 37, width: 50, top: 43, height: 50 }}
                >
                    <ThemeImage
                        name="pointer_arrow"
                        src={srcPointerArrow ?? layoutImage('recycler_furnimatic_indicator_pointer_arrow.png')}
                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                    />
                    <ThemeImage
                        name="pointer_base"
                        src={srcPointerBase ?? layoutImage('recycler_furnimatic_indicator_pointer_base.png')}
                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                    />
                </Region>
                {(visibleAbortRegion ?? false) && (
                    <Region
                        name="abort_region"
                        onPointerTap={onAbortRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', width: 65, top: 91, height: 17, minHeight: 17, maxHeight: 17 }}
                    >
                        <ThemeText
                            text={t('catalog.recycler.button.abort')}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 15 }}
                        />
                    </Region>
                )}
            </Region>
        </Region>
    );
};
