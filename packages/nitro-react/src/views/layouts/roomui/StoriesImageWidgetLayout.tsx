import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1061_stories_image_widget_xml` (layout "stories_image_widget", 502x455) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StoriesImageWidgetLayoutProps {
    captionCaptionText?: string;
    captionCreationDate?: string;
    captionModerationText?: string;
    captionSenderName?: string;
    layout?: BoxLayout;
    onClosebutton?: () => void;
    onFbShare?: () => void;
    onMakeOwnButton?: () => void;
    onNextButton?: () => void;
    onPreviousButton?: () => void;
    onRemovebutton?: () => void;
    onReportButton?: () => void;
    onSenderNameButton?: () => void;
    onShareButton?: () => void;
    onTwitterShare?: () => void;
    srcFacebookIcon?: string;
    srcImageLoader?: string;
    srcTwitterIcon?: string;
    visibleCaptionContainer?: boolean;
    visibleMakeOwnButton?: boolean;
    visiblePhotoWidgetBg?: boolean;
    visibleShareArea?: boolean;
    visibleShareButtonContainer?: boolean;
}

export const StoriesImageWidgetLayout = ({ captionCaptionText, captionCreationDate, captionModerationText, captionSenderName, layout, onClosebutton, onFbShare, onMakeOwnButton, onNextButton, onPreviousButton, onRemovebutton, onReportButton, onSenderNameButton, onShareButton, onTwitterShare, srcFacebookIcon, srcImageLoader, srcTwitterIcon, visibleCaptionContainer, visibleMakeOwnButton, visiblePhotoWidgetBg, visibleShareArea, visibleShareButtonContainer }: StoriesImageWidgetLayoutProps) => {
    const t = useTranslation();
    const [ urlFieldValue, setUrlFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 502, height: 455, ...layout }}>
            <Region
                params={33025}
                layout={{ position: 'absolute', left: 0, width: 502, top: 0, height: 455 }}
            >
                <Region
                    visible={visiblePhotoWidgetBg ?? false}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Border
                        variant="2"
                        name="photo_widget_bg"
                        params={2192}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Border
                    variant="1"
                    name="bgBorder"
                    params={147472}
                    tintColor="#000000"
                    blend={0.65}
                    layout={{ position: 'absolute', left: 13, width: 340, top: 13, height: 43 }}
                />
                <ThemeImage
                    name="imageLoader"
                    params={272}
                    src={srcImageLoader}
                    layout={{ position: 'absolute', left: 0, width: 322, top: 0, height: 322 }}
                />
                <Region
                    name="moderationText"
                    params={147473}
                    visible={false}
                    layout={{ position: 'absolute', left: 87, width: 129, top: 74, height: 16, minWidth: 308, maxWidth: 308, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionModerationText ?? t('camera.photo.moderated')}
                        textStyle="text-style-id-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 129 }}
                    />
                </Region>
                <Region
                    name="buttonContainer"
                    params={147472}
                    layout={{ position: 'absolute', left: 27, width: 84, top: 68, height: 40 }}
                >
                    <Region
                        name="reportButtonContainer"
                        params={16}
                        layout={{ position: 'absolute', left: 8, width: 20, top: 5, height: 25 }}
                    >
                        <Button
                            variant="5"
                            name="reportButton"
                            params={131089}
                            tintColor="#de4537"
                            onPointerTap={onReportButton}
                            layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 20, minWidth: 19, maxWidth: 19 }}
                        />
                        <ThemeImage
                            params={16}
                            src={layoutImage('icons_flag.png')}
                            layout={{ position: 'absolute', left: 3, width: 14, top: 3, height: 16 }}
                        />
                    </Region>
                    <Region
                        name="removeButtonContainer"
                        params={16}
                        layout={{ position: 'absolute', left: 33, width: 19, top: 5, height: 24 }}
                    >
                        <Button
                            variant="5"
                            name="removebutton"
                            params={131089}
                            tintColor="#de4537"
                            onPointerTap={onRemovebutton}
                            layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 20, minWidth: 19, maxWidth: 19 }}
                        />
                        <ThemeImage
                            tags={[ '#icon' ]}
                            params={16}
                            src={layoutImage('common_trashcan_small.png')}
                            layout={{ position: 'absolute', left: 3, width: 14, top: 4, height: 11 }}
                        />
                    </Region>
                    <CloseButton
                        variant="3"
                        name="closebutton"
                        params={131089}
                        tintColor="#de4537"
                        onPointerTap={onClosebutton}
                        layout={{ position: 'absolute', left: 57, width: 19, top: 5, height: 28, minWidth: 19, maxWidth: 19 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 81, width: 3, top: 5, height: 35 }}
                    />
                </Region>
                <Region
                    visible={visibleMakeOwnButton ?? false}
                    layout={{ position: 'absolute', left: 84, width: 176, top: 8, height: 28 }}
                >
                    <Button
                        variant="5"
                        name="makeOwnButton"
                        params={131089}
                        tintColor="#4eaac1"
                        onPointerTap={onMakeOwnButton}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        {t('inventory.create_own_card')}
                    </Button>
                </Region>
                <Region
                    name="shareButtonContainer"
                    params={16}
                    visible={visibleShareButtonContainer ?? false}
                    layout={{ position: 'absolute', left: 84, width: 26, top: 8, height: 28 }}
                >
                    <Button
                        variant="5"
                        name="shareButton"
                        tooltip={t('info.share.button')}
                        params={131089}
                        tintColor="#4eaac1"
                        onPointerTap={onShareButton}
                        layout={{ position: 'absolute', left: 0, width: 24, top: 0, height: 28 }}
                    />
                    <ThemeImage
                        params={16}
                        src={layoutImage('icons_share.png')}
                        layout={{ position: 'absolute', left: 4, width: 22, top: 4, height: 20 }}
                    />
                </Region>
                <Region
                    visible={visibleShareArea ?? false}
                    layout={{ position: 'absolute', left: 13, width: 218, top: 65, height: 116 }}
                >
                    <Border
                        variant="2"
                        name="shareArea"
                        params={147472}
                        tintColor="#24231e"
                        blend={0.7}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            params={147472}
                            layout={{ position: 'absolute', left: 0, width: 218, top: 0, height: 116 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 8, width: 200, top: 8, height: 17, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('info.share.link.info')}
                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 200 }}
                                />
                            </Region>
                            <TextInput
                                value={urlFieldValue}
                                onChange={setUrlFieldValue}
                                layout={{ position: 'absolute', left: 8, width: 200, top: 30, height: 17, minWidth: 200, maxWidth: 200 }}
                            />
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 8, width: 200, top: 52, height: 17, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('info.share.button.info')}
                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 200 }}
                                />
                            </Region>
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 8, width: 200, top: 74, height: 32, minWidth: 200 }}
                            >
                                <Region
                                    name="fbShare"
                                    params={131073}
                                    onPointerTap={onFbShare}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32, minWidth: 32, minHeight: 32 }}
                                >
                                    <ThemeImage
                                        name="facebookIcon"
                                        tags={[ '#icon' ]}
                                        params={16}
                                        src={srcFacebookIcon ?? layoutImage('icons_facebook.png')}
                                        layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32, minWidth: 32, minHeight: 32 }}
                                    />
                                </Region>
                                <Region
                                    name="twitterShare"
                                    params={131073}
                                    onPointerTap={onTwitterShare}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 38, width: 32, top: 0, height: 32, minWidth: 32, minHeight: 32 }}
                                >
                                    <ThemeImage
                                        name="twitterIcon"
                                        tags={[ '#icon' ]}
                                        params={16}
                                        src={srcTwitterIcon ?? layoutImage('icons_twitter.png')}
                                        layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32, minWidth: 32, minHeight: 32 }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 8, width: 210, top: 111, height: 5 }}
                            />
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="senderNameButton"
                    params={147473}
                    onPointerTap={onSenderNameButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 129, top: 0, height: 26 }}
                >
                    <Region
                        name="senderName"
                        params={262160}
                        layout={{ position: 'absolute', right: 0, width: 129, top: 2, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionSenderName ?? 'Sent by Joopekki-xxOO'}
                            textStyle="text-style-id-link-regular"
                        />
                    </Region>
                </Region>
                <Region
                    name="name_copy_wrapper"
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 28 }}
                />
                <Region
                    name="creationDate"
                    params={16}
                    layout={{ position: 'absolute', left: 38, width: 91, top: 17, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCreationDate ?? '10.4.2014 15:44'}
                        textStyle="text-style-id-regular"
                    />
                </Region>
                <Region
                    name="nextButton"
                    params={131089}
                    onPointerTap={onNextButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 300, width: 64, top: 80, height: 64 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('camera_browse_ffwd.png')}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 64 }}
                    />
                </Region>
                <Region
                    name="previousButton"
                    params={131089}
                    onPointerTap={onPreviousButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 240, width: 64, top: 80, height: 64 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('camera_browse_ffwd.png')}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 64 }}
                    />
                </Region>
                <Region
                    visible={visibleCaptionContainer ?? false}
                    layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 60 }}
                >
                    <Border
                        variant="4"
                        name="captionContainer"
                        params={16}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            name="captionText"
                            params={16}
                            layout={{ position: 'absolute', left: 5, width: 310, top: 5, height: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCaptionText ?? ''}
                                textOptions={{ wordWrap: true, wordWrapWidth: 310 }}
                            />
                        </Region>
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};
