import { UpDownEqual, UpDownEqualKeys, ArrayJoin } from '../Utils'

class OhlcPlot {
  constructor () {
    this.init()
  }

  init () {
    UpDownEqualKeys.forEach(key => {
      this.appendPlotTypePath([this.name, key])
    })
  }

  bodyPath (d, id) {
    let o = this.yScale(d.open)
    let c = this.yScale(d.close)
    let h = this.yScale(d.high)
    let l = this.yScale(d.low)
    let x = this.xScale(id)
    let xL = x + this.barPadding
    let xC = x + this.barWidth / 2
    let xR = x + this.barWidth - this.barPadding
    let path = `M ${xL} ${o} L ${xC} ${o}`
    path += `M ${xC} ${l} L ${xC} ${h}`
    path += `M ${xC} ${c} L ${xR} ${c}`
    return path
  }

  redraw (left_id, right_id) {
    let _path = {}
    UpDownEqualKeys.forEach(key => _path[key] = '')

    let min = Infinity; let max = -Infinity
    for (let i = left_id; i <= right_id; i++) {
      let d = this.data[i]
      min = Math.min(min, d.low)
      max = Math.max(max, d.high)
    }
    this.yScale.domain([min, max])
    this.g.selectAll('g.y.axis').call(this.yAxis)

    for (let i = left_id; i <= right_id; i++) {
      let d = this.data[i]
      UpDownEqualKeys.forEach(key => {
        if (UpDownEqual[key](d)) {
          _path[key] += this['bodyPath'](d, i)
        }
      })
    }

    UpDownEqualKeys.forEach(key => {
      this.g.select(`path.${ArrayJoin([this.name, key], '.')}`).attr('d', _path[key])
    })
  }
}

export default OhlcPlot
