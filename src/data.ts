import { Program, Trainer, MembershipTier, GalleryItem, Transformation, Testimonial, Article, FAQItem, Tip } from './types';

export const programsData: Program[] = [
  {
    id: 'hiit-classes',
    title: 'HIIT exercise classes',
    iconName: 'Flame',
    description: 'High-intensity interval training workouts to maximize fat burn, spike cardiovascular endurance, and challenge your body.',
    duration: '45 mins',
    intensity: 'Advanced',
    benefits: ['Burn extreme calories', 'Enhance metabolic rate', 'Build physical endurance']
  },
  {
    id: 'aerobics',
    title: 'Aerobics',
    iconName: 'Activity',
    description: 'Rhythmic, high-energy cardio choreographies designed to improve coordination, cardiovascular fitness, and overall stamina.',
    duration: '50 mins',
    intensity: 'Beginner',
    benefits: ['Enhance coordination', 'Boost lung capacity', 'Elevate mood and energy']
  },
  {
    id: 'crossfit',
    title: 'Crossfit',
    iconName: 'ShieldAlert',
    description: 'Slam kettlebells, swing ropes, lift Olympic bars, and push your physical envelope in our community-centric functional workouts.',
    duration: '60 mins',
    intensity: 'Advanced',
    benefits: ['Build explosive power', 'Develop raw strength', 'Boost agility and speed']
  },
  {
    id: 'dance-fitness',
    title: 'Dance fitness classes',
    iconName: 'Music',
    description: 'Fusion of popular international rhythms and aerobic physical moves to offer an amazing calorie-burning, fun fitness experience.',
    duration: '45 mins',
    intensity: 'All Levels',
    benefits: ['Full-body styling & tone', 'Incredible stress relief', 'High-energy cardiovascular session']
  },
  {
    id: 'personal-training',
    title: 'Personal training',
    iconName: 'UserRound',
    description: 'Receive bespoke workouts, posture analysis, nutrition guidance, and 1-on-1 coaching adapted precisely to your body and goals.',
    duration: '60 mins',
    intensity: 'All Levels',
    benefits: ['Bespoke program design', 'Assured form correction', 'Fast physical results']
  },
  {
    id: 'weight-training',
    title: 'Weight training',
    iconName: 'Dumbbell',
    description: 'Utilize premium biomechanical machines, free barbells, and dumbells to stimulate muscle hypertrophy and increase bone density.',
    duration: '60 mins',
    intensity: 'Intermediate',
    benefits: ['Build dense muscle tissue', 'Elevate structural strength', 'Enhance bone mineral density']
  },
  {
    id: 'nutrition-consulting',
    title: 'Nutrition consulting',
    iconName: 'Apple',
    description: 'Collaborate with clinical dietitians to custom formulate macro-nutrient ratios, hydration standards, and daily meal planners.',
    duration: '30 mins',
    intensity: 'All Levels',
    benefits: ['Customized meal patterns', 'Accelerate weight targets', 'Understand micro-nutrition basics']
  },
  {
    id: 'cycling',
    title: 'Cycling',
    iconName: 'Bike',
    description: 'Climb digital hills, sprint through intervals, and condition your lower body on our high-performance indoor cycle trainers.',
    duration: '45 mins',
    intensity: 'Intermediate',
    benefits: ['Zero impact on knee joints', 'Exceptional quad conditioning', 'Elevated cardio stamina']
  },
  {
    id: 'spa-services',
    title: 'Spa services',
    iconName: 'Sparkles',
    description: 'Decompress from intense lifts with relaxing steam chambers, professional recovery massages, and muscle-soothing sauna rooms.',
    duration: '45 mins',
    intensity: 'All Levels',
    benefits: ['Accelerate muscle healing', 'Alleviate neural stress', 'Rehydrate and cleanse skin']
  },
  {
    id: 'cardio',
    title: 'Cardio',
    iconName: 'HeartPulse',
    description: 'Condition your aerobic engines on high-end treadmills, modern stairmills, and physical rowing units with real-time vitals tracking.',
    duration: '45 mins',
    intensity: 'Beginner',
    benefits: ['Enhance cardiovascular health', 'Optimize resting heart rate', 'Increase daily endurance']
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
      'Complimentary Jairaj Fitness Gym custom bottle & t-shirt'
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
    title: 'Annual Jairaj Fitness Gym Championship',
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
    review: 'Jairaj Fitness Gym has totally changed my weekly routine. The trainers vikram and anjali custom designed a program for my back pain. Six months in, I am entirely pain-free and stronger than ever!'
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
    review: 'The coaches are extremely patient and emphasize proper joint safety over heavy lift counts. The custom locker security and cleanliness standards are top-notch in Belagavi.'
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
    answer: 'Yes! Certified coaches are active on the gym floor during all operating hours from 5:30 AM to 10:00 PM. General trainers are free to assist you with equipment setups, while dedicated 1-on-1 personal coaches can be booked for specific time blocks.'
  },
  {
    id: 'faq-3',
    question: 'Is there safe, dedicated parking available at the gym?',
    answer: 'Absolutely. Jairaj Fitness Gym in Belagavi provides dedicated, security-guarded car parking and multi-slot two-wheeler spaces free of charge for all active members.'
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
