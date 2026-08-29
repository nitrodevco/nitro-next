import { BoxLayout, Region } from '#base/theme';

import { IssueBrowserLayoutTextsContainer2, IssueBrowserLayoutTextsContainer2Props } from './IssueBrowserLayoutTextsContainer2';

/** Row template `item_prototype` of IssueBrowserLayout - pass real rows through its `items…` slot. */
export interface IssueBrowserLayoutItemPrototypeItem3Props {
    layout?: BoxLayout;
    onItemPrototype?: () => void;
    textsContainer?: IssueBrowserLayoutTextsContainer2Props;
    visibleTextsContainer?: boolean;
}

export const IssueBrowserLayoutItemPrototypeItem3 = ({ layout, onItemPrototype, textsContainer, visibleTextsContainer }: IssueBrowserLayoutItemPrototypeItem3Props) => {
    return (
        <Region
            name="item_prototype"
            onPointerTap={onItemPrototype}
            cursor="pointer"
            layout={{ width: 517, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, ...layout }}
        >
            {(visibleTextsContainer ?? true) && (
                <IssueBrowserLayoutTextsContainer2 {...textsContainer} />
            )}
        </Region>
    );
};
