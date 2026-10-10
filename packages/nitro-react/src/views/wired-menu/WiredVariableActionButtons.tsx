import { Container as PixiContainer } from 'pixi.js';
import { Ref } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, Button } from '#base/theme';

interface WiredVariableActionButtonsProps {
    canDelete: boolean;
    canAdd: boolean;
    onDelete: () => void;
    onAdd: () => void;
    /** The add button's box, which the create bubble's outside-click check leaves out. */
    addButtonRef: Ref<PixiContainer | null>;
    /** Where the row sits under the table. */
    layout: { top?: number; bottom?: number; height: number };
}

/**
 * The `delete` / `add` button pair under a variable table - the inspection tab's and the variable
 * holder's (`wiredmenu.inspection.delete` / `.add`), 145 wide with 13 between, each faded to half
 * while it cannot be pressed.
 */
export const WiredVariableActionButtons = ({ canDelete, canAdd, onDelete, onAdd, addButtonRef, layout }: WiredVariableActionButtonsProps) => {
    const t = useTranslation();

    return (
        <Box layout={{ position: 'absolute', left: 0, width: 303, flexDirection: 'row', gap: 13, ...layout }}>
            <Box
                alpha={canDelete ? 1 : 0.5}
                layout={{ width: 145, height: 25 }}
            >
                <Button
                    variant="3"
                    disabled={!canDelete}
                    onPointerTap={onDelete}
                    layout={{ width: 145, height: 25 }}
                >
                    {t('wiredmenu.inspection.delete', 'wiredmenu.inspection.delete')}
                </Button>
            </Box>
            <Box
                ref={addButtonRef}
                alpha={canAdd ? 1 : 0.5}
                layout={{ width: 145, height: 25 }}
            >
                <Button
                    variant="3"
                    disabled={!canAdd}
                    onPointerTap={onAdd}
                    layout={{ width: 145, height: 25 }}
                >
                    {t('wiredmenu.inspection.add', 'wiredmenu.inspection.add')}
                </Button>
            </Box>
        </Box>
    );
};
