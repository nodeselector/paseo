import { describe, expect, it } from "vitest";
import { handleCommandPaletteShortcut, isCommandPaletteShortcut } from "./command-palette-shortcut";

describe("VS Code command palette shortcut", () => {
  it("matches Cmd+Shift+P on macOS", () => {
    expect(isCommandPaletteShortcut({ key: "p", metaKey: true, shiftKey: true }, true)).toBe(true);
    expect(isCommandPaletteShortcut({ key: "P", metaKey: true, shiftKey: true }, true)).toBe(true);
  });

  it("matches Ctrl+Shift+P outside macOS", () => {
    expect(isCommandPaletteShortcut({ key: "p", ctrlKey: true, shiftKey: true }, false)).toBe(true);
  });

  it("rejects other modifier combinations and repeated events", () => {
    expect(isCommandPaletteShortcut({ key: "p", metaKey: true }, true)).toBe(false);
    expect(
      isCommandPaletteShortcut({ key: "p", metaKey: true, shiftKey: true, ctrlKey: true }, true),
    ).toBe(false);
    expect(
      isCommandPaletteShortcut({ key: "p", metaKey: true, shiftKey: true, repeat: true }, true),
    ).toBe(false);
  });

  it("consumes the webview event and invokes the VS Code bridge", () => {
    let prevented = false;
    let stopped = false;
    let invocations = 0;
    const handled = handleCommandPaletteShortcut(
      {
        key: "p",
        metaKey: true,
        shiftKey: true,
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
