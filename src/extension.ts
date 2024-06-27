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
    { label: 'q-bar', kind: vscode.CompletionItemKind.Class, sortText: '8' },
    { label: 'q-drawer', kind: vscode.CompletionItemKind.Class, sortText: '9' },
    { label: 'q-drawer-link', kind: vscode.CompletionItemKind.Class, sortText: '10' },

    // Form Components
    { label: 'q-btn', kind: vscode.CompletionItemKind.Class, sortText: '11' },
    { label: 'q-btn-dropdown', kind: vscode.CompletionItemKind.Class, sortText: '12' },
    { label: 'q-btn-group', kind: vscode.CompletionItemKind.Class, sortText: '13' },
    { label: 'q-btn-toggle', kind: vscode.CompletionItemKind.Class, sortText: '14' },
    { label: 'q-option-group', kind: vscode.CompletionItemKind.Class, sortText: '15' },
    { label: 'q-checkbox', kind: vscode.CompletionItemKind.Class, sortText: '16' },
    { label: 'q-chip', kind: vscode.CompletionItemKind.Class, sortText: '17' },
    { label: 'q-circular-progress', kind: vscode.CompletionItemKind.Class, sortText: '18' },
    { label: 'q-form', kind: vscode.CompletionItemKind.Class, sortText: '19' },
    { label: 'q-field', kind: vscode.CompletionItemKind.Class, sortText: '20' },
    { label: 'q-input', kind: vscode.CompletionItemKind.Class, sortText: '21' },
    { label: 'q-radio', kind: vscode.CompletionItemKind.Class, sortText: '22' },
    { label: 'q-file', kind: vscode.CompletionItemKind.Class, sortText: '23' },
    { label: 'q-select', kind: vscode.CompletionItemKind.Class, sortText: '24' },
    { label: 'q-slider', kind: vscode.CompletionItemKind.Class, sortText: '25' },
    { label: 'q-range', kind: vscode.CompletionItemKind.Class, sortText: '26' },
    { label: 'q-toggle', kind: vscode.CompletionItemKind.Class, sortText: '27' },
    
    // Display Components
    { label: 'q-avatar', kind: vscode.CompletionItemKind.Class, sortText: '28' },
    { label: 'q-badge', kind: vscode.CompletionItemKind.Class, sortText: '29' },
    { label: 'q-card', kind: vscode.CompletionItemKind.Class, sortText: '30' },
    { label: 'q-carousel', kind: vscode.CompletionItemKind.Class, sortText: '31' },
    { label: 'q-carousel-slide', kind: vscode.CompletionItemKind.Class, sortText: '32' },
    { label: 'q-expansion-item', kind: vscode.CompletionItemKind.Class, sortText: '33' },
    { label: 'q-chat-message', kind: vscode.CompletionItemKind.Class, sortText: '34' },
    { label: 'q-icon', kind: vscode.CompletionItemKind.Class, sortText: '35' },
    { label: 'q-img', kind: vscode.CompletionItemKind.Class, sortText: '36' },
    { label: 'q-item', kind: vscode.CompletionItemKind.Class, sortText: '37' },
    { label: 'q-item-section', kind: vscode.CompletionItemKind.Class, sortText: '38' },
    { label: 'q-item-label', kind: vscode.CompletionItemKind.Class, sortText: '39' },
    { label: 'q-linear-progress', kind: vscode.CompletionItemKind.Class, sortText: '40' },
    { label: 'q-list', kind: vscode.CompletionItemKind.Class, sortText: '41' },
    { label: 'q-page-sticky', kind: vscode.CompletionItemKind.Class, sortText: '42' },
    { label: 'q-page-scroller', kind: vscode.CompletionItemKind.Class, sortText: '43' },
    { label: 'q-ajax-bar', kind: vscode.CompletionItemKind.Class, sortText: '44' },
    { label: 'q-parallax', kind: vscode.CompletionItemKind.Class, sortText: '45' },
    { label: 'q-popup-edit', kind: vscode.CompletionItemKind.Class, sortText: '46' },
    { label: 'q-space', kind: vscode.CompletionItemKind.Class, sortText: '47' },
    { label: 'q-spinner', kind: vscode.CompletionItemKind.Class, sortText: '48' },
    { label: 'q-spinner-cube', kind: vscode.CompletionItemKind.Class, sortText: '49' },
    { label: 'q-tab-panels', kind: vscode.CompletionItemKind.Class, sortText: '50' },
    { label: 'q-tab-panel', kind: vscode.CompletionItemKind.Class, sortText: '51' },
    { label: 'q-tabs', kind: vscode.CompletionItemKind.Class, sortText: '52' },
    { label: 'q-route-tab', kind: vscode.CompletionItemKind.Class, sortText: '53' },
    { label: 'q-tree', kind: vscode.CompletionItemKind.Class, sortText: '54' },

    // Helpers    
    { label: 'q-separator', kind: vscode.CompletionItemKind.Class, sortText: '55' },
    { label: 'q-space', kind: vscode.CompletionItemKind.Class, sortText: '56' },
    
    // Other Components
    { label: 'q-dialog', kind: vscode.CompletionItemKind.Class, sortText: '57' },
    { label: 'q-popup-proxy', kind: vscode.CompletionItemKind.Class, sortText: '58' },
    { label: 'q-menu', kind: vscode.CompletionItemKind.Class, sortText: '59' },
    { label: 'q-page', kind: vscode.CompletionItemKind.Class, sortText: '60' },
    { label: 'q-breadcrumbs', kind: vscode.CompletionItemKind.Class, sortText: '61' },
    { label: 'q-breadcrumbs-el', kind: vscode.CompletionItemKind.Class, sortText: '62' },
    { label: 'q-editor', kind: vscode.CompletionItemKind.Class, sortText: '63' },
    { label: 'q-fab', kind: vscode.CompletionItemKind.Class, sortText: '64' },
    { label: 'q-time', kind: vscode.CompletionItemKind.Class, sortText: '65' },
    { label: 'q-date', kind: vscode.CompletionItemKind.Class, sortText: '66' },
    { label: 'q-infinite-scroll', kind: vscode.CompletionItemKind.Class, sortText: '67' },
    { label: 'q-inner-loading', kind: vscode.CompletionItemKind.Class, sortText: '68' },
    { label: 'q-intersection', kind: vscode.CompletionItemKind.Class, sortText: '69' },
    { label: 'q-knob', kind: vscode.CompletionItemKind.Class, sortText: '70' },
    { label: 'q-markup-table', kind: vscode.CompletionItemKind.Class, sortText: '71' },
    { label: 'q-no-ssr', kind: vscode.CompletionItemKind.Class, sortText: '72' },
    { label: 'q-resize-observer', kind: vscode.CompletionItemKind.Class, sortText: '73' },
    { label: 'q-scroll-observer', kind: vscode.CompletionItemKind.Class, sortText: '74' },
    { label: 'q-pagination', kind: vscode.CompletionItemKind.Class, sortText: '75' },
    { label: 'q-pull-to-refresh', kind: vscode.CompletionItemKind.Class, sortText: '76' },
    { label: 'q-rating', kind: vscode.CompletionItemKind.Class, sortText: '77' },
    { label: 'q-responsive', kind: vscode.CompletionItemKind.Class, sortText: '78' },
    { label: 'q-scroll-area', kind: vscode.CompletionItemKind.Class, sortText: '79' }
]


// Quasar 속성 정의
interface QuasarProps {
    [key: string]: { label: string; kind: vscode.CompletionItemKind; }[];
}

