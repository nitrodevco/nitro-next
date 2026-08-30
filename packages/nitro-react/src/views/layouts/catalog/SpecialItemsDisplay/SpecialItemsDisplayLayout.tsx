import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

import { SpecialItemsDisplayLayoutBottom, SpecialItemsDisplayLayoutBottomProps } from './SpecialItemsDisplayLayoutBottom';
import { SpecialItemsDisplayLayoutCenter, SpecialItemsDisplayLayoutCenterProps } from './SpecialItemsDisplayLayoutCenter';

/** Generated from `1662_special_items_display_xml` (layout "special_items_display", 420x495) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SpecialItemsDisplayLayoutProps {
    bg1?: ReactNode;
    bg2?: ReactNode;
    bg3?: ReactNode;
    bottom?: SpecialItemsDisplayLayoutBottomProps;
    captionClaimTxt?: string;
    captionSetDesc?: string;
    captionSetTitle?: string;
    center?: SpecialItemsDisplayLayoutCenterProps;
    claimSpacer?: ReactNode;
    layout?: BoxLayout;
    onClaimBtn?: () => void;
    onClose?: () => void;
    visibleClaimContainer?: boolean;
}

export const SpecialItemsDisplayLayout = ({ bg1, bg2, bg3, bottom, captionClaimTxt, captionSetDesc, captionSetTitle, center, claimSpacer, layout, onClaimBtn, onClose, visibleClaimContainer }: SpecialItemsDisplayLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="main"
            name="main"
            caption={t('special_items.title')}
            tintColor="#2a2a2a"
            onClose={onClose}
            layout={{ width: 420, height: 495, minWidth: 420, minHeight: 495, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    name="background_container"
                    layout={{ position: 'absolute', left: 0, right: -12, top: 0, bottom: -8 }}
                >
                    <Region
                        name="bg1"
                        backgroundColor="#bfbfbf"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 0, bottom: 7 }}
                    >
                        {bg1}
                    </Region>
                    <Region
                        name="bg2"
                        backgroundColor="#bfbfbf"
                        layout={{ position: 'absolute', left: 4, right: 4, bottom: 5, height: 2 }}
                    >
                        {bg2}
                    </Region>
                    <Region
                        name="bg3"
                        backgroundColor="#bfbfbf"
                        layout={{ position: 'absolute', left: 6, right: 6, bottom: 4, height: 1 }}
                    >
                        {bg3}
                    </Region>
                </Region>
                <Region
                    name="header"
                    layout={{ position: 'absolute', left: 0, right: -12, top: 0, height: 107 }}
                >
                    <Border
                        variant="2"
                        tintColor="#d9d9d9"
                        layout={{ position: 'absolute', left: 13, width: 394, top: 13, height: 94 }}
                    >
                        <ScrollArea
                            orientation="vertical"
                            layout={{ position: 'absolute', left: 7, width: 380, top: 7, height: 80 }}
                        >
                            <Region layout={{ flexDirection: 'column', width: '100%' }}>
                                <ThemeText
                                    text={captionSetTitle ?? t('special_items.wf15.header.title')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 365, align: 'center' }}
                                    name="set_title"
                                    verticalAlign="top"
                                    layout={{ width: 365, height: 17, flexShrink: 0, maxWidth: 365 }}
                                />
                                <ThemeText
                                    text={captionSetDesc ?? t('special_items.wf15.header.desc')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 365, align: 'center' }}
                                    name="set_desc"
                                    verticalAlign="top"
                                    layout={{ width: 365, height: 57, flexShrink: 0, maxWidth: 365 }}
                                />
                            </Region>
                        </ScrollArea>
                    </Border>
                </Region>
                <SpecialItemsDisplayLayoutCenter {...center} />
                <Region
                    name="claim_spacer"
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 0 }}
                >
                    {claimSpacer}
                </Region>
                {(visibleClaimContainer ?? false) && (
                    <Border
                        variant="2"
                        name="claim_container"
                        blend={0.8}
                        layout={{ position: 'absolute', marginLeft: 6, marginRight: -6, width: 310, top: 115, height: 40 }}
                    >
                        <Region layout={{ position: 'absolute', left: 16, width: 277, top: 5, height: 30, flexDirection: 'row', gap: 10 }}>
                            <ThemeText
                                text={captionClaimTxt ?? t('special_items.claim_info')}
                                name="claim_txt"
                                layout={{ width: 212, height: 17, flexShrink: 0 }}
                            />
                            <Button
                                variant="4"
                                name="claim_btn"
                                onPointerTap={onClaimBtn}
                                layout={{ width: 55, height: 30, flexShrink: 0 }}
                            >
                                {t('special_items.claim')}
                            </Button>
                        </Region>
                    </Border>
                )}
                <SpecialItemsDisplayLayoutBottom {...bottom} />
            </Region>
        </Frame>
    );
};
