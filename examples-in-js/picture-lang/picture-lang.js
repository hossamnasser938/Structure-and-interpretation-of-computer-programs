// setup two.js _____
const elem = document.body

const DRAWING_WINDOW_DIM = 500

// const params = { width: DRAWING_WINDOW_DIM, height: DRAWING_WINDOW_DIM }
const params = { fullscreen: true }
const two = new Two(params).appendTo(elem)

function coordMapToDrawingArea(val) {
  return val * DRAWING_WINDOW_DIM
}
// _____

// model vector _____
class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

function addVector(vector1, vector2) {
  return new Vector(vector1.x + vector2.x, vector1.y + vector2.y)
}

function subVector(vector1, vector2) {
  return new Vector(vector1.x - vector2.x, vector1.y - vector2.y)
}

function scaleVector(factor, vector) {
  return new Vector(vector.x * factor, vector.y * factor)
}
// _____

// model segment _____
class Segment {
  constructor(start, end) {
    this.start = start
    this.end = end
  }
}
// _____

// build drawLine function _____
function drawLine(start, end) {
  const startX = coordMapToDrawingArea(start.x)
  const startY = coordMapToDrawingArea(Math.abs(1 - start.y))
  const endX = coordMapToDrawingArea(end.x)
  const endY = coordMapToDrawingArea(Math.abs(1 - end.y))
  
  console.log("🚀 ~ drawLine ~ :", { startX, startY, endX, endY })

  const line = two.makeLine(
    startX,
    startY,
    endX,
    endY,
  )

  line.stroke = "black"
  line.linewidth = 2

  two.update()
}

// model frame _____
class Frame {
  constructor(origin, edge1, edge2) {
    this.origin = origin
    this.edge1 = edge1
    this.edge2 = edge2
  }
}
// _____

// build frameCoordMap function _____

function frameCoordMap(frame) {
  return (vector) => {
    return addVector(
      frame.origin,
      addVector(
          scaleVector(vector.x, frame.edge1),
          scaleVector(vector.y, frame.edge2)
      )
    )
  }
}
// _____

// build segmentsToPainter function _____
function segmentsToPainter(segments) {
  return (frame) => {
    const frameCoordMapper = frameCoordMap(frame)

    segments.forEach((segment) => {
      drawLine(frameCoordMapper(segment.start), frameCoordMapper(segment.end))
    })
  }
}
// _____

// build simple painter like wave _____
const trianglePainter = segmentsToPainter([
  new Segment(new Vector(0, 0), new Vector(0.5, 1)),
  new Segment(new Vector(1, 0), new Vector(0.5, 1)),
  new Segment(new Vector(0, 0), new Vector(1, 0)),
])

const zCharPainter = segmentsToPainter([
  new Segment(new Vector(0.1, 0.1), new Vector(0.9, 0.1)),
  new Segment(new Vector(0.1, 0.1), new Vector(0.9, 0.9)),
  new Segment(new Vector(0.1, 0.9), new Vector(0.9, 0.9)),
])

const wavePainter = segmentsToPainter([
  new Segment(new Vector(0.3, 0), new Vector(0.35, 0.5)),
  new Segment(new Vector(0.4, 0), new Vector(0.5, 0.3)),
  new Segment(new Vector(0.6, 0), new Vector(0.5, 0.3)),
  new Segment(new Vector(0.7, 0), new Vector(0.6, 0.5)),
  new Segment(new Vector(0.6, 0.5), new Vector(1, 0.3)),
  new Segment(new Vector(0.35, 0.5), new Vector(0.3, 0.6)),
  new Segment(new Vector(0.3, 0.6), new Vector(0.15, 0.4)),
  new Segment(new Vector(0.15, 0.4), new Vector(0, 0.5)),
  new Segment(new Vector(0.6, 0.65), new Vector(0.7, 0.65)),
  new Segment(new Vector(0.7, 0.65), new Vector(1, 0.5)),
  new Segment(new Vector(0.4, 0.65), new Vector(0.2, 0.65)),
  new Segment(new Vector(0.2, 0.65), new Vector(0.15, 0.55)),
  new Segment(new Vector(0.15, 0.55), new Vector(0, 0.7)),
  new Segment(new Vector(0.4, 0.65), new Vector(0.35, 0.85)),
  new Segment(new Vector(0.6, 0.65), new Vector(0.65, 0.85)),
  new Segment(new Vector(0.35, 0.85), new Vector(0.4, 1)),
  new Segment(new Vector(0.65, 0.85), new Vector(0.6, 1)),
])

const emptyPainter = (frame) => {}
// _____

// build language composition mechanisms (below, besides, ...) _____
// _____

// build frame operators (identity, flipVert, flipHoriz, ...) _____ 
function identity(painter) {
  return frame => {
    painter(frame)
  }
}

function transformPainter(painter, origin, edge1, edge2) {
  return frame => {
    const frameCoordMapper = frameCoordMap(frame)
    const newOrigin = frameCoordMapper(origin)
    const newEdge1 = subVector(frameCoordMapper(edge1), newOrigin)
    const newEdge2 = subVector(frameCoordMapper(edge2), newOrigin)
    const newFrame = new Frame(
      newOrigin,
      newEdge1,
      newEdge2
    )
    return painter(newFrame)
  }
}

function flipVert(painter) {
  return transformPainter(
    painter,
    new Vector(0, 1),
    new Vector(1, 1),
    new Vector(0, 0),
  )
}

function flipHoriz(painter) {
  return transformPainter(
    painter,
    new Vector(1, 0),
    new Vector(0, 0),
    new Vector(1, 1),
  )
}

function beside(painter1, painter2, factor = 0.5) {
  return frame => {
    transformPainter(painter1, new Vector(0, 0), new Vector(factor, 0), new Vector(0, 1))(frame)
    transformPainter(painter2, new Vector(factor, 0), new Vector(1, 0), new Vector(factor, 1))(frame)
  }
}

function below(painter1, painter2, factor = 0.5) {
  return frame => {
    transformPainter(painter1, new Vector(0, 0), new Vector(1, 0), new Vector(0, factor))(frame)
    transformPainter(painter2, new Vector(0, factor), new Vector(1, factor), new Vector(0, 1))(frame)
  }
}

function rotate90(painter) {
  return transformPainter(
    painter,
    new Vector(0, 1),
    new Vector(0, 0),
    new Vector(1, 1)
  )
}

function rotateNeg90(painter) {
  return transformPainter(
    painter,
    new Vector(1, 0),
    new Vector(1, 1),
    new Vector(0, 0)
  )
}

const rotate180 = flipVert
const rotateNeg180 = flipVert
const rotate360 = identity
const rotateNeg360 = identity
// _____

// verify _____
const fullSquareFrame = new Frame(new Vector(0, 0), new Vector(1, 0), new Vector(0, 1))
const smallSquareFrame = new Frame(new Vector(0, 0), new Vector(0.5, 0), new Vector(0, 0.5))
const verticalRectangularFrame = new Frame(new Vector(0, 0), new Vector(0.5, 0), new Vector(0, 0.5))
const horizontalRectangularFrame = new Frame(new Vector(0, 0), new Vector(1, 0), new Vector(0, 0.5))

function flippedPairs(painter) {
  return frame => {
    const besidesPainter = beside(wavePainter, flipVert(painter))

    below(besidesPainter, besidesPainter)(frame)
  }
}

flippedPairs(wavePainter)(fullSquareFrame)
// _____