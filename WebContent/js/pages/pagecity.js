﻿$(function(){

            $("#td_areadognumtotal").html("全市总数");
            $("#td_areamednumtotal").html("全市总数");

            //$("#tr_epidemicprovice").css("display", "none");
            //$("#tr_epidemiccity").css("display", "none");
            $("#countyepidemictotal").text(data.data2.countyepidemictotal);
            $("#villageepidemictotal").text(data.data2.villageepidemictotal);
            $("#hamletepidemictotal").text(data.data2.hamletepidemictotal);

            //$("#tr_admincountry").css("display", "none");
            //$("#tr_adminprovince").css("display", "none");
            $("#cityadmintotal").text(data.data2.cityadmintotal);
            $("#countyadmintotal").text(data.data2.countyadmintotal);
            $("#villageadmintotal").text(data.data2.villageadmintotal);
            $("#hamletadmintotal").text(data.data2.hamletadmintotal);

            $("#neckdognumtotal").text(data.data2.neckdognumtotal);
            $("#countryalldognumtotal").text(data.data2.alldognumtotal);
            $("#citywsqdognumtotal").text(data.data2.feedernumtotal);
            $("#countryratedognumtotal").text(((data.data2.neckdognumtotal + 0) * 100 / data.data2.alldognumtotal).toFixed(6));
            $("#countrymednumtotal").text(data.data2.countrymednumtotal);
         
            var cityGov;
            var provinceGov;
            GetCityEcharts(data);

            //$("#tr_admin").click(function () {
            //    window.location.href = "SearchManager.html?districtcode=" + escape(data.data4.districtcode);
            //});

            if (data.data1.privilegelevel == 1) {
                $("#span_leftscan").html("全国总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=3";
                });
                $("#a_areasee").click(function () {
                    window.location.href = "../user/index.do";
                });
                //$("#goback").click(function () {
                //    window.location.href = history.go(-1);
                //    return false;
                //});
            }
            else if (data.data1.privilegelevel == 2) {
                $("#span_leftscan").html(provinceGov + "总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=3";
                })
                $("#a_areasee").click(function () {
                    window.location.href = "../user/index.do";
                });
                //$("#goback").click(function () {
                //    window.location.href = history.go(-1);
                //    return false;
                //});
            } else if (data.data1.privilegelevel == 3) {
                $("#span_leftscan").html(cityGov + "总览");
                $("#a_managepage").click(function () {
                    window.location.href = "/PageManageCommon/MapToManage?districtcode=" + data.data4.districtcode + "&arealevel=3";
                })
                $("#a_areasee").click(function () {
                    window.location.href = "../user/index.do";
                });
                $("#goback").css("display", "none");
            } else {
                window.location.href = "../user/logout.do";
            }
        }
    
)


function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    //setCookie(name, "", -1);
}

//如果需要设定自定义过期时间
//那么把上面的setCookie　函数换成下面两个函数就ok;
//程序代码
function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    }
    else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    }
    else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

$(function () {

    $("#pagereflash").click(function () {
        window.location.reload();
    });
});

function objToArray(array) {
    var arr = []
    for (var i in array) {
        arr.push(array[i]); 
    }
    console.log(arr);
    return arr;
}


