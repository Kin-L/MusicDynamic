// gui.jsx - 配置GUI系统
#include "config.jsx"

#include "utils.jsx"

#include "subtitle.jsx"

// 修改颜色验证函数

// 创建主窗口
var dialog = new Window("dialog", "视频制作配置系统");
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.preferredSize = [500, 500];

// 创建选项卡面板
var tabPanel = dialog.add("tabbedpanel");
tabPanel.preferredSize = [480, 400];

// ==================== 基本配置选项卡 ====================
var basicTab = tabPanel.add("tab", undefined, "基本配置");
basicTab.orientation = "column";
basicTab.alignChildren = ["left", "top"];

// 文件夹配置区域
var folderGroup = basicTab.add("group");
folderGroup.orientation = "column";
folderGroup.alignChildren = ["left", "center"];
folderGroup.preferredSize = [560, 80];

var folderLabel = folderGroup.add("statictext", undefined, "素材文件夹路径:");
folderLabel.preferredSize = [560, 20];

var folderPathGroup = folderGroup.add("group");
folderPathGroup.preferredSize = [560, 30];

var folderText = folderPathGroup.add("edittext", undefined, CONFIG.FOLDER_PATH);
folderText.preferredSize = [480, 25];

var folderButton = folderPathGroup.add("button", undefined, "浏览");
folderButton.preferredSize = [60, 25];

var createGroup = folderGroup.add("group");
createGroup.preferredSize = [560, 30];

var createLabel = createGroup.add("statictext", undefined, "在素材文件夹路径创建目录结构:");
createLabel.preferredSize = [200, 20];

var createButton = createGroup.add("button", undefined, "创建目录");
createButton.preferredSize = [100, 25];
// AEP模板配置区域
var aepGroup = basicTab.add("group");
aepGroup.orientation = "column";
aepGroup.alignChildren = ["left", "center"];
aepGroup.preferredSize = [560, 80];

var aepLabel = aepGroup.add("statictext", undefined, "AEP模板文件路径:");
aepLabel.preferredSize = [560, 20];

var aepPathGroup = aepGroup.add("group");
aepPathGroup.preferredSize = [560, 30];

var aepText = aepPathGroup.add("edittext", undefined, CONFIG.AEP_PATH);
aepText.preferredSize = [480, 25];

var aepButton = aepPathGroup.add("button", undefined, "浏览");
aepButton.preferredSize = [60, 25];

// 基本信息配置区域
var infoGroup = basicTab.add("group");
infoGroup.orientation = "row";
infoGroup.alignChildren = ["left", "center"];
infoGroup.preferredSize = [560, 60];

var artistGroup = infoGroup.add("group");
artistGroup.orientation = "column";
artistGroup.preferredSize = [270, 60];

var artistLabel = artistGroup.add("statictext", undefined, "艺术家名称:");
artistLabel.preferredSize = [270, 20];
var artistText = artistGroup.add("edittext", undefined, CONFIG.ARTIST_NAME);
artistText.preferredSize = [270, 25];

var versionGroup = infoGroup.add("group");
versionGroup.orientation = "column";
versionGroup.preferredSize = [270, 60];

var versionLabel = versionGroup.add("statictext", undefined, "副标题名称:");
versionLabel.preferredSize = [270, 20];
var versionText = versionGroup.add("edittext", undefined, CONFIG.VERSION_NAME);
versionText.preferredSize = [270, 25];

// ==================== 字幕配置选项卡 ====================
var subtitleTab = tabPanel.add("tab", undefined, "字幕配置");
subtitleTab.orientation = "column";
subtitleTab.alignChildren = ["left", "top"];

// 合成设置
var compGroup = subtitleTab.add("group");
compGroup.orientation = "column";
compGroup.alignChildren = ["left", "center"];
compGroup.preferredSize = [560, 120];

var compLabel = compGroup.add("statictext", undefined, "合成设置:");
compLabel.preferredSize = [560, 20];
compLabel.graphics.font = ScriptUI.newFont("Arial", "BOLD", 12);

var compRow1 = compGroup.add("group");
compRow1.preferredSize = [560, 30];

var widthLabel = compRow1.add("statictext", undefined, "宽度:");
widthLabel.preferredSize = [60, 25];
var widthText = compRow1.add("edittext", undefined, CONFIG.SUBTITLE.COMPOSITION.WIDTH.toString());
widthText.preferredSize = [80, 25];

var heightLabel = compRow1.add("statictext", undefined, "高度:");
heightLabel.preferredSize = [60, 25];
var heightText = compRow1.add("edittext", undefined, CONFIG.SUBTITLE.COMPOSITION.HEIGHT.toString());
heightText.preferredSize = [80, 25];

