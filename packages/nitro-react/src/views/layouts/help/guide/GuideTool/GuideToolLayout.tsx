import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { GuideToolLayoutList, GuideToolLayoutListProps } from './GuideToolLayoutList';

/** Generated from `2926_guide_tool_xml` (layout "guide_tool_threeway", 242x306) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuideToolLayoutProps {
    layout?: BoxLayout;
    list?: GuideToolLayoutListProps;
    onClose?: () => void;
}

export const GuideToolLayout = ({ layout, list, onClose }: GuideToolLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guide_tool"
            name="guide_tool"
            caption={t('guide.help.guide.tool.title')}
            onClose={onClose}
            layout={{ width: 242, height: 306, ...layout }}
        >
            <GuideToolLayoutList {...list} />
        </Frame>
    );
};
