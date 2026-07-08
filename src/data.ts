import { Program, Trainer, MembershipTier, GalleryItem, Transformation, Testimonial, Article, FAQItem, Tip } from './types';

export const programsData: Program[] = [
  {
    id: 'strength',
    title: 'Strength Training',
    iconName: 'Dumbbell',
    description: 'Build robust raw power and enhance bone density using free weights, compound lifts, and progressive overload under expert guidance.',
    duration: '45-60 mins',
    intensity: 'Intermediate',
    benefits: ['Increase muscle mass', 'Enhance metabolic rate', 'Support joint health']
  },
  {
    id: 'hiit',
    title: 'HIIT Training',
    iconName: 'Flame',
    description: 'High-Intensity Interval Training designed to spike your heart rate and maximize calorie burn during and long after your session.',
    duration: '30-45 mins',
    intensity: 'Advanced',
    benefits: ['Rapid cardiovascular boost', 'Exceptional calorie deficit', 'Time-efficient workouts']
  },
  {
    id: 'cardio',
    title: 'Cardio Fitness',
    iconName: 'HeartPulse',
    description: 'Condition your cardiovascular system with variable pacing on top-tier treadmill, elliptical, and rowing technologies.',
    duration: '45 mins',
    intensity: 'Beginner',
    benefits: ['Improve lung capacity', 'Boost daily endurance', 'Support heart longevity']
  },
  {
    id: 'boxing',
    title: 'Boxing Fitness',
    iconName: 'Zap',
    description: 'Combine rapid hand-eye coordination drills with heavy bag training and core conditioning to unleash your inner fighter.',
    duration: '50 mins',
    intensity: 'Intermediate',
    benefits: ['Relieve mental stress', 'Sculpt upper body & core', 'Sharpen agility & reflexes']
  },
  {
    id: 'fat-loss',
    title: 'Fat Loss Program',
    iconName: 'TrendingDown',
    description: 'A scientifically structured combination of targeted resistance workouts, continuous cardio, and strict nutrition tracking.',
    duration: '60 mins',
    intensity: 'All Levels',
    benefits: ['Sustainable weight reduction', 'Accelerate overall metabolism', 'Tone muscular silhouette']
  },
  {
    id: 'muscle',
    title: 'Muscle Building',
    iconName: 'Sparkles',
    description: 'Hypertrophy-focused training programs emphasizing perfect eccentric control, specific high-volume sets, and localized pump.',
    duration: '60 mins',
    intensity: 'Intermediate',
    benefits: ['Symmetrical muscle hypertrophy', 'Increase muscular endurance', 'Maximize strength leverage']
  },
  {
    id: 'yoga',
    title: 'Yoga',
    iconName: 'Leaf',
    description: 'Calm your mind and lengthen tight muscle fibers with fluid Vinyasa flow, deep breathing exercises, and static balance holds.',
    duration: '60 mins',
    intensity: 'All Levels',
    benefits: ['Incredible flexibility', 'Correct postural imbalances', 'Mental clarity and calm']
  },
  {
    id: 'functional',
    title: 'Functional Training',
    iconName: 'Activity',
    description: 'Movements designed to mirror everyday activities, strengthening core stabilizers, physical balance, and multi-planar mobility.',
    duration: '45 mins',
    intensity: 'Beginner',
    benefits: ['Enhanced body awareness', 'Injury prevention structure', 'Total-body multi-joint strength']
  },
  {
    id: 'cycling',
    title: 'Indoor Cycling',
    iconName: 'Bike',
    description: 'Immersive rhythmic cycling classes set to high-energy playlists with variable resistances and interval hill-climbs.',
    duration: '45 mins',
    intensity: 'Intermediate',
    benefits: ['High lower-body power', 'Low-impact joint cardio', 'Intense endurance building']
  },
  {
    id: 'crossfit',
    title: 'CrossFit',
    iconName: 'ShieldAlert',
    description: 'Constantly varied, high-intensity functional movements incorporating Olympic weightlifting, gymnastics, and metabolic conditioning.',
    duration: '60 mins',
    intensity: 'Advanced',
    benefits: ['Unrivaled overall fitness', 'High functional capacity', 'Strong community camaraderie']
  },
  {
    id: 'womens-fitness',
    title: "Women's Fitness",
    iconName: 'UserRound',
    description: 'Specialized strength, core, and metabolic conditioning targeting hormone balance, bone density, and lean body sculpting.',
    duration: '50 mins',
    intensity: 'All Levels',
    benefits: ['Strengthen pelvic/glute chain', 'Tone and firm muscle tissue', 'Empowering workout environment']
  },
  {
    id: 'senior-fitness',
    title: 'Senior Citizen Fitness',
    iconName: 'Heart',
    description: 'Gentle mobility workouts focusing on preserving joints, improving functional range of motion, and building stability against falls.',
    duration: '40 mins',
    intensity: 'Beginner',
    benefits: ['Improve joint lubrication', 'Build secure daily balance', 'Social community engagement']
  },
  {
    id: 'teen-fitness',
    title: 'Teen Fitness',
    iconName: 'Swords',
    description: 'Safe, foundational posture habits, strength techniques, and aerobic games to set a positive, lifetime attitude toward health.',
    duration: '45 mins',
    intensity: 'Beginner',
    benefits: ['Build motor-control basics', 'Foster screen-free activity', 'Increase teen confidence']
  },
  {
    id: 'athlete',
    title: 'Athlete Conditioning',
    iconName: 'Trophy',
    description: 'Sport-specific speed, explosive vertical power, lateral agility metrics, and reaction coaching for competitive elite performance.',
    duration: '75 mins',
    intensity: 'Advanced',
    benefits: ['Peak reaction parameters', 'Maximum rotational torque', 'Injury resistance conditioning']
  }
];

