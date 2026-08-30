import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, ThemeText } from '#base/theme';

/** Generated from `1516_friend_remove_confirm_xml` (layout "friend_remove_confirm", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendRemoveConfirmLayoutProps {
    captionRemoveInfo?: string;
    layout?: BoxLayout;
    onCancel?: () => void;
    onClose?: () => void;
    onOk?: () => void;
}

export const FriendRemoveConfirmLayout = ({ captionRemoveInfo, layout, onCancel, onClose, onOk }: FriendRemoveConfirmLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="alert_%200"
            name="alert_%200"
            caption={t('friendlist.removefriendconfirm.title')}
            onClose={onClose}
            layout={{ width: 160, height: 200, minWidth: 160, minHeight: 200, ...layout }}
        >
            <Border
                variant="0"
                name="border"
                layout={{ position: 'absolute', left: 0, right: -2, top: 0, height: 143 }}
            >
                <ThemeText
                    text={captionRemoveInfo ?? t('friendlist.removefriendconfirm.userlist')}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 130 }}
                    name="remove_info"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, right: 10, top: 10, height: 120 }}
                />
            </Border>
            <Button
                variant="0"
                name="cancel"
                onPointerTap={onCancel}
                layout={{ position: 'absolute', right: 0, width: 60, bottom: -9, height: 21, minWidth: 60, maxWidth: 60 }}
            >
                {t('generic.cancel')}
            </Button>
            <ButtonThick
                variant="0"
                name="ok"
                onPointerTap={onOk}
                layout={{ position: 'absolute', left: 0, width: 60, bottom: -9, height: 21, minWidth: 60, maxWidth: 60 }}
            >
                {t('generic.ok')}
            </ButtonThick>
        </Frame>
    );
};
