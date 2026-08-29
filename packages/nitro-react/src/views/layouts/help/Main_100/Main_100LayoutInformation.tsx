import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `information` of Main_100Layout - configured through the parent's `information` prop. */
export interface Main_100LayoutInformationProps {
    captionDesc?: string;
    captionTitle?: string;
    layout?: BoxLayout;
}

export const Main_100LayoutInformation = ({ captionDesc, captionTitle, layout }: Main_100LayoutInformationProps) => {
    const t = useTranslation();

    return (
        <Region
            name="information"
            layout={{ position: 'absolute', left: 0, width: 100, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="cut"
                layout={{ position: 'absolute', left: 0, right: 2, top: 0, bottom: 0 }}
            >
                <Border
                    variant="15"
                    name="free_tier_cont"
                    tintColor="#f9efe0"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 0, right: -5, top: 0, bottom: 0 }}
                />
            </Region>
            <Region
                name="splitter"
                layout={{ position: 'absolute', right: 0, width: 2, top: 0, bottom: 0 }}
            >
                <Border
                    variant="15"
                    name="bg"
                    tintColor="#f9efe0"
                    blend={0.5}
                    layout={{ position: 'absolute', left: -18, width: 20, top: -6, bottom: -5 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, right: 0, bottom: 2, height: 21, flexDirection: 'column' }}>
                <Region
                    name="title"
                    layout={{ width: 90, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTitle ?? t('reward_track.rewards.free')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 90, align: 'center' }}
                    />
                </Region>
                <Region
                    name="desc"
                    layout={{ width: 90, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionDesc ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 90, align: 'center' }}
                    />
                </Region>
            </Region>
            <ThemeImage
                src={layoutImage('reward_track_free_track.png')}
                layout={{ position: 'absolute', left: 26, width: 49, top: 9, height: 48 }}
            />
        </Region>
    );
};
