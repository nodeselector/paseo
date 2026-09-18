export interface SidebarShortcutEventLike {
  key?: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  isComposing?: boolean;
  defaultPrevented?: boolean;
  repeat?: boolean;
}

export interface SidebarShortcutEvent extends SidebarShortcutEventLike {
  preventDefault(): void;
  stopPropagation(): void;
}

export function isSidebarShortcut(event: SidebarShortcutEventLike, isMac: boolean): boolean {
  if (event.defaultPrevented === true || event.isComposing === true || event.repeat === true) {
    return false;
  }
  const hasExactModifier = isMac
    ? event.metaKey === true &&
      event.ctrlKey !== true &&
      event.shiftKey !== true &&
      event.altKey !== true
    : event.ctrlKey === true &&
      event.metaKey !== true &&
      event.shiftKey !== true &&
      event.altKey !== true;
  return hasExactModifier && event.key?.toLowerCase() === "b";
}

export function handleSidebarShortcut(
  event: SidebarShortcutEvent,
  isMac: boolean,
  toggleSidebar: () => void,
): boolean {
  if (!isSidebarShortcut(event, isMac)) {
    return false;
  }
  event.preventDefault();
  event.stopPropagation();
  toggleSidebar();
  return true;
}
