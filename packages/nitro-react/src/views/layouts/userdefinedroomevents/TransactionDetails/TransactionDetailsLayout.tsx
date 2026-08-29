import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { TransactionDetailsLayoutKeyValuePairs, TransactionDetailsLayoutKeyValuePairsProps } from './TransactionDetailsLayoutKeyValuePairs';

/** Generated from `1175_transaction_details_xml` (layout "transaction_details", 400x394) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TransactionDetailsLayoutProps {
    keyValuePairs?: TransactionDetailsLayoutKeyValuePairsProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const TransactionDetailsLayout = ({ keyValuePairs, layout, onClose }: TransactionDetailsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('wiredchests.log_details.title')}
            tintColor="#418db0"
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 400, height: 394, minWidth: 400, maxWidth: 400, minHeight: 394, ...layout }}
        >
            <TransactionDetailsLayoutKeyValuePairs {...keyValuePairs} />
        </Frame>
    );
};
