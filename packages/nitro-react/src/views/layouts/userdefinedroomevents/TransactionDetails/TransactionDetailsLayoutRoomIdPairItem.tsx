import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `room_id_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutRoomIdPairItemProps {
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutRoomIdPairItem = ({ layout }: TransactionDetailsLayoutRoomIdPairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_id_pair"
            layout={{ width: 61, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            <ThemeText
                text={t('wiredchests.log_details.room_id')}
                layout={{ width: 51, height: 17, flexShrink: 0 }}
            />
            <ThemeText
                text="-"
                layout={{ width: 8, height: 17, flexShrink: 0 }}
            />
        </Region>
    );
};
