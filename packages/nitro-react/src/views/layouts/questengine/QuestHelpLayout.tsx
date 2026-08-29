import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `125_QuestHelp_xml` (layout "QuestEngine", 208x365) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestHelpLayoutProps {
    helpContainer?: QuestHelpLayoutHelpContainerProps;
    layout?: BoxLayout;
}

export const QuestHelpLayout = ({ helpContainer, layout }: QuestHelpLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 208, height: 365, ...layout }}>
            <QuestHelpLayoutHelpContainer {...helpContainer} />
        </Region>
    );
};

/** Named region `help.header` of QuestHelpLayout - configured through the parent's `helpHeader` prop. */
export interface QuestHelpLayoutHelpHeaderProps {
    captionHelpHeaderShort?: string;
    captionHelpHeaderTitle?: string;
    layout?: BoxLayout;
    srcHelpHeaderImg?: string;
    tags?: string[];
}

export const QuestHelpLayoutHelpHeader = ({ captionHelpHeaderShort, captionHelpHeaderTitle, layout, srcHelpHeaderImg, tags }: QuestHelpLayoutHelpHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="help.header"
            tags={tags}
            backgroundColor="#e0e0e0"
            layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 27, ...layout }}
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
    );
};

/** Row template `help.description` of QuestHelpLayout - pass real rows through its `items…` slot. */
export interface QuestHelpLayoutHelpDescriptionItemProps {
    captionHelpDescription?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const QuestHelpLayoutHelpDescriptionItem = ({ captionHelpDescription, layout, tags }: QuestHelpLayoutHelpDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="help.description"
            tags={tags}
            layout={{ width: 208, height: 330, flexShrink: 0, minHeight: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHelpDescription ?? t('quest.help.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 208 }}
            />
        </Region>
    );
};

/** Named region `help.content.itemlist` of QuestHelpLayout - configured through the parent's `helpContentItemlist` prop. */
export interface QuestHelpLayoutHelpContentItemlistProps {
    itemsHelpContentItemlist?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const QuestHelpLayoutHelpContentItemlist = ({ itemsHelpContentItemlist, layout, tags }: QuestHelpLayoutHelpContentItemlistProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 208, top: 32, height: 330, ...layout }}
        >
            <Region
                name="help.content.itemlist"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsHelpContentItemlist ?? (
                    <QuestHelpLayoutHelpDescriptionItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `help.container` of QuestHelpLayout - configured through the parent's `helpContainer` prop. */
export interface QuestHelpLayoutHelpContainerProps {
    helpContentItemlist?: QuestHelpLayoutHelpContentItemlistProps;
    helpHeader?: QuestHelpLayoutHelpHeaderProps;
    layout?: BoxLayout;
    onHelpContainer?: () => void;
    tags?: string[];
}

export const QuestHelpLayoutHelpContainer = ({ helpContentItemlist, helpHeader, layout, onHelpContainer, tags }: QuestHelpLayoutHelpContainerProps) => {
    return (
        <Region
            name="help.container"
            tags={tags}
            onPointerTap={onHelpContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 208, top: 0, bottom: 0, ...layout }}
        >
            <QuestHelpLayoutHelpHeader {...helpHeader} />
            <QuestHelpLayoutHelpContentItemlist {...helpContentItemlist} />
        </Region>
    );
};
