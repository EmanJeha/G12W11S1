/* Questions for both games. Edit text here; keep the structure.
   Question types:
     mc    – multiple choice (options + answer index)
     order – tap tiles into the right order
     line  – tap a line (here: the line of code that does a job)
     bins  – sort each item into one of two (or three) groups
   Any question can have its own "seconds". */
window.SITE_INFO = {
 "badge": "Grade 12 · Unit 5 · Week 11 · Session 1",
 "titleText": "Tree Games",
 "warmup": {
  "label": "Warm-up",
  "sub": "Guess today’s lesson"
 },
 "wrapup": {
  "label": "Wrap-up",
  "sub": "Tree Trek"
 },
 "titleHTML": "<span class=\"c1\">T</span><span class=\"c2\">r</span><span class=\"c3\">e</span><span class=\"c4\">e</span><br><span class=\"c5\">G</span><span class=\"c1\">a</span><span class=\"c2\">m</span><span class=\"c3\">e</span><span class=\"c4\">s</span>"
};
window.GAMES = {
 "warmup": {
  "badge": "Unit 5 · Week 11 · Session 1 · Warm-up",
  "name": "Branch Detective",
  "titleHTML": "<span class=\"c1\">B</span><span class=\"c2\">r</span><span class=\"c3\">a</span><span class=\"c4\">n</span><span class=\"c5\">c</span><span class=\"c1\">h</span><br><span class=\"c2\">D</span><span class=\"c3\">e</span><span class=\"c4\">t</span><span class=\"c5\">e</span><span class=\"c1\">c</span><span class=\"c2\">t</span><span class=\"c3\">i</span><span class=\"c4\">v</span><span class=\"c5\">e</span>",
  "intro": "Remember graphs from Unit 4? Every correct answer flips letters of today’s mystery topic. Crack it for +200!",
  "rules": [
   "Play on your own device (or with your partner)",
   "Faster answers = more points",
   "3 right in a row = 🔥 streak bonus",
   "Crack the topic early: +200",
   "Watch your name climb on the teacher’s screen"
  ],
  "seconds": 40,
  "points": 100,
  "floaters": [
   "🌳",
   "🕸️",
   "📁",
   "👨‍👧",
   "🔗",
   "🍃",
   "🧭",
   "🕵️"
  ],
  "topic": "Data structures",
  "mystery": {
   "label": "Today’s mystery topic",
   "phrase": "TREES",
   "order": [
    0,
    1,
    4,
    2,
    3
   ],
   "perCorrect": 1,
   "bonus": 200,
   "accept": [
    "trees",
    "tree",
    "tree data structure",
    "trees parts and terms"
   ],
   "finalQ": "Put all the clues together. What is today’s lesson?",
   "finalOptions": [
    "Stacks",
    "Trees",
    "Arrays",
    "Queues"
   ],
   "finalAnswer": 1,
   "finalWhy": "A family and your computer folders both start at one top item and branch down: they are trees!"
  },
  "questions": [
   {
    "type": "mc",
    "ctx": "Graphs",
    "skill": "Remember",
    "q": "In a graph, the dots are called…",
    "options": [
     "Edges",
     "Nodes (vertices)",
     "Levels",
     "Keys"
    ],
    "answer": 1,
    "why": "Dots are nodes (vertices); lines are edges."
   },
   {
    "type": "mc",
    "ctx": "Graphs",
    "skill": "Remember",
    "q": "The lines that join two nodes are…",
    "options": [
     "Edges",
     "Leaves",
     "Roots",
     "Indexes"
    ],
    "answer": 0,
    "why": "An edge joins two nodes."
   },
   {
    "type": "mc",
    "ctx": "Everyday trees",
    "skill": "Understand",
    "q": "Your computer folders start from one top folder and branch down. This shape is a…",
    "options": [
     "Line",
     "Tree",
     "Circle",
     "Table"
    ],
    "answer": 1,
    "why": "One top item that branches into smaller parts is a tree."
   },
   {
    "type": "bins",
    "ctx": "Data structures",
    "skill": "Analyze",
    "seconds": 55,
    "q": "Linear or non-linear?",
    "bins": [
     "➡️ Linear",
     "🌳 Non-linear"
    ],
    "items": [
     {
      "t": "Array",
      "b": 0
     },
     {
      "t": "Family tree",
      "b": 1
     },
     {
      "t": "Queue",
      "b": 0
     },
     {
      "t": "Road map graph",
      "b": 1
     },
     {
      "t": "Folder tree",
      "b": 1
     }
    ],
    "why": "Arrays and queues go one after another; trees and graphs branch."
   },
   {
    "type": "mc",
    "ctx": "Family",
    "skill": "Apply",
    "q": "In a family tree, who sits at the very top?",
    "options": [
     "The youngest child",
     "The oldest ancestor",
     "A cousin",
     "Nobody"
    ],
    "answer": 1,
    "why": "The oldest ancestor is the top item: the root."
   },
   {
    "type": "mc",
    "ctx": "Python",
    "skill": "Apply",
    "q": "d = {\"Dad\": [\"Ali\", \"Sara\"]}. What is d[\"Dad\"]?",
    "options": [
     "'Dad'",
     "['Ali', 'Sara']",
     "2",
     "Error"
    ],
    "answer": 1,
    "why": "The key Dad gives its value: the list of children."
   }
  ],
  "endHTML": "<div class=\"reveal\"><span class=\"pill\">Today's lesson</span><div class=\"big\">TREES</div><p class=\"lede\">One root that branches down to the leaves.</p></div>\n<div class=\"recap\"><div><b>Root</b>The top</div><div><b>Parent · child</b>Joined by edges</div><div><b>Leaf</b>No children</div></div>"
 },
 "wrapup": {
  "badge": "Unit 5 · Week 11 · Session 1 · Wrap-up",
  "name": "Tree Trek",
  "titleHTML": "<span class=\"c1\">T</span><span class=\"c2\">r</span><span class=\"c3\">e</span><span class=\"c4\">e</span><br><span class=\"c5\">T</span><span class=\"c1\">r</span><span class=\"c2\">e</span><span class=\"c3\">k</span>",
  "intro": "Ten challenges on the parts of a tree. Who is today’s tree champion?",
  "rules": [
   "Play on your own device (or with your partner)",
   "Faster answers = more points",
   "3 right in a row = 🔥 streak bonus",
   "Sort cards, order tiles and tap code lines",
   "Watch your name climb on the teacher’s screen"
  ],
  "seconds": 45,
  "points": 100,
  "floaters": [
   "🌳",
   "🌱",
   "🍃",
   "👫",
   "📁",
   "🧩",
   "🪜",
   "🏆"
  ],
  "topic": "Trees",
  "exit": {
   "q": "Draw a small tree and label the root, one parent, two siblings and one leaf.",
   "placeholder": "Root: …  Parent: …  Siblings: …  Leaf: …",
   "model": "Root: Grandpa. Parent: Dad. Siblings: Ali and Sara. Leaf: Omar."
  },
  "questions": [
   {
    "type": "mc",
    "ctx": "Definition",
    "skill": "Remember",
    "q": "A tree is a … data structure.",
    "options": [
     "Linear",
     "Non-linear",
     "Circular",
     "Sorted"
    ],
    "answer": 1,
    "why": "Trees branch, so they are non-linear."
   },
   {
    "type": "mc",
    "ctx": "Root",
    "skill": "Remember",
    "q": "Which node has no parent?",
    "options": [
     "Leaf",
     "Root",
     "Sibling",
     "Child"
    ],
    "answer": 1,
    "why": "The root is at the top."
   },
   {
    "type": "bins",
    "ctx": "Family tree",
    "skill": "Apply",
    "seconds": 60,
    "q": "Grandpa → Dad, Aunt · Dad → Ali, Sara · Aunt → Omar. Sort the nodes.",
    "bins": [
     "🌱 Root",
     "👨‍👧 Parent (not root)",
     "🍃 Leaf"
    ],
    "items": [
     {
      "t": "Grandpa",
      "b": 0
     },
     {
      "t": "Dad",
      "b": 1
     },
     {
      "t": "Aunt",
      "b": 1
     },
     {
      "t": "Ali",
      "b": 2
     },
     {
      "t": "Omar",
      "b": 2
     }
    ],
    "why": "Grandpa has no parent; Dad and Aunt have children; Ali and Omar have none."
   },
   {
    "type": "mc",
    "ctx": "Siblings",
    "skill": "Understand",
    "q": "Nodes B and C share parent A, so they are…",
    "options": [
     "Siblings",
     "Leaves",
     "Edges",
     "Roots"
    ],
    "answer": 0,
    "why": "Same parent means siblings."
   },
   {
    "type": "mc",
    "ctx": "A to J tree",
    "skill": "Analyze",
    "q": "A → B, C · B → D, E · C → F, G · D → H, I · E → J. How many leaves?",
    "options": [
     "3",
     "4",
     "5",
     "6"
    ],
    "answer": 2,
    "why": "H, I, J, F and G have no children: 5 leaves."
   },
   {
    "type": "order",
    "ctx": "Levels",
    "skill": "Apply",
    "seconds": 55,
    "q": "Order these nodes from the top level to the bottom.",
    "sub": "Tap the tiles in order.",
    "tiles": [
     "H",
     "B",
     "A",
     "D"
    ],
    "answer": [
     "A",
     "B",
     "D",
     "H"
    ],
    "why": "A is level 1, B level 2, D level 3, H level 4."
   },
   {
    "type": "mc",
    "ctx": "Sub-tree",
    "skill": "Analyze",
    "q": "In the A to J tree, the sub-tree with D as its root is…",
    "options": [
     "D, H, I",
     "D, E",
     "B, D, E",
     "H, I"
    ],
    "answer": 0,
    "why": "D and everything below it: H and I."
   },
   {
    "type": "line",
    "ctx": "Python",
    "skill": "Apply",
    "q": "Tap the line that prints Dad’s children.",
    "code": [
     "family = {",
     "    \"Grandpa\": [\"Dad\", \"Aunt\"],",
     "    \"Dad\": [\"Ali\", \"Sara\"],",
     "    \"Aunt\": [\"Omar\"]",
     "}",
     "print(family[\"Dad\"])"
    ],
    "answer": 5,
    "why": "family[\"Dad\"] gives the list of Dad’s children."
   },
   {
    "type": "mc",
    "ctx": "Folders",
    "skill": "Evaluate",
    "q": "Documents has parent Computer and children School and Work. Documents is…",
    "options": [
     "Only a child",
     "Only a parent",
     "Both a child and a parent",
     "A leaf"
    ],
    "answer": 2,
    "why": "A node can be a child and a parent at the same time."
   },
   {
    "type": "mc",
    "ctx": "Edges",
    "skill": "Understand",
    "q": "A tree has 10 nodes. How many edges does it have?",
    "options": [
     "10",
     "9",
     "11",
     "20"
    ],
    "answer": 1,
    "why": "Every node except the root has one edge to its parent: 10 − 1 = 9."
   }
  ],
  "endHTML": "<div class=\"recap\"><div><b>Root</b>No parent</div><div><b>Siblings</b>Same parent</div><div><b>Leaf</b>No children</div></div>"
 }
};
