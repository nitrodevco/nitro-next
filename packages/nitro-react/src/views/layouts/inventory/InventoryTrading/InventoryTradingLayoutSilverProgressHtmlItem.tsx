import { BoxLayout, Region } from '#base/theme';

/** Row template `silver_progress_html` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutSilverProgressHtmlItemProps {
    captionSilverProgressHtml?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutSilverProgressHtmlItem = ({ captionSilverProgressHtml, layout }: InventoryTradingLayoutSilverProgressHtmlItemProps) => {
    return (
        <Region
            name="silver_progress_html"
            layout={{ width: 32, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionSilverProgressHtml ?? '<font color="#AC232A">0</font>/10'}
        </Region>
    );
};
