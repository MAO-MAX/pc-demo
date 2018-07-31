<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">{{ $t('nav.profile') }}</el-menu-item>
      <el-menu-item index="3" disabled>{{ $t('nav.password') }}</el-menu-item>
      <el-menu-item index="4"><a target="_blank">{{ $t('nav.logout') }}</a></el-menu-item>
      <el-submenu index="2">
        <template slot="title">{{ $t('nav.language') }}</template>
        <el-menu-item index="2-1" @click="setLanguage('zh')" class="right">{{$t('nav.lang_cn')}}</el-menu-item>
        <el-menu-item index="2-2" @click="setLanguage('en')" class="right">{{$t('nav.lang_en')}}</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="container">
      <div class="aside">公告</div>
      <div class="main">
        <div id="chart_container" class="f-fill" style="height:800px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {getNewsList} from '../api/index.js';

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",

      currency1: "USD",
      currency2: "BTC",
      saved_chart: null,
      chart: null,
      feed: null,
      last_price: 1234.2365,
      bars: [
        {
          time: 1508313600000,
          close: 42.1,
          open: 41.0,
          high: 43.0,
          low: 40.4,
          volume: 12000
        },
        {
          time: 1508317200000,
          close: 43.4,
          open: 42.9,
          high: 44.1,
          low: 42.1,
          volume: 18500
        },
        {
          time: 1508320800000,
          close: 44.3,
          open: 43.7,
          high: 44.8,
          low: 42.8,
          volume: 24000
        },
        {
          time: 1508324400000,
          close: 42.8,
          open: 44.5,
          high: 44.5,
          low: 42.3,
          volume: 45000
        }
      ]
    };
  },
  watch: {
    pair: function(newVal, oldVal) {
      this.currency1 = newVal[0];
      this.currency2 = newVal[1];
      this.changePair();
    }
  },
  created() {
    let params = {
      page: 1,
      numSize: 20
    };
    getNewsList(params).then(res => {
      console.log(res);
    })
  },
  mounted: function() {
    const this_vue = this;

    // 获取图表数据
    // this_vue.getChartData();

    // 读取本地保存的图表设置
    if (window.localStorage.getItem("chart_settings")) {
      this_vue.saved_chart = JSON.parse(
        window.localStorage.getItem("chart_settings")
      );
    }

    // 创建图表数据
    this_vue.feed = this_vue.createFeed();

    // 配置并初始化图表
    TradingView.onready(function(configurationData) {
      this_vue.chart = window.tvWidget = new TradingView.widget({
        // 必填项
        container_id: "chart_container", // 容器
        symbol: this_vue.currency1 + ":" + this_vue.currency2, // 品种
        interval: "60", // 间隔

        // 数据
        datafeed: this_vue.feed, // 图表数据
        charts_storage_api_version: "1.1", // 后台版本
        debug: true,

        // 样式
        fullscreen: false, // 是否满屏
        autosize: true, // 自适应
        toolbar_bg: "#20334d", // 顶部工具栏背景色
        // loading_screen:{ backgroundColor: "#20334d",foregroundColor: "#fff"},
        library_path: "static/custom_scripts/chart_main/", // static文件夹的路径

        // 功能
        allow_symbol_change: true, // 是否允许品种改变
        locale: "zh", // 语言
        timezone: "Etc/UTC", // 默认时区
        // timeframe:'',// 图表的初始时间范围
        drawings_access: { // 绘图工具
          type: "black",
          tools: [
            { name: "Trend Line", grayed: true },
            { name: "Trend Angle", grayed: true }
          ] 
        },
        time_frames: [
          { text: "1y", resolution: "1W" },
          { text: "6m", resolution: "3D" },
          { text: "3m", resolution: "1D" },
          { text: "1m", resolution: "1D" },
          { text: "1w", resolution: "30" },
          { text: "3d", resolution: "30" },
          { text: "1d", resolution: "30" },
          { text: "6h", resolution: "15" },
          { text: "1h", resolution: "1" }
        ], // 在图表底部的时间范围选择器中可以看见这个时间范围列表
        
        // 高阶图表的保存/加载
        client_id: "tradingview.com",
        user_id: "public_user_id",

        // saved_data: this_vue.savedData, // JS对象包含保存的图表内容
        // save_image: true,
        // hideideas: true,
        // hideSymbolSearch: true,

 

        // 禁用项
        disabled_features: [
          "header_symbol_search", // 顶部搜索栏
          "header_compare",
          "header_undo_redo",
          "header_screenshot",
          "header_chart_type",
          "star_some_intervals_by_default",
          "datasource_copypaste",
          "right_bar_stays_on_scroll",
          // "context_menus", // 右键菜单
          "go_to_date", // 右键菜单-前往时间
          "compare_symbol",// 右键菜单 对比品种
          "display_market_status",
          "volume_force_overlay",
          // "header_resolutions", // 时间选择
          // "header_indicators", // 指标选择
          // "header_interval_dialog_button",
          // "show_interval_dialog_on_key_press",
          // "symbol_search_hot_key",
          // "study_dialog_search_control",
          // "main_series_scale_menu",
          // "timezone_menu",
          // "remove_library_container_border",
          // "border_around_the_chart",
          //"control_bar",// 底部界面操作按钮
          // "edit_buttons_in_legend",// 内容设置按钮
        ],

        // 启用项
        enabled_features: [
          // "legend_context_menu",
          // "dont_show_boolean_study_arguments",
          "use_localstorage_for_settings",
          "save_chart_properties_to_local_storage",
          "side_toolbar_in_fullscreen_mode",
          "hide_last_na_study_output",
          "constraint_dialogs_movement",//todo: nie do końca jestem pewien
          "move_logo_to_main_pane"
        ],

        studies_overrides: {
          "volume.volume.color.0": "#fe4761",
          "volume.volume.color.1": "#3fcfb4",
          "volume.volume.transparency": 75
        },

        // 默认属性进行覆盖
        overrides: {
          "symbolWatermarkProperties.color": "rgba(0,0,0, 0)",
          // 窗口属性
          "paneProperties.background": "#20334d",
          "paneProperties.vertGridProperties.color": "#344568",
          "paneProperties.horzGridProperties.color": "#344568",
          "paneProperties.crossHairProperties.color": "#58637a",
          "paneProperties.crossHairProperties.style": 2,

          // 主要功能
          "mainSeriesProperties.style": 9,
          "mainSeriesProperties.showCountdown": false,
          "scalesProperties.showSeriesLastValue": true,
          "mainSeriesProperties.visible": false,
          "mainSeriesProperties.showPriceLine": false,
          "mainSeriesProperties.priceLineWidth": 1,
          "mainSeriesProperties.lockScale": false,
          "mainSeriesProperties.minTick": "default",
          "mainSeriesProperties.extendedHours": false,
          volumePaneSize: "tiny",
          editorFontsList: [
            "Lato",
            "Arial",
            "Verdana",
            "Courier New",
            "Times New Roman"
          ],
          
          "paneProperties.topMargin": 5,
          "paneProperties.bottomMargin": 5,
          "paneProperties.leftAxisProperties.autoScale": true,
          "paneProperties.leftAxisProperties.autoScaleDisabled": false,
          "paneProperties.leftAxisProperties.percentage": false,
          "paneProperties.leftAxisProperties.percentageDisabled": false,
          "paneProperties.leftAxisProperties.log": false,
          "paneProperties.leftAxisProperties.logDisabled": false,
          "paneProperties.leftAxisProperties.alignLabels": true,
          // "paneProperties.legendProperties.showStudyArguments": true,
          "paneProperties.legendProperties.showStudyTitles": true,
          "paneProperties.legendProperties.showStudyValues": true,
          "paneProperties.legendProperties.showSeriesTitle": true,
          "paneProperties.legendProperties.showSeriesOHLC": true,
          "scalesProperties.showLeftScale": false,
          "scalesProperties.showRightScale": true,
          "scalesProperties.backgroundColor": "#20334d",
          "scalesProperties.lineColor": "#46587b",
          "scalesProperties.textColor": "#8f98ad",
          "scalesProperties.scaleSeriesOnly": false,
          "mainSeriesProperties.priceAxisProperties.autoScale": true,
          "mainSeriesProperties.priceAxisProperties.autoScaleDisabled": false,
          "mainSeriesProperties.priceAxisProperties.percentage": false,
          "mainSeriesProperties.priceAxisProperties.percentageDisabled": false,
          "mainSeriesProperties.priceAxisProperties.log": false,
          "mainSeriesProperties.priceAxisProperties.logDisabled": false,
          "mainSeriesProperties.candleStyle.upColor": "#3fcfb4",
          "mainSeriesProperties.candleStyle.downColor": "#fe4761",
          "mainSeriesProperties.candleStyle.drawWick": true,
          "mainSeriesProperties.candleStyle.drawBorder": true,
          "mainSeriesProperties.candleStyle.borderColor": "#3fcfb4",
          "mainSeriesProperties.candleStyle.borderUpColor": "#3fcfb4",
          "mainSeriesProperties.candleStyle.borderDownColor": "#fe4761",
          "mainSeriesProperties.candleStyle.wickColor": "#737375",
          "mainSeriesProperties.candleStyle.wickUpColor": "#3fcfb4",
          "mainSeriesProperties.candleStyle.wickDownColor": "#fe4761",
          "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
          "mainSeriesProperties.hollowCandleStyle.upColor": "#3fcfb4",
          "mainSeriesProperties.hollowCandleStyle.downColor": "#fe4761",
          "mainSeriesProperties.hollowCandleStyle.drawWick": true,
          "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
          "mainSeriesProperties.hollowCandleStyle.borderColor": "#3fcfb4",
          "mainSeriesProperties.hollowCandleStyle.borderUpColor": "#3fcfb4",
          "mainSeriesProperties.hollowCandleStyle.borderDownColor": "#fe4761",
          "mainSeriesProperties.hollowCandleStyle.wickColor": "#737375",
          "mainSeriesProperties.hollowCandleStyle.wickUpColor": "#3fcfb4",
          "mainSeriesProperties.hollowCandleStyle.wickDownColor": "#fe4761",
          "mainSeriesProperties.haStyle.upColor": "#3fcfb4",
          "mainSeriesProperties.haStyle.downColor": "#fe4761",
          "mainSeriesProperties.haStyle.drawWick": true,
          "mainSeriesProperties.haStyle.drawBorder": true,
          "mainSeriesProperties.haStyle.borderColor": "#3fcfb4",
          "mainSeriesProperties.haStyle.borderUpColor": "#3fcfb4",
          "mainSeriesProperties.haStyle.borderDownColor": "#fe4761",
          "mainSeriesProperties.haStyle.wickColor": "#737375",
          "mainSeriesProperties.haStyle.wickUpColor": "#3fcfb4",
          "mainSeriesProperties.haStyle.wickDownColor": "#fe4761",
          "mainSeriesProperties.haStyle.barColorsOnPrevClose": false,
          "mainSeriesProperties.barStyle.upColor": "#3fcfb4",
          "mainSeriesProperties.barStyle.downColor": "#fe4761",
          "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
          "mainSeriesProperties.barStyle.dontDrawOpen": false,
          "mainSeriesProperties.lineStyle.color": "#0cbef3",
          "mainSeriesProperties.lineStyle.linestyle": 0,
          "mainSeriesProperties.lineStyle.linewidth": 1,
          "mainSeriesProperties.lineStyle.priceSource": "close",
          "mainSeriesProperties.areaStyle.color1": "#0cbef3",
          "mainSeriesProperties.areaStyle.color2": "#0098c4",
          "mainSeriesProperties.areaStyle.linecolor": "#0cbef3",
          "mainSeriesProperties.areaStyle.linestyle": 0,
          "mainSeriesProperties.areaStyle.linewidth": 1,
          "mainSeriesProperties.areaStyle.priceSource": "close",
          "mainSeriesProperties.areaStyle.transparency": 80
        },

        // 自定义CSS添加到图表中
        custom_css_url: "chart.css"
      });
    });
  },
  methods: {
    // 导航切换
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    // 语言切换
    setLanguage(val) {
      this.$i18n.locale = val;
      window.localStorage.setItem("lang", val);
      this.chart.setLanguage(val);
      console.log('******************', this.chart);
    },

    // 获取图表数据
    getChartData: function() {
      console.log("GET CHART DATA");
      _this = this;
      this.$http
        .get(
          "/api/getChartData",
          this.parseToSend({ pair: this.currentPair.code })
        )
        .then(
          response => {
            console.log("GET CHART DATA", response.body);
            response.body.forEach(order => {
              _this.$data.bars.push({
                close: Number(order.close),
                open: Number(order.open),
                high: Number(order.high),
                low: Number(order.low),
                volume: Number(order.volume),
                time: Number(order.time)
              });
            });
            console.log(_this.$data.bars);
            this.log("@@@", response.body);
            //this.$data.bars = response.body;
            //this.$data.activeOffers = response.body;
            //Events.$emit('active-offers', response.body);
          },
          err => {
            this.log("err", err);
          }
        );
    },

    // 变更对
    changePair: function() {
      let this_vue = this;
      if (this.chart && this.feed) {
        this.feed._fireEvent("pair_change");
        this.chart.activeChart().resetData();
        this.chart
          .activeChart()
          .setSymbol(this.currency1 + ":" + this.currency2, function() {
            console.log(
              "GOWNO :: proba zmiany",
              this_vue.currency1,
              this_vue.currency2
            );
          });
      }
    },

    // 对datafeed.js重写
    createFeed: function() {
      let this_vue = this;
      let Datafeed = {};

      Datafeed.DataPulseUpdater = function(datafeed, updateFrequency) {
        this._datafeed = datafeed;
        this._subscribers = {};

        this._requestsPending = 0;
        var that = this;

        var update = function() {
          if (that._requestsPending > 0) {
            return;
          }

          for (var listenerGUID in that._subscribers) {
            var subscriptionRecord = that._subscribers[listenerGUID];
            var resolution = subscriptionRecord.resolution;

            var datesRangeRight = parseInt(new Date().valueOf() / 1000);

            //	BEWARE: please note we really need 2 bars, not the only last one
            //	see the explanation below. `10` is the `large enough` value to work around holidays
            var datesRangeLeft =
              datesRangeRight - that.periodLengthSeconds(resolution, 10);

            that._requestsPending++;

            (function(_subscriptionRecord) {
              // eslint-disable-line
              that._datafeed.getBars(
                _subscriptionRecord.symbolInfo,
                resolution,
                datesRangeLeft,
                datesRangeRight,
                function(bars) {
                  that._requestsPending--;

                  //	means the subscription was cancelled while waiting for data
                  if (!that._subscribers.hasOwnProperty(listenerGUID)) {
                    return;
                  }

                  if (bars.length === 0) {
                    return;
                  }

                  var lastBar = bars[bars.length - 1];
                  if (
                    !isNaN(_subscriptionRecord.lastBarTime) &&
                    lastBar.time < _subscriptionRecord.lastBarTime
                  ) {
                    return;
                  }

                  var subscribers = _subscriptionRecord.listeners;

                  //	BEWARE: this one isn't working when first update comes and this update makes a new bar. In this case
                  //	_subscriptionRecord.lastBarTime = NaN
                  var isNewBar =
                    !isNaN(_subscriptionRecord.lastBarTime) &&
                    lastBar.time > _subscriptionRecord.lastBarTime;

                  //	Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
                  //	old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
                  if (isNewBar) {
                    if (bars.length < 2) {
                      throw new Error(
                        "Not enough bars in history for proper pulse update. Need at least 2."
                      );
                    }

                    var previousBar = bars[bars.length - 2];
                    for (var i = 0; i < subscribers.length; ++i) {
                      subscribers[i](previousBar);
                    }
                  }

                  _subscriptionRecord.lastBarTime = lastBar.time;

                  for (var i = 0; i < subscribers.length; ++i) {
                    subscribers[i](lastBar);
                  }
                },

                //	on error
                function() {
                  that._requestsPending--;
                }
              );
            })(subscriptionRecord);
          }
        };

        if (typeof updateFrequency != "undefined" && updateFrequency > 0) {
          setInterval(update, updateFrequency);
        }
      };

      Datafeed.DataPulseUpdater.prototype.periodLengthSeconds = function(
        resolution,
        requiredPeriodsCount
      ) {
        var daysCount = 0;

        if (resolution === "D") {
          daysCount = requiredPeriodsCount;
        } else if (resolution === "M") {
          daysCount = 31 * requiredPeriodsCount;
        } else if (resolution === "W") {
          daysCount = 7 * requiredPeriodsCount;
        } else {
          daysCount = requiredPeriodsCount * resolution / (24 * 60);
        }

        return daysCount * 24 * 60 * 60;
      };

      Datafeed.DataPulseUpdater.prototype.subscribeDataListener = function(
        symbolInfo,
        resolution,
        newDataCallback,
        listenerGUID
      ) {
        this._datafeed._logMessage("Subscribing " + listenerGUID);

        if (!this._subscribers.hasOwnProperty(listenerGUID)) {
          this._subscribers[listenerGUID] = {
            symbolInfo: symbolInfo,
            resolution: resolution,
            lastBarTime: NaN,
            listeners: []
          };
        }

        this._subscribers[listenerGUID].listeners.push(newDataCallback);
      };

      Datafeed.DataPulseUpdater.prototype.unsubscribeDataListener = function(
        listenerGUID
      ) {
        this._datafeed._logMessage("Unsubscribing " + listenerGUID);
        delete this._subscribers[listenerGUID];
      };

      Datafeed.Container = function(updateFrequency) {
        this._configuration = {
          supports_search: false,
          supports_group_request: false,
          supported_resolutions: [
            "1",
            "3",
            "5",
            "15",
            "30",
            "60",
            "120",
            "240",
            "360",
            "720",
            "1D",
            "3D",
            "1W",
            "1M"
          ],
          supports_marks: true,
          supports_timescale_marks: true,
          exchanges: ["myExchange"]
        };

        this._barsPulseUpdater = new Datafeed.DataPulseUpdater(
          this,
          updateFrequency || 10 * 1000
        );
        // this._quotesPulseUpdater = new Datafeed.QuotesPulseUpdater(this);

        this._enableLogging = true;
        this._callbacks = {};

        this._initializationFinished = true;
        this._fireEvent("initialized");
        this._fireEvent("configuration_ready");
      };

      Datafeed.Container.prototype._fireEvent = function(event, argument) {
        if (this._callbacks.hasOwnProperty(event)) {
          var callbacksChain = this._callbacks[event];
          for (var i = 0; i < callbacksChain.length; ++i) {
            callbacksChain[i](argument);
          }

          this._callbacks[event] = [];
        }
      };

      Datafeed.Container.prototype._logMessage = function(message) {
        if (this._enableLogging) {
          var now = new Date();
          console.log(
            "CHART LOGS: " +
              now.toLocaleTimeString() +
              "." +
              now.getMilliseconds() +
              "> " +
              message
          );
        }
      };

      Datafeed.Container.prototype.on = function(event, callback) {
        if (!this._callbacks.hasOwnProperty(event)) {
          this._callbacks[event] = [];
        }

        this._callbacks[event].push(callback);
        return this;
      };

      Datafeed.Container.prototype.onReady = function(callback) {
        let that = this;
        if (this._configuration) {
          setTimeout(function() {
            callback(that._configuration);
          }, 0);
        } else {
          this.on("configuration_ready", function() {
            callback(that._configuration);
          });
        }
      };

      Datafeed.Container.prototype.resolveSymbol = function(
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback
      ) {
        this._logMessage("GOWNO :: resolve symbol " + symbolName);
        Promise.resolve().then(() => {
          function adjustScale() {
            if (this_vue.last_price > 1000) return 100;
            else return 100000000;
          }

          this._logMessage(
            "GOWNO :: onResultReady inject " +
              this_vue.currency1 +
              ":" +
              this_vue.currency2
          );
          onSymbolResolvedCallback({
            name: this_vue.currency1 + ":" + this_vue.currency2,
            timezone: "Europe/Warsaw",
            pricescale: adjustScale(),
            minmov: 1,
            minmov2: 0,
            ticker: this_vue.currency1 + ":" + this_vue.currency2,
            description: "",
            session: "24x7",
            type: "bitcoin",
            "exchange-traded": "myExchange",
            "exchange-listed": "myExchange",
            has_intraday: true,
            intraday_multipliers: ["60"], //It is an array containing intraday resolutions (in minutes) the datafeed wants to build by itself. E.g., if the datafeed reported he supports resolutions ["1", "5", "15"], but in fact it has only 1 minute bars for symbol X, it should set intraday_multipliers of X = [1]. This will make Charting Library to build 5 and 15 resolutions by itself.
            has_weekly_and_monthly: false,
            has_no_volume: false,
            regular_session: "24x7"
          });
        });
      };

      Datafeed.Container.prototype.getBars = function(
        symbolInfo,
        resolution,
        rangeStartDate,
        rangeEndDate,
        onDataCallback,
        onErrorCallback
      ) {
        if (rangeStartDate > 0 && (rangeStartDate + "").length > 10) {
          throw new Error([
            "Got a JS time instead of Unix one.",
            rangeStartDate,
            rangeEndDate
          ]);
        }
        onDataCallback([], { noData: true });
        //onDataCallback(bars, { noData: true , nextTime: data.nb || data.nextTime });
      };

      Datafeed.Container.prototype.subscribeBars = function(
        symbolInfo,
        resolution,
        onRealtimeCallback,
        listenerGUID,
        onResetCacheNeededCallback
      ) {
        this_vue.bars.forEach(function(bar) {
          // in subscribeBars
          onRealtimeCallback(bar);
        });
        this.on("pair_change", function() {
          onResetCacheNeededCallback();
        });
        //this._barsPulseUpdater.subscribeDataListener(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback);
      };

      Datafeed.Container.prototype.unsubscribeBars = function(listenerGUID) {
        this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
      };

      return new Datafeed.Container();
    },

    // 调整图表
    adjustChart: function() {
      let chart_iframe = $("#chart_container").find("iframe");
      let chart_top = chart_iframe.contents().find(".header-chart-panel");
      let chart_top_container = chart_iframe
        .contents()
        .find(".header-chart-panel-content");
      let chart_bottom = chart_iframe.contents().find(".date-range-wrapper");

      chart_bottom.appendTo(chart_top_container);
    }
  }
};
</script>

<style lang="less">
.el-header {
  padding: 0;
}
.el-menu--horizontal > .el-submenu:last-child {
  float: right;
}
.echarts-box {
  width: 100%;
  height: 400px;
}
.aside {
  float: left;
  width: 200px;
  height: 400px;
  background-color: salmon;
}
.main {
  overflow: hidden;
}
</style>
