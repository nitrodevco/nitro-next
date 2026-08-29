import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `builders_club_list_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutBuildersClubListTemplateItemProps {
    itemsBuildersClubListTemplate?: ReactNode;
    layout?: BoxLayout;
}

export const CatalogUbuntuLayoutBuildersClubListTemplateItem = ({ itemsBuildersClubListTemplate, layout }: CatalogUbuntuLayoutBuildersClubListTemplateItemProps) => {
    return (
        <Region
            name="builders_club_list_template"
            layout={{ width: 178, height: 19, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsBuildersClubListTemplate}
        </Region>
    );
};
