import { BoxLayout, Button, Region } from '#base/theme';

import { IssueBrowserLayoutTextsContainer, IssueBrowserLayoutTextsContainerProps } from './IssueBrowserLayoutTextsContainer';

/** Row template `item_prototype` of IssueBrowserLayout - pass real rows through its `items…` slot. */
export interface IssueBrowserLayoutItemPrototypeItem2Props {
    layout?: BoxLayout;
    onHandleButton?: () => void;
    onItemPrototype?: () => void;
    onReleaseButton?: () => void;
    textsContainer?: IssueBrowserLayoutTextsContainerProps;
    visibleHandleButton?: boolean;
    visibleReleaseButton?: boolean;
    visibleTextsContainer?: boolean;
}

export const IssueBrowserLayoutItemPrototypeItem2 = ({ layout, onHandleButton, onItemPrototype, onReleaseButton, textsContainer, visibleHandleButton, visibleReleaseButton, visibleTextsContainer }: IssueBrowserLayoutItemPrototypeItem2Props) => {
    return (
        <Region
            name="item_prototype"
            onPointerTap={onItemPrototype}
            cursor="pointer"
            layout={{ width: 517, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, ...layout }}
        >
            {(visibleTextsContainer ?? true) && (
                <IssueBrowserLayoutTextsContainer {...textsContainer} />
            )}
            {(visibleHandleButton ?? true) && (
                <Button
                    variant="0"
                    name="handle_button"
                    onPointerTap={onHandleButton}
                    layout={{ position: 'absolute', right: 61, width: 60, top: 1, height: 22, minWidth: 60, maxWidth: 60 }}
                >
                    handle
                </Button>
            )}
            {(visibleReleaseButton ?? true) && (
                <Button
                    variant="0"
                    name="release_button"
                    onPointerTap={onReleaseButton}
                    layout={{ position: 'absolute', right: 0, width: 60, top: 1, height: 22, minWidth: 60, maxWidth: 60 }}
                >
                    release
                </Button>
            )}
        </Region>
    );
};
