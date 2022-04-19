Page({
  data: {
    active: 0,
    radio: '1',
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    show: false,
  },
  onStudentId(event) {
    console.log(event.detail)
  },
  onPassword(event) {
    console.log(event.detail)
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  pickerOnChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
  },

  onClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
});