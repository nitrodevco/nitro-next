import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `request_entity` of FriendRequestsTabLayout - pass real rows through its `items…` slot. */
export interface FriendRequestsTabLayoutRequestEntityItemProps {
    captionName?: string;
    captionTextDiscard?: string;
    layout?: BoxLayout;
    onButtonAccept?: () => void;
    onClickAreaDiscard?: () => void;
    onRegionProfile?: () => void;
    onRegionProfileName?: () => void;
    srcCanvas?: string;
    tintCanvas?: string;
    visibleButtonAccept?: boolean;
    visibleCanvas?: boolean;
    visibleClickAreaDiscard?: boolean;
    visibleRegionProfile?: boolean;
    visibleRegionProfileName?: boolean;
    visibleTextDiscard?: boolean;
}

export const FriendRequestsTabLayoutRequestEntityItem = ({ captionName, captionTextDiscard, layout, onButtonAccept, onClickAreaDiscard, onRegionProfile, onRegionProfileName, srcCanvas, tintCanvas, visibleButtonAccept, visibleCanvas, visibleClickAreaDiscard, visibleRegionProfile, visibleRegionProfileName, visibleTextDiscard }: FriendRequestsTabLayoutRequestEntityItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="request_entity"
            backgroundColor="#ab8710"
            layout={{ width: 196, height: 50, flexShrink: 0, ...layout }}
        >
            {(visibleRegionProfile ?? true) && (
                <Region
                    name="region_profile"
                    onPointerTap={onRegionProfile}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 1, right: 156, top: 3, height: 44 }}
                >
                    {(visibleCanvas ?? true) && (
                        <ThemeImage
                            name="canvas"
                            src={srcCanvas}
                            tint={tintCanvas}
                            layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 44 }}
                        />
                    )}
                </Region>
            )}
            {(visibleRegionProfileName ?? true) && (
                <Region
                    name="region_profile_name"
                    layout={{ position: 'absolute', left: 43, right: 15, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onRegionProfileName}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionName ?? 'Name'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
            {(visibleClickAreaDiscard ?? true) && (
                <Region
                    name="click_area_discard"
                    onPointerTap={onClickAreaDiscard}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 42, width: 119, top: 25, height: 18 }}
                >
                    {(visibleTextDiscard ?? true) && (
                        <Region
                            name="text_discard"
                            layout={{ position: 'absolute', left: 0, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionTextDiscard ?? t('friendbar.request.decline')}
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    )}
                </Region>
            )}
            {(visibleButtonAccept ?? true) && (
                <Button
                    variant="3"
                    name="button_accept"
                    onPointerTap={onButtonAccept}
                    layout={{ position: 'absolute', right: 23, width: 80, top: 22, height: 22, maxWidth: 80 }}
                >
                    {t('friendbar.request.accept')}
                </Button>
            )}
        </Region>
    );
};
