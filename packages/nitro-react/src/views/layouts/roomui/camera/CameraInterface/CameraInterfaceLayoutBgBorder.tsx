import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Header, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `bgBorder` of CameraInterfaceLayout - configured through the parent's `bgBorder` prop. */
export interface CameraInterfaceLayoutBgBorderProps {
    captionPhotoDate?: string;
    captionPhotoRoomname?: string;
    layout?: BoxLayout;
    onBgBorder?: () => void;
    onButtonEditor?: () => void;
    onButtonRelease?: () => void;
    onCameraButton0?: () => void;
    onCameraButton1?: () => void;
    onCameraButton2?: () => void;
    onCameraButton3?: () => void;
    onCameraButton4?: () => void;
    onChooseSlotButton0?: () => void;
    onChooseSlotButton1?: () => void;
    onChooseSlotButton2?: () => void;
    onChooseSlotButton3?: () => void;
    onChooseSlotButton4?: () => void;
    onDeletePhotoButton?: () => void;
    srcBuyButtonBg?: string;
    srcCameraCrosshair?: string;
    srcCameraSlot0?: string;
    srcCameraSlot1?: string;
    srcCameraSlot2?: string;
    srcCameraSlot3?: string;
    srcCameraSlot4?: string;
    srcCustomFrame?: string;
    srcFlash?: string;
    srcImage?: string;
    srcPhotoBorder?: string;
    srcReleaseBitmap?: string;
    srcSlotImage0?: string;
    srcSlotImage1?: string;
    srcSlotImage2?: string;
    srcSlotImage3?: string;
    srcSlotImage4?: string;
    tintCameraSlot0?: string;
    tintCameraSlot1?: string;
    tintCameraSlot2?: string;
    tintCameraSlot3?: string;
    tintCameraSlot4?: string;
    tintFlash?: string;
    tintImage?: string;
    visibleDeletePhotoButton?: boolean;
    visiblePhotoBorder?: boolean;
    visiblePhotoDate?: boolean;
    visiblePhotoRoomname?: boolean;
    visibleSlotContainer?: boolean;
}

