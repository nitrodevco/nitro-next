import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Header, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `960_camera_interface_xml` (layout "camera_interface", 340x536) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CameraInterfaceLayoutProps {
    bgBorder?: CameraInterfaceLayoutBgBorderProps;
    layout?: BoxLayout;
}

export const CameraInterfaceLayout = ({ bgBorder, layout }: CameraInterfaceLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 340, height: 536, ...layout }}>
            <CameraInterfaceLayoutBgBorder {...bgBorder} />
        </Region>
    );
};

/** Named region `cameraButton_0` of CameraInterfaceLayout - configured through the parent's `cameraButton0` prop. */
export interface CameraInterfaceLayoutCameraButton0Props {
    layout?: BoxLayout;
    onCameraButton0?: () => void;
    srcCameraSlot0?: string;
}

export const CameraInterfaceLayoutCameraButton0 = ({ layout, onCameraButton0, srcCameraSlot0 }: CameraInterfaceLayoutCameraButton0Props) => {
    return (
        <Region
            name="cameraButton_0"
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onCameraButton0}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58, ...layout }}
        >
            <ThemeImage
                name="cameraSlot_0"
                src={srcCameraSlot0}
                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
            />
        </Region>
    );
};

/** Named region `cameraButton_1` of CameraInterfaceLayout - configured through the parent's `cameraButton1` prop. */
export interface CameraInterfaceLayoutCameraButton1Props {
    layout?: BoxLayout;
    onCameraButton1?: () => void;
    srcCameraSlot1?: string;
}

export const CameraInterfaceLayoutCameraButton1 = ({ layout, onCameraButton1, srcCameraSlot1 }: CameraInterfaceLayoutCameraButton1Props) => {
    return (
        <Region
            name="cameraButton_1"
            onPointerTap={onCameraButton1}
            cursor="pointer"
            layout={{ position: 'absolute', left: 64, width: 58, top: 0, height: 58, ...layout }}
        >
            <ThemeImage
                name="cameraSlot_1"
                src={srcCameraSlot1}
                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
            />
        </Region>
    );
};

/** Named region `cameraButton_2` of CameraInterfaceLayout - configured through the parent's `cameraButton2` prop. */
export interface CameraInterfaceLayoutCameraButton2Props {
    layout?: BoxLayout;
    onCameraButton2?: () => void;
    srcCameraSlot2?: string;
}

export const CameraInterfaceLayoutCameraButton2 = ({ layout, onCameraButton2, srcCameraSlot2 }: CameraInterfaceLayoutCameraButton2Props) => {
    return (
        <Region
            name="cameraButton_2"
            onPointerTap={onCameraButton2}
            cursor="pointer"
            layout={{ position: 'absolute', left: 128, width: 58, top: 0, height: 58, ...layout }}
        >
            <ThemeImage
                name="cameraSlot_2"
                src={srcCameraSlot2}
                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
            />
        </Region>
    );
};

/** Named region `cameraButton_3` of CameraInterfaceLayout - configured through the parent's `cameraButton3` prop. */
export interface CameraInterfaceLayoutCameraButton3Props {
    layout?: BoxLayout;
    onCameraButton3?: () => void;
    srcCameraSlot3?: string;
}

export const CameraInterfaceLayoutCameraButton3 = ({ layout, onCameraButton3, srcCameraSlot3 }: CameraInterfaceLayoutCameraButton3Props) => {
    return (
        <Region
            name="cameraButton_3"
            onPointerTap={onCameraButton3}
            cursor="pointer"
            layout={{ position: 'absolute', left: 192, width: 58, top: 0, height: 58, ...layout }}
        >
            <ThemeImage
                name="cameraSlot_3"
                src={srcCameraSlot3}
                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
            />
        </Region>
    );
};

/** Named region `cameraButton_4` of CameraInterfaceLayout - configured through the parent's `cameraButton4` prop. */
export interface CameraInterfaceLayoutCameraButton4Props {
    layout?: BoxLayout;
    onCameraButton4?: () => void;
    srcCameraSlot4?: string;
}

