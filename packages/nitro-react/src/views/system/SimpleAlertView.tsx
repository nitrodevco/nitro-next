import { Container as PixiContainer } from 'pixi.js';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { ButtonThick, Frame, LayoutImage, ModalDialog, Region, ThemeImage, ThemeText, useLayoutSize } from '#base/theme';

export interface SimpleAlertViewProps {
    /** The dialog's id in the system store, which names its frame. */
    id: number;
    /** `caption` of the frame, as shown. */
    caption: string;
    /** The red heading over the message; left out or empty, `subtitle` is disposed. */
    subtitle?: string;
    /** The `formatted_text` message, as shown. */
    message: string;
    /** The link's caption; left out, `link` is disposed. */
    linkTitle?: string;
    onLink?: () => void;
    /** The `illustration` bitmap's asset (`assetUri`); left out, it is disposed. */
    illustration?: string;
    /** `close_button`. */
    onClose: () => void;
}

/** `simple_alert`'s own width, and its `list`'s. */
const WINDOW_WIDTH = 310;
const LIST_WIDTH = 290;
/** `SimpleAlertDialog.WINDOW_MARGIN`. */
const WINDOW_MARGIN = 10;
/** `close_button`'s x in the 290 wide `list_bottom`; it is `relative_horizontal_scale_center`. */
const CLOSE_BUTTON_X = 82;

/**
 * `IHabboWindowManager.simpleAlert` - `SimpleAlertDialog` on the window manager's `simple_alert`
 * layout: a style 3 frame tinted `0x418db0` (margins 1, 30, 1, 1) whose header close button is
 * disposed, holding the `list` at (10, 8) - `list_top` (the `il_heading_1` subtitle in
 * `0xc30000`, then the `formatted_text` message, 291 wide with an 8px bottom margin), 3px of
 * spacing, and `list_bottom` (the separator, 5px, the 126 wide `close_button`, 5px, and the
 * underlined `link`, 262 wide at x 14, centred, with a 5px bottom margin). The subtitle, link and
 * illustration are each disposed when the alert has none.
 * `onIllustrationResized` moves `list_top` right of the illustration and widens `list_bottom` and
 * the window to match; `resizeWindow` then makes the window `list.height + 40` high and centres it.
 * Flash builds it with `buildModalDialogFromXML`, so it is a `ModalDialog`: centred over the
 * darkened desktop, which takes the clicks.
 *
 * Drawn by `SystemDialogsView` for every `simpleAlert` the system store holds.
 */
export const SimpleAlertView = ({ id, caption, subtitle, message, linkTitle, onLink, illustration, onClose }: SimpleAlertViewProps) => {
    const t = useTranslation();
    const [ illustrationNode, setIllustrationNode ] = useState<PixiContainer | null>(null);
    const [ listNode, setListNode ] = useState<PixiContainer | null>(null);
    const illustrationSize = useLayoutSize(illustrationNode);
    const listSize = useLayoutSize(listNode);
    // `onIllustrationResized` only runs once the bitmap has its size.
    const hasIllustration = !!illustration && (illustrationSize.width > 0);
    const listTopX = hasIllustration ? (illustrationSize.width + WINDOW_MARGIN) : 0;
    const listBottomWidth = listTopX + LIST_WIDTH;
    const width = hasIllustration ? (listBottomWidth + (2 * WINDOW_MARGIN)) : WINDOW_WIDTH;
    const height = (listSize.height > 0) ? (Math.ceil(listSize.height) + 40) : 163;

    return (
        <ModalDialog>
            <Frame
                variant="3"
                id={`simple-alert-${id}`}
                caption={caption}
                tintColor="#418db0"
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                rememberPosition={false}
                resizeDirection="none"
                margins={[ 1, 30, 1, 1 ]}
                layout={{ width, height }}
            >
                {illustration && (
                    <ThemeImage
                        ref={setIllustrationNode}
                        src={illustration}
                        bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                        layout={{ position: 'absolute', left: 10, top: 8 }}
                    />
                )}
                <Region
                    ref={setListNode}
                    layout={{ position: 'absolute', left: 10, top: 8, width: LIST_WIDTH, flexDirection: 'column', gap: 3 }}
                >
                    <Region layout={{
                        width: LIST_WIDTH, marginLeft: listTopX, flexShrink: 0, flexDirection: 'column',
                        ...(hasIllustration && { minHeight: illustrationSize.height + WINDOW_MARGIN }),
                    }}
                    >
                        {!!subtitle && (
                            <ThemeText
                                text={subtitle}
                                textStyle="il_heading_1"
                                textOptions={{ fill: '#c30000' }}
                                verticalAlign="top"
                                layout={{ flexShrink: 0 }}
                            />
                        )}
                        <Region layout={{ width: 291, flexShrink: 0, paddingBottom: 8 }}>
                            <ThemeText
                                text={message}
                                textStyle="il_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 287 }}
                                markup
                                verticalAlign="top"
                            />
                        </Region>
                    </Region>
                    <Region layout={{ width: listBottomWidth, flexShrink: 0, flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
                        <ThemeImage
                            src={LayoutImage('shared/illumina_horizontal_separator.png')}
                            bitmap={{ stretchedY: false, pivot: 'bottom center' }}
                            layout={{ width: 1000, height: 13, flexShrink: 0 }}
                        />
                        <ButtonThick
                            variant="3"
                            tintColor="#efefef"
                            onPointerTap={onClose}
                            layout={{ marginLeft: CLOSE_BUTTON_X + ((listBottomWidth - LIST_WIDTH) / 2), minWidth: 126, height: 28, flexShrink: 0, alignSelf: 'flex-start' }}
                        >
                            {t('alert.close.button')}
                        </ButtonThick>
                        {!!linkTitle && (
                            <Region
                                cursor="pointer"
                                onPointerTap={onLink}
                                layout={{ width: 262, marginLeft: 14, flexShrink: 0, flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}
                            >
                                <ThemeText
                                    text={linkTitle}
                                    textStyle="il_regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 258, align: 'center' }}
                                    flashFormat={{ underline: true }}
                                    verticalAlign="top"
                                />
                            </Region>
                        )}
                    </Region>
                </Region>
            </Frame>
        </ModalDialog>
    );
};
