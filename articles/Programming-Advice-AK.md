# Programming Advice
*A general discussion on programming, including re-posts of my comments to students and others.*

- [Tips for beginners](#tips-for-beginners)
    - [Tips for intermediate programmers](#tips-for-intermediate-programmers)
- [Languages](#languages)
- [Choosing a language](#choosing-a-language)
- [Notable People](#notable-programmers)
- [Historical Notes](#historical-notes)
- [Programs I've Written](#my-programs)
- [Glossary](#glossary)

## Tips for beginners

### Overview
- **First Steps in Learning Programming:**
  1. Start with a strong motivation; understand why programming matters to you personally.
  2. Learn from inspiring examples and continuously refine your skills based on real-world needs.
  3. Engage with mentors and peers who challenge and inspire you to grow.
  4. Always prioritize understanding the end-user’s needs before diving into coding.
  5. Assess whether a program genuinely simplifies life or solves a problem effectively before starting.

- **Programming Mindset:**
  1. Approach problem-solving as both an art and a science.
  2. Cultivate creativity alongside precise, logical thinking to craft elegant solutions.
  3. Train your mind to think abstractly and deeply, essential for mastering complex problems.

- **Practical Tips:**
  1. Master your native language of programming as a foundational skill for learning additional languages.
  2. Maintain a well-curated cheat sheet with practical examples and syntax for quick reference.
  3. Place equal emphasis on writing clear, readable code as on mastering language syntax.
  4. Study common programming patterns and techniques; they provide proven solutions to common problems.

- **Seeking Help and Improvement:**
  1. When seeking help, articulate your problem clearly and share relevant parts of your code.
  2. Record and review your programming sessions to identify areas for improvement and increase productivity.
  3. Design your workspace for optimal focus and minimize distractions to enhance concentration.

- **Persistence and Learning Curve:**
  1. Begin with manageable projects and progressively tackle more complex challenges.
  2. Embrace mistakes as opportunities for growth and learning in your programming journey.
  3. Stay committed to continuous learning and seek additional resources and education as needed.

### Further
- Choose a language best suited to your purpose in learning the language (see below).
etc.
- If you are *stuck* for what program to create as a student, start off like this: Write a program for yourself or to help someone you love. 
- I personally find programming in a completely silent environment the most efficient. Wearing headphones when working is usually to block out background sounds to avoid getting distracted (by TV, conversation, other music, construction site noise, traffic). When necessary I listen to non-distracting brown-noise, music or nature recordings though this less effective than silence.
- Math/Maths/Mathematics ability is not needed for a programmer but it is helpful - there are very capable programmers who are poor at maths. It depends what type of programming you do. Process flow, abstract reasoning and logical thinking are helpful, as is creative thinking. 
- Don't give up easily. The Angry Birds game (not mine) was the 50th attempt by them to do a game; be willing to try - mistakes are not failure.
- If you are an older person, don't be afraid to go back to school. Steve Wozniak, co-founder of Apple Inc, went back to school to complete his studies.

## Tips for intermediate programmers
- A beginner programmer often takes the long approach to a solution, which is fine so long as it works. Over time though, you learn shortcuts, such as how stucture, arrays, formulas, string manipulation, etc. can make for much more efficient code. Some people pick this up more quickly than others.
- Don't try to make a program faster unless you *need* to make it faster: don't *prematurely optimise*.
- Generally you want to find good proven code libraries that others have written and learn to use those. 
- *Games* - Can you create a good 2D or 3D game using a language such as Python as the main language? Yes, if you pair it with an existing game engine such as Unity, Panda, etc. Most AAA+ games are based on a game engine that was created using a mix of C/C++/Assembly and a scripting language or three. Sometimes this is written in-house. Many games use a team of dozens or hundreds of people. Games need skills covering planning, design, story, concept art, world/level management, logic, programming, artists, modellers, riggers, animators, lighting, characters, psychology, physics, management, marketing, advertising, payroll, various support services, and much more. For a small game it is possible to do all this yourself, scaled down, as a hobby. Start, give it a go, choose something very small to start off with. Find others who like doing the same and have fun with them. Get experience, build a ‘portfolio’ showing what you can do.
- For languages that use a compiler (versus an interpreter), the total build time depends on language, IDE, compiler and size of program, and what you’re programming. Writing and running a 'hello world' program is quick on a slow computer, whereas compiling a web browser, etc. can take half an hour or several hours even on a very fast computer.
- *Any* time you remove multiple items from an array or list, you *should* run the iterative loop in *reverse* order so that the array index automatically points to the correct next item. Doing so in normal forwards order means you have to also update the pointer each time an item is removed. I still forget to do this occasionally and at first wonder why my code is faulty.
- *Arduino*, An Arduino is a little computer (single board microcontroller system) that is suited for hobbyist experimental programming with electronics, but it is nowhere near as fast as a desktop computer nor suitable for such things as modern 3D games. It is open-source hardware & software. There are many alternative systems available. If your IDE can't communicate to the Arduino, first check your USB cable, if necessary reboot or plug into different USB port on PC and relaunch IDE, check you have Uno selected as board, not something else, try using Upload Using Programmer (look under the File menu).


## Languages
- I started prgramming a long time ago, first in BASIC, then 6502 machine code, Logo, a few that I’ve forgotten, Pascal and many more, now about 300 languages and variants (I noted about 250 of them in 1999).
- I've created several small languages myself, as well as implementations of various languages including Javascript and BASIC.

### A few languages
- *HTML* (for web document basics) is a text-based hierarchical (nested) data structure that is interpreted by a web browser, it’s language describing the formatting of text, etc. HTML is a layout markup (declarative) language, not a complete programming language. Web browsers have had many issues in relation to HTML and CSS. One of the disciplines of working with them is to have something look good across all the major web browsers, and keeping it looking good when a new version makes changes. This is less an issue for modern web browsers but is still an issue. You do program HTML but there’s no variables or HTML-accessible storage. It’s direct non dynamic programming that always produce the same results. Creating HTML is as simple as creating a text file, type up some html `<html><body>Hi, World!</body></html>` and save it as ‘my.html’, for example. Open the file with a web browser. Learn from a resource that includes HTML5 (not earlier), Learn about layout grids as part of CSS, pick a good framework for the type of site you wish to make, learn some JavaScript. That said, this type of development is less common now; it is more usual to use site development tools that let you focus on your intent (what) rather than mechanics (how). This can vary depending on what you are making. A website can be static (as in the files do not change) but also dynamic (as in the content is transformed programmatically before you see it). That transformation can occur on a web server or on a client web browser or both. A high-use website aims to have as much static content as possible for speed of delivery to as many people as possible. You can have a (limited) web app that is entirely client-based, such as a game. 
- *CSS* (for web document formatting)
- *JavaScript* (for web document dynamics) is a Java-like language traditionally used to extend the capabilities of HTML and CSS in a web browser. It's notable for being *weakly typed*.
- Python is used more to script processes in desktop apps or on servers (including web servers). 
- Swift was invented at Apple Inc (by engineer Chris Latner), to simplify their programming, use current programming techniques and to compete with other companies’ languages. It is now available as Open Source software, mostly independent of Apple. 
- *PHP*/*C#*/*Ruby*/etc... (for web server programming). Most (but not all) web pages today are not custom-programmed but use existing web engines with most of the development work already done. I've recently programmed a web server mostly from scratch as part of a larger project, which was a lot of work.
- SQL (for talking to server databases). 
- Java was originally created to control appliances.

### Choosing a language
- For *most* students I recommend to start off with a language like Python as it is fairly easy (find good tutorials), gives you a good foundation to learn from, and there is lots of material available to help you.
- Depending on your interest, other languages include C#, JavaScript, C or PHP. Java is also popular but its future may be unclear due to licensing. Swift has become popular on certain hardware. 
- Choice of which programming language to study depends what you want to do. If for employment, choose a suitable mainstream language such as python, C#, C++, etc. Do you know how to program yet? If ‘no’, first learn Python to understand the basics of programming, then after you are experienced learn JavaScript and C. If ‘yes’, research and decide what area/type of software engineering are you wanting to do.
- If your intent of learning is for academic or hobby interest, perhaps choose languages in one of the other 8 programming language categories (such as Functional programming, etc.) 
- If your intent is machine learning, I suggest to start with Python, learn C then move to AI/ML type languages.
- If for a specific project, choose the best language to fit that.

### Choosing a second language
- Use at least two languages: one for fast design, the other for fast execution.
- Keep on with your first language but once you’re comfortable with it, pick up another language best suited to your interests. I’ve used many languages and often use several at once (common in web programming for example). It also depends how you learn -- some people learn better with multiple languages, others with a single focus. For example, if you started with C++, then find a c++ to python reference. Read the python web reference. Begin programming. Do tutorials if you need. Do a formal course if you need. Get a tutor if you need further help.
- There are some things you can’t easily (and shouldn’t) do in only one language (e.g. web related work often uses HTML/CSS/JavaScript/PHP/C#.net/etc), whereas other things work fine with a single language (e.g. Android app in Java or Kotlin).

## Notable programmers
A few of the many people who have contributed to the development of programming languages and computer systems and have influenced how we think about and use technology today.

1. **Ada Lovelace** (1815–1852) - England
   - Often considered the world's first programmer, Ada Lovelace wrote the first algorithm intended to be executed by Charles Babbage's Analytical Engine.

2. **Alan Turing** (1912–1954) - England
   - A pioneer in computer science, Turing developed the concept of the Turing machine and is considered the father of theoretical computer science and artificial intelligence.

3. **John von Neumann** (1903–1957) - Hungary
   - A mathematician who made significant contributions to computer science, particularly in the development of the von Neumann architecture, which forms the basis of most computer systems today.

4. **Grace Hopper** (1906–1992) - USA
   - An early computer scientist who developed the first compiler for a computer programming language and was instrumental in the development of COBOL.

5. **Donald Knuth** (1938–) - USA
   - Known for his seminal work "The Art of Computer Programming," Knuth has made significant contributions to algorithms and has been a major influence on the field of computer science.

6. **Niklaus Wirth** (1934–) - Switzerland
   - The designer of several influential programming languages, including Pascal, Modula, and Oberon, Wirth has made substantial contributions to software engineering.

7. **Margaret Hamilton** (1936–) - USA
   - Led the team of 4,000 that developed the on-board flight software for NASA's Apollo missions, contributing to the field of software engineering and coining the term "software engineering." The Apollo computer had 72k bytes for data/software storage (36k words). Program source code was handwritten on paper then translated to punched cards for processing, process errors and success results were printed. Live errors and values were displayed on a mini 3-row display during the flight including the famous 1201/1202 alarms.


8. **Ken Thompson** (1943–) - USA
   - Co-creator of the Unix operating system and the B programming language, Thompson has had a lasting impact on software development and operating systems.

9. **Dennis Ritchie** (1941–2011) - USA
   - Co-creator of Unix and the C programming language, Ritchie's work has been foundational in the development of modern operating systems and software.

10. **Bjarne Stroustrup** (1950–) - Denmark
    - The creator of the C++ programming language, which has had a significant impact on software development due to its efficiency and performance.

11. **James Gosling** (1955–) - Canada
    - Known as the "Father of Java," Gosling created the Java programming language while working at Sun Microsystems in the early 1990s.

12. **Tim Berners-Lee** (1955–) - England
    - Inventor of the World Wide Web, Berners-Lee developed the first web browser and the protocols that form the basis of the web, revolutionizing how information is shared and accessed.

13. **Guido van Rossum** (1956–) - Netherlands
    - The creator of the Python programming language, which has become one of the most popular and influential programming languages in the world, known for its simplicity and readability.

14. **Tim Paterson** (1956–) - USA
    - Known as the original author of MS-DOS, which became the foundation for Microsoft's operating systems and helped establish the company as a major player in the software industry.

15. **Anders Hejlsberg** (1960–) - Denmark
    - Known for his work on the Turbo Pascal compiler, Delphi, and the development of the C# programming language, which is widely used in enterprise environments.

16. **Yukihiro "Matz" Matsumoto** (1965–) - Japan
    - The creator of the Ruby programming language, which emphasizes simplicity and productivity, with an elegant syntax that is natural to read and easy to write.

17. **Linus Torvalds** (1969–) - Finland
    - The creator of the Linux kernel, which has become the foundation of a vast number of systems around the world, including the majority of servers and supercomputers.

18. **Sergey Brin** (1973–) - Russia
    - Co-founder of Google, Brin has been instrumental in developing the algorithms and infrastructure that power the world’s most popular search engine.

19. **Satoshi Nakamoto** - Japan
    - The pseudonym of the creators of Bitcoin, who introduced blockchain technology, which has had a significant impact on the fields of finance and cryptography.

20. **Barbara Liskov** (1939–) - USA
    - A pioneering computer scientist who developed the Liskov Substitution Principle, one of the fundamental principles of object-oriented programming. She also contributed significantly to programming languages and distributed systems.

## Historical Notes
- Early computers displayed results on a printer, not on a screen! Before video displays (Cathode Ray Tubes) were in widespread use, the most common display technology was teletype printers (you see them in some old or retro movies). Early games only displayed output (line or page) on the teletype printer. Examples of printer-based games are chess, Colossal Cave Adventure, Lunar Lander, Star Trek and others.
- Today's complex computer operating systems were developed incrementally by diverse teams across various disciplines, building upon existing work. This process involved manual code entry using hardware or firmware, saving progress to storage, iterative development of the operating system, distribution, and continuous improvement. Internally, an operating system often serves as a specialized programming environment.

## My Programs
Here’s some easy and some hard that I’ve done: 
- postage calculator, 
- make bouncing ball on screen, 
- draw a maze, 
- various games, 
- physics capture system, 
- translating programs into other programming languages, 
- graphic file translation, 
- automated systems for processing different data, 
- audio synthesisers, 
- easy website systems, 
- calculator for Android/iPhone, 
- Excel new functions, 
- Factory production support, 
- Factory control systems
- Too many others to mention. Some these were not worthwhile while some were good. 

## Glossary
- *Pseudocode* is a way to express programming-ideas as human descriptive language, written independently of any real programming language. It is a way to plan and outline algorithms. I use this as an aid to think through how a program will work, to plan and outline the algorithm and sequence/timeline of events, and what the implications are. It needs to be translated into a real programming to be of use. Example: `Display the text 'Hello, World' on the screen`
- *Programming* is for controlling tools (machines) that help people do big or boring tasks. The art form combines creative aspects such as poetry, logical interpretation such as magistrates and lawyers do in a court of law, systematic thinking like that of engineers, and the precision and detail-orientation of craftsmanship. Programming involves designing and writing code to solve problems, automate processes, and create applications that enhance productivity and efficiency. It also requires the ability to debug and optimize code, much like editing and refining a piece of writing or adjusting a complex machine to achieve the desired outcome.
- *Specialist Programmer*: Experts in a specific area of programming, focusing deeply on niche skills and technologies within their field.
- *Generalist Programmer*: Versatile in various programming languages and technologies, adept at integrating different systems and adapting to diverse project requirements.
- Think of *front-end* and *back-end* like an animal. Front end is the face (what you interact with on your phone, or laptop), back end supports the front and takes care of business (usually on a server).
- *Compiler* is like a 3D printer, which takes a complete design (*source code*) and creates a physical object (*machine code*) in a single process.
- *linker* is like gluing/fastening printed parts together.
- *Interpreter* is like a food cook, who crafting a meal piece by piece while continuously following the recipe (*source code*) instructions.
- *Just-in-time* is like ordering at a *fast food* restaurant, where the food is usually prepared just ahead of time based on predictive models.
- *Byte codes* are numbers that represent commands for a software interpreter, like the way that binary machine codes represent commands for an electronic microprocessor. Most versions of Java, Python and BASIC use this. Because this allows for the code to run on any system that can run the interpreter, this is called portable code or pcode. An example might be to add two numbers. For a while there was a popular to have a Java microprocessor that would run the code in electronics but this was found too complex and not much faster. Most interpreters are originally written in C (for speed) or C++ (for complexity).
- *Machine Code* programming is done by entering raw byte code numbers that an electronic (micro)processor uses.

- *Developer*: (general term for a software creator), 
- *Programmer*: professional coder , 
- *Engineer*: works with software and hardware, 
- *Coder*: has ability to write code.
- *Application*, *Program* and *Software* are all similar. 
- *Application* is software with a clear focus. 
- *Software* is programmed applications, operations and information. 
- A *program* is what makes the application work, specific task(s) you want the computer to do. 
- The term ‘*app*’ has been around longer than mobiles, but has been heavily promoted in ‘smart’ mobile marketing.
- *Binary* a base-2 numbering system that relates to low level electronics that form the underpinnings of most digital computers. Most computers are based on binary (Boolean) logic at the electronic level, along with everything they do. You can do maths in binary (`10 + 10 = 100`, equivalent to decimal `2+2=4`). You can do bitwise logical operations that can pack a lot more details into memory: And, Or, Not, as well as Nand, Nor, Ex-Or, Ex-Nor. Do you need binary as a programmer? It’s useful but not essential for most ‘high level’ programming like writing a game. If you are writing a driver program for a graphics card, or dealing with electronics, you usually do need it. In C++, the most frequent time you come across it are... And: `if(a && b) // true if both a and b are true`, Or: `if(a || b) // true if either is true`, and Not: `if(!a) // true if a is not true`.
- *Hexadecimal* a base-16 numbering system. Historically hexadecimal came about because most current computer designs use binary electronics. (There are other types such as analogue, trinary and quantum, etc.). Hex is generally faster than decimal for humans to convert from binary as every hex digit directly represents four binary bits, whereas this is not possible with decimal. Hex is often easier to remember, type and calculate hex numbers than binary (Example: 0x41 to represent the letter 'A' versus binary 01000001 or decimal 65). 
- *Octal* a base-8 (or three bits) numbering system that was also popular up to the mid 1970s. I was glad to see it die out as Hexadecimal is more helpful in my opinion.
- *IDE* is a system or program used to write programs. The IDE uses a compiler or interpreter when you press the ‘play’ or ‘run’ button, to run the code. Compiled code can be run without the IDE after it is created. 

**Disclaimer: This is an initial collection + writeup, which I'll refine in the future.**
