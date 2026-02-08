(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/ai/3d_new/src/components/layout/Navbar.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "Navbar-module__P46oVa__active",
  "cityLink": "Navbar-module__P46oVa__cityLink",
  "headerPhone": "Navbar-module__P46oVa__headerPhone",
  "logo": "Navbar-module__P46oVa__logo",
  "logoImage": "Navbar-module__P46oVa__logoImage",
  "navLink": "Navbar-module__P46oVa__navLink",
  "navLinks": "Navbar-module__P46oVa__navLinks",
  "navRight": "Navbar-module__P46oVa__navRight",
  "navbar": "Navbar-module__P46oVa__navbar",
  "phoneLink": "Navbar-module__P46oVa__phoneLink",
  "separator": "Navbar-module__P46oVa__separator",
});
}),
"[project]/Desktop/ai/3d_new/src/data/content.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"home":{"heroTitle":"Промышленная 3D печать в Санкт-Петербурге.","heroDesc":"Серийное производство деталей из пластика и нейлона. Парк из 10 скоростных 3D-принтеров Bambu Lab (X1E / P1S)."},"pricing":{"introTitle":"ПРОЗРАЧНОЕ ЦЕНООБРАЗОВАНИЕ","introText":"Мы отошли от устаревшей системы 'цена за грамм'. Вы платите за время работы высокоточного оборудования (Машино-час). Это выгоднее для крупных и тяжелых деталей.","tariffs":[{"name":"СТАНДАРТ","price":"250 ₽ / час","materials":"PLA, PETG","equipment":"Bambu Lab A1 / P1S","usage":"Декор, макеты, корпуса, проставки."},{"name":"ПРО","price":"300 ₽ / час","materials":"ABS, ASA, TPU (Flex)","equipment":"Bambu Lab P1S","usage":"Термостойкие детали, автозапчасти, резина."},{"name":"ИНЖЕНЕР","price":"400 ₽ / час","materials":"NYLON (PA), PC, CF","equipment":"Bambu Lab X1E","usage":"Шестерни, нагруженные узлы, замена металла."}]},"tech":{"introTitle":"ФЕРМА НОВОГО ПОКОЛЕНИЯ","introText":"Мы не используем самосборные принтеры. PULSE 3D — это заводское качество и повторяемость.","equipment":[{"name":"BAMBU LAB X1E (ENTERPRISE)","qty":"2 шт.","desc":"Высшая лига FDM печати. Активный подогрев камеры до 60°C.","usage":"Идеальная печать сложными усадочными пластиками (Nylon, PC). Гарантия прочности и спайки слоев.","image":"/printer_business.png"},{"name":"BAMBU LAB P1S","qty":"6 шт.","desc":"Скоростные закрытые кубы. Работают 24/7.","usage":"Основной объем заказов (ABS, PETG). Печать до 4 цветов (AMS).","image":"/auto_parts_business.png"},{"name":"BAMBU LAB A1","qty":"2 шт.","desc":"Открытые системы для экологичных пластиков.","usage":"Быстрая печать PLA/PETG. Декор, игрушки, макеты.","image":"/gear_business.png"}]},"portfolio":{"introTitle":"НАШИ КЕЙСЫ","introText":"От единичных прототипов до серийного производства. Мы работаем с инженерами, дизайнерами и производственниками.","works":[{"title":"Шестерня для станка","material":"Nylon (PA)","image":"/gear_business.png"},{"title":"Корпус прибора","material":"Black PETG, партия 50 шт","image":"/auto_parts_business.png"},{"title":"Автозапчасть / Заглушка","material":"ASA, стойкий к УФ","image":"/auto_parts_business.png"}]},"settings":{"adminPassword":"admin","telegramToken":"8365234102:AAFpM07BEqpBw6UzQ_xVwzUKvFhcKrtG3rE","telegramChatId":"-1002222222222","contactEmail":"Ylevin89@gmail.com","contactPhone":"+7 (911) 910-40-12","address":"г. Санкт-Петербург, м. Василеостровская, 18-я линия В.О., д. 3В."}});}),
"[project]/Desktop/ai/3d_new/src/components/layout/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$components$2f$layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/src/components/layout/Navbar.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/src/data/content.json (json)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const Navbar = ()=>{
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { settings } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$data$2f$content$2e$json__$28$json$29$__["default"];
    const navLinks = [
        {
            name: 'ГЛАВНАЯ',
            path: '/'
        },
        {
            name: 'ЦЕНЫ',
            path: '/pricing'
        },
        {
            name: 'ОБОРУДОВАНИЕ',
            path: '/tech'
        },
        {
            name: 'ПОРТФОЛИО',
            path: '/portfolio'
        },
        {
            name: 'КОНТАКТЫ',
            path: '/contacts'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$components$2f$layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navbar,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$components$2f$layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logo,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/logo_original.png",
                    alt: "PULSE 3D Logo",
                    width: 400,
                    height: 120,
                    priority: true,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$components$2f$layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoImage
                }, void 0, false, {
                    fileName: "[project]/Desktop/ai/3d_new/src/components/layout/Navbar.tsx",
                    lineNumber: 24,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/ai/3d_new/src/components/layout/Navbar.tsx",
                lineNumber: 23,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$components$2f$layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLinks,
                children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: link.path,
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$components$2f$layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLink} ${pathname === link.path ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$components$2f$layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''}`,
                        children: link.name
                    }, link.path, false, {
                        fileName: "[project]/Desktop/ai/3d_new/src/components/layout/Navbar.tsx",
                        lineNumber: 36,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Desktop/ai/3d_new/src/components/layout/Navbar.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$components$2f$layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navRight,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$components$2f$layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerPhone,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `tel:${settings.contactPhone.replace(/\D/g, '')}`,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$components$2f$layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].phoneLink,
                                children: settings.contactPhone
                            }, void 0, false, {
                                fileName: "[project]/Desktop/ai/3d_new/src/components/layout/Navbar.tsx",
                                lineNumber: 48,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$components$2f$layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].separator,
                                children: " | "
                            }, void 0, false, {
                                fileName: "[project]/Desktop/ai/3d_new/src/components/layout/Navbar.tsx",
                                lineNumber: 51,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/contacts#map",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$components$2f$layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cityLink,
                                children: settings.address.split(',')[0]
                            }, void 0, false, {
                                fileName: "[project]/Desktop/ai/3d_new/src/components/layout/Navbar.tsx",
                                lineNumber: 52,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/ai/3d_new/src/components/layout/Navbar.tsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/contacts",
                        className: "primary-button primary-button--filled",
                        children: "Отправить файл"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/ai/3d_new/src/components/layout/Navbar.tsx",
                        lineNumber: 56,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/ai/3d_new/src/components/layout/Navbar.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/ai/3d_new/src/components/layout/Navbar.tsx",
        lineNumber: 22,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Navbar, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Navbar;
const __TURBOPACK__default__export__ = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_ai_3d_new_src_6c1aced9._.js.map