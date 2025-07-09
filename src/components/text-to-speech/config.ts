// Base configuration with multilingual support
const baseConfig = {
  mainNav: [
    {
      path: "podcast-voice-generator",
      title: "AI Podcast Voice Generator",
      subTitle: "Create professional podcast voices with AI. Multiple accents, natural-sounding speech for content creators.",
      src: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/ai-audio/tts-demo.mp3",
      metaData: {
        title: "AI Podcast Voice Generator | Converters.pro",
        description: "Generate professional podcast voices with AI. Natural-sounding speech in multiple languages and accents for content creators.",
        keywords: "AI podcast voice, voice generator, text to speech, podcast narration, AI voice over, content creation"
      },
      steps: [
        {
          title: "Write Your Script",
          subTitle: "Enter your podcast script or episode content. Our AI supports up to 10,000 characters per generation, perfect for podcast segments, introductions, or full episodes. The tool is designed for podcasters, content creators, and media professionals who want high-quality voice narration without hiring voice actors. Writing your script is the first step to creating engaging audio content that will captivate your audience.",
          src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Choose Voice Style",
          subTitle: "Select from a variety of professional podcast voices, including different genders, accents, and speaking styles. Our AI voices are trained on thousands of hours of professional podcast content, ensuring natural intonation and pacing. Choose the voice that best matches your brand and audience. Each voice has unique characteristics that can enhance your content's appeal and professionalism.",
          src: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Generate & Download",
          subTitle: "Generate your podcast audio in high-quality MP3 format. The AI produces natural speech with proper pronunciation, timing, and emotion. Download your audio and use it directly in your podcast episodes, social media content, or marketing materials. No royalty fees, unlimited downloads, and full commercial usage rights included.",
          src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80"
        }
      ],
      featureTitle: "Podcast Voice Generator",
      faqs: [
        {
          question: "How long can my podcast script be?",
          answer: "You can generate up to 10,000 characters per session, which is typically 15-20 minutes of audio content."
        },
        {
          question: "What audio formats are supported?",
          answer: "We provide high-quality MP3 files optimized for podcast distribution and streaming platforms."
        },
        {
          question: "Can I use the generated voice commercially?",
          answer: "Yes, all generated audio comes with full commercial usage rights for your podcast and content."
        },
        {
          question: "How natural do the AI voices sound?",
          answer: "Our AI voices are trained on professional podcast content and sound remarkably natural with proper intonation."
        }
      ]
    },
    {
      path: "audiobook-narrator",
      title: "AI Audiobook Narrator Generator",
      subTitle: "Transform your written content into professional audiobooks with AI narration. Multiple voice options available.",
      src: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/ai-audio/audiobook-demo.mp3",
      metaData: {
        title: "AI Audiobook Narrator Generator | Converters.pro",
        description: "Create professional audiobook narration with AI. Transform your books into engaging audio content with natural-sounding voices.",
        keywords: "AI audiobook narrator, audiobook generator, text to speech, book narration, AI voice over, publishing"
      },
      steps: [
        {
          title: "Upload Your Manuscript",
          subTitle: "Upload your book chapters or manuscript text. Our system handles long-form content with chapter breaks and proper pacing. Perfect for authors, publishers, and content creators who want to make their written content accessible as audiobooks. The tool maintains narrative flow and handles dialogue, descriptions, and different text elements appropriately.",
          src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Select Narrator Voice",
          subTitle: "Choose from our collection of professional narrator voices. Each voice is optimized for long-form content with consistent tone and pacing. Select based on your book's genre, target audience, and personal preference. Our AI maintains character consistency and appropriate emotional expression throughout your entire audiobook.",
          src: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Generate Audiobook",
          subTitle: "Process your entire book or individual chapters. The AI creates professional audiobook files with proper chapter divisions, consistent narration quality, and optimized audio levels. Export in standard audiobook formats compatible with major platforms and distribution services. Perfect for self-publishing authors and content creators.",
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
        }
      ],
      featureTitle: "Audiobook Narrator",
      faqs: [
        {
          question: "How long does it take to generate an audiobook?",
          answer: "Processing time depends on content length, typically 1-2 minutes per 1000 words of text."
        },
        {
          question: "Can I preview different narrator voices?",
          answer: "Yes, you can test different voices with sample text before generating your full audiobook."
        },
        {
          question: "What's the maximum book length supported?",
          answer: "We support full-length books up to 500,000 words, processed in manageable chapters."
        },
        {
          question: "Are the audiobooks compatible with major platforms?",
          answer: "Yes, our output formats are compatible with Audible, Apple Books, and other major audiobook platforms."
        }
      ]
    },
    {
      path: "multilingual-tts",
      title: "Multilingual Text-to-Speech Converter",
      subTitle: "Convert text to speech in 50+ languages with native-like pronunciation and natural intonation.",
      src: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/ai-audio/multilingual-demo.mp3",
      metaData: {
        title: "Multilingual Text-to-Speech Converter | Converters.pro",
        description: "Convert text to natural speech in 50+ languages. AI-powered multilingual voice synthesis with native pronunciation.",
        keywords: "multilingual TTS, text to speech languages, AI voice synthesis, global voice generator, international TTS"
      },
      steps: [
        {
          title: "Enter Text & Select Language",
          subTitle: "Input your text and choose from 50+ supported languages including English, Spanish, French, German, Chinese, Japanese, and many more. Our AI automatically detects language context and applies appropriate pronunciation rules, accents, and cultural speech patterns. Perfect for global businesses, educators, and content creators reaching international audiences.",
          src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Choose Regional Voice",
          subTitle: "Select specific regional accents and voice characteristics for your chosen language. For example, choose between American, British, or Australian English, or different regional variants of Spanish, French, or Chinese. Each voice captures the unique pronunciation and cultural nuances of its region, ensuring authentic-sounding speech.",
          src: "https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Generate Global Audio",
          subTitle: "Create professional multilingual audio content for international use. The AI handles complex language structures, proper names, and technical terms with accuracy. Export your audio for use in global marketing, e-learning, customer service, or any international communication needs. High-quality output suitable for professional applications.",
          src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80"
        }
      ],
      featureTitle: "Multilingual TTS",
      faqs: [
        {
          question: "Which languages are supported?",
          answer: "We support 50+ languages including all major world languages with regional variants and accents."
        },
        {
          question: "How accurate is the pronunciation?",
          answer: "Our AI uses native speaker training data to ensure authentic pronunciation and natural intonation."
        },
        {
          question: "Can I mix multiple languages in one text?",
          answer: "Yes, our system can handle multilingual text and automatically switch between languages appropriately."
        },
        {
          question: "Are technical terms pronounced correctly?",
          answer: "Yes, our AI is trained on diverse content including technical, medical, and specialized terminology."
        }
      ]
    },
    {
      path: "voice-cloning",
      title: "AI Voice Cloning & Synthesis",
      subTitle: "Create custom AI voices based on voice samples. Professional voice cloning for content creation and personalization.",
      src: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/ai-audio/voice-clone-demo.mp3",
      metaData: {
        title: "AI Voice Cloning & Synthesis | Converters.pro",
        description: "Clone voices with AI technology. Create custom synthetic voices for content creation, personalization, and media production.",
        keywords: "AI voice cloning, voice synthesis, custom voice generator, voice replication, synthetic voice"
      },
      steps: [
        {
          title: "Provide Voice Sample",
          subTitle: "Upload a clear audio sample of the target voice (minimum 10 minutes for best results). Our AI analyzes vocal characteristics including tone, pitch, accent, and speaking patterns. The system works with various audio qualities and formats. Ideal for creating custom brand voices, personalizing content, or preserving unique vocal characteristics for creative projects.",
          src: "https://images.unsplash.com/photo-1590650213165-d4c62d176a5f?auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "AI Voice Training",
          subTitle: "Our advanced AI processes the voice sample to learn unique vocal characteristics and speaking patterns. The training creates a personalized voice model that captures the essence of the original speaker while maintaining clarity and naturalness. This process typically takes 15-30 minutes depending on sample quality and length.",
          src: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Generate Custom Speech",
          subTitle: "Use your cloned voice to generate speech from any text input. The AI maintains consistent vocal characteristics while producing natural-sounding speech. Perfect for content creators, businesses wanting branded voices, or personal projects. All generated content maintains the unique qualities of the original voice while ensuring clear pronunciation and natural delivery.",
          src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
        }
      ],
      featureTitle: "Voice Cloning",
      faqs: [
        {
          question: "How much audio is needed for voice cloning?",
          answer: "We recommend at least 10 minutes of clear audio for optimal voice cloning results."
        },
        {
          question: "How long does the voice training process take?",
          answer: "Voice model training typically takes 15-30 minutes depending on the audio sample quality and length."
        },
        {
          question: "Can I clone any voice?",
          answer: "You can only clone voices with proper consent and authorization. We require verification for voice cloning requests."
        },
        {
          question: "How realistic are the cloned voices?",
          answer: "Our AI produces highly realistic voice clones that maintain the original speaker's unique characteristics and speaking patterns."
        }
      ]
    },
    {
      path: "ai-pirate-voice-generator",
      title: "AI Pirate Voice Generator Free",
      subTitle: "Generate authentic pirate voices with AI. Create free pirate speech with 'Ahoy matey!' expressions and nautical accents.",
      src: "https://pub-db17a2349e164868983605b173fbd7cd.r2.dev/ai-audio/pirate-voice-demo.mp3",
      metaData: {
        title: "AI Pirate Voice Generator Free | Converters.pro",
        description: "Generate free pirate voices with AI. Create authentic nautical speech with 'Ahoy matey!' expressions and classic pirate accents online.",
        keywords: "ai pirate voice generator free, pirate voice generator, AI pirate speech, free pirate voice, nautical voice generator, pirate accent AI, ahoy matey voice, pirate text to speech"
      },
      steps: [
        {
          title: "Enter Your Pirate Text",
          subTitle: "Type your text and our AI will transform it into authentic pirate speech. Use expressions like 'Ahoy matey!', 'Arrr!', 'Shiver me timbers!' for the best results. The AI understands nautical terminology and pirate slang, automatically applying the proper accent and intonation. Perfect for storytelling, gaming, educational content, or just having fun with friends and family.",
          src: "https://images.unsplash.com/photo-1529688530831-b2c7ab7e8d6c?auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Choose Pirate Voice Style",
          subTitle: "Select from different pirate voice styles including gruff sea captain, jovial crew member, or mysterious pirate legend. Each voice captures the distinctive characteristics of maritime adventurers with proper rolling R's, nautical expressions, and that unmistakable pirate swagger. Our AI has been trained on classic pirate performances to deliver authentic results.",
          src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Generate Free Pirate Speech",
          subTitle: "Create your free pirate voice audio instantly. The AI produces natural-sounding pirate speech with proper accent, timing, and nautical flair. Download your audio for use in games, videos, presentations, or entertainment. Perfect for pirate-themed content, educational materials, or adding character to your projects. Completely free with no limitations on usage.",
          src: "https://images.unsplash.com/photo-1596948244594-1430572d5e4c?auto=format&fit=crop&w=400&q=80"
        }
      ],
      featureTitle: "AI Pirate Voice Generator",
      faqs: [
        {
          question: "Is the AI pirate voice generator really free?",
          answer: "Yes, our AI pirate voice generator is completely free to use with no hidden costs or limitations."
        },
        {
          question: "What makes the pirate voice sound authentic?",
          answer: "Our AI is trained on classic pirate performances and nautical speech patterns to create authentic rolling R's and pirate expressions."
        },
        {
          question: "Can I use pirate expressions and slang?",
          answer: "Absolutely! Use expressions like 'Ahoy matey!', 'Arrr!', 'Shiver me timbers!' for the most authentic pirate speech."
        },
        {
          question: "What can I use the pirate voice for?",
          answer: "Perfect for storytelling, gaming, educational content, entertainment, pirate-themed projects, and having fun with friends."
        }
      ]
    }
  ],
};

