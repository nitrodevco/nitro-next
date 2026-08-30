import { Border, BoxLayout, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `reward_vip` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutRewardVipItemProps {
    captionVipLength?: string;
    layout?: BoxLayout;
    visibleVipLength?: boolean;
}

export const TalentTrackLayoutRewardVipItem = ({ captionVipLength, layout, visibleVipLength }: TalentTrackLayoutRewardVipItemProps) => {
    return (
        <Border
            variant="104"
            name="reward_vip"
            blend={0.3}
            layout={{ width: 69, height: 60, flexShrink: 0, minHeight: 60, maxHeight: 60, ...layout }}
        >
            <ThemeImage
                src={layoutImage('talent_vip_reward.png')}
                layout={{ position: 'absolute', left: 14, width: 33, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 33 }}
            />
            {(visibleVipLength ?? true) && (
                <ThemeText
                    text={captionVipLength ?? ''}
                    textStyle="text-style-il-regular-white"
                    name="vip_length"
                    layout={{ position: 'absolute', left: 53, width: 16, alignSelf: 'center', height: 4 }}
                />
            )}
        </Border>
    );
};
