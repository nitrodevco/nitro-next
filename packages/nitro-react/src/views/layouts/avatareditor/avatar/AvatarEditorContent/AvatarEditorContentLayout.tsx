import { BoxLayout, Region } from '#base/theme';

import { AvatarEditorContentLayoutAvatarEditorContent, AvatarEditorContentLayoutAvatarEditorContentProps } from './AvatarEditorContentLayoutAvatarEditorContent';

/** Generated from `3113_AvatarEditorContent_xml` (layout "avatarEditorContent", 490x490) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarEditorContentLayoutProps {
    avatarEditorContent?: AvatarEditorContentLayoutAvatarEditorContentProps;
    layout?: BoxLayout;
}

export const AvatarEditorContentLayout = ({ avatarEditorContent, layout }: AvatarEditorContentLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 490, height: 490, ...layout }}>
            <AvatarEditorContentLayoutAvatarEditorContent {...avatarEditorContent} />
        </Region>
    );
};
