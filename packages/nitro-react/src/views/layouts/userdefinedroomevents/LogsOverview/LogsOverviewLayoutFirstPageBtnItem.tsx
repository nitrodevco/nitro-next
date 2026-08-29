import { BoxLayout, ContainerButton, Icon } from '#base/theme';

/** Row template `first_page_btn` of LogsOverviewLayout - pass real rows through its `items…` slot. */
export interface LogsOverviewLayoutFirstPageBtnItemProps {
    layout?: BoxLayout;
    onFirstPageBtn?: () => void;
}

export const LogsOverviewLayoutFirstPageBtnItem = ({ layout, onFirstPageBtn }: LogsOverviewLayoutFirstPageBtnItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="first_page_btn"
            onPointerTap={onFirstPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="4"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 18, width: 10, top: 10, height: 10 }}
            />
            <Icon
                variant="4"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 27, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};