export const membershipData: MembershipTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '999',
    period: 'month',
    description: 'Excellent introduction for beginners committed to launching their fitness journey.',
    features: [
      'Standard Gym Floor Access',
      'High-speed locker rooms',
      'Complimentary initial fitness assessment',
      'Access to standard cardio equipment',
      'Water station hydration benefits'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '1999',
    period: 'month',
    description: 'The sweet-spot plan for regular gym-goers wanting diverse class formats and coaching.',
    features: [
      'Full Gym & Cardio floor access',
      'Full-body HIIT & group classes',
      'Comprehensive starter Nutrition guide',
      'Steam bath & sauna room amenities',
      'Bi-weekly trainer check-ins',
      'Locker storage & shower setup'
    ],
    isPopular: true
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '3499',
    period: 'month',
    description: 'The absolute luxury tier offering 1-on-1 focus and unrestricted premium facilities.',
    features: [
      'Unlimited 24/7 Access to all facility areas',
      'Dedicated personal trainer (2 sessions/week)',
      'Custom macro-based diet & consultation plans',
      'Unlimited steam, sauna, & towels access',
      'Priority customer & booking support',
      'Access to premium recovery lounge',
      'Complimentary Karnataka Gym custom bottle & t-shirt'
    ]
  }
];

export const trainersData: Trainer[] = [
  {
    id: 'trainer-1',
    name: 'Vikram Gowda',
    role: 'Head Strength Coach & CrossFit Specialist',
    experience: '9+ Years',
    specialization: ['Olympic Weightlifting', 'CrossFit Level 2', 'Hypertrophy'],
    bio: 'Former regional state powerlifter dedicated to teaching absolute mechanical safety and maximum power transfer. Vikram ensures your posture matches your strength goals.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80',
    socials: {
      instagram: 'https://instagram.com/vikram_gowda_fit',
      facebook: 'https://facebook.com/vikram.gowda',
      twitter: 'https://twitter.com/vikramgowda'
    }
  },
  {
    id: 'trainer-2',
    name: 'Anjali Sharma',
    role: 'Nutrition Advisor & Pilates Lead',
    experience: '7+ Years',
    specialization: ['Keto/Macro nutrition', 'Pre/Post-natal fitness', 'Flexibility'],
    bio: 'Believes in high food-satisfaction paired with scientific energy balances. Anjali matches her training with exact nutrition mapping to guarantee real visible results.',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=600&q=80',
    socials: {
      instagram: 'https://instagram.com/anjali_nutritionist',
      facebook: 'https://facebook.com/anjali.sharma'
    }
  },
  {
    id: 'trainer-3',
    name: 'Rohan Deshmukh',
    role: 'HIIT & Boxing Specialist',
    experience: '6+ Years',
    specialization: ['Agility Drills', 'Stress mitigation', 'Muay Thai basics'],
    bio: 'High energy coach who turns exhaustion into motivation. Rohan brings explosive rhythm and physical defense drills to supercharge your metabolic burn.',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?auto=format&fit=crop&w=600&q=80',
    socials: {
      instagram: 'https://instagram.com/rohan_kickboxing',
      twitter: 'https://twitter.com/rohanfit'
    }
  },
  {
    id: 'trainer-4',
    name: 'Priyanka Sen',
    role: 'Cardio Specialist & Women\'s Coach',
    experience: '8+ Years',
    specialization: ['Cardiorespiratory progression', 'Endurance pacing', 'TRX training'],
    bio: 'A certified marathoner who believes cardiorespiratory longevity is the highest form of physical wealth. Priyanka coaches with structured progressive goals.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=80',
    socials: {
      instagram: 'https://instagram.com/priyaka_sen_athlete',
      facebook: 'https://facebook.com/priyanka.sen'
    }
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Advanced Imported Weight Arena',
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g2',
    title: 'Cardio Row and Treadmill Zone',
    category: 'workouts',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g3',
    title: 'Luxury Locker & Steam Facility',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g4',
    title: 'Functional HIIT Group Session',
    category: 'workouts',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g5',
    title: 'Powerlifting Olympic Platform',
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g6',
    title: 'Annual Karnataka Gym Championship',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g7',
    title: 'Yoga and Mindfulness Sanctuary',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g8',
    title: 'Outdoor Conditioning Camp',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g9',
    title: 'Transformation Story - Sharath K.',
    category: 'transformations',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80'
  }
];

