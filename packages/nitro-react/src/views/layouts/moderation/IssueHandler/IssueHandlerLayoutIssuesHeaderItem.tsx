import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `issues_header` of IssueHandlerLayout - pass real rows through its `items…` slot. */
export interface IssueHandlerLayoutIssuesHeaderItemProps {
    layout?: BoxLayout;
}

export const IssueHandlerLayoutIssuesHeaderItem = ({ layout }: IssueHandlerLayoutIssuesHeaderItemProps) => {
    return (
        <Region
            name="issues_header"
            layout={{ width: 280, height: 13, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', marginLeft: -101, marginRight: 101, width: 78, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Reporter"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region layout={{ position: 'absolute', marginLeft: -7, marginRight: 7, width: 110, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Category"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region layout={{ position: 'absolute', marginLeft: 78, marginRight: -78, width: 60, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Type"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region layout={{ position: 'absolute', marginLeft: 124, marginRight: -124, width: 32, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Open"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};