function GetCityEcharts(data) {
	
	cityGov = "" + data.data4.cityGov;
	var cityEchartsAreaName="" + data.data4.cityEchartsAreaName;
	provinceGov = "" + data.data4.provinceGov;
    var provinceEchartsAreaName="" + data.data4.provinceEchartsAreaName;
    var p_names = new Array();
    var p_town_values = new Array();
    var p_dog_values = new Array();
    var p_manager_values = new Array();
    var p_necklet_values = new Array();
    var p_med_values = new Array();
    var p_percents = new Array();
    var p_feeders = new Array();

    
    $("#h3_logtitle").html(cityGov);
    var map_ctrl = {};
    map_ctrl[cityEchartsAreaName] = true;

    var necklet_min = 0;
    var necklet_max = 100;
    var cur = 1;
    data.data3 = objToArray(data.data3);
    for (var t = 0; t < data.data3.length; t++) {

        p_names.push(data.data3[t].countyname);
        p_town_values.push({ "name": data.data3[t].countyname, "value_1": data.data3[t].townnum });
        p_dog_values.push({ "name": data.data3[t].countyname, "value_1": data.data3[t].dognum });
        p_manager_values.push({ "name": data.data3[t].countyname, "value_1": data.data3[t].managernum });
        p_necklet_values.push({ "name": data.data3[t].countyname, "value_1": data.data3[t].neckletnum });
        p_med_values.push({ "name": data.data3[t].countyname, "value_1": data.data3[t].mednum });
        cur = data.data3[t].neckletnum;
        cur > necklet_max ? necklet_max = cur : null;


        percent = data.data3[t].neckletnum / data.data3[t].dognum;
        percent = percent.toFixed(2);
        if (isNaN(percent)) {
            percent = 0.0;
        }
        p_percents.push({ "name": data.data3[t].countyname, "value": percent, "value_1": percent });

        p_feeders.push({ "name": data.data3[t].countyname, "value_1": 0 });

    }

    // 路径配置
    require.config({
        paths: {
            echarts: '../js'
        }
    });

    // 使用
    require(
        [
            'echarts',
            'echarts/chart/map' // 使用地图就加载map模块，按需加载
        ],
        function (ec) {


            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('statsChart'));

            var option = {
                title: {
                    text: "",
                    x: 'center',
                    textStyle: {
                        fontSize: 18,
                    }

                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {

                        var res = params.name + '<br />';
                        var myseries = option.series;
                        for (var i = 0; i < myseries.length; i++) {

                            for (var k = 0; k < myseries[i].data.length; k++) {

                                if (myseries[i].data[k].name == params.name) {

                                    res += myseries[i].name + ":" + myseries[i].data[k].value_1 + '<br />';

                                }

                            }

                        }
                        return res;

                    },
                },
                dataRange: {
                    min: 0,
                    max: 1,
                    orient: 'horizontal',
                    x: 'left',
                    y: 'bottom',
                    text: ['高', '低'],           // 文本，默认为数值文本
                    color: ['#008000', '#FFFF00', '#FF0000', '#D6A4A4'],//, '#FF0000'
                    calculable: true
                },

                //roamController: {
                //    show: true,
                //    x: 'right',
                //    y: 'top',
                //    mapTypeControl: map_ctrl
                //},
                series: [
                    {
                        name: '流行乡镇数量',
                        type: 'map',
                        mapType: cityEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_town_values
                    },
                    {
                        name: '管理员总数量',
                        type: 'map',
                        mapType: cityEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_manager_values
                    },
                    {
                        name: '牧犬总数量',
                        type: 'map',
                        mapType: cityEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_dog_values
                    },
                    {
                        name: '项圈总数量',
                        type: 'map',
                        mapType: cityEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_necklet_values
                    },
                    {
                        name: '喂饲器数量',
                        type: 'map',
                        mapType: cityEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_feeders
                    },
                    {
                        name: '投药总次数',
                        type: 'map',
                        mapType: cityEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_med_values
                    },
                    {
                        name: '项圈犬占比',
                        type: 'map',
                        mapType: cityEchartsAreaName,
                        roam: false,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        selectedMode: 'single',
                        data: p_percents
                    }
                ]
            };

            var mapGeoData = require('echarts/util/mapData/params');
            var mapType = [];
            var cityMap = {
                "北京市": "110100",
                "天津市": "120100",
                "上海市": "310100",
                "重庆市": "500100",

                "崇明县": "310200",
                "湖北省直辖县市": "429000",
                "铜仁市": "522200",
                "毕节市": "522400",

                "石家庄市": "130100",
                "唐山市": "130200",
                "秦皇岛市": "130300",
                "邯郸市": "130400",
                "邢台市": "130500",
                "保定市": "130600",
                "张家口市": "130700",
                "承德市": "130800",
                "沧州市": "130900",
                "廊坊市": "131000",
                "衡水市": "131100",
                "太原市": "140100",
                "大同市": "140200",
                "阳泉市": "140300",
                "长治市": "140400",
                "晋城市": "140500",
                "朔州市": "140600",
                "晋中市": "140700",
                "运城市": "140800",
                "忻州市": "140900",
                "临汾市": "141000",
                "吕梁市": "141100",
                "呼和浩特市": "150100",
                "包头市": "150200",
                "乌海市": "150300",
                "赤峰市": "150400",
                "通辽市": "150500",
                "鄂尔多斯市": "150600",
                "呼伦贝尔市": "150700",
                "巴彦淖尔市": "150800",
                "乌兰察布市": "150900",
                "兴安盟": "152200",
                "锡林郭勒盟": "152500",
                "阿拉善盟": "152900",
                "沈阳市": "210100",
                "大连市": "210200",
                "鞍山市": "210300",
                "抚顺市": "210400",
                "本溪市": "210500",
                "丹东市": "210600",
                "锦州市": "210700",
                "营口市": "210800",
                "阜新市": "210900",
                "辽阳市": "211000",
                "盘锦市": "211100",
                "铁岭市": "211200",
                "朝阳市": "211300",
                "葫芦岛市": "211400",
                "长春市": "220100",
                "吉林市": "220200",
                "四平市": "220300",
                "辽源市": "220400",
                "通化市": "220500",
                "白山市": "220600",
                "松原市": "220700",
                "白城市": "220800",
                "延边朝鲜族自治州": "222400",
                "哈尔滨市": "230100",
                "齐齐哈尔市": "230200",
                "鸡西市": "230300",
                "鹤岗市": "230400",
                "双鸭山市": "230500",
                "大庆市": "230600",
                "伊春市": "230700",
                "佳木斯市": "230800",
                "七台河市": "230900",
                "牡丹江市": "231000",
                "黑河市": "231100",
                "绥化市": "231200",
                "大兴安岭地区": "232700",
                "南京市": "320100",
                "无锡市": "320200",
                "徐州市": "320300",
                "常州市": "320400",
                "苏州市": "320500",
                "南通市": "320600",
                "连云港市": "320700",
                "淮安市": "320800",
                "盐城市": "320900",
                "扬州市": "321000",
                "镇江市": "321100",
                "泰州市": "321200",
                "宿迁市": "321300",
                "杭州市": "330100",
                "宁波市": "330200",
                "温州市": "330300",
                "嘉兴市": "330400",
                "湖州市": "330500",
                "绍兴市": "330600",
                "金华市": "330700",
                "衢州市": "330800",
                "舟山市": "330900",
                "台州市": "331000",
                "丽水市": "331100",
                "合肥市": "340100",
                "芜湖市": "340200",
                "蚌埠市": "340300",
                "淮南市": "340400",
                "马鞍山市": "340500",
                "淮北市": "340600",
                "铜陵市": "340700",
                "安庆市": "340800",
                "黄山市": "341000",
                "滁州市": "341100",
                "阜阳市": "341200",
                "宿州市": "341300",
                "六安市": "341500",
                "亳州市": "341600",
                "池州市": "341700",
                "宣城市": "341800",
                "福州市": "350100",
                "厦门市": "350200",
                "莆田市": "350300",
                "三明市": "350400",
                "泉州市": "350500",
                "漳州市": "350600",
                "南平市": "350700",
                "龙岩市": "350800",
                "宁德市": "350900",
                "南昌市": "360100",
                "景德镇市": "360200",
                "萍乡市": "360300",
                "九江市": "360400",
                "新余市": "360500",
                "鹰潭市": "360600",
                "赣州市": "360700",
                "吉安市": "360800",
                "宜春市": "360900",
                "抚州市": "361000",
                "上饶市": "361100",
                "济南市": "370100",
                "青岛市": "370200",
                "淄博市": "370300",
                "枣庄市": "370400",
                "东营市": "370500",
                "烟台市": "370600",
                "潍坊市": "370700",
                "济宁市": "370800",
                "泰安市": "370900",
                "威海市": "371000",
                "日照市": "371100",
                "莱芜市": "371200",
                "临沂市": "371300",
                "德州市": "371400",
                "聊城市": "371500",
                "滨州市": "371600",
                "菏泽市": "371700",
                "郑州市": "410100",
                "开封市": "410200",
                "洛阳市": "410300",
                "平顶山市": "410400",
                "安阳市": "410500",
                "鹤壁市": "410600",
                "新乡市": "410700",
                "焦作市": "410800",
                "濮阳市": "410900",
                "许昌市": "411000",
                "漯河市": "411100",
                "三门峡市": "411200",
                "南阳市": "411300",
                "商丘市": "411400",
                "信阳市": "411500",
                "周口市": "411600",
                "驻马店市": "411700",
                "省直辖县级行政区划": "469000",
                "武汉市": "420100",
                "黄石市": "420200",
                "十堰市": "420300",
                "宜昌市": "420500",
                "襄阳市": "420600",
                "鄂州市": "420700",
                "荆门市": "420800",
                "孝感市": "420900",
                "荆州市": "421000",
                "黄冈市": "421100",
                "咸宁市": "421200",
                "随州市": "421300",
                "恩施土家族苗族自治州": "422800",
                "长沙市": "430100",
                "株洲市": "430200",
                "湘潭市": "430300",
                "衡阳市": "430400",
                "邵阳市": "430500",
                "岳阳市": "430600",
                "常德市": "430700",
                "张家界市": "430800",
                "益阳市": "430900",
                "郴州市": "431000",
                "永州市": "431100",
                "怀化市": "431200",
                "娄底市": "431300",
                "湘西土家族苗族自治州": "433100",
                "广州市": "440100",
                "韶关市": "440200",
                "深圳市": "440300",
                "珠海市": "440400",
                "汕头市": "440500",
                "佛山市": "440600",
                "江门市": "440700",
                "湛江市": "440800",
                "茂名市": "440900",
                "肇庆市": "441200",
                "惠州市": "441300",
                "梅州市": "441400",
                "汕尾市": "441500",
                "河源市": "441600",
                "阳江市": "441700",
                "清远市": "441800",
                "东莞市": "441900",
                "中山市": "442000",
                "潮州市": "445100",
                "揭阳市": "445200",
                "云浮市": "445300",
                "南宁市": "450100",
                "柳州市": "450200",
                "桂林市": "450300",
                "梧州市": "450400",
                "北海市": "450500",
                "防城港市": "450600",
                "钦州市": "450700",
                "贵港市": "450800",
                "玉林市": "450900",
                "百色市": "451000",
                "贺州市": "451100",
                "河池市": "451200",
                "来宾市": "451300",
                "崇左市": "451400",
                "海口市": "460100",
                "三亚市": "460200",
                "三沙市": "460300",
                "成都市": "510100",
                "自贡市": "510300",
                "攀枝花市": "510400",
                "泸州市": "510500",
                "德阳市": "510600",
                "绵阳市": "510700",
                "广元市": "510800",
                "遂宁市": "510900",
                "内江市": "511000",
                "乐山市": "511100",
                "南充市": "511300",
                "眉山市": "511400",
                "宜宾市": "511500",
                "广安市": "511600",
                "达州市": "511700",
                "雅安市": "511800",
                "巴中市": "511900",
                "资阳市": "512000",
                "阿坝藏族羌族自治州": "513200",
                "甘孜藏族自治州": "513300",
                "凉山彝族自治州": "513400",
                "贵阳市": "520100",
                "六盘水市": "520200",
                "遵义市": "520300",
                "安顺市": "520400",
                "黔西南布依族苗族自治州": "522300",
                "黔东南苗族侗族自治州": "522600",
                "黔南布依族苗族自治州": "522700",
                "昆明市": "530100",
                "曲靖市": "530300",
                "玉溪市": "530400",
                "保山市": "530500",
                "昭通市": "530600",
                "丽江市": "530700",
                "普洱市": "530800",
                "临沧市": "530900",
                "楚雄彝族自治州": "532300",
                "红河哈尼族彝族自治州": "532500",
                "文山壮族苗族自治州": "532600",
                "西双版纳傣族自治州": "532800",
                "大理白族自治州": "532900",
                "德宏傣族景颇族自治州": "533100",
                "怒江傈僳族自治州": "533300",
                "迪庆藏族自治州": "533400",
                "拉萨市": "540100",
                "昌都地区": "542100",
                "山南地区": "542200",
                "日喀则地区": "542300",
                "那曲地区": "542400",
                "阿里地区": "542500",
                "林芝地区": "542600",
                "西安市": "610100",
                "铜川市": "610200",
                "宝鸡市": "610300",
                "咸阳市": "610400",
                "渭南市": "610500",
                "延安市": "610600",
                "汉中市": "610700",
                "榆林市": "610800",
                "安康市": "610900",
                "商洛市": "611000",
                "兰州市": "620100",
                "嘉峪关市": "620200",
                "金昌市": "620300",
                "白银市": "620400",
                "天水市": "620500",
                "武威市": "620600",
                "张掖市": "620700",
                "平凉市": "620800",
                "酒泉市": "620900",
                "庆阳市": "621000",
                "定西市": "621100",
                "陇南市": "621200",
                "临夏回族自治州": "622900",
                "甘南藏族自治州": "623000",
                "西宁市": "630100",
                "海东地区": "632100",
                "海北藏族自治州": "632200",
                "黄南藏族自治州": "632300",
                "海南藏族自治州": "632500",
                "果洛藏族自治州": "632600",
                "玉树藏族自治州": "632700",
                "海西蒙古族藏族自治州": "632800",
                "银川市": "640100",
                "石嘴山市": "640200",
                "吴忠市": "640300",
                "固原市": "640400",
                "中卫市": "640500",
                "乌鲁木齐市": "650100",
                "克拉玛依市": "650200",
                "吐鲁番地区": "652100",
                "哈密地区": "652200",
                "昌吉回族自治州": "652300",
                "博尔塔拉蒙古自治州": "652700",
                "巴音郭楞蒙古自治州": "652800",
                "阿克苏地区": "652900",
                "克孜勒苏柯尔克孜自治州": "653000",
                "喀什地区": "653100",
                "和田地区": "653200",
                "伊犁哈萨克自治州": "654000",
                "塔城地区": "654200",
                "阿勒泰地区": "654300",
                "自治区直辖县级行政区划": "659000",
                "台湾省": "710000",
                "香港特别行政区": "810100",
                "澳门特别行政区": "820000"
            };
            mapGeoData.params[cityEchartsAreaName] = {
                getGeoJson: (function (c) {
                    var geoJsonName = cityMap[c];
                    return function (callback) {
                        $.getJSON('../js/chart/geometryCouties/' + geoJsonName + '.json', callback);
                    }
                })(cityEchartsAreaName)
            }

            //responsive
            if (screen.width < 768) {
                option.series[0].itemStyle.normal.label.textStyle = { fontSize: 8 };
            }

            var name_selected = '';
            myChart.on("click", function (param) {
                //alert(param.name + 'S');
                if (param.seriesName != '' && param.name == name_selected) {
                    window.location.href = "../county/county.do?county=" + param.name + "&city=" + cityGov + "&province=" + provinceGov;
                    //alert(param.name);
                } else {
                    name_selected = param.name;
                }
            });

            //myChart.on("dblclick", function (param) {
            //    window.location.href = "page_county.html?county=" + escape(param.name) + "&city=" + escape(cityname) + "&province=" + escape(provincename);
            //    alert(param.name);
            //});


            // 为echarts对象加载数据 
            myChart.setOption(option);


        });
}