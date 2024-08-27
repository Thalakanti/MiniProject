// class RegexParser {
//     constructor(pattern) {
//         this.pattern = pattern;
//         this.index = 0;
//     }

//     parse() {
//         const nodes = [];
//         while (this.index < this.pattern.length) {
//             const char = this.pattern[this.index];
//             if (char === '.' || char === '\\' || char === '[') {
//                 nodes.push(this.parseSpecial());
//             } else if (char === '*' || char === '+' || char === '?') {
//                 const quantifierNode = nodes.pop();
//                 nodes.push({ type: 'quantifier', value: char, node: quantifierNode });
//             } else if (char === '(') {
//                 this.index++;
//                 nodes.push(this.parseGroup());
//             } else if (char === '|') {
//                 this.index++;
//                 return { type: 'alternation', left: nodes, right: this.parse() };
//             } else {
//                 nodes.push({ type: 'literal', value: char });
//             }
//             this.index++;
//         }
//         return nodes;
//     }

//     parseSpecial() {
//         const char = this.pattern[this.index];
//         if (char === '.') {
//             return { type: 'wildcard' };
//         } else if (char === '\\') {
//             this.index++;
//             return { type: 'escape', value: this.pattern[this.index] };
//         } else if (char === '[') {
//             const charClass = [];
//             this.index++;
//             while (this.pattern[this.index] !== ']') {
//                 charClass.push(this.pattern[this.index]);
//                 this.index++;
//             }
//             return { type: 'charClass', value: charClass.join('') };
//         }
//     }

//     parseGroup() {
//         const groupNodes = [];
//         while (this.pattern[this.index] !== ')') {
//             groupNodes.push(this.parse());
//             this.index++;
//         }
//         return { type: 'group', nodes: groupNodes.flat() };
//     }
// }

// class RegexMatcher {
//     constructor(ast, input) {
//         this.ast = ast;
//         this.input = input;
//     }

//     match() {
//         return this.matchNodes(this.ast, 0);
//     }

//     matchNodes(nodes, index) {
//         for (const node of nodes) {
//             const result = this.matchNode(node, index);
//             if (!result.success) return false;
//             index = result.index;
//         }
//         return index === this.input.length;
//     }

//     matchNode(node, index) {
//         switch (node.type) {
//             case 'literal':
//                 return this.matchLiteral(node, index);
//             case 'wildcard':
//                 return this.matchWildcard(index);
//             case 'escape':
//                 return this.matchEscape(node, index);
//             case 'charClass':
//                 return this.matchCharClass(node, index);
//             case 'quantifier':
//                 return this.matchQuantifier(node, index);
//             case 'alternation':
//                 return this.matchAlternation(node, index);
//             case 'group':
//                 return this.matchNodes(node.nodes, index);
//             default:
//                 return { success: false, index };
//         }
//     }

//     matchLiteral(node, index) {
//         if (this.input[index] === node.value) {
//             return { success: true, index: index + 1 };
//         }
//         return { success: false, index };
//     }

//     matchWildcard(index) {
//         if (index < this.input.length) {
//             return { success: true, index: index + 1 };
//         }
//         return { success: false, index };
//     }

//     matchEscape(node, index) {
//         if (this.input[index] === node.value) {
//             return { success: true, index: index + 1 };
//         }
//         return { success: false, index };
//     }

//     matchCharClass(node, index) {
//         if (node.value.includes(this.input[index])) {
//             return { success: true, index: index + 1 };
//         }
//         return { success: false, index };
//     }

//     matchQuantifier(node, index) {
//         let success = false;
//         let currentIndex = index;
//         const minMatch = node.value === '*' ? 0 : 1;
//         const maxMatch = node.value === '?' ? 1 : Infinity;

//         for (let i = 0; i < maxMatch; i++) {
//             const result = this.matchNode(node.node, currentIndex);
//             if (result.success) {
//                 success = true;
//                 currentIndex = result.index;
//             } else {
//                 break;
//             }
//         }

//         if (success && currentIndex >= index + minMatch) {
//             return { success: true, index: currentIndex };
//         }
//         return { success: false, index };
//     }

//     matchAlternation(node, index) {
//         const leftMatch = this.matchNodes(node.left, index);
//         if (leftMatch) return leftMatch;

//         return this.matchNodes(node.right, index);
//     }
// }

// // Example usage:
// const pattern = 'a*b|c';
// const input = 'aaab';
// const parser = new RegexParser(pattern);
// const ast = parser.parse();
// const matcher = new RegexMatcher(ast, input);

// console.log('Match:', matcher.match()); // Output: true

