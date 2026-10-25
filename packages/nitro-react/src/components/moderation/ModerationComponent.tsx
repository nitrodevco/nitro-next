/**
 * Mounts Flash's moderation tool (`ModerationManager`) for a moderator: the start panel once
 * `ModeratorInit` came, and the windows its `WindowTracker` holds - user info, room tool, chatlog
 * send message, mod action and room visits - each once per kind and id, the newest on top; and the
 * call for help queue (`IssueManager`): its browser and an issue handler per bundle handled. The
 * user classification windows (`UserClassificationCtrl`) are no tracked window and need no init:
 * Flash's message handler opens one for whoever gets `UserClassification`.
 */
import { moderationWindowKey, useModerationIssueStore, useModerationStore } from '#base/context/moderation';
import { ModActionView } from '#base/views/moderation/ModActionView';
import { ModChatlogView } from '#base/views/moderation/ModChatlogView';
import { ModIssueBrowserView } from '#base/views/moderation/ModIssueBrowserView';
import { ModIssueHandlerView } from '#base/views/moderation/ModIssueHandlerView';
import { ModRoomToolView } from '#base/views/moderation/ModRoomToolView';
import { ModRoomVisitsView } from '#base/views/moderation/ModRoomVisitsView';
import { ModSendMessageView } from '#base/views/moderation/ModSendMessageView';
import { ModStartPanelView } from '#base/views/moderation/ModStartPanelView';
import { ModUserClassificationView } from '#base/views/moderation/ModUserClassificationView';
import { ModUserInfoView } from '#base/views/moderation/ModUserInfoView';

export const ModerationComponent = () => {
    const hasInit = useModerationStore(x => !!x.init);
    const windows = useModerationStore(x => x.windows);
    const browserOpen = useModerationIssueStore(x => x.browserOpen);
    const handlers = useModerationIssueStore(x => x.handlers);
    const classifications = useModerationStore(x => x.classifications);

    return (
        <>
            {hasInit && <ModStartPanelView />}
            {windows.map((window) => {
                const key = moderationWindowKey(window);

                switch (window.kind) {
                    case 'userInfo': return (
                        <ModUserInfoView
                            key={key}
                            userId={window.userId}
                            issueId={window.issueId}
                        />
                    );
                    case 'roomTool': return (
                        <ModRoomToolView
                            key={key}
                            roomId={window.roomId}
                        />
                    );
                    case 'chatlog': return (
                        <ModChatlogView
                            key={key}
                            type={window.type}
                            id={window.id}
                        />
                    );
                    case 'roomVisits': return (
                        <ModRoomVisitsView
                            key={key}
                            userId={window.userId}
                        />
                    );
                    case 'sendMessage': return (
                        <ModSendMessageView
                            key={key}
                            userId={window.userId}
                            userName={window.userName}
                            issueId={window.issueId}
                        />
                    );
                    case 'modAction': return (
                        <ModActionView
                            key={key}
                            userId={window.userId}
                            userName={window.userName}
                            issueId={window.issueId}
                        />
                    );
                }
            })}
            {browserOpen && <ModIssueBrowserView />}
            {handlers.map(bundleId => (
                <ModIssueHandlerView
                    key={bundleId}
                    bundleId={bundleId}
                />
            ))}
            {classifications.map(classification => (
                <ModUserClassificationView
                    key={classification.id}
                    classification={classification}
                />
            ))}
        </>
    );
};
