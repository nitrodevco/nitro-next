import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2259_unseen_item_counter_xml` (layout "new_items_counter", 29x18) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UnseenItemCounterLayoutProps {
    captionCount?: string;
    layout?: BoxLayout;
}

export const UnseenItemCounterLayout = ({ captionCount, layout }: UnseenItemCounterLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 29, height: 18, ...layout }}>
            <Border
                variant="7"
                name="unseen_item_container"
                tintColor="#ee2924"
                layout={{ position: 'absolute', right: -3, width: 29, top: 0, bottom: 0 }}
            >
                <ThemeText
                    text={captionCount ?? '999'}
                    textStyle="text-style-il-regular-white"
                    name="count"
                    layout={{ position: 'absolute', left: 4, top: 0, bottom: 2 }}
                />
            </Border>
        </Region>
    );
};
