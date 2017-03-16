(function(a) {
    a.fn.extend({
        fixedTblHdrLftCol: function(i) {
            var k = a.extend(true, { scroll: { height: null, width: null, headRow: { className: "fTHLC-head-row", enabled: true, overflow: "auto" }, leftCol: { className: "fTHLC-left-col", enabled: true, overflow: "auto", fixedSpan: 1 }, syncWith: null }, wrapper: { outer: { idName: null, className: "fTHLC-outer-wrapper" }, inner: { idName: null, className: "fTHLC-inner-wrapper" } }, corner: { append: true, deepClone: false, outer: { idName: null, className: "fTHLC-outer-corner" }, inner: { idName: null, className: "fTHLC-inner-corner" } } }, i);
            var p = k.scroll.width;
            var z = k.scroll.height;
            var l = null;
            var h = null;

            function v(G) { var F = p; if (!F) { F = G.outerWidth(true) - B(G) } return F }

            function y(G) { var F = z; if (!F) { F = G.outerHeight(true) - r(G) } return F }

            function s(F) { return F.find("thead tr").length }

            function t(H) {
                var I = a([]);
                for (var G = 0; G < s(H); G++) {
                    var J = a([]);
                    for (var F = 0; F < k.scroll.leftCol.fixedSpan; F++) { J.push(H.find("thead tr:nth-child(" + (G + 1) + ") th:nth-child(" + (F + 1) + ")")) }
                    I.push(J)
                }
                return I
            }

            function o(G) { var H = a([]); for (var F = 0; F < s(G); F++) { H.push(G.find("thead tr:nth-child(" + (F + 1) + ") th:first-child")) } return H }

            function u(F, G) { return F.find("thead tr:nth-child(" + (G + 1) + ") th") }

            function r(G) {
                var F = h;
                if (!F) {
                    var H = o(G);
                    H.each(function() { F += a(this).outerHeight(true) });
                    h = F
                }
                return F
            }

            function w(G) { var H = a([]); for (var F = 0; F < k.scroll.leftCol.fixedSpan; F++) { H.push(G.find("tbody tr:first-child td:nth-child(" + (F + 1) + ")")) } return H }

            function B(G) {
                var F = l;
                if (!F) {
                    var H = w(G);
                    H.each(function() { F += a(this).outerWidth(true) });
                    l = F
                }
                return F
            }

            function e(G) {
                var F = 0;
                G.find("tbody tr:first-child td").each(function() { F += a(this).outerWidth(true) });
                return F
            }

            function n(F) { F.wrap(a(document.createElement("div")).attr("id", k.wrapper.outer.idName).addClass(k.wrapper.outer.className).css("width", v(F)).css("height", y(F)).css("position", "relative").css("padding-left", B(F) + "px").css("padding-top", r(F) + "px").css("overflow", "hidden")) }

            function m(F) { F.wrap(a(document.createElement("div")).attr("id", k.wrapper.inner.idName).addClass(k.wrapper.inner.className).css("overflow-x", k.scroll.headRow.overflow).css("overflow-y", k.scroll.leftCol.overflow).css("width", v(F)).css("height", y(F))) }

            function b(G) {
                var H = B(G);
                var F = e(G);
                G.css("border-collapse", "collapse").css("width", (F - H) + "px")
            }

            function q(G) {
                var H = o(G);
                var F = 0;
                H.each(function(J) {
                    var K = u(G, J);
                    var I = 0;
                    K.each(function(M) {
                        var N = a(this).outerWidth(true);
                        var L = a(this).outerHeight(true);
                        I += N;
                        if (M == 0) { F += L }
                        a(this).addClass(k.scroll.headRow.className).css("position", "absolute").css("top", (F - L) + "px").css("left", (I - N) + "px")
                    })
                })
            }

            function g(G) {
                var H = B(G);
                var F = e(G);
                G.find("tbody tr").each(function() { a(this).css("width", (F - H) + "px") })
            }

            function c(G) {
                var F = 0;
                var H = w(G);
                H.each(function(I) {
                    var J = a(this).outerWidth(true);
                    F += J;
                    G.find("tbody tr td:nth-child(" + (I + 1) + ")").addClass(k.scroll.leftCol.className).css("position", "absolute").css("left", (F - J) + "px")
                })
            }

            function j(F) {
                F.find("tbody tr").each(function() {
                    var I = 0;
                    for (var G = 0; G < k.scroll.leftCol.fixedSpan; G++) { var H = a(this).find("td:nth-child(" + (G + 1) + ")").height(); if (H > I) { I = H } }
                    a(this).find("td:nth-child(" + (k.scroll.leftCol.fixedSpan + 1) + ")").height(I);
                    a(this).hide().fadeIn(0)
                })
            }

            function A(H) {
                var G = a("<div></div>").attr("id", k.corner.outer.idName).addClass(k.corner.outer.className).css("position", "absolute").css("left", "0px").css("top", "0px").css("margin", "0").css("padding", "0").css("width", B(H) + "px").css("height", r(H) + "px");
                var F = a("<table></table>").attr("id", k.corner.inner.idName).addClass(k.corner.inner.className).css("border-collapse", "collapse");
                var J = a("<thead></thead>");
                var I = t(H);
                I.each(function() {
                    var K = a("<tr></tr>");
                    a(this).each(function() {
                        var L = a(this).clone(k.corner.deepClone);
                        a(this).removeAttr("id");
                        a(this).unbind();
                        L.appendTo(K)
                    });
                    K.appendTo(J)
                });
                J.appendTo(F);
                F.appendTo(G);
                G.appendTo(H.parent())
            }

            function E(G) {
                var F = [];
                G.find("tbody tr:first").each(function() {
                    a(this).find("td").each(function() {
                        var H = a(this).position();
                        F.push(H.left)
                    })
                });
                G.find("thead tr").each(function() { a(this).find("th").each(function(H) { a(this).css("left", F[H] + "px") }) })
            }

            function x(F) {
                c(F);
                g(F);
                q(F);
                b(F);
                n(F);
                m(F);
                j(F);
                if (k.corner.append) { A(F) }
                E(F)
            }

            function D(F) { F.find("tbody tr").each(function() { for (var G = 0; G < k.scroll.leftCol.fixedSpan; G++) { a(this).find("td:nth-child(" + (G + 1) + ")").css("top", a(this).find("td:nth-child(" + (k.scroll.leftCol.fixedSpan + 1) + ")").position().top + "px") } }) }

            function C(F) { F.find("thead tr").each(function(G) { if (G < s(F)) { a(this).find("th").each(function(H) { a(this).css("left", F.find("tbody tr:first-child td:nth-child(" + (H + 1) + ")").position().left + "px") }) } }) }

            function d(G, F) {
                F.scrollTop(G.scrollTop());
                F.scrollLeft(G.scrollLeft())
            }

            function f(F) { var G = k.scroll.syncWith; if (a.isArray(G)) { a.each(G, function() { d(F, a(this.toString()).parent()) }) } else { d(F, a(G).parent()) } }
            return this.each(function() {
                if (a(this)[0].tagName.toLowerCase() != "table") { return true }
                x(a(this));
                if (k.scroll.leftCol.enabled || k.scroll.headRow.enabled) { a(this).parent().scroll(function() { if (k.scroll.headRow.enabled) { C(a(this)) } if (k.scroll.leftCol.enabled) { D(a(this)) } if (k.scroll.syncWith) { f(a(this)) } }) }
            })
        }
    })
})(jQuery);