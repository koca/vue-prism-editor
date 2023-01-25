import Vue from 'vue';
import './styles.css';
export interface EditorProps {
    lineNumbers: boolean;
    autoStyleLineNumbers: boolean;
    readonly: boolean;
    value: string;
    highlight: () => string;
    tabSize: number;
    insertSpaces: boolean;
    ignoreTabKey: boolean;
    placeholder: string;
}
export interface Record {
    value: string;
    selectionStart: number;
    selectionEnd: number;
}
export interface History {
    stack: Array<Record & {
        timestamp: number;
    }>;
    offset: number;
}
interface AutocompleteEntry {
    text: string;
    overlap: number;
    label?: string;
}
export declare const PrismEditor: import("vue/types/vue").ExtendedVue<Vue, {
    capture: boolean;
    history: History;
    lineNumbersHeight: string;
    codeData: string;
    autocompleteOpen: boolean;
    autocompleteIndex: number;
    autocompleteData: AutocompleteEntry[];
}, {
    updateAutocompleteData(): void;
    acceptAutocomplete(event: Event, option?: number | undefined): void;
    setLineNumbersHeight(): void;
    styleLineNumbers(): void;
    _recordCurrentState(): void;
    _getLines(text: string, position: number): Array<string>;
    _recordStateIfChange(): void;
    _applyEdits(record: Record): void;
    _recordChange(record: Record, overwrite?: boolean): void;
    _updateInput(record: Record): void;
    handleChange(e: KeyboardEvent): void;
    _undoEdit(): void;
    _redoEdit(): void;
    handleKeyDown(e: KeyboardEvent): void;
}, {
    isEmpty: boolean;
    content: string;
    lineNumbersCount: number;
    cursorOffset: number[];
}, {
    lineNumbers: boolean;
    autoStyleLineNumbers: boolean;
    readonly: boolean;
    value: string;
    highlight: Function;
    tabSize: number;
    insertSpaces: boolean;
    ignoreTabKey: boolean;
    placeholder: string;
    autocomplete: Function;
}>;
export {};
