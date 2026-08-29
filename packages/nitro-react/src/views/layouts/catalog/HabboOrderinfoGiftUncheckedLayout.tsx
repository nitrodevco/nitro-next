import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region } from '#base/theme';

/** Generated from `1593_habbo_orderinfo_gift_unchecked_xml` (layout "habbo_orderinfo_dialog", 280x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboOrderinfoGiftUncheckedLayoutProps {
    checkBoxContainer?: HabboOrderinfoGiftUncheckedLayoutCheckBoxContainerProps;
    layout?: BoxLayout;
}

export const HabboOrderinfoGiftUncheckedLayout = ({ checkBoxContainer, layout }: HabboOrderinfoGiftUncheckedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 280, height: 25, ...layout }}>
            <HabboOrderinfoGiftUncheckedLayoutCheckBoxContainer {...checkBoxContainer} />
        </Region>
    );
};

/** Named region `checkBoxContainer` of HabboOrderinfoGiftUncheckedLayout - configured through the parent's `checkBoxContainer` prop. */
export interface HabboOrderinfoGiftUncheckedLayoutCheckBoxContainerProps {
    layout?: BoxLayout;
    onBuyAsGift?: () => void;
    tags?: string[];
}

export const HabboOrderinfoGiftUncheckedLayoutCheckBoxContainer = ({ layout, onBuyAsGift, tags }: HabboOrderinfoGiftUncheckedLayoutCheckBoxContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="checkBoxContainer"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 280, top: 80, height: 25, ...layout }}
        >
            <CheckBox
                variant="101"
                name="buyAsGift"
                onPointerTap={onBuyAsGift}
                layout={{ position: 'absolute', left: 21, width: 160, top: 0, height: 21, minHeight: 21, maxHeight: 21 }}
            >
                {t('shopping_asagift')}
            </CheckBox>
        </Region>
    );
};
