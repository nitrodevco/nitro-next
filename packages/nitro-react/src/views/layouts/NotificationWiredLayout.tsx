import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2975_notification_wired_xml` (layout "notification_wired", 190x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationWiredLayoutProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const NotificationWiredLayout = ({ layout, onButton }: NotificationWiredLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 190, height: 60, ...layout }}>
            <Border
                variant="2"
                tags={[ 'border' ]}
                params={1}
                tintColor="#355477"
                layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 60 }}
            >
                <ThemeImage
                    params={1040}
                    src={layoutImage('illumina_wired_bg_right.png')}
                    layout={{ position: 'absolute', left: 0, width: 240, top: -19, height: 160 }}
                />
                <Region
                    name="header"
                    params={144}
                    layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 24 }}
                >
                    <Border
                        variant="2"
                        params={144}
                        tintColor="#1e3044"
                        layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 24 }}
                    />
                    <Region
                        params={144}
                        backgroundColor="#1e3044"
                        layout={{ position: 'absolute', left: 0, width: 190, top: 15, height: 10 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 7, width: 177, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('product.type.wired')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    params={8388624}
                    layout={{ position: 'absolute', left: 0, width: 190, top: 31, height: 23, flexDirection: 'column' }}
                >
                    <Region
                        name="description"
                        tags={[ 'notification_text' ]}
                        params={16}
                        layout={{ width: 174, height: 16, flexShrink: 0, minWidth: 174, maxWidth: 174, minHeight: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="Some textyy"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 174, align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="spacing"
                        params={16}
                        layout={{ width: 30, height: 7, flexShrink: 0, flexDirection: 'column' }}
                    />
                    <Region
                        visible={false}
                        layout={{ width: 65, height: 25, flexShrink: 0, minHeight: 25, maxHeight: 25 }}
                    >
                        <Button
                            variant="106"
                            name="button"
                            tags={[ 'button' ]}
                            params={393297}
                            tintColor="#6e8cb7"
                            onPointerTap={onButton}
                            textStyle="text-style-il-button"
                            layout={{ width: '100%', height: '100%' }}
                        >
                            Disable
                        </Button>
                    </Region>
                </Region>
                <ThemeImage
                    tags={[ 'notification_icon' ]}
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 7, width: 50, top: 30, height: 50 }}
                />
            </Border>
        </Region>
    );
};
