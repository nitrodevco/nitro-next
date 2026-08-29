import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `begin_helper` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutBeginHelperItemProps {
    layout?: BoxLayout;
    onCitizenshipButton?: () => void;
    visibleCitizenshipButton?: boolean;
}

export const TalentTrackLayoutBeginHelperItem = ({ layout, onCitizenshipButton, visibleCitizenshipButton }: TalentTrackLayoutBeginHelperItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="begin_helper"
            layout={{ width: 250, height: 280, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 20, width: 311, top: 20, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('talent.track.helper.guide.begin.title')}
                    textStyle="text-style-il-heading-title"
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 20, width: 230, top: 49, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('talent.track.helper.guide.begin.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 230 }}
                />
            </Region>
            <ThemeImage
                src={layoutImage('talent_citizenship_accomplished.png')}
                layout={{ position: 'absolute', left: 203, width: 32, top: 182, height: 46 }}
            />
            <Region layout={{ position: 'absolute', left: 124, width: 76, alignSelf: 'center', marginTop: 44.5, marginBottom: -44.5, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                <ThemeText
                    text={t('talent.track.helper.begin.citizenship')}
                    textStyle="text-style-il-button"
                    textOptions={{ fill: '#333333', wordWrap: true, wordWrapWidth: 76, align: 'right' }}
                />
            </Region>
            {(visibleCitizenshipButton ?? true) && (
                <Button
                    variant="100"
                    name="citizenship_button"
                    onPointerTap={onCitizenshipButton}
                    layout={{ position: 'absolute', right: -4, width: 200, top: 227, height: 43 }}
                >
                    {t('talent.track.citizenship.button')}
                </Button>
            )}
        </Region>
    );
};
