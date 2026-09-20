/**
 * `addons/variablefx/§_-t1W§.buildInputs` - the Variable FX view with the levelling progress's top
 * info section (`createTopInfoPreset`: a usage info section with
 * `wiredfurni.params.variablefx.levelling_progress.info`).
 */
import { VariableFxForm, WiredElementView } from '#base/wired';

import { WiredUsageInfoSection } from '../../../kit/WiredUsageInfoSection';
import { VariableFxView } from './VariableFxView';

export const VariableFxLevellingProgressView: WiredElementView<VariableFxForm> = props => (
    <VariableFxView
        {...props}
        topInfo={<WiredUsageInfoSection text="${wiredfurni.params.variablefx.levelling_progress.info}" />}
    />
);
