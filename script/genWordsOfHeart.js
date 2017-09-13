// 引入fs和jsonfile
var fs = require('fs');
var jsonfile = require('jsonfile');

// 定义要读取的路径
var readDirPath = '/Users/fanghan/jsproject/words-from-the-heart/';

// 存放所有心里话
var writeDirPath = './allWords.json';

// 用于存放格式不正确的json文件名
var errorDirPath = './errorFileName.json';

// 读取
fs.readdir(readDirPath, function(err, files) {
    // 把文件名暂时保存在jsonFileName数组中
    var jsonFileName = [];

    if (err) {
        console.log('读取路径失败，请检查读取路径是否正确');
        return;
    } else {
        if (files.length == 0) {
            console.log('读取路径中没有找到任何文件，请检查读取路径是否正确');
        }
        else {
            for (var index = 0; index < files.length; index++) {
                if (!fs.statSync(readDirPath + files[index]).isFile()) {
                    console.log('[Warning] ' + files[index]+ ' 不是文件,跳过');
                } 
                else if (files[index].match('\.json$') == null ) {
                    console.log('[Warning] ' + files[index]+ ' 不是json,跳过')
                }
                else {
                    jsonFileName.push(files[index].trim('"'))
                }
            }
        }
    }

    //循环读取jsonFileName数组中的名称，并将内容写入另一个数组jsonContent
    //如果读取错误，写入readErrorFileName数组中
    var jsonContent = []
    var readErrorFileName = []
    for (var i = 0; i < jsonFileName.length; i++) {
        try {
            // 利用第三方库jsonfile读取json文件内容
            var content = jsonfile.readFileSync(readDirPath + jsonFileName[i]);
            jsonContent.push(content);
        } catch (err) {
            readErrorFileName.push(jsonFileName[i]);
        }
    }

    // 将收集的全部数据写入一个json文件
    jsonfile.writeFileSync(writeDirPath, jsonContent);
    jsonfile.writeFileSync(errorDirPath, readErrorFileName);
});
