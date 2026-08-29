import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region } from '#base/theme';

/** Named region `button_list` of PetViewLayout - configured through the parent's `buttonList` prop. */
export interface PetViewLayoutButtonListProps {
    layout?: BoxLayout;
    onBtnBuyFood?: () => void;
    onBtnKick?: () => void;
    onBtnMove?: () => void;
    onBtnPetrespect?: () => void;
    onBtnPettreat?: () => void;
    onBtnPick?: () => void;
    onBtnRotate?: () => void;
    onBtnTrain?: () => void;
    onBuyFood?: () => void;
    onKick?: () => void;
    onMove?: () => void;
    onPetrespect?: () => void;
    onPettreat?: () => void;
    onPick?: () => void;
    onRotate?: () => void;
    onTrain?: () => void;
}

export const PetViewLayoutButtonList = ({ layout, onBtnBuyFood, onBtnKick, onBtnMove, onBtnPetrespect, onBtnPettreat, onBtnPick, onBtnRotate, onBtnTrain, onBuyFood, onKick, onMove, onPetrespect, onPettreat, onPick, onRotate, onTrain }: PetViewLayoutButtonListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_list"
            layout={{ width: 1000, height: 25, flexShrink: 0, ...layout }}
        >
            <Region
                name="pick"
                onPointerTap={onPick}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 54, top: 0, height: 25 }}
            >
                <Button
                    variant="1"
                    name="btn_pick"
                    onPointerTap={onBtnPick}
                    textStyle="text-style-button-regular"
                    layout={{ position: 'absolute', left: 0, width: 139, top: 0, height: 25 }}
                >
                    {t('infostand.button.pickup')}
                </Button>
            </Region>
            <Region
                name="train"
                onPointerTap={onTrain}
                cursor="pointer"
                layout={{ position: 'absolute', left: 64, width: 44, top: 0, height: 25 }}
            >
                <Button
                    variant="1"
                    name="btn_train"
                    onPointerTap={onBtnTrain}
                    textStyle="text-style-button-regular"
                    layout={{ position: 'absolute', left: 0, width: 132, top: 0, height: 25 }}
                >
                    {t('infostand.button.train')}
                </Button>
            </Region>
            <Region
                name="buy_food"
                onPointerTap={onBuyFood}
                cursor="pointer"
                layout={{ position: 'absolute', left: 118, width: 147, top: 0, height: 25 }}
            >
                <Button
                    variant="1"
                    name="btn_buy_food"
                    onPointerTap={onBtnBuyFood}
                    textStyle="text-style-button-regular"
                    layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 25 }}
                >
                    {t('infostand.button.buyfood')}
                </Button>
            </Region>
            <Region
                name="petrespect"
                onPointerTap={onPetrespect}
                cursor="pointer"
                layout={{ position: 'absolute', left: 275, width: 163, top: 0, height: 25 }}
            >
                <Button
                    variant="1"
                    name="btn_petrespect"
                    onPointerTap={onBtnPetrespect}
                    textStyle="text-style-button-regular"
                    layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 25 }}
                >
                    {t('infostand.button.petrespect')}
                </Button>
            </Region>
            <Region
                name="pettreat"
                onPointerTap={onPettreat}
                cursor="pointer"
                layout={{ position: 'absolute', left: 275, width: 163, top: 0, height: 25 }}
            >
                <Button
                    variant="1"
                    name="btn_pettreat"
                    onPointerTap={onBtnPettreat}
                    textStyle="text-style-button-regular"
                    layout={{ position: 'absolute', left: 0, width: 152, top: 0, height: 25 }}
                >
                    {t('infostand.button.pettreat')}
                </Button>
            </Region>
            <Region
                name="kick"
                onPointerTap={onKick}
                cursor="pointer"
                layout={{ position: 'absolute', left: 448, width: 141, top: 0, height: 25 }}
            >
                <Button
                    variant="1"
                    name="btn_kick"
                    onPointerTap={onBtnKick}
                    textStyle="text-style-button-regular"
                    layout={{ position: 'absolute', left: 0, width: 143, top: 0, height: 25 }}
                >
                    {t('infostand.button.petkick')}
                </Button>
            </Region>
            <Region
                name="rotate"
                onPointerTap={onRotate}
                cursor="pointer"
                layout={{ position: 'absolute', left: 600, width: 132, top: 0, height: 25 }}
            >
                <Button
                    variant="1"
                    name="btn_rotate"
                    onPointerTap={onBtnRotate}
                    textStyle="text-style-button-regular"
                    layout={{ position: 'absolute', left: 0, width: 141, top: 0, height: 25 }}
                >
                    {t('infostand.button.rotate')}
                </Button>
            </Region>
            <Region
                name="move"
                onPointerTap={onMove}
                cursor="pointer"
                layout={{ position: 'absolute', left: 589, width: 132, top: 0, height: 25 }}
            >
                <Button
                    variant="1"
                    name="btn_move"
                    onPointerTap={onBtnMove}
                    textStyle="text-style-button-regular"
                    layout={{ position: 'absolute', left: 0, width: 134, top: 0, height: 25 }}
                >
                    {t('infostand.button.move')}
                </Button>
            </Region>
        </Region>
    );
};
