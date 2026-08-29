import { BoxLayout, Region } from '#base/theme';

import { BadgeEditorLayoutBadgeEditor, BadgeEditorLayoutBadgeEditorProps } from './BadgeEditorLayoutBadgeEditor';

/** Generated from `1191_badge_editor_xml` (layout "badge_editor", 392x305) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeEditorLayoutProps {
    badgeEditor?: BadgeEditorLayoutBadgeEditorProps;
    layout?: BoxLayout;
}

export const BadgeEditorLayout = ({ badgeEditor, layout }: BadgeEditorLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 392, height: 305, ...layout }}>
            <BadgeEditorLayoutBadgeEditor {...badgeEditor} />
        </Region>
    );
};
