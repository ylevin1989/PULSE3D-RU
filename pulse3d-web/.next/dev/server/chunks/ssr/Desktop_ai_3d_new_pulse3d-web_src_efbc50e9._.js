module.exports = [
"[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/contacts.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "addressText": "contacts-module___LSITW__addressText",
  "bigLink": "contacts-module___LSITW__bigLink",
  "blockLabel": "contacts-module___LSITW__blockLabel",
  "btnAttach": "contacts-module___LSITW__btnAttach",
  "btnSubmit": "contacts-module___LSITW__btnSubmit",
  "contactBlock": "contacts-module___LSITW__contactBlock",
  "contactsHero": "contacts-module___LSITW__contactsHero",
  "container": "contacts-module___LSITW__container",
  "disabled": "contacts-module___LSITW__disabled",
  "fileControl": "contacts-module___LSITW__fileControl",
  "fileDisplay": "contacts-module___LSITW__fileDisplay",
  "formActions": "contacts-module___LSITW__formActions",
  "formContainer": "contacts-module___LSITW__formContainer",
  "formPanel": "contacts-module___LSITW__formPanel",
  "formTitle": "contacts-module___LSITW__formTitle",
  "heroSubtitle": "contacts-module___LSITW__heroSubtitle",
  "heroTitle": "contacts-module___LSITW__heroTitle",
  "infoCol": "contacts-module___LSITW__infoCol",
  "inputGroup": "contacts-module___LSITW__inputGroup",
  "inputLabel": "contacts-module___LSITW__inputLabel",
  "mainGrid": "contacts-module___LSITW__mainGrid",
  "mapTag": "contacts-module___LSITW__mapTag",
  "mapWrapper": "contacts-module___LSITW__mapWrapper",
  "smallLink": "contacts-module___LSITW__smallLink",
  "socialCard": "contacts-module___LSITW__socialCard",
  "socialStack": "contacts-module___LSITW__socialStack",
  "textArea": "contacts-module___LSITW__textArea",
  "textInput": "contacts-module___LSITW__textInput",
});
}),
"[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/pulse3d-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/pulse3d-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/contacts.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$data$2f$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/pulse3d-web/src/data/content.json (json)");
'use client';
;
;
;
;
const ContactsClient = ()=>{
    const settings = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$data$2f$content$2e$json__$28$json$29$__["default"].settings;
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        phone: '',
        description: ''
    });
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
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
        try {
            const dataToSend = new FormData();
            dataToSend.append('name', formData.name);
            dataToSend.append('phone', formData.phone);
            dataToSend.append('description', formData.description);
            if (file) dataToSend.append('file', file);
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: dataToSend
            });
            if (response.ok) {
                alert('Заявка принята. Мы перезвоним вам в ближайшее время.');
                setFormData({
                    name: '',
                    phone: '',
                    description: ''
                });
                setFile(null);
            } else {
                alert('Ошибка при отправке. Пожалуйста, попробуйте позже.');
            }
        } catch (error) {
            alert('Произошла ошибка связи с сервером.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contactsHero,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroSubtitle,
                        children: "Communication Hub"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                        lineNumber: 75,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].heroTitle,
                        children: [
                            "СВЯЗЬ / ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#94a3b8'
                                },
                                children: "CONTACT"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                lineNumber: 76,
                                columnNumber: 58
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                        lineNumber: 76,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainGrid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].infoCol,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contactBlock,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockLabel,
                                        children: "Локация производства"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                        lineNumber: 82,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addressText,
                                        children: settings.address
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                        lineNumber: 83,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                lineNumber: 81,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contactBlock,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockLabel,
                                        children: "Прямая линия"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                        lineNumber: 87,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `tel:${settings.contactPhone.replace(/\D/g, '')}`,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bigLink,
                                        children: settings.contactPhone
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                        lineNumber: 88,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `mailto:${settings.contactEmail}`,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].smallLink,
                                        children: settings.contactEmail
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                        lineNumber: 91,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                lineNumber: 86,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contactBlock,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].blockLabel,
                                        children: "Цифровые каналы"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                        lineNumber: 97,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].socialStack,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: settings.telegramLink,
                                                target: "_blank",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].socialCard,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Telegram"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Open Chat"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                lineNumber: 99,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: settings.whatsappLink,
                                                target: "_blank",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].socialCard,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "WhatsApp"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Message Us"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                lineNumber: 103,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: settings.youtubeLink,
                                                target: "_blank",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].socialCard,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "YouTube"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Watch Process"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                lineNumber: 107,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: settings.avitoLink,
                                                target: "_blank",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].socialCard,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Avito"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Our Store"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                        lineNumber: 113,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                lineNumber: 111,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                        lineNumber: 98,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                lineNumber: 96,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                        lineNumber: 80,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formContainer,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formPanel,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formTitle,
                                    children: "Запустить проект"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                    lineNumber: 121,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleSubmit,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].contactForm,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputGroup,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputLabel,
                                                    children: "Ваше имя"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Иван Иванов",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textInput,
                                                    value: formData.name,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            name: e.target.value
                                                        }),
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                            lineNumber: 123,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputGroup,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputLabel,
                                                    children: "Телефон для связи"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "+7 (___) ___-__-__",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textInput,
                                                    value: formData.phone,
                                                    onChange: handlePhoneChange,
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                            lineNumber: 135,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputGroup,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputLabel,
                                                    children: "Описание задачи / Материал"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    rows: 3,
                                                    placeholder: "Например: Шестерня редуктора, Nylon PA12, 10 шт.",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textArea,
                                                    value: formData.description,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            description: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                            lineNumber: 147,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].fileControl,
                                            children: [
                                                file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].fileDisplay,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "DOCUMENT: ",
                                                            file.name.toUpperCase()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formActions,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].btnAttach,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "file",
                                                                    style: {
                                                                        display: 'none'
                                                                    },
                                                                    onChange: handleFileChange
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                                    lineNumber: 166,
                                                                    columnNumber: 41
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                file ? 'СМЕНИТЬ STL' : 'ПРИКРЕПИТЬ STL'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                            lineNumber: 165,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "submit",
                                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].btnSubmit} ${!isPhoneValid ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].disabled : ''}`,
                                                            disabled: !isPhoneValid,
                                                            children: "ОТПРАВИТЬ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                            lineNumber: 169,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                            lineNumber: 158,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                                    lineNumber: 122,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                            lineNumber: 120,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                        lineNumber: 119,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                lineNumber: 79,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mapWrapper,
                id: "map",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$src$2f$app$2f$contacts$2f$contacts$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mapTag,
                        children: "PROD SITE / SPB / V.O."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                        lineNumber: 184,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        src: `https://yandex.ru/map-widget/v1/?ll=30.271099,59.932415&z=16&pt=30.271099,59.932415,pm2blm`,
                        width: "100%",
                        height: "100%",
                        style: {
                            border: 0,
                            filter: 'grayscale(1) contrast(1.2) invert(0.05)'
                        },
                        allowFullScreen: true
                    }, void 0, false, {
                        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                        lineNumber: 185,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
                lineNumber: 183,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/app/contacts/ContactsClient.tsx",
        lineNumber: 73,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ContactsClient;
}),
"[project]/Desktop/ai/3d_new/pulse3d-web/src/components/seo/JsonLd.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/ai/3d_new/pulse3d-web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const JsonLd = ({ data })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$ai$2f$3d_new$2f$pulse3d$2d$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
            __html: JSON.stringify(data).replace(/</g, '\\u003c')
        }
    }, void 0, false, {
        fileName: "[project]/Desktop/ai/3d_new/pulse3d-web/src/components/seo/JsonLd.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = JsonLd;
}),
];

//# sourceMappingURL=Desktop_ai_3d_new_pulse3d-web_src_efbc50e9._.js.map