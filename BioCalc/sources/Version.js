// BioCalc
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

lu.Namespacing.ensureNamespace("lu.bioCalc");

/**
 * Creates the version string and attaches it to the base namespace of the
 * BioCalc application.
 * 
 * @param bioCalc
 *            The base namespace of BioCalc application.
 */
(function Version(bioCalc) {

    // --------------------------------------------------------------------------
    // Property - version
    // --------------------------------------------------------------------------

    Object.defineProperty(bioCalc, "version", {
        value: "1.4.0",
        writable: false,
        enumerable: true,
        configurable: false
    });
}(lu.bioCalc));