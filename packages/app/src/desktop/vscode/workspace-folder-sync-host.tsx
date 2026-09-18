import { useEffect } from "react";
import { getVscodeHost } from "@/desktop/vscode/host";
import { requestVscodeWorkspaceFolderSync } from "@/desktop/vscode/workspace-folder-sync";
import { useActiveWorkspaceSelection } from "@/stores/navigation-active-workspace-store";
import { useWorkspaceDirectory } from "@/stores/session-store-hooks";

export function VscodeWorkspaceFolderSyncHost() {
  const selection = useActiveWorkspaceSelection();
  const workspaceDirectory = useWorkspaceDirectory(
    selection?.serverId ?? null,
    selection?.workspaceId ?? null,
  );

  useEffect(() => {
    const invoke = getVscodeHost()?.invoke;
    if (!workspaceDirectory || !invoke) {
      return;
    }
    void requestVscodeWorkspaceFolderSync({ invoke }, workspaceDirectory).catch(() => undefined);
  }, [workspaceDirectory]);

  return null;
}
