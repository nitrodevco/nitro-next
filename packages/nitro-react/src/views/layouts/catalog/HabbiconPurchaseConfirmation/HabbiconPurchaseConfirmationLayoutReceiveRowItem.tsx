import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `receive_row` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutReceiveRowItemProps {
    captionReceiveText?: string;
    layout?: BoxLayout;
    visibleReceiveText?: boolean;
}

export const HabbiconPurchaseConfirmationLayoutReceiveRowItem = ({ captionReceiveText, layout, visibleReceiveText }: HabbiconPurchaseConfirmationLayoutReceiveRowItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="0"
            name="receive_row"
            tintColor="#f0e8cf"
            layout={{ width: 197, height: 28, flexShrink: 0, ...layout }}
        >
            {(visibleReceiveText ?? true) && (
                <Region
                    name="receive_text"
                    layout={{ position: 'absolute', left: 8, width: 246, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionReceiveText ?? t('habbicon_purchase.confirm.habbicon.progress')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            )}
        </Border>
    );
};
