import { useTranslation } from '#base/context/system';
import { ButtonThick, Frame, Icon, Region, ThemeText } from '#base/theme';

export interface GroupHcRequiredViewProps {
    /** Which wording `info_txt` carries: joining a club-only group, or managing one. */
    reason: 'join' | 'manage';
    onClose: () => void;
    onBuyClub: () => void;
}

/**
 * The club-required window - `club_required`, drawn by `HcRequiredWindowCtrl`. A join or an edit
 * the server turned down for want of a club membership opens it, and both its button and its "more
 * info" link go to the club centre.
 */
export const GroupHcRequiredView = ({ reason, onClose, onBuyClub }: GroupHcRequiredViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            name="hc_required_window"
            caption={t('group.hcrequired.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            resizeDirection="none"
            layout={{ width: 428, height: 215 }}
            margins={[ 0, 33, 0, 3 ]}
        >
            <Region
                backgroundColor="#3c3c3c"
                layout={{ position: 'absolute', left: 0, right: 1, top: 0, height: 125 }}
            />
            <Icon
                variant="18"
                layout={{ position: 'absolute', left: 23, width: 92, top: 19, height: 44 }}
            />
            <ThemeText
                text={t(`group.hcrequired.info.${reason}`)}
                textStyle="u_regular"
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 261 }}
                flashFormat={{ thickness: -15, sharpness: 80 }}
                markup
                clip
                name="info_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 131, width: 265, top: 28, height: 62 }}
            />
            <Region
                name="more_info_link_region"
                onPointerTap={onBuyClub}
                cursor="pointer"
                layout={{ position: 'absolute', left: 131, width: 282, top: 83, height: 18 }}
            >
                <ThemeText
                    text={t('group.hcrequired.moreinfo')}
                    textStyle="u_bold"
                    textOptions={{ fill: '#0078ff' }}
                    flashFormat={{ underline: true, thickness: -15, sharpness: 80 }}
                    name="more_info_link"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
            </Region>
            <Region
                name="cancel_link_region"
                onPointerTap={onClose}
                cursor="pointer"
                layout={{ position: 'absolute', left: 35, width: 152, top: 145, height: 18 }}
            >
                <ThemeText
                    text={t('generic.cancel')}
                    textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                    flashFormat={{ underline: true, antiAliasType: 'advanced' }}
                    name="cancel_link"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
            </Region>
            <ButtonThick
                variant="3"
                name="join_button"
                onPointerTap={onBuyClub}
                layout={{ position: 'absolute', left: 303, width: 109, top: 140, height: 28, minWidth: 109, maxWidth: 109 }}
            >
                {t('group.hcrequired.join')}
            </ButtonThick>
        </Frame>
    );
};
