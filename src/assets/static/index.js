// 首页底部三部分介绍
const FnList = [{
    title: 'A.I.能力',
    intr: '面向智慧媒体行业，整合云、网、端的概念，将讯飞可提供的人工智能技术集成至云端，提供一站式解决方案。',
    image: require('@assets/images/image-ai.png'),
    icon: 'ai'
}, {
    title: '用户管理',
    intr: '面向智慧媒体行业，整合云、网、端的概念，提供对平台内产品终端的统一用户管理功能，统一规范用户信息。',
    image: require('@assets/images/image-earth.png'),
    icon: 'manage'
}, {
    title: '服务监控',
    intr: '面向智慧媒体行业，整合云、网、端的概念，实现对云、网、端各个模块的全方位监控，主要提供系统监控与业务监控两大模块。',
    image: require('@assets/images/image-grid.png'),
    icon: 'grid'
}];
//ai 能力介绍
const IntrList = [
    {
        name: '语音转写',
        title: '讯飞听见提供的语音转文字服务，主要 功能为将语音文件转换成可编辑的文本 文件，即让机器像人一样能听。',
        picture: 'transfer',
        features: [{
            title: '中文离线语音转写',
            intr: '将中文音频数据转换成中文文本数据，1小时数据仅需5~10分钟，准确率可达95%。'
        }, {
            title: '中文实时语音转写',
            intr: '将中文语音实时转换成文本数据，最快可达到500ms以内的延迟，可实现一边说话一边显示中文文字。'
        }, {
            title: '英文离线语音转写',
            intr: '主要针对英文数据，将英文音频文件数据转换成英文文本数据，1小时数据仅需5~10分钟，准确率可达90%。'
        }, {
            title: '英文实时语音转写',
            intr: '主要针对英文数据，可将英文语音实时转换成英文文本数据，最快可达500ms延时，一边说话一边显示英文文字。'
        }, {
            title: '维语离线语音转写',
            intr: '主要针对维语数据，将维语音频文件数据转换成维语文本数据，1小时数据仅需5~10分钟。'
        }, {
            title: '维语实时语音转写',
            intr: '主要针对维语数据，可将维语语音实时转换成维语文本数据，最快可达500ms延时，一边说话一边显示维语文字。'
        }],
        scenes: [{
            name: '录音整理',
            intr: '采访录音整理',
            icon: 'voice'
        },{
            name: '字幕制作',
            intr: '视听类数据字幕制作，可快速出具字幕形式结果',
            icon: 'title'
        },{
            name: '直播字幕',
            intr: '可利用实时语音转写技术，快速整理字幕文件播出',
            icon: 'live'
        }]
    }, {
        name: '模式识别',
        title: '讯飞听见提供的模式识别服务主要为人 脸识别、声纹识别、台标识别以及OCR 识别，人脸识别的主要功能为识别图像 中的人脸，声纹识别的主要功能为根据 声纹特征识别出某一段语音中包含某人 特征的音频信息。',
        picture: 'discern',
        features: [{
            title: '人脸检索--1 : N相似度对比',
            intr: '可通过人脸检索技术，在大规模的人脸库中找出与待检索的人脸相似度最高的一个或多个人脸，可用于身份确认以及身份查询等应用场景。'
        }, {
            title: '人脸验证--1 ：1相似度对比',
            intr: '可通过提取两张人脸的特征进行比对，根据特征的匹配程度判断是否为同一个人，适用于身份识别、人脸解锁等应用场景。'
        }, {
            title: '声纹分离',
            intr: '通过提取音频中声纹特征，判断音频中有几个说话人，并可判断出每个说话人的信息，适用于多人对话时的录音整理。'
        }, {
            title: '声纹检索',
            intr: '可通过声纹检索技术，提取对应的声纹特征，将大规模待处理的声纹特征与声纹库中特征信息进行比对，判断是否有与库中声纹特征一致的声纹信息。'
        }, {
            title: '台标识别',
            intr: '基于传统的梯度匹配与关键点ORB特征点匹配相结合的方式，针对提取后的特征进行分类判断，进而实现对电视节目中的台标信息检测与识别。'
        }, {
            title: 'OCR识别',
            intr: '基于深度神经网络模型的端到端文字识别系统，将图片中的文字转换成可编辑的文本信息，过滤视频或图片中的有害文字信息。'
        }],
        scenes: [{
            name: '视频人脸识别',
            intr: '检测出视频中出现的人脸与识别结果',
            icon: 'discern_face'
        },{
            name: '录音整理',
            intr: '多人说话音频中分角色展示文本信息',
            icon: 'voice'
        },{
            name: '内容监审',
            intr: '使用人脸、声纹、台标、OCR等多维度判断',
            icon: 'supervise'
        }]
    }, {
        name: '机器翻译',
        title: ' 讯飞听见提供的翻译服务，主要功能为一种语音翻译成另一语种，如英汉互译、维汉互译等。基于科大讯飞全球领先的人工智能技术之一，面向媒体行业提供全方位的服务 ',
        picture: 'translate',
        features: [{
            title: '中译英',
            intr: '使用NMT机器翻译技术，将中文文本信息翻译成英文文本信息。'
        }, {
            title: '英译中',
            intr: '使用NMT机器翻译技术，将英文文本信息翻译成中文文本信息。'
        }, {
            title: '维译汉',
            intr: '使用NMT机器翻译技术，将维语文本信息翻译成汉语文本信息。'
        }, {
            title: '汉译维',
            intr: '使用NMT机器翻译技术，将汉语文本信息翻译成维语文本信息。'
        }],
        scenes: [{
            name: '双语字幕制作',
            intr: '利用多语种翻译可进行双语字幕制作',
            icon: 'title'
        }]
    }, {
        name: '语音合成',
        title: '讯飞听见提供的语音合成功能，主要为 将文字信息转换成语音信息，即让机器 像人一样会说话。',
        picture: 'compound',
        features: [{
            title: '秒级配音',
            intr: '机器能够在毫秒级完成配音的制作，解决了主持人资源紧张，配音需求多的问题，减轻主持人负担，让主持人更轻松。'
        }, {
            title: '稳定音库',
            intr: '声音信息不再受主播声音与身体状况影响，声音可以更持久稳定；同时能够提供个性化音库定制，将台内优秀主持人定制成其专属音库，永久使用该声音。'
        }, {
            title: '风格多样',
            intr: '可支持多种风格的选择，如新闻播放，广告，小说朗读等多种风格，播报形式更多样。'
        }, {
            title: '方言播报',
            intr: '支持将文本转换成三十多种的方言音频并播报，更加贴近不同地域的需求。'
        }],
        scenes: [{
            name: '语音播放',
            intr: '如在路况信息播报时，可通过语音合成的方式进行播报通知',
            icon: 'player'
        },{
            name: '虚拟主持人',
            intr: '如在与硬件配合时，可完成人机的语音交互',
            icon: 'preside'
        },{
            name: '新闻听书',
            intr: '通过手机或音箱等听书时，可为用户提供不同特色的声音',
            icon: 'listen'
        }]
    }
];

