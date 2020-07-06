var headX = 60
var headY = 20
var bodyX = 40
var bodyY = 20
var body2X = 20
var body2Y = 20
var xx = Math.floor(Math.random() * 20) * 20;
var yy = Math.floor(Math.random() * 25) * 20;
var n = 0
var arrx = []
var arry = []


Page({
  onLoad: function () {
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('red')
    ctx.fillRect(headX, headY, 20, 20)
    ctx.setFillStyle('green')
    ctx.fillRect(bodyX, bodyY, 20, 20)
    ctx.setFillStyle('green')
    ctx.fillRect(body2X, body2Y, 20, 20)
    ctx.drawImage('./1.jpg', xx, yy, 20, 20)

    ctx.draw()
  },
  data: {
    timer: null,
    grades: 0,
  },
  save () {
    headX = 60
    headY = 20
    bodyX = 40
    bodyY = 20
    body2X = 20
    body2Y = 20
    var right = 'right';
    this.draw(right)
  },
  up () {
    clearInterval(this.timer)
    var up = 'up';
    this.draw(up)
  },
  down () {
    clearInterval(this.timer)
    var down = 'down';
    this.draw(down)
  },
  left () {
    clearInterval(this.timer)
    var left = 'left';
    this.draw(left)
  },
  right () {
    clearInterval(this.timer)
    var right = 'right';
    this.draw(right)
  },
  draw (state) {
    this.timer = setInterval(() => {
      switch (state) {
        case 'up':
          headY -= 20
          if (arrx[n - 1] !== headX) {
            if (arrx[n - 1] > headX) {
              arrx[n - 1] -= 20
            } else {
              arrx[n - 1] += 20
            }
          } else {
            arry[n - 1] -= 20
          }
          if (bodyX !== headX) {
            if (bodyX > headX) {
              bodyX -= 20
            } else {
              bodyX += 20
            }
          } else {
            bodyY -= 20
          }
          if (body2X !== headX) {
            if (body2X > headX) {
              body2X -= 20
            } else {
              body2X += 20
            }
          } else {
            body2Y -= 20
          }
          break;
        case 'right':
          headX += 20
          if (arry[n - 1] !== headY) {
            if (arry[n - 1] > headY) {
              arry[n - 1] -= 20
            } else {
              arry[n - 1] += 20
            }
          } else {
            arrx[n - 1] += 20
          }
          if (bodyY !== headY) {
            if (bodyY > headY) {
              bodyY -= 20
            } else {
              bodyY += 20
            }
          } else {
            bodyX += 20
          }
          if (body2Y !== headY) {
            if (body2Y > headY) {
              body2Y -= 20
            } else {
              body2Y += 20
            }
          } else {
            body2X += 20
          }
          break;
        case 'down':
          headY += 20
          if (arrx[n - 1] !== headX) {
            if (arrx[n - 1] > headX) {
              arrx[n - 1] -= 20
            } else {
              arrx[n - 1] += 20
            }
          } else {
            arry[n - 1] += 20
          }
          if (bodyX !== headX) {
            if (bodyX > headX) {
              bodyX -= 20
            } else {
              bodyX += 20
            }
          } else {
            bodyY += 20
          }
          if (body2X !== headX) {
            if (body2X > headX) {
              body2X -= 20
            } else {
              body2X += 20
            }
          } else {
            body2Y += 20
          }
          break;
        case 'left':
          headX -= 20
          if (arry[n - 1] !== headY) {
            if (arry[n - 1] > headY) {
              arry[n - 1] -= 20
            } else {
              arry[n - 1] += 20
            }
          } else {
            arrx[n - 1] -= 20
          }
          if (bodyY !== headY) {
            if (bodyY > headY) {
              bodyY -= 20
            } else {
              bodyY += 20
            }
          } else {
            bodyX -= 20
          }
          if (body2Y !== headY) {
            if (body2Y > headY) {
              body2Y -= 20
            } else {
              body2Y += 20
            }
          } else {
            body2X -= 20
          }
          break;
      }
      if (headX === xx && headY === yy) {
        n++
        xx = Math.floor(Math.random() * 20) * 20;
        yy = Math.floor(Math.random() * 25) * 20;
        var nxx = 0
        var nyy = 0
        if (state === 'up') {
          nxx = body2X
          nyy = body2Y + 20 * n
        }
        if (state === 'down') {
          nxx = body2X
          nyy = body2Y - 20 * n
        }
        if (state === 'left') {
          nxx = body2X + 20 * n
          nyy = body2Y
        }
        if (state === 'right') {
          nxx = body2X - 20 * n
          nyy = body2Y
        }
        var that = this
        arrx.push(nxx)
        arry.push(nyy)
        that.setData({ grades: 100 * n })
      }
      // 触碰结束
      if (headX === -20 || headX === 400 || headY === -20 || headY === 500) {
        clearInterval(this.timer)
        n = 0
        nxx = 0
        nyy = 0
        var that = this
        wx.showModal({
          title: '提示',
          content: `你撞死了，得分：${this.data.grades}`,
          success: function (res) {
            if (res.confirm) {
              that.onLoad()
            } else {
              that.onLoad()
            }
          }
        })

      }
      const ctx = wx.createCanvasContext('myCanvas')
      ctx.setFillStyle('red')
      ctx.fillRect(headX, headY, 20, 20)
      ctx.setFillStyle('green')
      ctx.fillRect(bodyX, bodyY, 20, 20)
      ctx.setFillStyle('green')
      ctx.fillRect(body2X, body2Y, 20, 20)
      // 吃到刷新身体
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          ctx.setFillStyle('yellow')
          ctx.fillRect(arrx[n - 1], arry[n - 1], 20, 20)
        }
      }
      // 食物刷新
      ctx.drawImage('./1.jpg', xx, yy, 20, 20)
      ctx.draw()
    }, 200)
  }


})

