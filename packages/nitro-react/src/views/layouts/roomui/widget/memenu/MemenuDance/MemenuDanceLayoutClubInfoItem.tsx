import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `club_info` of MemenuDanceLayout - pass real rows through its `items…` slot. */
export interface MemenuDanceLayoutClubInfoItemProps {
    captionClubInfo?: string;
    layout?: BoxLayout;
}

export const MemenuDanceLayoutClubInfoItem = ({ captionClubInfo, layout }: MemenuDanceLayoutClubInfoItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionClubInfo ?? t('widget.memenu.dance.clubinfo')}
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 145 }}
            name="club_info"
            verticalAlign="top"
            layout={{ width: 145, height: 50, flexShrink: 0, ...layout }}
        />
    );
};
