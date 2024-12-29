/**
 * @name  {{ site.name }}
 * @description  {{ site.description }}
 * @author  {{ site.author }} <{{ site.author_email }}> ({{ site.url }})
 * @version  {{ site.version }}
 * @copyright  {{ site.author }} 2017
 * @license  {{ site.license }}
 */

/* globals EvalDecode, ArrayDecode, _NumberDecode, JSFuckDecode, ObfuscatorIO, CleanSource, AADecode, JJdecode, Urlencoded, P_A_C_K_E_R, JavascriptObfuscator, MyObfuscate, Wise_EvalDecode, Wise_FunctionalDecode */
/* eslint-disable no-console */

self.addEventListener('message', (e) => {
  try {
    self.importScripts('{{ "third_party/mathjs/math.min.js" | relative_url }}');
    self.importScripts('{{ "lib/utils.js" | relative_url }}');
  } catch (err) {
    throw new Error('原因：加载脚本失败、加载依赖失败');
  }

  let source = e.data.source;
  const packer = e.data.packer;
  const options = e.data.options;

  const methods = {
    evalencode: () => {
      self.importScripts('{{ "lib/evaldecode.js" | relative_url }}');
      return EvalDecode(source);
    },
    _numberencode: () => {
      self.importScripts('{{ "lib/numberdecode.js" | relative_url }}');
      return _NumberDecode(source);
    },
    arrayencode: () => {
      self.importScripts('{{ "lib/arraydecode.js" | relative_url }}');
      return ArrayDecode(source, options);
    },
    jsfuck: () => {
      self.importScripts('{{ "lib/jsfuckdecode.js" | relative_url }}');
      return JSFuckDecode(source);
    },
    obfuscatorio: () => {
      self.importScripts('{{ "lib/obfuscatorio.js" | relative_url }}');
      return ObfuscatorIO(source, options);
    },
    cleansource: () => {
      self.importScripts('{{ "lib/cleansource.js" | relative_url }}');
      return CleanSource(source, options);
    },
    aaencode: () => {
      self.importScripts('{{ "third_party/cat-in-136/aadecode.js" | relative_url }}');
      if (!AADecode.detect(source)) throw '原因：给定的代码不是以 aaencode 编码的';
      return AADecode.decode(source);
    },
    jjencode: () => {
      self.importScripts('{{ "third_party/decoder-jjencode/jjdecode.js" | relative_url }}');
      return JJdecode.decode(source);
    },
    urlencode: () => {
      self.importScripts('{{ "third_party/js-beautify/unpackers/urlencode_unpacker.js" | relative_url }}');
      if (Urlencoded.detect(source)) return Urlencoded.unpack(source);
      throw '原因：未匹配到有效的 URL 编码格式';
    },
    p_a_c_k_e_r: () => {
      self.importScripts('{{ "third_party/js-beautify/unpackers/p_a_c_k_e_r_unpacker.js" | relative_url }}');
      if (P_A_C_K_E_R.detect(source)) return P_A_C_K_E_R.unpack(source);
      throw '原因：未匹配到有效的 P_A_C_K_E_R 格式';
    },
    javascriptobfuscator: () => {
      self.importScripts('{{ "third_party/js-beautify/unpackers/javascriptobfuscator_unpacker.js" | relative_url }}');
      if (JavascriptObfuscator.detect(source)) return JavascriptObfuscator.unpack(source);
      throw '原因：未匹配到有效的 JavascriptObfuscator 格式';
    },
    myobfuscate: () => {
      self.importScripts('{{ "third_party/js-beautify/unpackers/myobfuscate_unpacker.js" | relative_url }}');
      if (MyObfuscate.detect(source)) return MyObfuscate.unpack(source);
      throw '原因：未匹配到有效的 MyObfuscate 格式';
    },
    wiseeval: () => {
      self.importScripts('{{ "third_party/NotSoWise/unpacker.js" | relative_url }}');
      return Wise_EvalDecode(source);
    },
    wisefunction: () => {
      self.importScripts('{{ "third_party/NotSoWise/unpacker.js" | relative_url }}');
      return Wise_FunctionalDecode(source);
    },
  };

  try {
    source = methods[packer]();
  } catch (err) {
    throw new Error(`原因：解码时发生错误：方法 [${packer}] 失败，原因：${err}`);
  }

  self.postMessage(source);
});
