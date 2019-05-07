const WXAPI = require('../../wxapi/main');
const { $Message } = require('../../components/iView/base/index');

var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fabButton: [
            {
                label: '发布任务',
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABkklEQVRYR+2X0VHDMBBEdyuADqADoAJCBdABoYNQAUkFQAUkHVBC6CDpgBKggmPWIzGOY0tyJOPJDPpxYsnS097p7kSM3Djy+tgDMLMJgGcAl4XhNgAeSa7r87YBaOBF4cX9dBuSVzEAcwO+AbwD+OyAkVLXrm/RGPPk/n8A0IamAE70juTOptsU8ACvJGddSpjZHEC1UHNSM/NzLEjOzWwJ4L4vQPVxIYBO2JACvQCc80qNdYsCwwIAkGfLJ9Tqv70JBgfostSfAqwcReVs/nQ4JxxEAUmuY6pjNiOpJ8xMAezFBbKJ3odOzMFO2CdQ/QMctwIuwLwBOA/Y/QvAjXfE5rgsBcxM+UDpOdYeSCrm77VcgFMAdwkKLElKibIAsW2n9GcpkLJAbEwWgJnJBLcREzQZZIqVN0kuQKoTNiF+nTIXQDFf3n0Wk7rWr3KuygMuP5RPRj1glKCOEyBYlPZU4KCiVJ4cKstTGXSKVJbrmVSWD3kx2ZLcuXF1Xc1U0ZS+HW1d5RS+mqXqWmrc6LfjH6d2SzCK7AqQAAAAAElFTkSuQmCC'
            }
        ],
        swiperHeight:0,
        baseItemHeightImg:128,
        key: 'NOTICE',
        index: 0,
        tabs: [
            {
                key: 'NOTICE',
                title: '通知公告',
                index:0
            },
            {
                key: 'WAIKUAI',
                title: '外卖快递',
                index: 0
            },
            {
                key: 'LOSTF',
                title: '失物招领',
                index: 0
            },
            {
                key: 'OTHER',
                title: '其他任务',
                index: 0
            }
        ],
        tasks: { 
            NOTICE: [{
                taskId: "1",
                title: "奖学金公布",
                contentBrief: "信息工程学院大三第一学期奖学金公布情况,信息工程学院大三第一学期奖学金公布情况,信息工程学院大三第一学期奖",
                createTime: "2019-12-05 20:00:00",
                endTime: "2019-12-05 21:00:00",
                avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/9PRxZ7Io7ZiawqCe69H2Ir7mJN5lbn8s7I7hh0ial3qqRDylgGm9F0sEmibYmFQxTBkOk50Qiam9yv3rLc552WIsJg/132",
                type: "NOTICE"
            },
                {
                    taskId: "2",
                    title: "奖学金公布",
                    contentBrief: "信息工程学院大三第一学期奖学金公布情况",
                    createTime: "2019-12-05 20:00:00",
                    endTime: "2019-12-05 21:00:00",
                    avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/9PRxZ7Io7ZiawqCe69H2Ir7mJN5lbn8s7I7hh0ial3qqRDylgGm9F0sEmibYmFQxTBkOk50Qiam9yv3rLc552WIsJg/132",
                    type: "NOTICE"
                }
            ], 
            WAIKUAI: [{
                taskId: "3",
                title: "奖学金公布",
                contentBrief: "信息工程学院大三第一学期奖学金公布情况",
                createTime: "2018-12-05",
                avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/9PRxZ7Io7ZiawqCe69H2Ir7mJN5lbn8s7I7hh0ial3qqRDylgGm9F0sEmibYmFQxTBkOk50Qiam9yv3rLc552WIsJg/132",
                tag: "WAIKUAI"
            }],
            LOSTF: [{
                taskId: "5",
                title: "奖学金公布",
                contentBrief: "信息工程学院大三第一学期奖学金公布情况",
                createTime: "2018-12-05",
                avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/9PRxZ7Io7ZiawqCe69H2Ir7mJN5lbn8s7I7hh0ial3qqRDylgGm9F0sEmibYmFQxTBkOk50Qiam9yv3rLc552WIsJg/132",
                tag: "LOSTF"
            }],
            OTHER: [{
                taskId: "7",
                title: "奖学金公布",
                contentBrief: "信息工程学院大三第一学期奖学金公布情况",
                createTime: "2018-12-05",
                avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/9PRxZ7Io7ZiawqCe69H2Ir7mJN5lbn8s7I7hh0ial3qqRDylgGm9F0sEmibYmFQxTBkOk50Qiam9yv3rLc552WIsJg/132",
                tag: "OTHER"
            }]
        },
        showLoadOk: false,
        showSpin: false
    },

    /**
     * 请求-获取数据
     */
    getTaskData(index, size, type) {
        let that = this;
        let { tasks } = this.data;
        this.setData({
            showSpin: true,
            showLoadOk: false
        });
        

        //WXAPI-请求
        let data = {};
        data.index = index;
        data.size = size;
        data.type =  type;
        let locale = wx.getStorageSync("locale");
        data.lat = locale.lat;
        data.lng = locale.lng;
        
        WXAPI.getTaskList(data).then(
            function (res) {
                if (res.code != 0) {
                    $Message({
                        content: res.msg,
                        type: 'error',
                        duration: 3
                    });
                    if (!Util.isToken(res)) {
                        app.goLoginPageTimeOut();
                    }
                } else {
                    // doSomething

                }
            },
            function (err) {
                console.log(err);
                $Message({
                    content: '服务器开小差了!',
                    type: 'error',
                    duration: 3
                });
            }
        );

        //测试
        // setTimeout(() => {
        //     for (var i = 0; i < 1; i++) {
        //         if (current == "NOTICE") {
        //             tasks.NOTICE.push(tasks.NOTICE[i]);
        //         } else if (current == "WAIKUAI") {
        //             tasks.ACTIVITY.push(tasks.ACTIVITY[i]);
        //         } else if (current == "LOSTF") {
        //             tasks.NEW.push(tasks.NEW[i]);
        //         } else {
        //             tasks.OTHER.push(tasks.OTHER[i]);
        //         }
        //     }
        //     that.setData({
        //         showSpin: false,
        //         showLoadOk: true,
        //         tasks: tasks
        //     });
        //     that.autoHeight(current);
        // }, 2000);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 清除原来的数据
        let tasks = this.data.tasks;
        tasks.NOTICE = [];
        tasks.WAIKUAI = [];
        tasks.LOSTF = [];
        tasks.NOTICE = [];
        this.setData({
            tasks: tasks
        });

        // 给所有页面获取数据
        let index = 0;
        let size = 40;
        this.getTaskData(index, size, "");
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;

        // 给当前界面获取数据
        let index = 0;
        switch (this.data.key) {
            case "NOTICE": index = tabs[0].index; break;
            case "NOTICE": index = tabs[1].index; break;
            case "NOTICE": index = tabs[2].index; break;
            case "NOTICE": index = tabs[3].index; break;
        }
        let size = 10;
        this.getTaskData(index, size, this.data.key);
    },

    // 用户自定义函数
    onTabsChange(e) {
        console.log(e);
        const { key }= e.detail;
        const index = this.data.tabs.map((n) => n.key).indexOf(key);
        this.setData({
            key,
            index:index
        });
        this.autoHeight(this.data.key);
    },
    onSwiperChange(e) {
        const { current: index, source } = e.detail
        const { key } = this.data.tabs[index]
        if (source) {
            this.setData({
                key,
                index
            })
        }
        this.autoHeight(this.data.key);
    },

    /**
    * 打开任务详情页
    */
    goTaskDetail: function (e) {
        //跳转
        wx.navigateTo({
            url: './task-detail?taskId=' + e.currentTarget.dataset.taskId
        })
    },

    autoHeight(current) {
        let that = this;
        let { tasks, baseItemHeight } = that.data;
        let listData;
        if (current == "NOTICE") {
            listData = tasks.NOTICE;
        } else if (current == "WAIKUAI") {
            listData = tasks.WAIKUAI;
        } else if (current == "LOSTF") {
            listData = tasks.LOSTF;
        } else {
            listData = tasks.OTHER;
        }

        let swiperHeight =0;
        for(let i=0; i<listData.length; i++){
            swiperHeight += this.data.baseItemHeightImg;
        }

        this.setData({
            swiperHeight: swiperHeight > 0 ? swiperHeight+40:200
        });

        wx.createSelectorQuery()
            .select('#load').boundingClientRect()
            .select('#'+that.data.key).boundingClientRect().exec(rect => {
                console.log(swiperHeight)
                let _space = rect[0].top - rect[1].top;
                let height = swiperHeight - _space;
                this.setData({
                    swiperHeight: height>0?height+50:200
                });
        })
    },

    goPublishTask(){
        //跳转
        wx.navigateTo({
            url: './task-publish'
        })
    }
})