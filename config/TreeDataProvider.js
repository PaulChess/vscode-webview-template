const vscode = require('vscode')
const path = require('path')

class TreeDataProvider {
  getTreeItem(element) {
    console.log(element);
    return element;
  }

  getChildren() {
    const provideDataList = [
      {
        title: '首页',
        icon: 'sidebar.svg',
        command: 'hxmui_sidebar_1.home'
      },
      {
        title: '关于我',
        icon: 'sidebar.svg',
        command: 'hxmui_sidebar_1.about'
      },
    ]

    const panelList = [];

    for (let i = 0; i < provideDataList.length; i++) {
      panelList.push(new DataItem(
        provideDataList[i].title,
        provideDataList[i].icon,
        '',
        {
          command: provideDataList[i].command,
        }
      ));
    }

    return panelList;
  }
}

class DataItem extends vscode.TreeItem {
  constructor(label, icon, tooltip, command) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.iconPath = path.join(__filename, '../../', 'resources', icon);
    this.tooltip = tooltip;
    this.command = command;
  }
}

module.exports = TreeDataProvider;