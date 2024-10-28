module.exports = run;

var {error}  = require("./utils.js");

//グローバル変数置き場
var global = {};

//astの階層をたどりながら実行
function run(a){
    if(!a) return;
    if(!a.op){
        //文字列ならダブルクォーテーションを取り除く
        if(a[0] == '"') return a.substr(1,a.length-2);
        //数値なら数値化して返す
        if(/\d/.test(a[0]) )return 1*a;
        //global変数だったら、中身を返す
        if(global.hasOwnProperty(a)) return global[a];

        //それ以外ならそのまま返す
        return a;
    }else if(a.op == ";"){
        run(a.left); run(a.right);
    }else if(a.op == ","){
        //カンマ区切りは、配列にする
        return [run(a.left),run(a.right)].flat();
    }else if(a.op == "="){
        //グローバル変数に格納する
        return global[run(a.left)] = run(a.right);
    }else if(a.op == "()"){
        var func = run(a.left);
        if( func == "print"){
            //引数配列を連結して１つの文字列にする
            var args = [run(a.right)].flat().join("");
            console.log(args);
        }else{
            error("未実装の関数呼び出し func=",func);
        }
    }else if(a.op == "+"){
        return run(a.left) + run(a.right);
    }else if(a.op == "-"){
        return run(a.left) - run(a.right);
    }else if(a.op == "*"){
        return run(a.left) * run(a.right);
    }else if(a.op == "/"){
        return run(a.left) / run(a.right);
    }else{
        error("未実装の演算子 op=",a.op);
    }
}
