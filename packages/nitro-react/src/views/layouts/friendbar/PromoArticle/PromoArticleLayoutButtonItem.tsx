import { BoxLayout, Button } from '#base/theme';

/** Row template `button` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutButtonItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
}

export const PromoArticleLayoutButtonItem = ({ layout, onButton, visibleButton }: PromoArticleLayoutButtonItemProps) => {
    return (
        (visibleButton ?? false) && (
            <Button
                variant="100"
                name="button"
                onPointerTap={onButton}
                layout={{ width: 52, height: 48, flexShrink: 0, maxWidth: 330, ...layout }}
            />
        )
    );
};
