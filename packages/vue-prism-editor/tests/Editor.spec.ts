import '@testing-library/jest-dom/extend-expect';
import { render as VTLRender, screen, fireEvent } from '@testing-library/vue';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';

import { PrismEditor } from '../src/index';

const render = (component: any, ...rest: any) => {
  const utils = VTLRender(component, ...rest);
  return {
    ...utils,
    asFragment: (innerHTML = utils.container.innerHTML) => {
      if (typeof document.createRange === 'function') {
        return document.createRange().createContextualFragment(innerHTML);
      }

      const template = document.createElement('template');
      template.innerHTML = innerHTML;
      return template.content;
    },
  };
};

// custom higlighter
const highlighter = (code: any) => {
  return `<span class="customHighlighter">${code}</span>`;
};

const renderComponent = ({ inlineAttrs = '', methods, ...props }: any = {}) => {
  const base = {
    components: { Editor: PrismEditor },
    methods: {
      highlight: highlighter,
      ...methods,
    },
    template: `<Editor :highlight="highlight" ${inlineAttrs}></Editor>`,
    ...props,
  };
  return render(base);
};

describe('Editor', () => {
  test('renders with custom higlighter', async () => {
    const code = 'initialCode';
    const inlineAttrs = "v-model='code'";
    const { asFragment } = renderComponent({
      inlineAttrs,
      data: () => ({ code }),
    });

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders with no code', async () => {
    const code = null;
    const inlineAttrs = "v-model='code'";
    renderComponent({ inlineAttrs, data: () => ({ code }) });
    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;
    const preview = screen.getByTestId('preview');

    expect(textarea).toHaveValue('');
    expect(preview.innerHTML).toMatchInlineSnapshot(`<span class="customHighlighter"></span><br>`);
  });

  test('prism higlight works', async () => {
    const prismHiglight = (code: any) => {
      return highlight(
        code,
        {
          ...languages['markup'],
          ...languages['js'],
          ...languages['css'],
        },
        'markup'
      );
    };
    const code = `<template><div>hey</div></template>`.trim();
    const inlineAttrs = "v-model='code'";
    const { asFragment } = renderComponent({
      inlineAttrs,
      methods: { highlight: prismHiglight },
      data: () => ({ code }),
    });

    expect(asFragment()).toMatchSnapshot();
  });

  test('readonly', () => {
    const code = 'initialCode';
    const inlineAttrs = `v-model="code" :readonly="true"`;
    renderComponent({ inlineAttrs, data: () => ({ code }) });

    expect(screen.getByTestId('textarea')).toHaveAttribute('readonly');
  });

  test('linenumbers', () => {
    const code = 'initialCode';
    const inlineAttrs = `v-model="code" :line-numbers="true"`;
    const { asFragment } = renderComponent({
      inlineAttrs,
      data: () => ({ code }),
    });

    expect(asFragment()).toMatchSnapshot();
  });

  test('v-model works', async () => {
    const code = 'initial code';
    const inlineAttrs = `v-model="code"`;

    renderComponent({ inlineAttrs, data: () => ({ code }) });

    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;
    const preview = screen.getByTestId('preview');

    expect(preview).toHaveTextContent('initial code');

    await fireEvent.update(textarea, 'some code');

    expect(preview).toHaveTextContent('some code');
  });

  test('emits input event', async () => {
    const onInput = jest.fn();
    const code = 'initialCode';
    const inlineAttrs = `:value="code" @input="onInput"`;

    renderComponent({
      inlineAttrs,
      methods: { onInput },
      data: () => ({ code }),
    });

    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;
    const preview = screen.getByTestId('preview');

    expect(preview).toHaveTextContent('initialCode');

    await fireEvent.update(textarea, 'some code');

    expect(onInput).toHaveBeenCalledWith('some code');
  });

  test('emits keydown event', async () => {
    const onKeydown = jest.fn((e) => {
      e.preventDefault();
    });
    const code = 'initialCode';
    const inlineAttrs = `v-model="code" @keydown="onKeydown"`;

    renderComponent({
      inlineAttrs,
      methods: { onKeydown },
      data: () => ({ code }),
    });

    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;
    const preview = screen.getByTestId('preview');

    expect(preview).toHaveTextContent('initialCode');
    await fireEvent.keyDown(textarea, { key: 'A', code: 'KeyA' });

    expect(onKeydown).toHaveBeenCalledTimes(1);
  });

  test('toggle line numbers', async () => {
    const code = 'initial code';

    const { asFragment } = renderComponent({
      data: () => ({ code, showLineNumbers: true }),
      template: `
      <div>
        <Editor :highlight="highlight" :line-numbers="showLineNumbers" v-model="code"></Editor>
        <button data-testid="btn" @click="showLineNumbers = false">toggle linenumbers</button>
      </div>
      `,
    });

    expect(asFragment()).toMatchSnapshot();

    await fireEvent.click(screen.getByTestId('btn'));

    expect(asFragment()).toMatchSnapshot();
  });

  test('use tab instead of spaces', async () => {
    const onKeydown = jest.fn();
    const code = `<template>`;
    const inlineAttrs = `v-model="code" @keydown="onKeydown" :insert-spaces="false"`;

    renderComponent({
      inlineAttrs,
      methods: { onKeydown },
      data: () => ({ code }),
    });

    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

    await fireEvent.change(textarea, {
      target: { selectionStart: 0, selectionEnd: 0 }, // space before line1
    });

    //tab
    await fireEvent.keyDown(textarea, { keyCode: 9 });
    expect(textarea.value).toBe(`\t\t<template>`);
  });

  test('emits keyup event', async () => {
    const onKeyUp = jest.fn();
    const code = 'initialCode';
    const inlineAttrs = `v-model="code" @keyup="onKeyUp"`;

    renderComponent({
      inlineAttrs,
      methods: { onKeyUp },
      data: () => ({ code }),
    });

    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;
    const preview = screen.getByTestId('preview');

    expect(preview).toHaveTextContent('initialCode');
    await fireEvent.keyUp(textarea, { key: 'A', code: 'KeyA' });

    expect(onKeyUp).toHaveBeenCalledTimes(1);
  });

  test('emits focus, focusout and blur events', async () => {
    const onFocus = jest.fn();
    const onFocusout = jest.fn();
    const onBlur = jest.fn();
    const code = 'initialCode';
    const inlineAttrs = `v-model="code" @focus="onFocus"  @focusout="onFocusout" @blur="onBlur"`;

    renderComponent({
      inlineAttrs,
      methods: { onFocus, onFocusout, onBlur },
      data: () => ({ code }),
    });

    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

    await fireEvent.focus(textarea);
    expect(onFocus).toHaveBeenCalledTimes(1);

    await fireEvent.focusOut(textarea);
    expect(onFocusout).toHaveBeenCalledTimes(1);

    await fireEvent.blur(textarea);
    expect(onBlur).toHaveBeenCalledTimes(1);

    await fireEvent.keyDown(textarea, { keyCode: 27 }); // escape calls blur
    expect(onBlur).toHaveBeenCalledTimes(2);
  });

  test('tab and shift tab', async () => {
    const onKeydown = jest.fn();
    const code = `
      <template>
        line 1
        line 2
      </template>
    `.trim();
    const inlineAttrs = `v-model="code" @keydown="onKeydown"`;

    renderComponent({
      inlineAttrs,
      methods: { onKeydown },
      data: () => ({ code }),
    });

    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

    await fireEvent.change(textarea, {
      target: { selectionStart: 11, selectionEnd: 14 }, // line 2
    });

    // shift tab
    await fireEvent.keyDown(textarea, { keyCode: 9, shiftKey: true });
    expect(textarea.value).toBe(
      `
      <template>
      line 1
        line 2
      </template>
    `.trim()
    );

    // tab
    await fireEvent.change(textarea, {
      target: { selectionStart: 11, selectionEnd: 14 },
    });
    await fireEvent.keyDown(textarea, { keyCode: 9, shiftKey: false });
    expect(textarea.value).toBe(
      `
      <template>
        line 1
        line 2
      </template>
    `.trim()
    );
  });

  test('backspace removes tab or 2{tabwidth} spaces', async () => {
    const onKeydown = jest.fn();
    const code = `
      <template>
        line 1
        line 2
      </template>
    `.trim();
    const inlineAttrs = `v-model="code" @keydown="onKeydown"`;

    renderComponent({
      inlineAttrs,
      methods: { onKeydown },
      data: () => ({ code }),
    });

    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

    await fireEvent.change(textarea, {
      target: { selectionStart: 13, selectionEnd: 13 }, // space before line1
    });

    await fireEvent.keyDown(textarea, { keyCode: 8 });
    expect(textarea.value).toBe(
      `
      <template>
      line 1
        line 2
      </template>
    `.trim()
    );
  });

  test('enter preserves previous line tab width', async () => {
    const onKeydown = jest.fn();
    const code = `
      <template>
        line1
        line 2
      </template>`.trim();
    const inlineAttrs = `v-model="code" @keydown="onKeydown"`;

    renderComponent({
      inlineAttrs,
      methods: { onKeydown },
      data: () => ({ code }),
    });

    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

    await fireEvent.change(textarea, {
      target: { selectionStart: 22, selectionEnd: 22 }, // lin{cursor}e1
    });

    // shift tab
    await fireEvent.keyDown(textarea, { keyCode: 13 });
    expect(textarea.value).toBe(
      `
      <template>
        lin
        e1
        line 2
      </template>`.trim()
    );
  });

  test('wrap selected text with {} [] () single and double quotes', async () => {
    const onKeydown = jest.fn();
    const code = `text`;
    const inlineAttrs = `v-model="code" @keydown="onKeydown"`;

    renderComponent({
      inlineAttrs,
      methods: { onKeydown },
      data: () => ({ code }),
    });

    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

    // ()
    await fireEvent.change(textarea, {
      target: { selectionStart: 0, selectionEnd: 4 }, //
    });
    await fireEvent.keyDown(textarea, { keyCode: 57, shiftKey: true });
    expect(textarea.value).toBe(`(text)`);

    // ""
    textarea.value = 'text';
    await fireEvent.change(textarea, {
      target: { selectionStart: 0, selectionEnd: 4 }, //
    });
    await fireEvent.keyDown(textarea, { keyCode: 222, shiftKey: true });
    expect(textarea.value).toBe(`"text"`);

    // ''
    textarea.value = 'text';
    await fireEvent.change(textarea, {
      target: { selectionStart: 0, selectionEnd: 4 }, //
    });
    await fireEvent.keyDown(textarea, { keyCode: 222 });
    expect(textarea.value).toBe(`'text'`);

    // ``
    textarea.value = 'text';
    await fireEvent.change(textarea, {
      target: { selectionStart: 0, selectionEnd: 4 }, //
    });
    await fireEvent.keyDown(textarea, { keyCode: 192 });
    expect(textarea.value).toBe('`text`');

    // []
    textarea.value = 'text';
    await fireEvent.change(textarea, {
      target: { selectionStart: 0, selectionEnd: 4 }, //
    });
    await fireEvent.keyDown(textarea, { keyCode: 219 });
    expect(textarea.value).toBe('[text]');

    // {}
    textarea.value = 'text';
    await fireEvent.change(textarea, {
      target: { selectionStart: 0, selectionEnd: 4 }, //
    });
    await fireEvent.keyDown(textarea, { keyCode: 219, shiftKey: true });
    expect(textarea.value).toBe('{text}');
  });

  test('backspace removes tab or 2{tabwidth} spaces', async () => {
    const onKeydown = jest.fn();
    const code = `
      <template>
        line 1
        line 2
      </template>
    `.trim();
    const inlineAttrs = `v-model="code" @keydown="onKeydown"`;

    renderComponent({
      inlineAttrs,
      methods: { onKeydown },
      data: () => ({ code }),
    });

    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

    await fireEvent.change(textarea, {
      target: { selectionStart: 13, selectionEnd: 13 }, // space before line1
    });

    await fireEvent.keyDown(textarea, { keyCode: 8 });
    expect(textarea.value).toBe(
      `
      <template>
      line 1
        line 2
      </template>
    `.trim()
    );
  });

  test('undo redo', async () => {
    const onInput = jest.fn();
    const code = 'undoredo';
    const inlineAttrs = `:value="code" @input="onInput"`;

    renderComponent({
      inlineAttrs,
      methods: { onInput },
      data: () => ({ code }),
    });

    const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;

    // lets make a history
    await fireEvent.input(textarea, {
      target: { value: 'text2' },
    });
    await fireEvent.input(textarea, {
      target: { value: 'text3' },
    });

    // undo
    await fireEvent.keyDown(textarea, {
      ctrlKey: true,
      metaKey: true,
      keyCode: 90,
    });
    expect(textarea.value).toBe('text2');
    // redo
    await fireEvent.keyDown(textarea, {
      shiftKey: true,
      ctrlKey: true,
      metaKey: true,
      keyCode: 90,
    });
    expect(textarea.value).toBe('text3');
  });
});
