import * as vscode from 'vscode';

interface SkillData {
  name: string;
  fileCount: number;
  status: 'Not Installed' | 'Installed';
}

async function countFilesRecursive(uri: vscode.Uri): Promise<number> {
  let count = 0;
  const entries = await vscode.workspace.fs.readDirectory(uri);
  for (const [name, type] of entries) {
    if (type === vscode.FileType.File) {
      count++;
    } else if (type === vscode.FileType.Directory) {
      const subUri = vscode.Uri.joinPath(uri, name);
      count += await countFilesRecursive(subUri);
    }
  }
  return count;
}

async function isSkillInstalled(skillName: string): Promise<boolean> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return false;
  }
  const targetUri = vscode.Uri.joinPath(workspaceFolders[0].uri, '.github', 'skills', skillName);
  try {
    await vscode.workspace.fs.stat(targetUri);
    return true;
  } catch {
    return false;
  }
}

async function loadSkills(extensionUri: vscode.Uri): Promise<SkillData[]> {
  const skillsUri = vscode.Uri.joinPath(extensionUri, 'resources', '.github', 'skills');
  const entries = await vscode.workspace.fs.readDirectory(skillsUri);
  const skills: SkillData[] = [];

  for (const [name, type] of entries) {
    if (type === vscode.FileType.Directory) {
      const folderUri = vscode.Uri.joinPath(skillsUri, name);
      const fileCount = await countFilesRecursive(folderUri);
      const installed = await isSkillInstalled(name);
      skills.push({ name, fileCount, status: installed ? 'Installed' : 'Not Installed' });
    }
  }

  return skills;
}

async function copyDirectoryRecursive(source: vscode.Uri, target: vscode.Uri): Promise<void> {
  await vscode.workspace.fs.createDirectory(target);
  const entries = await vscode.workspace.fs.readDirectory(source);
  for (const [name, type] of entries) {
    const srcChild = vscode.Uri.joinPath(source, name);
    const tgtChild = vscode.Uri.joinPath(target, name);
    if (type === vscode.FileType.Directory) {
      await copyDirectoryRecursive(srcChild, tgtChild);
    } else {
      const content = await vscode.workspace.fs.readFile(srcChild);
      await vscode.workspace.fs.writeFile(tgtChild, content);
    }
  }
}

async function installSkill(extensionUri: vscode.Uri, skillName: string): Promise<void> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    throw new Error('No workspace folder is open');
  }

  const workspaceUri = workspaceFolders[0].uri;
  const githubUri = vscode.Uri.joinPath(workspaceUri, '.github');

  try {
    await vscode.workspace.fs.stat(githubUri);
  } catch {
    await vscode.workspace.fs.createDirectory(githubUri);
  }

  const sourceUri = vscode.Uri.joinPath(extensionUri, 'resources', '.github', 'skills', skillName);
  const targetUri = vscode.Uri.joinPath(workspaceUri, '.github', 'skills', skillName);

  await copyDirectoryRecursive(sourceUri, targetUri);
}

export function openDashboard(context: vscode.ExtensionContext): void {
  const panel = vscode.window.createWebviewPanel(
    'dctCopilotSkills',
    'DCT Copilot Skills',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(context.extensionUri, 'out', 'webview'),
      ],
    }
  );

  panel.webview.html = getWebviewContent(panel.webview, context.extensionUri);

  panel.webview.onDidReceiveMessage((message) => {
    if (message.command === 'loadSkills') {
      loadSkills(context.extensionUri).then((skills) => {
        panel.webview.postMessage({ command: 'skillsLoaded', skills });
      }).catch(() => {
        panel.webview.postMessage({ command: 'skillsError', message: 'Skills folder not found. Expected: resources/.github/skills/' });
      });
    } else if (message.command === 'installSkill') {
      const skillName: string = message.skillName;
      installSkill(context.extensionUri, skillName).then(() => {
        panel.webview.postMessage({ command: 'skillInstalled', skillName, status: 'Installed' });
        vscode.window.showInformationMessage(`Skill "${skillName}" Installed Successfully`);
      }).catch((err: Error) => {
        panel.webview.postMessage({ command: 'skillInstallError', skillName, message: err.message });
        vscode.window.showErrorMessage(`Failed to install skill "${skillName}": ${err.message}`);
      });
    }
  }, undefined, context.subscriptions);

  // Send skills immediately on panel open
  loadSkills(context.extensionUri).then((skills) => {
    panel.webview.postMessage({ command: 'skillsLoaded', skills });
  }).catch(() => {
    panel.webview.postMessage({ command: 'skillsError', message: 'Skills folder not found. Expected: resources/.github/skills/' });
  });
}

function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri): string {
  const webviewDist = vscode.Uri.joinPath(extensionUri, 'out', 'webview');

  const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(webviewDist, 'assets', 'index.js'));
  const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(webviewDist, 'assets', 'index.css'));
  const nonce = getNonce();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src ${webview.cspSource} https: data:; font-src ${webview.cspSource};">
  <link rel="stylesheet" href="${styleUri}" />
  <title>DCT Copilot Skills</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
}

function getNonce(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
