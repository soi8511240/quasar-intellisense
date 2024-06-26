import * as vscode from 'vscode';

// Quasar Framework의 모든 컴포넌트 태그 및 속성들을 정의합니다.
interface QuasarComponent {
    label: string;
    kind: vscode.CompletionItemKind;
}

const quasarComponents: QuasarComponent[] = [
    // Layout Components
    { label: 'q-layout', kind: vscode.CompletionItemKind.Class },
    { label: 'q-header', kind: vscode.CompletionItemKind.Class },
    { label: 'q-footer', kind: vscode.CompletionItemKind.Class },
    { label: 'q-page-container', kind: vscode.CompletionItemKind.Class },
    { label: 'q-page', kind: vscode.CompletionItemKind.Class },
    { label: 'q-toolbar', kind: vscode.CompletionItemKind.Class },
    { label: 'q-banner', kind: vscode.CompletionItemKind.Class },
    { label: 'q-drawer', kind: vscode.CompletionItemKind.Class },
    { label: 'q-drawer-link', kind: vscode.CompletionItemKind.Class },

    // Form Components
    { label: 'q-btn', kind: vscode.CompletionItemKind.Class },
    { label: 'q-btn-dropdown', kind: vscode.CompletionItemKind.Class },
    { label: 'q-btn-group', kind: vscode.CompletionItemKind.Class },
    { label: 'q-checkbox', kind: vscode.CompletionItemKind.Class },
    { label: 'q-chip', kind: vscode.CompletionItemKind.Class },
    { label: 'q-input', kind: vscode.CompletionItemKind.Class },
    { label: 'q-radio', kind: vscode.CompletionItemKind.Class },
    { label: 'q-search', kind: vscode.CompletionItemKind.Class },
    { label: 'q-select', kind: vscode.CompletionItemKind.Class },
    { label: 'q-slider', kind: vscode.CompletionItemKind.Class },
    { label: 'q-toggle', kind: vscode.CompletionItemKind.Class },

    // Display Components
    { label: 'q-avatar', kind: vscode.CompletionItemKind.Class },
    { label: 'q-badge', kind: vscode.CompletionItemKind.Class },
    { label: 'q-card', kind: vscode.CompletionItemKind.Class },
    { label: 'q-carousel', kind: vscode.CompletionItemKind.Class },
    { label: 'q-carousel-slide', kind: vscode.CompletionItemKind.Class },
    { label: 'q-divider', kind: vscode.CompletionItemKind.Class },
    { label: 'q-expansion-item', kind: vscode.CompletionItemKind.Class },
    { label: 'q-icon', kind: vscode.CompletionItemKind.Class },
    { label: 'q-img', kind: vscode.CompletionItemKind.Class },
    { label: 'q-item', kind: vscode.CompletionItemKind.Class },
    { label: 'q-item-section', kind: vscode.CompletionItemKind.Class },
    { label: 'q-item-label', kind: vscode.CompletionItemKind.Class },
    { label: 'q-linear-progress', kind: vscode.CompletionItemKind.Class },
    { label: 'q-list', kind: vscode.CompletionItemKind.Class },
    { label: 'q-item-wrapper', kind: vscode.CompletionItemKind.Class },
    { label: 'q-page-sticky', kind: vscode.CompletionItemKind.Class },
    { label: 'q-parallax', kind: vscode.CompletionItemKind.Class },
    { label: 'q-popup-edit', kind: vscode.CompletionItemKind.Class },
    { label: 'q-space', kind: vscode.CompletionItemKind.Class },
    { label: 'q-spinner', kind: vscode.CompletionItemKind.Class },
    { label: 'q-tab-panels', kind: vscode.CompletionItemKind.Class },
    { label: 'q-tab-panel', kind: vscode.CompletionItemKind.Class },
    { label: 'q-tabs', kind: vscode.CompletionItemKind.Class },
    { label: 'q-route-tab', kind: vscode.CompletionItemKind.Class },
    { label: 'q-tree', kind: vscode.CompletionItemKind.Class },

    // Helpers
    { label: 'q-separator', kind: vscode.CompletionItemKind.Class },
    { label: 'q-space', kind: vscode.CompletionItemKind.Class },

    // Other Components
    { label: 'q-context-menu', kind: vscode.CompletionItemKind.Class },
    { label: 'q-dialog', kind: vscode.CompletionItemKind.Class },
    { label: 'q-popup-proxy', kind: vscode.CompletionItemKind.Class },
    { label: 'q-menu', kind: vscode.CompletionItemKind.Class },
    { label: 'q-page-sticky', kind: vscode.CompletionItemKind.Class },
    { label: 'q-page', kind: vscode.CompletionItemKind.Class },
    { label: 'q-page-sticky', kind: vscode.CompletionItemKind.Class },
    { label: 'q-page-sticky', kind: vscode.CompletionItemKind.Class },
    { label: 'q-page-sticky', kind: vscode.CompletionItemKind.Class },
    { label: 'q-page-sticky', kind: vscode.CompletionItemKind.Class },
    { label: 'q-page-sticky', kind: vscode.CompletionItemKind.Class },
];

