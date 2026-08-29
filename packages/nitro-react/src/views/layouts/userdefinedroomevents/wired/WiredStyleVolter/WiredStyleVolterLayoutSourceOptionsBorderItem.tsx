import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleVolterLayoutSourceBtnItem } from './WiredStyleVolterLayoutSourceBtnItem';

/** Row template `source_options_border` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutSourceOptionsBorderItemProps {
    itemsSourceOptionsList?: ReactNode;
    layout?: BoxLayout;
    visibleSourceOptionsCont?: boolean;
    visibleSourceOptionsList?: boolean;
}

export const WiredStyleVolterLayoutSourceOptionsBorderItem = ({ itemsSourceOptionsList, layout, visibleSourceOptionsCont, visibleSourceOptionsList }: WiredStyleVolterLayoutSourceOptionsBorderItemProps) => {
    return (
        <Region
            name="source_options_border"
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            {(visibleSourceOptionsCont ?? true) && (
                <Region
                    name="source_options_cont"
                    backgroundColor="#181818"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, minHeight: 15, maxHeight: 15 }}
                >
                    {(visibleSourceOptionsList ?? true) && (
                        <Region
                            name="source_options_list"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', gap: 1 }}
                        >
                            {itemsSourceOptionsList ?? (
                                <WiredStyleVolterLayoutSourceBtnItem />
                            )}
                        </Region>
                    )}
                </Region>
            )}
        </Region>
    );
};