const RolesFilter = [{
    type: 'date-picker',
    name: 'data',
}, {
    type: 'search',
    placeholder: '请输入内容',
    name: 'name',
}];

// 产品用户列表
const ProductFilter = [{
    type: 'date-picker',
    name: 'data',
}, {
    type: 'search',
    placeholder: '请输入内容',
    name: 'name',
}];

const Products = ['智能监控', '智能内容', 'ai能力', '唱词', '会议', '广告'];

// 用户列表
const UserListFilter = [{
    type:'select',
    label: '产品',
    placeholder: '请选择',
    name: 'product_id',
    options: [{
        label: Products[0],
        value: 0
    }, {
        label: Products[1],
        value: 1
    },{
        label: Products[2],
        value: 2
    },{
        label: Products[3],
        value: 3
    },{
        label: Products[4],
        value: 4
    }]
}, {
    type: 'date-picker',
    name: 'date',
}, {
    type: 'search',
    placeholder: '搜索用户姓名',
    name: 'name',
}];

const REG = {
    required: (trigger = 'change') => ({ required: true, message: '必填项', trigger }),
    phone: /^1[34578]\d{9}$/,
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
}

export {
    ProductFilter,
    UserListFilter,
    RolesFilter,
    Products,

    IntrList,
    FnList,
    REG
};