import { describe, expect, it } from "vitest";
import { requestVscodeWorkspaceFolderSync } from "./workspace-folder-sync";

describe("VS Code workspace folder sync request", () => {
  it("sends the selected Paseo workspace path to the VS Code host", async () => {
    const invocations: Array<{ command: string; args?: Record<string, unknown> }> = [];
    await requestVscodeWorkspaceFolderSync(
      {
        async invoke(command, args) {
          invocations.push({ command, args });
        },
      },
      " /worktrees/feature ",
    );

    expect(invocations).toEqual([
      { command: "vscode.syncWorkspaceFolder", args: { path: "/worktrees/feature" } },
    ]);
  });

  it("does not send an empty workspace path", async () => {
    let invoked = false;
    await requestVscodeWorkspaceFolderSync(
      {
        async invoke() {
          invoked = true;
        },
      },
      "  ",
    );

    expect(invoked).toBe(false);
  });
});
