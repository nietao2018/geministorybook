export const earthZoomOutConfig = {
  zh: {
    // Metadata
    title: "地球缩放动画 - 基于图片的地球缩放效果生成器 | HeadShots.fun",
    description: "将任意图片转换为震撼的地球缩放动画。从地表近距离视角平滑缩放到太空视角，创造电影级视觉效果。支持自定义缩放参数和动画时长。",
    keywords: "地球缩放动画,图片转动画,太空视角,地球效果,缩放动画生成器,电影效果",
    
    // Page Content
    breadcrumb: {
      home: "首页",
      current: "地球缩放动画"
    },
    
    hero: {
      title: "地球缩放动画",
      subtitle: "将您的图片转化为震撼的地球缩放动画。从近距离视角逐渐缩放到太空视角，创造电影级别的视觉效果。",
      features: [
        "地球缩放效果",
        "电影级质量", 
        "自定义参数",
        "免费使用"
      ]
    },
    
    features: {
      title: "功能特性",
      subtitle: "探索地球缩放动画工具的强大功能",
      items: [
        {
          icon: "🌍",
          title: "地球视角效果",
          description: "将任意图片转化为从地球表面逐渐缩放到太空的震撼视角"
        },
        {
          icon: "🚀", 
          title: "平滑过渡",
          description: "电影级别的平滑缩放动画，从近距离到宇宙视角的完美过渡"
        },
        {
          icon: "✨",
          title: "多种缓动",
          description: "多种缓动效果模拟真实的物理运动，创造不同风格的视觉体验"
        },
        {
          icon: "🎬",
          title: "电影级质量", 
          description: "高质量渲染，适用于电影、广告和社交媒体内容制作"
        },
        {
          icon: "🎮",
          title: "交互式控制",
          description: "实时调整缩放参数、中心点和动画时长，即时预览效果"
        },
        {
          icon: "📱",
          title: "跨平台兼容",
          description: "完美适配桌面和移动设备，随时随地创造地球缩放动画"
        }
      ]
    },
    
    howToUse: {
      title: "使用说明",
      subtitle: "简单几步，创建震撼的地球缩放动画",
      steps: [
        {
          step: "1",
          title: "上传图片", 
          description: "上传任意图片作为地球表面，支持JPG、PNG、WebP等格式"
        },
        {
          step: "2",
          title: "设置参数",
          description: "调整缩放级别、起始位置、帧数和缩放速度以控制地球缩放效果"
        },
        {
          step: "3", 
          title: "生成帧",
          description: "点击生成按钮，系统自动创建地球缩放动画帧序列"
        },
        {
          step: "4",
          title: "预览下载",
          description: "预览地球缩放动画效果，满意后下载或分享您的创作"
        }
      ]
    },
    
    // Component Content
    component: {
      upload: {
        title: "上传地表图片",
        description: "上传一张图片作为地球表面，创建从近距离到太空的缩放动画",
        chooseImage: "选择地表图片",
        changeImage: "更换地表图片", 
        dragHere: "或拖拽地表图片到此处",
        supportedFormats: "支持 JPG、PNG、WebP 格式",
        uploadSuccess: "地表图片已上传成功",
        generateFrames: "生成地球缩放帧",
        generating: "生成中..."
      },
      
      examples: {
        title: "示例地表",
        description: "点击使用示例地表图片快速开始",
        items: [
          { name: "山脉地表", src: "/examples/mountain.jpg" },
          { name: "城市地表", src: "/examples/city.jpg" },
          { name: "自然地表", src: "/examples/nature.jpg" },
          { name: "太空视角", src: "/examples/space.jpg" }
        ]
      },
      
      settings: {
        title: "地球缩放设置",
        description: "调整缩放参数以获得理想的地球缩放效果",
        zoomLevels: {
          label: "缩放级别",
          description: "从地表缩放到太空的倍数"
        },
        frameCount: {
          label: "帧数", 
          description: "生成的地球缩放动画帧数"
        },
        duration: {
          label: "动画时长",
          description: "整个地球缩放动画的时长"
        },
        centerX: {
          label: "中心 X"
        },
        centerY: {
          label: "中心 Y"
        },
        centerDescription: "地球缩放中心点 (0.5, 0.5 为地表中心)"
      },
      
      easing: {
        title: "缩放缓动效果",
        description: "选择不同的缩放缓动效果模拟真实的地球脱离运动",
        options: [
          { value: "linear", label: "线性" },
          { value: "ease-in", label: "缓入" },
          { value: "ease-out", label: "缓出" }, 
          { value: "ease-in-out", label: "缓入缓出" }
        ]
      },
      
      preview: {
        title: "地球缩放预览",
        descriptions: {
          ready: "点击播放按钮预览地球缩放动画",
          generate: "点击\"生成地球缩放帧\"开始制作",
          upload: "请先上传一张地表图片"
        },
        info: {
          zoomLevel: "缩放级别",
          currentFrame: "当前帧", 
          time: "时间"
        }
      },
      
      controls: {
        startAnimation: "开始地球缩放",
        playing: "播放中...",
        downloadAnimation: "下载地球缩放动画"
      },
      
      status: {
        title: "地球缩放状态",
        labels: {
          status: "状态",
          frames: "帧数",
          progress: "进度", 
          image: "图片",
          settings: "参数"
        },
        values: {
          playing: "播放中",
          paused: "暂停",
          stopped: "停止",
          uploaded: "已上传",
          notUploaded: "未上传"
        }
      },
      
      toasts: {
        uploadSuccess: {
          title: "地表图片上传成功",
          description: "准备生成地球缩放动画"
        },
        invalidFormat: {
          title: "文件格式错误", 
          description: "请上传图片文件"
        },
        framesGenerated: {
          title: "缩放帧生成完成",
          description: "已生成 {count} 帧动画"
        },
        processingFailed: {
          title: "处理失败",
          description: "图片处理出错"
        },
        animationStarted: {
          title: "动画开始",
          description: "地球缩放动画已开始"
        },
        animationComplete: {
          title: "动画完成",
          description: "地球缩放动画已完成"
        },
        generateFirst: {
          title: "请先生成动画帧",
          description: "需要先上传图片并生成动画帧"
        },
        downloadFeature: {
          title: "下载功能开发中",
          description: "暂时支持预览，下载功能即将上线"
        }
      }
    },
    
    // JSON-LD Schema
    schema: {
      name: "地球缩放动画生成器",
      description: "将图片转换为地球缩放动画效果，从地表视角缩放到太空视角",
      featureList: [
        "图片转地球动画",
        "平滑缩放过渡", 
        "自定义参数控制",
        "电影级质量渲染"
      ]
    }
  },
  
  en: {
    // Metadata
    title: "Earth Zoom Out - Image-based Earth Zoom Animation Generator | HeadShots.fun",
    description: "Transform any image into stunning Earth zoom out animation. Smooth zoom from surface close-up to space perspective, creating cinematic visual effects. Customize zoom parameters and animation duration.",
    keywords: "earth zoom out animation,image to animation,space perspective,earth effect,zoom animation generator,cinematic effect",
    
    // Page Content
    breadcrumb: {
      home: "Home",
      current: "Earth Zoom Out"
    },
    
    hero: {
      title: "Earth Zoom Out Animation",
      subtitle: "Transform your images into stunning Earth zoom out animations. Gradually zoom from close-up view to space perspective, creating cinematic visual effects.",
      features: [
        "Earth zoom effect",
        "Cinematic quality",
        "Customizable parameters", 
        "Free to use"
      ]
    },
    
    features: {
      title: "Key Features",
      subtitle: "Explore the powerful features of Earth zoom out animation tool",
      items: [
        {
          icon: "🌍",
          title: "Earth Perspective Effect",
          description: "Transform any image into stunning zoom-out effect from Earth surface to space"
        },
        {
          icon: "🚀",
          title: "Smooth Transitions", 
          description: "Cinematic smooth zoom animation with perfect transitions from close-up to cosmic view"
        },
        {
          icon: "✨",
          title: "Dynamic Easing",
          description: "Multiple easing effects simulate realistic physics motion for different visual experiences"
        },
        {
          icon: "🎬",
          title: "Cinematic Quality",
          description: "High-quality rendering suitable for films, advertisements and social media content"
        },
        {
          icon: "🎮",
          title: "Interactive Controls",
          description: "Real-time adjustment of zoom parameters, center point and animation duration with instant preview"
        },
        {
          icon: "📱", 
          title: "Cross-platform Compatible",
          description: "Perfect compatibility for desktop and mobile devices, create Earth zoom animations anywhere"
        }
      ]
    },
    
    howToUse: {
      title: "How to Use",
      subtitle: "Create stunning Earth zoom out animation in simple steps",
      steps: [
        {
          step: "1",
          title: "Upload Image",
          description: "Upload any image as Earth surface, supports JPG, PNG, WebP and other formats"
        },
        {
          step: "2", 
          title: "Configure Settings",
          description: "Adjust zoom levels, starting position, frame count and zoom speed to control Earth zoom effect"
        },
        {
          step: "3",
          title: "Generate Frames", 
          description: "Click generate button to automatically create Earth zoom animation frame sequence"
        },
        {
          step: "4",
          title: "Preview & Download",
          description: "Preview Earth zoom animation effect, then download or share your creation"
        }
      ]
    },
    
    // Component Content
    component: {
      upload: {
        title: "Upload Earth Surface Image",
        description: "Upload an image as Earth surface to create zoom-out animation from close-up to space",
        chooseImage: "Choose Earth Image",
        changeImage: "Change Earth Image",
        dragHere: "or drag Earth image here", 
        supportedFormats: "Supports JPG, PNG, WebP formats",
        uploadSuccess: "Earth surface image uploaded successfully",
        generateFrames: "Generate Earth Zoom Frames",
        generating: "Generating..."
      },
      
      examples: {
        title: "Example Earth Surfaces",
        description: "Click to use example Earth surface images to get started quickly",
        items: [
          { name: "Mountain Terrain", src: "/examples/mountain.jpg" },
          { name: "Urban Surface", src: "/examples/city.jpg" },
          { name: "Natural Surface", src: "/examples/nature.jpg" },
          { name: "Space View", src: "/examples/space.jpg" }
        ]
      },
      
      settings: {
        title: "Earth Zoom Settings", 
        description: "Adjust zoom parameters to achieve the perfect Earth zoom effect",
        zoomLevels: {
          label: "Zoom Levels",
          description: "Zoom multiplier from surface to space"
        },
        frameCount: {
          label: "Frame Count",
          description: "Number of Earth zoom animation frames to generate"
        },
        duration: {
          label: "Animation Duration",
          description: "Total Earth zoom animation duration"
        },
        centerX: {
          label: "Center X"
        },
        centerY: {
          label: "Center Y"
        },
        centerDescription: "Earth zoom center point (0.5, 0.5 is surface center)"
      },
      
      easing: {
        title: "Zoom Easing Effect",
        description: "Choose different zoom easing effects to simulate realistic Earth departure motion",
        options: [
          { value: "linear", label: "Linear" },
          { value: "ease-in", label: "Ease In" },
          { value: "ease-out", label: "Ease Out" },
          { value: "ease-in-out", label: "Ease In-Out" }
        ]
      },
      
      preview: {
        title: "Earth Zoom Preview",
        descriptions: {
          ready: "Click play button to preview Earth zoom animation",
          generate: "Click \"Generate Earth Zoom Frames\" to start creating",
          upload: "Please upload an Earth surface image first"
        },
        info: {
          zoomLevel: "Zoom Level",
          currentFrame: "Current Frame",
          time: "Time"
        }
      },
      
      controls: {
        startAnimation: "Start Earth Zoom",
        playing: "Playing...",
        downloadAnimation: "Download Earth Zoom Animation"
      },
      
      status: {
        title: "Earth Zoom Status",
        labels: {
          status: "Status",
          frames: "Frames", 
          progress: "Progress",
          image: "Image",
          settings: "Settings"
        },
        values: {
          playing: "Playing",
          paused: "Paused", 
          stopped: "Stopped",
          uploaded: "Uploaded",
          notUploaded: "Not uploaded"
        }
      },
      
      toasts: {
        uploadSuccess: {
          title: "Earth Surface Image Uploaded",
          description: "Ready to generate Earth zoom animation"
        },
        invalidFormat: {
          title: "Invalid File Format",
          description: "Please upload an image file"
        },
        framesGenerated: {
          title: "Zoom Frames Generated",
          description: "Generated {count} animation frames"
        },
        processingFailed: {
          title: "Processing Failed",
          description: "Error processing image"
        },
        animationStarted: {
          title: "Animation Started", 
          description: "Earth zoom animation started"
        },
        animationComplete: {
          title: "Animation Complete",
          description: "Earth zoom animation completed"
        },
        generateFirst: {
          title: "Please Generate Frames First",
          description: "Upload an image and generate frames first"
        },
        downloadFeature: {
          title: "Download Feature Coming Soon",
          description: "Preview available, download feature coming soon"
        }
      }
    },
    
    // JSON-LD Schema
    schema: {
      name: "Earth Zoom Out Animation Generator",
      description: "Transform images into Earth zoom out animation effects from surface to space perspective",
      featureList: [
        "Image to Earth animation",
        "Smooth zoom transitions",
        "Customizable parameters",
        "Cinematic quality rendering"
      ]
    }
  }
} as const;

export type EarthZoomOutConfigType = typeof earthZoomOutConfig;
export type Locale = keyof EarthZoomOutConfigType;