/* Grade 12 · Week 11 · Session 1 · Tree Builder Lab: parts and terms in Python (dictionary of lists) */
(function () {
  const TESTS = `
FAMILY = {"Grandpa": ["Dad", "Aunt"], "Dad": ["Ali", "Sara"], "Aunt": ["Omar"]}
ABC = {"A": ["B", "C"], "B": ["D", "E"], "C": ["F", "G"], "D": ["H", "I"], "E": ["J"]}
SCHOOL = {"School": ["Grade 10", "Grade 11"], "Grade 10": ["10A", "10B"], "Grade 11": ["11A", "11B"]}
def need_fn(ns, name):
    f = ns.get(name)
    if not callable(f): raise Exception("write a function called " + name + "(...)")
    return f
`;
  const FAM = `family = {\n    "Grandpa": ["Dad", "Aunt"],\n    "Dad": ["Ali", "Sara"],\n    "Aunt": ["Omar"]\n}\n`;
  window.CODELAB = {
    lang: 'python', visual: 'tree', key: 'g12w11s1',
    missions: [
      {
        id: 'build', t: 'Build the family tree in Python',
        task: `Python has no tree type, so we store a tree in a <b>dictionary</b>: each key is a parent, and its value is the list of its children. Make <code>family</code>:<pre>Grandpa → Dad, Aunt
Dad     → Ali, Sara
Aunt    → Omar</pre>Then print it. Watch the tree appear on the right!`,
        starter: `# Mission 1: a tree stored as a dictionary of lists\nfamily = {\n    "Grandpa": ["Dad", "Aunt"],\n    \n}\nprint(family)\n`,
        hint: 'Add two more keys: "Dad": ["Ali", "Sara"], and "Aunt": ["Omar"]. Separate the items with commas.',
        solution: `# Mission 1: a tree stored as a dictionary of lists\n${FAM}print(family)\n`,
        check: TESTS + `
def check(ns, out, err):
    if err: return False, ''
    f = ns.get('family')
    if not isinstance(f, dict): return False, 'Make a dictionary called family.'
    want = FAMILY
    for k, v in want.items():
        if k not in f: return False, 'The key "' + k + '" is missing (check capital letters).'
        if list(f[k]) != v: return False, k + ' should have the children ' + str(v) + '.'
    if len(f) != 3: return False, 'family should have exactly 3 parents (keys).'
    return True, 'Grandpa is the root, Dad and Aunt are parents, Ali, Sara and Omar are leaves. Look at the drawing!'
`,
      },
      {
        id: 'loop', t: 'Loop: each parent and its children',
        task: `Loop through <code>family</code> and print each parent and how many children it has:<pre>Grandpa has 2 children
Dad has 2 children
Aunt has 1 children</pre>`,
        starter: `# Mission 2: visit every parent\n${FAM}\nfor parent in family:\n    \n`,
        hint: 'The loop visits every key. len(family[parent]) counts its children: print(parent, "has", len(family[parent]), "children")',
        solution: `# Mission 2: visit every parent\n${FAM}\nfor parent in family:\n    print(parent, "has", len(family[parent]), "children")\n`,
        check: TESTS + `
def check(ns, out, err):
    if err: return False, ''
    lines = out.strip().splitlines()
    for p, n in [('Grandpa', 2), ('Dad', 2), ('Aunt', 1)]:
        if not any(p in l and str(n) in l.split() for l in lines): return False, 'Print a line showing ' + p + ' and its ' + str(n) + ' children.'
    if len(lines) < 3: return False, 'Print one line for each parent.'
    return True, 'A for loop over a dictionary visits every key: every parent.'
`,
      },
      {
        id: 'children', t: 'Function: children(tree, node)',
        task: `Write a function <code>children(tree, node)</code> that <b>returns</b> the list of children of a node. A leaf is not a key, so return an <b>empty list</b> <code>[]</code> for it.<pre>children(family, "Dad")  →  ['Ali', 'Sara']
children(family, "Ali")  →  []</pre>`,
        starter: `# Mission 3: who are the children?\n${FAM}\ndef children(tree, node):\n    \n\nprint(children(family, "Dad"))\nprint(children(family, "Ali"))\n`,
        hint: 'if node in tree: return tree[node]   otherwise: return []',
        solution: `# Mission 3: who are the children?\n${FAM}\ndef children(tree, node):\n    if node in tree:\n        return tree[node]\n    return []\n\nprint(children(family, "Dad"))\nprint(children(family, "Ali"))\n`,
        check: TESTS + `
def check(ns, out, err):
    if err: return False, ''
    f = need_fn(ns, 'children')
    if list(f(FAMILY, 'Dad')) != ['Ali', 'Sara']: return False, 'children(family, "Dad") should return [\\'Ali\\', \\'Sara\\'].'
    try: r = f(FAMILY, 'Ali')
    except KeyError: return False, 'Ali is a leaf, so it is not a key: return [] instead of crashing.'
    if r is None or list(r) != []: return False, 'For a leaf like Ali, return an empty list [].'
    if list(f(ABC, 'B')) != ['D', 'E']: return False, 'Your function should work for ANY tree: children(ABC, "B") should be [\\'D\\', \\'E\\'].'
    return True, 'I also tested it on another tree: it works for any tree.'
`,
      },
      {
        id: 'parent', t: 'Function: parent_of(tree, node)',
        task: `Write <code>parent_of(tree, node)</code>: look through every parent and return the one whose children list contains the node. The root has no parent, so return <code>None</code>.<pre>parent_of(family, "Sara")     →  'Dad'
parent_of(family, "Grandpa")  →  None</pre>`,
        starter: `# Mission 4: who is the parent?\n${FAM}\ndef parent_of(tree, node):\n    for parent in tree:\n        \n    return None\n\nprint(parent_of(family, "Sara"))\nprint(parent_of(family, "Grandpa"))\n`,
        hint: 'Inside the loop: if node in tree[parent]: return parent',
        solution: `# Mission 4: who is the parent?\n${FAM}\ndef parent_of(tree, node):\n    for parent in tree:\n        if node in tree[parent]:\n            return parent\n    return None\n\nprint(parent_of(family, "Sara"))\nprint(parent_of(family, "Grandpa"))\n`,
        check: TESTS + `
def check(ns, out, err):
    if err: return False, ''
    f = need_fn(ns, 'parent_of')
    if f(FAMILY, 'Sara') != 'Dad': return False, 'parent_of(family, "Sara") should be "Dad".'
    if f(FAMILY, 'Omar') != 'Aunt': return False, 'parent_of(family, "Omar") should be "Aunt".'
    if f(FAMILY, 'Grandpa') is not None: return False, 'Grandpa is the root: return None.'
    if f(ABC, 'E') != 'B': return False, 'Test on tree A to J: the parent of E should be B.'
    return True, 'Every node has exactly ONE parent, except the root.'
`,
      },
      {
        id: 'root', t: 'Function: find_root(tree)',
        task: `The <b>root</b> is the only node that is <b>nobody's child</b>. Write <code>find_root(tree)</code> that returns it.<pre>find_root(family)  →  'Grandpa'</pre>`,
        starter: `# Mission 5: the node with no parent\n${FAM}\ndef find_root(tree):\n    all_children = []\n    for parent in tree:\n        all_children = all_children + tree[parent]\n    # now find the parent that is NOT in all_children\n    \n\nprint(find_root(family))\n`,
        hint: 'for parent in tree: if parent not in all_children: return parent',
        solution: `# Mission 5: the node with no parent\n${FAM}\ndef find_root(tree):\n    all_children = []\n    for parent in tree:\n        all_children = all_children + tree[parent]\n    # now find the parent that is NOT in all_children\n    for parent in tree:\n        if parent not in all_children:\n            return parent\n\nprint(find_root(family))\n`,
        check: TESTS + `
def check(ns, out, err):
    if err: return False, ''
    f = need_fn(ns, 'find_root')
    if f(FAMILY) != 'Grandpa': return False, 'find_root(family) should return "Grandpa".'
    if f(ABC) != 'A' or f(SCHOOL) != 'School': return False, 'It must work for any tree: the roots of the A to J tree and the school tree are A and School.'
    if f({'X': ['Y'], 'W': ['X']}) != 'W': return False, 'Do not just return the first key: the root can be anywhere in the dictionary.'
    return True, 'Even when the root is not the first key, your function finds it.'
`,
      },
      {
        id: 'leaves', t: 'Function: leaves(tree)',
        task: `A <b>leaf</b> is a node with <b>no children</b>. Write <code>leaves(tree)</code> that returns a list of all the leaves.<pre>leaves(family)  →  ['Ali', 'Sara', 'Omar']</pre>`,
        starter: `# Mission 6: nodes with no children\n${FAM}\ndef leaves(tree):\n    result = []\n    for parent in tree:\n        for child in tree[parent]:\n            \n    return result\n\nprint(leaves(family))\n`,
        hint: 'A child is a leaf if it is NOT a key in the tree: if child not in tree: result.append(child)',
        solution: `# Mission 6: nodes with no children\n${FAM}\ndef leaves(tree):\n    result = []\n    for parent in tree:\n        for child in tree[parent]:\n            if child not in tree:\n                result.append(child)\n    return result\n\nprint(leaves(family))\n`,
        check: TESTS + `
def check(ns, out, err):
    if err: return False, ''
    f = need_fn(ns, 'leaves')
    if sorted(f(FAMILY)) != ['Ali', 'Omar', 'Sara']: return False, 'leaves(family) should be Ali, Sara and Omar. You returned ' + str(f(FAMILY)) + '.'
    if sorted(f(ABC)) != ['F', 'G', 'H', 'I', 'J']: return False, 'Test on tree A to J: the leaves are H, I, J, F and G.'
    return True, 'Tree A to J has 5 leaves: H, I, J, F and G, just like the slide.'
`,
      },
      {
        id: 'sib', t: 'Function: siblings(tree, node)',
        task: `<b>Siblings</b> share the same parent. Write <code>siblings(tree, node)</code> that returns the <b>other</b> children of the node's parent (not the node itself). The root has no siblings: return <code>[]</code>.<pre>siblings(family, "Ali")  →  ['Sara']</pre>Your <code>parent_of</code> function is already in the code to help you.`,
        starter: `# Mission 7: brothers and sisters\n${FAM}\ndef parent_of(tree, node):\n    for parent in tree:\n        if node in tree[parent]:\n            return parent\n    return None\n\ndef siblings(tree, node):\n    p = parent_of(tree, node)\n    \n\nprint(siblings(family, "Ali"))\n`,
        hint: 'if p is None: return []   then return a list of every child c in tree[p] where c != node',
        solution: `# Mission 7: brothers and sisters\n${FAM}\ndef parent_of(tree, node):\n    for parent in tree:\n        if node in tree[parent]:\n            return parent\n    return None\n\ndef siblings(tree, node):\n    p = parent_of(tree, node)\n    if p is None:\n        return []\n    result = []\n    for c in tree[p]:\n        if c != node:\n            result.append(c)\n    return result\n\nprint(siblings(family, "Ali"))\n`,
        check: TESTS + `
def check(ns, out, err):
    if err: return False, ''
    f = need_fn(ns, 'siblings')
    if list(f(FAMILY, 'Ali')) != ['Sara']: return False, 'siblings(family, "Ali") should be [\\'Sara\\'] (not Ali himself).'
    if list(f(FAMILY, 'Omar')) != []: return False, 'Omar is an only child: return [].'
    if list(f(FAMILY, 'Grandpa')) != []: return False, 'The root has no parent, so no siblings: return [].'
    if list(f(ABC, 'F')) != ['G']: return False, 'Test on tree A to J: the sibling of F is G.'
    return True, 'Sibling of F = G, exactly like question 4 on the slide.'
`,
      },
      {
        id: 'level', t: 'Function: level(tree, node)',
        task: `The root is on <b>level 1</b>, its children on level 2, and so on. Write <code>level(tree, node)</code>: start at the node and keep moving up to the parent, counting the levels.<pre>level(family, "Grandpa")  →  1
level(family, "Sara")     →  3</pre>`,
        starter: `# Mission 8: how deep is a node?\n${FAM}\ndef parent_of(tree, node):\n    for parent in tree:\n        if node in tree[parent]:\n            return parent\n    return None\n\ndef level(tree, node):\n    count = 1\n    \n    return count\n\nprint(level(family, "Grandpa"), level(family, "Sara"))\n`,
        hint: 'while parent_of(tree, node) is not None: node = parent_of(tree, node) and count = count + 1',
        solution: `# Mission 8: how deep is a node?\n${FAM}\ndef parent_of(tree, node):\n    for parent in tree:\n        if node in tree[parent]:\n            return parent\n    return None\n\ndef level(tree, node):\n    count = 1\n    while parent_of(tree, node) is not None:\n        node = parent_of(tree, node)\n        count = count + 1\n    return count\n\nprint(level(family, "Grandpa"), level(family, "Sara"))\n`,
        check: TESTS + `
def check(ns, out, err):
    if err: return False, ''
    f = need_fn(ns, 'level')
    if f(FAMILY, 'Grandpa') != 1: return False, 'The root is on level 1.'
    if f(FAMILY, 'Dad') != 2 or f(FAMILY, 'Sara') != 3: return False, 'Dad should be on level 2 and Sara on level 3.'
    if f(ABC, 'H') != 4: return False, 'Test on tree A to J: H is on level 4 (the tree has 4 levels).'
    return True, 'H is on level 4, so tree A to J has 4 levels, just like the slide says.'
`,
      },
      {
        id: 'abc', t: 'Challenge: tree A to J and its sub-tree',
        task: `Build the tree from the slides as <code>abc</code>:<pre>A → B, C     B → D, E     C → F, G
D → H, I     E → J</pre>Then write <code>subtree(tree, node)</code> that returns the node and <b>everything below it</b>. The sub-tree with root D is D, H, I.`,
        starter: `# Mission 9: the A to J tree\nabc = {\n    \n}\n\ndef subtree(tree, node):\n    result = [node]\n    for child in tree.get(node, []):\n        # add the child's whole sub-tree\n        \n    return result\n\nprint(subtree(abc, "D"))\n`,
        hint: 'Inside the loop call subtree again for the child: result = result + subtree(tree, child). A function that calls itself is called recursion!',
        solution: `# Mission 9: the A to J tree\nabc = {\n    "A": ["B", "C"],\n    "B": ["D", "E"],\n    "C": ["F", "G"],\n    "D": ["H", "I"],\n    "E": ["J"]\n}\n\ndef subtree(tree, node):\n    result = [node]\n    for child in tree.get(node, []):\n        # add the child's whole sub-tree\n        result = result + subtree(tree, child)\n    return result\n\nprint(subtree(abc, "D"))\n`,
        check: TESTS + `
def check(ns, out, err):
    if err: return False, ''
    t = ns.get('abc')
    if not isinstance(t, dict): return False, 'Make a dictionary called abc.'
    for k, v in ABC.items():
        if list(t.get(k, [])) != v: return False, k + ' should have the children ' + str(v) + '.'
    f = need_fn(ns, 'subtree')
    if sorted(f(ABC, 'D')) != ['D', 'H', 'I']: return False, 'subtree(abc, "D") should give D, H and I.'
    if sorted(f(ABC, 'B')) != ['B', 'D', 'E', 'H', 'I', 'J']: return False, 'subtree(abc, "B") should include the grandchildren too: B, D, E, H, I, J.'
    return True, 'The sub-tree of B even includes its grandchildren. That is recursion: a function calling itself!'
`,
      },
      {
        id: 'school', t: 'Your turn: the school tree',
        task: `Build the school tree from the slides as <code>school</code>: <b>School</b> has Grade 10 and Grade 11, and each grade has two classes (10A, 10B, 11A, 11B). Then use the functions (already written for you) to print:<pre>The root
The leaves
The level of 11B</pre>`,
        starter: `# Mission 10: describe the school tree with code\ndef find_root(tree):\n    kids = [c for p in tree for c in tree[p]]\n    for p in tree:\n        if p not in kids:\n            return p\n\ndef leaves(tree):\n    return [c for p in tree for c in tree[p] if c not in tree]\n\ndef level(tree, node):\n    count = 1\n    for p in tree:\n        if node in tree[p]:\n            return level(tree, p) + 1\n    return count\n\nschool = {\n    \n}\n\n`,
        hint: 'school = {"School": ["Grade 10", "Grade 11"], "Grade 10": ["10A", "10B"], "Grade 11": ["11A", "11B"]} then print(find_root(school)), print(leaves(school)), print(level(school, "11B"))',
        solution: `# Mission 10: describe the school tree with code\ndef find_root(tree):\n    kids = [c for p in tree for c in tree[p]]\n    for p in tree:\n        if p not in kids:\n            return p\n\ndef leaves(tree):\n    return [c for p in tree for c in tree[p] if c not in tree]\n\ndef level(tree, node):\n    count = 1\n    for p in tree:\n        if node in tree[p]:\n            return level(tree, p) + 1\n    return count\n\nschool = {\n    "School": ["Grade 10", "Grade 11"],\n    "Grade 10": ["10A", "10B"],\n    "Grade 11": ["11A", "11B"]\n}\n\nprint("Root:", find_root(school))\nprint("Leaves:", leaves(school))\nprint("Level of 11B:", level(school, "11B"))\n`,
        check: TESTS + `
def check(ns, out, err):
    if err: return False, ''
    s = ns.get('school')
    if not isinstance(s, dict): return False, 'Make a dictionary called school.'
    for k, v in SCHOOL.items():
        if k not in s: return False, 'The key "' + k + '" is missing (check spaces and capital letters).'
        if sorted(s[k]) != sorted(v): return False, k + ' should have the children ' + str(v) + '.'
    if 'School' not in out: return False, 'Print the root: print(find_root(school)).'
    if not all(c in out for c in ['10A', '10B', '11A', '11B']): return False, 'Print the leaves: print(leaves(school)).'
    if '3' not in out.split()[-1:] and ' 3' not in out: return False, 'Print the level of 11B: it is 3.'
    return True, 'School is the root, the 4 classes are leaves, and 11B is on level 3. You described a tree with code!'
`,
      },
    ],
  };
})();

