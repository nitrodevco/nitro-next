import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `999_trophy_xml` (layout "trophy_general", 340x173) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TrophyLayoutProps {
    layout?: BoxLayout;
    trophyContainer?: TrophyLayoutTrophyContainerProps;
}

export const TrophyLayout = ({ layout, trophyContainer }: TrophyLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 340, height: 173, ...layout }}>
            <TrophyLayoutTrophyContainer {...trophyContainer} />
        </Region>
    );
};

/** Named region `trophy_container` of TrophyLayout - configured through the parent's `trophyContainer` prop. */
export interface TrophyLayoutTrophyContainerProps {
    captionDate?: string;
    captionGreeting?: string;
    captionName?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onTrophyContainer?: () => void;
    srcTrophyBg?: string;
}

export const TrophyLayoutTrophyContainer = ({ captionDate, captionGreeting, captionName, captionTitle, layout, onClose, onTrophyContainer, srcTrophyBg }: TrophyLayoutTrophyContainerProps) => {
    return (
        <Region
            name="trophy_container"
            onPointerTap={onTrophyContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 173, ...layout }}
        >
            <ThemeImage
                name="trophy_bg"
                src={srcTrophyBg}
                layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 173 }}
            />
            <Region
                name="greeting"
                layout={{ position: 'absolute', left: 22, width: 297, top: 25, height: 116, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionGreeting ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet justo sagittis orci dapibus semper sagittis id neque. Nunc sed quam vitae felis semper neque. Nunc sed quam vitae felis semper neque. Nunc sed quam vitae felis semper neque. Nunc sed quam vitae felis semper neque. Nunc sed quam vitae felis semper  semper  semper  semper  semper  semper  semper  sempeaaaaaa'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 297 }}
                />
            </Region>
            <Region
                name="date"
                layout={{ position: 'absolute', left: 21, width: 83, top: 142, height: 18, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDate ?? 'da.te.'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 83 }}
                />
            </Region>
            <Region
                name="name"
                layout={{ position: 'absolute', right: 20, width: 74, top: 142, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionName ?? 'kateislonger'} />
            </Region>
            <Region
                name="close"
                onPointerTap={onClose}
                cursor="pointer"
                layout={{ position: 'absolute', left: 318, width: 18, top: 3, height: 20 }}
            />
            <Region
                name="title_bg"
                backgroundColor="#ff0000"
                layout={{ position: 'absolute', left: 110, width: 120, top: 4, height: 18, justifyContent: 'center' }}
            >
                <Region
                    name="title"
                    layout={{ position: 'absolute', width: 120, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTitle ?? 'Trophy'}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
