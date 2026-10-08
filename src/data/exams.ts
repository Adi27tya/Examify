import { Exam } from '../types';

export const SAMPLE_EXAMS: Exam[] = [
  {
    id: 'general-knowledge',
    title: 'General Knowledge & Current Affairs',
    subject: 'General Knowledge',
    description: 'Test your awareness of world geography, history, global landmarks, and prominent achievements.',
    durationMinutes: 10,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Beginner',
    category: 'General',
    questions: [
      {
        id: 1,
        question: 'Which is the largest ocean on Earth by surface area?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
        correctAnswerIndex: 2,
        explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the Earth\'s surface.'
      },
      {
        id: 2,
        question: 'Who was the first person to step on the Moon?',
        options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'Michael Collins'],
        correctAnswerIndex: 1,
        explanation: 'Neil Armstrong stepped on the Moon on July 20, 1969, during the Apollo 11 mission.'
      },
      {
        id: 3,
        question: 'What is the capital city of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswerIndex: 2,
        explanation: 'Canberra was chosen as the capital in 1908 as a compromise between rival cities Sydney and Melbourne.'
      },
      {
        id: 4,
        question: 'Which country is known as the "Land of the Rising Sun"?',
        options: ['Japan', 'China', 'South Korea', 'Thailand'],
        correctAnswerIndex: 0,
        explanation: 'Japan is called "Nihon" or "Nippon", meaning "origin of the sun", often translated as the Land of the Rising Sun.'
      },
      {
        id: 5,
        question: 'In which year did the United Nations officially come into existence?',
        options: ['1919', '1939', '1945', '1950'],
        correctAnswerIndex: 2,
        explanation: 'The United Nations was founded on October 24, 1945, following the end of World War II.'
      },
      {
        id: 6,
        question: 'Which is the longest river in the world?',
        options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
        correctAnswerIndex: 1,
        explanation: 'The Nile River in Africa is traditionally recognized as the longest river, spanning approximately 6,650 kilometers.'
      },
      {
        id: 7,
        question: 'Which world-renowned scientist formulated the Theory of General Relativity?',
        options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Nikola Tesla'],
        correctAnswerIndex: 1,
        explanation: 'Albert Einstein published the general theory of relativity in 1915.'
      },
      {
        id: 8,
        question: 'What is the highest mountain peak in the world above sea level?',
        options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'],
        correctAnswerIndex: 2,
        explanation: 'Mount Everest peaks at 8,848.86 meters (29,031.7 ft) in the Himalayas.'
      },
      {
        id: 9,
        question: 'The Mona Lisa was painted by which Renaissance artist?',
        options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
        correctAnswerIndex: 1,
        explanation: 'Leonardo da Vinci painted the Mona Lisa between 1503 and 1519, now housed in the Louvre in Paris.'
      },
      {
        id: 10,
        question: 'Which instrument is used to measure atmospheric pressure?',
        options: ['Thermometer', 'Barometer', 'Hygrometer', 'Anemometer'],
        correctAnswerIndex: 1,
        explanation: 'A barometer is a scientific instrument used to measure atmospheric air pressure.'
      }
    ]
  },
  {
    id: 'mathematics',
    title: 'Essential Mathematics & Algebra',
    subject: 'Mathematics',
    description: 'Challenge your problem-solving skills in arithmetic, basic algebra, geometry, and percentages.',
    durationMinutes: 12,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Intermediate',
    category: 'STEM',
    questions: [
      {
        id: 1,
        question: 'Solve for x: 3x + 15 = 45',
        options: ['x = 8', 'x = 10', 'x = 12', 'x = 15'],
        correctAnswerIndex: 1,
        explanation: 'Subtract 15 from both sides: 3x = 30. Divide by 3: x = 10.'
      },
      {
        id: 2,
        question: 'What is the value of 15% of 240?',
        options: ['24', '32', '36', '40'],
        correctAnswerIndex: 2,
        explanation: '10% of 240 is 24. 5% is 12. 24 + 12 = 36 (or 0.15 × 240 = 36).'
      },
      {
        id: 3,
        question: 'What is the perimeter of a rectangle with length 14 cm and width 6 cm?',
        options: ['20 cm', '40 cm', '84 cm', '28 cm'],
        correctAnswerIndex: 1,
        explanation: 'Perimeter = 2 × (length + width) = 2 × (14 + 6) = 2 × 20 = 40 cm.'
      },
      {
        id: 4,
        question: 'Which of the following numbers is a prime number?',
        options: ['27', '39', '47', '51'],
        correctAnswerIndex: 2,
        explanation: '47 has only two positive divisors: 1 and itself (27 = 3×9, 39 = 3×13, 51 = 3×17).'
      },
      {
        id: 5,
        question: 'If a triangle has interior angles measuring 50° and 65°, what is the third angle?',
        options: ['65°', '75°', '55°', '70°'],
        correctAnswerIndex: 0,
        explanation: 'The sum of angles in a triangle is 180°. 180° - (50° + 65°) = 180° - 115° = 65°.'
      },
      {
        id: 6,
        question: 'What is the square root of 289?',
        options: ['13', '15', '17', '19'],
        correctAnswerIndex: 2,
        explanation: '17 × 17 = 289.'
      },
      {
        id: 7,
        question: 'Simplify the expression: 4² + 3 × (8 - 2)',
        options: ['34', '114', '28', '42'],
        correctAnswerIndex: 0,
        explanation: 'Order of operations: (8 - 2) = 6; 3 × 6 = 18; 4² = 16; 16 + 18 = 34.'
      },
      {
        id: 8,
        question: 'If a car travels at a constant speed of 60 km/h, how far does it travel in 2.5 hours?',
        options: ['120 km', '135 km', '150 km', '160 km'],
        correctAnswerIndex: 2,
        explanation: 'Distance = Speed × Time = 60 × 2.5 = 150 km.'
      },
      {
        id: 9,
        question: 'What is the median of the following set of numbers: 3, 7, 9, 12, 18, 20, 25?',
        options: ['9', '12', '13', '14'],
        correctAnswerIndex: 1,
        explanation: 'In the sorted list of 7 items, the middle element (4th value) is 12.'
      },
      {
        id: 10,
        question: 'What is the sum of the first 5 positive multiples of 4?',
        options: ['50', '60', '70', '80'],
        correctAnswerIndex: 1,
        explanation: 'The first five multiples of 4 are 4, 8, 12, 16, 20. Sum = 4 + 8 + 12 + 16 + 20 = 60.'
      }
    ]
  },
  {
    id: 'science',
    title: 'General Science & Environment',
    subject: 'Science',
    description: 'Explore the foundations of physics, chemistry, biology, and environmental sciences.',
    durationMinutes: 10,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Intermediate',
    category: 'STEM',
    questions: [
      {
        id: 1,
        question: 'What is the chemical formula for ordinary table salt?',
        options: ['NaCl', 'KCl', 'CaCl2', 'Na2SO4'],
        correctAnswerIndex: 0,
        explanation: 'Table salt is Sodium Chloride, represented by the chemical formula NaCl.'
      },
      {
        id: 2,
        question: 'Which gas is most abundant in the Earth\'s atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
        correctAnswerIndex: 2,
        explanation: 'Nitrogen makes up approximately 78% of the Earth\'s atmosphere, followed by oxygen at about 21%.'
      },
      {
        id: 3,
        question: 'Which organelle is widely known as the "powerhouse of the cell"?',
        options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Endoplasmic Reticulum'],
        correctAnswerIndex: 2,
        explanation: 'Mitochondria generate most of the chemical energy needed to power the cell\'s biochemical reactions (ATP).'
      },
      {
        id: 4,
        question: 'What is the acceleration due to gravity on the surface of the Earth approximately?',
        options: ['8.9 m/s²', '9.8 m/s²', '10.8 m/s²', '11.2 m/s²'],
        correctAnswerIndex: 1,
        explanation: 'Standard gravity on Earth is approximated as 9.8 m/s² (or 9.80665 m/s²).'
      },
      {
        id: 5,
        question: 'What type of lens is used to correct myopia (nearsightedness)?',
        options: ['Convex lens', 'Concave lens', 'Cylindrical lens', 'Bifocal lens'],
        correctAnswerIndex: 1,
        explanation: 'Concave (diverging) lenses are used to correct myopia by diverging light rays before they enter the eye.'
      },
      {
        id: 6,
        question: 'What is the pH level of pure, neutral water at 25°C?',
        options: ['0', '5', '7', '14'],
        correctAnswerIndex: 2,
        explanation: 'Pure water has a neutral pH of 7 on the scale from 0 (strongly acidic) to 14 (strongly alkaline).'
      },
      {
        id: 7,
        question: 'Photosynthesis in green plants mainly converts light energy into which form?',
        options: ['Thermal energy', 'Nuclear energy', 'Chemical energy', 'Mechanical energy'],
        correctAnswerIndex: 2,
        explanation: 'Photosynthesis transforms solar energy into chemical energy stored in glucose molecules.'
      },
      {
        id: 8,
        question: 'Which element has the atomic number 1?',
        options: ['Helium', 'Hydrogen', 'Lithium', 'Carbon'],
        correctAnswerIndex: 1,
        explanation: 'Hydrogen is the lightest and first element in the periodic table with atomic number 1.'
      },
      {
        id: 9,
        question: 'Sound waves cannot travel through which of the following?',
        options: ['Steel', 'Water', 'Air', 'Vacuum'],
        correctAnswerIndex: 3,
        explanation: 'Sound is a mechanical wave that requires a physical medium (solid, liquid, or gas) to propagate, so it cannot travel through a vacuum.'
      },
      {
        id: 10,
        question: 'What is the primary green pigment in plant leaves responsible for absorbing sunlight?',
        options: ['Carotenoid', 'Chlorophyll', 'Anthocyanin', 'Melanin'],
        correctAnswerIndex: 1,
        explanation: 'Chlorophyll is the green pigment in chloroplasts that absorbs light energy for photosynthesis.'
      }
    ]
  },
  {
    id: 'english',
    title: 'English Language & Comprehension',
    subject: 'English',
    description: 'Assess vocabulary, grammatical rules, sentence structure, idioms, and reading accuracy.',
    durationMinutes: 10,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Beginner',
    category: 'Humanities',
    questions: [
      {
        id: 1,
        question: 'Choose the correct synonym for the word "BENEVOLENT":',
        options: ['Hostile', 'Kind and generous', 'Greedy', 'Pessimistic'],
        correctAnswerIndex: 1,
        explanation: 'Benevolent means well-meaning, kindly, and charitable.'
      },
      {
        id: 2,
        question: 'Select the sentence with the correct subject-verb agreement:',
        options: [
          'Neither the teacher nor the students was present.',
          'Neither the teacher nor the students were present.',
          'Either he or she are going to the seminar.',
          'Each of the players have won an award.'
        ],
        correctAnswerIndex: 1,
        explanation: 'When joined by "neither... nor", the verb agrees with the closer subject ("students", which is plural, hence "were").'
      },
      {
        id: 3,
        question: 'What is the antonym of the word "ARROGANT"?',
        options: ['Humble', 'Proud', 'Conceited', 'Boastful'],
        correctAnswerIndex: 0,
        explanation: 'Arrogant means having an exaggerated sense of one\'s importance; humble is the direct opposite.'
      },
      {
        id: 4,
        question: 'Identify the part of speech of the underlined word in: "She solved the puzzle QUICKLY."',
        options: ['Adjective', 'Noun', 'Adverb', 'Conjunction'],
        correctAnswerIndex: 2,
        explanation: '"Quickly" modifies the verb "solved", describing how the action was performed, making it an adverb.'
      },
      {
        id: 5,
        question: 'What is the meaning of the idiom "to burn the midnight oil"?',
        options: [
          'To start a fire accidentally',
          'To work or study late into the night',
          'To waste resources carelessly',
          'To sleep deeply and restfully'
        ],
        correctAnswerIndex: 1,
        explanation: '"To burn the midnight oil" means to study or work hard late into the night, derived from historical oil lamps.'
      },
      {
        id: 6,
        question: 'Choose the word that is spelled correctly:',
        options: ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'],
        correctAnswerIndex: 2,
        explanation: '"Accommodate" is spelled with two "c"s and two "m"s.'
      },
      {
        id: 7,
        question: 'Fill in the blank: "He has been living here _____ five years."',
        options: ['since', 'for', 'from', 'during'],
        correctAnswerIndex: 1,
        explanation: '"For" is used with a duration of time (e.g., five years), whereas "since" is used with a specific starting point in time.'
      },
      {
        id: 8,
        question: 'Which of the following is an example of an oxymoron?',
        options: ['Brave lion', 'Deafening silence', 'Running quickly', 'Blue sky'],
        correctAnswerIndex: 1,
        explanation: 'An oxymoron combines two contradictory terms; "deafening silence" pairs loudness with complete absence of sound.'
      },
      {
        id: 9,
        question: 'What is the plural form of the word "Crisis"?',
        options: ['Crisises', 'Crisis', 'Crises', 'Crise'],
        correctAnswerIndex: 2,
        explanation: 'The plural of the Greek-derived noun "crisis" is "crises".'
      },
      {
        id: 10,
        question: 'Choose the passive voice equivalent: "The chef cooked a delicious meal."',
        options: [
          'A delicious meal was cooked by the chef.',
          'A delicious meal had been cooked by the chef.',
          'The chef had cooked a delicious meal.',
          'A delicious meal is cooked by the chef.'
        ],
        correctAnswerIndex: 0,
        explanation: 'Past simple active "cooked" changes to past simple passive "was cooked by".'
      }
    ]
  },
  {
    id: 'computer-basics',
    title: 'Computer Basics & Information Tech',
    subject: 'Computer Basics',
    description: 'Test your understanding of computer hardware, software, operating systems, and networking.',
    durationMinutes: 10,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Beginner',
    category: 'Technology',
    questions: [
      {
        id: 1,
        question: 'What does CPU stand for in computer systems?',
        options: [
          'Central Performance Utility',
          'Central Processing Unit',
          'Computer Power Unit',
          'Core Programming Unit'
        ],
        correctAnswerIndex: 1,
        explanation: 'CPU stands for Central Processing Unit, the primary component that executes instructions in a computer.'
      },
      {
        id: 2,
        question: 'Which memory type is volatile and loses its data when power is turned off?',
        options: ['ROM', 'Hard Disk Drive', 'RAM', 'Flash Drive'],
        correctAnswerIndex: 2,
        explanation: 'RAM (Random Access Memory) is volatile working memory that loses its contents when power is disconnected.'
      },
      {
        id: 3,
        question: 'How many bits are there in one byte?',
        options: ['4 bits', '8 bits', '16 bits', '32 bits'],
        correctAnswerIndex: 1,
        explanation: 'By standard computing definition, 1 byte equals exactly 8 bits.'
      },
      {
        id: 4,
        question: 'Which protocol is commonly used to transfer secure web pages across the Internet?',
        options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
        correctAnswerIndex: 1,
        explanation: 'HTTPS (Hypertext Transfer Protocol Secure) encrypts data between the client browser and the server using TLS/SSL.'
      },
      {
        id: 5,
        question: 'Which of the following is an open-source operating system?',
        options: ['Microsoft Windows', 'Apple macOS', 'Linux', 'iOS'],
        correctAnswerIndex: 2,
        explanation: 'Linux is an open-source Unix-like operating system kernel created by Linus Torvalds.'
      },
      {
        id: 6,
        question: 'What does the abbreviation "URL" stand for?',
        options: [
          'Universal Resource Locator',
          'Uniform Resource Locator',
          'Unified Retrieval Link',
          'Uniform Routing Link'
        ],
        correctAnswerIndex: 1,
        explanation: 'URL stands for Uniform Resource Locator, specifying the address of a resource on the web.'
      },
      {
        id: 7,
        question: 'What is the primary function of a firewall in a network?',
        options: [
          'To speed up CPU clock rate',
          'To filter incoming and outgoing network traffic based on security rules',
          'To format storage drives',
          'To increase internet connection bandwidth'
        ],
        correctAnswerIndex: 1,
        explanation: 'A firewall monitors and filters incoming and outgoing network traffic to protect against unauthorized access.'
      },
      {
        id: 8,
        question: 'Which keyboard shortcut is standard in most OS for pasting copied clipboard content?',
        options: ['Ctrl + C / Cmd + C', 'Ctrl + V / Cmd + V', 'Ctrl + X / Cmd + X', 'Ctrl + Z / Cmd + Z'],
        correctAnswerIndex: 1,
        explanation: 'Ctrl + V (or Cmd + V on macOS) is the standard keyboard shortcut to paste copied content.'
      },
      {
        id: 9,
        question: 'Which of the following represents an input device?',
        options: ['Monitor', 'Printer', 'Scanner', 'Speaker'],
        correctAnswerIndex: 2,
        explanation: 'A scanner captures physical documents and sends digital data into the computer, making it an input device.'
      },
      {
        id: 10,
        question: 'What does SSD stand for in data storage?',
        options: [
          'Solid State Drive',
          'Silicon Storage Disk',
          'System Serial Device',
          'Synchronous Storage Drive'
        ],
        correctAnswerIndex: 0,
        explanation: 'SSD stands for Solid State Drive, utilizing flash memory rather than mechanical spinning platters.'
      }
    ]
  },
  {
    id: 'reasoning',
    title: 'Logical & Analytical Reasoning',
    subject: 'Reasoning',
    description: 'Sharpen your deductive logic, sequence completion, analogies, and critical thinking.',
    durationMinutes: 12,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Intermediate',
    category: 'Aptitude',
    questions: [
      {
        id: 1,
        question: 'Find the next number in the sequence: 2, 6, 12, 20, 30, ___',
        options: ['40', '42', '44', '46'],
        correctAnswerIndex: 1,
        explanation: 'The differences between consecutive numbers increase by 2: +4, +6, +8, +10, +12. Thus, 30 + 12 = 42.'
      },
      {
        id: 2,
        question: 'Complete the analogy: Book is to Reading as Fork is to ___',
        options: ['Writing', 'Eating', 'Cooking', 'Drinking'],
        correctAnswerIndex: 1,
        explanation: 'A book is a tool used for reading; a fork is an utensil used for eating.'
      },
      {
        id: 3,
        question: 'If "CAT" is coded as "DBU" (each letter shifted +1 forward), how is "DOG" coded?',
        options: ['EPH', 'EPG', 'EQH', 'FPH'],
        correctAnswerIndex: 0,
        explanation: 'D + 1 = E, O + 1 = P, G + 1 = H. Therefore, DOG is coded as EPH.'
      },
      {
        id: 4,
        question: 'Pointing to a photograph, a woman says: "He is the only son of my father\'s father." Who is the man to the woman?',
        options: ['Brother', 'Father', 'Uncle', 'Grandfather'],
        correctAnswerIndex: 1,
        explanation: 'My father\'s father is her grandfather. The only son of her grandfather is her father.'
      },
      {
        id: 5,
        question: 'Which word does NOT belong with the others?',
        options: ['Apple', 'Banana', 'Carrot', 'Orange'],
        correctAnswerIndex: 2,
        explanation: 'Carrot is a root vegetable, whereas apple, banana, and orange are all fruits.'
      },
      {
        id: 6,
        question: 'All roses are flowers. Some flowers fade quickly. Which conclusion definitely follows?',
        options: [
          'All roses fade quickly',
          'Some roses may fade quickly',
          'No roses fade quickly',
          'All flowers are roses'
        ],
        correctAnswerIndex: 1,
        explanation: 'Since only some flowers fade quickly and roses are flowers, some roses might fade quickly (a possibility, not a universal guarantee).'
      },
      {
        id: 7,
        question: 'A clock shows 3:15. What is the approximate angle between the hour hand and the minute hand?',
        options: ['0°', '7.5°', '15°', '22.5°'],
        correctAnswerIndex: 1,
        explanation: 'At 3:15, the minute hand is at 90°. The hour hand moves 0.5° per minute, so at 15 minutes it is at 90° + (15 × 0.5°) = 97.5°. Difference = 7.5°.'
      },
      {
        id: 8,
        question: 'Complete the letter series: B, D, G, K, P, ___',
        options: ['S', 'U', 'V', 'W'],
        correctAnswerIndex: 2,
        explanation: 'Alphabetical gaps increase: B (+2) D (+3) G (+4) K (+5) P (+6) V. P is 16th letter; 16 + 6 = 22, which is V.'
      },
      {
        id: 9,
        question: 'If South-East becomes North, North-East becomes West, and so on, what will West become?',
        options: ['North-East', 'South-East', 'South-West', 'North-West'],
        correctAnswerIndex: 1,
        explanation: 'Each direction is rotated 135° counter-clockwise. Rotating West (270°) by 135° counter-clockwise leads to South-East (135°).'
      },
      {
        id: 10,
        question: 'Five people A, B, C, D, and E are in a line. C is in the exact middle. A is to the left of B, and D is to the right of E. If E is between C and D, who is at the leftmost end?',
        options: ['A', 'B', 'D', 'Cannot be determined without more information'],
        correctAnswerIndex: 0,
        explanation: 'With C in position 3: slots 1 and 2 are filled by A and B (A left of B implies A is in position 1, B is in position 2). Slots 4 and 5 are E and D. Thus, A is at the leftmost end.'
      }
    ]
  }
];
