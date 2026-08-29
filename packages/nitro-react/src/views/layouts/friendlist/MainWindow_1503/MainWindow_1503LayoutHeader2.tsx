import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `header` of MainWindow_1503Layout - configured through the parent's `header` prop. */
export interface MainWindow_1503LayoutHeader2Props {
    captionCaptionText?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    srcArrowDownBlack?: string;
    srcArrowDownWhite?: string;
    srcArrowRightBlack?: string;
    srcArrowRightWhite?: string;
    srcHdrFriendRequests?: string;
    srcHdrHilite?: string;
    tintArrowDownBlack?: string;
    tintArrowDownWhite?: string;
    tintArrowRightBlack?: string;
    tintArrowRightWhite?: string;
    tintHdrFriendRequests?: string;
    tintHdrHilite?: string;
}

export const MainWindow_1503LayoutHeader2 = ({ captionCaptionText, layout, onHeader, srcArrowDownBlack, srcArrowDownWhite, srcArrowRightBlack, srcArrowRightWhite, srcHdrFriendRequests, srcHdrHilite, tintArrowDownBlack, tintArrowDownWhite, tintArrowRightBlack, tintArrowRightWhite, tintHdrFriendRequests, tintHdrHilite }: MainWindow_1503LayoutHeader2Props) => {
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
                name="hdr_friend_requests"
                src={srcHdrFriendRequests}
                tint={tintHdrFriendRequests}
                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
            />
            <Region
                name="caption_text"
                layout={{ position: 'absolute', left: 4, width: 190, top: 2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCaptionText ?? `${t('friendlist.tab.friendrequests')} (1)`}
                    textOptions={{ fill: '#f6f6f6' }}
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