const quasarProps: QuasarProps = {
    'q-layout': [
        { label: 'view', kind: vscode.CompletionItemKind.Property },
        { label: 'container', kind: vscode.CompletionItemKind.Property },
        { label: '@resize', kind: vscode.CompletionItemKind.Property },
        { label: '@scroll', kind: vscode.CompletionItemKind.Property },
        { label: '@scroll-height', kind: vscode.CompletionItemKind.Property },
    ],
    'q-header': [
        { label: 'reveal', kind: vscode.CompletionItemKind.Property },
        { label: 'reveal-offset', kind: vscode.CompletionItemKind.Property },
        { label: 'height-hint', kind: vscode.CompletionItemKind.Property },
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'bordered', kind: vscode.CompletionItemKind.Property },
        { label: 'elevated', kind: vscode.CompletionItemKind.Property },
        { label: '@reveal', kind: vscode.CompletionItemKind.Property },
    ],
    'q-footer': [
        { label: 'reveal', kind: vscode.CompletionItemKind.Property },
        { label: 'height-hint', kind: vscode.CompletionItemKind.Property },
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'bordered', kind: vscode.CompletionItemKind.Property },
        { label: 'elevated', kind: vscode.CompletionItemKind.Property },
        { label: '@reveal', kind: vscode.CompletionItemKind.Property },
    ],
    'q-drawer': [
        { label: 'side', kind: vscode.CompletionItemKind.Property },
        { label: 'overlay', kind: vscode.CompletionItemKind.Property },
        { label: 'mini', kind: vscode.CompletionItemKind.Property },
        { label: 'mini-to-overlay', kind: vscode.CompletionItemKind.Property },
        { label: 'no-mini-animation', kind: vscode.CompletionItemKind.Property },
        { label: 'breakpoint', kind: vscode.CompletionItemKind.Property },
        { label: 'behavior', kind: vscode.CompletionItemKind.Property },
        { label: 'persistent', kind: vscode.CompletionItemKind.Property },
        { label: 'show-if-above', kind: vscode.CompletionItemKind.Property },
        { label: 'no-swipe-open', kind: vscode.CompletionItemKind.Property },
        { label: 'no-swipe-close', kind: vscode.CompletionItemKind.Property },
        { label: 'no-swipe-backdrop', kind: vscode.CompletionItemKind.Property },
        { label: 'right-side', kind: vscode.CompletionItemKind.Property },

        { label: 'model-value', kind: vscode.CompletionItemKind.Property },

        { label: 'width', kind: vscode.CompletionItemKind.Property },
        { label: 'mini-width', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'bordered', kind: vscode.CompletionItemKind.Property },
        { label: 'elevated', kind: vscode.CompletionItemKind.Property },

        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@show', kind: vscode.CompletionItemKind.Property },
        { label: '@before-show', kind: vscode.CompletionItemKind.Property },
        { label: '@hide', kind: vscode.CompletionItemKind.Property },
        { label: '@before-hide', kind: vscode.CompletionItemKind.Property },
        { label: '@on-layout', kind: vscode.CompletionItemKind.Property },

        { label: 'show', kind: vscode.CompletionItemKind.Property },
        { label: 'hide', kind: vscode.CompletionItemKind.Property },
        { label: 'toggle', kind: vscode.CompletionItemKind.Property },
        
    ],
    'q-page-container': [
        { label: 'style-fn', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
    ],
    'q-page': [
        { label: 'padding', kind: vscode.CompletionItemKind.Property },
        { label: ':style', kind: vscode.CompletionItemKind.Property },
        { label: 'style', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
    ],
    'q-toolbar': [
        { label: 'inset', kind: vscode.CompletionItemKind.Property },
        { label: 'inverted', kind: vscode.CompletionItemKind.Property },
        { label: 'glossy', kind: vscode.CompletionItemKind.Property },
    ],
    'q-toolbar-title': [
        { label: 'shrink', kind: vscode.CompletionItemKind.Property },
        { label: 'inset', kind: vscode.CompletionItemKind.Property },
        { label: 'inverted', kind: vscode.CompletionItemKind.Property },
        { label: 'glossy', kind: vscode.CompletionItemKind.Property },
    ],
    'q-banner': [
        { label: 'inline-actions', kind: vscode.CompletionItemKind.Property },

        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
    ],
    'q-bar': [
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
    ],
    'q-drawer-link': [
        { label: 'to', kind: vscode.CompletionItemKind.Property },
        { label: 'exact', kind: vscode.CompletionItemKind.Property },
        { label: 'replace', kind: vscode.CompletionItemKind.Property },
    ],
    'q-btn': [
        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'percentage', kind: vscode.CompletionItemKind.Property },
        { label: 'dark-percentage', kind: vscode.CompletionItemKind.Property },

        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'icon-right', kind: vscode.CompletionItemKind.Property },
        { label: 'no-caps', kind: vscode.CompletionItemKind.Property },
        { label: 'no-wrap', kind: vscode.CompletionItemKind.Property },
        { label: 'align', kind: vscode.CompletionItemKind.Property },
        { label: 'stack', kind: vscode.CompletionItemKind.Property },
        { label: 'stretch', kind: vscode.CompletionItemKind.Property },
        
        { label: 'type', kind: vscode.CompletionItemKind.Property },
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'to', kind: vscode.CompletionItemKind.Property },
        { label: 'replace', kind: vscode.CompletionItemKind.Property },
        { label: 'href', kind: vscode.CompletionItemKind.Property },
        { label: 'target', kind: vscode.CompletionItemKind.Property },
        
        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'outline', kind: vscode.CompletionItemKind.Property },
        { label: 'flat', kind: vscode.CompletionItemKind.Property },
        { label: 'unelevated', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'push', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'glossy', kind: vscode.CompletionItemKind.Property },
        { label: 'fab', kind: vscode.CompletionItemKind.Property },
        { label: 'fab-mini', kind: vscode.CompletionItemKind.Property },
        { label: 'padding', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'ripple', kind: vscode.CompletionItemKind.Property },
        { label: 'round', kind: vscode.CompletionItemKind.Property },

        { label: '@click', kind: vscode.CompletionItemKind.Property },

        { label: 'click', kind: vscode.CompletionItemKind.Property },
    ],
    'q-btn-dropdown': [
        { label: 'spread', kind: vscode.CompletionItemKind.Property },
        { label: 'stretch', kind: vscode.CompletionItemKind.Property },
        
        { label: 'outline', kind: vscode.CompletionItemKind.Property },
        { label: 'flat', kind: vscode.CompletionItemKind.Property },
        { label: 'unelevated', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'push', kind: vscode.CompletionItemKind.Property },
        { label: 'glossy', kind: vscode.CompletionItemKind.Property },

        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-btn-group': [
        { label: 'toggle-aria-label', kind: vscode.CompletionItemKind.Property },

        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'split', kind: vscode.CompletionItemKind.Property },
        { label: 'disable-main-btn', kind: vscode.CompletionItemKind.Property },
        { label: 'disable-dropdown', kind: vscode.CompletionItemKind.Property },
        { label: 'persistent', kind: vscode.CompletionItemKind.Property },
        { label: 'no-route-dismiss', kind: vscode.CompletionItemKind.Property },
        { label: 'auto-close', kind: vscode.CompletionItemKind.Property },
        
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'icon-right', kind: vscode.CompletionItemKind.Property },
        { label: 'no-caps', kind: vscode.CompletionItemKind.Property },
        { label: 'no-wrap', kind: vscode.CompletionItemKind.Property },
        { label: 'align', kind: vscode.CompletionItemKind.Property },
        { label: 'stack', kind: vscode.CompletionItemKind.Property },
        { label: 'stretch', kind: vscode.CompletionItemKind.Property },
        { label: 'split', kind: vscode.CompletionItemKind.Property },
        { label: 'dropdown-icon', kind: vscode.CompletionItemKind.Property },
        
        { label: 'type', kind: vscode.CompletionItemKind.Property },
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'to', kind: vscode.CompletionItemKind.Property },
        { label: 'replace', kind: vscode.CompletionItemKind.Property },
        { label: 'href', kind: vscode.CompletionItemKind.Property },
        { label: 'target', kind: vscode.CompletionItemKind.Property },
        
        { label: 'cover', kind: vscode.CompletionItemKind.Property },
        { label: 'menu-anchor', kind: vscode.CompletionItemKind.Property },
        { label: 'menu-self', kind: vscode.CompletionItemKind.Property },
        { label: 'sprmenu-offsetead', kind: vscode.CompletionItemKind.Property },
        
        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'outline', kind: vscode.CompletionItemKind.Property },
        { label: 'flat', kind: vscode.CompletionItemKind.Property },
        { label: 'unelevated', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'push', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'glossy', kind: vscode.CompletionItemKind.Property },
        { label: 'fab', kind: vscode.CompletionItemKind.Property },
        { label: 'fab-mini', kind: vscode.CompletionItemKind.Property },
        { label: 'padding', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'ripple', kind: vscode.CompletionItemKind.Property },
        { label: 'no-icon-animation', kind: vscode.CompletionItemKind.Property },
        { label: 'content-style', kind: vscode.CompletionItemKind.Property },
        { label: 'content-class', kind: vscode.CompletionItemKind.Property },
        
        { label: 'spread', kind: vscode.CompletionItemKind.Property },
        { label: 'spread', kind: vscode.CompletionItemKind.Property },
        { label: 'spread', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@show', kind: vscode.CompletionItemKind.Property },
        { label: '@before-show', kind: vscode.CompletionItemKind.Property },
        { label: '@hide', kind: vscode.CompletionItemKind.Property },
        { label: '@before-hide', kind: vscode.CompletionItemKind.Property },
        { label: '@click', kind: vscode.CompletionItemKind.Property },
        
        { label: 'show', kind: vscode.CompletionItemKind.Property },
        { label: 'hide', kind: vscode.CompletionItemKind.Property },
        { label: 'toggle', kind: vscode.CompletionItemKind.Property },
    ],
    'q-btn-toggle':[
        
        { label: 'spread', kind: vscode.CompletionItemKind.Property },
        { label: 'no-caps', kind: vscode.CompletionItemKind.Property },
        { label: 'no-wrap', kind: vscode.CompletionItemKind.Property },
        { label: 'stack', kind: vscode.CompletionItemKind.Property },
        { label: 'stretch', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'options', kind: vscode.CompletionItemKind.Property },
        { label: 'clearable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'readonly', kind: vscode.CompletionItemKind.Property },
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'toggle-color', kind: vscode.CompletionItemKind.Property },
        { label: 'toggle-text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'outline', kind: vscode.CompletionItemKind.Property },
        { label: 'flat', kind: vscode.CompletionItemKind.Property },
        { label: 'unelevated', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'push', kind: vscode.CompletionItemKind.Property },
        { label: 'glossy', kind: vscode.CompletionItemKind.Property },
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'padding', kind: vscode.CompletionItemKind.Property },
        { label: 'ripple', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@clear', kind: vscode.CompletionItemKind.Property },
    ],
    'q-option-group':[
        { label: 'keep-color', kind: vscode.CompletionItemKind.Property },
        
        { label: 'type', kind: vscode.CompletionItemKind.Property },
        { label: 'left-label', kind: vscode.CompletionItemKind.Property },
        { label: 'inline', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'options', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
    ],
    'q-checkbox': [
        { label: 'toggle-order', kind: vscode.CompletionItemKind.Property },
        { label: 'toggle-indeterminate', kind: vscode.CompletionItemKind.Property },
        { label: 'keep-color', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'checked-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'unchecked-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'indeterminate-icon', kind: vscode.CompletionItemKind.Property },
        
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'left-label', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'val', kind: vscode.CompletionItemKind.Property },
        { label: 'true-value', kind: vscode.CompletionItemKind.Property },
        { label: 'false-value', kind: vscode.CompletionItemKind.Property },
        { label: 'indeterminate-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'toggle', kind: vscode.CompletionItemKind.Property },
        
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-chip': [
        { label: 'remove-aria-label', kind: vscode.CompletionItemKind.Property },
        
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'icon-right', kind: vscode.CompletionItemKind.Property },
        { label: 'icon-remove', kind: vscode.CompletionItemKind.Property },
        { label: 'icon-selected', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'selected', kind: vscode.CompletionItemKind.Property },
        
        { label: 'clickable', kind: vscode.CompletionItemKind.Property },
        { label: 'removable', kind: vscode.CompletionItemKind.Property },
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'outline', kind: vscode.CompletionItemKind.Property },
        { label: 'ripple', kind: vscode.CompletionItemKind.Property },
        
        { label: '@click', kind: vscode.CompletionItemKind.Property },
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@update:selected', kind: vscode.CompletionItemKind.Property },
        { label: '@remove', kind: vscode.CompletionItemKind.Property },
        
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-circular-progress':[
        { label: 'indeterminate', kind: vscode.CompletionItemKind.Property },
        { label: 'show-value', kind: vscode.CompletionItemKind.Property },
        { label: 'reverse', kind: vscode.CompletionItemKind.Property },
        { label: 'instant-feedback', kind: vscode.CompletionItemKind.Property },
        
        { label: 'angle', kind: vscode.CompletionItemKind.Property },
        { label: 'show-value', kind: vscode.CompletionItemKind.Property },

        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'min', kind: vscode.CompletionItemKind.Property },
        { label: 'max', kind: vscode.CompletionItemKind.Property },
        
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'center-color', kind: vscode.CompletionItemKind.Property },
        { label: 'track-color', kind: vscode.CompletionItemKind.Property },
        { label: 'font-size', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'thickness', kind: vscode.CompletionItemKind.Property },
        { label: 'animation-speed', kind: vscode.CompletionItemKind.Property },
    ],
    'q-form':[
        { label: 'autofocus', kind: vscode.CompletionItemKind.Property },
        { label: 'no-error-focus', kind: vscode.CompletionItemKind.Property },
        { label: 'no-reset-focus', kind: vscode.CompletionItemKind.Property },
        { label: 'greedy', kind: vscode.CompletionItemKind.Property },
        
        { label: '@submit', kind: vscode.CompletionItemKind.Property },
        { label: '@reset', kind: vscode.CompletionItemKind.Property },
        { label: '@validation-success', kind: vscode.CompletionItemKind.Property },
        { label: '@validation-error', kind: vscode.CompletionItemKind.Property },
        
        { label: 'focus', kind: vscode.CompletionItemKind.Property },
        { label: 'validate', kind: vscode.CompletionItemKind.Property },
        { label: 'resetValidation', kind: vscode.CompletionItemKind.Property },
        { label: 'submit', kind: vscode.CompletionItemKind.Property },
        { label: 'reset', kind: vscode.CompletionItemKind.Property },
        { label: 'getValidationComponents', kind: vscode.CompletionItemKind.Property },
    ],
    'q-field':[
        { label: 'error', kind: vscode.CompletionItemKind.Property },
        { label: 'rules', kind: vscode.CompletionItemKind.Property },
        { label: 'reactive-rules', kind: vscode.CompletionItemKind.Property },
        { label: 'lazy-rules', kind: vscode.CompletionItemKind.Property },
        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'clearable', kind: vscode.CompletionItemKind.Property },
        { label: 'autofocus', kind: vscode.CompletionItemKind.Property },
        { label: 'for', kind: vscode.CompletionItemKind.Property },
        
        { label: 'error-message', kind: vscode.CompletionItemKind.Property },
        { label: 'no-error-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'stack-label', kind: vscode.CompletionItemKind.Property },
        { label: 'hint', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-hint', kind: vscode.CompletionItemKind.Property },
        { label: 'prefix', kind: vscode.CompletionItemKind.Property },
        { label: 'suffix', kind: vscode.CompletionItemKind.Property },
        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'clearable', kind: vscode.CompletionItemKind.Property },
        { label: 'clear-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'label-slot', kind: vscode.CompletionItemKind.Property },
        { label: 'bottom-slots', kind: vscode.CompletionItemKind.Property },
        { label: 'counter', kind: vscode.CompletionItemKind.Property },
        { label: 'tag', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'maxlength', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        { label: 'readonly', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@focus', kind: vscode.CompletionItemKind.Property },
        { label: '@blur', kind: vscode.CompletionItemKind.Property },
        { label: '@clear', kind: vscode.CompletionItemKind.Property },
        
        { label: 'resetValidation', kind: vscode.CompletionItemKind.Property },
        { label: 'validate', kind: vscode.CompletionItemKind.Property },
        { label: 'focus', kind: vscode.CompletionItemKind.Property },
        { label: 'blur', kind: vscode.CompletionItemKind.Property },
        
        { label: 'hasError', kind: vscode.CompletionItemKind.Property },
    ],
    'q-input': [
        // Behavior
        { label: 'mask', kind: vscode.CompletionItemKind.Property },
        { label: 'fill-mask', kind: vscode.CompletionItemKind.Property },
        { label: 'reverse-fill-mask', kind: vscode.CompletionItemKind.Property },
        { label: 'unmasked-value', kind: vscode.CompletionItemKind.Property },
        { label: 'error', kind: vscode.CompletionItemKind.Property },
        { label: 'rules', kind: vscode.CompletionItemKind.Property },
        { label: 'reactive-rules', kind: vscode.CompletionItemKind.Property },
        { label: 'lazy-rules', kind: vscode.CompletionItemKind.Property },
        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'clearable', kind: vscode.CompletionItemKind.Property },
        { label: 'autofocus', kind: vscode.CompletionItemKind.Property },
        { label: 'for', kind: vscode.CompletionItemKind.Property },

        // Content
        { label: 'error-message', kind: vscode.CompletionItemKind.Property },
        { label: 'no-error-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'stack-label', kind: vscode.CompletionItemKind.Property },
        { label: 'hint', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-hint', kind: vscode.CompletionItemKind.Property },
        { label: 'prefix', kind: vscode.CompletionItemKind.Property },
        { label: 'suffix', kind: vscode.CompletionItemKind.Property },
        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'clearable', kind: vscode.CompletionItemKind.Property },
        { label: 'clear-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'label-slot', kind: vscode.CompletionItemKind.Property },
        { label: 'bottom-slots', kind: vscode.CompletionItemKind.Property },
        { label: 'counter', kind: vscode.CompletionItemKind.Property },
        { label: 'shadow-text', kind: vscode.CompletionItemKind.Property },
        { label: 'autogrow', kind: vscode.CompletionItemKind.Property },

        // General
        { label: 'type', kind: vscode.CompletionItemKind.Property },

        // Model
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'debounce', kind: vscode.CompletionItemKind.Property },
        { label: 'maxlength', kind: vscode.CompletionItemKind.Property },

        // State
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        { label: 'readonly', kind: vscode.CompletionItemKind.Property },

        // Style
        { label: 'label-color', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'bg-color', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'filled', kind: vscode.CompletionItemKind.Property },
        { label: 'outlined', kind: vscode.CompletionItemKind.Property },
        { label: 'borderless', kind: vscode.CompletionItemKind.Property },
        { label: 'standout', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-bottom-space', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'item-aligned', kind: vscode.CompletionItemKind.Property },
        { label: 'input-class', kind: vscode.CompletionItemKind.Property },
        { label: 'input-style', kind: vscode.CompletionItemKind.Property },
    ],
    'q-radio': [
        { label: 'keep-color', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'checked-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'unchecked-icon', kind: vscode.CompletionItemKind.Property },
        
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'left-label', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'val', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'set', kind: vscode.CompletionItemKind.Property },
        
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    // 'q-search': [
    //     { label: 'value', kind: vscode.CompletionItemKind.Property },
    //     { label: 'placeholder', kind: vscode.CompletionItemKind.Property },
    //     { label: 'label', kind: vscode.CompletionItemKind.Property },
    // ],
    'q-file':[
        { label: 'multiple', kind: vscode.CompletionItemKind.Property },
        { label: 'accept', kind: vscode.CompletionItemKind.Property },
        { label: 'capture', kind: vscode.CompletionItemKind.Property },
        { label: 'max-file-size', kind: vscode.CompletionItemKind.Property },
        { label: 'max-total-size', kind: vscode.CompletionItemKind.Property },
        { label: 'max-files', kind: vscode.CompletionItemKind.Property },
        { label: 'filter', kind: vscode.CompletionItemKind.Property },
        { label: 'error', kind: vscode.CompletionItemKind.Property },
        { label: 'rules', kind: vscode.CompletionItemKind.Property },
        { label: 'reactive-rules', kind: vscode.CompletionItemKind.Property },
        { label: 'lazy-rules', kind: vscode.CompletionItemKind.Property },
        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'clearable', kind: vscode.CompletionItemKind.Property },
        { label: 'autofocus', kind: vscode.CompletionItemKind.Property },
        { label: 'for', kind: vscode.CompletionItemKind.Property },
        { label: 'append', kind: vscode.CompletionItemKind.Property },
        { label: 'counter-label', kind: vscode.CompletionItemKind.Property },
        
        { label: 'error-message', kind: vscode.CompletionItemKind.Property },
        { label: 'no-error-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'stack-label', kind: vscode.CompletionItemKind.Property },
        { label: 'hint', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-hint', kind: vscode.CompletionItemKind.Property },
        { label: 'prefix', kind: vscode.CompletionItemKind.Property },
        { label: 'suffix', kind: vscode.CompletionItemKind.Property },
        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'clearable', kind: vscode.CompletionItemKind.Property },
        { label: 'clear-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'label-slot', kind: vscode.CompletionItemKind.Property },
        { label: 'bottom-slots', kind: vscode.CompletionItemKind.Property },
        { label: 'counter', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'display-value', kind: vscode.CompletionItemKind.Property },
        { label: 'use-chips', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        { label: 'readonly', kind: vscode.CompletionItemKind.Property },
        
        { label: 'label-color', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'bg-color', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'filled', kind: vscode.CompletionItemKind.Property },
        { label: 'outlined', kind: vscode.CompletionItemKind.Property },
        { label: 'borderless', kind: vscode.CompletionItemKind.Property },
        { label: 'standout', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-bottom-space', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'item-aligned', kind: vscode.CompletionItemKind.Property },
        { label: 'input-class', kind: vscode.CompletionItemKind.Property },
        { label: 'input-style', kind: vscode.CompletionItemKind.Property },
        
        { label: '@rejected', kind: vscode.CompletionItemKind.Property },
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@focus', kind: vscode.CompletionItemKind.Property },
        { label: '@blur', kind: vscode.CompletionItemKind.Property },
        { label: '@clear', kind: vscode.CompletionItemKind.Property },
        
        { label: 'pickFiles', kind: vscode.CompletionItemKind.Property },
        { label: 'addFiles', kind: vscode.CompletionItemKind.Property },
        { label: 'resetValidation', kind: vscode.CompletionItemKind.Property },
        { label: 'validate', kind: vscode.CompletionItemKind.Property },
        { label: 'focus', kind: vscode.CompletionItemKind.Property },
        { label: 'blur', kind: vscode.CompletionItemKind.Property },
        { label: 'removeAtIndex', kind: vscode.CompletionItemKind.Property },
        { label: 'removeFile', kind: vscode.CompletionItemKind.Property },
        { label: 'getNativeElement', kind: vscode.CompletionItemKind.Property },
        
        { label: 'hasError', kind: vscode.CompletionItemKind.Property },
        { label: 'nativeEl', kind: vscode.CompletionItemKind.Property },

    ],
    'q-select': [
        { label: 'virtual-scroll-horizontal', kind: vscode.CompletionItemKind.Property },
        { label: 'error', kind: vscode.CompletionItemKind.Property },
        { label: 'rules', kind: vscode.CompletionItemKind.Property },
        { label: 'reactive-rules', kind: vscode.CompletionItemKind.Property },
        { label: 'lazy-rules', kind: vscode.CompletionItemKind.Property },
        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'clearable', kind: vscode.CompletionItemKind.Property },
        { label: 'autofocus', kind: vscode.CompletionItemKind.Property },
        { label: 'for', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-dropdown-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'popup-no-route-dismiss', kind: vscode.CompletionItemKind.Property },
        { label: 'fill-input', kind: vscode.CompletionItemKind.Property },
        { label: 'new-value-mode', kind: vscode.CompletionItemKind.Property },
        { label: 'autocomplete', kind: vscode.CompletionItemKind.Property },
        { label: 'transition-show', kind: vscode.CompletionItemKind.Property },
        { label: 'transition-hide', kind: vscode.CompletionItemKind.Property },
        { label: 'transition-duration', kind: vscode.CompletionItemKind.Property },
        { label: 'behavior', kind: vscode.CompletionItemKind.Property },
        
        { label: 'table-colspan', kind: vscode.CompletionItemKind.Property },
        { label: 'error-message', kind: vscode.CompletionItemKind.Property },
        { label: 'no-error-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'stack-label', kind: vscode.CompletionItemKind.Property },
        { label: 'hint', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-hint', kind: vscode.CompletionItemKind.Property },
        { label: 'prefix', kind: vscode.CompletionItemKind.Property },
        { label: 'suffix', kind: vscode.CompletionItemKind.Property },
        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'clearable', kind: vscode.CompletionItemKind.Property },
        { label: 'clear-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'label-slot', kind: vscode.CompletionItemKind.Property },
        { label: 'bottom-slots', kind: vscode.CompletionItemKind.Property },
        { label: 'counter', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-dropdown-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'dropdown-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'use-input', kind: vscode.CompletionItemKind.Property },
        { label: 'maxlength', kind: vscode.CompletionItemKind.Property },
        { label: 'input-debounce', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'multiple', kind: vscode.CompletionItemKind.Property },
        { label: 'emit-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'options', kind: vscode.CompletionItemKind.Property },
        { label: 'option-value', kind: vscode.CompletionItemKind.Property },
        { label: 'option-label', kind: vscode.CompletionItemKind.Property },
        { label: 'option-disable', kind: vscode.CompletionItemKind.Property },
        { label: 'options-dense', kind: vscode.CompletionItemKind.Property },
        { label: 'options-dark', kind: vscode.CompletionItemKind.Property },
        { label: 'options-selected-class', kind: vscode.CompletionItemKind.Property },
        { label: 'options-html', kind: vscode.CompletionItemKind.Property },
        { label: 'options-cover', kind: vscode.CompletionItemKind.Property },
        { label: 'menu-shrink', kind: vscode.CompletionItemKind.Property },
        { label: 'map-options', kind: vscode.CompletionItemKind.Property },
        
        { label: 'menu-anchor', kind: vscode.CompletionItemKind.Property },
        { label: 'menu-self', kind: vscode.CompletionItemKind.Property },
        { label: 'menu-offset', kind: vscode.CompletionItemKind.Property },
        
        { label: 'multiple', kind: vscode.CompletionItemKind.Property },
        { label: 'display-value', kind: vscode.CompletionItemKind.Property },
        { label: 'display-value-html', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-selected', kind: vscode.CompletionItemKind.Property },
        { label: 'max-values', kind: vscode.CompletionItemKind.Property },
        { label: 'use-chips', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        { label: 'readonly', kind: vscode.CompletionItemKind.Property },
        
        { label: 'label-color', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'bg-color', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'filled', kind: vscode.CompletionItemKind.Property },
        { label: 'outlined', kind: vscode.CompletionItemKind.Property },
        { label: 'borderless', kind: vscode.CompletionItemKind.Property },
        { label: 'standout', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-bottom-space', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'item-aligned', kind: vscode.CompletionItemKind.Property },
        { label: 'popup-content-class', kind: vscode.CompletionItemKind.Property },
        { label: 'popup-content-style', kind: vscode.CompletionItemKind.Property },
        { label: 'input-class', kind: vscode.CompletionItemKind.Property },
        { label: 'input-style', kind: vscode.CompletionItemKind.Property },
        
        { label: 'virtual-scroll-slice-size', kind: vscode.CompletionItemKind.Property },
        { label: 'virtual-scroll-slice-ratio-before', kind: vscode.CompletionItemKind.Property },
        { label: 'virtual-scroll-slice-ratio-after', kind: vscode.CompletionItemKind.Property },
        { label: 'virtual-scroll-item-size', kind: vscode.CompletionItemKind.Property },
        { label: 'virtual-scroll-sticky-size-start', kind: vscode.CompletionItemKind.Property },
        { label: 'virtual-scroll-sticky-size-end', kind: vscode.CompletionItemKind.Property },
        { label: 'table-colspan', kind: vscode.CompletionItemKind.Property },
        
        { label: '@virtual-scroll', kind: vscode.CompletionItemKind.Property },
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@focus', kind: vscode.CompletionItemKind.Property },
        { label: '@blur', kind: vscode.CompletionItemKind.Property },
        { label: '@clear', kind: vscode.CompletionItemKind.Property },
        { label: '@input-value', kind: vscode.CompletionItemKind.Property },
        { label: '@remove', kind: vscode.CompletionItemKind.Property },
        { label: '@add', kind: vscode.CompletionItemKind.Property },
        { label: '@new-value', kind: vscode.CompletionItemKind.Property },
        { label: '@filter', kind: vscode.CompletionItemKind.Property },
        { label: '@filter-abort', kind: vscode.CompletionItemKind.Property },
        { label: '@popup-show', kind: vscode.CompletionItemKind.Property },
        { label: '@popup-hide', kind: vscode.CompletionItemKind.Property },
        
        { label: 'scrollTo', kind: vscode.CompletionItemKind.Property },
        { label: 'reset', kind: vscode.CompletionItemKind.Property },
        { label: 'refresh', kind: vscode.CompletionItemKind.Property },
        { label: 'resetValidation', kind: vscode.CompletionItemKind.Property },
        { label: 'validate', kind: vscode.CompletionItemKind.Property },
        { label: 'focus', kind: vscode.CompletionItemKind.Property },
        { label: 'blur', kind: vscode.CompletionItemKind.Property },
        { label: 'showPopup', kind: vscode.CompletionItemKind.Property },
        { label: 'hidePopup', kind: vscode.CompletionItemKind.Property },
        { label: 'removeAtIndex', kind: vscode.CompletionItemKind.Property },
        { label: 'add', kind: vscode.CompletionItemKind.Property },
        { label: 'toggleOption', kind: vscode.CompletionItemKind.Property },
        { label: 'getOptionIndex', kind: vscode.CompletionItemKind.Property },
        { label: 'setOptionIndex', kind: vscode.CompletionItemKind.Property },
        { label: 'moveOptionSelection', kind: vscode.CompletionItemKind.Property },
        { label: 'filter', kind: vscode.CompletionItemKind.Property },
        { label: 'updateMenuPosition', kind: vscode.CompletionItemKind.Property },
        { label: 'updateInputValue', kind: vscode.CompletionItemKind.Property },
        { label: 'isOptionSelected', kind: vscode.CompletionItemKind.Property },
        { label: 'getEmittingOptionValue', kind: vscode.CompletionItemKind.Property },
        { label: 'getOptionValue', kind: vscode.CompletionItemKind.Property },
        { label: 'getOptionLabel', kind: vscode.CompletionItemKind.Property },
        { label: 'isOptionDisabled', kind: vscode.CompletionItemKind.Property },
        
        { label: 'hasError', kind: vscode.CompletionItemKind.Property },
        
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'options', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
    ],
    'q-slider': [
        { label: 'snap', kind: vscode.CompletionItemKind.Property },
        { label: 'reverse', kind: vscode.CompletionItemKind.Property },
        { label: 'vertical', kind: vscode.CompletionItemKind.Property },
        { label: 'label-always', kind: vscode.CompletionItemKind.Property },
        
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'label-always', kind: vscode.CompletionItemKind.Property },
        { label: 'markers', kind: vscode.CompletionItemKind.Property },
        { label: 'marker-labels', kind: vscode.CompletionItemKind.Property },
        { label: 'label-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'min', kind: vscode.CompletionItemKind.Property },
        { label: 'max', kind: vscode.CompletionItemKind.Property },
        { label: 'inner-min', kind: vscode.CompletionItemKind.Property },
        { label: 'inner-max', kind: vscode.CompletionItemKind.Property },
        { label: 'step', kind: vscode.CompletionItemKind.Property },
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        { label: 'readonly', kind: vscode.CompletionItemKind.Property },
        
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'track-color', kind: vscode.CompletionItemKind.Property },
        { label: 'track-img', kind: vscode.CompletionItemKind.Property },
        { label: 'inner-track-color', kind: vscode.CompletionItemKind.Property },
        { label: 'inner-track-img', kind: vscode.CompletionItemKind.Property },
        { label: 'selection-color', kind: vscode.CompletionItemKind.Property },
        { label: 'selection-img', kind: vscode.CompletionItemKind.Property },
        { label: 'label-color', kind: vscode.CompletionItemKind.Property },
        { label: 'label-text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'switch-label-side', kind: vscode.CompletionItemKind.Property },
        { label: 'marker-labels-class', kind: vscode.CompletionItemKind.Property },
        { label: 'switch-marker-labels-side', kind: vscode.CompletionItemKind.Property },
        { label: 'track-size', kind: vscode.CompletionItemKind.Property },
        { label: 'thumb-size', kind: vscode.CompletionItemKind.Property },
        { label: 'thumb-color', kind: vscode.CompletionItemKind.Property },
        { label: 'thumb-path', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        
        { label: '@change', kind: vscode.CompletionItemKind.Property },
        { label: '@pan', kind: vscode.CompletionItemKind.Property },
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'min', kind: vscode.CompletionItemKind.Property },
        { label: 'max', kind: vscode.CompletionItemKind.Property },
    ],
    'q-range':[
        { label: 'snap', kind: vscode.CompletionItemKind.Property },
        { label: 'reverse', kind: vscode.CompletionItemKind.Property },
        { label: 'vertical', kind: vscode.CompletionItemKind.Property },
        { label: 'label-always', kind: vscode.CompletionItemKind.Property },
        
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'label-always', kind: vscode.CompletionItemKind.Property },
        { label: 'markers', kind: vscode.CompletionItemKind.Property },
        { label: 'marker-labels', kind: vscode.CompletionItemKind.Property },
        { label: 'label-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'min', kind: vscode.CompletionItemKind.Property },
        { label: 'max', kind: vscode.CompletionItemKind.Property },
        { label: 'inner-min', kind: vscode.CompletionItemKind.Property },
        { label: 'inner-max', kind: vscode.CompletionItemKind.Property },
        { label: 'step', kind: vscode.CompletionItemKind.Property },
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        { label: 'readonly', kind: vscode.CompletionItemKind.Property },
        
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'track-color', kind: vscode.CompletionItemKind.Property },
        { label: 'track-img', kind: vscode.CompletionItemKind.Property },
        { label: 'inner-track-color', kind: vscode.CompletionItemKind.Property },
        { label: 'inner-track-img', kind: vscode.CompletionItemKind.Property },
        { label: 'selection-color', kind: vscode.CompletionItemKind.Property },
        { label: 'selection-img', kind: vscode.CompletionItemKind.Property },
        { label: 'label-color', kind: vscode.CompletionItemKind.Property },
        { label: 'label-text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'switch-label-side', kind: vscode.CompletionItemKind.Property },
        { label: 'marker-labels-class', kind: vscode.CompletionItemKind.Property },
        { label: 'switch-marker-labels-side', kind: vscode.CompletionItemKind.Property },
        { label: 'track-size', kind: vscode.CompletionItemKind.Property },
        { label: 'thumb-size', kind: vscode.CompletionItemKind.Property },
        { label: 'thumb-color', kind: vscode.CompletionItemKind.Property },
        { label: 'thumb-path', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        
        { label: '@change', kind: vscode.CompletionItemKind.Property },
        { label: '@pan', kind: vscode.CompletionItemKind.Property },
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },

    ],
    'q-toggle': [
        { label: 'toggle-order', kind: vscode.CompletionItemKind.Property },
        { label: 'toggle-indeterminate', kind: vscode.CompletionItemKind.Property },
        { label: 'keep-color', kind: vscode.CompletionItemKind.Property },
        
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },

        { label: 'checked-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'unchecked-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'indeterminate-icon', kind: vscode.CompletionItemKind.Property },
        
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'left-label', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'val', kind: vscode.CompletionItemKind.Property },
        { label: 'true-value', kind: vscode.CompletionItemKind.Property },
        { label: 'false-value', kind: vscode.CompletionItemKind.Property },
        { label: 'indeterminate-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'icon-color', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'toggle', kind: vscode.CompletionItemKind.Property },
        
        { label: 'value', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-avatar': [
        { label: 'icon', kind: vscode.CompletionItemKind.Property },

        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'font-size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
    ],
    'q-badge': [
        { label: 'floating', kind: vscode.CompletionItemKind.Property },
        { label: 'multi-line', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'align', kind: vscode.CompletionItemKind.Property },
        
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'transparent', kind: vscode.CompletionItemKind.Property },
        { label: 'outline', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
    ],
    'q-card': [
        { label: 'tag', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'flat', kind: vscode.CompletionItemKind.Property },
        { label: 'bordered', kind: vscode.CompletionItemKind.Property },
    ],
    'q-carousel': [

        { label: 'fullscreen', kind:vscode.CompletionItemKind.Property},
        { label: 'no-route-fullscreen-exit', kind:vscode.CompletionItemKind.Property},
        { label: 'keep-alive', kind:vscode.CompletionItemKind.Property},
        { label: 'keep-alive-include', kind:vscode.CompletionItemKind.Property},
        { label: 'keep-alive-exclude', kind:vscode.CompletionItemKind.Property},
        { label: 'keep-alive-max', kind:vscode.CompletionItemKind.Property},
        { label: 'transition-prev', kind:vscode.CompletionItemKind.Property},
        { label: 'transition-next', kind:vscode.CompletionItemKind.Property},
        { label: 'animated', kind:vscode.CompletionItemKind.Property},
        { label: 'infinite', kind: vscode.CompletionItemKind.Property },
        { label: 'swipeable', kind:vscode.CompletionItemKind.Property},
        { label: 'vertical', kind: vscode.CompletionItemKind.Property },
        { label: 'autoplay', kind: vscode.CompletionItemKind.Property },
        { label: 'padding', kind:vscode.CompletionItemKind.Property},
        { label: 'arrows', kind:vscode.CompletionItemKind.Property},
        { label: 'prev-icon', kind:vscode.CompletionItemKind.Property},
        { label: 'next-icon', kind:vscode.CompletionItemKind.Property},
        { label: 'navigation', kind:vscode.CompletionItemKind.Property},
        { label: 'navigation-icon', kind:vscode.CompletionItemKind.Property},
        { label: 'navigation-active-icon', kind:vscode.CompletionItemKind.Property},
        { label: 'thumbnails', kind: vscode.CompletionItemKind.Property },

        { label: 'dark', kind:vscode.CompletionItemKind.Property},
        { label: 'height', kind:vscode.CompletionItemKind.Property},
        { label: 'control-color', kind:vscode.CompletionItemKind.Property},
        { label: 'control-text-color', kind:vscode.CompletionItemKind.Property},
        { label: 'control-type', kind:vscode.CompletionItemKind.Property},

        { label: 'transition-prev', kind:vscode.CompletionItemKind.Property},
        { label: 'transition-next', kind:vscode.CompletionItemKind.Property},
        { label: 'transition-duration', kind:vscode.CompletionItemKind.Property},

        { label: '@fullscreen', kind:vscode.CompletionItemKind.Property},
        { label: '@update:fullscreen', kind:vscode.CompletionItemKind.Property},
        { label: '@update:model-value', kind:vscode.CompletionItemKind.Property},
        { label: '@before-transition', kind:vscode.CompletionItemKind.Property},
        { label: '@transition', kind:vscode.CompletionItemKind.Property},

        { label: 'toggleFullscreen', kind:vscode.CompletionItemKind.Property},
        { label: 'setFullscreen', kind:vscode.CompletionItemKind.Property},
        { label: 'exitFullscreen', kind:vscode.CompletionItemKind.Property},
        { label: 'next', kind:vscode.CompletionItemKind.Property},
        { label: 'previous', kind:vscode.CompletionItemKind.Property},
        { label: 'goTo', kind:vscode.CompletionItemKind.Property},
    ],
    'q-carousel-slide': [
        { label: 'img-src', kind: vscode.CompletionItemKind.Property },
    ],
    // 'q-divider': [
    //     { label: 'vertical', kind: vscode.CompletionItemKind.Property },
    //     { label: 'inset', kind: vscode.CompletionItemKind.Property },
    // ],
    'q-expansion-item': [
        { label: 'toggle-aria-label', kind: vscode.CompletionItemKind.Property },
        
        { label: 'duration', kind: vscode.CompletionItemKind.Property },
        { label: 'default-opened', kind: vscode.CompletionItemKind.Property },
        { label: 'expand-icon-toggle', kind: vscode.CompletionItemKind.Property },
        { label: 'group', kind: vscode.CompletionItemKind.Property },
        { label: 'popup', kind: vscode.CompletionItemKind.Property },
        
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'expand-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'expanded-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'label-lines', kind: vscode.CompletionItemKind.Property },
        { label: 'caption', kind: vscode.CompletionItemKind.Property },
        { label: 'caption-lines', kind: vscode.CompletionItemKind.Property },
        { label: 'header-inset-level', kind: vscode.CompletionItemKind.Property },
        { label: 'content-inset-level', kind: vscode.CompletionItemKind.Property },
        { label: 'expand-separator', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-expand-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'switch-toggle-side', kind: vscode.CompletionItemKind.Property },
        { label: 'group', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },

        { label: 'to', kind: vscode.CompletionItemKind.Property },
        { label: 'exact', kind: vscode.CompletionItemKind.Property },
        { label: 'replace', kind: vscode.CompletionItemKind.Property },
        { label: 'active-class', kind: vscode.CompletionItemKind.Property },
        { label: 'exact-active-class', kind: vscode.CompletionItemKind.Property },
        { label: 'href', kind: vscode.CompletionItemKind.Property },
        { label: 'target', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'expand-icon-class', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'dense-toggle', kind: vscode.CompletionItemKind.Property },
        { label: 'header-style', kind: vscode.CompletionItemKind.Property },
        { label: 'header-class', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@show', kind: vscode.CompletionItemKind.Property },
        { label: '@before-show', kind: vscode.CompletionItemKind.Property },
        { label: '@hide', kind: vscode.CompletionItemKind.Property },
        { label: '@before-hide', kind: vscode.CompletionItemKind.Property },
        { label: '@after-show', kind: vscode.CompletionItemKind.Property },
        { label: '@after-hide', kind: vscode.CompletionItemKind.Property },
        
        { label: 'show', kind: vscode.CompletionItemKind.Property },
        { label: 'hide', kind: vscode.CompletionItemKind.Property },
        { label: 'toggle', kind: vscode.CompletionItemKind.Property },
    ],
    'q-chat-message':[
        { label: 'label-html', kind: vscode.CompletionItemKind.Property },
        { label: 'name-html', kind: vscode.CompletionItemKind.Property },
        { label: 'text-html', kind: vscode.CompletionItemKind.Property },
        { label: 'stamp-html', kind: vscode.CompletionItemKind.Property },
        
        { label: 'sent', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'avatar', kind: vscode.CompletionItemKind.Property },
        { label: 'text', kind: vscode.CompletionItemKind.Property },
        { label: 'stamp', kind: vscode.CompletionItemKind.Property },
        
        { label: 'bg-color', kind: vscode.CompletionItemKind.Property },
        { label: 'text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'size', kind: vscode.CompletionItemKind.Property },
    ],
    'q-icon': [
        { label: 'tag', kind: vscode.CompletionItemKind.Property },
        { label: 'left', kind: vscode.CompletionItemKind.Property },
        { label: 'right', kind: vscode.CompletionItemKind.Property },

        
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-img': [
        { label: 'loading', kind: vscode.CompletionItemKind.Property },
        { label: 'loading-show-delay', kind: vscode.CompletionItemKind.Property },
        { label: 'crossorigin', kind: vscode.CompletionItemKind.Property },
        { label: 'decoding', kind: vscode.CompletionItemKind.Property },
        { label: 'referrerpolicy', kind: vscode.CompletionItemKind.Property },
        { label: 'fetchpriority', kind: vscode.CompletionItemKind.Property },
        { label: 'no-spinner', kind: vscode.CompletionItemKind.Property },
        { label: 'no-native-menu', kind: vscode.CompletionItemKind.Property },
        { label: 'no-transition', kind: vscode.CompletionItemKind.Property },
        
        { label: 'alt', kind: vscode.CompletionItemKind.Property },
        { label: 'draggable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'src', kind: vscode.CompletionItemKind.Property },
        { label: 'srcset', kind: vscode.CompletionItemKind.Property },
        { label: 'sizes', kind: vscode.CompletionItemKind.Property },
        { label: 'placeholder-src', kind: vscode.CompletionItemKind.Property },
        { label: 'error-src', kind: vscode.CompletionItemKind.Property },
        
        { label: 'ratio', kind: vscode.CompletionItemKind.Property },
        { label: 'initial-ratio', kind: vscode.CompletionItemKind.Property },
        { label: 'width', kind: vscode.CompletionItemKind.Property },
        { label: 'height', kind: vscode.CompletionItemKind.Property },
        { label: 'fit', kind: vscode.CompletionItemKind.Property },
        { label: 'position', kind: vscode.CompletionItemKind.Property },
        { label: 'img-class', kind: vscode.CompletionItemKind.Property },
        { label: 'img-style', kind: vscode.CompletionItemKind.Property },
        { label: 'spinner-color', kind: vscode.CompletionItemKind.Property },
        { label: 'spinner-size', kind: vscode.CompletionItemKind.Property },
        
        { label: '@load', kind: vscode.CompletionItemKind.Property },
        { label: '@error', kind: vscode.CompletionItemKind.Property },
    ],
    'q-list': [
        { label: 'separator', kind: vscode.CompletionItemKind.Property },
        { label: 'padding', kind: vscode.CompletionItemKind.Property },
        { label: 'tag', kind: vscode.CompletionItemKind.Property },

        { label: 'bordered', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
    ],
    'q-item': [
        { label: 'inset-level', kind: vscode.CompletionItemKind.Property },
        { label: 'tag', kind: vscode.CompletionItemKind.Property },

        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },

        { label: 'to', kind: vscode.CompletionItemKind.Property },
        { label: 'exact', kind: vscode.CompletionItemKind.Property },
        { label: 'replace', kind: vscode.CompletionItemKind.Property },
        { label: 'active-class', kind: vscode.CompletionItemKind.Property },
        { label: 'exact-active-class', kind: vscode.CompletionItemKind.Property },
        { label: 'href', kind: vscode.CompletionItemKind.Property },
        { label: 'target', kind: vscode.CompletionItemKind.Property },

        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        { label: 'active', kind: vscode.CompletionItemKind.Property },
        { label: 'clickable', kind: vscode.CompletionItemKind.Property },
        { label: 'manual-focus', kind: vscode.CompletionItemKind.Property },
        { label: 'focused', kind: vscode.CompletionItemKind.Property },
        
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },

        { label: '@click', kind: vscode.CompletionItemKind.Property },
    ],
    'q-item-section': [
        { label: 'avatar', kind: vscode.CompletionItemKind.Property },
        { label: 'thumbnail', kind: vscode.CompletionItemKind.Property },
        { label: 'side', kind: vscode.CompletionItemKind.Property },
        { label: 'top', kind: vscode.CompletionItemKind.Property },
        { label: 'no-wrap', kind: vscode.CompletionItemKind.Property },
    ],
    'q-item-label': [
        { label: 'lines', kind: vscode.CompletionItemKind.Property },

        { label: 'overline', kind: vscode.CompletionItemKind.Property },
        { label: 'caption', kind: vscode.CompletionItemKind.Property },
        { label: 'header', kind: vscode.CompletionItemKind.Property },
        { label: 'lines', kind: vscode.CompletionItemKind.Property },
    ],
    'q-linear-progress': [
        { label: 'buffer', kind: vscode.CompletionItemKind.Property },
        { label: 'reverse', kind: vscode.CompletionItemKind.Property },
        { label: 'indeterminate', kind: vscode.CompletionItemKind.Property },
        { label: 'query', kind: vscode.CompletionItemKind.Property },
        { label: 'instant-feedback', kind: vscode.CompletionItemKind.Property },
        
        { label: 'stripe', kind: vscode.CompletionItemKind.Property },
        
        { label: 'value', kind: vscode.CompletionItemKind.Property },

        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'track-color', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'animation-speed', kind: vscode.CompletionItemKind.Property },
    ],
    // 'q-item-wrapper': [
    //     { label: 'dark', kind: vscode.CompletionItemKind.Property },
    //     { label: 'inset', kind: vscode.CompletionItemKind.Property },
    // ],
    'q-page-sticky': [
        { label: 'expand', kind: vscode.CompletionItemKind.Property },

        { label: 'position', kind: vscode.CompletionItemKind.Property },
        { label: 'offset', kind: vscode.CompletionItemKind.Property },
    ],
    'q-page-scroller':[
        { label: 'scroll-offset', kind: vscode.CompletionItemKind.Property },
        { label: 'reverse', kind: vscode.CompletionItemKind.Property },
        { label: 'duration', kind: vscode.CompletionItemKind.Property },
        
        { label: 'offset', kind: vscode.CompletionItemKind.Property },
        { label: 'expand', kind: vscode.CompletionItemKind.Property },
        
        { label: 'position', kind: vscode.CompletionItemKind.Property },
    ],
    'q-ajax-bar':[
        { label: 'reverse', kind: vscode.CompletionItemKind.Property },
        { label: 'skip-hijack', kind: vscode.CompletionItemKind.Property },
        { label: 'hijack-filter', kind: vscode.CompletionItemKind.Property },
        
        { label: 'position', kind: vscode.CompletionItemKind.Property },
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },

        { label: '@start', kind: vscode.CompletionItemKind.Property },
        { label: '@stop', kind: vscode.CompletionItemKind.Property },
        
        { label: 'start', kind: vscode.CompletionItemKind.Property },
        { label: 'increment', kind: vscode.CompletionItemKind.Property },
        { label: 'stop', kind: vscode.CompletionItemKind.Property },

    ],
    'q-parallax': [
        { label: 'speed', kind: vscode.CompletionItemKind.Property },
        { label: 'scroll-target', kind: vscode.CompletionItemKind.Property },
        
        { label: 'src', kind: vscode.CompletionItemKind.Property },
        
        { label: 'height', kind: vscode.CompletionItemKind.Property },

        { label: '@scroll', kind: vscode.CompletionItemKind.Property },
    ],
    'q-popup-edit': [
        { label: 'auto-save', kind: vscode.CompletionItemKind.Property },
        { label: 'touch-position', kind: vscode.CompletionItemKind.Property },
        { label: 'persistent', kind: vscode.CompletionItemKind.Property },
        { label: 'separate-close-popup', kind: vscode.CompletionItemKind.Property },
        
        { label: 'title', kind: vscode.CompletionItemKind.Property },
        { label: 'buttons', kind: vscode.CompletionItemKind.Property },
        { label: 'label-set', kind: vscode.CompletionItemKind.Property },
        { label: 'label-cancel', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'validate', kind: vscode.CompletionItemKind.Property },
        
        { label: 'fit', kind: vscode.CompletionItemKind.Property },
        { label: 'cover', kind: vscode.CompletionItemKind.Property },
        { label: 'anchor', kind: vscode.CompletionItemKind.Property },
        { label: 'self', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'offset', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'max-height', kind: vscode.CompletionItemKind.Property },
        { label: 'max-width', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@before-show', kind: vscode.CompletionItemKind.Property },
        { label: '@show', kind: vscode.CompletionItemKind.Property },
        { label: '@before-hide', kind: vscode.CompletionItemKind.Property },
        { label: '@hide', kind: vscode.CompletionItemKind.Property },
        { label: '@save', kind: vscode.CompletionItemKind.Property },
        { label: '@cancel', kind: vscode.CompletionItemKind.Property },
        
        { label: 'set', kind: vscode.CompletionItemKind.Property },
        { label: 'cancel', kind: vscode.CompletionItemKind.Property },
        { label: 'show', kind: vscode.CompletionItemKind.Property },
        { label: 'hide', kind: vscode.CompletionItemKind.Property },
        { label: 'updatePosition', kind: vscode.CompletionItemKind.Property },
    ],
    'q-space': [
        { label: 'grow', kind: vscode.CompletionItemKind.Property },
    ],
    'q-spinner': [
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'thickness', kind: vscode.CompletionItemKind.Property },
    ],
    'q-spinner-cube': [
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-tab-panels': [
        { label: 'keep-alive', kind: vscode.CompletionItemKind.Property },
        { label: 'keep-alive-include', kind: vscode.CompletionItemKind.Property },
        { label: 'keep-alive-exclude', kind: vscode.CompletionItemKind.Property },
        { label: 'keep-alive-max', kind: vscode.CompletionItemKind.Property },
        { label: 'animated', kind: vscode.CompletionItemKind.Property },
        { label: 'infinite', kind: vscode.CompletionItemKind.Property },
        { label: 'swipeable', kind: vscode.CompletionItemKind.Property },
        { label: 'vertical', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        
        { label: 'transition-prev', kind: vscode.CompletionItemKind.Property },
        { label: 'transition-next', kind: vscode.CompletionItemKind.Property },
        { label: 'transition-duration', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@before-transition', kind: vscode.CompletionItemKind.Property },
        { label: '@transition', kind: vscode.CompletionItemKind.Property },
        
        { label: 'next', kind: vscode.CompletionItemKind.Property },
        { label: 'previous', kind: vscode.CompletionItemKind.Property },
        { label: 'goTo', kind: vscode.CompletionItemKind.Property },
    ],
    'q-tab-panel': [

        { label: 'disable', kind: vscode.CompletionItemKind.Property },
    ],
    'q-tabs': [
        { label: 'breakpoint', kind: vscode.CompletionItemKind.Property },
        
        { label: 'vertical', kind: vscode.CompletionItemKind.Property },
        { label: 'outside-arrows', kind: vscode.CompletionItemKind.Property },
        { label: 'mobile-arrows', kind: vscode.CompletionItemKind.Property },
        { label: 'align', kind: vscode.CompletionItemKind.Property },
        { label: 'breakpoint', kind: vscode.CompletionItemKind.Property },
        { label: 'left-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'right-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'stretch', kind: vscode.CompletionItemKind.Property },
        { label: 'shrink', kind: vscode.CompletionItemKind.Property },
        { label: 'switch-indicator', kind: vscode.CompletionItemKind.Property },
        { label: 'narrow-indicator', kind: vscode.CompletionItemKind.Property },
        { label: 'inline-label', kind: vscode.CompletionItemKind.Property },
        { label: 'no-caps', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'active-color', kind: vscode.CompletionItemKind.Property },
        { label: 'active-bg-color', kind: vscode.CompletionItemKind.Property },
        { label: 'indicator-color', kind: vscode.CompletionItemKind.Property },
        { label: 'content-class', kind: vscode.CompletionItemKind.Property },
        { label: 'active-class', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
    ],
    'q-tab': [
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'alert', kind: vscode.CompletionItemKind.Property },
        { label: 'alert-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'no-caps', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'content-class', kind: vscode.CompletionItemKind.Property },
        { label: 'ripple', kind: vscode.CompletionItemKind.Property },
    ],
    'q-route-tab': [
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'alert', kind: vscode.CompletionItemKind.Property },
        { label: 'alert-icon', kind: vscode.CompletionItemKind.Property },
        { label: 'no-caps', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'to', kind: vscode.CompletionItemKind.Property },
        { label: 'exact', kind: vscode.CompletionItemKind.Property },
        { label: 'replace', kind: vscode.CompletionItemKind.Property },
        { label: 'active-class', kind: vscode.CompletionItemKind.Property },
        { label: 'exact-active-class', kind: vscode.CompletionItemKind.Property },
        { label: 'href', kind: vscode.CompletionItemKind.Property },
        { label: 'target', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'content-class', kind: vscode.CompletionItemKind.Property },
        { label: 'ripple', kind: vscode.CompletionItemKind.Property },

        { label: '@click', kind: vscode.CompletionItemKind.Property },
    ],
    'q-tree': [
        { label: 'tick-strategy', kind: vscode.CompletionItemKind.Property },
        { label: 'no-selection-unset', kind: vscode.CompletionItemKind.Property },
        { label: 'default-expand-all', kind: vscode.CompletionItemKind.Property },
        { label: 'accordion', kind: vscode.CompletionItemKind.Property },
        { label: 'no-transition', kind: vscode.CompletionItemKind.Property },
        
        { label: 'nodes', kind: vscode.CompletionItemKind.Property },
        { label: 'node-key', kind: vscode.CompletionItemKind.Property },
        { label: 'label-key', kind: vscode.CompletionItemKind.Property },
        { label: 'children-key', kind: vscode.CompletionItemKind.Property },
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'no-nodes-label', kind: vscode.CompletionItemKind.Property },
        { label: 'no-results-label', kind: vscode.CompletionItemKind.Property },
        
        { label: 'filter', kind: vscode.CompletionItemKind.Property },
        { label: 'filter-method', kind: vscode.CompletionItemKind.Property },
        
        { label: 'ticked', kind: vscode.CompletionItemKind.Property },
        { label: 'expanded', kind: vscode.CompletionItemKind.Property },
        { label: 'selected', kind: vscode.CompletionItemKind.Property },
        
        { label: 'no-connectors', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'control-color', kind: vscode.CompletionItemKind.Property },
        { label: 'text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'selected-color', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'duration', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:expanded', kind: vscode.CompletionItemKind.Property },
        { label: '@lazy-load', kind: vscode.CompletionItemKind.Property },
        { label: '@update:ticked', kind: vscode.CompletionItemKind.Property },
        { label: '@update:selected', kind: vscode.CompletionItemKind.Property },
        { label: '@after-show', kind: vscode.CompletionItemKind.Property },
        { label: '@after-hide', kind: vscode.CompletionItemKind.Property },
        
        { label: 'getNodeByKey', kind: vscode.CompletionItemKind.Property },
        { label: 'getTickedNodes', kind: vscode.CompletionItemKind.Property },
        { label: 'getExpandedNodes', kind: vscode.CompletionItemKind.Property },
        { label: 'isExpanded', kind: vscode.CompletionItemKind.Property },
        { label: 'expandAll', kind: vscode.CompletionItemKind.Property },
        { label: 'collapseAll', kind: vscode.CompletionItemKind.Property },
        { label: 'setExpanded', kind: vscode.CompletionItemKind.Property },
        { label: 'isTicked', kind: vscode.CompletionItemKind.Property },
        { label: 'setTicked', kind: vscode.CompletionItemKind.Property },
    ],
    'q-separator': [
        { label: 'spaced', kind: vscode.CompletionItemKind.Property },
        { label: 'inset', kind: vscode.CompletionItemKind.Property },
        { label: 'vertical', kind: vscode.CompletionItemKind.Property },

        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-menu': [
        { label: 'target', kind: vscode.CompletionItemKind.Property },
        { label: 'no-parent-event', kind: vscode.CompletionItemKind.Property },
        { label: 'context-menu', kind: vscode.CompletionItemKind.Property },
        { label: 'scroll-target', kind: vscode.CompletionItemKind.Property },
        { label: 'touch-position', kind: vscode.CompletionItemKind.Property },
        { label: 'persistent', kind: vscode.CompletionItemKind.Property },
        { label: 'no-route-dismiss', kind: vscode.CompletionItemKind.Property },
        { label: 'auto-close', kind: vscode.CompletionItemKind.Property },
        { label: 'separate-close-popup', kind: vscode.CompletionItemKind.Property },
        { label: 'no-refocus', kind: vscode.CompletionItemKind.Property },
        { label: 'no-focus', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'fit', kind: vscode.CompletionItemKind.Property },
        { label: 'cover', kind: vscode.CompletionItemKind.Property },
        { label: 'anchor', kind: vscode.CompletionItemKind.Property },
        { label: 'self', kind: vscode.CompletionItemKind.Property },
        { label: 'offset', kind: vscode.CompletionItemKind.Property },
        
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'max-height', kind: vscode.CompletionItemKind.Property },
        { label: 'max-width', kind: vscode.CompletionItemKind.Property },
        
        { label: 'transition-show', kind: vscode.CompletionItemKind.Property },
        { label: 'transition-hide', kind: vscode.CompletionItemKind.Property },
        { label: 'transition-duration', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@show', kind: vscode.CompletionItemKind.Property },
        { label: '@before-show', kind: vscode.CompletionItemKind.Property },
        { label: '@hide', kind: vscode.CompletionItemKind.Property },
        { label: '@before-hide', kind: vscode.CompletionItemKind.Property },
        { label: '@escape-key', kind: vscode.CompletionItemKind.Property },
        
        { label: 'show', kind: vscode.CompletionItemKind.Property },
        { label: 'hide', kind: vscode.CompletionItemKind.Property },
        { label: 'toggle', kind: vscode.CompletionItemKind.Property },
        { label: 'updatePosition', kind: vscode.CompletionItemKind.Property },
        { label: 'focus', kind: vscode.CompletionItemKind.Property },
        
        { label: 'contentEl', kind: vscode.CompletionItemKind.Property },
        
    ],
    // 'q-context-menu': [
        //     { label: 'trigger', kind: vscode.CompletionItemKind.Property },
        // ],
    'q-dialog': [
        { label: 'persistent', kind: vscode.CompletionItemKind.Property },
        { label: 'no-esc-dismiss', kind: vscode.CompletionItemKind.Property },
        { label: 'no-backdrop-dismiss', kind: vscode.CompletionItemKind.Property },
        { label: 'no-route-dismiss', kind: vscode.CompletionItemKind.Property },
        { label: 'auto-close', kind: vscode.CompletionItemKind.Property },
        { label: 'no-refocus', kind: vscode.CompletionItemKind.Property },
        { label: 'no-focus', kind: vscode.CompletionItemKind.Property },
        { label: 'no-shake', kind: vscode.CompletionItemKind.Property },
        { label: 'allow-focus-outside', kind: vscode.CompletionItemKind.Property },
        
        { label: 'seamless', kind: vscode.CompletionItemKind.Property },
        { label: 'maximized', kind: vscode.CompletionItemKind.Property },
        { label: 'full-width', kind: vscode.CompletionItemKind.Property },
        { label: 'full-height', kind: vscode.CompletionItemKind.Property },
        { label: 'position', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'backdrop-filter', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        
        { label: 'transition-show', kind: vscode.CompletionItemKind.Property },
        { label: 'transition-hide', kind: vscode.CompletionItemKind.Property },
        { label: 'transition-duration', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@show', kind: vscode.CompletionItemKind.Property },
        { label: '@before-show', kind: vscode.CompletionItemKind.Property },
        { label: '@hide', kind: vscode.CompletionItemKind.Property },
        { label: '@before-hide', kind: vscode.CompletionItemKind.Property },
        { label: '@shake', kind: vscode.CompletionItemKind.Property },
        { label: '@escape-key', kind: vscode.CompletionItemKind.Property },
        
        { label: 'show', kind: vscode.CompletionItemKind.Property },
        { label: 'hide', kind: vscode.CompletionItemKind.Property },
        { label: 'toggle', kind: vscode.CompletionItemKind.Property },
        { label: 'focus', kind: vscode.CompletionItemKind.Property },
        { label: 'shake', kind: vscode.CompletionItemKind.Property },
        
        { label: 'contentEl', kind: vscode.CompletionItemKind.Property },
    ],
    'q-popup-proxy': [
        { label: 'target', kind: vscode.CompletionItemKind.Property },
        { label: 'no-parent-event', kind: vscode.CompletionItemKind.Property },
        { label: 'context-menu', kind: vscode.CompletionItemKind.Property },
        { label: 'breakpoint', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@before-show', kind: vscode.CompletionItemKind.Property },
        { label: '@show', kind: vscode.CompletionItemKind.Property },
        { label: '@before-hide', kind: vscode.CompletionItemKind.Property },
        { label: '@hide', kind: vscode.CompletionItemKind.Property },
        
        { label: 'show', kind: vscode.CompletionItemKind.Property },
        { label: 'hide', kind: vscode.CompletionItemKind.Property },
        { label: 'toggle', kind: vscode.CompletionItemKind.Property },
        
        { label: 'currentComponent', kind: vscode.CompletionItemKind.Property },
    ],
    'q-breadcrumbs': [
        { label: 'separator', kind: vscode.CompletionItemKind.Property },
        { label: 'gutter', kind: vscode.CompletionItemKind.Property },
        { label: 'align', kind: vscode.CompletionItemKind.Property },

        { label: 'active-color', kind: vscode.CompletionItemKind.Property },
        { label: 'separator-color', kind: vscode.CompletionItemKind.Property },
    ],
    'q-breadcrumbs-el': [
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'tag', kind: vscode.CompletionItemKind.Property },

        { label: 'to', kind: vscode.CompletionItemKind.Property },
        { label: 'exact', kind: vscode.CompletionItemKind.Property },
        { label: 'replace', kind: vscode.CompletionItemKind.Property },
        { label: 'active-class', kind: vscode.CompletionItemKind.Property },
        { label: 'exact-active-class', kind: vscode.CompletionItemKind.Property },
        { label: 'href', kind: vscode.CompletionItemKind.Property },
        { label: 'target', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: '@click', kind: vscode.CompletionItemKind.Property },
    ],
    'q-editor':[
        { label: 'fullscreen', kind: vscode.CompletionItemKind.Property },
        { label: 'no-route-fullscreen-exit', kind: vscode.CompletionItemKind.Property },
        { label: 'paragraph-tag', kind: vscode.CompletionItemKind.Property },
        
        { label: 'placeholder', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'readonly', kind: vscode.CompletionItemKind.Property },
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'flat', kind: vscode.CompletionItemKind.Property },
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'min-height', kind: vscode.CompletionItemKind.Property },
        { label: 'max-height', kind: vscode.CompletionItemKind.Property },
        { label: 'height', kind: vscode.CompletionItemKind.Property },
        { label: 'toolbar-outline', kind: vscode.CompletionItemKind.Property },
        { label: 'toolbar-push', kind: vscode.CompletionItemKind.Property },
        { label: 'toolbar-rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'content-style', kind: vscode.CompletionItemKind.Property },
        { label: 'content-class', kind: vscode.CompletionItemKind.Property },
        
        { label: 'definitions', kind: vscode.CompletionItemKind.Property },
        { label: 'fonts', kind: vscode.CompletionItemKind.Property },
        { label: 'toolbar', kind: vscode.CompletionItemKind.Property },
        { label: 'toolbar-color', kind: vscode.CompletionItemKind.Property },
        { label: 'toolbar-text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'toolbar-toggle-color', kind: vscode.CompletionItemKind.Property },
        { label: 'toolbar-bg', kind: vscode.CompletionItemKind.Property },
        { label: 'toolbar-outline', kind: vscode.CompletionItemKind.Property },
        { label: 'toolbar-push', kind: vscode.CompletionItemKind.Property },
        { label: 'toolbar-rounded', kind: vscode.CompletionItemKind.Property },
        
        { label: '@fullscreen', kind: vscode.CompletionItemKind.Property },
        { label: '@update:fullscreen', kind: vscode.CompletionItemKind.Property },
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@dropdown-show', kind: vscode.CompletionItemKind.Property },
        { label: '@dropdown-before-show', kind: vscode.CompletionItemKind.Property },
        { label: '@dropdown-hide', kind: vscode.CompletionItemKind.Property },
        { label: '@dropdown-before-hide', kind: vscode.CompletionItemKind.Property },
        { label: '@link-show', kind: vscode.CompletionItemKind.Property },
        { label: '@link-hide', kind: vscode.CompletionItemKind.Property },
        
        { label: 'toggleFullscreen', kind: vscode.CompletionItemKind.Property },
        { label: 'setFullscreen', kind: vscode.CompletionItemKind.Property },
        { label: 'exitFullscreen', kind: vscode.CompletionItemKind.Property },
        { label: 'runCmd', kind: vscode.CompletionItemKind.Property },
        { label: 'refreshToolbar', kind: vscode.CompletionItemKind.Property },
        { label: 'focus', kind: vscode.CompletionItemKind.Property },
        { label: 'getContentEl', kind: vscode.CompletionItemKind.Property },
        
        { label: 'caret', kind: vscode.CompletionItemKind.Property },
    ],
    'q-fab':[
        { label: 'external-label', kind: vscode.CompletionItemKind.Property },
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'label-position', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-label', kind: vscode.CompletionItemKind.Property },
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'anchor', kind: vscode.CompletionItemKind.Property },
        
        { label: 'type', kind: vscode.CompletionItemKind.Property },
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'to', kind: vscode.CompletionItemKind.Property },
        { label: 'replace', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'outline', kind: vscode.CompletionItemKind.Property },
        { label: 'push', kind: vscode.CompletionItemKind.Property },
        { label: 'flat', kind: vscode.CompletionItemKind.Property },
        { label: 'unelevated', kind: vscode.CompletionItemKind.Property },
        { label: 'padding', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'glossy', kind: vscode.CompletionItemKind.Property },
        { label: 'external-label', kind: vscode.CompletionItemKind.Property },
        { label: 'label-position', kind: vscode.CompletionItemKind.Property },
        { label: 'hide-label', kind: vscode.CompletionItemKind.Property },
        { label: 'label-class', kind: vscode.CompletionItemKind.Property },
        { label: 'label-style', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'anchor', kind: vscode.CompletionItemKind.Property },
        
        { label: '@click', kind: vscode.CompletionItemKind.Property },
        
        { label: 'click', kind: vscode.CompletionItemKind.Property },
    ],
    'q-time':[
        { label: 'landscape', kind: vscode.CompletionItemKind.Property },
        { label: 'format24h', kind: vscode.CompletionItemKind.Property },
        { label: 'options', kind: vscode.CompletionItemKind.Property },
        { label: 'hour-options', kind: vscode.CompletionItemKind.Property },
        { label: 'minute-options', kind: vscode.CompletionItemKind.Property },
        { label: 'second-options', kind: vscode.CompletionItemKind.Property },
        { label: 'with-seconds', kind: vscode.CompletionItemKind.Property },
        
        { label: 'now-btn', kind: vscode.CompletionItemKind.Property },
        
        { label: 'mask', kind: vscode.CompletionItemKind.Property },
        { label: 'locale', kind: vscode.CompletionItemKind.Property },
        { label: 'calendar', kind: vscode.CompletionItemKind.Property },
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'default-date', kind: vscode.CompletionItemKind.Property },
        { label: 'with-seconds', kind: vscode.CompletionItemKind.Property },
        
        { label: 'readonly', kind: vscode.CompletionItemKind.Property },
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'flat', kind: vscode.CompletionItemKind.Property },
        { label: 'bordered', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'setNow', kind: vscode.CompletionItemKind.Property },
    ],
    'q-date':[
        { label: 'landscape', kind: vscode.CompletionItemKind.Property },
        { label: 'years-in-month-view', kind: vscode.CompletionItemKind.Property },

        { label: 'title', kind: vscode.CompletionItemKind.Property },
        { label: 'subtitle', kind: vscode.CompletionItemKind.Property },
        { label: 'today-btn', kind: vscode.CompletionItemKind.Property },
        { label: 'minimal', kind: vscode.CompletionItemKind.Property },
        
        { label: 'mask', kind: vscode.CompletionItemKind.Property },
        { label: 'locale', kind: vscode.CompletionItemKind.Property },
        { label: 'calendar', kind: vscode.CompletionItemKind.Property },
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'default-year-month', kind: vscode.CompletionItemKind.Property },
        { label: 'default-view', kind: vscode.CompletionItemKind.Property },
        { label: 'events', kind: vscode.CompletionItemKind.Property },
        { label: 'options', kind: vscode.CompletionItemKind.Property },
        { label: 'first-day-of-week', kind: vscode.CompletionItemKind.Property },
        { label: 'multiple', kind: vscode.CompletionItemKind.Property },
        { label: 'range', kind: vscode.CompletionItemKind.Property },
        { label: 'emit-immediately', kind: vscode.CompletionItemKind.Property },
        
        { label: 'navigation-min-year-month', kind: vscode.CompletionItemKind.Property },
        { label: 'navigation-max-year-month', kind: vscode.CompletionItemKind.Property },
        { label: 'no-unset', kind: vscode.CompletionItemKind.Property },
        { label: 'multiple', kind: vscode.CompletionItemKind.Property },
        { label: 'range', kind: vscode.CompletionItemKind.Property },
        
        { label: 'readonly', kind: vscode.CompletionItemKind.Property },
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
        { label: 'flat', kind: vscode.CompletionItemKind.Property },
        { label: 'bordered', kind: vscode.CompletionItemKind.Property },
        { label: 'event-color', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@navigation', kind: vscode.CompletionItemKind.Property },
        { label: '@range-start', kind: vscode.CompletionItemKind.Property },
        { label: '@range-end', kind: vscode.CompletionItemKind.Property },
        
        { label: 'setToday', kind: vscode.CompletionItemKind.Property },
        { label: 'setView', kind: vscode.CompletionItemKind.Property },
        { label: 'offsetCalendar', kind: vscode.CompletionItemKind.Property },
        { label: 'setCalendarTo', kind: vscode.CompletionItemKind.Property },
        { label: 'setEditingRange', kind: vscode.CompletionItemKind.Property },
    ],
    'q-infinite-scroll':[
        { label: 'offset', kind: vscode.CompletionItemKind.Property },
        { label: 'debounce', kind: vscode.CompletionItemKind.Property },
        { label: 'initial-index', kind: vscode.CompletionItemKind.Property },
        { label: 'scroll-target', kind: vscode.CompletionItemKind.Property },
        { label: 'reverse', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: '@load', kind: vscode.CompletionItemKind.Property },
        
        { label: 'poll', kind: vscode.CompletionItemKind.Property },
        { label: 'trigger', kind: vscode.CompletionItemKind.Property },
        { label: 'reset', kind: vscode.CompletionItemKind.Property },
        { label: 'stop', kind: vscode.CompletionItemKind.Property },
        { label: 'resume', kind: vscode.CompletionItemKind.Property },
        { label: 'setIndex', kind: vscode.CompletionItemKind.Property },
        { label: 'updateScrollTarget', kind: vscode.CompletionItemKind.Property },
    ],
    'q-inner-loading':[
        { label: 'label', kind: vscode.CompletionItemKind.Property },
        { label: 'label-class', kind: vscode.CompletionItemKind.Property },
        { label: 'label-style', kind: vscode.CompletionItemKind.Property },
        
        { label: 'showing', kind: vscode.CompletionItemKind.Property },
        
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        
        { label: 'transition-show', kind: vscode.CompletionItemKind.Property },
        { label: 'transition-hide', kind: vscode.CompletionItemKind.Property },
        { label: 'transition-duration', kind: vscode.CompletionItemKind.Property },
    ],
    'q-intersection':[
        { label: 'once', kind: vscode.CompletionItemKind.Property },
        { label: 'ssr-prerender', kind: vscode.CompletionItemKind.Property },
        { label: 'root', kind: vscode.CompletionItemKind.Property },
        { label: 'margin', kind: vscode.CompletionItemKind.Property },
        { label: 'threshold', kind: vscode.CompletionItemKind.Property },
        { label: 'transition', kind: vscode.CompletionItemKind.Property },
        { label: 'transition-duration', kind: vscode.CompletionItemKind.Property },
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tag', kind: vscode.CompletionItemKind.Property },
        
        { label: '@visibility', kind: vscode.CompletionItemKind.Property },
    ],
    'q-knob':[
        { label: 'reverse', kind: vscode.CompletionItemKind.Property },
        { label: 'instant-feedback', kind: vscode.CompletionItemKind.Property },
        { label: 'show-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'angle', kind: vscode.CompletionItemKind.Property },
        { label: 'show-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'min', kind: vscode.CompletionItemKind.Property },
        { label: 'max', kind: vscode.CompletionItemKind.Property },
        { label: 'inner-min', kind: vscode.CompletionItemKind.Property },
        { label: 'inner-max', kind: vscode.CompletionItemKind.Property },
        { label: 'step', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        { label: 'readonly', kind: vscode.CompletionItemKind.Property },
        
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'center-color', kind: vscode.CompletionItemKind.Property },
        { label: 'track-color', kind: vscode.CompletionItemKind.Property },
        { label: 'font-size', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        { label: '@change', kind: vscode.CompletionItemKind.Property },
        { label: '@drag-value', kind: vscode.CompletionItemKind.Property },
    ],
    'q-markup-table':[
        { label: 'separator', kind: vscode.CompletionItemKind.Property },
        { label: 'wrap-cells', kind: vscode.CompletionItemKind.Property },
        
        { label: 'dense', kind: vscode.CompletionItemKind.Property },
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'flat', kind: vscode.CompletionItemKind.Property },
        { label: 'bordered', kind: vscode.CompletionItemKind.Property },
        { label: 'square', kind: vscode.CompletionItemKind.Property },
    ],
    'q-no-ssr':[
        { label: 'tag', kind: vscode.CompletionItemKind.Property },
        { label: 'placeholder', kind: vscode.CompletionItemKind.Property },
    ],
    'q-resize-observer':[
        { label: 'debounce', kind: vscode.CompletionItemKind.Property },
        { label: '@resize', kind: vscode.CompletionItemKind.Property },
        { label: 'trigger', kind: vscode.CompletionItemKind.Property },
    ],
    'q-scroll-observer':[
        { label: 'debounce', kind: vscode.CompletionItemKind.Property },
        { label: 'axis', kind: vscode.CompletionItemKind.Property },
        { label: 'scroll-target', kind: vscode.CompletionItemKind.Property },

        { label: '@scroll', kind: vscode.CompletionItemKind.Property },
        
        { label: 'trigger', kind: vscode.CompletionItemKind.Property },
        { label: 'getPosition', kind: vscode.CompletionItemKind.Property },
    ],
    'q-pagination':[
        { label: 'input', kind: vscode.CompletionItemKind.Property },
        { label: 'icon-prev', kind: vscode.CompletionItemKind.Property },
        { label: 'icon-next', kind: vscode.CompletionItemKind.Property },
        { label: 'icon-first', kind: vscode.CompletionItemKind.Property },
        { label: 'icon-last', kind: vscode.CompletionItemKind.Property },
        { label: 'to-fn', kind: vscode.CompletionItemKind.Property },
        { label: 'boundary-links', kind: vscode.CompletionItemKind.Property },
        { label: 'boundary-numbers', kind: vscode.CompletionItemKind.Property },
        { label: 'direction-links', kind: vscode.CompletionItemKind.Property },
        { label: 'ellipses', kind: vscode.CompletionItemKind.Property },
        { label: 'max-pages', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'min', kind: vscode.CompletionItemKind.Property },
        { label: 'max', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'flat', kind: vscode.CompletionItemKind.Property },
        { label: 'outline', kind: vscode.CompletionItemKind.Property },
        { label: 'unelevated', kind: vscode.CompletionItemKind.Property },
        { label: 'push', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'active-design', kind: vscode.CompletionItemKind.Property },
        { label: 'active-color', kind: vscode.CompletionItemKind.Property },
        { label: 'active-text-color', kind: vscode.CompletionItemKind.Property },
        { label: 'round', kind: vscode.CompletionItemKind.Property },
        { label: 'rounded', kind: vscode.CompletionItemKind.Property },
        { label: 'glossy', kind: vscode.CompletionItemKind.Property },
        { label: 'gutter', kind: vscode.CompletionItemKind.Property },
        { label: 'padding', kind: vscode.CompletionItemKind.Property },
        { label: 'input-style', kind: vscode.CompletionItemKind.Property },
        { label: 'input-class', kind: vscode.CompletionItemKind.Property },
        { label: 'ripple', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
        
        { label: 'set', kind: vscode.CompletionItemKind.Property },
        { label: 'setByOffset', kind: vscode.CompletionItemKind.Property },
    ],
    'q-pull-to-refresh':[
        { label: 'no-mouse', kind: vscode.CompletionItemKind.Property },
        { label: 'scroll-target', kind: vscode.CompletionItemKind.Property },
        
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'bg-color', kind: vscode.CompletionItemKind.Property },
        
        { label: '@refresh', kind: vscode.CompletionItemKind.Property },
        
        { label: 'trigger', kind: vscode.CompletionItemKind.Property },
        { label: 'updateScrollTarget', kind: vscode.CompletionItemKind.Property },
    ],
    'q-rating':[
        { label: 'icon-aria-label', kind: vscode.CompletionItemKind.Property },
        
        
        { label: 'icon', kind: vscode.CompletionItemKind.Property },
        { label: 'icon-selected', kind: vscode.CompletionItemKind.Property },
        { label: 'icon-half', kind: vscode.CompletionItemKind.Property },
        
        { label: 'max', kind: vscode.CompletionItemKind.Property },
        
        { label: 'model-value', kind: vscode.CompletionItemKind.Property },
        { label: 'no-reset', kind: vscode.CompletionItemKind.Property },
        
        { label: 'readonly', kind: vscode.CompletionItemKind.Property },
        { label: 'disable', kind: vscode.CompletionItemKind.Property },
        
        { label: 'size', kind: vscode.CompletionItemKind.Property },
        { label: 'color', kind: vscode.CompletionItemKind.Property },
        { label: 'color-selected', kind: vscode.CompletionItemKind.Property },
        { label: 'color-half', kind: vscode.CompletionItemKind.Property },
        { label: 'no-dimming', kind: vscode.CompletionItemKind.Property },
        
        { label: '@update:model-value', kind: vscode.CompletionItemKind.Property },
    ],
    'q-responsive':[
        { label: 'ratio', kind: vscode.CompletionItemKind.Property },
    ],
    'q-scroll-area':[
        { label: 'visible', kind: vscode.CompletionItemKind.Property },
        { label: 'delay', kind: vscode.CompletionItemKind.Property },
        
        { label: 'tabindex', kind: vscode.CompletionItemKind.Property },
        
        { label: 'dark', kind: vscode.CompletionItemKind.Property },
        { label: 'bar-style', kind: vscode.CompletionItemKind.Property },
        { label: 'vertical-bar-style', kind: vscode.CompletionItemKind.Property },
        { label: 'horizontal-bar-style', kind: vscode.CompletionItemKind.Property },
        { label: 'thumb-style', kind: vscode.CompletionItemKind.Property },
        { label: 'vertical-thumb-style', kind: vscode.CompletionItemKind.Property },
        { label: 'horizontal-thumb-style', kind: vscode.CompletionItemKind.Property },
        { label: 'content-style', kind: vscode.CompletionItemKind.Property },
        { label: 'content-active-style', kind: vscode.CompletionItemKind.Property },
        
        { label: '@scroll', kind: vscode.CompletionItemKind.Property },
        
        { label: 'getScrollTarget', kind: vscode.CompletionItemKind.Property },
        { label: 'getScroll', kind: vscode.CompletionItemKind.Property },
        { label: 'getScrollPosition', kind: vscode.CompletionItemKind.Property },
        { label: 'getScrollPercentage', kind: vscode.CompletionItemKind.Property },
        { label: 'setScrollPosition', kind: vscode.CompletionItemKind.Property },
        { label: 'setScrollPercentage', kind: vscode.CompletionItemKind.Property },
    ],
    
};

// 공통 속성 정의
const commonProps = [
    { label: ':', kind: vscode.CompletionItemKind.Property },
    { label: 'class', kind: vscode.CompletionItemKind.Property },
    { label: 'style', kind: vscode.CompletionItemKind.Property },
    { label: 'name', kind: vscode.CompletionItemKind.Property },
    { label: 'key', kind: vscode.CompletionItemKind.Property },
    { label: 'ref', kind: vscode.CompletionItemKind.Property },
    { label: 'v-model', kind: vscode.CompletionItemKind.Property },
    { label: 'v-if', kind: vscode.CompletionItemKind.Property },
    { label: 'v-show', kind: vscode.CompletionItemKind.Property },
    { label: '@click', kind: vscode.CompletionItemKind.Property },
    { label: '@click.prevent', kind: vscode.CompletionItemKind.Property },
    { label: '@click.prevent', kind: vscode.CompletionItemKind.Property },
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

    // 중복을 제거할 함수 정의
    function removeDuplicates(obj: QuasarProps): QuasarProps {
        const result: QuasarProps = {};
        
        for (let key in obj) {
            const uniqueItems = obj[key].filter((item, index, self) =>
                index === self.findIndex(t => (
                    t.label === item.label && JSON.stringify(t.kind) === JSON.stringify(item.kind)
                ))
            );
            result[key] = uniqueItems;
        }
        
        return result;
    }

    // 중복 제거 적용
    // const uniqueQuasarProps = removeDuplicates(quasarProps);

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