import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

import { AvatarEditorContentLayoutPaletteTemplateItem } from './AvatarEditorContentLayoutPaletteTemplateItem';
import { AvatarEditorContentLayoutThumbTemplateItem } from './AvatarEditorContentLayoutThumbTemplateItem';

/** Named region `grid_container` of AvatarEditorContentLayout - configured through the parent's `gridContainer` prop. */
export interface AvatarEditorContentLayoutGridContainerProps {
    captionContentNotification?: string;
    captionContentTitle?: string;
    itemsPalette0?: ReactNode;
    itemsPalette1?: ReactNode;
    itemsThumbs?: ReactNode;
    layout?: BoxLayout;
}

export const AvatarEditorContentLayoutGridContainer = ({ captionContentNotification, captionContentTitle, itemsPalette0, itemsPalette1, itemsThumbs, layout }: AvatarEditorContentLayoutGridContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="grid_container"
            layout={{ position: 'absolute', left: 20, width: 330, top: 94, height: 302, ...layout }}
        >
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 200 }}
            >
                <Region
                    name="thumbs"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
                >
                    {itemsThumbs ?? (
                        <AvatarEditorContentLayoutThumbTemplateItem />
                    )}
                </Region>
            </ScrollArea>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, width: 165, bottom: -1, height: 93 }}
            >
                <Region
                    name="palette0"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
                >
                    {itemsPalette0 ?? (
                        <AvatarEditorContentLayoutPaletteTemplateItem />
                    )}
                </Region>
            </ScrollArea>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', right: 0, width: 165, bottom: -1, height: 93 }}
            >
                <Region
                    name="palette1"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
                >
                    {itemsPalette1}
                </Region>
            </ScrollArea>
            <Region
                name="content_notification"
                layout={{ position: 'absolute', left: 0, width: 298, top: 30, height: 128, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionContentNotification ?? t('avatar.editor.content.notification')}
            </Region>
            <Region
                name="content_title"
                layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionContentTitle ?? t('avatar.editor.content.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
        </Region>
    );
};