// Chinese translations for key content
const chineseTranslations = {
  "podcast-voice-generator": {
    title: "AI播客配音生成器",
    subTitle: "使用AI创建专业播客声音。多种口音，为内容创作者提供自然流畅的语音。",
    metaData: {
      title: "AI播客配音生成器 | HeadShots.fun",
      description: "使用AI生成专业播客声音。多语言和口音的自然语音，适合内容创作者。",
      keywords: "AI播客配音,配音生成器,文本转语音,播客旁白,AI配音,内容创作"
    },
    steps: [
      {
        title: "编写脚本",
        subTitle: "输入您的播客脚本或节目内容。我们的AI支持每次生成最多10,000个字符，非常适合播客片段、介绍或完整节目。该工具专为播客主、内容创作者和媒体专业人士设计，无需聘请配音演员即可获得高质量的语音旁白。编写脚本是创建引人入胜音频内容的第一步。"
      },
      {
        title: "选择语音风格",
        subTitle: "从各种专业播客声音中选择，包括不同性别、口音和说话风格。我们的AI声音基于数千小时的专业播客内容训练，确保自然的语调和节奏。选择最符合您品牌和受众的声音。每种声音都有独特的特征，可以增强您内容的吸引力和专业性。"
      },
      {
        title: "生成并下载",
        subTitle: "以高质量MP3格式生成您的播客音频。AI产生自然语音，具有正确的发音、时机和情感。下载您的音频，直接用于播客节目、社交媒体内容或营销材料。无版税费用，无限下载，包含完整商业使用权。"
      }
    ],
    faqs: [
      {
        question: "我的播客脚本可以多长？",
        answer: "每次可以生成最多10,000个字符，通常相当于15-20分钟的音频内容。"
      },
      {
        question: "支持哪些音频格式？",
        answer: "我们提供为播客分发和流媒体平台优化的高质量MP3文件。"
      },
      {
        question: "我可以商业使用生成的声音吗？",
        answer: "是的，所有生成的音频都包含您播客和内容的完整商业使用权。"
      },
      {
        question: "AI声音听起来有多自然？",
        answer: "我们的AI声音基于专业播客内容训练，声音非常自然，具有适当的语调。"
      }
    ]
  },
  "audiobook-narrator": {
    title: "AI有声书旁白生成器",
    subTitle: "使用AI旁白将您的书面内容转换为专业有声书。提供多种声音选择。",
    metaData: {
      title: "AI有声书旁白生成器 | HeadShots.fun",
      description: "使用AI创建专业有声书旁白。将您的书籍转换为引人入胜的自然语音音频内容。",
      keywords: "AI有声书旁白,有声书生成器,文本转语音,书籍旁白,AI配音,出版"
    },
    steps: [
      {
        title: "上传手稿",
        subTitle: "上传您的书籍章节或手稿文本。我们的系统处理长篇内容，包括章节分隔和适当的节奏。非常适合作者、出版商和内容创作者，他们希望将书面内容制作成有声书。该工具保持叙事流畅性，适当处理对话、描述和不同文本元素。"
      },
      {
        title: "选择旁白声音",
        subTitle: "从我们的专业旁白声音集合中选择。每种声音都针对长篇内容进行优化，具有一致的音调和节奏。根据您书籍的类型、目标受众和个人偏好进行选择。我们的AI在整本有声书中保持角色一致性和适当的情感表达。"
      },
      {
        title: "生成有声书",
        subTitle: "处理您的整本书或单独章节。AI创建专业有声书文件，具有适当的章节划分、一致的旁白质量和优化的音频级别。以与主要平台和分发服务兼容的标准有声书格式导出。非常适合自出版作者和内容创作者。"
      }
    ],
    faqs: [
      {
        question: "生成有声书需要多长时间？",
        answer: "处理时间取决于内容长度，通常每1000字文本需要1-2分钟。"
      },
      {
        question: "我可以预览不同的旁白声音吗？",
        answer: "是的，您可以在生成完整有声书之前用示例文本测试不同的声音。"
      },
      {
        question: "支持的最大书籍长度是多少？",
        answer: "我们支持最多500,000字的完整长度书籍，按可管理的章节处理。"
      },
      {
        question: "有声书与主要平台兼容吗？",
        answer: "是的，我们的输出格式与Audible、Apple Books和其他主要有声书平台兼容。"
      }
    ]
  },
  "multilingual-tts": {
    title: "多语言文本转语音转换器",
    subTitle: "将文本转换为50多种语言的语音，具有本地化发音和自然语调。",
    metaData: {
      title: "多语言文本转语音转换器 | HeadShots.fun",
      description: "将文本转换为50多种语言的自然语音。AI驱动的多语言语音合成，具有本地发音。",
      keywords: "多语言TTS,文本转语音语言,AI语音合成,全球语音生成器,国际TTS"
    },
    steps: [
      {
        title: "输入文本并选择语言",
        subTitle: "输入您的文本并从50多种支持的语言中选择，包括英语、西班牙语、法语、德语、中文、日语等。我们的AI自动检测语言上下文并应用适当的发音规则、口音和文化语音模式。非常适合全球企业、教育工作者和面向国际受众的内容创作者。"
      },
      {
        title: "选择地区声音",
        subTitle: "为您选择的语言选择特定的地区口音和声音特征。例如，在美式、英式或澳式英语之间选择，或选择西班牙语、法语或中文的不同地区变体。每种声音都捕捉其地区的独特发音和文化细微差别，确保真实的语音。"
      },
      {
        title: "生成全球音频",
        subTitle: "为国际使用创建专业多语言音频内容。AI准确处理复杂的语言结构、专有名词和技术术语。导出您的音频用于全球营销、电子学习、客户服务或任何国际交流需求。适合专业应用的高质量输出。"
      }
    ],
    faqs: [
      {
        question: "支持哪些语言？",
        answer: "我们支持50多种语言，包括所有主要世界语言及其地区变体和口音。"
      },
      {
        question: "发音有多准确？",
        answer: "我们的AI使用本地说话者训练数据，确保真实的发音和自然的语调。"
      },
      {
        question: "我可以在一个文本中混合多种语言吗？",
        answer: "是的，我们的系统可以处理多语言文本并自动适当切换语言。"
      },
      {
        question: "技术术语发音正确吗？",
        answer: "是的，我们的AI基于包括技术、医学和专业术语在内的多样化内容进行训练。"
      }
    ]
  },
  "voice-cloning": {
    title: "AI声音克隆与合成",
    subTitle: "基于语音样本创建自定义AI声音。专业声音克隆，用于内容创作和个性化。",
    metaData: {
      title: "AI声音克隆与合成 | HeadShots.fun",
      description: "使用AI技术克隆声音。为内容创作、个性化和媒体制作创建自定义合成声音。",
      keywords: "AI声音克隆,语音合成,自定义语音生成器,声音复制,合成声音"
    },
    steps: [
      {
        title: "提供语音样本",
        subTitle: "上传目标声音的清晰音频样本（最好10分钟以上以获得最佳效果）。我们的AI分析声音特征，包括音调、音高、口音和说话模式。系统适用于各种音频质量和格式。非常适合创建自定义品牌声音、个性化内容或为创意项目保存独特的声音特征。"
      },
      {
        title: "AI语音训练",
        subTitle: "我们的先进AI处理语音样本以学习独特的声音特征和说话模式。训练创建个性化语音模型，捕捉原始说话者的精髓，同时保持清晰度和自然性。此过程通常需要15-30分钟，取决于样本质量和长度。"
      },
      {
        title: "生成自定义语音",
        subTitle: "使用您克隆的声音从任何文本输入生成语音。AI保持一致的声音特征，同时产生自然的语音。非常适合内容创作者、希望拥有品牌声音的企业或个人项目。所有生成的内容都保持原始声音的独特品质，同时确保清晰的发音和自然的表达。"
      }
    ],
    faqs: [
      {
        question: "声音克隆需要多少音频？",
        answer: "我们建议至少10分钟的清晰音频以获得最佳声音克隆效果。"
      },
      {
        question: "声音训练过程需要多长时间？",
        answer: "语音模型训练通常需要15-30分钟，取决于音频样本质量和长度。"
      },
      {
        question: "我可以克隆任何声音吗？",
        answer: "您只能在获得适当同意和授权的情况下克隆声音。我们需要验证声音克隆请求。"
      },
      {
        question: "克隆声音有多逼真？",
        answer: "我们的AI产生高度逼真的声音克隆，保持原始说话者的独特特征和说话模式。"
      }
    ]
  },
  "ai-pirate-voice-generator": {
    title: "AI海盗语音生成器免费版",
    subTitle: "使用AI生成正宗的海盗声音。创建免费的海盗语音，带有'Ahoy matey!'表达和航海口音。",
    metaData: {
      title: "AI海盗语音生成器免费版 | HeadShots.fun",
      description: "使用AI生成免费的海盗语音。创建正宗的航海语音，带有'Ahoy matey!'表达和经典海盗口音。",
      keywords: "ai海盗语音生成器免费,海盗语音生成器,AI海盗语音,免费海盗声音,航海语音生成器,海盗口音AI,ahoy matey语音,海盗文本转语音"
    },
    steps: [
      {
        title: "输入您的海盗文本",
        subTitle: "输入您的文本，我们的AI将其转换为正宗的海盗语音。使用像'Ahoy matey!'、'Arrr!'、'Shiver me timbers!'这样的表达以获得最佳效果。AI理解航海术语和海盗俚语，自动应用适当的口音和语调。非常适合讲故事、游戏、教育内容，或与朋友家人一起玩乐。"
      },
      {
        title: "选择海盗语音风格",
        subTitle: "从不同的海盗语音风格中选择，包括粗犷的船长、快乐的船员或神秘的海盗传奇。每种声音都捕捉了海上冒险家的独特特征，具有适当的颤音R、航海表达和那种不可错认的海盗风格。我们的AI基于经典海盗表演训练，提供正宗的结果。"
      },
      {
        title: "生成免费海盗语音",
        subTitle: "立即创建您的免费海盗语音音频。AI产生自然的海盗语音，具有适当的口音、时机和航海风格。下载您的音频用于游戏、视频、演示或娱乐。非常适合海盗主题内容、教育材料或为您的项目增添特色。完全免费，使用无限制。"
      }
    ],
    faqs: [
      {
        question: "AI海盗语音生成器真的免费吗？",
        answer: "是的，我们的AI海盗语音生成器完全免费使用，没有隐藏费用或限制。"
      },
      {
        question: "什么让海盗语音听起来正宗？",
        answer: "我们的AI基于经典海盗表演和航海语音模式训练，创建正宗的颤音R和海盗表达。"
      },
      {
        question: "我可以使用海盗表达和俚语吗？",
        answer: "绝对可以！使用像'Ahoy matey!'、'Arrr!'、'Shiver me timbers!'这样的表达以获得最正宗的海盗语音。"
      },
      {
        question: "我可以用海盗语音做什么？",
        answer: "非常适合讲故事、游戏、教育内容、娱乐、海盗主题项目，以及与朋友一起玩乐。"
      }
    ]
  }
};

// Function to get configuration based on locale
export function getConfig(locale: string = 'en') {
  if (locale === 'zh-hans') {
    return {
      mainNav: baseConfig.mainNav.map(item => {
        const translation = chineseTranslations[item.path as keyof typeof chineseTranslations];
        if (translation) {
          return {
            ...item,
            title: translation.title,
            subTitle: translation.subTitle,
            metaData: {
              ...item.metaData,
              ...translation.metaData
            },
            steps: translation.steps ? translation.steps.map((step, index) => ({
              ...item.steps[index],
              title: step.title,
              subTitle: step.subTitle
            })) : item.steps,
            faqs: translation.faqs || item.faqs
          };
        }
        return item;
      })
    };
  }
  return baseConfig;
}

// Export default config for backward compatibility
export const config = baseConfig;