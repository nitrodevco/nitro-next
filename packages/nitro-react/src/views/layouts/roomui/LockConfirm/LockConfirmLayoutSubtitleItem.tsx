import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `subtitle` of LockConfirmLayout - pass real rows through its `items…` slot. */
export interface LockConfirmLayoutSubtitleItemProps {
    captionSubtitle?: string;
    layout?: BoxLayout;
}

export const LockConfirmLayoutSubtitleItem = ({ captionSubtitle, layout }: LockConfirmLayoutSubtitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="subtitle"
            layout={{ width: 249, height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSubtitle ?? t('friend.furniture.confirm.lock.subtitle')}
                textStyle="text-style-il-heading-1"
                textOptions={{ wordWrap: true, wordWrapWidth: 249, align: 'center' }}
            />
        </Region>
    );
};
