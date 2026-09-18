import { describe, expect, it } from "vitest";
import { handlePaseoToggleShortcut, isPaseoToggleShortcut } from "./toggle-shortcut";

describe("Paseo toggle shortcut", () => {
  it("matches Ctrl+Shift+I", () => {
    expect(isPaseoToggleShortcut({ key: "i", ctrlKey: true, shiftKey: true })).toBe(true);
    expect(isPaseoToggleShortcut({ key: "I", ctrlKey: true, shiftKey: true })).toBe(true);
  });

  it("rejects other modifier combinations", () => {
    expect(isPaseoToggleShortcut({ key: "i", ctrlKey: true })).toBe(false);
    expect(isPaseoToggleShortcut({ key: "i", shiftKey: true })).toBe(false);
    expect(isPaseoToggleShortcut({ key: "i", ctrlKey: true, shiftKey: true, metaKey: true })).toBe(
      false,
    );
    expect(isPaseoToggleShortcut({ key: "i", ctrlKey: true, shiftKey: true, altKey: true })).toBe(
      false,
    );
  });

  it("rejects composition, repeats, and handled events", () => {
    expect(
      isPaseoToggleShortcut({ key: "i", ctrlKey: true, shiftKey: true, isComposing: true }),
    ).toBe(false);
    expect(isPaseoToggleShortcut({ key: "i", ctrlKey: true, shiftKey: true, repeat: true })).toBe(
      false,
    );
    expect(
      isPaseoToggleShortcut({ key: "i", ctrlKey: true, shiftKey: true, defaultPrevented: true }),
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
        shiftKey: true,
        preventDefault() {
          prevented = true;
        },
        stopPropagation() {
          stopped = true;
        },
      },
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