// 각 Quasar 컴포넌트의 속성들을 정의합니다.
interface QuasarProps {
    [key: string]: { label: string; kind: vscode.CompletionItemKind; }[];
}

const quasarProps: QuasarProps = {
    'q-layout': [
        { label: 'view', kind: vscode.CompletionItemKind.Property },
        { label: 'container', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
    ],
    'q-header': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'reveal', kind: vscode.CompletionItemKind.Property },
        { label: 'elevated', kind: vscode.CompletionItemKind.Property },
    ],
    'q-footer': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'reveal', kind: vscode.CompletionItemKind.Property },
        { label: 'elevated', kind: vscode.CompletionItemKind.Property },
    ],
    'q-page-container': [
        { label: 'style', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
    ],
    'q-page': [
        { label: 'padding', kind: vscode.CompletionItemKind.Property },
        { label: 'style', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
    ],
    'q-toolbar': [
        { label: 'inverted', kind: vscode.CompletionItemKind.Property },
        { label: 'glossy', kind: vscode.CompletionItemKind.Property },
    ],
    'q-banner': [
        { label: 'inline-actions', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
    ],
    'q-drawer': [
        { label: 'show-if-above', kind: vscode.CompletionItemKind.Property },
        { label: 'right-side', kind: vscode.CompletionItemKind.Property },
    ],
    'q-drawer-link': [
        { label: 'to', kind: vscode.CompletionItemKind.Property },
        { label: 'exact', kind: vscode.CompletionItemKind.Property },
        { label: 'replace', kind: vscode.CompletionItemKind.Property },
    ],
    'q-btn': [
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    // 다른 컴포넌트들의 속성들도 필요에 따라 추가할 수 있습니다.
};

// 공통으로 사용되는 속성들을 정의합니다.
const commonProps = [
    { label: 'class', kind: vscode.CompletionItemKind.Property },
    { label: 'style', kind: vscode.CompletionItemKind.Property },
    { label: 'key', kind: vscode.CompletionItemKind.Property },
    { label: 'ref', kind: vscode.CompletionItemKind.Property },
    { label: 'v-if', kind: vscode.CompletionItemKind.Property },
    { label: 'v-show', kind: vscode.CompletionItemKind.Property },
    { label: '@click', kind: vscode.CompletionItemKind.Property },
    { label: '@input', kind: vscode.CompletionItemKind.Property },
    { label: '@change', kind: vscode.CompletionItemKind.Property },
    { label: '@submit', kind: vscode.CompletionItemKind.Property },
    { label: '@keydown', kind: vscode.CompletionItemKind.Property },
    { label: '@keyup', kind: vscode.CompletionItemKind.Property },
    { label: '@mousedown', kind: vscode.CompletionItemKind.Property },
    { label: '@mouseup', kind: vscode.CompletionItemKind.Property },
    { label: '@mouseover', kind: vscode.CompletionItemKind.Property },
    { label: '@mouseout', kind: vscode.CompletionItemKind.Property },
];

// 확장 프로그램을 활성화하는 함수
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "quasar-intellisense" is now active!');

    // Vue 파일에서 컴포넌트 및 속성을 제안하는 제공자 등록
    let componentProvider = vscode.languages.registerCompletionItemProvider('vue', {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            const linePrefix = document.lineAt(position).text.substr(0, position.character);

            // Vue 파일에서 `<`로 시작할 때 Quasar 컴포넌트를 제안합니다.
            if (linePrefix.endsWith('<')) {
                return quasarComponents.map(component => {
                    let item = new vscode.CompletionItem(component.label, component.kind);
                    item.insertText = new vscode.SnippetString(`${component.label}>\n\t$0\n</${component.label}>`);
                    return item;
                });
            }

            // Quasar 컴포넌트 속성을 제안합니다.
            const regex = /<(\w+)-(\w+)/;
            const match = regex.exec(linePrefix);
            if (match && (quasarProps[match[1]] || match[1] === 'q')) {
                const props = quasarProps[match[1]] || [];
                return [...props, ...commonProps].map(prop => {
                    return new vscode.CompletionItem(prop.label, prop.kind);
                });
            }

            return [];
        }
    });

    context.subscriptions.push(componentProvider);
}
