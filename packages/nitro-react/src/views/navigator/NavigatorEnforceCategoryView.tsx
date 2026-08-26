import { getFlatCategoryVisibleName, UpdateRoomCategoryAndTradeSettingsComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useInterpolate, useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { Button, DropmenuSelect, Frame } from '#base/theme';

/*
 * EnforceCategoryCtrl — enforce_category (310x240, frame style 3) built as a MODAL
 * with the close button hidden: the only way out is OK, which sends
 * UpdateRoomCategoryAndTradeSettings(currentRoomId, categoryId, tradeMode).
 * Categories: visible, not automatic, staffOnly only with security >= 7.
 */
export const NavigatorEnforceCategoryView = () => {
    const { enforceCategory, currentRoom, flatCategories, securityLevel } = useNavigatorSelectors();
    const { closeEnforceCategory } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const interpolate = useInterpolate();
    const t = useTranslation();
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [tradeIndex, setTradeIndex] = useState(0);

    if (!enforceCategory || !currentRoom) return null;

    const categories = flatCategories.filter(x => x.visible && !x.automatic && (!x.staffOnly || securityLevel >= 7));

    const confirm = () => {
        const category = categories[Math.max(0, categoryIndex)];

        if (!category) return;

        send(new UpdateRoomCategoryAndTradeSettingsComposer({ roomId: currentRoom.roomId, categoryId: category.nodeId, tradeType: tradeIndex }));
        closeEnforceCategory();
    };

    return (
        <div className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.4)] pointer-events-auto">
            <Frame
                caption={t('enforce.category.title')}
                className="inset-0 m-auto w-77.5 h-60"
                contentClassName="relative"
                id="navigator-enforce-category"
                resizeDirection="none"
                variant="3">
                <span className="absolute left-1 top-1 w-73.75 text-style-regular break-words">{t('enforce.category.body.text.multiline')}</span>
                <DropmenuSelect
                    className="absolute left-1.5 top-17 w-69.75 h-5.75"
                    options={categories.map(x => interpolate(getFlatCategoryVisibleName(x)))}
                    selectedIndex={categoryIndex}
                    variant="2"
                    onSelect={setCategoryIndex} />
                <span className="absolute left-1 top-24 text-style-regular">{t('enforce.category.trade.setting')}</span>
                <DropmenuSelect
                    className="absolute left-1.5 top-30 w-69.75 h-5.75"
                    options={[t('navigator.roomsettings.trade_not_allowed'), t('navigator.roomsettings.trade_not_with_Controller'), t('navigator.roomsettings.trade_allowed')]}
                    selectedIndex={tradeIndex}
                    variant="2"
                    onSelect={setTradeIndex} />
                <Button className="absolute left-21.5 top-39.5 w-33 h-8" variant="3" onClick={confirm}>
                    {t('enforce.category.ok')}
                </Button>
            </Frame>
        </div>
    );
}
