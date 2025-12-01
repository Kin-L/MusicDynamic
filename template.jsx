// template.jsx - 模板处理功能
#include "config.jsx"
#include "utils.jsx"
#include "subtitle.jsx"

// 主模板处理函数
function processTemplate(material, tempitems) {
    var NewMusicPath = material[3];
    var MusicName = getFileNameWithoutExtension(NewMusicPath);
    var NewFolder = app.project.items.addFolder(MusicName);
    var NewMusic = ImpFile(NewMusicPath);

    var NewComp;
    if (material[4]) {
        NewComp = tempitems[5].duplicate();
    } else {
        NewComp = tempitems[4].duplicate();
    }

    NewComp.name = MusicName;
    NewComp.parentFolder = NewFolder;
    NewMusic.parentFolder = NewFolder;
    NewComp.duration = NewMusic.duration + 2;

    var NewBack = ImpFile(material[0]);
    NewBack.parentFolder = NewFolder;
    var NewCover = ImpFile(material[1]);
    NewCover.parentFolder = NewFolder;
    var NewDisc = ImpFile(material[2]);
    NewDisc.parentFolder = NewFolder;

    var tit, art = CONFIG.ARTIST_NAME;
    if (MusicName.indexOf(" - ") !== -1) {
        tit = MusicName.split(" - ")[0];
        if (art == "") {
            art = MusicName.split(" - ")[1];
        }
    } else {
        tit = MusicName;
    }

    var line2;
    if (CONFIG.VERSION_NAME == "") {
        line2 = art;
    } else {
        line2 = art + "  --  " + CONFIG.VERSION_NAME;
    }

    for (var o = 0; o < NewComp.numLayers; o++) {
        u = o + 1;
        var layer = NewComp.layer(u);
        layer.outPoint = NewComp.duration;
        if (u == 1) {
            var textLayer = NewComp.layer(u);
            var textDocument = textLayer.property("ADBE Text Properties").property("ADBE Text Document").value;
            textDocument.text = tit;
            textLayer.property("ADBE Text Properties").property("ADBE Text Document").setValue(textDocument);
        }else if (u == 2) {
            var textLayer = NewComp.layer(u);
            var textDocument = textLayer.property("ADBE Text Properties").property("ADBE Text Document").value;
            textDocument.text = line2;
            textLayer.property("ADBE Text Properties").property("ADBE Text Document").setValue(textDocument);
        } else if (u == 3) {
            var l1layer = NewComp.layer(u);
        } else if (u == 4) {
            var l2layer = NewComp.layer(u);
        } else if (u == 5) {
            var l3layer = NewComp.layer(u);
        } else if (u == 6) {
            var layer = NewComp.layer(u);
            layer.replaceSource(NewCover, false);
        } else if (u == 7) {
            var layer = NewComp.layer(u);
            layer.replaceSource(NewDisc, false);
        } else if (u == 8) {
            var layer = NewComp.layer(u);
            layer.replaceSource(NewBack, false);
        }
    }
    var musicLayer = NewComp.layers.add(NewMusic);
    musicLayer.startTime = 2;
    // musicLayer.outPoint = NewComp.duration;
    musicLayer.name = tit;
    l1layer.effect.property(1).property(1).setValue(1)
    l2layer.effect.property(1).property(1).setValue(1)
    l3layer.effect.property(1).property(1).setValue(1)

    // 处理歌词文件
    if (material[4]) {
        try {
            var subtitleFile = new File(material[4]);
            subtitleFile.open('r');
            var fileContent = subtitleFile.read();
            subtitleFile.close();
            var timeTeams = lrcToTimeTeams(fileContent);
            // var timeTeams = parseSRT(lrcToSrt(fileContent));
            if (timeTeams.length > 0) {
                // 创建歌词合成
                var compDuration = NewComp.duration;
                var LyricsComp = app.project.items.addComp(
                    "歌词合成",
                    CONFIG.SUBTITLE.COMPOSITION.WIDTH,
                    CONFIG.SUBTITLE.COMPOSITION.HEIGHT,
                    1,
                    compDuration - 2,
                    CONFIG.SUBTITLE.COMPOSITION.FPS
                );
                LyricsComp.parentFolder = NewFolder;

                // 创建字幕图层
                createSubtitleLayers(LyricsComp, timeTeams);

                // 将歌词合成添加到主合成中
                var lyricsLayer = NewComp.layers.add(LyricsComp);
                lyricsLayer.startTime = 2;
                lyricsLayer.name = "滚动歌词";
                var textProp = lyricsLayer.property("ADBE Transform Group").property("ADBE Position");
                textProp.setValue(CONFIG.SUBTITLE.COMPOSITION.Position);
                jswt("成功创建歌词图层");
            }
        } catch (e) {
            jswt("歌词处理失败: " + e.toString());
        }
    }

    var outputPath = getFileNameWithoutExtension(NewMusicPath) + ".mp4";
    configureRender(NewComp, outputPath);
    jswt("成功添加渲染：" + MusicName);
}