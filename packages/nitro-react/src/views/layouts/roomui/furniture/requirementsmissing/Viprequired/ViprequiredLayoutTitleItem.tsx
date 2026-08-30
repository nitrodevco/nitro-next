import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `title` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const ViprequiredLayoutTitleItem = ({ captionTitle, layout }: ViprequiredLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionTitle ?? t('viprequired.title')}
            textStyle="text-style-il-heading-1"
            textOptions={{ fill: '#c30000' }}
            name="title"
            layout={{ width: 114, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
