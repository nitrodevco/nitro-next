import { Border, Box, Frame, ThemeImage, ThemeText } from '#base/theme';

export interface FurnitureExternalImageViewProps {
    imageUrl: string;
    creatorName: string;
    /** Milliseconds since the epoch; 0 for a photo that never carried one. */
    time: number;
    caption: string;
    onClose: () => void;
}

/**
 * A photo hung on the wall, on the `stories_image_widget` layout: the picture, who took it and
 * when, and whatever they wrote under it.
 *
 * Flash also offered to report the photo, share its link and open the photographer's profile.
 * Each of those is a window the port has yet to build, so the photo is shown and no more.
 *
 * The frame carries no caption: `stories_image_widget` is a bare container with no title text, so
 * Flash named the photo nowhere but in its own labels.
 */
export const FurnitureExternalImageView = ({ imageUrl, creatorName, time, caption, onClose }: FurnitureExternalImageViewProps) => {
    const date = time ? new Date(time) : undefined;

    return (
        <Frame
            variant="0"
            id="furniture-external-image"
            onClose={onClose}
            defaultPosition={{ x: 110, y: 70 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 340, height: 400 }}
        >
            <Border layout={{ flex: 1, flexDirection: 'column', gap: 6, padding: 6 }}>
                <ThemeImage
                    src={imageUrl}
                    layout={{ width: 320, height: 320 }}
                />
                {!!caption.length && (
                    <ThemeText
                        text={caption}
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 320 }}
                        verticalAlign="top"
                    />
                )}
                <Box layout={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ThemeText
                        text={creatorName}
                        textStyle="bold"
                    />
                    {date && (
                        <ThemeText text={`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`} />
                    )}
                </Box>
            </Border>
        </Frame>
    );
};
