import { describe, expect, it } from "vitest";
import { buildWorkspaceGitStatus } from "./workspace-git-status";

describe("Paseo workspace Git status", () => {
  it("shows the worktree directory and branch", () => {
    expect(
      buildWorkspaceGitStatus({
        workspacePath: "/worktrees/glorious-dingo",
        branch: "feature/vscode",
      }),
    ).toEqual({
      text: "$(git-branch) glorious-dingo · feature/vscode",
      tooltip:
        "Paseo worktree: /worktrees/glorious-dingo\nGit branch: feature/vscode\n\nOpen Source Control",
    });
  });

  it("labels a detached checkout", () => {
    expect(
      buildWorkspaceGitStatus({ workspacePath: "/worktrees/release", branch: null }).text,
    ).toBe("$(git-branch) release · detached HEAD");
  });
});
