import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1199_club_required_xml` (layout "Group info window", 428x215) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubRequiredLayoutProps {
    captionCancelLink?: string;
    captionInfoTxt?: string;
    captionMoreInfoLink?: string;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    onClose?: () => void;
    onJoinButton?: () => void;
    onMoreInfoLinkRegion?: () => void;
}

export const ClubRequiredLayout = ({ captionCancelLink, captionInfoTxt, captionMoreInfoLink, layout, onCancelLinkRegion, onClose, onJoinButton, onMoreInfoLinkRegion }: ClubRequiredLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="hc_required_window"
            name="hc_required_window"
            caption={t('group.hcrequired.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 428, height: 215, minWidth: 428, minHeight: 215, ...layout }}
        >
            <Region
                backgroundColor="#3c3c3c"
                layout={{ position: 'absolute', left: 0, right: -11, top: 0, height: 125 }}
            />
            <Icon
                variant="18"
                layout={{ position: 'absolute', left: 23, width: 92, top: 19, height: 44 }}
            />
            <Region
                name="info_txt"
                layout={{ position: 'absolute', left: 131, width: 265, top: 28, height: 62, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInfoTxt ?? 'Dippa dappa duppa'}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 265 }}
                />
            </Region>
            <Region
                name="more_info_link_region"
                onPointerTap={onMoreInfoLinkRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 131, width: 282, top: 83, height: 18 }}
            >
                <Region
                    name="more_info_link"
                    layout={{ position: 'absolute', left: 0, width: 158, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMoreInfoLink ?? t('group.hcrequired.moreinfo')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#0078ff' }}
                    />
                </Region>
            </Region>
            <Region
                name="cancel_link_region"
                onPointerTap={onCancelLinkRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 35, width: 152, top: 145, height: 18 }}
            >
                <Region
                    name="cancel_link"
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionCancelLink ?? t('generic.cancel')}
                </Region>
            </Region>
            <ButtonThick
                variant="3"
                name="join_button"
                onPointerTap={onJoinButton}
                layout={{ position: 'absolute', left: 303, width: 109, top: 140, height: 28, minWidth: 109, maxWidth: 109 }}
            >
                {t('group.hcrequired.join')}
            </ButtonThick>
        </Frame>
    );
};
