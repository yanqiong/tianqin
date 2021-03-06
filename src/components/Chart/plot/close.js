class Close {
  constructor (opts) {
    this.name = opts.name ? opts.name : (new Date().getTime())
    this.plot = opts.plot ? opts.plot : null
    this.chartDm = this.plot.chartDm
  }
  createPaths () {
    this.paths = ['close']
    return this.paths
  }
  calcPaths (left_id, right_id, data) {
    if (!this.plot.yScale || !this.plot.xScale || !this.chartDm) return
    let _path = ''
    for (let i = left_id; i <= right_id; i++) {
      if (!data[i]) continue
      let oi = this.plot.yScale(data[i].close)
      let x = this.plot.xScale(i) + this.chartDm.barWidth / 2
      _path += _path === '' ? 'M' : 'L'
      _path += `${x} ${oi} `
    }
    return { close: _path }
  }
}

export default Close
