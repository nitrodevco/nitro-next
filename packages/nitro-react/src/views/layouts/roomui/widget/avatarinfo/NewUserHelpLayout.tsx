import { BoxLayout, Bubble, Region, ThemeText } from '#base/theme';

/** Generated from `894_new_user_help_xml` (layout "new_user_help", 140x51) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewUserHelpLayoutProps {
    captionHelp?: string;
    layout?: BoxLayout;
    visibleBorder?: boolean;
}

export const NewUserHelpLayout = ({ captionHelp, layout, visibleBorder }: NewUserHelpLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 140, height: 51, ...layout }}>
            <Region
                visible={visibleBorder ?? true}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            >
                <Bubble
                    variant="1"
                    name="border"
                    params={1}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="help"
                        params={12582928}
                        layout={{ position: 'absolute', left: 5, width: 0, top: 5, height: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionHelp ?? ''}
                            textStyle="text-style-u-bold"
                            textOptions={{ wordWrap: true, wordWrapWidth: 0 }}
                        />
                    </Region>
                </Bubble>
            </Region>
        </Region>
    );
};
