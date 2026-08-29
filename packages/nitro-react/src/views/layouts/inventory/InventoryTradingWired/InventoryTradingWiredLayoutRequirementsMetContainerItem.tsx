import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `requirements_met_container` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutRequirementsMetContainerItemProps {
    captionReqMetText?: string;
    layout?: BoxLayout;
    srcReqMetIcon?: string;
    visibleReqMetIcon?: boolean;
    visibleReqMetText?: boolean;
}

export const InventoryTradingWiredLayoutRequirementsMetContainerItem = ({ captionReqMetText, layout, srcReqMetIcon, visibleReqMetIcon, visibleReqMetText }: InventoryTradingWiredLayoutRequirementsMetContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="requirements_met_container"
            backgroundColor="#d9d9d9"
            layout={{ width: 390, height: 30, flexShrink: 0, minWidth: 220, ...layout }}
        >
            {(visibleReqMetText ?? true) && (
                <Region
                    name="req_met_text"
                    layout={{ position: 'absolute', left: 5, right: 43, top: 7, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionReqMetText ?? t('inventory.wired_trading.requirements.indicator.met')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 342 }}
                    />
                </Region>
            )}
            {(visibleReqMetIcon ?? true) && (
                <ThemeImage
                    name="req_met_icon"
                    src={srcReqMetIcon ?? layoutImage('common_cross_mark.png')}
                    layout={{ position: 'absolute', right: 1, width: 30, top: 0, height: 30 }}
                />
            )}
        </Region>
    );
};
