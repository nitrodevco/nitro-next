import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `reward_vip_template` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutRewardVipTemplateItemProps {
    captionVipLength?: string;
    layout?: BoxLayout;
    visibleVipLength?: boolean;
}

export const LevelUpLayoutRewardVipTemplateItem = ({ captionVipLength, layout, visibleVipLength }: LevelUpLayoutRewardVipTemplateItemProps) => {
    return (
        <Region
            name="reward_vip_template"
            layout={{ width: 93, height: 33, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('talent_vip_reward.png')}
                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 33 }}
            />
            {(visibleVipLength ?? true) && (
                <Region
                    name="vip_length"
                    layout={{ position: 'absolute', left: 37, width: 56, alignSelf: 'center', height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionVipLength ?? 'x 10 days'}
                        textStyle="text-style-il-heading-2"
                        textOptions={{ fill: '#222222' }}
                    />
                </Region>
            )}
        </Region>
    );
};
