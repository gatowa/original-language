//------字句解析------//
module.exports=function(source){
    //正規表現でsplit(丸カッコで囲まれると残り、囲まれていないと捨てられる)
    //コメント削除→\/\/.*$   ($を使うにはmオプションが必要)
    //実数\d+\.\d+
    //整数\d+
    //"文字列"→".*?" 最短マッチ
    //print→\w+
    //空白と改行→\s
    //セミコロンやカッコなどその他→.
    var tokens = source.split(/\/\/.*$|(\d+\.\d+|\d+|".*?"|\w+)|\s|(.)/m);

    //splitの仕様上、undefinedや''などが残るので、不要なものは捨てる
    tokens = tokens.filter(a=>a);

    return tokens;
}