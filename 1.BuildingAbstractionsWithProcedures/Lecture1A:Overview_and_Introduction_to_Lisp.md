# Overview and Introduction to Lisp

- **Declarative knowledge**: What is true
- A **process**: how to do things
- A **procedure** : a pattern of rules
- A **procedure** directs a **process**
- **Computer science** is about **techniaues for controlling complexity**
- **Black-Box Abstraction**: taking something and building a box about it
  - Suppressing details(complexity) inside a box to be used later as a component inside a bigger box
  - Building generic things from which we can build black boxes that do something
    For example the way of calculating square roots by generating a guess and keeping improving until reaching an acceptable value is an instance of a more general technique called **fixed-point of a function** method which about finding a value `y` such that `f(y) = y` by making a guess for `y` and keeping improving. Here, to calculate the square root of `x` we just find the fixed point of the function `y -> average(y + x/y)`. So the **fixed point** box can be given an argument which the function `f` and it generates other black boxes(in our example it generates **square root** box). By that way, we are building procedures that given procedure and returning other procedures.
