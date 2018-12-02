import moment from 'moment'

export default {
  /**
   * 格式化时间到北京时间
   * @param time {String} UTC时间
   * @returns {String} 北京时间
   */
  timeFormatter (time) {
    if (!time) return ''
    return moment(time).utcOffset(8).format('YYYY-MM-DD HH:mm')
  },

  /**
   * 格式化时间到北京时间
   * @param timestamp {String|Number} 时间戳
   * @returns {String} 北京时间
   */
  timeStampFormatter (timestamp) {
    if (!timestamp) return ''
    return moment(new Date(parseInt(timestamp))).utcOffset(8).format('YYYY-MM-DD HH:mm')
  },
  /**
   * 当前UNIX时间戳 秒
   */
  unix () {
    return Date.parse(new Date()) / 1000
  }
}