// // Test cases
// const testPatterns = [
//     { pattern: 'a*', input: 'aaa', expected: true },
//     { pattern: 'a*b', input: 'aaab', expected: true },
//     { pattern: 'a*b|c', input: 'c', expected: true },
//     { pattern: 'a.c', input: 'abc', expected: true },
//     { pattern: 'a.c', input: 'axc', expected: true },
//     { pattern: 'a[bc]d', input: 'abd', expected: true },
//     { pattern: 'a[bc]d', input: 'acd', expected: true },
//     { pattern: 'a[bc]d', input: 'aBd', expected: false },
//     { pattern: '(a|b)c', input: 'ac', expected: true },
//     { pattern: '(a|b)c', input: 'bc', expected: true },
//     { pattern: '(a|b)c', input: 'cc', expected: false },
// ];

// for (const { pattern, input, expected } of testPatterns) {
//     const parser = new RegexParser(pattern);
//     const ast = parser.parse();
//     const matcher = new RegexMatcher(ast, input);
//     console.log(`Pattern: ${pattern}, Input: ${input}, Match: ${matcher.match()}, Expected: ${expected}`);
// }





// class RegexParser {
//     constructor(pattern) {
//         this.pattern = pattern;
//         this.index = 0;
//     }

//     parse() {
//         const nodes = [];
//         while (this.index < this.pattern.length) {
//             const char = this.pattern[this.index];
//             if (char === '.' || char === '\\' || char === '[') {
//                 nodes.push(this.parseSpecial());
//             } else if (char === '*' || char === '+' || char === '?') {
//                 const quantifierNode = nodes.pop();
//                 nodes.push({ type: 'quantifier', value: char, node: quantifierNode });
//             } else if (char === '(') {
//                 this.index++;
//                 nodes.push(this.parseGroup());
//             } else if (char === '|') {
//                 this.index++;
//                 return { type: 'alternation', left: nodes, right: this.parse() };
//             } else {
//                 nodes.push({ type: 'literal', value: char });
//             }
//             this.index++;
//         }
//         return nodes;
//     }

//     parseSpecial() {
//         const char = this.pattern[this.index];
//         if (char === '.') {
//             return { type: 'wildcard' };
//         } else if (char === '\\') {
//             this.index++;
//             return { type: 'escape', value: this.pattern[this.index] };
//         } else if (char === '[') {
//             const charClass = [];
//             this.index++;
//             while (this.pattern[this.index] !== ']') {
//                 charClass.push(this.pattern[this.index]);
//                 this.index++;
//             }
//             return { type: 'charClass', value: charClass.join('') };
//         }
//     }

//     parseGroup() {
//         const groupNodes = [];
//         while (this.pattern[this.index] !== ')') {
//             groupNodes.push(this.parse());
//             // this.index++;
//         }
//         return { type: 'group', nodes: [groupNodes] };
//     }
// }

// class RegexMatcher {
//     constructor(ast, input) {
//         this.ast = ast;
//         this.input = input;
//     }

//     match() {
//         return this.matchNodes(this.ast, 0);
//     }

//     matchNodes(nodes, index) {
//         for (const node of nodes) {
//             const result = this.matchNode(node, index);
//             if (!result.success) return false;
//             index = result.index;
//         }
//         return index === this.input.length;
//     }

//     matchNode(node, index) {
//         switch (node.type) {
//             case 'literal':
//                 return this.matchLiteral(node, index);
//             case 'wildcard':
//                 return this.matchWildcard(index);
//             case 'escape':
//                 return this.matchEscape(node, index);
//             case 'charClass':
//                 return this.matchCharClass(node, index);
//             case 'quantifier':
//                 return this.matchQuantifier(node, index);
//             case 'alternation':
//                 return this.matchAlternation(node, index);
//             case 'group':
//                 return this.matchNodes(node.nodes, index);
//             default:
//                 return { success: false, index };
//         }
//     }

//     matchLiteral(node, index) {
//         if (this.input[index] === node.value) {
//             return { success: true, index: index + 1 };
//         }
//         return { success: false, index };
//     }

//     matchWildcard(index) {
//         if (index < this.input.length) {
//             return { success: true, index: index + 1 };
//         }
//         return { success: false, index };
//     }

//     matchEscape(node, index) {
//         if (this.input[index] === node.value) {
//             return { success: true, index: index + 1 };
//         }
//         return { success: false, index };
//     }

//     matchCharClass(node, index) {
//         if (node.value.includes(this.input[index])) {
//             return { success: true, index: index + 1 };
//         }
//         return { success: false, index };
//     }

//     matchQuantifier(node, index) {
//         let success = false;
//         let currentIndex = index;
//         const minMatch = node.value === '*' ? 0 : 1;
//         const maxMatch = node.value === '?' ? 1 : Infinity;

//         for (let i = 0; i < maxMatch; i++) {
//             const result = this.matchNode(node.node, currentIndex);
//             if (result.success) {
//                 success = true;
//                 currentIndex = result.index;
//             } else {
//                 break;
//             }
//         }

//         if (success && currentIndex >= index + minMatch) {
//             return { success: true, index: currentIndex };
//         }
//         return { success: false, index };
//     }

