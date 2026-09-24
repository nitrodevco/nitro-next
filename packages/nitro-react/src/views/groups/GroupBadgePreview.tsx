import { IGuildEditorData } from '@nitrodevco/nitro-packets';

import { BADGE_BASE_LAYER_INDEX, BADGE_IMAGE_HEIGHT, BADGE_IMAGE_WIDTH, BadgeLayerOptions } from '#base/context/groups';
import { BoxLayout, Region } from '#base/theme';

import { GroupBadgePartImage } from './GroupBadgePartImage';

export interface GroupBadgePreviewProps {
    layers: BadgeLayerOptions[];
    editorData: IGuildEditorData | undefined;
    layout?: BoxLayout;
}

/**
 * The badge being edited - `badge_editor`'s `guild_badge`, whose five `layer_<n>` images
 * `BadgeEditorCtrl.updatePreviewImage` fills one at a time. Layer 0 draws from `baseParts`, the
 * rest from `layerParts`, and a layer with no part drawn is simply left out.
 */
export const GroupBadgePreview = ({ layers, editorData, layout }: GroupBadgePreviewProps) => (
    <Region layout={{ width: BADGE_IMAGE_WIDTH, height: BADGE_IMAGE_HEIGHT, overflow: 'hidden', ...layout }}>
        {layers.map((options) => {
            const parts = (options.layerIndex === BADGE_BASE_LAYER_INDEX) ? editorData?.baseParts : editorData?.layerParts;
            const part = (options.partIndex >= 0) ? parts?.[options.partIndex] : undefined;

            if (!part) return null;

            return (
                <GroupBadgePartImage
                    key={options.layerIndex}
                    part={part}
                    options={options}
                    color={editorData?.badgeColors[options.colorIndex]?.color}
                />
            );
        })}
    </Region>
);
