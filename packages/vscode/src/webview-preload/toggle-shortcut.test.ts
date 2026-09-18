import { describe, expect, it } from "vitest";
import { handlePaseoToggleShortcut, isPaseoToggleShortcut } from "./toggle-shortcut";

describe("Paseo toggle shortcut", () => {
  it("matches Cmd+Ctrl+I on macOS", () => {
    expect(isPaseoToggleShortcut({ key: "i", ctrlKey: true, metaKey: true }, true)).toBe(true);
    expect(isPaseoToggleShortcut({ key: "I", ctrlKey: true, metaKey: true }, true)).toBe(true);
  });

  it("matches Ctrl+Shift+I outside macOS", () => {
    expect(isPaseoToggleShortcut({ key: "i", ctrlKey: true, shiftKey: true }, false)).toBe(true);
  });

  it("rejects other modifier combinations", () => {
    expect(isPaseoToggleShortcut({ key: "i", ctrlKey: true }, true)).toBe(false);
    expect(isPaseoToggleShortcut({ key: "i", metaKey: true }, true)).toBe(false);
    expect(
      isPaseoToggleShortcut({ key: "i", ctrlKey: true, metaKey: true, shiftKey: true }, true),
    ).toBe(false);
    expect(
      isPaseoToggleShortcut({ key: "i", ctrlKey: true, metaKey: true, altKey: true }, true),
    ).toBe(false);
  });

  it("rejects composition, repeats, and handled events", () => {
    expect(
      isPaseoToggleShortcut({ key: "i", ctrlKey: true, metaKey: true, isComposing: true }, true),
    ).toBe(false);
    expect(
      isPaseoToggleShortcut({ key: "i", ctrlKey: true, metaKey: true, repeat: true }, true),
    ).toBe(false);
    expect(
      isPaseoToggleShortcut(
        { key: "i", ctrlKey: true, metaKey: true, defaultPrevented: true },
        true,
      ),
    ).toBe(false);
  });

  it("consumes the webview event and invokes the extension bridge", () => {
    let prevented = false;
    let stopped = false;
    let toggles = 0;
    const handled = handlePaseoToggleShortcut(
      {
        key: "i",
        ctrlKey: true,
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
        toggles += 1;
      },
    );

    expect({ handled, prevented, stopped, toggles }).toEqual({
      handled: true,
      prevented: true,
      stopped: true,
      toggles: 1,
    });
  });
});
