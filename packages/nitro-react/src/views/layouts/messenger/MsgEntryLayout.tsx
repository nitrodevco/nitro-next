import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `3102_msg_entry_xml` (layout "tab_entry", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MsgEntryLayoutProps {
    captionAaa?: string;
    layout?: BoxLayout;
}

export const MsgEntryLayout = ({ captionAaa, layout }: MsgEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="aaa"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 193, top: 0, height: 63, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAaa ?? 'Sharing your password or personal details online is dangerous. The moderators might monitor these conversations for your safety.'}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 193 }}
                />
            </Region>
        </Region>
    );
};
