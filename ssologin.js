function SSOController() {
    var v = this
      , k = {
        success: function(a) {},
        error: function() {},
        complete: function() {}
    }
      , f = ""
      , w = ""
      , l = 0
      , u = 0
      , t = null
      , p = null
      , n = {};
    this.verifyCodeUrl = "/passport/user/verifycode";
    this.checkVerifyUrl = "/passport/user/loginverifyshow";
    this.checkVerifyCode = "/passport/user/verifycheck";
    this.checkUserName = "/passport/user/checkusername";
    this.checkNickName = "/passport/user/checknickname";
    this.tpRegister = "/passport/user/tpregister";
    this.tpBind = "/passport/user/tpbind";
    var C = function(a) {
        $("ssoLoginFrame").remove();
        var e = $("<iframe></iframe>");
        e.css("display", "none");
        e.attr("id", a);
        e.attr("name", a);
        e.attr("src", "javascript:void(0)");
        e.appendTo("body");
        return e
    }
      , x = function(a) {
        $("ssoLoginForm").remove();
        var e = $("<form></form>");
        e.attr("id", a);
        e.attr("name", a);
        e.attr("method", "post");
        e.css("display", "none");
        for (var h in n)
            e.append($("<input type='text' name='" + h + "' value='" + n[h] + "' />"));
        e.appendTo("body");
        return e
    }
      , y = function(a, e, h) {
        a = '<p class="warn-info" style="font-size: 16px;line-height: 28px;max-width: 600px;">' + a + "</p>";
        e && "undefined" != typeof h && (a = "imooc" == h ? a + '<p class="warn-tip" style="color: #999;margin-top: 30px;">\u53ef\u80fd\u5bfc\u81f4\u8d26\u53f7\u51bb\u7ed3\u7684\u539f\u56e0  <a href="//www.imooc.com/help/detail/81" target="_blank" style="color: #08c !important;">\u4e86\u89e3\u8be6\u60c5</a></p>' : a + '<p class="warn-tip" style="color: #999;margin-top: 30px;">\u53ef\u80fd\u5bfc\u81f4\u8d26\u53f7\u51bb\u7ed3\u7684\u539f\u56e0  <a href="//www.imooc.com/help/detail/101" target="_blank" style="color: #08c !important;">\u4e86\u89e3\u8be6\u60c5</a></p>');
        return a + '<div class="moco-modal-btns"><a class="moco-btn moco-btn-blue moco-modal-close js-modal-close" href="javascript:void(0)"><span>\u786e\u5b9a</span></a></div>'
    }
      , H = function() {
        if ("undefined" == typeof XMLHttpRequest || !1 in new XMLHttpRequest)
            return !1;
        $.ajax({
            url: "/passport/user/login",
            data: n,
            method: "post",
            dataType: "json",
            xhrFields: {
                withCredentials: !0
            },
            success: function(a) {
                var e = function() {
                    if (0 < window.location.href.indexOf("newlogin/from_url"))
                        return window.location.reload(),
                        !1
                };
                if (10020 == a.status) {
                    var h = ""
                      , f = "\u5341\u5206\u62b1\u6b49\uff0c\u7531\u4e8e\u60a8\u7684\u8d26\u53f7\u6700\u8fd1\u5728\u5b9e\u6218\u4e2d\u5b58\u5728\u4e25\u91cd\u8fdd\u89c4\u7684\u60c5\u51b5\uff0c\u5df2\u505a\u51bb\u7ed3\u8d26\u53f7\u5904\u7406";
                    h = y(f, !0, "shizhan");
                    $.dialog ? $.dialog(h, {
                        title: "\u63d0\u793a",
                        modal: !0,
                        callback: e
                    }) : (alert(f),
                    e());
                    $("#signin").remove();
                    $(".modal-backdrop").remove()
                } else
                    10021 == a.status ? (h = "",
                    f = "\u5341\u5206\u62b1\u6b49\uff0c\u7531\u4e8e\u60a8\u7684\u8d26\u53f7\u6700\u8fd1\u5728\u5b9e\u6218\u4e2d\u88ab\u591a\u6b21\u8b66\u544a\uff0c\u5df2\u505a\u51bb\u7ed3\u8d26\u53f7\u5904\u7406",
                    h = y(f, !0, "shizhan"),
                    $.dialog ? $.dialog(h, {
                        title: "\u63d0\u793a",
                        modal: !0,
                        callback: e
                    }) : (alert(f),
                    e()),
                    $("#signin").remove(),
                    $(".modal-backdrop").remove()) : 10022 == a.status ? (h = "",
                    f = "\u5341\u5206\u62b1\u6b49\uff0c\u7531\u4e8e\u60a8\u7684\u8d26\u53f7\u6700\u8fd1\u5728\u6155\u8bfe\u7f51\u88ab\u591a\u6b21\u8b66\u544a\uff0c\u5df2\u505a\u51bb\u7ed3\u8d26\u53f7\u5904\u7406",
                    h = y(f, !0, "imooc"),
                    $.dialog ? $.dialog(h, {
                        title: "\u63d0\u793a",
                        modal: !0,
                        callback: e
                    }) : (alert(f),
                    e()),
                    $("#signin").remove(),
                    $(".modal-backdrop").remove()) : 10006 == a.status ? (h = "",
                    f = "\u5341\u5206\u62b1\u6b49\uff0c\u7531\u4e8e\u60a8\u7684\u8d26\u53f7\u6700\u8fd1\u5728\u6155\u8bfe\u7f51\u4e2d\u5b58\u5728\u4e25\u91cd\u8fdd\u89c4\u7684\u60c5\u51b5\uff0c\u5df2\u505a\u51bb\u7ed3\u8d26\u53f7\u5904\u7406",
                    h = y(f, !0, "imooc"),
                    $.dialog ? $.dialog(h, {
                        title: "\u63d0\u793a",
                        modal: !0,
                        callback: e
                    }) : (alert(f),
                    e()),
                    $("#signin").remove(),
                    $(".modal-backdrop").remove()) : 10001 == a.status ? a.caution ? (h = y(a.caution, !1),
                    $("#signin").remove(),
                    $(".modal-backdrop").remove(),
                    $.dialog ? $.dialog(h, {
                        title: "\u63d0\u793a",
                        modal: !0,
                        callback: function() {
                            window.location.href = "http://www.imooc.com/index/usercheck?uid=" + a.data.userInfo.uid
                        }
                    }) : (alert(a.caution),
                    window.location.href = "http://www.imooc.com/index/usercheck?uid=" + a.data.userInfo.uid)) : v.ssoLoginCallBack(a) : v.ssoLoginCallBack(a)
            },
            error: function() {
                n.returntype = "html";
                D()
            }
        });
        return !0
    }
      , I = function() {
        if ("undefined" == typeof XMLHttpRequest)
            return !1;
        $.ajax({
            url: "/passport/user/register",
            data: n,
            method: "post",
            dataType: "json",
            success: function(a) {
                v.ssoLoginCallBack(a)
            },
            error: function() {
                n.returntype = "html";
                F()
            }
        });
        return !0
    }
      , D = function() {
        C("ssoLoginFrame");
        var a = x("ssoLoginForm");
        a.attr("action", "/passport/user/login");
        a.attr("target", "ssoLoginFrame");
        try {
            a.submit()
        } catch (e) {
            $("ssoLoginFrame").remove()
        }
        setTimeout(function() {
            $(a).remove()
        }, 10)
    }
      , F = function() {
        C("ssoLoginFrame");
        var a = x("ssoLoginForm");
        a.attr("action", "/passport/user/register");
        a.attr("target", "ssoLoginFrame");
        try {
            a.submit()
        } catch (e) {
            $("ssoLoginFrame").remove()
        }
        setTimeout(function() {
            $(a).remove()
        }, 10)
    }
      , J = function(a) {
        clearInterval(u);
        u = null;
        f = a.pubkey;
        w = a.code;
        l = a.servertime;
        setInterval(function() {
            l++
        }, 1E3)
    };
    this.preLogin = function(a) {
        f && w ? a.success && a.success() : (a = a || {
            success: function() {},
            error: function() {}
        },
        $.ajax({
            url: "/passport/user/prelogin",
            method: "post",
            dataType: "json",
            success: function(e) {
                10001 == e.status ? (J(e),
                a.success && a.success()) : a.error && a.error()
            },
            error: function() {
                a.error()
            }
        }))
    }
    ;
    this.setCrossDomainCookie = function(a) {
        url = a[0];
        -1 != window.location.protocol.indexOf("https") && (url = url.replace("http:", "https:"));
        $.get(url, function(a) {
            clearTimeout(p);
            v.crossDomainResult()
        }, "jsonp")
    }
    ;
    this.ssoLoginCallBack = function(a) {
        10001 == a.status ? (t = function() {
            k.success(a);
            k.complete()
        }
        ,
        this.setCrossDomainCookie(a.data.url),
        p = setTimeout(function() {
            v.crossDomainResult()
        }, 5E3)) : (k.success(a),
        k.complete())
    }
    ;
    this.crossDomainResult = function() {
        "function" == typeof t && t()
    }
    ;
    this.crossDomainAction = function(a) {
        "function" == typeof a && (t = a);
        p = setTimeout(function() {
            v.crossDomainResult()
        }, 5E3);
        return !1
    }
    ;
    this.frameLoginCallBack = function(a) {
        k.success(a);
        k.complete();
        $("ssoLoginFrame").remove()
    }
    ;
    this.login = function(a) {
        if (a.data.pwencode) {
            if ("" == w || 0 == l || "" == f) {
                a.error();
                a.complete();
                this.preLogin();
                return
            }
            var e = K(w + "\t" + l + "\t" + a.data.password);
            a.data.password = window.btoa(e)
        }
        n = a.data;
        n.referer = window.location.protocol + "//" + window.location.hostname;
        k = {
            success: a.success,
            error: a.error,
            complete: a.complete
        };
        if (H())
            return !0;
        n.returntype = "html";
        D()
    }
    ;
    this.register = function(a) {
        k = {
            success: a.success,
            error: a.error,
            complete: a.complete
        };
        n = a.data;
        n.referer = window.location.protocol + "//" + window.location.hostname;
        if (I())
            return !0;
        n.returntype = "html";
        F()
    }
    ;
    var K = function(a) {
        function e(b) {
            N = b;
            G = Array(N);
            for (b = 0; b < G.length; b++)
                G[b] = 0;
            new h;
            E = new h;
            E.digits[0] = 1
        }
        function h(b) {
            this.digits = "boolean" == typeof b && 1 == b ? null : G.slice(0);
            this.isNeg = !1
        }
        function u(b) {
            var c = new h(!0);
            c.digits = b.digits.slice(0);
            c.isNeg = b.isNeg;
            return c
        }
        function k(b) {
            for (var c = new h, r = b.length, d = 0; 0 < r; r -= 4,
            ++d) {
                for (var a = c.digits, O = d, g = b.substr(Math.max(r - 4, 0), Math.min(r, 4)), e = 0, f = Math.min(g.length, 4), l = 0; l < f; ++l) {
                    e <<= 4;
                    var n = g.charCodeAt(l);
                    e |= 48 <= n && 57 >= n ? n - 48 : 65 <= n && 90 >= n ? 10 + n - 65 : 97 <= n && 122 >= n ? 10 + n - 97 : 0
                }
                a[O] = e
            }
            return c
        }
        function w(b, c) {
            if (b.isNeg != c.isNeg) {
                c.isNeg = !c.isNeg;
                var r = l(b, c);
                c.isNeg = !c.isNeg
            } else {
                r = new h;
                for (var d = 0, a = 0; a < b.digits.length; ++a)
                    d = b.digits[a] + c.digits[a] + d,
                    r.digits[a] = d & 65535,
                    d = Number(65536 <= d);
                r.isNeg = b.isNeg
            }
            return r
        }
        function l(b, c) {
            if (b.isNeg != c.isNeg) {
                c.isNeg = !c.isNeg;
                var r = w(b, c);
                c.isNeg = !c.isNeg
            } else {
                r = new h;
                for (var a, m = a = 0; m < b.digits.length; ++m)
                    a = b.digits[m] - c.digits[m] + a,
                    r.digits[m] = a & 65535,
                    0 > r.digits[m] && (r.digits[m] += 65536),
                    a = 0 - Number(0 > a);
                if (-1 == a) {
                    for (m = a = 0; m < b.digits.length; ++m)
                        a = 0 - r.digits[m] + a,
                        r.digits[m] = a & 65535,
                        0 > r.digits[m] && (r.digits[m] += 65536),
                        a = 0 - Number(0 > a);
                    r.isNeg = !b.isNeg
                } else
                    r.isNeg = b.isNeg
            }
            return r
        }
        function n(b) {
            for (var c = b.digits.length - 1; 0 < c && 0 == b.digits[c]; )
                --c;
            return c
        }
        function v(b) {
            var c = n(b);
            b = b.digits[c];
            c = 16 * (c + 1);
            var a;
            for (a = c; a > c - 16 && 0 == (b & 32768); --a)
                b <<= 1;
            return a
        }
        function t(b, c) {
            for (var a = new h, d, m = n(b), e = n(c), g, f = 0; f <= e; ++f) {
                d = 0;
                g = f;
                for (j = 0; j <= m; ++j,
                ++g)
                    d = a.digits[g] + b.digits[j] * c.digits[f] + d,
                    a.digits[g] = d & 65535,
                    d >>>= 16;
                a.digits[f + m + 1] = d
            }
            a.isNeg = b.isNeg != c.isNeg;
            return a
        }
        function p(b, c, a, d, m) {
            for (m = Math.min(c + m, b.length); c < m; ++c,
            ++d)
                a[d] = b[c]
        }
        function y(b, c) {
            var a = Math.floor(c / 16)
              , d = new h;
            p(b.digits, 0, d.digits, a, d.digits.length - a);
            c %= 16;
            a = 16 - c;
            for (var m = d.digits.length - 1, e = m - 1; 0 < m; --m,
            --e)
                d.digits[m] = d.digits[m] << c & 65535 | (d.digits[e] & P[c]) >>> a;
            d.digits[0] = d.digits[m] << c & 65535;
            d.isNeg = b.isNeg;
            return d
        }
        function L(b, a) {
            var c = Math.floor(a / 16)
              , d = new h;
            p(b.digits, c, d.digits, 0, b.digits.length - c);
            a %= 16;
            c = 16 - a;
            for (var e = 0, f = e + 1; e < d.digits.length - 1; ++e,
            ++f)
                d.digits[e] = d.digits[e] >>> a | (d.digits[f] & Q[a]) << c;
            d.digits[d.digits.length - 1] >>>= a;
            d.isNeg = b.isNeg;
            return d
        }
        function C(a, c) {
            var b = new h;
            p(a.digits, 0, b.digits, c, b.digits.length - c);
            return b
        }
        function x(a, c) {
            var b = new h;
            p(a.digits, c, b.digits, 0, b.digits.length - c);
            return b
        }
        function D(a, c) {
            var b = new h;
            p(a.digits, 0, b.digits, 0, c);
            return b
        }
        function M(a, c) {
            if (a.isNeg != c.isNeg)
                return 1 - 2 * Number(a.isNeg);
            for (var b = a.digits.length - 1; 0 <= b; --b)
                if (a.digits[b] != c.digits[b])
                    return a.isNeg ? 1 - 2 * Number(a.digits[b] > c.digits[b]) : 1 - 2 * Number(a.digits[b] < c.digits[b]);
            return 0
        }
        function F(a) {
            this.modulus = u(a);
            this.k = n(this.modulus) + 1;
            a = new h;
            a.digits[2 * this.k] = 1;
            var c = this.modulus
              , b = v(a)
              , d = v(c)
              , e = c.isNeg;
            if (b < d)
                if (a.isNeg) {
                    var f = u(E);
                    f.isNeg = !c.isNeg;
                    a.isNeg = !1;
                    c.isNeg = !1;
                    var g = l(c, a);
                    a.isNeg = !0;
                    c.isNeg = e
                } else
                    f = new h,
                    g = u(a);
            else {
                f = new h;
                g = a;
                for (var q = Math.ceil(d / 16) - 1, k = 0; 32768 > c.digits[q]; )
                    c = y(c, 1),
                    ++k,
                    ++d,
                    q = Math.ceil(d / 16) - 1;
                g = y(g, k);
                b = Math.ceil((b + k) / 16) - 1;
                for (d = C(c, b - q); -1 != M(g, d); )
                    ++f.digits[b - q],
                    g = l(g, d);
                for (; b > q; --b) {
                    d = b >= g.digits.length ? 0 : g.digits[b];
                    var p = b - 1 >= g.digits.length ? 0 : g.digits[b - 1]
                      , t = b - 2 >= g.digits.length ? 0 : g.digits[b - 2]
                      , B = q >= c.digits.length ? 0 : c.digits[q]
                      , z = q - 1 >= c.digits.length ? 0 : c.digits[q - 1];
                    f.digits[b - q - 1] = d == B ? 65535 : Math.floor((65536 * d + p) / B);
                    for (var A = f.digits[b - q - 1] * (65536 * B + z), x = 4294967296 * d + (65536 * p + t); A > x; )
                        --f.digits[b - q - 1],
                        A = f.digits[b - q - 1] * (65536 * B | z),
                        x = 4294967296 * d + (65536 * p + t);
                    t = d = C(c, b - q - 1);
                    B = f.digits[b - q - 1];
                    result = new h;
                    p = n(t);
                    for (z = A = 0; z <= p; ++z)
                        A = result.digits[z] + t.digits[z] * B + A,
                        result.digits[z] = A & 65535,
                        A >>>= 16;
                    result.digits[1 + p] = A;
                    g = l(g, result);
                    g.isNeg && (g = w(g, d),
                    --f.digits[b - q - 1])
                }
                g = L(g, k);
                f.isNeg = a.isNeg != e;
                a.isNeg && (f = e ? w(f, E) : l(f, E),
                c = L(c, k),
                g = l(c, g));
                0 == g.digits[0] && 0 == n(g) && (g.isNeg = !1)
            }
            a = [f, g];
            this.mu = a[0];
            this.bkplus1 = new h;
            this.bkplus1.digits[this.k + 1] = 1;
            this.modulo = H;
            this.multiplyMod = I;
            this.powMod = J
        }
        function H(a) {
            var b = x(a, this.k - 1);
            b = t(b, this.mu);
            b = x(b, this.k + 1);
            a = D(a, this.k + 1);
            b = t(b, this.modulus);
            b = D(b, this.k + 1);
            a = l(a, b);
            a.isNeg && (a = w(a, this.bkplus1));
            for (b = 0 <= M(a, this.modulus); b; )
                a = l(a, this.modulus),
                b = 0 <= M(a, this.modulus);
            return a
        }
        function I(a, c) {
            a = t(a, c);
            return this.modulo(a)
        }
        function J(a, c) {
            var b = new h;
            for (b.digits[0] = 1; ; ) {
                0 != (c.digits[0] & 1) && (b = this.multiplyMod(b, a));
                c = L(c, 1);
                if (0 == c.digits[0] && 0 == n(c))
                    break;
                a = this.multiplyMod(a, a)
            }
            return b
        }
        function K(a) {
            this.e = k("10001");
            this.d = k("");
            this.m = k(a);
            this.chunkSize = 128;
            this.radix = 16;
            this.barrett = new F(this.m)
        }
        var N, G, E;
        e(20);
        (function(a) {
            var b = new h;
            b.isNeg = 0 > a;
            a = Math.abs(a);
            for (var f = 0; 0 < a; )
                b.digits[f++] = a & 65535,
                a >>= 16;
            return b
        }
        )(1E15);
        var P = [0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535]
          , Q = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];
        e(131);
        return function(a) {
            var b = [], e = a.length, d, m = "", l = new K(f);
            e > l.chunkSize - 11 && (e = l.chunkSize - 11);
            var g = 0;
            for (d = e - 1; g < e; )
                b[d] = a.charCodeAt(g),
                g++,
                d--;
            for (d = l.chunkSize - e % l.chunkSize; 0 < d; ) {
                for (a = Math.floor(256 * Math.random()); !a; )
                    a = Math.floor(256 * Math.random());
                b[g] = a;
                g++;
                d--
            }
            b[e] = 0;
            b[l.chunkSize - 2] = 2;
            b[l.chunkSize - 1] = 0;
            e = b.length;
            for (g = 0; g < e; g += l.chunkSize) {
                var q = new h;
                d = 0;
                for (a = g; a < g + l.chunkSize; ++d)
                    q.digits[d] = b[a++],
                    q.digits[d] += b[a++] << 8;
                d = l.barrett.powMod(q, l.e);
                q = "";
                for (a = n(d); -1 < a; --a) {
                    var k = d.digits[a];
                    var p = String.fromCharCode(k & 255);
                    k = String.fromCharCode(k >>> 8 & 255) + p;
                    q += k
                }
                d = q;
                m += d
            }
            return m
        }(a)
    }
}
(function() {
    function v(f) {
        this.message = f
    }
    var k = "undefined" != typeof exports ? exports : self;
    v.prototype = Error();
    v.prototype.name = "InvalidCharacterError";
    k.btoa || (k.btoa = function(f) {
        f = String(f);
        for (var k, l, u = 0, t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", p = ""; f.charAt(u | 0) || (t = "=",
        u % 1); p += t.charAt(63 & k >> 8 - u % 1 * 8)) {
            l = f.charCodeAt(u += .75);
            if (255 < l)
                throw new v("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            k = k << 8 | l
        }
        return p
    }
    );
    k.atob || (k.atob = function(f) {
        f = String(f).replace(/=+$/, "");
        if (1 == f.length % 4)
            throw new v("'atob' failed: The string to be decoded is not correctly encoded.");
        for (var k = 0, l, u, t = 0, p = ""; u = f.charAt(t++); ~u && (l = k % 4 ? 64 * l + u : u,
        k++ % 4) ? p += String.fromCharCode(255 & l >> (-2 * k & 6)) : 0)
            u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(u);
        return p
    }
    )
}
)();
imoocSSO = new SSOController;