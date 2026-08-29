import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `expiration_text` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutExpirationTextItemProps {
    captionExpirationText?: string;
    layout?: BoxLayout;
}

export const SongdiskViewLayoutExpirationTextItem = ({ captionExpirationText, layout }: SongdiskViewLayoutExpirationTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="expiration_text"
            layout={{ width: 170, height: 23, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionExpirationText ?? t('infostand.rent.expiration')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};
