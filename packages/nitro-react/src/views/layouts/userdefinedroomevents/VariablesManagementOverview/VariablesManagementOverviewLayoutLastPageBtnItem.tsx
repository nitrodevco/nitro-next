import { BoxLayout, ContainerButton, Icon } from '#base/theme';

/** Row template `last_page_btn` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutLastPageBtnItemProps {
    layout?: BoxLayout;
    onLastPageBtn?: () => void;
}

export const VariablesManagementOverviewLayoutLastPageBtnItem = ({ layout, onLastPageBtn }: VariablesManagementOverviewLayoutLastPageBtnItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="last_page_btn"
            onPointerTap={onLastPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="5"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 18, width: 10, top: 10, height: 10 }}
            />
            <Icon
                variant="5"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 27, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};
