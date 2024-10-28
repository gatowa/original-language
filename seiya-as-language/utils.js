
//---------------ユーティリティ関数定義---------------//
module.exports = {read,show,error,accept,expect};

//ファイルを読み込む
function read(filename){
    return require('fs').readFileSync(filename,"utf-8");
}

//深い階層まですべて表示する。
function show(msg,obj){
    obj = require('util').inspect(obj,{
              showHidden: false, depth: null, maxArrayLength: null,colors: true
          });
    console.log(msg + obj);
}

//エラーメッセージを表示して終了する
function error(...msgs){
    console.log(msgs.join(""));
    process.exit();
}

//tokens[0]が指定されたcsに含まれるならshiftして返す。そうでないなら何もしない
function accept(tokens,...cs){
    //tokensがもうない
    if(tokens.length==0) return;
    //tokensの先頭が、指示されたcsに含まれるので、shiftして返す
    if(cs.includes(tokens[0])) return tokens.shift();
    //なにもしない
    return;
}

//acceptのエラー版
function expect(tokens,...cs){
    var t = accept(tokens,...cs);
    //取得できたらそのまま返す
    if(t) return t;
    //エラー表示して終了。
    error("tokens[0]=",tokens[0],"が",cs,"に含まれないため終了。");
}