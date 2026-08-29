import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

/** Generated from `120_QuestDetails_xml` (layout "Quest", 481x182) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestDetailsLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const QuestDetailsLayout = ({ layout, onClose }: QuestDetailsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('quests.details.caption')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 493, height: 253, ...layout }}
        />
    );
};
