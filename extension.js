
const vscode = require('vscode');

const { join, dirname, resolve } = require('path')

const fs = require('fs')

const TreeDataProvider = require('./config/TreeDataProvider');


function activate(context) {

  vscode.window.registerTreeDataProvider('hxmui_sidebar_1', new TreeDataProvider(context));

	let disposable = vscode.commands.registerCommand('hxmui_sidebar_1.home', function () {
		const panel = vscode.window.createWebviewPanel(
      'webview',
      '同花顺Hxmui-Icon',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true
      }
    )
    panel.webview.html = getWebViewContent(context, 'views/index.html');
	});

	context.subscriptions.push(disposable);
}

function getWebViewContent(context, templatePath) {
	const resourcePath = join(context.extensionPath, templatePath);
	const dirPath = dirname(resourcePath);
	let html = fs.readFileSync(resourcePath, 'utf-8');

    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
	  if ($2.indexOf("https://") < 0) {
        return $1 + vscode.Uri.file(resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
      } else {
        return $1 + $2 + '"';
      }
	});

  console.log(html);

	return html;
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
