import { FormatDirection, FormatOffset, FormatPrice, FormatStatus } from '@/plugins/utils'
import moment from 'moment'

let DefaultUser = {
  bid: '快期模拟'
}

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  DefaultUser = {
    bid: '快期模拟',
    user_name: '022632',
    password: '123456'
  }
}

const QuotesTableRow = [
  {
    name: '合约代码',
    prop: 'instrument_id',
    width: 80
  }, {
    name: '合约中文名',
    prop: 'ins_name',
    width: 70
  }, {
    name: '最新价',
    prop: 'last_price',
    width: 60,
    className: function (item) {
      return item['change'] > 0 ? 'R' : (item['change'] < 0 ? 'G' : '')
    },
    formatter: function (item) {
      return FormatPrice(item['last_price'], item['price_decs'])
    }
  }, {
    name: '买价',
    prop: 'bid_price1',
    width: 60,
    className: 'col-buy',
    formatter: function (item) {
      return FormatPrice(item['bid_price1'], item['price_decs'])
    }
  }, {
    name: '买量',
    prop: 'bid_volume1',
    width: 60,
    className: 'col-buy'
  }, {
    name: '卖价',
    prop: 'ask_price1',
    width: 60,
    className: 'col-sell',
    formatter: function (item) {
      return FormatPrice(item['ask_price1'], item['price_decs'])
    }
  }, {
    name: '卖量',
    prop: 'ask_volume1',
    width: 60,
    className: 'col-sell'
  }, {
    name: '涨跌',
    prop: 'change',
    width: 60,
    className: function (item) {
      return item['change'] > 0 ? 'R' : (item['change'] < 0 ? 'G' : '')
    },
    formatter: function (item) {
      return FormatPrice(item['change'], item['price_decs'])
    }
  }, {
    name: '涨跌幅',
    prop: 'change_percent',
    width: 60,
    className: function (item) {
      return item['change'] > 0 ? 'R' : (item['change'] < 0 ? 'G' : '')
    },
    formatter: function (item) {
      let percent = FormatPrice(item['change'] / item['pre_settlement'] * 100, 2)
      return isNaN(percent) ? '-' : percent + '%'
    }
  }, {
    name: '成交量',
    prop: 'volume',
    width: 60,
    className: function (item) {
      return item['change'] > 0 ? 'R' : (item['change'] < 0 ? 'G' : '')
    }
  }, {
    name: '持仓量',
    prop: 'open_interest',
    width: 60
  }, {
    name: '涨停价',
    prop: 'upper_limit',
    width: 60,
    formatter: function (item) {
      return FormatPrice(item['upper_limit'], item['price_decs'])
    }
  }, {
    name: '跌停价',
    prop: 'lower_limit',
    width: 60,
    formatter: function (item) {
      return FormatPrice(item['lower_limit'], item['price_decs'])
    }
  }, {
    name: '今开盘',
    prop: 'open',
    width: 60,
    formatter: function (item) {
      return FormatPrice(item['open'], item['price_decs'])
    }
  }, {
    name: '最低价',
    prop: 'lowest',
    width: 60,
    formatter: function (item) {
      return FormatPrice(item['lowest'], item['price_decs'])
    }
  },
  {
    name: '最高价',
    prop: 'highest',
    width: 60,
    formatter: function (item) {
      return FormatPrice(item['highest'], item['price_decs'])
    }
  }, {
    name: '昨收盘',
    prop: 'pre_close',
    width: 60,
    formatter: function (item) {
      return FormatPrice(item['pre_close'], item['price_decs'])
    }
  }, {
    name: '昨结算',
    prop: 'pre_settlement',
    width: 60,
    formatter: function (item) {
      return FormatPrice(item['pre_settlement'], item['price_decs'])
    }
  }, {
    name: '行情更新时间',
    prop: 'datetime',
    width: 80,
    formatter: function (item) {
      return item['datetime'] ? item['datetime'].slice(11, 19) : ''
    }
  }, {
    name: '合约乘数',
    prop: 'volume_multiple',
    width: 60
  }, {
    name: '最小价位',
    prop: 'price_tick',
    width: 60
  }, {
    name: '最后交易日',
    prop: 'expire_datetime',
    width: 70,
    formatter: function (item) {
      return item['expire_datetime'] ? moment(item['expire_datetime'] * 1000).format('YYYYMMDD') : ''
    }
  }
]

export {
  DefaultUser,
  QuotesTableRow
}
