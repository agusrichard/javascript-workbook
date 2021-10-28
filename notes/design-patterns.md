# Design Patterns

<br />

## List of Contents:
### 1. [Advanced Javascript Design Patterns](#content-1)



<br />

---

## Contents

## [Advanced Javascript Design Patterns](https://medium.com/dhiwise/advanced-javascript-design-patterns-6812f3286585) <span id="content-1"><span>

### What are Design Patterns?
- Design Patterns are the solutions to commonly occurring problems in software design. These patterns are easily re-usable and are expressive.

### Creational Design Patterns
- Creational Design Patterns will create objects for you instead of instantiating an object directly.
- In software engineering, creational design patterns are design patterns that deal with object creation mechanisms, trying to create objects in a manner suitable to the situation. The basic form of object creation could result in design problems or added complexity to the design. Creational design patterns solve this problem by somehow controlling this object creation.

#### Factory Method
- It defines an interface for creating a single object and lets child classes decide which class to instantiate.
- Example: <br />
  ![](https://miro.medium.com/max/496/1*KGRgeJFiEx7xNorAnSrjUw.png)
  ![](https://miro.medium.com/max/700/1*-48_4nsv2CGhSYGfRvi9cg.png)

#### Abstract Factory
- It creates families or groups of common objects without specifying their concrete classes.
- The abstract factory pattern provides a way to encapsulate a group of individual factories that have a common theme without specifying their concrete classes
- Example: <br />
  ![](https://miro.medium.com/max/638/1*NvbnGgPLcLReI_X94ZBY5w.png)
  ![](https://miro.medium.com/max/659/1*xYEHHzyxOeYTjoII1A9e2w.png)

#### Builder
- It constructs complex objects from simple objects.
- The builder pattern is a design pattern designed to provide a flexible solution to various object creation problems in object-oriented programming.
- Example: <br />
  ![](https://miro.medium.com/max/659/1*QjKwshWAgjmhuFuFz0luiw.png)
  ![](https://miro.medium.com/max/700/1*u-snCihmFBhoFbnSqMeyvw.png)

#### Prototype
- It creates new objects from the existing objects.
- The prototype pattern is a creational design pattern in software development. It is used when the type of objects to create is determined by a prototypical instance, which is cloned to produce new objects.
- Example: <br />
  ![](https://miro.medium.com/max/496/1*1CV1aVKZt_hG_-h8t4PmQw.png)

#### Singleton
- It ensures that there’s only one object created for a particular class.
- In software engineering, the singleton pattern is a software design pattern that restricts the instantiation of a class to one “single” instance. This is useful when exactly one object is needed to coordinate actions across the system.
- Example: <br />
  ![](https://miro.medium.com/max/638/1*uiEANTJKRFBRhiCHuZuLYg.png)

### Structural Design Patterns
- These patterns concern class and object composition. They use inheritance to compose interfaces.
- In software engineering, structural design patterns are design patterns that ease the design by identifying a simple way to realize relationships among entities.


#### Adapter
- This pattern allows classes with incompatible interfaces to work together by wrapping their own interface around existing class
- In software engineering, the adapter pattern is a software design pattern that allows the interface of an existing class to be used as another interface. It is often used to make existing classes work with others without modifying their source code.
- Example: <br />
  ![](https://miro.medium.com/max/588/1*78Bo6i_oePTMU7z0jVOS4g.png)

#### Bridge
- It separates the abstraction from the implementation so that the two can vary independently.
- Bridge is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies — abstraction and implementation — which can be developed independently of each other.
- Example: <br />
  ![](https://miro.medium.com/max/700/1*ddyEIyKCsjYbwMhbdnJXjA.png)

#### Composite
- It composes objects so that they can be manipulated as single objects.
- The composite pattern describes a group of objects that are treated the same way as a single instance of the same type of object.
- Example: <br />
  ![](https://miro.medium.com/max/679/1*kT3gPPgM3hQSxJrmsA2jYg.png)

#### Decorator
- It dynamically adds or overrides the behavior of an object.
- The decorator pattern is a design pattern that allows behavior to be added to an individual object, dynamically, without affecting the behavior of other objects from the same class.
- Example: <br />
  ![](https://miro.medium.com/max/700/1*VpOs0_AG4f5j_Ofzudwt8Q.png)

#### Facade
- It provides a simplified interface to complex code.
- The facade pattern (also spelled façade) is a software-design pattern commonly used in object-oriented programming. Analogous to a facade in architecture, a facade is an object that serves as a front-facing interface masking more complex underlying or structural code.
- Example: <br />
  ![](https://miro.medium.com/max/700/1*DHlLlzyZiMTcz1MTTt6DvQ.png)

#### Flyweight
- It reduces the memory cost of creating similar objects.
- A flyweight is an object that minimizes memory usage by sharing as much data as possible with other similar objects.
- Example: <br />
  ![](https://miro.medium.com/max/699/1*BUuIR-7B4gOSaYHT-_agtQ.png)
  ![](https://miro.medium.com/max/638/1*B62P7fQI79Pa8VNADuK7CQ.png)

#### Proxy
- By using Proxy, a class can represent the functionality of another class.
- The proxy pattern is a software design pattern. A proxy, in its most general form, is a class functioning as an interface to something else.
- Example: <br />
  ![](https://miro.medium.com/max/588/1*STVhb9BXAWZ3t0jKaHJQ_A.png)

### Behavioral Design Patterns
- Behavioral Design Patterns are specifically concerned with communication between objects.
- In software engineering, behavioral design patterns are design patterns that identify common communication patterns among objects. By doing so, these patterns increase flexibility in carrying out communication.

#### Chain of Responsibility
- It creates a chain of objects. Starting from a point, it stops until it finds a certain condition.
- In object-oriented design, the chain-of-responsibility pattern is a design pattern consisting of a source of command objects and a series of processing objects.
- Example: <br />
  ![](https://miro.medium.com/max/699/1*8cm9fGDBIkdZR4jpmULXlA.png)
  ![](https://miro.medium.com/max/679/1*dEjCYvcKZMrTB2dRa4LBvg.png)
  ![](https://miro.medium.com/max/700/1*Y6aZO0FhWellpAU69l8dBw.png)
  ![](https://miro.medium.com/max/668/1*9Ki9KTtYnoHq2b4klj0sgQ.png)

#### Command
- It creates objects which encapsulate actions in objects.
- In object-oriented programming, the command pattern is a behavioral design pattern in which an object is used to encapsulate all information needed to perform an action or trigger an event at a later time. This information includes the method name, the object that owns the method and values for the method parameters.
- Example:
  ![](https://miro.medium.com/max/699/1*AMX7jFmRU8pfSWahIna0nw.png)
  ![](https://miro.medium.com/max/496/1*d9DB5jurww1gHAeWTqPA3A.png)
  ![](https://miro.medium.com/max/700/1*hAkHDT-vCVQQ3qehtzlblw.png)

#### Iterator
- Iterator accesses the elements of an object without exposing its underlying representation.
- In object-oriented programming, the iterator pattern is a design pattern in which an iterator is used to traverse a container and access the container’s elements.
- Example: <br />
  ![](https://miro.medium.com/max/638/1*sPEIzN3bG5Tu_7mZBSw7zg.png)
  ![](https://miro.medium.com/max/598/1*LZ52nqI4yECLDHXbA98Qfw.png)

#### Mediator
- The mediator pattern adds a third-party object to control the interaction between two objects. It allows loose coupling between classes by being the only class that has detailed knowledge of their methods.
- The mediator pattern defines an object that encapsulates how a set of objects interact. This pattern is considered to be a behavioral pattern due to the way it can alter the program’s running behavior. In object-oriented programming, programs often consist of many classes.
- Example: <br />
  ![](https://miro.medium.com/max/618/1*Q--ZXvEwOCT17AJtCjiucg.png)
  ![](https://miro.medium.com/max/689/1*K0NUHUqM4qwM1YAJ_kB0FQ.png)
  ![](https://miro.medium.com/max/496/1*zc79g7X0CVnZ65mx7latQw.png)

#### Memento
- Memento restores an object to its previous state.
- The memento pattern is a software design pattern that provides the ability to restore an object to its previous state. The memento pattern is implemented with three objects: the originator, a caretaker and a memento.
- Example: <br />
  ![](https://miro.medium.com/max/496/1*-CMBPsWAYSJPpL2EMbEF0g.png)

#### Observer
- It allows a number of observer objects to see an event.
- The observer pattern is a software design pattern in which an object, named the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods.
- Example:
  ![](https://miro.medium.com/max/700/1*kBDW9662fuqeqO-YuQb--A.png)
  ![](https://miro.medium.com/max/700/1*BRV5QPo1YTtJ5BEa5xc1Xw.png)

#### Visitor
- It adds operations to objects without having to modify them.
- The visitor design pattern is a way of separating an algorithm from an object structure on which it operates. A practical result of this separation is the ability to add new operations to existing object structures without modifying the structures.
- Example:
  ![](https://miro.medium.com/max/700/1*Bou9I22pEs7VEVQ8_vW94Q.png)

#### Strategy
- It allows one of the algorithms to be selected in certain situations.
- The strategy pattern is a behavioral software design pattern that enables selecting an algorithm at runtime. Instead of implementing a single algorithm directly, code receives run-time instructions as to which in a family of algorithms to use.
- Example:
  ![](https://miro.medium.com/max/700/1*srPMULYDx_SYqskVw7hF1A.png)
  ![](https://miro.medium.com/max/700/1*XVD1CNa-ucE11CqOKwyp7A.png)
  ![](https://miro.medium.com/max/577/1*Gd-EIrVZpdFEJyYkOPidSQ.png)

#### State
- It alters the behavior of an object when its internal state changes.
- The state pattern is a behavioral software design pattern that allows an object to alter its behavior when its internal state changes. This pattern is close to the concept of finite-state machines.
- Example:
  ![](https://miro.medium.com/max/598/1*d7Jq--ZVu5VQ3tSrCNaLBA.png)
  ![](https://miro.medium.com/max/659/1*PyT5K_SzCOdUh7y6bGRhrA.png)

#### Template Method
- It defines the skeleton of an algorithm as an abstract class, that how should it be performed.
- Template Method is a method in a superclass, usually an abstract superclass, and defines the skeleton of an operation in terms of a number of high-level steps.
- Example:
  ![](https://miro.medium.com/max/679/1*3hmYhXppUvKE0hBd3ocW1Q.png)
  ![](https://miro.medium.com/max/700/1*iAINr2tOntV_p7Ax9y0Anw.png)
  ![](https://miro.medium.com/max/496/1*IWizizeeXuw2zPraRIlZXg.png)



**[⬆ back to top](#list-of-contents)**

<br />

---

## References:
- https://medium.com/dhiwise/advanced-javascript-design-patterns-6812f3286585