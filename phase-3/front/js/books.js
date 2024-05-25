/* 

Book look like that

interface IBook {
    id: Number;
    link: String;
    name: String;
    image: String;
    initialBook: Boolean,
    available:Boolean;
    author: String;
    category: String;
    description: String;
}

*/

// Store books in array
let books = [
  {
    id: 1,
    link: 'https://printige.net/product/engineering-optical-networks',
    name: 'Engineering Optical Networks',
    image: '1.png',
    initialBook: true,
    available: false,
    author: 'Sudhir Warier',
    category: 'Physics',
    description:
      'Written by a leading expert in the field, this book provides a comprehensive introduction to the fundamental concepts of transport and data networks. This resource examines backbone network architectures and functions. The evolution, key components, and techniques of telecommunication networks are presented, including voice and data transmission, fiber optic communication and optical link design. This book explores the photonic network architecture and includes chapters on transport networks, synchronous optical networks, optical transport networks, and dense wavelength division multiplexing.',
  },
  {
    id: 2,
    link: 'https://printige.net/product/clean-code/',
    name: 'Clean Code',
    image: '2.jpg',
    initialBook: true,
    available: true,
    author: 'Robert C. Martin',
    category: 'Software Engineering',
    description:
      'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with this book.',
  },
  {
    id: 3,
    link: 'https://printige.net/product/essential-math-for-data-science/',
    name: 'Essential Math for Data Science',
    image: '3.jpg',
    initialBook: true,
    available: true,
    author: 'Thomas Nield',
    category: 'Mathmatics',
    description:
      'Master the math needed to excel in data science, machine learning, and statistics. In this book author Thomas Nield guides you through areas like calculus, probability, linear algebra, and statistics and how they apply to techniques like linear regression, logistic regression, and neural networks. Along the way you’ll also gain practical insights into the state of data science and how to use those insights to maximize your career.',
  },
  {
    id: 4,
    link: 'https://printige.net/product/atomic-habits/',
    name: 'Atomic Habits',
    image: '4.jpg',
    initialBook: true,
    available: true,
    author: 'James Clear',
    category: 'Self-Help',
    description:
      'No matter your goals, Atomic Habits offers a proven framework for improving – every day. James Clear, one of the world’s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
  },
  {
    id: 5,
    link: 'https://printige.net/product/thinking-with-type/',
    name: 'Thinking With Type',
    image: '5.jpg',
    initialBook: true,
    available: false,
    author: 'Ellen Lupton',
    category: 'Graphic Design',
    description:
      'Thinking with Type is the definitive guide to using typography in visual communication, from the printed page to the computer screen. This revised edition includes forty-eight pages of new content, including the latest information on style sheets for print and the web, the use of ornaments and captions, lining and non-lining numerals, the use of small caps and enlarged capitals, as well as information on captions, font licensing, mixing typefaces, and hand lettering. Throughout the book, visual examples show how to be inventive within systems of typographic form—what the rules are and how to break them. Thinking with Type is a type book for everyone: designers, writers, editors, students, and anyone else who works with words.',
  },
];
// Add to localstorage if no books
if (!localStorage.getItem('books')) {
  localStorage.setItem('books', JSON.stringify(books));
}
