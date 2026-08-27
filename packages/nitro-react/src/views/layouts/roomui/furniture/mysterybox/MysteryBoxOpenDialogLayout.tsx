import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `850_mystery_box_open_dialog_xml` (layout "mystery_box_open_dialog", 361x271) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MysteryBoxOpenDialogLayoutProps {
    captionSubtitleText?: string;
    captionWaitingText?: string;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onClose?: () => void;
    srcNeededBase?: string;
    srcNeededOverlay?: string;
    srcRewardBase?: string;
    srcRewardOverlay?: string;
}

export const MysteryBoxOpenDialogLayout = ({ captionSubtitleText, captionWaitingText, layout, onCancelButton, onClose, srcNeededBase, srcNeededOverlay, srcRewardBase, srcRewardOverlay }: MysteryBoxOpenDialogLayoutProps) => {
    return (
        <Frame
            variant="100"
            id="title_text"
            name="title_text"
            params={1}
            caption="Mystery Box"
            onClose={onClose}
            layout={{ width: 361, height: 271, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    params={16}
                    src="${image.library.url}Quests/ach_receive_star.png"
                    layout={{ position: 'absolute', left: 7, width: 109, top: 8, height: 109 }}
                />
                <ThemeImage
                    name="reward_base"
                    params={16}
                    src={srcRewardBase ?? layoutImage('mysterybox_box_base.png')}
                    layout={{ position: 'absolute', left: 41, width: 39, top: 43, height: 39 }}
                />
                <ThemeImage
                    name="reward_overlay"
                    params={16}
                    src={srcRewardOverlay ?? layoutImage('mysterybox_box_overlay.png')}
                    layout={{ position: 'absolute', left: 41, width: 39, top: 43, height: 39 }}
                />
                <Region
                    name="subtitle_text"
                    params={16}
                    layout={{ position: 'absolute', left: 115, width: 201, top: 34, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSubtitleText ?? 'You have started opening the box.'}
                        textStyle="text-style-il-heading-2"
                    />
                </Region>
                <Border
                    variant="102"
                    params={208}
                    layout={{ position: 'absolute', left: '50%', marginLeft: -156.5, width: 310, top: 123, height: 60 }}
                >
                    <ThemeImage
                        name="needed_base"
                        params={16}
                        src={srcNeededBase ?? layoutImage('mysterybox_key_base.png')}
                        layout={{ position: 'absolute', left: 14, width: 39, top: 11, height: 39 }}
                    />
                    <ThemeImage
                        name="needed_overlay"
                        params={16}
                        src={srcNeededOverlay ?? layoutImage('mysterybox_key_overlay.png')}
                        layout={{ position: 'absolute', left: 14, width: 39, top: 11, height: 39 }}
                    />
                    <Region
                        name="waiting_text"
                        params={3088}
                        layout={{ position: 'absolute', left: 62, width: 228, top: '50%', marginTop: -8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionWaitingText ?? 'Waiting for the other user to insert the key.'} />
                    </Region>
                </Border>
                <Button
                    variant="101"
                    name="cancel_button"
                    params={131281}
                    tintColor="#bbbbbb"
                    onPointerTap={onCancelButton}
                    layout={{ position: 'absolute', left: '50%', marginLeft: -63.5, width: 124, top: 186, height: 48 }}
                >
                    Cancel opening
                </Button>
            </Region>
        </Frame>
    );
};
