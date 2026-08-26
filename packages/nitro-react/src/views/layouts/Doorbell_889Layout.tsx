import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `889_doorbell_xml` (layout "doorbell", 249x165) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Doorbell_889LayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const Doorbell_889Layout = ({ layout, onClose }: Doorbell_889LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            tags={[ 'room_widget_doorbell' ]}
            params={32769}
            caption={t('widgets.doorbell.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 249, height: 165, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={144}
                    layout={{ position: 'absolute', left: 10, width: 215, top: 13, height: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('widgets.doorbell.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
                    />
                </Region>
                <Region
                    name="user_list_container"
                    params={16}
                    backgroundColor="#eaece8"
                    layout={{ position: 'absolute', left: 10, width: 217, top: 48, height: 82 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 82 }}
                    >
                        <Region
                            name="user_list"
                            params={17}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        />
                    </ScrollArea>
                </Region>
            </Region>
        </Frame>
    );
};
