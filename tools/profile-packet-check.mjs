/** Browser replay of Flash profile bytes through the real socket decoder, parsers and handlers. */
import { fileURLToPath } from 'node:url';

const run = async (root, knownBrokenParser) => {
    const api = await import(`${root}/packages/nitro-api/src/index.ts`);
    const packets = await import(`${root}/packages/nitro-packets/src/index.ts`);
    const { profileStore } = await import('/src/context/user-profile/store/ProfileStore.ts');
    const { systemStore } = await import('/src/context/system/store/SystemStore.ts');
    const { userStore } = await import('/src/context/user/store/UserStore.ts');
    const socket = window.__profileTestSockets?.find(socket => new URL(socket.url).href === new URL(window.NitroParsedConfig['socket.url']).href);

    if (!socket || socket.readyState !== 1) throw new Error('Capture the client WebSocket before loading Nitro; see profile-visual-check.md');

    const saved = { profile: profileStore.getState(), system: systemStore.getState(), user: userStore.getState() };
    const originalSend = socket.send;
    const originalParse = packets.ExtendedProfileMessage.prototype.parse;
    const sent = [];
    const assert = (condition, message) => {
        if (!condition) throw new Error(message);
    };
    const profileBytes = (id, open = true, hidden = false, group = false) => {
        // `_SafeStr_2218`: deliberately distinct tail values expose field misalignment.
        const w = new api.BinaryWriter();

        w.writeInt(id).writeString(`Fixture ${id}`).writeString('').writeString('motto').writeString('01-01-2020');
        w.writeInt(950).writeInt(12).writeByte(0).writeByte(0).writeByte(1).writeInt(group ? 1 : 0);
        if (group) w.writeInt(987).writeString('Group').writeString('badge').writeString('1').writeString('2').writeByte(1).writeInt(id).writeByte(1);
        w.writeInt(49).writeByte(open ? 1 : 0).writeByte(hidden ? 1 : 0).writeInt(20).writeInt(741).writeInt(37).writeByte(1).writeByte(0);
        w.writeInt(192).writeInt(21).writeInt(2).writeByte(1).writeInt(13).writeByte(3).writeInt(17).writeInt(4);

        return w.getBuffer();
    };
    const deliver = (header, bytes) => {
        const frame = new api.BinaryWriter();

        frame.writeInt(bytes.byteLength + 2).writeShort(header).writeBytes(bytes);
        socket.onmessage(new MessageEvent('message', { data: frame.getBuffer() }));
    };
    const body = (fn) => {
        const w = new api.BinaryWriter();

        fn(w);

        return w.getBuffer();
    };
    const incoming = packets.IncomingHeader;
    const outgoing = packets.OutgoingHeader;
    const hasSent = header => sent.some(bytes => new api.BinaryReader(bytes).readInt() >= 2 && new DataView(bytes).getInt16(4) === header);

    socket.send = bytes => sent.push(bytes);
    try {
        // Reproduce the original empty parser body to prove the wire check detects the gap.
        if (knownBrokenParser) packets.ExtendedProfileMessage.prototype.parse = () => ({});
        const wrapper = new api.EvaWireDataWrapper(incoming.ExtendedProfileMessage, new api.BinaryReader(profileBytes(-101, true, false, true)));
        const parsed = new packets.ExtendedProfileMessage().parse(wrapper);

        assert(parsed.userId === -101 && parsed.totalBadgesRank === 4 && parsed.starGemCount === 37 && parsed.badgeRarityCounts[1].count === 17 && parsed.guilds[0].hasForum && !wrapper.bytesAvailable, 'Extended profile wire layout or trailing bytes are incorrect');
        assert(packets.GetIncomingPackets()[incoming.ExtendedProfileMessage] === packets.ExtendedProfileMessage, 'Profile parser is not registered');
        assert(packets.GetOutgoingPackets()[outgoing.BlockUserComposer] === packets.BlockUserComposer, 'Block composer is not registered');
        assert(packets.GetOutgoingPackets()[outgoing.UnblockUserComposer] === packets.UnblockUserComposer, 'Unblock composer is not registered');
        assert(new packets.BlockUserComposer({ userId: -101 }).compose().join() === '-101', 'Block wire payload differs');
        assert(new packets.UnblockUserComposer({ userId: -101 }).compose().join() === '-101', 'Unblock wire payload differs');

        deliver(incoming.ExtendedProfileMessage, profileBytes(-101, true, false, true));
        assert(systemStore.getState().visibleWindows.user_profile?.userId === -101, 'Other-user packet did not open profile');
        assert(hasSent(outgoing.GetSelectedBadgesComposer) && hasSent(outgoing.GetRelationshipStatusInfoComposer) && hasSent(outgoing.GetHabboGroupDetailsComposer), 'Missing follow-up request');
        deliver(incoming.HabboUserBadgesMessage, body(w => w.writeInt(-101).writeInt(1).writeInt(1).writeString('ADM').writeInt(2).writeInt(3)));
        deliver(incoming.RelationshipStatusInfoMessage, body(w => w.writeInt(-101).writeInt(1).writeInt(1).writeInt(3).writeInt(-103).writeString('Friend').writeString('')));
        assert(profileStore.getState().badges[0]?.badgeCode === 'ADM' && profileStore.getState().relationships[0]?.friendCount === 3, 'Follow-up packets did not populate profile');

        deliver(incoming.ExtendedProfileMessage, profileBytes(-102, true, true));
        assert(profileStore.getState().profile?.isHidden && !profileStore.getState().badges.length && !profileStore.getState().relationships.length, 'Profile switching retained old data or lost privacy');
        deliver(incoming.HabboUserBadgesMessage, body(w => w.writeInt(-101).writeInt(1).writeInt(1).writeString('STALE').writeInt(2).writeInt(3)));
        deliver(incoming.RelationshipStatusInfoMessage, body(w => w.writeInt(-101).writeInt(1).writeInt(1).writeInt(3).writeInt(-103).writeString('Stale').writeString('')));
        assert(!profileStore.getState().badges.length && !profileStore.getState().relationships.length, 'Late response contaminated another profile');
        deliver(incoming.ExtendedProfileMessage, profileBytes(-103, false));
        assert(profileStore.getState().profile?.userId === -102, 'Non-opening response replaced visible profile');
        sent.length = 0;
        deliver(incoming.ExtendedProfileChangedMessage, body(w => w.writeInt(-102)));
        assert(hasSent(outgoing.GetExtendedProfileComposer), 'Visible changed profile was not refreshed');
        deliver(incoming.BlockUserUpdateMessage, body(w => w.writeInt(1).writeInt(-102)));
        assert(userStore.getState().blockedUserIds.includes(-102), 'Block response not applied');
        deliver(incoming.BlockUserUpdateMessage, body(w => w.writeInt(2).writeInt(-102)));
        assert(!userStore.getState().blockedUserIds.includes(-102), 'Unblock response not applied');
        systemStore.getState().hideWindow('user_profile');
        sent.length = 0;
        deliver(incoming.ExtendedProfileChangedMessage, body(w => w.writeInt(-102)));
        assert(!sent.length, 'Closed profile requested a refresh');

        return { passed: true, scenarios: [ 'wire fields and complete consumption', 'registration and composers', 'other-user opening and follow-ups', 'profile switching and late responses', 'non-opening and private responses', 'change notification gating', 'block/unblock response handling' ], serverMutations: 0 };
    } finally {
        packets.ExtendedProfileMessage.prototype.parse = originalParse;
        socket.send = originalSend;
        profileStore.setState(saved.profile, true);
        systemStore.setState(saved.system, true);
        userStore.setState(saved.user, true);
    }
};

const root = `/@fs/${fileURLToPath(new URL('../', import.meta.url)).replaceAll('\\', '/').replace(/\/$/, '')}`;
const expression = `(${run.toString()})(${JSON.stringify(root)}, ${process.argv.includes('--known-broken-parser')})`;

console.log(process.argv.includes('--base64') ? Buffer.from(expression).toString('base64') : expression);
