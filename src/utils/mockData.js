export default {
    badges:[
        {
            id: 1,
            title: '读心经10天',
            desc: '每日读心经打卡超过10天',
            icon: 'images/badges/1.png',
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
            icon: 'images/badges/2.png',
            minimun_time: 3,
            status: 'processing',
            items:[
                {
                    "activity":{
                        id: 2,
                        title: "行走五台山",
                        desc: "2019年度五台山之行"
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
            icon: 'images/badges/1.png',
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
            icon: 'images/badges/2.png',
            minimun_time: 3,
            status: 'processing',
            items:[
                {
                    "badge":{
                        id: 2,
                        title: "行山badge",
                        desc: "参与行山者（至少3次）"
                    },
                    required_time: 1,
                    finished_time: 0
                },
                {
                    "badge":{
                        id: 1,
                        title: "读心经10天",
                        desc: "每日读心经打卡超过10天"
                    },
                    required_time: 1,
                    finished_time: 0
                },
                {
                    "badge":{
                        id: 3,
                        title: "读咒3天",
                        desc: "每日读经打卡超过3天"
                    },
                    required_time: 1,
                    finished_time: 1
                }
            ]
        }
    ]
}