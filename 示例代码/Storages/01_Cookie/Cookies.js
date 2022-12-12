/*
 * @Author: Lee
 * @Date: 2022-12-05 09:52:11
 * @LastEditors: Lee
 * @LastEditTime: 2022-12-06 10:38:43
 * @Description:
 */

/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

class DocCookies {
  /**
   * 得到Cookie
   * 读取一个 cookie。如果 cookie 不存在返回null。
   * @param {string} name 读取的 cookie 名。
   * @returns
   */
  static getItem(name) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
              encodeURIComponent(name).replace(/[-.+*]/g, '\\$&') +
              '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      ) || null
    );
  }

  /**
   * 写入Cookie
   * 创建或覆盖一个 cookie
   * @param {string} name 要创建或覆盖的 cookie 的名字
   * @param {any} value cookie 的值
   * @param {any} expire 过期时间，例如一年为 60*60*24*365（可选）
   * @param {string} path 存储路径，默认为当前文档位置的路径（可选）
   * @param {string} domain 存储域名，默认为当前文档位置的路径的域名部分（可选）
   * @param {boolean} secure cookie 只会被 https 传输（可选）
   * @returns
   */
  static setItem(name, value, expires, path, domain, secure) {
    if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) {
      return false;
    }
    var sExpires = '';
    if (expire) {
      switch (expires.constructor) {
        case Number:
          sExpires =
            expires === Infinity
              ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
              : '; max-age=' + expires;
          break;
        case String:
          sExpires = '; expires=' + expires;
          break;
        case Date:
          sExpires = '; expires=' + expires.toUTCString();
          break;
      }
    }
    document.cookie =
      encodeURIComponent(name) +
      '=' +
      encodeURIComponent(value) +
      sExpires +
      (domain ? '; domain=' + domain : '') +
      (path ? '; path=' + path : '') +
      (secure ? '; secure' : '');
    return true;
  }

  /**
   * 移除Cookie
   * 删除一个 cookie
   * @param {string} name 要移除的 cookie 名
   * @param {string} path 存储路径，默认为当前文档位置的路径（可选）
   * @param {string} domain 存储域名，默认为当前文档位置的路径的域名部分（可选）
   * @returns
   */
  static removeItem(name, path, domain) {
    if (!name || !this.hasItem(name)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(name) +
      '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
      (domain ? '; domain=' + domain : '') +
      (path ? '; path=' + path : '');
    return true;
  }

  /**
   * 检测 Cookie
   * 检查一个 cookie 是否存在
   * @param {string} name 要检查的 cookie 名
   * @returns
   */
  static hasItem(name) {
    return new RegExp(
      '(?:^|;\\s*)' +
        encodeURIComponent(name).replace(/[-.+*]/g, '\\$&') +
        '\\s*\\='
    ).test(document.cookie);
  }

  /**
   * 得到所有 cookie 的列表
   * @returns
   */
  static keys() {
    var aKeys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
}

window.docCookies = DocCookies;
