import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region } from '#base/theme';

import { VaultViewLayoutScrollingEarningsList, VaultViewLayoutScrollingEarningsListProps } from './VaultViewLayoutScrollingEarningsList';

/** Named region `earningsContentArea` of VaultViewLayout - configured through the parent's `earningsContentArea` prop. */
export interface VaultViewLayoutEarningsContentAreaProps {
    layout?: BoxLayout;
    onClaimAllBtn?: () => void;
    scrollingEarningsList?: VaultViewLayoutScrollingEarningsListProps;
}

export const VaultViewLayoutEarningsContentArea = ({ layout, onClaimAllBtn, scrollingEarningsList }: VaultViewLayoutEarningsContentAreaProps) => {
    const t = useTranslation();

    return (
        <Region
            name="earningsContentArea"
            layout={{ position: 'absolute', left: 1, width: 404, top: 0, bottom: 45, justifyContent: 'center', ...layout }}
        >
            <VaultViewLayoutScrollingEarningsList {...scrollingEarningsList} />
            <ButtonThick
                variant="3"
                name="claim_all_btn"
                onPointerTap={onClaimAllBtn}
                layout={{ position: 'absolute', marginLeft: -9.5, marginRight: 9.5, width: 73, bottom: 4, height: 30 }}
            >
                {t('earning.claim_all')}
            </ButtonThick>
        </Region>
    );
};