var fpsLabel = compRow1.add("statictext", undefined, "帧率:");
fpsLabel.preferredSize = [60, 25];
var fpsText = compRow1.add("edittext", undefined, CONFIG.SUBTITLE.COMPOSITION.FPS.toString());
fpsText.preferredSize = [80, 25];

var compRow2 = compGroup.add("group");
compRow2.preferredSize = [560, 30];

var posXLabel = compRow2.add("statictext", undefined, "位置 X:");
posXLabel.preferredSize = [60, 25];
var posXText = compRow2.add("edittext", undefined, CONFIG.SUBTITLE.COMPOSITION.Position[0].toString());
posXText.preferredSize = [80, 25];

var posYLabel = compRow2.add("statictext", undefined, "位置 Y:");
posYLabel.preferredSize = [60, 25];
var posYText = compRow2.add("edittext", undefined, CONFIG.SUBTITLE.COMPOSITION.Position[1].toString());
posYText.preferredSize = [80, 25];

var nameLabel = compRow2.add("statictext", undefined, "合成名称:");
nameLabel.preferredSize = [80, 25];
var nameText = compRow2.add("edittext", undefined, CONFIG.SUBTITLE.COMPOSITION.NAME);
nameText.preferredSize = [120, 25];

// 文本样式设置
var textStyleGroup = subtitleTab.add("group");
textStyleGroup.orientation = "column";
textStyleGroup.alignChildren = ["left", "center"];
textStyleGroup.preferredSize = [560, 120];

var textStyleLabel = textStyleGroup.add("statictext", undefined, "文本样式:");
textStyleLabel.preferredSize = [560, 20];
textStyleLabel.graphics.font = ScriptUI.newFont("Arial", "BOLD", 12);

var textStyleRow1 = textStyleGroup.add("group");
textStyleRow1.preferredSize = [560, 30];

var fontSizeLabelm = textStyleRow1.add("statictext", undefined, "主行字体大小:");
fontSizeLabelm.preferredSize = [100, 25];
var fontSizeTextm = textStyleRow1.add("edittext", undefined, CONFIG.SUBTITLE.MAIN_TEXT_STYLE.FONT_SIZE.toString());
fontSizeTextm.preferredSize = [60, 25];

var strokeLabelm = textStyleRow1.add("statictext", undefined, "描边宽度:");
strokeLabelm.preferredSize = [80, 25];
var strokeTextm = textStyleRow1.add("edittext", undefined, CONFIG.SUBTITLE.MAIN_TEXT_STYLE.STROKE_WIDTH.toString());
strokeTextm.preferredSize = [60, 25];

var opacityLabelm = textStyleRow1.add("statictext", undefined, "透明度(%):");
opacityLabelm.preferredSize = [80, 25];
var opacityTextm = textStyleRow1.add("edittext", undefined, CONFIG.SUBTITLE.MAIN_TEXT_STYLE.OPACITY.toString());
opacityTextm.preferredSize = [60, 25];

var textStyleRow3 = textStyleGroup.add("group");
textStyleRow3.preferredSize = [560, 30];

var fontSizeLabels = textStyleRow3.add("statictext", undefined, "副行字体大小:");
fontSizeLabels.preferredSize = [100, 25];
var fontSizeTexts = textStyleRow3.add("edittext", undefined, CONFIG.SUBTITLE.SUB_TEXT_STYLE.FONT_SIZE.toString());
fontSizeTexts.preferredSize = [60, 25];

var strokeLabels = textStyleRow3.add("statictext", undefined, "描边宽度:");
strokeLabels.preferredSize = [80, 25];
var strokeTexts = textStyleRow3.add("edittext", undefined, CONFIG.SUBTITLE.SUB_TEXT_STYLE.STROKE_WIDTH.toString());
strokeTexts.preferredSize = [60, 25];

var opacityLabels = textStyleRow3.add("statictext", undefined, "透明度(%):");
opacityLabels.preferredSize = [80, 25];
var opacityTexts = textStyleRow3.add("edittext", undefined, CONFIG.SUBTITLE.SUB_TEXT_STYLE.OPACITY.toString());
opacityTexts.preferredSize = [60, 25];

var textStyleRow2 = textStyleGroup.add("group");
textStyleRow2.preferredSize = [560, 30];

var normalColorLabel = textStyleRow2.add("statictext", undefined, "普通颜色(16进制RGB值):");
normalColorLabel.preferredSize = [80, 25];
var normalColorText = textStyleRow2.add("edittext", undefined, CONFIG.SUBTITLE.TEXT_STYLE.NORMAL_COLOR);
normalColorText.preferredSize = [120, 25];

