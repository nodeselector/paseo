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

export function isPaseoToggleShortcut(event: ToggleShortcutEventLike): boolean {
  if (event.defaultPrevented === true || event.isComposing === true || event.repeat === true) {
    return false;
  }
  const hasExactModifiers =
    event.ctrlKey === true &&
    event.shiftKey === true &&
    event.metaKey !== true &&
    event.altKey !== true;
  return hasExactModifiers && event.key?.toLowerCase() === "i";
}

export function handlePaseoToggleShortcut(
  event: ToggleShortcutEvent,
  togglePaseo: () => void,
): boolean {
  if (!isPaseoToggleShortcut(event)) {
    return false;
  }
  event.preventDefault();
  event.stopPropagation();
  togglePaseo();
  return true;
}
