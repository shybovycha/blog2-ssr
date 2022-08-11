---
title: 'Jargon-free functional programming. TL;DR'
---

This is a boiled-down version of a much longer read, <a href="/blog2-ssr/2022/07/13/jargon-free-functional-programming.html">Jargon-free functional programming</a>,
giving a brief and visual introduction to the concepts of a real-world functional programming. This blog is aimed at people who already know something
about programming and want to learn what the heck functional programming is, how is it different to "normal" programming and how does it look like
in a real world.

In a non-functional world, the code we write depends on anything - a function, aside from its arguments, is free to use environment variables,
global variables, outer scope, dependency injection - pretty much anything.

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 1.png" alt="" />

Moreover, it can modify all of the above (including outer scope, global and environment variables, etc.).

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 2.1.png" alt="" />

In a functional programming world we restrict a function to only rely on its arguments (or nothing at all).

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 4.png" alt="" />

But what about things like databases, user input, network communication, exceptions?

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 5.png" alt="" />
<img data-src="/images/jargon-free-functional-programming/Functional programming 1 6.png" alt="" />
<img data-src="/images/jargon-free-functional-programming/Functional programming 1 7.png" alt="" />
<img data-src="/images/jargon-free-functional-programming/Functional programming 1 8.png" alt="" />

A typical application involving all of the above could be explained algorithmically as the endless loop, waiting for some _input_ to appear
before doing something (waiting for database query to complete, waiting for user to provide input, waiting for a network request to complete).

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 9.png" alt="" />

And every step of the program is described as a sequence of actions (potentially involving some rather trivial decision making).
This approach is known as "imperative programming" and is very commonly used.

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 10.png" alt="" />

In reality, however, every step of this algorithm can go wrong in many different ways - each step is free to modify some global state (think OS and filesystem),
it can fail terribly with an exception. Moreover, anything from the outside world (think OS or dependency injection) can break into the program and change any value
or state of the program.

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 11.png" alt="" />

In a functional programming world, functions (and programs) are not described as sequences of commands - instead, they are more like recipes
for calculations that will happen once all the requirements are provided.

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 12.png" alt="" />

The way to handle all the nifty things such as exceptions, networking, databases, etc. is to wrap a function which works with a _result of the "unsafe" operation_ in a
safe container. This container won't execute the function - just hold it for a while. However, this conainer would have two special properties: an ability to
run the underlying function when it is deemed safe and an ability to be connected to other containers _of the same type_.

<img data-src="/images/jargon-free-functional-programming/Functional programming 2 3.png" alt="" />

Each container will perform its very specific role - handling exceptions to return a value instead of breaking,
running some input-output operations (incl. networking and databases), etc. We assume containers already do these operations
in a safe manner - meaning they do not change anything in the program outside of themselves (think global variables, outer scope, etc.)
and they always return a value. They only execute the function they wrap once requested explicitly.

<img data-src="/images/jargon-free-functional-programming/Functional programming 2 4.png" alt="" />
<img data-src="/images/jargon-free-functional-programming/Functional programming 2 6.png" alt="" />

By making it so that safe containers of different types can not be chained, we eliminate the chance of unexpected program failure.
And we make sure at any point in time we can say what a program is doing exactly by just looking at its types.

By connecting such containers in a chain, we make programs.

<img data-src="/images/jargon-free-functional-programming/Functional programming 2 7.png" alt="" />

But these chains do not do anything until they are explicitly executed.

<img data-src="/images/jargon-free-functional-programming/Functional programming 2 8.png" alt="" />

A program is a chain of functions, wrapped in "safe" constructs, which is executed "at the end / edge of the world" - meaning program is thought to be executed only once.

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 15.png" alt="" />

All the logic is hidden in those "safe" constructs - it is isolated from the rest of the world. Limited to only its direct arguments. It is guaranteed to never break and always
return a value (which might be wrapped in another "safe" construct).

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 14.png" alt="" />

A program made of these safe recipes on how to calculate the result is just another recipe itself - essentially a series of recipes.

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 20.png" alt="" />

This safe set of recipes is then thrown together with a bunch of inputs into a grinder called "real world", where nothing is safe and everything can happen (theoretically).

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 17.png" alt="" />

In the grinder, the dish is being cooked from the inputs, following the recipes thrown to the grinder.
The result of this cooking might be another program itself, which can then be recycled by being thrown back into the grinder -
that would happen if a program enters the (infinite) loop, waiting for some inputs - it is essentially becomes a new program,
which also needs to be executed when all the requirements are met.

<img data-src="/images/jargon-free-functional-programming/Functional programming 1 18.png" alt="" />

The <a href="/2022/07/13/jargon-free-functional-programming.html">next article</a> contains a few examples and explains the above in bloody details,
using TypeScript and a (semi-)real-world problem and a step-by-step approach to arrivin at the above concepts.
