import { BoxLayout, ContainerButton, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `relationship_heart` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRelationshipHeartItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
}

export const AvatarMenuWidgetLayoutRelationshipHeartItem = ({ layout, onButton, visibleButton }: AvatarMenuWidgetLayoutRelationshipHeartItemProps) => {
    return (
        <Region
            name="relationship_heart"
            layout={{ width: 45, height: 25, flexShrink: 0, ...layout }}
        >
            {(visibleButton ?? true) && (
                <ContainerButton
                    variant="0"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ position: 'absolute', left: -3, width: 49, top: -3, height: 29 }}
                >
                    <ThemeImage
                        src={layoutImage('relationship_status_heart.png')}
                        layout={{ position: 'absolute', left: 0, width: 49, top: 7, height: 17 }}
                    />
                </ContainerButton>
            )}
        </Region>
    );
};
