// config.jsx - 配置信息脚本

// ==================== 配置区域 ====================

// 素材文件夹路径，必填
var CONFIG = {
    FOLDER_PATH: "D:/Temp/新建文件夹",
    
    // aep模板文件路径，必填
    AEP_PATH: "D:/Kin-project/JSProjects/MusicDynamic/template.aep",
    
    // 艺术家名称，填写后覆盖WAV 音乐文件名的艺术家，可不填
    ARTIST_NAME: "",
    
    // 副标题名称，可不填
    VERSION_NAME: "",
    
    // ==================== 字幕样式配置区域 ====================
    SUBTITLE: {
        // 合成设置
        COMPOSITION: {
            WIDTH: 1920,
            HEIGHT: 430,
            Position: [960, 865],
            FPS: 25,
            NAME: "滚动字幕"
        },
        
        // 文本样式
        TEXT_STYLE: {
            NORMAL_COLOR: "#FFFFFF", // 白色
            HIGHLIGHT_COLOR: "#FFCC33", // 金色
            JUSTIFICATION: ParagraphJustification.CENTER_JUSTIFY
        },
        
        MAIN_TEXT_STYLE: {
            FONT_SIZE: 36,
            STROKE_WIDTH: 6,
            OPACITY: 100,
        },
        
        SUB_TEXT_STYLE: {
            FONT_SIZE: 24,
            STROKE_WIDTH: 4,
            OPACITY: 80,
        },
        
        // 布局设置
        LAYOUT: {
            LINE_SPACING: 6, // 行间距
            PARAGRAPH_SPACING: 12, // 段间距
            INITIAL_OFFSET: 90 // 初始偏移
        },
        
        // 动画设置
        ANIMATION: {
            DURATION: 0.5, // 动画持续时间（秒）
            HIGHLIGHT_SCALE: 120, // 强调缩放百分比
            NORMAL_SCALE: 100, // 正常缩放百分比
            FADE_OUT_DELAY: 4 // 淡出延迟（秒）
        }
    }
};

// ==================== 配置区域结束 ====================