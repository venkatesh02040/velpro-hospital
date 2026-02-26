const departmentsList = [
  {
    title: "General Surgery",
    slug: "general-surgery",
    description:
      "<p>Our General Surgery department specializes in advanced minimally invasive and open surgical procedures. We focus on delivering precise care with faster recovery times and minimal complications.</p><ul><li>Laparoscopic and robotic-assisted surgeries</li><li>Hernia repair & abdominal wall reconstruction</li><li>Appendectomy, cholecystectomy & colorectal surgery</li><li>Thyroid, breast & soft tissue procedures</li><li>Emergency trauma and acute abdomen management</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    icon: "/icons/general-surgery.png",
    created_at: "2024-10-01T09:00:00Z",
    updated_at: "2025-02-15T11:30:00Z",
    status: true,
    show_on_homepage: true,
    meta_title: "Best General Surgery & Laparoscopic Surgery in Bangalore",
    meta_keyword: "general surgery, laparoscopic surgery, minimally invasive surgery, hernia repair",
    meta_description: "Expert general surgeons performing advanced laparoscopic and open procedures with excellent outcomes.",
  },
  {
    title: "Laser Surgery",
    slug: "laser-surgery",
    description:
      "<p>Laser Surgery offers cutting-edge, minimally invasive laser procedures for various conditions with minimal pain, no stitches, and rapid recovery.</p><ul><li>Laser treatment for piles, fissure & fistula</li><li>Varicose veins laser ablation (EVLT)</li><li>Laser circumcision & pilonidal sinus</li><li>Cosmetic & dermatological laser applications</li><li>Laser stone & prostate procedures</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1550831106-233177576b4a?w=800&auto=format&fit=crop",
    icon: "/icons/laser-surgery.png",
    created_at: "2024-11-10T10:15:00Z",
    updated_at: "2025-01-20T14:00:00Z",
    status: true,
    show_on_homepage: true,
    meta_title: "Advanced Laser Surgery & Day Care Procedures in Bengaluru",
    meta_keyword: "laser surgery, piles laser treatment, varicose veins laser, fistula laser",
    meta_description: "Painless laser treatments for anorectal, vascular, and urological conditions with quick discharge.",
  },
  {
    title: "Laparoscopic Surgery",
    slug: "laparoscopic-surgery",
    description:
      "<p>Minimally invasive laparoscopic (keyhole) surgeries performed with high precision for faster healing and reduced hospital stay.</p><ul><li>Gallbladder removal (cholecystectomy)</li><li>Appendix removal (appendectomy)</li><li>Hernia repair (inguinal, ventral, incisional)</li><li>Gynecological & urological laparoscopic procedures</li><li>Diagnostic laparoscopy</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1584433305355-1f64c8f085c7?w=800&auto=format&fit=crop",
    icon: "/icons/laparoscopic.png",
    created_at: "2024-09-20T08:45:00Z",
    updated_at: "2025-03-01T09:20:00Z",
    status: true,
    show_on_homepage: true,
    meta_title: "Expert Laparoscopic & Keyhole Surgery in Bangalore",
    meta_keyword: "laparoscopic surgery, keyhole surgery, gallbladder surgery, hernia repair",
    meta_description: "State-of-the-art laparoscopic procedures with shorter hospital stays and minimal scarring.",
  },
  {
    title: "Gastroenterology",
    slug: "gastroenterology",
    description:
      "<p>Comprehensive diagnosis and treatment of all digestive system and liver-related disorders using advanced endoscopy and imaging.</p><ul><li>Upper GI & colonoscopy</li><li>ERCP & therapeutic endoscopy</li><li>Liver diseases (hepatitis, cirrhosis, fatty liver)</li><li>IBD (Crohn’s & Ulcerative Colitis) management</li><li>Pancreatic & biliary disorders</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1579684384363-3f1e0a7e8c4e?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop",
    icon: "/icons/gastro.png",
    created_at: "2024-12-05T11:00:00Z",
    updated_at: "2025-02-25T13:40:00Z",
    status: true,
    show_on_homepage: true,
    meta_title: "Best Gastroenterology & Liver Specialist in Bengaluru",
    meta_keyword: "gastroenterology, endoscopy, colonoscopy, liver specialist, IBD",
    meta_description: "Advanced digestive and liver care with expert endoscopists and hepatologists.",
  },
  {
    title: "Orthopedics",
    slug: "orthopedics",
    description:
      "<p>Complete bone, joint, and musculoskeletal care with both non-surgical and surgical management for all age groups.</p><ul><li>Fracture & trauma management</li><li>Joint pain & arthritis treatment</li><li>Sports injuries & rehabilitation</li><li>Pediatric orthopedics</li><li>Spine & deformity correction</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1551076805-e186903d5c8b?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1550831106-233177576b4a?w=800&auto=format&fit=crop",
    icon: "/icons/ortho.png",
    created_at: "2024-08-15T09:30:00Z",
    updated_at: "2025-01-10T10:50:00Z",
    status: true,
    show_on_homepage: true,
    meta_title: "Best Orthopedic & Bone Specialist Hospital in Bangalore",
    meta_keyword: "orthopedics, fracture treatment, joint pain, spine care",
    meta_description: "Expert orthopedic services for trauma, joint disorders, and sports injuries.",
  },
  {
    title: "Joint Replacements",
    slug: "joint-replacements",
    description:
      "<p>High-volume center for knee, hip, and shoulder replacement surgeries using latest implants and rapid recovery protocols.</p><ul><li>Total Knee Replacement (TKR)</li><li>Total Hip Replacement (THR)</li><li>Shoulder & elbow replacement</li><li>Revision joint replacement</li><li>Computer-navigated & robotic-assisted surgery</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    icon: "/icons/joint.png",
    created_at: "2025-01-12T12:20:00Z",
    updated_at: "2025-03-05T15:10:00Z",
    status: true,
    show_on_homepage: false,
    meta_title: "Best Joint Replacement & Knee Surgery in Bengaluru",
    meta_keyword: "knee replacement, hip replacement, joint surgery, robotic knee surgery",
    meta_description: "Advanced joint replacement with excellent functional outcomes and fast rehabilitation.",
  },
  {
    title: "Arthroscopy",
    slug: "arthroscopy",
    description:
      "<p>Minimally invasive keyhole procedures for accurate diagnosis and treatment of joint disorders with day-care recovery.</p><ul><li>Knee arthroscopy (ACL, meniscus repair)</li><li>Shoulder arthroscopy (rotator cuff, instability)</li><li>Ankle & wrist arthroscopy</li><li>Hip arthroscopy</li><li>Sports-related joint injuries</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1550831106-233177576b4a?w=800&auto=format&fit=crop",
    icon: "/icons/arthroscopy.png",
    created_at: "2024-11-28T10:00:00Z",
    updated_at: "2025-02-18T09:30:00Z",
    status: true,
    show_on_homepage: false,
    meta_title: "Best Arthroscopic Surgery in Bangalore",
    meta_keyword: "arthroscopy, knee arthroscopy, shoulder arthroscopy, ACL reconstruction",
    meta_description: "Keyhole joint surgeries with minimal pain and quick return to activity.",
  },
  {
    title: "Sports Injuries",
    slug: "sports-injuries",
    description:
      "<p>Specialized treatment and rehabilitation for sports-related injuries to help athletes return to peak performance safely.</p><ul><li>ACL & PCL reconstruction</li><li>Meniscus & cartilage repair</li><li>Rotator cuff & labral tears</li><li>Ankle sprains & instability</li><li>Comprehensive physiotherapy & rehab</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1550831106-233177576b4a?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&auto=format&fit=crop",
    icon: "/icons/sports.png",
    created_at: "2025-02-01T08:45:00Z",
    updated_at: "2025-03-10T11:20:00Z",
    status: true,
    show_on_homepage: false,
    meta_title: "Sports Injury & Arthroscopy Center in Bengaluru",
    meta_keyword: "sports injury, ACL tear, sports medicine, physiotherapy",
    meta_description: "Expert care for athletes with advanced surgery and structured rehabilitation.",
  },
  {
    title: "Spine Surgery",
    slug: "spine-surgery",
    description:
      "<p>Advanced treatment for all spinal conditions using minimally invasive, endoscopic, and open techniques for pain relief and mobility restoration.</p><ul><li>Disc prolapse & microdiscectomy</li><li>Spinal stenosis decompression</li><li>Scoliosis & deformity correction</li><li>Spinal tumors & infections</li><li>Spinal fusion & disc replacement</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    icon: "/icons/spine.png",
    created_at: "2024-12-20T13:15:00Z",
    updated_at: "2025-02-28T10:40:00Z",
    status: true,
    show_on_homepage: false,
    meta_title: "Best Spine Surgery & Back Pain Treatment in Bangalore",
    meta_keyword: "spine surgery, disc prolapse, scoliosis, spinal fusion",
    meta_description: "Minimally invasive and complex spine surgeries with high success rates.",
  },
  {
    title: "Internal Medicine and Diabetes",
    slug: "internal-medicine-and-diabetes",
    description:
      "<p>Holistic care for adult medical conditions with special focus on diabetes prevention, management, and complications control.</p><ul><li>Diabetes (Type 1, Type 2, Gestational)</li><li>Hypertension & lipid disorders</li><li>Thyroid & hormonal imbalances</li><li>Multi-system chronic disease management</li><li>Lifestyle & preventive medicine</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop",
    icon: "/icons/internal-medicine.png",
    created_at: "2024-10-25T09:50:00Z",
    updated_at: "2025-01-30T12:00:00Z",
    status: true,
    show_on_homepage: true,
    meta_title: "Best Diabetes & Internal Medicine Specialist in Bengaluru",
    meta_keyword: "diabetes treatment, internal medicine, thyroid, hypertension",
    meta_description: "Comprehensive management of diabetes and chronic medical conditions.",
  },
  {
    title: "Obstetrics & Gynaecology",
    slug: "obstetrics-and-gynaecology",
    description:
      "<p>Complete women’s health services from adolescence to menopause, including high-risk pregnancy care and advanced gynecological surgeries.</p><ul><li>Normal & cesarean delivery</li><li>High-risk pregnancy management</li><li>Laparoscopic hysterectomy & myomectomy</li><li>Infertility evaluation & treatment</li><li>Menopause & hormonal therapy</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1584433305355-1f64c8f085c7?w=800&auto=format&fit=crop",
    icon: "/icons/obgyn.png",
    created_at: "2024-11-05T11:20:00Z",
    updated_at: "2025-02-05T14:10:00Z",
    status: true,
    show_on_homepage: true,
    meta_title: "Best Maternity & Gynecology Hospital in Bangalore",
    meta_keyword: "obstetrics, gynaecology, pregnancy care, IVF, hysterectomy",
    meta_description: "Expert maternity services and gynecological care with compassionate approach.",
  },
  {
    title: "Paediatrics",
    slug: "paediatrics",
    description:
      "<p>Child-friendly pediatric care from newborn to teenage years with vaccination, growth monitoring, and emergency pediatric services.</p><ul><li>Newborn care & NICU</li><li>Immunization & well-baby clinic</li><li>Pediatric infections & respiratory disorders</li><li>Developmental & behavioral pediatrics</li><li>Pediatric emergencies & ICU</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    icon: "/icons/pediatrics.png",
    created_at: "2024-12-01T10:00:00Z",
    updated_at: "2025-03-01T09:30:00Z",
    status: true,
    show_on_homepage: true,
    meta_title: "Best Child Specialist & Paediatrics Hospital in Bengaluru",
    meta_keyword: "paediatrics, child doctor, vaccination, neonatology",
    meta_description: "Complete pediatric care with experienced child specialists and modern facilities.",
  },
  {
    title: "ENT Head & Neck Surgery",
    slug: "ent-head-and-neck-surgery",
    description:
      "<p>Advanced diagnosis and treatment of ear, nose, throat, sinus, voice, and head & neck conditions using endoscopic and microscopic techniques.</p><ul><li>Endoscopic sinus surgery</li><li>Tonsillectomy & adenoidectomy</li><li>Ear microsurgery & cochlear implant</li><li>Head & neck tumor surgery</li><li>Voice & swallowing disorders</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1550831106-233177576b4a?w=800&auto=format&fit=crop",
    icon: "/icons/ent.png",
    created_at: "2025-01-20T09:45:00Z",
    updated_at: "2025-02-20T13:15:00Z",
    status: true,
    show_on_homepage: false,
    meta_title: "Best ENT Specialist & Head Neck Surgery in Bangalore",
    meta_keyword: "ENT, sinus surgery, tonsillectomy, cochlear implant",
    meta_description: "Complete ENT and head-neck surgical services with modern diagnostic tools.",
  },
  {
    title: "Urology",
    slug: "urology",
    description:
      "<p>Complete urological care for kidney, bladder, prostate, and male reproductive system disorders with laser, laparoscopic, and robotic options.</p><ul><li>Kidney stone removal (RIRS, PCNL)</li><li>Prostate surgery (TURP, laser)</li><li>Urinary incontinence & reconstructive urology</li><li>Male infertility & andrology</li><li>Uro-oncology</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    icon: "/icons/urology.png",
    created_at: "2024-11-25T12:30:00Z",
    updated_at: "2025-02-12T10:50:00Z",
    status: true,
    show_on_homepage: false,
    meta_title: "Best Urology & Kidney Stone Hospital in Bengaluru",
    meta_keyword: "urology, kidney stone, prostate, urinary incontinence",
    meta_description: "Advanced urological treatments including laser stone surgery and prostate care.",
  },
  {
    title: "Neurosciences",
    slug: "neurosciences",
    description:
      "<p>Integrated brain, spine, and nerve care with advanced neuroimaging, stroke intervention, epilepsy surgery, and neuro-rehabilitation.</p><ul><li>Brain tumor & skull base surgery</li><li>Stroke & aneurysm management</li><li>Epilepsy & movement disorders</li><li>Spine & peripheral nerve surgery</li><li>Neuro-critical care & rehabilitation</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1551076805-e186903d5c8b?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop",
    icon: "/icons/neuro.png",
    created_at: "2024-10-10T08:20:00Z",
    updated_at: "2025-01-25T11:45:00Z",
    status: true,
    show_on_homepage: false,
    meta_title: "Best Neurology & Neurosurgery Hospital in Bangalore",
    meta_keyword: "neurosurgery, stroke, brain tumor, epilepsy, spine surgery",
    meta_description: "Comprehensive neurosciences care with 24/7 stroke unit and advanced surgery.",
  },
  {
    title: "Plastic And Cosmetic Surgery",
    slug: "plastic-and-cosmetic-surgery",
    description:
      "<p>Aesthetic and reconstructive procedures to enhance appearance and restore function after trauma, burns, or congenital deformities.</p><ul><li>Liposuction & body contouring</li><li>Breast augmentation & reduction</li><li>Rhinoplasty & facial rejuvenation</li><li>Scar revision & burn reconstruction</li><li>Hair transplant & skin grafting</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    icon: "/icons/plastic-surgery.png",
    created_at: "2025-01-08T13:10:00Z",
    updated_at: "2025-02-22T15:30:00Z",
    status: true,
    show_on_homepage: false,
    meta_title: "Best Cosmetic & Plastic Surgery Clinic in Bengaluru",
    meta_keyword: "plastic surgery, liposuction, rhinoplasty, breast surgery",
    meta_description: "Safe and natural-looking aesthetic and reconstructive procedures.",
  },
  {
    title: "Pain and Palliative Care",
    slug: "pain-and-palliative-care",
    description:
      "<p>Multidisciplinary approach to chronic pain management and palliative care for cancer and terminal illnesses to improve comfort and quality of life.</p><ul><li>Chronic back & joint pain</li><li>Cancer pain & symptom control</li><li>Interventional pain procedures</li><li>Palliative home care support</li><li>Psychological & family counseling</li></ul>",
    banner:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&auto=format&fit=crop",
    normalImage:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop",
    icon: "/icons/pain-care.png",
    created_at: "2025-02-05T09:00:00Z",
    updated_at: "2025-03-08T10:20:00Z",
    status: true,
    show_on_homepage: false,
    meta_title: "Pain Management & Palliative Care in Bangalore",
    meta_keyword: "chronic pain, palliative care, cancer pain, interventional pain",
    meta_description: "Compassionate pain relief and end-of-life care with holistic support.",
  },
];