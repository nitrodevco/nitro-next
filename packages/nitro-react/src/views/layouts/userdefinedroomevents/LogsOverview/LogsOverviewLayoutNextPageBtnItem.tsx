import { BoxLayout, ContainerButton, Icon } from '#base/theme';

/** Row template `next_page_btn` of LogsOverviewLayout - pass real rows through its `items…` slot. */
export interface LogsOverviewLayoutNextPageBtnItemProps {
    layout?: BoxLayout;
    onNextPageBtn?: () => void;
}

export const LogsOverviewLayoutNextPageBtnItem = ({ layout, onNextPageBtn }: LogsOverviewLayoutNextPageBtnItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="next_page_btn"
            onPointerTap={onNextPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="5"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 23, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};