export const CameraInterfaceLayoutBgBorder = ({ captionPhotoDate, captionPhotoRoomname, layout, onBgBorder, onButtonEditor, onButtonRelease, onCameraButton0, onCameraButton1, onCameraButton2, onCameraButton3, onCameraButton4, onChooseSlotButton0, onChooseSlotButton1, onChooseSlotButton2, onChooseSlotButton3, onChooseSlotButton4, onDeletePhotoButton, srcBuyButtonBg, srcCameraCrosshair, srcCameraSlot0, srcCameraSlot1, srcCameraSlot2, srcCameraSlot3, srcCameraSlot4, srcCustomFrame, srcFlash, srcImage, srcPhotoBorder, srcReleaseBitmap, srcSlotImage0, srcSlotImage1, srcSlotImage2, srcSlotImage3, srcSlotImage4, tintCameraSlot0, tintCameraSlot1, tintCameraSlot2, tintCameraSlot3, tintCameraSlot4, tintFlash, tintImage, visibleDeletePhotoButton, visiblePhotoBorder, visiblePhotoDate, visiblePhotoRoomname, visibleSlotContainer }: CameraInterfaceLayoutBgBorderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bgBorder"
            onPointerTap={onBgBorder}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 536, justifyContent: 'center', ...layout }}
        >
            {(visibleSlotContainer ?? false) && (
                <Border
                    variant="7"
                    name="slot_container"
                    layout={{ position: 'absolute', left: 6, width: 328, top: 453, height: 82 }}
                >
                    <Region layout={{ position: 'absolute', left: 7, width: 340, top: 15, height: 58 }}>
                        <Region
                            name="cameraButton_0"
                            dynamicStyle="brightness_and_shadow_under"
                            onPointerTap={onCameraButton0}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
                        >
                            <ThemeImage
                                name="cameraSlot_0"
                                src={srcCameraSlot0}
                                tint={tintCameraSlot0}
                                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
                            />
                        </Region>
                        <Region
                            name="cameraButton_1"
                            onPointerTap={onCameraButton1}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 64, width: 58, top: 0, height: 58 }}
                        >
                            <ThemeImage
                                name="cameraSlot_1"
                                src={srcCameraSlot1}
                                tint={tintCameraSlot1}
                                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
                            />
                        </Region>
                        <Region
                            name="cameraButton_2"
                            onPointerTap={onCameraButton2}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 128, width: 58, top: 0, height: 58 }}
                        >
                            <ThemeImage
                                name="cameraSlot_2"
                                src={srcCameraSlot2}
                                tint={tintCameraSlot2}
                                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
                            />
                        </Region>
                        <Region
                            name="cameraButton_3"
                            onPointerTap={onCameraButton3}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 192, width: 58, top: 0, height: 58 }}
                        >
                            <ThemeImage
                                name="cameraSlot_3"
                                src={srcCameraSlot3}
                                tint={tintCameraSlot3}
                                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
                            />
                        </Region>
                        <Region
                            name="cameraButton_4"
                            onPointerTap={onCameraButton4}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 256, width: 58, top: 0, height: 58 }}
                        >
                            <ThemeImage
                                name="cameraSlot_4"
                                src={srcCameraSlot4}
                                tint={tintCameraSlot4}
                                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
                            />
                        </Region>
                    </Region>
                    {(visiblePhotoBorder ?? false) && (
                        <ThemeImage
                            name="photo_border"
                            src={srcPhotoBorder ?? layoutImage('camera_photo_border.png')}
                            layout={{ position: 'absolute', left: 0, width: 62, top: -25, height: 62 }}
                        />
                    )}
                    {(visibleDeletePhotoButton ?? false) && (
                        <Region
                            name="delete_photo_button"
                            onPointerTap={onDeletePhotoButton}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 21 }}
                        >
                            <ThemeImage
                                src={layoutImage('camera_cam_close_x.png')}
                                layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 21 }}
                            />
                        </Region>
                    )}
                </Border>
            )}
            <ThemeImage
                name="image"
                src={srcImage}
                tint={tintImage}
                layout={{ position: 'absolute', left: 9, width: 320, top: 36, height: 320 }}
            />
            <ThemeImage
                name="flash"
                src={srcFlash}
                tint={tintFlash}
                layout={{ position: 'absolute', left: 9, width: 320, top: 35, height: 320 }}
            />
            <ThemeImage
                name="custom_frame"
                src={srcCustomFrame ?? layoutImage('camera_cam_bg.png')}
                layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 462 }}
            />
            {(visiblePhotoDate ?? false) && (
                <Region
                    name="photo_date"
                    layout={{ position: 'absolute', right: 10, width: 88, top: 55, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPhotoDate ?? '6/4/2014 14:02'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
            {(visiblePhotoRoomname ?? false) && (
                <Region
                    name="photo_roomname"
                    layout={{ position: 'absolute', right: 10, width: 110, top: 69, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPhotoRoomname ?? 'My awesome room'}
                        textOptions={{ fill: '#ffffff', align: 'right' }}
                    />
                </Region>
            )}
            <ThemeImage
                name="camera_crosshair"
                src={srcCameraCrosshair ?? layoutImage('camera_viewfinder.png')}
                layout={{ position: 'absolute', left: 10, width: 318, top: 38, height: 318 }}
            />
            <Region
                name="button_release"
                tooltip={t('camera.take.photo.button.tooltip')}
                onPointerTap={onButtonRelease}
                cursor="pointer"
                layout={{ position: 'absolute', left: 120, width: 98, top: 362, height: 95 }}
            >
                <ThemeImage
                    name="release_bitmap"
                    src={srcReleaseBitmap ?? layoutImage('camera_camera_btn.png')}
                    layout={{ position: 'absolute', left: 3, width: 94, top: 1, height: 94 }}
                />
            </Region>
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
            <Region
                name="chooseSlotButton_0"
                onPointerTap={onChooseSlotButton0}
                cursor="pointer"
                layout={{ position: 'absolute', left: 350, width: 9, top: 42, height: 10 }}
            >
                <ThemeImage
                    name="slotImage_0"
                    src={srcSlotImage0 ?? layoutImage('camera_arrow_gray.png')}
                    layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
                />
            </Region>
            <Region
                name="chooseSlotButton_1"
                onPointerTap={onChooseSlotButton1}
                cursor="pointer"
                layout={{ position: 'absolute', left: 350, width: 9, top: 109, height: 10 }}
            >
                <ThemeImage
                    name="slotImage_1"
                    src={srcSlotImage1 ?? layoutImage('camera_arrow_gray.png')}
                    layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
                />
            </Region>
            <Region
                name="chooseSlotButton_2"
                onPointerTap={onChooseSlotButton2}
                cursor="pointer"
                layout={{ position: 'absolute', left: 350, width: 9, top: 177, height: 10 }}
            >
                <ThemeImage
                    name="slotImage_2"
                    src={srcSlotImage2 ?? layoutImage('camera_arrow_gray.png')}
                    layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
                />
            </Region>
            <Region
                name="chooseSlotButton_3"
                onPointerTap={onChooseSlotButton3}
                cursor="pointer"
                layout={{ position: 'absolute', left: 350, width: 9, top: 244, height: 10 }}
            >
                <ThemeImage
                    name="slotImage_3"
                    src={srcSlotImage3 ?? layoutImage('camera_arrow_gray.png')}
                    layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
                />
            </Region>
            <Region
                name="chooseSlotButton_4"
                onPointerTap={onChooseSlotButton4}
                cursor="pointer"
                layout={{ position: 'absolute', left: 350, width: 9, top: 310, height: 10 }}
            >
                <ThemeImage
                    name="slotImage_4"
                    src={srcSlotImage4 ?? layoutImage('camera_arrow_gray.png')}
                    layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
                />
            </Region>
            <Header
                variant="3"
                tintColor="#666666"
                caption="${camera.interface.title}"
                layout={{ position: 'absolute', left: 9, width: 323, top: 5, height: 28 }}
            />
        </Region>
    );
};
