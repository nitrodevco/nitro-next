import { Border, BoxLayout, Region } from '#base/theme';

import { SearchTreeDropdownLayoutMainCont, SearchTreeDropdownLayoutMainContProps } from './SearchTreeDropdownLayoutMainCont';

/** Named region `expanded_view_wrapper` of SearchTreeDropdownLayout - configured through the parent's `expandedViewWrapper` prop. */
export interface SearchTreeDropdownLayoutExpandedViewWrapperProps {
    layout?: BoxLayout;
    mainCont?: SearchTreeDropdownLayoutMainContProps;
}

export const SearchTreeDropdownLayoutExpandedViewWrapper = ({ layout, mainCont }: SearchTreeDropdownLayoutExpandedViewWrapperProps) => {
    return (
        <Region
            name="expanded_view_wrapper"
            layout={{ position: 'absolute', left: 0, width: 1000, top: 0, height: 1000, ...layout }}
        >
            <Border
                variant="12"
                name="expanded_view"
                layout={{ position: 'absolute', left: 0, width: 198, top: 0, bottom: 904 }}
            >
                <SearchTreeDropdownLayoutMainCont {...mainCont} />
            </Border>
        </Region>
    );
};
