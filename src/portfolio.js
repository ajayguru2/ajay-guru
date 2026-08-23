/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

const emoji = value => value;
import iiitvLogo from "./assets/images/iiitvLogo.png";
import inuasc from "./assets/images/inuasc.jpeg";
import jsdk from "./assets/images/jsdk.png";
import saadxas from "./assets/images/sadxas.png";
import vibrantLogo from "./assets/images/vaca-removebg-preview.png";

const greeting = {
  username: "Ajay Guru",
  title: "Hi all, I'm Ajay",
  subTitle: emoji(
    "I'm a Software Developer. I love to create things that make a difference in the world."
  ),
  resumeLink:
    "https://files.ajay.guru/resume.pdf", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/ajayguru2",
  linkedin: "https://www.linkedin.com/in/ajayguru21/",
  gmail: "hi@ajay.guru",
  gitlab: "https://gitlab.com/ajay.guru",
  facebook: "https://www.facebook.com/ajayguru14/",
  medium: "https://medium.com/@ajayguru",
  stackoverflow: "https://stackoverflow.com/users/7024707/argentum97",
  twitter: "https://twitter.com/AjayGuru0",
  instagram: "https://www.instagram.com/ajjayyyyyyyy/",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "Skilled full stack developer a strong bias towards clean and efficient code. I keep a strong focus on quality and customer satisfaction.",
  skills: [
    emoji(
      "⚡ Practice Test Driven Development to ensure quality and maintainability"
    ),
    emoji("⚡ Build highly scalable and performant applications"),
    emoji(
      "⚡ Integration of third party services such as Firebase/ AWS / Digital Ocean"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "Java",
      fontAwesomeClassname: "fab fa-java"
    },
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "aws",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "firebase",
      fontAwesomeClassname: "fas fa-fire"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Indian Institute of Information Technology, Vadodara",
      logo: iiitvLogo,
      subHeader: "Bachelor of Technology in Computer Science",
      duration: "July 2016 - July 2020",
      desc: "",
      descBullets: []
    },
    {
      schoolName: "Vibrant Academy",
      logo: vibrantLogo,
      subHeader: "JEE Prep",
      duration: "April 2013 - July 2016",
      desc: "",
      descBullets: []
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Programming",
      progressPercentage: "90%"
    },
    {
      Stack: "Frontend/Design", //Insert stack or technology you have experience in
      progressPercentage: "30%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend",
      progressPercentage: "74%"
    },
    {
      Stack: "LLD",
      progressPercentage: "69.69%"
    },
    {
      Stack: "HLD",
      progressPercentage: "59.69%"
    }

  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Software Engineer",
      company: "Nymble",
      companylogo: jsdk,
      date: "Dec 2021 – Present",
      descBullets: [
        "In charge of HLD and LLD of the machine interaction logic",
        "Working on primarily with Java and Vue"
      ]
    },
    {
      role: "Software Craftsperson",
      company: "Incubyte",
      companylogo: inuasc,
      date: "Oct 2020 – Dec 2021",
      descBullets: [
        "Practicing TDD, I contributed as a fullstack developer for Republic Finance LLC.",
        "Worked on an array of technologies ranging from Micronaut(Java) to Gin/Gonic (Golang) while maintaining extremely high coding standards and code cleanliness."
      ]
    },
    {
      role: "Research Intern",
      company: "Siemens",
      companylogo: saadxas,
      date: "Jan 2020 – Aug 2020",
      descBullets: [
        "Worked on developing an RL based ASHRAE compliant home automation solution to save energy while maintaining comfort. This project was then posed as a challenge at Siemens Global Hackathon 2020.",
        "Worked on various modules to containerize, enable remote execution, and validate the existing models."
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "false", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "I have strong opinions which I pen frivolously",
  blogs: [
    {
      url: "https://medium.com/@ajayguru/project-based-learning-8cd0baecbe8d",
      title: "Project based learning",
      description:
        "Why is is so much fun learning stuff by doing"
    },
    {
      url: "https://medium.com/@ajayguru/are-moocs-on-a-disruptive-innovation-trajectory-in-india-395c011a6368",
      title: "MOOCs and India",
      description:
        "Are MOOCs on a disruptive innovation trajectory in India?"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND SPEAK PUBLICLY"
  ),

  talks: [
    {
      title: "Concurrency in Golang",
      subtitle: "Tech Talk @Incubyte",
      slides_url: "https://files.ajay.guru/ConcurrencyGO.pdf",
      event_url: "https://www.incubyte.co/"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+91-7046007502",
  email_address: "hi@ajay.guru"
};

// Twitter Section

const twitterDetails = {
  userName: "AjayGuru0", //Replace "twitter" with your twitter username without @
  display: true // Set true to display this section, defaults to false
};

export {
  greeting,
  socialMediaLinks,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  blogSection,
  talkSection,
  contactInfo,
  twitterDetails
};
