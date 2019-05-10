export default {
    badges:[
        {
            id: 1,
            title: '读心经10天',
            desc: '每日读心经打卡超过10天',
            icon: 'http://img3.duitang.com/uploads/item/201406/04/20140604120235_QCyrF.jpeg',
            minimun_time: 1,
            status: 'processing',
            items:[
                {
                    "activity":{
                        id: 1,
                        title: "读心经",
                        desc: "每日读心经"
                    },
                    required_time: 20,
                    finished_time: 10
                }
            ]
        },
        {
            id: 2,
            title: '行山badge',
            desc: '参与行山者（至少3次）',
            icon: 'http://b-ssl.duitang.com/uploads/item/201508/04/20150804211608_KLFV2.jpeg',
            minimun_time: 3,
            status: 'processing',
            items:[
                {
                    "activity":{
                        id: 2,
                        title: "行走五台山",
                        desc: "2019年度五台山之行",
                        icon: ""
                    },
                    required_time: 1,
                    finished_time: 1
                },
                {
                    "activity":{
                        id: 3,
                        title: "行走峨眉山",
                        desc: "2019年度峨眉山之行"
                    },
                    required_time: 1,
                    finished_time: 0
                },
                {
                    "activity":{
                        id: 4,
                        title: "行走普陀山",
                        desc: "2019年度普陀山之行"
                    },
                    required_time: 1,
                    finished_time: 0
                },
                {
                    "activity":{
                        id: 5,
                        title: "行走九华山",
                        desc: "2019年度九华山之行"
                    },
                    required_time: 1,
                    finished_time: 0
                }
            ]
        },
        {
            id: 3,
            title: '读咒3天',
            desc: '每日读经打卡超过3天',
            icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558103962&di=9c27261b18d1fa53818fb3c1fd634344&imgtype=jpg&er=1&src=http%3A%2F%2Fimg3.redocn.com%2F20120620%2FRedocn_2012062015080997.jpg',
            minimun_time: 1,
            status: 'complete',
            items:[
                {
                    "activity":{
                        id: 3,
                        title: "读咒",
                        desc: "每日读咒"
                    },
                    required_time: 3,
                    finished_time: 3
                }
            ]
        },
        {
            id: 4,
            title: '修行人',
            desc: '参与释聚文化各种活动',
            icon: 'http://pic46.nipic.com/20140822/19285764_160429978000_2.jpg',
            minimun_time: 3,
            status: 'processing',
            items:[
                {
                    "badge":{
                        id: 2,
                        title: "行山badge",
                        desc: "参与行山者（至少3次）",
                        icon: "http://b-ssl.duitang.com/uploads/item/201508/04/20150804211608_KLFV2.jpeg"
                    },
                    required_time: 1,
                    finished_time: 0
                },
                {
                    "badge":{
                        id: 1,
                        title: "读心经10天",
                        desc: "每日读心经打卡超过10天",
                        icon: "http://img3.duitang.com/uploads/item/201406/04/20140604120235_QCyrF.jpeg"
                    },
                    required_time: 1,
                    finished_time: 0
                },
                {
                    "badge":{
                        id: 3,
                        title: "读咒3天",
                        desc: "每日读经打卡超过3天",
                        icon: 'http://pic67.nipic.com/file/20150515/20861781_120125379000_2.jpg'
                    },
                    required_time: 1,
                    finished_time: 1
                }
            ]
        }
    ]
}