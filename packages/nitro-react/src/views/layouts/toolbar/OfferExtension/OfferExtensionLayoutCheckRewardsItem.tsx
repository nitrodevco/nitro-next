import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `check_rewards` of OfferExtensionLayout - pass real rows through its `items…` slot. */
export interface OfferExtensionLayoutCheckRewardsItemProps {
    layout?: BoxLayout;
    onCheckRewards?: () => void;
    visibleCheckRewards?: boolean;
}

export const OfferExtensionLayoutCheckRewardsItem = ({ layout, onCheckRewards, visibleCheckRewards }: OfferExtensionLayoutCheckRewardsItemProps) => {
    const t = useTranslation();

    return (
        (visibleCheckRewards ?? false) && (
            <Region
                name="check_rewards"
                onPointerTap={onCheckRewards}
                cursor="pointer"
                layout={{ width: 180, height: 19, flexShrink: 0, justifyContent: 'center', ...layout }}
            >
                <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 167, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('offers.extension.check_rewards')}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
            </Region>
        )
    );
};
