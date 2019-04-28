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

  it("not neccessary but", async () => {
    const code = "log()";
    const wrapper = mount(Editor, {
      propsData: {
        code
      },
      sync: false
    });

    expect(wrapper.vm.content).toBe(
      `<code><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span></code>`
    );
  });
});
