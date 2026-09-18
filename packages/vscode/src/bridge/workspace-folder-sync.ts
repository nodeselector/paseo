import path from "node:path";

interface WorkspaceFolderSyncInput {
  workspacePath: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseWorkspaceFolderSyncInput(args: unknown): WorkspaceFolderSyncInput {
  const workspacePath = isRecord(args) && typeof args.path === "string" ? args.path.trim() : "";
  if (!workspacePath || !path.isAbsolute(workspacePath)) {
    throw new Error("Paseo workspace path must be absolute.");
  }
  return { workspacePath: path.normalize(workspacePath) };
}

export function workspacePathsEqual(left: string, right: string): boolean {
  const normalizedLeft = path.normalize(left);
  const normalizedRight = path.normalize(right);
  if (process.platform === "win32") {
    return normalizedLeft.toLowerCase() === normalizedRight.toLowerCase();
  }
  return normalizedLeft === normalizedRight;
}
