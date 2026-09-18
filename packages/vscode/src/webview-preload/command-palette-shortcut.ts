export interface CommandPaletteShortcutEventLike {
  key?: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  isComposing?: boolean;
  defaultPrevented?: boolean;
  repeat?: boolean;
}

export interface CommandPaletteShortcutEvent extends CommandPaletteShortcutEventLike {
  preventDefault(): void;
  stopPropagation(): void;
}

export function isCommandPaletteShortcut(
  event: CommandPaletteShortcutEventLike,
  isMac: boolean,
): boolean {
  if (event.defaultPrevented === true || event.isComposing === true || event.repeat === true) {
    return false;
  }
  const hasExactModifiers = isMac
    ? event.metaKey === true &&
      event.shiftKey === true &&
      event.ctrlKey !== true &&
      event.altKey !== true
    : event.ctrlKey === true &&
      event.shiftKey === true &&
      event.metaKey !== true &&
      event.altKey !== true;
  return hasExactModifiers && event.key?.toLowerCase() === "p";
}

export function handleCommandPaletteShortcut(
  event: CommandPaletteShortcutEvent,
  isMac: boolean,
  showCommands: () => void,
): boolean {
  if (!isCommandPaletteShortcut(event, isMac)) {
    return false;
  }
  event.preventDefault();
  event.stopPropagation();
  showCommands();
  return true;
}
