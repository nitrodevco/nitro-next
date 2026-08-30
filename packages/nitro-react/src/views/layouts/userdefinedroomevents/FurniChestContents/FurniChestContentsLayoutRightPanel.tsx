import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { FurniChestContentsLayoutWithdrawBtnItem } from './FurniChestContentsLayoutWithdrawBtnItem';
import { FurniChestContentsLayoutWithdrawInputItem } from './FurniChestContentsLayoutWithdrawInputItem';

/** Named region `right_panel` of FurniChestContentsLayout - configured through the parent's `rightPanel` prop. */
export interface FurniChestContentsLayoutRightPanelProps {
    captionFurniName?: string;
    itemsWithdrawCont?: ReactNode;
    layout?: BoxLayout;
    onViewLogsByFurniBtn?: () => void;
    previewImage?: ReactNode;
    srcPlaceholderPreviewImage?: string;
    visiblePlaceholderPreviewImage?: boolean;
    visibleViewLogsByFurniBtn?: boolean;
}

export const FurniChestContentsLayoutRightPanel = ({ captionFurniName, itemsWithdrawCont, layout, onViewLogsByFurniBtn, previewImage, srcPlaceholderPreviewImage, visiblePlaceholderPreviewImage, visibleViewLogsByFurniBtn }: FurniChestContentsLayoutRightPanelProps) => {
    const t = useTranslation();

    return (
        <Region
            name="right_panel"
            layout={{ position: 'absolute', right: 9, width: 175, top: 11, bottom: 11, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#d8d8d8"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 31 }}
            >
                <ThemeText
                    text={captionFurniName ?? 'furni_name'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                    name="furni_name"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 5, right: -20, top: 5, height: 17, minWidth: 190, maxWidth: 190 }}
                />
                <Region
                    name="stretching_preview_image_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 26, bottom: 0 }}
                >
                    <WidgetSlot
                        widgetType="product_image"
                        name="preview_image"
                        layout={{ position: 'absolute', left: 2, right: 3, top: 9, bottom: 9 }}
                    >
                        {previewImage}
                    </WidgetSlot>
                </Region>
                {(visiblePlaceholderPreviewImage ?? false) && (
                    <ThemeImage
                        name="placeholder_preview_image"
                        src={srcPlaceholderPreviewImage ?? layoutImage('wired_chests_images_classic_furni_chest_empty.png')}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 10, bottom: 0 }}
                    />
                )}
            </Border>
            <Region
                name="options"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: -31, height: 62 }}
            >
                <Region
                    name="withdraw_cont"
                    layout={{ position: 'absolute', right: 0, top: 9, flexDirection: 'row', gap: 10 }}
                >
                    {itemsWithdrawCont ?? (
                        <>
                            <FurniChestContentsLayoutWithdrawInputItem />
                            <FurniChestContentsLayoutWithdrawBtnItem />
                        </>
                    )}
                </Region>
                {(visibleViewLogsByFurniBtn ?? false) && (
                    <Button
                        variant="3"
                        name="view_logs_by_furni_btn"
                        onPointerTap={onViewLogsByFurniBtn}
                        layout={{ position: 'absolute', right: 0, width: 73, top: 37, height: 22, minWidth: 60 }}
                    >
                        {t('wiredchests.view_logs')}
                    </Button>
                )}
            </Region>
        </Region>
    );
};
