import { ReactNode } from 'react';

import { Border, BoxLayout, Region, Shape, ThemeText } from '#base/theme';

/** Named region `header` of HabbiconHubLayout - configured through the parent's `header` prop. */
export interface HabbiconHubLayoutHeaderProps {
    captionSetDescription?: string;
    captionSetProgressText?: string;
    captionSetTitle?: string;
    highlight?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHeader = ({ captionSetDescription, captionSetProgressText, captionSetTitle, highlight, layout }: HabbiconHubLayoutHeaderProps) => {
    return (
        <Region
            name="header"
            layout={{ position: 'absolute', left: 0, right: 0, top: 2, height: 92, ...layout }}
        >
            <Border
                variant="10"
                name="bg1"
                tintColor="#e0cba6"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 1 }}
            />
            <Region
                name="set_title"
                layout={{ position: 'absolute', left: 12, right: 138, top: 8, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSetTitle ?? 'Habbicon set name'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#2b2b2b' }}
                />
            </Region>
            <Region
                name="set_description"
                layout={{ position: 'absolute', left: 13, right: 8, top: 31, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSetDescription ?? 'sdfg fdgfd gfsdgdfs ggfdfg fdfgfsdg fsdgfsdgfsd gdfg sdfgfsd gfdsgfsdgfsdgdf dfg d gsfdsf'}
                    textOptions={{ fill: '#3b3b3b', wordWrap: true, wordWrapWidth: 359 }}
                />
            </Region>
            <Region
                name="set_progress_container"
                layout={{ position: 'absolute', left: 14, right: 136, top: 62, height: 22 }}
            >
                <Region
                    name="set_progress_bar"
                    layout={{ position: 'absolute', left: 0, width: 154, top: 3, height: 16 }}
                >
                    <Shape
                        name="background"
                        shape="round_rectangle"
                        color="#4d5d66"
                        strokeThickness={1}
                        radius={6}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 16 }}
                    />
                    <Region
                        name="progress"
                        layout={{ position: 'absolute', left: 0, width: 1, top: 0, bottom: 0 }}
                    >
                        <Shape
                            name="fill"
                            shape="round_rectangle"
                            color="#54a8e8"
                            strokeThickness={1}
                            radius={6}
                            layout={{ position: 'absolute', left: 0, right: -153, top: 0, height: 16 }}
                        />
                        <Region
                            name="highlight"
                            blendMode="add"
                            layout={{ position: 'absolute', left: 1, right: -152, top: 1, height: 5 }}
                        >
                            {highlight}
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="set_progress_text"
                    layout={{ position: 'absolute', left: 164, width: 28, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSetProgressText ?? '0 / 0'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#2b2b2b' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
