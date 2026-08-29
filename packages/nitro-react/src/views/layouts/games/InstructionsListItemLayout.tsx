import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `284_instructions_list_item_xml` (layout "instructions_list_item", 236x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InstructionsListItemLayoutProps {
    captionNumber?: string;
    captionText?: string;
    layout?: BoxLayout;
}

export const InstructionsListItemLayout = ({ captionNumber, captionText, layout }: InstructionsListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 236, height: 50, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 236, top: 0, height: 50 }}>
                <Region
                    name="number"
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNumber ?? '1.'}
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <Region
                    name="text"
                    layout={{ position: 'absolute', left: 15, right: 0, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionText ?? ''}
                        textOptions={{ fill: '#1077ac', wordWrap: true, wordWrapWidth: 221 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
