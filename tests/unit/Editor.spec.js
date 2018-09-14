import { mount } from "@vue/test-utils";
import Editor from "@/components/Editor.vue";
import "prismjs";
import { compileToFunctions } from "vue-template-compiler";

document.createRange = jest.fn();
global.getSelection = jest.fn();
global.getSelection.mockReturnValue({
  rangeCount: 1,
  getRangeAt: jest.fn().mockReturnValue({
    cloneRange: jest.fn().mockReturnValue({
      selectNodeContents: jest.fn(),
      setEnd: jest.fn(),
      setStart: jest.fn()
    })
  })
});

describe("Editor.vue", () => {
  test("renders", () => {
    let code = "initialCode";
    const wrapper = mount(Editor, {
      propsData: { code }
    });
    expect(wrapper.html()).toContain(code);
  });
  test("emits change event", () => {
    let code = "console.log('test')";
    const wrapper = mount(Editor);
    const $pre = wrapper.find(".prism-editor__code");
    $pre.element.innerHTML = code;
    $pre.trigger("keyup");
    expect(wrapper.emitted("change")[0]).toEqual([code]);
  });

  test("v-model works", () => {
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
});
