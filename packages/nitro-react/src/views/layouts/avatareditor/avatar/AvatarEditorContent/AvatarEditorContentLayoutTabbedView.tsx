import { ReactNode } from 'react';

import { BoxLayout, Region, TabButton, TabContext, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { AvatarEditorContentLayoutContentArea, AvatarEditorContentLayoutContentAreaProps } from './AvatarEditorContentLayoutContentArea';
import { AvatarEditorContentLayoutGridContainer, AvatarEditorContentLayoutGridContainerProps } from './AvatarEditorContentLayoutGridContainer';

/** Named region `tabbedView` of AvatarEditorContentLayout - configured through the parent's `tabbedView` prop. */
export interface AvatarEditorContentLayoutTabbedViewProps {
    actionContainer?: ReactNode;
    contentArea?: AvatarEditorContentLayoutContentAreaProps;
    gridContainer?: AvatarEditorContentLayoutGridContainerProps;
    layout?: BoxLayout;
    onEffects?: () => void;
    onGeneric?: () => void;
    onHead?: () => void;
    onHotlooks?: () => void;
    onLegs?: () => void;
    onMisc?: () => void;
    onNfts?: () => void;
    onTorso?: () => void;
    selectedMainTabs?: string;
    srcBitmap?: string;
    srcEffectsBitmap?: string;
    srcHeadBitmap?: string;
    srcHotlooksBitmap?: string;
    srcLegsBitmap?: string;
    srcMiscBitmap?: string;
    srcNftsBitmap?: string;
    srcTorsoBitmap?: string;
}

export const AvatarEditorContentLayoutTabbedView = ({ actionContainer, contentArea, gridContainer, layout, onEffects, onGeneric, onHead, onHotlooks, onLegs, onMisc, onNfts, onTorso, selectedMainTabs, srcBitmap, srcEffectsBitmap, srcHeadBitmap, srcHotlooksBitmap, srcLegsBitmap, srcMiscBitmap, srcNftsBitmap, srcTorsoBitmap }: AvatarEditorContentLayoutTabbedViewProps) => {
    return (
        <Region
            name="tabbedView"
            layout={{ position: 'absolute', left: 0, width: 486, top: 4, height: 410, ...layout }}
        >
            <TabContext
                variant="3"
                name="mainTabs"
                layout={{ position: 'absolute', left: 0, width: 486, top: 5, height: 395 }}
            >
                <TabButton
                    variant="3"
                    name="generic"
                    selected={selectedMainTabs === 'generic'}
                    onPointerTap={onGeneric}
                    layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcBitmap ?? layoutImage('avatar_editor_tabs_ae_tabs_generic.png')}
                        layout={{ position: 'absolute', left: 1, width: 52, top: -5, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="head"
                    selected={selectedMainTabs === 'head'}
                    onPointerTap={onHead}
                    layout={{ position: 'absolute', left: 52, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcHeadBitmap ?? layoutImage('avatar_editor_tabs_ae_tabs_head.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -6, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="torso"
                    selected={selectedMainTabs === 'torso'}
                    onPointerTap={onTorso}
                    layout={{ position: 'absolute', left: 104, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcTorsoBitmap ?? layoutImage('avatar_editor_tabs_ae_tabs_torso.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -6, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="legs"
                    selected={selectedMainTabs === 'legs'}
                    onPointerTap={onLegs}
                    layout={{ position: 'absolute', left: 156, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcLegsBitmap ?? layoutImage('avatar_editor_tabs_ae_tabs_legs.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -6, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="misc"
                    selected={selectedMainTabs === 'misc'}
                    onPointerTap={onMisc}
                    layout={{ position: 'absolute', left: 208, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcMiscBitmap ?? layoutImage('avatar_editor_tabs_ae_tabs_misc.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -4, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="hotlooks"
                    selected={selectedMainTabs === 'hotlooks'}
                    onPointerTap={onHotlooks}
                    layout={{ position: 'absolute', left: 260, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcHotlooksBitmap ?? layoutImage('avatar_editor_tabs_ae_tabs_hotlooks.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -7, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="effects"
                    selected={selectedMainTabs === 'effects'}
                    onPointerTap={onEffects}
                    layout={{ position: 'absolute', left: 312, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcEffectsBitmap ?? layoutImage('avatar_editor_tabs_ae_tabs_effects.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -5, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="nfts"
                    selected={selectedMainTabs === 'nfts'}
                    onPointerTap={onNfts}
                    layout={{ position: 'absolute', left: 364, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcNftsBitmap ?? layoutImage('nft_icon_24x24.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -5, height: 42 }}
                    />
                </TabButton>
            </TabContext>
            <AvatarEditorContentLayoutContentArea {...contentArea} />
            <Region
                name="action_container"
                layout={{ position: 'absolute', left: 335, width: 122, top: 90, height: 210 }}
            >
                {actionContainer}
            </Region>
            <AvatarEditorContentLayoutGridContainer {...gridContainer} />
        </Region>
    );
};
