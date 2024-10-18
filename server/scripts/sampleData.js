import sequelize from '../config/database.js';
import User from '../models/User.js';
import Element from '../models/Element.js';
import Snippet from '../models/Snippet.js';
import Category from '../models/Category.js';
import ElementGroup from '../models/ElementGroup.js';
import '../models/Relationships.js';

// To use this script run node scripts/sampleData.js in the server folder

const createSampleData = async () => {
    try {
        await sequelize.sync({ force: true });

        const adminUser = await User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: 'AdminPassword123!',
            role: 'admin',
        });

        const categories = {
            Operator: await Category.create({ name: 'Operator', userId: adminUser.id }),
            Keyword: await Category.create({ name: 'Keyword', userId: adminUser.id }),
            Method: await Category.create({ name: 'Method', userId: adminUser.id }),
            Set: await Category.create({ name: 'Set', userId: adminUser.id }),
            String: await Category.create({ name: 'String', userId: adminUser.id }),
            List: await Category.create({ name: 'List', userId: adminUser.id }),
            Tuple: await Category.create({ name: 'Tuple', userId: adminUser.id }),
            Dict: await Category.create({ name: 'Dict', userId: adminUser.id }),
            Counter: await Category.create({ name: 'Counter', userId: adminUser.id }),
            DefaultDict: await Category.create({ name: 'Default-Dict', userId: adminUser.id }),
        };

        const elementsData = [
            // ******************************************** Operator ********************************************
            {
                name: '-',
                description: 'Subtraction. Set: Difference',
                categories: ['Operator', 'Set'],
                snippets: [
                    {
                        name: 'Subtraction',
                        description: 'Subtract two numbers.',
                        code: 'print(4 - 3)',
                        output: '1',
                    },
                    {
                        name: 'Set Difference',
                        description: 'Find difference between two sets.',
                        code: 'x = {1, 2, 5}\ny = {2, 3, 4}\nprint(x - y)',
                        output: '{1, 5}',
                    },
                ],
            },
            {
                name: '[:]',
                description: 'Slice operator, used to access values from within iterable objects.',
                categories: ['Operator', 'Counter', 'DefaultDict', 'Dict', 'String', 'Tuple', 'List'],
                snippets: [
                    {
                        name: 'Format',
                        description: 'Demonstrates slicing format.',
                        code: 'string[start:stop:step]',
                        output: '',
                    },
                    {
                        name: 'Accessing Index',
                        description: 'Access specific index using slicing.',
                        code: 'list[index]',
                        output: '',
                    },
                    {
                        name: 'Reversing a list',
                        description: 'Reverse the elements of a list.',
                        code: 'x = [1,2,3]\nx[:] = x[::-1]\nprint(x)',
                        output: '[3,2,1]',
                    },
                ],
            },
            {
                name: '*',
                description: 'Multiplication. Splat: Splat operator is used to unpack a list into arguments. Multiple concatenation.',
                categories: ['Operator', 'String', 'List', 'Tuple'],
                snippets: [
                    {
                        name: 'Multiplication',
                        description: 'Multiply two numbers.',
                        code: 'print(3*2)',
                        output: '6',
                    },
                    {
                        name: 'Splat Operator',
                        description: 'Use splat operator to unpack list into arguments.',
                        code: 'lst(*[1, 2, 3]) is equal to lst(1, 2, 3)',
                        output: '',
                    },
                    {
                        name: 'Multiple Concatenation',
                        description: 'Concatenate list multiple times.',
                        code: 'x = [1,2]\nprint(x*2)',
                        output: '[1,2,1,2]',
                    },
                ],
            },
            {
                name: '**',
                description: 'Exponentiation',
                categories: ['Operator'],
                snippets: [
                    {
                        name: 'Exponentiation',
                        description: 'Raise one number to the power of another.',
                        code: 'print(2 ** 3)',
                        output: '8',
                    },
                ],
            },
            {
                name: '/',
                description: 'Division',
                categories: ['Operator'],
                snippets: [
                    {
                        name: 'Division',
                        description: 'Divide one number by another.',
                        code: 'print(4 / 2)',
                        output: '2',
                    },
                ],
            },
            {
                name: '//',
                description: 'Floor division',
                categories: ['Operator'],
                snippets: [
                    {
                        name: 'Floor Division',
                        description: 'Perform floor division.',
                        code: 'print(5 // 2)',
                        output: '2',
                    },
                ],
            },
            {
                name: '&',
                description: 'Bitwise and: Sets each bit to 1 if both bits are 1. Set: Intersection',
                categories: ['Operator', 'Set'],
                snippets: [
                    {
                        name: 'Set Intersection',
                        description: 'Find the intersection of two sets.',
                        code: 'x = {1, 2, 3}\ny = {2, 3, 4}\nprint(x & y)',
                        output: '{2, 3}',
                    },
                ],
            },
            {
                name: '%',
                description: 'Modulo operator calculates the remainder.',
                categories: ['Operator'],
                snippets: [
                    {
                        name: 'Modulo',
                        description: 'Calculate the remainder of a division.',
                        code: 'print(5 % 2)',
                        output: '1',
                    },
                ],
            },
            {
                name: '^',
                description: 'Bitwise XOR. Set: Symmetric difference.',
                categories: ['Operator', 'Set'],
                snippets: [
                    {
                        name: 'Set Symmetric Difference',
                        description: 'Find the symmetric difference of two sets.',
                        code: 'x = {1, 2, 5}\ny = {2, 3, 4}\nprint(x ^ y)',
                        output: '{1, 3, 4, 5}',
                    },
                ],
            },
            {
                name: '+',
                description: 'Addition / Concatenation',
                categories: ['String', 'List', 'Operator', 'Tuple'],
                snippets: [
                    {
                        name: 'Addition',
                        description: 'Add two numbers.',
                        code: 'print(4 + 3)',
                        output: '7',
                    },
                    {
                        name: 'Array Concatenation',
                        description: 'Concatenate two arrays.',
                        code: 'x = [1, 2, 3]\ny = [4, 5, 6]\nprint(x + y)',
                        output: '[1, 2, 3, 4, 5, 6]',
                    },
                    {
                        name: 'String Concatenation',
                        description: 'Concatenate two strings.',
                        code: 'x = "abc"\ny = "def"\nprint(x + y)',
                        output: '"abcdef"',
                    },
                ],
            },
            {
                name: '<',
                description: 'Less than. Is proper subset: x is a proper subset of y if all members of x are in y, but y has additional members.',
                categories: ['List', 'Operator', 'Set', 'Tuple'],
                snippets: [],
            },
            {
                name: '<=',
                description: 'Less than or equal. Is subset: x is a subset of y if all members of x are in y.',
                categories: ['List', 'Operator', 'Set', 'Tuple'],
                snippets: [],
            },
            {
                name: '<<',
                description: 'Zero fill left shift: Shift left by pushing zeros in from the right and deleting leftmost bits.',
                categories: ['Operator'],
                snippets: [],
            },
            {
                name: '==',
                description: 'Equals',
                categories: ['Counter', 'Default-Dict', 'Dict', 'List', 'Operator', 'Set', 'Tuple'],
                snippets: [],
            },
            {
                name: '!=',
                description: 'Not equals',
                categories: ['Counter', 'Default-Dict', 'Dict', 'List', 'Operator', 'Set', 'Tuple'],
                snippets: [],
            },
            {
                name: '=',
                description: 'Assignment Operator. Other Assignment Operators: -= += *= **= /= //= &= %= ^= <<= >>= |= ~=',
                categories: ['Counter', 'Default-Dict', 'Dict', 'List', 'Operator', 'Set', 'Tuple', 'Deque', 'Heapq', 'String'],
                snippets: [],
            },
            {
                name: '>',
                description: 'Greater than. Is proper superset: x is a proper superset of y if all members of y are in x, but x has additional members.',
                categories: ['List', 'Operator', 'Set', 'Tuple'],
                snippets: [],
            },
            {
                name: '>=',
                description: 'Greater than or equal. Is superset: x is a superset of y if all members of y are in x.',
                categories: ['List', 'Operator', 'Set', 'Tuple'],
                snippets: [],
            },
            {
                name: '>>',
                description: 'Signed right shift: Push copies of the leftmost bit in from the left, and delete the rightmost bits.',
                categories: ['Operator'],
                snippets: [],
            },
            {
                name: '|',
                description: 'Bitwise OR: Sets each bit to 1 if one of two bits is 1. Set: Union',
                categories: ['Operator', 'Counter', 'Default-Dict', 'Dict', 'Set'],
                snippets: [
                    {
                        name: 'Set Union',
                        description: 'Find the union of two sets.',
                        code: 'x = {1, 2, 3}\ny = {4, 5, 6}\nprint(x | y)',
                        output: '{1, 2, 3, 4, 5, 6}',
                    },
                ],
            },
            {
                name: '~',
                description: 'Bitwise NOT: Inverts all bits.',
                categories: ['Operator'],
                snippets: [],
            },
            // ******************************************** Keyword ********************************************
            {
                name: 'and',
                description: 'Boolean AND',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'break',
                description: 'To break out of a loop',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'class',
                description: 'Defines a class',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'continue',
                description: 'Skips to the next iteration of a loop',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'def',
                description: 'Defines a function',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'del',
                description: 'Deletes an object',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'elif',
                description: 'Conditional else if',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'else',
                description: 'Conditional else',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'False',
                description: 'Boolean false',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'for',
                description: 'Creates a for loop',
                categories: ['Keyword'],
                snippets: [
                    {
                        name: '1d Loop',
                        description: 'A simple 1-dimensional loop over a list.',
                        code: 'x = [1, 2, 3, 4]\narr = []\nfor i in x: arr.append(i)\nprint(arr)',
                        output: '[1, 2, 3, 4]',
                    },
                    {
                        name: '2d Loop',
                        description: 'A 2-dimensional loop over nested lists.',
                        code: 'x = [[1, 2], [2, 3], [3, 4]]\nfor i, j in x: print((i, j))',
                        output: '(1, 2)\n(2, 3)\n(3, 4)',
                    },
                    {
                        name: '1d + index',
                        description: 'Loop with index over a 1-dimensional list.',
                        code: 'x = ["a", "b", "c", "d"]\narr = []\nfor i, j in enumerate(x): arr.append([i, j])\nprint(arr)',
                        output: '[[0, "a"], [1, "b"], [2, "c"], [3, "d"]]',
                    },
                ],
            },
            {
                name: 'from',
                description: 'Used to import a specific part of a module',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'if',
                description: 'Conditional if',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'in',
                description: 'Used to check if something is in an object',
                categories: ['String', 'Counter', 'Default-Dict', 'Dict', 'Set', 'Tuple', 'Keyword'],
                snippets: [],
            },
            {
                name: 'import',
                description: 'Used to import a module',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'is',
                description: 'Used to compare variables for equality',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'lambda',
                description: 'Creates an anonymous function',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'None',
                description: 'Represents null',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'not',
                description: 'Boolean NOT',
                categories: ['String', 'Counter', 'Default-Dict', 'Dict', 'Set', 'Tuple', 'Keyword'],
                snippets: [],
            },
            {
                name: 'or',
                description: 'Boolean OR',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'return',
                description: 'Returns a value from a function, stopping the function in the process',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'True',
                description: 'Boolean true',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'while',
                description: 'Used to create a while loop',
                categories: ['Keyword'],
                snippets: [],
            },
            {
                name: 'yield',
                description: 'Used to return a generator',
                categories: ['Keyword'],
                snippets: [],
            },

            // ******************************************** Method ********************************************

            {
                name: 'abs()',
                description: 'Returns the absolute value of a number.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'add()',
                description: 'Adds the selected value to a set.',
                categories: ['Set', 'Method'],
                snippets: [],
            },
            {
                name: 'all()',
                description: 'Returns true if all the elements in an iterable are true, otherwise it returns false.',
                categories: ['Counter', 'Default-Dict', 'Default-Functions', 'Dict', 'Method'],
                snippets: [],
            },
            {
                name: 'any()',
                description: 'Returns True if any item in an iterable object is true.',
                categories: ['Counter', 'Default-Dict', 'Default-Functions', 'Dict', 'Method'],
                snippets: [],
            },
            {
                name: 'append()',
                description: 'Adds an element to the end of a list.',
                categories: ['Deque', 'List', 'Method'],
                snippets: [],
            },
            {
                name: 'appendleft()',
                description: 'Adds an element to the left side of a deque.',
                categories: ['Deque', 'Method'],
                snippets: [],
            },
            {
                name: 'ceil()',
                description: 'Returns a number rounded up to the closest integer.',
                categories: ['Math-Methods', 'Method'],
                snippets: [],
            },
            {
                name: 'chr()',
                description: 'Returns a character based on the provided Unicode code.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'count()',
                description: 'Returns the number of elements with the specified value.',
                categories: ['Deque', 'List', 'String', 'Tuple', 'Method'],
                snippets: [],
            },
            {
                name: 'Counter()',
                description: 'Counts all the elements in an iterable. from collections import counter.',
                categories: ['Counter', 'Method'],
                snippets: [],
            },
            {
                name: 'defaultdict()',
                description: 'Type of dictionary that never raises a key error, also provides a default value for keys that do not exist. from collections import defaultdict.',
                categories: ['Default-Dict', 'Method'],
                snippets: [],
            },
            {
                name: 'deque()',
                description: 'Functions as a double ended queue which allows pop and append operations from both ends in o(1) time. from collections import deque.',
                categories: ['Deque', 'Method'],
                snippets: [],
            },
            {
                name: 'discard()',
                description: 'Removes the specified element from a set.',
                categories: ['Set', 'Method'],
                snippets: [],
            },
            {
                name: 'dist()',
                description: 'Returns the distance between one and two dimensional points. import math.',
                categories: ['Math-Methods', 'Method'],
                snippets: [],
            },
            {
                name: 'divmod()',
                description: 'Accepts two numbers and returns a tuple containing the quotient and the remainder.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'elements()',
                description: 'Returns an itertool of all the elements in the counter object. from collections import counter.',
                categories: ['Counter', 'Method'],
                snippets: [],
            },
            {
                name: 'enumerate()',
                description: 'Adds a counter to an iterable and returns it as an enumerate object.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'extend()',
                description: 'Joins one list to the end of another.',
                categories: ['Deque', 'List', 'Method'],
                snippets: [],
            },
            {
                name: 'filter()',
                description: 'Filters the given iterable with a function that tests each element in the sequence as true or false, commonly used with lambda functions.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'find()',
                description: 'Searches the string for a specified element and returns either the index or -1 depending on if the element exists.',
                categories: ['String', 'Method'],
                snippets: [],
            },
            {
                name: 'float()',
                description: 'Returns a floating point number.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'format()',
                description: 'Returns a formatted version of the given element controlled by the format specifier.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'gcd()',
                description: 'Returns the greatest common divisor between two integers. import math.',
                categories: ['Math-Methods', 'Method'],
                snippets: [],
            },
            {
                name: 'get()',
                description: 'Return the value for the specified key if it exists.',
                categories: ['Counter', 'Default-Dict', 'Dict', 'Method'],
                snippets: [],
            },
            {
                name: 'heapify()',
                description: 'Transform a list into a heap in place.',
                categories: ['Heapq', 'Method'],
                snippets: [],
            },
            {
                name: 'heappop()',
                description: 'Pop and return the smallest element found in a heap.',
                categories: ['Heapq', 'Method'],
                snippets: [],
            },
            {
                name: 'heappush()',
                description: 'Pushes the element onto a heap.',
                categories: ['Heapq', 'Method'],
                snippets: [],
            },
            {
                name: 'heappushpop()',
                description: 'Combines the functionality of heappush() and heappop() and is faster than calling each individually.',
                categories: ['Heapq', 'Method'],
                snippets: [],
            },
            {
                name: 'index()',
                description: 'Returns the index of the first element with the specified value.',
                categories: ['Deque', 'List', 'String', 'Tuple', 'Method'],
                snippets: [],
            },
            {
                name: 'insert()',
                description: 'Inserts an element at the specified index.',
                categories: ['Deque', 'List', 'Method'],
                snippets: [],
            },
            {
                name: 'int()',
                description: 'Converts strings or other number formats to an integer and returns that value.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'isdigit()',
                description: 'Returns true if all the characters in a string are digits.',
                categories: ['String', 'Method'],
                snippets: [],
            },
            {
                name: 'items()',
                description: 'Returns the key value pairs of a dictionary in the form of tuples in a list.',
                categories: ['Counter', 'Default-Dict', 'Dict', 'Method'],
                snippets: [],
            },
            {
                name: 'iter()',
                description: 'Converts an iterable into an iterator object and returns it.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'join()',
                description: 'Converts the elements of an iterable into a string.',
                categories: ['String', 'Method'],
                snippets: [],
            },
            {
                name: 'keys()',
                description: 'Returns a list of dictionary keys as a view object.',
                categories: ['Counter', 'Default-Dict', 'Dict', 'Method'],
                snippets: [],
            },
            {
                name: 'len()',
                description: 'Returns the length of an object.',
                categories: ['Counter', 'Default-Dict', 'Default-Functions', 'Dict', 'List', 'Set', 'Method'],
                snippets: [],
            },
            {
                name: 'list()',
                description: 'Returns a list.',
                categories: ['Default-Functions', 'List', 'Method'],
                snippets: [],
            },
            {
                name: 'log()',
                description: 'Returns the logarithm of a number. import math.',
                categories: ['Math-Methods', 'Method'],
                snippets: [],
            },
            {
                name: 'lower()',
                description: 'Converts a string to lowercase and returns it.',
                categories: ['String', 'Method'],
                snippets: [],
            },
            {
                name: 'map()',
                description: 'Runs the specified function for every element in an iterable.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'max()',
                description: 'Finds the largest item in an iterable and returns it.',
                categories: ['Default-Functions', 'List', 'Method'],
                snippets: [],
            },
            {
                name: 'min()',
                description: 'Finds the smallest item in an iterable and returns it.',
                categories: ['Default-Functions', 'List', 'Method'],
                snippets: [],
            },
            {
                name: 'most_common()',
                description: 'Return a list of the most common elements and their counts. Returns them in descending order.',
                categories: ['Counter', 'Method'],
                snippets: [],
            },
            {
                name: 'next()',
                description: 'Returns the next item found in an iterable.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'ord()',
                description: 'Returns the integer value based on a provided Unicode character.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'partition()',
                description: 'Splits a string into three parts based on a provided key and returns them as a tuple.',
                categories: ['String', 'Method'],
                snippets: [],
            },
            {
                name: 'pop()',
                description:
                    'Returns the last item in an iterable, or a specified item if an argument is provided. Deque: Remove and return an element from the right side of the deque.',
                categories: ['Dict', 'Deque', 'List', 'Default-Dict', 'Counter', 'Set', 'Method'],
                snippets: [],
            },
            {
                name: 'popleft()',
                description: 'Remove and return an element from the left side of the deque.',
                categories: ['Deque', 'Method'],
                snippets: [],
            },
            {
                name: 'pow()',
                description: 'Returns the value of x to the power y.',
                categories: ['Math-Methods', 'Method'],
                snippets: [],
            },
            {
                name: 'print()',
                description: 'Prints the specified content to the console or other output device.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'range()',
                description: 'Returns a sequence of numbers, starting from 0 and increments by 1 (by default).',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'reduce()',
                description: 'Applies a specified function to all the elements in a list. import functools.',
                categories: ['List', 'Method'],
                snippets: [],
            },
            {
                name: 'remove()',
                description: 'Removes the first matching element in a set or list.',
                categories: ['Deque', 'List', 'Set', 'Method'],
                snippets: [],
            },
            {
                name: 'reverse()',
                description: 'Reverses the order of a list in place.',
                categories: ['Deque', 'List', 'Method'],
                snippets: [],
            },
            {
                name: 'reversed()',
                description: 'Returns a reversed iterator object.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'set()',
                description: 'Creates a set.',
                categories: ['Set', 'Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'setdefault()',
                description: 'Returns the value of a key in a dictionary. If it doesnt exist, the specified value is inserted at the provided key.',
                categories: ['Default-Dict', 'Counter', 'Dict', 'Method'],
                snippets: [],
            },
            {
                name: 'sort()',
                description: 'Sorts the list in ascending order, or differently based on a provided sort function.',
                categories: ['List', 'Method'],
                snippets: [],
            },
            {
                name: 'sorted()',
                description: 'Sorts the elements of an iterable in a specified order.',
                categories: ['Default-Functions', 'Default-Dict', 'Counter', 'Dict', 'Method'],
                snippets: [],
            },
            {
                name: 'split()',
                description: 'Splits the string using the specified delimiter, and returns a list.',
                categories: ['String', 'Method'],
                snippets: [],
            },
            {
                name: 'sqrt()',
                description: 'Returns the square root of a number. import math.',
                categories: ['Math-Methods', 'Method'],
                snippets: [],
            },
            {
                name: 'str()',
                description: 'Converts a provided value into a string and returns it.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'sum()',
                description: 'Adds the items in an iterable and returns the sum.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'total()',
                description: 'Returns the sum of the counts.',
                categories: ['Counter', 'Method'],
                snippets: [],
            },
            {
                name: 'tuple()',
                description: 'Returns a tuple.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
            {
                name: 'update()',
                description: 'Dict: Updates the dictionary with the specified key-value pairs. Set: Update the set with another set, or any other iterable.',
                categories: ['Set', 'Default-Dict', 'Counter', 'Dict', 'Method'],
                snippets: [],
            },
            {
                name: 'upper()',
                description: 'Converts a string to uppercase and returns it.',
                categories: ['String', 'Method'],
                snippets: [],
            },
            {
                name: 'values()',
                description: 'Returns a list of all the values in the dictionary.',
                categories: ['Default-Dict', 'Counter', 'Dict', 'Method'],
                snippets: [],
            },
            {
                name: 'zip()',
                description: 'Returns an iterator of tuples based on the provided iterables.',
                categories: ['Default-Functions', 'Method'],
                snippets: [],
            },
        ];

        for (const elementData of elementsData) {
            const element = await Element.create({
                name: elementData.name,
                description: elementData.description,
                userId: adminUser.id,
            });

            for (const cat of elementData.categories) {
                const category = categories[cat];
                await element.addCategory(category);
            }

            for (const snippetData of elementData.snippets) {
                await Snippet.create({
                    name: snippetData.name,
                    description: snippetData.description,
                    code: snippetData.code,
                    output: snippetData.output,
                    elementId: element.id,
                    userId: adminUser.id,
                });
            }
        }

        console.log('Sample data created successfully!');
    } catch (error) {
        console.error('Error creating sample data:', error);
    } finally {
        await sequelize.close();
    }
};

createSampleData();
