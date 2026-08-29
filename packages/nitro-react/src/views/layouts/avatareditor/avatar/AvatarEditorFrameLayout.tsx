import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

/** Generated from `3114_AvatarEditorFrame_xml` (layout "memenu_clothes", 210x155) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarEditorFrameLayoutProps {
    layout?: BoxLayout;
    maincontent?: ReactNode;
    onClose?: () => void;
}

export const AvatarEditorFrameLayout = ({ layout, maincontent, onClose }: AvatarEditorFrameLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="clothes_frame"
            name="clothes_frame"
            caption={t('avatareditor.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 210, height: 155, ...layout }}
        >
            <Region
                name="maincontent"
                layout={{ position: 'absolute', left: 0, right: 0, top: 33, bottom: 2 }}
            >
                {maincontent}
            </Region>
        </Frame>
    );
};