var highlightColorLabel = textStyleRow2.add("statictext", undefined, "高亮颜色(16进制RGB值):");
highlightColorLabel.preferredSize = [80, 25];
var highlightColorText = textStyleRow2.add("edittext", undefined, CONFIG.SUBTITLE.TEXT_STYLE.HIGHLIGHT_COLOR);
highlightColorText.preferredSize = [120, 25];

// 布局设置
var layoutGroup = subtitleTab.add("group");
layoutGroup.orientation = "column";
layoutGroup.alignChildren = ["left", "center"];
layoutGroup.preferredSize = [560, 100];

var layoutLabel = layoutGroup.add("statictext", undefined, "布局设置:");
layoutLabel.preferredSize = [560, 20];
layoutLabel.graphics.font = ScriptUI.newFont("Arial", "BOLD", 12);

var layoutRow1 = layoutGroup.add("group");
layoutRow1.preferredSize = [560, 30];

var lineSpacingLabel = layoutRow1.add("statictext", undefined, "行间距:");
lineSpacingLabel.preferredSize = [80, 25];
var lineSpacingText = layoutRow1.add("edittext", undefined, CONFIG.SUBTITLE.LAYOUT.LINE_SPACING.toString());
lineSpacingText.preferredSize = [80, 25];

var paraSpacingLabel = layoutRow1.add("statictext", undefined, "段间距:");
paraSpacingLabel.preferredSize = [80, 25];
var paraSpacingText = layoutRow1.add("edittext", undefined, CONFIG.SUBTITLE.LAYOUT.PARAGRAPH_SPACING.toString());
paraSpacingText.preferredSize = [80, 25];

var initialOffsetLabel = layoutRow1.add("statictext", undefined, "初始偏移:");
initialOffsetLabel.preferredSize = [80, 25];
var initialOffsetText = layoutRow1.add("edittext", undefined, CONFIG.SUBTITLE.LAYOUT.INITIAL_OFFSET.toString());
initialOffsetText.preferredSize = [80, 25];

// 动画设置
var animationGroup = subtitleTab.add("group");
animationGroup.orientation = "column";
animationGroup.alignChildren = ["left", "center"];
animationGroup.preferredSize = [560, 100];

var animationLabel = animationGroup.add("statictext", undefined, "动画设置:");
animationLabel.preferredSize = [560, 20];
animationLabel.graphics.font = ScriptUI.newFont("Arial", "BOLD", 12);

var animationRow1 = animationGroup.add("group");
animationRow1.preferredSize = [560, 30];

var durationLabel = animationRow1.add("statictext", undefined, "动画时长:");
durationLabel.preferredSize = [80, 25];
var durationText = animationRow1.add("edittext", undefined, CONFIG.SUBTITLE.ANIMATION.DURATION.toString());
durationText.preferredSize = [80, 25];
durationText.helpTip = "秒";

var fadeDelayLabel = animationRow1.add("statictext", undefined, "淡出延迟:");
fadeDelayLabel.preferredSize = [80, 25];
var fadeDelayText = animationRow1.add("edittext", undefined, CONFIG.SUBTITLE.ANIMATION.FADE_OUT_DELAY.toString());
fadeDelayText.preferredSize = [80, 25];
fadeDelayText.helpTip = "秒";

var animationRow2 = animationGroup.add("group");
animationRow2.preferredSize = [560, 30];

var normalScaleLabel = animationRow2.add("statictext", undefined, "正常缩放:");
normalScaleLabel.preferredSize = [80, 25];
var normalScaleText = animationRow2.add("edittext", undefined, CONFIG.SUBTITLE.ANIMATION.NORMAL_SCALE.toString());
normalScaleText.preferredSize = [80, 25];
normalScaleText.helpTip = "百分比";

var highlightScaleLabel = animationRow2.add("statictext", undefined, "高亮缩放:");
highlightScaleLabel.preferredSize = [80, 25];
var highlightScaleText = animationRow2.add("edittext", undefined, CONFIG.SUBTITLE.ANIMATION.HIGHLIGHT_SCALE.toString());
highlightScaleText.preferredSize = [80, 25];
highlightScaleText.helpTip = "百分比";

// ==================== 按钮区域 ====================
var buttonGroup = dialog.add("group");
buttonGroup.orientation = "row";
buttonGroup.alignChildren = ["center", "center"];
buttonGroup.preferredSize = [580, 40];

var saveButton = buttonGroup.add("button", undefined, "保存配置");
saveButton.preferredSize = [100, 30];

