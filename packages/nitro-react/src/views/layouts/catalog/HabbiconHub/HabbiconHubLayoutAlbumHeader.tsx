import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, Shape, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `album_header` of HabbiconHubLayout - configured through the parent's `albumHeader` prop. */
export interface HabbiconHubLayoutAlbumHeaderProps {
    captionAlbumProgressText?: string;
    captionAlbumSubtitle?: string;
    captionAlbumTitle?: string;
    captionOwnedHabbiconsLabel?: string;
    captionOwnedHabbiconsValue?: string;
    captionSetsCompletedLabel?: string;
    captionSetsCompletedValue?: string;
    highlight?: ReactNode;
    layout?: BoxLayout;
    srcAlbumHeaderPattern?: string;
    srcAlbumLogo?: string;
}

export const HabbiconHubLayoutAlbumHeader = ({ captionAlbumProgressText, captionAlbumSubtitle, captionAlbumTitle, captionOwnedHabbiconsLabel, captionOwnedHabbiconsValue, captionSetsCompletedLabel, captionSetsCompletedValue, highlight, layout, srcAlbumHeaderPattern, srcAlbumLogo }: HabbiconHubLayoutAlbumHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="album_header"
            backgroundColor="#2b7aa0"
            layout={{ position: 'absolute', left: -2, right: 4, top: -3, height: 110, ...layout }}
        >
            <Border
                variant="3"
                name="album_header_background"
                tintColor="#1f5d78"
                layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 106 }}
            >
                <ThemeImage
                    name="album_header_pattern"
                    src={srcAlbumHeaderPattern ?? layoutImage('bg_pattern_001.png')}
                    layout={{ position: 'absolute', left: -1, right: 1, top: 2, height: 110 }}
                />
                <ThemeImage
                    name="album_logo"
                    src={srcAlbumLogo ?? layoutImage('habbicons_habbicons_logo.png')}
                    layout={{ position: 'absolute', left: 18, width: 66, top: 20, height: 70 }}
                />
                <Region
                    name="album_title"
                    layout={{ position: 'absolute', left: 100, width: 95, top: 14, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAlbumTitle ?? t('habbicons.hud.title')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="album_subtitle"
                    layout={{ position: 'absolute', left: 100, width: 220, top: 39, height: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAlbumSubtitle ?? t('habbicon_book.subtitle')}
                        textOptions={{ fill: '#d7efe5', wordWrap: true, wordWrapWidth: 220 }}
                    />
                </Region>
                <Border
                    variant="7"
                    name="owned_habbicons_stat"
                    tintColor="#41aad3"
                    layout={{ position: 'absolute', left: 331, width: 102, top: 12, height: 42 }}
                >
                    <Region
                        name="owned_habbicons_label"
                        layout={{ position: 'absolute', left: 6, right: 6, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionOwnedHabbiconsLabel ?? t('habbicons.owned.description')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="owned_habbicons_value"
                        layout={{ position: 'absolute', left: 6, right: 6, top: 20, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionOwnedHabbiconsValue ?? '0'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Border>
                <Border
                    variant="7"
                    name="sets_completed_stat"
                    tintColor="#41aad3"
                    layout={{ position: 'absolute', left: 443, width: 102, top: 12, height: 42 }}
                >
                    <Region
                        name="sets_completed_label"
                        layout={{ position: 'absolute', left: 6, right: 6, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionSetsCompletedLabel ?? t('habbicon_book.sets_completed')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="sets_completed_value"
                        layout={{ position: 'absolute', left: 6, right: 6, top: 20, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionSetsCompletedValue ?? '0'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Border>
                <Region
                    name="album_progress_container"
                    layout={{ position: 'absolute', left: 102, width: 452, top: 76, height: 24 }}
                >
                    <Region
                        name="album_progress_bar"
                        layout={{ position: 'absolute', left: 0, width: 304, top: 3, height: 18 }}
                    >
                        <Shape
                            name="background"
                            shape="round_rectangle"
                            color="#17394d"
                            strokeThickness={1}
                            radius={6}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                        <Region
                            name="progress"
                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, bottom: 0 }}
                        >
                            <Shape
                                name="fill"
                                shape="round_rectangle"
                                color="#54a8e8"
                                strokeThickness={1}
                                radius={6}
                                layout={{ position: 'absolute', left: 0, right: -303, top: 0, bottom: 0 }}
                            />
                            <Region
                                name="highlight"
                                blendMode="add"
                                layout={{ position: 'absolute', left: 1, right: -302, top: 1, height: 6 }}
                            >
                                {highlight}
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="album_progress_text"
                        layout={{ position: 'absolute', left: 312, width: 28, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAlbumProgressText ?? '0 / 0'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
