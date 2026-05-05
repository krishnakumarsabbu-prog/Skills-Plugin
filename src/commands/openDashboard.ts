import * as vscode from 'vscode';

interface SkillData {
  name: string;
  fileCount: number;
  status: 'Not Installed';
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

async function loadSkills(extensionUri: vscode.Uri): Promise<SkillData[]> {
  const skillsUri = vscode.Uri.joinPath(extensionUri, 'resources', '.github', 'skills');
  const entries = await vscode.workspace.fs.readDirectory(skillsUri);
  const skills: SkillData[] = [];

  for (const [name, type] of entries) {
    if (type === vscode.FileType.Directory) {
      const folderUri = vscode.Uri.joinPath(skillsUri, name);
      const fileCount = await countFilesRecursive(folderUri);
      skills.push({ name, fileCount, status: 'Not Installed' });
    }
  }

  return skills;
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
