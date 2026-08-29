import { Border, BoxLayout, Region, Shape, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `points_indicator_container` of Main_100Layout - configured through the parent's `pointsIndicatorContainer` prop. */
export interface Main_100LayoutPointsIndicatorContainerProps {
    captionPointsTxt?: string;
    layout?: BoxLayout;
    recolorMedium?: string;
    srcAvailableIcon?: string;
}

export const Main_100LayoutPointsIndicatorContainer = ({ captionPointsTxt, layout, recolorMedium, srcAvailableIcon }: Main_100LayoutPointsIndicatorContainerProps) => {
    return (
        <Region
            name="points_indicator_container"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2, ...layout }}
        >
            <Border
                variant="15"
                tintColor={recolorMedium ?? '#cfe2f9'}
                blend={0.7}
                layout={{ position: 'absolute', left: 6, width: 844, bottom: -11, height: 44 }}
            >
                <Region
                    blendMode="add"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </Border>
            <Region
                name="points_indicator"
                layout={{ position: 'absolute', left: 194, right: 51, top: 0, bottom: 0 }}
            >
                <Region
                    name="point_indicator_template"
                    layout={{ position: 'absolute', left: 9, width: 80, top: 82, height: 157 }}
                >
                    <ThemeImage
                        name="available_icon"
                        src={srcAvailableIcon ?? layoutImage('reward_track_not_available_icon.png')}
                        layout={{ position: 'absolute', left: 30, width: 20, top: 7, height: 20 }}
                    />
                    <Shape
                        shape="ellipse"
                        color={recolorMedium ?? '#cfe2f9'}
                        strokeThickness={3}
                        layout={{ position: 'absolute', left: 37, width: 7, top: 121, height: 7 }}
                    />
                    <Shape
                        color={recolorMedium ?? '#cfe2f9'}
                        strokeThickness={3}
                        layout={{ position: 'absolute', left: 40, width: 1, top: 127, height: 8 }}
                    />
                    <Shape
                        name="connector"
                        color={recolorMedium ?? '#cfe2f9'}
                        strokeThickness={3}
                        layout={{ position: 'absolute', left: 40, width: 1, bottom: 35, height: 9 }}
                    />
                    <Region
                        name="points_txt"
                        layout={{ position: 'absolute', left: 0, width: 80, top: 136, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPointsTxt ?? '100'}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
