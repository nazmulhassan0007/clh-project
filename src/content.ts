import type { FaqItem } from './faqs'
import { allFaqs } from './faqs'
import { LEARNER_LOGIN_URL } from './site'

export type Cta = { label: string; to?: string; href?: string; tone?: 'primary' | 'secondary' }
export type Photo = { src: string; alt: string }
export type Card = { t: string; d?: string; tag?: string; id?: string; points?: string[]; facts?: [string, string][]; cta?: Cta }

export type Block =
  | { kind: 'cards'; id?: string; title?: string; intro?: string; items: Card[]; cols?: 2 | 3 | 4 }
  | { kind: 'steps'; id?: string; title?: string; intro?: string; items: { t: string; d?: string; k?: string }[]; cols?: 2 | 3 }
  | { kind: 'checks'; id?: string; title: string; intro?: string; items: string[]; foot?: string }
  | { kind: 'split'; id?: string; title: string; paras?: string[]; items?: string[]; photo?: Photo; flip?: boolean; cta?: Cta }
  | { kind: 'note'; id?: string; title?: string; text: string }
  | { kind: 'moodle'; id?: string; title: string; intro: string; captions: { t: string; d: string }[]; cta?: Cta }
  | { kind: 'faq'; id?: string; title: string; intro?: string; items: FaqItem[] }
  | { kind: 'form'; id?: string }
  | { kind: 'legal'; id?: string; headings: string[]; note: string }
  | { kind: 'cta'; id?: string; title: string; text?: string; ctas: Cta[] }

export type Page = { title: string; sub?: string; lede: string; ctas?: Cta[]; photo?: Photo; blocks: Block[] }

const login: Cta = { label: 'Learner Login', href: LEARNER_LOGIN_URL, tone: 'secondary' }
const P = {
  students: { src: '/img/hero-poster.jpg', alt: 'Students working together at a desk' },
  team: { src: '/img/p-006.jpg', alt: 'Colleagues celebrating a result together around a laptop' },
  session: { src: '/img/p-009.jpg', alt: 'Learners discussing an academic task in a training session' },
  grads: { src: '/img/p-001.jpg', alt: 'Graduates throwing their caps in the air outside a university building' },
}

const alp = '/programmes/academic-learning-platform'
const cts = '/programmes/corporate-training-services'
const arp = '/programmes/academic-readiness-programme'

