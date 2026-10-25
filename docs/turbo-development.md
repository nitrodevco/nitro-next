# Nitro and Turbo development

Use this guide when a feature spans the client and server, a packet does not behave as expected,
or a live check needs server support. Turbo is the emulator used for development. Read the target
Turbo checkout's `AGENTS.md` and the relevant parts of `CONTEXT.md` before changing server code;
those files own its architecture and contribution rules.

## Keep the environments aligned

Keep Nitro and Turbo as separate Git checkouts. Record both branches and commit IDs for a joint
change, including any uncommitted dependencies. A passing mixed WIP is not proof that either PR
works independently. Use each developer's own checkout locations; no shared absolute path is needed.

| Contract | Nitro side | Turbo side |
| --- | --- | --- |
| Protocol revision | `production.version` in the loaded client configuration | Registered `IRevision.Revision`; session selected by `ClientHelloMessageHandler` |
| Connection | `socket.url` | `serverOptions:WebSocketServer:listeners` and any configured proxy/TLS endpoint |
| Authentication | `sso` URL query parameter sent by `SSOTicketComposer` | `SSOTicketMessageHandler` and `AuthenticationService` |
| Gamedata and assets | Loaded config URLs, asset bundles and furniture definitions | Development hotel's definitions, catalog and room models |
| Test state | Dedicated account, room and fixture | The same account and room in the configured development database |

The inspected revision is `WIN63-202609091217-117204808`, implemented under
`Turbo.Revisions/Revision20260909/`. Confirm the current registration when changing revisions;
updating the client's version string alone does not update packet headers or payload layouts.
Keep asset imports, configuration and database definitions consistent with the fixture being tested.
See [Nitro Studio workflow](nitro-studio.md) for workspace and version management.

## Start the development environment

From the Turbo root, install the SDK selected by `global.json` and follow its README for MySQL setup.
Bootstrap once using the shell available on your machine:

```powershell
pwsh -File scripts/bootstrap.ps1
```

For bash, use `sh scripts/bootstrap.sh`. Bootstrap configures Git hooks, creates local settings if
absent, and builds the host. Configure `Turbo:Database:ConnectionString` in the ignored
`appsettings.Development.json` for your development database. Keep credentials out of shared files.
Set the WebSocket listener for your environment, then start Turbo from its root:

```powershell
$env:DOTNET_ENVIRONMENT = 'Development'
dotnet run --project Turbo.Main/Turbo.Main.csproj
```

The bash equivalent is `DOTNET_ENVIRONMENT=Development dotnet run --project Turbo.Main/Turbo.Main.csproj`.
Use the project-scoped command; the solution may include other projects that are not needed for
core server work. Check startup logs for the loaded configuration and registered revision.

In another terminal, start the client as in [Development setup](development.md) and open Vite's
printed URL. Point the loaded Nitro `socket.url` at Turbo's WebSocket listener, not its
TCP or Orleans gateway port. Use the browser-reachable hostname and port; a listener bind address
such as `0.0.0.0` is not the URL to give the client. Match `ws`/`wss` to the configured endpoint.
Keep developer-specific endpoint changes out of unrelated feature PRs.

Obtain a fresh ticket through the development hotel's authentication workflow and open the client
with `?sso=<ticket>` (or append `&sso=<ticket>` to an existing query). Nitro sends the configured
revision in `ClientHelloComposer` before the SSO packet. The inspected Turbo authentication service
looks up `SecurityTickets` and consumes unlocked tickets, so reusing a consumed ticket can fail.
The ticket-issuing workflow is environment-specific; this guide does not assume a ticket API or CLI.
Do not copy live tickets into documentation, logs, screenshots or PRs.

## Trace a feature across the boundary

Directions are named from the perspective of each repository:

| Flow | Nitro | Turbo |
| --- | --- | --- |
| Client request | `nitro-react/src/commands/` → `nitro-packets/src/outgoing/` and `GetOutgoingPackets.ts` | `Turbo.Revisions/Revision<id>/Parsers/` → `Turbo.PacketHandlers/` → owning domain/grain |
| Server response | `nitro-packets/src/incoming/` and `GetIncomingPackets.ts` → React handler → store → view | Domain/grain → composer in `Turbo.Primitives/Messages/Outgoing/` → revision `Serializers/` |
| Header registration | Packet header maps and `Get*Packets.ts` registries | Revision `Headers.cs` and `Revision<id>.cs` mappings |

In this checkout, `Turbo.Main` references `Turbo.Revisions` directly. Protocol parser/serializer code
belongs there. Older revision documentation may refer to an external plugin; follow the compiled
project references and the current Turbo coding contract when determining ownership.

