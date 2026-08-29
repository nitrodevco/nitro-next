import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `create_error` of UserCreateLayout - pass real rows through its `items…` slot. */
export interface UserCreateLayoutCreateErrorItemProps {
    captionCreateError?: string;
    layout?: BoxLayout;
    visibleCreateError?: boolean;
}

export const UserCreateLayoutCreateErrorItem = ({ captionCreateError, layout, visibleCreateError }: UserCreateLayoutCreateErrorItemProps) => {
    const t = useTranslation();

    return (
        (visibleCreateError ?? false) && (
            <Region
                name="create_error"
                layout={{ alignSelf: 'stretch', height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionCreateError ?? t('guide.help.request.user.create.input.error')}
                    textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 264 }}
                />
            </Region>
        )
    );
};
