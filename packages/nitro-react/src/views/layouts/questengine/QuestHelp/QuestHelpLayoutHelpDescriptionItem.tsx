import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `help.description` of QuestHelpLayout - pass real rows through its `items…` slot. */
export interface QuestHelpLayoutHelpDescriptionItemProps {
    captionHelpDescription?: string;
    layout?: BoxLayout;
}

export const QuestHelpLayoutHelpDescriptionItem = ({ captionHelpDescription, layout }: QuestHelpLayoutHelpDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="help.description"
            layout={{ width: 208, height: 330, flexShrink: 0, minHeight: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHelpDescription ?? t('quest.help.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 208 }}
            />
        </Region>
    );
};
