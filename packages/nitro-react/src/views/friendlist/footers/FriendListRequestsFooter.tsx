import { useTranslation } from '#base/context/system';
import { Border, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/**
 * The requests tab's `friend_requests_footer` (223x67, stretched to the tab's width): a
 * `0xd9d9d9` border at (5, 5) with the two full-width style-0 container buttons,
 * `accept_all_but` at y 5 (icon style 8 tinted `0x33cc00`, text at x 32) and `reject_all_but`
 * at y 30 (style 9 tinted `0xff3333`, text at x 30). The texts are Volter 9 in the button's own
 * colour - the layout's `text_color="0"` is no var at all.
 */
export const FriendListRequestsFooter = () => {
    const t = useTranslation();

    return (
        <Region
            backgroundColor="#ffffff"
            layout={{ position: 'relative', width: '100%', height: 67, flexShrink: 0 }}
        >
            <Border
                variant="0"
                tintColor="#d9d9d9"
                layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 57 }}
            >
                <ContainerButton
                    variant="0"
                    layout={{ position: 'absolute', left: 5, right: 5, top: 30, height: 21, overflow: 'hidden' }}
                >
                    <Icon
                        name="icon"
                        variant={9}
                        tintColor="#ff3333"
                        layout={{ position: 'absolute', left: 9, top: 4, width: 16, height: 14 }}
                    />
                    <ThemeText
                        text={t('friendlist.requests.dismissall')}
                        textOptions={{ fontFamily: 'Volter', fontSize: 9 }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 30, right: 13, top: 3, height: 20 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="0"
                    layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 21, overflow: 'hidden' }}
                >
                    <Icon
                        name="icon"
                        variant={8}
                        tintColor="#33cc00"
                        layout={{ position: 'absolute', left: 9, top: 4, width: 16, height: 14 }}
                    />
                    <ThemeText
                        text={t('friendlist.requests.acceptall')}
                        textOptions={{ fontFamily: 'Volter', fontSize: 9 }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 32, right: 11, top: 3, height: 20 }}
                    />
                </ContainerButton>
            </Border>
        </Region>
    );
};
