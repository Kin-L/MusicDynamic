// subtitle.jsx - 字幕处理功能

#include "config.jsx"
#include "utils.jsx"

// ==================== 字幕功能函数 ====================

// 兼容性处理 - 添加缺失的数组方法
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

// 兼容性处理 - 添加字符串trim方法
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

// 将时间字符串转换为秒数
function parseTimeToSeconds(hours, minutes, seconds, milliseconds) {
    return parseInt(hours) * 3600 +
        parseInt(minutes) * 60 +
        parseInt(seconds) +
        parseInt(milliseconds) / 1000;
}

// 创建字幕图层
function createSubtitleLayers(comp, timeTeams) {
    var centerY = comp.height / 2;
    var currentY = centerY + CONFIG.SUBTITLE.LAYOUT.INITIAL_OFFSET;

    // 计算初始Y位置
    for (var i = 0; i < timeTeams.length; i++) {
        var team = timeTeams[i];
        team.initialY = currentY;

        // 计算下一组的位置
        var change_y = CONFIG.SUBTITLE.LAYOUT.LINE_SPACING * team.lineNum + CONFIG.SUBTITLE.LAYOUT.PARAGRAPH_SPACING;
        currentY += change_y;
    }

    // 创建所有文本图层
    var textLayers = [];
    for (var i = 0; i < timeTeams.length; i++) {
        var team = timeTeams[i];

        for (var j = 0; j < team.texts.length; j++) {
            var textLayer = comp.layers.addText(team.texts[j]);
            textLayer.name = "字幕_" + i + "_" + j;
            var sourceText = textLayer.property("Source Text");
            var textDoc = sourceText.value;

            // 应用文本样式配置
            textDoc.justification = CONFIG.SUBTITLE.TEXT_STYLE.JUSTIFICATION;
            textDoc.fontSize = CONFIG.SUBTITLE.TEXT_STYLE.FONT_SIZE;
            textDoc.strokeWidth = CONFIG.SUBTITLE.TEXT_STYLE.STROKE_WIDTH;
            textDoc.fillColor = hexToRgbNormalized(CONFIG.SUBTITLE.TEXT_STYLE.NORMAL_COLOR);
            sourceText.setValue(textDoc);

            // 设置初始位置
            var textProp = textLayer.property("ADBE Transform Group").property("ADBE Position");
            var textPosition = textProp.value;
            textPosition[0] = comp.width / 2; // 水平居中
            textPosition[1] = team.initialY + j * CONFIG.SUBTITLE.LAYOUT.LINE_SPACING; // 垂直位置
            textProp.setValue(textPosition);

            // 设置初始透明度为0
            var opacityProp = textLayer.property("ADBE Transform Group").property("ADBE Opacity");
            opacityProp.setValue(0);

            // 设置初始缩放
            var scaleProp = textLayer.property("ADBE Transform Group").property("ADBE Scale");
            var scaleValue = (i === 0 && j === 0) ? [CONFIG.SUBTITLE.ANIMATION.HIGHLIGHT_SCALE, CONFIG.SUBTITLE.ANIMATION.HIGHLIGHT_SCALE] : [CONFIG.SUBTITLE.ANIMATION.NORMAL_SCALE, CONFIG.SUBTITLE.ANIMATION.NORMAL_SCALE];
            scaleProp.setValue(scaleValue);

            // 存储图层信息
            if (!textLayers[i]) textLayers[i] = [];
            textLayers[i].push({
                layer: textLayer,
                positionProp: textProp,
                opacityProp: opacityProp,
                scaleProp: scaleProp
            });
        }
    }

    // 设置动画关键帧
    setupAnimations(comp, timeTeams, textLayers);
}

