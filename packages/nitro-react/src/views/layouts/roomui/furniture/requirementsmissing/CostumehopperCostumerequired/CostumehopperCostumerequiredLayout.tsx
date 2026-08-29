import { useTranslation } from '#base/context';
import { BoxLayout, Frame, ThemeImage } from '#base/theme';

import { CostumehopperCostumerequiredLayoutList, CostumehopperCostumerequiredLayoutListProps } from './CostumehopperCostumerequiredLayoutList';

/** Generated from `859_costumehopper_costumerequired_xml` (layout "costumehopper_costumerequired", 310x149) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CostumehopperCostumerequiredLayoutProps {
    layout?: BoxLayout;
    list?: CostumehopperCostumerequiredLayoutListProps;
    onClose?: () => void;
    srcIllustration?: string;
}

export const CostumehopperCostumerequiredLayout = ({ layout, list, onClose, srcIllustration }: CostumehopperCostumerequiredLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('costumehopper.costumerequired.header')}
            onClose={onClose}
            layout={{ width: 310, height: 149, ...layout }}
        >
            <ThemeImage
                name="illustration"
                src={srcIllustration}
                layout={{ position: 'absolute', left: 10, width: 1, top: 0, height: 1 }}
            />
            <CostumehopperCostumerequiredLayoutList {...list} />
        </Frame>
    );
};
