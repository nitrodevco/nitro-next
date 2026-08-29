import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2884_chat_report_item_xml` (layout "chat_report_item", 307x24) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatReportItemLayoutProps {
    captionText?: string;
    layout?: BoxLayout;
}

export const ChatReportItemLayout = ({ captionText, layout }: ChatReportItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 307, height: 24, ...layout }}>
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 0, right: 0, top: 64, height: 24 }}
            >
                <Region
                    name="text"
                    layout={{ position: 'absolute', left: 0, right: 0, alignSelf: 'center', height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionText ?? 'foo faa fee'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 307 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