var runButton = buttonGroup.add("button", undefined, "运行主程序");
runButton.preferredSize = [100, 30];

var cancelButton = buttonGroup.add("button", undefined, "取消");
cancelButton.preferredSize = [100, 30];

// ==================== 事件处理 ====================
// 浏览文件夹
folderButton.onClick = function() {
	var selectedFolder = Folder.selectDialog("选择素材文件夹");
	if (selectedFolder) {
		folderText.text = selectedFolder.fsName;
	}
};

// 浏览AEP文件
aepButton.onClick = function() {
	var selectedFile = File.openDialog("选择AEP模板文件", "*.aep");
	if (selectedFile) {
		aepText.text = selectedFile.fsName;
	}
};

// 创建目录结构
createButton.onClick = function() {
	var baseFolderPath = folderText.text;
	if (!baseFolderPath) {
		alert("请先设置素材文件夹路径");
		return;
	}

	createDirectoryStructure(baseFolderPath, 0);
};

// 保存配置
saveButton.onClick = function() {
	if (saveConfig()) {
		alert("配置保存成功！");
	}
};

// 运行主程序
runButton.onClick = function() {
	if (saveConfig()) {
		// 运行主程序
		$.evalFile(File($.fileName).path + "/main.jsx");

	}
};

// 取消
cancelButton.onClick = function() {
	dialog.close();
};

// ==================== 功能函数 ====================

// 创建目录结构函数
function createDirectoryStructure(baseFolderPath, num) {
	try {
		// 创建主目录结构
		var mainFolders = ["音乐", "背景图层", "封面图层", "碟片图层", "歌词"];

		for (var i = 0; i < mainFolders.length; i++) {
			var folderPath = new Folder(baseFolderPath + "/" + mainFolders[i]);
			if (!folderPath.exists) {
				folderPath.create();
			}
		}

		// 创建素材组
		for (var j = 1; j <= num; j++) {
			var materialGroup = "素材组" + j;
			var materialPath = new Folder(baseFolderPath + "/" + materialGroup);
			if (!materialPath.exists) {
				materialPath.create();
			}

			// 在每个素材组下创建子目录
			for (var k = 0; k < mainFolders.length; k++) {
				var subFolderPath = new Folder(materialPath.fsName + "/" + mainFolders[k]);
				if (!subFolderPath.exists) {
					subFolderPath.create();
				}
			}
		}

		alert("目录结构创建成功！\n在 " + baseFolderPath + " 中创建了 " + num + " 个素材组");

	} catch (e) {
		alert("创建目录时出现错误：" + e.toString());
	}
}

// 验证颜色格式
function validateColor(colorText) {
	return /^#[0-9A-F]{6}$/i.test(colorText);
}

// 保存配置到config.jsx
function saveConfig() {
	// 验证颜色格式
	if (!validateColor(normalColorText.text)) {
		alert("错误：普通颜色格式不正确！\n请使用RGB格式，如：#FFFFFF");
		normalColorText.active = true;
		return false;
	}

	if (!validateColor(highlightColorText.text)) {
		alert("错误：高亮颜色格式不正确！\n请使用RGB格式，如：#FFCC33");
		highlightColorText.active = true;
		return false;
	}

	// 验证数字字段
	var numberFields = [{
                field: widthText,
                name: "合成宽度"
            },
            {
                field: heightText,
                name: "合成高度"
            },
            {
                field: fpsText,
                name: "帧率"
            },
            {
                field: posXText,
                name: "位置X"
            },
            {
                field: posYText,
                name: "位置Y"
            },
            {
                field: fontSizeTextm,
                name: "主行字体大小"
            },
            {
                field: strokeTextm,
                name: "描边宽度"
            },
            {
                field: strokeTextm,
                name: "透明度(%):"
            },
            {
                field: fontSizeTexts,
                name: "副行字体大小"
            },
            {
                field: strokeTexts,
                name: "描边宽度"
            },
            {
                field: strokeTexts,
                name: "透明度(%):"
            },
            {
                field: lineSpacingText,
                name: "行间距"
            },
            {
                field: paraSpacingText,
                name: "段间距"
            },
            {
                field: initialOffsetText,
                name: "初始偏移"
            },
            {
                field: durationText,
                name: "动画时长"
            },
            {
                field: fadeDelayText,
                name: "淡出延迟"
            },
            {
                field: normalScaleText,
                name: "正常缩放"
            },
            {
                field: highlightScaleText,
                name: "高亮缩放"
            }
        ];

	for (var i = 0; i < numberFields.length; i++) {
		var field = numberFields[i];
		var value = parseFloat(field.field.text);
		if (isNaN(value)) {
			alert("错误：" + field.name + "必须是数字！");
			field.field.active = true;
			return false;
		}
	}

	var configContent = generateConfigContent();
	var configFile = new File(File($.fileName).path + "/config.jsx");

	try {
		configFile.open("w");
		configFile.write(configContent);
		configFile.close();

		// 重新加载配置
		$.evalFile(configFile);
		return true;

	} catch (e) {
		alert("保存配置时出错：" + e.toString());
		return false;
	}
}

