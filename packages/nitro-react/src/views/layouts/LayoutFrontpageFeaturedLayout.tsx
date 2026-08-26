import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1660_layout_frontpage_featured_xml` (layout "layout_frontpage_featured", 552x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutFrontpageFeaturedLayoutProps {
    layout?: BoxLayout;
    onRedeem?: () => void;
}

export const LayoutFrontpageFeaturedLayout = ({ layout, onRedeem }: LayoutFrontpageFeaturedLayoutProps) => {
    const t = useTranslation();
    const [ voucherCodeValue, setVoucherCodeValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 552, height: 460, ...layout }}>
            <Region
                name="ctlg_frontpage5"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 552, top: 0, height: 460 }}
            >
                <Region
                    name="featuredItemsWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={16400}
                    layout={{ position: 'absolute', left: 0, width: 552, top: 0, height: 460 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 192, width: 360, top: 0, height: 392 }}
                    >
                        <Region
                            name="itemlist_featured"
                            params={16}
                            layout={{ flexDirection: 'column', gap: 7, width: '100%' }}
                        >
                            <Region
                                name="featured_item_template"
                                params={16}
                                layout={{ width: 360, height: 126, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    name="item_image"
                                    params={18}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 0, width: 356, top: 0, height: 126 }}
                                />
                                <Border
                                    variant="3"
                                    name="text_container"
                                    params={1198099}
                                    tintColor="#333333"
                                    blend={0.5}
                                    layout={{ position: 'absolute', left: 5, width: 346, top: 93, height: 30 }}
                                >
                                    <Region
                                        name="item_title"
                                        params={8388627}
                                        layout={{ position: 'absolute', left: 5, width: 340, top: 5, height: 24, maxWidth: 340, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    />
                                </Border>
                                <Region
                                    name="event_catcher_region"
                                    params={17}
                                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 126 }}
                                />
                            </Region>
                        </Region>
                    </ScrollArea>
                    <Region
                        name="firstitem"
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 460 }}
                    >
                        <ThemeImage
                            name="item_image"
                            params={1073741843}
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 460 }}
                        />
                        <Border
                            variant="3"
                            name="text_container"
                            params={1198099}
                            tintColor="#333333"
                            blend={0.5}
                            layout={{ position: 'absolute', left: 5, width: 174, top: 428, height: 29, maxWidth: 174 }}
                        >
                            <Region
                                name="item_title"
                                params={8388627}
                                layout={{ position: 'absolute', left: 5, width: 174, top: 0, height: 29, maxWidth: 174, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            />
                        </Border>
                        <Region
                            name="event_catcher_region"
                            params={17}
                            layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 422 }}
                        />
                    </Region>
                </Region>
                <Border
                    variant="2"
                    name="bgBorder"
                    params={1040}
                    tintColor="#51bbee"
                    layout={{ position: 'absolute', left: 200, width: 345, top: 399, height: 61 }}
                >
                    <Region
                        name="ctlg_txt2"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 272, top: 6, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('lorem.title')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 272 }}
                        />
                    </Region>
                    <Region
                        name="redeemItemCodeWidget"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 345, top: 20, height: 34 }}
                    >
                        <Border
                            variant="0"
                            params={16}
                            layout={{ position: 'absolute', left: 10, width: 216, top: 5, height: 25 }}
                        >
                            <TextInput
                                value={voucherCodeValue}
                                onChange={setVoucherCodeValue}
                                multiline
                                layout={{ position: 'absolute', left: 4, width: 206, top: 4, height: 15 }}
                            />
                        </Border>
                        <Button
                            variant="3"
                            name="redeem"
                            params={393361}
                            onPointerTap={onRedeem}
                            layout={{ position: 'absolute', left: 274, width: 62, top: 5, height: 22, maxWidth: 100 }}
                        >
                            {t('redeem')}
                        </Button>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
