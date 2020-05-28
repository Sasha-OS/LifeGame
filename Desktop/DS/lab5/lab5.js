const matrix = [
  [1,0,0,0,1,0,1,1,0,1],
  [0,0,1,0,0,0,1,0,1,0],
  [0,0,1,0,0,0,0,0,1,0],
  [0,0,0,1,1,1,0,0,1,1],
  [0,0,0,1,1,1,0,0,0,0],
  [1,1,0,0,0,0,1,1,0,0],
  [1,1,0,1,0,0,1,0,1,0],
  [0,0,1,0,0,0,1,1,1,0],
  [1,1,0,1,1,0,0,0,1,0],
  [0,1,0,0,1,0,1,1,0,0],
];

let weights = [
  [0,0,0,0,37,15,93,6,19,63],
  [0,0,43,0,0,16,34,0,4,21],
  [0,43,0,0,0,0,0,26,14,0],
  [0,0,0,0,57,95,53,0,61,56],
  [37,0,0,57,0,23,0,0,3,61],
  [15,16,0,95,23,9,5,84,0,0],
  [93,34,0,53,0,5,0,5,25,18],
  [6,0,26,0,0,84,5,0,90,59],
  [19,4,14,61,3,0,25,90,0,0],
  [63,21,0,56,61,0,18,59,0,0],
];

let check_w = weights.map(arr => [...arr]);

for (let i = 0; i < matrix.length; i++)
  for (let j = 0; j < matrix.length; j++) {
    if (matrix[i][i] = 1) matrix[i][i] = 0;
    if (matrix[i][j] === 1 && matrix[j][i] !== 1) matrix[j][i] = 1;
  }

let vertices = [0], ctx2, alert, skel = [[0]], skel_len = 1;

const draw = () => {
  const canvas1 = document.getElementById('graph1');
  const canvas2 = document.getElementById('skeleton');
  alert = document.getElementById('alert');

  if (canvas1.getContext && canvas2.getContext) {
    const container1 = document.getElementById('graph1_info');
    const ctx = canvas1.getContext('2d');
    ctx2 = canvas2.getContext('2d');
    graph1 = new Graph(ctx, matrix, false, 20, weights);

    graph1.triangle();

    weights.forEach(arr => arr[0] = 0);
    step();
  }
};

const step = () => {
  if (matrix.length === skel_len) {
    alert.style.display = 'block';
    for (let i = 0; i < matrix.length; i++)
      for (let j = 0; j < matrix.length; j++) {
        if (skel[i][j] !== 1) skel[i][j] = 0;
      }
    console.table(skel);
    return;
  }

  const vi = vertices.reduce((prev, cur) => {
    const val1 = arr_min(weights[prev]);
    const val2 = arr_min(weights[cur]);
    if (val1 === 0 & val2 === 0) return Infinity;
    if (val1 === 0) return cur;
    if (val2 === 0) return prev;
    return val1 < val2 ? prev : cur;
  });

  const min_d = arr_min(weights[vi]);
  const vj = weights[vi].indexOf(min_d);
  vertices.push(vj);
  weights.forEach(arr => arr[vj] = 0);
  skel[vj] = [];
  skel[vi][vj] = 1;
  skel[vj][vi] = 1;
  ctx2.clearRect(0, 0, 1000, 1000);
  const graph2 = new Graph(ctx2, skel, false, 10, check_w);
  graph2.triangle();
  skel_len++;
};




