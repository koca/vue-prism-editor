import "prismjs";
import prism from "@/utils/prism";
const input = 'var x = "Hello World!";';

describe("prism", () => {
  it("should highlight js(x) code", () => {
    expect(prism(input, "js")).toMatchInlineSnapshot(
      `<code class="language-js"><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token string">"Hello World!"</span><span class="token punctuation">;</span></code>`
    );
  });
});
