(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.ReactIntlLocaleData || (g.ReactIntlLocaleData = {})).hi = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[{locale:"hi",pluralRuleFunction:function(e,t){return t?1==e?"one":2==e||3==e?"two":4==e?"few":6==e?"many":"other":e>=0&&1>=e?"one":"other"},fields:{year:{displayName:"वर्ष",relative:{0:"इस वर्ष",1:"अगला वर्ष","-1":"पिछला वर्ष"},relativeTime:{future:{one:"{0} वर्ष में",other:"{0} वर्ष में"},past:{one:"{0} वर्ष पहले",other:"{0} वर्ष पहले"}}},month:{displayName:"माह",relative:{0:"इस माह",1:"अगला माह","-1":"पिछला माह"},relativeTime:{future:{one:"{0} माह में",other:"{0} माह में"},past:{one:"{0} माह पहले",other:"{0} माह पहले"}}},day:{displayName:"दिन",relative:{0:"आज",1:"कल",2:"परसों","-1":"कल","-2":"बीता परसों"},relativeTime:{future:{one:"{0} दिन में",other:"{0} दिन में"},past:{one:"{0} दिन पहले",other:"{0} दिन पहले"}}},hour:{displayName:"घंटा",relativeTime:{future:{one:"{0} घंटे में",other:"{0} घंटे में"},past:{one:"{0} घंटे पहले",other:"{0} घंटे पहले"}}},minute:{displayName:"मिनट",relativeTime:{future:{one:"{0} मिनट में",other:"{0} मिनट में"},past:{one:"{0} मिनट पहले",other:"{0} मिनट पहले"}}},second:{displayName:"सेकंड",relative:{0:"अब"},relativeTime:{future:{one:"{0} सेकंड में",other:"{0} सेकंड में"},past:{one:"{0} सेकंड पहले",other:"{0} सेकंड पहले"}}}}},{locale:"hi-IN",parentLocale:"hi"}];
},{}]},{},[1])(1)
});