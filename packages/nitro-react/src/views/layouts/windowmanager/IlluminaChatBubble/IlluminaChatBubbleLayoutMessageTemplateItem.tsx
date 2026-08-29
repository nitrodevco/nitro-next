import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `message_template` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutMessageTemplateItemProps {
    captionMessageTemplate?: string;
    layout?: BoxLayout;
}

export const IlluminaChatBubbleLayoutMessageTemplateItem = ({ captionMessageTemplate, layout }: IlluminaChatBubbleLayoutMessageTemplateItemProps) => {
    return (
        <Region
            name="message_template"
            layout={{ width: 207, height: 4, flexShrink: 0, minHeight: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionMessageTemplate ?? ''}
                textOptions={{ wordWrap: true, wordWrapWidth: 207 }}
            />
        </Region>
    );
};
