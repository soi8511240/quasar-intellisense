import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// Quasar 컴포넌트 정의
interface QuasarComponent {
    label: string;
    kind: vscode.CompletionItemKind;
    sortText?: string;
}

const quasarComponents: QuasarComponent[] = [
    // Layout Components
    { label: 'q-layout', kind: vscode.CompletionItemKind.Class, sortText: '1' },
    { label: 'q-header', kind: vscode.CompletionItemKind.Class, sortText: '2' },
    { label: 'q-footer', kind: vscode.CompletionItemKind.Class, sortText: '3' },
    { label: 'q-page-container', kind: vscode.CompletionItemKind.Class, sortText: '4' },
    { label: 'q-page', kind: vscode.CompletionItemKind.Class, sortText: '5' },
    { label: 'q-toolbar', kind: vscode.CompletionItemKind.Class, sortText: '6' },
    { label: 'q-banner', kind: vscode.CompletionItemKind.Class, sortText: '7' },
    { label: 'q-drawer', kind: vscode.CompletionItemKind.Class, sortText: '8' },
    { label: 'q-drawer-link', kind: vscode.CompletionItemKind.Class, sortText: '9' },

    // Form Components
    { label: 'q-btn', kind: vscode.CompletionItemKind.Class, sortText: '10' },
    { label: 'q-btn-dropdown', kind: vscode.CompletionItemKind.Class, sortText: '11' },
    { label: 'q-btn-group', kind: vscode.CompletionItemKind.Class, sortText: '12' },
    { label: 'q-checkbox', kind: vscode.CompletionItemKind.Class, sortText: '13' },
    { label: 'q-chip', kind: vscode.CompletionItemKind.Class, sortText: '14' },
    { label: 'q-input', kind: vscode.CompletionItemKind.Class, sortText: '15' },
    { label: 'q-radio', kind: vscode.CompletionItemKind.Class, sortText: '16' },
    { label: 'q-search', kind: vscode.CompletionItemKind.Class, sortText: '17' },
    { label: 'q-select', kind: vscode.CompletionItemKind.Class, sortText: '18' },
    { label: 'q-slider', kind: vscode.CompletionItemKind.Class, sortText: '19' },
    { label: 'q-toggle', kind: vscode.CompletionItemKind.Class, sortText: '20' },

    // Display Components
    { label: 'q-avatar', kind: vscode.CompletionItemKind.Class, sortText: '21' },
    { label: 'q-badge', kind: vscode.CompletionItemKind.Class, sortText: '22' },
    { label: 'q-card', kind: vscode.CompletionItemKind.Class, sortText: '23' },
    { label: 'q-carousel', kind: vscode.CompletionItemKind.Class, sortText: '24' },
    { label: 'q-carousel-slide', kind: vscode.CompletionItemKind.Class, sortText: '25' },
    { label: 'q-divider', kind: vscode.CompletionItemKind.Class, sortText: '26' },
    { label: 'q-expansion-item', kind: vscode.CompletionItemKind.Class, sortText: '27' },
    { label: 'q-icon', kind: vscode.CompletionItemKind.Class, sortText: '28' },
    { label: 'q-img', kind: vscode.CompletionItemKind.Class, sortText: '29' },
    { label: 'q-item', kind: vscode.CompletionItemKind.Class, sortText: '30' },
    { label: 'q-item-section', kind: vscode.CompletionItemKind.Class, sortText: '31' },
    { label: 'q-item-label', kind: vscode.CompletionItemKind.Class, sortText: '32' },
    { label: 'q-linear-progress', kind: vscode.CompletionItemKind.Class, sortText: '33' },
    { label: 'q-list', kind: vscode.CompletionItemKind.Class, sortText: '34' },
    { label: 'q-item-wrapper', kind: vscode.CompletionItemKind.Class, sortText: '35' },
    { label: 'q-page-sticky', kind: vscode.CompletionItemKind.Class, sortText: '36' },
    { label: 'q-parallax', kind: vscode.CompletionItemKind.Class, sortText: '37' },
    { label: 'q-popup-edit', kind: vscode.CompletionItemKind.Class, sortText: '38' },
    { label: 'q-space', kind: vscode.CompletionItemKind.Class, sortText: '39' },
    { label: 'q-spinner', kind: vscode.CompletionItemKind.Class, sortText: '40' },
    { label: 'q-tab-panels', kind: vscode.CompletionItemKind.Class, sortText: '41' },
    { label: 'q-tab-panel', kind: vscode.CompletionItemKind.Class, sortText: '42' },
    { label: 'q-tabs', kind: vscode.CompletionItemKind.Class, sortText: '43' },
    { label: 'q-route-tab', kind: vscode.CompletionItemKind.Class, sortText: '44' },
    { label: 'q-tree', kind: vscode.CompletionItemKind.Class, sortText: '45' },

    // Helpers
    { label: 'q-separator', kind: vscode.CompletionItemKind.Class, sortText: '46' },
    { label: 'q-space', kind: vscode.CompletionItemKind.Class, sortText: '47' },

    // Other Components
    { label: 'q-context-menu', kind: vscode.CompletionItemKind.Class, sortText: '48' },
    { label: 'q-dialog', kind: vscode.CompletionItemKind.Class, sortText: '49' },
    { label: 'q-popup-proxy', kind: vscode.CompletionItemKind.Class, sortText: '50' },
    { label: 'q-menu', kind: vscode.CompletionItemKind.Class, sortText: '51' },
    { label: 'q-page-sticky', kind: vscode.CompletionItemKind.Class, sortText: '52' },
    { label: 'q-page', kind: vscode.CompletionItemKind.Class, sortText: '53' },
    // 중복된 항목 제거
];