//     matchAlternation(node, index) {
//         const leftMatch = this.matchNodes(node.left, index);
//         if (leftMatch) return leftMatch;

//         return this.matchNodes(node.right, index);
//     }
// }

// // Example usage:
// const pattern = 'a*b|c';
// const input = 'aaab';
// const parser = new RegexParser(pattern);
// const ast = parser.parse();
// const matcher = new RegexMatcher(ast, input);

// console.log('Match:', matcher.match()); // Output: true

// // Test cases
// const testPatterns = [
//     { pattern: 'a*', input: 'aaa', expected: true },
//     { pattern: 'a*b', input: 'aaab', expected: true },
//     { pattern: 'a*b|c', input: 'c', expected: true },
//     { pattern: 'a.c', input: 'abc', expected: true },
//     { pattern: 'a.c', input: 'axc', expected: true },
//     { pattern: 'a[bc]d', input: 'abd', expected: true },
//     { pattern: 'a[bc]d', input: 'acd', expected: true },
//     { pattern: 'a[bc]d', input: 'aBd', expected: false },
//     { pattern: '(a|b)c', input: 'ac', expected: true },
//     { pattern: '(a|b)c', input: 'bc', expected: true },
//     { pattern: '(a|b)c', input: 'cc', expected: false },
// ];

// for (const { pattern, input, expected } of testPatterns) {
//     const parser = new RegexParser(pattern);
//     const ast = parser.parse();
//     const matcher = new RegexMatcher(ast, input);
//     console.log(`Pattern: ${pattern}, Input: ${input}, Match: ${matcher.match()}, Expected: ${expected}`);
// }



class RegexEngine {
    constructor(pattern) {
      this.pattern = pattern;
      this.input = '';
      this.index = 0;
    }
  
    match(input) {
      this.input = input;
      this.index = 0;
      return this.matchPattern();
    }
  
    matchPattern() {
      let result = true;
      for (let i = 0; i < this.pattern.length; i++) {
        const char = this.pattern[i];
        if (char === '.') {
          result = this.matchAny();
        } else if (char === '[') {
          result = this.matchClass();
        } else if (char === '*') {
          result = this.matchZeroOrMore();
        } else if (char === '+') {
          result = this.matchOneOrMore();
        } else if (char === '?') {
          result = this.matchZeroOrOne();
        } else if (char === '|') {
          result = this.matchAlternation();
        } else if (char === '(') {
          result = this.matchGroup();
        } else if (char === ')') {
          result = this.matchGroupEnd();
        } else if (char === '^') {
          result = this.matchStart();
        } else if (char === '$') {
          result = this.matchEnd();
        } else {
          result = this.matchLiteral(char);
        }
        if (!result) {
          return false;
        }
      }
      return true;
    }
  
    matchAny() {
      if (this.index >= this.input.length) {
        return false;
      }
      this.index++;
      return true;
    }
  
    matchClass() {
      let end = this.pattern.indexOf(']', this.index);
      if (end === -1) {
        throw new Error('Unclosed character class');
      }
      const chars = this.pattern.slice(this.index + 1, end);
      if (this.index >= this.input.length) {
        return false;
      }
      const inputChar = this.input[this.index];
      if (chars.includes(inputChar)) {
        this.index++;
        return true;
      }
      return false;
    }
  
    matchZeroOrMore() {
      let result = true;
      while (result) {
        result = this.matchPattern();
      }
      return true;
    }
  
    matchOneOrMore() {
      let result = this.matchPattern();
      if (!result) {
        return false;
      }
      while (result) {
        result = this.matchPattern();
      }
      return true;
    }
  
    matchZeroOrOne() {
      const result = this.matchPattern();
      if (!result) {
        return true;
      }
      return result;
    }
  
    matchAlternation() {
      const index = this.index;
      const result = this.matchPattern();
      if (result) {
        return true;
      }
      this.index = index;
      return this.matchPattern();
    }
  
    matchGroup() {
      const index = this.index;
      const result = this.matchPattern();
      if (result) {
        return true;
      }
      this.index = index;
      return false;
    }
  
    matchGroupEnd() {
      return true;
    }
  
    matchStart() {
      if (this.index !== 0) {
        return false;
      }
      return true;
    }
  
    matchEnd() {
      if (this.index !== this.input.length) {
        return false;
      }
      return true;
    }
  
    matchLiteral(char) {
      if (this.index >= this.input.length) {
        return false;
      }
      const inputChar = this.input[this.index];
      if (inputChar === char) {
        this.index++;
        return true;
      }
      return false;
    }
  }
  
  const engine = new RegexEngine('a*b');
  console.log(engine.match('aaab')); // true
  console.log(engine.match('b')); // true
  console.log(engine.match('ab')); // true
  console.log(engine.match('abb')); // false