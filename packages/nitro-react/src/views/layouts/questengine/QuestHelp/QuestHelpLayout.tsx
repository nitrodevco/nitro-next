import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { QuestHelpLayoutHelpDescriptionItem } from './QuestHelpLayoutHelpDescriptionItem';

/** Generated from `125_QuestHelp_xml` (layout "QuestEngine", 208x365) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestHelpLayoutProps {
    captionHelpHeaderShort?: string;
    captionHelpHeaderTitle?: string;
    itemsHelpContentItemlist?: ReactNode;
    layout?: BoxLayout;
    onHelpContainer?: () => void;
    srcHelpHeaderImg?: string;
    tintHelpHeaderImg?: string;
}

export const QuestHelpLayout = ({ captionHelpHeaderShort, captionHelpHeaderTitle, itemsHelpContentItemlist, layout, onHelpContainer, srcHelpHeaderImg, tintHelpHeaderImg }: QuestHelpLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 208, height: 365, ...layout }}>
            <Region
                name="help.container"
                onPointerTap={onHelpContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="help.header"
                    backgroundColor="#e0e0e0"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 27 }}
                >
                    <ThemeImage
                        name="help.header.img"
                        src={srcHelpHeaderImg}
                        tint={tintHelpHeaderImg}
                        layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 27 }}
                    />
                    <ThemeText
                        text={captionHelpHeaderTitle ?? t('quest.help.title')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="help.header.title"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 2, height: 14 }}
                    />
                    <ThemeText
                        text={captionHelpHeaderShort ?? t('quest.help.short')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="help.header.short"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 12, height: 14 }}
                    />
                </Region>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 32, height: 330 }}
                >
                    <Region
                        name="help.content.itemlist"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsHelpContentItemlist ?? (
                            <QuestHelpLayoutHelpDescriptionItem />
                        )}
                    </Region>
                </ScrollArea>
            </Region>
        </Region>
    );
};
