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

/// <reference path="../../libraries/qUnit/qunit-1.12.0.js" />
/// <reference path="../../sources/common/Namespacing.js" />

(function() {

    var globalNamespaces = null;

    // --------------------------------------------------------------------------
    // ensureNamespace method
    // --------------------------------------------------------------------------

    QUnit.module("Namespacing Tests", {
        setup: function() {
            globalNamespaces = [];
        },
        teardown: function() {
            for ( var i = 0; i < globalNamespaces.length; i++) {
                delete window[globalNamespaces[i]];
            }
        }
    });

    QUnit.test("Throws if namespace name is not sent.", function() {
        function toBeTested() {
            lu.Namespacing.ensureNamespace();
        }

        QUnit.throws(toBeTested, "Tests that throws if namespace name is not sent.");
    });

    QUnit.test("Throws if namespace name is empty string.", function() {
        function toBeTested() {
            lu.Namespacing.ensureNamespace("");
        }

        QUnit.throws(toBeTested, "Tests that throws if namespace name is empty string.");
    });

    QUnit.test("Throws if namespace name is only a dot.", function() {
        function toBeTested() {
            lu.Namespacing.ensureNamespace(".");
        }

        QUnit.throws(toBeTested, "Tests that throws if namespace name is only a dot.");
    });

    QUnit.test("Creates a namespace in the global object.", function() {
        var namespaceName = "someNamespace";
        trackNamespace(namespaceName);

        lu.Namespacing.ensureNamespace(namespaceName);

        QUnit.ok(typeof window[namespaceName] === "object", "Tests that the '" + namespaceName + "' namespace is created in the global object.");
    });

    QUnit.test("Creates nasted namespaces - 2 level deep.", function() {
        var namespaceName = "n1.n2";
        trackNamespace("n1");
        
        lu.Namespacing.ensureNamespace(namespaceName);
        
        QUnit.ok(typeof window["n1"] === "object", "Tests that the 'n1' namespace is created in the global object.");
        QUnit.ok(typeof window["n1"]["n2"] === "object", "Tests that the 'n2' namespace is created in the n1 object.");
    });

    function trackNamespace(namespaceName) {
        globalNamespaces.push(namespaceName);
    }
}());