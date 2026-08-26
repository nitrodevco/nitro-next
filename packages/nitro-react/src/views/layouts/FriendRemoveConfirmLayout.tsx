import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `1516_friend_remove_confirm_xml` (layout "friend_remove_confirm", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendRemoveConfirmLayoutProps {
    layout?: BoxLayout;
    onCancel?: () => void;
    onClose?: () => void;
    onOk?: () => void;
}

export const FriendRemoveConfirmLayout = ({ layout, onCancel, onClose, onOk }: FriendRemoveConfirmLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="alert_%200"
            name="alert_%200"
            params={32769}
            caption={t('friendlist.removefriendconfirm.title')}
            onClose={onClose}
            layout={{ width: 160, height: 200, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="0"
                    name="border"
                    params={98305}
                    layout={{ position: 'absolute', left: 0, width: 150, top: 0, height: 143 }}
                >
                    <Region
                        name="remove_info"
                        params={1}
                        layout={{ position: 'absolute', left: 10, width: 130, top: 10, height: 120, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('friendlist.removefriendconfirm.userlist')}
                            textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 130 }}
                        />
                    </Region>
                </Border>
                <Button
                    variant="0"
                    name="cancel"
                    params={131089}
                    onPointerTap={onCancel}
                    layout={{ position: 'absolute', left: 88, width: 60, top: 147, height: 21, minWidth: 60, maxWidth: 60 }}
                >
                    {t('generic.cancel')}
                </Button>
                <ButtonThick
                    variant="0"
                    name="ok"
                    params={131089}
                    onPointerTap={onOk}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 147, height: 21, minWidth: 60, maxWidth: 60 }}
                >
                    {t('generic.ok')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
