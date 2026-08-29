import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { AvatarEditorContentLayoutAvatarEditor, AvatarEditorContentLayoutAvatarEditorProps } from './AvatarEditorContentLayoutAvatarEditor';

/** Named region `avatarEditorContent` of AvatarEditorContentLayout - configured through the parent's `avatarEditorContent` prop. */
export interface AvatarEditorContentLayoutAvatarEditorContentProps {
    avatarEditor?: AvatarEditorContentLayoutAvatarEditorProps;
    captionAvatarName?: string;
    captionAvatarNameChange?: string;
    layout?: BoxLayout;
    nameBackground?: ReactNode;
    onWardrobe?: () => void;
    sideContainer?: ReactNode;
    srcWardrobeIcon?: string;
    visibleAvatarNameChange?: boolean;
}

export const AvatarEditorContentLayoutAvatarEditorContent = ({ avatarEditor, captionAvatarName, captionAvatarNameChange, layout, nameBackground, onWardrobe, sideContainer, srcWardrobeIcon, visibleAvatarNameChange }: AvatarEditorContentLayoutAvatarEditorContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="avatarEditorContent"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="avatarNameEditor"
                layout={{ position: 'absolute', left: 1, right: 0, top: 0, height: 110, justifyContent: 'center' }}
            >
                <Region
                    name="name_background"
                    backgroundColor="#0e3f52"
                    layout={{ position: 'absolute', left: 0, right: 3, top: 0, bottom: 0 }}
                >
                    {nameBackground}
                </Region>
                <Region
                    name="avatar_name"
                    layout={{ position: 'absolute', marginLeft: -4.5, marginRight: 4.5, width: 400, top: 15, height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionAvatarName ?? t('avatareditor.title')}
                        textStyle="text-style-u-headline-big"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                {(visibleAvatarNameChange ?? false) && (
                    <Region
                        name="avatar_name_change"
                        layout={{ position: 'absolute', left: 170, width: 137, alignSelf: 'center', marginTop: 3, marginBottom: -3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAvatarNameChange ?? t('avatareditor.name.change')}
                            textOptions={{ fill: '#1b79ab' }}
                        />
                    </Region>
                )}
            </Region>
            <Region
                name="wardrobeButtonContainer"
                layout={{ position: 'absolute', right: 11, width: 55, top: 9, height: 30 }}
            >
                <Button
                    variant="3"
                    name="wardrobe"
                    onPointerTap={onWardrobe}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ThemeImage
                    name="wardrobe_icon"
                    src={srcWardrobeIcon ?? layoutImage('avatar_editor_tabs_ae_tabs_wardrobe.png')}
                    layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 30 }}
                />
            </Region>
            <AvatarEditorContentLayoutAvatarEditor {...avatarEditor} />
            <Region
                name="sideContainer"
                layout={{ position: 'absolute', left: 487, width: 0, top: 0, bottom: 0 }}
            >
                {sideContainer}
            </Region>
        </Region>
    );
};
