const matrix1 = [
  [0,    0,    0,    0,    0,    0,    1,    0,    0,    1], 
    [0,    0,   1,    0,    0,    0,    0,    0,    0,    0], 
    [0,    0,    0,    0,    0,    0,    0,   0,    1,    0], 
    [0,    0,    0,    0,    1,    1,    0,    0,    1,    0],  
    [0,    0,    0,    0,    1,    0,    0,    0,    0,    0],
    [0,    0,    0,    0,    0,    0,    1,    0,    0,    0],
    [0,    0,    0,    0,    0,    0,    1,    0,    1,    0],
    [0,    0,    1,    0,    0,    0,    0,    0,    0,    0],
    [0,    0,    0,    1,    1,    0,    0,    0,    1,    0],
    [0,    0,    0,    0,    1,    0,    0,    1,    0,    0],
    ];
  
  const matrix2 = matrix1.map(arr => [...arr]);
  for (let i = 0; i < matrix2.length; i++) {
    for (let j = 0; j < matrix2.length; j++) {
      if (matrix2[i][j] === 1 && matrix2[j][i] !== 1) {
        matrix2[j][i] = 1;
      } 
    }
  }

  const draw = () => {
    const canvas1 = document.getElementById('graph1');
    const canvas2 = document.getElementById('condensed');
  if (canvas1.getContext && canvas2.getContext) {
      const container = document.getElementById('graph1_info');
      const ctx = canvas1.getContext('2d');
      const ctx2 = canvas2.getContext('2d');
      const graph1 = new Graph(ctx, matrix, true, 20);
      graph1.triangle();
      graph1.info(container);
      graph1.trans_info(container2);
      const reachM = trans_closure(matrix);
      const strongM = product_m(reachM, transpose(reachM));

      let pool = [];

      const check = new Array(strongM.length).fill(0);
      let found = false;
      strongM.forEach((a1, index1) => {
        strongM.forEach((a2, index2) => {
          if (arraysEqual(a1, a2) && index1 > index2) {
            found = false;
            for (let i = 0; i < pool.length; i++) {
              pool[i].forEach(val => {
                if (index1 === val) {
                  pool[i].push(index2);
                  check[index2] = 1;
                  found = true;
                } else if (index2 === val) {
                  pool[i].push(index1);
                  check[index1] = 1;
                  found = true;
                }
              })
            }
            if (!found) pool.push([index1, index2]); check[index2] = 1; check[index1] = 1;
          }
        })
      });
  
      check.forEach((val, index) => {if (val === 0) pool.push([index])});
      pool = pool.map(val => [...new Set(val)]);
      const condenseM = new Array(pool.length).fill(0);
      for (let i = 0; i < condenseM.length; i++) condenseM[i] = new Array(pool.length).fill(0);
  
      pool.forEach((k1, index1) => {
        pool.forEach((k2, index2) => {
          if (index1 > index2) {
            k1.forEach(i => {
              k2.forEach(j => {
                if (test[i][j] === 1) condenseM[index1][index2] = 1;
                if (test[j][i] === 1) condenseM[index2][index1] = 1;
              })
            })
          }
        })
      });
      const condensed_graph = new Graph(ctx2, condenseM, true, 20);
      condensed_graph.circle(100, 200, 200);
  
      const component_container = document.getElementById('component_info');
      let component_info = 'Components:<br>';
      pool.forEach((val, index) => component_info += `K${index + 1}: ${val.map(val => ++val)}<br>`);
      component_container.innerHTML = component_info;
  
      console.log('Adjacency matrix');
      console.table(matrix);
      console.log('Reachability matrix');
      console.table(reachM);
      console.log('Strong reachability matrix');

    }
  
    const canvas2 = document.getElementById('graph2');
    if (canvas2.getContext) {
      const container = document.getElementById('graph2_info');
      const ctx = canvas2.getContext('2d');
      const graph2 = new Graph(ctx, matrix2, false, 10);
      graph2.triangle();
      graph2.info(container);
    }
  };