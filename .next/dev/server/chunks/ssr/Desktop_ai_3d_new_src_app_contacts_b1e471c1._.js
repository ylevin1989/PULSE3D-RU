module.exports = [
"[project]/Desktop/ai/3d_new/src/app/contacts/contacts.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "addressText": "contacts-module__RYG2sa__addressText",
  "bigLink": "contacts-module__RYG2sa__bigLink",
  "blockLabel": "contacts-module__RYG2sa__blockLabel",
  "btnAttach": "contacts-module__RYG2sa__btnAttach",
  "btnSubmit": "contacts-module__RYG2sa__btnSubmit",
  "contactBlock": "contacts-module__RYG2sa__contactBlock",
  "contactsHero": "contacts-module__RYG2sa__contactsHero",
  "container": "contacts-module__RYG2sa__container",
  "disabled": "contacts-module__RYG2sa__disabled",
  "fileControl": "contacts-module__RYG2sa__fileControl",
  "fileDisplay": "contacts-module__RYG2sa__fileDisplay",
  "formActions": "contacts-module__RYG2sa__formActions",
  "formContainer": "contacts-module__RYG2sa__formContainer",
  "formPanel": "contacts-module__RYG2sa__formPanel",
  "formTitle": "contacts-module__RYG2sa__formTitle",
  "heroSubtitle": "contacts-module__RYG2sa__heroSubtitle",
  "heroTitle": "contacts-module__RYG2sa__heroTitle",
  "infoCol": "contacts-module__RYG2sa__infoCol",
  "inputGroup": "contacts-module__RYG2sa__inputGroup",
  "inputLabel": "contacts-module__RYG2sa__inputLabel",
  "mainGrid": "contacts-module__RYG2sa__mainGrid",
  "mapTag": "contacts-module__RYG2sa__mapTag",
  "mapWrapper": "contacts-module__RYG2sa__mapWrapper",
  "smallLink": "contacts-module__RYG2sa__smallLink",
  "socialCard": "contacts-module__RYG2sa__socialCard",
  "socialStack": "contacts-module__RYG2sa__socialStack",
  "textArea": "contacts-module__RYG2sa__textArea",
  "textInput": "contacts-module__RYG2sa__textInput",
});
}),
"[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/src/app/contacts/contacts.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/src/data/content.json (json)");
'use client';
;
;
;
;
const ContactsPage = ()=>{
    const settings = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$data$2f$content$2e$json__$28$json$29$__["default"].settings;
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        phone: '',
        description: ''
    });
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const formatPhoneNumber = (value)=>{
        const numbers = value.replace(/\D/g, '');
        if (numbers.startsWith('7') || numbers.startsWith('8')) {
            const clean = numbers.substring(1);
            let res = '+7 (';
            if (clean.length > 0) res += clean.substring(0, 3);
            if (clean.length > 3) res += ') ' + clean.substring(3, 6);
            if (clean.length > 6) res += '-' + clean.substring(6, 8);
            if (clean.length > 8) res += '-' + clean.substring(8, 10);
            return res;
        }
        return value;
    };
    const handlePhoneChange = (e)=>{
        const formatted = formatPhoneNumber(e.target.value);
        setFormData({
            ...formData,
            phone: formatted
        });
    };
    const handleFileChange = (e)=>{
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    const isPhoneValid = formData.phone.replace(/\D/g, '').length === 11;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!isPhoneValid) return;
        alert('Заявка принята. Мы перезвоним вам в течение 15 минут.');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contactsHero,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroSubtitle,
                        children: "Communication Hub"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroTitle,
                        children: [
                            "СВЯЗЬ / ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#94a3b8'
                                },
                                children: "CONTACT"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                lineNumber: 54,
                                columnNumber: 58
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                        lineNumber: 54,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].infoCol,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contactBlock,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockLabel,
                                        children: "Локация производства"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                        lineNumber: 60,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addressText,
                                        children: settings.address
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                        lineNumber: 61,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                lineNumber: 59,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contactBlock,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockLabel,
                                        children: "Прямая линия"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                        lineNumber: 65,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `tel:${settings.contactPhone.replace(/\D/g, '')}`,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bigLink,
                                        children: settings.contactPhone
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                        lineNumber: 66,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `mailto:${settings.contactEmail}`,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].smallLink,
                                        children: settings.contactEmail
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                lineNumber: 64,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contactBlock,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockLabel,
                                        children: "Цифровые каналы"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                        lineNumber: 75,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].socialStack,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: settings.telegramLink,
                                                target: "_blank",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].socialCard,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Telegram"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Open Chat"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: settings.whatsappLink,
                                                target: "_blank",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].socialCard,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "WhatsApp"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Message Us"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                        lineNumber: 83,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                lineNumber: 81,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: settings.youtubeLink,
                                                target: "_blank",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].socialCard,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "YouTube"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                        lineNumber: 86,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Watch Process"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                        lineNumber: 87,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                lineNumber: 85,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: settings.avitoLink,
                                                target: "_blank",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].socialCard,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Avito"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Our Store"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                lineNumber: 89,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                        lineNumber: 76,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                lineNumber: 74,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                        lineNumber: 58,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formContainer,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formPanel,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formTitle,
                                    children: "Запустить проект"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                    lineNumber: 99,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleSubmit,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contactForm,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputGroup,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputLabel,
                                                    children: "Ваше имя"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Иван Иванов",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textInput,
                                                    value: formData.name,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            name: e.target.value
                                                        }),
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                            lineNumber: 101,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputGroup,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputLabel,
                                                    children: "Телефон для связи"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "+7 (___) ___-__-__",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textInput,
                                                    value: formData.phone,
                                                    onChange: handlePhoneChange,
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                            lineNumber: 113,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputGroup,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputLabel,
                                                    children: "Описание задачи / Материал"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    rows: 3,
                                                    placeholder: "Например: Шестерня редуктора, Nylon PA12, 10 шт.",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textArea,
                                                    value: formData.description,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            description: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                            lineNumber: 125,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].fileControl,
                                            children: [
                                                file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].fileDisplay,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "DOCUMENT: ",
                                                            file.name.toUpperCase()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formActions,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].btnAttach,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "file",
                                                                    style: {
                                                                        display: 'none'
                                                                    },
                                                                    onChange: handleFileChange
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                                    lineNumber: 144,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                file ? 'СМЕНИТЬ STL' : 'ПРИКРЕПИТЬ STL'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "submit",
                                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].btnSubmit} ${!isPhoneValid ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].disabled : ''}`,
                                                            disabled: !isPhoneValid,
                                                            children: "ОТПРАВИТЬ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                            lineNumber: 147,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                                    lineNumber: 142,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                            lineNumber: 136,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                            lineNumber: 98,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                        lineNumber: 97,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                lineNumber: 57,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mapWrapper,
                id: "map",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mapTag,
                        children: "PROD SITE / SPB / V.O."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                        lineNumber: 162,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        src: `https://yandex.ru/map-widget/v1/?ll=30.271099,59.932415&z=16&pt=30.271099,59.932415,pm2blm`,
                        width: "100%",
                        height: "100%",
                        style: {
                            border: 0,
                            filter: 'grayscale(1) contrast(1.2) invert(0.05)'
                        },
                        allowFullScreen: true
                    }, void 0, false, {
                        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                        lineNumber: 163,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
                lineNumber: 161,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/ai/3d_new/src/app/contacts/page.tsx",
        lineNumber: 51,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ContactsPage;
}),
];

//# sourceMappingURL=Desktop_ai_3d_new_src_app_contacts_b1e471c1._.js.map