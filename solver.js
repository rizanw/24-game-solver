/**
 * 24 Game solver.
 *
 * Tries every ordering of the four numbers, every combination of the four
 * operators, and all five ways to group four operands, then keeps the
 * expressions that equal exactly 24.
 *
 * Arithmetic uses exact fractions instead of floating point, so solutions
 * that pass through non-integers (e.g. 8 / (3 - 8 / 3)) aren't missed.
 */

const TARGET = 24;
const OPERATORS = ["+", "-", "*", "/"];
const PRECEDENCE = { "+": 1, "-": 1, "*": 2, "/": 2 };

// ---- exact fraction arithmetic -------------------------------------------

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

function fraction(n, d = 1) {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
}

function apply(op, a, b) {
  switch (op) {
    case "+": return fraction(a.n * b.d + b.n * a.d, a.d * b.d);
    case "-": return fraction(a.n * b.d - b.n * a.d, a.d * b.d);
    case "*": return fraction(a.n * b.n, a.d * b.d);
    case "/": return b.n === 0 ? null : fraction(a.n * b.d, a.d * b.n);
  }
}

// ---- expression trees ----------------------------------------------------

const leaf = (value) => ({ value });
const node = (op, left, right) => ({ op, left, right });

function evaluate(tree) {
  if (tree.op === undefined) return fraction(tree.value);
  const left = evaluate(tree.left);
  const right = evaluate(tree.right);
  if (left === null || right === null) return null;
  return apply(tree.op, left, right);
}

// Format with only the parentheses the expression actually needs.
function format(tree) {
  if (tree.op === undefined) return String(tree.value);

  const wrap = (child, isRight) => {
    const text = format(child);
    if (child.op === undefined) return text;
    const parent = PRECEDENCE[tree.op];
    const inner = PRECEDENCE[child.op];
    const needsParens =
      inner < parent ||
      (isRight && inner === parent && (tree.op === "-" || tree.op === "/"));
    return needsParens ? `(${text})` : text;
  };

  return `${wrap(tree.left, false)} ${tree.op} ${wrap(tree.right, true)}`;
}

// The five distinct ways to combine four operands with three binary operators.
function groupings(a, b, c, d, o1, o2, o3) {
  return [
    node(o3, node(o2, node(o1, a, b), c), d), // ((a b) c) d
    node(o3, node(o1, a, node(o2, b, c)), d), // (a (b c)) d
    node(o2, node(o1, a, b), node(o3, c, d)), // (a b) (c d)
    node(o1, a, node(o3, node(o2, b, c), d)), // a ((b c) d)
    node(o1, a, node(o2, b, node(o3, c, d))), // a (b (c d))
  ];
}

function permutations(items) {
  if (items.length <= 1) return [items];
  return items.flatMap((item, i) =>
    permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [item, ...rest])
  );
}

/**
 * @param {number[]} numbers four integers
 * @returns {string[]} unique expressions equal to 24 (empty if none)
 */
function findSolutions(numbers) {
  const solutions = new Set();

  for (const [a, b, c, d] of permutations(numbers.map(leaf))) {
    for (const o1 of OPERATORS) {
      for (const o2 of OPERATORS) {
        for (const o3 of OPERATORS) {
          for (const tree of groupings(a, b, c, d, o1, o2, o3)) {
            const result = evaluate(tree);
            if (result !== null && result.d === 1 && result.n === TARGET) {
              solutions.add(format(tree));
            }
          }
        }
      }
    }
  }

  return [...solutions];
}

function solve24Game(w, x, y, z) {
  return findSolutions([w, x, y, z].map((n) => parseInt(n, 10)));
}

module.exports = { solve24Game, findSolutions };
