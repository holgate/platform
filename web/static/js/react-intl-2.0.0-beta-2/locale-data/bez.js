(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.ReactIntlLocaleData || (g.ReactIntlLocaleData = {})).bez = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[{locale:"bez",pluralRuleFunction:function(e,t){return t?"other":1==e?"one":"other"},fields:{year:{displayName:"Mwaha",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Mwedzi",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Sihu",relative:{0:"Neng’u ni",1:"Hilawu","-1":"Igolo"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Saa",relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Dakika",relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Sekunde",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"bez-TZ",parentLocale:"bez"}];
},{}]},{},[1])(1)
});