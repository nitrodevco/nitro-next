import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2586_list_tester_item_xml` (layout "list_tester_item", 370x41) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ListTesterItemLayoutProps {
    captionChatterTxt?: string;
    captionMsgTxt?: string;
    captionTimeTxt?: string;
    layout?: BoxLayout;
}

export const ListTesterItemLayout = ({ captionChatterTxt, captionMsgTxt, captionTimeTxt, layout }: ListTesterItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 370, height: 41, ...layout }}>
            <Region
                name="chatline"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeText
                    text={captionTimeTxt ?? '18:30'}
                    textOptions={{ fill: '#000000' }}
                    name="time_txt"
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 13 }}
                />
                <ThemeText
                    text={captionChatterTxt ?? 'kurmasana'}
                    textOptions={{ fill: '#000000' }}
                    name="chatter_txt"
                    layout={{ position: 'absolute', left: 30, width: 110, top: 0, height: 13 }}
                />
                <ThemeText
                    text={captionMsgTxt ?? 'Sharing your password or personal details online is dangerous. The moderators might monitor these conversations for your safety.'}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 230 }}
                    name="msg_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 140, width: 230, top: 0, height: 63 }}
                />
            </Region>
        </Region>
    );
};
