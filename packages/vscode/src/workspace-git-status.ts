import path from "node:path";

interface WorkspaceGitStatusInput {
  workspacePath: string;
  branch: string | null;
}

export interface WorkspaceGitStatus {
  text: string;
  tooltip: string;
}

export function buildWorkspaceGitStatus(input: WorkspaceGitStatusInput): WorkspaceGitStatus {
  const workspaceName = path.basename(input.workspacePath);
  const branch = input.branch ?? "detached HEAD";
  return {
    text: `$(git-branch) ${workspaceName} · ${branch}`,
    tooltip: `Paseo worktree: ${input.workspacePath}\nGit branch: ${branch}\n\nOpen Source Control`,
  };
}
