import * as vscode from 'vscode';

export function openDashboard(context: vscode.ExtensionContext): void {
  const panel = vscode.window.createWebviewPanel(
    'dctCopilotSkills',
    'DCT Copilot Skills',
    vscode.ViewColumn.One,
    {
      enableScripts: false,
    }
  );

  panel.webview.html = getWebviewContent();
}

function getWebviewContent(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DCT Copilot Skills</title>
</head>
<body>
  <p>Loading...</p>
</body>
</html>`;
}
