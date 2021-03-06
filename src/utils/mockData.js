export default {
    badges:[
        {
            id: 1,
            title: '读心经10天',
            description: '每日读心经打卡超过10天',
            icon: 'http://img3.imgtn.bdimg.com/it/u=2426400236,3098416421&fm=26&gp=0.jpg',
            minimun_time: 1,
            status: 'processing',
            items:[
                {
                    type: "activity",
                    id: 1,
                    title: "读心经",
                    description: "每日读心经",
                    icon: "http://img3.redocn.com/20130117/Redocn_2013011716263413.jpg",
                    need_punch: 'true',
                    required_time: 20,
                    finished_time: 10
                }
            ]
        },
        {
            id: 2,
            title: '行山badge',
            description: '参与行山者（至少3次）',
            icon: 'http://img3.redocn.com/20130117/Redocn_2013011716263413.jpg',
            minimun_time: 3,
            status: 'processing',
            items:[
                {
                    type: "activity",
                    id: 2,
                    title: "行走五台山",
                    description: "2019年度五台山之行",
                    icon: "http://img3.redocn.com/20130117/Redocn_2013011716263413.jpg",
                    required_time: 1,
                    finished_time: 1
                },
                {
                    type: "activity",
                    id: 3,
                    title: "行走峨眉山",
                    description: "2019年度峨眉山之行",
                    icon: "http://img3.redocn.com/20130117/Redocn_2013011716263413.jpg",
                    required_time: 1,
                    finished_time: 0
                },
                {
                    type: "activity",
                    id: 4,
                    title: "行走普陀山",
                    description: "2019年度普陀山之行",
                    icon: "http://img3.redocn.com/20130117/Redocn_2013011716263413.jpg",
                    required_time: 1,
                    finished_time: 0
                },
                {
                    type: "activity",
                    id: 5,
                    title: "行走九华山",
                    description: "2019年度九华山之行",
                    icon: "http://img3.redocn.com/20130117/Redocn_2013011716263413.jpg",
                    required_time: 1,
                    finished_time: 0
                }
            ]
        },
        {
            id: 3,
            title: '读咒3天',
            description: '每日读经打卡超过3天',
            icon: 'http://img5.imgtn.bdimg.com/it/u=1565545867,2913923534&fm=26&gp=0.jpg',
            minimun_time: 1,
            status: 'complete',
            items:[
                {
                    type: "activity",
                    id: 3,
                    title: "读咒",
                    description: "每日读咒",
                    icon: "http://img3.redocn.com/20130117/Redocn_2013011716263413.jpg",
                    need_punch: 'true',
                    required_time: 3,
                    finished_time: 3
                }
            ]
        },
        {
            id: 4,
            title: '修行人',
            description: '参与释聚文化各种活动',
            icon: 'http://img3.redocn.com/20130111/Redocn_2013011111445048.jpg',
            minimun_time: 3,
            status: 'processing',
            items:[
                {
                    type: "badge",
                    id: 2,
                    title: "行山badge",
                    description: "参与行山者（至少3次）",
                    icon: "http://img3.redocn.com/20130117/Redocn_2013011716263413.jpg",
                    required_time: 1,
                    finished_time: 0
                },
                {
                    type: "badge",
                    id: 1,
                    title: "读心经10天",
                    description: "每日读心经打卡超过10天",
                    icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558103962&di=9c27261b18d1fa53818fb3c1fd634344&imgtype=jpg&er=1&src=http%3A%2F%2Fimg3.redocn.com%2F20120620%2FRedocn_2012062015080997.jpg",
                    required_time: 1,
                    finished_time: 0
                },
                {
                    type: "badge",
                    id: 3,
                    title: "读咒3天",
                    description: "每日读经打卡超过3天",
                    icon: 'http://pic67.nipic.com/file/20150515/20861781_120125379000_2.jpg',
                    required_time: 1,
                    finished_time: 1
                }
            ]
        }
    ]
}