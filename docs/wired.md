# Wired (`src/wired`, `views/wired-*`)

The port of `com/sulake/habbo/roomevents/**`. A Flash element is a stateful widget tree; here it
is two files:

- `src/wired/elements/<holder>/<Name>.ts` - the **definition** (`WiredElementDefinition<Form>`,
  contract in `src/wired/WiredElement.ts`): `createForm` is `onEditStart`, `readIntParams` /
  `readStringParam` / `readVariableIds` are `read*FromForm`, pure functions of the form. Keep
  Flash's param order, magic numbers and `'n'` (`WIRED_VARIABLE_ID_NONE`) where Flash names it.
- `src/views/wired-setup/elements/<holder>/<Name>View.tsx` - `buildInputs`, drawn with the wired
  kit (`views/wired-setup/kit`, styled by `src/wired/styles`). None for `INPUTS_TYPE_NONE`.
- Register the pair in `<holder>Elements.ts` in Flash's push order. `src/wired` is pure `.ts`
  (barrel `#base/wired`); the `*Elements.ts` files import views and stay out of the barrel.

What a definition cannot compute from the triggerable comes through `WiredElementContext`
(`ctx`): config, localization, permissions, the user's groups, the room's achievements, the
room's variables (`roomVariables` - a `readVariableIds` sends each picker through
`finalizePickerSelection(ctx.roomVariables, picker)`, Flash's `finalizeSelection`), and
`elementMemory` - the element fields Flash keeps between edits (a grown option list, a captured
figure, the last time zone), written through the definition's `rememberOnEdit` /
`rememberOnRead` into `WiredElementMemorySlice`. Never keep that state in a module variable.

Stores: `context/wired` (`wiredStore`: the setup session, clipboard, variables synchronizer,
environment, preferences, element memory, and the wired menu's slices) and
`context/wired-trading` (chests, contracts, the wired trade, transactions, rewards). Both are
singletons; `resetRoom` clears only what Flash drops with the room. The dialog's controller is
`commands/wired/wiredCommands.ts` (`UserDefinedRoomEventsCtrl`), the menu's `wiredMenuCommands.ts`.

## A source type the picker does not offer

An element with its own type picker (`hasCustomTypePicker`: the variable conditions and actions,
`ValueOrVariableSection` / `ChooseVariableSection` users) can open on a saved source type its
picker does not list - `CONTEXT` while `wired.variables.context_visible` is off, say. Flash
**saves that value unchanged** (AS3 under `roomevents/wired_setup`):

- The picker is built once per window (`createInputs` -> `buildInputs`, cached), with
  `SourceTypeSelectorParam`'s selection left at 0, which `mergedSourceOptions` always offers, so
  `SourceTypePicker.initialize` activates it without a click - and before any box is edited.
- Opening a box copies the saved int into the element's field (`onEditStart`), writes it back
  through `getMergedType` / `setMergedType` (`onEditStartUpdateCommonUI`), then calls
  `getSourceTypeSelector().select(field)` (`onEditInitialized`). `select` clicks only an option
  equal to the value; an unoffered one changes nothing.
- Saving reads the field (`readIntParamsFromForm` pushes it as it is).

Only a click on another option changes the field. So the form keeps the raw target, and only the
picker's display falls back to its first option (`WiredSourceTypePicker`, `WiredNewSourceTypePicker`
- a fresh Flash window's look; a cached one shows the last edit's choice). Do not resolve the form
at `createForm` (`tools/wired-unoffered-source-type.test.mjs`). `VariableUpdate` is the exception
that is not one: its target is not saved, so resolving it only retargets the variable picker, as
Flash's selector does.
