import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `960_camera_interface_xml` (layout "camera_interface", 340x536) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CameraInterfaceLayoutProps {
    layout?: BoxLayout;
    onButtonEditor?: () => void;
}

export const CameraInterfaceLayout = ({ layout, onButtonEditor }: CameraInterfaceLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 340, height: 536, ...layout }}>
            <Region
                name="bgBorder"
                params={33025}
                layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 536 }}
            >
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 6, width: 328, top: 453, height: 82 }}
                >
                    <Border
                        variant="7"
                        name="slot_container"
                        params={16}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 7, width: 340, top: 15, height: 58 }}
                        >
                            <Region
                                name="cameraButton_0"
                                params={1}
                                dynamicStyle="brightness_and_shadow_under"
                                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
                            >
                                <ThemeImage
                                    name="cameraSlot_0"
                                    params={16}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
                                />
                            </Region>
                            <Region
                                name="cameraButton_1"
                                params={17}
                                layout={{ position: 'absolute', left: 64, width: 58, top: 0, height: 58 }}
                            >
                                <ThemeImage
                                    name="cameraSlot_1"
                                    params={16}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
                                />
                            </Region>
                            <Region
                                name="cameraButton_2"
                                params={17}
                                layout={{ position: 'absolute', left: 128, width: 58, top: 0, height: 58 }}
                            >
                                <ThemeImage
                                    name="cameraSlot_2"
                                    params={16}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
                                />
                            </Region>
                            <Region
                                name="cameraButton_3"
                                params={17}
                                layout={{ position: 'absolute', left: 192, width: 58, top: 0, height: 58 }}
                            >
                                <ThemeImage
                                    name="cameraSlot_3"
                                    params={16}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
                                />
                            </Region>
                            <Region
                                name="cameraButton_4"
                                params={17}
                                layout={{ position: 'absolute', left: 256, width: 58, top: 0, height: 58 }}
                            >
                                <ThemeImage
                                    name="cameraSlot_4"
                                    params={16}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 58 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 0, width: 62, top: -25, height: 62 }}
                        >
                            <ThemeImage
                                name="photo_border"
                                src={layoutImage('camera_photo_border.png')}
                                layout={{ position: 'absolute', left: 0, width: 62, top: -25, height: 62 }}
                            />
                        </Region>
                        <Region
                            name="delete_photo_button"
                            params={131073}
                            visible={false}
                            layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 21 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('camera_cam_close_x.png')}
                                layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 21 }}
                            />
                        </Region>
                    </Border>
                </Region>
                <ThemeImage
                    name="image"
                    params={20}
                    src={undefined}
                    layout={{ position: 'absolute', left: 9, width: 320, top: 36, height: 320 }}
                />
                <ThemeImage
                    name="flash"
                    params={20}
                    src={undefined}
                    layout={{ position: 'absolute', left: 9, width: 320, top: 35, height: 320 }}
                />
                <ThemeImage
                    name="custom_frame"
                    params={16}
                    src={layoutImage('camera_cam_bg.png')}
                    layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 462 }}
                />
                <Region
                    name="photo_date"
                    params={262160}
                    visible={false}
                    layout={{ position: 'absolute', left: 242, width: 88, top: 55, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="6/4/2014 14:02"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="photo_roomname"
                    params={262160}
                    visible={false}
                    layout={{ position: 'absolute', left: 220, width: 110, top: 69, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text="My awesome room"
                        textOptions={{ fill: '#ffffff', align: 'right' }}
                    />
                </Region>
                <ThemeImage
                    name="camera_crosshair"
                    params={16}
                    src={layoutImage('camera_viewfinder.png')}
                    layout={{ position: 'absolute', left: 10, width: 318, top: 38, height: 318 }}
                />
                <Region
                    name="button_release"
                    tooltip={t('camera.take.photo.button.tooltip')}
                    params={131073}
                    layout={{ position: 'absolute', left: 120, width: 98, top: 362, height: 95 }}
                >
                    <ThemeImage
                        name="release_bitmap"
                        tags={[ '#bg' ]}
                        src={layoutImage('camera_camera_btn.png')}
                        layout={{ position: 'absolute', left: 3, width: 94, top: 1, height: 94 }}
                    />
                </Region>
                <ThemeImage
                    name="buyButtonBg"
                    params={16}
                    src={layoutImage('tools_black_pixel.png')}
                    tint="#ff0000"
                    layout={{ position: 'absolute', left: 11, width: 318, top: 298, height: 58 }}
                />
                <ButtonThick
                    variant="6"
                    name="button_editor"
                    tooltip={t('camera.editor.button.tooltip')}
                    params={917505}
                    dynamicStyle="brightness_and_shadow_under"
                    tintColor="#009e00"
                    onPointerTap={onButtonEditor}
                    layout={{ position: 'absolute', left: 92, width: 157, top: 308, height: 40 }}
                >
                    {t('camera.editor.button.text')}
                </ButtonThick>
                <Region
                    name="chooseSlotButton_0"
                    params={147473}
                    layout={{ position: 'absolute', left: 350, width: 9, top: 42, height: 10 }}
                >
                    <ThemeImage
                        name="slotImage_0"
                        params={16}
                        src={layoutImage('camera_arrow_gray.png')}
                        layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
                    />
                </Region>
                <Region
                    name="chooseSlotButton_1"
                    params={147473}
                    layout={{ position: 'absolute', left: 350, width: 9, top: 109, height: 10 }}
                >
                    <ThemeImage
                        name="slotImage_1"
                        params={16}
                        src={layoutImage('camera_arrow_gray.png')}
                        layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
                    />
                </Region>
                <Region
                    name="chooseSlotButton_2"
                    params={147473}
                    layout={{ position: 'absolute', left: 350, width: 9, top: 177, height: 10 }}
                >
                    <ThemeImage
                        name="slotImage_2"
                        params={16}
                        src={layoutImage('camera_arrow_gray.png')}
                        layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
                    />
                </Region>
                <Region
                    name="chooseSlotButton_3"
                    params={147473}
                    layout={{ position: 'absolute', left: 350, width: 9, top: 244, height: 10 }}
                >
                    <ThemeImage
                        name="slotImage_3"
                        params={16}
                        src={layoutImage('camera_arrow_gray.png')}
                        layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
                    />
                </Region>
                <Region
                    name="chooseSlotButton_4"
                    params={147473}
                    layout={{ position: 'absolute', left: 350, width: 9, top: 310, height: 10 }}
                >
                    <ThemeImage
                        name="slotImage_4"
                        params={16}
                        src={layoutImage('camera_arrow_gray.png')}
                        layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 10 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
