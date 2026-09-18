import { describe, expect, it } from "vitest";
import { handleSidebarShortcut, isSidebarShortcut } from "./sidebar-shortcut";

describe("VS Code sidebar shortcut", () => {
  it("matches Cmd+B on macOS", () => {
    expect(isSidebarShortcut({ key: "b", metaKey: true }, true)).toBe(true);
    expect(isSidebarShortcut({ key: "B", metaKey: true }, true)).toBe(true);
  });

  it("matches Ctrl+B outside macOS", () => {
    expect(isSidebarShortcut({ key: "b", ctrlKey: true }, false)).toBe(true);
  });

  it("rejects other modifier combinations and repeated events", () => {
    expect(isSidebarShortcut({ key: "b" }, true)).toBe(false);
    expect(isSidebarShortcut({ key: "b", metaKey: true, shiftKey: true }, true)).toBe(false);
    expect(isSidebarShortcut({ key: "b", metaKey: true, repeat: true }, true)).toBe(false);
  });

  it("consumes the webview event and invokes the VS Code bridge", () => {
    let prevented = false;
    let stopped = false;
    let invocations = 0;
    const handled = handleSidebarShortcut(
      {
        key: "b",
        metaKey: true,
        preventDefault() {
          prevented = true;
        },
        stopPropagation() {
          stopped = true;
        },
      },
      true,
      () => {
        invocations += 1;
      },
    );

    expect({ handled, prevented, stopped, invocations }).toEqual({
      handled: true,
      prevented: true,
      stopped: true,
      invocations: 1,
    });
  });
});