// Quasar 속성 정의
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
    'q-btn-dropdown': [
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-btn-group': [
        { label: 'spread', kind: vscode.CompletionItemKind.Property },
    ],
    'q-checkbox': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-chip': [
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-input': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'type', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
    ],
    'q-radio': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-search': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'placeholder', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
    ],
    'q-select': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'options', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
    ],
    'q-slider': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'min', kind: vscode.CompletionItemKind.Property },
        { label: 'max', kind: vscode.CompletionItemKind.Property },
    ],
    'q-toggle': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-avatar': [
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'size', kind: vscode.CompletionItemKind.Property },
    ],
    'q-badge': [
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
    ],
    'q-card': [
        { label: 'flat', kind: vscode.CompletionItemKind.Property },
        { label: 'bordered', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
    ],
    'q-carousel': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'options', kind: vscode.CompletionItemKind.Property },
    ],
    'q-carousel-slide': [
        { label: 'name', kind: vscode.CompletionItemKind.Property },
    ],
    'q-divider': [
        { label: 'vertical', kind: vscode.CompletionItemKind.Property },
        { label: 'inset', kind: vscode.CompletionItemKind.Property },
    ],
    'q-expansion-item': [
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'expand-icon', kind: vscode.CompletionItemKind.Property },
    ],
    'q-icon': [
        { label: 'name', kind: vscode.CompletionItemKind.Property },
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-img': [
        { label: 'src', kind: vscode.CompletionItemKind.Property },
        { label: 'alt', kind: vscode.CompletionItemKind.Property },
    ],
    'q-item': [
        { label: 'to', kind: vscode.CompletionItemKind.Property },
        { label: 'exact', kind: vscode.CompletionItemKind.Property },
        { label: 'replace', kind: vscode.CompletionItemKind.Property },
    ],
    'q-item-section': [
        { label: 'side', kind: vscode.CompletionItemKind.Property },
        { label: 'avatar', kind: vscode.CompletionItemKind.Property },
    ],
    'q-item-label': [
        { label: 'overline', kind: vscode.CompletionItemKind.Property },
        { label: 'caption', kind: vscode.CompletionItemKind.Property },
    ],
    'q-linear-progress': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-list': [
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'separator', kind: vscode.CompletionItemKind.Property },
    ],
    'q-item-wrapper': [
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'inset', kind: vscode.CompletionItemKind.Property },
    ],
    'q-page-sticky': [
        { label: 'position', kind: vscode.CompletionItemKind.Property },
        { label: 'offset', kind: vscode.CompletionItemKind.Property },
    ],
    'q-parallax': [
        { label: 'src', kind: vscode.CompletionItemKind.Property },
    ],
    'q-popup-edit': [
        { label: 'v-model', kind: vscode.CompletionItemKind.Property },
    ],
    'q-space': [
        { label: 'grow', kind: vscode.CompletionItemKind.Property },
    ],
    'q-spinner': [
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-tab-panels': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
    ],
    'q-tab-panel': [
        { label: 'name', kind: vscode.CompletionItemKind.Property },
    ],
    'q-tabs': [
        { label: 'value', kind: vscode.CompletionItemKind.Property },
    ],
    'q-route-tab': [
        { label: 'to', kind: vscode.CompletionItemKind.Property },
    ],
    'q-tree': [
        { label: 'nodes', kind: vscode.CompletionItemKind.Property },
    ],
    'q-separator': [
        { label: 'vertical', kind: vscode.CompletionItemKind.Property },
    ],
    'q-context-menu': [
        { label: 'trigger', kind: vscode.CompletionItemKind.Property },
    ],
    'q-dialog': [
        { label: 'v-model', kind: vscode.CompletionItemKind.Property },
    ],
    'q-popup-proxy': [
        { label: 'v-model', kind: vscode.CompletionItemKind.Property },
    ],
    'q-menu': [
        { label: 'v-model', kind: vscode.CompletionItemKind.Property },
    ],
};

