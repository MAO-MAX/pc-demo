<template>
    <div class="token-page">
      <div class="block">
        <div class="tit-wrap">
          <h3 class="tit">Token概况</h3>
          <div class="grade">
            <span class="tit-score">{{summaryData.token_profile_score}}</span>
            <span> &nbsp;/ 100</span>
          </div>
        </div>
        <ul class="list">
          <li class="item">
            <span class="item-tit">总市值</span>
            <span class="fold-font">￥{{info.market_cap}}</span>
          </li>
          <li class="item">
            <span class="item-tit">市值排行</span>
            <span class="fold-font">NO.{{info.market_rank}}</span>
          </li>
          <li class="item">
            <span class="item-tit">成本价</span>
            <span class="fold-font">￥{{info.cost_price}}</span>
          </li>
          <li class="item">
            <span class="item-tit">Token总量</span>
            <span class="fold-font">{{info.token_count}}</span>
          </li>
          <li class="item">
            <span class="item-tit">流通率</span>
            <span class="fold-font">{{info.flow_rate}}%</span>
          </li>
          <li class="item">
            <span class="item-tit">登录交易市场</span>
            <span class="fold-font">{{summaryData.market_total}}</span>
          </li>
          <li>
            <div class="item">
              <span class="item-tit">交易对</span>
              <span class="fold-font">{{summaryData.pair_total}}</span>
            </div>
          </li>
          <li>
              <table class="token-table">
                  <thead>
                      <tr>
                        <th>交易市场</th>
                        <th>USD</th>
                        <th>BTC</th>
                        <th>ETH</th>
                      </tr>
                  </thead>
                <tbody>
                      <tr>
                          <td><img src="../../assets/img/okex.png" alt=""></td>
                          <td>{{ marketPair.OKEx.USDT ? '$' + marketPair.OKEx.USDT : '- -' }}</td>
                          <td>{{ marketPair.OKEx.BTC ? '$' + marketPair.OKEx.BTC : '- -' }}</td>
                          <td>{{ marketPair.OKEx.ETH ? '$' + marketPair.OKEx.ETH : '- -' }}</td>
                      </tr>
                      <tr>
                          <td><img src="../../assets/img/bianwang.png" alt=""></td>
                        <td>{{ marketPair.Binance.USDT ? '$' + marketPair. Binance.USDT : '- -' }}</td>
                        <td>{{ marketPair. Binance.BTC ? '$' + marketPair. Binance.BTC : '- -' }}</td>
                        <td>{{ marketPair. Binance.ETH ? '$' + marketPair. Binance.ETH : '- -' }}</td>
                      </tr>
                      <tr>
                          <td><img src="../../assets/img/huobipro.png" alt=""></td>
                        <td>{{ marketPair.Huobi.USDT ? '$' + marketPair. Huobi.USDT : '- -' }}</td>
                        <td>{{ marketPair. Huobi.BTC ? '$' + marketPair. Huobi.BTC : '- -' }}</td>
                        <td>{{ marketPair. Huobi.ETH ? '$' + marketPair. Huobi.ETH : '- -' }}</td>
                      </tr>
                      <tr>
                          <td><img src="../../assets/img/zbwang.png" alt=""></td>
                        <td>{{ marketPair.ZB.USDT ? '$' + marketPair. ZB.USDT : '- -' }}</td>
                        <td>{{ marketPair. ZB.BTC ? '$' + marketPair. ZB.BTC : '- -' }}</td>
                        <td>{{ marketPair. ZB.ETH ? '$' + marketPair. ZB.ETH : '- -' }}</td>
                      </tr>
                      <tr>
                          <td><img src="../../assets/img/bitfinex.png" alt=""></td>
                        <td>{{ marketPair.Bitfinex.USDT ? '$' + marketPair. Bitfinex.USDT : '- -' }}</td>
                        <td>{{ marketPair. Bitfinex.BTC ? '$' + marketPair. Bitfinex.BTC : '- -' }}</td>
                        <td>{{ marketPair. Bitfinex.ETH ? '$' + marketPair. Bitfinex.ETH : '- -' }}</td>
                      </tr>

                </tbody>
              </table>
          </li>

        </ul>
      </div>
      <div class="block">
        <div class="tit-wrap">
          <h3 class="tit">项目合约</h3>
          <div class="grade">
            <span class="tit-score">{{summaryData.token_contract_score}}</span>
            <span> &nbsp;/ 100</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import { mapMutations, mapState } from 'vuex'
    import * as api from '../../api/index.js'
    export default {
        components: {},
        data: function () {
            return {
                tokenInfo: {},
                summaryData: {},
                marketPair: {
                    OKEx: {},
                    Binance: {},
                    Huobi: {},
                    ZB: {},
                    Bitfinex: {}
                }
            }
        },
        computed: {
            ...mapState({
                info: state => state.info
            })
        },
        created() {
            this.getToken()
        },
        methods: {
            ...mapMutations(['SET_HEADER']),
            getToken () {
                let params = {
                    tokenId: this.$route.query.token_id || window.sessionStorage.getItem('tokenId'),
                    query: {
                        sign: this.$route.query.sign || window.sessionStorage.getItem('sign'),
                        aspect: 'token'
                    }
                }
                api.getData(params).then(
                    res => {
                        // this.SET_HEADER(res.data.header_data)
                        this.tokenInfo = res.data.header_data
                        this.summaryData = res.data.summary_data
                        res.data.market_pair.ZB = res.data.market_pair['ZB.COM']
                        this.marketPair = res.data.market_pair
                    }
                )
            }
        }
    }
</script>

<style lang="less" scoped>

  .token-page {
    background-color: #f1f4fe;
    margin-bottom: 1.4rem;

    .token-table {
      width: 100%;
      th, td{
        height: .8rem;
        text-align: center;
        border: 1px #e6ecf9 solid;
      }
      th {
        font-weight: bold;
      }
      td {
        height: .96rem;
        color: #243d8a;
      }
    }
  }

</style>