export const PAGES: Record<string, Page> = {
  '/about-us': {
    title: 'About City Language Hub',
    lede: 'City Language Hub supports academic learning, professional communication and workplace development. We help learners build skills they can use in higher education and at work, with English as an important part of that learning.',
    ctas: [{ label: 'Explore Programmes', to: '/programmes', tone: 'primary' }, { label: 'Contact Us', to: '/contact-us', tone: 'secondary' }],
    photo: P.team,
    blocks: [
      { kind: 'split', title: 'Who We Support', paras: ['We work with learners preparing for higher education, students developing their academic skills, and professionals strengthening their communication. We also work with organisations exploring training for their teams.'], photo: P.students },
      {
        kind: 'cards', title: 'What We Do', cols: 3,
        items: [
          { t: 'Academic Learning Platform (ALP)', d: 'Our academic provision connects pre-admission support, a six-week transition programme and ongoing learner success support.', cta: { label: 'Explore ALP', to: alp } },
          { t: 'Corporate Training Services (CTS)', d: 'Focuses on professional communication and workplace development.', cta: { label: 'Explore CTS', to: cts } },
          { t: 'Employability and Professional Pathways', d: 'Supports career planning and preparation for work.' },
        ],
      },
      { kind: 'split', title: 'How Learning Works', paras: ['Our Moodle platform provides organised resources and guided practice. Depending on the programme, learners may also take part in live workshops or receive tutor feedback. Each programme page explains the format, support and access arrangements.'], photo: P.session, flip: true, cta: { label: 'Your Learning Platform', to: '/learning-platform', tone: 'primary' } },
      {
        kind: 'cards', title: 'Our Purpose and Values', intro: 'Our purpose is to make academic and professional development clear, practical and accessible. We help learners understand expectations, practise relevant skills and take informed steps towards their goals.', cols: 4,
        items: [
          { t: 'Clarity', d: 'Clear guidance and understandable learning goals.' },
          { t: 'Practical learning', d: 'Activities connected to study and work.' },
          { t: 'Support', d: 'Guidance appropriate to the programme and learner.' },
          { t: 'Respect', d: 'An inclusive approach to different backgrounds and experiences.' },
        ],
      },
      { kind: 'note', title: 'Our network', text: 'City Language Hub is part of City Language School under Planet Education Network. We work with colleagues and partners to support relevant academic and professional learning.' },
      { kind: 'cta', title: 'Let’s Discuss Your Learning Needs', text: 'Explore our programmes or contact us to discuss individual learning, team training or institutional support.', ctas: [{ label: 'Explore Programmes', to: '/programmes', tone: 'primary' }, { label: 'Contact Us', to: '/contact-us', tone: 'secondary' }] },
    ],
  },

  '/programmes': {
    title: 'Programmes',
    lede: 'Choose a pathway that matches your learning needs. Our programmes support academic readiness, workplace communication and career development. If you are unsure where to begin, contact us and we will help you explore the options.',
    photo: P.students,
    blocks: [
      {
        kind: 'cards', cols: 3,
        items: [
          {
            t: 'Academic Learning Platform (ALP)', tag: 'ALP',
            d: 'Develop academic English and the study skills needed for higher education. Explore pre-admission resources, the six-week transition programme and ongoing academic support.',
            facts: [
              ['Who it is for', 'Learners preparing for or already in higher education'],
              ['What you will learn', 'Academic English, study skills and UK higher education expectations'],
              ['Duration', 'Depends on your starting point; the transition programme runs for six weeks'],
              ['Learning format', 'Guided online learning on Moodle'],
              ['Support included', 'Varies by programme; see the programme page'],
              ['How to enquire', 'Ask About Academic Learning'],
            ],
            cta: { label: 'Explore ALP', to: alp },
          },
          {
            t: 'Corporate Training Services (CTS)', tag: 'CTS',
            d: 'Practical training for professionals and teams, with a focus on clear communication, confident participation and effective working relationships.',
            facts: [
              ['Who it is for', 'Professionals, managers, HR and Learning and Development teams'],
              ['What you will learn', 'Meetings, presentations, professional writing and working across cultures'],
              ['Duration', 'Confirmed in the proposal'],
              ['Learning format', 'Workshops and guided practice, with Moodle resources for your cohort'],
              ['Support included', 'Explained in your training package'],
              ['How to enquire', 'Discuss Team Training'],
            ],
            cta: { label: 'Explore CTS', to: cts },
          },
          {
            t: 'Academic Readiness Programme', tag: 'ARP',
            d: 'A focused two-week route for applicants preparing for an academic entry reassessment. Suitability and arrangements are confirmed before enrolment.',
            facts: [
              ['Who it is for', 'Applicants close to the required entry standard'],
              ['What you will learn', 'Listening, reading, writing, speaking and assessment literacy'],
              ['Duration', 'Two weeks'],
              ['Learning format', 'Session arrangements are confirmed before enrolment'],
              ['Support included', 'Practice and feedback'],
              ['How to enquire', 'Ask About the Programme'],
            ],
            cta: { label: 'Explore Academic Readiness', to: arp },
          },
        ],
      },
      { kind: 'cards', cols: 2, items: [{ t: 'Looking for ongoing help?', d: 'Visit Learner Support for orientation guidance, academic resources and information about tutor support.', cta: { label: 'Explore Learner Support', to: '/learner-support' } }] },
      { kind: 'cta', title: 'Not Sure Which Programme Is Right for You?', text: 'Tell us about your goals and starting point. We will help you identify a suitable pathway.', ctas: [{ label: 'Ask About a Programme', to: '/contact-us', tone: 'primary' }] },
    ],
  },

  [alp]: {
    title: 'Academic Learning Platform (ALP)',
    lede: 'Prepare for higher education and develop the skills you need throughout your studies. ALP brings academic English, study guidance and practical activities together in three connected areas of support.',
    ctas: [{ label: 'Ask About Academic Learning', to: '/contact-us', tone: 'primary' }, login],
    photo: P.grads,
    blocks: [
      { kind: 'split', title: 'Who It Is For', paras: ['Learners exploring or preparing for higher education; new students adapting to UK academic expectations; current students developing writing, research, presentation and study skills; and institutions seeking structured academic learning resources.'], photo: P.students },
      { kind: 'note', title: 'English for Academic Purposes', text: 'Academic English runs through the learning journey. You can practise understanding academic texts, organising ideas, writing clearly, following lectures and contributing to discussions.' },
      {
        kind: 'cards', title: 'Three Connected Phases', intro: 'You do not need to complete every phase. Your starting point depends on your needs and programme.', cols: 3,
        items: [
          { t: 'Pre-Admission Support', tag: 'Phase 1', d: 'Understand your options, explore UK higher education and prepare for the next stage of your application. Resources introduce academic expectations, study skills and academic vocabulary. Where required, assessment or diagnostics help identify suitable preparation and support.', cta: { label: 'Explore Pre-Admission Support', to: alp + '/pre-admission-support' } },
          { t: 'Six-Week Transition Programme', tag: 'Phase 2', d: 'Build confidence in the expectations of UK higher education through six structured weeks. Explore academic integrity, writing, research, critical thinking and presentations, alongside guidance on settling into study.', cta: { label: 'Explore the Six-Week Programme', to: alp + '/six-week-transition-programme' } },
          { t: 'Ongoing Learner Success Support', tag: 'Phase 3', d: 'Return to resources when you need help with writing, assignments, presentations, research, referencing or study skills. Use the topics that relate to your current needs and access the support included in your programme.', cta: { label: 'Explore Ongoing Support', to: alp + '/ongoing-learner-success-support' } },
        ],
      },
      { kind: 'steps', title: 'How You Learn', cols: 3, items: [{ t: 'Start with the guidance', d: 'Begin with the guidance for your learning area.' }, { t: 'Watch or read', d: 'Work through recorded guidance and reading materials.' }, { t: 'Complete practice activities', d: 'Use activities to apply what you have learned.' }, { t: 'Check your understanding', d: 'Quizzes show what you understand and what to revisit.' }, { t: 'Apply the learning', d: 'Use it on a relevant task.' }, { t: 'Review your next steps', d: 'See what you have completed and what comes next.' }] },
      { kind: 'cta', title: 'Ask About Academic Learning', text: 'Tell us your intended course or goal and we can suggest a suitable starting point.', ctas: [{ label: 'Ask About Academic Learning', to: '/contact-us', tone: 'primary' }, login] },
    ],
  },

  [alp + '/pre-admission-support']: {
    title: 'Pre-Admission Support',
    lede: 'Get a clearer picture of UK higher education and prepare for your next step. Explore welcome guidance, academic expectations, study skills and vocabulary resources before beginning your programme.',
    ctas: [{ label: 'Ask About Academic Learning', to: '/contact-us', tone: 'primary' }, { label: 'Back to ALP', to: alp, tone: 'secondary' }],
    photo: P.students,
    blocks: [
      { kind: 'cards', title: 'What You Can Explore', cols: 3, items: ['Welcome and Your Applicant Journey', 'Understanding UK Higher Education', 'Academic Skills', 'Academic Vocabulary', 'Learning Resources', 'Assessment and Readiness Guidance'].map((t) => ({ t })) },
      { kind: 'note', text: 'Where required, assessment or diagnostics help identify suitable preparation and support. Completing this phase does not guarantee admission.' },
      { kind: 'cta', title: 'Prepare for Your Next Step', ctas: [{ label: 'Ask About Academic Learning', to: '/contact-us', tone: 'primary' }, login] },
    ],
  },

  [alp + '/six-week-transition-programme']: {
    title: 'Six-Week Transition Programme',
    lede: 'Explore a new academic topic each week. Use the workshop or recorded guidance, reading materials and practice activities to build your understanding, then check what you have learned.',
    ctas: [{ label: 'Ask About Academic Learning', to: '/contact-us', tone: 'primary' }, { label: 'Back to ALP', to: alp, tone: 'secondary' }],
    photo: P.session,
    blocks: [
      {
        kind: 'steps', title: 'Your Six Weeks', cols: 3,
        items: [
          { k: 'Week 1', t: 'Understanding UK Higher Education', d: 'Learn how courses, timetables, independent study and academic support work, and plan your weekly study routine.' },
          { k: 'Week 2', t: 'Academic Integrity, Referencing and Ethical AI', d: 'Understand how to acknowledge sources, avoid plagiarism and follow your institution’s rules on AI use.' },
          { k: 'Week 3', t: 'Academic Writing', d: 'Interpret assignment instructions, organise paragraphs and improve the clarity of your writing.' },
          { k: 'Week 4', t: 'Research and Information Literacy', d: 'Develop search strategies, evaluate sources and keep useful research notes.' },
          { k: 'Week 5', t: 'Critical Thinking and Academic Discussion', d: 'Examine claims and evidence, compare viewpoints and practise contributing to academic discussions.' },
          { k: 'Week 6', t: 'Presentation Skills and Confidence', d: 'Plan a clear presentation, practise delivery and prepare to respond to questions.' },
        ],
      },
      { kind: 'cta', title: 'Build Confidence for UK Higher Education', ctas: [{ label: 'Ask About Academic Learning', to: '/contact-us', tone: 'primary' }, login] },
    ],
  },

  [alp + '/ongoing-learner-success-support']: {
    title: 'Ongoing Learner Success Support',
    lede: 'Find help with the academic tasks you are working on now. Explore writing and assignment guidance, presentation resources, research and referencing support, and practical study strategies.',
    ctas: [{ label: 'Ask About Academic Support', to: '/contact-us', tone: 'primary' }, { label: 'View Resources', to: '/learner-support', tone: 'secondary' }],
    photo: P.team,
    blocks: [
      { kind: 'cards', title: 'Topics You Can Use', cols: 4, items: ['Academic Writing', 'Assignment Support', 'Presentation Support', 'Understanding UK Higher Education', 'Academic Skills', 'Academic Vocabulary', 'Research and Referencing', 'Learning Resources'].map((t) => ({ t })) },
      { kind: 'cards', cols: 2, items: [{ t: 'Settling Into Study', d: 'Explore guidance on wellbeing, time management and adapting to a new academic environment.' }] },
      { kind: 'cta', title: 'Get Help With What You Are Working On', ctas: [{ label: 'View Resources', to: '/learner-support', tone: 'primary' }, { label: 'Ask About Academic Support', to: '/contact-us', tone: 'secondary' }] },
    ],
  },

  [cts]: {
    title: 'Corporate Training Services (CTS)',
    lede: 'Help your team communicate clearly and work confidently across roles and cultures. Our training focuses on practical situations, including meetings, presentations, professional writing and workplace relationships.',
    ctas: [{ label: 'Discuss Team Training', to: '/contact-us', tone: 'primary' }, login],
    photo: P.session,
    blocks: [
      { kind: 'split', title: 'Who It Is For', paras: ['Professionals developing communication skills; managers supporting their teams; organisations working across countries or cultures; customer-facing staff; and HR and Learning and Development teams planning staff development.'], photo: P.team },
      { kind: 'note', title: 'Professional Communication and Workplace Development', text: 'A practical programme for teams that want to strengthen confident communication, participation in meetings and understanding of workplace expectations.' },
      {
        kind: 'cards', title: 'Core Learning Topics', cols: 3,
        items: [
          { t: 'Speaking with Confidence', d: 'Organise your ideas and respond more clearly.' },
          { t: 'Meetings and Presentations', d: 'Contribute, explain your work and present with confidence.' },
          { t: 'Workplace Culture', d: 'Recognise expectations and communicate respectfully across cultures.' },
          { t: 'Vocabulary Development', d: 'Build useful habits for learning and applying workplace language.' },
          { t: 'Ethical AI Use', d: 'Use AI thoughtfully while retaining professional judgement and a human voice.' },
          { t: 'Applied Presentation', d: 'Bring your learning together in a practical presentation task.' },
        ],
      },
      { kind: 'note', title: 'Additional topic options', text: 'Explore leadership communication, stakeholder relationships, self-leadership, confidence and digital etiquette. Discuss the topics most relevant to your team when planning the programme.' },
      { kind: 'steps', title: 'How Training Works', cols: 3, items: [{ t: 'Discuss your team’s needs' }, { t: 'Agree priorities and delivery arrangements' }, { t: 'Take part in workshops and guided practice' }, { t: 'Apply skills to workplace tasks' }, { t: 'Review feedback and next steps' }] },
      {
        kind: 'cards', cols: 2,
        items: [
          { t: 'Moodle resources', d: 'Use the resources assigned to your cohort, including recorded guidance, reading materials, activities and quizzes. Platform access and tutor support are explained in your training package.' },
          { t: 'Programme information', d: 'Training is planned around agreed needs. Duration, group size, delivery format, learning resources and follow-up support are confirmed in the proposal.' },
        ],
      },
      { kind: 'cta', title: 'Let’s Discuss Your Team’s Development', text: 'Tell us about your team, the challenges they face and the outcomes you would like to work towards.', ctas: [{ label: 'Discuss Team Training', to: '/contact-us', tone: 'primary' }, login] },
    ],
  },

  [arp]: {
    title: 'Academic Readiness Programme',
    sub: 'Two-week preparation for academic entry reassessment',
    lede: 'If you have taken an academic entry assessment and need focused preparation before reassessment, this programme can help you understand the tasks and practise the skills you need. We review your starting point before confirming whether the programme is suitable.',
    ctas: [{ label: 'Ask About the Programme', to: '/contact-us', tone: 'primary' }, login],
    photo: P.students,
    blocks: [
      { kind: 'split', title: 'Who It Is For', paras: ['Applicants who are close to the required entry standard and would benefit from focused preparation. The programme is not a substitute for a longer language course where substantial language development is needed.'], photo: P.grads },
      {
        kind: 'cards', title: 'What You Will Practise', cols: 3,
        items: [
          { t: 'Listening', d: 'Identify key ideas and follow academic instructions.' },
          { t: 'Reading', d: 'Understand texts, locate information and interpret questions.' },
          { t: 'Writing', d: 'Plan and organise a clear response.' },
          { t: 'Speaking', d: 'Explain ideas and respond to questions.' },
          { t: 'Assessment literacy', d: 'Understand instructions, task types and assessment expectations.' },
          { t: 'Study planning', d: 'Manage practice time and identify priorities.' },
        ],
      },
      { kind: 'steps', title: 'Your Two Weeks', cols: 2, items: [{ k: 'Week 1', t: 'Understand Your Starting Point', d: 'Review feedback or diagnostic information, identify priorities and practise the skills and task types you need to develop.' }, { k: 'Week 2', t: 'Prepare for Reassessment', d: 'Complete further practice, review feedback and check your readiness for the next assessment.' }] },
      {
        kind: 'cards', cols: 2,
        items: [
          { t: 'Delivery and support', d: 'The planned duration is two weeks. Session arrangements, independent practice, speaking activities and feedback are confirmed before enrolment.' },
          { t: 'Progress and expectations', d: 'Practice and feedback help you understand your development and remaining priorities. Entry decisions and reassessment requirements remain with the receiving institution; completing this programme does not guarantee a pass or admission.' },
        ],
      },
      { kind: 'cta', title: 'Ask About Academic Readiness', text: 'Contact us with your intended course and any available assessment feedback so we can discuss a suitable next step.', ctas: [{ label: 'Ask About the Programme', to: '/contact-us', tone: 'primary' }, login] },
    ],
  },

  '/programmes/employability-and-professional-pathways': {
    title: 'Employability and Professional Pathways',
    lede: 'Prepare for your next career step with practical guidance on career planning, recruitment and workplace readiness. Explore activities that help you understand your strengths, communicate your experience and prepare for opportunities.',
    ctas: [{ label: 'Ask About Employability', to: '/contact-us', tone: 'primary' }, login],
    photo: P.team,
    blocks: [
      { kind: 'split', title: 'Who It Is For', paras: ['Learners preparing to enter employment, change roles or strengthen their professional profile, and students planning the move from education into work.'], photo: P.session },
      {
        kind: 'cards', title: 'Eight Topics', cols: 4,
        items: [
          { t: 'Career Goals and Skills Audit', d: 'Identify your strengths, development needs and career priorities.' },
          { t: 'Understanding UK Recruitment', d: 'Explore job adverts, person specifications and common recruitment stages.' },
          { t: 'CVs, Cover Letters and LinkedIn', d: 'Present your experience clearly and adapt your profile to relevant opportunities.' },
          { t: 'Interview Preparation', d: 'Prepare examples, structure answers and practise explaining your experience.' },
          { t: 'Workplace Communication', d: 'Practise clear professional messages and constructive workplace conversations.' },
          { t: 'Networking and Assessment Centres', d: 'Prepare introductions, build professional connections and explore common selection activities.' },
          { t: 'Your First 30 Days at Work', d: 'Understand expectations, ask useful questions and plan how to settle into a new role.' },
          { t: 'Professional Portfolio and Action Plan', d: 'Bring together evidence of your skills and identify practical next steps.' },
        ],
      },
      { kind: 'steps', title: 'How You Learn', cols: 2, items: [{ t: 'Read the guidance' }, { t: 'Complete activities' }, { t: 'Use the checklist' }, { t: 'Apply the learning to your own career plan' }] },
      { kind: 'cta', title: 'Plan Your Next Step', text: 'Explore the pathway or contact us to ask about access and available support.', ctas: [{ label: 'Ask About Employability', to: '/contact-us', tone: 'primary' }, login] },
    ],
  },

  '/learning-platform': {
    title: 'Your Learning Platform',
    lede: 'Moodle brings your programme resources together in one place. Find your learning area, follow the guidance and use activities to practise and check your understanding.',
    ctas: [{ label: 'Learner Login', href: LEARNER_LOGIN_URL, tone: 'primary' }],
    photo: P.students,
    blocks: [
      { kind: 'note', title: 'What you can find', text: 'Resources may include welcome guidance, recorded workshops, readings, practice activities, quizzes and checklists. The topics and support available depend on your programme and access permissions.' },
      {
        kind: 'steps', title: 'Five Steps to Get Started', cols: 3,
        items: [
          { t: 'Sign In', d: 'Use the Moodle link and account details provided when your access is arranged.' },
          { t: 'Find Your Programme', d: 'Open your assigned learning area and read the welcome guidance.' },
          { t: 'Follow the Topics', d: 'Work through the recommended sequence, or use the support resources relevant to your current needs.' },
          { t: 'Practise and Review', d: 'Complete activities, read feedback and revisit material where needed. Use completion indicators where available.' },
          { t: 'Ask for Support', d: 'Use the contact, forum or booking route included in your programme.' },
        ],
      },
      { kind: 'moodle', title: 'Take a Look Inside', intro: 'Explore three connected phases of support, weekly topics, practice and a view of your progress.', captions: [{ t: 'Academic Journey', d: 'Explore three connected phases of support.' }, { t: 'Weekly Topics', d: 'Find workshops, readings and activities.' }, { t: 'Practice and Quizzes', d: 'Check understanding and review feedback.' }, { t: 'Learning Progress', d: 'See activity completion where available.' }] },
      {
        kind: 'cards', cols: 3,
        items: [
          { t: 'Completion and certificates', d: 'Completion requirements and any certificate arrangements are explained within your programme. Check the relevant course guidance for assessment requirements and pass marks.' },
          { t: 'Use AI responsibly', d: 'Follow the guidance in your programme and your institution’s rules. Check information, acknowledge AI use where required and make sure your work reflects your own understanding.' },
          { t: 'Having trouble signing in?', d: 'Use the password reset option where available. If you still need help, contact us with your name and programme. Please do not send your password.', cta: { label: 'Get Login Help', to: '/contact-us' } },
        ],
      },
      { kind: 'cta', title: 'Already Enrolled?', text: 'Sign in to Moodle to access your programme resources and available support.', ctas: [{ label: 'Learner Login', href: LEARNER_LOGIN_URL, tone: 'primary' }] },
    ],
  },

  '/learner-support': {
    title: 'Learner Support',
    lede: 'Find guidance to help you get started, use your learning resources and stay organised. Choose the support area that matches your needs, or contact us if you are unsure where to begin.',
    ctas: [login, { label: 'Ask for Help', to: '/contact-us', tone: 'primary' }],
    photo: P.team,
    blocks: [
      {
        kind: 'cards', cols: 2,
        items: [
          { id: 'getting-started', t: 'Getting Started', d: 'Explore welcome guidance, learn how your programme is organised and find out how to use Moodle.', cta: { label: 'View Getting Started Guidance', to: '/learning-platform' } },
          { id: 'tutor-support', t: 'English Tutor Support', d: 'Find resources for academic English and information about contacting a tutor. Tutor access and session arrangements depend on your programme.', cta: { label: 'Explore Tutor Support', to: '/learner-support/english-tutor-support' } },
          { id: 'academic-support', t: 'Academic Learning Support', d: 'Explore guidance for writing, assignments, presentations, referencing, research and study skills.', cta: { label: 'View Academic Support', to: alp + '/ongoing-learner-success-support' } },
          { id: 'platform-help', t: 'Help Using the Platform', d: 'Get guidance on signing in, opening resources and completing activities. If a problem continues, contact us with the page or activity name and a brief description.', cta: { label: 'Get Platform Help', to: '/contact-us' } },
        ],
      },
      { kind: 'faq', title: 'Frequently Asked Questions', intro: 'Short answers to common questions. Your programme page and Moodle course guidance give the detail for your course.', items: allFaqs },
      { kind: 'cta', title: 'Need a Hand?', ctas: [{ label: 'Ask for Help', to: '/contact-us', tone: 'primary' }, login] },
    ],
  },

  '/learner-support/english-tutor-support': {
    title: 'English Tutor Support',
    lede: 'Develop your academic English with guided resources and practice. Use the material relevant to your current task and check how to access tutor support through your programme.',
    ctas: [login, { label: 'Ask for Help', to: '/contact-us', tone: 'primary' }],
    photo: P.session,
    blocks: [
      { kind: 'cards', title: 'Tutor Topics', cols: 3, items: ['Academic Writing', 'Reading and Vocabulary', 'Listening and Note-Taking', 'Speaking and Presentations', 'Independent Study Strategies'].map((t) => ({ t })) },
      {
        kind: 'cards', cols: 3,
        items: [
          { t: 'Contacting a tutor', d: 'Use the tutor contact or booking option provided in your Moodle course. Include your programme, the topic you need help with and a short explanation of your question.' },
          { t: 'Preparing for support', d: 'Review the relevant resources first. Prepare specific questions and bring your draft, task instructions or notes where appropriate.' },
          { t: 'Support boundaries', d: 'Tutors help you develop your own understanding and skills. You remain responsible for your work and for following your institution’s academic integrity rules.' },
        ],
      },
      { kind: 'cta', title: 'Ready to Ask?', ctas: [login, { label: 'Ask for Help', to: '/contact-us', tone: 'primary' }] },
    ],
  },

  '/contact-us': {
    title: 'Contact City Language Hub',
    lede: 'Tell us about your learning goals or your organisation’s training needs. We can explain the available options and help you identify a suitable next step.',
    photo: P.team,
    blocks: [
      { kind: 'form' },
      { kind: 'cta', title: 'Already Learning With Us?', text: 'Sign in to Moodle to access your resources. For help, include your programme and a brief description of the issue.', ctas: [{ label: 'Learner Login', href: LEARNER_LOGIN_URL, tone: 'primary' }, { label: 'Get Support', to: '/learner-support', tone: 'secondary' }] },
    ],
  },

  '/careers': {
    title: 'Careers at City Language Hub',
    lede: 'Interested in supporting academic learning or professional development? Explore our advertised opportunities and follow the application instructions for each role.',
    photo: P.session,
    blocks: [
      { kind: 'note', title: 'Current vacancies', text: 'There are no advertised vacancies at present. Please check this page for future opportunities.' },
      { kind: 'cta', title: 'Want to Know More About Us?', ctas: [{ label: 'About Us', to: '/about-us', tone: 'primary' }, { label: 'Contact Us', to: '/contact-us', tone: 'secondary' }] },
    ],
  },

  '/privacy-notice': {
    title: 'Privacy Notice',
    lede: 'This notice explains how City Language School uses personal data when you visit our website, contact us or use our learning services. It describes the information we collect, why we use it, who it may be shared with and how you can contact us about your rights.',
    blocks: [{ kind: 'legal', headings: ['Who We Are', 'Information We Collect', 'How We Use Your Information', 'Our Reasons for Using Personal Data', 'Who We Share Information With', 'International Transfers', 'How Long We Keep Information', 'Your Rights', 'Contacting Us', 'Changes to This Notice'], note: 'Last updated: to be confirmed. Contact: to be confirmed.' }],
  },
  '/cookie-policy': {
    title: 'Cookie Policy',
    lede: 'This page explains how cookies and similar technologies are used on our website and how you can manage your choices.',
    blocks: [{ kind: 'legal', headings: ['What Cookies Are', 'Necessary Cookies', 'Optional Cookies', 'Cookie Details and Duration', 'Managing Your Choices', 'Contact Us'], note: 'Last updated: to be confirmed. Contact: to be confirmed.' }],
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions',
    lede: 'These terms explain the conditions that apply to the use of this website and our programmes. Please read them before using the relevant services. Contact us if you need help understanding them.',
    blocks: [{ kind: 'legal', headings: ['Provider Details', 'Programme Information', 'Enrolment and Access', 'Fees and Payment', 'Cancellations and Refunds', 'Changes to Delivery', 'Learner Responsibilities', 'Acceptable Platform Use', 'Learning Materials', 'Assessment and Certificates', 'Complaints', 'Applicable Law'], note: 'Last updated: to be confirmed. Contact: to be confirmed.' }],
  },
}

export const NOT_FOUND: Page = {
  title: 'We Could Not Find That Page',
  lede: 'The page may have moved. Explore our programmes or return to the homepage.',
  ctas: [{ label: 'Home', to: '/', tone: 'primary' }, { label: 'Explore Programmes', to: '/programmes', tone: 'secondary' }],
  blocks: [],
}
