export interface ToggleShortcutEventLike {
  key?: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  isComposing?: boolean;
  defaultPrevented?: boolean;
  repeat?: boolean;
}

export interface ToggleShortcutEvent extends ToggleShortcutEventLike {
  preventDefault(): void;
  stopPropagation(): void;
}

export function isPaseoToggleShortcut(event: ToggleShortcutEventLike, isMac: boolean): boolean {
  if (event.defaultPrevented === true || event.isComposing === true || event.repeat === true) {
    return false;
  }
  const hasExactModifiers = isMac
    ? event.ctrlKey === true &&
      event.metaKey === true &&
      event.shiftKey !== true &&
      event.altKey !== true
    : event.ctrlKey === true &&
      event.shiftKey === true &&
      event.metaKey !== true &&
      event.altKey !== true;
  return hasExactModifiers && event.key?.toLowerCase() === "i";
}

export function handlePaseoToggleShortcut(
  event: ToggleShortcutEvent,
  isMac: boolean,
  togglePaseo: () => void,
): boolean {
  if (!isPaseoToggleShortcut(event, isMac)) {
    return false;
  }
  event.preventDefault();
  event.stopPropagation();
  togglePaseo();
  return true;
}
