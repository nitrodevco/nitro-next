import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `889_doorbell_xml` (layout "doorbell", 249x165) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Doorbell_889LayoutProps {
    itemsUserList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const Doorbell_889Layout = ({ itemsUserList, layout, onClose }: Doorbell_889LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('widgets.doorbell.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 249, height: 165, minWidth: 249, minHeight: 165, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 10, right: 12, top: 13, height: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('widgets.doorbell.info')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
                />
            </Region>
            <Region
                name="user_list_container"
                backgroundColor="#eaece8"
                layout={{ position: 'absolute', left: 10, width: 217, top: 48, height: 82 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, bottom: 0 }}
                >
                    <Region
                        name="user_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsUserList}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for user_list - rendered by that list's ScrollArea */}
            </Region>
        </Frame>
    );
};
