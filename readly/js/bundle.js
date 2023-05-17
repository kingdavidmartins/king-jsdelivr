//Properjs
/**
 * @popperjs/core v2.11.7 - MIT License
 */

!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], t)
    : t(
        ((e =
          'undefined' != typeof globalThis ? globalThis : e || self).Popper =
          {})
      );
})(this, function (e) {
  'use strict';
  function t(e) {
    if (null == e) return window;
    if ('[object Window]' !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function n(e) {
    return e instanceof t(e).Element || e instanceof Element;
  }
  function r(e) {
    return e instanceof t(e).HTMLElement || e instanceof HTMLElement;
  }
  function o(e) {
    return (
      'undefined' != typeof ShadowRoot &&
      (e instanceof t(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  var i = Math.max,
    a = Math.min,
    s = Math.round;
  function f() {
    var e = navigator.userAgentData;
    return null != e && e.brands && Array.isArray(e.brands)
      ? e.brands
          .map(function (e) {
            return e.brand + '/' + e.version;
          })
          .join(' ')
      : navigator.userAgent;
  }
  function c() {
    return !/^((?!chrome|android).)*safari/i.test(f());
  }
  function p(e, o, i) {
    void 0 === o && (o = !1), void 0 === i && (i = !1);
    var a = e.getBoundingClientRect(),
      f = 1,
      p = 1;
    o &&
      r(e) &&
      ((f = (e.offsetWidth > 0 && s(a.width) / e.offsetWidth) || 1),
      (p = (e.offsetHeight > 0 && s(a.height) / e.offsetHeight) || 1));
    var u = (n(e) ? t(e) : window).visualViewport,
      l = !c() && i,
      d = (a.left + (l && u ? u.offsetLeft : 0)) / f,
      h = (a.top + (l && u ? u.offsetTop : 0)) / p,
      m = a.width / f,
      v = a.height / p;
    return {
      width: m,
      height: v,
      top: h,
      right: d + m,
      bottom: h + v,
      left: d,
      x: d,
      y: h,
    };
  }
  function u(e) {
    var n = t(e);
    return { scrollLeft: n.pageXOffset, scrollTop: n.pageYOffset };
  }
  function l(e) {
    return e ? (e.nodeName || '').toLowerCase() : null;
  }
  function d(e) {
    return (
      (n(e) ? e.ownerDocument : e.document) || window.document
    ).documentElement;
  }
  function h(e) {
    return p(d(e)).left + u(e).scrollLeft;
  }
  function m(e) {
    return t(e).getComputedStyle(e);
  }
  function v(e) {
    var t = m(e),
      n = t.overflow,
      r = t.overflowX,
      o = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + o + r);
  }
  function y(e, n, o) {
    void 0 === o && (o = !1);
    var i,
      a,
      f = r(n),
      c =
        r(n) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            n = s(t.width) / e.offsetWidth || 1,
            r = s(t.height) / e.offsetHeight || 1;
          return 1 !== n || 1 !== r;
        })(n),
      m = d(n),
      y = p(e, c, o),
      g = { scrollLeft: 0, scrollTop: 0 },
      b = { x: 0, y: 0 };
    return (
      (f || (!f && !o)) &&
        (('body' !== l(n) || v(m)) &&
          (g =
            (i = n) !== t(i) && r(i)
              ? { scrollLeft: (a = i).scrollLeft, scrollTop: a.scrollTop }
              : u(i)),
        r(n)
          ? (((b = p(n, !0)).x += n.clientLeft), (b.y += n.clientTop))
          : m && (b.x = h(m))),
      {
        x: y.left + g.scrollLeft - b.x,
        y: y.top + g.scrollTop - b.y,
        width: y.width,
        height: y.height,
      }
    );
  }
  function g(e) {
    var t = p(e),
      n = e.offsetWidth,
      r = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - r) <= 1 && (r = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
    );
  }
  function b(e) {
    return 'html' === l(e)
      ? e
      : e.assignedSlot || e.parentNode || (o(e) ? e.host : null) || d(e);
  }
  function x(e) {
    return ['html', 'body', '#document'].indexOf(l(e)) >= 0
      ? e.ownerDocument.body
      : r(e) && v(e)
      ? e
      : x(b(e));
  }
  function w(e, n) {
    var r;
    void 0 === n && (n = []);
    var o = x(e),
      i = o === (null == (r = e.ownerDocument) ? void 0 : r.body),
      a = t(o),
      s = i ? [a].concat(a.visualViewport || [], v(o) ? o : []) : o,
      f = n.concat(s);
    return i ? f : f.concat(w(b(s)));
  }
  function O(e) {
    return ['table', 'td', 'th'].indexOf(l(e)) >= 0;
  }
  function j(e) {
    return r(e) && 'fixed' !== m(e).position ? e.offsetParent : null;
  }
  function E(e) {
    for (var n = t(e), i = j(e); i && O(i) && 'static' === m(i).position; )
      i = j(i);
    return i &&
      ('html' === l(i) || ('body' === l(i) && 'static' === m(i).position))
      ? n
      : i ||
          (function (e) {
            var t = /firefox/i.test(f());
            if (/Trident/i.test(f()) && r(e) && 'fixed' === m(e).position)
              return null;
            var n = b(e);
            for (
              o(n) && (n = n.host);
              r(n) && ['html', 'body'].indexOf(l(n)) < 0;

            ) {
              var i = m(n);
              if (
                'none' !== i.transform ||
                'none' !== i.perspective ||
                'paint' === i.contain ||
                -1 !== ['transform', 'perspective'].indexOf(i.willChange) ||
                (t && 'filter' === i.willChange) ||
                (t && i.filter && 'none' !== i.filter)
              )
                return n;
              n = n.parentNode;
            }
            return null;
          })(e) ||
          n;
  }
  var D = 'top',
    A = 'bottom',
    L = 'right',
    P = 'left',
    M = 'auto',
    k = [D, A, L, P],
    W = 'start',
    B = 'end',
    H = 'viewport',
    T = 'popper',
    R = k.reduce(function (e, t) {
      return e.concat([t + '-' + W, t + '-' + B]);
    }, []),
    S = [].concat(k, [M]).reduce(function (e, t) {
      return e.concat([t, t + '-' + W, t + '-' + B]);
    }, []),
    V = [
      'beforeRead',
      'read',
      'afterRead',
      'beforeMain',
      'main',
      'afterMain',
      'beforeWrite',
      'write',
      'afterWrite',
    ];
  function q(e) {
    var t = new Map(),
      n = new Set(),
      r = [];
    function o(e) {
      n.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!n.has(e)) {
              var r = t.get(e);
              r && o(r);
            }
          }),
        r.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        n.has(e.name) || o(e);
      }),
      r
    );
  }
  function C(e) {
    return e.split('-')[0];
  }
  function N(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && o(n)) {
      var r = t;
      do {
        if (r && e.isSameNode(r)) return !0;
        r = r.parentNode || r.host;
      } while (r);
    }
    return !1;
  }
  function I(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function _(e, r, o) {
    return r === H
      ? I(
          (function (e, n) {
            var r = t(e),
              o = d(e),
              i = r.visualViewport,
              a = o.clientWidth,
              s = o.clientHeight,
              f = 0,
              p = 0;
            if (i) {
              (a = i.width), (s = i.height);
              var u = c();
              (u || (!u && 'fixed' === n)) &&
                ((f = i.offsetLeft), (p = i.offsetTop));
            }
            return { width: a, height: s, x: f + h(e), y: p };
          })(e, o)
        )
      : n(r)
      ? (function (e, t) {
          var n = p(e, !1, 'fixed' === t);
          return (
            (n.top = n.top + e.clientTop),
            (n.left = n.left + e.clientLeft),
            (n.bottom = n.top + e.clientHeight),
            (n.right = n.left + e.clientWidth),
            (n.width = e.clientWidth),
            (n.height = e.clientHeight),
            (n.x = n.left),
            (n.y = n.top),
            n
          );
        })(r, o)
      : I(
          (function (e) {
            var t,
              n = d(e),
              r = u(e),
              o = null == (t = e.ownerDocument) ? void 0 : t.body,
              a = i(
                n.scrollWidth,
                n.clientWidth,
                o ? o.scrollWidth : 0,
                o ? o.clientWidth : 0
              ),
              s = i(
                n.scrollHeight,
                n.clientHeight,
                o ? o.scrollHeight : 0,
                o ? o.clientHeight : 0
              ),
              f = -r.scrollLeft + h(e),
              c = -r.scrollTop;
            return (
              'rtl' === m(o || n).direction &&
                (f += i(n.clientWidth, o ? o.clientWidth : 0) - a),
              { width: a, height: s, x: f, y: c }
            );
          })(d(e))
        );
  }
  function F(e, t, o, s) {
    var f =
        'clippingParents' === t
          ? (function (e) {
              var t = w(b(e)),
                o =
                  ['absolute', 'fixed'].indexOf(m(e).position) >= 0 && r(e)
                    ? E(e)
                    : e;
              return n(o)
                ? t.filter(function (e) {
                    return n(e) && N(e, o) && 'body' !== l(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      c = [].concat(f, [o]),
      p = c[0],
      u = c.reduce(function (t, n) {
        var r = _(e, n, s);
        return (
          (t.top = i(r.top, t.top)),
          (t.right = a(r.right, t.right)),
          (t.bottom = a(r.bottom, t.bottom)),
          (t.left = i(r.left, t.left)),
          t
        );
      }, _(e, p, s));
    return (
      (u.width = u.right - u.left),
      (u.height = u.bottom - u.top),
      (u.x = u.left),
      (u.y = u.top),
      u
    );
  }
  function U(e) {
    return e.split('-')[1];
  }
  function z(e) {
    return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
  }
  function X(e) {
    var t,
      n = e.reference,
      r = e.element,
      o = e.placement,
      i = o ? C(o) : null,
      a = o ? U(o) : null,
      s = n.x + n.width / 2 - r.width / 2,
      f = n.y + n.height / 2 - r.height / 2;
    switch (i) {
      case D:
        t = { x: s, y: n.y - r.height };
        break;
      case A:
        t = { x: s, y: n.y + n.height };
        break;
      case L:
        t = { x: n.x + n.width, y: f };
        break;
      case P:
        t = { x: n.x - r.width, y: f };
        break;
      default:
        t = { x: n.x, y: n.y };
    }
    var c = i ? z(i) : null;
    if (null != c) {
      var p = 'y' === c ? 'height' : 'width';
      switch (a) {
        case W:
          t[c] = t[c] - (n[p] / 2 - r[p] / 2);
          break;
        case B:
          t[c] = t[c] + (n[p] / 2 - r[p] / 2);
      }
    }
    return t;
  }
  function Y(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function G(e, t) {
    return t.reduce(function (t, n) {
      return (t[n] = e), t;
    }, {});
  }
  function J(e, t) {
    void 0 === t && (t = {});
    var r = t,
      o = r.placement,
      i = void 0 === o ? e.placement : o,
      a = r.strategy,
      s = void 0 === a ? e.strategy : a,
      f = r.boundary,
      c = void 0 === f ? 'clippingParents' : f,
      u = r.rootBoundary,
      l = void 0 === u ? H : u,
      h = r.elementContext,
      m = void 0 === h ? T : h,
      v = r.altBoundary,
      y = void 0 !== v && v,
      g = r.padding,
      b = void 0 === g ? 0 : g,
      x = Y('number' != typeof b ? b : G(b, k)),
      w = m === T ? 'reference' : T,
      O = e.rects.popper,
      j = e.elements[y ? w : m],
      E = F(n(j) ? j : j.contextElement || d(e.elements.popper), c, l, s),
      P = p(e.elements.reference),
      M = X({ reference: P, element: O, strategy: 'absolute', placement: i }),
      W = I(Object.assign({}, O, M)),
      B = m === T ? W : P,
      R = {
        top: E.top - B.top + x.top,
        bottom: B.bottom - E.bottom + x.bottom,
        left: E.left - B.left + x.left,
        right: B.right - E.right + x.right,
      },
      S = e.modifiersData.offset;
    if (m === T && S) {
      var V = S[i];
      Object.keys(R).forEach(function (e) {
        var t = [L, A].indexOf(e) >= 0 ? 1 : -1,
          n = [D, A].indexOf(e) >= 0 ? 'y' : 'x';
        R[e] += V[n] * t;
      });
    }
    return R;
  }
  var K = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
  function Q() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (e) {
      return !(e && 'function' == typeof e.getBoundingClientRect);
    });
  }
  function Z(e) {
    void 0 === e && (e = {});
    var t = e,
      r = t.defaultModifiers,
      o = void 0 === r ? [] : r,
      i = t.defaultOptions,
      a = void 0 === i ? K : i;
    return function (e, t, r) {
      void 0 === r && (r = a);
      var i,
        s,
        f = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, K, a),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        c = [],
        p = !1,
        u = {
          state: f,
          setOptions: function (r) {
            var i = 'function' == typeof r ? r(f.options) : r;
            l(),
              (f.options = Object.assign({}, a, f.options, i)),
              (f.scrollParents = {
                reference: n(e)
                  ? w(e)
                  : e.contextElement
                  ? w(e.contextElement)
                  : [],
                popper: w(t),
              });
            var s,
              p,
              d = (function (e) {
                var t = q(e);
                return V.reduce(function (e, n) {
                  return e.concat(
                    t.filter(function (e) {
                      return e.phase === n;
                    })
                  );
                }, []);
              })(
                ((s = [].concat(o, f.options.modifiers)),
                (p = s.reduce(function (e, t) {
                  var n = e[t.name];
                  return (
                    (e[t.name] = n
                      ? Object.assign({}, n, t, {
                          options: Object.assign({}, n.options, t.options),
                          data: Object.assign({}, n.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {})),
                Object.keys(p).map(function (e) {
                  return p[e];
                }))
              );
            return (
              (f.orderedModifiers = d.filter(function (e) {
                return e.enabled;
              })),
              f.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  n = e.options,
                  r = void 0 === n ? {} : n,
                  o = e.effect;
                if ('function' == typeof o) {
                  var i = o({ state: f, name: t, instance: u, options: r }),
                    a = function () {};
                  c.push(i || a);
                }
              }),
              u.update()
            );
          },
          forceUpdate: function () {
            if (!p) {
              var e = f.elements,
                t = e.reference,
                n = e.popper;
              if (Q(t, n)) {
                (f.rects = {
                  reference: y(t, E(n), 'fixed' === f.options.strategy),
                  popper: g(n),
                }),
                  (f.reset = !1),
                  (f.placement = f.options.placement),
                  f.orderedModifiers.forEach(function (e) {
                    return (f.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var r = 0; r < f.orderedModifiers.length; r++)
                  if (!0 !== f.reset) {
                    var o = f.orderedModifiers[r],
                      i = o.fn,
                      a = o.options,
                      s = void 0 === a ? {} : a,
                      c = o.name;
                    'function' == typeof i &&
                      (f =
                        i({ state: f, options: s, name: c, instance: u }) || f);
                  } else (f.reset = !1), (r = -1);
              }
            }
          },
          update:
            ((i = function () {
              return new Promise(function (e) {
                u.forceUpdate(), e(f);
              });
            }),
            function () {
              return (
                s ||
                  (s = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (s = void 0), e(i());
                    });
                  })),
                s
              );
            }),
          destroy: function () {
            l(), (p = !0);
          },
        };
      if (!Q(e, t)) return u;
      function l() {
        c.forEach(function (e) {
          return e();
        }),
          (c = []);
      }
      return (
        u.setOptions(r).then(function (e) {
          !p && r.onFirstUpdate && r.onFirstUpdate(e);
        }),
        u
      );
    };
  }
  var $ = { passive: !0 };
  var ee = {
    name: 'eventListeners',
    enabled: !0,
    phase: 'write',
    fn: function () {},
    effect: function (e) {
      var n = e.state,
        r = e.instance,
        o = e.options,
        i = o.scroll,
        a = void 0 === i || i,
        s = o.resize,
        f = void 0 === s || s,
        c = t(n.elements.popper),
        p = [].concat(n.scrollParents.reference, n.scrollParents.popper);
      return (
        a &&
          p.forEach(function (e) {
            e.addEventListener('scroll', r.update, $);
          }),
        f && c.addEventListener('resize', r.update, $),
        function () {
          a &&
            p.forEach(function (e) {
              e.removeEventListener('scroll', r.update, $);
            }),
            f && c.removeEventListener('resize', r.update, $);
        }
      );
    },
    data: {},
  };
  var te = {
      name: 'popperOffsets',
      enabled: !0,
      phase: 'read',
      fn: function (e) {
        var t = e.state,
          n = e.name;
        t.modifiersData[n] = X({
          reference: t.rects.reference,
          element: t.rects.popper,
          strategy: 'absolute',
          placement: t.placement,
        });
      },
      data: {},
    },
    ne = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
  function re(e) {
    var n,
      r = e.popper,
      o = e.popperRect,
      i = e.placement,
      a = e.variation,
      f = e.offsets,
      c = e.position,
      p = e.gpuAcceleration,
      u = e.adaptive,
      l = e.roundOffsets,
      h = e.isFixed,
      v = f.x,
      y = void 0 === v ? 0 : v,
      g = f.y,
      b = void 0 === g ? 0 : g,
      x = 'function' == typeof l ? l({ x: y, y: b }) : { x: y, y: b };
    (y = x.x), (b = x.y);
    var w = f.hasOwnProperty('x'),
      O = f.hasOwnProperty('y'),
      j = P,
      M = D,
      k = window;
    if (u) {
      var W = E(r),
        H = 'clientHeight',
        T = 'clientWidth';
      if (
        (W === t(r) &&
          'static' !== m((W = d(r))).position &&
          'absolute' === c &&
          ((H = 'scrollHeight'), (T = 'scrollWidth')),
        (W = W),
        i === D || ((i === P || i === L) && a === B))
      )
        (M = A),
          (b -=
            (h && W === k && k.visualViewport
              ? k.visualViewport.height
              : W[H]) - o.height),
          (b *= p ? 1 : -1);
      if (i === P || ((i === D || i === A) && a === B))
        (j = L),
          (y -=
            (h && W === k && k.visualViewport ? k.visualViewport.width : W[T]) -
            o.width),
          (y *= p ? 1 : -1);
    }
    var R,
      S = Object.assign({ position: c }, u && ne),
      V =
        !0 === l
          ? (function (e, t) {
              var n = e.x,
                r = e.y,
                o = t.devicePixelRatio || 1;
              return { x: s(n * o) / o || 0, y: s(r * o) / o || 0 };
            })({ x: y, y: b }, t(r))
          : { x: y, y: b };
    return (
      (y = V.x),
      (b = V.y),
      p
        ? Object.assign(
            {},
            S,
            (((R = {})[M] = O ? '0' : ''),
            (R[j] = w ? '0' : ''),
            (R.transform =
              (k.devicePixelRatio || 1) <= 1
                ? 'translate(' + y + 'px, ' + b + 'px)'
                : 'translate3d(' + y + 'px, ' + b + 'px, 0)'),
            R)
          )
        : Object.assign(
            {},
            S,
            (((n = {})[M] = O ? b + 'px' : ''),
            (n[j] = w ? y + 'px' : ''),
            (n.transform = ''),
            n)
          )
    );
  }
  var oe = {
    name: 'computeStyles',
    enabled: !0,
    phase: 'beforeWrite',
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = n.gpuAcceleration,
        o = void 0 === r || r,
        i = n.adaptive,
        a = void 0 === i || i,
        s = n.roundOffsets,
        f = void 0 === s || s,
        c = {
          placement: C(t.placement),
          variation: U(t.placement),
          popper: t.elements.popper,
          popperRect: t.rects.popper,
          gpuAcceleration: o,
          isFixed: 'fixed' === t.options.strategy,
        };
      null != t.modifiersData.popperOffsets &&
        (t.styles.popper = Object.assign(
          {},
          t.styles.popper,
          re(
            Object.assign({}, c, {
              offsets: t.modifiersData.popperOffsets,
              position: t.options.strategy,
              adaptive: a,
              roundOffsets: f,
            })
          )
        )),
        null != t.modifiersData.arrow &&
          (t.styles.arrow = Object.assign(
            {},
            t.styles.arrow,
            re(
              Object.assign({}, c, {
                offsets: t.modifiersData.arrow,
                position: 'absolute',
                adaptive: !1,
                roundOffsets: f,
              })
            )
          )),
        (t.attributes.popper = Object.assign({}, t.attributes.popper, {
          'data-popper-placement': t.placement,
        }));
    },
    data: {},
  };
  var ie = {
    name: 'applyStyles',
    enabled: !0,
    phase: 'write',
    fn: function (e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var n = t.styles[e] || {},
          o = t.attributes[e] || {},
          i = t.elements[e];
        r(i) &&
          l(i) &&
          (Object.assign(i.style, n),
          Object.keys(o).forEach(function (e) {
            var t = o[e];
            !1 === t
              ? i.removeAttribute(e)
              : i.setAttribute(e, !0 === t ? '' : t);
          }));
      });
    },
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: '0',
            top: '0',
            margin: '0',
          },
          arrow: { position: 'absolute' },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var o = t.elements[e],
              i = t.attributes[e] || {},
              a = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
              ).reduce(function (e, t) {
                return (e[t] = ''), e;
              }, {});
            r(o) &&
              l(o) &&
              (Object.assign(o.style, a),
              Object.keys(i).forEach(function (e) {
                o.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ['computeStyles'],
  };
  var ae = {
      name: 'offset',
      enabled: !0,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: function (e) {
        var t = e.state,
          n = e.options,
          r = e.name,
          o = n.offset,
          i = void 0 === o ? [0, 0] : o,
          a = S.reduce(function (e, n) {
            return (
              (e[n] = (function (e, t, n) {
                var r = C(e),
                  o = [P, D].indexOf(r) >= 0 ? -1 : 1,
                  i =
                    'function' == typeof n
                      ? n(Object.assign({}, t, { placement: e }))
                      : n,
                  a = i[0],
                  s = i[1];
                return (
                  (a = a || 0),
                  (s = (s || 0) * o),
                  [P, L].indexOf(r) >= 0 ? { x: s, y: a } : { x: a, y: s }
                );
              })(n, t.rects, i)),
              e
            );
          }, {}),
          s = a[t.placement],
          f = s.x,
          c = s.y;
        null != t.modifiersData.popperOffsets &&
          ((t.modifiersData.popperOffsets.x += f),
          (t.modifiersData.popperOffsets.y += c)),
          (t.modifiersData[r] = a);
      },
    },
    se = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  function fe(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return se[e];
    });
  }
  var ce = { start: 'end', end: 'start' };
  function pe(e) {
    return e.replace(/start|end/g, function (e) {
      return ce[e];
    });
  }
  function ue(e, t) {
    void 0 === t && (t = {});
    var n = t,
      r = n.placement,
      o = n.boundary,
      i = n.rootBoundary,
      a = n.padding,
      s = n.flipVariations,
      f = n.allowedAutoPlacements,
      c = void 0 === f ? S : f,
      p = U(r),
      u = p
        ? s
          ? R
          : R.filter(function (e) {
              return U(e) === p;
            })
        : k,
      l = u.filter(function (e) {
        return c.indexOf(e) >= 0;
      });
    0 === l.length && (l = u);
    var d = l.reduce(function (t, n) {
      return (
        (t[n] = J(e, {
          placement: n,
          boundary: o,
          rootBoundary: i,
          padding: a,
        })[C(n)]),
        t
      );
    }, {});
    return Object.keys(d).sort(function (e, t) {
      return d[e] - d[t];
    });
  }
  var le = {
    name: 'flip',
    enabled: !0,
    phase: 'main',
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = e.name;
      if (!t.modifiersData[r]._skip) {
        for (
          var o = n.mainAxis,
            i = void 0 === o || o,
            a = n.altAxis,
            s = void 0 === a || a,
            f = n.fallbackPlacements,
            c = n.padding,
            p = n.boundary,
            u = n.rootBoundary,
            l = n.altBoundary,
            d = n.flipVariations,
            h = void 0 === d || d,
            m = n.allowedAutoPlacements,
            v = t.options.placement,
            y = C(v),
            g =
              f ||
              (y === v || !h
                ? [fe(v)]
                : (function (e) {
                    if (C(e) === M) return [];
                    var t = fe(e);
                    return [pe(e), t, pe(t)];
                  })(v)),
            b = [v].concat(g).reduce(function (e, n) {
              return e.concat(
                C(n) === M
                  ? ue(t, {
                      placement: n,
                      boundary: p,
                      rootBoundary: u,
                      padding: c,
                      flipVariations: h,
                      allowedAutoPlacements: m,
                    })
                  : n
              );
            }, []),
            x = t.rects.reference,
            w = t.rects.popper,
            O = new Map(),
            j = !0,
            E = b[0],
            k = 0;
          k < b.length;
          k++
        ) {
          var B = b[k],
            H = C(B),
            T = U(B) === W,
            R = [D, A].indexOf(H) >= 0,
            S = R ? 'width' : 'height',
            V = J(t, {
              placement: B,
              boundary: p,
              rootBoundary: u,
              altBoundary: l,
              padding: c,
            }),
            q = R ? (T ? L : P) : T ? A : D;
          x[S] > w[S] && (q = fe(q));
          var N = fe(q),
            I = [];
          if (
            (i && I.push(V[H] <= 0),
            s && I.push(V[q] <= 0, V[N] <= 0),
            I.every(function (e) {
              return e;
            }))
          ) {
            (E = B), (j = !1);
            break;
          }
          O.set(B, I);
        }
        if (j)
          for (
            var _ = function (e) {
                var t = b.find(function (t) {
                  var n = O.get(t);
                  if (n)
                    return n.slice(0, e).every(function (e) {
                      return e;
                    });
                });
                if (t) return (E = t), 'break';
              },
              F = h ? 3 : 1;
            F > 0;
            F--
          ) {
            if ('break' === _(F)) break;
          }
        t.placement !== E &&
          ((t.modifiersData[r]._skip = !0), (t.placement = E), (t.reset = !0));
      }
    },
    requiresIfExists: ['offset'],
    data: { _skip: !1 },
  };
  function de(e, t, n) {
    return i(e, a(t, n));
  }
  var he = {
    name: 'preventOverflow',
    enabled: !0,
    phase: 'main',
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = e.name,
        o = n.mainAxis,
        s = void 0 === o || o,
        f = n.altAxis,
        c = void 0 !== f && f,
        p = n.boundary,
        u = n.rootBoundary,
        l = n.altBoundary,
        d = n.padding,
        h = n.tether,
        m = void 0 === h || h,
        v = n.tetherOffset,
        y = void 0 === v ? 0 : v,
        b = J(t, { boundary: p, rootBoundary: u, padding: d, altBoundary: l }),
        x = C(t.placement),
        w = U(t.placement),
        O = !w,
        j = z(x),
        M = 'x' === j ? 'y' : 'x',
        k = t.modifiersData.popperOffsets,
        B = t.rects.reference,
        H = t.rects.popper,
        T =
          'function' == typeof y
            ? y(Object.assign({}, t.rects, { placement: t.placement }))
            : y,
        R =
          'number' == typeof T
            ? { mainAxis: T, altAxis: T }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, T),
        S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        V = { x: 0, y: 0 };
      if (k) {
        if (s) {
          var q,
            N = 'y' === j ? D : P,
            I = 'y' === j ? A : L,
            _ = 'y' === j ? 'height' : 'width',
            F = k[j],
            X = F + b[N],
            Y = F - b[I],
            G = m ? -H[_] / 2 : 0,
            K = w === W ? B[_] : H[_],
            Q = w === W ? -H[_] : -B[_],
            Z = t.elements.arrow,
            $ = m && Z ? g(Z) : { width: 0, height: 0 },
            ee = t.modifiersData['arrow#persistent']
              ? t.modifiersData['arrow#persistent'].padding
              : { top: 0, right: 0, bottom: 0, left: 0 },
            te = ee[N],
            ne = ee[I],
            re = de(0, B[_], $[_]),
            oe = O
              ? B[_] / 2 - G - re - te - R.mainAxis
              : K - re - te - R.mainAxis,
            ie = O
              ? -B[_] / 2 + G + re + ne + R.mainAxis
              : Q + re + ne + R.mainAxis,
            ae = t.elements.arrow && E(t.elements.arrow),
            se = ae ? ('y' === j ? ae.clientTop || 0 : ae.clientLeft || 0) : 0,
            fe = null != (q = null == S ? void 0 : S[j]) ? q : 0,
            ce = F + ie - fe,
            pe = de(m ? a(X, F + oe - fe - se) : X, F, m ? i(Y, ce) : Y);
          (k[j] = pe), (V[j] = pe - F);
        }
        if (c) {
          var ue,
            le = 'x' === j ? D : P,
            he = 'x' === j ? A : L,
            me = k[M],
            ve = 'y' === M ? 'height' : 'width',
            ye = me + b[le],
            ge = me - b[he],
            be = -1 !== [D, P].indexOf(x),
            xe = null != (ue = null == S ? void 0 : S[M]) ? ue : 0,
            we = be ? ye : me - B[ve] - H[ve] - xe + R.altAxis,
            Oe = be ? me + B[ve] + H[ve] - xe - R.altAxis : ge,
            je =
              m && be
                ? (function (e, t, n) {
                    var r = de(e, t, n);
                    return r > n ? n : r;
                  })(we, me, Oe)
                : de(m ? we : ye, me, m ? Oe : ge);
          (k[M] = je), (V[M] = je - me);
        }
        t.modifiersData[r] = V;
      }
    },
    requiresIfExists: ['offset'],
  };
  var me = {
    name: 'arrow',
    enabled: !0,
    phase: 'main',
    fn: function (e) {
      var t,
        n = e.state,
        r = e.name,
        o = e.options,
        i = n.elements.arrow,
        a = n.modifiersData.popperOffsets,
        s = C(n.placement),
        f = z(s),
        c = [P, L].indexOf(s) >= 0 ? 'height' : 'width';
      if (i && a) {
        var p = (function (e, t) {
            return Y(
              'number' !=
                typeof (e =
                  'function' == typeof e
                    ? e(Object.assign({}, t.rects, { placement: t.placement }))
                    : e)
                ? e
                : G(e, k)
            );
          })(o.padding, n),
          u = g(i),
          l = 'y' === f ? D : P,
          d = 'y' === f ? A : L,
          h =
            n.rects.reference[c] +
            n.rects.reference[f] -
            a[f] -
            n.rects.popper[c],
          m = a[f] - n.rects.reference[f],
          v = E(i),
          y = v ? ('y' === f ? v.clientHeight || 0 : v.clientWidth || 0) : 0,
          b = h / 2 - m / 2,
          x = p[l],
          w = y - u[c] - p[d],
          O = y / 2 - u[c] / 2 + b,
          j = de(x, O, w),
          M = f;
        n.modifiersData[r] = (((t = {})[M] = j), (t.centerOffset = j - O), t);
      }
    },
    effect: function (e) {
      var t = e.state,
        n = e.options.element,
        r = void 0 === n ? '[data-popper-arrow]' : n;
      null != r &&
        ('string' != typeof r || (r = t.elements.popper.querySelector(r))) &&
        N(t.elements.popper, r) &&
        (t.elements.arrow = r);
    },
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow'],
  };
  function ve(e, t, n) {
    return (
      void 0 === n && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    );
  }
  function ye(e) {
    return [D, L, A, P].some(function (t) {
      return e[t] >= 0;
    });
  }
  var ge = {
      name: 'hide',
      enabled: !0,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: function (e) {
        var t = e.state,
          n = e.name,
          r = t.rects.reference,
          o = t.rects.popper,
          i = t.modifiersData.preventOverflow,
          a = J(t, { elementContext: 'reference' }),
          s = J(t, { altBoundary: !0 }),
          f = ve(a, r),
          c = ve(s, o, i),
          p = ye(f),
          u = ye(c);
        (t.modifiersData[n] = {
          referenceClippingOffsets: f,
          popperEscapeOffsets: c,
          isReferenceHidden: p,
          hasPopperEscaped: u,
        }),
          (t.attributes.popper = Object.assign({}, t.attributes.popper, {
            'data-popper-reference-hidden': p,
            'data-popper-escaped': u,
          }));
      },
    },
    be = Z({ defaultModifiers: [ee, te, oe, ie] }),
    xe = [ee, te, oe, ie, ae, le, he, me, ge],
    we = Z({ defaultModifiers: xe });
  (e.applyStyles = ie),
    (e.arrow = me),
    (e.computeStyles = oe),
    (e.createPopper = we),
    (e.createPopperLite = be),
    (e.defaultModifiers = xe),
    (e.detectOverflow = J),
    (e.eventListeners = ee),
    (e.flip = le),
    (e.hide = ge),
    (e.offset = ae),
    (e.popperGenerator = Z),
    (e.popperOffsets = te),
    (e.preventOverflow = he),
    Object.defineProperty(e, '__esModule', { value: !0 });
});
//# sourceMappingURL=popper.min.js.map

// Bootstrap
/*!
 * Bootstrap v5.2.3 (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e(require('@popperjs/core')))
    : 'function' == typeof define && define.amd
    ? define(['@popperjs/core'], e)
    : ((t =
        'undefined' != typeof globalThis ? globalThis : t || self).bootstrap =
        e(t.Popper));
})(this, function (t) {
  'use strict';
  function e(t) {
    if (t && t.__esModule) return t;
    const e = Object.create(null, {
      [Symbol.toStringTag]: { value: 'Module' },
    });
    if (t)
      for (const i in t)
        if ('default' !== i) {
          const s = Object.getOwnPropertyDescriptor(t, i);
          Object.defineProperty(
            e,
            i,
            s.get ? s : { enumerable: !0, get: () => t[i] }
          );
        }
    return (e.default = t), Object.freeze(e);
  }
  const i = e(t),
    s = 'transitionend',
    n = (t) => {
      let e = t.getAttribute('data-bs-target');
      if (!e || '#' === e) {
        let i = t.getAttribute('href');
        if (!i || (!i.includes('#') && !i.startsWith('.'))) return null;
        i.includes('#') && !i.startsWith('#') && (i = `#${i.split('#')[1]}`),
          (e = i && '#' !== i ? i.trim() : null);
      }
      return e;
    },
    o = (t) => {
      const e = n(t);
      return e && document.querySelector(e) ? e : null;
    },
    r = (t) => {
      const e = n(t);
      return e ? document.querySelector(e) : null;
    },
    a = (t) => {
      t.dispatchEvent(new Event(s));
    },
    l = (t) =>
      !(!t || 'object' != typeof t) &&
      (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
    c = (t) =>
      l(t)
        ? t.jquery
          ? t[0]
          : t
        : 'string' == typeof t && t.length > 0
        ? document.querySelector(t)
        : null,
    h = (t) => {
      if (!l(t) || 0 === t.getClientRects().length) return !1;
      const e =
          'visible' === getComputedStyle(t).getPropertyValue('visibility'),
        i = t.closest('details:not([open])');
      if (!i) return e;
      if (i !== t) {
        const e = t.closest('summary');
        if (e && e.parentNode !== i) return !1;
        if (null === e) return !1;
      }
      return e;
    },
    d = (t) =>
      !t ||
      t.nodeType !== Node.ELEMENT_NODE ||
      !!t.classList.contains('disabled') ||
      (void 0 !== t.disabled
        ? t.disabled
        : t.hasAttribute('disabled') && 'false' !== t.getAttribute('disabled')),
    u = (t) => {
      if (!document.documentElement.attachShadow) return null;
      if ('function' == typeof t.getRootNode) {
        const e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }
      return t instanceof ShadowRoot
        ? t
        : t.parentNode
        ? u(t.parentNode)
        : null;
    },
    _ = () => {},
    g = (t) => {
      t.offsetHeight;
    },
    f = () =>
      window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')
        ? window.jQuery
        : null,
    p = [],
    m = () => 'rtl' === document.documentElement.dir,
    b = (t) => {
      var e;
      (e = () => {
        const e = f();
        if (e) {
          const i = t.NAME,
            s = e.fn[i];
          (e.fn[i] = t.jQueryInterface),
            (e.fn[i].Constructor = t),
            (e.fn[i].noConflict = () => ((e.fn[i] = s), t.jQueryInterface));
        }
      }),
        'loading' === document.readyState
          ? (p.length ||
              document.addEventListener('DOMContentLoaded', () => {
                for (const t of p) t();
              }),
            p.push(e))
          : e();
    },
    v = (t) => {
      'function' == typeof t && t();
    },
    y = (t, e, i = !0) => {
      if (!i) return void v(t);
      const n =
        ((t) => {
          if (!t) return 0;
          let { transitionDuration: e, transitionDelay: i } =
            window.getComputedStyle(t);
          const s = Number.parseFloat(e),
            n = Number.parseFloat(i);
          return s || n
            ? ((e = e.split(',')[0]),
              (i = i.split(',')[0]),
              1e3 * (Number.parseFloat(e) + Number.parseFloat(i)))
            : 0;
        })(e) + 5;
      let o = !1;
      const r = ({ target: i }) => {
        i === e && ((o = !0), e.removeEventListener(s, r), v(t));
      };
      e.addEventListener(s, r),
        setTimeout(() => {
          o || a(e);
        }, n);
    },
    w = (t, e, i, s) => {
      const n = t.length;
      let o = t.indexOf(e);
      return -1 === o
        ? !i && s
          ? t[n - 1]
          : t[0]
        : ((o += i ? 1 : -1),
          s && (o = (o + n) % n),
          t[Math.max(0, Math.min(o, n - 1))]);
    },
    A = /[^.]*(?=\..*)\.|.*/,
    E = /\..*/,
    C = /::\d+$/,
    T = {};
  let k = 1;
  const L = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
    O = new Set([
      'click',
      'dblclick',
      'mouseup',
      'mousedown',
      'contextmenu',
      'mousewheel',
      'DOMMouseScroll',
      'mouseover',
      'mouseout',
      'mousemove',
      'selectstart',
      'selectend',
      'keydown',
      'keypress',
      'keyup',
      'orientationchange',
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel',
      'pointerdown',
      'pointermove',
      'pointerup',
      'pointerleave',
      'pointercancel',
      'gesturestart',
      'gesturechange',
      'gestureend',
      'focus',
      'blur',
      'change',
      'reset',
      'select',
      'submit',
      'focusin',
      'focusout',
      'load',
      'unload',
      'beforeunload',
      'resize',
      'move',
      'DOMContentLoaded',
      'readystatechange',
      'error',
      'abort',
      'scroll',
    ]);
  function I(t, e) {
    return (e && `${e}::${k++}`) || t.uidEvent || k++;
  }
  function S(t) {
    const e = I(t);
    return (t.uidEvent = e), (T[e] = T[e] || {}), T[e];
  }
  function D(t, e, i = null) {
    return Object.values(t).find(
      (t) => t.callable === e && t.delegationSelector === i
    );
  }
  function N(t, e, i) {
    const s = 'string' == typeof e,
      n = s ? i : e || i;
    let o = j(t);
    return O.has(o) || (o = t), [s, n, o];
  }
  function P(t, e, i, s, n) {
    if ('string' != typeof e || !t) return;
    let [o, r, a] = N(e, i, s);
    if (e in L) {
      const t = (t) =>
        function (e) {
          if (
            !e.relatedTarget ||
            (e.relatedTarget !== e.delegateTarget &&
              !e.delegateTarget.contains(e.relatedTarget))
          )
            return t.call(this, e);
        };
      r = t(r);
    }
    const l = S(t),
      c = l[a] || (l[a] = {}),
      h = D(c, r, o ? i : null);
    if (h) return void (h.oneOff = h.oneOff && n);
    const d = I(r, e.replace(A, '')),
      u = o
        ? (function (t, e, i) {
            return function s(n) {
              const o = t.querySelectorAll(e);
              for (let { target: r } = n; r && r !== this; r = r.parentNode)
                for (const a of o)
                  if (a === r)
                    return (
                      F(n, { delegateTarget: r }),
                      s.oneOff && $.off(t, n.type, e, i),
                      i.apply(r, [n])
                    );
            };
          })(t, i, r)
        : (function (t, e) {
            return function i(s) {
              return (
                F(s, { delegateTarget: t }),
                i.oneOff && $.off(t, s.type, e),
                e.apply(t, [s])
              );
            };
          })(t, r);
    (u.delegationSelector = o ? i : null),
      (u.callable = r),
      (u.oneOff = n),
      (u.uidEvent = d),
      (c[d] = u),
      t.addEventListener(a, u, o);
  }
  function x(t, e, i, s, n) {
    const o = D(e[i], s, n);
    o && (t.removeEventListener(i, o, Boolean(n)), delete e[i][o.uidEvent]);
  }
  function M(t, e, i, s) {
    const n = e[i] || {};
    for (const o of Object.keys(n))
      if (o.includes(s)) {
        const s = n[o];
        x(t, e, i, s.callable, s.delegationSelector);
      }
  }
  function j(t) {
    return (t = t.replace(E, '')), L[t] || t;
  }
  const $ = {
    on(t, e, i, s) {
      P(t, e, i, s, !1);
    },
    one(t, e, i, s) {
      P(t, e, i, s, !0);
    },
    off(t, e, i, s) {
      if ('string' != typeof e || !t) return;
      const [n, o, r] = N(e, i, s),
        a = r !== e,
        l = S(t),
        c = l[r] || {},
        h = e.startsWith('.');
      if (void 0 === o) {
        if (h) for (const i of Object.keys(l)) M(t, l, i, e.slice(1));
        for (const i of Object.keys(c)) {
          const s = i.replace(C, '');
          if (!a || e.includes(s)) {
            const e = c[i];
            x(t, l, r, e.callable, e.delegationSelector);
          }
        }
      } else {
        if (!Object.keys(c).length) return;
        x(t, l, r, o, n ? i : null);
      }
    },
    trigger(t, e, i) {
      if ('string' != typeof e || !t) return null;
      const s = f();
      let n = null,
        o = !0,
        r = !0,
        a = !1;
      e !== j(e) &&
        s &&
        ((n = s.Event(e, i)),
        s(t).trigger(n),
        (o = !n.isPropagationStopped()),
        (r = !n.isImmediatePropagationStopped()),
        (a = n.isDefaultPrevented()));
      let l = new Event(e, { bubbles: o, cancelable: !0 });
      return (
        (l = F(l, i)),
        a && l.preventDefault(),
        r && t.dispatchEvent(l),
        l.defaultPrevented && n && n.preventDefault(),
        l
      );
    },
  };
  function F(t, e) {
    for (const [i, s] of Object.entries(e || {}))
      try {
        t[i] = s;
      } catch (e) {
        Object.defineProperty(t, i, { configurable: !0, get: () => s });
      }
    return t;
  }
  const z = new Map(),
    H = {
      set(t, e, i) {
        z.has(t) || z.set(t, new Map());
        const s = z.get(t);
        s.has(e) || 0 === s.size
          ? s.set(e, i)
          : console.error(
              `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                Array.from(s.keys())[0]
              }.`
            );
      },
      get: (t, e) => (z.has(t) && z.get(t).get(e)) || null,
      remove(t, e) {
        if (!z.has(t)) return;
        const i = z.get(t);
        i.delete(e), 0 === i.size && z.delete(t);
      },
    };
  function q(t) {
    if ('true' === t) return !0;
    if ('false' === t) return !1;
    if (t === Number(t).toString()) return Number(t);
    if ('' === t || 'null' === t) return null;
    if ('string' != typeof t) return t;
    try {
      return JSON.parse(decodeURIComponent(t));
    } catch (e) {
      return t;
    }
  }
  function B(t) {
    return t.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
  }
  const W = {
    setDataAttribute(t, e, i) {
      t.setAttribute(`data-bs-${B(e)}`, i);
    },
    removeDataAttribute(t, e) {
      t.removeAttribute(`data-bs-${B(e)}`);
    },
    getDataAttributes(t) {
      if (!t) return {};
      const e = {},
        i = Object.keys(t.dataset).filter(
          (t) => t.startsWith('bs') && !t.startsWith('bsConfig')
        );
      for (const s of i) {
        let i = s.replace(/^bs/, '');
        (i = i.charAt(0).toLowerCase() + i.slice(1, i.length)),
          (e[i] = q(t.dataset[s]));
      }
      return e;
    },
    getDataAttribute: (t, e) => q(t.getAttribute(`data-bs-${B(e)}`)),
  };
  class R {
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error(
        'You have to implement the static method "NAME", for each component!'
      );
    }
    _getConfig(t) {
      return (
        (t = this._mergeConfigObj(t)),
        (t = this._configAfterMerge(t)),
        this._typeCheckConfig(t),
        t
      );
    }
    _configAfterMerge(t) {
      return t;
    }
    _mergeConfigObj(t, e) {
      const i = l(e) ? W.getDataAttribute(e, 'config') : {};
      return {
        ...this.constructor.Default,
        ...('object' == typeof i ? i : {}),
        ...(l(e) ? W.getDataAttributes(e) : {}),
        ...('object' == typeof t ? t : {}),
      };
    }
    _typeCheckConfig(t, e = this.constructor.DefaultType) {
      for (const s of Object.keys(e)) {
        const n = e[s],
          o = t[s],
          r = l(o)
            ? 'element'
            : null == (i = o)
            ? `${i}`
            : Object.prototype.toString
                .call(i)
                .match(/\s([a-z]+)/i)[1]
                .toLowerCase();
        if (!new RegExp(n).test(r))
          throw new TypeError(
            `${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${r}" but expected type "${n}".`
          );
      }
      var i;
    }
  }
  class V extends R {
    constructor(t, e) {
      super(),
        (t = c(t)) &&
          ((this._element = t),
          (this._config = this._getConfig(e)),
          H.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      H.remove(this._element, this.constructor.DATA_KEY),
        $.off(this._element, this.constructor.EVENT_KEY);
      for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
    }
    _queueCallback(t, e, i = !0) {
      y(t, e, i);
    }
    _getConfig(t) {
      return (
        (t = this._mergeConfigObj(t, this._element)),
        (t = this._configAfterMerge(t)),
        this._typeCheckConfig(t),
        t
      );
    }
    static getInstance(t) {
      return H.get(c(t), this.DATA_KEY);
    }
    static getOrCreateInstance(t, e = {}) {
      return (
        this.getInstance(t) || new this(t, 'object' == typeof e ? e : null)
      );
    }
    static get VERSION() {
      return '5.2.3';
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(t) {
      return `${t}${this.EVENT_KEY}`;
    }
  }
  const K = (t, e = 'hide') => {
    const i = `click.dismiss${t.EVENT_KEY}`,
      s = t.NAME;
    $.on(document, i, `[data-bs-dismiss="${s}"]`, function (i) {
      if ((['A', 'AREA'].includes(this.tagName) && i.preventDefault(), d(this)))
        return;
      const n = r(this) || this.closest(`.${s}`);
      t.getOrCreateInstance(n)[e]();
    });
  };
  class Q extends V {
    static get NAME() {
      return 'alert';
    }
    close() {
      if ($.trigger(this._element, 'close.bs.alert').defaultPrevented) return;
      this._element.classList.remove('show');
      const t = this._element.classList.contains('fade');
      this._queueCallback(() => this._destroyElement(), this._element, t);
    }
    _destroyElement() {
      this._element.remove(),
        $.trigger(this._element, 'closed.bs.alert'),
        this.dispose();
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Q.getOrCreateInstance(this);
        if ('string' == typeof t) {
          if (void 0 === e[t] || t.startsWith('_') || 'constructor' === t)
            throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  K(Q, 'close'), b(Q);
  const X = '[data-bs-toggle="button"]';
  class Y extends V {
    static get NAME() {
      return 'button';
    }
    toggle() {
      this._element.setAttribute(
        'aria-pressed',
        this._element.classList.toggle('active')
      );
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Y.getOrCreateInstance(this);
        'toggle' === t && e[t]();
      });
    }
  }
  $.on(document, 'click.bs.button.data-api', X, (t) => {
    t.preventDefault();
    const e = t.target.closest(X);
    Y.getOrCreateInstance(e).toggle();
  }),
    b(Y);
  const U = {
      find: (t, e = document.documentElement) =>
        [].concat(...Element.prototype.querySelectorAll.call(e, t)),
      findOne: (t, e = document.documentElement) =>
        Element.prototype.querySelector.call(e, t),
      children: (t, e) => [].concat(...t.children).filter((t) => t.matches(e)),
      parents(t, e) {
        const i = [];
        let s = t.parentNode.closest(e);
        for (; s; ) i.push(s), (s = s.parentNode.closest(e));
        return i;
      },
      prev(t, e) {
        let i = t.previousElementSibling;
        for (; i; ) {
          if (i.matches(e)) return [i];
          i = i.previousElementSibling;
        }
        return [];
      },
      next(t, e) {
        let i = t.nextElementSibling;
        for (; i; ) {
          if (i.matches(e)) return [i];
          i = i.nextElementSibling;
        }
        return [];
      },
      focusableChildren(t) {
        const e = [
          'a',
          'button',
          'input',
          'textarea',
          'select',
          'details',
          '[tabindex]',
          '[contenteditable="true"]',
        ]
          .map((t) => `${t}:not([tabindex^="-"])`)
          .join(',');
        return this.find(e, t).filter((t) => !d(t) && h(t));
      },
    },
    G = { endCallback: null, leftCallback: null, rightCallback: null },
    J = {
      endCallback: '(function|null)',
      leftCallback: '(function|null)',
      rightCallback: '(function|null)',
    };
  class Z extends R {
    constructor(t, e) {
      super(),
        (this._element = t),
        t &&
          Z.isSupported() &&
          ((this._config = this._getConfig(e)),
          (this._deltaX = 0),
          (this._supportPointerEvents = Boolean(window.PointerEvent)),
          this._initEvents());
    }
    static get Default() {
      return G;
    }
    static get DefaultType() {
      return J;
    }
    static get NAME() {
      return 'swipe';
    }
    dispose() {
      $.off(this._element, '.bs.swipe');
    }
    _start(t) {
      this._supportPointerEvents
        ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX)
        : (this._deltaX = t.touches[0].clientX);
    }
    _end(t) {
      this._eventIsPointerPenTouch(t) &&
        (this._deltaX = t.clientX - this._deltaX),
        this._handleSwipe(),
        v(this._config.endCallback);
    }
    _move(t) {
      this._deltaX =
        t.touches && t.touches.length > 1
          ? 0
          : t.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const t = Math.abs(this._deltaX);
      if (t <= 40) return;
      const e = t / this._deltaX;
      (this._deltaX = 0),
        e && v(e > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      this._supportPointerEvents
        ? ($.on(this._element, 'pointerdown.bs.swipe', (t) => this._start(t)),
          $.on(this._element, 'pointerup.bs.swipe', (t) => this._end(t)),
          this._element.classList.add('pointer-event'))
        : ($.on(this._element, 'touchstart.bs.swipe', (t) => this._start(t)),
          $.on(this._element, 'touchmove.bs.swipe', (t) => this._move(t)),
          $.on(this._element, 'touchend.bs.swipe', (t) => this._end(t)));
    }
    _eventIsPointerPenTouch(t) {
      return (
        this._supportPointerEvents &&
        ('pen' === t.pointerType || 'touch' === t.pointerType)
      );
    }
    static isSupported() {
      return (
        'ontouchstart' in document.documentElement ||
        navigator.maxTouchPoints > 0
      );
    }
  }
  const tt = 'next',
    et = 'prev',
    it = 'left',
    st = 'right',
    nt = 'slid.bs.carousel',
    ot = 'carousel',
    rt = 'active',
    at = { ArrowLeft: st, ArrowRight: it },
    lt = {
      interval: 5e3,
      keyboard: !0,
      pause: 'hover',
      ride: !1,
      touch: !0,
      wrap: !0,
    },
    ct = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      pause: '(string|boolean)',
      ride: '(boolean|string)',
      touch: 'boolean',
      wrap: 'boolean',
    };
  class ht extends V {
    constructor(t, e) {
      super(t, e),
        (this._interval = null),
        (this._activeElement = null),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this._swipeHelper = null),
        (this._indicatorsElement = U.findOne(
          '.carousel-indicators',
          this._element
        )),
        this._addEventListeners(),
        this._config.ride === ot && this.cycle();
    }
    static get Default() {
      return lt;
    }
    static get DefaultType() {
      return ct;
    }
    static get NAME() {
      return 'carousel';
    }
    next() {
      this._slide(tt);
    }
    nextWhenVisible() {
      !document.hidden && h(this._element) && this.next();
    }
    prev() {
      this._slide(et);
    }
    pause() {
      this._isSliding && a(this._element), this._clearInterval();
    }
    cycle() {
      this._clearInterval(),
        this._updateInterval(),
        (this._interval = setInterval(
          () => this.nextWhenVisible(),
          this._config.interval
        ));
    }
    _maybeEnableCycle() {
      this._config.ride &&
        (this._isSliding
          ? $.one(this._element, nt, () => this.cycle())
          : this.cycle());
    }
    to(t) {
      const e = this._getItems();
      if (t > e.length - 1 || t < 0) return;
      if (this._isSliding)
        return void $.one(this._element, nt, () => this.to(t));
      const i = this._getItemIndex(this._getActive());
      if (i === t) return;
      const s = t > i ? tt : et;
      this._slide(s, e[t]);
    }
    dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
    }
    _configAfterMerge(t) {
      return (t.defaultInterval = t.interval), t;
    }
    _addEventListeners() {
      this._config.keyboard &&
        $.on(this._element, 'keydown.bs.carousel', (t) => this._keydown(t)),
        'hover' === this._config.pause &&
          ($.on(this._element, 'mouseenter.bs.carousel', () => this.pause()),
          $.on(this._element, 'mouseleave.bs.carousel', () =>
            this._maybeEnableCycle()
          )),
        this._config.touch && Z.isSupported() && this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      for (const t of U.find('.carousel-item img', this._element))
        $.on(t, 'dragstart.bs.carousel', (t) => t.preventDefault());
      const t = {
        leftCallback: () => this._slide(this._directionToOrder(it)),
        rightCallback: () => this._slide(this._directionToOrder(st)),
        endCallback: () => {
          'hover' === this._config.pause &&
            (this.pause(),
            this.touchTimeout && clearTimeout(this.touchTimeout),
            (this.touchTimeout = setTimeout(
              () => this._maybeEnableCycle(),
              500 + this._config.interval
            )));
        },
      };
      this._swipeHelper = new Z(this._element, t);
    }
    _keydown(t) {
      if (/input|textarea/i.test(t.target.tagName)) return;
      const e = at[t.key];
      e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
    }
    _getItemIndex(t) {
      return this._getItems().indexOf(t);
    }
    _setActiveIndicatorElement(t) {
      if (!this._indicatorsElement) return;
      const e = U.findOne('.active', this._indicatorsElement);
      e.classList.remove(rt), e.removeAttribute('aria-current');
      const i = U.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
      i && (i.classList.add(rt), i.setAttribute('aria-current', 'true'));
    }
    _updateInterval() {
      const t = this._activeElement || this._getActive();
      if (!t) return;
      const e = Number.parseInt(t.getAttribute('data-bs-interval'), 10);
      this._config.interval = e || this._config.defaultInterval;
    }
    _slide(t, e = null) {
      if (this._isSliding) return;
      const i = this._getActive(),
        s = t === tt,
        n = e || w(this._getItems(), i, s, this._config.wrap);
      if (n === i) return;
      const o = this._getItemIndex(n),
        r = (e) =>
          $.trigger(this._element, e, {
            relatedTarget: n,
            direction: this._orderToDirection(t),
            from: this._getItemIndex(i),
            to: o,
          });
      if (r('slide.bs.carousel').defaultPrevented) return;
      if (!i || !n) return;
      const a = Boolean(this._interval);
      this.pause(),
        (this._isSliding = !0),
        this._setActiveIndicatorElement(o),
        (this._activeElement = n);
      const l = s ? 'carousel-item-start' : 'carousel-item-end',
        c = s ? 'carousel-item-next' : 'carousel-item-prev';
      n.classList.add(c),
        g(n),
        i.classList.add(l),
        n.classList.add(l),
        this._queueCallback(
          () => {
            n.classList.remove(l, c),
              n.classList.add(rt),
              i.classList.remove(rt, c, l),
              (this._isSliding = !1),
              r(nt);
          },
          i,
          this._isAnimated()
        ),
        a && this.cycle();
    }
    _isAnimated() {
      return this._element.classList.contains('slide');
    }
    _getActive() {
      return U.findOne('.active.carousel-item', this._element);
    }
    _getItems() {
      return U.find('.carousel-item', this._element);
    }
    _clearInterval() {
      this._interval &&
        (clearInterval(this._interval), (this._interval = null));
    }
    _directionToOrder(t) {
      return m() ? (t === it ? et : tt) : t === it ? tt : et;
    }
    _orderToDirection(t) {
      return m() ? (t === et ? it : st) : t === et ? st : it;
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = ht.getOrCreateInstance(this, t);
        if ('number' != typeof t) {
          if ('string' == typeof t) {
            if (void 0 === e[t] || t.startsWith('_') || 'constructor' === t)
              throw new TypeError(`No method named "${t}"`);
            e[t]();
          }
        } else e.to(t);
      });
    }
  }
  $.on(
    document,
    'click.bs.carousel.data-api',
    '[data-bs-slide], [data-bs-slide-to]',
    function (t) {
      const e = r(this);
      if (!e || !e.classList.contains(ot)) return;
      t.preventDefault();
      const i = ht.getOrCreateInstance(e),
        s = this.getAttribute('data-bs-slide-to');
      return s
        ? (i.to(s), void i._maybeEnableCycle())
        : 'next' === W.getDataAttribute(this, 'slide')
        ? (i.next(), void i._maybeEnableCycle())
        : (i.prev(), void i._maybeEnableCycle());
    }
  ),
    $.on(window, 'load.bs.carousel.data-api', () => {
      const t = U.find('[data-bs-ride="carousel"]');
      for (const e of t) ht.getOrCreateInstance(e);
    }),
    b(ht);
  const dt = 'show',
    ut = 'collapse',
    _t = 'collapsing',
    gt = '[data-bs-toggle="collapse"]',
    ft = { parent: null, toggle: !0 },
    pt = { parent: '(null|element)', toggle: 'boolean' };
  class mt extends V {
    constructor(t, e) {
      super(t, e), (this._isTransitioning = !1), (this._triggerArray = []);
      const i = U.find(gt);
      for (const t of i) {
        const e = o(t),
          i = U.find(e).filter((t) => t === this._element);
        null !== e && i.length && this._triggerArray.push(t);
      }
      this._initializeChildren(),
        this._config.parent ||
          this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
        this._config.toggle && this.toggle();
    }
    static get Default() {
      return ft;
    }
    static get DefaultType() {
      return pt;
    }
    static get NAME() {
      return 'collapse';
    }
    toggle() {
      this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._isShown()) return;
      let t = [];
      if (
        (this._config.parent &&
          (t = this._getFirstLevelChildren(
            '.collapse.show, .collapse.collapsing'
          )
            .filter((t) => t !== this._element)
            .map((t) => mt.getOrCreateInstance(t, { toggle: !1 }))),
        t.length && t[0]._isTransitioning)
      )
        return;
      if ($.trigger(this._element, 'show.bs.collapse').defaultPrevented) return;
      for (const e of t) e.hide();
      const e = this._getDimension();
      this._element.classList.remove(ut),
        this._element.classList.add(_t),
        (this._element.style[e] = 0),
        this._addAriaAndCollapsedClass(this._triggerArray, !0),
        (this._isTransitioning = !0);
      const i = `scroll${e[0].toUpperCase() + e.slice(1)}`;
      this._queueCallback(
        () => {
          (this._isTransitioning = !1),
            this._element.classList.remove(_t),
            this._element.classList.add(ut, dt),
            (this._element.style[e] = ''),
            $.trigger(this._element, 'shown.bs.collapse');
        },
        this._element,
        !0
      ),
        (this._element.style[e] = `${this._element[i]}px`);
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) return;
      if ($.trigger(this._element, 'hide.bs.collapse').defaultPrevented) return;
      const t = this._getDimension();
      (this._element.style[t] = `${
        this._element.getBoundingClientRect()[t]
      }px`),
        g(this._element),
        this._element.classList.add(_t),
        this._element.classList.remove(ut, dt);
      for (const t of this._triggerArray) {
        const e = r(t);
        e && !this._isShown(e) && this._addAriaAndCollapsedClass([t], !1);
      }
      (this._isTransitioning = !0),
        (this._element.style[t] = ''),
        this._queueCallback(
          () => {
            (this._isTransitioning = !1),
              this._element.classList.remove(_t),
              this._element.classList.add(ut),
              $.trigger(this._element, 'hidden.bs.collapse');
          },
          this._element,
          !0
        );
    }
    _isShown(t = this._element) {
      return t.classList.contains(dt);
    }
    _configAfterMerge(t) {
      return (t.toggle = Boolean(t.toggle)), (t.parent = c(t.parent)), t;
    }
    _getDimension() {
      return this._element.classList.contains('collapse-horizontal')
        ? 'width'
        : 'height';
    }
    _initializeChildren() {
      if (!this._config.parent) return;
      const t = this._getFirstLevelChildren(gt);
      for (const e of t) {
        const t = r(e);
        t && this._addAriaAndCollapsedClass([e], this._isShown(t));
      }
    }
    _getFirstLevelChildren(t) {
      const e = U.find(':scope .collapse .collapse', this._config.parent);
      return U.find(t, this._config.parent).filter((t) => !e.includes(t));
    }
    _addAriaAndCollapsedClass(t, e) {
      if (t.length)
        for (const i of t)
          i.classList.toggle('collapsed', !e),
            i.setAttribute('aria-expanded', e);
    }
    static jQueryInterface(t) {
      const e = {};
      return (
        'string' == typeof t && /show|hide/.test(t) && (e.toggle = !1),
        this.each(function () {
          const i = mt.getOrCreateInstance(this, e);
          if ('string' == typeof t) {
            if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
            i[t]();
          }
        })
      );
    }
  }
  $.on(document, 'click.bs.collapse.data-api', gt, function (t) {
    ('A' === t.target.tagName ||
      (t.delegateTarget && 'A' === t.delegateTarget.tagName)) &&
      t.preventDefault();
    const e = o(this),
      i = U.find(e);
    for (const t of i) mt.getOrCreateInstance(t, { toggle: !1 }).toggle();
  }),
    b(mt);
  const bt = 'dropdown',
    vt = 'ArrowUp',
    yt = 'ArrowDown',
    wt = 'click.bs.dropdown.data-api',
    At = 'keydown.bs.dropdown.data-api',
    Et = 'show',
    Ct = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    Tt = `${Ct}.show`,
    kt = '.dropdown-menu',
    Lt = m() ? 'top-end' : 'top-start',
    Ot = m() ? 'top-start' : 'top-end',
    It = m() ? 'bottom-end' : 'bottom-start',
    St = m() ? 'bottom-start' : 'bottom-end',
    Dt = m() ? 'left-start' : 'right-start',
    Nt = m() ? 'right-start' : 'left-start',
    Pt = {
      autoClose: !0,
      boundary: 'clippingParents',
      display: 'dynamic',
      offset: [0, 2],
      popperConfig: null,
      reference: 'toggle',
    },
    xt = {
      autoClose: '(boolean|string)',
      boundary: '(string|element)',
      display: 'string',
      offset: '(array|string|function)',
      popperConfig: '(null|object|function)',
      reference: '(string|element|object)',
    };
  class Mt extends V {
    constructor(t, e) {
      super(t, e),
        (this._popper = null),
        (this._parent = this._element.parentNode),
        (this._menu =
          U.next(this._element, kt)[0] ||
          U.prev(this._element, kt)[0] ||
          U.findOne(kt, this._parent)),
        (this._inNavbar = this._detectNavbar());
    }
    static get Default() {
      return Pt;
    }
    static get DefaultType() {
      return xt;
    }
    static get NAME() {
      return bt;
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (d(this._element) || this._isShown()) return;
      const t = { relatedTarget: this._element };
      if (!$.trigger(this._element, 'show.bs.dropdown', t).defaultPrevented) {
        if (
          (this._createPopper(),
          'ontouchstart' in document.documentElement &&
            !this._parent.closest('.navbar-nav'))
        )
          for (const t of [].concat(...document.body.children))
            $.on(t, 'mouseover', _);
        this._element.focus(),
          this._element.setAttribute('aria-expanded', !0),
          this._menu.classList.add(Et),
          this._element.classList.add(Et),
          $.trigger(this._element, 'shown.bs.dropdown', t);
      }
    }
    hide() {
      if (d(this._element) || !this._isShown()) return;
      const t = { relatedTarget: this._element };
      this._completeHide(t);
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      (this._inNavbar = this._detectNavbar()),
        this._popper && this._popper.update();
    }
    _completeHide(t) {
      if (!$.trigger(this._element, 'hide.bs.dropdown', t).defaultPrevented) {
        if ('ontouchstart' in document.documentElement)
          for (const t of [].concat(...document.body.children))
            $.off(t, 'mouseover', _);
        this._popper && this._popper.destroy(),
          this._menu.classList.remove(Et),
          this._element.classList.remove(Et),
          this._element.setAttribute('aria-expanded', 'false'),
          W.removeDataAttribute(this._menu, 'popper'),
          $.trigger(this._element, 'hidden.bs.dropdown', t);
      }
    }
    _getConfig(t) {
      if (
        'object' == typeof (t = super._getConfig(t)).reference &&
        !l(t.reference) &&
        'function' != typeof t.reference.getBoundingClientRect
      )
        throw new TypeError(
          `${bt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
        );
      return t;
    }
    _createPopper() {
      if (void 0 === i)
        throw new TypeError(
          "Bootstrap's dropdowns require Popper (https://popper.js.org)"
        );
      let t = this._element;
      'parent' === this._config.reference
        ? (t = this._parent)
        : l(this._config.reference)
        ? (t = c(this._config.reference))
        : 'object' == typeof this._config.reference &&
          (t = this._config.reference);
      const e = this._getPopperConfig();
      this._popper = i.createPopper(t, this._menu, e);
    }
    _isShown() {
      return this._menu.classList.contains(Et);
    }
    _getPlacement() {
      const t = this._parent;
      if (t.classList.contains('dropend')) return Dt;
      if (t.classList.contains('dropstart')) return Nt;
      if (t.classList.contains('dropup-center')) return 'top';
      if (t.classList.contains('dropdown-center')) return 'bottom';
      const e =
        'end' ===
        getComputedStyle(this._menu).getPropertyValue('--bs-position').trim();
      return t.classList.contains('dropup') ? (e ? Ot : Lt) : e ? St : It;
    }
    _detectNavbar() {
      return null !== this._element.closest('.navbar');
    }
    _getOffset() {
      const { offset: t } = this._config;
      return 'string' == typeof t
        ? t.split(',').map((t) => Number.parseInt(t, 10))
        : 'function' == typeof t
        ? (e) => t(e, this._element)
        : t;
    }
    _getPopperConfig() {
      const t = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: 'preventOverflow',
            options: { boundary: this._config.boundary },
          },
          { name: 'offset', options: { offset: this._getOffset() } },
        ],
      };
      return (
        (this._inNavbar || 'static' === this._config.display) &&
          (W.setDataAttribute(this._menu, 'popper', 'static'),
          (t.modifiers = [{ name: 'applyStyles', enabled: !1 }])),
        {
          ...t,
          ...('function' == typeof this._config.popperConfig
            ? this._config.popperConfig(t)
            : this._config.popperConfig),
        }
      );
    }
    _selectMenuItem({ key: t, target: e }) {
      const i = U.find(
        '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)',
        this._menu
      ).filter((t) => h(t));
      i.length && w(i, e, t === yt, !i.includes(e)).focus();
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Mt.getOrCreateInstance(this, t);
        if ('string' == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
    static clearMenus(t) {
      if (2 === t.button || ('keyup' === t.type && 'Tab' !== t.key)) return;
      const e = U.find(Tt);
      for (const i of e) {
        const e = Mt.getInstance(i);
        if (!e || !1 === e._config.autoClose) continue;
        const s = t.composedPath(),
          n = s.includes(e._menu);
        if (
          s.includes(e._element) ||
          ('inside' === e._config.autoClose && !n) ||
          ('outside' === e._config.autoClose && n)
        )
          continue;
        if (
          e._menu.contains(t.target) &&
          (('keyup' === t.type && 'Tab' === t.key) ||
            /input|select|option|textarea|form/i.test(t.target.tagName))
        )
          continue;
        const o = { relatedTarget: e._element };
        'click' === t.type && (o.clickEvent = t), e._completeHide(o);
      }
    }
    static dataApiKeydownHandler(t) {
      const e = /input|textarea/i.test(t.target.tagName),
        i = 'Escape' === t.key,
        s = [vt, yt].includes(t.key);
      if (!s && !i) return;
      if (e && !i) return;
      t.preventDefault();
      const n = this.matches(Ct)
          ? this
          : U.prev(this, Ct)[0] ||
            U.next(this, Ct)[0] ||
            U.findOne(Ct, t.delegateTarget.parentNode),
        o = Mt.getOrCreateInstance(n);
      if (s) return t.stopPropagation(), o.show(), void o._selectMenuItem(t);
      o._isShown() && (t.stopPropagation(), o.hide(), n.focus());
    }
  }
  $.on(document, At, Ct, Mt.dataApiKeydownHandler),
    $.on(document, At, kt, Mt.dataApiKeydownHandler),
    $.on(document, wt, Mt.clearMenus),
    $.on(document, 'keyup.bs.dropdown.data-api', Mt.clearMenus),
    $.on(document, wt, Ct, function (t) {
      t.preventDefault(), Mt.getOrCreateInstance(this).toggle();
    }),
    b(Mt);
  const jt = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    $t = '.sticky-top',
    Ft = 'padding-right',
    zt = 'margin-right';
  class Ht {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const t = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - t);
    }
    hide() {
      const t = this.getWidth();
      this._disableOverFlow(),
        this._setElementAttributes(this._element, Ft, (e) => e + t),
        this._setElementAttributes(jt, Ft, (e) => e + t),
        this._setElementAttributes($t, zt, (e) => e - t);
    }
    reset() {
      this._resetElementAttributes(this._element, 'overflow'),
        this._resetElementAttributes(this._element, Ft),
        this._resetElementAttributes(jt, Ft),
        this._resetElementAttributes($t, zt);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow'),
        (this._element.style.overflow = 'hidden');
    }
    _setElementAttributes(t, e, i) {
      const s = this.getWidth();
      this._applyManipulationCallback(t, (t) => {
        if (t !== this._element && window.innerWidth > t.clientWidth + s)
          return;
        this._saveInitialAttribute(t, e);
        const n = window.getComputedStyle(t).getPropertyValue(e);
        t.style.setProperty(e, `${i(Number.parseFloat(n))}px`);
      });
    }
    _saveInitialAttribute(t, e) {
      const i = t.style.getPropertyValue(e);
      i && W.setDataAttribute(t, e, i);
    }
    _resetElementAttributes(t, e) {
      this._applyManipulationCallback(t, (t) => {
        const i = W.getDataAttribute(t, e);
        null !== i
          ? (W.removeDataAttribute(t, e), t.style.setProperty(e, i))
          : t.style.removeProperty(e);
      });
    }
    _applyManipulationCallback(t, e) {
      if (l(t)) e(t);
      else for (const i of U.find(t, this._element)) e(i);
    }
  }
  const qt = 'show',
    Bt = 'mousedown.bs.backdrop',
    Wt = {
      className: 'modal-backdrop',
      clickCallback: null,
      isAnimated: !1,
      isVisible: !0,
      rootElement: 'body',
    },
    Rt = {
      className: 'string',
      clickCallback: '(function|null)',
      isAnimated: 'boolean',
      isVisible: 'boolean',
      rootElement: '(element|string)',
    };
  class Vt extends R {
    constructor(t) {
      super(),
        (this._config = this._getConfig(t)),
        (this._isAppended = !1),
        (this._element = null);
    }
    static get Default() {
      return Wt;
    }
    static get DefaultType() {
      return Rt;
    }
    static get NAME() {
      return 'backdrop';
    }
    show(t) {
      if (!this._config.isVisible) return void v(t);
      this._append();
      const e = this._getElement();
      this._config.isAnimated && g(e),
        e.classList.add(qt),
        this._emulateAnimation(() => {
          v(t);
        });
    }
    hide(t) {
      this._config.isVisible
        ? (this._getElement().classList.remove(qt),
          this._emulateAnimation(() => {
            this.dispose(), v(t);
          }))
        : v(t);
    }
    dispose() {
      this._isAppended &&
        ($.off(this._element, Bt),
        this._element.remove(),
        (this._isAppended = !1));
    }
    _getElement() {
      if (!this._element) {
        const t = document.createElement('div');
        (t.className = this._config.className),
          this._config.isAnimated && t.classList.add('fade'),
          (this._element = t);
      }
      return this._element;
    }
    _configAfterMerge(t) {
      return (t.rootElement = c(t.rootElement)), t;
    }
    _append() {
      if (this._isAppended) return;
      const t = this._getElement();
      this._config.rootElement.append(t),
        $.on(t, Bt, () => {
          v(this._config.clickCallback);
        }),
        (this._isAppended = !0);
    }
    _emulateAnimation(t) {
      y(t, this._getElement(), this._config.isAnimated);
    }
  }
  const Kt = '.bs.focustrap',
    Qt = 'backward',
    Xt = { autofocus: !0, trapElement: null },
    Yt = { autofocus: 'boolean', trapElement: 'element' };
  class Ut extends R {
    constructor(t) {
      super(),
        (this._config = this._getConfig(t)),
        (this._isActive = !1),
        (this._lastTabNavDirection = null);
    }
    static get Default() {
      return Xt;
    }
    static get DefaultType() {
      return Yt;
    }
    static get NAME() {
      return 'focustrap';
    }
    activate() {
      this._isActive ||
        (this._config.autofocus && this._config.trapElement.focus(),
        $.off(document, Kt),
        $.on(document, 'focusin.bs.focustrap', (t) => this._handleFocusin(t)),
        $.on(document, 'keydown.tab.bs.focustrap', (t) =>
          this._handleKeydown(t)
        ),
        (this._isActive = !0));
    }
    deactivate() {
      this._isActive && ((this._isActive = !1), $.off(document, Kt));
    }
    _handleFocusin(t) {
      const { trapElement: e } = this._config;
      if (t.target === document || t.target === e || e.contains(t.target))
        return;
      const i = U.focusableChildren(e);
      0 === i.length
        ? e.focus()
        : this._lastTabNavDirection === Qt
        ? i[i.length - 1].focus()
        : i[0].focus();
    }
    _handleKeydown(t) {
      'Tab' === t.key &&
        (this._lastTabNavDirection = t.shiftKey ? Qt : 'forward');
    }
  }
  const Gt = 'hidden.bs.modal',
    Jt = 'show.bs.modal',
    Zt = 'modal-open',
    te = 'show',
    ee = 'modal-static',
    ie = { backdrop: !0, focus: !0, keyboard: !0 },
    se = {
      backdrop: '(boolean|string)',
      focus: 'boolean',
      keyboard: 'boolean',
    };
  class ne extends V {
    constructor(t, e) {
      super(t, e),
        (this._dialog = U.findOne('.modal-dialog', this._element)),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        (this._isShown = !1),
        (this._isTransitioning = !1),
        (this._scrollBar = new Ht()),
        this._addEventListeners();
    }
    static get Default() {
      return ie;
    }
    static get DefaultType() {
      return se;
    }
    static get NAME() {
      return 'modal';
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      this._isShown ||
        this._isTransitioning ||
        $.trigger(this._element, Jt, { relatedTarget: t }).defaultPrevented ||
        ((this._isShown = !0),
        (this._isTransitioning = !0),
        this._scrollBar.hide(),
        document.body.classList.add(Zt),
        this._adjustDialog(),
        this._backdrop.show(() => this._showElement(t)));
    }
    hide() {
      this._isShown &&
        !this._isTransitioning &&
        ($.trigger(this._element, 'hide.bs.modal').defaultPrevented ||
          ((this._isShown = !1),
          (this._isTransitioning = !0),
          this._focustrap.deactivate(),
          this._element.classList.remove(te),
          this._queueCallback(
            () => this._hideModal(),
            this._element,
            this._isAnimated()
          )));
    }
    dispose() {
      for (const t of [window, this._dialog]) $.off(t, '.bs.modal');
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new Vt({
        isVisible: Boolean(this._config.backdrop),
        isAnimated: this._isAnimated(),
      });
    }
    _initializeFocusTrap() {
      return new Ut({ trapElement: this._element });
    }
    _showElement(t) {
      document.body.contains(this._element) ||
        document.body.append(this._element),
        (this._element.style.display = 'block'),
        this._element.removeAttribute('aria-hidden'),
        this._element.setAttribute('aria-modal', !0),
        this._element.setAttribute('role', 'dialog'),
        (this._element.scrollTop = 0);
      const e = U.findOne('.modal-body', this._dialog);
      e && (e.scrollTop = 0),
        g(this._element),
        this._element.classList.add(te),
        this._queueCallback(
          () => {
            this._config.focus && this._focustrap.activate(),
              (this._isTransitioning = !1),
              $.trigger(this._element, 'shown.bs.modal', { relatedTarget: t });
          },
          this._dialog,
          this._isAnimated()
        );
    }
    _addEventListeners() {
      $.on(this._element, 'keydown.dismiss.bs.modal', (t) => {
        if ('Escape' === t.key)
          return this._config.keyboard
            ? (t.preventDefault(), void this.hide())
            : void this._triggerBackdropTransition();
      }),
        $.on(window, 'resize.bs.modal', () => {
          this._isShown && !this._isTransitioning && this._adjustDialog();
        }),
        $.on(this._element, 'mousedown.dismiss.bs.modal', (t) => {
          $.one(this._element, 'click.dismiss.bs.modal', (e) => {
            this._element === t.target &&
              this._element === e.target &&
              ('static' !== this._config.backdrop
                ? this._config.backdrop && this.hide()
                : this._triggerBackdropTransition());
          });
        });
    }
    _hideModal() {
      (this._element.style.display = 'none'),
        this._element.setAttribute('aria-hidden', !0),
        this._element.removeAttribute('aria-modal'),
        this._element.removeAttribute('role'),
        (this._isTransitioning = !1),
        this._backdrop.hide(() => {
          document.body.classList.remove(Zt),
            this._resetAdjustments(),
            this._scrollBar.reset(),
            $.trigger(this._element, Gt);
        });
    }
    _isAnimated() {
      return this._element.classList.contains('fade');
    }
    _triggerBackdropTransition() {
      if ($.trigger(this._element, 'hidePrevented.bs.modal').defaultPrevented)
        return;
      const t =
          this._element.scrollHeight > document.documentElement.clientHeight,
        e = this._element.style.overflowY;
      'hidden' === e ||
        this._element.classList.contains(ee) ||
        (t || (this._element.style.overflowY = 'hidden'),
        this._element.classList.add(ee),
        this._queueCallback(() => {
          this._element.classList.remove(ee),
            this._queueCallback(() => {
              this._element.style.overflowY = e;
            }, this._dialog);
        }, this._dialog),
        this._element.focus());
    }
    _adjustDialog() {
      const t =
          this._element.scrollHeight > document.documentElement.clientHeight,
        e = this._scrollBar.getWidth(),
        i = e > 0;
      if (i && !t) {
        const t = m() ? 'paddingLeft' : 'paddingRight';
        this._element.style[t] = `${e}px`;
      }
      if (!i && t) {
        const t = m() ? 'paddingRight' : 'paddingLeft';
        this._element.style[t] = `${e}px`;
      }
    }
    _resetAdjustments() {
      (this._element.style.paddingLeft = ''),
        (this._element.style.paddingRight = '');
    }
    static jQueryInterface(t, e) {
      return this.each(function () {
        const i = ne.getOrCreateInstance(this, t);
        if ('string' == typeof t) {
          if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
          i[t](e);
        }
      });
    }
  }
  $.on(
    document,
    'click.bs.modal.data-api',
    '[data-bs-toggle="modal"]',
    function (t) {
      const e = r(this);
      ['A', 'AREA'].includes(this.tagName) && t.preventDefault(),
        $.one(e, Jt, (t) => {
          t.defaultPrevented ||
            $.one(e, Gt, () => {
              h(this) && this.focus();
            });
        });
      const i = U.findOne('.modal.show');
      i && ne.getInstance(i).hide(), ne.getOrCreateInstance(e).toggle(this);
    }
  ),
    K(ne),
    b(ne);
  const oe = 'show',
    re = 'showing',
    ae = 'hiding',
    le = '.offcanvas.show',
    ce = 'hidePrevented.bs.offcanvas',
    he = 'hidden.bs.offcanvas',
    de = { backdrop: !0, keyboard: !0, scroll: !1 },
    ue = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      scroll: 'boolean',
    };
  class _e extends V {
    constructor(t, e) {
      super(t, e),
        (this._isShown = !1),
        (this._backdrop = this._initializeBackDrop()),
        (this._focustrap = this._initializeFocusTrap()),
        this._addEventListeners();
    }
    static get Default() {
      return de;
    }
    static get DefaultType() {
      return ue;
    }
    static get NAME() {
      return 'offcanvas';
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      this._isShown ||
        $.trigger(this._element, 'show.bs.offcanvas', { relatedTarget: t })
          .defaultPrevented ||
        ((this._isShown = !0),
        this._backdrop.show(),
        this._config.scroll || new Ht().hide(),
        this._element.setAttribute('aria-modal', !0),
        this._element.setAttribute('role', 'dialog'),
        this._element.classList.add(re),
        this._queueCallback(
          () => {
            (this._config.scroll && !this._config.backdrop) ||
              this._focustrap.activate(),
              this._element.classList.add(oe),
              this._element.classList.remove(re),
              $.trigger(this._element, 'shown.bs.offcanvas', {
                relatedTarget: t,
              });
          },
          this._element,
          !0
        ));
    }
    hide() {
      this._isShown &&
        ($.trigger(this._element, 'hide.bs.offcanvas').defaultPrevented ||
          (this._focustrap.deactivate(),
          this._element.blur(),
          (this._isShown = !1),
          this._element.classList.add(ae),
          this._backdrop.hide(),
          this._queueCallback(
            () => {
              this._element.classList.remove(oe, ae),
                this._element.removeAttribute('aria-modal'),
                this._element.removeAttribute('role'),
                this._config.scroll || new Ht().reset(),
                $.trigger(this._element, he);
            },
            this._element,
            !0
          )));
    }
    dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    _initializeBackDrop() {
      const t = Boolean(this._config.backdrop);
      return new Vt({
        className: 'offcanvas-backdrop',
        isVisible: t,
        isAnimated: !0,
        rootElement: this._element.parentNode,
        clickCallback: t
          ? () => {
              'static' !== this._config.backdrop
                ? this.hide()
                : $.trigger(this._element, ce);
            }
          : null,
      });
    }
    _initializeFocusTrap() {
      return new Ut({ trapElement: this._element });
    }
    _addEventListeners() {
      $.on(this._element, 'keydown.dismiss.bs.offcanvas', (t) => {
        'Escape' === t.key &&
          (this._config.keyboard ? this.hide() : $.trigger(this._element, ce));
      });
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = _e.getOrCreateInstance(this, t);
        if ('string' == typeof t) {
          if (void 0 === e[t] || t.startsWith('_') || 'constructor' === t)
            throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  $.on(
    document,
    'click.bs.offcanvas.data-api',
    '[data-bs-toggle="offcanvas"]',
    function (t) {
      const e = r(this);
      if ((['A', 'AREA'].includes(this.tagName) && t.preventDefault(), d(this)))
        return;
      $.one(e, he, () => {
        h(this) && this.focus();
      });
      const i = U.findOne(le);
      i && i !== e && _e.getInstance(i).hide(),
        _e.getOrCreateInstance(e).toggle(this);
    }
  ),
    $.on(window, 'load.bs.offcanvas.data-api', () => {
      for (const t of U.find(le)) _e.getOrCreateInstance(t).show();
    }),
    $.on(window, 'resize.bs.offcanvas', () => {
      for (const t of U.find('[aria-modal][class*=show][class*=offcanvas-]'))
        'fixed' !== getComputedStyle(t).position &&
          _e.getOrCreateInstance(t).hide();
    }),
    K(_e),
    b(_e);
  const ge = new Set([
      'background',
      'cite',
      'href',
      'itemtype',
      'longdesc',
      'poster',
      'src',
      'xlink:href',
    ]),
    fe = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
    pe =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
    me = (t, e) => {
      const i = t.nodeName.toLowerCase();
      return e.includes(i)
        ? !ge.has(i) || Boolean(fe.test(t.nodeValue) || pe.test(t.nodeValue))
        : e.filter((t) => t instanceof RegExp).some((t) => t.test(i));
    },
    be = {
      '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
      a: ['target', 'href', 'title', 'rel'],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: [],
    },
    ve = {
      allowList: be,
      content: {},
      extraClass: '',
      html: !1,
      sanitize: !0,
      sanitizeFn: null,
      template: '<div></div>',
    },
    ye = {
      allowList: 'object',
      content: 'object',
      extraClass: '(string|function)',
      html: 'boolean',
      sanitize: 'boolean',
      sanitizeFn: '(null|function)',
      template: 'string',
    },
    we = {
      entry: '(string|element|function|null)',
      selector: '(string|element)',
    };
  class Ae extends R {
    constructor(t) {
      super(), (this._config = this._getConfig(t));
    }
    static get Default() {
      return ve;
    }
    static get DefaultType() {
      return ye;
    }
    static get NAME() {
      return 'TemplateFactory';
    }
    getContent() {
      return Object.values(this._config.content)
        .map((t) => this._resolvePossibleFunction(t))
        .filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(t) {
      return (
        this._checkContent(t),
        (this._config.content = { ...this._config.content, ...t }),
        this
      );
    }
    toHtml() {
      const t = document.createElement('div');
      t.innerHTML = this._maybeSanitize(this._config.template);
      for (const [e, i] of Object.entries(this._config.content))
        this._setContent(t, i, e);
      const e = t.children[0],
        i = this._resolvePossibleFunction(this._config.extraClass);
      return i && e.classList.add(...i.split(' ')), e;
    }
    _typeCheckConfig(t) {
      super._typeCheckConfig(t), this._checkContent(t.content);
    }
    _checkContent(t) {
      for (const [e, i] of Object.entries(t))
        super._typeCheckConfig({ selector: e, entry: i }, we);
    }
    _setContent(t, e, i) {
      const s = U.findOne(i, t);
      s &&
        ((e = this._resolvePossibleFunction(e))
          ? l(e)
            ? this._putElementInTemplate(c(e), s)
            : this._config.html
            ? (s.innerHTML = this._maybeSanitize(e))
            : (s.textContent = e)
          : s.remove());
    }
    _maybeSanitize(t) {
      return this._config.sanitize
        ? (function (t, e, i) {
            if (!t.length) return t;
            if (i && 'function' == typeof i) return i(t);
            const s = new window.DOMParser().parseFromString(t, 'text/html'),
              n = [].concat(...s.body.querySelectorAll('*'));
            for (const t of n) {
              const i = t.nodeName.toLowerCase();
              if (!Object.keys(e).includes(i)) {
                t.remove();
                continue;
              }
              const s = [].concat(...t.attributes),
                n = [].concat(e['*'] || [], e[i] || []);
              for (const e of s) me(e, n) || t.removeAttribute(e.nodeName);
            }
            return s.body.innerHTML;
          })(t, this._config.allowList, this._config.sanitizeFn)
        : t;
    }
    _resolvePossibleFunction(t) {
      return 'function' == typeof t ? t(this) : t;
    }
    _putElementInTemplate(t, e) {
      if (this._config.html) return (e.innerHTML = ''), void e.append(t);
      e.textContent = t.textContent;
    }
  }
  const Ee = new Set(['sanitize', 'allowList', 'sanitizeFn']),
    Ce = 'fade',
    Te = 'show',
    ke = '.modal',
    Le = 'hide.bs.modal',
    Oe = 'hover',
    Ie = 'focus',
    Se = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: m() ? 'left' : 'right',
      BOTTOM: 'bottom',
      LEFT: m() ? 'right' : 'left',
    },
    De = {
      allowList: be,
      animation: !0,
      boundary: 'clippingParents',
      container: !1,
      customClass: '',
      delay: 0,
      fallbackPlacements: ['top', 'right', 'bottom', 'left'],
      html: !1,
      offset: [0, 0],
      placement: 'top',
      popperConfig: null,
      sanitize: !0,
      sanitizeFn: null,
      selector: !1,
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      title: '',
      trigger: 'hover focus',
    },
    Ne = {
      allowList: 'object',
      animation: 'boolean',
      boundary: '(string|element)',
      container: '(string|element|boolean)',
      customClass: '(string|function)',
      delay: '(number|object)',
      fallbackPlacements: 'array',
      html: 'boolean',
      offset: '(array|string|function)',
      placement: '(string|function)',
      popperConfig: '(null|object|function)',
      sanitize: 'boolean',
      sanitizeFn: '(null|function)',
      selector: '(string|boolean)',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
    };
  class Pe extends V {
    constructor(t, e) {
      if (void 0 === i)
        throw new TypeError(
          "Bootstrap's tooltips require Popper (https://popper.js.org)"
        );
      super(t, e),
        (this._isEnabled = !0),
        (this._timeout = 0),
        (this._isHovered = null),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this._templateFactory = null),
        (this._newContent = null),
        (this.tip = null),
        this._setListeners(),
        this._config.selector || this._fixTitle();
    }
    static get Default() {
      return De;
    }
    static get DefaultType() {
      return Ne;
    }
    static get NAME() {
      return 'tooltip';
    }
    enable() {
      this._isEnabled = !0;
    }
    disable() {
      this._isEnabled = !1;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      this._isEnabled &&
        ((this._activeTrigger.click = !this._activeTrigger.click),
        this._isShown() ? this._leave() : this._enter());
    }
    dispose() {
      clearTimeout(this._timeout),
        $.off(this._element.closest(ke), Le, this._hideModalHandler),
        this._element.getAttribute('data-bs-original-title') &&
          this._element.setAttribute(
            'title',
            this._element.getAttribute('data-bs-original-title')
          ),
        this._disposePopper(),
        super.dispose();
    }
    show() {
      if ('none' === this._element.style.display)
        throw new Error('Please use show on visible elements');
      if (!this._isWithContent() || !this._isEnabled) return;
      const t = $.trigger(this._element, this.constructor.eventName('show')),
        e = (
          u(this._element) || this._element.ownerDocument.documentElement
        ).contains(this._element);
      if (t.defaultPrevented || !e) return;
      this._disposePopper();
      const i = this._getTipElement();
      this._element.setAttribute('aria-describedby', i.getAttribute('id'));
      const { container: s } = this._config;
      if (
        (this._element.ownerDocument.documentElement.contains(this.tip) ||
          (s.append(i),
          $.trigger(this._element, this.constructor.eventName('inserted'))),
        (this._popper = this._createPopper(i)),
        i.classList.add(Te),
        'ontouchstart' in document.documentElement)
      )
        for (const t of [].concat(...document.body.children))
          $.on(t, 'mouseover', _);
      this._queueCallback(
        () => {
          $.trigger(this._element, this.constructor.eventName('shown')),
            !1 === this._isHovered && this._leave(),
            (this._isHovered = !1);
        },
        this.tip,
        this._isAnimated()
      );
    }
    hide() {
      if (
        this._isShown() &&
        !$.trigger(this._element, this.constructor.eventName('hide'))
          .defaultPrevented
      ) {
        if (
          (this._getTipElement().classList.remove(Te),
          'ontouchstart' in document.documentElement)
        )
          for (const t of [].concat(...document.body.children))
            $.off(t, 'mouseover', _);
        (this._activeTrigger.click = !1),
          (this._activeTrigger.focus = !1),
          (this._activeTrigger.hover = !1),
          (this._isHovered = null),
          this._queueCallback(
            () => {
              this._isWithActiveTrigger() ||
                (this._isHovered || this._disposePopper(),
                this._element.removeAttribute('aria-describedby'),
                $.trigger(this._element, this.constructor.eventName('hidden')));
            },
            this.tip,
            this._isAnimated()
          );
      }
    }
    update() {
      this._popper && this._popper.update();
    }
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      return (
        this.tip ||
          (this.tip = this._createTipElement(
            this._newContent || this._getContentForTemplate()
          )),
        this.tip
      );
    }
    _createTipElement(t) {
      const e = this._getTemplateFactory(t).toHtml();
      if (!e) return null;
      e.classList.remove(Ce, Te),
        e.classList.add(`bs-${this.constructor.NAME}-auto`);
      const i = ((t) => {
        do {
          t += Math.floor(1e6 * Math.random());
        } while (document.getElementById(t));
        return t;
      })(this.constructor.NAME).toString();
      return (
        e.setAttribute('id', i), this._isAnimated() && e.classList.add(Ce), e
      );
    }
    setContent(t) {
      (this._newContent = t),
        this._isShown() && (this._disposePopper(), this.show());
    }
    _getTemplateFactory(t) {
      return (
        this._templateFactory
          ? this._templateFactory.changeContent(t)
          : (this._templateFactory = new Ae({
              ...this._config,
              content: t,
              extraClass: this._resolvePossibleFunction(
                this._config.customClass
              ),
            })),
        this._templateFactory
      );
    }
    _getContentForTemplate() {
      return { '.tooltip-inner': this._getTitle() };
    }
    _getTitle() {
      return (
        this._resolvePossibleFunction(this._config.title) ||
        this._element.getAttribute('data-bs-original-title')
      );
    }
    _initializeOnDelegatedTarget(t) {
      return this.constructor.getOrCreateInstance(
        t.delegateTarget,
        this._getDelegateConfig()
      );
    }
    _isAnimated() {
      return (
        this._config.animation || (this.tip && this.tip.classList.contains(Ce))
      );
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(Te);
    }
    _createPopper(t) {
      const e =
          'function' == typeof this._config.placement
            ? this._config.placement.call(this, t, this._element)
            : this._config.placement,
        s = Se[e.toUpperCase()];
      return i.createPopper(this._element, t, this._getPopperConfig(s));
    }
    _getOffset() {
      const { offset: t } = this._config;
      return 'string' == typeof t
        ? t.split(',').map((t) => Number.parseInt(t, 10))
        : 'function' == typeof t
        ? (e) => t(e, this._element)
        : t;
    }
    _resolvePossibleFunction(t) {
      return 'function' == typeof t ? t.call(this._element) : t;
    }
    _getPopperConfig(t) {
      const e = {
        placement: t,
        modifiers: [
          {
            name: 'flip',
            options: { fallbackPlacements: this._config.fallbackPlacements },
          },
          { name: 'offset', options: { offset: this._getOffset() } },
          {
            name: 'preventOverflow',
            options: { boundary: this._config.boundary },
          },
          {
            name: 'arrow',
            options: { element: `.${this.constructor.NAME}-arrow` },
          },
          {
            name: 'preSetPlacement',
            enabled: !0,
            phase: 'beforeMain',
            fn: (t) => {
              this._getTipElement().setAttribute(
                'data-popper-placement',
                t.state.placement
              );
            },
          },
        ],
      };
      return {
        ...e,
        ...('function' == typeof this._config.popperConfig
          ? this._config.popperConfig(e)
          : this._config.popperConfig),
      };
    }
    _setListeners() {
      const t = this._config.trigger.split(' ');
      for (const e of t)
        if ('click' === e)
          $.on(
            this._element,
            this.constructor.eventName('click'),
            this._config.selector,
            (t) => {
              this._initializeOnDelegatedTarget(t).toggle();
            }
          );
        else if ('manual' !== e) {
          const t =
              e === Oe
                ? this.constructor.eventName('mouseenter')
                : this.constructor.eventName('focusin'),
            i =
              e === Oe
                ? this.constructor.eventName('mouseleave')
                : this.constructor.eventName('focusout');
          $.on(this._element, t, this._config.selector, (t) => {
            const e = this._initializeOnDelegatedTarget(t);
            (e._activeTrigger['focusin' === t.type ? Ie : Oe] = !0), e._enter();
          }),
            $.on(this._element, i, this._config.selector, (t) => {
              const e = this._initializeOnDelegatedTarget(t);
              (e._activeTrigger['focusout' === t.type ? Ie : Oe] =
                e._element.contains(t.relatedTarget)),
                e._leave();
            });
        }
      (this._hideModalHandler = () => {
        this._element && this.hide();
      }),
        $.on(this._element.closest(ke), Le, this._hideModalHandler);
    }
    _fixTitle() {
      const t = this._element.getAttribute('title');
      t &&
        (this._element.getAttribute('aria-label') ||
          this._element.textContent.trim() ||
          this._element.setAttribute('aria-label', t),
        this._element.setAttribute('data-bs-original-title', t),
        this._element.removeAttribute('title'));
    }
    _enter() {
      this._isShown() || this._isHovered
        ? (this._isHovered = !0)
        : ((this._isHovered = !0),
          this._setTimeout(() => {
            this._isHovered && this.show();
          }, this._config.delay.show));
    }
    _leave() {
      this._isWithActiveTrigger() ||
        ((this._isHovered = !1),
        this._setTimeout(() => {
          this._isHovered || this.hide();
        }, this._config.delay.hide));
    }
    _setTimeout(t, e) {
      clearTimeout(this._timeout), (this._timeout = setTimeout(t, e));
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(!0);
    }
    _getConfig(t) {
      const e = W.getDataAttributes(this._element);
      for (const t of Object.keys(e)) Ee.has(t) && delete e[t];
      return (
        (t = { ...e, ...('object' == typeof t && t ? t : {}) }),
        (t = this._mergeConfigObj(t)),
        (t = this._configAfterMerge(t)),
        this._typeCheckConfig(t),
        t
      );
    }
    _configAfterMerge(t) {
      return (
        (t.container = !1 === t.container ? document.body : c(t.container)),
        'number' == typeof t.delay &&
          (t.delay = { show: t.delay, hide: t.delay }),
        'number' == typeof t.title && (t.title = t.title.toString()),
        'number' == typeof t.content && (t.content = t.content.toString()),
        t
      );
    }
    _getDelegateConfig() {
      const t = {};
      for (const e in this._config)
        this.constructor.Default[e] !== this._config[e] &&
          (t[e] = this._config[e]);
      return (t.selector = !1), (t.trigger = 'manual'), t;
    }
    _disposePopper() {
      this._popper && (this._popper.destroy(), (this._popper = null)),
        this.tip && (this.tip.remove(), (this.tip = null));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Pe.getOrCreateInstance(this, t);
        if ('string' == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  b(Pe);
  const xe = {
      ...Pe.Default,
      content: '',
      offset: [0, 8],
      placement: 'right',
      template:
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      trigger: 'click',
    },
    Me = { ...Pe.DefaultType, content: '(null|string|element|function)' };
  class je extends Pe {
    static get Default() {
      return xe;
    }
    static get DefaultType() {
      return Me;
    }
    static get NAME() {
      return 'popover';
    }
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    _getContentForTemplate() {
      return {
        '.popover-header': this._getTitle(),
        '.popover-body': this._getContent(),
      };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = je.getOrCreateInstance(this, t);
        if ('string' == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  b(je);
  const $e = 'click.bs.scrollspy',
    Fe = 'active',
    ze = '[href]',
    He = {
      offset: null,
      rootMargin: '0px 0px -25%',
      smoothScroll: !1,
      target: null,
      threshold: [0.1, 0.5, 1],
    },
    qe = {
      offset: '(number|null)',
      rootMargin: 'string',
      smoothScroll: 'boolean',
      target: 'element',
      threshold: 'array',
    };
  class Be extends V {
    constructor(t, e) {
      super(t, e),
        (this._targetLinks = new Map()),
        (this._observableSections = new Map()),
        (this._rootElement =
          'visible' === getComputedStyle(this._element).overflowY
            ? null
            : this._element),
        (this._activeTarget = null),
        (this._observer = null),
        (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
        this.refresh();
    }
    static get Default() {
      return He;
    }
    static get DefaultType() {
      return qe;
    }
    static get NAME() {
      return 'scrollspy';
    }
    refresh() {
      this._initializeTargetsAndObservables(),
        this._maybeEnableSmoothScroll(),
        this._observer
          ? this._observer.disconnect()
          : (this._observer = this._getNewObserver());
      for (const t of this._observableSections.values())
        this._observer.observe(t);
    }
    dispose() {
      this._observer.disconnect(), super.dispose();
    }
    _configAfterMerge(t) {
      return (
        (t.target = c(t.target) || document.body),
        (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin),
        'string' == typeof t.threshold &&
          (t.threshold = t.threshold
            .split(',')
            .map((t) => Number.parseFloat(t))),
        t
      );
    }
    _maybeEnableSmoothScroll() {
      this._config.smoothScroll &&
        ($.off(this._config.target, $e),
        $.on(this._config.target, $e, ze, (t) => {
          const e = this._observableSections.get(t.target.hash);
          if (e) {
            t.preventDefault();
            const i = this._rootElement || window,
              s = e.offsetTop - this._element.offsetTop;
            if (i.scrollTo)
              return void i.scrollTo({ top: s, behavior: 'smooth' });
            i.scrollTop = s;
          }
        }));
    }
    _getNewObserver() {
      const t = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin,
      };
      return new IntersectionObserver((t) => this._observerCallback(t), t);
    }
    _observerCallback(t) {
      const e = (t) => this._targetLinks.get(`#${t.target.id}`),
        i = (t) => {
          (this._previousScrollData.visibleEntryTop = t.target.offsetTop),
            this._process(e(t));
        },
        s = (this._rootElement || document.documentElement).scrollTop,
        n = s >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = s;
      for (const o of t) {
        if (!o.isIntersecting) {
          (this._activeTarget = null), this._clearActiveClass(e(o));
          continue;
        }
        const t =
          o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (n && t) {
          if ((i(o), !s)) return;
        } else n || t || i(o);
      }
    }
    _initializeTargetsAndObservables() {
      (this._targetLinks = new Map()), (this._observableSections = new Map());
      const t = U.find(ze, this._config.target);
      for (const e of t) {
        if (!e.hash || d(e)) continue;
        const t = U.findOne(e.hash, this._element);
        h(t) &&
          (this._targetLinks.set(e.hash, e),
          this._observableSections.set(e.hash, t));
      }
    }
    _process(t) {
      this._activeTarget !== t &&
        (this._clearActiveClass(this._config.target),
        (this._activeTarget = t),
        t.classList.add(Fe),
        this._activateParents(t),
        $.trigger(this._element, 'activate.bs.scrollspy', {
          relatedTarget: t,
        }));
    }
    _activateParents(t) {
      if (t.classList.contains('dropdown-item'))
        U.findOne('.dropdown-toggle', t.closest('.dropdown')).classList.add(Fe);
      else
        for (const e of U.parents(t, '.nav, .list-group'))
          for (const t of U.prev(
            e,
            '.nav-link, .nav-item > .nav-link, .list-group-item'
          ))
            t.classList.add(Fe);
    }
    _clearActiveClass(t) {
      t.classList.remove(Fe);
      const e = U.find('[href].active', t);
      for (const t of e) t.classList.remove(Fe);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Be.getOrCreateInstance(this, t);
        if ('string' == typeof t) {
          if (void 0 === e[t] || t.startsWith('_') || 'constructor' === t)
            throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  $.on(window, 'load.bs.scrollspy.data-api', () => {
    for (const t of U.find('[data-bs-spy="scroll"]')) Be.getOrCreateInstance(t);
  }),
    b(Be);
  const We = 'ArrowLeft',
    Re = 'ArrowRight',
    Ve = 'ArrowUp',
    Ke = 'ArrowDown',
    Qe = 'active',
    Xe = 'fade',
    Ye = 'show',
    Ue =
      '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    Ge = `.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ${Ue}`;
  class Je extends V {
    constructor(t) {
      super(t),
        (this._parent = this._element.closest(
          '.list-group, .nav, [role="tablist"]'
        )),
        this._parent &&
          (this._setInitialAttributes(this._parent, this._getChildren()),
          $.on(this._element, 'keydown.bs.tab', (t) => this._keydown(t)));
    }
    static get NAME() {
      return 'tab';
    }
    show() {
      const t = this._element;
      if (this._elemIsActive(t)) return;
      const e = this._getActiveElem(),
        i = e ? $.trigger(e, 'hide.bs.tab', { relatedTarget: t }) : null;
      $.trigger(t, 'show.bs.tab', { relatedTarget: e }).defaultPrevented ||
        (i && i.defaultPrevented) ||
        (this._deactivate(e, t), this._activate(t, e));
    }
    _activate(t, e) {
      t &&
        (t.classList.add(Qe),
        this._activate(r(t)),
        this._queueCallback(
          () => {
            'tab' === t.getAttribute('role')
              ? (t.removeAttribute('tabindex'),
                t.setAttribute('aria-selected', !0),
                this._toggleDropDown(t, !0),
                $.trigger(t, 'shown.bs.tab', { relatedTarget: e }))
              : t.classList.add(Ye);
          },
          t,
          t.classList.contains(Xe)
        ));
    }
    _deactivate(t, e) {
      t &&
        (t.classList.remove(Qe),
        t.blur(),
        this._deactivate(r(t)),
        this._queueCallback(
          () => {
            'tab' === t.getAttribute('role')
              ? (t.setAttribute('aria-selected', !1),
                t.setAttribute('tabindex', '-1'),
                this._toggleDropDown(t, !1),
                $.trigger(t, 'hidden.bs.tab', { relatedTarget: e }))
              : t.classList.remove(Ye);
          },
          t,
          t.classList.contains(Xe)
        ));
    }
    _keydown(t) {
      if (![We, Re, Ve, Ke].includes(t.key)) return;
      t.stopPropagation(), t.preventDefault();
      const e = [Re, Ke].includes(t.key),
        i = w(
          this._getChildren().filter((t) => !d(t)),
          t.target,
          e,
          !0
        );
      i && (i.focus({ preventScroll: !0 }), Je.getOrCreateInstance(i).show());
    }
    _getChildren() {
      return U.find(Ge, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((t) => this._elemIsActive(t)) || null;
    }
    _setInitialAttributes(t, e) {
      this._setAttributeIfNotExists(t, 'role', 'tablist');
      for (const t of e) this._setInitialAttributesOnChild(t);
    }
    _setInitialAttributesOnChild(t) {
      t = this._getInnerElement(t);
      const e = this._elemIsActive(t),
        i = this._getOuterElement(t);
      t.setAttribute('aria-selected', e),
        i !== t && this._setAttributeIfNotExists(i, 'role', 'presentation'),
        e || t.setAttribute('tabindex', '-1'),
        this._setAttributeIfNotExists(t, 'role', 'tab'),
        this._setInitialAttributesOnTargetPanel(t);
    }
    _setInitialAttributesOnTargetPanel(t) {
      const e = r(t);
      e &&
        (this._setAttributeIfNotExists(e, 'role', 'tabpanel'),
        t.id &&
          this._setAttributeIfNotExists(e, 'aria-labelledby', `#${t.id}`));
    }
    _toggleDropDown(t, e) {
      const i = this._getOuterElement(t);
      if (!i.classList.contains('dropdown')) return;
      const s = (t, s) => {
        const n = U.findOne(t, i);
        n && n.classList.toggle(s, e);
      };
      s('.dropdown-toggle', Qe),
        s('.dropdown-menu', Ye),
        i.setAttribute('aria-expanded', e);
    }
    _setAttributeIfNotExists(t, e, i) {
      t.hasAttribute(e) || t.setAttribute(e, i);
    }
    _elemIsActive(t) {
      return t.classList.contains(Qe);
    }
    _getInnerElement(t) {
      return t.matches(Ge) ? t : U.findOne(Ge, t);
    }
    _getOuterElement(t) {
      return t.closest('.nav-item, .list-group-item') || t;
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Je.getOrCreateInstance(this);
        if ('string' == typeof t) {
          if (void 0 === e[t] || t.startsWith('_') || 'constructor' === t)
            throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  $.on(document, 'click.bs.tab', Ue, function (t) {
    ['A', 'AREA'].includes(this.tagName) && t.preventDefault(),
      d(this) || Je.getOrCreateInstance(this).show();
  }),
    $.on(window, 'load.bs.tab', () => {
      for (const t of U.find(
        '.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]'
      ))
        Je.getOrCreateInstance(t);
    }),
    b(Je);
  const Ze = 'hide',
    ti = 'show',
    ei = 'showing',
    ii = { animation: 'boolean', autohide: 'boolean', delay: 'number' },
    si = { animation: !0, autohide: !0, delay: 5e3 };
  class ni extends V {
    constructor(t, e) {
      super(t, e),
        (this._timeout = null),
        (this._hasMouseInteraction = !1),
        (this._hasKeyboardInteraction = !1),
        this._setListeners();
    }
    static get Default() {
      return si;
    }
    static get DefaultType() {
      return ii;
    }
    static get NAME() {
      return 'toast';
    }
    show() {
      $.trigger(this._element, 'show.bs.toast').defaultPrevented ||
        (this._clearTimeout(),
        this._config.animation && this._element.classList.add('fade'),
        this._element.classList.remove(Ze),
        g(this._element),
        this._element.classList.add(ti, ei),
        this._queueCallback(
          () => {
            this._element.classList.remove(ei),
              $.trigger(this._element, 'shown.bs.toast'),
              this._maybeScheduleHide();
          },
          this._element,
          this._config.animation
        ));
    }
    hide() {
      this.isShown() &&
        ($.trigger(this._element, 'hide.bs.toast').defaultPrevented ||
          (this._element.classList.add(ei),
          this._queueCallback(
            () => {
              this._element.classList.add(Ze),
                this._element.classList.remove(ei, ti),
                $.trigger(this._element, 'hidden.bs.toast');
            },
            this._element,
            this._config.animation
          )));
    }
    dispose() {
      this._clearTimeout(),
        this.isShown() && this._element.classList.remove(ti),
        super.dispose();
    }
    isShown() {
      return this._element.classList.contains(ti);
    }
    _maybeScheduleHide() {
      this._config.autohide &&
        (this._hasMouseInteraction ||
          this._hasKeyboardInteraction ||
          (this._timeout = setTimeout(() => {
            this.hide();
          }, this._config.delay)));
    }
    _onInteraction(t, e) {
      switch (t.type) {
        case 'mouseover':
        case 'mouseout':
          this._hasMouseInteraction = e;
          break;
        case 'focusin':
        case 'focusout':
          this._hasKeyboardInteraction = e;
      }
      if (e) return void this._clearTimeout();
      const i = t.relatedTarget;
      this._element === i ||
        this._element.contains(i) ||
        this._maybeScheduleHide();
    }
    _setListeners() {
      $.on(this._element, 'mouseover.bs.toast', (t) =>
        this._onInteraction(t, !0)
      ),
        $.on(this._element, 'mouseout.bs.toast', (t) =>
          this._onInteraction(t, !1)
        ),
        $.on(this._element, 'focusin.bs.toast', (t) =>
          this._onInteraction(t, !0)
        ),
        $.on(this._element, 'focusout.bs.toast', (t) =>
          this._onInteraction(t, !1)
        );
    }
    _clearTimeout() {
      clearTimeout(this._timeout), (this._timeout = null);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = ni.getOrCreateInstance(this, t);
        if ('string' == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  return (
    K(ni),
    b(ni),
    {
      Alert: Q,
      Button: Y,
      Carousel: ht,
      Collapse: mt,
      Dropdown: Mt,
      Modal: ne,
      Offcanvas: _e,
      Popover: je,
      ScrollSpy: Be,
      Tab: Je,
      Toast: ni,
      Tooltip: Pe,
    }
  );
});
//# sourceMappingURL=bootstrap.min.js.map

// Swiper
/**
 * Swiper 8.4.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: January 30, 2023
 */

!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).Swiper =
        t());
})(this, function () {
  'use strict';
  function e(e) {
    return (
      null !== e &&
      'object' == typeof e &&
      'constructor' in e &&
      e.constructor === Object
    );
  }
  function t(s, a) {
    void 0 === s && (s = {}),
      void 0 === a && (a = {}),
      Object.keys(a).forEach((i) => {
        void 0 === s[i]
          ? (s[i] = a[i])
          : e(a[i]) && e(s[i]) && Object.keys(a[i]).length > 0 && t(s[i], a[i]);
      });
  }
  const s = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: '' },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: '',
      host: '',
      hostname: '',
      href: '',
      origin: '',
      pathname: '',
      protocol: '',
      search: '',
    },
  };
  function a() {
    const e = 'undefined' != typeof document ? document : {};
    return t(e, s), e;
  }
  const i = {
    document: s,
    navigator: { userAgent: '' },
    location: {
      hash: '',
      host: '',
      hostname: '',
      href: '',
      origin: '',
      pathname: '',
      protocol: '',
      search: '',
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => '' }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      'undefined' == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      'undefined' != typeof setTimeout && clearTimeout(e);
    },
  };
  function r() {
    const e = 'undefined' != typeof window ? window : {};
    return t(e, i), e;
  }
  class n extends Array {
    constructor(e) {
      'number' == typeof e
        ? super(e)
        : (super(...(e || [])),
          (function (e) {
            const t = e.__proto__;
            Object.defineProperty(e, '__proto__', {
              get: () => t,
              set(e) {
                t.__proto__ = e;
              },
            });
          })(this));
    }
  }
  function l(e) {
    void 0 === e && (e = []);
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...l(e)) : t.push(e);
      }),
      t
    );
  }
  function o(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function d(e, t) {
    const s = r(),
      i = a();
    let l = [];
    if (!t && e instanceof n) return e;
    if (!e) return new n(l);
    if ('string' == typeof e) {
      const s = e.trim();
      if (s.indexOf('<') >= 0 && s.indexOf('>') >= 0) {
        let e = 'div';
        0 === s.indexOf('<li') && (e = 'ul'),
          0 === s.indexOf('<tr') && (e = 'tbody'),
          (0 !== s.indexOf('<td') && 0 !== s.indexOf('<th')) || (e = 'tr'),
          0 === s.indexOf('<tbody') && (e = 'table'),
          0 === s.indexOf('<option') && (e = 'select');
        const t = i.createElement(e);
        t.innerHTML = s;
        for (let e = 0; e < t.childNodes.length; e += 1)
          l.push(t.childNodes[e]);
      } else
        l = (function (e, t) {
          if ('string' != typeof e) return [e];
          const s = [],
            a = t.querySelectorAll(e);
          for (let e = 0; e < a.length; e += 1) s.push(a[e]);
          return s;
        })(e.trim(), t || i);
    } else if (e.nodeType || e === s || e === i) l.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof n) return e;
      l = e;
    }
    return new n(
      (function (e) {
        const t = [];
        for (let s = 0; s < e.length; s += 1)
          -1 === t.indexOf(e[s]) && t.push(e[s]);
        return t;
      })(l)
    );
  }
  d.fn = n.prototype;
  const c = {
    addClass: function () {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      const a = l(t.map((e) => e.split(' ')));
      return (
        this.forEach((e) => {
          e.classList.add(...a);
        }),
        this
      );
    },
    removeClass: function () {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      const a = l(t.map((e) => e.split(' ')));
      return (
        this.forEach((e) => {
          e.classList.remove(...a);
        }),
        this
      );
    },
    hasClass: function () {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      const a = l(t.map((e) => e.split(' ')));
      return (
        o(this, (e) => a.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function () {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      const a = l(t.map((e) => e.split(' ')));
      this.forEach((e) => {
        a.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && 'string' == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let s = 0; s < this.length; s += 1)
        if (2 === arguments.length) this[s].setAttribute(e, t);
        else
          for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = 'string' != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function () {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      let [a, i, r, n] = t;
      function l(e) {
        const t = e.target;
        if (!t) return;
        const s = e.target.dom7EventData || [];
        if ((s.indexOf(e) < 0 && s.unshift(e), d(t).is(i))) r.apply(t, s);
        else {
          const e = d(t).parents();
          for (let t = 0; t < e.length; t += 1)
            d(e[t]).is(i) && r.apply(e[t], s);
        }
      }
      function o(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t);
      }
      'function' == typeof t[1] && (([a, r, n] = t), (i = void 0)),
        n || (n = !1);
      const c = a.split(' ');
      let p;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (i)
          for (p = 0; p < c.length; p += 1) {
            const e = c[p];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: r, proxyListener: l }),
              t.addEventListener(e, l, n);
          }
        else
          for (p = 0; p < c.length; p += 1) {
            const e = c[p];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: r, proxyListener: o }),
              t.addEventListener(e, o, n);
          }
      }
      return this;
    },
    off: function () {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      let [a, i, r, n] = t;
      'function' == typeof t[1] && (([a, r, n] = t), (i = void 0)),
        n || (n = !1);
      const l = a.split(' ');
      for (let e = 0; e < l.length; e += 1) {
        const t = l[e];
        for (let e = 0; e < this.length; e += 1) {
          const s = this[e];
          let a;
          if (
            (!i && s.dom7Listeners
              ? (a = s.dom7Listeners[t])
              : i && s.dom7LiveListeners && (a = s.dom7LiveListeners[t]),
            a && a.length)
          )
            for (let e = a.length - 1; e >= 0; e -= 1) {
              const i = a[e];
              (r && i.listener === r) ||
              (r &&
                i.listener &&
                i.listener.dom7proxy &&
                i.listener.dom7proxy === r)
                ? (s.removeEventListener(t, i.proxyListener, n), a.splice(e, 1))
                : r ||
                  (s.removeEventListener(t, i.proxyListener, n),
                  a.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function () {
      const e = r();
      for (var t = arguments.length, s = new Array(t), a = 0; a < t; a++)
        s[a] = arguments[a];
      const i = s[0].split(' '),
        n = s[1];
      for (let t = 0; t < i.length; t += 1) {
        const a = i[t];
        for (let t = 0; t < this.length; t += 1) {
          const i = this[t];
          if (e.CustomEvent) {
            const t = new e.CustomEvent(a, {
              detail: n,
              bubbles: !0,
              cancelable: !0,
            });
            (i.dom7EventData = s.filter((e, t) => t > 0)),
              i.dispatchEvent(t),
              (i.dom7EventData = []),
              delete i.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on('transitionend', function s(a) {
            a.target === this && (e.call(this, a), t.off('transitionend', s));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue('margin-right')) +
            parseFloat(e.getPropertyValue('margin-left'))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue('margin-top')) +
            parseFloat(e.getPropertyValue('margin-bottom'))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = r();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = r(),
          t = a(),
          s = this[0],
          i = s.getBoundingClientRect(),
          n = t.body,
          l = s.clientTop || n.clientTop || 0,
          o = s.clientLeft || n.clientLeft || 0,
          d = s === e ? e.scrollY : s.scrollTop,
          c = s === e ? e.scrollX : s.scrollLeft;
        return { top: i.top + d - l, left: i.left + c - o };
      }
      return null;
    },
    css: function (e, t) {
      const s = r();
      let a;
      if (1 === arguments.length) {
        if ('string' != typeof e) {
          for (a = 0; a < this.length; a += 1)
            for (const t in e) this[a].style[t] = e[t];
          return this;
        }
        if (this[0])
          return s.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && 'string' == typeof e) {
        for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, s) => {
            e.apply(t, [t, s]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = r(),
        s = a(),
        i = this[0];
      let l, o;
      if (!i || void 0 === e) return !1;
      if ('string' == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (l = d(e), o = 0; o < l.length; o += 1) if (l[o] === i) return !0;
        return !1;
      }
      if (e === s) return i === s;
      if (e === t) return i === t;
      if (e.nodeType || e instanceof n) {
        for (l = e.nodeType ? [e] : e, o = 0; o < l.length; o += 1)
          if (l[o] === i) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return d([]);
      if (e < 0) {
        const s = t + e;
        return d(s < 0 ? [] : [this[s]]);
      }
      return d([this[e]]);
    },
    append: function () {
      let e;
      const t = a();
      for (let s = 0; s < arguments.length; s += 1) {
        e = s < 0 || arguments.length <= s ? void 0 : arguments[s];
        for (let s = 0; s < this.length; s += 1)
          if ('string' == typeof e) {
            const a = t.createElement('div');
            for (a.innerHTML = e; a.firstChild; )
              this[s].appendChild(a.firstChild);
          } else if (e instanceof n)
            for (let t = 0; t < e.length; t += 1) this[s].appendChild(e[t]);
          else this[s].appendChild(e);
      }
      return this;
    },
    prepend: function (e) {
      const t = a();
      let s, i;
      for (s = 0; s < this.length; s += 1)
        if ('string' == typeof e) {
          const a = t.createElement('div');
          for (a.innerHTML = e, i = a.childNodes.length - 1; i >= 0; i -= 1)
            this[s].insertBefore(a.childNodes[i], this[s].childNodes[0]);
        } else if (e instanceof n)
          for (i = 0; i < e.length; i += 1)
            this[s].insertBefore(e[i], this[s].childNodes[0]);
        else this[s].insertBefore(e, this[s].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && d(this[0].nextElementSibling).is(e)
            ? d([this[0].nextElementSibling])
            : d([])
          : this[0].nextElementSibling
          ? d([this[0].nextElementSibling])
          : d([])
        : d([]);
    },
    nextAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return d([]);
      for (; s.nextElementSibling; ) {
        const a = s.nextElementSibling;
        e ? d(a).is(e) && t.push(a) : t.push(a), (s = a);
      }
      return d(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && d(t.previousElementSibling).is(e)
            ? d([t.previousElementSibling])
            : d([])
          : t.previousElementSibling
          ? d([t.previousElementSibling])
          : d([]);
      }
      return d([]);
    },
    prevAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return d([]);
      for (; s.previousElementSibling; ) {
        const a = s.previousElementSibling;
        e ? d(a).is(e) && t.push(a) : t.push(a), (s = a);
      }
      return d(t);
    },
    parent: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1)
        null !== this[s].parentNode &&
          (e
            ? d(this[s].parentNode).is(e) && t.push(this[s].parentNode)
            : t.push(this[s].parentNode));
      return d(t);
    },
    parents: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        let a = this[s].parentNode;
        for (; a; ) e ? d(a).is(e) && t.push(a) : t.push(a), (a = a.parentNode);
      }
      return d(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? d([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const a = this[s].querySelectorAll(e);
        for (let e = 0; e < a.length; e += 1) t.push(a[e]);
      }
      return d(t);
    },
    children: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const a = this[s].children;
        for (let s = 0; s < a.length; s += 1)
          (e && !d(a[s]).is(e)) || t.push(a[s]);
      }
      return d(t);
    },
    filter: function (e) {
      return d(o(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  function p(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function u() {
    return Date.now();
  }
  function h(e, t) {
    void 0 === t && (t = 'x');
    const s = r();
    let a, i, n;
    const l = (function (e) {
      const t = r();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((i = l.transform || l.webkitTransform),
          i.split(',').length > 6 &&
            (i = i
              .split(', ')
              .map((e) => e.replace(',', '.'))
              .join(', ')),
          (n = new s.WebKitCSSMatrix('none' === i ? '' : i)))
        : ((n =
            l.MozTransform ||
            l.OTransform ||
            l.MsTransform ||
            l.msTransform ||
            l.transform ||
            l
              .getPropertyValue('transform')
              .replace('translate(', 'matrix(1, 0, 0, 1,')),
          (a = n.toString().split(','))),
      'x' === t &&
        (i = s.WebKitCSSMatrix
          ? n.m41
          : 16 === a.length
          ? parseFloat(a[12])
          : parseFloat(a[4])),
      'y' === t &&
        (i = s.WebKitCSSMatrix
          ? n.m42
          : 16 === a.length
          ? parseFloat(a[13])
          : parseFloat(a[5])),
      i || 0
    );
  }
  function m(e) {
    return (
      'object' == typeof e &&
      null !== e &&
      e.constructor &&
      'Object' === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function f(e) {
    return 'undefined' != typeof window && void 0 !== window.HTMLElement
      ? e instanceof HTMLElement
      : e && (1 === e.nodeType || 11 === e.nodeType);
  }
  function g() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ['__proto__', 'constructor', 'prototype'];
    for (let s = 1; s < arguments.length; s += 1) {
      const a = s < 0 || arguments.length <= s ? void 0 : arguments[s];
      if (null != a && !f(a)) {
        const s = Object.keys(Object(a)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, i = s.length; t < i; t += 1) {
          const i = s[t],
            r = Object.getOwnPropertyDescriptor(a, i);
          void 0 !== r &&
            r.enumerable &&
            (m(e[i]) && m(a[i])
              ? a[i].__swiper__
                ? (e[i] = a[i])
                : g(e[i], a[i])
              : !m(e[i]) && m(a[i])
              ? ((e[i] = {}), a[i].__swiper__ ? (e[i] = a[i]) : g(e[i], a[i]))
              : (e[i] = a[i]));
        }
      }
    }
    return e;
  }
  function v(e, t, s) {
    e.style.setProperty(t, s);
  }
  function w(e) {
    let { swiper: t, targetPosition: s, side: a } = e;
    const i = r(),
      n = -t.translate;
    let l,
      o = null;
    const d = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = 'none'),
      i.cancelAnimationFrame(t.cssModeFrameID);
    const c = s > n ? 'next' : 'prev',
      p = (e, t) => ('next' === c && e >= t) || ('prev' === c && e <= t),
      u = () => {
        (l = new Date().getTime()), null === o && (o = l);
        const e = Math.max(Math.min((l - o) / d, 1), 0),
          r = 0.5 - Math.cos(e * Math.PI) / 2;
        let c = n + r * (s - n);
        if ((p(c, s) && (c = s), t.wrapperEl.scrollTo({ [a]: c }), p(c, s)))
          return (
            (t.wrapperEl.style.overflow = 'hidden'),
            (t.wrapperEl.style.scrollSnapType = ''),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ''),
                t.wrapperEl.scrollTo({ [a]: c });
            }),
            void i.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = i.requestAnimationFrame(u);
      };
    u();
  }
  let b, x, y;
  function E() {
    return (
      b ||
        (b = (function () {
          const e = r(),
            t = a();
          return {
            smoothScroll:
              t.documentElement && 'scrollBehavior' in t.documentElement.style,
            touch: !!(
              'ontouchstart' in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const s = Object.defineProperty({}, 'passive', {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener('testPassiveListener', null, s);
              } catch (e) {}
              return t;
            })(),
            gestures: 'ongesturestart' in e,
          };
        })()),
      b
    );
  }
  function C(e) {
    return (
      void 0 === e && (e = {}),
      x ||
        (x = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = E(),
            a = r(),
            i = a.navigator.platform,
            n = t || a.navigator.userAgent,
            l = { ios: !1, android: !1 },
            o = a.screen.width,
            d = a.screen.height,
            c = n.match(/(Android);?[\s\/]+([\d.]+)?/);
          let p = n.match(/(iPad).*OS\s([\d_]+)/);
          const u = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            h = !p && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            m = 'Win32' === i;
          let f = 'MacIntel' === i;
          return (
            !p &&
              f &&
              s.touch &&
              [
                '1024x1366',
                '1366x1024',
                '834x1194',
                '1194x834',
                '834x1112',
                '1112x834',
                '768x1024',
                '1024x768',
                '820x1180',
                '1180x820',
                '810x1080',
                '1080x810',
              ].indexOf(`${o}x${d}`) >= 0 &&
              ((p = n.match(/(Version)\/([\d.]+)/)),
              p || (p = [0, 1, '13_0_0']),
              (f = !1)),
            c && !m && ((l.os = 'android'), (l.android = !0)),
            (p || h || u) && ((l.os = 'ios'), (l.ios = !0)),
            l
          );
        })(e)),
      x
    );
  }
  function T() {
    return (
      y ||
        (y = (function () {
          const e = r();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf('safari') >= 0 &&
                t.indexOf('chrome') < 0 &&
                t.indexOf('android') < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      y
    );
  }
  Object.keys(c).forEach((e) => {
    Object.defineProperty(d.fn, e, { value: c[e], writable: !0 });
  });
  var $ = {
    on(e, t, s) {
      const a = this;
      if (!a.eventsListeners || a.destroyed) return a;
      if ('function' != typeof t) return a;
      const i = s ? 'unshift' : 'push';
      return (
        e.split(' ').forEach((e) => {
          a.eventsListeners[e] || (a.eventsListeners[e] = []),
            a.eventsListeners[e][i](t);
        }),
        a
      );
    },
    once(e, t, s) {
      const a = this;
      if (!a.eventsListeners || a.destroyed) return a;
      if ('function' != typeof t) return a;
      function i() {
        a.off(e, i), i.__emitterProxy && delete i.__emitterProxy;
        for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
          r[n] = arguments[n];
        t.apply(a, r);
      }
      return (i.__emitterProxy = t), a.on(e, i, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ('function' != typeof e) return s;
      const a = t ? 'unshift' : 'push';
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
        ? (e.split(' ').forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((a, i) => {
                  (a === t || (a.__emitterProxy && a.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(i, 1);
                });
          }),
          s)
        : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, a;
      for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
        r[n] = arguments[n];
      'string' == typeof r[0] || Array.isArray(r[0])
        ? ((t = r[0]), (s = r.slice(1, r.length)), (a = e))
        : ((t = r[0].events), (s = r[0].data), (a = r[0].context || e)),
        s.unshift(a);
      return (
        (Array.isArray(t) ? t : t.split(' ')).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(a, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(a, s);
              });
        }),
        e
      );
    },
  };
  var S = {
    updateSize: function () {
      const e = this;
      let t, s;
      const a = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : a[0].clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : a[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(a.css('padding-left') || 0, 10) -
            parseInt(a.css('padding-right') || 0, 10)),
          (s =
            s -
            parseInt(a.css('padding-top') || 0, 10) -
            parseInt(a.css('padding-bottom') || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: 'height',
              'margin-top': 'margin-left',
              'margin-bottom ': 'margin-right',
              'margin-left': 'margin-top',
              'margin-right': 'margin-bottom',
              'padding-left': 'padding-top',
              'padding-right': 'padding-bottom',
              marginRight: 'marginBottom',
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const a = e.params,
        { $wrapperEl: i, size: r, rtlTranslate: n, wrongRTL: l } = e,
        o = e.virtual && a.virtual.enabled,
        d = o ? e.virtual.slides.length : e.slides.length,
        c = i.children(`.${e.params.slideClass}`),
        p = o ? e.virtual.slides.length : c.length;
      let u = [];
      const h = [],
        m = [];
      let f = a.slidesOffsetBefore;
      'function' == typeof f && (f = a.slidesOffsetBefore.call(e));
      let g = a.slidesOffsetAfter;
      'function' == typeof g && (g = a.slidesOffsetAfter.call(e));
      const w = e.snapGrid.length,
        b = e.slidesGrid.length;
      let x = a.spaceBetween,
        y = -f,
        E = 0,
        C = 0;
      if (void 0 === r) return;
      'string' == typeof x &&
        x.indexOf('%') >= 0 &&
        (x = (parseFloat(x.replace('%', '')) / 100) * r),
        (e.virtualSize = -x),
        n
          ? c.css({ marginLeft: '', marginBottom: '', marginTop: '' })
          : c.css({ marginRight: '', marginBottom: '', marginTop: '' }),
        a.centeredSlides &&
          a.cssMode &&
          (v(e.wrapperEl, '--swiper-centered-offset-before', ''),
          v(e.wrapperEl, '--swiper-centered-offset-after', ''));
      const T = a.grid && a.grid.rows > 1 && e.grid;
      let $;
      T && e.grid.initSlides(p);
      const S =
        'auto' === a.slidesPerView &&
        a.breakpoints &&
        Object.keys(a.breakpoints).filter(
          (e) => void 0 !== a.breakpoints[e].slidesPerView
        ).length > 0;
      for (let i = 0; i < p; i += 1) {
        $ = 0;
        const n = c.eq(i);
        if (
          (T && e.grid.updateSlide(i, n, p, t), 'none' !== n.css('display'))
        ) {
          if ('auto' === a.slidesPerView) {
            S && (c[i].style[t('width')] = '');
            const r = getComputedStyle(n[0]),
              l = n[0].style.transform,
              o = n[0].style.webkitTransform;
            if (
              (l && (n[0].style.transform = 'none'),
              o && (n[0].style.webkitTransform = 'none'),
              a.roundLengths)
            )
              $ = e.isHorizontal() ? n.outerWidth(!0) : n.outerHeight(!0);
            else {
              const e = s(r, 'width'),
                t = s(r, 'padding-left'),
                a = s(r, 'padding-right'),
                i = s(r, 'margin-left'),
                l = s(r, 'margin-right'),
                o = r.getPropertyValue('box-sizing');
              if (o && 'border-box' === o) $ = e + i + l;
              else {
                const { clientWidth: s, offsetWidth: r } = n[0];
                $ = e + t + a + i + l + (r - s);
              }
            }
            l && (n[0].style.transform = l),
              o && (n[0].style.webkitTransform = o),
              a.roundLengths && ($ = Math.floor($));
          } else
            ($ = (r - (a.slidesPerView - 1) * x) / a.slidesPerView),
              a.roundLengths && ($ = Math.floor($)),
              c[i] && (c[i].style[t('width')] = `${$}px`);
          c[i] && (c[i].swiperSlideSize = $),
            m.push($),
            a.centeredSlides
              ? ((y = y + $ / 2 + E / 2 + x),
                0 === E && 0 !== i && (y = y - r / 2 - x),
                0 === i && (y = y - r / 2 - x),
                Math.abs(y) < 0.001 && (y = 0),
                a.roundLengths && (y = Math.floor(y)),
                C % a.slidesPerGroup == 0 && u.push(y),
                h.push(y))
              : (a.roundLengths && (y = Math.floor(y)),
                (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(y),
                h.push(y),
                (y = y + $ + x)),
            (e.virtualSize += $ + x),
            (E = $),
            (C += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + g),
        n &&
          l &&
          ('slide' === a.effect || 'coverflow' === a.effect) &&
          i.css({ width: `${e.virtualSize + a.spaceBetween}px` }),
        a.setWrapperSize &&
          i.css({ [t('width')]: `${e.virtualSize + a.spaceBetween}px` }),
        T && e.grid.updateWrapperSize($, u, t),
        !a.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < u.length; s += 1) {
          let i = u[s];
          a.roundLengths && (i = Math.floor(i)),
            u[s] <= e.virtualSize - r && t.push(i);
        }
        (u = t),
          Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - r);
      }
      if ((0 === u.length && (u = [0]), 0 !== a.spaceBetween)) {
        const s = e.isHorizontal() && n ? 'marginLeft' : t('marginRight');
        c.filter((e, t) => !a.cssMode || t !== c.length - 1).css({
          [s]: `${x}px`,
        });
      }
      if (a.centeredSlides && a.centeredSlidesBounds) {
        let e = 0;
        m.forEach((t) => {
          e += t + (a.spaceBetween ? a.spaceBetween : 0);
        }),
          (e -= a.spaceBetween);
        const t = e - r;
        u = u.map((e) => (e < 0 ? -f : e > t ? t + g : e));
      }
      if (a.centerInsufficientSlides) {
        let e = 0;
        if (
          (m.forEach((t) => {
            e += t + (a.spaceBetween ? a.spaceBetween : 0);
          }),
          (e -= a.spaceBetween),
          e < r)
        ) {
          const t = (r - e) / 2;
          u.forEach((e, s) => {
            u[s] = e - t;
          }),
            h.forEach((e, s) => {
              h[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: u,
          slidesGrid: h,
          slidesSizesGrid: m,
        }),
        a.centeredSlides && a.cssMode && !a.centeredSlidesBounds)
      ) {
        v(e.wrapperEl, '--swiper-centered-offset-before', -u[0] + 'px'),
          v(
            e.wrapperEl,
            '--swiper-centered-offset-after',
            e.size / 2 - m[m.length - 1] / 2 + 'px'
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (p !== d && e.emit('slidesLengthChange'),
        u.length !== w &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit('snapGridLengthChange')),
        h.length !== b && e.emit('slidesGridLengthChange'),
        a.watchSlidesProgress && e.updateSlidesOffset(),
        !(o || a.cssMode || ('slide' !== a.effect && 'fade' !== a.effect)))
      ) {
        const t = `${a.containerModifierClass}backface-hidden`,
          s = e.$el.hasClass(t);
        p <= a.maxBackfaceHiddenSlides
          ? s || e.$el.addClass(t)
          : s && e.$el.removeClass(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        a = t.virtual && t.params.virtual.enabled;
      let i,
        r = 0;
      'number' == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const n = (e) =>
        a
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute('data-swiper-slide-index'), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ('auto' !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || d([])).each((e) => {
            s.push(e);
          });
        else
          for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
            const e = t.activeIndex + i;
            if (e > t.slides.length && !a) break;
            s.push(n(e));
          }
      else s.push(n(t.activeIndex));
      for (i = 0; i < s.length; i += 1)
        if (void 0 !== s[i]) {
          const e = s[i].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && t.$wrapperEl.css('height', `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let s = 0; s < t.length; s += 1)
        t[s].swiperSlideOffset = e.isHorizontal()
          ? t[s].offsetLeft
          : t[s].offsetTop;
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: a, rtlTranslate: i, snapGrid: r } = t;
      if (0 === a.length) return;
      void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
      let n = -e;
      i && (n = e),
        a.removeClass(s.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < a.length; e += 1) {
        const l = a[e];
        let o = l.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
        const d =
            (n + (s.centeredSlides ? t.minTranslate() : 0) - o) /
            (l.swiperSlideSize + s.spaceBetween),
          c =
            (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) /
            (l.swiperSlideSize + s.spaceBetween),
          p = -(n - o),
          u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (p <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(l),
          t.visibleSlidesIndexes.push(e),
          a.eq(e).addClass(s.slideVisibleClass)),
          (l.progress = i ? -d : d),
          (l.originalProgress = i ? -c : c);
      }
      t.visibleSlides = d(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        a = t.maxTranslate() - t.minTranslate();
      let { progress: i, isBeginning: r, isEnd: n } = t;
      const l = r,
        o = n;
      0 === a
        ? ((i = 0), (r = !0), (n = !0))
        : ((i = (e - t.minTranslate()) / a), (r = i <= 0), (n = i >= 1)),
        Object.assign(t, { progress: i, isBeginning: r, isEnd: n }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        r && !l && t.emit('reachBeginning toEdge'),
        n && !o && t.emit('reachEnd toEdge'),
        ((l && !r) || (o && !n)) && t.emit('fromEdge'),
        t.emit('progress', i);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: s,
          $wrapperEl: a,
          activeIndex: i,
          realIndex: r,
        } = e,
        n = e.virtual && s.virtual.enabled;
      let l;
      t.removeClass(
        `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
      ),
        (l = n
          ? e.$wrapperEl.find(
              `.${s.slideClass}[data-swiper-slide-index="${i}"]`
            )
          : t.eq(i)),
        l.addClass(s.slideActiveClass),
        s.loop &&
          (l.hasClass(s.slideDuplicateClass)
            ? a
                .children(
                  `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                )
                .addClass(s.slideDuplicateActiveClass)
            : a
                .children(
                  `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                )
                .addClass(s.slideDuplicateActiveClass));
      let o = l.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
      s.loop && 0 === o.length && ((o = t.eq(0)), o.addClass(s.slideNextClass));
      let d = l.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
      s.loop &&
        0 === d.length &&
        ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
        s.loop &&
          (o.hasClass(s.slideDuplicateClass)
            ? a
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${o.attr(
                    'data-swiper-slide-index'
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass)
            : a
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${o.attr(
                    'data-swiper-slide-index'
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass),
          d.hasClass(s.slideDuplicateClass)
            ? a
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${d.attr(
                    'data-swiper-slide-index'
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)
            : a
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${d.attr(
                    'data-swiper-slide-index'
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: a,
          snapGrid: i,
          params: r,
          activeIndex: n,
          realIndex: l,
          snapIndex: o,
        } = t;
      let d,
        c = e;
      if (void 0 === c) {
        for (let e = 0; e < a.length; e += 1)
          void 0 !== a[e + 1]
            ? s >= a[e] && s < a[e + 1] - (a[e + 1] - a[e]) / 2
              ? (c = e)
              : s >= a[e] && s < a[e + 1] && (c = e + 1)
            : s >= a[e] && (c = e);
        r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
      }
      if (i.indexOf(s) >= 0) d = i.indexOf(s);
      else {
        const e = Math.min(r.slidesPerGroupSkip, c);
        d = e + Math.floor((c - e) / r.slidesPerGroup);
      }
      if ((d >= i.length && (d = i.length - 1), c === n))
        return void (d !== o && ((t.snapIndex = d), t.emit('snapIndexChange')));
      const p = parseInt(
        t.slides.eq(c).attr('data-swiper-slide-index') || c,
        10
      );
      Object.assign(t, {
        snapIndex: d,
        realIndex: p,
        previousIndex: n,
        activeIndex: c,
      }),
        t.emit('activeIndexChange'),
        t.emit('snapIndexChange'),
        l !== p && t.emit('realIndexChange'),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit('slideChange');
    },
    updateClickedSlide: function (e) {
      const t = this,
        s = t.params,
        a = d(e).closest(`.${s.slideClass}`)[0];
      let i,
        r = !1;
      if (a)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === a) {
            (r = !0), (i = e);
            break;
          }
      if (!a || !r)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = a),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              d(a).attr('data-swiper-slide-index'),
              10
            ))
          : (t.clickedIndex = i),
        s.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  var M = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? 'x' : 'y');
      const { params: t, rtlTranslate: s, translate: a, $wrapperEl: i } = this;
      if (t.virtualTranslate) return s ? -a : a;
      if (t.cssMode) return a;
      let r = h(i[0], e);
      return s && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        {
          rtlTranslate: a,
          params: i,
          $wrapperEl: r,
          wrapperEl: n,
          progress: l,
        } = s;
      let o,
        d = 0,
        c = 0;
      s.isHorizontal() ? (d = a ? -e : e) : (c = e),
        i.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
        i.cssMode
          ? (n[s.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = s.isHorizontal()
              ? -d
              : -c)
          : i.virtualTranslate ||
            r.transform(`translate3d(${d}px, ${c}px, 0px)`),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? d : c);
      const p = s.maxTranslate() - s.minTranslate();
      (o = 0 === p ? 0 : (e - s.minTranslate()) / p),
        o !== l && s.updateProgress(e),
        s.emit('setTranslate', s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, a, i) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === a && (a = !0);
      const r = this,
        { params: n, wrapperEl: l } = r;
      if (r.animating && n.preventInteractionOnTransition) return !1;
      const o = r.minTranslate(),
        d = r.maxTranslate();
      let c;
      if (
        ((c = a && e > o ? o : a && e < d ? d : e),
        r.updateProgress(c),
        n.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) l[e ? 'scrollLeft' : 'scrollTop'] = -c;
        else {
          if (!r.support.smoothScroll)
            return (
              w({ swiper: r, targetPosition: -c, side: e ? 'left' : 'top' }), !0
            );
          l.scrollTo({ [e ? 'left' : 'top']: -c, behavior: 'smooth' });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(c),
            s &&
              (r.emit('beforeTransitionStart', t, i), r.emit('transitionEnd')))
          : (r.setTransition(t),
            r.setTranslate(c),
            s &&
              (r.emit('beforeTransitionStart', t, i),
              r.emit('transitionStart')),
            r.animating ||
              ((r.animating = !0),
              r.onTranslateToWrapperTransitionEnd ||
                (r.onTranslateToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.$wrapperEl[0].removeEventListener(
                      'transitionend',
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    r.$wrapperEl[0].removeEventListener(
                      'webkitTransitionEnd',
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    (r.onTranslateToWrapperTransitionEnd = null),
                    delete r.onTranslateToWrapperTransitionEnd,
                    s && r.emit('transitionEnd'));
                }),
              r.$wrapperEl[0].addEventListener(
                'transitionend',
                r.onTranslateToWrapperTransitionEnd
              ),
              r.$wrapperEl[0].addEventListener(
                'webkitTransitionEnd',
                r.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function P(e) {
    let { swiper: t, runCallbacks: s, direction: a, step: i } = e;
    const { activeIndex: r, previousIndex: n } = t;
    let l = a;
    if (
      (l || (l = r > n ? 'next' : r < n ? 'prev' : 'reset'),
      t.emit(`transition${i}`),
      s && r !== n)
    ) {
      if ('reset' === l) return void t.emit(`slideResetTransition${i}`);
      t.emit(`slideChangeTransition${i}`),
        'next' === l
          ? t.emit(`slideNextTransition${i}`)
          : t.emit(`slidePrevTransition${i}`);
    }
  }
  var k = {
    slideTo: function (e, t, s, a, i) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        'number' != typeof e && 'string' != typeof e)
      )
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ('string' == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const r = this;
      let n = e;
      n < 0 && (n = 0);
      const {
        params: l,
        snapGrid: o,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: m,
      } = r;
      if ((r.animating && l.preventInteractionOnTransition) || (!m && !a && !i))
        return !1;
      const f = Math.min(r.params.slidesPerGroupSkip, n);
      let g = f + Math.floor((n - f) / r.params.slidesPerGroup);
      g >= o.length && (g = o.length - 1);
      const v = -o[g];
      if (l.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * d[e]),
            a = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < a - (a - s) / 2
              ? (n = e)
              : t >= s && t < a && (n = e + 1)
            : t >= s && (n = e);
        }
      if (r.initialized && n !== p) {
        if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
          return !1;
        if (
          !r.allowSlidePrev &&
          v > r.translate &&
          v > r.maxTranslate() &&
          (p || 0) !== n
        )
          return !1;
      }
      let b;
      if (
        (n !== (c || 0) && s && r.emit('beforeSlideChangeStart'),
        r.updateProgress(v),
        (b = n > p ? 'next' : n < p ? 'prev' : 'reset'),
        (u && -v === r.translate) || (!u && v === r.translate))
      )
        return (
          r.updateActiveIndex(n),
          l.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          'slide' !== l.effect && r.setTranslate(v),
          'reset' !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)),
          !1
        );
      if (l.cssMode) {
        const e = r.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = r.virtual && r.params.virtual.enabled;
          t &&
            ((r.wrapperEl.style.scrollSnapType = 'none'),
            (r._immediateVirtual = !0)),
            (h[e ? 'scrollLeft' : 'scrollTop'] = s),
            t &&
              requestAnimationFrame(() => {
                (r.wrapperEl.style.scrollSnapType = ''),
                  (r._swiperImmediateVirtual = !1);
              });
        } else {
          if (!r.support.smoothScroll)
            return (
              w({ swiper: r, targetPosition: s, side: e ? 'left' : 'top' }), !0
            );
          h.scrollTo({ [e ? 'left' : 'top']: s, behavior: 'smooth' });
        }
        return !0;
      }
      return (
        r.setTransition(t),
        r.setTranslate(v),
        r.updateActiveIndex(n),
        r.updateSlidesClasses(),
        r.emit('beforeTransitionStart', t, a),
        r.transitionStart(s, b),
        0 === t
          ? r.transitionEnd(s, b)
          : r.animating ||
            ((r.animating = !0),
            r.onSlideToWrapperTransitionEnd ||
              (r.onSlideToWrapperTransitionEnd = function (e) {
                r &&
                  !r.destroyed &&
                  e.target === this &&
                  (r.$wrapperEl[0].removeEventListener(
                    'transitionend',
                    r.onSlideToWrapperTransitionEnd
                  ),
                  r.$wrapperEl[0].removeEventListener(
                    'webkitTransitionEnd',
                    r.onSlideToWrapperTransitionEnd
                  ),
                  (r.onSlideToWrapperTransitionEnd = null),
                  delete r.onSlideToWrapperTransitionEnd,
                  r.transitionEnd(s, b));
              }),
            r.$wrapperEl[0].addEventListener(
              'transitionend',
              r.onSlideToWrapperTransitionEnd
            ),
            r.$wrapperEl[0].addEventListener(
              'webkitTransitionEnd',
              r.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, a) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        'string' == typeof e)
      ) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const i = this;
      let r = e;
      return i.params.loop && (r += i.loopedSlides), i.slideTo(r, t, s, a);
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const a = this,
        { animating: i, enabled: r, params: n } = a;
      if (!r) return a;
      let l = n.slidesPerGroup;
      'auto' === n.slidesPerView &&
        1 === n.slidesPerGroup &&
        n.slidesPerGroupAuto &&
        (l = Math.max(a.slidesPerViewDynamic('current', !0), 1));
      const o = a.activeIndex < n.slidesPerGroupSkip ? 1 : l;
      if (n.loop) {
        if (i && n.loopPreventsSlide) return !1;
        a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
      }
      return n.rewind && a.isEnd
        ? a.slideTo(0, e, t, s)
        : a.slideTo(a.activeIndex + o, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const a = this,
        {
          params: i,
          animating: r,
          snapGrid: n,
          slidesGrid: l,
          rtlTranslate: o,
          enabled: d,
        } = a;
      if (!d) return a;
      if (i.loop) {
        if (r && i.loopPreventsSlide) return !1;
        a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
      }
      function c(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = c(o ? a.translate : -a.translate),
        u = n.map((e) => c(e));
      let h = n[u.indexOf(p) - 1];
      if (void 0 === h && i.cssMode) {
        let e;
        n.forEach((t, s) => {
          p >= t && (e = s);
        }),
          void 0 !== e && (h = n[e > 0 ? e - 1 : e]);
      }
      let m = 0;
      if (
        (void 0 !== h &&
          ((m = l.indexOf(h)),
          m < 0 && (m = a.activeIndex - 1),
          'auto' === i.slidesPerView &&
            1 === i.slidesPerGroup &&
            i.slidesPerGroupAuto &&
            ((m = m - a.slidesPerViewDynamic('previous', !0) + 1),
            (m = Math.max(m, 0)))),
        i.rewind && a.isBeginning)
      ) {
        const i =
          a.params.virtual && a.params.virtual.enabled && a.virtual
            ? a.virtual.slides.length - 1
            : a.slides.length - 1;
        return a.slideTo(i, e, t, s);
      }
      return a.slideTo(m, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, a) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === a && (a = 0.5);
      const i = this;
      let r = i.activeIndex;
      const n = Math.min(i.params.slidesPerGroupSkip, r),
        l = n + Math.floor((r - n) / i.params.slidesPerGroup),
        o = i.rtlTranslate ? i.translate : -i.translate;
      if (o >= i.snapGrid[l]) {
        const e = i.snapGrid[l];
        o - e > (i.snapGrid[l + 1] - e) * a && (r += i.params.slidesPerGroup);
      } else {
        const e = i.snapGrid[l - 1];
        o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, i.slidesGrid.length - 1)),
        i.slideTo(r, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: s } = e,
        a =
          'auto' === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let i,
        r = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (i = parseInt(d(e.clickedSlide).attr('data-swiper-slide-index'), 10)),
          t.centeredSlides
            ? r < e.loopedSlides - a / 2 ||
              r > e.slides.length - e.loopedSlides + a / 2
              ? (e.loopFix(),
                (r = s
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                p(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - a
            ? (e.loopFix(),
              (r = s
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              p(() => {
                e.slideTo(r);
              }))
            : e.slideTo(r);
      } else e.slideTo(r);
    },
  };
  var z = {
    loopCreate: function () {
      const e = this,
        t = a(),
        { params: s, $wrapperEl: i } = e,
        r = i.children().length > 0 ? d(i.children()[0].parentNode) : i;
      r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
      let n = r.children(`.${s.slideClass}`);
      if (s.loopFillGroupWithBlank) {
        const e = s.slidesPerGroup - (n.length % s.slidesPerGroup);
        if (e !== s.slidesPerGroup) {
          for (let a = 0; a < e; a += 1) {
            const e = d(t.createElement('div')).addClass(
              `${s.slideClass} ${s.slideBlankClass}`
            );
            r.append(e);
          }
          n = r.children(`.${s.slideClass}`);
        }
      }
      'auto' !== s.slidesPerView ||
        s.loopedSlides ||
        (s.loopedSlides = n.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(s.loopedSlides || s.slidesPerView, 10)
        )),
        (e.loopedSlides += s.loopAdditionalSlides),
        e.loopedSlides > n.length &&
          e.params.loopedSlidesLimit &&
          (e.loopedSlides = n.length);
      const l = [],
        o = [];
      n.each((e, t) => {
        d(e).attr('data-swiper-slide-index', t);
      });
      for (let t = 0; t < e.loopedSlides; t += 1) {
        const e = t - Math.floor(t / n.length) * n.length;
        o.push(n.eq(e)[0]), l.unshift(n.eq(n.length - e - 1)[0]);
      }
      for (let e = 0; e < o.length; e += 1)
        r.append(d(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
      for (let e = l.length - 1; e >= 0; e -= 1)
        r.prepend(d(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit('beforeLoopFix');
      const {
        activeIndex: t,
        slides: s,
        loopedSlides: a,
        allowSlidePrev: i,
        allowSlideNext: r,
        snapGrid: n,
        rtlTranslate: l,
      } = e;
      let o;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const d = -n[t] - e.getTranslate();
      if (t < a) {
        (o = s.length - 3 * a + t), (o += a);
        e.slideTo(o, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((l ? -e.translate : e.translate) - d);
      } else if (t >= s.length - a) {
        (o = -s.length + t + a), (o += a);
        e.slideTo(o, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((l ? -e.translate : e.translate) - d);
      }
      (e.allowSlidePrev = i), (e.allowSlideNext = r), e.emit('loopFix');
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: s } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        s.removeAttr('data-swiper-slide-index');
    },
  };
  function L(e) {
    const t = this,
      s = a(),
      i = r(),
      n = t.touchEventsData,
      { params: l, touches: o, enabled: c } = t;
    if (!c) return;
    if (t.animating && l.preventInteractionOnTransition) return;
    !t.animating && l.cssMode && l.loop && t.loopFix();
    let p = e;
    p.originalEvent && (p = p.originalEvent);
    let h = d(p.target);
    if ('wrapper' === l.touchEventsTarget && !h.closest(t.wrapperEl).length)
      return;
    if (
      ((n.isTouchEvent = 'touchstart' === p.type),
      !n.isTouchEvent && 'which' in p && 3 === p.which)
    )
      return;
    if (!n.isTouchEvent && 'button' in p && p.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    const m = !!l.noSwipingClass && '' !== l.noSwipingClass,
      f = e.composedPath ? e.composedPath() : e.path;
    m && p.target && p.target.shadowRoot && f && (h = d(f[0]));
    const g = l.noSwipingSelector
        ? l.noSwipingSelector
        : `.${l.noSwipingClass}`,
      v = !(!p.target || !p.target.shadowRoot);
    if (
      l.noSwiping &&
      (v
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === a() || s === r()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
              })(t)
            );
          })(g, h[0])
        : h.closest(g)[0])
    )
      return void (t.allowClick = !0);
    if (l.swipeHandler && !h.closest(l.swipeHandler)[0]) return;
    (o.currentX = 'touchstart' === p.type ? p.targetTouches[0].pageX : p.pageX),
      (o.currentY =
        'touchstart' === p.type ? p.targetTouches[0].pageY : p.pageY);
    const w = o.currentX,
      b = o.currentY,
      x = l.edgeSwipeDetection || l.iOSEdgeSwipeDetection,
      y = l.edgeSwipeThreshold || l.iOSEdgeSwipeThreshold;
    if (x && (w <= y || w >= i.innerWidth - y)) {
      if ('prevent' !== x) return;
      e.preventDefault();
    }
    if (
      (Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (o.startX = w),
      (o.startY = b),
      (n.touchStartTime = u()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      l.threshold > 0 && (n.allowThresholdMove = !1),
      'touchstart' !== p.type)
    ) {
      let e = !0;
      h.is(n.focusableElements) &&
        ((e = !1), 'SELECT' === h[0].nodeName && (n.isTouched = !1)),
        s.activeElement &&
          d(s.activeElement).is(n.focusableElements) &&
          s.activeElement !== h[0] &&
          s.activeElement.blur();
      const a = e && t.allowTouchMove && l.touchStartPreventDefault;
      (!l.touchStartForcePreventDefault && !a) ||
        h[0].isContentEditable ||
        p.preventDefault();
    }
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !l.cssMode &&
      t.freeMode.onTouchStart(),
      t.emit('touchStart', p);
  }
  function O(e) {
    const t = a(),
      s = this,
      i = s.touchEventsData,
      { params: r, touches: n, rtlTranslate: l, enabled: o } = s;
    if (!o) return;
    let c = e;
    if ((c.originalEvent && (c = c.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit('touchMoveOpposite', c)
      );
    if (i.isTouchEvent && 'touchmove' !== c.type) return;
    const p =
        'touchmove' === c.type &&
        c.targetTouches &&
        (c.targetTouches[0] || c.changedTouches[0]),
      h = 'touchmove' === c.type ? p.pageX : c.pageX,
      m = 'touchmove' === c.type ? p.pageY : c.pageY;
    if (c.preventedByNestedSwiper) return (n.startX = h), void (n.startY = m);
    if (!s.allowTouchMove)
      return (
        d(c.target).is(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(n, { startX: h, startY: m, currentX: h, currentY: m }),
          (i.touchStartTime = u()))
        )
      );
    if (i.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
      if (s.isVertical()) {
        if (
          (m < n.startY && s.translate <= s.maxTranslate()) ||
          (m > n.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (h < n.startX && s.translate <= s.maxTranslate()) ||
        (h > n.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      i.isTouchEvent &&
      t.activeElement &&
      c.target === t.activeElement &&
      d(c.target).is(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    if (
      (i.allowTouchCallbacks && s.emit('touchMove', c),
      c.targetTouches && c.targetTouches.length > 1)
    )
      return;
    (n.currentX = h), (n.currentY = m);
    const f = n.currentX - n.startX,
      g = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(f ** 2 + g ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (i.isScrolling = !1)
        : f * f + g * g >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(g), Math.abs(f))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > r.touchAngle
            : 90 - e > r.touchAngle));
    }
    if (
      (i.isScrolling && s.emit('touchMoveOpposite', c),
      void 0 === i.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (i.startMoving = !0)),
      i.isScrolling)
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !r.cssMode && c.cancelable && c.preventDefault(),
      r.touchMoveStopPropagation && !r.nested && c.stopPropagation(),
      i.isMoved ||
        (r.loop && !r.cssMode && s.loopFix(),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating &&
          s.$wrapperEl.trigger('webkitTransitionEnd transitionend'),
        (i.allowMomentumBounce = !1),
        !r.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit('sliderFirstMove', c)),
      s.emit('sliderMove', c),
      (i.isMoved = !0);
    let v = s.isHorizontal() ? f : g;
    (n.diff = v),
      (v *= r.touchRatio),
      l && (v = -v),
      (s.swipeDirection = v > 0 ? 'prev' : 'next'),
      (i.currentTranslate = v + i.startTranslate);
    let w = !0,
      b = r.resistanceRatio;
    if (
      (r.touchReleaseOnEdges && (b = 0),
      v > 0 && i.currentTranslate > s.minTranslate()
        ? ((w = !1),
          r.resistance &&
            (i.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + i.startTranslate + v) ** b))
        : v < 0 &&
          i.currentTranslate < s.maxTranslate() &&
          ((w = !1),
          r.resistance &&
            (i.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - i.startTranslate - v) ** b)),
      w && (c.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        'next' === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        'prev' === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      r.threshold > 0)
    ) {
      if (!(Math.abs(v) > r.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (i.currentTranslate = i.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    r.followFinger &&
      !r.cssMode &&
      (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
        r.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      s.params.freeMode &&
        r.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function I(e) {
    const t = this,
      s = t.touchEventsData,
      { params: a, touches: i, rtlTranslate: r, slidesGrid: n, enabled: l } = t;
    if (!l) return;
    let o = e;
    if (
      (o.originalEvent && (o = o.originalEvent),
      s.allowTouchCallbacks && t.emit('touchEnd', o),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && a.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    a.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const d = u(),
      c = d - s.touchStartTime;
    if (t.allowClick) {
      const e = o.path || (o.composedPath && o.composedPath());
      t.updateClickedSlide((e && e[0]) || o.target),
        t.emit('tap click', o),
        c < 300 &&
          d - s.lastClickTime < 300 &&
          t.emit('doubleTap doubleClick', o);
    }
    if (
      ((s.lastClickTime = u()),
      p(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === i.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let h;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (h = a.followFinger
        ? r
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      a.cssMode)
    )
      return;
    if (t.params.freeMode && a.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: h });
    let m = 0,
      f = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < n.length;
      e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
    ) {
      const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
      void 0 !== n[e + t]
        ? h >= n[e] && h < n[e + t] && ((m = e), (f = n[e + t] - n[e]))
        : h >= n[e] && ((m = e), (f = n[n.length - 1] - n[n.length - 2]));
    }
    let g = null,
      v = null;
    a.rewind &&
      (t.isBeginning
        ? (v =
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (g = 0));
    const w = (h - n[m]) / f,
      b = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    if (c > a.longSwipesMs) {
      if (!a.longSwipes) return void t.slideTo(t.activeIndex);
      'next' === t.swipeDirection &&
        (w >= a.longSwipesRatio
          ? t.slideTo(a.rewind && t.isEnd ? g : m + b)
          : t.slideTo(m)),
        'prev' === t.swipeDirection &&
          (w > 1 - a.longSwipesRatio
            ? t.slideTo(m + b)
            : null !== v && w < 0 && Math.abs(w) > a.longSwipesRatio
            ? t.slideTo(v)
            : t.slideTo(m));
    } else {
      if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl)
        ? o.target === t.navigation.nextEl
          ? t.slideTo(m + b)
          : t.slideTo(m)
        : ('next' === t.swipeDirection && t.slideTo(null !== g ? g : m + b),
          'prev' === t.swipeDirection && t.slideTo(null !== v ? v : m));
    }
  }
  function A() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: a, allowSlidePrev: i, snapGrid: r } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ('auto' === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = i),
      (e.allowSlideNext = a),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function D(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function G() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: a } = e;
    if (!a) return;
    let i;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit('setTranslate', e.translate, !1);
  }
  let N = !1;
  function B() {}
  const H = (e, t) => {
    const s = a(),
      {
        params: i,
        touchEvents: r,
        el: n,
        wrapperEl: l,
        device: o,
        support: d,
      } = e,
      c = !!i.nested,
      p = 'on' === t ? 'addEventListener' : 'removeEventListener',
      u = t;
    if (d.touch) {
      const t = !(
        'touchstart' !== r.start ||
        !d.passiveListener ||
        !i.passiveListeners
      ) && { passive: !0, capture: !1 };
      n[p](r.start, e.onTouchStart, t),
        n[p](
          r.move,
          e.onTouchMove,
          d.passiveListener ? { passive: !1, capture: c } : c
        ),
        n[p](r.end, e.onTouchEnd, t),
        r.cancel && n[p](r.cancel, e.onTouchEnd, t);
    } else
      n[p](r.start, e.onTouchStart, !1),
        s[p](r.move, e.onTouchMove, c),
        s[p](r.end, e.onTouchEnd, !1);
    (i.preventClicks || i.preventClicksPropagation) &&
      n[p]('click', e.onClick, !0),
      i.cssMode && l[p]('scroll', e.onScroll),
      i.updateOnWindowResize
        ? e[u](
            o.ios || o.android
              ? 'resize orientationchange observerUpdate'
              : 'resize observerUpdate',
            A,
            !0
          )
        : e[u]('observerUpdate', A, !0);
  };
  var X = {
    attachEvents: function () {
      const e = this,
        t = a(),
        { params: s, support: i } = e;
      (e.onTouchStart = L.bind(e)),
        (e.onTouchMove = O.bind(e)),
        (e.onTouchEnd = I.bind(e)),
        s.cssMode && (e.onScroll = G.bind(e)),
        (e.onClick = D.bind(e)),
        i.touch && !N && (t.addEventListener('touchstart', B), (N = !0)),
        H(e, 'on');
    },
    detachEvents: function () {
      H(this, 'off');
    },
  };
  const Y = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var R = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: s, rtl: a, $el: i, device: r, support: n } = e,
        l = (function (e, t) {
          const s = [];
          return (
            e.forEach((e) => {
              'object' == typeof e
                ? Object.keys(e).forEach((a) => {
                    e[a] && s.push(t + a);
                  })
                : 'string' == typeof e && s.push(t + e);
            }),
            s
          );
        })(
          [
            'initialized',
            s.direction,
            { 'pointer-events': !n.touch },
            { 'free-mode': e.params.freeMode && s.freeMode.enabled },
            { autoheight: s.autoHeight },
            { rtl: a },
            { grid: s.grid && s.grid.rows > 1 },
            {
              'grid-column':
                s.grid && s.grid.rows > 1 && 'column' === s.grid.fill,
            },
            { android: r.android },
            { ios: r.ios },
            { 'css-mode': s.cssMode },
            { centered: s.cssMode && s.centeredSlides },
            { 'watch-progress': s.watchSlidesProgress },
          ],
          s.containerModifierClass
        );
      t.push(...l), i.addClass([...t].join(' ')), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(' ')), this.emitContainerClasses();
    },
  };
  var W = {
    init: !0,
    direction: 'horizontal',
    touchEventsTarget: 'wrapper',
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: 'input, select, option, textarea, button, video, label',
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: 'slide',
    breakpoints: void 0,
    breakpointsBase: 'window',
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopedSlidesLimit: !0,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: 'swiper-',
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-invisible-blank',
    slideActiveClass: 'swiper-slide-active',
    slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideDuplicateClass: 'swiper-slide-duplicate',
    slideNextClass: 'swiper-slide-next',
    slideDuplicateNextClass: 'swiper-slide-duplicate-next',
    slidePrevClass: 'swiper-slide-prev',
    slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
    wrapperClass: 'swiper-wrapper',
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function q(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const a = Object.keys(s)[0],
        i = s[a];
      'object' == typeof i && null !== i
        ? (['navigation', 'pagination', 'scrollbar'].indexOf(a) >= 0 &&
            !0 === e[a] &&
            (e[a] = { auto: !0 }),
          a in e && 'enabled' in i
            ? (!0 === e[a] && (e[a] = { enabled: !0 }),
              'object' != typeof e[a] ||
                'enabled' in e[a] ||
                (e[a].enabled = !0),
              e[a] || (e[a] = { enabled: !1 }),
              g(t, s))
            : g(t, s))
        : g(t, s);
    };
  }
  const j = {
      eventsEmitter: $,
      update: S,
      translate: M,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode || s.$wrapperEl.transition(e),
            s.emit('setTransition', e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: a } = s;
          a.cssMode ||
            (a.autoHeight && s.updateAutoHeight(),
            P({ swiper: s, runCallbacks: e, direction: t, step: 'Start' }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: a } = s;
          (s.animating = !1),
            a.cssMode ||
              (s.setTransition(0),
              P({ swiper: s, runCallbacks: e, direction: t, step: 'End' }));
        },
      },
      slide: k,
      loop: z,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            'container' === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (s.style.cursor = 'move'), (s.style.cursor = e ? 'grabbing' : 'grab');
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              'container' === e.params.touchEventsTarget ? 'el' : 'wrapperEl'
            ].style.cursor = '');
        },
      },
      events: X,
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            {
              activeIndex: t,
              initialized: s,
              loopedSlides: a = 0,
              params: i,
              $el: r,
            } = e,
            n = i.breakpoints;
          if (!n || (n && 0 === Object.keys(n).length)) return;
          const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
          if (!l || e.currentBreakpoint === l) return;
          const o = (l in n ? n[l] : void 0) || e.originalParams,
            d = Y(e, i),
            c = Y(e, o),
            p = i.enabled;
          d && !c
            ? (r.removeClass(
                `${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`
              ),
              e.emitContainerClasses())
            : !d &&
              c &&
              (r.addClass(`${i.containerModifierClass}grid`),
              ((o.grid.fill && 'column' === o.grid.fill) ||
                (!o.grid.fill && 'column' === i.grid.fill)) &&
                r.addClass(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ['navigation', 'pagination', 'scrollbar'].forEach((t) => {
              const s = i[t] && i[t].enabled,
                a = o[t] && o[t].enabled;
              s && !a && e[t].disable(), !s && a && e[t].enable();
            });
          const u = o.direction && o.direction !== i.direction,
            h = i.loop && (o.slidesPerView !== i.slidesPerView || u);
          u && s && e.changeDirection(), g(e.params, o);
          const m = e.params.enabled;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            p && !m ? e.disable() : !p && m && e.enable(),
            (e.currentBreakpoint = l),
            e.emit('_beforeBreakpoint', o),
            h &&
              s &&
              (e.loopDestroy(),
              e.loopCreate(),
              e.updateSlides(),
              e.slideTo(t - a + e.loopedSlides, 0, !1)),
            e.emit('breakpoint', o);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = 'window'), !e || ('container' === t && !s)))
            return;
          let a = !1;
          const i = r(),
            n = 'window' === t ? i.innerHeight : s.clientHeight,
            l = Object.keys(e).map((e) => {
              if ('string' == typeof e && 0 === e.indexOf('@')) {
                const t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < l.length; e += 1) {
            const { point: r, value: n } = l[e];
            'window' === t
              ? i.matchMedia(`(min-width: ${n}px)`).matches && (a = r)
              : n <= s.clientWidth && (a = r);
          }
          return a || 'max';
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: a } = s;
          if (a) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? 'lock' : 'unlock');
        },
      },
      classes: R,
      images: {
        loadImage: function (e, t, s, a, i, n) {
          const l = r();
          let o;
          function c() {
            n && n();
          }
          d(e).parent('picture')[0] || (e.complete && i)
            ? c()
            : t
            ? ((o = new l.Image()),
              (o.onload = c),
              (o.onerror = c),
              a && (o.sizes = a),
              s && (o.srcset = s),
              t && (o.src = t))
            : c();
        },
        preloadImages: function () {
          const e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit('imagesReady')));
          }
          e.imagesToLoad = e.$el.find('img');
          for (let s = 0; s < e.imagesToLoad.length; s += 1) {
            const a = e.imagesToLoad[s];
            e.loadImage(
              a,
              a.currentSrc || a.getAttribute('src'),
              a.srcset || a.getAttribute('srcset'),
              a.sizes || a.getAttribute('sizes'),
              !0,
              t
            );
          }
        },
      },
    },
    _ = {};
  class V {
    constructor() {
      let e, t;
      for (var s = arguments.length, a = new Array(s), i = 0; i < s; i++)
        a[i] = arguments[i];
      if (
        (1 === a.length &&
        a[0].constructor &&
        'Object' === Object.prototype.toString.call(a[0]).slice(8, -1)
          ? (t = a[0])
          : ([e, t] = a),
        t || (t = {}),
        (t = g({}, t)),
        e && !t.el && (t.el = e),
        t.el && d(t.el).length > 1)
      ) {
        const e = [];
        return (
          d(t.el).each((s) => {
            const a = g({}, t, { el: s });
            e.push(new V(a));
          }),
          e
        );
      }
      const r = this;
      (r.__swiper__ = !0),
        (r.support = E()),
        (r.device = C({ userAgent: t.userAgent })),
        (r.browser = T()),
        (r.eventsListeners = {}),
        (r.eventsAnyListeners = []),
        (r.modules = [...r.__modules__]),
        t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
      const n = {};
      r.modules.forEach((e) => {
        e({
          swiper: r,
          extendParams: q(t, n),
          on: r.on.bind(r),
          once: r.once.bind(r),
          off: r.off.bind(r),
          emit: r.emit.bind(r),
        });
      });
      const l = g({}, W, n);
      return (
        (r.params = g({}, l, _, t)),
        (r.originalParams = g({}, r.params)),
        (r.passedParams = g({}, t)),
        r.params &&
          r.params.on &&
          Object.keys(r.params.on).forEach((e) => {
            r.on(e, r.params.on[e]);
          }),
        r.params && r.params.onAny && r.onAny(r.params.onAny),
        (r.$ = d),
        Object.assign(r, {
          enabled: r.params.enabled,
          el: e,
          classNames: [],
          slides: d(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => 'horizontal' === r.params.direction,
          isVertical: () => 'vertical' === r.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: r.params.allowSlideNext,
          allowSlidePrev: r.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ['touchstart', 'touchmove', 'touchend', 'touchcancel'],
              t = ['pointerdown', 'pointermove', 'pointerup'];
            return (
              (r.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (r.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              r.support.touch || !r.params.simulateTouch
                ? r.touchEventsTouch
                : r.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: r.params.focusableElements,
            lastClickTime: u(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: r.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        r.emit('_swiper'),
        r.params.init && r.init(),
        r
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit('enable'));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit('disable'));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const a = s.minTranslate(),
        i = (s.maxTranslate() - a) * e + a;
      s.translateTo(i, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(' ')
        .filter(
          (t) =>
            0 === t.indexOf('swiper') ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit('_containerClasses', t.join(' '));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ''
        : e.className
            .split(' ')
            .filter(
              (e) =>
                0 === e.indexOf('swiper-slide') ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(' ');
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((s) => {
        const a = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: a }), e.emit('_slideClass', s, a);
      }),
        e.emit('_slideClasses', t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = 'current'), void 0 === t && (t = !1);
      const {
        params: s,
        slides: a,
        slidesGrid: i,
        slidesSizesGrid: r,
        size: n,
        activeIndex: l,
      } = this;
      let o = 1;
      if (s.centeredSlides) {
        let e,
          t = a[l].swiperSlideSize;
        for (let s = l + 1; s < a.length; s += 1)
          a[s] &&
            !e &&
            ((t += a[s].swiperSlideSize), (o += 1), t > n && (e = !0));
        for (let s = l - 1; s >= 0; s -= 1)
          a[s] &&
            !e &&
            ((t += a[s].swiperSlideSize), (o += 1), t > n && (e = !0));
      } else if ('current' === e)
        for (let e = l + 1; e < a.length; e += 1) {
          (t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1);
        }
      else
        for (let e = l - 1; e >= 0; e -= 1) {
          i[l] - i[e] < n && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function a() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let i;
      s.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (a(), e.params.autoHeight && e.updateAutoHeight())
          : ((i =
              ('auto' === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            i || a()),
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit('update');
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        a = s.params.direction;
      return (
        e || (e = 'horizontal' === a ? 'vertical' : 'horizontal'),
        e === a ||
          ('horizontal' !== e && 'vertical' !== e) ||
          (s.$el
            .removeClass(`${s.params.containerModifierClass}${a}`)
            .addClass(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.each((t) => {
            'vertical' === e ? (t.style.width = '') : (t.style.height = '');
          }),
          s.emit('changeDirection'),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && 'rtl' === e) ||
        (!t.rtl && 'ltr' === e) ||
        ((t.rtl = 'rtl' === e),
        (t.rtlTranslate = 'horizontal' === t.params.direction && t.rtl),
        t.rtl
          ? (t.$el.addClass(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = 'rtl'))
          : (t.$el.removeClass(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = 'ltr')),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const s = d(e || t.params.el);
      if (!(e = s[0])) return !1;
      e.swiper = t;
      const i = () =>
        `.${(t.params.wrapperClass || '').trim().split(' ').join('.')}`;
      let r = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = d(e.shadowRoot.querySelector(i()));
          return (t.children = (e) => s.children(e)), t;
        }
        return s.children ? s.children(i()) : d(s).children(i());
      })();
      if (0 === r.length && t.params.createElements) {
        const e = a().createElement('div');
        (r = d(e)),
          (e.className = t.params.wrapperClass),
          s.append(e),
          s.children(`.${t.params.slideClass}`).each((e) => {
            r.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: s,
          el: e,
          $wrapperEl: r,
          wrapperEl: r[0],
          mounted: !0,
          rtl: 'rtl' === e.dir.toLowerCase() || 'rtl' === s.css('direction'),
          rtlTranslate:
            'horizontal' === t.params.direction &&
            ('rtl' === e.dir.toLowerCase() || 'rtl' === s.css('direction')),
          wrongRTL: '-webkit-box' === r.css('display'),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit('beforeInit'),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit('init'),
          t.emit('afterInit')),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: a, $el: i, $wrapperEl: r, slides: n } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit('beforeDestroy'),
          (s.initialized = !1),
          s.detachEvents(),
          a.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            i.removeAttr('style'),
            r.removeAttr('style'),
            n &&
              n.length &&
              n
                .removeClass(
                  [
                    a.slideVisibleClass,
                    a.slideActiveClass,
                    a.slideNextClass,
                    a.slidePrevClass,
                  ].join(' ')
                )
                .removeAttr('style')
                .removeAttr('data-swiper-slide-index')),
          s.emit('destroy'),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      g(_, e);
    }
    static get extendedDefaults() {
      return _;
    }
    static get defaults() {
      return W;
    }
    static installModule(e) {
      V.prototype.__modules__ || (V.prototype.__modules__ = []);
      const t = V.prototype.__modules__;
      'function' == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => V.installModule(e)), V)
        : (V.installModule(e), V);
    }
  }
  function F(e, t, s, i) {
    const r = a();
    return (
      e.params.createElements &&
        Object.keys(i).forEach((a) => {
          if (!s[a] && !0 === s.auto) {
            let n = e.$el.children(`.${i[a]}`)[0];
            n ||
              ((n = r.createElement('div')),
              (n.className = i[a]),
              e.$el.append(n)),
              (s[a] = n),
              (t[a] = n);
          }
        }),
      s
    );
  }
  function U(e) {
    return (
      void 0 === e && (e = ''),
      `.${e
        .trim()
        .replace(/([\.:!\/])/g, '\\$1')
        .replace(/ /g, '.')}`
    );
  }
  function K(e) {
    const t = this,
      { $wrapperEl: s, params: a } = t;
    if ((a.loop && t.loopDestroy(), 'object' == typeof e && 'length' in e))
      for (let t = 0; t < e.length; t += 1) e[t] && s.append(e[t]);
    else s.append(e);
    a.loop && t.loopCreate(), a.observer || t.update();
  }
  function Z(e) {
    const t = this,
      { params: s, $wrapperEl: a, activeIndex: i } = t;
    s.loop && t.loopDestroy();
    let r = i + 1;
    if ('object' == typeof e && 'length' in e) {
      for (let t = 0; t < e.length; t += 1) e[t] && a.prepend(e[t]);
      r = i + e.length;
    } else a.prepend(e);
    s.loop && t.loopCreate(), s.observer || t.update(), t.slideTo(r, 0, !1);
  }
  function Q(e, t) {
    const s = this,
      { $wrapperEl: a, params: i, activeIndex: r } = s;
    let n = r;
    i.loop &&
      ((n -= s.loopedSlides),
      s.loopDestroy(),
      (s.slides = a.children(`.${i.slideClass}`)));
    const l = s.slides.length;
    if (e <= 0) return void s.prependSlide(t);
    if (e >= l) return void s.appendSlide(t);
    let o = n > e ? n + 1 : n;
    const d = [];
    for (let t = l - 1; t >= e; t -= 1) {
      const e = s.slides.eq(t);
      e.remove(), d.unshift(e);
    }
    if ('object' == typeof t && 'length' in t) {
      for (let e = 0; e < t.length; e += 1) t[e] && a.append(t[e]);
      o = n > e ? n + t.length : n;
    } else a.append(t);
    for (let e = 0; e < d.length; e += 1) a.append(d[e]);
    i.loop && s.loopCreate(),
      i.observer || s.update(),
      i.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1);
  }
  function J(e) {
    const t = this,
      { params: s, $wrapperEl: a, activeIndex: i } = t;
    let r = i;
    s.loop &&
      ((r -= t.loopedSlides),
      t.loopDestroy(),
      (t.slides = a.children(`.${s.slideClass}`)));
    let n,
      l = r;
    if ('object' == typeof e && 'length' in e) {
      for (let s = 0; s < e.length; s += 1)
        (n = e[s]), t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1);
      l = Math.max(l, 0);
    } else (n = e), t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1), (l = Math.max(l, 0));
    s.loop && t.loopCreate(),
      s.observer || t.update(),
      s.loop ? t.slideTo(l + t.loopedSlides, 0, !1) : t.slideTo(l, 0, !1);
  }
  function ee() {
    const e = this,
      t = [];
    for (let s = 0; s < e.slides.length; s += 1) t.push(s);
    e.removeSlide(t);
  }
  function te(e) {
    const {
      effect: t,
      swiper: s,
      on: a,
      setTranslate: i,
      setTransition: r,
      overwriteParams: n,
      perspective: l,
      recreateShadows: o,
      getEffectParams: d,
    } = e;
    let c;
    a('beforeInit', () => {
      if (s.params.effect !== t) return;
      s.classNames.push(`${s.params.containerModifierClass}${t}`),
        l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
      const e = n ? n() : {};
      Object.assign(s.params, e), Object.assign(s.originalParams, e);
    }),
      a('setTranslate', () => {
        s.params.effect === t && i();
      }),
      a('setTransition', (e, a) => {
        s.params.effect === t && r(a);
      }),
      a('transitionEnd', () => {
        if (s.params.effect === t && o) {
          if (!d || !d().slideShadows) return;
          s.slides.each((e) => {
            s.$(e)
              .find(
                '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
              )
              .remove();
          }),
            o();
        }
      }),
      a('virtualUpdate', () => {
        s.params.effect === t &&
          (s.slides.length || (c = !0),
          requestAnimationFrame(() => {
            c && s.slides && s.slides.length && (i(), (c = !1));
          }));
      });
  }
  function se(e, t) {
    return e.transformEl
      ? t
          .find(e.transformEl)
          .css({
            'backface-visibility': 'hidden',
            '-webkit-backface-visibility': 'hidden',
          })
      : t;
  }
  function ae(e) {
    let { swiper: t, duration: s, transformEl: a, allSlides: i } = e;
    const { slides: r, activeIndex: n, $wrapperEl: l } = t;
    if (t.params.virtualTranslate && 0 !== s) {
      let e,
        s = !1;
      (e = i ? (a ? r.find(a) : r) : a ? r.eq(n).find(a) : r.eq(n)),
        e.transitionEnd(() => {
          if (s) return;
          if (!t || t.destroyed) return;
          (s = !0), (t.animating = !1);
          const e = ['webkitTransitionEnd', 'transitionend'];
          for (let t = 0; t < e.length; t += 1) l.trigger(e[t]);
        });
    }
  }
  function ie(e, t, s) {
    const a = 'swiper-slide-shadow' + (s ? `-${s}` : ''),
      i = e.transformEl ? t.find(e.transformEl) : t;
    let r = i.children(`.${a}`);
    return (
      r.length ||
        ((r = d(`<div class="swiper-slide-shadow${s ? `-${s}` : ''}"></div>`)),
        i.append(r)),
      r
    );
  }
  Object.keys(j).forEach((e) => {
    Object.keys(j[e]).forEach((t) => {
      V.prototype[t] = j[e][t];
    });
  }),
    V.use([
      function (e) {
        let { swiper: t, on: s, emit: a } = e;
        const i = r();
        let n = null,
          l = null;
        const o = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (a('beforeResize'), a('resize'));
          },
          d = () => {
            t && !t.destroyed && t.initialized && a('orientationchange');
          };
        s('init', () => {
          t.params.resizeObserver && void 0 !== i.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((n = new ResizeObserver((e) => {
                l = i.requestAnimationFrame(() => {
                  const { width: s, height: a } = t;
                  let i = s,
                    r = a;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: a, target: n } = e;
                    (n && n !== t.el) ||
                      ((i = a ? a.width : (s[0] || s).inlineSize),
                      (r = a ? a.height : (s[0] || s).blockSize));
                  }),
                    (i === s && r === a) || o();
                });
              })),
              n.observe(t.el))
            : (i.addEventListener('resize', o),
              i.addEventListener('orientationchange', d));
        }),
          s('destroy', () => {
            l && i.cancelAnimationFrame(l),
              n && n.unobserve && t.el && (n.unobserve(t.el), (n = null)),
              i.removeEventListener('resize', o),
              i.removeEventListener('orientationchange', d);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a, emit: i } = e;
        const n = [],
          l = r(),
          o = function (e, t) {
            void 0 === t && (t = {});
            const s = new (l.MutationObserver || l.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void i('observerUpdate', e[0]);
                const t = function () {
                  i('observerUpdate', e[0]);
                };
                l.requestAnimationFrame
                  ? l.requestAnimationFrame(t)
                  : l.setTimeout(t, 0);
              }
            );
            s.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              n.push(s);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          a('init', () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = t.$el.parents();
                for (let t = 0; t < e.length; t += 1) o(e[t]);
              }
              o(t.$el[0], { childList: t.params.observeSlideChildren }),
                o(t.$wrapperEl[0], { attributes: !1 });
            }
          }),
          a('destroy', () => {
            n.forEach((e) => {
              e.disconnect();
            }),
              n.splice(0, n.length);
          });
      },
    ]);
  const re = [
    function (e) {
      let t,
        { swiper: s, extendParams: a, on: i, emit: r } = e;
      function n(e, t) {
        const a = s.params.virtual;
        if (a.cache && s.virtual.cache[t]) return s.virtual.cache[t];
        const i = a.renderSlide
          ? d(a.renderSlide.call(s, e, t))
          : d(
              `<div class="${s.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`
            );
        return (
          i.attr('data-swiper-slide-index') ||
            i.attr('data-swiper-slide-index', t),
          a.cache && (s.virtual.cache[t] = i),
          i
        );
      }
      function l(e) {
        const {
            slidesPerView: t,
            slidesPerGroup: a,
            centeredSlides: i,
          } = s.params,
          { addSlidesBefore: l, addSlidesAfter: o } = s.params.virtual,
          { from: d, to: c, slides: p, slidesGrid: u, offset: h } = s.virtual;
        s.params.cssMode || s.updateActiveIndex();
        const m = s.activeIndex || 0;
        let f, g, v;
        (f = s.rtlTranslate ? 'right' : s.isHorizontal() ? 'left' : 'top'),
          i
            ? ((g = Math.floor(t / 2) + a + o), (v = Math.floor(t / 2) + a + l))
            : ((g = t + (a - 1) + o), (v = a + l));
        const w = Math.max((m || 0) - v, 0),
          b = Math.min((m || 0) + g, p.length - 1),
          x = (s.slidesGrid[w] || 0) - (s.slidesGrid[0] || 0);
        function y() {
          s.updateSlides(),
            s.updateProgress(),
            s.updateSlidesClasses(),
            s.lazy && s.params.lazy.enabled && s.lazy.load(),
            r('virtualUpdate');
        }
        if (
          (Object.assign(s.virtual, {
            from: w,
            to: b,
            offset: x,
            slidesGrid: s.slidesGrid,
          }),
          d === w && c === b && !e)
        )
          return (
            s.slidesGrid !== u && x !== h && s.slides.css(f, `${x}px`),
            s.updateProgress(),
            void r('virtualUpdate')
          );
        if (s.params.virtual.renderExternal)
          return (
            s.params.virtual.renderExternal.call(s, {
              offset: x,
              from: w,
              to: b,
              slides: (function () {
                const e = [];
                for (let t = w; t <= b; t += 1) e.push(p[t]);
                return e;
              })(),
            }),
            void (s.params.virtual.renderExternalUpdate
              ? y()
              : r('virtualUpdate'))
          );
        const E = [],
          C = [];
        if (e) s.$wrapperEl.find(`.${s.params.slideClass}`).remove();
        else
          for (let e = d; e <= c; e += 1)
            (e < w || e > b) &&
              s.$wrapperEl
                .find(`.${s.params.slideClass}[data-swiper-slide-index="${e}"]`)
                .remove();
        for (let t = 0; t < p.length; t += 1)
          t >= w &&
            t <= b &&
            (void 0 === c || e
              ? C.push(t)
              : (t > c && C.push(t), t < d && E.push(t)));
        C.forEach((e) => {
          s.$wrapperEl.append(n(p[e], e));
        }),
          E.sort((e, t) => t - e).forEach((e) => {
            s.$wrapperEl.prepend(n(p[e], e));
          }),
          s.$wrapperEl.children('.swiper-slide').css(f, `${x}px`),
          y();
      }
      a({
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
          renderExternalUpdate: !0,
          addSlidesBefore: 0,
          addSlidesAfter: 0,
        },
      }),
        (s.virtual = {
          cache: {},
          from: void 0,
          to: void 0,
          slides: [],
          offset: 0,
          slidesGrid: [],
        }),
        i('beforeInit', () => {
          s.params.virtual.enabled &&
            ((s.virtual.slides = s.params.virtual.slides),
            s.classNames.push(`${s.params.containerModifierClass}virtual`),
            (s.params.watchSlidesProgress = !0),
            (s.originalParams.watchSlidesProgress = !0),
            s.params.initialSlide || l());
        }),
        i('setTranslate', () => {
          s.params.virtual.enabled &&
            (s.params.cssMode && !s._immediateVirtual
              ? (clearTimeout(t),
                (t = setTimeout(() => {
                  l();
                }, 100)))
              : l());
        }),
        i('init update resize', () => {
          s.params.virtual.enabled &&
            s.params.cssMode &&
            v(s.wrapperEl, '--swiper-virtual-size', `${s.virtualSize}px`);
        }),
        Object.assign(s.virtual, {
          appendSlide: function (e) {
            if ('object' == typeof e && 'length' in e)
              for (let t = 0; t < e.length; t += 1)
                e[t] && s.virtual.slides.push(e[t]);
            else s.virtual.slides.push(e);
            l(!0);
          },
          prependSlide: function (e) {
            const t = s.activeIndex;
            let a = t + 1,
              i = 1;
            if (Array.isArray(e)) {
              for (let t = 0; t < e.length; t += 1)
                e[t] && s.virtual.slides.unshift(e[t]);
              (a = t + e.length), (i = e.length);
            } else s.virtual.slides.unshift(e);
            if (s.params.virtual.cache) {
              const e = s.virtual.cache,
                t = {};
              Object.keys(e).forEach((s) => {
                const a = e[s],
                  r = a.attr('data-swiper-slide-index');
                r && a.attr('data-swiper-slide-index', parseInt(r, 10) + i),
                  (t[parseInt(s, 10) + i] = a);
              }),
                (s.virtual.cache = t);
            }
            l(!0), s.slideTo(a, 0);
          },
          removeSlide: function (e) {
            if (null == e) return;
            let t = s.activeIndex;
            if (Array.isArray(e))
              for (let a = e.length - 1; a >= 0; a -= 1)
                s.virtual.slides.splice(e[a], 1),
                  s.params.virtual.cache && delete s.virtual.cache[e[a]],
                  e[a] < t && (t -= 1),
                  (t = Math.max(t, 0));
            else
              s.virtual.slides.splice(e, 1),
                s.params.virtual.cache && delete s.virtual.cache[e],
                e < t && (t -= 1),
                (t = Math.max(t, 0));
            l(!0), s.slideTo(t, 0);
          },
          removeAllSlides: function () {
            (s.virtual.slides = []),
              s.params.virtual.cache && (s.virtual.cache = {}),
              l(!0),
              s.slideTo(0, 0);
          },
          update: l,
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: n } = e;
      const l = a(),
        o = r();
      function c(e) {
        if (!t.enabled) return;
        const { rtlTranslate: s } = t;
        let a = e;
        a.originalEvent && (a = a.originalEvent);
        const i = a.keyCode || a.charCode,
          r = t.params.keyboard.pageUpDown,
          d = r && 33 === i,
          c = r && 34 === i,
          p = 37 === i,
          u = 39 === i,
          h = 38 === i,
          m = 40 === i;
        if (
          !t.allowSlideNext &&
          ((t.isHorizontal() && u) || (t.isVertical() && m) || c)
        )
          return !1;
        if (
          !t.allowSlidePrev &&
          ((t.isHorizontal() && p) || (t.isVertical() && h) || d)
        )
          return !1;
        if (
          !(
            a.shiftKey ||
            a.altKey ||
            a.ctrlKey ||
            a.metaKey ||
            (l.activeElement &&
              l.activeElement.nodeName &&
              ('input' === l.activeElement.nodeName.toLowerCase() ||
                'textarea' === l.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (
            t.params.keyboard.onlyInViewport &&
            (d || c || p || u || h || m)
          ) {
            let e = !1;
            if (
              t.$el.parents(`.${t.params.slideClass}`).length > 0 &&
              0 === t.$el.parents(`.${t.params.slideActiveClass}`).length
            )
              return;
            const a = t.$el,
              i = a[0].clientWidth,
              r = a[0].clientHeight,
              n = o.innerWidth,
              l = o.innerHeight,
              d = t.$el.offset();
            s && (d.left -= t.$el[0].scrollLeft);
            const c = [
              [d.left, d.top],
              [d.left + i, d.top],
              [d.left, d.top + r],
              [d.left + i, d.top + r],
            ];
            for (let t = 0; t < c.length; t += 1) {
              const s = c[t];
              if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= l) {
                if (0 === s[0] && 0 === s[1]) continue;
                e = !0;
              }
            }
            if (!e) return;
          }
          t.isHorizontal()
            ? ((d || c || p || u) &&
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              (((c || u) && !s) || ((d || p) && s)) && t.slideNext(),
              (((d || p) && !s) || ((c || u) && s)) && t.slidePrev())
            : ((d || c || h || m) &&
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              (c || m) && t.slideNext(),
              (d || h) && t.slidePrev()),
            n('keyPress', i);
        }
      }
      function p() {
        t.keyboard.enabled ||
          (d(l).on('keydown', c), (t.keyboard.enabled = !0));
      }
      function u() {
        t.keyboard.enabled &&
          (d(l).off('keydown', c), (t.keyboard.enabled = !1));
      }
      (t.keyboard = { enabled: !1 }),
        s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
        i('init', () => {
          t.params.keyboard.enabled && p();
        }),
        i('destroy', () => {
          t.keyboard.enabled && u();
        }),
        Object.assign(t.keyboard, { enable: p, disable: u });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      const n = r();
      let l;
      s({
        mousewheel: {
          enabled: !1,
          releaseOnEdges: !1,
          invert: !1,
          forceToAxis: !1,
          sensitivity: 1,
          eventsTarget: 'container',
          thresholdDelta: null,
          thresholdTime: null,
        },
      }),
        (t.mousewheel = { enabled: !1 });
      let o,
        c = u();
      const h = [];
      function m() {
        t.enabled && (t.mouseEntered = !0);
      }
      function f() {
        t.enabled && (t.mouseEntered = !1);
      }
      function g(e) {
        return (
          !(
            t.params.mousewheel.thresholdDelta &&
            e.delta < t.params.mousewheel.thresholdDelta
          ) &&
          !(
            t.params.mousewheel.thresholdTime &&
            u() - c < t.params.mousewheel.thresholdTime
          ) &&
          ((e.delta >= 6 && u() - c < 60) ||
            (e.direction < 0
              ? (t.isEnd && !t.params.loop) ||
                t.animating ||
                (t.slideNext(), i('scroll', e.raw))
              : (t.isBeginning && !t.params.loop) ||
                t.animating ||
                (t.slidePrev(), i('scroll', e.raw)),
            (c = new n.Date().getTime()),
            !1))
        );
      }
      function v(e) {
        let s = e,
          a = !0;
        if (!t.enabled) return;
        const r = t.params.mousewheel;
        t.params.cssMode && s.preventDefault();
        let n = t.$el;
        if (
          ('container' !== t.params.mousewheel.eventsTarget &&
            (n = d(t.params.mousewheel.eventsTarget)),
          !t.mouseEntered && !n[0].contains(s.target) && !r.releaseOnEdges)
        )
          return !0;
        s.originalEvent && (s = s.originalEvent);
        let c = 0;
        const m = t.rtlTranslate ? -1 : 1,
          f = (function (e) {
            let t = 0,
              s = 0,
              a = 0,
              i = 0;
            return (
              'detail' in e && (s = e.detail),
              'wheelDelta' in e && (s = -e.wheelDelta / 120),
              'wheelDeltaY' in e && (s = -e.wheelDeltaY / 120),
              'wheelDeltaX' in e && (t = -e.wheelDeltaX / 120),
              'axis' in e && e.axis === e.HORIZONTAL_AXIS && ((t = s), (s = 0)),
              (a = 10 * t),
              (i = 10 * s),
              'deltaY' in e && (i = e.deltaY),
              'deltaX' in e && (a = e.deltaX),
              e.shiftKey && !a && ((a = i), (i = 0)),
              (a || i) &&
                e.deltaMode &&
                (1 === e.deltaMode
                  ? ((a *= 40), (i *= 40))
                  : ((a *= 800), (i *= 800))),
              a && !t && (t = a < 1 ? -1 : 1),
              i && !s && (s = i < 1 ? -1 : 1),
              { spinX: t, spinY: s, pixelX: a, pixelY: i }
            );
          })(s);
        if (r.forceToAxis)
          if (t.isHorizontal()) {
            if (!(Math.abs(f.pixelX) > Math.abs(f.pixelY))) return !0;
            c = -f.pixelX * m;
          } else {
            if (!(Math.abs(f.pixelY) > Math.abs(f.pixelX))) return !0;
            c = -f.pixelY;
          }
        else
          c =
            Math.abs(f.pixelX) > Math.abs(f.pixelY) ? -f.pixelX * m : -f.pixelY;
        if (0 === c) return !0;
        r.invert && (c = -c);
        let v = t.getTranslate() + c * r.sensitivity;
        if (
          (v >= t.minTranslate() && (v = t.minTranslate()),
          v <= t.maxTranslate() && (v = t.maxTranslate()),
          (a =
            !!t.params.loop ||
            !(v === t.minTranslate() || v === t.maxTranslate())),
          a && t.params.nested && s.stopPropagation(),
          t.params.freeMode && t.params.freeMode.enabled)
        ) {
          const e = { time: u(), delta: Math.abs(c), direction: Math.sign(c) },
            a =
              o &&
              e.time < o.time + 500 &&
              e.delta <= o.delta &&
              e.direction === o.direction;
          if (!a) {
            (o = void 0), t.params.loop && t.loopFix();
            let n = t.getTranslate() + c * r.sensitivity;
            const d = t.isBeginning,
              u = t.isEnd;
            if (
              (n >= t.minTranslate() && (n = t.minTranslate()),
              n <= t.maxTranslate() && (n = t.maxTranslate()),
              t.setTransition(0),
              t.setTranslate(n),
              t.updateProgress(),
              t.updateActiveIndex(),
              t.updateSlidesClasses(),
              ((!d && t.isBeginning) || (!u && t.isEnd)) &&
                t.updateSlidesClasses(),
              t.params.freeMode.sticky)
            ) {
              clearTimeout(l), (l = void 0), h.length >= 15 && h.shift();
              const s = h.length ? h[h.length - 1] : void 0,
                a = h[0];
              if (
                (h.push(e),
                s && (e.delta > s.delta || e.direction !== s.direction))
              )
                h.splice(0);
              else if (
                h.length >= 15 &&
                e.time - a.time < 500 &&
                a.delta - e.delta >= 1 &&
                e.delta <= 6
              ) {
                const s = c > 0 ? 0.8 : 0.2;
                (o = e),
                  h.splice(0),
                  (l = p(() => {
                    t.slideToClosest(t.params.speed, !0, void 0, s);
                  }, 0));
              }
              l ||
                (l = p(() => {
                  (o = e),
                    h.splice(0),
                    t.slideToClosest(t.params.speed, !0, void 0, 0.5);
                }, 500));
            }
            if (
              (a || i('scroll', s),
              t.params.autoplay &&
                t.params.autoplayDisableOnInteraction &&
                t.autoplay.stop(),
              n === t.minTranslate() || n === t.maxTranslate())
            )
              return !0;
          }
        } else {
          const s = {
            time: u(),
            delta: Math.abs(c),
            direction: Math.sign(c),
            raw: e,
          };
          h.length >= 2 && h.shift();
          const a = h.length ? h[h.length - 1] : void 0;
          if (
            (h.push(s),
            a
              ? (s.direction !== a.direction ||
                  s.delta > a.delta ||
                  s.time > a.time + 150) &&
                g(s)
              : g(s),
            (function (e) {
              const s = t.params.mousewheel;
              if (e.direction < 0) {
                if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0;
              } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges)
                return !0;
              return !1;
            })(s))
          )
            return !0;
        }
        return s.preventDefault ? s.preventDefault() : (s.returnValue = !1), !1;
      }
      function w(e) {
        let s = t.$el;
        'container' !== t.params.mousewheel.eventsTarget &&
          (s = d(t.params.mousewheel.eventsTarget)),
          s[e]('mouseenter', m),
          s[e]('mouseleave', f),
          s[e]('wheel', v);
      }
      function b() {
        return t.params.cssMode
          ? (t.wrapperEl.removeEventListener('wheel', v), !0)
          : !t.mousewheel.enabled && (w('on'), (t.mousewheel.enabled = !0), !0);
      }
      function x() {
        return t.params.cssMode
          ? (t.wrapperEl.addEventListener(event, v), !0)
          : !!t.mousewheel.enabled &&
              (w('off'), (t.mousewheel.enabled = !1), !0);
      }
      a('init', () => {
        !t.params.mousewheel.enabled && t.params.cssMode && x(),
          t.params.mousewheel.enabled && b();
      }),
        a('destroy', () => {
          t.params.cssMode && b(), t.mousewheel.enabled && x();
        }),
        Object.assign(t.mousewheel, { enable: b, disable: x });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      function r(e) {
        let s;
        return (
          e &&
            ((s = d(e)),
            t.params.uniqueNavElements &&
              'string' == typeof e &&
              s.length > 1 &&
              1 === t.$el.find(e).length &&
              (s = t.$el.find(e))),
          s
        );
      }
      function n(e, s) {
        const a = t.params.navigation;
        e &&
          e.length > 0 &&
          (e[s ? 'addClass' : 'removeClass'](a.disabledClass),
          e[0] && 'BUTTON' === e[0].tagName && (e[0].disabled = s),
          t.params.watchOverflow &&
            t.enabled &&
            e[t.isLocked ? 'addClass' : 'removeClass'](a.lockClass));
      }
      function l() {
        if (t.params.loop) return;
        const { $nextEl: e, $prevEl: s } = t.navigation;
        n(s, t.isBeginning && !t.params.rewind),
          n(e, t.isEnd && !t.params.rewind);
      }
      function o(e) {
        e.preventDefault(),
          (!t.isBeginning || t.params.loop || t.params.rewind) &&
            (t.slidePrev(), i('navigationPrev'));
      }
      function c(e) {
        e.preventDefault(),
          (!t.isEnd || t.params.loop || t.params.rewind) &&
            (t.slideNext(), i('navigationNext'));
      }
      function p() {
        const e = t.params.navigation;
        if (
          ((t.params.navigation = F(
            t,
            t.originalParams.navigation,
            t.params.navigation,
            { nextEl: 'swiper-button-next', prevEl: 'swiper-button-prev' }
          )),
          !e.nextEl && !e.prevEl)
        )
          return;
        const s = r(e.nextEl),
          a = r(e.prevEl);
        s && s.length > 0 && s.on('click', c),
          a && a.length > 0 && a.on('click', o),
          Object.assign(t.navigation, {
            $nextEl: s,
            nextEl: s && s[0],
            $prevEl: a,
            prevEl: a && a[0],
          }),
          t.enabled ||
            (s && s.addClass(e.lockClass), a && a.addClass(e.lockClass));
      }
      function u() {
        const { $nextEl: e, $prevEl: s } = t.navigation;
        e &&
          e.length &&
          (e.off('click', c), e.removeClass(t.params.navigation.disabledClass)),
          s &&
            s.length &&
            (s.off('click', o),
            s.removeClass(t.params.navigation.disabledClass));
      }
      s({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: 'swiper-button-disabled',
          hiddenClass: 'swiper-button-hidden',
          lockClass: 'swiper-button-lock',
          navigationDisabledClass: 'swiper-navigation-disabled',
        },
      }),
        (t.navigation = {
          nextEl: null,
          $nextEl: null,
          prevEl: null,
          $prevEl: null,
        }),
        a('init', () => {
          !1 === t.params.navigation.enabled ? h() : (p(), l());
        }),
        a('toEdge fromEdge lock unlock', () => {
          l();
        }),
        a('destroy', () => {
          u();
        }),
        a('enable disable', () => {
          const { $nextEl: e, $prevEl: s } = t.navigation;
          e &&
            e[t.enabled ? 'removeClass' : 'addClass'](
              t.params.navigation.lockClass
            ),
            s &&
              s[t.enabled ? 'removeClass' : 'addClass'](
                t.params.navigation.lockClass
              );
        }),
        a('click', (e, s) => {
          const { $nextEl: a, $prevEl: r } = t.navigation,
            n = s.target;
          if (t.params.navigation.hideOnClick && !d(n).is(r) && !d(n).is(a)) {
            if (
              t.pagination &&
              t.params.pagination &&
              t.params.pagination.clickable &&
              (t.pagination.el === n || t.pagination.el.contains(n))
            )
              return;
            let e;
            a
              ? (e = a.hasClass(t.params.navigation.hiddenClass))
              : r && (e = r.hasClass(t.params.navigation.hiddenClass)),
              i(!0 === e ? 'navigationShow' : 'navigationHide'),
              a && a.toggleClass(t.params.navigation.hiddenClass),
              r && r.toggleClass(t.params.navigation.hiddenClass);
          }
        });
      const h = () => {
        t.$el.addClass(t.params.navigation.navigationDisabledClass), u();
      };
      Object.assign(t.navigation, {
        enable: () => {
          t.$el.removeClass(t.params.navigation.navigationDisabledClass),
            p(),
            l();
        },
        disable: h,
        update: l,
        init: p,
        destroy: u,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      const r = 'swiper-pagination';
      let n;
      s({
        pagination: {
          el: null,
          bulletElement: 'span',
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: 'bullets',
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${r}-bullet`,
          bulletActiveClass: `${r}-bullet-active`,
          modifierClass: `${r}-`,
          currentClass: `${r}-current`,
          totalClass: `${r}-total`,
          hiddenClass: `${r}-hidden`,
          progressbarFillClass: `${r}-progressbar-fill`,
          progressbarOppositeClass: `${r}-progressbar-opposite`,
          clickableClass: `${r}-clickable`,
          lockClass: `${r}-lock`,
          horizontalClass: `${r}-horizontal`,
          verticalClass: `${r}-vertical`,
          paginationDisabledClass: `${r}-disabled`,
        },
      }),
        (t.pagination = { el: null, $el: null, bullets: [] });
      let l = 0;
      function o() {
        return (
          !t.params.pagination.el ||
          !t.pagination.el ||
          !t.pagination.$el ||
          0 === t.pagination.$el.length
        );
      }
      function c(e, s) {
        const { bulletActiveClass: a } = t.params.pagination;
        e[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`);
      }
      function p() {
        const e = t.rtl,
          s = t.params.pagination;
        if (o()) return;
        const a =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          r = t.pagination.$el;
        let p;
        const u = t.params.loop
          ? Math.ceil((a - 2 * t.loopedSlides) / t.params.slidesPerGroup)
          : t.snapGrid.length;
        if (
          (t.params.loop
            ? ((p = Math.ceil(
                (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
              )),
              p > a - 1 - 2 * t.loopedSlides && (p -= a - 2 * t.loopedSlides),
              p > u - 1 && (p -= u),
              p < 0 && 'bullets' !== t.params.paginationType && (p = u + p))
            : (p = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
          'bullets' === s.type &&
            t.pagination.bullets &&
            t.pagination.bullets.length > 0)
        ) {
          const a = t.pagination.bullets;
          let i, o, u;
          if (
            (s.dynamicBullets &&
              ((n = a
                .eq(0)
                [t.isHorizontal() ? 'outerWidth' : 'outerHeight'](!0)),
              r.css(
                t.isHorizontal() ? 'width' : 'height',
                n * (s.dynamicMainBullets + 4) + 'px'
              ),
              s.dynamicMainBullets > 1 &&
                void 0 !== t.previousIndex &&
                ((l += p - (t.previousIndex - t.loopedSlides || 0)),
                l > s.dynamicMainBullets - 1
                  ? (l = s.dynamicMainBullets - 1)
                  : l < 0 && (l = 0)),
              (i = Math.max(p - l, 0)),
              (o = i + (Math.min(a.length, s.dynamicMainBullets) - 1)),
              (u = (o + i) / 2)),
            a.removeClass(
              ['', '-next', '-next-next', '-prev', '-prev-prev', '-main']
                .map((e) => `${s.bulletActiveClass}${e}`)
                .join(' ')
            ),
            r.length > 1)
          )
            a.each((e) => {
              const t = d(e),
                a = t.index();
              a === p && t.addClass(s.bulletActiveClass),
                s.dynamicBullets &&
                  (a >= i &&
                    a <= o &&
                    t.addClass(`${s.bulletActiveClass}-main`),
                  a === i && c(t, 'prev'),
                  a === o && c(t, 'next'));
            });
          else {
            const e = a.eq(p),
              r = e.index();
            if ((e.addClass(s.bulletActiveClass), s.dynamicBullets)) {
              const e = a.eq(i),
                n = a.eq(o);
              for (let e = i; e <= o; e += 1)
                a.eq(e).addClass(`${s.bulletActiveClass}-main`);
              if (t.params.loop)
                if (r >= a.length) {
                  for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                    a.eq(a.length - e).addClass(`${s.bulletActiveClass}-main`);
                  a.eq(a.length - s.dynamicMainBullets - 1).addClass(
                    `${s.bulletActiveClass}-prev`
                  );
                } else c(e, 'prev'), c(n, 'next');
              else c(e, 'prev'), c(n, 'next');
            }
          }
          if (s.dynamicBullets) {
            const i = Math.min(a.length, s.dynamicMainBullets + 4),
              r = (n * i - n) / 2 - u * n,
              l = e ? 'right' : 'left';
            a.css(t.isHorizontal() ? l : 'top', `${r}px`);
          }
        }
        if (
          ('fraction' === s.type &&
            (r.find(U(s.currentClass)).text(s.formatFractionCurrent(p + 1)),
            r.find(U(s.totalClass)).text(s.formatFractionTotal(u))),
          'progressbar' === s.type)
        ) {
          let e;
          e = s.progressbarOpposite
            ? t.isHorizontal()
              ? 'vertical'
              : 'horizontal'
            : t.isHorizontal()
            ? 'horizontal'
            : 'vertical';
          const a = (p + 1) / u;
          let i = 1,
            n = 1;
          'horizontal' === e ? (i = a) : (n = a),
            r
              .find(U(s.progressbarFillClass))
              .transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${n})`)
              .transition(t.params.speed);
        }
        'custom' === s.type && s.renderCustom
          ? (r.html(s.renderCustom(t, p + 1, u)), i('paginationRender', r[0]))
          : i('paginationUpdate', r[0]),
          t.params.watchOverflow &&
            t.enabled &&
            r[t.isLocked ? 'addClass' : 'removeClass'](s.lockClass);
      }
      function u() {
        const e = t.params.pagination;
        if (o()) return;
        const s =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          a = t.pagination.$el;
        let r = '';
        if ('bullets' === e.type) {
          let i = t.params.loop
            ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup)
            : t.snapGrid.length;
          t.params.freeMode &&
            t.params.freeMode.enabled &&
            !t.params.loop &&
            i > s &&
            (i = s);
          for (let s = 0; s < i; s += 1)
            e.renderBullet
              ? (r += e.renderBullet.call(t, s, e.bulletClass))
              : (r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
          a.html(r), (t.pagination.bullets = a.find(U(e.bulletClass)));
        }
        'fraction' === e.type &&
          ((r = e.renderFraction
            ? e.renderFraction.call(t, e.currentClass, e.totalClass)
            : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
          a.html(r)),
          'progressbar' === e.type &&
            ((r = e.renderProgressbar
              ? e.renderProgressbar.call(t, e.progressbarFillClass)
              : `<span class="${e.progressbarFillClass}"></span>`),
            a.html(r)),
          'custom' !== e.type && i('paginationRender', t.pagination.$el[0]);
      }
      function h() {
        t.params.pagination = F(
          t,
          t.originalParams.pagination,
          t.params.pagination,
          { el: 'swiper-pagination' }
        );
        const e = t.params.pagination;
        if (!e.el) return;
        let s = d(e.el);
        0 !== s.length &&
          (t.params.uniqueNavElements &&
            'string' == typeof e.el &&
            s.length > 1 &&
            ((s = t.$el.find(e.el)),
            s.length > 1 &&
              (s = s.filter((e) => d(e).parents('.swiper')[0] === t.el))),
          'bullets' === e.type && e.clickable && s.addClass(e.clickableClass),
          s.addClass(e.modifierClass + e.type),
          s.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          'bullets' === e.type &&
            e.dynamicBullets &&
            (s.addClass(`${e.modifierClass}${e.type}-dynamic`),
            (l = 0),
            e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
          'progressbar' === e.type &&
            e.progressbarOpposite &&
            s.addClass(e.progressbarOppositeClass),
          e.clickable &&
            s.on('click', U(e.bulletClass), function (e) {
              e.preventDefault();
              let s = d(this).index() * t.params.slidesPerGroup;
              t.params.loop && (s += t.loopedSlides), t.slideTo(s);
            }),
          Object.assign(t.pagination, { $el: s, el: s[0] }),
          t.enabled || s.addClass(e.lockClass));
      }
      function m() {
        const e = t.params.pagination;
        if (o()) return;
        const s = t.pagination.$el;
        s.removeClass(e.hiddenClass),
          s.removeClass(e.modifierClass + e.type),
          s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          t.pagination.bullets &&
            t.pagination.bullets.removeClass &&
            t.pagination.bullets.removeClass(e.bulletActiveClass),
          e.clickable && s.off('click', U(e.bulletClass));
      }
      a('init', () => {
        !1 === t.params.pagination.enabled ? f() : (h(), u(), p());
      }),
        a('activeIndexChange', () => {
          (t.params.loop || void 0 === t.snapIndex) && p();
        }),
        a('snapIndexChange', () => {
          t.params.loop || p();
        }),
        a('slidesLengthChange', () => {
          t.params.loop && (u(), p());
        }),
        a('snapGridLengthChange', () => {
          t.params.loop || (u(), p());
        }),
        a('destroy', () => {
          m();
        }),
        a('enable disable', () => {
          const { $el: e } = t.pagination;
          e &&
            e[t.enabled ? 'removeClass' : 'addClass'](
              t.params.pagination.lockClass
            );
        }),
        a('lock unlock', () => {
          p();
        }),
        a('click', (e, s) => {
          const a = s.target,
            { $el: r } = t.pagination;
          if (
            t.params.pagination.el &&
            t.params.pagination.hideOnClick &&
            r &&
            r.length > 0 &&
            !d(a).hasClass(t.params.pagination.bulletClass)
          ) {
            if (
              t.navigation &&
              ((t.navigation.nextEl && a === t.navigation.nextEl) ||
                (t.navigation.prevEl && a === t.navigation.prevEl))
            )
              return;
            const e = r.hasClass(t.params.pagination.hiddenClass);
            i(!0 === e ? 'paginationShow' : 'paginationHide'),
              r.toggleClass(t.params.pagination.hiddenClass);
          }
        });
      const f = () => {
        t.$el.addClass(t.params.pagination.paginationDisabledClass),
          t.pagination.$el &&
            t.pagination.$el.addClass(
              t.params.pagination.paginationDisabledClass
            ),
          m();
      };
      Object.assign(t.pagination, {
        enable: () => {
          t.$el.removeClass(t.params.pagination.paginationDisabledClass),
            t.pagination.$el &&
              t.pagination.$el.removeClass(
                t.params.pagination.paginationDisabledClass
              ),
            h(),
            u(),
            p();
        },
        disable: f,
        render: u,
        update: p,
        init: h,
        destroy: m,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: r } = e;
      const n = a();
      let l,
        o,
        c,
        u,
        h = !1,
        m = null,
        f = null;
      function g() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) return;
        const { scrollbar: e, rtlTranslate: s, progress: a } = t,
          { $dragEl: i, $el: r } = e,
          n = t.params.scrollbar;
        let l = o,
          d = (c - o) * a;
        s
          ? ((d = -d),
            d > 0 ? ((l = o - d), (d = 0)) : -d + o > c && (l = c + d))
          : d < 0
          ? ((l = o + d), (d = 0))
          : d + o > c && (l = c - d),
          t.isHorizontal()
            ? (i.transform(`translate3d(${d}px, 0, 0)`),
              (i[0].style.width = `${l}px`))
            : (i.transform(`translate3d(0px, ${d}px, 0)`),
              (i[0].style.height = `${l}px`)),
          n.hide &&
            (clearTimeout(m),
            (r[0].style.opacity = 1),
            (m = setTimeout(() => {
              (r[0].style.opacity = 0), r.transition(400);
            }, 1e3)));
      }
      function v() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) return;
        const { scrollbar: e } = t,
          { $dragEl: s, $el: a } = e;
        (s[0].style.width = ''),
          (s[0].style.height = ''),
          (c = t.isHorizontal() ? a[0].offsetWidth : a[0].offsetHeight),
          (u =
            t.size /
            (t.virtualSize +
              t.params.slidesOffsetBefore -
              (t.params.centeredSlides ? t.snapGrid[0] : 0))),
          (o =
            'auto' === t.params.scrollbar.dragSize
              ? c * u
              : parseInt(t.params.scrollbar.dragSize, 10)),
          t.isHorizontal()
            ? (s[0].style.width = `${o}px`)
            : (s[0].style.height = `${o}px`),
          (a[0].style.display = u >= 1 ? 'none' : ''),
          t.params.scrollbar.hide && (a[0].style.opacity = 0),
          t.params.watchOverflow &&
            t.enabled &&
            e.$el[t.isLocked ? 'addClass' : 'removeClass'](
              t.params.scrollbar.lockClass
            );
      }
      function w(e) {
        return t.isHorizontal()
          ? 'touchstart' === e.type || 'touchmove' === e.type
            ? e.targetTouches[0].clientX
            : e.clientX
          : 'touchstart' === e.type || 'touchmove' === e.type
          ? e.targetTouches[0].clientY
          : e.clientY;
      }
      function b(e) {
        const { scrollbar: s, rtlTranslate: a } = t,
          { $el: i } = s;
        let r;
        (r =
          (w(e) -
            i.offset()[t.isHorizontal() ? 'left' : 'top'] -
            (null !== l ? l : o / 2)) /
          (c - o)),
          (r = Math.max(Math.min(r, 1), 0)),
          a && (r = 1 - r);
        const n = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
        t.updateProgress(n),
          t.setTranslate(n),
          t.updateActiveIndex(),
          t.updateSlidesClasses();
      }
      function x(e) {
        const s = t.params.scrollbar,
          { scrollbar: a, $wrapperEl: i } = t,
          { $el: n, $dragEl: o } = a;
        (h = !0),
          (l =
            e.target === o[0] || e.target === o
              ? w(e) -
                e.target.getBoundingClientRect()[
                  t.isHorizontal() ? 'left' : 'top'
                ]
              : null),
          e.preventDefault(),
          e.stopPropagation(),
          i.transition(100),
          o.transition(100),
          b(e),
          clearTimeout(f),
          n.transition(0),
          s.hide && n.css('opacity', 1),
          t.params.cssMode && t.$wrapperEl.css('scroll-snap-type', 'none'),
          r('scrollbarDragStart', e);
      }
      function y(e) {
        const { scrollbar: s, $wrapperEl: a } = t,
          { $el: i, $dragEl: n } = s;
        h &&
          (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
          b(e),
          a.transition(0),
          i.transition(0),
          n.transition(0),
          r('scrollbarDragMove', e));
      }
      function E(e) {
        const s = t.params.scrollbar,
          { scrollbar: a, $wrapperEl: i } = t,
          { $el: n } = a;
        h &&
          ((h = !1),
          t.params.cssMode &&
            (t.$wrapperEl.css('scroll-snap-type', ''), i.transition('')),
          s.hide &&
            (clearTimeout(f),
            (f = p(() => {
              n.css('opacity', 0), n.transition(400);
            }, 1e3))),
          r('scrollbarDragEnd', e),
          s.snapOnRelease && t.slideToClosest());
      }
      function C(e) {
        const {
            scrollbar: s,
            touchEventsTouch: a,
            touchEventsDesktop: i,
            params: r,
            support: l,
          } = t,
          o = s.$el;
        if (!o) return;
        const d = o[0],
          c = !(!l.passiveListener || !r.passiveListeners) && {
            passive: !1,
            capture: !1,
          },
          p = !(!l.passiveListener || !r.passiveListeners) && {
            passive: !0,
            capture: !1,
          };
        if (!d) return;
        const u = 'on' === e ? 'addEventListener' : 'removeEventListener';
        l.touch
          ? (d[u](a.start, x, c), d[u](a.move, y, c), d[u](a.end, E, p))
          : (d[u](i.start, x, c), n[u](i.move, y, c), n[u](i.end, E, p));
      }
      function T() {
        const { scrollbar: e, $el: s } = t;
        t.params.scrollbar = F(
          t,
          t.originalParams.scrollbar,
          t.params.scrollbar,
          { el: 'swiper-scrollbar' }
        );
        const a = t.params.scrollbar;
        if (!a.el) return;
        let i = d(a.el);
        t.params.uniqueNavElements &&
          'string' == typeof a.el &&
          i.length > 1 &&
          1 === s.find(a.el).length &&
          (i = s.find(a.el)),
          i.addClass(t.isHorizontal() ? a.horizontalClass : a.verticalClass);
        let r = i.find(`.${t.params.scrollbar.dragClass}`);
        0 === r.length &&
          ((r = d(`<div class="${t.params.scrollbar.dragClass}"></div>`)),
          i.append(r)),
          Object.assign(e, { $el: i, el: i[0], $dragEl: r, dragEl: r[0] }),
          a.draggable && t.params.scrollbar.el && t.scrollbar.el && C('on'),
          i &&
            i[t.enabled ? 'removeClass' : 'addClass'](
              t.params.scrollbar.lockClass
            );
      }
      function $() {
        const e = t.params.scrollbar,
          s = t.scrollbar.$el;
        s &&
          s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          t.params.scrollbar.el && t.scrollbar.el && C('off');
      }
      s({
        scrollbar: {
          el: null,
          dragSize: 'auto',
          hide: !1,
          draggable: !1,
          snapOnRelease: !0,
          lockClass: 'swiper-scrollbar-lock',
          dragClass: 'swiper-scrollbar-drag',
          scrollbarDisabledClass: 'swiper-scrollbar-disabled',
          horizontalClass: 'swiper-scrollbar-horizontal',
          verticalClass: 'swiper-scrollbar-vertical',
        },
      }),
        (t.scrollbar = { el: null, dragEl: null, $el: null, $dragEl: null }),
        i('init', () => {
          !1 === t.params.scrollbar.enabled ? S() : (T(), v(), g());
        }),
        i('update resize observerUpdate lock unlock', () => {
          v();
        }),
        i('setTranslate', () => {
          g();
        }),
        i('setTransition', (e, s) => {
          !(function (e) {
            t.params.scrollbar.el &&
              t.scrollbar.el &&
              t.scrollbar.$dragEl.transition(e);
          })(s);
        }),
        i('enable disable', () => {
          const { $el: e } = t.scrollbar;
          e &&
            e[t.enabled ? 'removeClass' : 'addClass'](
              t.params.scrollbar.lockClass
            );
        }),
        i('destroy', () => {
          $();
        });
      const S = () => {
        t.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),
          t.scrollbar.$el &&
            t.scrollbar.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),
          $();
      };
      Object.assign(t.scrollbar, {
        enable: () => {
          t.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass),
            t.scrollbar.$el &&
              t.scrollbar.$el.removeClass(
                t.params.scrollbar.scrollbarDisabledClass
              ),
            T(),
            v(),
            g();
        },
        disable: S,
        updateSize: v,
        setTranslate: g,
        init: T,
        destroy: $,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({ parallax: { enabled: !1 } });
      const i = (e, s) => {
          const { rtl: a } = t,
            i = d(e),
            r = a ? -1 : 1,
            n = i.attr('data-swiper-parallax') || '0';
          let l = i.attr('data-swiper-parallax-x'),
            o = i.attr('data-swiper-parallax-y');
          const c = i.attr('data-swiper-parallax-scale'),
            p = i.attr('data-swiper-parallax-opacity');
          if (
            (l || o
              ? ((l = l || '0'), (o = o || '0'))
              : t.isHorizontal()
              ? ((l = n), (o = '0'))
              : ((o = n), (l = '0')),
            (l =
              l.indexOf('%') >= 0
                ? parseInt(l, 10) * s * r + '%'
                : l * s * r + 'px'),
            (o =
              o.indexOf('%') >= 0 ? parseInt(o, 10) * s + '%' : o * s + 'px'),
            null != p)
          ) {
            const e = p - (p - 1) * (1 - Math.abs(s));
            i[0].style.opacity = e;
          }
          if (null == c) i.transform(`translate3d(${l}, ${o}, 0px)`);
          else {
            const e = c - (c - 1) * (1 - Math.abs(s));
            i.transform(`translate3d(${l}, ${o}, 0px) scale(${e})`);
          }
        },
        r = () => {
          const { $el: e, slides: s, progress: a, snapGrid: r } = t;
          e
            .children(
              '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]'
            )
            .each((e) => {
              i(e, a);
            }),
            s.each((e, s) => {
              let n = e.progress;
              t.params.slidesPerGroup > 1 &&
                'auto' !== t.params.slidesPerView &&
                (n += Math.ceil(s / 2) - a * (r.length - 1)),
                (n = Math.min(Math.max(n, -1), 1)),
                d(e)
                  .find(
                    '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]'
                  )
                  .each((e) => {
                    i(e, n);
                  });
            });
        };
      a('beforeInit', () => {
        t.params.parallax.enabled &&
          ((t.params.watchSlidesProgress = !0),
          (t.originalParams.watchSlidesProgress = !0));
      }),
        a('init', () => {
          t.params.parallax.enabled && r();
        }),
        a('setTranslate', () => {
          t.params.parallax.enabled && r();
        }),
        a('setTransition', (e, s) => {
          t.params.parallax.enabled &&
            (function (e) {
              void 0 === e && (e = t.params.speed);
              const { $el: s } = t;
              s.find(
                '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]'
              ).each((t) => {
                const s = d(t);
                let a =
                  parseInt(s.attr('data-swiper-parallax-duration'), 10) || e;
                0 === e && (a = 0), s.transition(a);
              });
            })(s);
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      const n = r();
      s({
        zoom: {
          enabled: !1,
          maxRatio: 3,
          minRatio: 1,
          toggle: !0,
          containerClass: 'swiper-zoom-container',
          zoomedSlideClass: 'swiper-slide-zoomed',
        },
      }),
        (t.zoom = { enabled: !1 });
      let l,
        o,
        c,
        p = 1,
        u = !1;
      const m = {
          $slideEl: void 0,
          slideWidth: void 0,
          slideHeight: void 0,
          $imageEl: void 0,
          $imageWrapEl: void 0,
          maxRatio: 3,
        },
        f = {
          isTouched: void 0,
          isMoved: void 0,
          currentX: void 0,
          currentY: void 0,
          minX: void 0,
          minY: void 0,
          maxX: void 0,
          maxY: void 0,
          width: void 0,
          height: void 0,
          startX: void 0,
          startY: void 0,
          touchesStart: {},
          touchesCurrent: {},
        },
        g = {
          x: void 0,
          y: void 0,
          prevPositionX: void 0,
          prevPositionY: void 0,
          prevTime: void 0,
        };
      let v = 1;
      function w(e) {
        if (e.targetTouches.length < 2) return 1;
        const t = e.targetTouches[0].pageX,
          s = e.targetTouches[0].pageY,
          a = e.targetTouches[1].pageX,
          i = e.targetTouches[1].pageY;
        return Math.sqrt((a - t) ** 2 + (i - s) ** 2);
      }
      function b(e) {
        const s = t.support,
          a = t.params.zoom;
        if (((o = !1), (c = !1), !s.gestures)) {
          if (
            'touchstart' !== e.type ||
            ('touchstart' === e.type && e.targetTouches.length < 2)
          )
            return;
          (o = !0), (m.scaleStart = w(e));
        }
        (m.$slideEl && m.$slideEl.length) ||
        ((m.$slideEl = d(e.target).closest(`.${t.params.slideClass}`)),
        0 === m.$slideEl.length && (m.$slideEl = t.slides.eq(t.activeIndex)),
        (m.$imageEl = m.$slideEl
          .find(`.${a.containerClass}`)
          .eq(0)
          .find('picture, img, svg, canvas, .swiper-zoom-target')
          .eq(0)),
        (m.$imageWrapEl = m.$imageEl.parent(`.${a.containerClass}`)),
        (m.maxRatio = m.$imageWrapEl.attr('data-swiper-zoom') || a.maxRatio),
        0 !== m.$imageWrapEl.length)
          ? (m.$imageEl && m.$imageEl.transition(0), (u = !0))
          : (m.$imageEl = void 0);
      }
      function x(e) {
        const s = t.support,
          a = t.params.zoom,
          i = t.zoom;
        if (!s.gestures) {
          if (
            'touchmove' !== e.type ||
            ('touchmove' === e.type && e.targetTouches.length < 2)
          )
            return;
          (c = !0), (m.scaleMove = w(e));
        }
        m.$imageEl && 0 !== m.$imageEl.length
          ? (s.gestures
              ? (i.scale = e.scale * p)
              : (i.scale = (m.scaleMove / m.scaleStart) * p),
            i.scale > m.maxRatio &&
              (i.scale = m.maxRatio - 1 + (i.scale - m.maxRatio + 1) ** 0.5),
            i.scale < a.minRatio &&
              (i.scale = a.minRatio + 1 - (a.minRatio - i.scale + 1) ** 0.5),
            m.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`))
          : 'gesturechange' === e.type && b(e);
      }
      function y(e) {
        const s = t.device,
          a = t.support,
          i = t.params.zoom,
          r = t.zoom;
        if (!a.gestures) {
          if (!o || !c) return;
          if (
            'touchend' !== e.type ||
            ('touchend' === e.type && e.changedTouches.length < 2 && !s.android)
          )
            return;
          (o = !1), (c = !1);
        }
        m.$imageEl &&
          0 !== m.$imageEl.length &&
          ((r.scale = Math.max(Math.min(r.scale, m.maxRatio), i.minRatio)),
          m.$imageEl
            .transition(t.params.speed)
            .transform(`translate3d(0,0,0) scale(${r.scale})`),
          (p = r.scale),
          (u = !1),
          1 === r.scale && (m.$slideEl = void 0));
      }
      function E(e) {
        const s = t.zoom;
        if (!m.$imageEl || 0 === m.$imageEl.length) return;
        if (((t.allowClick = !1), !f.isTouched || !m.$slideEl)) return;
        f.isMoved ||
          ((f.width = m.$imageEl[0].offsetWidth),
          (f.height = m.$imageEl[0].offsetHeight),
          (f.startX = h(m.$imageWrapEl[0], 'x') || 0),
          (f.startY = h(m.$imageWrapEl[0], 'y') || 0),
          (m.slideWidth = m.$slideEl[0].offsetWidth),
          (m.slideHeight = m.$slideEl[0].offsetHeight),
          m.$imageWrapEl.transition(0));
        const a = f.width * s.scale,
          i = f.height * s.scale;
        if (!(a < m.slideWidth && i < m.slideHeight)) {
          if (
            ((f.minX = Math.min(m.slideWidth / 2 - a / 2, 0)),
            (f.maxX = -f.minX),
            (f.minY = Math.min(m.slideHeight / 2 - i / 2, 0)),
            (f.maxY = -f.minY),
            (f.touchesCurrent.x =
              'touchmove' === e.type ? e.targetTouches[0].pageX : e.pageX),
            (f.touchesCurrent.y =
              'touchmove' === e.type ? e.targetTouches[0].pageY : e.pageY),
            !f.isMoved && !u)
          ) {
            if (
              t.isHorizontal() &&
              ((Math.floor(f.minX) === Math.floor(f.startX) &&
                f.touchesCurrent.x < f.touchesStart.x) ||
                (Math.floor(f.maxX) === Math.floor(f.startX) &&
                  f.touchesCurrent.x > f.touchesStart.x))
            )
              return void (f.isTouched = !1);
            if (
              !t.isHorizontal() &&
              ((Math.floor(f.minY) === Math.floor(f.startY) &&
                f.touchesCurrent.y < f.touchesStart.y) ||
                (Math.floor(f.maxY) === Math.floor(f.startY) &&
                  f.touchesCurrent.y > f.touchesStart.y))
            )
              return void (f.isTouched = !1);
          }
          e.cancelable && e.preventDefault(),
            e.stopPropagation(),
            (f.isMoved = !0),
            (f.currentX = f.touchesCurrent.x - f.touchesStart.x + f.startX),
            (f.currentY = f.touchesCurrent.y - f.touchesStart.y + f.startY),
            f.currentX < f.minX &&
              (f.currentX = f.minX + 1 - (f.minX - f.currentX + 1) ** 0.8),
            f.currentX > f.maxX &&
              (f.currentX = f.maxX - 1 + (f.currentX - f.maxX + 1) ** 0.8),
            f.currentY < f.minY &&
              (f.currentY = f.minY + 1 - (f.minY - f.currentY + 1) ** 0.8),
            f.currentY > f.maxY &&
              (f.currentY = f.maxY - 1 + (f.currentY - f.maxY + 1) ** 0.8),
            g.prevPositionX || (g.prevPositionX = f.touchesCurrent.x),
            g.prevPositionY || (g.prevPositionY = f.touchesCurrent.y),
            g.prevTime || (g.prevTime = Date.now()),
            (g.x =
              (f.touchesCurrent.x - g.prevPositionX) /
              (Date.now() - g.prevTime) /
              2),
            (g.y =
              (f.touchesCurrent.y - g.prevPositionY) /
              (Date.now() - g.prevTime) /
              2),
            Math.abs(f.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0),
            Math.abs(f.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0),
            (g.prevPositionX = f.touchesCurrent.x),
            (g.prevPositionY = f.touchesCurrent.y),
            (g.prevTime = Date.now()),
            m.$imageWrapEl.transform(
              `translate3d(${f.currentX}px, ${f.currentY}px,0)`
            );
        }
      }
      function C() {
        const e = t.zoom;
        m.$slideEl &&
          t.previousIndex !== t.activeIndex &&
          (m.$imageEl && m.$imageEl.transform('translate3d(0,0,0) scale(1)'),
          m.$imageWrapEl && m.$imageWrapEl.transform('translate3d(0,0,0)'),
          (e.scale = 1),
          (p = 1),
          (m.$slideEl = void 0),
          (m.$imageEl = void 0),
          (m.$imageWrapEl = void 0));
      }
      function T(e) {
        const s = t.zoom,
          a = t.params.zoom;
        if (
          (m.$slideEl ||
            (e &&
              e.target &&
              (m.$slideEl = d(e.target).closest(`.${t.params.slideClass}`)),
            m.$slideEl ||
              (t.params.virtual && t.params.virtual.enabled && t.virtual
                ? (m.$slideEl = t.$wrapperEl.children(
                    `.${t.params.slideActiveClass}`
                  ))
                : (m.$slideEl = t.slides.eq(t.activeIndex))),
            (m.$imageEl = m.$slideEl
              .find(`.${a.containerClass}`)
              .eq(0)
              .find('picture, img, svg, canvas, .swiper-zoom-target')
              .eq(0)),
            (m.$imageWrapEl = m.$imageEl.parent(`.${a.containerClass}`))),
          !m.$imageEl ||
            0 === m.$imageEl.length ||
            !m.$imageWrapEl ||
            0 === m.$imageWrapEl.length)
        )
          return;
        let i, r, l, o, c, u, h, g, v, w, b, x, y, E, C, T, $, S;
        t.params.cssMode &&
          ((t.wrapperEl.style.overflow = 'hidden'),
          (t.wrapperEl.style.touchAction = 'none')),
          m.$slideEl.addClass(`${a.zoomedSlideClass}`),
          void 0 === f.touchesStart.x && e
            ? ((i =
                'touchend' === e.type ? e.changedTouches[0].pageX : e.pageX),
              (r = 'touchend' === e.type ? e.changedTouches[0].pageY : e.pageY))
            : ((i = f.touchesStart.x), (r = f.touchesStart.y)),
          (s.scale = m.$imageWrapEl.attr('data-swiper-zoom') || a.maxRatio),
          (p = m.$imageWrapEl.attr('data-swiper-zoom') || a.maxRatio),
          e
            ? (($ = m.$slideEl[0].offsetWidth),
              (S = m.$slideEl[0].offsetHeight),
              (l = m.$slideEl.offset().left + n.scrollX),
              (o = m.$slideEl.offset().top + n.scrollY),
              (c = l + $ / 2 - i),
              (u = o + S / 2 - r),
              (v = m.$imageEl[0].offsetWidth),
              (w = m.$imageEl[0].offsetHeight),
              (b = v * s.scale),
              (x = w * s.scale),
              (y = Math.min($ / 2 - b / 2, 0)),
              (E = Math.min(S / 2 - x / 2, 0)),
              (C = -y),
              (T = -E),
              (h = c * s.scale),
              (g = u * s.scale),
              h < y && (h = y),
              h > C && (h = C),
              g < E && (g = E),
              g > T && (g = T))
            : ((h = 0), (g = 0)),
          m.$imageWrapEl
            .transition(300)
            .transform(`translate3d(${h}px, ${g}px,0)`),
          m.$imageEl
            .transition(300)
            .transform(`translate3d(0,0,0) scale(${s.scale})`);
      }
      function $() {
        const e = t.zoom,
          s = t.params.zoom;
        m.$slideEl ||
          (t.params.virtual && t.params.virtual.enabled && t.virtual
            ? (m.$slideEl = t.$wrapperEl.children(
                `.${t.params.slideActiveClass}`
              ))
            : (m.$slideEl = t.slides.eq(t.activeIndex)),
          (m.$imageEl = m.$slideEl
            .find(`.${s.containerClass}`)
            .eq(0)
            .find('picture, img, svg, canvas, .swiper-zoom-target')
            .eq(0)),
          (m.$imageWrapEl = m.$imageEl.parent(`.${s.containerClass}`))),
          m.$imageEl &&
            0 !== m.$imageEl.length &&
            m.$imageWrapEl &&
            0 !== m.$imageWrapEl.length &&
            (t.params.cssMode &&
              ((t.wrapperEl.style.overflow = ''),
              (t.wrapperEl.style.touchAction = '')),
            (e.scale = 1),
            (p = 1),
            m.$imageWrapEl.transition(300).transform('translate3d(0,0,0)'),
            m.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)'),
            m.$slideEl.removeClass(`${s.zoomedSlideClass}`),
            (m.$slideEl = void 0));
      }
      function S(e) {
        const s = t.zoom;
        s.scale && 1 !== s.scale ? $() : T(e);
      }
      function M() {
        const e = t.support;
        return {
          passiveListener: !(
            'touchstart' !== t.touchEvents.start ||
            !e.passiveListener ||
            !t.params.passiveListeners
          ) && { passive: !0, capture: !1 },
          activeListenerWithCapture: !e.passiveListener || {
            passive: !1,
            capture: !0,
          },
        };
      }
      function P() {
        return `.${t.params.slideClass}`;
      }
      function k(e) {
        const { passiveListener: s } = M(),
          a = P();
        t.$wrapperEl[e]('gesturestart', a, b, s),
          t.$wrapperEl[e]('gesturechange', a, x, s),
          t.$wrapperEl[e]('gestureend', a, y, s);
      }
      function z() {
        l || ((l = !0), k('on'));
      }
      function L() {
        l && ((l = !1), k('off'));
      }
      function O() {
        const e = t.zoom;
        if (e.enabled) return;
        e.enabled = !0;
        const s = t.support,
          { passiveListener: a, activeListenerWithCapture: i } = M(),
          r = P();
        s.gestures
          ? (t.$wrapperEl.on(t.touchEvents.start, z, a),
            t.$wrapperEl.on(t.touchEvents.end, L, a))
          : 'touchstart' === t.touchEvents.start &&
            (t.$wrapperEl.on(t.touchEvents.start, r, b, a),
            t.$wrapperEl.on(t.touchEvents.move, r, x, i),
            t.$wrapperEl.on(t.touchEvents.end, r, y, a),
            t.touchEvents.cancel &&
              t.$wrapperEl.on(t.touchEvents.cancel, r, y, a)),
          t.$wrapperEl.on(
            t.touchEvents.move,
            `.${t.params.zoom.containerClass}`,
            E,
            i
          );
      }
      function I() {
        const e = t.zoom;
        if (!e.enabled) return;
        const s = t.support;
        e.enabled = !1;
        const { passiveListener: a, activeListenerWithCapture: i } = M(),
          r = P();
        s.gestures
          ? (t.$wrapperEl.off(t.touchEvents.start, z, a),
            t.$wrapperEl.off(t.touchEvents.end, L, a))
          : 'touchstart' === t.touchEvents.start &&
            (t.$wrapperEl.off(t.touchEvents.start, r, b, a),
            t.$wrapperEl.off(t.touchEvents.move, r, x, i),
            t.$wrapperEl.off(t.touchEvents.end, r, y, a),
            t.touchEvents.cancel &&
              t.$wrapperEl.off(t.touchEvents.cancel, r, y, a)),
          t.$wrapperEl.off(
            t.touchEvents.move,
            `.${t.params.zoom.containerClass}`,
            E,
            i
          );
      }
      Object.defineProperty(t.zoom, 'scale', {
        get: () => v,
        set(e) {
          if (v !== e) {
            const t = m.$imageEl ? m.$imageEl[0] : void 0,
              s = m.$slideEl ? m.$slideEl[0] : void 0;
            i('zoomChange', e, t, s);
          }
          v = e;
        },
      }),
        a('init', () => {
          t.params.zoom.enabled && O();
        }),
        a('destroy', () => {
          I();
        }),
        a('touchStart', (e, s) => {
          t.zoom.enabled &&
            (function (e) {
              const s = t.device;
              m.$imageEl &&
                0 !== m.$imageEl.length &&
                (f.isTouched ||
                  (s.android && e.cancelable && e.preventDefault(),
                  (f.isTouched = !0),
                  (f.touchesStart.x =
                    'touchstart' === e.type
                      ? e.targetTouches[0].pageX
                      : e.pageX),
                  (f.touchesStart.y =
                    'touchstart' === e.type
                      ? e.targetTouches[0].pageY
                      : e.pageY)));
            })(s);
        }),
        a('touchEnd', (e, s) => {
          t.zoom.enabled &&
            (function () {
              const e = t.zoom;
              if (!m.$imageEl || 0 === m.$imageEl.length) return;
              if (!f.isTouched || !f.isMoved)
                return (f.isTouched = !1), void (f.isMoved = !1);
              (f.isTouched = !1), (f.isMoved = !1);
              let s = 300,
                a = 300;
              const i = g.x * s,
                r = f.currentX + i,
                n = g.y * a,
                l = f.currentY + n;
              0 !== g.x && (s = Math.abs((r - f.currentX) / g.x)),
                0 !== g.y && (a = Math.abs((l - f.currentY) / g.y));
              const o = Math.max(s, a);
              (f.currentX = r), (f.currentY = l);
              const d = f.width * e.scale,
                c = f.height * e.scale;
              (f.minX = Math.min(m.slideWidth / 2 - d / 2, 0)),
                (f.maxX = -f.minX),
                (f.minY = Math.min(m.slideHeight / 2 - c / 2, 0)),
                (f.maxY = -f.minY),
                (f.currentX = Math.max(Math.min(f.currentX, f.maxX), f.minX)),
                (f.currentY = Math.max(Math.min(f.currentY, f.maxY), f.minY)),
                m.$imageWrapEl
                  .transition(o)
                  .transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`);
            })();
        }),
        a('doubleTap', (e, s) => {
          !t.animating &&
            t.params.zoom.enabled &&
            t.zoom.enabled &&
            t.params.zoom.toggle &&
            S(s);
        }),
        a('transitionEnd', () => {
          t.zoom.enabled && t.params.zoom.enabled && C();
        }),
        a('slideChange', () => {
          t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && C();
        }),
        Object.assign(t.zoom, {
          enable: O,
          disable: I,
          in: T,
          out: $,
          toggle: S,
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      s({
        lazy: {
          checkInView: !1,
          enabled: !1,
          loadPrevNext: !1,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: !1,
          scrollingElement: '',
          elementClass: 'swiper-lazy',
          loadingClass: 'swiper-lazy-loading',
          loadedClass: 'swiper-lazy-loaded',
          preloaderClass: 'swiper-lazy-preloader',
        },
      }),
        (t.lazy = {});
      let n = !1,
        l = !1;
      function o(e, s) {
        void 0 === s && (s = !0);
        const a = t.params.lazy;
        if (void 0 === e) return;
        if (0 === t.slides.length) return;
        const r =
            t.virtual && t.params.virtual.enabled
              ? t.$wrapperEl.children(
                  `.${t.params.slideClass}[data-swiper-slide-index="${e}"]`
                )
              : t.slides.eq(e),
          n = r.find(
            `.${a.elementClass}:not(.${a.loadedClass}):not(.${a.loadingClass})`
          );
        !r.hasClass(a.elementClass) ||
          r.hasClass(a.loadedClass) ||
          r.hasClass(a.loadingClass) ||
          n.push(r[0]),
          0 !== n.length &&
            n.each((e) => {
              const n = d(e);
              n.addClass(a.loadingClass);
              const l = n.attr('data-background'),
                c = n.attr('data-src'),
                p = n.attr('data-srcset'),
                u = n.attr('data-sizes'),
                h = n.parent('picture');
              t.loadImage(n[0], c || l, p, u, !1, () => {
                if (null != t && t && (!t || t.params) && !t.destroyed) {
                  if (
                    (l
                      ? (n.css('background-image', `url("${l}")`),
                        n.removeAttr('data-background'))
                      : (p &&
                          (n.attr('srcset', p), n.removeAttr('data-srcset')),
                        u && (n.attr('sizes', u), n.removeAttr('data-sizes')),
                        h.length &&
                          h.children('source').each((e) => {
                            const t = d(e);
                            t.attr('data-srcset') &&
                              (t.attr('srcset', t.attr('data-srcset')),
                              t.removeAttr('data-srcset'));
                          }),
                        c && (n.attr('src', c), n.removeAttr('data-src'))),
                    n.addClass(a.loadedClass).removeClass(a.loadingClass),
                    r.find(`.${a.preloaderClass}`).remove(),
                    t.params.loop && s)
                  ) {
                    const e = r.attr('data-swiper-slide-index');
                    if (r.hasClass(t.params.slideDuplicateClass)) {
                      o(
                        t.$wrapperEl
                          .children(
                            `[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`
                          )
                          .index(),
                        !1
                      );
                    } else {
                      o(
                        t.$wrapperEl
                          .children(
                            `.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`
                          )
                          .index(),
                        !1
                      );
                    }
                  }
                  i('lazyImageReady', r[0], n[0]),
                    t.params.autoHeight && t.updateAutoHeight();
                }
              }),
                i('lazyImageLoad', r[0], n[0]);
            });
      }
      function c() {
        const { $wrapperEl: e, params: s, slides: a, activeIndex: i } = t,
          r = t.virtual && s.virtual.enabled,
          n = s.lazy;
        let c = s.slidesPerView;
        function p(t) {
          if (r) {
            if (
              e.children(`.${s.slideClass}[data-swiper-slide-index="${t}"]`)
                .length
            )
              return !0;
          } else if (a[t]) return !0;
          return !1;
        }
        function u(e) {
          return r ? d(e).attr('data-swiper-slide-index') : d(e).index();
        }
        if (
          ('auto' === c && (c = 0), l || (l = !0), t.params.watchSlidesProgress)
        )
          e.children(`.${s.slideVisibleClass}`).each((e) => {
            o(r ? d(e).attr('data-swiper-slide-index') : d(e).index());
          });
        else if (c > 1) for (let e = i; e < i + c; e += 1) p(e) && o(e);
        else o(i);
        if (n.loadPrevNext)
          if (c > 1 || (n.loadPrevNextAmount && n.loadPrevNextAmount > 1)) {
            const e = n.loadPrevNextAmount,
              t = Math.ceil(c),
              s = Math.min(i + t + Math.max(e, t), a.length),
              r = Math.max(i - Math.max(t, e), 0);
            for (let e = i + t; e < s; e += 1) p(e) && o(e);
            for (let e = r; e < i; e += 1) p(e) && o(e);
          } else {
            const t = e.children(`.${s.slideNextClass}`);
            t.length > 0 && o(u(t));
            const a = e.children(`.${s.slidePrevClass}`);
            a.length > 0 && o(u(a));
          }
      }
      function p() {
        const e = r();
        if (!t || t.destroyed) return;
        const s = t.params.lazy.scrollingElement
            ? d(t.params.lazy.scrollingElement)
            : d(e),
          a = s[0] === e,
          i = a ? e.innerWidth : s[0].offsetWidth,
          l = a ? e.innerHeight : s[0].offsetHeight,
          o = t.$el.offset(),
          { rtlTranslate: u } = t;
        let h = !1;
        u && (o.left -= t.$el[0].scrollLeft);
        const m = [
          [o.left, o.top],
          [o.left + t.width, o.top],
          [o.left, o.top + t.height],
          [o.left + t.width, o.top + t.height],
        ];
        for (let e = 0; e < m.length; e += 1) {
          const t = m[e];
          if (t[0] >= 0 && t[0] <= i && t[1] >= 0 && t[1] <= l) {
            if (0 === t[0] && 0 === t[1]) continue;
            h = !0;
          }
        }
        const f = !(
          'touchstart' !== t.touchEvents.start ||
          !t.support.passiveListener ||
          !t.params.passiveListeners
        ) && { passive: !0, capture: !1 };
        h
          ? (c(), s.off('scroll', p, f))
          : n || ((n = !0), s.on('scroll', p, f));
      }
      a('beforeInit', () => {
        t.params.lazy.enabled &&
          t.params.preloadImages &&
          (t.params.preloadImages = !1);
      }),
        a('init', () => {
          t.params.lazy.enabled && (t.params.lazy.checkInView ? p() : c());
        }),
        a('scroll', () => {
          t.params.freeMode &&
            t.params.freeMode.enabled &&
            !t.params.freeMode.sticky &&
            c();
        }),
        a('scrollbarDragMove resize _freeModeNoMomentumRelease', () => {
          t.params.lazy.enabled && (t.params.lazy.checkInView ? p() : c());
        }),
        a('transitionStart', () => {
          t.params.lazy.enabled &&
            (t.params.lazy.loadOnTransitionStart ||
              (!t.params.lazy.loadOnTransitionStart && !l)) &&
            (t.params.lazy.checkInView ? p() : c());
        }),
        a('transitionEnd', () => {
          t.params.lazy.enabled &&
            !t.params.lazy.loadOnTransitionStart &&
            (t.params.lazy.checkInView ? p() : c());
        }),
        a('slideChange', () => {
          const {
            lazy: e,
            cssMode: s,
            watchSlidesProgress: a,
            touchReleaseOnEdges: i,
            resistanceRatio: r,
          } = t.params;
          e.enabled && (s || (a && (i || 0 === r))) && c();
        }),
        a('destroy', () => {
          t.$el &&
            t.$el
              .find(`.${t.params.lazy.loadingClass}`)
              .removeClass(t.params.lazy.loadingClass);
        }),
        Object.assign(t.lazy, { load: c, loadInSlide: o });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      function i(e, t) {
        const s = (function () {
          let e, t, s;
          return (a, i) => {
            for (t = -1, e = a.length; e - t > 1; )
              (s = (e + t) >> 1), a[s] <= i ? (t = s) : (e = s);
            return e;
          };
        })();
        let a, i;
        return (
          (this.x = e),
          (this.y = t),
          (this.lastIndex = e.length - 1),
          (this.interpolate = function (e) {
            return e
              ? ((i = s(this.x, e)),
                (a = i - 1),
                ((e - this.x[a]) * (this.y[i] - this.y[a])) /
                  (this.x[i] - this.x[a]) +
                  this.y[a])
              : 0;
          }),
          this
        );
      }
      function r() {
        t.controller.control &&
          t.controller.spline &&
          ((t.controller.spline = void 0), delete t.controller.spline);
      }
      s({ controller: { control: void 0, inverse: !1, by: 'slide' } }),
        (t.controller = { control: void 0 }),
        a('beforeInit', () => {
          t.controller.control = t.params.controller.control;
        }),
        a('update', () => {
          r();
        }),
        a('resize', () => {
          r();
        }),
        a('observerUpdate', () => {
          r();
        }),
        a('setTranslate', (e, s, a) => {
          t.controller.control && t.controller.setTranslate(s, a);
        }),
        a('setTransition', (e, s, a) => {
          t.controller.control && t.controller.setTransition(s, a);
        }),
        Object.assign(t.controller, {
          setTranslate: function (e, s) {
            const a = t.controller.control;
            let r, n;
            const l = t.constructor;
            function o(e) {
              const s = t.rtlTranslate ? -t.translate : t.translate;
              'slide' === t.params.controller.by &&
                (!(function (e) {
                  t.controller.spline ||
                    (t.controller.spline = t.params.loop
                      ? new i(t.slidesGrid, e.slidesGrid)
                      : new i(t.snapGrid, e.snapGrid));
                })(e),
                (n = -t.controller.spline.interpolate(-s))),
                (n && 'container' !== t.params.controller.by) ||
                  ((r =
                    (e.maxTranslate() - e.minTranslate()) /
                    (t.maxTranslate() - t.minTranslate())),
                  (n = (s - t.minTranslate()) * r + e.minTranslate())),
                t.params.controller.inverse && (n = e.maxTranslate() - n),
                e.updateProgress(n),
                e.setTranslate(n, t),
                e.updateActiveIndex(),
                e.updateSlidesClasses();
            }
            if (Array.isArray(a))
              for (let e = 0; e < a.length; e += 1)
                a[e] !== s && a[e] instanceof l && o(a[e]);
            else a instanceof l && s !== a && o(a);
          },
          setTransition: function (e, s) {
            const a = t.constructor,
              i = t.controller.control;
            let r;
            function n(s) {
              s.setTransition(e, t),
                0 !== e &&
                  (s.transitionStart(),
                  s.params.autoHeight &&
                    p(() => {
                      s.updateAutoHeight();
                    }),
                  s.$wrapperEl.transitionEnd(() => {
                    i &&
                      (s.params.loop &&
                        'slide' === t.params.controller.by &&
                        s.loopFix(),
                      s.transitionEnd());
                  }));
            }
            if (Array.isArray(i))
              for (r = 0; r < i.length; r += 1)
                i[r] !== s && i[r] instanceof a && n(i[r]);
            else i instanceof a && s !== i && n(i);
          },
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        a11y: {
          enabled: !0,
          notificationClass: 'swiper-notification',
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          firstSlideMessage: 'This is the first slide',
          lastSlideMessage: 'This is the last slide',
          paginationBulletMessage: 'Go to slide {{index}}',
          slideLabelMessage: '{{index}} / {{slidesLength}}',
          containerMessage: null,
          containerRoleDescriptionMessage: null,
          itemRoleDescriptionMessage: null,
          slideRole: 'group',
          id: null,
        },
      }),
        (t.a11y = { clicked: !1 });
      let i = null;
      function r(e) {
        const t = i;
        0 !== t.length && (t.html(''), t.html(e));
      }
      function n(e) {
        e.attr('tabIndex', '0');
      }
      function l(e) {
        e.attr('tabIndex', '-1');
      }
      function o(e, t) {
        e.attr('role', t);
      }
      function c(e, t) {
        e.attr('aria-roledescription', t);
      }
      function p(e, t) {
        e.attr('aria-label', t);
      }
      function u(e) {
        e.attr('aria-disabled', !0);
      }
      function h(e) {
        e.attr('aria-disabled', !1);
      }
      function m(e) {
        if (13 !== e.keyCode && 32 !== e.keyCode) return;
        const s = t.params.a11y,
          a = d(e.target);
        t.navigation &&
          t.navigation.$nextEl &&
          a.is(t.navigation.$nextEl) &&
          ((t.isEnd && !t.params.loop) || t.slideNext(),
          t.isEnd ? r(s.lastSlideMessage) : r(s.nextSlideMessage)),
          t.navigation &&
            t.navigation.$prevEl &&
            a.is(t.navigation.$prevEl) &&
            ((t.isBeginning && !t.params.loop) || t.slidePrev(),
            t.isBeginning ? r(s.firstSlideMessage) : r(s.prevSlideMessage)),
          t.pagination &&
            a.is(U(t.params.pagination.bulletClass)) &&
            a[0].click();
      }
      function f() {
        return (
          t.pagination && t.pagination.bullets && t.pagination.bullets.length
        );
      }
      function g() {
        return f() && t.params.pagination.clickable;
      }
      const v = (e, t, s) => {
          n(e),
            'BUTTON' !== e[0].tagName && (o(e, 'button'), e.on('keydown', m)),
            p(e, s),
            (function (e, t) {
              e.attr('aria-controls', t);
            })(e, t);
        },
        w = () => {
          t.a11y.clicked = !0;
        },
        b = () => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              t.destroyed || (t.a11y.clicked = !1);
            });
          });
        },
        x = (e) => {
          if (t.a11y.clicked) return;
          const s = e.target.closest(`.${t.params.slideClass}`);
          if (!s || !t.slides.includes(s)) return;
          const a = t.slides.indexOf(s) === t.activeIndex,
            i =
              t.params.watchSlidesProgress &&
              t.visibleSlides &&
              t.visibleSlides.includes(s);
          a ||
            i ||
            (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) ||
            (t.isHorizontal() ? (t.el.scrollLeft = 0) : (t.el.scrollTop = 0),
            t.slideTo(t.slides.indexOf(s), 0));
        },
        y = () => {
          const e = t.params.a11y;
          e.itemRoleDescriptionMessage &&
            c(d(t.slides), e.itemRoleDescriptionMessage),
            e.slideRole && o(d(t.slides), e.slideRole);
          const s = t.params.loop
            ? t.slides.filter(
                (e) => !e.classList.contains(t.params.slideDuplicateClass)
              ).length
            : t.slides.length;
          e.slideLabelMessage &&
            t.slides.each((a, i) => {
              const r = d(a),
                n = t.params.loop
                  ? parseInt(r.attr('data-swiper-slide-index'), 10)
                  : i;
              p(
                r,
                e.slideLabelMessage
                  .replace(/\{\{index\}\}/, n + 1)
                  .replace(/\{\{slidesLength\}\}/, s)
              );
            });
        },
        E = () => {
          const e = t.params.a11y;
          t.$el.append(i);
          const s = t.$el;
          e.containerRoleDescriptionMessage &&
            c(s, e.containerRoleDescriptionMessage),
            e.containerMessage && p(s, e.containerMessage);
          const a = t.$wrapperEl,
            r =
              e.id ||
              a.attr('id') ||
              `swiper-wrapper-${
                ((n = 16),
                void 0 === n && (n = 16),
                'x'
                  .repeat(n)
                  .replace(/x/g, () =>
                    Math.round(16 * Math.random()).toString(16)
                  ))
              }`;
          var n;
          const l =
            t.params.autoplay && t.params.autoplay.enabled ? 'off' : 'polite';
          var o;
          let d, u;
          (o = r),
            a.attr('id', o),
            (function (e, t) {
              e.attr('aria-live', t);
            })(a, l),
            y(),
            t.navigation && t.navigation.$nextEl && (d = t.navigation.$nextEl),
            t.navigation && t.navigation.$prevEl && (u = t.navigation.$prevEl),
            d && d.length && v(d, r, e.nextSlideMessage),
            u && u.length && v(u, r, e.prevSlideMessage),
            g() &&
              t.pagination.$el.on(
                'keydown',
                U(t.params.pagination.bulletClass),
                m
              ),
            t.$el.on('focus', x, !0),
            t.$el.on('pointerdown', w, !0),
            t.$el.on('pointerup', b, !0);
        };
      a('beforeInit', () => {
        i = d(
          `<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`
        );
      }),
        a('afterInit', () => {
          t.params.a11y.enabled && E();
        }),
        a(
          'slidesLengthChange snapGridLengthChange slidesGridLengthChange',
          () => {
            t.params.a11y.enabled && y();
          }
        ),
        a('fromEdge toEdge afterInit lock unlock', () => {
          t.params.a11y.enabled &&
            (function () {
              if (t.params.loop || t.params.rewind || !t.navigation) return;
              const { $nextEl: e, $prevEl: s } = t.navigation;
              s &&
                s.length > 0 &&
                (t.isBeginning ? (u(s), l(s)) : (h(s), n(s))),
                e && e.length > 0 && (t.isEnd ? (u(e), l(e)) : (h(e), n(e)));
            })();
        }),
        a('paginationUpdate', () => {
          t.params.a11y.enabled &&
            (function () {
              const e = t.params.a11y;
              f() &&
                t.pagination.bullets.each((s) => {
                  const a = d(s);
                  t.params.pagination.clickable &&
                    (n(a),
                    t.params.pagination.renderBullet ||
                      (o(a, 'button'),
                      p(
                        a,
                        e.paginationBulletMessage.replace(
                          /\{\{index\}\}/,
                          a.index() + 1
                        )
                      ))),
                    a.is(`.${t.params.pagination.bulletActiveClass}`)
                      ? a.attr('aria-current', 'true')
                      : a.removeAttr('aria-current');
                });
            })();
        }),
        a('destroy', () => {
          t.params.a11y.enabled &&
            (function () {
              let e, s;
              i && i.length > 0 && i.remove(),
                t.navigation &&
                  t.navigation.$nextEl &&
                  (e = t.navigation.$nextEl),
                t.navigation &&
                  t.navigation.$prevEl &&
                  (s = t.navigation.$prevEl),
                e && e.off('keydown', m),
                s && s.off('keydown', m),
                g() &&
                  t.pagination.$el.off(
                    'keydown',
                    U(t.params.pagination.bulletClass),
                    m
                  ),
                t.$el.off('focus', x, !0),
                t.$el.off('pointerdown', w, !0),
                t.$el.off('pointerup', b, !0);
            })();
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        history: {
          enabled: !1,
          root: '',
          replaceState: !1,
          key: 'slides',
          keepQuery: !1,
        },
      });
      let i = !1,
        n = {};
      const l = (e) =>
          e
            .toString()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, ''),
        o = (e) => {
          const t = r();
          let s;
          s = e ? new URL(e) : t.location;
          const a = s.pathname
              .slice(1)
              .split('/')
              .filter((e) => '' !== e),
            i = a.length;
          return { key: a[i - 2], value: a[i - 1] };
        },
        d = (e, s) => {
          const a = r();
          if (!i || !t.params.history.enabled) return;
          let n;
          n = t.params.url ? new URL(t.params.url) : a.location;
          const o = t.slides.eq(s);
          let d = l(o.attr('data-history'));
          if (t.params.history.root.length > 0) {
            let s = t.params.history.root;
            '/' === s[s.length - 1] && (s = s.slice(0, s.length - 1)),
              (d = `${s}/${e}/${d}`);
          } else n.pathname.includes(e) || (d = `${e}/${d}`);
          t.params.history.keepQuery && (d += n.search);
          const c = a.history.state;
          (c && c.value === d) ||
            (t.params.history.replaceState
              ? a.history.replaceState({ value: d }, null, d)
              : a.history.pushState({ value: d }, null, d));
        },
        c = (e, s, a) => {
          if (s)
            for (let i = 0, r = t.slides.length; i < r; i += 1) {
              const r = t.slides.eq(i);
              if (
                l(r.attr('data-history')) === s &&
                !r.hasClass(t.params.slideDuplicateClass)
              ) {
                const s = r.index();
                t.slideTo(s, e, a);
              }
            }
          else t.slideTo(0, e, a);
        },
        p = () => {
          (n = o(t.params.url)), c(t.params.speed, n.value, !1);
        };
      a('init', () => {
        t.params.history.enabled &&
          (() => {
            const e = r();
            if (t.params.history) {
              if (!e.history || !e.history.pushState)
                return (
                  (t.params.history.enabled = !1),
                  void (t.params.hashNavigation.enabled = !0)
                );
              (i = !0),
                (n = o(t.params.url)),
                (n.key || n.value) &&
                  (c(0, n.value, t.params.runCallbacksOnInit),
                  t.params.history.replaceState ||
                    e.addEventListener('popstate', p));
            }
          })();
      }),
        a('destroy', () => {
          t.params.history.enabled &&
            (() => {
              const e = r();
              t.params.history.replaceState ||
                e.removeEventListener('popstate', p);
            })();
        }),
        a('transitionEnd _freeModeNoMomentumRelease', () => {
          i && d(t.params.history.key, t.activeIndex);
        }),
        a('slideChange', () => {
          i && t.params.cssMode && d(t.params.history.key, t.activeIndex);
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, emit: i, on: n } = e,
        l = !1;
      const o = a(),
        c = r();
      s({ hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } });
      const p = () => {
          i('hashChange');
          const e = o.location.hash.replace('#', '');
          if (e !== t.slides.eq(t.activeIndex).attr('data-hash')) {
            const s = t.$wrapperEl
              .children(`.${t.params.slideClass}[data-hash="${e}"]`)
              .index();
            if (void 0 === s) return;
            t.slideTo(s);
          }
        },
        u = () => {
          if (l && t.params.hashNavigation.enabled)
            if (
              t.params.hashNavigation.replaceState &&
              c.history &&
              c.history.replaceState
            )
              c.history.replaceState(
                null,
                null,
                `#${t.slides.eq(t.activeIndex).attr('data-hash')}` || ''
              ),
                i('hashSet');
            else {
              const e = t.slides.eq(t.activeIndex),
                s = e.attr('data-hash') || e.attr('data-history');
              (o.location.hash = s || ''), i('hashSet');
            }
        };
      n('init', () => {
        t.params.hashNavigation.enabled &&
          (() => {
            if (
              !t.params.hashNavigation.enabled ||
              (t.params.history && t.params.history.enabled)
            )
              return;
            l = !0;
            const e = o.location.hash.replace('#', '');
            if (e) {
              const s = 0;
              for (let a = 0, i = t.slides.length; a < i; a += 1) {
                const i = t.slides.eq(a);
                if (
                  (i.attr('data-hash') || i.attr('data-history')) === e &&
                  !i.hasClass(t.params.slideDuplicateClass)
                ) {
                  const e = i.index();
                  t.slideTo(e, s, t.params.runCallbacksOnInit, !0);
                }
              }
            }
            t.params.hashNavigation.watchState && d(c).on('hashchange', p);
          })();
      }),
        n('destroy', () => {
          t.params.hashNavigation.enabled &&
            t.params.hashNavigation.watchState &&
            d(c).off('hashchange', p);
        }),
        n('transitionEnd _freeModeNoMomentumRelease', () => {
          l && u();
        }),
        n('slideChange', () => {
          l && t.params.cssMode && u();
        });
    },
    function (e) {
      let t,
        { swiper: s, extendParams: i, on: r, emit: n } = e;
      function l() {
        if (!s.size)
          return (s.autoplay.running = !1), void (s.autoplay.paused = !1);
        const e = s.slides.eq(s.activeIndex);
        let a = s.params.autoplay.delay;
        e.attr('data-swiper-autoplay') &&
          (a = e.attr('data-swiper-autoplay') || s.params.autoplay.delay),
          clearTimeout(t),
          (t = p(() => {
            let e;
            s.params.autoplay.reverseDirection
              ? s.params.loop
                ? (s.loopFix(),
                  (e = s.slidePrev(s.params.speed, !0, !0)),
                  n('autoplay'))
                : s.isBeginning
                ? s.params.autoplay.stopOnLastSlide
                  ? d()
                  : ((e = s.slideTo(
                      s.slides.length - 1,
                      s.params.speed,
                      !0,
                      !0
                    )),
                    n('autoplay'))
                : ((e = s.slidePrev(s.params.speed, !0, !0)), n('autoplay'))
              : s.params.loop
              ? (s.loopFix(),
                (e = s.slideNext(s.params.speed, !0, !0)),
                n('autoplay'))
              : s.isEnd
              ? s.params.autoplay.stopOnLastSlide
                ? d()
                : ((e = s.slideTo(0, s.params.speed, !0, !0)), n('autoplay'))
              : ((e = s.slideNext(s.params.speed, !0, !0)), n('autoplay')),
              ((s.params.cssMode && s.autoplay.running) || !1 === e) && l();
          }, a));
      }
      function o() {
        return (
          void 0 === t &&
          !s.autoplay.running &&
          ((s.autoplay.running = !0), n('autoplayStart'), l(), !0)
        );
      }
      function d() {
        return (
          !!s.autoplay.running &&
          void 0 !== t &&
          (t && (clearTimeout(t), (t = void 0)),
          (s.autoplay.running = !1),
          n('autoplayStop'),
          !0)
        );
      }
      function c(e) {
        s.autoplay.running &&
          (s.autoplay.paused ||
            (t && clearTimeout(t),
            (s.autoplay.paused = !0),
            0 !== e && s.params.autoplay.waitForTransition
              ? ['transitionend', 'webkitTransitionEnd'].forEach((e) => {
                  s.$wrapperEl[0].addEventListener(e, h);
                })
              : ((s.autoplay.paused = !1), l())));
      }
      function u() {
        const e = a();
        'hidden' === e.visibilityState && s.autoplay.running && c(),
          'visible' === e.visibilityState &&
            s.autoplay.paused &&
            (l(), (s.autoplay.paused = !1));
      }
      function h(e) {
        s &&
          !s.destroyed &&
          s.$wrapperEl &&
          e.target === s.$wrapperEl[0] &&
          (['transitionend', 'webkitTransitionEnd'].forEach((e) => {
            s.$wrapperEl[0].removeEventListener(e, h);
          }),
          (s.autoplay.paused = !1),
          s.autoplay.running ? l() : d());
      }
      function m() {
        s.params.autoplay.disableOnInteraction
          ? d()
          : (n('autoplayPause'), c()),
          ['transitionend', 'webkitTransitionEnd'].forEach((e) => {
            s.$wrapperEl[0].removeEventListener(e, h);
          });
      }
      function f() {
        s.params.autoplay.disableOnInteraction ||
          ((s.autoplay.paused = !1), n('autoplayResume'), l());
      }
      (s.autoplay = { running: !1, paused: !1 }),
        i({
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1,
          },
        }),
        r('init', () => {
          if (s.params.autoplay.enabled) {
            o();
            a().addEventListener('visibilitychange', u),
              s.params.autoplay.pauseOnMouseEnter &&
                (s.$el.on('mouseenter', m), s.$el.on('mouseleave', f));
          }
        }),
        r('beforeTransitionStart', (e, t, a) => {
          s.autoplay.running &&
            (a || !s.params.autoplay.disableOnInteraction
              ? s.autoplay.pause(t)
              : d());
        }),
        r('sliderFirstMove', () => {
          s.autoplay.running &&
            (s.params.autoplay.disableOnInteraction ? d() : c());
        }),
        r('touchEnd', () => {
          s.params.cssMode &&
            s.autoplay.paused &&
            !s.params.autoplay.disableOnInteraction &&
            l();
        }),
        r('destroy', () => {
          s.$el.off('mouseenter', m),
            s.$el.off('mouseleave', f),
            s.autoplay.running && d();
          a().removeEventListener('visibilitychange', u);
        }),
        Object.assign(s.autoplay, { pause: c, run: l, start: o, stop: d });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        thumbs: {
          swiper: null,
          multipleActiveThumbs: !0,
          autoScrollOffset: 0,
          slideThumbActiveClass: 'swiper-slide-thumb-active',
          thumbsContainerClass: 'swiper-thumbs',
        },
      });
      let i = !1,
        r = !1;
      function n() {
        const e = t.thumbs.swiper;
        if (!e || e.destroyed) return;
        const s = e.clickedIndex,
          a = e.clickedSlide;
        if (a && d(a).hasClass(t.params.thumbs.slideThumbActiveClass)) return;
        if (null == s) return;
        let i;
        if (
          ((i = e.params.loop
            ? parseInt(d(e.clickedSlide).attr('data-swiper-slide-index'), 10)
            : s),
          t.params.loop)
        ) {
          let e = t.activeIndex;
          t.slides.eq(e).hasClass(t.params.slideDuplicateClass) &&
            (t.loopFix(),
            (t._clientLeft = t.$wrapperEl[0].clientLeft),
            (e = t.activeIndex));
          const s = t.slides
              .eq(e)
              .prevAll(`[data-swiper-slide-index="${i}"]`)
              .eq(0)
              .index(),
            a = t.slides
              .eq(e)
              .nextAll(`[data-swiper-slide-index="${i}"]`)
              .eq(0)
              .index();
          i = void 0 === s ? a : void 0 === a ? s : a - e < e - s ? a : s;
        }
        t.slideTo(i);
      }
      function l() {
        const { thumbs: e } = t.params;
        if (i) return !1;
        i = !0;
        const s = t.constructor;
        if (e.swiper instanceof s)
          (t.thumbs.swiper = e.swiper),
            Object.assign(t.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            Object.assign(t.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            });
        else if (m(e.swiper)) {
          const a = Object.assign({}, e.swiper);
          Object.assign(a, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
            (t.thumbs.swiper = new s(a)),
            (r = !0);
        }
        return (
          t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),
          t.thumbs.swiper.on('tap', n),
          !0
        );
      }
      function o(e) {
        const s = t.thumbs.swiper;
        if (!s || s.destroyed) return;
        const a =
          'auto' === s.params.slidesPerView
            ? s.slidesPerViewDynamic()
            : s.params.slidesPerView;
        let i = 1;
        const r = t.params.thumbs.slideThumbActiveClass;
        if (
          (t.params.slidesPerView > 1 &&
            !t.params.centeredSlides &&
            (i = t.params.slidesPerView),
          t.params.thumbs.multipleActiveThumbs || (i = 1),
          (i = Math.floor(i)),
          s.slides.removeClass(r),
          s.params.loop || (s.params.virtual && s.params.virtual.enabled))
        )
          for (let e = 0; e < i; e += 1)
            s.$wrapperEl
              .children(`[data-swiper-slide-index="${t.realIndex + e}"]`)
              .addClass(r);
        else
          for (let e = 0; e < i; e += 1)
            s.slides.eq(t.realIndex + e).addClass(r);
        const n = t.params.thumbs.autoScrollOffset,
          l = n && !s.params.loop;
        if (t.realIndex !== s.realIndex || l) {
          let i,
            r,
            o = s.activeIndex;
          if (s.params.loop) {
            s.slides.eq(o).hasClass(s.params.slideDuplicateClass) &&
              (s.loopFix(),
              (s._clientLeft = s.$wrapperEl[0].clientLeft),
              (o = s.activeIndex));
            const e = s.slides
                .eq(o)
                .prevAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                .eq(0)
                .index(),
              a = s.slides
                .eq(o)
                .nextAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                .eq(0)
                .index();
            (i =
              void 0 === e
                ? a
                : void 0 === a
                ? e
                : a - o == o - e
                ? s.params.slidesPerGroup > 1
                  ? a
                  : o
                : a - o < o - e
                ? a
                : e),
              (r = t.activeIndex > t.previousIndex ? 'next' : 'prev');
          } else (i = t.realIndex), (r = i > t.previousIndex ? 'next' : 'prev');
          l && (i += 'next' === r ? n : -1 * n),
            s.visibleSlidesIndexes &&
              s.visibleSlidesIndexes.indexOf(i) < 0 &&
              (s.params.centeredSlides
                ? (i =
                    i > o
                      ? i - Math.floor(a / 2) + 1
                      : i + Math.floor(a / 2) - 1)
                : i > o && s.params.slidesPerGroup,
              s.slideTo(i, e ? 0 : void 0));
        }
      }
      (t.thumbs = { swiper: null }),
        a('beforeInit', () => {
          const { thumbs: e } = t.params;
          e && e.swiper && (l(), o(!0));
        }),
        a('slideChange update resize observerUpdate', () => {
          o();
        }),
        a('setTransition', (e, s) => {
          const a = t.thumbs.swiper;
          a && !a.destroyed && a.setTransition(s);
        }),
        a('beforeDestroy', () => {
          const e = t.thumbs.swiper;
          e && !e.destroyed && r && e.destroy();
        }),
        Object.assign(t.thumbs, { init: l, update: o });
    },
    function (e) {
      let { swiper: t, extendParams: s, emit: a, once: i } = e;
      s({
        freeMode: {
          enabled: !1,
          momentum: !0,
          momentumRatio: 1,
          momentumBounce: !0,
          momentumBounceRatio: 1,
          momentumVelocityRatio: 1,
          sticky: !1,
          minimumVelocity: 0.02,
        },
      }),
        Object.assign(t, {
          freeMode: {
            onTouchStart: function () {
              const e = t.getTranslate();
              t.setTranslate(e),
                t.setTransition(0),
                (t.touchEventsData.velocities.length = 0),
                t.freeMode.onTouchEnd({
                  currentPos: t.rtl ? t.translate : -t.translate,
                });
            },
            onTouchMove: function () {
              const { touchEventsData: e, touches: s } = t;
              0 === e.velocities.length &&
                e.velocities.push({
                  position: s[t.isHorizontal() ? 'startX' : 'startY'],
                  time: e.touchStartTime,
                }),
                e.velocities.push({
                  position: s[t.isHorizontal() ? 'currentX' : 'currentY'],
                  time: u(),
                });
            },
            onTouchEnd: function (e) {
              let { currentPos: s } = e;
              const {
                  params: r,
                  $wrapperEl: n,
                  rtlTranslate: l,
                  snapGrid: o,
                  touchEventsData: d,
                } = t,
                c = u() - d.touchStartTime;
              if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
              else if (s > -t.maxTranslate())
                t.slides.length < o.length
                  ? t.slideTo(o.length - 1)
                  : t.slideTo(t.slides.length - 1);
              else {
                if (r.freeMode.momentum) {
                  if (d.velocities.length > 1) {
                    const e = d.velocities.pop(),
                      s = d.velocities.pop(),
                      a = e.position - s.position,
                      i = e.time - s.time;
                    (t.velocity = a / i),
                      (t.velocity /= 2),
                      Math.abs(t.velocity) < r.freeMode.minimumVelocity &&
                        (t.velocity = 0),
                      (i > 150 || u() - e.time > 300) && (t.velocity = 0);
                  } else t.velocity = 0;
                  (t.velocity *= r.freeMode.momentumVelocityRatio),
                    (d.velocities.length = 0);
                  let e = 1e3 * r.freeMode.momentumRatio;
                  const s = t.velocity * e;
                  let c = t.translate + s;
                  l && (c = -c);
                  let p,
                    h = !1;
                  const m =
                    20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
                  let f;
                  if (c < t.maxTranslate())
                    r.freeMode.momentumBounce
                      ? (c + t.maxTranslate() < -m &&
                          (c = t.maxTranslate() - m),
                        (p = t.maxTranslate()),
                        (h = !0),
                        (d.allowMomentumBounce = !0))
                      : (c = t.maxTranslate()),
                      r.loop && r.centeredSlides && (f = !0);
                  else if (c > t.minTranslate())
                    r.freeMode.momentumBounce
                      ? (c - t.minTranslate() > m && (c = t.minTranslate() + m),
                        (p = t.minTranslate()),
                        (h = !0),
                        (d.allowMomentumBounce = !0))
                      : (c = t.minTranslate()),
                      r.loop && r.centeredSlides && (f = !0);
                  else if (r.freeMode.sticky) {
                    let e;
                    for (let t = 0; t < o.length; t += 1)
                      if (o[t] > -c) {
                        e = t;
                        break;
                      }
                    (c =
                      Math.abs(o[e] - c) < Math.abs(o[e - 1] - c) ||
                      'next' === t.swipeDirection
                        ? o[e]
                        : o[e - 1]),
                      (c = -c);
                  }
                  if (
                    (f &&
                      i('transitionEnd', () => {
                        t.loopFix();
                      }),
                    0 !== t.velocity)
                  ) {
                    if (
                      ((e = l
                        ? Math.abs((-c - t.translate) / t.velocity)
                        : Math.abs((c - t.translate) / t.velocity)),
                      r.freeMode.sticky)
                    ) {
                      const s = Math.abs((l ? -c : c) - t.translate),
                        a = t.slidesSizesGrid[t.activeIndex];
                      e =
                        s < a
                          ? r.speed
                          : s < 2 * a
                          ? 1.5 * r.speed
                          : 2.5 * r.speed;
                    }
                  } else if (r.freeMode.sticky) return void t.slideToClosest();
                  r.freeMode.momentumBounce && h
                    ? (t.updateProgress(p),
                      t.setTransition(e),
                      t.setTranslate(c),
                      t.transitionStart(!0, t.swipeDirection),
                      (t.animating = !0),
                      n.transitionEnd(() => {
                        t &&
                          !t.destroyed &&
                          d.allowMomentumBounce &&
                          (a('momentumBounce'),
                          t.setTransition(r.speed),
                          setTimeout(() => {
                            t.setTranslate(p),
                              n.transitionEnd(() => {
                                t && !t.destroyed && t.transitionEnd();
                              });
                          }, 0));
                      }))
                    : t.velocity
                    ? (a('_freeModeNoMomentumRelease'),
                      t.updateProgress(c),
                      t.setTransition(e),
                      t.setTranslate(c),
                      t.transitionStart(!0, t.swipeDirection),
                      t.animating ||
                        ((t.animating = !0),
                        n.transitionEnd(() => {
                          t && !t.destroyed && t.transitionEnd();
                        })))
                    : t.updateProgress(c),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses();
                } else {
                  if (r.freeMode.sticky) return void t.slideToClosest();
                  r.freeMode && a('_freeModeNoMomentumRelease');
                }
                (!r.freeMode.momentum || c >= r.longSwipesMs) &&
                  (t.updateProgress(),
                  t.updateActiveIndex(),
                  t.updateSlidesClasses());
              }
            },
          },
        });
    },
    function (e) {
      let t,
        s,
        a,
        { swiper: i, extendParams: r } = e;
      r({ grid: { rows: 1, fill: 'column' } }),
        (i.grid = {
          initSlides: (e) => {
            const { slidesPerView: r } = i.params,
              { rows: n, fill: l } = i.params.grid;
            (s = t / n),
              (a = Math.floor(e / n)),
              (t = Math.floor(e / n) === e / n ? e : Math.ceil(e / n) * n),
              'auto' !== r && 'row' === l && (t = Math.max(t, r * n));
          },
          updateSlide: (e, r, n, l) => {
            const { slidesPerGroup: o, spaceBetween: d } = i.params,
              { rows: c, fill: p } = i.params.grid;
            let u, h, m;
            if ('row' === p && o > 1) {
              const s = Math.floor(e / (o * c)),
                a = e - c * o * s,
                i = 0 === s ? o : Math.min(Math.ceil((n - s * c * o) / c), o);
              (m = Math.floor(a / i)),
                (h = a - m * i + s * o),
                (u = h + (m * t) / c),
                r.css({ '-webkit-order': u, order: u });
            } else
              'column' === p
                ? ((h = Math.floor(e / c)),
                  (m = e - h * c),
                  (h > a || (h === a && m === c - 1)) &&
                    ((m += 1), m >= c && ((m = 0), (h += 1))))
                : ((m = Math.floor(e / s)), (h = e - m * s));
            r.css(l('margin-top'), 0 !== m ? d && `${d}px` : '');
          },
          updateWrapperSize: (e, s, a) => {
            const {
                spaceBetween: r,
                centeredSlides: n,
                roundLengths: l,
              } = i.params,
              { rows: o } = i.params.grid;
            if (
              ((i.virtualSize = (e + r) * t),
              (i.virtualSize = Math.ceil(i.virtualSize / o) - r),
              i.$wrapperEl.css({ [a('width')]: `${i.virtualSize + r}px` }),
              n)
            ) {
              s.splice(0, s.length);
              const e = [];
              for (let t = 0; t < s.length; t += 1) {
                let a = s[t];
                l && (a = Math.floor(a)),
                  s[t] < i.virtualSize + s[0] && e.push(a);
              }
              s.push(...e);
            }
          },
        });
    },
    function (e) {
      let { swiper: t } = e;
      Object.assign(t, {
        appendSlide: K.bind(t),
        prependSlide: Z.bind(t),
        addSlide: Q.bind(t),
        removeSlide: J.bind(t),
        removeAllSlides: ee.bind(t),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({ fadeEffect: { crossFade: !1, transformEl: null } }),
        te({
          effect: 'fade',
          swiper: t,
          on: a,
          setTranslate: () => {
            const { slides: e } = t,
              s = t.params.fadeEffect;
            for (let a = 0; a < e.length; a += 1) {
              const e = t.slides.eq(a);
              let i = -e[0].swiperSlideOffset;
              t.params.virtualTranslate || (i -= t.translate);
              let r = 0;
              t.isHorizontal() || ((r = i), (i = 0));
              const n = t.params.fadeEffect.crossFade
                ? Math.max(1 - Math.abs(e[0].progress), 0)
                : 1 + Math.min(Math.max(e[0].progress, -1), 0);
              se(s, e)
                .css({ opacity: n })
                .transform(`translate3d(${i}px, ${r}px, 0px)`);
            }
          },
          setTransition: (e) => {
            const { transformEl: s } = t.params.fadeEffect;
            (s ? t.slides.find(s) : t.slides).transition(e),
              ae({ swiper: t, duration: e, transformEl: s, allSlides: !0 });
          },
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !t.params.cssMode,
          }),
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        cubeEffect: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
      });
      const i = (e, t, s) => {
        let a = s
            ? e.find('.swiper-slide-shadow-left')
            : e.find('.swiper-slide-shadow-top'),
          i = s
            ? e.find('.swiper-slide-shadow-right')
            : e.find('.swiper-slide-shadow-bottom');
        0 === a.length &&
          ((a = d(
            `<div class="swiper-slide-shadow-${s ? 'left' : 'top'}"></div>`
          )),
          e.append(a)),
          0 === i.length &&
            ((i = d(
              `<div class="swiper-slide-shadow-${
                s ? 'right' : 'bottom'
              }"></div>`
            )),
            e.append(i)),
          a.length && (a[0].style.opacity = Math.max(-t, 0)),
          i.length && (i[0].style.opacity = Math.max(t, 0));
      };
      te({
        effect: 'cube',
        swiper: t,
        on: a,
        setTranslate: () => {
          const {
              $el: e,
              $wrapperEl: s,
              slides: a,
              width: r,
              height: n,
              rtlTranslate: l,
              size: o,
              browser: c,
            } = t,
            p = t.params.cubeEffect,
            u = t.isHorizontal(),
            h = t.virtual && t.params.virtual.enabled;
          let m,
            f = 0;
          p.shadow &&
            (u
              ? ((m = s.find('.swiper-cube-shadow')),
                0 === m.length &&
                  ((m = d('<div class="swiper-cube-shadow"></div>')),
                  s.append(m)),
                m.css({ height: `${r}px` }))
              : ((m = e.find('.swiper-cube-shadow')),
                0 === m.length &&
                  ((m = d('<div class="swiper-cube-shadow"></div>')),
                  e.append(m))));
          for (let e = 0; e < a.length; e += 1) {
            const t = a.eq(e);
            let s = e;
            h && (s = parseInt(t.attr('data-swiper-slide-index'), 10));
            let r = 90 * s,
              n = Math.floor(r / 360);
            l && ((r = -r), (n = Math.floor(-r / 360)));
            const d = Math.max(Math.min(t[0].progress, 1), -1);
            let c = 0,
              m = 0,
              g = 0;
            s % 4 == 0
              ? ((c = 4 * -n * o), (g = 0))
              : (s - 1) % 4 == 0
              ? ((c = 0), (g = 4 * -n * o))
              : (s - 2) % 4 == 0
              ? ((c = o + 4 * n * o), (g = o))
              : (s - 3) % 4 == 0 && ((c = -o), (g = 3 * o + 4 * o * n)),
              l && (c = -c),
              u || ((m = c), (c = 0));
            const v = `rotateX(${u ? 0 : -r}deg) rotateY(${
              u ? r : 0
            }deg) translate3d(${c}px, ${m}px, ${g}px)`;
            d <= 1 &&
              d > -1 &&
              ((f = 90 * s + 90 * d), l && (f = 90 * -s - 90 * d)),
              t.transform(v),
              p.slideShadows && i(t, d, u);
          }
          if (
            (s.css({
              '-webkit-transform-origin': `50% 50% -${o / 2}px`,
              'transform-origin': `50% 50% -${o / 2}px`,
            }),
            p.shadow)
          )
            if (u)
              m.transform(
                `translate3d(0px, ${r / 2 + p.shadowOffset}px, ${
                  -r / 2
                }px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})`
              );
            else {
              const e = Math.abs(f) - 90 * Math.floor(Math.abs(f) / 90),
                t =
                  1.5 -
                  (Math.sin((2 * e * Math.PI) / 360) / 2 +
                    Math.cos((2 * e * Math.PI) / 360) / 2),
                s = p.shadowScale,
                a = p.shadowScale / t,
                i = p.shadowOffset;
              m.transform(
                `scale3d(${s}, 1, ${a}) translate3d(0px, ${n / 2 + i}px, ${
                  -n / 2 / a
                }px) rotateX(-90deg)`
              );
            }
          const g = c.isSafari || c.isWebView ? -o / 2 : 0;
          s.transform(
            `translate3d(0px,0,${g}px) rotateX(${
              t.isHorizontal() ? 0 : f
            }deg) rotateY(${t.isHorizontal() ? -f : 0}deg)`
          ),
            s[0].style.setProperty('--swiper-cube-translate-z', `${g}px`);
        },
        setTransition: (e) => {
          const { $el: s, slides: a } = t;
          a
            .transition(e)
            .find(
              '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
            )
            .transition(e),
            t.params.cubeEffect.shadow &&
              !t.isHorizontal() &&
              s.find('.swiper-cube-shadow').transition(e);
        },
        recreateShadows: () => {
          const e = t.isHorizontal();
          t.slides.each((t) => {
            const s = Math.max(Math.min(t.progress, 1), -1);
            i(d(t), s, e);
          });
        },
        getEffectParams: () => t.params.cubeEffect,
        perspective: () => !0,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: !1,
          virtualTranslate: !0,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        flipEffect: { slideShadows: !0, limitRotation: !0, transformEl: null },
      });
      const i = (e, s, a) => {
        let i = t.isHorizontal()
            ? e.find('.swiper-slide-shadow-left')
            : e.find('.swiper-slide-shadow-top'),
          r = t.isHorizontal()
            ? e.find('.swiper-slide-shadow-right')
            : e.find('.swiper-slide-shadow-bottom');
        0 === i.length && (i = ie(a, e, t.isHorizontal() ? 'left' : 'top')),
          0 === r.length &&
            (r = ie(a, e, t.isHorizontal() ? 'right' : 'bottom')),
          i.length && (i[0].style.opacity = Math.max(-s, 0)),
          r.length && (r[0].style.opacity = Math.max(s, 0));
      };
      te({
        effect: 'flip',
        swiper: t,
        on: a,
        setTranslate: () => {
          const { slides: e, rtlTranslate: s } = t,
            a = t.params.flipEffect;
          for (let r = 0; r < e.length; r += 1) {
            const n = e.eq(r);
            let l = n[0].progress;
            t.params.flipEffect.limitRotation &&
              (l = Math.max(Math.min(n[0].progress, 1), -1));
            const o = n[0].swiperSlideOffset;
            let d = -180 * l,
              c = 0,
              p = t.params.cssMode ? -o - t.translate : -o,
              u = 0;
            t.isHorizontal()
              ? s && (d = -d)
              : ((u = p), (p = 0), (c = -d), (d = 0)),
              (n[0].style.zIndex = -Math.abs(Math.round(l)) + e.length),
              a.slideShadows && i(n, l, a);
            const h = `translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;
            se(a, n).transform(h);
          }
        },
        setTransition: (e) => {
          const { transformEl: s } = t.params.flipEffect;
          (s ? t.slides.find(s) : t.slides)
            .transition(e)
            .find(
              '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
            )
            .transition(e),
            ae({ swiper: t, duration: e, transformEl: s });
        },
        recreateShadows: () => {
          const e = t.params.flipEffect;
          t.slides.each((s) => {
            const a = d(s);
            let r = a[0].progress;
            t.params.flipEffect.limitRotation &&
              (r = Math.max(Math.min(s.progress, 1), -1)),
              i(a, r, e);
          });
        },
        getEffectParams: () => t.params.flipEffect,
        perspective: () => !0,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          spaceBetween: 0,
          virtualTranslate: !t.params.cssMode,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          scale: 1,
          modifier: 1,
          slideShadows: !0,
          transformEl: null,
        },
      }),
        te({
          effect: 'coverflow',
          swiper: t,
          on: a,
          setTranslate: () => {
            const { width: e, height: s, slides: a, slidesSizesGrid: i } = t,
              r = t.params.coverflowEffect,
              n = t.isHorizontal(),
              l = t.translate,
              o = n ? e / 2 - l : s / 2 - l,
              d = n ? r.rotate : -r.rotate,
              c = r.depth;
            for (let e = 0, t = a.length; e < t; e += 1) {
              const t = a.eq(e),
                s = i[e],
                l = (o - t[0].swiperSlideOffset - s / 2) / s,
                p =
                  'function' == typeof r.modifier
                    ? r.modifier(l)
                    : l * r.modifier;
              let u = n ? d * p : 0,
                h = n ? 0 : d * p,
                m = -c * Math.abs(p),
                f = r.stretch;
              'string' == typeof f &&
                -1 !== f.indexOf('%') &&
                (f = (parseFloat(r.stretch) / 100) * s);
              let g = n ? 0 : f * p,
                v = n ? f * p : 0,
                w = 1 - (1 - r.scale) * Math.abs(p);
              Math.abs(v) < 0.001 && (v = 0),
                Math.abs(g) < 0.001 && (g = 0),
                Math.abs(m) < 0.001 && (m = 0),
                Math.abs(u) < 0.001 && (u = 0),
                Math.abs(h) < 0.001 && (h = 0),
                Math.abs(w) < 0.001 && (w = 0);
              const b = `translate3d(${v}px,${g}px,${m}px)  rotateX(${h}deg) rotateY(${u}deg) scale(${w})`;
              if (
                (se(r, t).transform(b),
                (t[0].style.zIndex = 1 - Math.abs(Math.round(p))),
                r.slideShadows)
              ) {
                let e = n
                    ? t.find('.swiper-slide-shadow-left')
                    : t.find('.swiper-slide-shadow-top'),
                  s = n
                    ? t.find('.swiper-slide-shadow-right')
                    : t.find('.swiper-slide-shadow-bottom');
                0 === e.length && (e = ie(r, t, n ? 'left' : 'top')),
                  0 === s.length && (s = ie(r, t, n ? 'right' : 'bottom')),
                  e.length && (e[0].style.opacity = p > 0 ? p : 0),
                  s.length && (s[0].style.opacity = -p > 0 ? -p : 0);
              }
            }
          },
          setTransition: (e) => {
            const { transformEl: s } = t.params.coverflowEffect;
            (s ? t.slides.find(s) : t.slides)
              .transition(e)
              .find(
                '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
              )
              .transition(e);
          },
          perspective: () => !0,
          overwriteParams: () => ({ watchSlidesProgress: !0 }),
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        creativeEffect: {
          transformEl: null,
          limitProgress: 1,
          shadowPerProgress: !1,
          progressMultiplier: 1,
          perspective: !0,
          prev: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
          },
          next: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
          },
        },
      });
      const i = (e) => ('string' == typeof e ? e : `${e}px`);
      te({
        effect: 'creative',
        swiper: t,
        on: a,
        setTranslate: () => {
          const { slides: e, $wrapperEl: s, slidesSizesGrid: a } = t,
            r = t.params.creativeEffect,
            { progressMultiplier: n } = r,
            l = t.params.centeredSlides;
          if (l) {
            const e = a[0] / 2 - t.params.slidesOffsetBefore || 0;
            s.transform(`translateX(calc(50% - ${e}px))`);
          }
          for (let s = 0; s < e.length; s += 1) {
            const a = e.eq(s),
              o = a[0].progress,
              d = Math.min(
                Math.max(a[0].progress, -r.limitProgress),
                r.limitProgress
              );
            let c = d;
            l ||
              (c = Math.min(
                Math.max(a[0].originalProgress, -r.limitProgress),
                r.limitProgress
              ));
            const p = a[0].swiperSlideOffset,
              u = [t.params.cssMode ? -p - t.translate : -p, 0, 0],
              h = [0, 0, 0];
            let m = !1;
            t.isHorizontal() || ((u[1] = u[0]), (u[0] = 0));
            let f = {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              scale: 1,
              opacity: 1,
            };
            d < 0
              ? ((f = r.next), (m = !0))
              : d > 0 && ((f = r.prev), (m = !0)),
              u.forEach((e, t) => {
                u[t] = `calc(${e}px + (${i(f.translate[t])} * ${Math.abs(
                  d * n
                )}))`;
              }),
              h.forEach((e, t) => {
                h[t] = f.rotate[t] * Math.abs(d * n);
              }),
              (a[0].style.zIndex = -Math.abs(Math.round(o)) + e.length);
            const g = u.join(', '),
              v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
              w =
                c < 0
                  ? `scale(${1 + (1 - f.scale) * c * n})`
                  : `scale(${1 - (1 - f.scale) * c * n})`,
              b =
                c < 0
                  ? 1 + (1 - f.opacity) * c * n
                  : 1 - (1 - f.opacity) * c * n,
              x = `translate3d(${g}) ${v} ${w}`;
            if ((m && f.shadow) || !m) {
              let e = a.children('.swiper-slide-shadow');
              if ((0 === e.length && f.shadow && (e = ie(r, a)), e.length)) {
                const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
                e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
              }
            }
            const y = se(r, a);
            y.transform(x).css({ opacity: b }),
              f.origin && y.css('transform-origin', f.origin);
          }
        },
        setTransition: (e) => {
          const { transformEl: s } = t.params.creativeEffect;
          (s ? t.slides.find(s) : t.slides)
            .transition(e)
            .find('.swiper-slide-shadow')
            .transition(e),
            ae({ swiper: t, duration: e, transformEl: s, allSlides: !0 });
        },
        perspective: () => t.params.creativeEffect.perspective,
        overwriteParams: () => ({
          watchSlidesProgress: !0,
          virtualTranslate: !t.params.cssMode,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        cardsEffect: {
          slideShadows: !0,
          transformEl: null,
          rotate: !0,
          perSlideRotate: 2,
          perSlideOffset: 8,
        },
      }),
        te({
          effect: 'cards',
          swiper: t,
          on: a,
          setTranslate: () => {
            const { slides: e, activeIndex: s } = t,
              a = t.params.cardsEffect,
              { startTranslate: i, isTouched: r } = t.touchEventsData,
              n = t.translate;
            for (let l = 0; l < e.length; l += 1) {
              const o = e.eq(l),
                d = o[0].progress,
                c = Math.min(Math.max(d, -4), 4);
              let p = o[0].swiperSlideOffset;
              t.params.centeredSlides &&
                !t.params.cssMode &&
                t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`),
                t.params.centeredSlides &&
                  t.params.cssMode &&
                  (p -= e[0].swiperSlideOffset);
              let u = t.params.cssMode ? -p - t.translate : -p,
                h = 0;
              const m = -100 * Math.abs(c);
              let f = 1,
                g = -a.perSlideRotate * c,
                v = a.perSlideOffset - 0.75 * Math.abs(c);
              const w =
                  t.virtual && t.params.virtual.enabled
                    ? t.virtual.from + l
                    : l,
                b =
                  (w === s || w === s - 1) &&
                  c > 0 &&
                  c < 1 &&
                  (r || t.params.cssMode) &&
                  n < i,
                x =
                  (w === s || w === s + 1) &&
                  c < 0 &&
                  c > -1 &&
                  (r || t.params.cssMode) &&
                  n > i;
              if (b || x) {
                const e = (1 - Math.abs((Math.abs(c) - 0.5) / 0.5)) ** 0.5;
                (g += -28 * c * e),
                  (f += -0.5 * e),
                  (v += 96 * e),
                  (h = -25 * e * Math.abs(c) + '%');
              }
              if (
                ((u =
                  c < 0
                    ? `calc(${u}px + (${v * Math.abs(c)}%))`
                    : c > 0
                    ? `calc(${u}px + (-${v * Math.abs(c)}%))`
                    : `${u}px`),
                !t.isHorizontal())
              ) {
                const e = h;
                (h = u), (u = e);
              }
              const y = c < 0 ? '' + (1 + (1 - f) * c) : '' + (1 - (1 - f) * c),
                E = `\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${
                  a.rotate ? g : 0
                }deg)\n        scale(${y})\n      `;
              if (a.slideShadows) {
                let e = o.find('.swiper-slide-shadow');
                0 === e.length && (e = ie(a, o)),
                  e.length &&
                    (e[0].style.opacity = Math.min(
                      Math.max((Math.abs(c) - 0.5) / 0.5, 0),
                      1
                    ));
              }
              o[0].style.zIndex = -Math.abs(Math.round(d)) + e.length;
              se(a, o).transform(E);
            }
          },
          setTransition: (e) => {
            const { transformEl: s } = t.params.cardsEffect;
            (s ? t.slides.find(s) : t.slides)
              .transition(e)
              .find('.swiper-slide-shadow')
              .transition(e),
              ae({ swiper: t, duration: e, transformEl: s });
          },
          perspective: () => !0,
          overwriteParams: () => ({
            watchSlidesProgress: !0,
            virtualTranslate: !t.params.cssMode,
          }),
        });
    },
  ];
  return V.use(re), V;
});
//# sourceMappingURL=swiper-bundle.min.js.map

// TypedJS
!(function (t, s) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = s())
    : 'function' == typeof define && define.amd
    ? define(s)
    : ((t || self).Typed = s());
})(this, function () {
  function t() {
    return (
      (t = Object.assign
        ? Object.assign.bind()
        : function (t) {
            for (var s = 1; s < arguments.length; s++) {
              var e = arguments[s];
              for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            }
            return t;
          }),
      t.apply(this, arguments)
    );
  }
  var s = {
      strings: [
        'These are the default values...',
        'You know what you should do?',
        'Use your own!',
        'Have a great day!',
      ],
      stringsElement: null,
      typeSpeed: 0,
      startDelay: 0,
      backSpeed: 0,
      smartBackspace: !0,
      shuffle: !1,
      backDelay: 700,
      fadeOut: !1,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 500,
      loop: !1,
      loopCount: Infinity,
      showCursor: !0,
      cursorChar: '|',
      autoInsertCss: !0,
      attr: null,
      bindInputFocusEvents: !1,
      contentType: 'html',
      onBegin: function (t) {},
      onComplete: function (t) {},
      preStringTyped: function (t, s) {},
      onStringTyped: function (t, s) {},
      onLastStringBackspaced: function (t) {},
      onTypingPaused: function (t, s) {},
      onTypingResumed: function (t, s) {},
      onReset: function (t) {},
      onStop: function (t, s) {},
      onStart: function (t, s) {},
      onDestroy: function (t) {},
    },
    e = new /*#__PURE__*/ ((function () {
      function e() {}
      var n = e.prototype;
      return (
        (n.load = function (e, n, i) {
          if (
            ((e.el = 'string' == typeof i ? document.querySelector(i) : i),
            (e.options = t({}, s, n)),
            (e.isInput = 'input' === e.el.tagName.toLowerCase()),
            (e.attr = e.options.attr),
            (e.bindInputFocusEvents = e.options.bindInputFocusEvents),
            (e.showCursor = !e.isInput && e.options.showCursor),
            (e.cursorChar = e.options.cursorChar),
            (e.cursorBlinking = !0),
            (e.elContent = e.attr
              ? e.el.getAttribute(e.attr)
              : e.el.textContent),
            (e.contentType = e.options.contentType),
            (e.typeSpeed = e.options.typeSpeed),
            (e.startDelay = e.options.startDelay),
            (e.backSpeed = e.options.backSpeed),
            (e.smartBackspace = e.options.smartBackspace),
            (e.backDelay = e.options.backDelay),
            (e.fadeOut = e.options.fadeOut),
            (e.fadeOutClass = e.options.fadeOutClass),
            (e.fadeOutDelay = e.options.fadeOutDelay),
            (e.isPaused = !1),
            (e.strings = e.options.strings.map(function (t) {
              return t.trim();
            })),
            (e.stringsElement =
              'string' == typeof e.options.stringsElement
                ? document.querySelector(e.options.stringsElement)
                : e.options.stringsElement),
            e.stringsElement)
          ) {
            (e.strings = []),
              (e.stringsElement.style.cssText =
                'clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;');
            var r = Array.prototype.slice.apply(e.stringsElement.children),
              o = r.length;
            if (o)
              for (var a = 0; a < o; a += 1)
                e.strings.push(r[a].innerHTML.trim());
          }
          for (var u in ((e.strPos = 0),
          (e.currentElContent = this.getCurrentElContent(e)),
          e.currentElContent &&
            e.currentElContent.length > 0 &&
            ((e.strPos = e.currentElContent.length - 1),
            e.strings.unshift(e.currentElContent)),
          (e.sequence = []),
          e.strings))
            e.sequence[u] = u;
          (e.arrayPos = 0),
            (e.stopNum = 0),
            (e.loop = e.options.loop),
            (e.loopCount = e.options.loopCount),
            (e.curLoop = 0),
            (e.shuffle = e.options.shuffle),
            (e.pause = {
              status: !1,
              typewrite: !0,
              curString: '',
              curStrPos: 0,
            }),
            (e.typingComplete = !1),
            (e.autoInsertCss = e.options.autoInsertCss),
            e.autoInsertCss &&
              (this.appendCursorAnimationCss(e),
              this.appendFadeOutAnimationCss(e));
        }),
        (n.getCurrentElContent = function (t) {
          return t.attr
            ? t.el.getAttribute(t.attr)
            : t.isInput
            ? t.el.value
            : 'html' === t.contentType
            ? t.el.innerHTML
            : t.el.textContent;
        }),
        (n.appendCursorAnimationCss = function (t) {
          var s = 'data-typed-js-cursor-css';
          if (t.showCursor && !document.querySelector('[' + s + ']')) {
            var e = document.createElement('style');
            e.setAttribute(s, 'true'),
              (e.innerHTML =
                '\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      '),
              document.body.appendChild(e);
          }
        }),
        (n.appendFadeOutAnimationCss = function (t) {
          var s = 'data-typed-fadeout-js-css';
          if (t.fadeOut && !document.querySelector('[' + s + ']')) {
            var e = document.createElement('style');
            e.setAttribute(s, 'true'),
              (e.innerHTML =
                '\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      '),
              document.body.appendChild(e);
          }
        }),
        e
      );
    })())(),
    n = new /*#__PURE__*/ ((function () {
      function t() {}
      var s = t.prototype;
      return (
        (s.typeHtmlChars = function (t, s, e) {
          if ('html' !== e.contentType) return s;
          var n = t.substring(s).charAt(0);
          if ('<' === n || '&' === n) {
            var i;
            for (
              i = '<' === n ? '>' : ';';
              t.substring(s + 1).charAt(0) !== i && !(1 + ++s > t.length);

            );
            s++;
          }
          return s;
        }),
        (s.backSpaceHtmlChars = function (t, s, e) {
          if ('html' !== e.contentType) return s;
          var n = t.substring(s).charAt(0);
          if ('>' === n || ';' === n) {
            var i;
            for (
              i = '>' === n ? '<' : '&';
              t.substring(s - 1).charAt(0) !== i && !(--s < 0);

            );
            s--;
          }
          return s;
        }),
        t
      );
    })())(); /*#__PURE__*/
  return (function () {
    function t(t, s) {
      e.load(this, s, t), this.begin();
    }
    var s = t.prototype;
    return (
      (s.toggle = function () {
        this.pause.status ? this.start() : this.stop();
      }),
      (s.stop = function () {
        this.typingComplete ||
          this.pause.status ||
          (this.toggleBlinking(!0),
          (this.pause.status = !0),
          this.options.onStop(this.arrayPos, this));
      }),
      (s.start = function () {
        this.typingComplete ||
          (this.pause.status &&
            ((this.pause.status = !1),
            this.pause.typewrite
              ? this.typewrite(this.pause.curString, this.pause.curStrPos)
              : this.backspace(this.pause.curString, this.pause.curStrPos),
            this.options.onStart(this.arrayPos, this)));
      }),
      (s.destroy = function () {
        this.reset(!1), this.options.onDestroy(this);
      }),
      (s.reset = function (t) {
        void 0 === t && (t = !0),
          clearInterval(this.timeout),
          this.replaceText(''),
          this.cursor &&
            this.cursor.parentNode &&
            (this.cursor.parentNode.removeChild(this.cursor),
            (this.cursor = null)),
          (this.strPos = 0),
          (this.arrayPos = 0),
          (this.curLoop = 0),
          t && (this.insertCursor(), this.options.onReset(this), this.begin());
      }),
      (s.begin = function () {
        var t = this;
        this.options.onBegin(this),
          (this.typingComplete = !1),
          this.shuffleStringsIfNeeded(this),
          this.insertCursor(),
          this.bindInputFocusEvents && this.bindFocusEvents(),
          (this.timeout = setTimeout(function () {
            0 === t.strPos
              ? t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
              : t.backspace(t.strings[t.sequence[t.arrayPos]], t.strPos);
          }, this.startDelay));
      }),
      (s.typewrite = function (t, s) {
        var e = this;
        this.fadeOut &&
          this.el.classList.contains(this.fadeOutClass) &&
          (this.el.classList.remove(this.fadeOutClass),
          this.cursor && this.cursor.classList.remove(this.fadeOutClass));
        var i = this.humanizer(this.typeSpeed),
          r = 1;
        !0 !== this.pause.status
          ? (this.timeout = setTimeout(function () {
              s = n.typeHtmlChars(t, s, e);
              var i = 0,
                o = t.substring(s);
              if ('^' === o.charAt(0) && /^\^\d+/.test(o)) {
                var a = 1;
                (a += (o = /\d+/.exec(o)[0]).length),
                  (i = parseInt(o)),
                  (e.temporaryPause = !0),
                  e.options.onTypingPaused(e.arrayPos, e),
                  (t = t.substring(0, s) + t.substring(s + a)),
                  e.toggleBlinking(!0);
              }
              if ('`' === o.charAt(0)) {
                for (
                  ;
                  '`' !== t.substring(s + r).charAt(0) &&
                  (r++, !(s + r > t.length));

                );
                var u = t.substring(0, s),
                  p = t.substring(u.length + 1, s + r),
                  c = t.substring(s + r + 1);
                (t = u + p + c), r--;
              }
              e.timeout = setTimeout(function () {
                e.toggleBlinking(!1),
                  s >= t.length ? e.doneTyping(t, s) : e.keepTyping(t, s, r),
                  e.temporaryPause &&
                    ((e.temporaryPause = !1),
                    e.options.onTypingResumed(e.arrayPos, e));
              }, i);
            }, i))
          : this.setPauseStatus(t, s, !0);
      }),
      (s.keepTyping = function (t, s, e) {
        0 === s &&
          (this.toggleBlinking(!1),
          this.options.preStringTyped(this.arrayPos, this));
        var n = t.substring(0, (s += e));
        this.replaceText(n), this.typewrite(t, s);
      }),
      (s.doneTyping = function (t, s) {
        var e = this;
        this.options.onStringTyped(this.arrayPos, this),
          this.toggleBlinking(!0),
          (this.arrayPos === this.strings.length - 1 &&
            (this.complete(),
            !1 === this.loop || this.curLoop === this.loopCount)) ||
            (this.timeout = setTimeout(function () {
              e.backspace(t, s);
            }, this.backDelay));
      }),
      (s.backspace = function (t, s) {
        var e = this;
        if (!0 !== this.pause.status) {
          if (this.fadeOut) return this.initFadeOut();
          this.toggleBlinking(!1);
          var i = this.humanizer(this.backSpeed);
          this.timeout = setTimeout(function () {
            s = n.backSpaceHtmlChars(t, s, e);
            var i = t.substring(0, s);
            if ((e.replaceText(i), e.smartBackspace)) {
              var r = e.strings[e.arrayPos + 1];
              e.stopNum = r && i === r.substring(0, s) ? s : 0;
            }
            s > e.stopNum
              ? (s--, e.backspace(t, s))
              : s <= e.stopNum &&
                (e.arrayPos++,
                e.arrayPos === e.strings.length
                  ? ((e.arrayPos = 0),
                    e.options.onLastStringBackspaced(),
                    e.shuffleStringsIfNeeded(),
                    e.begin())
                  : e.typewrite(e.strings[e.sequence[e.arrayPos]], s));
          }, i);
        } else this.setPauseStatus(t, s, !1);
      }),
      (s.complete = function () {
        this.options.onComplete(this),
          this.loop ? this.curLoop++ : (this.typingComplete = !0);
      }),
      (s.setPauseStatus = function (t, s, e) {
        (this.pause.typewrite = e),
          (this.pause.curString = t),
          (this.pause.curStrPos = s);
      }),
      (s.toggleBlinking = function (t) {
        this.cursor &&
          (this.pause.status ||
            (this.cursorBlinking !== t &&
              ((this.cursorBlinking = t),
              t
                ? this.cursor.classList.add('typed-cursor--blink')
                : this.cursor.classList.remove('typed-cursor--blink'))));
      }),
      (s.humanizer = function (t) {
        return Math.round((Math.random() * t) / 2) + t;
      }),
      (s.shuffleStringsIfNeeded = function () {
        this.shuffle &&
          (this.sequence = this.sequence.sort(function () {
            return Math.random() - 0.5;
          }));
      }),
      (s.initFadeOut = function () {
        var t = this;
        return (
          (this.el.className += ' ' + this.fadeOutClass),
          this.cursor && (this.cursor.className += ' ' + this.fadeOutClass),
          setTimeout(function () {
            t.arrayPos++,
              t.replaceText(''),
              t.strings.length > t.arrayPos
                ? t.typewrite(t.strings[t.sequence[t.arrayPos]], 0)
                : (t.typewrite(t.strings[0], 0), (t.arrayPos = 0));
          }, this.fadeOutDelay)
        );
      }),
      (s.replaceText = function (t) {
        this.attr
          ? this.el.setAttribute(this.attr, t)
          : this.isInput
          ? (this.el.value = t)
          : 'html' === this.contentType
          ? (this.el.innerHTML = t)
          : (this.el.textContent = t);
      }),
      (s.bindFocusEvents = function () {
        var t = this;
        this.isInput &&
          (this.el.addEventListener('focus', function (s) {
            t.stop();
          }),
          this.el.addEventListener('blur', function (s) {
            (t.el.value && 0 !== t.el.value.length) || t.start();
          }));
      }),
      (s.insertCursor = function () {
        this.showCursor &&
          (this.cursor ||
            ((this.cursor = document.createElement('span')),
            (this.cursor.className = 'typed-cursor'),
            this.cursor.setAttribute('aria-hidden', !0),
            (this.cursor.innerHTML = this.cursorChar),
            this.el.parentNode &&
              this.el.parentNode.insertBefore(
                this.cursor,
                this.el.nextSibling
              )));
      }),
      t
    );
  })();
});
//# sourceMappingURL=typed.umd.js.map

// Pristine
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      (global.Pristine = factory()));
})(this, function () {
  'use strict';

  var lang = {
    en: {
      required: 'This field is required',
      email: 'This field requires a valid e-mail address',
      number: 'This field requires a number',
      integer: 'This field requires an integer value',
      url: 'This field requires a valid website URL',
      tel: 'This field requires a valid telephone number',
      maxlength: 'This fields length must be < ${1}',
      minlength: 'This fields length must be > ${1}',
      min: 'Minimum value for this field is ${1}',
      max: 'Maximum value for this field is ${1}',
      pattern: 'Please match the requested format',
      equals: 'The two fields do not match',
      default: 'Please enter a correct value',
    },
  };

  function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls)) {}
    return el;
  }

  function tmpl(o) {
    var _arguments = arguments;

    return this.replace(/\${([^{}]*)}/g, function (a, b) {
      return _arguments[b];
    });
  }

  function groupedElemCount(input) {
    return input.pristine.self.form.querySelectorAll(
      'input[name="' + input.getAttribute('name') + '"]:checked'
    ).length;
  }

  function mergeConfig(obj1, obj2) {
    for (var attr in obj2) {
      if (!(attr in obj1)) {
        obj1[attr] = obj2[attr];
      }
    }
    return obj1;
  }

  var defaultConfig = {
    classTo: 'form-group',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'form-group',
    errorTextTag: 'div',
    errorTextClass: 'text-help',
  };

  var PRISTINE_ERROR = 'pristine-error';
  var SELECTOR =
    'input:not([type^=hidden]):not([type^=submit]), select, textarea';
  var ALLOWED_ATTRIBUTES = [
    'required',
    'min',
    'max',
    'minlength',
    'maxlength',
    'pattern',
  ];
  var EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var MESSAGE_REGEX = /-message(?:-([a-z]{2}(?:_[A-Z]{2})?))?/; // matches, -message, -message-en, -message-en_US
  var currentLocale = 'en';
  var validators = {};

  var _ = function _(name, validator) {
    validator.name = name;
    if (validator.priority === undefined) validator.priority = 1;
    validators[name] = validator;
  };

  _('text', {
    fn: function fn(val) {
      return true;
    },
    priority: 0,
  });
  _('required', {
    fn: function fn(val) {
      return this.type === 'radio' || this.type === 'checkbox'
        ? groupedElemCount(this)
        : val !== undefined && val.trim() !== '';
    },
    priority: 99,
    halt: true,
  });
  _('email', {
    fn: function fn(val) {
      return !val || EMAIL_REGEX.test(val);
    },
  });
  _('number', {
    fn: function fn(val) {
      return !val || !isNaN(parseFloat(val));
    },
    priority: 2,
  });
  _('integer', {
    fn: function fn(val) {
      return !val || /^\d+$/.test(val);
    },
  });
  _('minlength', {
    fn: function fn(val, length) {
      return !val || val.length >= parseInt(length);
    },
  });
  _('maxlength', {
    fn: function fn(val, length) {
      return !val || val.length <= parseInt(length);
    },
  });
  _('min', {
    fn: function fn(val, limit) {
      return (
        !val ||
        (this.type === 'checkbox'
          ? groupedElemCount(this) >= parseInt(limit)
          : parseFloat(val) >= parseFloat(limit))
      );
    },
  });
  _('max', {
    fn: function fn(val, limit) {
      return (
        !val ||
        (this.type === 'checkbox'
          ? groupedElemCount(this) <= parseInt(limit)
          : parseFloat(val) <= parseFloat(limit))
      );
    },
  });
  _('pattern', {
    fn: function fn(val, pattern) {
      var m = pattern.match(new RegExp('^/(.*?)/([gimy]*)$'));
      return !val || new RegExp(m[1], m[2]).test(val);
    },
  });
  _('equals', {
    fn: function fn(val, otherFieldSelector) {
      var other = document.querySelector(otherFieldSelector);
      return other && ((!val && !other.value) || other.value === val);
    },
  });

  function Pristine(form, config, live) {
    var self = this;

    init(form, config, live);

    function init(form, config, live) {
      form.setAttribute('novalidate', 'true');

      self.form = form;
      self.config = mergeConfig(config || {}, defaultConfig);
      self.live = !(live === false);
      self.fields = Array.from(form.querySelectorAll(SELECTOR)).map(
        function (input) {
          var fns = [];
          var params = {};
          var messages = {};

          [].forEach.call(input.attributes, function (attr) {
            if (/^data-pristine-/.test(attr.name)) {
              var name = attr.name.substr(14);
              var messageMatch = name.match(MESSAGE_REGEX);
              if (messageMatch !== null) {
                var locale =
                  messageMatch[1] === undefined ? 'en' : messageMatch[1];
                if (!messages.hasOwnProperty(locale)) messages[locale] = {};
                messages[locale][
                  name.slice(0, name.length - messageMatch[0].length)
                ] = attr.value;
                return;
              }
              if (name === 'type') name = attr.value;
              _addValidatorToField(fns, params, name, attr.value);
            } else if (~ALLOWED_ATTRIBUTES.indexOf(attr.name)) {
              _addValidatorToField(fns, params, attr.name, attr.value);
            } else if (attr.name === 'type') {
              _addValidatorToField(fns, params, attr.value);
            }
          });

          fns.sort(function (a, b) {
            return b.priority - a.priority;
          });

          self.live &&
            input.addEventListener(
              !~['radio', 'checkbox'].indexOf(input.getAttribute('type'))
                ? 'input'
                : 'change',
              function (e) {
                self.validate(e.target);
              }.bind(self)
            );

          return (input.pristine = {
            input: input,
            validators: fns,
            params: params,
            messages: messages,
            self: self,
          });
        }.bind(self)
      );
    }

    function _addValidatorToField(fns, params, name, value) {
      var validator = validators[name];
      if (validator) {
        fns.push(validator);
        if (value) {
          var valueParams = name === 'pattern' ? [value] : value.split(',');
          valueParams.unshift(null); // placeholder for input's value
          params[name] = valueParams;
        }
      }
    }

    /***
     * Checks whether the form/input elements are valid
     * @param input => input element(s) or a jquery selector, null for full form validation
     * @param silent => do not show error messages, just return true/false
     * @returns {boolean} return true when valid false otherwise
     */
    self.validate = function (input, silent) {
      silent = (input && silent === true) || input === true;
      var fields = self.fields;
      if (input !== true && input !== false) {
        if (input instanceof HTMLElement) {
          fields = [input.pristine];
        } else if (
          input instanceof NodeList ||
          input instanceof (window.$ || Array) ||
          input instanceof Array
        ) {
          fields = Array.from(input).map(function (el) {
            return el.pristine;
          });
        }
      }

      var valid = true;

      for (var i = 0; fields[i]; i++) {
        var field = fields[i];
        if (_validateField(field)) {
          !silent && _showSuccess(field);
        } else {
          valid = false;
          !silent && _showError(field);
        }
      }
      return valid;
    };

    /***
     * Get errors of a specific field or the whole form
     * @param input
     * @returns {Array|*}
     */
    self.getErrors = function (input) {
      if (!input) {
        var erroneousFields = [];
        for (var i = 0; i < self.fields.length; i++) {
          var field = self.fields[i];
          if (field.errors.length) {
            erroneousFields.push({ input: field.input, errors: field.errors });
          }
        }
        return erroneousFields;
      }
      if (input.tagName && input.tagName.toLowerCase() === 'select') {
        return input.pristine.errors;
      }
      return input.length ? input[0].pristine.errors : input.pristine.errors;
    };

    /***
     * Validates a single field, all validator functions are called and error messages are generated
     * when a validator fails
     * @param field
     * @returns {boolean}
     * @private
     */
    function _validateField(field) {
      var errors = [];
      var valid = true;
      for (var i = 0; field.validators[i]; i++) {
        var validator = field.validators[i];
        var params = field.params[validator.name]
          ? field.params[validator.name]
          : [];
        params[0] = field.input.value;
        if (!validator.fn.apply(field.input, params)) {
          valid = false;

          if (typeof validator.msg === 'function') {
            errors.push(validator.msg(field.input.value, params));
          } else if (typeof validator.msg === 'string') {
            errors.push(tmpl.apply(validator.msg, params));
          } else if (
            validator.msg === Object(validator.msg) &&
            validator.msg[currentLocale]
          ) {
            // typeof generates unnecessary babel code
            errors.push(tmpl.apply(validator.msg[currentLocale], params));
          } else if (
            field.messages[currentLocale] &&
            field.messages[currentLocale][validator.name]
          ) {
            errors.push(
              tmpl.apply(field.messages[currentLocale][validator.name], params)
            );
          } else if (
            lang[currentLocale] &&
            lang[currentLocale][validator.name]
          ) {
            errors.push(
              tmpl.apply(lang[currentLocale][validator.name], params)
            );
          } else {
            errors.push(tmpl.apply(lang[currentLocale].default, params));
          }

          if (validator.halt === true) {
            break;
          }
        }
      }
      field.errors = errors;
      return valid;
    }

    /***
     * Add a validator to a specific dom element in a form
     * @param elem => The dom element where the validator is applied to
     * @param fn => validator function
     * @param msg => message to show when validation fails. Supports templating. ${0} for the input's value, ${1} and
     * so on are for the attribute values
     * @param priority => priority of the validator function, higher valued function gets called first.
     * @param halt => whether validation should stop for this field after current validation function
     */
    self.addValidator = function (elem, fn, msg, priority, halt) {
      if (elem instanceof HTMLElement) {
        elem.pristine.validators.push({
          fn: fn,
          msg: msg,
          priority: priority,
          halt: halt,
        });
        elem.pristine.validators.sort(function (a, b) {
          return b.priority - a.priority;
        });
      } else {
        console.warn('The parameter elem must be a dom element');
      }
    };

    /***
     * An utility function that returns a 2-element array, first one is the element where error/success class is
     * applied. 2nd one is the element where error message is displayed. 2nd element is created if doesn't exist and cached.
     * @param field
     * @returns {*}
     * @private
     */
    function _getErrorElements(field) {
      if (field.errorElements) {
        return field.errorElements;
      }
      var errorClassElement = findAncestor(field.input, self.config.classTo);
      var errorTextParent = null,
        errorTextElement = null;
      if (self.config.classTo === self.config.errorTextParent) {
        errorTextParent = errorClassElement;
      } else {
        errorTextParent = errorClassElement.querySelector(
          '.' + self.config.errorTextParent
        );
      }
      if (errorTextParent) {
        errorTextElement = errorTextParent.querySelector('.' + PRISTINE_ERROR);
        if (!errorTextElement) {
          errorTextElement = document.createElement(self.config.errorTextTag);
          errorTextElement.className =
            PRISTINE_ERROR + ' ' + self.config.errorTextClass;
          errorTextParent.appendChild(errorTextElement);
          errorTextElement.pristineDisplay = errorTextElement.style.display;
        }
      }
      return (field.errorElements = [errorClassElement, errorTextElement]);
    }

    function _showError(field) {
      var errorElements = _getErrorElements(field);
      var errorClassElement = errorElements[0],
        errorTextElement = errorElements[1];

      var input = field.input;

      var inputId =
        input.id || Math.floor(new Date().valueOf() * Math.random());
      var errorId = 'error-' + inputId;

      if (errorClassElement) {
        errorClassElement.classList.remove(self.config.successClass);
        errorClassElement.classList.add(self.config.errorClass);
        input.setAttribute('aria-describedby', errorId);
        input.setAttribute('aria-invalid', 'true');
      }
      if (errorTextElement) {
        errorTextElement.setAttribute('id', errorId);
        errorTextElement.setAttribute('role', 'alert');
        errorTextElement.innerHTML = field.errors.join('<br/>');
        errorTextElement.style.display = errorTextElement.pristineDisplay || '';
      }
    }

    /***
     * Adds error to a specific field
     * @param input
     * @param error
     */
    self.addError = function (input, error) {
      input = input.length ? input[0] : input;
      input.pristine.errors.push(error);
      _showError(input.pristine);
    };

    function _removeError(field) {
      var errorElements = _getErrorElements(field);
      var errorClassElement = errorElements[0],
        errorTextElement = errorElements[1];
      var input = field.input;

      if (errorClassElement) {
        // IE > 9 doesn't support multiple class removal
        errorClassElement.classList.remove(self.config.errorClass);
        errorClassElement.classList.remove(self.config.successClass);
        input.removeAttribute('aria-describedby');
        input.removeAttribute('aria-invalid');
      }
      if (errorTextElement) {
        errorTextElement.removeAttribute('id');
        errorTextElement.removeAttribute('role');
        errorTextElement.innerHTML = '';
        errorTextElement.style.display = 'none';
      }
      return errorElements;
    }

    function _showSuccess(field) {
      var errorClassElement = _removeError(field)[0];
      errorClassElement &&
        errorClassElement.classList.add(self.config.successClass);
    }

    /***
     * Resets the errors
     */
    self.reset = function () {
      for (var i = 0; self.fields[i]; i++) {
        self.fields[i].errorElements = null;
      }
      Array.from(self.form.querySelectorAll('.' + PRISTINE_ERROR)).map(
        function (elem) {
          elem.parentNode.removeChild(elem);
        }
      );
      Array.from(self.form.querySelectorAll('.' + self.config.classTo)).map(
        function (elem) {
          elem.classList.remove(self.config.successClass);
          elem.classList.remove(self.config.errorClass);
        }
      );
    };

    /***
     * Resets the errors and deletes all pristine fields
     */
    self.destroy = function () {
      self.reset();
      self.fields.forEach(function (field) {
        delete field.input.pristine;
      });
      self.fields = [];
    };

    self.setGlobalConfig = function (config) {
      defaultConfig = config;
    };

    return self;
  }

  /***
   *
   * @param name => Name of the global validator
   * @param fn => validator function
   * @param msg => message to show when validation fails. Supports templating. ${0} for the input's value, ${1} and
   * so on are for the attribute values
   * @param priority => priority of the validator function, higher valued function gets called first.
   * @param halt => whether validation should stop for this field after current validation function
   */
  Pristine.addValidator = function (name, fn, msg, priority, halt) {
    _(name, { fn: fn, msg: msg, priority: priority, halt: halt });
  };

  Pristine.addMessages = function (locale, messages) {
    var langObj = lang.hasOwnProperty(locale)
      ? lang[locale]
      : (lang[locale] = {});

    Object.keys(messages).forEach(function (key, index) {
      langObj[key] = messages[key];
    });
  };

  Pristine.setLocale = function (locale) {
    currentLocale = locale;
  };

  return Pristine;
});

// Masonry Layout
/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!(function (t, e) {
  'function' == typeof define && define.amd
    ? define('jquery-bridget/jquery-bridget', ['jquery'], function (i) {
        return e(t, i);
      })
    : 'object' == typeof module && module.exports
    ? (module.exports = e(t, require('jquery')))
    : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
  'use strict';
  function i(i, r, a) {
    function h(t, e, n) {
      var o,
        r = '$().' + i + '("' + e + '")';
      return (
        t.each(function (t, h) {
          var u = a.data(h, i);
          if (!u)
            return void s(
              i + ' not initialized. Cannot call methods, i.e. ' + r
            );
          var d = u[e];
          if (!d || '_' == e.charAt(0))
            return void s(r + ' is not a valid method');
          var l = d.apply(u, n);
          o = void 0 === o ? l : o;
        }),
        void 0 !== o ? o : t
      );
    }
    function u(t, e) {
      t.each(function (t, n) {
        var o = a.data(n, i);
        o ? (o.option(e), o._init()) : ((o = new r(n, e)), a.data(n, i, o));
      });
    }
    (a = a || e || t.jQuery),
      a &&
        (r.prototype.option ||
          (r.prototype.option = function (t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function (t) {
          if ('string' == typeof t) {
            var e = o.call(arguments, 1);
            return h(this, t, e);
          }
          return u(this, t), this;
        }),
        n(a));
  }
  function n(t) {
    !t || (t && t.bridget) || (t.bridget = i);
  }
  var o = Array.prototype.slice,
    r = t.console,
    s =
      'undefined' == typeof r
        ? function () {}
        : function (t) {
            r.error(t);
          };
  return n(e || t.jQuery), i;
}),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('ev-emitter/ev-emitter', e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })('undefined' != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {}),
            n = (i[t] = i[t] || {});
          return (n[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var n = this._onceEvents && this._onceEvents[t], o = 0;
            o < i.length;
            o++
          ) {
            var r = i[o],
              s = n && n[r];
            s && (this.off(t, r), delete n[r]), r.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define('get-size/get-size', e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    'use strict';
    function t(t) {
      var e = parseFloat(t),
        i = -1 == t.indexOf('%') && !isNaN(e);
      return i && e;
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0;
        u > e;
        e++
      ) {
        var i = h[e];
        t[i] = 0;
      }
      return t;
    }
    function n(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          a(
            'Style returned ' +
              e +
              '. Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1'
          ),
        e
      );
    }
    function o() {
      if (!d) {
        d = !0;
        var e = document.createElement('div');
        (e.style.width = '200px'),
          (e.style.padding = '1px 2px 3px 4px'),
          (e.style.borderStyle = 'solid'),
          (e.style.borderWidth = '1px 2px 3px 4px'),
          (e.style.boxSizing = 'border-box');
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var o = n(e);
        (s = 200 == Math.round(t(o.width))),
          (r.isBoxSizeOuter = s),
          i.removeChild(e);
      }
    }
    function r(e) {
      if (
        (o(),
        'string' == typeof e && (e = document.querySelector(e)),
        e && 'object' == typeof e && e.nodeType)
      ) {
        var r = n(e);
        if ('none' == r.display) return i();
        var a = {};
        (a.width = e.offsetWidth), (a.height = e.offsetHeight);
        for (
          var d = (a.isBorderBox = 'border-box' == r.boxSizing), l = 0;
          u > l;
          l++
        ) {
          var c = h[l],
            f = r[c],
            m = parseFloat(f);
          a[c] = isNaN(m) ? 0 : m;
        }
        var p = a.paddingLeft + a.paddingRight,
          g = a.paddingTop + a.paddingBottom,
          y = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          z = a.borderTopWidth + a.borderBottomWidth,
          E = d && s,
          b = t(r.width);
        b !== !1 && (a.width = b + (E ? 0 : p + _));
        var x = t(r.height);
        return (
          x !== !1 && (a.height = x + (E ? 0 : g + z)),
          (a.innerWidth = a.width - (p + _)),
          (a.innerHeight = a.height - (g + z)),
          (a.outerWidth = a.width + y),
          (a.outerHeight = a.height + v),
          a
        );
      }
    }
    var s,
      a =
        'undefined' == typeof console
          ? e
          : function (t) {
              console.error(t);
            },
      h = [
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'marginLeft',
        'marginRight',
        'marginTop',
        'marginBottom',
        'borderLeftWidth',
        'borderRightWidth',
        'borderTopWidth',
        'borderBottomWidth',
      ],
      u = h.length,
      d = !1;
    return r;
  }),
  (function (t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define('desandro-matches-selector/matches-selector', e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    'use strict';
    var t = (function () {
      var t = window.Element.prototype;
      if (t.matches) return 'matches';
      if (t.matchesSelector) return 'matchesSelector';
      for (var e = ['webkit', 'moz', 'ms', 'o'], i = 0; i < e.length; i++) {
        var n = e[i],
          o = n + 'MatchesSelector';
        if (t[o]) return o;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define(
          'fizzy-ui-utils/utils',
          ['desandro-matches-selector/matches-selector'],
          function (i) {
            return e(t, i);
          }
        )
      : 'object' == typeof module && module.exports
      ? (module.exports = e(t, require('desandro-matches-selector')))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {};
    (i.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (i.modulo = function (t, e) {
        return ((t % e) + e) % e;
      });
    var n = Array.prototype.slice;
    (i.makeArray = function (t) {
      if (Array.isArray(t)) return t;
      if (null === t || void 0 === t) return [];
      var e = 'object' == typeof t && 'number' == typeof t.length;
      return e ? n.call(t) : [t];
    }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return 'string' == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = 'on' + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var o = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!n) return void o.push(t);
              e(t, n) && o.push(t);
              for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                o.push(i[r]);
            }
          }),
          o
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        i = i || 100;
        var n = t.prototype[e],
          o = e + 'Timeout';
        t.prototype[e] = function () {
          var t = this[o];
          clearTimeout(t);
          var e = arguments,
            r = this;
          this[o] = setTimeout(function () {
            n.apply(r, e), delete r[o];
          }, i);
        };
      }),
      (i.docReady = function (t) {
        var e = document.readyState;
        'complete' == e || 'interactive' == e
          ? setTimeout(t)
          : document.addEventListener('DOMContentLoaded', t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + '-' + i;
          })
          .toLowerCase();
      });
    var o = t.console;
    return (
      (i.htmlInit = function (e, n) {
        i.docReady(function () {
          var r = i.toDashed(n),
            s = 'data-' + r,
            a = document.querySelectorAll('[' + s + ']'),
            h = document.querySelectorAll('.js-' + r),
            u = i.makeArray(a).concat(i.makeArray(h)),
            d = s + '-options',
            l = t.jQuery;
          u.forEach(function (t) {
            var i,
              r = t.getAttribute(s) || t.getAttribute(d);
            try {
              i = r && JSON.parse(r);
            } catch (a) {
              return void (
                o &&
                o.error('Error parsing ' + s + ' on ' + t.className + ': ' + a)
              );
            }
            var h = new e(t, i);
            l && l.data(t, n, h);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define(
          'outlayer/item',
          ['ev-emitter/ev-emitter', 'get-size/get-size'],
          e
        )
      : 'object' == typeof module && module.exports
      ? (module.exports = e(require('ev-emitter'), require('get-size')))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
  })(window, function (t, e) {
    'use strict';
    function i(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function n(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function o(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return '-' + t.toLowerCase();
      });
    }
    var r = document.documentElement.style,
      s = 'string' == typeof r.transition ? 'transition' : 'WebkitTransition',
      a = 'string' == typeof r.transform ? 'transform' : 'WebkitTransform',
      h = {
        WebkitTransition: 'webkitTransitionEnd',
        transition: 'transitionend',
      }[s],
      u = {
        transform: a,
        transition: s,
        transitionDuration: s + 'Duration',
        transitionProperty: s + 'Property',
        transitionDelay: s + 'Delay',
      },
      d = (n.prototype = Object.create(t.prototype));
    (d.constructor = n),
      (d._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: 'absolute' });
      }),
      (d.handleEvent = function (t) {
        var e = 'on' + t.type;
        this[e] && this[e](t);
      }),
      (d.getSize = function () {
        this.size = e(this.element);
      }),
      (d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var n = u[i] || i;
          e[n] = t[i];
        }
      }),
      (d.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption('originLeft'),
          i = this.layout._getOption('originTop'),
          n = t[e ? 'left' : 'right'],
          o = t[i ? 'top' : 'bottom'],
          r = parseFloat(n),
          s = parseFloat(o),
          a = this.layout.size;
        -1 != n.indexOf('%') && (r = (r / 100) * a.width),
          -1 != o.indexOf('%') && (s = (s / 100) * a.height),
          (r = isNaN(r) ? 0 : r),
          (s = isNaN(s) ? 0 : s),
          (r -= e ? a.paddingLeft : a.paddingRight),
          (s -= i ? a.paddingTop : a.paddingBottom),
          (this.position.x = r),
          (this.position.y = s);
      }),
      (d.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption('originLeft'),
          n = this.layout._getOption('originTop'),
          o = i ? 'paddingLeft' : 'paddingRight',
          r = i ? 'left' : 'right',
          s = i ? 'right' : 'left',
          a = this.position.x + t[o];
        (e[r] = this.getXValue(a)), (e[s] = '');
        var h = n ? 'paddingTop' : 'paddingBottom',
          u = n ? 'top' : 'bottom',
          d = n ? 'bottom' : 'top',
          l = this.position.y + t[h];
        (e[u] = this.getYValue(l)),
          (e[d] = ''),
          this.css(e),
          this.emitEvent('layout', [this]);
      }),
      (d.getXValue = function (t) {
        var e = this.layout._getOption('horizontal');
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + '%'
          : t + 'px';
      }),
      (d.getYValue = function (t) {
        var e = this.layout._getOption('horizontal');
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + '%'
          : t + 'px';
      }),
      (d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          n = this.position.y,
          o = t == this.position.x && e == this.position.y;
        if ((this.setPosition(t, e), o && !this.isTransitioning))
          return void this.layoutPosition();
        var r = t - i,
          s = e - n,
          a = {};
        (a.transform = this.getTranslate(r, s)),
          this.transition({
            to: a,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (d.getTranslate = function (t, e) {
        var i = this.layout._getOption('originLeft'),
          n = this.layout._getOption('originTop');
        return (
          (t = i ? t : -t),
          (e = n ? e : -e),
          'translate3d(' + t + 'px, ' + e + 'px, 0)'
        );
      }),
      (d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (d.moveTo = d._transitionTo),
      (d.setPosition = function (t, e) {
        (this.position.x = parseFloat(t)), (this.position.y = parseFloat(e));
      }),
      (d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var n = this.element.offsetHeight;
          n = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var l = 'opacity,' + o(a);
    (d.enableTransition = function () {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration;
        (t = 'number' == typeof t ? t + 'ms' : t),
          this.css({
            transitionProperty: l,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(h, this, !1);
      }
    }),
      (d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (d.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var c = { '-webkit-transform': 'transform' };
    (d.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          n = c[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[n],
          i(e.ingProperties) && this.disableTransition(),
          n in e.clean &&
            ((this.element.style[t.propertyName] = ''), delete e.clean[n]),
          n in e.onEnd)
        ) {
          var o = e.onEnd[n];
          o.call(this), delete e.onEnd[n];
        }
        this.emitEvent('transitionEnd', [this]);
      }
    }),
      (d.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(h, this, !1),
          (this.isTransitioning = !1);
      }),
      (d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = '';
        this.css(e);
      });
    var f = {
      transitionProperty: '',
      transitionDuration: '',
      transitionDelay: '',
    };
    return (
      (d.removeTransitionStyles = function () {
        this.css(f);
      }),
      (d.stagger = function (t) {
        (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + 'ms');
      }),
      (d.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: '' }),
          this.emitEvent('remove', [this]);
      }),
      (d.remove = function () {
        return s && parseFloat(this.layout.options.transitionDuration)
          ? (this.once('transitionEnd', function () {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (d.reveal = function () {
        delete this.isHidden, this.css({ display: '' });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty('visibleStyle');
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent('reveal');
      }),
      (d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return 'opacity';
        for (var i in e) return i;
      }),
      (d.hide = function () {
        (this.isHidden = !0), this.css({ display: '' });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty('hiddenStyle');
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: 'none' }), this.emitEvent('hide'));
      }),
      (d.destroy = function () {
        this.css({
          position: '',
          left: '',
          right: '',
          top: '',
          bottom: '',
          transition: '',
          transform: '',
        });
      }),
      n
    );
  }),
  (function (t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(
          'outlayer/outlayer',
          [
            'ev-emitter/ev-emitter',
            'get-size/get-size',
            'fizzy-ui-utils/utils',
            './item',
          ],
          function (i, n, o, r) {
            return e(t, i, n, o, r);
          }
        )
      : 'object' == typeof module && module.exports
      ? (module.exports = e(
          t,
          require('ev-emitter'),
          require('get-size'),
          require('fizzy-ui-utils'),
          require('./item')
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, n, o) {
    'use strict';
    function r(t, e) {
      var i = n.getQueryElement(t);
      if (!i)
        return void (
          h &&
          h.error(
            'Bad element for ' + this.constructor.namespace + ': ' + (i || t)
          )
        );
      (this.element = i),
        u && (this.$element = u(this.element)),
        (this.options = n.extend({}, this.constructor.defaults)),
        this.option(e);
      var o = ++l;
      (this.element.outlayerGUID = o), (c[o] = this), this._create();
      var r = this._getOption('initLayout');
      r && this.layout();
    }
    function s(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    function a(t) {
      if ('number' == typeof t) return t;
      var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        n = e && e[2];
      if (!i.length) return 0;
      i = parseFloat(i);
      var o = m[n] || 1;
      return i * o;
    }
    var h = t.console,
      u = t.jQuery,
      d = function () {},
      l = 0,
      c = {};
    (r.namespace = 'outlayer'),
      (r.Item = o),
      (r.defaults = {
        containerStyle: { position: 'relative' },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: '0.4s',
        hiddenStyle: { opacity: 0, transform: 'scale(0.001)' },
        visibleStyle: { opacity: 1, transform: 'scale(1)' },
      });
    var f = r.prototype;
    n.extend(f, e.prototype),
      (f.option = function (t) {
        n.extend(this.options, t);
      }),
      (f._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (r.compatOptions = {
        initLayout: 'isInitLayout',
        horizontal: 'isHorizontal',
        layoutInstant: 'isLayoutInstant',
        originLeft: 'isOriginLeft',
        originTop: 'isOriginTop',
        resize: 'isResizeBound',
        resizeContainer: 'isResizingContainer',
      }),
      (f._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption('resize');
        t && this.bindResize();
      }),
      (f.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (f._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            n = [],
            o = 0;
          o < e.length;
          o++
        ) {
          var r = e[o],
            s = new i(r, this);
          n.push(s);
        }
        return n;
      }),
      (f._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (f.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (f.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption('layoutInstant'),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (f._init = f.layout),
      (f._resetLayout = function () {
        this.getSize();
      }),
      (f.getSize = function () {
        this.size = i(this.element);
      }),
      (f._getMeasurement = function (t, e) {
        var n,
          o = this.options[t];
        o
          ? ('string' == typeof o
              ? (n = this.element.querySelector(o))
              : o instanceof HTMLElement && (n = o),
            (this[t] = n ? i(n)[e] : o))
          : (this[t] = 0);
      }),
      (f.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (f._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (f._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems('layout', t), t && t.length)) {
          var i = [];
          t.forEach(function (t) {
            var n = this._getItemLayoutPosition(t);
            (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (f._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (f._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
          }, this);
      }),
      (f.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t
          ? void (this.stagger = 0)
          : ((this.stagger = a(t)), this.stagger);
      }),
      (f._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
      }),
      (f._postLayout = function () {
        this.resizeContainer();
      }),
      (f.resizeContainer = function () {
        var t = this._getOption('resizeContainer');
        if (t) {
          var e = this._getContainerSize();
          e &&
            (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1));
        }
      }),
      (f._getContainerSize = d),
      (f._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? 'width' : 'height'] = t + 'px');
        }
      }),
      (f._emitCompleteOnItems = function (t, e) {
        function i() {
          o.dispatchEvent(t + 'Complete', null, [e]);
        }
        function n() {
          s++, s == r && i();
        }
        var o = this,
          r = e.length;
        if (!e || !r) return void i();
        var s = 0;
        e.forEach(function (e) {
          e.once(t, n);
        });
      }),
      (f.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), u))
          if (((this.$element = this.$element || u(this.element)), e)) {
            var o = u.Event(e);
            (o.type = t), this.$element.trigger(o, i);
          } else this.$element.trigger(t, i);
      }),
      (f.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (f.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (f.stamp = function (t) {
        (t = this._find(t)),
          t &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this));
      }),
      (f.unstamp = function (t) {
        (t = this._find(t)),
          t &&
            t.forEach(function (t) {
              n.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
      }),
      (f._find = function (t) {
        return t
          ? ('string' == typeof t && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t)))
          : void 0;
      }),
      (f._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (f._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (f._manageStamp = d),
      (f._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          n = this._boundingRect,
          o = i(t),
          r = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom,
          };
        return r;
      }),
      (f.handleEvent = n.handleEvent),
      (f.bindResize = function () {
        t.addEventListener('resize', this), (this.isResizeBound = !0);
      }),
      (f.unbindResize = function () {
        t.removeEventListener('resize', this), (this.isResizeBound = !1);
      }),
      (f.onresize = function () {
        this.resize();
      }),
      n.debounceMethod(r, 'onresize', 100),
      (f.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (f.needsResizeLayout = function () {
        var t = i(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (f.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (f.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (f.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (f.reveal = function (t) {
        if ((this._emitCompleteOnItems('reveal', t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.reveal();
          });
        }
      }),
      (f.hide = function (t) {
        if ((this._emitCompleteOnItems('hide', t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.hide();
          });
        }
      }),
      (f.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (f.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (f.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (f.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (f.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems('remove', e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), n.removeFrom(this.items, t);
            }, this);
      }),
      (f.destroy = function () {
        var t = this.element.style;
        (t.height = ''),
          (t.position = ''),
          (t.width = ''),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e],
          delete this.element.outlayerGUID,
          u && u.removeData(this.element, this.constructor.namespace);
      }),
      (r.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e];
      }),
      (r.create = function (t, e) {
        var i = s(r);
        return (
          (i.defaults = n.extend({}, r.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, r.compatOptions)),
          (i.namespace = t),
          (i.data = r.data),
          (i.Item = s(o)),
          n.htmlInit(i, t),
          u && u.bridget && u.bridget(t, i),
          i
        );
      });
    var m = { ms: 1, s: 1e3 };
    return (r.Item = o), r;
  }),
  (function (t, e) {
    'function' == typeof define && define.amd
      ? define(['outlayer/outlayer', 'get-size/get-size'], e)
      : 'object' == typeof module && module.exports
      ? (module.exports = e(require('outlayer'), require('get-size')))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, e) {
    var i = t.create('masonry');
    i.compatOptions.fitWidth = 'isFitWidth';
    var n = i.prototype;
    return (
      (n._resetLayout = function () {
        this.getSize(),
          this._getMeasurement('columnWidth', 'outerWidth'),
          this._getMeasurement('gutter', 'outerWidth'),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        (this.maxY = 0), (this.horizontalColIndex = 0);
      }),
      (n.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var n = (this.columnWidth += this.gutter),
          o = this.containerWidth + this.gutter,
          r = o / n,
          s = n - (o % n),
          a = s && 1 > s ? 'round' : 'floor';
        (r = Math[a](r)), (this.cols = Math.max(r, 1));
      }),
      (n.getContainerWidth = function () {
        var t = this._getOption('fitWidth'),
          i = t ? this.element.parentNode : this.element,
          n = e(i);
        this.containerWidth = n && n.innerWidth;
      }),
      (n._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = e && 1 > e ? 'round' : 'ceil',
          n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (
          var o = this.options.horizontalOrder
              ? '_getHorizontalColPosition'
              : '_getTopColPosition',
            r = this[o](n, t),
            s = { x: this.columnWidth * r.col, y: r.y },
            a = r.y + t.size.outerHeight,
            h = n + r.col,
            u = r.col;
          h > u;
          u++
        )
          this.colYs[u] = a;
        return s;
      }),
      (n._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t),
          i = Math.min.apply(Math, e);
        return { col: e.indexOf(i), y: i };
      }),
      (n._getTopColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++)
          e[n] = this._getColGroupY(n, t);
        return e;
      }),
      (n._getColGroupY = function (t, e) {
        if (2 > e) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i);
      }),
      (n._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols,
          n = t > 1 && i + t > this.cols;
        i = n ? 0 : i;
        var o = e.size.outerWidth && e.size.outerHeight;
        return (
          (this.horizontalColIndex = o ? i + t : this.horizontalColIndex),
          { col: i, y: this._getColGroupY(i, t) }
        );
      }),
      (n._manageStamp = function (t) {
        var i = e(t),
          n = this._getElementOffset(t),
          o = this._getOption('originLeft'),
          r = o ? n.left : n.right,
          s = r + i.outerWidth,
          a = Math.floor(r / this.columnWidth);
        a = Math.max(0, a);
        var h = Math.floor(s / this.columnWidth);
        (h -= s % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
        for (
          var u = this._getOption('originTop'),
            d = (u ? n.top : n.bottom) + i.outerHeight,
            l = a;
          h >= l;
          l++
        )
          this.colYs[l] = Math.max(d, this.colYs[l]);
      }),
      (n._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption('fitWidth') &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (n._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (n.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  });

// Functions
/*!
 * NioApp v1.0.0 (https://softnio.com/)
 * Developed by Softnio Team.
 * Copyright by Softnio.
 */
var NioApp = (function (win, doc) {
  'use strict';
  var NioApp = {
    AppInfo: {
      name: 'NioApp',
      version: '1.0.0',
      author: 'Softnio',
    },
    Package: {
      name: 'CopyGen',
      version: '1.1.0',
    },
  };

  function docReady(callback) {
    document.addEventListener('DOMContentLoaded', callback, false);
  }

  function winLoad(callback) {
    window.addEventListener('load', callback, false);
  }

  function onResize(callback, selector) {
    selector = typeof selector === typeof undefined ? window : selector;
    selector.addEventListener('resize', callback);
  }

  NioApp.docReady = docReady;
  NioApp.winLoad = winLoad;
  NioApp.onResize = onResize;

  return NioApp;
})(window, document);

NioApp = (function (NioApp) {
  'use strict';

  //Get Value For Custom PropertyValue  @v1.0

  // Global Uses @v1.0
  /////////////////////////////
  NioApp.BS = {};
  NioApp.Addons = {};
  NioApp.Custom = {};
  NioApp.Toggle = {};
  NioApp.body = document.querySelector('body');
  NioApp.Win = { height: window.innerHeight, width: window.innerWidth };
  NioApp.Break = {
    mb: 420,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
    any: Infinity,
  };

  // State @v1.0
  NioApp.State = {
    isRTL:
      NioApp.body.classList.contains('has-rtl') ||
      NioApp.body.getAttribute('dir') === 'rtl'
        ? true
        : false,
    isTouch: 'ontouchstart' in document.documentElement ? true : false,
    isMobile: navigator.userAgent.match(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|/i
    )
      ? true
      : false,
    asMobile: NioApp.Win.width < NioApp.Break.md ? true : false,
  };

  // State Update @v1.1
  NioApp.StateUpdate = function () {
    NioApp.Win = { height: window.innerHeight, width: window.innerWidth };
    NioApp.State.asMobile = NioApp.Win.width < NioApp.Break.md ? true : false;
  };

  ///////////////////////////////
  //Functions 1.0
  /////////////////////////////

  //slide up
  NioApp.SlideUp = function (target, duration = 500) {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  //side down
  NioApp.SlideDown = function (target, duration = 500) {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  //slide toggle
  NioApp.SlideToggle = function (target, duration = 500) {
    if (window.getComputedStyle(target).display === 'none') {
      return NioApp.SlideDown(target, duration);
    } else {
      return NioApp.SlideUp(target, duration);
    }
  };

  //get parent Elements
  NioApp.getParents = function (el, selector, filter) {
    // If no selector defined will bubble up all the way to *document*
    let parentSelector =
      selector === undefined ? document : document.querySelector(selector);
    var parents = [];
    var pNode = el.parentNode;

    while (pNode !== parentSelector) {
      var element = pNode;

      if (filter === undefined) {
        parents.push(element); // Push that parentSelector you wanted to stop at
      } else {
        element.classList.contains(filter) && parents.push(element);
      }
      pNode = element.parentNode;
    }

    return parents;
  };

  //Extend Object
  NioApp.extendObject = function (obj, ext) {
    Object.keys(ext).forEach(function (key) {
      obj[key] = ext[key];
    });
    return obj;
  };

  ///////////////////////////////
  // Initial by default
  /////////////////////////////
  NioApp.onResize(NioApp.StateUpdate);

  return NioApp;
})(NioApp);

!(function (NioApp) {
  'use strict';

  /* Custom Menu (sidebar/header) */
  let nav = {
    classes: {
      main: 'nk-menu',
      item: 'nk-menu-item',
      link: 'nk-menu-link',
      toggle: 'nk-menu-toggle',
      dropdown: 'nk-menu-dropdown',
      dropdownparent: 'has-dropdown',
      active: 'active',
      current: 'current-page',
    },
  };

  NioApp.Dropdown = {
    load: function (elm, dropdownparent) {
      let parent = elm.parentElement;
      if (!parent.classList.contains(dropdownparent)) {
        parent.classList.add(dropdownparent);
      }
    },
    toggle: function (elm, active) {
      let parent = elm.parentElement;
      let nextelm = elm.nextElementSibling;
      let speed =
        nextelm.children.length > 5 ? 400 + nextelm.children.length * 10 : 400;
      if (!parent.classList.contains(active)) {
        parent.classList.add(active);
        NioApp.SlideDown(nextelm, speed);
      } else {
        parent.classList.remove(active);
        NioApp.SlideUp(nextelm, speed);
      }
    },
    closeSiblings: function (elm, active, dropdownparent, submenu) {
      let parent = elm.parentElement;
      let siblings = parent.parentElement.children;
      Array.from(siblings).forEach((item) => {
        if (item !== parent) {
          item.classList.remove(active);
          if (item.classList.contains(dropdownparent)) {
            let subitem = item.querySelectorAll(`.${submenu}`);
            subitem.forEach((child) => {
              child.parentElement.classList.remove(active);
              NioApp.SlideUp(child, 400);
            });
          }
        }
      });
    },
  };

  NioApp.Dropdown.header = function (selector) {
    const elm = document.querySelectorAll(selector);
    let active = nav.classes.active;
    let dropdownparent = nav.classes.dropdownparent;
    let dropdownmenu = nav.classes.dropdown;
    let menuCollapse = NioApp.body.dataset.menuCollapse
      ? NioApp.Break[NioApp.body.dataset.menuCollapse]
      : NioApp.Break.lg;
    elm.forEach((item) => {
      NioApp.Dropdown.load(item, dropdownparent);
      item.addEventListener('click', function (e) {
        e.preventDefault();
        if (NioApp.Win.width < menuCollapse) {
          NioApp.Dropdown.toggle(item, active);
          NioApp.Dropdown.closeSiblings(
            item,
            active,
            dropdownparent,
            dropdownmenu
          );
        }
      });
    });
  };

  /* Custom Header Menu */
  let header = {
    classes: {
      root: 'nk-header-main',
      base: 'nk-header-menu',
      toggle: 'header-menu-toggle',
      toggleActive: 'active',
      active: 'header-menu-active',
      overlay: 'header-menu-overlay',
      body: 'header-menu-shown',
    },
    break: {
      main: NioApp.body.dataset.menuCollapse
        ? NioApp.Break[NioApp.body.dataset.menuCollapse]
        : NioApp.Break.lg,
    },
  };

  NioApp.Navbar = {
    show: function (toggle, target) {
      toggle.forEach((toggleItem) => {
        toggleItem.classList.add(header.classes.toggleActive);
      });
      target.classList.add(header.classes.active);
      NioApp.body.classList.add(header.classes.body);
      let overalyTemplate = `<div class='${header.classes.overlay}'></div>`;
      target.insertAdjacentHTML('beforebegin', overalyTemplate);
    },
    hide: function (toggle, target) {
      toggle.forEach((toggleItem) => {
        toggleItem.classList.remove(header.classes.toggleActive);
      });
      target.classList.remove(header.classes.active);
      NioApp.body.classList.remove(header.classes.body);
      let overlay = document.querySelector(`.${header.classes.overlay}`);
      setTimeout(() => {
        overlay && overlay.remove();
      }, 400);
    },
    mobile: function (target) {
      if (header.break.main < NioApp.Win.width) {
        target.classList.remove('menu-mobile');
      } else {
        setTimeout(() => {
          target.classList.add('menu-mobile');
        }, 500);
      }
    },
    sticky: function (target) {
      let elem = document.querySelectorAll(target);
      if (elem.length > 0) {
        elem.forEach((item) => {
          let _item_offset = item.offsetTop;

          window.addEventListener('scroll', function () {
            if (window.scrollY > _item_offset) {
              item.classList.add('has-fixed');
            } else {
              item.classList.remove('has-fixed');
            }
          });
        });
      }
    },
    height: function (target) {
      let elem = document.querySelectorAll(target);
      if (elem.length > 0) {
        elem.forEach((item) => {
          document
            .querySelector('html')
            .style.setProperty(
              '--header-main-height',
              `${item.offsetHeight}px`
            );
        });
      }
    },
  };
  NioApp.Navbar.init = function () {
    let targetSl = document.querySelector(`.${header.classes.base}`);
    let toggleSl = document.querySelectorAll(`.${header.classes.toggle}`);
    toggleSl.forEach((item) => {
      NioApp.Navbar.mobile(targetSl);
      item.addEventListener('click', function (e) {
        e.preventDefault();
        if (header.break.main > NioApp.Win.width) {
          if (!targetSl.classList.contains(header.classes.active)) {
            NioApp.Navbar.show(toggleSl, targetSl);
          } else {
            NioApp.Navbar.hide(toggleSl, targetSl);
          }
        }
      });

      window.addEventListener('resize', function (e) {
        if (header.break.main < NioApp.Win.width) {
          NioApp.Navbar.hide(toggleSl, targetSl);
        }
        NioApp.Navbar.mobile(targetSl);
      });

      document.addEventListener('mouseup', function (e) {
        if (e.target.closest(`.${header.classes.base}`) === null) {
          NioApp.Navbar.hide(toggleSl, targetSl);
        }
      });
    });
    NioApp.Navbar.sticky(`.nk-header .${header.classes.root}`);

    window.addEventListener('scroll', function () {
      NioApp.Navbar.height(`.nk-header .${header.classes.root}`);
    });

    window.addEventListener('resize', function () {
      NioApp.Navbar.height(`.nk-header .${header.classes.root}`);
    });
  };

  /* Add some class to current link */
  NioApp.CurrentLink = function (
    selector,
    parent,
    submenu,
    base,
    active,
    intoView
  ) {
    let elm = document.querySelectorAll(selector);
    let currentURL = document.location.href,
      removeHash = currentURL.substring(
        0,
        currentURL.indexOf('#') == -1
          ? currentURL.length
          : currentURL.indexOf('#')
      ),
      removeQuery = removeHash.substring(
        0,
        removeHash.indexOf('?') == -1
          ? removeHash.length
          : removeHash.indexOf('?')
      ),
      fileName = removeQuery;

    elm.forEach(function (item) {
      var selfLink = item.getAttribute('href');
      if (fileName.match(selfLink)) {
        let parents = NioApp.getParents(item, `.${base}`, parent);
        parents.forEach((parentElemets) => {
          parentElemets.classList.add(...active);
          let subItem = parentElemets.querySelector(`.${submenu}`);
          subItem !== null && (subItem.style.display = 'block');
        });
        intoView && item.scrollIntoView({ block: 'end' });
      } else {
        item.parentElement.classList.remove(...active);
      }
    });
  };

  /* Swiper slider */
  NioApp.Addons.swiperCarousel = function (selector) {
    let elem = document.querySelectorAll(selector);
    if (elem.length > 0) {
      elem.forEach((item) => {
        let _breakpoints = item.dataset.breakpoints
          ? JSON.parse(item.dataset.breakpoints)
          : null;
        let _autoplay = item.dataset.autoplay
          ? JSON.parse(item.dataset.autoplay)
          : false;
        let _loop = item.dataset.loop ? JSON.parse(item.dataset.loop) : false;
        let _centeredSlides = item.dataset.centeredslides
          ? JSON.parse(item.dataset.centeredslides)
          : false;
        let _slidesPerView = item.dataset.slidesperview
          ? item.dataset.slidesperview
          : 1;
        let _speed = item.dataset.speed ? parseInt(item.dataset.speed) : 900;
        let _spaceBetween = item.dataset.spaceBetween
          ? parseInt(item.dataset.spaceBetween)
          : 0;
        let _effect = item.dataset.effect ? item.dataset.effect : 'slide';
        console.log(
          _breakpoints,
          _autoplay,
          _loop,
          _centeredSlides,
          _slidesPerView,
          _speed,
          _spaceBetween,
          _effect
        );
        const swiper = new Swiper(item, {
          centeredSlides: _centeredSlides,
          slidesPerView: _slidesPerView,
          loop: _loop,
          speed: _speed,
          autoplay: _autoplay,
          spaceBetween: _spaceBetween,
          effect: _effect,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          },
          navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
            clickable: true,
          },
          breakpoints: _breakpoints,
        });
      });
    }
  };

  /* typed text rotator */
  NioApp.Addons.typed = function (selector) {
    let elem = document.querySelectorAll(selector);
    if (elem.length > 0) {
      elem.forEach((item) => {
        console.log();
        let strings = JSON.parse('[' + item.dataset.strings + ']');
        new Typed(item, {
          strings: strings,
          typeSpeed: 100,
          backSpeed: 0,
          backDelay: 1000,
          startDelay: 0,
          loop: true,
        });
      });
    }
  };

  /* Pristine - Form Validation */
  NioApp.Addons.pristine = function (elem, live) {
    let config = {
      parent: 'form-control-wrap',
      error: 'form-error',
      success: 'form-sucess',
      message: 'form-error-message',
      messageTag: 'span',
    };

    const pristine = new Pristine(
      elem,
      {
        classTo: config.parent,
        errorClass: config.error,
        successClass: config.success,
        errorTextParent: config.parent,
        errorTextTag: config.messageTag,
        errorTextClass: config.message,
      },
      live
    );

    return pristine;
  };

  /* Form Submission */
  NioApp.Custom.submitForm = function (selector) {
    let elm = document.querySelectorAll(selector);
    if (elm) {
      elm.forEach((item) => {
        const formAction = item.dataset.action;

        let formValidate = NioApp.Addons.pristine(item, true);
        item.addEventListener('submit', function (e) {
          e.preventDefault();
          let valid = formValidate.validate();
          let result = item.querySelector('.form-result');

          if (valid) {
            let data = new FormData(item);
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                let res = null;
                try {
                  res = JSON.parse(xhttp.responseText);
                } catch (e) {}
                result.classList.add('form-result-show');
                result.style.display = 'block';
                if (res) {
                  result.innerHTML = res.message;
                  if (res.result == 'success') {
                    result.classList.add('form-result-success');
                    result.classList.remove('form-result-error');
                    setTimeout(function () {
                      result.style.display = 'none';
                    }, 8000);
                  } else {
                    result.classList.add('form-result-error');
                    result.classList.remove('form-result-success');
                  }
                } else {
                  result.classList.remove('form-result-success');
                  result.classList.add('form-result-error');
                  (result.innerHTML = 'error'),
                    'Oops! There was something went wrong.';
                }
              }
            };

            xhttp.open('POST', formAction, true);
            xhttp.send(data);

            // Clear Input Field
            item.reset();
          }
        });
      });
    }
  };

  NioApp.Custom.priceToggle = function (selector) {
    let elm = document.querySelectorAll(selector);
    if (elm) {
      elm.forEach((item) => {
        item.addEventListener('click', function () {
          let parent = item.closest(`.${item.dataset.parent}`);
          let target = document.querySelectorAll(`.${item.dataset.target}`);
          console.log(target);
          parent.classList.contains('pricing-yearly')
            ? parent.classList.remove('pricing-yearly')
            : parent.classList.add('pricing-yearly');
          target.forEach((item) => {
            item.classList.contains('show-yearly')
              ? item.classList.remove('show-yearly')
              : item.classList.add('show-yearly');
          });
        });
      });
    }
  };

  NioApp.Custom.showHidePassword = function (selector) {
    let elem = document.querySelectorAll(selector);
    if (elem) {
      elem.forEach((item) => {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          let target = document.getElementById(item.getAttribute('href'));

          if (target.type == 'password') {
            target.type = 'text';
            item.classList.add('is-shown');
          } else {
            target.type = 'password';
            item.classList.remove('is-shown');
          }
        });
      });
    }
  };

  NioApp.Custom.darkmode = function (selector) {
    let elm = document.querySelectorAll(selector);
    if (elm) {
      elm.forEach((item) => {
        item.addEventListener('click', function () {
          document.body.classList.contains('is-dark')
            ? document.body.classList.remove('is-dark')
            : document.body.classList.add('is-dark');
          elm.forEach((item) => {
            item.classList.contains('dark-active')
              ? item.classList.remove('dark-active')
              : item.classList.add('dark-active');
          });
        });
      });
    }
  };

  /* Custom Scripts init */
  NioApp.Custom.init = function () {
    NioApp.Navbar.init();
    NioApp.Addons.swiperCarousel('.swiper-init');
    NioApp.Addons.typed('.type-init');
    NioApp.Custom.submitForm('.form-submit-init');
    NioApp.Custom.priceToggle('.pricing-toggle');
    NioApp.Custom.showHidePassword('.password-toggle');
    NioApp.Custom.darkmode('.dark-mode-toggle');
    NioApp.Dropdown.header(`.${nav.classes.toggle}`);
    NioApp.CurrentLink(
      `.${nav.classes.link}`,
      nav.classes.item,
      nav.classes.sub,
      nav.classes.main,
      [nav.classes.active, nav.classes.current],
      true
    );
  };

  // Initial by default
  /////////////////////////////
  NioApp.init = function () {
    NioApp.winLoad(NioApp.Custom.init);
  };
  NioApp.init();

  return NioApp;
})(NioApp);
