import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `125_QuestHelp_xml` (layout "QuestEngine", 208x365) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuestHelpLayoutProps {
    layout?: BoxLayout;
}

export const QuestHelpLayout = ({ layout }: QuestHelpLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 208, height: 365, ...layout }}>
            <Region
                name="help.container"
                params={2065}
                layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 365 }}
            >
                <Region
                    name="help.header"
                    params={16}
                    backgroundColor="#e0e0e0"
                    layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 27 }}
                >
                    <ThemeImage
                        name="help.header.img"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 27 }}
                    />
                    <Region
                        name="help.header.title"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 208, top: 2, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('quest.help.title')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="help.header.short"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 208, top: 12, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('quest.help.short')}
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
                        params={17}
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        <Region
                            name="help.description"
                            params={16}
                            layout={{ width: 208, height: 330, flexShrink: 0, minHeight: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('quest.help.description')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 208 }}
                            />
                        </Region>
                    </Region>
                </ScrollArea>
            </Region>
        </Region>
    );
};