export const transformationsData: Transformation[] = [
  {
    id: 't-1',
    name: 'Sharath Kumar',
    beforeImg: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=400&q=80',
    afterImg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
    beforeWeight: '94 kg',
    afterWeight: '78 kg',
    muscleGained: '+3.5 kg',
    fatReduced: '-18%',
    duration: '6 Months'
  },
  {
    id: 't-2',
    name: 'Meghana Rao',
    beforeImg: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=400&q=80',
    afterImg: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=400&q=80',
    beforeWeight: '72 kg',
    afterWeight: '59 kg',
    muscleGained: '+2.0 kg',
    fatReduced: '-14%',
    duration: '4 Months'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'r-1',
    name: 'Ramesh Krishnan',
    rating: 5,
    role: 'IT Consultant',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    review: 'Karnataka Gym has totally changed my weekly routine. The trainers vikram and anjali custom designed a program for my back pain. Six months in, I am entirely pain-free and stronger than ever!'
  },
  {
    id: 'r-2',
    name: 'Suhasini Gowda',
    rating: 5,
    role: 'UI Designer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    review: 'Absolutely outstanding facilities. The premium imported weight section is pristine, and the steam rooms feel like a luxury spa. Getting personal diet advising completely dialed-in my results!'
  },
  {
    id: 'r-3',
    name: 'Kiran Joseph',
    rating: 5,
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    review: 'I joined the HIIT classes and Boxing program under Rohan. The community spirit is highly contagious. I went from struggling with a simple 3km run to comfortably deadlifting 140kg!'
  },
  {
    id: 'r-4',
    name: 'Archana Patil',
    rating: 4.8,
    role: 'Homemaker',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    review: 'The coaches are extremely patient and emphasize proper joint safety over heavy lift counts. The custom locker security and cleanliness standards are top-notch in Bengaluru.'
  },
  {
    id: 'r-5',
    name: 'Mohammed Ali',
    rating: 5,
    role: 'State Level Cricket Athlete',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    review: 'Perfect athlete conditioning platform. The dynamic multi-planar equipment and explosive turf tracks give me the edge in reaction and sprint speed. A highly motivating hub.'
  }
];

export const articlesData: Article[] = [
  {
    id: 'blog-1',
    title: 'Best Dynamic Workout Routines for True Beginners',
    category: 'Training',
    excerpt: 'Starting a workout can feel overwhelming. Learn how compound movements and simple progressive overload set a solid life-long baseline.',
    content: `When first stepping onto a gym floor, the sheer variety of machines can be overwhelming. The secret to long-term physical success is simple: prioritize functional compound lifts and master movement mechanics before loading weight.

    1. The Foundational Compound Lifts:
    Focus your first 4-6 weeks around movements that target multiple joints at once. Squats, overhead presses, chest presses, and high-cable rows engage maximum muscle fiber, speeding up metabolic rates and stabilizing stabilizer muscles.

    2. Perfecting progressive Overload:
    You don't need to lift heavier on every single gym visit. Focus instead on performing more reps with pristine posture, or decreasing resting intervals from 90 seconds to 60 seconds.

    3. Frequency and Scheduling:
    Aim for 3 full-body training sessions per week. Giving muscles 48 hours to recover is where growth actually occurs. Follow this with balanced hydration and watch your strength parameters soar.`,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    readTime: '5 mins read',
    date: 'Jul 2, 2026',
    author: 'Vikram Gowda'
  },
  {
    id: 'blog-2',
    title: 'The Real Science of How HIIT Training Burns Stubborn Fat',
    category: 'Fat Loss',
    excerpt: 'Explore the physiological mechanism of Excess Post-exercise Oxygen Consumption (EPOC) and why short interval bursts work magic.',
    content: `Many people spend hours on low-intensity treadmill jogs without seeing core shifts. HIIT training (High-Intensity Interval Training) triggers a deep metabolic cascade that converts your resting hours into fat-burning hours.

    What is EPOC?
    When you perform explosive HIIT rounds (e.g., 30 seconds of maximal sprints followed by 30 seconds of active recovery), you push your heart rate into anaerobic zones. This creates a physiological "oxygen debt".
    
    To recover, your system must work overtime for up to 24-36 hours post-workout to restore oxygen levels, clear lactate, and synthesize energy reserves. This metabolic state burns premium fuel, specifically stored lipids.

    How to structure a standard HIIT session:
    - 5 Minutes: Warm-up mobility drills.
    - 15-20 Minutes: 10 working intervals of a 1:1 or 1:2 work-to-rest ratio (e.g., intense rowing, assault bike, kettlebell swings).
    - 5 Minutes: Gradual cool-down stretching.

    Keep HIIT sessions to a maximum of 3 times per week to ensure central nervous system fatigue doesn't block your fat-loss parameters.`,
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80',
    readTime: '6 mins read',
    date: 'Jun 28, 2026',
    author: 'Rohan Deshmukh'
  },
  {
    id: 'blog-3',
    title: 'Muscle Building Secrets: Nutrition and Sleep Metrics',
    category: 'Nutrition',
    excerpt: 'Muscles are torn in the gym, fed in the kitchen, and repaired during sleep. Discover the exact hypertrophy parameters.',
    content: `True muscle hypertrophy is not just about the weight on the bar. Hypertrophy requires a precise intersection of metabolic stress, mechanical tension, and anabolic nutrition rest.

    The Protein Synthesis Window:
    To build physical muscle, your body must maintain a positive muscle protein balance. Aim for 1.6g to 2.2g of high-quality protein per kilogram of body weight, distributed evenly across 4 daily meals to trigger muscle synthesis continuously.

    The Crucial Role of Stage 4 REM Sleep:
    During deep slow-wave sleep phases, your endocrine system releases up to 75% of your daily human growth hormone (HGH). If you restrict sleep to 6 hours or less, cortisol (stress hormone) climbs, driving muscle breakdown and stalling glycogen retention.

    Aim for 8 hours of sleep, maintain a slight 200-300 clean caloric surplus, and track your weights with absolute commitment.`,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80',
    readTime: '7 mins read',
    date: 'Jun 15, 2026',
    author: 'Anjali Sharma'
  }
];

