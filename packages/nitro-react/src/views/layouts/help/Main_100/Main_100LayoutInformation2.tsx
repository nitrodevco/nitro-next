import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Named region `information` of Main_100Layout - configured through the parent's `information` prop. */
export interface Main_100LayoutInformation2Props {
    captionDesc?: string;
    captionTitle?: string;
    layout?: BoxLayout;
}

export const Main_100LayoutInformation2 = ({ captionDesc, captionTitle, layout }: Main_100LayoutInformation2Props) => {
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
                    tintColor="#f1def7"
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
                    tintColor="#f1def7"
                    blend={0.5}
                    layout={{ position: 'absolute', left: -18, width: 20, top: -6, bottom: -5 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, right: 0, bottom: 3, height: 30, flexDirection: 'column', gap: -3 }}>
                <Region
                    name="title"
                    layout={{ width: 90, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTitle ?? t('reward_track.rewards.premium')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 90, align: 'center' }}
                    />
                </Region>
                <Region
                    name="desc"
                    layout={{ width: 90, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionDesc ?? t('reward_track.rewards.premium.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 90, align: 'center' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
