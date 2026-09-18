interface WorkspaceFolderSyncBridge {
  invoke(command: string, args?: Record<string, unknown>): Promise<unknown>;
}

export async function requestVscodeWorkspaceFolderSync(
  bridge: WorkspaceFolderSyncBridge,
  workspacePath: string,
): Promise<void> {
  const path = workspacePath.trim();
  if (!path) {
    return;
  }
  await bridge.invoke("vscode.syncWorkspaceFolder", { path });
}