// 공통 속성 정의
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

export function activate(context: vscode.ExtensionContext) {
    const packageJsonPath = path.join(vscode.workspace.rootPath || '', 'package.json');
    let quasarUsed = false;

    try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        quasarUsed = packageJson.dependencies && packageJson.dependencies.quasar || packageJson.devDependencies && packageJson.devDependencies.quasar;
    } catch (error) {
        console.error('Error reading package.json:', error);
    }

    const vueFileSelector = { language: 'vue', scheme: 'file' };

    const componentCompletionItems: vscode.CompletionItem[] = quasarComponents.map(component => {
        const completionItem = new vscode.CompletionItem(component.label, component.kind);
        completionItem.insertText = new vscode.SnippetString(`${component.label}>\n\t$0\n</${component.label}>`);
        if (quasarUsed) {
            completionItem.sortText = '0' + component.label; // Quasar가 사용 중이면 우선순위를 높입니다.
        } else {
            completionItem.sortText = '1' + component.label; // 그렇지 않으면 기본 우선순위를 사용합니다.
        }
        return completionItem;
    });

   // 속성 자동완성 항목을 생성합니다.
    const propsCompletionItems: vscode.CompletionItem[] = Object.keys(quasarProps).reduce((acc: vscode.CompletionItem[], component: string) => {
        const props = quasarProps[component].map(prop => {
            const completionItem = new vscode.CompletionItem(prop.label, prop.kind);
            if (quasarUsed) {
                completionItem.sortText = '0' + prop.label; // Quasar가 사용 중이면 우선순위를 높입니다.
            } else {
                completionItem.sortText = '1' + prop.label; // 그렇지 않으면 기본 우선순위를 사용합니다.
            }
            return completionItem;
        });
        return acc.concat(props);
    }, []);

    // Completion Provider를 등록합니다.
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            vueFileSelector,
            {
                provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                    return [
                        ...componentCompletionItems,
                        ...propsCompletionItems
                    ];
                }
            },
            '',
            '<',
            ':'
        )
    );
}

export function deactivate() { }