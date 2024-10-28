#!/usr/bin/node

//別ファイルに記述している処理を読み込む
var {read,show}  = require("./utils.js");
var lexer = require("./lexer.js");
var parser = require("./parser.js");
var run = require("./run.js");

//source.3から読み込む
var source = read("source.seiya");

//字句解析
var tokens = lexer(source);
show("tokens =",tokens);

//------構文解析------//
var ast = parser(tokens);
show("ast=",ast);

//------実行------//
run(ast);