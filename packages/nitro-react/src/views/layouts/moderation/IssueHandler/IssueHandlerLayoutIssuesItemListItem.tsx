import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Row template `issues_item_list` of IssueHandlerLayout - pass real rows through its `items…` slot. */
export interface IssueHandlerLayoutIssuesItemListItemProps {
    captionCategory?: string;
    captionReporter?: string;
    captionTimeOpen?: string;
    captionType?: string;
    layout?: BoxLayout;
    visibleCategory?: boolean;
    visibleReporter?: boolean;
    visibleTimeOpen?: boolean;
    visibleType?: boolean;
}

export const IssueHandlerLayoutIssuesItemListItem = ({ captionCategory, captionReporter, captionTimeOpen, captionType, layout, visibleCategory, visibleReporter, visibleTimeOpen, visibleType }: IssueHandlerLayoutIssuesItemListItemProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 280, height: 70, flexShrink: 0, ...layout }}
        >
            <Region
                name="issues_item_list"
                backgroundColor="#ffffff"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                <Region layout={{ width: 280, height: 16, flexShrink: 0 }}>
                    {(visibleReporter ?? true) && (
                        <ThemeText
                            text={captionReporter ?? 'reporter'}
                            name="reporter"
                            layout={{ position: 'absolute', left: 0, width: 78, top: 0, height: 13, maxWidth: 78 }}
                        />
                    )}
                    {(visibleCategory ?? true) && (
                        <ThemeText
                            text={captionCategory ?? 'category'}
                            name="category"
                            layout={{ position: 'absolute', left: 78, width: 110, top: 0, height: 13, maxWidth: 110 }}
                        />
                    )}
                    {(visibleType ?? true) && (
                        <ThemeText
                            text={captionType ?? 'type'}
                            name="type"
                            layout={{ position: 'absolute', left: 188, width: 60, top: 0, height: 13, maxWidth: 60 }}
                        />
                    )}
                    {(visibleTimeOpen ?? true) && (
                        <ThemeText
                            text={captionTimeOpen ?? '00:00'}
                            name="time_open"
                            layout={{ position: 'absolute', left: 248, width: 32, top: 0, height: 13 }}
                        />
                    )}
                </Region>
            </Region>
        </ScrollArea>
    );
};
