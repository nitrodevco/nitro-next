import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plus_template` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutPlusTemplateItemProps {
    captionPlusTemplate?: string;
    layout?: BoxLayout;
}

export const LevelUpLayoutPlusTemplateItem = ({ captionPlusTemplate, layout }: LevelUpLayoutPlusTemplateItemProps) => {
    return (
        <ThemeText
            text={captionPlusTemplate ?? ' '}
            textStyle="text-style-il-heading-1"
            textOptions={{ fill: '#222222' }}
            name="plus_template"
            layout={{ width: 22, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
