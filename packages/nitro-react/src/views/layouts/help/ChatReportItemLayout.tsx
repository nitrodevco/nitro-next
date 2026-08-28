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
                params={147473}
                layout={{ position: 'absolute', left: 0, width: 307, top: 64, height: 24 }}
            >
                <Region
                    name="text"
                    params={3088}
                    layout={{ position: 'absolute', left: 0, width: 307, alignSelf: 'center', height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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
