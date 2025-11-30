// start.jsx - 程序启动入口
(function() {
    // 启动GUI配置界面
    $.evalFile(File($.fileName).path + "/gui.jsx");
})();