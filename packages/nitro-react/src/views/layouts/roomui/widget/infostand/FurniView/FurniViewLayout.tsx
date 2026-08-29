import { ReactNode, useState } from 'react';

import { Border, BoxLayout, Button, CloseButton, Region, TextInput, ThemeText } from '#base/theme';

import { FurniViewLayoutInfostandElementList, FurniViewLayoutInfostandElementListProps } from './FurniViewLayoutInfostandElementList';
import { FurniViewLayoutMoveItem } from './FurniViewLayoutMoveItem';
import { FurniViewLayoutPickupItem } from './FurniViewLayoutPickupItem';
import { FurniViewLayoutRotateItem } from './FurniViewLayoutRotateItem';
import { FurniViewLayoutSaveBrandingConfigurationItem } from './FurniViewLayoutSaveBrandingConfigurationItem';
import { FurniViewLayoutUseItem } from './FurniViewLayoutUseItem';
import { FurniViewLayoutWiredInspectItem } from './FurniViewLayoutWiredInspectItem';

/** Generated from `937_furni_view_xml` (layout "furni_view", 429x97) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FurniViewLayoutProps {
    captionName?: string;
    infostandElementList?: FurniViewLayoutInfostandElementListProps;
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onSetValues?: () => void;
}

export const FurniViewLayout = ({ captionName, infostandElementList, itemsButtonList, layout, onClose, onSetValues }: FurniViewLayoutProps) => {
    const [ valueValue, setValueValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 429, height: 97, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="2"
                    name="info_border"
                    layout={{ width: 190, height: 372, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <FurniViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
                <Border
                    variant="2"
                    name="custom_variables"
                    tintColor="#999999"
                    layout={{ width: 190, height: 62, flexShrink: 0 }}
                >
                    <Border
                        variant="3"
                        tintColor="#333333"
                        layout={{ position: 'absolute', left: 3, width: 184, top: 3, height: 56, justifyContent: 'center' }}
                    >
                        <Button
                            variant="3"
                            name="set_values"
                            onPointerTap={onSetValues}
                            layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 75, top: 4, height: 24 }}
                        >
                            Set values
                        </Button>
                        <Region
                            name="variable_list"
                            layout={{ position: 'absolute', left: 0, top: 32, flexDirection: 'column' }}
                        >
                            <Region layout={{ width: 183, height: 26, flexShrink: 0 }}>
                                <Region
                                    name="name"
                                    layout={{ position: 'absolute', left: 1, width: 41, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionName ?? 'Name:'}
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                                <TextInput
                                    value={valueValue}
                                    onChange={setValueValue}
                                    layout={{ position: 'absolute', left: 80, width: 100, top: 2, height: 17 }}
                                />
                                <Border
                                    variant="3"
                                    tintColor="#cccccc"
                                    layout={{ position: 'absolute', left: 80, width: 100, top: 0, height: 20 }}
                                />
                            </Region>
                        </Region>
                    </Border>
                </Border>
                <Region
                    name="button_list"
                    layout={{ width: 1280, height: 25, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                >
                    {itemsButtonList ?? (
                        <>
                            <FurniViewLayoutMoveItem />
                            <FurniViewLayoutRotateItem />
                            <FurniViewLayoutPickupItem />
                            <FurniViewLayoutSaveBrandingConfigurationItem />
                            <FurniViewLayoutUseItem />
                            <FurniViewLayoutWiredInspectItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};
