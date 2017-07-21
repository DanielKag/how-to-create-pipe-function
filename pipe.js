// Some basic functions for easily understand the pipe function.
// We'll combine those three function and send the value 4 to it.
// Getting result of - 'Numner 10'
const add1 = x => x + 1;
const mul2 = x => x * 2;
const title = x => `The number is: ${x}`;


let x;

// The most imperative and naive way of writing the pipe function
// Calling the function with:
// pipe1([add1, mul2, title])
function pipe1 (array_of_fn) {
    return function(x) {
        let result = x;
        for (let i = 0; i < array_of_fn.length; i++) {        
            let func = array_of_fn[i];

            result = func(result)
        }

        return result; 
    }
}

x = pipe1([add1, mul2, title])(4); x


// let's use the rest operator
// So no, calling the function will be with no array:
// pipe1(add1, mul2, title)
function pipe2 (...funcs) {
    return function(x) {
        let result = x;
        for (let func of funcs) {
            result = func(result)
        }

        return result; 
    }
}

x = pipe2(add1, mul2, title)(4); x



// Now, let's forget all about the "for" loop and use the reduce.
// For using the reduce we must have an initial value (like we had in Sum and Mul)
// We'll use the identity function which is: 
function identiy(x) {
    return x;
}

// or 
const identity = x => x; 

// This version is super verbose for understanding what's going on
// The function pipeTwoFunctions gets two functions, and return a new function.
function pipe3 (...funcs) {

    const pipeTwoFunctions = function(first, second) {
        return function(x) {
            return second(first(x))
        }
    }

    const result = funcs.reduce(pipeTwoFunctions, identity)
    return result;
} 


// Minimize the pipeTwoFunctions function by using the fat arrow operator
// Now try to understand why we have two fat arrows in the function.
function pipe4 (...funcs) {

    const pipeTwoFunctions = (first, second) => x => second(first(x));

    const result = funcs.reduce(pipeTwoFunctions, identity)
    return result;
}



// declare the pipeTwoFunctions inside the reduce function.
function pipe5 (...funcs) {
    return funcs.reduce((acc,curr) => x => curr(acc(x)) , identity);
}


// Change to an arrow function for awoesmness
const pipe6 = (...funcs) => funcs.reduce((acc,curr) => x => curr(acc(x)) , identity);


// =======================================================
// final result
// =======================================================
// Dealing with more than one argument in the first function,
// by sending the first function as the initiator for the reduce function.
// We also using the arguments object here, because we don't know the how many argument
// was passed
const pipe = (first, ...more) =>
    more.reduce((acc,curr) => (...arguments) => curr(acc(...arguments)) , first);
    

// Two arguments function-
const div = (x,y) => x / y;

x = pipe(div, add1, mul2, title)(4,2); x 









x = pipe1([add1, mul2, title])(4)
x
x = pipe2(add1, mul2, title)(4)
x

x = pipe3(add1, mul2, title)(4)
x

x = pipe4(add1, mul2, title)(4)
x

x = pipe5(add1, mul2, title)(4)
x

x = pipe6(add1, mul2, title)(4)
x

x = pipe(add1, mul2, title)(4)
x


x = pipe();


 
 