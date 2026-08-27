import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `987_random_teleport_menu_xml` (layout "context_menu_widget", 115x86) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RandomTeleportMenuLayoutProps {
    captionFurniName?: string;
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    onMinimize?: () => void;
}

export const RandomTeleportMenuLayout = ({ captionFurniName, itemsButtons, layout, onMinimize }: RandomTeleportMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 86, ...layout }}>
            <Bubble
                variant="0"
                params={1048865}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -27, height: 86 }}
            >
                <Region
                    name="border"
                    params={12582928}
                    layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 76, justifyContent: 'center' }}
                >
                    <Region
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16, justifyContent: 'center' }}
                    >
                        <Region
                            name="furni_name"
                            params={208}
                            layout={{ position: 'absolute', width: 61, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionFurniName ?? 'furni_name'}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        params={144}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
                    />
                    <Region
                        name="buttons"
                        params={8519888}
                        layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 26, flexDirection: 'column', gap: 1 }}
                    >
                        {itemsButtons ?? (
                            <RandomTeleportMenuLayoutUseItem />
                        )}
                    </Region>
                    <Region
                        name="minimize"
                        params={1041}
                        onPointerTap={onMinimize}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 4, width: 100, bottom: 3, height: 18 }}
                    >
                        <Icon
                            variant="7"
                            name="icon"
                            params={16}
                            layout={{ position: 'absolute', left: 45, width: 13, top: 7, height: 10 }}
                        />
                    </Region>
                </Region>
            </Bubble>
        </Region>
    );
};

/** Row template `use` of RandomTeleportMenuLayout - pass real rows through its `items…` slot. */
export interface RandomTeleportMenuLayoutUseItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const RandomTeleportMenuLayoutUseItem = ({ captionLabel, layout, onButton }: RandomTeleportMenuLayoutUseItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 101, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
                    layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLabel ?? t('widget.random_teleport.button.use')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};
