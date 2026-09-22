/**
 * The transfer tab - `tabs/TransferNftsTab` in `transferContainer` of `collectible_view.xml`: the
 * description, the safe, and in `transfer_container` the wallet menu (the wallets to transfer to;
 * greyed and disabled with none), the silver fee (text and icon only for a fee above 0) and the
 * transfer button. Until the fee and the wallets are in, `loading_contents` covers it.
 *
 * The menu's caption is the picked wallet cut to 32 characters and `...` (`onSelectWallet`).
 */
import { selectTransferWallet, transferCollectibles } from '#base/commands';
import { useCollectiblesStore } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { Border, Button, Dropmenu, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { CollectiblesLoadingView } from './CollectiblesLoadingView';

/** `initializeTransferWallets`: the menu's colour with no wallets, and with some. */
const WALLET_MENU_DISABLED_COLOR = '#cccccc';
const WALLET_MENU_ENABLED_COLOR = '#ffffff';
/** `onSelectWallet` cuts a longer caption. */
const WALLET_CAPTION_LENGTH = 32;

export const CollectiblesTransferTab = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const feePending = useCollectiblesStore(x => x.transferFeePending);
    const waitingForAddresses = useCollectiblesStore(x => x.transferWaitingForAddresses);
    const fee = useCollectiblesStore(x => x.transferFee);
    const wallets = useCollectiblesStore(x => x.transferWallets);
    const selectedIndex = useCollectiblesStore(x => x.transferSelectedIndex);
    const buttonEnabled = useCollectiblesStore(x => x.transferButtonEnabled);
    const ready = !waitingForAddresses && !feePending;
    const list = wallets ?? [];
    const selected = list[selectedIndex] ?? '';
    const caption = (selected.length > WALLET_CAPTION_LENGTH) ? `${selected.substring(0, WALLET_CAPTION_LENGTH)}...` : selected;

    return (
        <Region
            name="transferContainer"
            layout={{ position: 'absolute', left: 0, width: 485, top: 125, height: 429 }}
        >
            {ready && (
                <Region
                    name="loaded_content"
                    layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, overflow: 'hidden' }}
                >
                    <Region
                        name="headercontainer"
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 50 }}
                    >
                        <ThemeText
                            text={t('collectibles.transfer.description')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 446, align: 'center' }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 19, width: 450, alignSelf: 'center', minWidth: 450, maxWidth: 450 }}
                        />
                    </Region>
                    <Border
                        variant="3"
                        name="transfer_container"
                        tintColor="#bac3cd"
                        layout={{ position: 'absolute', left: 0, width: 488, top: 380, height: 50 }}
                    >
                        <Dropmenu
                            variant="3"
                            tintColor={list.length ? WALLET_MENU_ENABLED_COLOR : WALLET_MENU_DISABLED_COLOR}
                            disabled={!list.length}
                            caption={caption}
                            options={list.map((wallet, index) => ({ key: wallet, label: wallet, selected: index === selectedIndex, onSelect: () => selectTransferWallet(index) }))}
                            layout={{ position: 'absolute', left: 10, width: 260, top: 13, height: 24 }}
                        />
                        <Border
                            variant="3"
                            tintColor="#d6dbe1"
                            blend={0}
                            layout={{ position: 'absolute', left: 315, width: 170, top: 5, height: 40 }}
                        >
                            <Region layout={{ position: 'absolute', left: 11, top: 5, flexDirection: 'row' }}>
                                {(fee > 0) && (
                                    <ThemeText
                                        text={String(fee)}
                                        textStyle="u_bold"
                                        textOptions={{ fontSize: 16 }}
                                        flashFormat={{ bold: false }}
                                        name="transfer_fee_text"
                                        verticalAlign="top"
                                        layout={{ marginTop: 4, flexShrink: 0 }}
                                    />
                                )}
                                <Region
                                    name="spacing"
                                    layout={{ width: 4, height: 30, flexShrink: 0 }}
                                />
                                {(fee > 0) && (
                                    <ThemeImage
                                        name="transfer_fee_icon"
                                        src={LayoutImage('shared/pursearea_mid_silver_icon.png')}
                                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                        layout={{ width: 24, height: 30, flexShrink: 0 }}
                                    />
                                )}
                                <Region
                                    name="spacing"
                                    layout={{ width: 6, height: 30, flexShrink: 0 }}
                                />
                                <Button
                                    variant="5"
                                    name="transfer_button"
                                    tintColor="#2095d4"
                                    disabled={!buttonEnabled}
                                    onPointerTap={() => transferCollectibles(send)}
                                    layout={{ width: 100, height: 30, flexShrink: 0, minWidth: 100 }}
                                >
                                    {t('collectibles.transfer')}
                                </Button>
                            </Region>
                        </Border>
                    </Border>
                    <ThemeImage
                        src={LayoutImage('catalog/collectables_transfer_safe.png')}
                        bitmap={{ fitSizeToContents: true }}
                        layout={{ position: 'absolute', left: 42, top: 120 }}
                    />
                </Region>
            )}
            {!ready && <CollectiblesLoadingView />}
        </Region>
    );
};
