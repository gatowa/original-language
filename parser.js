//---------------構文解析---------------//
var {expect,accept,show,error}  = require("./utils.js");

//その他は値としてそのまま返す
function value(){
    if(tokens.length ==0) return;
    //そのまま返す
    return tokens.shift();
}

//グループ化の丸カッコ
function paren(){
    //左辺を読まない

    //グループ化の丸カッコ開始
    var op;
    while(op = accept(tokens,"(")){
        //丸カッコの中はvalueではなく、commaであることに注意
        var right = comma();

        //閉じカッコであることを確認して取得
        console.log();
        op += expect(tokens,")");

        //opを捨て、rightをそのまま返すのは階層を縮めたいから。
        return right;
    }

    //ここはleftじゃなく、value呼び出しであることに注意
    return value();
}

//関数呼び出し
function funccall(){
    //関数名を取得
    var left = paren();

    //関数呼び出しのカッコ
    var op;
    if(op = accept(tokens,"(")){
        //丸カッコの中の複数の引数を取得
        //ここはvalueではなく、commaであることに注意
        var right = comma();
        //閉じカッコであることを確認して取得
        op += expect(tokens,")");
        //新しいノードを作成し階層を深める
        left = {left,op,right};
    }
    return left;
}

//単項の符号(右結合)
function flag(){
    //左辺を取得しない

    //演算子が続く間は連続する
    var op;
    while(op = accept(tokens,"+","-")){
        //右辺を取得
        var right = comma();
        //プラス符号なら何もしない
        if(op == "+") return right;
        //マイナス符号なら、(0-1)を掛ける階層を作る
	return {left:{left:"0",op:"-",right:"1"},op:"*",right};
    }

    //ここがleftじゃなく、funccallなことに注意
    return funccall();
}

//掛け算、割り算
function mul(){
    //左辺を取得
    var left = flag();

    //演算子が続く間は連続する
    var op;
    while(op = accept(tokens,"*","/")){
        //右辺を取得
        var right = flag();
        //新しいノードを作成し階層を深める
        left = {left,op,right};
    }
    return left;
}

//足し算、引き算
function plus(){
    //左辺を取得
    var left = mul();

    //演算子が続く間は連続する
    var op;
    while(op = accept(tokens,"+","-")){
        //右辺を取得
        var right = mul();
        //新しいノードを作成し階層を深める
        left = {left,op,right};
    }
    return left;
}

//イコール代入は右結合
function assign(){
    //左辺を取得
    var left = plus();

    //演算子が続く間は連続する
    var op;
    while(op = accept(tokens,"=")){
        //右辺を取得
        //ここはplusでなく、commaにリセット
        var right = comma();
        //新しいノードを作成し階層を深める
        left = {left,op,right};
    }
    return left;
}

//カンマ=複数引数
function comma(){
    //左辺を取得
    var left = assign();

    //演算子が続く間は連続する
    var op;
    while(op = accept(tokens,",")){
        //右辺を取得
        var right = assign();
        //新しいノードを作成し階層を深める
        left = {left,op,right};
    }
    return left;
}

//セミコロン=複数文
function semi(){
    //左辺を取得
    var left = comma();

    //演算子が続く間は連続する
    var op;
    while(op = accept(tokens,";")){
        //右辺を取得
        var right = comma();
        //新しいノードを作成し階層を深める
        left = {left,op,right};
    }
    return left;
}
var tokens;
function parser(t){
    tokens = t;
    var ast = semi();
    //処理後のtokensを表示
    if(tokens.length>0){
        show("ast=",ast);
        show("処理後tokens =",tokens);
        error("tokensが余っているので、どこかおかしいので終了");
    }
    return ast;
}
module.exports = parser;