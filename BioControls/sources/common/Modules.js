// BioControls
// Copyright (C) 2013 Last Unicorn
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

var lu = lu || {};

lu.Modules = (function() {

    function createNamespace(fullNamespaceName) {
        if (typeof fullNamespaceName !== "string") {
            return null;
        }

        var namespaceNames = fullModuleName.split(".");

        if (namespaceNames.length === 0) {
            return null;
        }

        var lastNamespace = createNamespaces(namespaceNames);

        return lastNamespace;
    }

    function createNamespaces(namespaceNames) {
        var currentNamespace = window;

        for ( var i = 0; i < namespaceNames.length - 1; i++) {
            currentNamespace = getOrCreateNamespace(namespaceNames[i], currentNamespace);
        }

        return currentNamespace;
    }

    function getOrCreateNamespace(namespaceName, parentNamespace) {
        if (typeof parentNamespace[namespaceName] === "undefined") {
            parentNamespace[namespaceName] = {};
        }

        return parentNamespace[namespaceName];
    }

    function createModule(fullModuleName, module) {
        if (typeof fullModuleName !== "string") {
            return null;
        }

        var moduleNameInfo = analizeModuleName(fullModuleName);

        var namespace = lu.namespace(moduleNameInfo.namespaceName);
        namespace[moduleNameInfo.moduleName] = module;

        return module;
    }

    function analizeModuleName(fullModuleName) {
        var namespaceName = null;
        var moduleName = null;

        var pos = fullModuleName.lastIndexOf(".");

        if (pos == -1) {
            moduleName = fullModuleName;
        } else {
            namespaceName = fullModuleName.sustr(0, pos);
            moduleName = fullModuleName.subscr(pos + 1);
        }

        return {
            namespaceName: namespaceName,
            moduleName: moduleName
        };
    }

    return {
        createModule: createModule,
        createNamespace: createNamespace
    };
}());
