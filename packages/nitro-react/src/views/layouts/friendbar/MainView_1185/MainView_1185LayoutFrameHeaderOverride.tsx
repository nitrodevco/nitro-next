import { BoxLayout, Dropmenu, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `frame_header_override` of MainView_1185Layout - configured through the parent's `frameHeaderOverride` prop. */
export interface MainView_1185LayoutFrameHeaderOverrideProps {
    captionTitleTxt?: string;
    captionTitleTxtShadow0?: string;
    captionTitleTxtShadow1?: string;
    captionTitleTxtShadow2?: string;
    captionTitleTxtShadow3?: string;
    layout?: BoxLayout;
    onDropdownRegion?: () => void;
    onHiddenDropdown?: () => void;
    srcDropdownOpener?: string;
}

export const MainView_1185LayoutFrameHeaderOverride = ({ captionTitleTxt, captionTitleTxtShadow0, captionTitleTxtShadow1, captionTitleTxtShadow2, captionTitleTxtShadow3, layout, onDropdownRegion, onHiddenDropdown, srcDropdownOpener }: MainView_1185LayoutFrameHeaderOverrideProps) => {
    return (
        <Region
            name="frame_header_override"
            layout={{ position: 'absolute', left: 88, right: 101, top: 3, height: 32, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', width: 115, top: 0, bottom: 0, flexDirection: 'row', gap: 6 }}>
                <Region
                    name="hacky_title"
                    layout={{ width: 96, height: 27, flexShrink: 0 }}
                >
                    <Region
                        name="title_txt_shadow_0"
                        layout={{ position: 'absolute', left: 0, width: 94, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionTitleTxtShadow0 ?? 'Top Badges'}
                    </Region>
                    <Region
                        name="title_txt_shadow_1"
                        layout={{ position: 'absolute', left: 1, width: 94, top: 4, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionTitleTxtShadow1 ?? 'Top Badges'}
                    </Region>
                    <Region
                        name="title_txt_shadow_2"
                        layout={{ position: 'absolute', left: 2, width: 94, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionTitleTxtShadow2 ?? 'Top Badges'}
                    </Region>
                    <Region
                        name="title_txt_shadow_3"
                        layout={{ position: 'absolute', left: 1, width: 94, top: 6, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionTitleTxtShadow3 ?? 'Top Badges'}
                    </Region>
                    <Region
                        name="title_txt"
                        layout={{ position: 'absolute', left: 1, width: 94, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTitleTxt ?? 'Top Badges'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="dropdown_region"
                    dynamicStyle="button"
                    onPointerTap={onDropdownRegion}
                    cursor="pointer"
                    layout={{ width: 13, height: 9, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="dropdown_opener"
                        src={srcDropdownOpener ?? layoutImage('badge_leaderboard_dropdown_opener.png')}
                        layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 8 }}
                    />
                    <Dropmenu
                        variant="100"
                        name="hidden_dropdown"
                        onPointerTap={onHiddenDropdown}
                        layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 0 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
