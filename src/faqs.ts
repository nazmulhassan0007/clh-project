export type FaqItem = { q: string; a: string }

export const allFaqs: FaqItem[] = [
  { q: 'What is City Language Hub?', a: 'We provide academic learning, professional communication and workplace development support, with guided online resources and programme-specific support.' },
  { q: 'Which programme should I choose?', a: 'Choose ALP for academic learning, CTS for workplace development, or Employability and Professional Pathways for career preparation. Contact us if you would like help choosing.' },
  { q: 'What is the difference between the two academic routes?', a: 'The six-week transition programme introduces the expectations and skills needed for UK higher education. The two-week academic readiness route provides focused preparation for entry reassessment, subject to suitability.' },
  { q: 'Can I study online?', a: 'Online resources are available through Moodle for the learning areas you can access. Live sessions and other delivery arrangements are explained in your programme information.' },
  { q: 'Do I receive tutor support?', a: 'Tutor support varies by programme. Check your course guidance or contact us to confirm what is included.' },
  { q: 'Can I choose the resources I need?', a: 'Some courses follow a set sequence. Ongoing support areas can be used according to your needs. Read the guidance in your learning area before starting.' },
  { q: 'How do I access Moodle?', a: 'Use the Learner Login button and sign in with the account details provided when your access is arranged.' },
  { q: 'How can I track my progress?', a: 'Completion indicators and activity feedback are available in relevant courses. Your programme explains any required tasks or assessments.' },
  { q: 'Will I receive a certificate?', a: 'Certificate availability and completion requirements depend on the programme. Read the course guidance or ask us before enrolling.' },
  { q: 'Can employers arrange team training?', a: 'Yes. Contact us with your team size, learning priorities and preferred arrangements so we can discuss a suitable proposal.' },
  { q: 'Can I use AI during learning?', a: 'Follow your programme guidance and any institutional rules. Use AI to support learning where permitted, check its output and retain responsibility for your work.' },
  { q: 'Where can I get help?', a: 'Use the support route shown in your Moodle programme or contact City Language Hub. Include enough detail for us to understand your question.' },
]

export const homeFaqs: FaqItem[] = [allFaqs[0], allFaqs[1], allFaqs[2], allFaqs[3], allFaqs[4], allFaqs[9]]