export const CameraInterfaceLayoutCameraButton4 = ({ layout, onCameraButton4, srcCameraSlot4 }: CameraInterfaceLayoutCameraButton4Props) => {
    return (
        <Region
            name="cameraButton_4"
            onPointerTap={onCameraButton4}
            cursor="pointer"
            layout={{ position: 'absolute', left: 256, width: 58, top: 0, height: 58, ...layout }}
        >
            <ThemeImage
                name="cameraSlot_4"
                src={srcCameraSlot4}
                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
            />
        </Region>
    );
};

/** Named region `delete_photo_button` of CameraInterfaceLayout - configured through the parent's `deletePhotoButton` prop. */
export interface CameraInterfaceLayoutDeletePhotoButtonProps {
    layout?: BoxLayout;
    onDeletePhotoButton?: () => void;
    visibleDeletePhotoButton?: boolean;
}

export const CameraInterfaceLayoutDeletePhotoButton = ({ layout, onDeletePhotoButton, visibleDeletePhotoButton }: CameraInterfaceLayoutDeletePhotoButtonProps) => {
    return (
        <Region
            name="delete_photo_button"
            visible={visibleDeletePhotoButton ?? false}
            onPointerTap={onDeletePhotoButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 21, ...layout }}
        >
            <ThemeImage
                src={layoutImage('camera_cam_close_x.png')}
                layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 21 }}
            />
        </Region>
    );
};

/** Named region `button_release` of CameraInterfaceLayout - configured through the parent's `buttonRelease` prop. */
export interface CameraInterfaceLayoutButtonReleaseProps {
    layout?: BoxLayout;
    onButtonRelease?: () => void;
    srcReleaseBitmap?: string;
}

export const CameraInterfaceLayoutButtonRelease = ({ layout, onButtonRelease, srcReleaseBitmap }: CameraInterfaceLayoutButtonReleaseProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_release"
            tooltip={t('camera.take.photo.button.tooltip')}
            onPointerTap={onButtonRelease}
            cursor="pointer"
            layout={{ position: 'absolute', left: 120, width: 98, top: 362, height: 95, ...layout }}
        >
            <ThemeImage
                name="release_bitmap"
                src={srcReleaseBitmap ?? layoutImage('camera_camera_btn.png')}
                layout={{ position: 'absolute', left: 3, width: 94, top: 1, height: 94 }}
            />
        </Region>
    );
};

/** Named region `chooseSlotButton_0` of CameraInterfaceLayout - configured through the parent's `chooseSlotButton0` prop. */
export interface CameraInterfaceLayoutChooseSlotButton0Props {
    layout?: BoxLayout;
    onChooseSlotButton0?: () => void;
    srcSlotImage0?: string;
}

export const CameraInterfaceLayoutChooseSlotButton0 = ({ layout, onChooseSlotButton0, srcSlotImage0 }: CameraInterfaceLayoutChooseSlotButton0Props) => {
    return (
        <Region
            name="chooseSlotButton_0"
            onPointerTap={onChooseSlotButton0}
            cursor="pointer"
            layout={{ position: 'absolute', left: 350, width: 9, top: 42, height: 10, ...layout }}
        >
            <ThemeImage
                name="slotImage_0"
                src={srcSlotImage0 ?? layoutImage('camera_arrow_gray.png')}
                layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
            />
        </Region>
    );
};

/** Named region `chooseSlotButton_1` of CameraInterfaceLayout - configured through the parent's `chooseSlotButton1` prop. */
export interface CameraInterfaceLayoutChooseSlotButton1Props {
    layout?: BoxLayout;
    onChooseSlotButton1?: () => void;
    srcSlotImage1?: string;
}

export const CameraInterfaceLayoutChooseSlotButton1 = ({ layout, onChooseSlotButton1, srcSlotImage1 }: CameraInterfaceLayoutChooseSlotButton1Props) => {
    return (
        <Region
            name="chooseSlotButton_1"
            onPointerTap={onChooseSlotButton1}
            cursor="pointer"
            layout={{ position: 'absolute', left: 350, width: 9, top: 109, height: 10, ...layout }}
        >
            <ThemeImage
                name="slotImage_1"
                src={srcSlotImage1 ?? layoutImage('camera_arrow_gray.png')}
                layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
            />
        </Region>
    );
};

/** Named region `chooseSlotButton_2` of CameraInterfaceLayout - configured through the parent's `chooseSlotButton2` prop. */
export interface CameraInterfaceLayoutChooseSlotButton2Props {
    layout?: BoxLayout;
    onChooseSlotButton2?: () => void;
    srcSlotImage2?: string;
}

