import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `header` of MainWindow_1503Layout - configured through the parent's `header` prop. */
export interface MainWindow_1503LayoutHeaderProps {
    captionCaptionText?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    srcArrowDownBlack?: string;
    srcArrowDownWhite?: string;
    srcArrowRightBlack?: string;
    srcArrowRightWhite?: string;
    srcHdrFriends?: string;
    srcHdrHilite?: string;
    tintArrowDownBlack?: string;
    tintArrowDownWhite?: string;
    tintArrowRightBlack?: string;
    tintArrowRightWhite?: string;
    tintHdrFriends?: string;
    tintHdrHilite?: string;
}

export const MainWindow_1503LayoutHeader = ({ captionCaptionText, layout, onHeader, srcArrowDownBlack, srcArrowDownWhite, srcArrowRightBlack, srcArrowRightWhite, srcHdrFriends, srcHdrHilite, tintArrowDownBlack, tintArrowDownWhite, tintArrowRightBlack, tintArrowRightWhite, tintHdrFriends, tintHdrHilite }: MainWindow_1503LayoutHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="hdr_hilite"
                src={srcHdrHilite}
                tint={tintHdrHilite}
                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
            />
            <ThemeImage
                name="hdr_friends"
                src={srcHdrFriends}
                tint={tintHdrFriends}
                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
            />
            <Region
                name="caption_text"
                layout={{ position: 'absolute', left: 4, width: 219, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCaptionText ?? `${t('friendlist.friends')} (0)`}
                    textOptions={{ fill: '#626262' }}
                />
            </Region>
            <ThemeImage
                name="arrow_down_black"
                src={srcArrowDownBlack}
                tint={tintArrowDownBlack}
                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
            />
            <ThemeImage
                name="arrow_right_black"
                src={srcArrowRightBlack}
                tint={tintArrowRightBlack}
                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
            />
            <ThemeImage
                name="arrow_down_white"
                src={srcArrowDownWhite}
                tint={tintArrowDownWhite}
                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
            />
            <ThemeImage
                name="arrow_right_white"
                src={srcArrowRightWhite}
                tint={tintArrowRightWhite}
                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
            />
        </Region>
    );
};
