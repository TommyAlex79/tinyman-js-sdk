"use strict";
Object.defineProperty(exports, "__esModule", {value: !0});
var t = require("algosdk"),
  e = require("base64-js");
function n(t) {
  return t && "object" == typeof t && "default" in t ? t : {default: t};
}
var r = n(t),
  a = Uint8Array.from([1]);
function s(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e &&
      (r = r.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function o(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = null != arguments[e] ? arguments[e] : {};
    e % 2
      ? s(Object(n), !0).forEach(function (e) {
          d(t, e, n[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
      : s(Object(n)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
        });
  }
  return t;
}
function i() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  i = function () {
    return t;
  };
  var t = {},
    e = Object.prototype,
    n = e.hasOwnProperty,
    r = "function" == typeof Symbol ? Symbol : {},
    a = r.iterator || "@@iterator",
    s = r.asyncIterator || "@@asyncIterator",
    o = r.toStringTag || "@@toStringTag";
  function u(t, e, n) {
    return (
      Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }),
      t[e]
    );
  }
  try {
    u({}, "");
  } catch (t) {
    u = function (t, e, n) {
      return (t[e] = n);
    };
  }
  function c(t, e, n, r) {
    var a = e && e.prototype instanceof f ? e : f,
      s = Object.create(a.prototype),
      o = new D(r || []);
    return (
      (s._invoke = (function (t, e, n) {
        var r = "suspendedStart";
        return function (a, s) {
          if ("executing" === r) throw new Error("Generator is already running");
          if ("completed" === r) {
            if ("throw" === a) throw s;
            return w();
          }
          for (n.method = a, n.arg = s; ; ) {
            var o = n.delegate;
            if (o) {
              var i = E(o, n);
              if (i) {
                if (i === l) continue;
                return i;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if ("suspendedStart" === r) throw ((r = "completed"), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            r = "executing";
            var u = p(t, e, n);
            if ("normal" === u.type) {
              if (((r = n.done ? "completed" : "suspendedYield"), u.arg === l)) continue;
              return {value: u.arg, done: n.done};
            }
            "throw" === u.type &&
              ((r = "completed"), (n.method = "throw"), (n.arg = u.arg));
          }
        };
      })(t, n, o)),
      s
    );
  }
  function p(t, e, n) {
    try {
      return {type: "normal", arg: t.call(e, n)};
    } catch (t) {
      return {type: "throw", arg: t};
    }
  }
  t.wrap = c;
  var l = {};
  function f() {}
  function d() {}
  function A() {}
  var g = {};
  u(g, a, function () {
    return this;
  });
  var m = Object.getPrototypeOf,
    I = m && m(m(b([])));
  I && I !== e && n.call(I, a) && (g = I);
  var h = (A.prototype = f.prototype = Object.create(g));
  function x(t) {
    ["next", "throw", "return"].forEach(function (e) {
      u(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function y(t, e) {
    function r(a, s, o, i) {
      var u = p(t[a], t, s);
      if ("throw" !== u.type) {
        var c = u.arg,
          l = c.value;
        return l && "object" == typeof l && n.call(l, "__await")
          ? e.resolve(l.__await).then(
              function (t) {
                r("next", t, o, i);
              },
              function (t) {
                r("throw", t, o, i);
              }
            )
          : e.resolve(l).then(
              function (t) {
                (c.value = t), o(c);
              },
              function (t) {
                return r("throw", t, o, i);
              }
            );
      }
      i(u.arg);
    }
    var a;
    this._invoke = function (t, n) {
      function s() {
        return new e(function (e, a) {
          r(t, n, e, a);
        });
      }
      return (a = a ? a.then(s, s) : s());
    };
  }
  function E(t, e) {
    var n = t.iterator[e.method];
    if (void 0 === n) {
      if (((e.delegate = null), "throw" === e.method)) {
        if (
          t.iterator.return &&
          ((e.method = "return"), (e.arg = void 0), E(t, e), "throw" === e.method)
        )
          return l;
        (e.method = "throw"),
          (e.arg = new TypeError("The iterator does not provide a 'throw' method"));
      }
      return l;
    }
    var r = p(n, t.iterator, e.arg);
    if ("throw" === r.type)
      return (e.method = "throw"), (e.arg = r.arg), (e.delegate = null), l;
    var a = r.arg;
    return a
      ? a.done
        ? ((e[t.resultName] = a.value),
          (e.next = t.nextLoc),
          "return" !== e.method && ((e.method = "next"), (e.arg = void 0)),
          (e.delegate = null),
          l)
        : a
      : ((e.method = "throw"),
        (e.arg = new TypeError("iterator result is not an object")),
        (e.delegate = null),
        l);
  }
  function v(t) {
    var e = {tryLoc: t[0]};
    1 in t && (e.catchLoc = t[1]),
      2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
      this.tryEntries.push(e);
  }
  function T(t) {
    var e = t.completion || {};
    (e.type = "normal"), delete e.arg, (t.completion = e);
  }
  function D(t) {
    (this.tryEntries = [{tryLoc: "root"}]), t.forEach(v, this), this.reset(!0);
  }
  function b(t) {
    if (t) {
      var e = t[a];
      if (e) return e.call(t);
      if ("function" == typeof t.next) return t;
      if (!isNaN(t.length)) {
        var r = -1,
          s = function e() {
            for (; ++r < t.length; )
              if (n.call(t, r)) return (e.value = t[r]), (e.done = !1), e;
            return (e.value = void 0), (e.done = !0), e;
          };
        return (s.next = s);
      }
    }
    return {next: w};
  }
  function w() {
    return {value: void 0, done: !0};
  }
  return (
    (d.prototype = A),
    u(h, "constructor", A),
    u(A, "constructor", d),
    (d.displayName = u(A, o, "GeneratorFunction")),
    (t.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === d || "GeneratorFunction" === (e.displayName || e.name));
    }),
    (t.mark = function (t) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(t, A)
          : ((t.__proto__ = A), u(t, o, "GeneratorFunction")),
        (t.prototype = Object.create(h)),
        t
      );
    }),
    (t.awrap = function (t) {
      return {__await: t};
    }),
    x(y.prototype),
    u(y.prototype, s, function () {
      return this;
    }),
    (t.AsyncIterator = y),
    (t.async = function (e, n, r, a, s) {
      void 0 === s && (s = Promise);
      var o = new y(c(e, n, r, a), s);
      return t.isGeneratorFunction(n)
        ? o
        : o.next().then(function (t) {
            return t.done ? t.value : o.next();
          });
    }),
    x(h),
    u(h, o, "Generator"),
    u(h, a, function () {
      return this;
    }),
    u(h, "toString", function () {
      return "[object Generator]";
    }),
    (t.keys = function (t) {
      var e = [];
      for (var n in t) e.push(n);
      return (
        e.reverse(),
        function n() {
          for (; e.length; ) {
            var r = e.pop();
            if (r in t) return (n.value = r), (n.done = !1), n;
          }
          return (n.done = !0), n;
        }
      );
    }),
    (t.values = b),
    (D.prototype = {
      constructor: D,
      reset: function (t) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = void 0),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = void 0),
          this.tryEntries.forEach(T),
          !t)
        )
          for (var e in this)
            "t" === e.charAt(0) &&
              n.call(this, e) &&
              !isNaN(+e.slice(1)) &&
              (this[e] = void 0);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (t) {
        if (this.done) throw t;
        var e = this;
        function r(n, r) {
          return (
            (o.type = "throw"),
            (o.arg = t),
            (e.next = n),
            r && ((e.method = "next"), (e.arg = void 0)),
            !!r
          );
        }
        for (var a = this.tryEntries.length - 1; a >= 0; --a) {
          var s = this.tryEntries[a],
            o = s.completion;
          if ("root" === s.tryLoc) return r("end");
          if (s.tryLoc <= this.prev) {
            var i = n.call(s, "catchLoc"),
              u = n.call(s, "finallyLoc");
            if (i && u) {
              if (this.prev < s.catchLoc) return r(s.catchLoc, !0);
              if (this.prev < s.finallyLoc) return r(s.finallyLoc);
            } else if (i) {
              if (this.prev < s.catchLoc) return r(s.catchLoc, !0);
            } else {
              if (!u) throw new Error("try statement without catch or finally");
              if (this.prev < s.finallyLoc) return r(s.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var a = this.tryEntries[r];
          if (
            a.tryLoc <= this.prev &&
            n.call(a, "finallyLoc") &&
            this.prev < a.finallyLoc
          ) {
            var s = a;
            break;
          }
        }
        s &&
          ("break" === t || "continue" === t) &&
          s.tryLoc <= e &&
          e <= s.finallyLoc &&
          (s = null);
        var o = s ? s.completion : {};
        return (
          (o.type = t),
          (o.arg = e),
          s ? ((this.method = "next"), (this.next = s.finallyLoc), l) : this.complete(o)
        );
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return (
          "break" === t.type || "continue" === t.type
            ? (this.next = t.arg)
            : "return" === t.type
            ? ((this.rval = this.arg = t.arg),
              (this.method = "return"),
              (this.next = "end"))
            : "normal" === t.type && e && (this.next = e),
          l
        );
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), T(n), l;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.tryLoc === t) {
            var r = n.completion;
            if ("throw" === r.type) {
              var a = r.arg;
              T(n);
            }
            return a;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (t, e, n) {
        return (
          (this.delegate = {iterator: b(t), resultName: e, nextLoc: n}),
          "next" === this.method && (this.arg = void 0),
          l
        );
      }
    }),
    t
  );
}
function u(t, e, n, r, a, s, o) {
  try {
    var i = t[s](o),
      u = i.value;
  } catch (t) {
    return void n(t);
  }
  i.done ? e(u) : Promise.resolve(u).then(r, a);
}
function c(t) {
  return function () {
    var e = this,
      n = arguments;
    return new Promise(function (r, a) {
      var s = t.apply(e, n);
      function o(t) {
        u(s, r, a, o, i, "next", t);
      }
      function i(t) {
        u(s, r, a, o, i, "throw", t);
      }
      o(void 0);
    });
  };
}
function p(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function l(t, e) {
  for (var n = 0; n < e.length; n++) {
    var r = e[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(t, r.key, r);
  }
}
function f(t, e, n) {
  return (
    e && l(t.prototype, e),
    n && l(t, n),
    Object.defineProperty(t, "prototype", {writable: !1}),
    t
  );
}
function d(t, e, n) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = n),
    t
  );
}
function A(t, e) {
  if ("function" != typeof e && null !== e)
    throw new TypeError("Super expression must either be null or a function");
  (t.prototype = Object.create(e && e.prototype, {
    constructor: {value: t, writable: !0, configurable: !0}
  })),
    Object.defineProperty(t, "prototype", {writable: !1}),
    e && m(t, e);
}
function g(t) {
  return (
    (g = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        }),
    g(t)
  );
}
function m(t, e) {
  return (
    (m = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t;
        }),
    m(t, e)
  );
}
function I() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" == typeof Proxy) return !0;
  try {
    return (
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
    );
  } catch (t) {
    return !1;
  }
}
function h(t, e, n) {
  return (
    (h = I()
      ? Reflect.construct.bind()
      : function (t, e, n) {
          var r = [null];
          r.push.apply(r, e);
          var a = new (Function.bind.apply(t, r))();
          return n && m(a, n.prototype), a;
        }),
    h.apply(null, arguments)
  );
}
function x(t) {
  var e = "function" == typeof Map ? new Map() : void 0;
  return (
    (x = function (t) {
      if (
        null === t ||
        ((n = t), -1 === Function.toString.call(n).indexOf("[native code]"))
      )
        return t;
      var n;
      if ("function" != typeof t)
        throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== e) {
        if (e.has(t)) return e.get(t);
        e.set(t, r);
      }
      function r() {
        return h(t, arguments, g(this).constructor);
      }
      return (
        (r.prototype = Object.create(t.prototype, {
          constructor: {value: r, enumerable: !1, writable: !0, configurable: !0}
        })),
        m(r, t)
      );
    }),
    x(t)
  );
}
function y(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e)
    throw new TypeError("Derived constructors may only return object or undefined");
  return (function (t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  })(t);
}
function E(t) {
  var e = I();
  return function () {
    var n,
      r = g(t);
    if (e) {
      var a = g(this).constructor;
      n = Reflect.construct(r, arguments, a);
    } else n = r.apply(this, arguments);
    return y(this, n);
  };
}
function v(t, e) {
  return (
    (function (t) {
      if (Array.isArray(t)) return t;
    })(t) ||
    (function (t, e) {
      var n =
        null == t
          ? null
          : ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (null == n) return;
      var r,
        a,
        s = [],
        o = !0,
        i = !1;
      try {
        for (
          n = n.call(t);
          !(o = (r = n.next()).done) && (s.push(r.value), !e || s.length !== e);
          o = !0
        );
      } catch (t) {
        (i = !0), (a = t);
      } finally {
        try {
          o || null == n.return || n.return();
        } finally {
          if (i) throw a;
        }
      }
      return s;
    })(t, e) ||
    T(t, e) ||
    (function () {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    })()
  );
}
function T(t, e) {
  if (t) {
    if ("string" == typeof t) return D(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    return (
      "Object" === n && t.constructor && (n = t.constructor.name),
      "Map" === n || "Set" === n
        ? Array.from(t)
        : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        ? D(t, e)
        : void 0
    );
  }
}
function D(t, e) {
  (null == e || e > t.length) && (e = t.length);
  for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
  return r;
}
function b(t, e) {
  var n = ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
  if (!n) {
    if (Array.isArray(t) || (n = T(t)) || (e && t && "number" == typeof t.length)) {
      n && (t = n);
      var r = 0,
        a = function () {};
      return {
        s: a,
        n: function () {
          return r >= t.length ? {done: !0} : {done: !1, value: t[r++]};
        },
        e: function (t) {
          throw t;
        },
        f: a
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var s,
    o = !0,
    i = !1;
  return {
    s: function () {
      n = n.call(t);
    },
    n: function () {
      var t = n.next();
      return (o = t.done), t;
    },
    e: function (t) {
      (i = !0), (s = t);
    },
    f: function () {
      try {
        o || null == n.return || n.return();
      } finally {
        if (i) throw s;
      }
    }
  };
}
var w = "- would result negative",
  N = "logic eval error:",
  S = "exceeds schema integer count",
  _ = /transaction \w+:/,
  k = (function (t) {
    A(n, x(Error));
    var e = E(n);
    function n(t, r) {
      var a;
      p(this, n);
      for (var s = arguments.length, o = new Array(s > 2 ? s - 2 : 0), i = 2; i < s; i++)
        o[i - 2] = arguments[i];
      var u = (a = e.call.apply(e, [this].concat(o))).extractMessageFromAlgoSDKError(t);
      return (
        (a.data = t),
        (a.type = a.getErrorType(u)),
        a.setMessage(a.getErrorMessage(u, a.type, r)),
        a
      );
    }
    return (
      f(n, [
        {
          key: "setMessage",
          value: function (t) {
            this.message = t;
          }
        },
        {
          key: "getErrorType",
          value: function (t) {
            var e = "Unknown";
            return (
              t.includes(w)
                ? (e = "SlippageTolerance")
                : t.includes(S)
                ? (e = "ExceedingExcessAmountCount")
                : t.includes(N)
                ? (e = "LogicError")
                : t.match(_) && (e = "TransactionError"),
              e
            );
          }
        },
        {
          key: "getErrorMessage",
          value: function (t, e, n) {
            var r;
            switch (e) {
              case "SlippageTolerance":
                r =
                  "The process failed due to too much slippage in the price. Please adjust the slippage tolerance and try again.";
                break;
              case "ExceedingExcessAmountCount":
                r =
                  "The process failed due to the number of excess amounts accumulated for your account in the Tinyman app.";
                break;
              case "LogicError":
                r = t.split(N)[1];
                break;
              case "TransactionError":
                r = t.split(_)[1];
                break;
              case "Unknown":
                t && (r = t);
            }
            return (
              r || (r = n || "We encountered an unexpected error, try again later."),
              r.trim()
            );
          }
        },
        {
          key: "extractMessageFromAlgoSDKError",
          value: function (t) {
            var e,
              n,
              r,
              a = "";
            return (
              null != t &&
              null !== (e = t.response) &&
              void 0 !== e &&
              null !== (n = e.body) &&
              void 0 !== n &&
              n.message
                ? (a = t.response.body.message)
                : null != t && null !== (r = t.response) && void 0 !== r && r.text
                ? (a = t.response.text)
                : "string" == typeof (null == t ? void 0 : t.message) &&
                  (a = this.isMessageObjectString(null == t ? void 0 : t.message)
                    ? JSON.parse(t.message || "{message: ''}").message
                    : t.message),
              "string" != typeof a && (a = String(a)),
              a
            );
          }
        },
        {
          key: "isMessageObjectString",
          value: function (t) {
            return "string" == typeof t && t.includes("{message:");
          }
        }
      ]),
      n
    );
  })();
function M() {
  var t,
    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
    n = {},
    r = b(e);
  try {
    for (r.s(); !(t = r.n()).done; ) {
      var a = t.value,
        s = a.key,
        o = void 0;
      if (1 == a.value.type) o = a.value.bytes;
      else {
        if (2 != a.value.type)
          throw new Error("Unexpected state type: ".concat(a.value.type));
        o = a.value.uint;
      }
      n[s] = o;
    }
  } catch (t) {
    r.e(t);
  } finally {
    r.f();
  }
  return n;
}
function O(t) {
  var e,
    n = t.reduce(function (t, e) {
      return t + e.length;
    }, 0),
    r = new Uint8Array(n),
    a = 0,
    s = b(t);
  try {
    for (s.s(); !(e = s.n()).done; ) {
      var o = e.value;
      r.set(o, a), (a += o.length);
    }
  } catch (t) {
    s.e(t);
  } finally {
    s.f();
  }
  return r;
}
var B = 100000n,
  R = 100000n,
  P = 100000n,
  Q = 25000n + 25000n,
  C = 25000n + 3500n;
function U(t) {
  var e = t["apps-total-schema"],
    n = 0n,
    r = 0n;
  e &&
    (e["num-byte-slice"] && (n = e["num-byte-slice"]),
    e["num-uint"] && (r = e["num-uint"]));
  var a = t["apps-local-state"] || [],
    s = t["created-apps"] || [],
    o = t.assets || [];
  return B + R * BigInt(o.length) + P * BigInt(s.length + a.length) + C * r + Q * n;
}
function L(t) {
  return new Promise(function (e) {
    setTimeout(function () {
      e(null);
    }, t);
  });
}
function j(t, e) {
  return F.apply(this, arguments);
}
function F() {
  return (F = c(
    i().mark(function t(e, n) {
      var r;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (t.next = 3), L(1e3);
              case 3:
                return (
                  (r = null),
                  (t.prev = 4),
                  (t.next = 7),
                  e.pendingTransactionInformation(n).do()
                );
              case 7:
                (r = t.sent), (t.next = 12);
                break;
              case 10:
                (t.prev = 10), (t.t0 = t.catch(4));
              case 12:
                if (!r) {
                  t.next = 17;
                  break;
                }
                if (!r["confirmed-round"]) {
                  t.next = 15;
                  break;
                }
                return t.abrupt("return", r);
              case 15:
                if (!r["pool-error"]) {
                  t.next = 17;
                  break;
                }
                throw new Error("Transaction Rejected: ".concat(r["pool-error"]));
              case 17:
                t.next = 0;
                break;
              case 19:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[4, 10]]
      );
    })
  )).apply(this, arguments);
}
function J(t, e, n) {
  if (e > 1 || e < 0)
    throw new Error("Invalid slippage value. Must be between 0 and 1, got ".concat(e));
  var r;
  try {
    var a = "negative" === t ? 1 - e : 1 + e;
    r = BigInt(Math.floor(Number(n) * a));
  } catch (t) {
    throw new Error(t.message);
  }
  return r;
}
function V(t, e) {
  var n = Number(t);
  return G({decimalPlaces: n}, Math.pow(10, -n) * Number(e));
}
function G(t, e) {
  var n = t.decimalPlaces,
    r = void 0 === n ? 0 : n;
  return Number(Math.round(Number(e + "e+".concat(r))) + "e-".concat(r));
}
function X(t, e) {
  return z.apply(this, arguments);
}
function z() {
  return (z = c(
    i().mark(function t(e, n) {
      var r, a, s, o, u, c, p, l;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                (t.prev = 0), (r = []), (a = b(n)), (t.prev = 3), a.s();
              case 5:
                if ((s = a.n()).done) {
                  t.next = 18;
                  break;
                }
                return (o = s.value), (t.next = 9), e.sendRawTransaction(o).do();
              case 9:
                return (u = t.sent), (c = u.txId), (t.next = 13), j(e, c);
              case 13:
                (p = t.sent),
                  (l = p["confirmed-round"]),
                  r.push({confirmedRound: l, txnID: c});
              case 16:
                t.next = 5;
                break;
              case 18:
                t.next = 23;
                break;
              case 20:
                (t.prev = 20), (t.t0 = t.catch(3)), a.e(t.t0);
              case 23:
                return (t.prev = 23), a.f(), t.finish(23);
              case 26:
                return t.abrupt("return", r);
              case 29:
                throw (
                  ((t.prev = 29),
                  (t.t1 = t.catch(0)),
                  new k(
                    t.t1,
                    "We encountered an error while processing this transaction. Try again later."
                  ))
                );
              case 32:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [
          [0, 29],
          [3, 20, 23, 26]
        ]
      );
    })
  )).apply(this, arguments);
}
function Y(t) {
  return t.reduce(function (t, e) {
    return t + e.txn.fee;
  }, 0);
}
function W(t) {
  return (e = t[0].txn.group) ? Buffer.from(e).toString("base64") : "";
  var e;
}
function q(t) {
  return new TextEncoder().encode(t);
}
function H() {
  return (H = c(
    i().mark(function t(e) {
      var n, a, s, o, u;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (n = e.client),
                  (a = e.assetID),
                  (s = e.initiatorAddr),
                  (t.prev = 1),
                  (t.next = 4),
                  n.getTransactionParams().do()
                );
              case 4:
                return (
                  (o = t.sent),
                  (u = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                    from: s,
                    to: s,
                    assetIndex: a,
                    amount: 0,
                    suggestedParams: o
                  })),
                  t.abrupt("return", [{txn: u, signers: [s]}])
                );
              case 9:
                throw (
                  ((t.prev = 9),
                  (t.t0 = t.catch(1)),
                  new k(
                    t.t0,
                    "We encountered something unexpected while opting into this asset. Try again later."
                  ))
                );
              case 12:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[1, 9]]
      );
    })
  )).apply(this, arguments);
}
var Z,
  K = {
    id: "".concat(0),
    name: "Algorand",
    unit_name: "ALGO",
    decimals: 6,
    url: "https://algorand.org",
    is_liquidity_token: !1,
    total_amount: "6615503326932151"
  },
  $ = {DEFAULT: "TMPOOL11", V1: "TM1POOL"},
  tt = {V1_1: "v1_1", V2: "v2"},
  et = {
    type: "logicsig",
    logic: {
      bytecode:
        "BCAIAQCBgICAgICAgPABgICAgICAgIDwAQMEBQYlJA1EMQkyAxJEMRUyAxJEMSAyAxJEMgQiDUQzAQAxABJEMwEQIQcSRDMBGIGCgICAgICAgPABEkQzARkiEjMBGyEEEhA3ARoAgAlib290c3RyYXASEEAAXDMBGSMSRDMBG4ECEjcBGgCABHN3YXASEEACOzMBGyISRDcBGgCABG1pbnQSQAE7NwEaAIAEYnVybhJAAZg3ARoAgAZyZWRlZW0SQAJbNwEaAIAEZmVlcxJAAnkAIQYhBSQjEk0yBBJENwEaARclEjcBGgIXJBIQRDMCADEAEkQzAhAhBBJEMwIhIxJEMwIiIxwSRDMCIyEHEkQzAiQjEkQzAiWACFRNUE9PTDExEkQzAiZRAA+AD1RpbnltYW5Qb29sMS4xIBJEMwIngBNodHRwczovL3RpbnltYW4ub3JnEkQzAikyAxJEMwIqMgMSRDMCKzIDEkQzAiwyAxJEMwMAMQASRDMDECEFEkQzAxElEkQzAxQxABJEMwMSIxJEJCMTQAAQMwEBMwIBCDMDAQg1AUIBsTMEADEAEkQzBBAhBRJEMwQRJBJEMwQUMQASRDMEEiMSRDMBATMCAQgzAwEIMwQBCDUBQgF8MgQhBhJENwEcATEAE0Q3ARwBMwQUEkQzAgAxABNEMwIUMQASRDMDADMCABJEMwIRJRJEMwMUMwMHMwMQIhJNMQASRDMDESMzAxAiEk0kEkQzBAAxABJEMwQUMwIAEkQzAQEzBAEINQFCAREyBCEGEkQ3ARwBMQATRDcBHAEzAhQSRDMDFDMDBzMDECISTTcBHAESRDMCADEAEkQzAhQzBAASRDMCESUSRDMDADEAEkQzAxQzAwczAxAiEk0zBAASRDMDESMzAxAiEk0kEkQzBAAxABNEMwQUMQASRDMBATMCAQgzAwEINQFCAJAyBCEFEkQ3ARwBMQATRDMCADcBHAESRDMCADEAE0QzAwAxABJEMwIUMwIHMwIQIhJNMQASRDMDFDMDBzMDECISTTMCABJEMwEBMwMBCDUBQgA+MgQhBBJENwEcATEAE0QzAhQzAgczAhAiEk03ARwBEkQzAQEzAgEINQFCABIyBCEEEkQzAQEzAgEINQFCAAAzAAAxABNEMwAHMQASRDMACDQBD0M=",
      address: "ABUKAXTANWR6K6ZYV75DWJEPVWWOU6SFUVRI6QHO44E4SIDLHBTD2CZ64A",
      size: 881,
      variables: [
        {name: "TMPL_ASSET_ID_1", type: "int", index: 15, length: 10},
        {name: "TMPL_ASSET_ID_2", type: "int", index: 5, length: 10},
        {name: "TMPL_VALIDATOR_APP_ID", type: "int", index: 74, length: 10}
      ],
      source:
        "https://github.com/tinymanorg/tinyman-contracts-v1/tree/dc9ab40c58b85c15d58f63a1507e18be76720dbb/contracts/pool_logicsig.teal.tmpl"
    },
    name: "pool_logicsig"
  },
  nt = {
    type: "app",
    approval_program: {
      bytecode:
        "BCAHAAHoB+UHBf///////////wHAhD0mDQFvAWUBcAJhMQJhMgJsdARzd2FwBG1pbnQBdAJjMQJwMQJjMgJwMjEZgQQSMRkhBBIRMRmBAhIRQATxMRkjEjEbIhIQQATjNhoAgAZjcmVhdGUSQATUMRkjEjYaAIAJYm9vdHN0cmFwEhBAA/MzAhIzAggINTQiK2I1ZSI0ZXAARDUBIicEYjVmNGZAABEiYCJ4CTEBCDMACAk1AkIACCI0ZnAARDUCIicFYjVnKDRlFlA1byI0b2I1PSg0ZhZQNXAiNHBiNT4oNGcWUDVxIjRxYjU/IipiNUA0ATQ9CTVHNAI0Pgk1SDEAKVA0ZRZQNXkxAClQNGYWUDV6MQApUDRnFlA1ezYaAIAGcmVkZWVtEkAAWjYaAIAEZmVlcxJAABw2GgAnBhI2GgAnBxIRNhoAgARidXJuEhFAAG0ANGdJRDMCERJEMwISRDMCFDIJEkQ0PzMCEgk1PzRAMwISCTVAIio0QGYiNHE0P2YjQzMCFDMCBzMCECMSTTYcARJENDREIigzAhEWUEpiNDQJZiMxAClQMwIRFlBKYjQ0CUlBAANmI0NIaCNDMgciJwhiCUk1+kEARiInCWIiJwpiNPodTEAANx4hBSMeHzX7SEhIIicLYiInDGI0+h1MQAAdHiEFIx4fNfxISEgiJwk0+2YiJws0/GYiJwgyB2YzAxIzAwgINTU2HAExABNENGdBACIiNGdwAEQ1BiIcNAYJND8INQQ2GgAnBhJAASA0ZzMEERJENhoAJwcSQABVNhwBMwQAEkQzBBI0Rx00BCMdH0hITEhJNRA0NAk1yTMEEjRIHTQEIx0fSEhMSEk1ETQ1CTXKNBA0ERBENEc0EAk1UTRINBEJNVI0BDMEEgk1U0ICCjYcATMCABJENEc0NAg1UTRINDUINVI0BCISQAAuNDQ0BB00RyMdH0hITEg0NTQEHTRIIx0fSEhMSEoNTUk0BAg1UzMEEgk1y0IBvyInBTMEEUk1Z2YoNGcWUDVxIjRncABERDRnNGUTRDRnNGYTRDMEEiQISR018DQ0NDUdNfFKDEAACBJENPA08Q5EMwQSJAgjCEkdNfA0NDQ1HTXxSg1AAAgSRDTwNPENRCQ1PzQEMwQSJAgINVNCAU82HAEzAgASRDMCETRlEjMDETRmEhBJNWRAABkzAhE0ZhIzAxE0ZRIQRDRINRI0RzUTQgAINEc1EjRINRM2GgGAAmZpEkAAWjYaAYACZm8SRDQ1JAs0Eh00EzQ1CSUdH0hITEgjCEk1FSINNDU0EwwQRDQ0NBUJNGRBABM1yTRHNBUINVE0SDQ1CTVSQgBnNco0SDQVCDVSNEc0NQk1UUIAVDQ0STUVJQs0Ex00EiQLNDQlCx4fSEhMSEk1FCINNBQ0EwwQRDQUNDUJNGRBABM1yjRHNDQINVE0SDQUCTVSQgATNck0RzQUCTVRNEg0NAg1UkIAADQVIQQLNAQdgaCcATQSHR9ISExISTUqNAQINVNCADsiKzYaARdJNWVmIicENhoCF0k1ZmY0ZXEDRIABLVCABEFMR080ZkEABkg0ZnEDRFAzAiZJFYEPTFISQyIqNEA0KghmIjRxND80Kgg0ywhmIjRvND00yQhmIjRwND40yghmIoACczE0UWYigAJzMjRSZiInCjRSIQYdNFEjHR9ISExIZiInDDRRIQYdNFIjHR9ISExIZiKAA2lsdDRTZjTLQQAJIzR7SmI0ywhmNMlBAAkjNHlKYjTJCGY0ykEACSM0ekpiNMoIZiNDI0MiQw==",
      address: "BUQHXHPLMYUVS3P2INJ2EUJFCSNT6LNUGXVM6T2SZ27TDRDYLUMWCFYW3E",
      size: 1351,
      variables: [],
      source:
        "https://github.com/tinymanorg/tinyman-contracts-v1/tree/dc9ab40c58b85c15d58f63a1507e18be76720dbb/contracts/validator_approval.teal"
    },
    clear_program: {
      bytecode: "BIEB",
      address: "P7GEWDXXW5IONRW6XRIRVPJCT2XXEQGOBGG65VJPBUOYZEJCBZWTPHS3VQ",
      size: 3,
      variables: [],
      source:
        "https://github.com/tinymanorg/tinyman-contracts-v1/tree/dc9ab40c58b85c15d58f63a1507e18be76720dbb/contracts/validator_clear_state.teal"
    },
    global_state_schema: {num_uints: 0, num_byte_slices: 0},
    local_state_schema: {num_uints: 16, num_byte_slices: 0},
    name: "validator_app"
  };