export const CameraInterfaceLayoutChooseSlotButton2 = ({ layout, onChooseSlotButton2, srcSlotImage2 }: CameraInterfaceLayoutChooseSlotButton2Props) => {
    return (
        <Region
            name="chooseSlotButton_2"
            onPointerTap={onChooseSlotButton2}
            cursor="pointer"
            layout={{ position: 'absolute', left: 350, width: 9, top: 177, height: 10, ...layout }}
        >
            <ThemeImage
                name="slotImage_2"
                src={srcSlotImage2 ?? layoutImage('camera_arrow_gray.png')}
                layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
            />
        </Region>
    );
};

/** Named region `chooseSlotButton_3` of CameraInterfaceLayout - configured through the parent's `chooseSlotButton3` prop. */
export interface CameraInterfaceLayoutChooseSlotButton3Props {
    layout?: BoxLayout;
    onChooseSlotButton3?: () => void;
    srcSlotImage3?: string;
}

export const CameraInterfaceLayoutChooseSlotButton3 = ({ layout, onChooseSlotButton3, srcSlotImage3 }: CameraInterfaceLayoutChooseSlotButton3Props) => {
    return (
        <Region
            name="chooseSlotButton_3"
            onPointerTap={onChooseSlotButton3}
            cursor="pointer"
            layout={{ position: 'absolute', left: 350, width: 9, top: 244, height: 10, ...layout }}
        >
            <ThemeImage
                name="slotImage_3"
                src={srcSlotImage3 ?? layoutImage('camera_arrow_gray.png')}
                layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
            />
        </Region>
    );
};

/** Named region `chooseSlotButton_4` of CameraInterfaceLayout - configured through the parent's `chooseSlotButton4` prop. */
export interface CameraInterfaceLayoutChooseSlotButton4Props {
    layout?: BoxLayout;
    onChooseSlotButton4?: () => void;
    srcSlotImage4?: string;
}

export const CameraInterfaceLayoutChooseSlotButton4 = ({ layout, onChooseSlotButton4, srcSlotImage4 }: CameraInterfaceLayoutChooseSlotButton4Props) => {
    return (
        <Region
            name="chooseSlotButton_4"
            onPointerTap={onChooseSlotButton4}
            cursor="pointer"
            layout={{ position: 'absolute', left: 350, width: 9, top: 310, height: 10, ...layout }}
        >
            <ThemeImage
                name="slotImage_4"
                src={srcSlotImage4 ?? layoutImage('camera_arrow_gray.png')}
                layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
            />
        </Region>
    );
};

/** Named region `bgBorder` of CameraInterfaceLayout - configured through the parent's `bgBorder` prop. */
export interface CameraInterfaceLayoutBgBorderProps {
    buttonRelease?: CameraInterfaceLayoutButtonReleaseProps;
    cameraButton0?: CameraInterfaceLayoutCameraButton0Props;
    cameraButton1?: CameraInterfaceLayoutCameraButton1Props;
    cameraButton2?: CameraInterfaceLayoutCameraButton2Props;
    cameraButton3?: CameraInterfaceLayoutCameraButton3Props;
    cameraButton4?: CameraInterfaceLayoutCameraButton4Props;
    captionPhotoDate?: string;
    captionPhotoRoomname?: string;
    chooseSlotButton0?: CameraInterfaceLayoutChooseSlotButton0Props;
    chooseSlotButton1?: CameraInterfaceLayoutChooseSlotButton1Props;
    chooseSlotButton2?: CameraInterfaceLayoutChooseSlotButton2Props;
    chooseSlotButton3?: CameraInterfaceLayoutChooseSlotButton3Props;
    chooseSlotButton4?: CameraInterfaceLayoutChooseSlotButton4Props;
    deletePhotoButton?: CameraInterfaceLayoutDeletePhotoButtonProps;
    layout?: BoxLayout;
    onBgBorder?: () => void;
    onButtonEditor?: () => void;
    srcBuyButtonBg?: string;
    srcCameraCrosshair?: string;
    srcCustomFrame?: string;
    srcFlash?: string;
    srcImage?: string;
    srcPhotoBorder?: string;
    visibleSlotContainer?: boolean;
}

