import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `silver_progress_html` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutSilverProgressHtmlItemProps {
    captionSilverProgressHtml?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutSilverProgressHtmlItem = ({ captionSilverProgressHtml, layout }: InventoryTradingLayoutSilverProgressHtmlItemProps) => {
    return (
        <ThemeText
            text={captionSilverProgressHtml ?? '<font color="#AC232A">0</font>/10'}
            name="silver_progress_html"
            layout={{ width: 32, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
