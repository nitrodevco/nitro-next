import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { DailytasksLayoutMainCont, DailytasksLayoutMainContProps } from './DailytasksLayoutMainCont';

/** Generated from `126_dailytasks_xml` (layout "dailytasks", 428x553) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DailytasksLayoutProps {
    layout?: BoxLayout;
    mainCont?: DailytasksLayoutMainContProps;
    onClose?: () => void;
}

export const DailytasksLayout = ({ layout, mainCont, onClose }: DailytasksLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="dailytasks_frame"
            name="dailytasks_frame"
            caption={t('dailytasks.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 428, height: 553, ...layout }}
        >
            <DailytasksLayoutMainCont {...mainCont} />
        </Frame>
    );
};