export const CameraInterfaceLayoutBgBorder = ({ buttonRelease, cameraButton0, cameraButton1, cameraButton2, cameraButton3, cameraButton4, captionPhotoDate, captionPhotoRoomname, chooseSlotButton0, chooseSlotButton1, chooseSlotButton2, chooseSlotButton3, chooseSlotButton4, deletePhotoButton, layout, onBgBorder, onButtonEditor, srcBuyButtonBg, srcCameraCrosshair, srcCustomFrame, srcFlash, srcImage, srcPhotoBorder, visibleSlotContainer }: CameraInterfaceLayoutBgBorderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bgBorder"
            onPointerTap={onBgBorder}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 536, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="7"
                name="slot_container"
                visible={visibleSlotContainer ?? false}
                layout={{ position: 'absolute', left: 6, width: 328, top: 453, height: 82 }}
            >
                <Region layout={{ position: 'absolute', left: 7, width: 340, top: 15, height: 58 }}>
                    <CameraInterfaceLayoutCameraButton0 {...cameraButton0} />
                    <CameraInterfaceLayoutCameraButton1 {...cameraButton1} />
                    <CameraInterfaceLayoutCameraButton2 {...cameraButton2} />
                    <CameraInterfaceLayoutCameraButton3 {...cameraButton3} />
                    <CameraInterfaceLayoutCameraButton4 {...cameraButton4} />
                </Region>
                <ThemeImage
                    name="photo_border"
                    src={srcPhotoBorder ?? layoutImage('camera_photo_border.png')}
                    layout={{ position: 'absolute', left: 0, width: 62, top: -25, height: 62 }}
                    visible={false}
                />
                <CameraInterfaceLayoutDeletePhotoButton {...deletePhotoButton} />
            </Border>
            <ThemeImage
                name="image"
                src={srcImage}
                layout={{ position: 'absolute', left: 9, width: 320, top: 36, height: 320 }}
            />
            <ThemeImage
                name="flash"
                src={srcFlash}
                layout={{ position: 'absolute', left: 9, width: 320, top: 35, height: 320 }}
            />
            <ThemeImage
                name="custom_frame"
                src={srcCustomFrame ?? layoutImage('camera_cam_bg.png')}
                layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 462 }}
            />
            <Region
                name="photo_date"
                visible={false}
                layout={{ position: 'absolute', right: 10, width: 88, top: 55, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPhotoDate ?? '6/4/2014 14:02'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="photo_roomname"
                visible={false}
                layout={{ position: 'absolute', right: 10, width: 110, top: 69, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionPhotoRoomname ?? 'My awesome room'}
                    textOptions={{ fill: '#ffffff', align: 'right' }}
                />
            </Region>
            <ThemeImage
                name="camera_crosshair"
                src={srcCameraCrosshair ?? layoutImage('camera_viewfinder.png')}
                layout={{ position: 'absolute', left: 10, width: 318, top: 38, height: 318 }}
            />
            <CameraInterfaceLayoutButtonRelease {...buttonRelease} />
            <ThemeImage
                name="buyButtonBg"
                src={srcBuyButtonBg ?? layoutImage('tools_black_pixel.png')}
                tint="#ff0000"
                layout={{ position: 'absolute', left: 11, width: 318, top: 298, height: 58 }}
            />
            <ButtonThick
                variant="6"
                name="button_editor"
                tooltip={t('camera.editor.button.tooltip')}
                dynamicStyle="brightness_and_shadow_under"
                tintColor="#009e00"
                onPointerTap={onButtonEditor}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 157, top: 308, height: 40 }}
            >
                {t('camera.editor.button.text')}
            </ButtonThick>
            <CameraInterfaceLayoutChooseSlotButton0 {...chooseSlotButton0} />
            <CameraInterfaceLayoutChooseSlotButton1 {...chooseSlotButton1} />
            <CameraInterfaceLayoutChooseSlotButton2 {...chooseSlotButton2} />
            <CameraInterfaceLayoutChooseSlotButton3 {...chooseSlotButton3} />
            <CameraInterfaceLayoutChooseSlotButton4 {...chooseSlotButton4} />
            <Header
                variant="3"
                tintColor="#666666"
                caption="${camera.interface.title}"
                layout={{ position: 'absolute', left: 9, width: 323, top: 5, height: 28 }}
            />
        </Region>
    );
};
