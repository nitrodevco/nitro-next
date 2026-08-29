import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `club_info` of MemenuDanceLayout - pass real rows through its `items…` slot. */
export interface MemenuDanceLayoutClubInfoItemProps {
    captionClubInfo?: string;
    layout?: BoxLayout;
}

export const MemenuDanceLayoutClubInfoItem = ({ captionClubInfo, layout }: MemenuDanceLayoutClubInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="club_info"
            layout={{ width: 145, height: 50, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionClubInfo ?? t('widget.memenu.dance.clubinfo')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 145 }}
            />
        </Region>
    );
};
