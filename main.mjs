class Knight {
  pos = {};
  legalMoves = [];
  route = [];

  constructor(posX, posY, route = []) {
    if (this.inRange(posX) && this.inRange(posY)) {
      this.pos.x = posX;
      this.pos.y = posY;
      this.route = route;
    } else {
      throw new Error("Knight's pos not on board!");
    }
  }

  inRange(val) {
    return val < 8 && val > -1;
  }

  get x() {
    return this.pos.x;
  }
  get y() {
    return this.pos.y;
  }

  initLegalMoves(filterOut = []) {
    let res = [];
    let x = this.x;
    let y = this.y;

    const genMoves = (d1, d2) => {
      let newX = x + d1;
      let newY = y + d2;
      if (this.inRange(newX) && this.inRange(newY)) {
        const pos = new Knight(newX, newY, [...filterOut, new Knight(x, y)]);
        if (!filterOut.find((el) => el.x === pos.x && el.y === pos.y)) {
          res.push(pos);
        }
      }
    };

    genMoves(1, 2);
    genMoves(1, -2);
    genMoves(-1, 2);
    genMoves(-1, -2);
    genMoves(2, 1);
    genMoves(2, -1);
    genMoves(-2, 1);
    genMoves(-2, -1);

    this.legalMoves = res;
    return this.legalMoves;
  }
}

function toString(movesArr) {
  let res = "";
  for (let i = 0; i < movesArr.length; i++) {
    res += `[${movesArr[i].x}, ${movesArr[i].y}],`;
  }
  return res;
}

function knightMoves(start, end, root = []) {
  const kStart = new Knight(start[0], start[1]);

  //expand the graph to a depth of 6
  getLegalMoves(kStart);
  //console.dir(kStart, { depth: null });
  //traverse breadth-first till end point is found
  let res = findRoute(kStart, new Knight(end[0], end[1]));
  console.log(`You made it in ${res.length - 1} move(s). Here's your path:`);
  for (let i = 0; i < res.length; i++) {
    console.log(`[${res[i].x}, ${res[i].y}]`);
  }
}

function findRoute(start, end) {
  let queue = [start];
  let depth = 0;
  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur.x === end.x && cur.y === end.y) {
      return [...cur.route, cur];
    } else {
      if (cur.legalMoves && cur.legalMoves.length > 0) {
        queue = [...queue, ...cur.legalMoves];
      }
    }
  }
}
function getLegalMoves(root, depth = 0, anc = []) {
  if (depth === 6) {
    return root;
  }
  root.initLegalMoves(anc);
  root.legalMoves.forEach((move) => {
    getLegalMoves(move, depth + 1, [...anc, root]);
  });
  return root;
}
knightMoves([3, 3], [7, 7]);