For each changed exchange, record the header, ordered field types, array counts, optional tails,
units, trigger and expected state transition. AS3 decides the behavior; compare both sides before
changing a parser to tolerate unexpected server data. A registered packet with no consumer is still
an incomplete feature. Check permissions, configuration gates and failure responses as well as the
successful path. See [packet conventions](packets.md). [Server gaps](server-gaps.md) lists the
exchanges the client implements that Turbo does not answer yet (`node tools/server-gaps.mjs`).

Keep Turbo handlers focused on orchestration. Domain/grain code owns runtime state and persistence;
do not update database rows directly to bypass grain-owned state. Keep client-specific display logic
in Nitro. Check Turbo's architecture contract for the relevant domain before implementing a fix.

## Turbo protocol extensions

The client stays a plain Habbo client against any server. Where Habbo's protocol cannot say
something, Turbo offers opt-in extensions: after the user object the client sends
`TurboClientCapabilitiesComposer` (header 30000), and a Turbo server answers with
`TurboServerCapabilitiesMessage` (30000), which `userStore.turboCapabilities` keeps. Headers
30000-30099 are reserved for these on both sides; another server ignores the unknown packet and
never answers. A hotel whose server objects to unknown packets sets `turbo.extensions.disabled`
and the client never asks. An extension's packets are taken only once the server has accepted it,
so a server using the same headers for something else cannot feed them in. Turbo's
`docs/client-capabilities.md` owns the wire format.

The first two. `chat.commands.v2` gives the chat input Turbo's command tree and its
suggestions (`TurboCommandTreeMessage` 30002, `TurboCommandSuggestComposer` 30003,
`TurboCommandSuggestionsMessage` 30004, into `UserChatCommandsSlice`). `permission.nodes`: Turbo sends the user's client-facing permission
nodes (`TurboPermissionNodesMessage`, 30001) after `UserRights` and on every change, into
`userStore.permissionNodes`. Every security-level check goes through a `ClientGates` entry
(`src/context/user/gates/ClientGate.ts`) and `useClientGate` / `hasClientGate`: the gate asks its
node when the store has nodes, and the Flash `hasSecurity` level otherwise. Add a new staff-only
feature as a gate there, with the Flash level it ports and the Turbo node behind it - never as a
bare `securityLevel` comparison - and register the node in Turbo with the same client level.

`client.modules` names the JavaScript modules a server's plugins ship (`TurboClientModulesMessage`,
30009), which the client loads and hands its module API: see [Client modules](client-modules.md).

## Verify the complete change

Run Nitro's applicable [code gates](../AGENTS.md) and focused regressions. For Turbo code changes,
its required checks are run from the Turbo root:

```sh
dotnet build Turbo.Main/Turbo.Main.csproj -t:TurboCloudFastCheck
dotnet build Turbo.Main/Turbo.Main.csproj -t:TurboCloudQualityGate
```

These are build/format/analyzer gates, not evidence that a gameplay exchange works. Check the target
checkout's instructions for additional domain verification. Do not run database migrations or alter
a shared fixture just to get a check green without the appropriate authorization.

For a joint feature, verify the actual request/response on a dedicated development account and room.
Exercise one relevant failure or permission case and lifecycle behavior such as leaving/re-entering
a room or reconnecting. If persistence is part of the change, check it through the supported lifecycle.
Packet injection isolates client handling; it does not prove Turbo emits the right response.
For rendering changes, also use [renderer verification](renderer-parity.md).

Batch server changes before restarting the development host, then reconnect Nitro with a fresh ticket
as needed. Do not terminate an unidentified process. Record which commits and fixture were actually
running. Keep diagnostic reports under ignored `tmp/`, with credentials and personal data removed.

## Diagnose the failing layer

| Symptom | Check first |
| --- | --- |
| Socket never opens | Loaded `socket.url`, WebSocket listener, port conflicts and TLS/proxy configuration |
| Socket opens but login fails | Matching revision, ticket for this database, ticket consumption and SSO handler logs |
| Login works but an action does nothing | Outgoing registration, Turbo parser/handler mapping, permission/configuration gates |
| Server sends data but UI does not update | Field order/types, incoming registration, subscription and current store state |
| Furniture appears incorrectly or assets return 404 | Nitro Studio workspace, generated URLs, imported definitions, bundles and room fixture |
| Change disappears after re-entry | Owning grain, persistence path, reset/reload behavior and cached state |

## Cross-repository handoff

Include the two commit IDs, dependent PRs and merge order, changed packet/configuration contracts,
any database or asset prerequisites, fixture setup, checks run and remaining gaps. State whether either
side remains compatible on its own. Keep machine-specific checkout locations and live session details
in local task notes rather than the shared guide.