// 设置动画关键帧
function setupAnimations(comp, timeTeams, textLayers) {
    var animDuration = CONFIG.SUBTITLE.ANIMATION.DURATION;

    // 设置淡入动画
    for (var i = 0; i < textLayers.length; i++) {
        for (var j = 0; j < textLayers[i].length; j++) {
            var layerInfo = textLayers[i][j];

            // 淡入关键帧
            layerInfo.opacityProp.setValueAtTime(0, 0);
            layerInfo.opacityProp.setValueAtTime(animDuration, 100);
        }
    }

    var accumulatedOffset = 0;

    // 设置滚动、缩放和颜色动画
    for (var i = 0; i < timeTeams.length; i++) {
        var team = timeTeams[i];
        var startTime = team.startTime;
        var change_y = CONFIG.SUBTITLE.LAYOUT.LINE_SPACING * team.lineNum + CONFIG.SUBTITLE.LAYOUT.PARAGRAPH_SPACING;

        // 为所有图层设置移动动画
        for (var k = 0; k < textLayers.length; k++) {
            for (var l = 0; l < textLayers[k].length; l++) {
                var layerInfo = textLayers[k][l];
                var positionProp = layerInfo.positionProp;

                // 获取当前位置
                var currentPosition = positionProp.value;
                // 设置移动关键帧
                currentPosition[1] -= accumulatedOffset;
                positionProp.setValueAtTime(startTime - animDuration/2, currentPosition);
                currentPosition[1] -= change_y; // 向上移动
                positionProp.setValueAtTime(startTime + animDuration/2, currentPosition);
            }
        }
        accumulatedOffset += change_y;

        // 设置缩放和颜色动画
        if (i > 0) {
            // 上一个时间戳的歌词：缩放 高亮 -> 正常，颜色 高亮 -> 普通
            for (var l = 0; l < textLayers[i - 1].length; l++) {
                var prevLayerInfo = textLayers[i - 1][l];

                // 缩放动画
                prevLayerInfo.scaleProp.setValueAtTime(startTime - animDuration/2,
                    [CONFIG.SUBTITLE.ANIMATION.HIGHLIGHT_SCALE, CONFIG.SUBTITLE.ANIMATION.HIGHLIGHT_SCALE]);
                prevLayerInfo.scaleProp.setValueAtTime(startTime + animDuration/2,
                    [CONFIG.SUBTITLE.ANIMATION.NORMAL_SCALE, CONFIG.SUBTITLE.ANIMATION.NORMAL_SCALE]);

                // 颜色动画：从高亮色变回普通白色
                changeTextColor(prevLayerInfo.layer, startTime - 0.1, startTime,
                    CONFIG.SUBTITLE.TEXT_STYLE.HIGHLIGHT_COLOR,
                    CONFIG.SUBTITLE.TEXT_STYLE.NORMAL_COLOR
                );
            }
        }

        // 当前时间戳的歌词：缩放 正常 -> 高亮，颜色 普通 -> 高亮
        for (var l = 0; l < textLayers[i].length; l++) {
            var currLayerInfo = textLayers[i][l];

            // 缩放动画
            currLayerInfo.scaleProp.setValueAtTime(startTime - animDuration/2,
                [CONFIG.SUBTITLE.ANIMATION.NORMAL_SCALE, CONFIG.SUBTITLE.ANIMATION.NORMAL_SCALE]);
            currLayerInfo.scaleProp.setValueAtTime(startTime + animDuration/2,
                [CONFIG.SUBTITLE.ANIMATION.HIGHLIGHT_SCALE, CONFIG.SUBTITLE.ANIMATION.HIGHLIGHT_SCALE]);

            // 颜色动画：从白色变为高亮色
            changeTextColor(currLayerInfo.layer, startTime - 0.1, startTime,
                CONFIG.SUBTITLE.TEXT_STYLE.NORMAL_COLOR,
                CONFIG.SUBTITLE.TEXT_STYLE.HIGHLIGHT_COLOR
            );
        }
    }

    // 设置淡出动画 (最后一个时间戳结束后延迟淡出)
    var lastTeam = timeTeams[timeTeams.length - 1];
    var fadeOutStartTime = lastTeam.endTime + CONFIG.SUBTITLE.ANIMATION.FADE_OUT_DELAY;

    for (var i = 0; i < textLayers.length; i++) {
        for (var j = 0; j < textLayers[i].length; j++) {
            var layerInfo = textLayers[i][j];

            // 淡出关键帧
            layerInfo.opacityProp.setValueAtTime(fadeOutStartTime, 100);
            layerInfo.opacityProp.setValueAtTime(fadeOutStartTime + animDuration, 0);
        }
    }
}

