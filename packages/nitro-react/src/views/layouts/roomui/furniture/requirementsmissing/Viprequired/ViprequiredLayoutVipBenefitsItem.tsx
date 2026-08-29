import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `vip_benefits` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutVipBenefitsItemProps {
    captionVipBenefits?: string;
    layout?: BoxLayout;
    onVipBenefits?: () => void;
}

export const ViprequiredLayoutVipBenefitsItem = ({ captionVipBenefits, layout, onVipBenefits }: ViprequiredLayoutVipBenefitsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="vip_benefits"
            layout={{ width: 262, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
            onPointerTap={onVipBenefits}
            cursor="pointer"
        >
            <ThemeText
                text={captionVipBenefits ?? t('viprequired.vip.benefits')}
                textOptions={{ wordWrap: true, wordWrapWidth: 262, align: 'center' }}
            />
        </Region>
    );
};
