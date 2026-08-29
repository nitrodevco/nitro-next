import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

/** Generated from `3114_AvatarEditorFrame_xml` (layout "memenu_clothes", 210x155) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarEditorFrameLayoutProps {
    layout?: BoxLayout;
    maincontent?: AvatarEditorFrameLayoutMaincontentProps;
    onClose?: () => void;
}

export const AvatarEditorFrameLayout = ({ layout, maincontent, onClose }: AvatarEditorFrameLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="clothes_frame"
            name="clothes_frame"
            params={163873}
            caption={t('avatareditor.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 210, height: 155, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <AvatarEditorFrameLayoutMaincontent {...maincontent} />
            </Region>
        </Frame>
    );
};

/** Named region `maincontent` of AvatarEditorFrameLayout - configured through the parent's `maincontent` prop. */
export interface AvatarEditorFrameLayoutMaincontentProps {
    layout?: BoxLayout;
}

export const AvatarEditorFrameLayoutMaincontent = ({ layout }: AvatarEditorFrameLayoutMaincontentProps) => {
    return (
        <Region
            name="maincontent"
            params={12716176}
            layout={{ position: 'absolute', left: 0, right: 0, top: 33, bottom: 2, ...layout }}
        />
    );
};
