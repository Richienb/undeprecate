/**
 * @license
 *
 * MIT License
 *
 * Copyright (c) 2019 Richie Bendall
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import "core-js"
import _ from "lodash"

// Number

declare namespace Number {
    let toInteger: (x: number) => number
}

Number.toInteger = Math.trunc

// Date

import dayjs from "dayjs"

declare class Date {
    getYear(): number
    setYear(yearValue: number): number

    toGMTString(): string

    toLocaleFormat(format: string): string
}

Date.prototype.getYear = function(): number {
    return this.getFullYear() - 1900
}
Date.prototype.setYear = function(yearValue: number): number {
    if (yearValue >= 0 && yearValue <= 99) this.setFullYear(1900 + yearValue)
    else this.setFullYear(yearValue)
    return this.getTime()
}
Date.prototype.toGMTString = function(): string {
    return this.toUTCString()
}
Date.prototype.toLocaleFormat = function(format: string): string {
    return dayjs(this).format(format)
}

// Globals

globalThis.encode = encodeURIComponent
globalThis.decode = decodeURIComponent

// String

declare class String {
    anchor: (name: string) => string;
    big: () => string;
    blink: () => string;
    bold: () => string;
    fixed: () => string;
    fontcolor: (color: string) => string;
    italics: () => string;
    link: (link: string) => string;
    small: () => string;
    strike: () => string;
    sub: () => string;
    sup: () => string;
    quote(): string

    substr: (...args: any) => any
}

// - HTML wrapper methods

const encloseTags = (str: string, tagname: string): string => `<${tagname}>${str}</${tagname}>`

String.prototype.anchor = function(name: string): string {
    return `<a name="${name}">${this}</a>`
}
String.prototype.big = function(): string {
    return encloseTags(this, "big")
}
String.prototype.blink = function(): string {
    return encloseTags(this, "blink")
}
String.prototype.bold = function(): string {
    return encloseTags(this, "bold")
}
String.prototype.fixed = function(): string {
    return encloseTags(this, "tt")
}
String.prototype.fontcolor = function(color: string): string {
    return `<font color="${color}">${this}</font>`
}
String.prototype.italics = function(): string {
    return encloseTags(this, "i")
}
String.prototype.link = function(link: string): string {
    return `<a href="${link}">${this}</a>`
}
String.prototype.small = function(): string {
    return encloseTags(this, "small")
}
String.prototype.strike = function(): string {
    return encloseTags(this, "strike")
}
String.prototype.sub = function(): string {
    return encloseTags(this, "sub")
}
String.prototype.sup = function(): string {
    return encloseTags(this, "sup")
}

// - Other

String.prototype.quote = function(): string {
    return JSON.stringify(this)
}
String.prototype.substr = function(...args: any): string {
    return this.slice(...args)
}

// Function

declare namespace Function {
    let arity: (func: Function) => number
}

Function.arity = (func: Function): number => func.length

// Object

Object.defineProperty(Object.prototype, "__count__", {
    get: function() {
        return _.size(this)
    },
})
