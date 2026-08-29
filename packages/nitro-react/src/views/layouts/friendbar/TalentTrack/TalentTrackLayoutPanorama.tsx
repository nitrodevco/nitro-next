import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { TalentTrackLayoutBeginCitizenshipItem } from './TalentTrackLayoutBeginCitizenshipItem';
import { TalentTrackLayoutBeginHelperItem } from './TalentTrackLayoutBeginHelperItem';
import { TalentTrackLayoutBeginHelperNoCitizenshipItem } from './TalentTrackLayoutBeginHelperNoCitizenshipItem';
import { TalentTrackLayoutEndPaddingItem } from './TalentTrackLayoutEndPaddingItem';
import { TalentTrackLayoutLevelPaneItem } from './TalentTrackLayoutLevelPaneItem';

/** Named region `panorama` of TalentTrackLayout - configured through the parent's `panorama` prop. */
export interface TalentTrackLayoutPanoramaProps {
    itemsPanorama?: ReactNode;
    layout?: BoxLayout;
}

export const TalentTrackLayoutPanorama = ({ itemsPanorama, layout }: TalentTrackLayoutPanoramaProps) => {
    return (
        <ScrollArea
            orientation="horizontal"
            layout={{ position: 'absolute', left: 0, width: 998, top: 20, height: 280, minHeight: 280, maxHeight: 280, ...layout }}
        >
            <Region
                name="panorama"
                layout={{ flexDirection: 'row', width: '100%' }}
            >
                {itemsPanorama ?? (
                    <>
                        <TalentTrackLayoutBeginHelperItem />
                        <TalentTrackLayoutBeginHelperNoCitizenshipItem />
                        <TalentTrackLayoutBeginCitizenshipItem />
                        <TalentTrackLayoutLevelPaneItem />
                        <TalentTrackLayoutEndPaddingItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