// 生成配置文件内容（优化版）
function generateConfigContent() {
	var content = '// config.jsx - 配置信息脚本\n\n';
	content += '// ==================== 配置区域 ====================\n\n';
	content += '// 素材文件夹路径，必填\n';
	content += 'var CONFIG = {\n';
	content += '    FOLDER_PATH: "' + folderText.text + '",\n';
	content += '    \n';
	content += '    // aep模板文件路径，必填\n';
	content += '    AEP_PATH: "' + aepText.text + '",\n';
	content += '    \n';
	content += '    // 艺术家名称，填写后覆盖WAV 音乐文件名的艺术家，可不填\n';
	content += '    ARTIST_NAME: "' + artistText.text + '",\n';
	content += '    \n';
	content += '    // 副标题名称，可不填\n';
	content += '    VERSION_NAME: "' + versionText.text + '",\n';
	content += '    \n';
	content += '    // ==================== 字幕样式配置区域 ====================\n';
	content += '    SUBTITLE: {\n';
	content += '        // 合成设置\n';
	content += '        COMPOSITION: {\n';
	content += '            WIDTH: ' + parseInt(widthText.text) + ',\n';
	content += '            HEIGHT: ' + parseInt(heightText.text) + ',\n';
	content += '            Position: [' + parseFloat(posXText.text) + ', ' + parseFloat(posYText.text) + '],\n';
	content += '            FPS: ' + parseInt(fpsText.text) + ',\n';
	content += '            NAME: "' + nameText.text + '"\n';
	content += '        },\n';
	content += '        \n';
	content += '        // 文本样式\n';
	content += '        TEXT_STYLE: {\n';
	content += '            NORMAL_COLOR: "' + normalColorText.text + '", // 白色\n';
	content += '            HIGHLIGHT_COLOR: "' + highlightColorText.text + '", // 金色\n';
	content += '            JUSTIFICATION: ParagraphJustification.CENTER_JUSTIFY\n';
	content += '        },\n';
	content += '        \n';
	content += '        MAIN_TEXT_STYLE: {\n';
	content += '            FONT_SIZE: ' + parseFloat(fontSizeTextm.text) + ',\n';
	content += '            STROKE_WIDTH: ' + parseFloat(strokeTextm.text) + ',\n';
	content += '            OPACITY: ' + parseFloat(opacityTextm.text) + ',\n';
	content += '        },\n';
	content += '        \n';
	content += '        SUB_TEXT_STYLE: {\n';
	content += '            FONT_SIZE: ' + parseFloat(fontSizeTexts.text) + ',\n';
	content += '            STROKE_WIDTH: ' + parseFloat(strokeTexts.text) + ',\n';
	content += '            OPACITY: ' + parseFloat(opacityTexts.text) + ',\n';
	content += '        },\n';
	content += '        \n';
	content += '        // 布局设置\n';
	content += '        LAYOUT: {\n';
	content += '            LINE_SPACING: ' + parseFloat(lineSpacingText.text) + ', // 行间距\n';
	content += '            PARAGRAPH_SPACING: ' + parseFloat(paraSpacingText.text) + ', // 段间距\n';
	content += '            INITIAL_OFFSET: ' + parseFloat(initialOffsetText.text) + ' // 初始偏移\n';
	content += '        },\n';
	content += '        \n';
	content += '        // 动画设置\n';
	content += '        ANIMATION: {\n';
	content += '            DURATION: ' + parseFloat(durationText.text) + ', // 动画持续时间（秒）\n';
	content += '            HIGHLIGHT_SCALE: ' + parseFloat(highlightScaleText.text) + ', // 强调缩放百分比\n';
	content += '            NORMAL_SCALE: ' + parseFloat(normalScaleText.text) + ', // 正常缩放百分比\n';
	content += '            FADE_OUT_DELAY: ' + parseFloat(fadeDelayText.text) + ' // 淡出延迟（秒）\n';
	content += '        }\n';
	content += '    }\n';
	content += '};\n\n';
	content += '// ==================== 配置区域结束 ====================';

	return content;
}

// 显示对话框
dialog.show();