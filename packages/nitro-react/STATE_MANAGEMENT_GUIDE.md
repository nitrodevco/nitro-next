# Nitro React State Management Guide

This guide documents the optimized state management patterns for the nitro-react package using Zustand.

## Architecture Overview

The state management is organized into **three main layers**:

1. **Store Layer** (`/stores`) - Zustand store slices defining state and actions
2. **Selector Layer** (`/selectors`) - Granular selectors for fine-grained component subscriptions
3. **Hook Layer** (`/hooks`) - React hooks providing convenient access to state and actions

## Store Structure

### Room Store (`/stores/room/RoomStore.ts`)

The room store is a Zustand store divided into modular slices:

- **RoomSessionSlice** - Room settings (door mode, trade mode, permissions, decoration state)
- **RoomCameraSlice** - Camera state and movement
- **RoomSelectedObjectSlice** - Currently selected objects/avatars

Each store instance is created per room and automatically reset when the room changes.

```typescript
const store = createRoomStore(room);
```

### Automatic Reset on Room Change

When you switch rooms, the `RoomContextProvider` automatically:
1. Detects the room change
2. Calls `resetRoomState()` to clear interaction state
3. Maintains room/roomId for proper initialization

## Using Selectors

### Fine-Grained Selectors (Recommended for Performance)

Use individual selectors when you only need specific values:

```typescript
// Hook-based selector (recommended)
import { useRoomCameraTargetSelector } from '#base/selectors';

const MyComponent = () => {
    const { targetId, targetCategory } = useRoomCameraTargetSelector();
    // Only re-renders when target changes
};
```

### Granular Selector Factories

Access selector functions directly when you need custom compositions:

```typescript
import { selectTargetId, selectPermissions } from '#base/stores';
import { useRoomContext } from '#base/context';

const MyComponent = () => {
    const targetId = useRoomContext(selectTargetId);
    const permissions = useRoomContext(x => ({
        controllerLevel: x.controllerLevel,
        isRoomOwner: x.isRoomOwner
    }));
};
```

### Composite Selectors (Common Combinations)

Pre-built selectors for frequently used state combinations:

```typescript
import { selectGameStateAndPermissions } from '#base/stores';
import { useRoomContext } from '#base/context';

const MyComponent = () => {
    const state = useRoomContext(selectGameStateAndPermissions);
    // { isPlayingGame, isSpectator, controllerLevel, isRoomOwner, isDecorating }
};
```

## Using Actions

### Quick Access with Hook Utilities

Use the new action hooks for cleaner code:

```typescript
import { useRoomPermissionActions } from '#base/hooks';

const MyComponent = () => {
    const { setControllerLevel, setIsRoomOwner, setPermissions } = useRoomPermissionActions();
    
    // Update single values
    setControllerLevel(RoomControllerLevelEnum.Owner);
    
    // Or batch update related state
    setPermissions(RoomControllerLevelEnum.Owner, true);
};
```

### Available Action Hooks

- **useRoomPermissionActions()** - Permission-related setters
- **useRoomSettingActions()** - Room settings (doors, trades, pets)
- **useRoomCameraActions()** - Camera control and movement
- **useRoomSelectedObjectActions()** - Object/avatar selection

### Direct Context Access (Advanced)

For handlers and special cases:

```typescript
import { useRoomContext } from '#base/context';
import { useShallow } from 'zustand/shallow';

const handler = () => {
    const { setRoomSettings, setIsGuildRoom } = useRoomContext(useShallow(x => ({
        setRoomSettings: x.setRoomSettings,
        setIsGuildRoom: x.setIsGuildRoom
    })));
};
```

## Selector Reference

### Individual Selectors

```typescript
// Camera
selectTargetId
selectTargetCategory
selectTargetInfo
selectCameraSettings
selectCameraFull

// Permissions
selectControllerLevel
selectIsRoomOwner
selectPermissions

// Room Settings
selectDoorMode
selectTradeMode
selectAllowPets
selectIsGuildRoom
selectRoomSettings

// State
selectIsDecorating
selectIsPlayingGame
selectIsSpectator
selectGameState

// Objects
selectSelectedAvatarId
selectSelectedObjectId
selectSelectedObjectCategory
selectSelectedObject
selectSelectedObjectFull
selectPlacedObject
selectObjectPlacementSource
selectObjectPlacement

// Room Info
selectRoomId
selectRoom
selectOwnUserId
selectRoomInfo
```

### Composite Selectors

```typescript
// For combined domain use cases
selectCameraAndPermissions
selectSelectedObjectAndPlaced
selectGameStateAndPermissions
selectRoomAccessControl
selectInteractionState
selectRoomStatusAndSettings
```

## Hook Selectors Available

