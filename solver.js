var permvar = new Array(24);
permvar[0] = new Array("w", "x", "y", "z");
permvar[1] = new Array("w", "x", "z", "y");
permvar[2] = new Array("w", "y", "x", "z");
permvar[3] = new Array("w", "y", "z", "x");
permvar[4] = new Array("w", "z", "x", "y");
permvar[5] = new Array("w", "z", "y", "x");
permvar[6] = new Array("x", "w", "y", "z");
permvar[7] = new Array("x", "w", "z", "y");
permvar[8] = new Array("x", "y", "w", "z");
permvar[9] = new Array("x", "y", "z", "w");
permvar[10] = new Array("x", "z", "w", "y");
permvar[11] = new Array("x", "z", "y", "w");
permvar[12] = new Array("y", "w", "x", "z");
permvar[13] = new Array("y", "w", "z", "x");
permvar[14] = new Array("y", "x", "w", "z");
permvar[15] = new Array("y", "x", "z", "w");
permvar[16] = new Array("y", "z", "w", "x");
permvar[17] = new Array("y", "z", "x", "w");
permvar[18] = new Array("z", "w", "x", "y");
permvar[19] = new Array("z", "w", "y", "x");
permvar[20] = new Array("z", "x", "w", "y");
permvar[21] = new Array("z", "x", "y", "w");
permvar[22] = new Array("z", "y", "w", "x");
permvar[23] = new Array("z", "y", "x", "w");

var op = new Array("*", "+", "/", "-");

function solve24Game(w, x, y, z) {
  var sol = findSolution(parseInt(w), parseInt(x), parseInt(y), parseInt(z));

  sol = sol.map((e) => {
    return replace(e, w, x, y, z);
  });

  return sol;
}

function replace(sol, w, x, y, z) {
  sol = sol.replace("x", x);
  sol = sol.replace("y", y);
  sol = sol.replace("w", w);
  sol = sol.replace("z", z);

  return sol;
}

function findSolution(w, x, y, z) {
  var op1, op2, op3;
  var res = [];

  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 4; j++) {
      op1 = op[j];
      for (let k = 0; k < 4; k++) {
        op2 = op[k];
        for (let l = 0; l < 4; l++) {
          op3 = op[l];

          let fu =
            permvar[i][0] +
            op1 +
            permvar[i][1] +
            op2 +
            permvar[i][2] +
            op3 +
            permvar[i][3];
          if (f(w, x, y, z, fu) == 24) res.push(fu);

          fu =
            "(" +
            permvar[i][0] +
            op1 +
            permvar[i][1] +
            ")" +
            op2 +
            permvar[i][2] +
            op3 +
            permvar[i][3];
          if (f(w, x, y, z, fu) == 24) res.push(fu);

          fu =
            permvar[i][0] +
            op1 +
            "(" +
            permvar[i][1] +
            op2 +
            permvar[i][2] +
            ")" +
            op3 +
            permvar[i][3];
          if (f(w, x, y, z, fu) == 24) res.push(fu);

          fu =
            permvar[i][0] +
            op1 +
            permvar[i][1] +
            op2 +
            "(" +
            permvar[i][2] +
            op3 +
            permvar[i][3] +
            ")";
          if (f(w, x, y, z, fu) == 24) res.push(fu);

          fu =
            "(" +
            permvar[i][0] +
            op1 +
            permvar[i][1] +
            ")" +
            op2 +
            "(" +
            permvar[i][2] +
            op3 +
            permvar[i][3] +
            ")";
          if (f(w, x, y, z, fu) == 24) res.push(fu);

          fu =
            "(" +
            permvar[i][0] +
            op1 +
            permvar[i][1] +
            op2 +
            permvar[i][2] +
            ")" +
            op3 +
            permvar[i][3];
          if (f(w, x, y, z, fu) == 24) res.push(fu);

          fu =
            permvar[i][0] +
            op1 +
            "(" +
            permvar[i][1] +
            op2 +
            permvar[i][2] +
            op3 +
            permvar[i][3] +
            ")";
          if (f(w, x, y, z, fu) == 24) res.push(fu);

          fu =
            "(" +
            "(" +
            permvar[i][0] +
            op1 +
            permvar[i][1] +
            ")" +
            op2 +
            permvar[i][2] +
            ")" +
            op3 +
            permvar[i][3];
          if (f(w, x, y, z, fu) == 24) res.push(fu);

          fu =
            permvar[i][0] +
            op1 +
            "(" +
            "(" +
            permvar[i][1] +
            op2 +
            permvar[i][2] +
            ")" +
            op3 +
            permvar[i][3] +
            ")";
          if (f(w, x, y, z, fu) == 24) res.push(fu);

          fu =
            "(" +
            permvar[i][0] +
            op1 +
            "(" +
            permvar[i][1] +
            op2 +
            permvar[i][2] +
            ")" +
            ")" +
            op3 +
            permvar[i][3];
          if (f(w, x, y, z, fu) == 24) res.push(fu);

          fu =
            permvar[i][0] +
            op1 +
            "(" +
            permvar[i][1] +
            op2 +
            "(" +
            permvar[i][2] +
            op3 +
            permvar[i][3] +
            ")" +
            ")";
          if (f(w, x, y, z, fu) == 24) res.push(fu);
        }
      }
    }
  }
  if (res.length) return res;
  else return ["no solution found."];
}

function f(w, x, y, z, fu) {
  var myfunction = new Function("w", "x", "y", "z", "return " + fu + ";");
  return myfunction(w, x, y, z, fu);
}

module.exports = { solve24Game };

