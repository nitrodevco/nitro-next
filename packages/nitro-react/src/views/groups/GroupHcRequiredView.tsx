/**
 * The club-required window - `HcRequiredWindowCtrl`: `club_required`, centred. A join or an edit the
 * server turned down for want of a club membership opens it, `info_txt` saying which (`show`). The
 * `join_button` and the "more info" link go to the club centre (`openVipPurchase`); the close button
 * and the cancel link close it.
 */
import { TemplateWindow, useTemplateFrame } from '#base/theme';

export interface GroupHcRequiredViewProps {
    /** Which wording `info_txt` carries: joining a club-only group, or managing one. */
    reason: 'join' | 'manage';
    onClose: () => void;
    onBuyClub: () => void;
}

export const GroupHcRequiredView = ({ reason, onClose, onBuyClub }: GroupHcRequiredViewProps) => {
    const frame = useTemplateFrame({ id: 'hc_required_window', centered: true, rememberPosition: false, onClose });

    return (
        <TemplateWindow
            id="habbo-groups-com/club_required"
            frame={frame}
            bindings={{
                info_txt: { caption: `\${group.hcrequired.info.${reason}}` },
                cancel_link_region: { onPointerTap: onClose },
                join_button: { onPointerTap: onBuyClub },
                more_info_link_region: { onPointerTap: onBuyClub },
            }}
        />
    );
};
