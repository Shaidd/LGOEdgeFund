var createScene = require('gl-plot3d')
var createPoints = require('gl-scatter3d')

var scene = createScene()

var initialData = {
    gl: scene.gl,
    position: [[1, 0, -1], [0, 1, -1], [0, 0, 1], [1, 1, -1], [1, 0, 1], [0, 1, 1]],
    glyph: ["▼", "★", "■", "◆", "✚", "✖"],
    color: [[0, 1, 0], [0, 0, 1], [1, 1, 0], [1, 0, 1], [0, 1, 1], [0, 0, 0]],
    size: 12,
    orthographic: true
}

for (var i = 0; i < 100; ++i) {
    var theta = i / 100.0 * 2.0 * Math.PI
    var x = Math.cos(theta)
    var y = Math.sin(theta)
    initialData.position.push([x, y, 0])
    initialData.glyph.push("●")
    initialData.color.push([1, 0, 0])
}

var points = createPoints(initialData)

scene.add(points)

