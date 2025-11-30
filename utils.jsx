// utils.jsx - 工具函数

#include "config.jsx"

function jswt(jsstr) {
    $.writeln(jsstr);
}
function getFilePathWithoutExtension(filePath) {
    if (!filePath || typeof filePath !== 'string') {
        return '';
    }

    // 提取文件名（不含路径）
    var fileName = filePath;

    // 去除扩展名
    var lastDot = fileName.lastIndexOf('.');
    if (lastDot !== -1) {
        return fileName.substring(0, lastDot);
    }

    return fileName;
}
function getFileNameWithoutExtension(filePath) {
    if (!filePath || typeof filePath !== 'string') {
        return '';
    }

    // 提取文件名（不含路径）
    var fileName = filePath;

    // 处理Windows路径分隔符
    var lastBackslash = fileName.lastIndexOf('\\');
    if (lastBackslash !== -1) {
        fileName = fileName.substring(lastBackslash + 1);
    }

    // 处理Unix路径分隔符
    var lastSlash = fileName.lastIndexOf('/');
    if (lastSlash !== -1) {
        fileName = fileName.substring(lastSlash + 1);
    }

    // 去除扩展名
    var lastDot = fileName.lastIndexOf('.');
    if (lastDot !== -1) {
        return fileName.substring(0, lastDot);
    }

    return fileName;
}

function getAllFilePaths(folderPath) {
    var folder = new Folder(folderPath);
    if (!folder.exists) {
        alert("文件夹不存在: " + folderPath);
        return [];
    }

    var files = folder.getFiles();
    var filePaths = [];

    for (var i = 0; i < files.length; i++) {
        if (files[i] instanceof File) {
            filePaths.push(files[i].fsName);
        }
    }

    return filePaths;
}

function getOneFilePaths(folderPath) {
    var folder = new Folder(folderPath);
    if (!folder.exists) {
        alert("文件夹不存在: " + folderPath);
        return [];
    }

    var files = folder.getFiles();
    var filePaths = [];

    for (var i = 0; i < files.length; i++) {
        if (files[i] instanceof File) {
            return files[i].fsName;
        }
    }

    return "";
}

function hasOpenProject() {
    try {
        if (app.project.numItems > 1) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

function copyFileWithRenameAndOverwrite(sourceFilePath) {
    // 1. 验证输入参数
    if (!sourceFilePath) {
        $.writeln("错误：源文件路径、目标目录或新文件名不能为空！");
        return false;
    }

    // 2. 创建源文件和目标目录对象
    var sourceFile = new File(sourceFilePath);
    var targetDir = new Folder("./cache");
    
    // 4. 检查目标目录是否存在，不存在则创建
    if (!targetDir.exists) {
        $.writeln("目标目录不存在，尝试创建...");
        var dirCreated = targetDir.create(); // 递归创建多级目录
        if (!dirCreated) {
            $.writeln("错误：无法创建目标目录 - " + targetDir.fsName);
            return false;
        }
        $.writeln("目标目录创建成功：" + targetDir.fsName);
    }

    var targetFile = new File("./cache/temp.aep");

    // 6. 若目标文件已存在，先删除（实现覆盖）
    if (targetFile.exists) {
        $.writeln("目标文件已存在，准备覆盖 - " + targetFile.fsName);
        var deleteSuccess = targetFile.remove();
        if (!deleteSuccess) {
            $.writeln("错误：无法删除已存在的目标文件（可能被占用） - " + targetFile.fsName);
            return false;
        }
    }

    // 7. 复制文件
    try {
        var copySuccess = sourceFile.copy(targetFile);
        if (copySuccess) {
            $.writeln("复制模板文件到：" + targetFile.fsName);
            return true;
        } else {
            throw new Error("复制操作返回失败状态");
        }
    } catch (e) {
        $.writeln("错误：文件复制失败 - " + e.message);
        return false;
    }
}

function getAllSubdirectories(parentDir) {
    var subdirs = [];
    var folder = new Folder(parentDir);

    var items = folder.getFiles();

    // 遍历所有项目，筛选出目录
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        // 检查是否为目录且排除"."和".."
        if (item.file !== "." && item.file !== "..") {
            subdirs.push(item.fullName); // 添加绝对路径
        }
    }

    return subdirs;
}

function hexToRgbNormalized(hexColor) {
    var hex = hexColor.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16) / 255;
    var g = parseInt(hex.substring(2, 4), 16) / 255;
    var b = parseInt(hex.substring(4, 6), 16) / 255;
    return [r, g, b];
}
function configureRender(comp, outputPath) {
    if (!comp || !(comp instanceof CompItem)) return false;

    var rq = app.project.renderQueue;
    var rqItem = rq.items.add(comp);

    // 设置输出模块
    var om = rqItem.outputModule(1);
    if (!om) om = rqItem.outputModules.add();

    // 配置输出格式 (H.264为例)  H.264 - 匹配渲染设置 - 15 Mbps
    var template = "MP4";
    om.applyTemplate(template);

    // 设置输出路径
    var outputFile = new File(outputPath);
    om.file = outputFile;

    return true;
}

function ImpFile(FilePath) {
    var newFile = new File(FilePath);
    return app.project.importFile(new ImportOptions(newFile));
}