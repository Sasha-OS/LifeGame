let exp = '';
     const matrix2 = [
         [0,1,0,1,0],
         [0,0,0,0,1],
         [1,0,0,0,0],
         [0,0,1,0,1],
         [0,1,0,0,0],
     ];



const closure = (matrix1, matrix2) => {
    let mew = matrix1.map(arr => [...arr]);
    mew.forEach(val => val.fill(0));
        
    for (const i in matrix1) {
        for (const j in matrix1) {
            if (matrix1[i][j] !== 0) {
                for (const vert in matrix2[j]) {
                    if (matrix2[j][vert] !== 0) mew [i][vert] += matrix2[j][vert]
                }
            }
    }
}
return mew;
}


function sumMatrix (matrix1, matrix2) 
{   
    let m = matrix1.length, n = matrix1[0].length, res = [];
    for (var i = 0; i < m; i++)
     { res[ i ] = [];
       for (var j = 0; j < n; j++) res[ i ][j] = matrix1[ i ][j]+matrix2[ i ][j];
     }
    return res;
}


function TransMatrix(matrix)     
{
    let m = matrix.length, n = matrix[0].length, AT = [];
    for (var i = 0; i < n; i++)
     { AT[ i ] = [];
       for (let j = 0; j < m; j++) AT[ i ][j] = matrix[j][ i ];
     }
    return AT;
};

const reachabilityf = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
          if (matrix[i] !== 0) matrix[i] = 1;
      }
    }

//    exp += 'Матриця шляху 2: ' + closure(matrix2,matrix2) + '\n';
  //  exp += 'Матриця шляху 3: ' + closure(closure(matrix2,matrix2),matrix2) + '\n';
    let reachability = sumMatrix(sumMatrix(sumMatrix(matrix2, closure(matrix2, matrix2)),closure(closure(matrix2,matrix2),matrix2)),closure(closure(matrix2,matrix2),closure(matrix2, matrix2)));
    exp += 'Матриця досяжності: ' + reachabilityf(reachability) + '\n'; 
    //exp += 'Матриця звязності: ' + TransMatrix(reachability)+ '\n';

console.log(exp);

const Breachability = (reachability) => {
    for(let i = 0; i < reachability.length; i++) {
      if (reachability[i] !== 0) reachability[i] = 1;
    }
    return reachability;
  }