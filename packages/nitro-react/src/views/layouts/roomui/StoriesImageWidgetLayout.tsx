import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1061_stories_image_widget_xml` (layout "stories_image_widget", 502x455) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StoriesImageWidgetLayoutProps {
    buttonContainer?: StoriesImageWidgetLayoutButtonContainerProps;
    captionCaptionText?: string;
    captionCreationDate?: string;
    captionModerationText?: string;
    captionSenderName?: string;
    layout?: BoxLayout;
    onFbShare?: () => void;
    onMakeOwnButton?: () => void;
    onNextButton?: () => void;
    onPreviousButton?: () => void;
    onSenderNameButton?: () => void;
    onShareButton?: () => void;
    onTwitterShare?: () => void;
    srcFacebookIcon?: string;
    srcImageLoader?: string;
    srcTwitterIcon?: string;
    visibleCaptionContainer?: boolean;
    visibleMakeOwnButton?: boolean;
    visibleModerationText?: boolean;
    visiblePhotoWidgetBg?: boolean;
    visibleShareArea?: boolean;
    visibleShareButtonContainer?: boolean;
}

export const StoriesImageWidgetLayout = ({ buttonContainer, captionCaptionText, captionCreationDate, captionModerationText, captionSenderName, layout, onFbShare, onMakeOwnButton, onNextButton, onPreviousButton, onSenderNameButton, onShareButton, onTwitterShare, srcFacebookIcon, srcImageLoader, srcTwitterIcon, visibleCaptionContainer, visibleMakeOwnButton, visibleModerationText, visiblePhotoWidgetBg, visibleShareArea, visibleShareButtonContainer }: StoriesImageWidgetLayoutProps) => {
    const t = useTranslation();
    const [ urlFieldValue, setUrlFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 502, height: 455, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 502, top: 0, height: 455 }}>
                {(visiblePhotoWidgetBg ?? false) && (
                    <Border
                        variant="2"
                        name="photo_widget_bg"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                )}
                <Border
                    variant="1"
                    name="bgBorder"
                    tintColor="#000000"
                    blend={0.65}
                    layout={{ position: 'absolute', left: 13, width: 340, top: 13, height: 43 }}
                />
                <ThemeImage
                    name="imageLoader"
                    src={srcImageLoader}
                    layout={{ position: 'absolute', left: 0, width: 322, top: 0, height: 322 }}
                />
                {(visibleModerationText ?? false) && (
                    <Region
                        name="moderationText"
                        layout={{ position: 'absolute', left: 87, width: 129, top: 74, height: 16, minWidth: 308, maxWidth: 308, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionModerationText ?? t('camera.photo.moderated')}
                            textStyle="text-style-id-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 129 }}
                        />
                    </Region>
                )}
                <StoriesImageWidgetLayoutButtonContainer {...buttonContainer} />
                {(visibleMakeOwnButton ?? false) && (
                    <Button
                        variant="5"
                        name="makeOwnButton"
                        tintColor="#4eaac1"
                        onPointerTap={onMakeOwnButton}
                        layout={{ position: 'absolute', left: 84, width: 176, top: 8, height: 28 }}
                    >
                        {t('inventory.create_own_card')}
                    </Button>
                )}
                {(visibleShareButtonContainer ?? false) && (
                    <Region
                        name="shareButtonContainer"
                        layout={{ position: 'absolute', left: 84, width: 26, top: 8, height: 28 }}
                    >
                        <Button
                            variant="5"
                            name="shareButton"
                            tooltip={t('info.share.button')}
                            tintColor="#4eaac1"
                            onPointerTap={onShareButton}
                            layout={{ position: 'absolute', left: 0, width: 24, top: 0, height: 28 }}
                        />
                        <ThemeImage
                            src={layoutImage('icons_share.png')}
                            layout={{ position: 'absolute', left: 4, width: 22, top: 4, height: 20 }}
                        />
                    </Region>
                )}
                {(visibleShareArea ?? false) && (
                    <Border
                        variant="2"
                        name="shareArea"
                        tintColor="#24231e"
                        blend={0.7}
                        layout={{ position: 'absolute', left: 13, width: 218, top: 65, height: 116 }}
                    >
                        <Region layout={{ position: 'absolute', left: 0, width: 218, top: 0, height: 116 }}>
                            <Region layout={{ position: 'absolute', left: 8, width: 200, top: 8, height: 17, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
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
                            <Region layout={{ position: 'absolute', left: 8, width: 200, top: 52, height: 17, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <ThemeText
                                    text={t('info.share.button.info')}
                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 200 }}
                                />
                            </Region>
                            <Region layout={{ position: 'absolute', left: 8, width: 200, top: 74, height: 32, minWidth: 200 }}>
                                <Region
                                    name="fbShare"
                                    onPointerTap={onFbShare}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32, minWidth: 32, minHeight: 32 }}
                                >
                                    <ThemeImage
                                        name="facebookIcon"
                                        src={srcFacebookIcon ?? layoutImage('icons_facebook.png')}
                                        layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32, minWidth: 32, minHeight: 32 }}
                                    />
                                </Region>
                                <Region
                                    name="twitterShare"
                                    onPointerTap={onTwitterShare}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 38, width: 32, top: 0, height: 32, minWidth: 32, minHeight: 32 }}
                                >
                                    <ThemeImage
                                        name="twitterIcon"
                                        src={srcTwitterIcon ?? layoutImage('icons_twitter.png')}
                                        layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32, minWidth: 32, minHeight: 32 }}
                                    />
                                </Region>
                            </Region>
                            <Region layout={{ position: 'absolute', left: 8, width: 210, top: 111, height: 5 }} />
                        </Region>
                    </Border>
                )}
                <Region
                    name="senderNameButton"
                    onPointerTap={onSenderNameButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 129, top: 0, height: 26 }}
                >
                    <Region
                        name="senderName"
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
                    layout={{ position: 'absolute', left: 38, width: 91, top: 17, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCreationDate ?? '10.4.2014 15:44'}
                        textStyle="text-style-id-regular"
                    />
                </Region>
                <Region
                    name="nextButton"
                    onPointerTap={onNextButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 300, width: 64, top: 80, height: 64 }}
                >
                    <ThemeImage
                        src={layoutImage('camera_browse_ffwd.png')}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 64 }}
                    />
                </Region>
                <Region
                    name="previousButton"
                    onPointerTap={onPreviousButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 240, width: 64, top: 80, height: 64 }}
                >
                    <ThemeImage
                        src={layoutImage('camera_browse_ffwd.png')}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 64 }}
                    />
                </Region>
                {(visibleCaptionContainer ?? false) && (
                    <Border
                        variant="4"
                        name="captionContainer"
                        layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 60 }}
                    >
                        <Region
                            name="captionText"
                            layout={{ position: 'absolute', left: 5, width: 310, top: 5, height: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCaptionText ?? ''}
                                textOptions={{ wordWrap: true, wordWrapWidth: 310 }}
                            />
                        </Region>
                    </Border>
                )}
            </Region>
        </Region>
    );
};

/** Named region `buttonContainer` of StoriesImageWidgetLayout - configured through the parent's `buttonContainer` prop. */
export interface StoriesImageWidgetLayoutButtonContainerProps {
    layout?: BoxLayout;
    onClosebutton?: () => void;
    onRemovebutton?: () => void;
    onReportButton?: () => void;
}

export const StoriesImageWidgetLayoutButtonContainer = ({ layout, onClosebutton, onRemovebutton, onReportButton }: StoriesImageWidgetLayoutButtonContainerProps) => {
    return (
        <Region
            name="buttonContainer"
            layout={{ position: 'absolute', left: 27, width: 84, top: 68, height: 40, ...layout }}
        >
            <Region
                name="reportButtonContainer"
                layout={{ position: 'absolute', left: 8, width: 20, top: 5, height: 25 }}
            >
                <Button
                    variant="5"
                    name="reportButton"
                    tintColor="#de4537"
                    onPointerTap={onReportButton}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 20, minWidth: 19, maxWidth: 19 }}
                />
                <ThemeImage
                    src={layoutImage('icons_flag.png')}
                    layout={{ position: 'absolute', left: 3, width: 14, top: 3, height: 16 }}
                />
            </Region>
            <Region
                name="removeButtonContainer"
                layout={{ position: 'absolute', left: 33, width: 19, top: 5, height: 24 }}
            >
                <Button
                    variant="5"
                    name="removebutton"
                    tintColor="#de4537"
                    onPointerTap={onRemovebutton}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 20, minWidth: 19, maxWidth: 19 }}
                />
                <ThemeImage
                    src={layoutImage('common_trashcan_small.png')}
                    layout={{ position: 'absolute', left: 3, width: 14, top: 4, height: 11 }}
                />
            </Region>
            <CloseButton
                variant="3"
                name="closebutton"
                tintColor="#de4537"
                onPointerTap={onClosebutton}
                layout={{ position: 'absolute', left: 57, width: 19, top: 5, height: 28, minWidth: 19, maxWidth: 19 }}
            />
            <Region layout={{ position: 'absolute', left: 81, width: 3, top: 5, height: 35 }} />
        </Region>
    );
};