function rt(t) {
  for (var e = []; ; ) {
    var n = 127 & t;
    if (!(t >>= 7)) {
      e.push(n);
      break;
    }
    e.push(128 | n);
  }
  return e;
}
var at =
  (d((Z = {}), tt.V1_1, {testnet: 62368684, mainnet: 552635992}),
  d(Z, tt.V2, {testnet: 113134165, mainnet: 552635992}),
  Z);
function st(t, e) {
  var n = at[e][t];
  if (!n)
    throw new Error(
      "No Validator App exists for "
        .concat(t, " network with ")
        .concat(e, " contract version")
    );
  return n;
}
function ot() {
  return (ot = c(
    i().mark(function t(e) {
      var n, a, s, o, u, c;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (a = e.network),
                (s = e.contractVersion),
                (o = e.initiatorAddr),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (u = t.sent),
                (c = r.default.makeApplicationOptInTxnFromObject({
                  from: o,
                  appIndex: st(a, s),
                  suggestedParams: u
                })),
                t.abrupt("return", [{txn: c, signers: [o]}])
              );
            case 6:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function it() {
  return (it = c(
    i().mark(function t(e) {
      var n, a, s, o, u, c;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (a = e.network),
                (s = e.contractVersion),
                (o = e.initiatorAddr),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (u = t.sent),
                (c = r.default.makeApplicationClearStateTxnFromObject({
                  from: o,
                  appIndex: st(a, s),
                  suggestedParams: u
                })),
                t.abrupt("return", [{txn: c, signers: [o]}])
              );
            case 6:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
var ut = f(function t(n, r) {
    p(this, t),
      (this.validatorApprovalContract = e.toByteArray(n.approval_program.bytecode)),
      (this.validatorClearStateContract = e.toByteArray(n.clear_program.bytecode)),
      (this.schema = {
        numLocalInts: n.local_state_schema.num_uints,
        numLocalByteSlices: n.local_state_schema.num_byte_slices,
        numGlobalInts: n.global_state_schema.num_uints,
        numGlobalByteSlices: n.global_state_schema.num_byte_slices
      });
  }),
  ct = (function (n) {
    A(a, ut);
    var r = E(a);
    function a(t, e) {
      var n;
      return (
        p(this, a),
        ((n = r.call(this, t, e)).poolLogicSigContractTemplate = e.logic.bytecode),
        (n.templateVariables = e.logic.variables),
        n
      );
    }
    return (
      f(a, [
        {
          key: "generateLogicSigAccountForPool",
          value: function (n) {
            var r = n.network,
              a = n.asset1ID,
              s = n.asset2ID;
            return (function (n) {
              var r = n.validatorAppID,
                a = n.poolLogicSigContractTemplate,
                s = n.templateVariables,
                o = n.asset1ID,
                i = n.asset2ID;
              if (o === i) throw new Error("Assets are the same");
              if (i > o) {
                var u = o;
                (o = i), (i = u);
              }
              var c = Array.from(e.toByteArray(a)),
                p = {asset_id_1: o, asset_id_2: i, validator_app_id: r},
                l = 0;
              s.sort(function (t, e) {
                return t.index - e.index;
              });
              for (var f = 0; f < s.length; f++) {
                var d = s[f],
                  A = p[d.name.split("TMPL_")[1].toLowerCase()],
                  g = d.index - l,
                  m = g + d.length,
                  I = rt(A);
                (l += d.length - I.length),
                  (c = c.slice(0, g).concat(I).concat(c.slice(m)));
              }
              var h = new Uint8Array(c);
              return new t.LogicSigAccount(h);
            })({
              validatorAppID: st(r, tt.V1_1),
              asset1ID: a,
              asset2ID: s,
              poolLogicSigContractTemplate: this.poolLogicSigContractTemplate,
              templateVariables: this.templateVariables
            });
          }
        }
      ]),
      a
    );
  })(),
  pt = (function (n) {
    A(a, ut);
    var r = E(a);
    function a(t, e) {
      var n;
      return (
        p(this, a),
        ((n = r.call(this, t, e)).poolLogicSigContractTemplate = e.logic.bytecode),
        n
      );
    }
    return (
      f(a, [
        {
          key: "generateLogicSigAccountForPool",
          value: function (n) {
            var r = n.network,
              a = n.asset1ID,
              s = n.asset2ID;
            return (function (n) {
              var r = n.validatorAppID,
                a = n.poolLogicSigContractTemplate,
                s = n.asset1ID,
                o = n.asset2ID;
              if (s === o) throw new Error("Assets are the same");
              if (o > s) {
                var i = s;
                (s = o), (o = i);
              }
              var u = Array.from(e.toByteArray(a)),
                c = Array.from(rt(r)),
                p = Array.from(rt(s)),
                l = Array.from(rt(o));
              u.slice(0, 3).concat([].concat(c, p, l)).concat(u.slice(27));
              var f = new Uint8Array(u);
              return new t.LogicSigAccount(f);
            })({
              validatorAppID: st(r, tt.V2),
              asset1ID: a,
              asset2ID: s,
              poolLogicSigContractTemplate: this.poolLogicSigContractTemplate
            });
          }
        }
      ]),
      a
    );
  })(),
  lt = new ct(nt, et),
  ft = new pt(nt, {
    type: "logicsig",
    logic: {bytecode: "BoAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgQBbNQA0ADEYEkQxGYEBEkSBAUM="},
    name: "pool_logicsig"
  });
function dt(t) {
  return (function (t) {
    return t === tt.V2;
  })(t)
    ? ft
    : lt;
}
function At(t) {
  var e = t["apps-total-schema"];
  return (
    1e5 +
    1e5 * (t.assets || []).length +
    1e5 * (t["created-apps"] || []).length +
    1e5 * (t["apps-local-state"] || []).length +
    5e4 * ((e && e["num-byte-slice"]) || 0) +
    28500 * ((e && e["num-uint"]) || 0) +
    1e5 * (t["apps-total-extra-pages"] || 0)
  );
}
var gt,
  mt,
  It = q("e");
function ht(t) {
  return xt.apply(this, arguments);
}
function xt() {
  return (xt = c(
    i().mark(function n(a) {
      var s, o, u, c, p, l, f, d, A, g, m, I, h, x, y, E, v, T, D, w, N;
      return i().wrap(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                return (
                  (s = a.client),
                  (o = a.pool),
                  (u = a.accountAddr),
                  (n.next = 3),
                  s.accountInformation(u).setIntDecoding(t.IntDecoding.BIGINT).do()
                );
              case 3:
                (c = n.sent),
                  (p = c["apps-local-state"] || []),
                  (l = 0n),
                  (f = 0n),
                  (d = 0n),
                  (A = o.account.address()),
                  (g = b(p)),
                  (n.prev = 10),
                  g.s();
              case 12:
                if ((m = g.n()).done) {
                  n.next = 31;
                  break;
                }
                if ((I = m.value).id == o.validatorAppID) {
                  n.next = 16;
                  break;
                }
                return n.abrupt("continue", 29);
              case 16:
                if ((h = I["key-value"])) {
                  n.next = 19;
                  break;
                }
                return n.abrupt("break", 31);
              case 19:
                (x = M(h)),
                  (y = e.fromByteArray(
                    O([
                      r.default.decodeAddress(A).publicKey,
                      It,
                      r.default.encodeUint64(o.asset1ID)
                    ])
                  )),
                  (E = e.fromByteArray(
                    O([
                      r.default.decodeAddress(A).publicKey,
                      It,
                      r.default.encodeUint64(o.asset2ID)
                    ])
                  )),
                  (v = e.fromByteArray(
                    O([
                      r.default.decodeAddress(A).publicKey,
                      It,
                      r.default.encodeUint64(o.liquidityTokenID)
                    ])
                  )),
                  (T = x[y]),
                  (D = x[E]),
                  (w = x[v]),
                  "bigint" == typeof T && (l = T),
                  "bigint" == typeof D && (f = D),
                  "bigint" == typeof w && (d = w);
              case 29:
                n.next = 12;
                break;
              case 31:
                n.next = 36;
                break;
              case 33:
                (n.prev = 33), (n.t0 = n.catch(10)), g.e(n.t0);
              case 36:
                return (n.prev = 36), g.f(), n.finish(36);
              case 39:
                if (
                  !(
                    (N = {excessAsset1: l, excessAsset2: f, excessLiquidityTokens: d})
                      .excessAsset1 < 0n ||
                    N.excessAsset2 < 0n ||
                    N.excessLiquidityTokens < 0n
                  )
                ) {
                  n.next = 42;
                  break;
                }
                throw new Error("Invalid account excess: ".concat(N));
              case 42:
                return n.abrupt("return", N);
              case 43:
              case "end":
                return n.stop();
            }
        },
        n,
        null,
        [[10, 33, 36, 39]]
      );
    })
  )).apply(this, arguments);
}
function yt() {
  return (yt = c(
    i().mark(function t(n) {
      var a, s, o, u, c, p, l, f, d, A, g, m, I, h, x;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (a = n.client),
                (s = n.accountAddr),
                (o = n.validatorAppID),
                (t.next = 3),
                a.accountInformation(s).setIntDecoding("bigint").do()
              );
            case 3:
              if (
                ((u = t.sent),
                (c = u["apps-local-state"] || []),
                (p = c.find(function (t) {
                  return t.id == o;
                })),
                (l = []),
                p && p["key-value"])
              )
                for (
                  f = M(p["key-value"]), d = 0, A = Object.entries(f);
                  d < A.length;
                  d++
                )
                  (g = A[d]),
                    (m = v(g, 2)),
                    (I = m[0]),
                    (h = m[1]),
                    41 === (x = e.toByteArray(I)).length &&
                      101 === x[32] &&
                      l.push({
                        poolAddress: r.default.encodeAddress(x.slice(0, 32)),
                        assetID: r.default.decodeUint64(x.slice(33, 41), "safe"),
                        amount: parseInt(h)
                      });
              return t.abrupt("return", l);
            case 9:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
!(function (t) {
  (t.NOT_CREATED = "not created"),
    (t.BOOTSTRAP = "bootstrap"),
    (t.READY = "ready"),
    (t.ERROR = "error");
})(gt || (gt = {}));
var Et =
  (d((mt = {}), tt.V1_1, {asset1: btoa("asset_1_id"), asset2: btoa("asset_2_id")}),
  d(mt, tt.V2, {asset1: btoa("a1"), asset2: btoa("a2")}),
  mt);
function vt(t) {
  return Tt.apply(this, arguments);
}
function Tt() {
  return (Tt = c(
    i().mark(function t(e) {
      var n, r, a, s, o, u, c, p, l, f, d;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (r = e.network),
                (a = e.contractVersion),
                (s = e.asset1ID),
                (o = e.asset2ID),
                (u = dt(a)),
                (c = u.generateLogicSigAccountForPool(e)),
                (p = st(r, a)),
                (l = c.address()),
                (f = {
                  account: c,
                  validatorAppID: p,
                  asset1ID: Math.max(s, o),
                  asset2ID: Math.min(s, o),
                  status: gt.NOT_CREATED,
                  contractVersion: a
                }),
                (t.next = 8),
                kt({client: n, address: l, network: r, contractVersion: a})
              );
            case 8:
              return (
                (d = t.sent) &&
                  ((f.asset1ID = d.asset1ID),
                  (f.asset2ID = d.asset2ID),
                  (f.liquidityTokenID = d.liquidityTokenID),
                  (f.status = gt.READY)),
                t.abrupt("return", f)
              );
            case 11:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
var Dt = q("o"),
  bt = 0xffffffffffffffffn;
function wt() {
  return (wt = c(
    i().mark(function n(a, s) {
      var o, u, c, p, l, f, d, A, g, m, I, h, x, y, E, v, T, D, w, N, S, _, k, B, R, P;
      return i().wrap(
        function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                return (
                  (n.next = 2),
                  a
                    .accountInformation(s.account.address())
                    .setIntDecoding(t.IntDecoding.BIGINT)
                    .do()
                );
              case 2:
                (o = n.sent),
                  (u = o["apps-local-state"] || []),
                  (c = 0n),
                  (p = 0n),
                  (l = 0n),
                  (f = b(u)),
                  (n.prev = 8),
                  f.s();
              case 10:
                if ((d = f.n()).done) {
                  n.next = 29;
                  break;
                }
                if ((A = d.value).id == s.validatorAppID) {
                  n.next = 14;
                  break;
                }
                return n.abrupt("continue", 27);
              case 14:
                if ((g = A["key-value"])) {
                  n.next = 17;
                  break;
                }
                return n.abrupt("break", 29);
              case 17:
                (m = M(g)),
                  (I = e.fromByteArray(O([Dt, r.default.encodeUint64(s.asset1ID)]))),
                  (h = e.fromByteArray(O([Dt, r.default.encodeUint64(s.asset2ID)]))),
                  (x = e.fromByteArray(
                    O([Dt, r.default.encodeUint64(s.liquidityTokenID)])
                  )),
                  (y = m[I]),
                  (E = m[h]),
                  (v = m[x]),
                  "bigint" == typeof y && (c = y),
                  "bigint" == typeof E && (p = E),
                  "bigint" == typeof v && (l = v);
              case 27:
                n.next = 10;
                break;
              case 29:
                n.next = 34;
                break;
              case 31:
                (n.prev = 31), (n.t0 = n.catch(8)), f.e(n.t0);
              case 34:
                return (n.prev = 34), f.f(), n.finish(34);
              case 37:
                (T = 0n), (D = 0n), (w = 0n), (N = b(o.assets));
                try {
                  for (N.s(); !(S = N.n()).done; )
                    (_ = S.value),
                      (k = _["asset-id"]),
                      (B = _.amount),
                      k == s.asset1ID
                        ? (T = BigInt(B))
                        : k == s.asset2ID
                        ? (D = BigInt(B))
                        : k == s.liquidityTokenID && (w = BigInt(B));
                } catch (t) {
                  N.e(t);
                } finally {
                  N.f();
                }
                if (
                  (0 === s.asset2ID && ((R = U(o)), (D = BigInt(o.amount) - R)),
                  !(
                    (P = {
                      round: Number(o.round),
                      asset1: T - c,
                      asset2: D - p,
                      issuedLiquidity: bt - w + l
                    }).asset1 < 0n ||
                    P.asset2 < 0n ||
                    P.issuedLiquidity < 0n ||
                    P.issuedLiquidity > bt
                  ))
                ) {
                  n.next = 49;
                  break;
                }
                throw (
                  ((P.asset1 = Number(P.asset1)),
                  (P.asset2 = Number(P.asset2)),
                  (P.issuedLiquidity = Number(P.issuedLiquidity)),
                  new Error("Invalid pool reserves: ".concat(JSON.stringify(P))))
                );
              case 49:
                return n.abrupt("return", P);
              case 50:
              case "end":
                return n.stop();
            }
        },
        n,
        null,
        [[8, 31, 34, 37]]
      );
    })
  )).apply(this, arguments);
}
var Nt,
  St,
  _t = {};
function kt(t) {
  return Mt.apply(this, arguments);
}
function Mt() {
  return (
    (Mt = c(
      i().mark(function t(e) {
        var n,
          r,
          a,
          s,
          o,
          u,
          c,
          p,
          l,
          f,
          d,
          A,
          g = arguments;
        return i().wrap(function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                if (
                  ((n = e.client),
                  (r = e.address),
                  (a = e.network),
                  (s = e.contractVersion),
                  !(o = g.length > 1 && void 0 !== g[1] ? g[1] : _t)[r])
                ) {
                  t.next = 4;
                  break;
                }
                return t.abrupt("return", o[r]);
              case 4:
                return (t.next = 6), n.accountInformation(r).do();
              case 6:
                return (
                  (u = t.sent),
                  (c = u["apps-local-state"].find(function (t) {
                    return t.id == st(a, s);
                  })),
                  (p = null),
                  c &&
                    ((l = c["key-value"]),
                    (f = M(l)),
                    (d = u["created-assets"][0]),
                    (A = d.index),
                    (p = {
                      asset1ID: f[Et[s].asset1],
                      asset2ID: f[Et[s].asset2],
                      liquidityTokenID: A
                    }),
                    (o[r] = p)),
                  t.abrupt("return", p)
                );
              case 11:
              case "end":
                return t.stop();
            }
        }, t);
      })
    )),
    Mt.apply(this, arguments)
  );
}
function Ot(t) {
  return Boolean(t && !(t.asset1 + t.asset2));
}
function Bt(t, e) {
  return (
    3e5 +
    (0 === t ? 0 : 1e5) +
    1e5 +
    28500 * lt.schema.numLocalInts +
    5e4 * lt.schema.numLocalByteSlices +
    e.liquidityTokenCreateTxn +
    e.asset1OptinTxn +
    e.asset2OptinTxn +
    e.validatorAppCallTxn
  );
}
function Rt() {
  return (Rt = c(
    i().mark(function t(e) {
      var n, a, s, o, u, c, p, l, f, d, A, g, m, I, h, x, y, E, v;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (a = e.validatorAppID),
                (s = e.asset1ID),
                (o = e.asset2ID),
                (u = e.asset1UnitName),
                (c = e.asset2UnitName),
                (p = e.initiatorAddr),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (l = t.sent),
                (f =
                  s > o
                    ? {asset1: {id: s, unitName: u}, asset2: {id: o, unitName: c}}
                    : {asset1: {id: o, unitName: c}, asset2: {id: s, unitName: u}}),
                (d = lt.generateLogicSigAccountForPool({
                  asset1ID: f.asset1.id,
                  asset2ID: f.asset2.id,
                  network: "testnet"
                })),
                (A = d.address()),
                (g = r.default.makeApplicationOptInTxnFromObject({
                  from: A,
                  appIndex: a,
                  appArgs: [
                    q("bootstrap"),
                    r.default.encodeUint64(f.asset1.id),
                    r.default.encodeUint64(f.asset2.id)
                  ],
                  foreignAssets:
                    0 == f.asset2.id ? [f.asset1.id] : [f.asset1.id, f.asset2.id],
                  suggestedParams: l
                })),
                (m = r.default.makeAssetCreateTxnWithSuggestedParamsFromObject({
                  from: A,
                  total: 0xffffffffffffffffn,
                  decimals: 6,
                  defaultFrozen: !1,
                  unitName: $.DEFAULT,
                  assetName: "TinymanPool1.1 "
                    .concat(f.asset1.unitName, "-")
                    .concat(f.asset2.unitName),
                  assetURL: "https://tinyman.org",
                  suggestedParams: l
                })),
                (I = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: A,
                  to: A,
                  assetIndex: f.asset1.id,
                  amount: 0,
                  suggestedParams: l
                })),
                (h =
                  0 === f.asset2.id
                    ? null
                    : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: A,
                        to: A,
                        assetIndex: f.asset2.id,
                        amount: 0,
                        suggestedParams: l
                      })),
                (x = r.default.makePaymentTxnWithSuggestedParamsFromObject({
                  from: p,
                  to: A,
                  amount: Bt(f.asset2.id, {
                    liquidityTokenCreateTxn: m.fee,
                    asset1OptinTxn: I.fee,
                    asset2OptinTxn: h ? h.fee : 0,
                    validatorAppCallTxn: g.fee
                  }),
                  suggestedParams: l
                })),
                (y = [x, g, m, I]),
                h && y.push(h),
                (E = r.default.assignGroupID(y)),
                (v = [
                  {txn: E[0], signers: [p]},
                  {txn: E[1], signers: [A]},
                  {txn: E[2], signers: [A]},
                  {txn: E[3], signers: [A]}
                ]),
                E[4] && v.push({txn: E[4], signers: [A]}),
                t.abrupt("return", v)
              );
            case 18:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Pt() {
  return (Pt = c(
    i().mark(function t(e) {
      var n, a, s, o, u, c, p, l, f, d, A, g;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.txGroup),
                (a = e.initiatorSigner),
                (s = e.asset1ID),
                (o = e.asset2ID),
                (t.next = 3),
                a([n])
              );
            case 3:
              return (
                (u = t.sent),
                (c = v(u, 1)),
                (p = c[0]),
                (l = s > o ? {asset1ID: s, asset2ID: o} : {asset1ID: o, asset2ID: s}),
                (f = lt.generateLogicSigAccountForPool({
                  asset1ID: l.asset1ID,
                  asset2ID: l.asset2ID,
                  network: "testnet"
                })),
                (d = f),
                (A = []),
                (g = n.map(function (t, e) {
                  if (e === Nt.FUNDING_TXN) return A.push(t.txn.txID().toString()), p;
                  var n = r.default.signLogicSigTransactionObject(t.txn, d),
                    a = n.txID,
                    s = n.blob;
                  return A.push(a), s;
                })),
                t.abrupt("return", {signedTxns: g, txnIDs: A})
              );
            case 12:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Qt(t) {
  return Ct.apply(this, arguments);
}
function Ct() {
  return (Ct = c(
    i().mark(function t(e) {
      var n, r, a, s, o;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (n = e.client),
                  (r = e.signedTxns),
                  (a = e.txnIDs),
                  (t.prev = 1),
                  (t.next = 4),
                  n.sendRawTransaction(r).do()
                );
              case 4:
                return (t.next = 6), j(n, a[Nt.LIQUIDITY_TOKEN_CREATE]);
              case 6:
                if (((s = t.sent), "number" == typeof (o = s["asset-index"]))) {
                  t.next = 10;
                  break;
                }
                throw new Error("Generated ID is not valid: got ".concat(o));
              case 10:
                return t.abrupt("return", {liquidityTokenID: o});
              case 13:
                throw (
                  ((t.prev = 13),
                  (t.t0 = t.catch(1)),
                  new k(
                    t.t0,
                    "We encountered something unexpected while bootstraping the pool. Try again later."
                  ))
                );
              case 16:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[1, 13]]
      );
    })
  )).apply(this, arguments);
}
function Ut() {
  return (Ut = c(
    i().mark(function t(e, n, r, a) {
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (t.next = 2), Qt({client: e, signedTxns: r, txnIDs: a});
            case 2:
              return t.abrupt(
                "return",
                vt({
                  client: e,
                  network: "testnet",
                  asset1ID: n.asset1ID,
                  asset2ID: n.asset2ID,
                  contractVersion: tt.V1_1
                })
              );
            case 3:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
!(function (t) {
  (t[(t.FUNDING_TXN = 0)] = "FUNDING_TXN"),
    (t[(t.VALIDATOR_APP_CALL = 1)] = "VALIDATOR_APP_CALL"),
    (t[(t.LIQUIDITY_TOKEN_CREATE = 2)] = "LIQUIDITY_TOKEN_CREATE"),
    (t[(t.ASSET1_OPT_IN = 3)] = "ASSET1_OPT_IN"),
    (t[(t.ASSET2_OPT_IN = 4)] = "ASSET2_OPT_IN");
})(Nt || (Nt = {})),
  (function (t) {
    (t[(t.FEE_TXN = 0)] = "FEE_TXN"),
      (t[(t.VALIDATOR_APP_CALL_TXN = 1)] = "VALIDATOR_APP_CALL_TXN"),
      (t[(t.ASSET1_OUT_TXN = 2)] = "ASSET1_OUT_TXN"),
      (t[(t.ASSET2_OUT_TXN = 3)] = "ASSET2_OUT_TXN"),
      (t[(t.LIQUDITY_IN_TXN = 4)] = "LIQUDITY_IN_TXN");
  })(St || (St = {}));
function Lt() {
  return (Lt = c(
    i().mark(function t(e) {
      var n, s, o, u, c, p, l, f, d, A, g, m, I, h, x, y, E, v;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (s = e.pool),
                (o = e.liquidityIn),
                (u = e.asset1Out),
                (c = e.asset2Out),
                (p = e.slippage),
                (l = e.initiatorAddr),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (f = t.sent),
                (d = s.account.address()),
                (A = r.default.makeApplicationNoOpTxnFromObject({
                  from: d,
                  appIndex: s.validatorAppID,
                  appArgs: [q("burn")],
                  accounts: [l],
                  foreignAssets:
                    0 == s.asset2ID
                      ? [s.asset1ID, s.liquidityTokenID]
                      : [s.asset1ID, s.asset2ID, s.liquidityTokenID],
                  suggestedParams: f
                })),
                (g = J("negative", p, u)),
                (m = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: d,
                  to: l,
                  assetIndex: s.asset1ID,
                  amount: g,
                  suggestedParams: f
                })),
                (I = J("negative", p, c)),
                (h =
                  0 === s.asset2ID
                    ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                        from: d,
                        to: l,
                        amount: I,
                        suggestedParams: f
                      })
                    : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: d,
                        to: l,
                        assetIndex: s.asset2ID,
                        amount: I,
                        suggestedParams: f
                      })),
                (x = r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                  from: l,
                  to: d,
                  assetIndex: s.liquidityTokenID,
                  amount: o,
                  suggestedParams: f
                })),
                (y = A.fee + m.fee + h.fee),
                (E = r.default.makePaymentTxnWithSuggestedParamsFromObject({
                  from: l,
                  to: d,
                  amount: y,
                  note: a,
                  suggestedParams: f
                })),
                (y += x.fee + E.fee),
                (v = r.default.assignGroupID([E, A, m, h, x])),
                t.abrupt("return", [
                  {txn: v[St.FEE_TXN], signers: [l]},
                  {txn: v[St.VALIDATOR_APP_CALL_TXN], signers: [d]},
                  {txn: v[St.ASSET1_OUT_TXN], signers: [d]},
                  {txn: v[St.ASSET2_OUT_TXN], signers: [d]},
                  {txn: v[St.LIQUDITY_IN_TXN], signers: [l]}
                ])
              );
            case 16:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function jt() {
  return (jt = c(
    i().mark(function t(e) {
      var n, a, s, o, u, c, p, l, f;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.pool),
                (a = e.txGroup),
                (s = e.initiatorSigner),
                (t.next = 3),
                s([a])
              );
            case 3:
              return (
                (o = t.sent),
                (u = v(o, 2)),
                (c = u[0]),
                (p = u[1]),
                (l = n.account.lsig),
                (f = a.map(function (t, e) {
                  return e === St.FEE_TXN
                    ? c
                    : e === St.LIQUDITY_IN_TXN
                    ? p
                    : r.default.signLogicSigTransactionObject(t.txn, l).blob;
                })),
                t.abrupt("return", f)
              );
            case 10:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Ft() {
  return (Ft = c(
    i().mark(function t(e) {
      var n, r, a, s, o, u, c, p, l, f, d, A, g, m, I, h, x, y;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (n = e.client),
                  (r = e.pool),
                  (a = e.txGroup),
                  (s = e.signedTxns),
                  (o = e.initiatorAddr),
                  (t.prev = 1),
                  (u = a[St.ASSET1_OUT_TXN].txn.amount),
                  (c = a[St.ASSET2_OUT_TXN].txn.amount),
                  (p = a[St.LIQUDITY_IN_TXN].txn.amount),
                  (t.next = 7),
                  ht({client: n, pool: r, accountAddr: o})
                );
              case 7:
                return (l = t.sent), (t.next = 10), X(n, [s]);
              case 10:
                return (
                  (f = t.sent),
                  (d = v(f, 1)),
                  (A = d[0]),
                  (g = A.confirmedRound),
                  (m = A.txnID),
                  (t.next = 17),
                  ht({client: n, pool: r, accountAddr: o})
                );
              case 17:
                return (
                  (I = t.sent),
                  (h = I.excessAsset1 - l.excessAsset1) < 0n && (h = 0n),
                  (x = I.excessAsset2 - l.excessAsset2) < 0n && (x = 0n),
                  t.abrupt("return", {
                    round: g,
                    fees: Y(a),
                    asset1ID: r.asset1ID,
                    asset1Out: BigInt(u) + h,
                    asset2ID: r.asset2ID,
                    asset2Out: BigInt(c) + x,
                    liquidityID: r.liquidityTokenID,
                    liquidityIn: BigInt(p),
                    excessAmounts: [
                      {
                        assetID: r.asset1ID,
                        excessAmountForBurning: h,
                        totalExcessAmount: I.excessAsset1
                      },
                      {
                        assetID: r.asset2ID,
                        excessAmountForBurning: x,
                        totalExcessAmount: I.excessAsset2
                      }
                    ],
                    txnID: m,
                    groupID: W(a)
                  })
                );
              case 25:
                throw (
                  ((t.prev = 25),
                  (t.t0 = t.catch(1)),
                  "SlippageTolerance" ===
                    (y = new k(
                      t.t0,
                      "We encountered something unexpected while burning liquidity. Try again later."
                    )).type &&
                    y.setMessage(
                      "The burn failed due to too much slippage in the price. Please adjust the slippage tolerance and try again."
                    ),
                  y)
                );
              case 30:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[1, 25]]
      );
    })
  )).apply(this, arguments);
}
var Jt,
  Vt,
  Gt = 3n,
  Xt = 1000n;
function zt() {
  return (zt = c(
    i().mark(function t(e) {
      var n, a, s, o, u, c, p, l;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.pool),
                (a = e.txGroup),
                (s = e.initiatorSigner),
                (t.next = 3),
                s([a])
              );
            case 3:
              return (
                (o = t.sent),
                (u = v(o, 2)),
                (c = u[0]),
                (p = u[1]),
                (l = a.map(function (t, e) {
                  return e === Vt.FEE_TXN_INDEX
                    ? c
                    : e === Vt.ASSET_IN_TXN_INDEX
                    ? p
                    : r.default.signLogicSigTransactionObject(t.txn, n.account.lsig).blob;
                })),
                t.abrupt("return", l)
              );
            case 9:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
(exports.SwapType = void 0),
  ((Jt = exports.SwapType || (exports.SwapType = {})).FixedInput = "fixed-input"),
  (Jt.FixedOutput = "fixed-output"),
  (function (t) {
    (t[(t.FEE_TXN_INDEX = 0)] = "FEE_TXN_INDEX"),
      (t[(t.VALIDATOR_APP_CALL_TXN_INDEX = 1)] = "VALIDATOR_APP_CALL_TXN_INDEX"),
      (t[(t.ASSET_IN_TXN_INDEX = 2)] = "ASSET_IN_TXN_INDEX"),
      (t[(t.ASSET_OUT_TXN_INDEX = 3)] = "ASSET_OUT_TXN_INDEX");
  })(Vt || (Vt = {}));
function Yt() {
  return (Yt = c(
    i().mark(function t(e) {
      var n, s, o, u, c, p, l, f, d, A, g, m, I, h, x, y, E;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (s = e.pool),
                (o = e.swapType),
                (u = e.assetIn),
                (c = e.assetOut),
                (p = e.slippage),
                (l = e.initiatorAddr),
                (f = e.poolAddress),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (d = t.sent),
                (A = [q("swap"), o === exports.SwapType.FixedInput ? q("fi") : q("fo")]),
                (g = r.default.makeApplicationNoOpTxnFromObject({
                  from: f,
                  appIndex: s.validatorAppID,
                  appArgs: A,
                  accounts: [l],
                  foreignAssets:
                    0 == s.asset2ID
                      ? [s.asset1ID, s.liquidityTokenID]
                      : [s.asset1ID, s.asset2ID, s.liquidityTokenID],
                  suggestedParams: d
                })),
                (m =
                  o === exports.SwapType.FixedOutput
                    ? J("positive", p, u.amount)
                    : u.amount),
                (I =
                  0 === u.assetID
                    ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                        from: l,
                        to: f,
                        amount: m,
                        suggestedParams: d
                      })
                    : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: l,
                        to: f,
                        assetIndex: u.assetID,
                        amount: m,
                        suggestedParams: d
                      })),
                (h =
                  o === exports.SwapType.FixedInput
                    ? J("negative", p, c.amount)
                    : c.amount),
                (x =
                  0 === c.assetID
                    ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                        from: f,
                        to: l,
                        amount: h,
                        suggestedParams: d
                      })
                    : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: f,
                        to: l,
                        assetIndex: c.assetID,
                        amount: h,
                        suggestedParams: d
                      })),
                (y = r.default.makePaymentTxnWithSuggestedParamsFromObject({
                  from: l,
                  to: f,
                  amount: g.fee + x.fee,
                  note: a,
                  suggestedParams: d
                })),
                (E = r.default.assignGroupID([y, g, I, x])),
                t.abrupt("return", [
                  {txn: E[0], signers: [l]},
                  {txn: E[1], signers: [f]},
                  {txn: E[2], signers: [l]},
                  {txn: E[3], signers: [f]}
                ])
              );
            case 13:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Wt(t) {
  return qt.apply(this, arguments);
}
function qt() {
  return (qt = c(
    i().mark(function t(e) {
      var n, r, a, s, o, u, c, p, l, f, d, A, g, m, I, h;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (r = e.pool),
                (a = e.signedTxns),
                (s = e.assetIn),
                (o = e.assetOut),
                (u = e.initiatorAddr),
                (t.next = 3),
                ht({client: n, pool: r, accountAddr: u})
              );
            case 3:
              return (c = t.sent), (t.next = 6), X(n, [a]);
            case 6:
              return (
                (p = t.sent),
                (l = v(p, 1)),
                (f = l[0]),
                (d = f.confirmedRound),
                (A = f.txnID),
                (t.next = 13),
                ht({client: n, pool: r, accountAddr: u})
              );
            case 13:
              return (
                (g = t.sent),
                o.assetID === r.asset1ID
                  ? ((m = c.excessAsset1), (I = g.excessAsset1))
                  : ((m = c.excessAsset2), (I = g.excessAsset2)),
                (h = I - m) < 0n && (h = 0n),
                t.abrupt("return", {
                  round: d,
                  assetInID: s.assetID,
                  assetInAmount: BigInt(s.amount),
                  assetOutID: o.assetID,
                  assetOutAmount: BigInt(o.amount) + h,
                  excessAmount: {
                    assetID: o.assetID,
                    excessAmountForSwap: h,
                    totalExcessAmount: I
                  },
                  txnID: A
                })
              );
            case 18:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Ht(t) {
  return Zt.apply(this, arguments);
}
function Zt() {
  return (Zt = c(
    i().mark(function t(e) {
      var n, r, a, s, o, u, c, p, l, f, d, A, g, m, I, h;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (r = e.pool),
                (a = e.signedTxns),
                (s = e.assetIn),
                (o = e.assetOut),
                (u = e.initiatorAddr),
                (t.next = 3),
                ht({client: n, pool: r, accountAddr: u})
              );
            case 3:
              return (c = t.sent), (t.next = 6), X(n, [a]);
            case 6:
              return (
                (p = t.sent),
                (l = v(p, 1)),
                (f = l[0]),
                (d = f.confirmedRound),
                (A = f.txnID),
                (t.next = 13),
                ht({client: n, pool: r, accountAddr: u})
              );
            case 13:
              return (
                (g = t.sent),
                s.assetID === r.asset1ID
                  ? ((m = c.excessAsset1), (I = g.excessAsset1))
                  : ((m = c.excessAsset2), (I = g.excessAsset2)),
                (h = I - m) < 0n && (h = 0n),
                t.abrupt("return", {
                  round: d,
                  assetInID: s.assetID,
                  assetInAmount: BigInt(s.amount) - h,
                  assetOutID: o.assetID,
                  assetOutAmount: BigInt(o.amount),
                  excessAmount: {
                    assetID: s.assetID,
                    excessAmountForSwap: h,
                    totalExcessAmount: I
                  },
                  txnID: A
                })
              );
            case 18:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function Kt() {
  return (Kt = c(
    i().mark(function t(e) {
      var n, r, a, s, u, c, p, l, f, d;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                if (
                  ((n = e.client),
                  (r = e.pool),
                  (a = e.swapType),
                  (s = e.txGroup),
                  (u = e.signedTxns),
                  (c = e.initiatorAddr),
                  r.status === gt.READY)
                ) {
                  t.next = 3;
                  break;
                }
                throw new k(
                  {pool: r, swapType: a, txGroup: s},
                  "Trying to swap on a non-existent pool"
                );
              case 3:
                if (
                  ((t.prev = 3),
                  (p = {
                    assetID: s[Vt.ASSET_IN_TXN_INDEX].txn.assetIndex || 0,
                    amount: s[Vt.ASSET_IN_TXN_INDEX].txn.amount
                  }),
                  (l = {
                    assetID: s[Vt.ASSET_OUT_TXN_INDEX].txn.assetIndex || 0,
                    amount: s[Vt.ASSET_OUT_TXN_INDEX].txn.amount
                  }),
                  a !== exports.SwapType.FixedInput)
                ) {
                  t.next = 12;
                  break;
                }
                return (
                  (t.next = 9),
                  Wt({
                    client: n,
                    pool: r,
                    signedTxns: u,
                    assetIn: p,
                    assetOut: l,
                    initiatorAddr: c
                  })
                );
              case 9:
                (f = t.sent), (t.next = 15);
                break;
              case 12:
                return (
                  (t.next = 14),
                  Ht({
                    client: n,
                    pool: r,
                    signedTxns: u,
                    assetIn: p,
                    assetOut: l,
                    initiatorAddr: c
                  })
                );
              case 14:
                f = t.sent;
              case 15:
                return t.abrupt("return", o(o({}, f), {}, {groupID: W(s), fees: Y(s)}));
              case 18:
                throw (
                  ((t.prev = 18),
                  (t.t0 = t.catch(3)),
                  "SlippageTolerance" ===
                    (d = new k(
                      t.t0,
                      "We encountered something unexpected while swapping. Try again later."
                    )).type &&
                    d.setMessage(
                      "The swap failed due to too much slippage in the price. Please adjust the slippage tolerance and try again."
                    ),
                  d)
                );
              case 23:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[3, 18]]
      );
    })
  )).apply(this, arguments);
}
function $t() {
  return ($t = c(
    i().mark(function t(e) {
      var n, r, a, s, o, u, c, p, l, f;
      return i().wrap(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (n = e.client),
                  (r = e.pool),
                  (a = e.txGroup),
                  (s = e.initiatorSigner),
                  (t.prev = 1),
                  (t.next = 4),
                  te({txGroup: a, pool: r, initiatorSigner: s})
                );
              case 4:
                return (o = t.sent), (t.next = 7), X(n, [o]);
              case 7:
                return (
                  (u = t.sent),
                  (c = v(u, 1)),
                  (p = c[0]),
                  (l = p.txnID),
                  (f = p.confirmedRound),
                  t.abrupt("return", {
                    fees: Y(a),
                    confirmedRound: f,
                    txnID: l,
                    groupID: W(a)
                  })
                );
              case 15:
                throw (
                  ((t.prev = 15),
                  (t.t0 = t.catch(1)),
                  new k(
                    t.t0,
                    "We encountered something unexpected while redeeming. Try again later."
                  ))
                );
              case 18:
              case "end":
                return t.stop();
            }
        },
        t,
        null,
        [[1, 15]]
      );
    })
  )).apply(this, arguments);
}
function te(t) {
  return ee.apply(this, arguments);
}
function ee() {
  return (ee = c(
    i().mark(function t(e) {
      var n, a, s, o, u, c, p, l;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.txGroup),
                (a = e.pool),
                (s = e.initiatorSigner),
                (t.next = 3),
                s([n])
              );
            case 3:
              return (
                (o = t.sent),
                (u = v(o, 1)),
                (c = u[0]),
                (p = a.account.lsig),
                (l = n.map(function (t, e) {
                  return 0 === e
                    ? c
                    : r.default.signLogicSigTransactionObject(t.txn, p).blob;
                })),
                t.abrupt("return", l)
              );
            case 9:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function ne() {
  return (
    (ne = c(
      i().mark(function t(e) {
        var n, a, s, o, u, p;
        return i().wrap(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (
                    (n = e.client),
                    (a = e.data),
                    (s = e.initiatorSigner),
                    (t.prev = 1),
                    (o = a.map(function (t) {
                      var e = t.txGroup,
                        n = t.pool;
                      return {
                        txns: e,
                        txnFees: Y(e),
                        groupID: W(e),
                        lsig: n.account.lsig
                      };
                    })),
                    (t.next = 5),
                    s(
                      o.map(function (t) {
                        return t.txns;
                      })
                    )
                  );
                case 5:
                  return (
                    (u = t.sent),
                    (p = Promise.all(
                      o.map(function (t, e) {
                        return new Promise(
                          (function () {
                            var a = c(
                              i().mark(function a(s, o) {
                                var c, p, l, f, d, A;
                                return i().wrap(
                                  function (a) {
                                    for (;;)
                                      switch ((a.prev = a.next)) {
                                        case 0:
                                          return (
                                            (a.prev = 0),
                                            (c = t.txns.map(function (n, a) {
                                              return 0 === a
                                                ? u[e]
                                                : r.default.signLogicSigTransactionObject(
                                                    n.txn,
                                                    t.lsig
                                                  ).blob;
                                            })),
                                            (a.next = 4),
                                            X(n, [c])
                                          );
                                        case 4:
                                          (p = a.sent),
                                            (l = v(p, 1)),
                                            (f = l[0]),
                                            (d = f.txnID),
                                            (A = f.confirmedRound),
                                            s({
                                              fees: t.txnFees,
                                              groupID: t.groupID,
                                              txnID: d,
                                              confirmedRound: A
                                            }),
                                            (a.next = 15);
                                          break;
                                        case 12:
                                          (a.prev = 12), (a.t0 = a.catch(0)), o(a.t0);
                                        case 15:
                                        case "end":
                                          return a.stop();
                                      }
                                  },
                                  a,
                                  null,
                                  [[0, 12]]
                                );
                              })
                            );
                            return function (t, e) {
                              return a.apply(this, arguments);
                            };
                          })()
                        );
                      })
                    )),
                    t.abrupt("return", p)
                  );
                case 10:
                  throw (
                    ((t.prev = 10),
                    (t.t0 = t.catch(1)),
                    new k(
                      t.t0,
                      "We encountered something unexpected while redeeming. Try again later."
                    ))
                  );
                case 13:
                case "end":
                  return t.stop();
              }
          },
          t,
          null,
          [[1, 10]]
        );
      })
    )),
    ne.apply(this, arguments)
  );
}
function re() {
  return (re = c(
    i().mark(function t(e) {
      var n, s, o, u, c, p, l, f, d, A, g;
      return i().wrap(function (t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              return (
                (n = e.client),
                (s = e.pool),
                (o = e.assetID),
                (u = e.assetOut),
                (c = e.initiatorAddr),
                (p = e.poolAddress),
                (t.next = 3),
                n.getTransactionParams().do()
              );
            case 3:
              return (
                (l = t.sent),
                (f = r.default.makeApplicationNoOpTxnFromObject({
                  from: p,
                  appIndex: s.validatorAppID,
                  appArgs: [q("redeem")],
                  accounts: [c],
                  foreignAssets:
                    0 == s.asset2ID
                      ? [s.asset1ID, s.liquidityTokenID]
                      : [s.asset1ID, s.asset2ID, s.liquidityTokenID],
                  suggestedParams: l
                })),
                (d =
                  0 === o
                    ? r.default.makePaymentTxnWithSuggestedParamsFromObject({
                        from: p,
                        to: c,
                        amount: BigInt(u),
                        suggestedParams: l
                      })
                    : r.default.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: p,
                        to: c,
                        assetIndex: o,
                        amount: BigInt(u),
                        suggestedParams: l
                      })),
                (A = r.default.makePaymentTxnWithSuggestedParamsFromObject({
                  from: c,
                  to: p,
                  amount: f.fee + d.fee,
                  note: a,
                  suggestedParams: l
                })),
                (g = r.default.assignGroupID([A, f, d])),
                t.abrupt("return", [
                  {txn: g[0], signers: [c]},
                  {txn: g[1], signers: [p]},
                  {txn: g[2], signers: [p]}
                ])
              );
            case 9:
            case "end":
              return t.stop();
          }
      }, t);
    })
  )).apply(this, arguments);
}
function ae(e) {
  var n = e.suggestedParams,
    r = e.stakingAppID,
    a = e.initiatorAddr,
    s = e.liquidityAssetID,
    o = e.program,
    i = e.amount,
    u = t.encodeUint64(i),
    c = t.encodeUint64(o.id);
  return t.makeApplicationNoOpTxnFromObject({
    appIndex: r,
    from: a,
    suggestedParams: n,
    foreignAssets: [s],
    accounts: [o.accountAddress],
    appArgs: [q("commit"), u],
    note: O([q("tinymanStaking/v1:b"), c, t.encodeUint64(s), u])
  });
}
function se() {
  return (se = c(
    i().mark(function e(n) {
      var r, a, s, o, u, c, p, l, f, d, A;
      return i().wrap(function (e) {
        for (;;)
          switch ((e.prev = e.next)) {
            case 0:
              return (
                (r = n.client),
                (a = n.stakingAppID),
                (s = n.program),
                (o = n.requiredAssetID),
                (u = n.liquidityAssetID),
                (c = n.amount),
                (p = n.initiatorAddr),
                (e.next = 3),
                r.getTransactionParams().do()
              );
            case 3:
              if (
                ((l = e.sent),
                (f = ae({
                  suggestedParams: l,
                  stakingAppID: a,
                  program: s,
                  liquidityAssetID: u,
                  initiatorAddr: p,
                  amount: c
                })),
                (d = [f]),
                "number" != typeof o)
              ) {
                e.next = 10;
                break;
              }
              return (
                (A = t.makeApplicationNoOpTxnFromObject({
                  appIndex: a,
                  from: p,
                  suggestedParams: l,
                  foreignAssets: [o],
                  accounts: [s.accountAddress],
                  appArgs: [q("log_balance")]
                })),
                (d = t.assignGroupID([f, A])),
                e.abrupt("return", [
                  {txn: d[0], signers: [p]},
                  {txn: d[1], signers: [p]}
                ])
              );
            case 10:
              return e.abrupt("return", [{txn: d[0], signers: [p]}]);
            case 11:
            case "end":
              return e.stop();
          }
      }, e);
    })
  )).apply(this, arguments);
}
(exports.ALGO_ASSET = K),
  (exports.ALGO_ASSET_ID = 0),
  (exports.ASSET_OPT_IN_PROCESS_TXN_COUNT = 1),
  (exports.BASE_MINIMUM_BALANCE = 1e5),
  (exports.BURN_PROCESS_TXN_COUNT = 5),
  (exports.CONTRACT_VERSION = tt),
  (exports.LIQUIDITY_TOKEN_UNIT_NAME = $),
  (exports.MINIMUM_BALANCE_REQUIRED_PER_APP = 1e5),
  (exports.MINIMUM_BALANCE_REQUIRED_PER_ASSET = 1e5),
  (exports.MINIMUM_BALANCE_REQUIRED_PER_BYTE_SCHEMA = 5e4),
  (exports.MINIMUM_BALANCE_REQUIRED_PER_INT_SCHEMA_VALUE = 28500),
  (exports.MINIMUM_LIQUIDITY_MINTING_AMOUNT = 1e3),
  (exports.OPT_IN_VALIDATOR_APP_PROCESS_TXN_COUNT = 1),
  (exports.OPT_OUT_VALIDATOR_APP_PROCESS_TXN_COUNT = 1),
  (exports.REDEEM_PROCESS_TXN_COUNT = 3),
  (exports.SWAP_PROCESS_TXN_COUNT = 4),
  (exports.applySlippageToAmount = J),
  (exports.burnLiquidity = function (t) {
    return Ft.apply(this, arguments);
  }),
  (exports.calculateAccountMinimumRequiredBalance = At),
  (exports.calculatePoolBootstrapFundingTxnAmount = Bt),
  (exports.convertFromBaseUnits = V),
  (exports.convertToBaseUnits = function (t, e) {
    return G({decimalPlaces: 0}, Math.pow(10, Number(t)) * Number(e));
  }),
  (exports.createPool = function (t, e, n, r) {
    return Ut.apply(this, arguments);
  }),
  (exports.generateBootstrapTransactions = function (t) {
    return Rt.apply(this, arguments);
  }),
  (exports.generateBurnTxns = function (t) {
    return Lt.apply(this, arguments);
  }),
  (exports.generateOptIntoAssetTxns = function (t) {
    return H.apply(this, arguments);
  }),
  (exports.generateOptIntoValidatorTxns = function (t) {
    return ot.apply(this, arguments);
  }),
  (exports.generateOptOutOfValidatorTxns = function (t) {
    return it.apply(this, arguments);
  }),
  (exports.generateRedeemTxns = function (t) {
    return re.apply(this, arguments);
  }),
  (exports.generateSwapTransactions = function (t) {
    return Yt.apply(this, arguments);
  }),
  (exports.getAccountExcess = function (t) {
    return yt.apply(this, arguments);
  }),
  (exports.getAccountExcessWithinPool = ht),
  (exports.getAccountInformation = function (t, e) {
    return new Promise(
      (function () {
        var n = c(
          i().mark(function n(r, a) {
            var s;
            return i().wrap(
              function (n) {
                for (;;)
                  switch ((n.prev = n.next)) {
                    case 0:
                      return (n.prev = 0), (n.next = 3), t.accountInformation(e).do();
                    case 3:
                      (s = n.sent),
                        r(o(o({}, s), {}, {minimum_required_balance: At(s)})),
                        (n.next = 10);
                      break;
                    case 7:
                      (n.prev = 7),
                        (n.t0 = n.catch(0)),
                        a(
                          new Error(n.t0.message || "Failed to fetch account information")
                        );
                    case 10:
                    case "end":
                      return n.stop();
                  }
              },
              n,
              null,
              [[0, 7]]
            );
          })
        );
        return function (t, e) {
          return n.apply(this, arguments);
        };
      })()
    );
  }),
  (exports.getBootstrapProcessTxnCount = function (t) {
    return 0 === t ? 4 : 5;
  }),
  (exports.getBurnLiquidityQuote = function (t) {
    var e = t.pool,
      n = t.reserves,
      r = t.liquidityIn,
      a = BigInt(r),
      s = n.issuedLiquidity && (a * n.asset1) / n.issuedLiquidity,
      o = n.issuedLiquidity && (a * n.asset2) / n.issuedLiquidity;
    return {
      round: n.round,
      liquidityID: e.liquidityTokenID,
      liquidityIn: a,
      asset1ID: e.asset1ID,
      asset1Out: s,
      asset2ID: e.asset2ID,
      asset2Out: o
    };
  }),
  (exports.getPoolAssets = kt),
  (exports.getPoolInfo = vt),
  (exports.getPoolPairRatio = function (t, e) {
    var n = Ot(e),
      r = null;
    return (
      e &&
        !n &&
        e.asset1 &&
        e.asset2 &&
        "number" == typeof t.asset2 &&
        "number" == typeof t.asset1 &&
        (r = V(t.asset1, e.asset1) / V(t.asset2, e.asset2)),
      r
    );
  }),
  (exports.getPoolReserves = function (t, e) {
    return wt.apply(this, arguments);
  }),
  (exports.getPoolShare = function (t, e) {
    var n = Number(e) / Number(t);
    return Number.isFinite(n) || (n = 0), n;
  }),
  (exports.getPoolsForPair = function (t) {
    return Promise.all(
      Object.values(tt).map(function (e) {
        return vt(o(o({}, t), {}, {contractVersion: e}));
      })
    );
  }),
  (exports.getStakingAppID = function (t) {
    return "testnet" === t ? 51948952 : 649588853;
  }),
  (exports.getSwapQuote = function (t, e, n, r, a) {
    var s;
    if (e.status !== gt.READY)
      throw new k({pool: e, asset: r}, "Trying to swap on a non-existent pool");
    return (
      (s =
        "fixed-input" === t
          ? (function (t) {
              var e,
                n,
                r,
                a = t.pool,
                s = t.reserves,
                o = t.assetIn,
                i = t.decimals,
                u = BigInt(o.amount);
              o.assetID === a.asset1ID
                ? ((e = a.asset2ID), (n = s.asset1), (r = s.asset2))
                : ((e = a.asset1ID), (n = s.asset2), (r = s.asset1));
              var c = (u * Gt) / Xt,
                p = r - (n * r) / (n + (u - c));
              if (p > r) throw new Error("Output amount exceeds available liquidity.");
              var l = V(i.assetOut, Number(p)) / V(i.assetIn, Number(u)),
                f = V(i.assetOut, Number(r)) / V(i.assetIn, Number(n)),
                d = G({decimalPlaces: 5}, Math.abs(l / f - 1));
              return {
                round: s.round,
                assetInID: o.assetID,
                assetInAmount: u,
                assetOutID: e,
                assetOutAmount: p,
                swapFee: Number(c),
                rate: l,
                priceImpact: d
              };
            })({pool: e, reserves: n, assetIn: r, decimals: a})
          : (function (t) {
              var e,
                n,
                r,
                a = t.pool,
                s = t.reserves,
                o = t.assetOut,
                i = t.decimals,
                u = BigInt(o.amount);
              if (
                (o.assetID === a.asset1ID
                  ? ((e = a.asset2ID), (n = s.asset2), (r = s.asset1))
                  : ((e = a.asset1ID), (n = s.asset1), (r = s.asset2)),
                u > r)
              )
                throw new Error("Output amount exceeds available liquidity.");
              var c = (n * r) / (r - u) - n,
                p = (c * Xt) / (Xt - Gt),
                l = p - c,
                f = V(i.assetOut, Number(u)) / V(i.assetIn, Number(p)),
                d = V(i.assetOut, Number(r)) / V(i.assetIn, Number(n)),
                A = G({decimalPlaces: 5}, Math.abs(f / d - 1));
              return {
                round: s.round,
                assetInID: e,
                assetInAmount: p,
                assetOutID: o.assetID,
                assetOutAmount: u,
                swapFee: Number(l),
                rate: f,
                priceImpact: A
              };
            })({pool: e, reserves: n, assetOut: r, decimals: a})),
      s
    );
  }),
  (exports.getTxnGroupID = W),
  (exports.getValidatorAppID = st),
  (exports.hasSufficientMinimumBalance = function (t) {
    return t.amount >= t.minimum_required_balance;
  }),
  (exports.isAccountOptedIntoApp = function (t) {
    var e = t.appID;
    return t.accountAppsLocalState.some(function (t) {
      return t.id === e;
    });
  }),
  (exports.isPoolEmpty = Ot),
  (exports.isPoolNotCreated = function (t) {
    return (null == t ? void 0 : t.status) === gt.NOT_CREATED;
  }),
  (exports.isPoolReady = function (t) {
    return (null == t ? void 0 : t.status) === gt.READY;
  }),
  (exports.issueSwap = function (t) {
    return Kt.apply(this, arguments);
  }),
  (exports.prepareCommitTransactions = function (t) {
    return se.apply(this, arguments);
  }),
  (exports.redeemAllExcessAsset = function (t) {
    return ne.apply(this, arguments);
  }),
  (exports.redeemExcessAsset = function (t) {
    return $t.apply(this, arguments);
  }),
  (exports.sendAndWaitRawTransaction = X),
  (exports.signBootstrapTransactions = function (t) {
    return Pt.apply(this, arguments);
  }),
  (exports.signBurnTxns = function (t) {
    return jt.apply(this, arguments);
  }),
  (exports.signSwapTransactions = function (t) {
    return zt.apply(this, arguments);
  }),
  (exports.sumUpTxnFees = Y),
  (exports.tinymanContract_v1_1 = lt),
  (exports.tinymanContract_v2 = ft);
