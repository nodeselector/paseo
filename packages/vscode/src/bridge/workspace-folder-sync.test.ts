import path from "node:path";
import { describe, expect, it } from "vitest";
import { parseWorkspaceFolderSyncInput, workspacePathsEqual } from "./workspace-folder-sync";

describe("VS Code workspace folder sync", () => {
  it("accepts and normalizes an absolute workspace path", () => {
    const workspacePath = path.resolve(path.sep, "workspaces", "feature");
    expect(parseWorkspaceFolderSyncInput({ path: ` ${workspacePath} ` })).toEqual({
      workspacePath,
    });
  });

  it("rejects missing and relative workspace paths", () => {
    expect(() => parseWorkspaceFolderSyncInput(null)).toThrow(
      "Paseo workspace path must be absolute.",
    );
    expect(() => parseWorkspaceFolderSyncInput({ path: "workspaces/feature" })).toThrow(
      "Paseo workspace path must be absolute.",
    );
  });

  it("compares normalized workspace paths", () => {
    const workspacePath = path.resolve(path.sep, "workspaces", "feature");
    expect(workspacePathsEqual(workspacePath, path.join(workspacePath, "."))).toBe(true);
    expect(workspacePathsEqual(workspacePath, path.resolve(path.sep, "workspaces", "other"))).toBe(
      false,
    );
  });
});
