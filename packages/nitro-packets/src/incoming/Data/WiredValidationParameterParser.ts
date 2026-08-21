import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IWiredValidationParameter {
    key: string;
    value: string;
}

export const WiredValidationParameterParser = (wrapper: IMessageDataWrapper): IWiredValidationParameter => {
    const data: IWiredValidationParameter = {
        key: '',
        value: '',
    };

    data.key = wrapper.readString();
    data.value = wrapper.readString();

    return data;
}
