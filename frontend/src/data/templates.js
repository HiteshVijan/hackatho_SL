// Pre-built program templates for quick starts
export const PROGRAM_TEMPLATES = [
  {
    id: 'fln',
    name: 'Foundational Literacy & Numeracy',
    description: 'A program focused on improving reading and math skills for early grade students',
    icon: '📚',
    category: 'Learning Outcomes',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    popularity: 95,
    data: {
      problemStatement: 'Students in Grades 1-3 are not achieving grade-appropriate literacy and numeracy levels. National assessments show that only 30% of Grade 3 students can read a simple paragraph and only 25% can perform basic subtraction.',
      context: 'Post-pandemic learning loss has exacerbated existing gaps. Teachers lack training in FLN pedagogy. Classrooms have mixed-ability groups with no differentiated instruction. Parents are not engaged in supporting learning at home.',
      scope: '500 government primary schools across 10 blocks in 2 districts. Targeting 25,000 students in Grades 1-3 and 1,500 teachers.',
      targetBeneficiaries: 'Primary: Students in Grades 1-3\nSecondary: Teachers of early grades\nTertiary: Parents, school leaders, cluster resource coordinators',
      primaryOutcomes: '1. 80% of Grade 3 students achieve grade-appropriate reading fluency (45+ words per minute)\n2. 75% of Grade 3 students can solve 2-digit addition and subtraction problems\n3. 50% reduction in students at "beginner" level on state assessments',
      secondaryOutcomes: '1. Teachers demonstrate improved FLN teaching practices\n2. Increased parent involvement in supporting learning at home\n3. School-level tracking of student progress becomes routine',
      indicators: 'Student: Oral reading fluency (words per minute), ASER-style reading and math levels\nTeacher: Classroom observation scores on FLN practices\nSystem: % of schools with functioning FLN corners, tracking sheets',
      programName: 'Foundational Literacy & Numeracy Excellence Program'
    }
  },
  {
    id: 'teacher-pd',
    name: 'Teacher Professional Development',
    description: 'Continuous professional learning program for government school teachers',
    icon: '👩‍🏫',
    category: 'Capacity Building',
    difficulty: 'Intermediate',
    estimatedTime: '20 min',
    popularity: 88,
    data: {
      problemStatement: 'Teacher professional development is infrequent, generic, and disconnected from classroom practice. Annual 5-day workshops fail to change teaching behaviors. Teachers lack ongoing support and peer learning opportunities.',
      context: 'State has 50,000 teachers across 8,000 schools. DIETs conduct training but have limited capacity. CRPs are overburdened with administrative tasks. No structured mentoring or coaching exists.',
      scope: '8,000 teachers in 1,500 schools across 5 districts. Focus on upper primary (Grades 6-8) science and math teachers.',
      targetBeneficiaries: 'Primary: Government school teachers (Grades 6-8)\nSecondary: DIETs, CRPs, Block Education Officers\nTertiary: Students who benefit from improved teaching',
      primaryOutcomes: '1. 70% of teachers demonstrate improved classroom practices (observation scores)\n2. 80% of teachers report increased confidence in subject pedagogy\n3. Teacher attendance and engagement in schools improves by 15%',
      secondaryOutcomes: '1. DIETs develop capacity to run continuous PD programs\n2. Peer learning communities become self-sustaining\n3. CRPs shift from inspection to coaching role',
      indicators: 'Practice adoption: Monthly classroom observation scores\nEngagement: PLC attendance, online module completion\nOutcomes: Student learning assessments in science/math',
      programName: 'Teacher Excellence Through Continuous Learning'
    }
  },
  {
    id: 'school-leadership',
    name: 'School Leadership Development',
    description: 'Building instructional leadership capacity of school principals',
    icon: '🎓',
    category: 'Leadership',
    difficulty: 'Advanced',
    estimatedTime: '25 min',
    popularity: 82,
    data: {
      problemStatement: 'School principals focus primarily on administrative tasks and lack skills in instructional leadership. They rarely conduct classroom observations, provide teacher feedback, or use data for school improvement decisions.',
      context: 'Most principals are promoted based on seniority without leadership training. NIEPA\'s school leadership programs reach few principals. No ongoing support structure exists for principals.',
      scope: '500 government secondary school principals across 3 districts. Schools have average enrollment of 300+ students.',
      targetBeneficiaries: 'Primary: School principals/headmasters\nSecondary: Vice-principals, senior teachers\nTertiary: Teachers who receive better support, students',
      primaryOutcomes: '1. 80% of principals conduct weekly classroom observations\n2. 70% of schools have functioning School Improvement Plans\n3. Teacher satisfaction with principal support increases by 40%',
      secondaryOutcomes: '1. Student attendance improves by 10%\n2. Learning outcomes improve in schools with strong leadership\n3. Principal peer networks become self-sustaining',
      indicators: 'Leadership practices: Monthly self-assessment + external observation\nSchool climate: Teacher and student surveys\nStudent outcomes: Attendance, learning assessments',
      programName: 'Principals as Instructional Leaders'
    }
  },
  {
    id: 'community-engagement',
    name: 'Community & Parent Engagement',
    description: 'Strengthening school-community connections for improved education outcomes',
    icon: '👨‍👩‍👧‍👦',
    category: 'Community',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    popularity: 76,
    data: {
      problemStatement: 'School Management Committees (SMCs) exist on paper but are non-functional. Parents are disengaged from their children\'s education. Community resources and support for schools remain untapped.',
      context: 'Rural communities where education is not prioritized. Low literacy among parents. Schools seen as government responsibility, not community asset. Weak communication between schools and families.',
      scope: '1,000 government schools in 20 rural blocks across 4 districts. Focus on elementary schools (Grades 1-8).',
      targetBeneficiaries: 'Primary: Parents and SMC members\nSecondary: School principals, teachers\nTertiary: Students who benefit from increased support',
      primaryOutcomes: '1. 80% of SMCs meet monthly with documented action items\n2. Parent attendance at school events increases by 50%\n3. 60% of parents engage in learning support at home weekly',
      secondaryOutcomes: '1. School infrastructure improves through community contributions\n2. Teacher accountability increases with parent involvement\n3. Student attendance and retention improve',
      indicators: 'SMC functioning: Meeting frequency, attendance, action completion\nParent engagement: Event participation, home learning surveys\nSchool improvement: Infrastructure checklist, enrollment/retention data',
      programName: 'Schools and Communities Together (SACT)'
    }
  },
  {
    id: 'digital-learning',
    name: 'Digital Learning Integration',
    description: 'Leveraging technology to enhance classroom learning and student outcomes',
    icon: '💻',
    category: 'EdTech',
    difficulty: 'Intermediate',
    estimatedTime: '20 min',
    popularity: 91,
    data: {
      problemStatement: 'Schools have received devices and content but teachers lack skills to integrate technology effectively. Digital resources are underutilized. Students lack digital literacy skills needed for 21st century.',
      context: 'Government has distributed tablets/laptops to schools. Internet connectivity is available in 60% of schools. Content platforms like DIKSHA exist but adoption is low. Teachers are digital immigrants.',
      scope: '2,000 secondary schools across 8 districts. Focus on Grades 9-12 students and their teachers.',
      targetBeneficiaries: 'Primary: Students in Grades 9-12\nSecondary: Teachers of all subjects\nTertiary: School leaders, district education officers',
      primaryOutcomes: '1. 70% of teachers integrate digital tools in weekly lessons\n2. Students demonstrate improved digital literacy scores by 50%\n3. 80% of students access digital learning resources independently',
      secondaryOutcomes: '1. Teacher comfort with technology increases significantly\n2. Schools develop sustainable device maintenance practices\n3. Student engagement and attendance improve',
      indicators: 'Usage metrics: Device usage hours, content accessed\nSkills: Digital literacy assessments for students and teachers\nOutcomes: Learning assessments in core subjects',
      programName: 'Digital Classroom Transformation Initiative'
    }
  },
  {
    id: 'girl-education',
    name: 'Girls\' Education & Empowerment',
    description: 'Addressing barriers to girls\' education and promoting gender equity in schools',
    icon: '👧',
    category: 'Equity',
    difficulty: 'Intermediate',
    estimatedTime: '20 min',
    popularity: 87,
    data: {
      problemStatement: 'Girls face multiple barriers to education: early dropout, safety concerns, lack of sanitation facilities, gender stereotypes, and limited career aspirations. Gender gap widens significantly in secondary education.',
      context: 'District has 40% female literacy rate. Many girls drop out after Grade 8. Schools lack functional toilets. Child marriage remains prevalent. Few female teachers as role models.',
      scope: '800 schools in 15 blocks across 3 districts. Focus on girls in Grades 6-12 and their families.',
      targetBeneficiaries: 'Primary: Girls in Grades 6-12\nSecondary: Parents, especially mothers\nTertiary: Male students, teachers, community members',
      primaryOutcomes: '1. Girls\' retention rate in secondary school improves by 30%\n2. 80% of girls report feeling safe at school\n3. Girls\' learning outcomes equal or exceed boys in all subjects',
      secondaryOutcomes: '1. Community attitudes toward girls\' education improve\n2. More girls aspire to non-traditional careers\n3. Schools become more gender-responsive',
      indicators: 'Access: Enrollment, attendance, transition rates by gender\nSafety: School safety audits, student perception surveys\nAchievement: Learning assessments disaggregated by gender',
      programName: 'Udaan: Girls Rise Through Education'
    }
  },
  {
    id: 'stem-education',
    name: 'STEM Education Enhancement',
    description: 'Improving science, technology, engineering and math education quality',
    icon: '🔬',
    category: 'Learning Outcomes',
    difficulty: 'Advanced',
    estimatedTime: '25 min',
    popularity: 79,
    data: {
      problemStatement: 'STEM education is theory-focused with minimal hands-on learning. Science labs are non-functional. Math is taught through rote memorization. Students lack problem-solving and inquiry skills.',
      context: 'National curriculum emphasizes STEM but implementation is weak. Teachers lack confidence in conducting experiments. Equipment is unused or broken. Career guidance in STEM fields is absent.',
      scope: '600 secondary schools with science streams across 5 districts. Focus on Grades 9-12 students.',
      targetBeneficiaries: 'Primary: Students in Grades 9-12 taking science/math\nSecondary: Science and math teachers\nTertiary: Lab assistants, school leaders',
      primaryOutcomes: '1. 75% of students demonstrate improved inquiry and problem-solving skills\n2. Science practical exam scores improve by 40%\n3. 50% increase in students pursuing STEM in higher education',
      secondaryOutcomes: '1. Teachers adopt inquiry-based pedagogy\n2. Science labs become fully functional\n3. Students develop interest in STEM careers',
      indicators: 'Skills: Inquiry skill assessments, practical exam scores\nEngagement: Lab usage logs, science fair participation\nAspirations: Career interest surveys, higher education choices',
      programName: 'STEM Excellence for Future Innovators'
    }
  },
  {
    id: 'inclusive-education',
    name: 'Inclusive Education Program',
    description: 'Ensuring quality education for children with special needs in regular schools',
    icon: '♿',
    category: 'Equity',
    difficulty: 'Advanced',
    estimatedTime: '25 min',
    popularity: 73,
    data: {
      problemStatement: 'Children with disabilities are often excluded from mainstream schools. Teachers lack training in inclusive pedagogy. Schools lack accessibility infrastructure. No individualized support exists.',
      context: '3% of children have identified disabilities. Most special needs children are out of school. Regular teachers have no exposure to inclusive practices. Resource rooms and support staff are absent.',
      scope: '400 schools across 4 districts. Focus on schools with existing CWSN enrollment and cluster resource centers.',
      targetBeneficiaries: 'Primary: Children with special needs (CWSN)\nSecondary: Regular classroom teachers\nTertiary: Parents of CWSN, other students, resource teachers',
      primaryOutcomes: '1. CWSN enrollment and retention increases by 50%\n2. 80% of teachers can implement basic differentiated instruction\n3. CWSN show measurable learning progress on individualized goals',
      secondaryOutcomes: '1. Stigma and discrimination reduce in schools\n2. Parents become active partners in education\n3. Schools become more accessible and inclusive',
      indicators: 'Access: CWSN enrollment, attendance, retention\nQuality: IEP completion, learning progress assessments\nInclusion: School accessibility audits, peer interaction observations',
      programName: 'Every Child Learns: Inclusive Schools Initiative'
    }
  }
]

export const TEMPLATE_CATEGORIES = [
  { id: 'all', name: 'All Templates', icon: '📋' },
  { id: 'Learning Outcomes', name: 'Learning Outcomes', icon: '📚' },
  { id: 'Capacity Building', name: 'Capacity Building', icon: '👩‍🏫' },
  { id: 'Leadership', name: 'Leadership', icon: '🎓' },
  { id: 'Community', name: 'Community', icon: '👨‍👩‍👧‍👦' },
  { id: 'EdTech', name: 'EdTech', icon: '💻' },
  { id: 'Equity', name: 'Equity & Inclusion', icon: '🤝' }
]
