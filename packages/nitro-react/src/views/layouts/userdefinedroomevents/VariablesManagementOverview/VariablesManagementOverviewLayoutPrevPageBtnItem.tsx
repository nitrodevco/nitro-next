import { BoxLayout, ContainerButton, Icon } from '#base/theme';

/** Row template `prev_page_btn` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutPrevPageBtnItemProps {
    layout?: BoxLayout;
    onPrevPageBtn?: () => void;
}

export const VariablesManagementOverviewLayoutPrevPageBtnItem = ({ layout, onPrevPageBtn }: VariablesManagementOverviewLayoutPrevPageBtnItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="prev_page_btn"
            onPointerTap={onPrevPageBtn}
            layout={{ width: 50, height: 30, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Icon
                variant="4"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 22, width: 10, top: 10, height: 10 }}
            />
        </ContainerButton>
    );
};