// 改变文本颜色
function changeTextColor(textLayer, startTime, endTime, startColor, endColor) {
    var sourceText = textLayer.property("Source Text");
    
    // 转换16进制颜色为RGB数组
    var startRgb = hexToRgbNormalized(startColor);
    var endRgb = hexToRgbNormalized(endColor);

    // 在开始时间设置起始颜色
    var startTextDoc = sourceText.value;
    startTextDoc.fillColor = startRgb;
    sourceText.setValueAtTime(startTime, startTextDoc);

    // 在结束时间设置结束颜色
    var endTextDoc = sourceText.value;
    endTextDoc.fillColor = endRgb;
    sourceText.setValueAtTime(endTime, endTextDoc);
}

// LRC转TimeTeams函数
function lrcToTimeTeams(lrcContent) {
    var timeTeams = [];
    var timelist = [];

    // 分割LRC内容为行
    var lrcLines = lrcContent.split(/\r?\n/);

    // 正则表达式匹配LRC时间标签和歌词内容
    var lrcRegex = /\[(\d+):(\d+)(?:\.|:)?(\d+)\](.*)/;

    // 解析时间并收集歌词
    for (var i = 0; i < lrcLines.length; i++) {
        var line = lrcLines[i].trim();
        if (!line) continue;

        // 匹配时间标签
        var matches = line.match(lrcRegex);
        if (matches) {
            var minutes = matches[1];
            var seconds = matches[2];
            var milliseconds = matches[3];
            var text = matches[4].trim();

            if (text) { // 只处理有歌词内容的行
                // 处理毫秒位数（LRC可能是2位或3位）
                var msValue;
                if (milliseconds.length === 2) {
                    msValue = parseInt(milliseconds) * 10; // 2位百分秒转3位毫秒
                } else if (milliseconds.length === 3) {
                    msValue = parseInt(milliseconds);
                } else {
                    msValue = 0;
                }

                // 转换为总毫秒数
                var totalMilliseconds = (parseInt(minutes) * 60 + parseInt(seconds)) * 1000 + msValue;
                
                // 添加到时间列表（去重）
                if (timelist.indexOf(totalMilliseconds) === -1) {
                    timelist.push(totalMilliseconds);
                    
                    // 创建时间条目
                    timeTeams.push({
                        startTime: totalMilliseconds / 1000, // 转换为秒
                        endTime: 0, // 稍后计算
                        texts: [text],
                        lineNum: 1,
                        originalIndex: timeTeams.length
                    });
                } else {
                    // 如果时间已存在，合并文本内容
                    var existingIndex = timelist.indexOf(totalMilliseconds);
                    var existingTeam = timeTeams[existingIndex];
                    if (existingTeam.texts.indexOf(text) === -1) {
                        existingTeam.texts.push(text);
                        existingTeam.lineNum = existingTeam.texts.length;
                    }
                }
            }
        }
    }

    // 按开始时间排序
    timeTeams.sort(function(a, b) {
        return a.startTime - b.startTime;
    });
    timelist.sort(function(a, b) {
        return a - b;
    });

    var timelen = timelist.length - 1;

    // 计算结束时间
    for (var i = 0; i < timeTeams.length; i++) {
        var startTime = timeTeams[i].startTime * 1000; // 转回毫秒用于计算
        var num = timelist.indexOf(startTime);

        // 计算结束时间
        var endTime;
        if (num < timelen) {
            endTime = timelist[num + 1] / 1000; // 转换为秒
        } else {
            endTime = (startTime + 7000) / 1000; // 最后一句显示7秒，转换为秒
        }

        timeTeams[i].endTime = endTime;
        timeTeams[i].originalIndex = i; // 更新排序后的索引
    }

    return timeTeams;
}

