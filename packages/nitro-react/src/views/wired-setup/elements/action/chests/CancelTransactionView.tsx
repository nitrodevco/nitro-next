/**
 * `actiontypes/chests/§_-P2m§.buildInputs` (CANCEL_TRANSACTION) - the usage info, then the match
 * criteria radio. Flash's `onChangeCancelMode` refreshes the furni selection; here
 * `isInputSourceDisabled` reads the form and the dialog follows by itself.
 */
import { CancelTransactionActionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../../kit/WiredRadioGroup';
import { WiredSection } from '../../../kit/WiredSection';
import { WiredUsageInfoSection } from '../../../kit/WiredUsageInfoSection';

export const CancelTransactionView: WiredElementView<CancelTransactionActionForm> = ({ form, setForm }) => (
    <>
        <WiredUsageInfoSection text="${wiredfurni.params.cancel_transaction.usage_info}" />
        <WiredSection title="${wiredfurni.params.cancel_transaction.match_criteria}">
            <WiredRadioGroup
                options={[ { id: 0, label: '${wiredfurni.params.cancel_transaction.match_criteria.0}' }, { id: 1, label: '${wiredfurni.params.cancel_transaction.match_criteria.1}' } ]}
                selected={form.matchCriteria}
                onSelect={matchCriteria => setForm({ matchCriteria })}
            />
        </WiredSection>
    </>
);
