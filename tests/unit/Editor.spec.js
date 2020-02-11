import { mount } from "@vue/test-utils";
import Editor from "@/components/Editor.vue";
import "prismjs";
// jest.mock("prismjs");
import { compileToFunctions } from "vue-template-compiler";

global.window.getSelection = jest.fn(() => ({}));
describe("Editor.vue", () => {
  it("renders", () => {
    const code = "initialCode";
    const wrapper = mount(Editor, {
      propsData: { code }
    });
    expect(wrapper.html()).toContain(code);
  });

  it("sets contentEditable", () => {
    const wrapper = mount(Editor);
    const $pre = wrapper.find("pre");
    expect($pre.attributes().contenteditable).toBe("true");
    wrapper.setProps({
      readonly: true
    });
    expect($pre.attributes().contenteditable).toBe("false");
  });

  it("emits change event", () => {
    const code = "console.log('test')";
    const wrapper = mount(Editor);
    const $pre = wrapper.find("pre");
    $pre.element.innerHTML = code;
    $pre.trigger("keyup");
    expect(wrapper.emitted("change")[0]).toEqual([code]);
  });

  it("v-model works", () => {
    const compiled = compileToFunctions(
      '<div><Editor class="foo" v-model="code" /></div>'
    );
    const wrapper = mount(compiled, {
      data: () => ({
        code: "test"
      }),
      stubs: {
        Editor
      }
    });
    const $pre = wrapper.find("pre");

    expect(wrapper.vm.code).toEqual("test");
    $pre.element.innerHTML = "works";
    wrapper.vm.$children[0].$emit("change", "works");
    expect(wrapper.vm.code).toEqual("works");
  });

  it("works without v-model", () => {
    const wrapper = mount(Editor, {
      emitEvents: true
    });

    wrapper.vm.codeData = "<html>";
    expect(wrapper.vm.content).toBe(
      `<code class="language-js"><span class="token operator">&lt;</span>html<span class="token operator">></span></code>`
    );
  });

  it("code with sync modifier works", () => {
    const compiled = compileToFunctions(
      '<div><Editor class="foo" :code.sync="code" /></div>'
    );
    const wrapper = mount(compiled, {
      data: () => ({
        code: "test"
      }),
      stubs: {
        Editor
      }
    });
    const $pre = wrapper.find("pre");

    expect(wrapper.vm.code).toEqual("test");
    $pre.element.innerHTML = "works";
    wrapper.vm.$children[0].$emit("update:code", "works");
    expect(wrapper.vm.code).toEqual("works");
  });

  it("emits keydown event", () => {
    const mockHandler = jest.fn();
    const code = "console.log('test')";
    const wrapper = mount(Editor, {
      propsData: {
        emitEvents: true
      },
      listeners: {
        keydown: mockHandler
      }
    });
    const $pre = wrapper.find("pre");
    $pre.element.innerHTML = code;
    $pre.trigger("keydown");
    expect(wrapper.emitted()["keydown"]).toBeTruthy();
    expect(mockHandler).toHaveBeenCalled();
  });

  it("emits all pre events", () => {
    const mockHandler = jest.fn();
    const compiled = compileToFunctions(
      '<div><Editor class="foo" @focus="eventHandler" @blur="eventHandler" @input="eventHandler" /></div>'
    );
    const wrapper = mount(compiled, {
      data: () => ({
        code: "test"
      }),
      stubs: {
        Editor
      },
      methods: {
        eventHandler: mockHandler
      }
    });
    const $pre = wrapper.find("pre");

    $pre.element.dispatchEvent(new Event("focus"));
    $pre.element.dispatchEvent(new Event("blur"));
    $pre.element.dispatchEvent(new Event("input"));

    expect(mockHandler).toHaveBeenCalledTimes(3);
  });

  it("renders with null value", () => {
    const code = null;
    const wrapper = mount(Editor, {
      propsData: { code }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("emits keyup event", () => {
    const mockHandler = jest.fn();
    const code = "console.log('test')";
    const wrapper = mount(Editor, {
      propsData: {
        emitEvents: true
      },
      listeners: {
        keyup: mockHandler
      }
    });
    const $pre = wrapper.find("pre");
    $pre.element.innerHTML = code;
    $pre.trigger("keyup");
    expect(wrapper.emitted()["keyup"]).toBeTruthy();
    expect(mockHandler).toHaveBeenCalled();
  });

  it("emit change event for non forbidden key", () => {
    const mockHandler = jest.fn();
    const wrapper = mount(Editor, {
      listeners: {
        change: mockHandler
      }
    });
    const $pre = wrapper.find("pre");
    const sentence = "vue-prism-editor";

    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 86 })); // v
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 85 })); // u
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 69 })); // e
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 189 })); // -
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 80 })); // p
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 82 })); // r
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 73 })); // i
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 83 })); // s
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 77 })); // m
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 189 })); // -
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 69 })); // e
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 68 })); // d
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 73 })); // i
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 84 })); // t
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 79 })); // o
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 82 })); // r

    expect(mockHandler).toHaveBeenCalledTimes(sentence.length);
  });

  it("won't emit change event for forbidden key", () => {
    const mockHandler = jest.fn();
    const wrapper = mount(Editor, {
      listeners: {
        change: mockHandler
      }
    });
    const $pre = wrapper.find("pre");

    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 16 })); // shift
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 17 })); // ctrl
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 18 })); // alt
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 19 })); // pauseBreak
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 20 })); // capsLock
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 27 })); // esc
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 33 })); // pageUp
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 34 })); // pageDown
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 35 })); // end
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 36 })); // home
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 37 })); // arrowLeft
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 38 })); // arrowUp
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 39 })); // arrowRight
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 40 })); // arrowDown
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 44 })); // printScreen
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 91 })); // meta
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 112 })); // f1
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 113 })); // f2
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 114 })); // f3
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 115 })); // f4
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 116 })); // f5
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 117 })); // f6
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 118 })); // f7
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 119 })); // f8
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 120 })); // f9
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 121 })); // f10
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 122 })); // f11
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 123 })); // f12
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 144 })); // numLock
    $pre.element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 145 })); // scrollLock

    expect(mockHandler).toHaveBeenCalledTimes(0);
  });

  it("not neccessary but", async () => {
    const code = "log()";
    const wrapper = mount(Editor, {
      propsData: {
        code
      },
      sync: false
    });

    expect(wrapper.vm.content).toMatchInlineSnapshot(
      `<code class="language-js"><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span></code>`
    );
  });
});