/* MIS Coding Lab engine · students write and run real code (Python via Pyodide in a worker, SQL via sql.js).
   A grade's mission file sets window.CODELAB = { lang: 'python'|'sql', visual: 'array'|'tree'|'db', missions: [...] } before this runs.
   API (same as the other labs, so saving + results work): const lab = mountLab(root, { fs, height, onChange }) → { el, tasks, demoStep, demo, reset } */
(function () {
  const CSS = `
.clab{--ink:#1B1F3B;font-size:var(--clfs,18px);font-family:Nunito,system-ui,sans-serif;color:var(--ink);display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);gap:.7em;height:var(--clh,680px)}
.clab *{box-sizing:border-box}
.cl-next{grid-column:1/-1;display:flex;align-items:center;gap:.7em;background:linear-gradient(90deg,#fff2c4,#fff7e0);border:3px solid #FFB020;border-radius:1em;padding:.5em .85em;font-weight:800}
.cl-next .tag{background:#FFB020;color:#fff;border-radius:.6em;padding:.25em .6em;font:900 .78em Nunito,system-ui,sans-serif;letter-spacing:.08em;flex:none}
.cl-next .txt{flex:1;line-height:1.25;min-width:0}
.cl-btn{border:0;border-radius:.65em;padding:.45em .75em;font:800 .85em Nunito,system-ui,sans-serif;cursor:pointer;background:#fff;color:var(--ink);box-shadow:0 .2em 0 #dfe3f2;white-space:nowrap}
.cl-btn:disabled{opacity:.45;cursor:not-allowed}
.cl-btn.p{background:#5B5BF0;color:#fff;box-shadow:0 .2em 0 #3b3bc0}.cl-btn.g{background:#12B886;color:#fff;box-shadow:0 .2em 0 #0b8a62}.cl-btn.o{background:#FFB020;color:#fff;box-shadow:0 .2em 0 #c98600}
.cl-left{display:flex;flex-direction:column;gap:.6em;min-height:0}
.cl-task{background:#fff;border-radius:1em;padding:.6em .85em;box-shadow:0 .3em 0 #e4e1f5;font:700 .86em/1.4 Nunito,system-ui,sans-serif;max-height:34%;overflow:auto;flex:none}
.cl-task h4{margin:0 0 .25em;font:900 1.05em 'Baloo 2',Nunito,system-ui,sans-serif;color:#5B5BF0}
.cl-task code,.cl-task pre{font:700 .92em 'JetBrains Mono',ui-monospace,monospace;background:#f1f3ff;border-radius:.35em;padding:.05em .3em;color:#3730a3}
.cl-task pre{display:block;padding:.4em .6em;margin:.35em 0;white-space:pre-wrap}
.cl-ed{flex:1;min-height:8em;display:flex;background:#151936;border-radius:1em;overflow:hidden;position:relative;box-shadow:0 .3em 0 #0c0f24}
.cl-gut{flex:none;width:2.6em;padding:.7em .4em .7em 0;text-align:right;color:#59608e;font:600 .82em/1.55 'JetBrains Mono',ui-monospace,monospace;user-select:none;overflow:hidden;white-space:pre}
.cl-wrap{position:relative;flex:1;min-width:0}
.cl-wrap pre,.cl-wrap textarea{position:absolute;inset:0;margin:0;padding:.7em .8em;font:600 .82em/1.55 'JetBrains Mono',ui-monospace,monospace;white-space:pre;overflow:auto;tab-size:4;border:0;outline:0}
.cl-wrap pre{color:#e9ecff;pointer-events:none}
.cl-wrap textarea{background:transparent;color:transparent;caret-color:#fff;resize:none}
.cl-wrap textarea::selection{background:rgba(255,255,255,.25);color:transparent}
.hk{color:#c4a7ff}.hs{color:#ffd27a}.hn{color:#7ee2b8}.hc{color:#7f88b8;font-style:italic}.hf{color:#7cc7ff}
.cl-bar{display:flex;gap:.45em;flex-wrap:wrap;align-items:center}
.cl-right{display:flex;flex-direction:column;gap:.6em;min-height:0}
.cl-card{background:#fff;border-radius:1em;padding:.5em .75em;box-shadow:0 .3em 0 #e4e1f5}
.cl-h{font:900 .72em Nunito,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#5B5BF0;margin-bottom:.3em;display:flex;gap:.5em;align-items:center}
.cl-out{background:#151936;color:#e9ecff;border-radius:.7em;padding:.45em .65em;font:600 .78em/1.45 'JetBrains Mono',ui-monospace,monospace;min-height:4.2em;max-height:9em;overflow:auto;white-space:pre-wrap}
.cl-out .er{color:#ff8a9a}.cl-out .ok{color:#7ee2b8}.cl-out .dim{color:#7f88b8}
.cl-res{border-radius:.7em;padding:.45em .7em;font:800 .82em/1.35 Nunito,system-ui,sans-serif;margin-top:.4em;display:none}
.cl-res.good{display:block;background:#dcfbee;color:#0b6a4a}.cl-res.bad{display:block;background:#ffe3e3;color:#a31f1f}.cl-res.info{display:block;background:#fff2d6;color:#8a5b00}
.cl-vis{flex:1;min-height:6em;overflow:auto}
.cl-mis{max-height:36%;overflow:auto;flex:none}
.cl-m{display:flex;gap:.45em;align-items:center;padding:.2em .2em;border-radius:.5em;font:700 .78em/1.25 Nunito,system-ui,sans-serif;color:#4a5078;cursor:pointer}
.cl-m:hover{background:#f4f6ff}.cl-m.cur{background:#fff2d6;color:var(--ink)}
.cl-m .ck{flex:none;width:1.35em;height:1.35em;border-radius:.4em;background:#e7e9f5;color:#fff;display:grid;place-items:center;font-size:.85em}
.cl-m.on .ck{background:#16a34a}.cl-m.on{color:#12884f}
.cl-arr{display:flex;flex-wrap:wrap;gap:.25em;margin:.25em 0 .6em}
.cl-arr .c{display:flex;flex-direction:column;align-items:center;font:700 .66em 'JetBrains Mono',ui-monospace,monospace;color:#8a90b8}
.cl-arr .b{min-width:3.4em;padding:.35em .3em;border-radius:.45em;background:#5B5BF0;color:#fff;text-align:center;font:800 1.25em 'JetBrains Mono',ui-monospace,monospace;margin:.15em 0}
.cl-vn{font:900 .8em 'JetBrains Mono',ui-monospace,monospace;color:#1B1F3B}.cl-vn i{font-style:normal;color:#8a90b8;font-weight:700}
.cl-tbl{border-collapse:collapse;font:700 .72em Nunito,system-ui,sans-serif;margin:.2em 0 .6em;width:100%}
.cl-tbl th{background:#eef0ff;color:#3730a3;text-align:left;padding:.25em .4em}.cl-tbl td{border-top:1px solid #eef0fb;padding:.2em .4em}
.cl-tag{display:inline-block;border-radius:.35em;padding:0 .3em;margin-left:.2em;font:900 .8em Nunito,system-ui,sans-serif;color:#fff}
.cl-load{position:absolute;inset:0;display:grid;place-items:center;background:rgba(21,25,54,.92);color:#e9ecff;font:800 .9em Nunito,system-ui,sans-serif;text-align:center;padding:1em;z-index:3}
@media (max-width:900px){.clab{grid-template-columns:minmax(0,1fr);height:auto}.cl-ed{min-height:16em}.cl-task{max-height:none}}
`;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const PYK = /\b(import|from|as|def|return|if|elif|else|for|while|in|not|and|or|print|True|False|None|len|range|sum|max|min|round|del|class|try|except|pass|break|continue|lambda|is|with|global)\b/g;
  const SQK = /\b(CREATE|TABLE|ALTER|ADD|DROP|COLUMN|MODIFY|PRIMARY|KEY|FOREIGN|REFERENCES|NOT|NULL|UNIQUE|DEFAULT|CHECK|INT|INTEGER|VARCHAR|CHAR|TEXT|DATE|DECIMAL|FLOAT|INSERT|INTO|VALUES|SELECT|FROM|WHERE|AND|OR|IF|EXISTS|BETWEEN|IN|AUTO_INCREMENT|CONSTRAINT|RENAME|TO)\b/gi;
  function hl(code, lang) {
    // tokenise strings and comments first so keywords inside them are not coloured
    const re = lang === 'sql' ? /('(?:[^'\\]|\\.)*'?)|(--[^\n]*)/g : /("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?)|(#[^\n]*)/g;
    let out = '', last = 0, m;
    const kw = (t) => esc(t).replace(lang === 'sql' ? SQK : PYK, '<span class="hk">$1</span>').replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="hn">$1</span>');
    while ((m = re.exec(code))) { out += kw(code.slice(last, m.index)); out += m[1] ? `<span class="hs">${esc(m[1])}</span>` : `<span class="hc">${esc(m[2])}</span>`; last = re.lastIndex; }
    return out + kw(code.slice(last)) + '\n';
  }

  // ======================= PYTHON ENGINE (Pyodide in a worker) =======================
  const PY_HELPER = `
import json, sys, io, traceback, array, builtins, contextlib
def _noinput(*a):
    raise RuntimeError("input() is not used in this lab: put the values in your code")
def __vis(ns):
    v = []
    for k, x in list(ns.items()):
        if k.startswith('_') or k in ('arr', 'array'): continue
        if isinstance(x, array.array):
            v.append({'k': k, 't': 'array', 'tc': x.typecode, 'v': [round(e, 3) if isinstance(e, float) else e for e in x]})
        elif isinstance(x, dict) and x and all(isinstance(c, (list, tuple)) for c in x.values()):
            v.append({'k': k, 't': 'tree', 'v': {str(a): [None if c is None else str(c) for c in b] for a, b in x.items()}})
        elif isinstance(x, list) and len(x) <= 30 and all(isinstance(e, (int, float, str)) for e in x):
            v.append({'k': k, 't': 'list', 'v': [round(e, 3) if isinstance(e, float) else e for e in x]})
    return v[:4]
def __run(src, chk):
    ns = {'__name__': '__main__', 'input': _noinput}
    res = {'err': None, 'line': None, 'check': None, 'vis': [], 'out': ''}
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        try:
            exec(compile(src, 'main.py', 'exec'), ns)
        except SyntaxError as e:
            res['err'] = 'SyntaxError: ' + str(e.msg); res['line'] = e.lineno
        except Exception as e:
            ln = None
            for fr in traceback.extract_tb(e.__traceback__):
                if fr.filename == 'main.py': ln = fr.lineno
            res['err'] = type(e).__name__ + ': ' + str(e); res['line'] = ln
    res['out'] = buf.getvalue()
    if chk:
        try:
            cns = {}
            exec(chk, cns)
            with contextlib.redirect_stdout(io.StringIO()):
                ok, msg = cns['check'](ns, res['out'], res['err'])
            res['check'] = [bool(ok), str(msg)]
        except Exception as e:
            res['check'] = [False, 'Something in your code does not match the task yet (' + type(e).__name__ + ': ' + str(e) + ')']
    try: res['vis'] = __vis(ns)
    except Exception: pass
    return json.dumps(res, default=str)
`;
  const WORKER_SRC = `let py=null;
self.onmessage=async(e)=>{const m=e.data;
 if(m.type==='init'){try{const mod=await import(m.base+'pyodide.mjs');py=await mod.loadPyodide({indexURL:m.base});await py.runPythonAsync(m.helper);postMessage({type:'ready'});}catch(err){postMessage({type:'fail',err:String(err&&err.message||err)});}return;}
 if(m.type==='run'){try{py.globals.set('__src',m.code);py.globals.set('__chk',m.check||'');const r=await py.runPythonAsync('__run(__src, __chk)');postMessage({type:'done',id:m.id,res:JSON.parse(r)});}catch(err){postMessage({type:'done',id:m.id,res:{err:String(err&&err.message||err),out:'',vis:[],check:null}});}}};`;
  function pyEngine(base, onStatus) {
    let w = null, ready = null, mainPy = null, seq = 0;
    const start = () => {
      ready = new Promise((res, rej) => {
        try {
          w = new Worker(URL.createObjectURL(new Blob([WORKER_SRC], { type: 'text/javascript' })), { type: 'module' });
          w.onmessage = (e) => { if (e.data.type === 'ready') res('worker'); if (e.data.type === 'fail') rej(new Error(e.data.err)); };
          w.onerror = (e) => rej(new Error(e.message || 'worker error'));
          w.postMessage({ type: 'init', base, helper: PY_HELPER });
        } catch (e) { rej(e); }
      }).catch(async (e) => {
        // fallback: run Python on the page itself (no protection against endless loops)
        onStatus && onStatus('Starting Python (page mode)…');
        if (!window.loadPyodide) await new Promise((r, j) => { const s = document.createElement('script'); s.src = base + 'pyodide.js'; s.onload = r; s.onerror = () => j(new Error('Could not load pyodide.js from ' + base)); document.head.appendChild(s); });
        mainPy = await window.loadPyodide({ indexURL: base }); await mainPy.runPythonAsync(PY_HELPER); w = null; return 'page';
      });
      return ready;
    };
    start();
    return {
      ready: () => ready,
      async run(code, check) {
        await ready;
        if (mainPy) { mainPy.globals.set('__src', code); mainPy.globals.set('__chk', check || ''); return JSON.parse(await mainPy.runPythonAsync('__run(__src, __chk)')); }
        const id = ++seq;
        return new Promise((res) => {
          const t = setTimeout(() => { try { w.terminate(); } catch (e) { } start(); res({ err: 'TimeoutError: your code ran for more than 6 seconds. Is there a loop that never stops?', out: '', vis: [], check: [false, 'Your code did not finish.'], timeout: true }); }, 6000);
          const h = (e) => { if (e.data.type === 'done' && e.data.id === id) { clearTimeout(t); w.removeEventListener('message', h); res(e.data.res); } };
          w.addEventListener('message', h); w.postMessage({ type: 'run', id, code, check });
        });
      },
    };
  }

  // ======================= SQL ENGINE (sql.js) =======================
  function splitSql(src) {
    const out = []; let cur = '', q = null;
    for (let i = 0; i < src.length; i++) {
      const c = src[i];
      if (q) { cur += c; if (c === q) q = null; continue; }
      if (c === "'" || c === '"') { q = c; cur += c; continue; }
      if (c === '-' && src[i + 1] === '-') { while (i < src.length && src[i] !== '\n') i++; cur += '\n'; continue; }
      if (c === ';') { if (cur.trim()) out.push(cur.trim()); cur = ''; continue; }
      cur += c;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }
  function splitTop(body) { const parts = []; let d = 0, cur = '', q = null; for (const c of body) { if (q) { cur += c; if (c === q) q = null; continue; } if (c === "'" || c === '"') { q = c; cur += c; continue; } if (c === '(') d++; if (c === ')') d--; if (c === ',' && d === 0) { parts.push(cur.trim()); cur = ''; continue; } cur += c; } if (cur.trim()) parts.push(cur.trim()); return parts; }
  function sqlApi(db) {
    const q = (s, p) => { const r = db.exec(s, p); return r.length ? r[0].values.map((row) => Object.fromEntries(r[0].columns.map((c, i) => [c, row[i]]))) : []; };
    const api = {
      q,
      tables: () => q("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY rowid").map((r) => r.name),
      has: (t) => api.tables().some((x) => x.toLowerCase() === t.toLowerCase()),
      real: (t) => api.tables().find((x) => x.toLowerCase() === t.toLowerCase()),
      cols: (t) => { const r = api.real(t); return r ? q(`PRAGMA table_info("${r}")`) : []; },
      col: (t, c) => api.cols(t).find((x) => x.name.toLowerCase() === c.toLowerCase()),
      sql: (t) => { const r = q("SELECT sql FROM sqlite_master WHERE type='table' AND lower(name)=lower(?)", [t]); return r.length ? r[0].sql : ''; },
      fks: (t) => { const r = api.real(t); return r ? q(`PRAGMA foreign_key_list("${r}")`) : []; },
      unique: (t, c) => { const r = api.real(t); if (!r) return false; return q(`PRAGMA index_list("${r}")`).some((ix) => ix.unique && ix.origin === 'u' && q(`PRAGMA index_info("${ix.name}")`).length === 1 && q(`PRAGMA index_info("${ix.name}")`)[0].name.toLowerCase() === c.toLowerCase()); },
      type: (t, c) => { const x = api.col(t, c); return x ? String(x.type).toUpperCase().replace(/\s+/g, '') : ''; },
    };
    return api;
  }
  // SQLite cannot MODIFY a column or ADD a UNIQUE column, so rebuild the table the way MySQL would change it
  function rebuild(db, table, fn) {
    const api = sqlApi(db), real = api.real(table); if (!real) throw new Error('no such table: ' + table);
    const sql = api.sql(real), a = sql.indexOf('('), b = sql.lastIndexOf(')');
    const items = fn(splitTop(sql.slice(a + 1, b)));
    const before = api.cols(real).map((c) => c.name);
    db.run('PRAGMA foreign_keys=OFF'); db.run('PRAGMA legacy_alter_table=ON');
    db.run(`ALTER TABLE "${real}" RENAME TO "${real}__old"`);
    db.run(`CREATE TABLE ${real} (\n  ${items.join(',\n  ')}\n)`);
    const after = sqlApi(db).cols(real).map((c) => c.name.toLowerCase());
    const common = before.filter((c) => after.includes(c.toLowerCase())).map((c) => `"${c}"`).join(', ');
    if (common) db.run(`INSERT INTO "${real}" (${common}) SELECT ${common} FROM "${real}__old"`);
    db.run(`DROP TABLE "${real}__old"`); db.run('PRAGMA legacy_alter_table=OFF');
  }
  const isConstraint = (it) => /^(PRIMARY|FOREIGN|UNIQUE|CHECK|CONSTRAINT)\b/i.test(it);
  function runStmt(db, st) {
    let s = st.replace(/\bAUTO_INCREMENT\b/gi, '');
    let m = s.match(/^ALTER\s+TABLE\s+[`"]?(\w+)[`"]?\s+MODIFY\s+(?:COLUMN\s+)?[`"]?(\w+)[`"]?\s+([\s\S]+)$/i);
    if (m) { const [, t, c, def] = m; let found = false; rebuild(db, t, (items) => items.map((it) => { if (!isConstraint(it) && it.split(/\s+/)[0].replace(/[`"]/g, '').toLowerCase() === c.toLowerCase()) { found = true; return `${c} ${def.trim()}`; } return it; })); if (!found) throw new Error(`no such column: ${c}`); return 'modify'; }
    try { db.run(s); return 'ok'; } catch (e) {
      m = s.match(/^ALTER\s+TABLE\s+[`"]?(\w+)[`"]?\s+ADD\s+(?:COLUMN\s+)?([\s\S]+)$/i);
      if (m && /Cannot add a (UNIQUE|PRIMARY KEY)/i.test(e.message)) { rebuild(db, m[1], (items) => { const i = items.findIndex(isConstraint); const it = items.slice(); it.splice(i < 0 ? it.length : i, 0, m[2].trim()); return it; }); return 'ok'; }
      throw e;
    }
  }

  // ======================= THE LAB =======================
  window.mountLab = function (root, opts = {}) {
    const CFG = window.CODELAB, M = CFG.missions, lang = CFG.lang;
    if (!document.getElementById('cl-css')) { const st = document.createElement('style'); st.id = 'cl-css'; st.textContent = CSS; document.head.appendChild(st); }
    const el = document.createElement('div'); el.className = 'clab'; el.style.setProperty('--clfs', opts.fs || '18px'); el.style.setProperty('--clh', opts.height || '680px');
    el.innerHTML = `<div class="cl-next"><span class="tag">MISSION</span><span class="txt"></span><button class="cl-btn" data-a="hint">💡 Hint</button><button class="cl-btn p" data-a="show">▶ Show me</button></div>
      <div class="cl-left"><div class="cl-task"></div>
        <div class="cl-ed"><div class="cl-gut"></div><div class="cl-wrap"><pre></pre><textarea spellcheck="false" autocapitalize="off" autocomplete="off"></textarea></div><div class="cl-load">⏳ Loading ${lang === 'sql' ? 'the SQL database' : 'Python'}…</div></div>
        <div class="cl-bar"><button class="cl-btn g" data-a="run">▶ Run &amp; check</button><button class="cl-btn" data-a="prev">◀</button><button class="cl-btn" data-a="next">▶</button><span style="flex:1"></span><button class="cl-btn" data-a="restart" title="Put the starter code back">↺ Starter code</button></div></div>
      <div class="cl-right"><div class="cl-card"><div class="cl-h">${lang === 'sql' ? '🗄️ Messages' : '>_ Output'}</div><div class="cl-out"><span class="dim">Press ▶ Run &amp; check (or Ctrl + Enter).</span></div><div class="cl-res"></div></div>
        <div class="cl-card cl-vis"><div class="cl-h">${CFG.visual === 'db' ? '🧱 Your database' : CFG.visual === 'tree' ? '🌳 Your tree' : '🔢 Your arrays'}</div><div class="vis"><span style="color:#8a90b8;font:700 .8em Nunito,system-ui,sans-serif">Run your code to see it drawn here.</span></div></div>
        <div class="cl-card cl-mis"><div class="cl-h">Missions <span class="cnt" style="margin-left:auto;color:#6b7096"></span></div><div class="ml"></div></div></div>`;
    root.appendChild(el);
    const $ = (s) => el.querySelector(s), ta = $('textarea'), pre = $('.cl-wrap pre'), gut = $('.cl-gut');
    const KEY = 'codelab-' + (opts.key || CFG.key || location.pathname);
    let cur = 0, done = new Set(), codes = {}, busy = false, engine = null;
    try { const s = JSON.parse(localStorage.getItem(KEY) || '{}'); codes = s.codes || {}; } catch (e) { }
    const persist = () => { try { localStorage.setItem(KEY, JSON.stringify({ codes })); } catch (e) { } };
    // ---- editor ----
    const paintEd = () => { pre.innerHTML = hl(ta.value, lang); const n = ta.value.split('\n').length; gut.textContent = Array.from({ length: n }, (_, i) => i + 1).join('\n'); pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft; gut.scrollTop = ta.scrollTop; };
    ta.addEventListener('input', () => { codes[M[cur].id] = ta.value; persist(); paintEd(); });
    ta.addEventListener('scroll', () => { pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft; gut.scrollTop = ta.scrollTop; });
    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); return; }
      const s = ta.selectionStart, v = ta.value;
      if (e.key === 'Tab') { e.preventDefault(); ta.setRangeText('    ', s, ta.selectionEnd, 'end'); ta.dispatchEvent(new Event('input')); }
      else if (e.key === 'Enter') {
        e.preventDefault(); const line = v.slice(v.lastIndexOf('\n', s - 1) + 1, s); let ind = line.match(/^\s*/)[0];
        if (lang === 'python' && /:\s*(#.*)?$/.test(line)) ind += '    ';
        ta.setRangeText('\n' + ind, s, ta.selectionEnd, 'end'); ta.dispatchEvent(new Event('input'));
      }
    });
    // ---- screen ----
    const out = $('.cl-out'), res = $('.cl-res');
    const setRes = (cls, html) => { res.className = 'cl-res ' + cls; res.innerHTML = html; };
    function load(i) {
      cur = Math.max(0, Math.min(M.length - 1, i)); const m = M[cur];
      $('.cl-task').innerHTML = `<h4>Mission ${cur + 1} of ${M.length} · ${m.t}</h4>${m.task}`;
      ta.value = codes[m.id] != null ? codes[m.id] : m.starter; paintEd();
      out.innerHTML = '<span class="dim">Press ▶ Run &amp; check (or Ctrl + Enter).</span>'; res.className = 'cl-res';
      paint();
    }
    function paint() {
      $('.cl-next .tag').textContent = `MISSION ${cur + 1}/${M.length}`;
      $('.cl-next .txt').innerHTML = done.size === M.length ? '🎉 All missions complete! Change the code and experiment.' : M[cur].t + (done.has(M[cur].id) ? ' ✓' : '');
      $('.cnt').textContent = `${done.size} / ${M.length}`;
      $('.ml').innerHTML = M.map((m, i) => `<div class="cl-m ${done.has(m.id) ? 'on' : ''} ${i === cur ? 'cur' : ''}" data-i="${i}"><span class="ck">${done.has(m.id) ? '✓' : i + 1}</span><span>${m.t}</span></div>`).join('');
      el.querySelectorAll('.cl-m').forEach((d) => d.onclick = () => !busy && load(+d.dataset.i));
      $('[data-a="prev"]').disabled = cur === 0; $('[data-a="next"]').disabled = cur === M.length - 1;
      opts.onChange && opts.onChange();
    }
    // ---- visual panel ----
    function drawTree(name, T) {
      const kids = (n) => (T[n] || []).filter((c) => c != null);
      const all = new Set(Object.keys(T)); Object.values(T).forEach((l) => l.forEach((c) => c != null && all.add(c)));
      const childSet = new Set(); Object.values(T).forEach((l) => l.forEach((c) => c != null && childSet.add(c)));
      const roots = [...all].filter((n) => !childSet.has(n));
      if (roots.length !== 1) return `<div class="cl-vn">${esc(name)} <i>(dictionary)</i></div><div style="font:700 .75em Nunito,system-ui,sans-serif;color:#a31f1f;margin:.2em 0 .6em">${roots.length ? 'More than one root: ' + roots.map(esc).join(', ') : 'No root found (a loop?)'}</div>`;
      const pos = {}; let leafX = 0, maxD = 0, guard = 0;
      const place = (n, d, seen) => { if (seen.has(n) || ++guard > 200) return 0; seen.add(n); maxD = Math.max(maxD, d); const k = kids(n); if (!k.length) { pos[n] = [leafX++, d]; return pos[n][0]; } const xs = k.map((c) => place(c, d + 1, seen)); pos[n] = [(Math.min(...xs) + Math.max(...xs)) / 2, d]; return pos[n][0]; };
      place(roots[0], 0, new Set());
      const W = Math.max(1, leafX) * 92 + 20, H = (maxD + 1) * 78 + 10, X = (x) => 56 + x * 92, Y = (d) => 34 + d * 78;
      let s = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-height:12.5em;display:block">`;
      Object.keys(pos).forEach((n) => kids(n).forEach((c) => { if (pos[c]) s += `<line x1="${X(pos[n][0])}" y1="${Y(pos[n][1])}" x2="${X(pos[c][0])}" y2="${Y(pos[c][1])}" stroke="#b9bfdc" stroke-width="3"/>`; }));
      Object.entries(pos).forEach(([n, [x, d]]) => { const col = d === 0 ? '#9B5DE5' : kids(n).length ? '#5B5BF0' : '#12B886'; s += `<g><rect x="${X(x) - 42}" y="${Y(d) - 17}" width="84" height="34" rx="12" fill="${col}"/><text x="${X(x)}" y="${Y(d) + 5}" text-anchor="middle" font-family="Nunito,system-ui,sans-serif" font-weight="800" font-size="${n.length > 9 ? 11 : 14}" fill="#fff">${esc(n.length > 12 ? n.slice(0, 11) + '…' : n)}</text></g>`; });
      return `<div class="cl-vn">${esc(name)} <i>· root ${esc(roots[0])} · ${Object.keys(pos).length} nodes · ${maxD + 1} levels</i></div>${s}</svg><div style="font:800 .66em Nunito,system-ui,sans-serif;color:#6b7096;margin-bottom:.5em"><span class="cl-tag" style="background:#9B5DE5">root</span> <span class="cl-tag" style="background:#5B5BF0">parent</span> <span class="cl-tag" style="background:#12B886">leaf</span></div>`;
    }
    function drawVis(v) {
      const box = $('.vis');
      if (!v || !v.length) { box.innerHTML = '<span style="color:#8a90b8;font:700 .8em Nunito,system-ui,sans-serif">Nothing to draw yet.</span>'; return; }
      box.innerHTML = v.map((x) => {
        if (x.t === 'tree') return drawTree(x.k, x.v);
        const n = x.v.length;
        return `<div class="cl-vn">${esc(x.k)} <i>${x.t === 'array' ? `array('${x.tc}') · ${n} items` : `list · ${n} items`}</i></div><div class="cl-arr">${x.v.map((e, i) => `<div class="c">${i}<div class="b" style="${x.t === 'list' ? 'background:#FFB020' : ''}">${esc(e)}</div>${i - n}</div>`).join('')}</div>`;
      }).join('');
    }
    function drawDb(api) {
      const box = $('.vis'), ts = api.tables();
      if (!ts.length) { box.innerHTML = '<span style="color:#8a90b8;font:700 .8em Nunito,system-ui,sans-serif">The database is empty: no tables.</span>'; return; }
      box.innerHTML = ts.map((t) => {
        const cs = api.cols(t), fk = api.fks(t), rows = api.q(`SELECT COUNT(*) AS n FROM "${t}"`)[0].n, sql = api.sql(t);
        return `<div class="cl-vn">📋 ${esc(t)} <i>· ${cs.length} columns · ${rows} rows</i></div><table class="cl-tbl"><tr><th>Column</th><th>Type</th><th>Rules</th></tr>${cs.map((c) => {
          const tags = []; if (c.pk) tags.push('<span class="cl-tag" style="background:#FFB020">PK</span>'); if (c.notnull) tags.push('<span class="cl-tag" style="background:#FF5D73">NOT NULL</span>');
          if (api.unique(t, c.name)) tags.push('<span class="cl-tag" style="background:#9B5DE5">UNIQUE</span>'); const f = fk.find((k) => k.from.toLowerCase() === c.name.toLowerCase()); if (f) tags.push(`<span class="cl-tag" style="background:#1C9BEF">FK → ${esc(f.table)}</span>`);
          if (c.dflt_value != null) tags.push(`<span class="cl-tag" style="background:#12B886">DEFAULT ${esc(c.dflt_value)}</span>`);
          if (new RegExp('\\b' + c.name + '\\b[^,]*CHECK', 'i').test(sql)) tags.push('<span class="cl-tag" style="background:#6b7096">CHECK</span>');
          return `<tr><td><b>${esc(c.name)}</b></td><td>${esc(c.type)}</td><td>${tags.join('')}</td></tr>`; }).join('')}</table>`;
      }).join('');
    }
    // ---- engines ----
    const base = (() => { let b = window.CODELAB_BASE || (location.protocol === 'file:' && (window.SITE_URL || (typeof SITE_URL !== 'undefined' && SITE_URL))) || './'; try { b = new URL(b, location.href).href; } catch (e) { } return b.endsWith('/') ? b : b + '/'; })();
    let SQL = null;
    const engineReady = (async () => {
      try {
        if (lang === 'sql') {
          if (!window.initSqlJs) await new Promise((r, j) => { const s = document.createElement('script'); s.src = base + 'sql-wasm.js'; s.onload = r; s.onerror = () => j(new Error('sql-wasm.js not found')); document.head.appendChild(s); });
          SQL = await window.initSqlJs({ locateFile: (f) => base + f });
        } else { engine = pyEngine(base, (t) => { $('.cl-load').textContent = '⏳ ' + t; }); await engine.ready(); }
        $('.cl-load').remove();
      } catch (e) { $('.cl-load').innerHTML = `⚠️ Could not start ${lang === 'sql' ? 'the SQL engine' : 'Python'}.<br><small>Open the lab from its GitHub link, and check the files were all uploaded.<br>${esc(e.message || e)}</small>`; throw e; }
    })();
    engineReady.catch(() => { });
    async function run() {
      if (busy) return; busy = true; const m = M[cur], code = ta.value; $('[data-a="run"]').disabled = true;
      out.innerHTML = '<span class="dim">Running…</span>'; res.className = 'cl-res';
      try {
        await engineReady;
        let ok = false, msg = '';
        if (lang === 'sql') {
          const db = new SQL.Database(); db.run('PRAGMA foreign_keys=ON'); if (m.setup) db.exec(m.setup);
          const api = sqlApi(db), log = [], stmts = splitSql(code); let err = null;
          if (!stmts.length) err = 'Write at least one SQL statement.';
          for (const st of stmts) {
            try {
              if (/^\s*SELECT/i.test(st) || /^\s*PRAGMA/i.test(st)) { const r = db.exec(st); log.push(`<span class="ok">✓ ${esc(st.split('\n')[0].slice(0, 60))}</span>`); if (r[0]) log.push(esc([r[0].columns.join(' | '), ...r[0].values.slice(0, 8).map((v) => v.join(' | '))].join('\n'))); }
              else { runStmt(db, st); log.push(`<span class="ok">✓ ${esc(st.replace(/\s+/g, ' ').slice(0, 70))}${st.length > 70 ? '…' : ''}</span>`); }
            } catch (e) { err = `${e.message} → in: ${st.replace(/\s+/g, ' ').slice(0, 60)}`; break; }
          }
          out.innerHTML = log.join('\n') + (err ? `\n<span class="er">❌ ${esc(err)}</span>` : '');
          drawDb(api);
          if (err) { ok = false; msg = 'Fix the error in red first. Check commas, brackets and spelling.'; }
          else { try { [ok, msg] = m.check(api, code); } catch (e) { ok = false; msg = 'Not quite yet: ' + e.message; } }
          db.close();
        } else {
          const r = await engine.run(code, m.check);
          let txt = esc(r.out || '');
          if (r.err) txt += `${txt ? '\n' : ''}<span class="er">❌ ${esc(r.err)}${r.line ? ` (line ${r.line})` : ''}</span>`;
          out.innerHTML = txt || '<span class="dim">(no output: did you use print?)</span>';
          drawVis(r.vis);
          [ok, msg] = r.check || [false, ''];
          if (r.err && !r.timeout) msg = r.line ? `There is an error on line ${r.line}. Read the red message, fix it and run again.` : 'Read the red message, fix it and run again.';
        }
        out.scrollTop = out.scrollHeight;
        if (ok) { const first = !done.has(m.id); done.add(m.id); setRes('good', `✅ ${msg || 'Mission complete!'}${cur < M.length - 1 ? ' Press ▶ to go to the next mission.' : ''}`); if (first) paint(); }
        else setRes('bad', `🔎 ${msg || 'Not yet. Read the task again.'}`);
      } catch (e) { out.innerHTML = `<span class="er">⚠️ ${esc(e.message || e)}</span>`; }
      finally { busy = false; $('[data-a="run"]').disabled = false; }
    }
    $('[data-a="run"]').onclick = run;
    $('[data-a="prev"]').onclick = () => !busy && load(cur - 1);
    $('[data-a="next"]').onclick = () => !busy && load(cur + 1);
    $('[data-a="restart"]').onclick = () => { if (busy) return; ta.value = M[cur].starter; codes[M[cur].id] = ta.value; persist(); paintEd(); };
    $('[data-a="hint"]').onclick = () => setRes('info', '💡 ' + M[cur].hint);
    const typeIn = async (txt, slow) => { if (!slow) { ta.value = txt; paintEd(); return; } ta.value = ''; for (let i = 0; i < txt.length; i += 3) { ta.value = txt.slice(0, i + 3); paintEd(); await new Promise((r) => setTimeout(r, 12)); } };
    async function show(i, slow = true) { if (busy) return; if (i !== cur) load(i); await typeIn(M[cur].solution, slow); codes[M[cur].id] = ta.value; persist(); await run(); }
    $('[data-a="show"]').onclick = () => show(cur);
    load(0);
    return {
      el,
      tasks: () => M.map((m) => [m.t, done.has(m.id)]),
      demoStep() { if (busy) return false; const i = M.findIndex((m) => !done.has(m.id)); if (i < 0) return false; show(i); return true; },
      async demo() { for (let i = 0; i < M.length; i++) if (!done.has(M[i].id)) { await show(i, false); await new Promise((r) => setTimeout(r, 500)); } },
      reset() { done.clear(); codes = {}; persist(); load(0); },
      ready: () => engineReady,
    };
  };
})();

