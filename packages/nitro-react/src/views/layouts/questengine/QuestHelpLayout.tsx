import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `125_QuestHelp_xml` (layout "QuestEngine", 208x365) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestHelpLayoutProps {
    captionHelpHeaderShort?: string;
    captionHelpHeaderTitle?: string;
    itemsHelpContentItemlist?: ReactNode;
    layout?: BoxLayout;
    onHelpContainer?: () => void;
    srcHelpHeaderImg?: string;
}

export const QuestHelpLayout = ({ captionHelpHeaderShort, captionHelpHeaderTitle, itemsHelpContentItemlist, layout, onHelpContainer, srcHelpHeaderImg }: QuestHelpLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 208, height: 365, ...layout }}>
            <Region
                name="help.container"
                onPointerTap={onHelpContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 208, top: 0, bottom: 0 }}
            >
                <Region
                    name="help.header"
                    backgroundColor="#e0e0e0"
                    layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 27 }}
                >
                    <ThemeImage
                        name="help.header.img"
                        src={srcHelpHeaderImg}
                        layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 27 }}
                    />
                    <Region
                        name="help.header.title"
                        layout={{ position: 'absolute', left: 0, width: 208, top: 2, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionHelpHeaderTitle ?? t('quest.help.title')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="help.header.short"
                        layout={{ position: 'absolute', left: 0, width: 208, top: 12, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionHelpHeaderShort ?? t('quest.help.short')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, width: 208, top: 32, height: 330 }}
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

/** Row template `help.description` of QuestHelpLayout - pass real rows through its `items…` slot. */
export interface QuestHelpLayoutHelpDescriptionItemProps {
    captionHelpDescription?: string;
    layout?: BoxLayout;
}

export const QuestHelpLayoutHelpDescriptionItem = ({ captionHelpDescription, layout }: QuestHelpLayoutHelpDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="help.description"
            layout={{ width: 208, height: 330, flexShrink: 0, minHeight: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHelpDescription ?? t('quest.help.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 208 }}
            />
        </Region>
    );
};
