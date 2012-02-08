module.exports = (function(){
  /* Generated by PEG.js 0.6.2 (http://pegjs.majda.cz/). */

  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successfull,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input, startRule) {
      var parseFunctions = {
        "digits": parse_digits,
        "expression": parse_expression,
        "literal": parse_literal,
        "template": parse_template,
        "variable": parse_variable
      };

      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "template";
      }

      var pos = 0;
      var reportMatchFailures = true;
      var rightmostMatchFailuresPos = 0;
      var rightmostMatchFailuresExpected = [];
      var cache = {};

      function padLeft(input, padding, length) {
        var result = input;

        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }

        return result;
      }

      function escape(ch) {
        var charCode = ch.charCodeAt(0);

        if (charCode <= 0xFF) {
          var escapeChar = 'x';
          var length = 2;
        } else {
          var escapeChar = 'u';
          var length = 4;
        }

        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }

      function quote(s) {
        /*
         * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
         * string literal except for the closing quote character, backslash,
         * carriage return, line separator, paragraph separator, and line feed.
         * Any character may appear in the form of an escape sequence.
         */
        return '"' + s
          .replace(/\\/g, '\\\\')            // backslash
          .replace(/"/g, '\\"')              // closing quote character
          .replace(/\r/g, '\\r')             // carriage return
          .replace(/\n/g, '\\n')             // line feed
          .replace(/[\x80-\uFFFF]/g, escape) // non-ASCII characters
          + '"';
      }

      function matchFailed(failure) {
        if (pos < rightmostMatchFailuresPos) {
          return;
        }

        if (pos > rightmostMatchFailuresPos) {
          rightmostMatchFailuresPos = pos;
          rightmostMatchFailuresExpected = [];
        }

        rightmostMatchFailuresExpected.push(failure);
      }

      function parse_template() {
        var cacheKey = 'template@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos0 = pos;
        var result1 = [];
        var result5 = parse_expression();
        if (result5 !== null) {
          var result3 = result5;
        } else {
          var result4 = parse_literal();
          if (result4 !== null) {
            var result3 = result4;
          } else {
            var result3 = null;;
          };
        }
        while (result3 !== null) {
          result1.push(result3);
          var result5 = parse_expression();
          if (result5 !== null) {
            var result3 = result5;
          } else {
            var result4 = parse_literal();
            if (result4 !== null) {
              var result3 = result4;
            } else {
              var result3 = null;;
            };
          }
        }
        var result2 = result1 !== null
          ? (function(c) {
              var o = [];
              o.push(c[0]);
              var current = 0;
              for(var i = 1; i < c.length; i++) {
                  if(typeof c[i] === 'string' && typeof o[current] === 'string') {
                      o[current] = o[current] + c[i];
                  }
                  else {
                      o.push(c[i]);
                      current++;
                  }
              }
              return {
                  format: function(bag, keep) {
                      return _format('', o, bag, keep);
                  },
                  stream: o
              }
          })(result1)
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_literal() {
        var cacheKey = 'literal@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        if (input.substr(pos).match(/^[^^ "'<>`{}]/) !== null) {
          var result4 = input.charAt(pos);
          pos++;
        } else {
          var result4 = null;
          if (reportMatchFailures) {
            matchFailed("[^^ \"'<>`{}]");
          }
        }
        if (result4 !== null) {
          var result2 = result4;
        } else {
          if (input.substr(pos, 1) === " ") {
            var result3 = " ";
            pos += 1;
          } else {
            var result3 = null;
            if (reportMatchFailures) {
              matchFailed("\" \"");
            }
          }
          if (result3 !== null) {
            var result2 = result3;
          } else {
            var result2 = null;;
          };
        }
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result1 = parse_expression();
          if (result1 !== null) {
            var result0 = result1;
          } else {
            var result0 = null;;
          };
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_expression() {
        var cacheKey = 'expression@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos0 = pos;
        var savedPos1 = pos;
        if (input.substr(pos, 1) === "{") {
          var result3 = "{";
          pos += 1;
        } else {
          var result3 = null;
          if (reportMatchFailures) {
            matchFailed("\"{\"");
          }
        }
        if (result3 !== null) {
          var result4 = parse_variable();
          if (result4 !== null) {
            if (input.substr(pos, 1) === "}") {
              var result5 = "}";
              pos += 1;
            } else {
              var result5 = null;
              if (reportMatchFailures) {
                matchFailed("\"}\"");
              }
            }
            if (result5 !== null) {
              var result1 = [result3, result4, result5];
            } else {
              var result1 = null;
              pos = savedPos1;
            }
          } else {
            var result1 = null;
            pos = savedPos1;
          }
        } else {
          var result1 = null;
          pos = savedPos1;
        }
        var result2 = result1 !== null
          ? (function(v) {
              var token = {
                  variable: v,
                  str: stringify(v)
              };
              return token;
          })(result1[1])
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_variable() {
        var cacheKey = 'variable@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos0 = pos;
        var result1 = [];
        var result3 = parse_literal();
        while (result3 !== null) {
          result1.push(result3);
          var result3 = parse_literal();
        }
        var result2 = result1 !== null
          ? (function(l) {
              var o = [];
              o.push(l[0]);
              var current = 0;
              for(var i = 1; i < l.length; i++) {
                  if(typeof l[i] === 'string' && typeof o[current] === 'string') {
                      o[current] = o[current] + l[i];
                  }
                  else {
                      o.push(l[i]);
                      current++;
                  }
              }
              return (o.length === 1) ? o[0] : o;
          })(result1)
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function parse_digits() {
        var cacheKey = 'digits@' + pos;
        var cachedResult = cache[cacheKey];
        if (cachedResult) {
          pos = cachedResult.nextPos;
          return cachedResult.result;
        }


        var savedPos0 = pos;
        var result1 = [];
        if (input.substr(pos).match(/^[0-9]/) !== null) {
          var result3 = input.charAt(pos);
          pos++;
        } else {
          var result3 = null;
          if (reportMatchFailures) {
            matchFailed("[0-9]");
          }
        }
        while (result3 !== null) {
          result1.push(result3);
          if (input.substr(pos).match(/^[0-9]/) !== null) {
            var result3 = input.charAt(pos);
            pos++;
          } else {
            var result3 = null;
            if (reportMatchFailures) {
              matchFailed("[0-9]");
            }
          }
        }
        var result2 = result1 !== null
          ? (function(d) {
              var str = '';
              for(var i = 0; i < d.length; i++) {
                  str += d[i];
              }
              return str;
          })(result1)
          : null;
        if (result2 !== null) {
          var result0 = result2;
        } else {
          var result0 = null;
          pos = savedPos0;
        }



        cache[cacheKey] = {
          nextPos: pos,
          result:  result0
        };
        return result0;
      }

      function buildErrorMessage() {
        function buildExpected(failuresExpected) {
          failuresExpected.sort();

          var lastFailure = null;
          var failuresExpectedUnique = [];
          for (var i = 0; i < failuresExpected.length; i++) {
            if (failuresExpected[i] !== lastFailure) {
              failuresExpectedUnique.push(failuresExpected[i]);
              lastFailure = failuresExpected[i];
            }
          }

          switch (failuresExpectedUnique.length) {
            case 0:
              return 'end of input';
            case 1:
              return failuresExpectedUnique[0];
            default:
              return failuresExpectedUnique.slice(0, failuresExpectedUnique.length - 1).join(', ')
                + ' or '
                + failuresExpectedUnique[failuresExpectedUnique.length - 1];
          }
        }

        var expected = buildExpected(rightmostMatchFailuresExpected);
        var actualPos = Math.max(pos, rightmostMatchFailuresPos);
        var actual = actualPos < input.length
          ? quote(input.charAt(actualPos))
          : 'end of input';

        return 'Expected ' + expected + ' but ' + actual + ' found.';
      }

      function computeErrorPosition() {
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */

        var line = 1;
        var column = 1;
        var seenCR = false;

        for (var i = 0; i <  rightmostMatchFailuresPos; i++) {
          var ch = input.charAt(i);
          if (ch === '\n') {
            if (!seenCR) { line++; }
            column = 1;
            seenCR = false;
          } else if (ch === '\r' | ch === '\u2028' || ch === '\u2029') {
            line++;
            column = 1;
            seenCR = true;
          } else {
            column++;
            seenCR = false;
          }
        }

        return { line: line, column: column };
      }



        function typeOf(value) {

            var s = typeof value;

            if(s === 'object') {

                if(value) {

                    if(typeof value.length === 'number' &&

                        !(value.propertyIsEnumerable('length')) &&

                        typeof value.splice === 'function') {

                        s = 'array';

                    }

                }

                else {

                    s = 'null';

                }

            }

            return s;

        }

        function select(path, obj) {

            var splits = !path ? [] : path.split('.');

            var curr = obj, ctype;

            for(var i = 0; i < splits.length; i++) {

                if(curr[splits[i]]) {

                    curr = curr[splits[i]];

                }

                else {

                    return null;

                }

            }

            var ctype = typeOf(curr);

            if(ctype === 'array' || ctype === 'object') curr = undefined;

            return curr;

        }

        function stringify(v) {

          var str  = '';

          var type = typeOf(v);

          if(type === 'array') {

              for(var i = 0; i < v.length; i++) {

                  str = str + stringify(v[i]);

              }

          }

          else if(type === 'object' && v.variable) {

              str = str + '{' + stringify(v.variable) + '}';

          }

          else if(type === 'string') {

              str = str + v;

          }

          return str;

        }

        function append(arr) {

            var str = '';

            for(var i = 0; i < arr.length; i++) {

                if(typeOf(arr[i]) == 'array') {

                    str += append(arr[i]);

                }

                else if (typeof arr[i] === 'object') {

                    str += JSON.stringify(arr[i].object);

                }

                else {

                    str += arr[i];

                }

            }

            return str;

        }

        function _format(str, stream, bag, keep) {

            bag = bag || {};

            var i, j, val, ele, str = '';

            for(i = 0; i < stream.length; i++) {

                ele = stream[i];

                if(ele.constructor === String) {

                    str = str + ele;

                }

                else {

                    if(ele.variable.constructor == Array) {

                        // Case of nested token - only single valued for now

                        key = _format('', ele.variable, bag, keep);

                        val = select(key, bag);

                        if(val) {

                            str = str + val;

                        }

                        else if(keep) {

                            str = str + '{' + ele.str + '}'

                        }

                    }

                    else {

                        val = select(ele.variable, bag);

                        if(val) {

                            str = str + val;

                        }

                        else if(keep) {

                            str = str + '{' + ele.str + '}'

                        }

                    }

                }

            }

            return str;

        }



      var result = parseFunctions[startRule]();

      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostMatchFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostMatchFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostMatchFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        var errorPosition = computeErrorPosition();
        throw new this.SyntaxError(
          buildErrorMessage(),
          errorPosition.line,
          errorPosition.column
        );
      }

      return result;
    },

    /* Returns the parser source code. */
    toSource: function() { return this._source; }
  };

  /* Thrown when a parser encounters a syntax error. */

  result.SyntaxError = function(message, line, column) {
    this.name = 'SyntaxError';
    this.message = message;
    this.line = line;
    this.column = column;
  };

  result.SyntaxError.prototype = Error.prototype;

  return result;
})();