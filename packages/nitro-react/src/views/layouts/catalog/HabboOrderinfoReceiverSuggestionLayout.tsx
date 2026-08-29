import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1571_habbo_orderinfo_receiver_suggestion_xml` (layout "habbo_orderinfo_receiver_suggestion", 150x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboOrderinfoReceiverSuggestionLayoutProps {
    captionName?: string;
    layout?: BoxLayout;
}

export const HabboOrderinfoReceiverSuggestionLayout = ({ captionName, layout }: HabboOrderinfoReceiverSuggestionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 150, height: 17, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 150, top: 0, height: 17, flexDirection: 'column' }}>
                <Region
                    name="name"
                    layout={{ width: 35, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    backgroundColor="#eeeeee"
                >
                    <ThemeText text={captionName ?? 'name'} />
                </Region>
            </Region>
        </Region>
    );
};