export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is the standard membership duration and policy?',
    answer: 'We offer flexible packages of 1-month, 3-months, 6-months, and 12-months. Long-term packages offer significantly lower rates per month and include complimentary initial personal trainer support and guest entry vouchers.'
  },
  {
    id: 'faq-2',
    question: 'Are personal trainers available at all times?',
    answer: 'Yes! Certified coaches are active on the gym floor during all operating hours from 5:00 AM to 11:00 PM. General trainers are free to assist you with equipment setups, while dedicated 1-on-1 personal coaches can be booked for specific time blocks.'
  },
  {
    id: 'faq-3',
    question: 'Is there safe, dedicated parking available at the gym?',
    answer: 'Absolutely. Karnataka Gym at MG Road Bengaluru provides dedicated, security-guarded car parking and multi-slot two-wheeler spaces free of charge for all active members.'
  },
  {
    id: 'faq-4',
    question: 'Do you offer customized diet and nutrition support plans?',
    answer: 'Yes! Our certified nutritionist Anjali Sharma offers deep body assessment consultations, macro-nutrient breakdowns, weekly progress check-ins, and realistic diet adjustments tailored around vegetarian, vegan, and specific athletic goals.'
  },
  {
    id: 'faq-5',
    question: 'What is your refund or cancellation policy?',
    answer: 'Memberships can be put on temporary hold for up to 30 days due to medical reasons or travel schedules. Refund requests are subject to review within the first 3 days of booking. We do not provide physical cash refunds, but memberships are fully transferable to friends or family.'
  },
  {
    id: 'faq-6',
    question: 'Are premium lockers and steam facilities included in the plan?',
    answer: 'Yes, secure lockers are provided for single-session use during your workout. Steam bath and sauna entry is fully included in the Premium and Elite packages, and is available to Starter plan holders as an optional add-on.'
  }
];

export const fitnessTips: Tip[] = [
  {
    id: 'tip-1',
    title: 'Pre-Workout Fuel',
    category: 'nutrition',
    text: 'Consume slow-digesting carbohydrates like oatmeal or a banana 45-60 minutes before training to maintain continuous glycogen availability.'
  },
  {
    id: 'tip-2',
    title: 'Eccentric Muscle Control',
    category: 'training',
    text: 'Slowing down the descent phase (eccentric action) of your lifts to 3 seconds triggers higher micro-tears, speeding up hypertrophy!'
  },
  {
    id: 'tip-3',
    title: 'Hydration Recovery Formula',
    category: 'recovery',
    text: 'Drink at least 500ml of water for every 45 minutes of intense cardiovascular sweating to prevent muscular cramping and physical fatigue.'
  },
  {
    id: 'tip-4',
    title: 'Mind-Muscle Connection',
    category: 'mindset',
    text: 'Actively focusing your brain on the specific muscle being squeezed (visualizing the fibers contracting) increases motor unit recruitment by up to 15%!'
  }
];
