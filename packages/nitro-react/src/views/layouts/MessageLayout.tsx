import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `71_message_xml` (layout "message", 121x37) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessageLayoutProps {
    layout?: BoxLayout;
}

export const MessageLayout = ({ layout }: MessageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 121, height: 37, ...layout }}>
            <Region
                name="message"
                tags={[ 'notification' ]}
                params={144}
                backgroundColor="#4c5832"
                layout={{ position: 'absolute', left: 0, width: 121, top: 0, height: 37 }}
            >
                <Region
                    name="items"
                    params={8388752}
                    layout={{ position: 'absolute', left: 0, width: 121, top: 0, height: 31, flexDirection: 'column', gap: -1 }}
                >
                    <Region
                        name="title"
                        params={16}
                        layout={{ width: 120, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Title"
                            textStyle="text-style-u-italic"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 120 }}
                        />
                    </Region>
                    <Region
                        name="message"
                        params={8388624}
                        layout={{ width: 121, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Message"
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 121 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
