/**
 * `triggerconfs/ReceiveLinkMessage.buildInputs` (WIN63-202610201032) - one "general box info"
 * section with `wiredfurni.params.link.receive_message_info` (`TextParam(1)`, multiline) in the
 * style's soft text colour.
 */
import { ReceiveLinkMessageForm, WiredElementView } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { useWiredStyle } from '../../kit/WiredStyleContext';
import { WiredText } from '../../kit/WiredText';

export const ReceiveLinkMessageView: WiredElementView<ReceiveLinkMessageForm> = () => {
    const style = useWiredStyle();

    return (
        <WiredSection title="${wiredfurni.params.general_box_info}">
            <WiredText
                text="${wiredfurni.params.link.receive_message_info}"
                color={style.softTextColor}
            />
        </WiredSection>
    );
};
