#include "config.jsx"
#include "utils.jsx"
#include "subtitle.jsx"
#include "template.jsx"

try {
    // 主函数入口
    if (!hasOpenProject()) {
        // 复制AEP模板文件，并使用
        copyFileWithRenameAndOverwrite(CONFIG.AEP_PATH);
        var projectFile = new File("./cache/temp.aep");
        app.open(projectFile);
        // 清空渲染列表
        var rq = app.project.renderQueue;
        while (rq.numItems > 0) {
            rq.item(1).remove(); // 从1开始，持续删除第一个项目
        }
        var tempindex = 1;
    } else {
        var tempindex = 0;
        for (var i = 0; i < app.project.numItems; i++) {
            if (app.project.item(i + 1).name == "模板") {
                tempindex = i + 1;
            }
        }
    }

    var tempcomp1 = app.project.item(tempindex + 1);
    var tempback = app.project.item(tempindex + 3);
    var tempcover = app.project.item(tempindex + 4);
    var tempdisc = app.project.item(tempindex + 5);
    var tempmusic = app.project.item(tempindex + 6);
    var tempcomp0 = app.project.item(tempindex + 7);

    var tempitems = [
        tempback,
        tempcover,
        tempdisc,
        tempmusic,
        tempcomp0,
        tempcomp1,
        CONFIG.ARTIST_NAME,
        CONFIG.VERSION_NAME
    ];
    // jswt("CONFIG.FOLDER_PATH:"+ CONFIG.FOLDER_PATH)
    var backfiles = getAllSubdirectories(CONFIG.FOLDER_PATH + "/背景图层");
    var coverfiles = getAllSubdirectories(CONFIG.FOLDER_PATH + "/封面图层");
    var discfiles = getAllSubdirectories(CONFIG.FOLDER_PATH + "/碟片图层");
    var musicfiles = getAllSubdirectories(CONFIG.FOLDER_PATH + "/音乐");
    var lyricsfiles = getAllSubdirectories(CONFIG.FOLDER_PATH + "/歌词");
    var backcount = 0;
    var covercount = 0;
    var disccount = 0;
    var filescount = 0;
    // 处理音乐文件夹中的文件
    for (var music_index = 0; music_index < musicfiles.length; music_index++) {
        var file = musicfiles[music_index];
        if (file.indexOf(".wav") !== -1) {} else if (file.indexOf(".mp3") !== -1) {} else {
            continue;
        }
        filescount++;
        var material = [
            backfiles[backcount],
            coverfiles[covercount],
            discfiles[disccount],
            file
        ];
        var lrcpath = getFilePathWithoutExtension(file).replace("/音乐/", "/歌词/") + ".lrc";
        // jswt(lrcpath)
        // jswt(lyricsfiles)
        if (lyricsfiles.indexOf(lrcpath) !== -1) {
            material.push(lrcpath);
        } else {
            material.push("");
        }
        processTemplate(material, tempitems);

        // 更新计数器
        if (backcount == backfiles.length - 1) {
            backcount = 0;
        } else {
            backcount++;
        }
        if (covercount == coverfiles.length - 1) {
            covercount = 0;
        } else {
            covercount++;
        }
        if (disccount == discfiles.length - 1) {
            disccount = 0;
        } else {
            disccount++;
        }
    }
    jswt("音乐 文件夹检测到" + filescount + "个音频");

    // 处理素材组
    var groups = getAllSubdirectories(CONFIG.FOLDER_PATH);
    jswt("检测到" + (groups.length - 5) + "组素材");
    for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        if (group.indexOf("素材组") !== -1) {
            if (backfiles.length) {
                var backfile = backfiles[backcount]
                if (backcount == backfiles.length - 1) {
                    backcount = 0;
                } else {
                    backcount++;
                }
            } else {
                var backfile = getOneFilePaths(group + "/背景图层");
            }
            if (coverfiles.length) {
                var coverfile = coverfiles[covercount]
                if (covercount == coverfiles.length - 1) {
                    covercount = 0;
                } else {
                    covercount++;
                }
            } else {
                var coverfile = getOneFilePaths(group + "/封面图层");
            }
            if (discfiles.length) {
                var discfile = discfiles[backcount]
                if (disccount == discfiles.length - 1) {
                    disccount = 0;
                } else {
                    disccount++;
                }
            } else {
                var discfile = getOneFilePaths(group + "/碟片图层");
            }
            var musicfile = getOneFilePaths(group + "/音乐");
            var lyricsfile = getOneFilePaths(group + "/歌词");
            var material = [
                backfile,
                coverfile,
                discfile,
                musicfile
            ];
            if (lyricsfile) {
                material.push(lyricsfile);
            } else {
                material.push("");
            }
            processTemplate(material, tempitems);
        }
    }

    jswt("完成任务！");
    app.project.save();
} catch (e) {
    jswt("执行错误: " + e.message + " (行号: " + e.line + ")");
}