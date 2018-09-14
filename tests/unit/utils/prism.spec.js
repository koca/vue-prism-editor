import "prismjs";
import prism from "@/utils/prism";
const input = 'var x = "Hello World!";';
const expected =
  '<code><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token string">"Hello World!"</span><span class="token punctuation">;</span></code>';

describe("prism", () => {
  it("should highlight js(x) code", () => {
    expect(prism(input, "js")).toBe(expected);
  });
});
