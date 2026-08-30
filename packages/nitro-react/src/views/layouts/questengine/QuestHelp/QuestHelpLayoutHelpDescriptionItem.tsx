import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `help.description` of QuestHelpLayout - pass real rows through its `items…` slot. */
export interface QuestHelpLayoutHelpDescriptionItemProps {
    captionHelpDescription?: string;
    layout?: BoxLayout;
}

export const QuestHelpLayoutHelpDescriptionItem = ({ captionHelpDescription, layout }: QuestHelpLayoutHelpDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionHelpDescription ?? t('quest.help.description')}
            textOptions={{ wordWrap: true, wordWrapWidth: 208 }}
            name="help.description"
            verticalAlign="top"
            layout={{ width: 208, height: 330, flexShrink: 0, minHeight: 50, ...layout }}
        />
    );
};