```typescript
// Specialized single-purpose hooks
useRoomCameraSelector()          // Full camera state
useRoomSessionSelector()         // Full session state
useRoomSelectedObjectSelector()  // Full selected object state
useRoomPermissionsSelector()     // Just permissions
useRoomSettingsSelector()        // Just room settings
useRoomGameStateSelector()       // Just game state
useRoomCameraTargetSelector()    // Just camera target
useRoomObjectPlacementSelector() // Just object placement
```

## Batch Actions

Several slices now support batch actions for atomicity:

```typescript
// Room Settings - update door mode, trade mode, and pets in one update
setRoomSettings(doorMode, tradeMode, allowPets);

// Permissions - update controller level and room owner status together
setPermissions(controllerLevel, isRoomOwner);

// Camera - set both target ID and category together
setTarget(targetId, targetCategory);
```

## Migration Guide

### Before (Old Pattern)

```typescript
// Destructuring arrays - hard to read
const [setTradeMode, setIsGuildRoom, setDoorMode, setAllowPets] = useRoomContext(
    useShallow(x => [x.setTradeMode, x.setIsGuildRoom, x.setDoorMode, x.setAllowPets])
);
```

### After (New Pattern)

```typescript
// Option 1: Use action hook
const { setRoomSettings, setIsGuildRoom } = useRoomSettingActions();

// Option 2: Use context with object destructuring
const { setRoomSettings, setIsGuildRoom } = useRoomContext(useShallow(x => ({
    setRoomSettings: x.setRoomSettings,
    setIsGuildRoom: x.setIsGuildRoom
})));

// Option 3: Use selector factory with batch action
setRoomSettings(doorMode, tradeMode, allowPets);
```

## Performance Best Practices

1. **Use Fine-Grained Selectors**
   - Only subscribe to the state you need
   - Each granular selector creates a new subscription at minimal cost

2. **Use Shallow Comparison**
   - Already built into hook selectors
   - Prevents re-renders when selecting objects

3. **Use Batch Actions**
   - Multiple related updates in one action
   - Reduces number of notifications to subscribers

4. **Avoid Selector in Dependency Arrays**
   - Selectors are stable, don't include them in useEffect dependencies

## Examples

### Example 1: Permission-Based UI

```typescript
import { useRoomPermissionsSelector } from '#base/selectors';

const AdminPanel = () => {
    const { controllerLevel, isRoomOwner } = useRoomPermissionsSelector();
    
    if (controllerLevel < RoomControllerLevelEnum.Moderator) return null;
    
    return <div>Admin Controls</div>;
};
```

### Example 2: Handler with Batch Update

```typescript
import { useRoomContext } from '#base/context';
import { useMessageListener } from '#base/hooks';

const MyHandler = () => {
    const { setRoomSettings, setIsGuildRoom } = useRoomContext(useShallow(x => ({
        setRoomSettings: x.setRoomSettings,
        setIsGuildRoom: x.setIsGuildRoom
    })));
    
    useMessageListener(RoomDataMessage, data => {
        // Update all settings in one action
        setRoomSettings(data.doorMode, data.tradeMode, data.allowPets);
        setIsGuildRoom(data.groupId !== 0);
    });
};
```

### Example 3: Complex Component State

```typescript
import { selectGameStateAndPermissions } from '#base/stores';
import { useRoomContext } from '#base/context';

const InteractionPanel = () => {
    const { isPlayingGame, isSpectator, controllerLevel } = useRoomContext(
        useShallow(selectGameStateAndPermissions)
    );
    
    const canInteract = !isPlayingGame && !isSpectator && 
                        controllerLevel >= RoomControllerLevelEnum.Guest;
    
    return canInteract ? <InteractionControls /> : null;
};
```

## Room State Reset

The room state is automatically reset when:
- A new room is passed to `RoomContextProvider`
- The room ID changes

Reset clears:
- Session state (permissions, decorating, game state)
- Camera state
- Selected object state
- Mouse event IDs

It preserves:
- Room and room ID
- Own user ID

## Debugging

### View Current Room Store State

```typescript
const store = useRoomContext(x => x); // Warning: subscribes to all state!

// Better: log specific slices in development
useEffect(() => {
    const unsubscribe = roomStore.subscribe(
        state => console.log('Room state:', state),
        state => state.isDecorating
    );
    return unsubscribe;
}, []);
```

### Check Store Size

The optimized selectors reduce re-renders significantly:
- Before: Large monolithic store with many subscriptions
- After: Fine-grained selectors with selective subscriptions

## Future Patterns

The architecture allows for future optimizations:
- Direct Zustand hooks without Context provider
- Server state integration with React Query
- Devtools integration for debugging
- Persistence plugins for state recovery
