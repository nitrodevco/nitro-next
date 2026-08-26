import { BoxLayout, Bubble, Region } from '#base/theme';

/** Generated from `894_new_user_help_xml` (layout "new_user_help", 140x51) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewUserHelpLayoutProps {
    layout?: BoxLayout;
}

export const NewUserHelpLayout = ({ layout }: NewUserHelpLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 140, height: 51, ...layout }}>
            <Bubble
                variant="1"
                name="border"
                params={1}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            >
                <Region
                    name="help"
                    params={12582928}
                    layout={{ position: 'absolute', left: 5, width: 0, top: 5, height: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                />
            </Bubble>
        </Region>
    );
};
