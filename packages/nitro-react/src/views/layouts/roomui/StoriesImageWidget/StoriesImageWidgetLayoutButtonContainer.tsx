import { BoxLayout, Button, CloseButton, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `buttonContainer` of StoriesImageWidgetLayout - configured through the parent's `buttonContainer` prop. */
export interface StoriesImageWidgetLayoutButtonContainerProps {
    layout?: BoxLayout;
    onClosebutton?: () => void;
    onRemovebutton?: () => void;
    onReportButton?: () => void;
}

export const StoriesImageWidgetLayoutButtonContainer = ({ layout, onClosebutton, onRemovebutton, onReportButton }: StoriesImageWidgetLayoutButtonContainerProps) => {
    return (
        <Region
            name="buttonContainer"
            layout={{ position: 'absolute', left: 27, width: 84, top: 68, height: 40, ...layout }}
        >
            <Region
                name="reportButtonContainer"
                layout={{ position: 'absolute', left: 8, width: 20, top: 5, height: 25 }}
            >
                <Button
                    variant="5"
                    name="reportButton"
                    tintColor="#de4537"
                    onPointerTap={onReportButton}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 20, minWidth: 19, maxWidth: 19 }}
                />
                <ThemeImage
                    src={layoutImage('icons_flag.png')}
                    layout={{ position: 'absolute', left: 3, width: 14, top: 3, height: 16 }}
                />
            </Region>
            <Region
                name="removeButtonContainer"
                layout={{ position: 'absolute', left: 33, width: 19, top: 5, height: 24 }}
            >
                <Button
                    variant="5"
                    name="removebutton"
                    tintColor="#de4537"
                    onPointerTap={onRemovebutton}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20, minWidth: 19, maxWidth: 19 }}
                />
                <ThemeImage
                    src={layoutImage('common_trashcan_small.png')}
                    layout={{ position: 'absolute', left: 3, width: 14, top: 4, height: 11 }}
                />
            </Region>
            <CloseButton
                variant="3"
                name="closebutton"
                tintColor="#de4537"
                onPointerTap={onClosebutton}
                layout={{ position: 'absolute', left: 57, width: 19, top: 5, height: 28, minWidth: 19, maxWidth: 19 }}
            />
            <Region layout={{ position: 'absolute', left: 81, width: 3, top: 5, height: 35 }} />
        </Region>
    );
};
