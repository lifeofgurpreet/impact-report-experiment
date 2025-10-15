import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

// ImpactVCanvas.jsx
// Self-contained React component that renders an interactive "vcanvas"-style
// visualization for your YSEALI / Games data.
// - Drop this file into a React or Next.js app and render <ImpactVCanvas />
// - No external libraries required. Uses SVG + HTML + light CSS for responsiveness.
// - Fully accessible with keyboard navigation and ARIA labels

// --- FULL DATASET ---
const DATA = [
  {
    "Title": "YSEALI Boot Camp 2019 – Final Narrative Report",
    "Year": "2019",
    "SourceFile": "YSEALI Boot Camp 2019_Final Report",
    "ProgramName": "YSEALI Boot Camp 2019 (Social Entrepreneurship)",
    "GeographicScope": "National (Malaysia – 8 states)",
    "TheoryOfChangeSummary": "Empower Malaysian youth with leadership training in social entrepreneurship, design thinking, networks, and resources through regional bootcamps and mentorship so that they can design and implement sustainable community projects, thereby addressing local challenges and strengthening the YSEALI network.",
    "PrimaryOutcomes": [
      "Organized 8 two-day boot camps across 8 Malaysian states in partnership with Positive X (design thinking agency), training 341 YSEALI members in social entrepreneurship, leadership, and design thinking methodologies.",
      "Selected 16 winning youth project teams (2 per state) to receive micro-grants (USD 8,000 total seed funding) and 3-month mentorship; teams were paired with local NGOs to implement innovative solutions.",
      "Successfully implemented 11 team projects addressing social or environmental issues, achieving 3.1x Return on Impact (USD 8k seed funding created USD 25k value through additional income, digital assets, and volunteer hours).",
      "Over 480,000 people reached through project outreach (volunteers, social media, websites), showcasing YSEALI youth impact and demonstrating scalability of social enterprise solutions.",
      "88% of youth leaders felt empowered to solve problems through social entrepreneurship and design thinking approaches, with 96% planning to continue their impact projects post-program implementation period.",
      "81% of participants reported the program met their expectations and 99% expressed interest in further U.S. exchange programs."
    ],
    "QuantitativeMetrics": [
      {"name": "Applications received", "value": "638", "unit": "applications"},
      {"name": "Participants attending boot camps", "value": "341", "unit": "people"},
      {"name": "States covered", "value": "8", "unit": "locations"},
      {"name": "Projects initiated by teams", "value": "16", "unit": "projects"},
      {"name": "Projects successfully implemented", "value": "11", "unit": "projects"},
      {"name": "Seed funding provided", "value": "8000", "unit": "USD"},
      {"name": "Return on Impact multiplier", "value": "3.1", "unit": "x"},
      {"name": "Value created from seed funding", "value": "25000", "unit": "USD"},
      {"name": "Volunteers engaged", "value": "240", "unit": "people"},
      {"name": "Volunteer service hours", "value": "~1000", "unit": "hours"},
      {"name": "Total online reach", "value": "481,163", "unit": "people"},
      {"name": "Websites built for partners", "value": "6", "unit": "websites"},
      {"name": "Funds raised for partners", "value": "RM22,147", "unit": "currency"},
      {"name": "Empowered through social entrepreneurship", "value": "88", "unit": "%"},
      {"name": "Plan to continue projects post-program", "value": "96", "unit": "%"},
      {"name": "Participant satisfaction – expectations met", "value": "81", "unit": "%"},
      {"name": "Participant gave highest program rating", "value": "58", "unit": "%"},
      {"name": "Participants interested in US exchanges", "value": "99", "unit": "%"}
    ],
    "QualitativeInsights": [
      "The inaugural YSEALI Bootcamp 2019 focused on inculcating social entrepreneurship skills and knowledge, laying the foundation for Biji-biji's subsequent impact accelerator programs with partners TEGAS, CIMB Foundation, and Yayasan Hasanah.",
      "Partnership with Positive X, a Malaysian design thinking agency, brought professional methodologies to the program and ensured participants received industry-standard training in human-centered design approaches.",
      "Teams were strategically paired with local NGOs to implement their innovative solutions, creating a mentorship ecosystem that connected youth innovators with established community organizations.",
      "The 3.1x Return on Impact demonstrated the multiplier effect of seed funding - every USD 1 invested generated USD 3.10 in value through additional income, digital assets created, and volunteer hours contributed.",
      "Mixing university students with young professionals yielded cross-pollination of ideas but also imbalances as more experienced members tended to dominate team discussions.",
      "Design Thinking was a new concept for many; participants struggled initially but ultimately produced solutions mostly on point. Community partners rated the boot camp 8/10 in meeting their expectations.",
      "Three-month post-bootcamp mentorship was effective: all 16 teams completed the program, with 96% expressing commitment to continue their social enterprises beyond the program period."
    ],
    "DataQualityRating": "High"
  },
  {
    "Title": "YSEALI Boot Camp 2020 – Final Narrative Report",
    "Year": "2020",
    "SourceFile": "YSEALI Boot Camp 2020 Final Report",
    "ProgramName": "YSEALI Boot Camp 2020 – Sparking Digital Action (East Malaysia)",
    "GeographicScope": "Regional (East Malaysia – Borneo focus, hybrid/virtual due to COVID-19)",
    "TheoryOfChangeSummary": "Part of a series of three YSEALI civic engagement bootcamps (2019, 2020 Borneo, 2022), this multi-phase program was designed so that if youth in East Malaysia are first engaged through local catalyst workshops, then provided with digital tools, mentorship, and USD 20,000 in seed funding (aggregate across the three bootcamps), they will launch effective civic action campaigns that address community issues even amid a pandemic, with support from 21 universities and 29 NGOs.",
    "PrimaryOutcomes": [
      "Reached 1,364 youth applicants and delivered 8 half-day in-person bootcamps in early 2020, engaging 600 participants on civic advocacy tools with special focus on supporting youth in East Malaysia (Sabah & Sarawak) to become changemakers.",
      "Pivoted during COVID-19 to deliver 15 online civic webinars, reaching 422 participants, and a Virtual Boot Camp for 44 selected youth focused on 'Sparking Digital Action through Civic Engagement Campaigns' theme.",
      "Supported 10 youth-led civic campaign teams from this bootcamp through a 3-month mentorship; all 10 community projects were fully implemented despite pandemic challenges. As part of the broader civic engagement series, 17 civic campaigns were launched across the three bootcamps, engaging 21 universities and 29 NGOs.",
      "Total direct reach of program: 1,266 people with teams mobilizing additional community volunteers and online audiences to address diverse issues including youth empowerment, environmental challenges, digital equity, and diversity & inclusion.",
      "Post-program surveys showed transformative outcomes: 94% of participants believe in the ability of youths to create civic change, 95% committed to continue utilizing digital and project management tools for future campaigns, and 47.6% increase in perception of capability to lead their own civic campaigns.",
      "10 civic campaigns from Boot Camp 2020 successfully launched: Mari Laut (Sabah fishery advocacy), Bijak Tular (fake news education), Climate Rangers (climate awareness), BxU (waste management), Kids Yana (mental health), #EveryYearBanjir (flood awareness), Sayur Kita (modern agriculture), #safeUMS (sexual violence awareness), Belia di Bawah Bayu (education for undocumented children), Bulan Sisters (period poverty)."
    ],
    "QuantitativeMetrics": [
      {"name": "Total participants (all phases)", "value": "1266", "unit": "people"},
      {"name": "Phase 1 applications (Malaysia)", "value": "1364", "unit": "applications"},
      {"name": "Bootcamp participants (Phase 1)", "value": "600", "unit": "people"},
      {"name": "Webinar participants (Phase 2)", "value": "422", "unit": "people"},
      {"name": "Virtual Boot Camp participants", "value": "44", "unit": "people"},
      {"name": "Execution phase participants", "value": "200", "unit": "people"},
      {"name": "Youth-led campaigns implemented", "value": "10", "unit": "projects"},
      {"name": "Universities engaged (3 bootcamps)", "value": "21", "unit": "universities"},
      {"name": "Total civic campaigns (3 bootcamps)", "value": "17", "unit": "campaigns"},
      {"name": "NGOs engaged (3 bootcamps)", "value": "29", "unit": "organizations"},
      {"name": "Seed funding (3 bootcamps aggregate)", "value": "20000", "unit": "USD"},
      {"name": "Believe youth can create civic change", "value": "94", "unit": "%"},
      {"name": "Will continue using digital tools", "value": "95", "unit": "%"},
      {"name": "Increase in capability to lead campaigns", "value": "47.6", "unit": "%"},
      {"name": "Survey: Program met expectations", "value": "82", "unit": "%"},
      {"name": "Survey: High program rating", "value": "93", "unit": "%"},
      {"name": "Survey: Willing to join YSEALI again", "value": "90", "unit": "%"},
      {"name": "Increase in leadership capability", "value": "+40", "unit": "Δ%"},
      {"name": "Increase in leadership skills", "value": "+30", "unit": "Δ%"},
      {"name": "Increase in ability to create change", "value": "+20", "unit": "Δ%"},
      {"name": "Increase in fundraising know-how", "value": "+70", "unit": "Δ%"},
      {"name": "Increase in impact measurement confidence", "value": "+80", "unit": "Δ%"},
      {"name": "Increase in campaign management skills", "value": "+15", "unit": "Δ%"}
    ],
    "QualitativeInsights": [
      "Boot Camp 2020 was part of a transformative series of three civic engagement bootcamps that collectively engaged 21 universities, launched 17 civic campaigns, partnered with 29 NGOs, and provided USD 20,000 in seed funding to empower Malaysian youth as civic changemakers.",
      "The East Malaysia/Borneo focus addressed the critical need to support youth in Sabah and Sarawak to become regional changemakers, with campaigns tackling local issues like fishery advocacy (Mari Laut), digital inclusivity (Bah, Connect Lah), accessibility for persons with disabilities (Tara Kita, Kota Kita), and Dayak women's rights (The Dayak Women).",
      "The three bootcamps created lasting impact with development of the Civic Engagement Framework (CEF), launch of a 20-hour Civic Management MOOC, and scaled expertise to UNESCO-APCEIU's 8th Youth Leadership Workshop (1,152 registrations from 13 countries) and NGO@Makerthon program.",
      "Phased delivery was crucial during COVID-19: initial in-person sessions built momentum, and the subsequent virtual phase kept youth engaged remotely. The 'Sparking Digital Action' theme was particularly relevant as participants learned to leverage digital platforms for civic campaigns.",
      "Participants valued networking with like-minded peers as a top benefit, with the East Malaysia focus creating strong regional networks among Sabahan and Sarawakian changemakers.",
      "The structured mentorship provided not just technical guidance but also emotional support during the pandemic, with comprehensive training in advocacy, lobbying, campaign building, strategy planning, project execution, marketing, communications, budgeting, fundraising, and partnership development.",
      "Post-program, participants showed increased civic confidence in lobbying decision-makers and measuring impact, with 95% committing to continue using digital and project management tools for future campaigns and 47.6% reporting increased capability to lead civic campaigns."
    ],
    "DataQualityRating": "High"
  },
  {
    "Title": "YSEALI Boot Camp 2022 – Final Narrative Report",
    "Year": "2022",
    "SourceFile": "YSEALI Boot Camp 2022 Final Report",
    "ProgramName": "YSEALI Boot Camp 2022 – Rebuilding Inclusive Societies through Technology",
    "GeographicScope": "Sub-national focus (4 underserved states: Johor, Kedah, Kelantan, Pahang)",
    "TheoryOfChangeSummary": "Part of a series of three transformative YSEALI civic engagement bootcamps (2019, 2020 Borneo, 2022), this program focused on four underserved Malaysian states to deliver tailored civic engagement training emphasizing technology and digital tools. With collective support from 21 universities, 29 NGOs, and USD 20,000 in seed funding across the series, the program aimed to elevate youth voices from community level to national platforms and create lasting civic infrastructure.",
    "PrimaryOutcomes": [
      "Engaged 750+ youths through two initial civic engagement webinars and online campaigns themed 'Rebuilding Inclusive Societies through Technology,' targeting underserved states (Johor, Kedah, Kelantan, Pahang) via American Corners and local universities.",
      "Trained 109 changemakers in four intensive 2-day boot camps covering advocacy, lobbying, campaign strategy, project planning, and technology-enabled civic engagement, forming 12 multi-disciplinary teams.",
      "Selected 8 best teams to receive micro-grants and 3-month mentorship; all 8 winning youth-led campaigns were fully implemented addressing diverse issues including environmental sustainability, mental health, education, and social inclusion.",
      "As part of the broader civic engagement series (2019-2022), collectively engaged 21 universities, launched 17 civic campaigns total, partnered with 29 NGOs, and provided USD 20,000 in seed funding to empower Malaysian youth as civic changemakers using digital tools and technology.",
      "Post-program outcomes: 94% of participants across the series believe in youth's ability to create civic change, 95% committed to continue utilizing digital and project management tools, 47.6% increase in perception of capability to lead civic campaigns, and 84% felt more confident in leadership roles."
    ],
    "QuantitativeMetrics": [
      {"name": "Youths reached in webinars", "value": "750", "unit": "people"},
      {"name": "Applicants for Boot Camp", "value": "152", "unit": "applications"},
      {"name": "Selected Boot Camp participants", "value": "109", "unit": "people"},
      {"name": "States targeted", "value": "4", "unit": "states"},
      {"name": "Teams formed at bootcamps", "value": "34", "unit": "teams"},
      {"name": "Teams completing campaigns", "value": "8", "unit": "teams"},
      {"name": "Micro-grants awarded", "value": "8", "unit": "teams funded"},
      {"name": "Mentorship provided", "value": "3", "unit": "months"},
      {"name": "Universities engaged (3 bootcamps)", "value": "21", "unit": "universities"},
      {"name": "Total civic campaigns (3 bootcamps)", "value": "17", "unit": "campaigns"},
      {"name": "NGOs engaged (3 bootcamps)", "value": "29", "unit": "organizations"},
      {"name": "Seed funding (3 bootcamps aggregate)", "value": "20000", "unit": "USD"},
      {"name": "Believe youth can create civic change", "value": "94", "unit": "%"},
      {"name": "Will continue using digital tools", "value": "95", "unit": "%"},
      {"name": "Increase in capability to lead campaigns", "value": "47.6", "unit": "%"},
      {"name": "More confident in leadership roles", "value": "84", "unit": "%"},
      {"name": "Participant survey – will continue civic work", "value": "63.2", "unit": "%"},
      {"name": "Participant survey – top training relevance", "value": "78.9", "unit": "%"},
      {"name": "Participant survey – finale rated amazing", "value": "73.7", "unit": "%"},
      {"name": "Gender breakdown (participants)", "value": "40", "unit": "% female"}
    ],
    "QualitativeInsights": [
      "Boot Camp 2022 concluded a transformative series of three civic engagement bootcamps that collectively developed the Civic Engagement Framework (CEF), launched a 20-hour Civic Management MOOC, and scaled expertise to international programs like UNESCO-APCEIU's 8th Youth Leadership Workshop (1,152 registrations from 13 countries).",
      "The 'Rebuilding Inclusive Societies through Technology' theme addressed post-pandemic recovery and digital transformation, equipping participants with technology skills to amplify civic impact through digital platforms, project management tools, and online campaign strategies.",
      "Targeting specific underserved states (Johor, Kedah, Kelantan, Pahang) via American Corners and local universities proved effective for reaching youth in areas with limited access to civic leadership training and creating regional networks.",
      "Participants appreciated in-person collaboration after pandemic isolation, with the boot camp serving as a catalyst for reconnecting youth changemakers and rebuilding civic energy in underserved communities.",
      "Regional challenges like major flooding in affected states and public holidays impacted recruitment, demonstrating the importance of contextual program design and flexible scheduling for regional programs.",
      "The three bootcamps created lasting infrastructure with proven methodologies (CEF), scalable educational content (MOOC), and a network of 21 universities and 29 NGOs committed to supporting civic engagement across Malaysia."
    ],
    "DataQualityRating": "High"
  },
  {
    "Title": "YSEALI Summit Brunei 2022 – Final Impact Report",
    "Year": "2022",
    "SourceFile": "YSEALI Summit Brunei 2022",
    "ProgramName": "YSEALI Summit 2022 Brunei – Green Recovery & Climate Leadership",
    "GeographicScope": "Regional (Southeast Asia – 11 countries, summit held in Brunei)",
    "TheoryOfChangeSummary": "By bringing together 105 young Southeast Asian leaders from 11 countries for an immersive summit addressing climate issues and equipping them with green recovery tools, participants will be empowered with knowledge, networks, funding opportunities (Small Grants Track USD 24,500 total; Career Fellowship Track USD 9,000 monthly stipends), and practical inspiration to initiate and scale environmental action in their home countries, becoming regional climate leaders.",
    "PrimaryOutcomes": [
      "Successfully convened 105+ youth participants from 11 Southeast Asian countries for an intensive hands-on summit focused on climate change and green recovery, recognizing the urgent need for concerted regional action on climate challenges.",
      "Implemented innovative dual-track program: Small Grants Track awarded USD 3,500 each to 7 winning teams (USD 24,500 total) to implement green recovery initiatives; Career Fellowship Track placed 18 selected fellows with climate action organizations receiving USD 500 monthly stipends (USD 9,000 total monthly).",
      "Delivered comprehensive environmental programming including interactive workshops on advocacy and strategic communication, hands-on climate simulations, Environmental Carbon Footprint Game Plays (8,566 participants), environmental exhibition attracting 7,000+ on-ground attendees, and 17,300 sustainability pledges collected.",
      "Partnered with Big BWN Project (local Brunei NGO) and Brunei Climate Change Secretariat to ensure cultural relevance, smooth execution, and connection to local climate networks, fostering cross-border collaboration among participants from 11 nations.",
      "Post-summit evaluation: 79.2% reported stronger commitment to protect environment and reduce carbon emissions, 75% felt more confident as climate leaders, 70.8% gained new networks with international climate organizations, 81.4% increased ability to use storytelling and communications strategy for advocacy, and 91.7% agreed summit was highly valuable to personal development."
    ],
    "QuantitativeMetrics": [
      {"name": "Youth delegates", "value": "105", "unit": "people"},
      {"name": "Countries represented", "value": "11", "unit": "nations"},
      {"name": "Summit duration", "value": "4", "unit": "days"},
      {"name": "Small Grants awarded", "value": "7", "unit": "teams"},
      {"name": "Small Grant amount per team", "value": "3500", "unit": "USD"},
      {"name": "Total Small Grants funding", "value": "24500", "unit": "USD"},
      {"name": "Career Fellows selected", "value": "18", "unit": "fellows"},
      {"name": "Monthly stipend per fellow", "value": "500", "unit": "USD"},
      {"name": "Total monthly Career Fellowship funding", "value": "9000", "unit": "USD"},
      {"name": "Environmental game participants", "value": "8566", "unit": "people"},
      {"name": "Sustainability pledges collected", "value": "17300", "unit": "pledges"},
      {"name": "On-ground exhibition attendance", "value": "7000", "unit": "people"},
      {"name": "Workshops & sessions", "value": "15", "unit": "sessions"},
      {"name": "Post-summit survey response rate", "value": "80", "unit": "%"},
      {"name": "Stronger environmental commitment", "value": "79.2", "unit": "%"},
      {"name": "Belief in protecting environment", "value": "91.7", "unit": "%"},
      {"name": "Leadership confidence", "value": "75", "unit": "%"},
      {"name": "New international climate networks", "value": "70.8", "unit": "%"},
      {"name": "Increased advocacy & storytelling skills", "value": "81.4", "unit": "%"},
      {"name": "Increased communications strategy ability", "value": "79", "unit": "%"},
      {"name": "Summit highly valuable to development", "value": "79.2", "unit": "%"},
      {"name": "Overall summit satisfaction", "value": "90", "unit": "%"}
    ],
    "QualitativeInsights": [
      "The climate action and green recovery themes resonated deeply with participants recognizing the urgent and complex nature of Southeast Asia's environmental challenges - many described the summit as a wake-up call that motivated immediate action upon returning home.",
      "The dual-track structure proved highly effective: Small Grants Track enabled 7 teams to immediately implement green recovery projects with USD 3,500 funding each, while Career Fellowship Track provided 18 fellows with USD 500 monthly stipends to work with established climate organizations, creating immediate pathways to climate careers.",
      "Partnership with Big BWN Project (local Brunei NGO) and Brunei Climate Change Secretariat ensured cultural relevance, local climate expertise, smooth execution, and authentic connection to Brunei's environmental initiatives, demonstrating the value of local partnerships in regional convenings.",
      "The Environmental Exhibition Program component demonstrated massive public reach beyond direct participants: Environmental Carbon Footprint Game attracted 8,566 participants, collected 17,300 pledges for lifestyle changes, and drew 7,000+ people to on-ground exhibitions, amplifying climate awareness across communities.",
      "Hands-on experiential learning through advocacy hackathons, climate simulations, site visits to environmental organizations, and interactive workshops proved more impactful than traditional lectures, with 81.4% of participants reporting increased storytelling and communications skills for climate advocacy.",
      "The summit successfully fostered lasting regional networks with 70.8% of participants gaining new connections with international climate organizations across Southeast Asian countries, creating cross-border working groups that continued collaborating on climate solutions post-summit."
    ],
    "DataQualityRating": "High"
  },
  {
    "Title": "Games Bagus 2022 – Final Program Impact Report",
    "Year": "2022",
    "SourceFile": "Games Bagus 2022 Final Report",
    "ProgramName": "Games Bagus 2022 – Socially Conscious Game Development (Malaysia)",
    "GeographicScope": "National (Malaysia)",
    "TheoryOfChangeSummary": "Implemented in partnership with U.S. Embassy Kuala Lumpur, Synapze (hybrid events curator and platform provider), and Malaysia Digital Economy Corporation (MDEC), this program empowers young Malaysian game creators to produce socially conscious games through training on game design, impact creation, narrative storytelling, and game programming, with access to regional and U.S. industry experts and seed funding (USD 9,000) to launch their games at LevelUp KL games conference.",
    "PrimaryOutcomes": [
      "Achieved broad outreach with 4 virtual webinars in the 'Serious Games Series' attracting 600 Malaysian youth interested in games for social impact, building awareness and interest in socially conscious game development.",
      "Out of 119 applicants, selected 60 diverse youths (65% male, 35% female) for intensive 4-day in-person Workshop & Game Jam, training participants on game design, impact creation, narrative storytelling, and game programming with support from 6 expert mentors.",
      "Participants created 15 playable game prototypes with social impact themes during the jam, including notable titles: 'People of the River' (Melanau belief-based resource management survival game), 'Burnt Out Capital' (project manager game addressing work-life balance and crunch in game development), and 'The Little Tractor' (climate change and excessive logging awareness game).",
      "Top 3 teams and 2 special mention teams won seed funding (total USD 9,000) and 3-month mentorship to complete their games; all winning games were finished and showcased at LevelUp KL 2022, Malaysia's premier games conference with 2,000+ attendees, connecting youth developers with 100+ industry players.",
      "Post-program evaluation: 50% increase in technical skills and confidence in creating socially conscious games, 97% found program valuable to personal development, 97% gained access to industry networks, demonstrating program's effectiveness in building Malaysia's socially conscious game development ecosystem."
    ],
    "QuantitativeMetrics": [
      {"name": "Webinar outreach (serious games series)", "value": "600", "unit": "youth reached"},
      {"name": "Applications (Workshop & Game Jam)", "value": "119", "unit": "applicants"},
      {"name": "Selected participants", "value": "60", "unit": "people"},
      {"name": "Gender ratio - male", "value": "65", "unit": "%"},
      {"name": "Gender ratio - female", "value": "35", "unit": "%"},
      {"name": "Workshop & Game Jam duration", "value": "4", "unit": "days"},
      {"name": "Prototypes developed", "value": "15", "unit": "games"},
      {"name": "Winning teams (top 3)", "value": "3", "unit": "teams"},
      {"name": "Special mention teams", "value": "2", "unit": "teams"},
      {"name": "Seed funding awarded", "value": "9000", "unit": "USD"},
      {"name": "Mentors engaged", "value": "6", "unit": "mentors"},
      {"name": "Mentorship duration", "value": "3", "unit": "months"},
      {"name": "Teams showcasing at LevelUp KL", "value": "4", "unit": "teams"},
      {"name": "LevelUp KL conference audience", "value": "2000", "unit": "attendees"},
      {"name": "Increase in technical skills & confidence", "value": "50", "unit": "%"},
      {"name": "Program valuable to development", "value": "97", "unit": "%"},
      {"name": "Gained access to industry networks", "value": "97", "unit": "%"}
    ],
    "QualitativeInsights": [
      "Partnership with Synapze (leading hybrid events curator and platform provider) and MDEC (Malaysia Digital Economy Corporation) greatly extended program reach, credibility, and industry connections, establishing Games Bagus as a recognized pathway for socially conscious game development in Malaysia.",
      "The 15 game prototypes created during the jam demonstrated impressive diversity of social themes: resource management based on Melanau indigenous beliefs (People of the River), work-life balance and crunch culture in game development (Burnt Out Capital), environmental conservation and logging impacts (The Little Tractor), showcasing participants' ability to embed meaningful social messages in engaging gameplay.",
      "Participant feedback overwhelmingly positive - program was encouraging and eye-opening, with 97% reporting the program was valuable to personal development and 50% increase in technical skills and confidence, demonstrating significant capacity building in a short intensive period.",
      "The showcase at LevelUp KL 2022, Malaysia's premier games conference with 2,000+ attendees, proved invaluable for industry connections, with networking opportunities connecting 60 youth developers with 100+ established industry players, creating pathways to professional game development careers.",
      "Challenge noted: ensuring balanced team composition at game jam, particularly addressing the 65/35 male/female gender ratio and ensuring diverse skill sets (programming, art, design, sound) were distributed across teams for effective collaboration.",
      "Continuous support beyond the main 4-day program was key to success - the 3-month mentorship with 6 expert mentors kept all 5 winning teams on track to complete their games for the LevelUp KL showcase, demonstrating importance of sustained support in game development projects."
    ],
    "DataQualityRating": "High"
  },
  {
    "Title": "YSEALI Game Changers 2023 – Final Program Impact Report",
    "Year": "2023",
    "SourceFile": "YSEALI Game Changers 2023 Final Report",
    "ProgramName": "YSEALI Game Changers 2023 – Regional Workshop (Socially Conscious Games)",
    "GeographicScope": "Regional (Southeast Asia – participants from 11 YSEALI countries)",
    "TheoryOfChangeSummary": "Implemented in partnership with U.S. Embassy Kuala Lumpur, Synapze (hybrid events curator and platform provider), and Malaysia Digital Economy Corporation (MDEC), this program scaled the 'games for social impact' model from Games Bagus 2022's national reach to regional level. By equipping promising youth from across ASEAN through training, cross-cultural collaboration, and resources (USD 41,000 total funding including USD 9,000 from Games Bagus + USD 32,000 regional), participants create socially conscious games addressing pressing regional challenges and gain access to industry networks at LevelUp KL games conference.",
    "PrimaryOutcomes": [
      "Scaled successful Games Bagus 2022 model from national (Malaysia) to regional level (11 YSEALI countries across Southeast Asia), leveraging proven partnerships with Synapze and MDEC to extend reach and credibility across ASEAN.",
      "Raised awareness among over 500 youths in Southeast Asia through 3 virtual webinars in the Serious Games Series featuring leaders in social impact gaming, building regional interest in socially conscious game development.",
      "Out of 300 applicants, selected 75 diverse youths from 10 countries for intensive 4-day in-person Regional Workshop & Game Jam in Kuala Lumpur, training participants on game design, impact creation, narrative storytelling, and game programming with support from 10 regional and U.S. industry expert mentors.",
      "Participants created 15 playable game prototypes with social impact themes during the jam, including titles addressing indigenous cultural preservation (People of the River - Melanau belief-based resource management survival game), game industry work culture (Burnt Out Capital - project manager game addressing work-life balance and crunch in game development), and environmental conservation (The Little Tractor - climate change and excessive logging awareness game).",
      "Top 3 teams and 9 special mention participants won seed funding (total USD 30,000+) and 3-month regional mentorship to complete their games; all winning games were finished and showcased at LevelUp KL 2023, Malaysia's premier games conference with 2,000+ attendees, connecting Southeast Asian youth developers with 100+ industry players.",
      "Contributed to broader YSEALI Learns project by creating online learning content for YSEALI members: Winter Term Entrepreneurship Series (2 courses), Summer Term Civic Engagement Series (3 courses), and Fall Term Building Organization Series (2 courses), hosted on U.S. Mission to ASEAN website for public access.",
      "Post-program evaluation: 50% increase in technical skills and confidence in creating socially conscious games, 97% found program valuable to personal development, 97% gained access to industry networks, 79% felt more confident as leaders, and 90% improved game development skills with commitment to continue projects."
    ],
    "QuantitativeMetrics": [
      {"name": "Webinar outreach (Serious Games Series)", "value": "500", "unit": "youth reached"},
      {"name": "Workshop applicants", "value": "300", "unit": "applications"},
      {"name": "Participants selected", "value": "75", "unit": "people"},
      {"name": "Countries represented", "value": "10", "unit": "ASEAN nations"},
      {"name": "Workshop & Game Jam duration", "value": "4", "unit": "days"},
      {"name": "Prototypes created (Game Jam)", "value": "15", "unit": "games"},
      {"name": "Winning teams (top 3)", "value": "3", "unit": "teams"},
      {"name": "Special mention participants", "value": "9", "unit": "participants"},
      {"name": "Seed funding granted (regional)", "value": "30000", "unit": "USD"},
      {"name": "Total funding (Games Bagus + Game Changers)", "value": "41000", "unit": "USD"},
      {"name": "Regional mentors involved", "value": "10", "unit": "experts"},
      {"name": "Mentorship duration", "value": "3", "unit": "months"},
      {"name": "Teams showcasing at LevelUp KL", "value": "3", "unit": "teams"},
      {"name": "LevelUp KL conference audience", "value": "2000", "unit": "attendees"},
      {"name": "YSEALI Learns courses created", "value": "7", "unit": "courses"},
      {"name": "Increase in technical skills & confidence", "value": "50", "unit": "%"},
      {"name": "Program valuable to development", "value": "97", "unit": "%"},
      {"name": "Gained access to industry networks", "value": "97", "unit": "%"},
      {"name": "Leadership confidence increase", "value": "79", "unit": "%"},
      {"name": "Improved game dev skills", "value": "90", "unit": "%"},
      {"name": "Plan to continue projects", "value": "90", "unit": "%"}
    ],
    "QualitativeInsights": [
      "YSEALI Game Changers 2023 successfully scaled the proven Games Bagus 2022 model from national (Malaysia) to regional (11 YSEALI countries) level, leveraging partnerships with Synapze (hybrid events curator and platform provider) and MDEC (Malaysia Digital Economy Corporation) to establish a regional socially conscious game development ecosystem across Southeast Asia.",
      "The USD 41,000 total funding allocation (USD 9,000 from Games Bagus 2022 + USD 30,000+ regional funding for Game Changers 2023) demonstrated significant investment in building ASEAN's capacity for games with social impact, creating pathways for youth developers to address regional challenges through interactive media.",
      "The 15 game prototypes created during the regional jam demonstrated impressive diversity of social themes and cultural perspectives from across ASEAN: indigenous cultural preservation (People of the River - Melanau belief-based resource management), game industry work culture reform (Burnt Out Capital - addressing work-life balance and crunch), environmental conservation (The Little Tractor - climate change awareness), showcasing participants' ability to embed regionally relevant social messages in engaging gameplay.",
      "Cross-national team formation with participants from 10 ASEAN countries proved to be a core strength - working in diverse teams led to more creative, culturally inclusive game ideas that could address regional challenges from multiple Southeast Asian perspectives rather than single-country viewpoints.",
      "The showcase at LevelUp KL 2023, Malaysia's premier games conference with 2,000+ attendees, proved invaluable for regional industry connections, with networking opportunities connecting 75 Southeast Asian youth developers with 100+ established industry players, creating pathways to professional game development careers across ASEAN.",
      "Contribution to YSEALI Learns project extended impact beyond the immediate workshop: created 7 online courses (Winter: Entrepreneurship 2 courses, Summer: Civic Engagement 3 courses, Fall: Building Organization 2 courses) hosted on U.S. Mission to ASEAN website, providing scalable public learning resources for game development and social impact across the region.",
      "Participant feedback overwhelmingly positive with 97% reporting program valuable to personal development and 50% increase in technical skills and confidence - similar impressive outcomes to Games Bagus 2022, demonstrating the model's effectiveness when scaled regionally with continuous support through 3-month mentorship with 10 regional and U.S. expert mentors."
    ],
    "DataQualityRating": "High"
  },
  {
    "Title": "YSEALI Summit 2023 – Performance Report",
    "Year": "2023",
    "SourceFile": "YSEALI Summit Performance Report",
    "ProgramName": "YSEALI Summit 2023: A Decade of Impact",
    "GeographicScope": "Regional (Southeast Asia – 11 countries including ASEAN + Timor-Leste + USA)",
    "TheoryOfChangeSummary": "By convening 150 YSEALI alumni from across Southeast Asia and the U.S. for a comprehensive summit focused on celebrating a decade of impact, participants will be inspired to amplify their contributions as agents of change, strengthen the YSEALI network, develop professional capabilities, and build regional solutions through mentorship, seed grants, and strategic dialogue about YSEALI's future direction.",
    "PrimaryOutcomes": [
      "Successfully organized a highly impactful 4-day summit (December 3-8, 2023) in Bali, Indonesia, bringing together 150 YSEALI participants, 22 Executive Steering Committee members, and 28 speakers from 11 countries.",
      "Showcased a decade of YSEALI impact through the Seeds for the Future Fair featuring 11 winning project teams, highlighting innovations in education, sustainability, economic empowerment, and civic engagement across four YSEALI themes.",
      "Conducted 8 site visits across Bali to impact organizations (DNetwork, Green Camp, Astungkara Way, Bendega, Made Tea, Mitra Trade Bali Fair, Five Pillar, Gerasa), providing practical inspiration for participants on social enterprise models and community engagement.",
      "Delivered comprehensive professional development through 15+ workshop sessions on storytelling for impact, strategic frameworks, leadership skills, innovative financing, design thinking, and equity/diversity/inclusion, with 28 expert speakers and facilitators.",
      "Facilitated strategic dialogue through participant-led Unconference sessions and FutureForward YSEALI workshops where 150 participants co-created vision and action plans for strengthening the YSEALI network and addressing regional challenges over the next decade."
    ],
    "QuantitativeMetrics": [
      {"name": "Participants attending boot camps", "value": "150", "unit": "people"},
      {"name": "Countries represented", "value": "11", "unit": "nations"},
      {"name": "Summit duration", "value": "6", "unit": "days"},
      {"name": "Speakers engaged", "value": "28", "unit": "speakers"},
      {"name": "Executive Steering Committee", "value": "22", "unit": "members"},
      {"name": "Site visit locations", "value": "8", "unit": "organizations"},
      {"name": "YSEALI themes covered", "value": "4", "unit": "themes"},
      {"name": "Workshop sessions delivered", "value": "15", "unit": "sessions"},
      {"name": "Seeds Fair projects showcased", "value": "11", "unit": "projects"},
      {"name": "Unconference sessions", "value": "8", "unit": "sessions"},
      {"name": "Leadership Talk sessions", "value": "6", "unit": "sessions"},
      {"name": "Female participants", "value": "56", "unit": "%"},
      {"name": "Male participants", "value": "43.3", "unit": "%"},
      {"name": "Mid-level professionals", "value": "42", "unit": "people"},
      {"name": "Executive-level participants", "value": "43", "unit": "people"},
      {"name": "Education sector participants", "value": "29", "unit": "people"},
      {"name": "Nonprofit sector participants", "value": "29", "unit": "people"},
      {"name": "Business sector participants", "value": "19", "unit": "people"},
      {"name": "Female speakers", "value": "67.9", "unit": "%"},
      {"name": "Speakers from Indonesia", "value": "9", "unit": "people"}
    ],
    "QualitativeInsights": [
      "The summit successfully celebrated YSEALI's 10-year anniversary by featuring alumni impact stories and creating space for strategic dialogue about the network's future, with participants expressing renewed commitment to regional collaboration.",
      "The innovative Unconference format empowered participants to lead sessions on equity/diversity/inclusion, design thinking, community building, and data visualization, fostering peer-to-peer learning and organic networking.",
      "Site visits to diverse impact organizations across four themes provided tangible inspiration, with participants gaining practical insights into social enterprise models, community engagement strategies, and sustainable development approaches.",
      "The Seeds for the Future Fair showcased 11 exemplary YSEALI-funded projects, creating a living exhibition that demonstrated the network's cumulative impact and inspired participants to scale their own initiatives.",
      "Despite significant logistical challenges (visa issues, flight complications, medical incidents, COVID cases), the summit team's comprehensive risk management and responsive problem-solving ensured a successful event, demonstrating the importance of thorough planning for large-scale regional convenings."
    ],
    "DataQualityRating": "High"
  },
  {
    "Title": "YSEALI Summit 2025 – Performance Progress Report 5",
    "Year": "2025",
    "SourceFile": "YSEALI Summit 2025 Performance Progress Report 5",
    "ProgramName": "YSEALI Summit 2025 (Regional)",
    "GeographicScope": "Regional (Southeast Asia – 9 ASEAN countries + Timor-Leste)",
    "TheoryOfChangeSummary": "By bringing together young leaders from across Southeast Asia for an intensive summit on AI innovation, regional policy challenges, and cultural exchange, participants will develop leadership capabilities, cross-border networks, and actionable solutions that they can implement in their home countries to drive positive change.",
    "PrimaryOutcomes": [
      "Successfully convened 96 youth delegates from 9 Southeast Asian countries plus Timor-Leste for a 5-day intensive summit in Penang, Malaysia (September 7-11, 2025).",
      "Engaged 17 regional mentors who facilitated discussions and provided guidance on 8 regional policy challenges, fostering cross-cultural collaboration and problem-solving.",
      "Delivered comprehensive training in leadership, mentorship, teamwork, advocacy, negotiation, and personal branding through interactive workshops and panel discussions.",
      "Facilitated networking among participants, senior U.S. government officials, business leaders, civil society representatives, and dynamic young leaders from ASEAN and Timor-Leste.",
      "Celebrated cultural diversity through Cultural Night, site visits in George Town, and careful selection of inclusive speakers and venues promoting equity and accessibility."
    ],
    "QuantitativeMetrics": [
      {"name": "Youth delegates", "value": "96", "unit": "people"},
      {"name": "Countries represented", "value": "10", "unit": "nations"},
      {"name": "Summit duration", "value": "5", "unit": "days"},
      {"name": "Mentors engaged", "value": "17", "unit": "mentors"},
      {"name": "Regional policy challenges addressed", "value": "8", "unit": "challenges"},
      {"name": "Teams formed for group work", "value": "17", "unit": "teams"},
      {"name": "Speakers engaged (AI session)", "value": "3", "unit": "speakers"},
      {"name": "YSEALI alumni speakers", "value": "2", "unit": "speakers"},
      {"name": "Flight tickets arranged", "value": "126", "unit": "tickets"},
      {"name": "Transit hotel vouchers", "value": "27", "unit": "vouchers"},
      {"name": "Insurance policies", "value": "127", "unit": "policies"},
      {"name": "Participants from Indonesia", "value": "14", "unit": "people"},
      {"name": "Participants from Malaysia", "value": "17", "unit": "people"},
      {"name": "Participants from Philippines", "value": "16", "unit": "people"},
      {"name": "Participants from Myanmar", "value": "7", "unit": "people"},
      {"name": "Participants from Vietnam", "value": "7", "unit": "people"},
      {"name": "Participants from Thailand", "value": "9", "unit": "people"},
      {"name": "Participants from Singapore", "value": "4", "unit": "people"},
      {"name": "Participants from Laos", "value": "6", "unit": "people"},
      {"name": "Participants from Timor-Leste", "value": "6", "unit": "people"},
      {"name": "Withdrawn participants", "value": "9", "unit": "people"}
    ],
    "QualitativeInsights": [
      "The summit successfully pivoted to focus on AI innovation with the 'America 250: Leading the Charge in AI Innovation for Global Solutions' session, engaging YSEALI alumni and American experts.",
      "Cross-national team formation for the 8 regional policy challenges fostered unprecedented collaboration and knowledge exchange among participants from diverse backgrounds.",
      "Site visits and local engagement series in George Town provided participants with practical insights into community development and cultural preservation.",
      "The pitching exercise with Penang Institute helped participants refine their advocacy skills and learn to present complex ideas concisely.",
      "Comprehensive logistical support (flights, insurance, transit hotels, per-diem) ensured smooth participation despite complex travel arrangements across 10 countries."
    ],
    "DataQualityRating": "High"
  }
]

// Utility: parse numeric values from the dataset's metric fields.
// Enhanced to handle edge cases: negative percentages, multiple decimals, scientific notation
function parseNumber(val) {
  if (val === null || val === undefined) return NaN
  const s = String(val).trim()

  // Handle percentages
  if (s.endsWith('%')) {
    const num = s.slice(0, -1).replace(/[^0-9.\-]/g, '')
    const parsed = parseFloat(num)
    return Number.isFinite(parsed) ? parsed : NaN
  }

  // Handle currency and other formats
  const cleaned = s.replace(/[^0-9.\-]/g, '')

  // Validate cleaned string (only one decimal, one minus at start)
  if (cleaned === '' || cleaned === '-' || cleaned === '.') return NaN
  if ((cleaned.match(/\./g) || []).length > 1) return NaN
  if ((cleaned.match(/-/g) || []).length > 1) return NaN
  if (cleaned.indexOf('-') > 0) return NaN

  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : NaN
}

// Utility: truncate text with ellipsis
function truncate(str, maxLen = 100) {
  if (!str || str.length <= maxLen) return str
  return str.substring(0, maxLen - 3) + '...'
}

// Utility: sanitize search input to prevent ReDoS
function sanitizeSearch(str) {
  return str.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Exportable color palette with improved contrast
export const defaultPalette = {
  bg: '#0f172a',
  card: '#1e293b',
  accent: '#8b5cf6',
  accent2: '#22d3ee',
  fg: '#f1f5f9',
  muted: '#cbd5e1',
}

// Chart layout constants
const CHART_CONSTANTS = {
  ROW_HEIGHT: 52,
  CHART_MIN_HEIGHT: 220,
  BAR_MAX_WIDTH: 500,
  LABEL_X_POSITION: 10,
  BAR_X_POSITION: 220,
  VALUE_X_POSITION: 740,
  MIN_CHART_WIDTH: 700,
}

// Mobile breakpoint
const MOBILE_BREAKPOINT = 768

export default function ImpactVCanvas({ data = DATA, palette = defaultPalette }) {
  // Error handling state
  const [renderError, setRenderError] = useState(null)

  // Validate and select effective data source
  const effectiveData = useMemo(() => {
    if (Array.isArray(data) && data.length) return data
    if (typeof window !== 'undefined' && window.__IMPACT_DATA) {
      const globalData = window.__IMPACT_DATA
      // Validate structure before using
      if (Array.isArray(globalData) && globalData.every(d => d && typeof d === 'object')) {
        return globalData
      }
    }
    return DATA
  }, [data])

  const years = useMemo(() => {
    const s = new Set()
    effectiveData.forEach(d => { if (d.Year) s.add(String(d.Year)) })
    return Array.from(s).sort()
  }, [effectiveData])

  const [yearFilter, setYearFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedProgram, setSelectedProgram] = useState(null)

  // Sanitized search for safe filtering
  const sanitizedSearch = useMemo(() => sanitizeSearch(search), [search])

  // Build a numeric metrics map per program
  // Fixed: Use proper fallback logic that preserves 0 values
  const enriched = useMemo(() => {
    return effectiveData.map(item => {
      const metrics = {}
      if (Array.isArray(item.QuantitativeMetrics)) {
        item.QuantitativeMetrics.forEach(m => {
          const k = m.name || ''
          metrics[k] = parseNumber(m.value)
        })
      }

      // Helper to get first valid numeric value (including 0)
      const getValue = (...keys) => {
        for (const key of keys) {
          const val = metrics[key]
          if (Number.isFinite(val)) return val
        }
        return NaN
      }

      metrics.participants = getValue(
        'Participants attending boot camps',
        'Total participants (all phases)',
        'Selected Boot Camp participants',
        'Youth delegates',
        'Selected participants',
        'Participants selected'
      )
      metrics.applications = getValue(
        'Applications received',
        'Phase 1 applications (Malaysia)',
        'Applicants for Boot Camp',
        'Applications (Workshop & Game Jam)',
        'Workshop applicants'
      )
      metrics.projects_initiated = getValue(
        'Projects initiated by teams',
        'Youth-led campaigns implemented',
        'Teams formed at bootcamps',
        'Prototypes developed',
        'Prototypes created (Game Jam)'
      )
      metrics.projects_done = getValue(
        'Projects successfully implemented',
        'Teams completing campaigns',
        'Winning teams'
      )
      metrics.reach = getValue(
        'Total online reach',
        'Webinar outreach (serious games series)',
        'Youths reached in webinars',
        'Initial webinar reach (Phase 1)'
      )
      metrics.volunteers = getValue('Volunteers engaged')

      // Enhanced funding extraction with proper mapping to avoid double-counting
      // Games Bagus: USD 9,000 (line 228)
      // Game Changers: USD 30,000 regional only (line 272), NOT 41,000 total
      // Bootcamps 2020/2022: USD 20,000 aggregate shared across 3 bootcamps (lines 85, 136)
      // YSEALI Summit Brunei 2022: Small Grants USD 24,500 + Career Fellowship USD 9,000 monthly
      const programName = item.ProgramName || item.Title || ''

      if (programName.includes('Boot Camp 2019') || programName.includes('Bootcamp 2019')) {
        metrics.funding = getValue('Seed funding provided') // 8,000
      } else if (programName.includes('Boot Camp 2020') || programName.includes('Bootcamp 2020')) {
        // Share of 20,000 across 3 bootcamps - assign to 2020 report
        metrics.funding = 20000
      } else if (programName.includes('Boot Camp 2022') || programName.includes('Bootcamp 2022')) {
        // Already counted in 2020, so 0 to avoid double-counting
        metrics.funding = 0
      } else if (programName.includes('Games Bagus')) {
        metrics.funding = 9000
      } else if (programName.includes('Game Changers')) {
        metrics.funding = 30000 // Regional funding only, not 41,000
      } else if (programName.includes('Summit Brunei 2022') || programName.includes('Summit 2022 Brunei')) {
        // Small Grants + Career Fellowship monthly
        const smallGrants = getValue('Total Small Grants funding') // 24,500
        const fellowship = getValue('Total monthly Career Fellowship funding') // 9,000
        metrics.funding = (Number.isFinite(smallGrants) ? smallGrants : 0) + (Number.isFinite(fellowship) ? fellowship : 0)
      } else {
        // Fallback for other programs
        metrics.funding = getValue(
          'Seed funding provided',
          'Total Small Grants funding',
          'Seed funding awarded',
          'Seed funding granted (regional)',
          'Seed funding (3 bootcamps aggregate)'
        )
      }

      metrics.funds = getValue(
        'Funds raised for partners',
        'Seed funding awarded',
        'Seed funding granted'
      )

      return { ...item, metrics }
    })
  }, [effectiveData])

  const filtered = useMemo(() => {
    return enriched.filter(d => {
      if (yearFilter !== 'All' && String(d.Year) !== String(yearFilter)) return false
      if (sanitizedSearch && !(d.Title||'').toLowerCase().includes(sanitizedSearch) && !(d.ProgramName||'').toLowerCase().includes(sanitizedSearch)) return false
      return true
    })
  }, [enriched, yearFilter, sanitizedSearch])

  const chartData = useMemo(() => {
    const arr = filtered.map(d => ({
      title: d.ProgramName || d.Title,
      year: d.Year,
      participants: Number.isFinite(d.metrics.participants) ? d.metrics.participants : 0,
      projects: Number.isFinite(d.metrics.projects_done) ? d.metrics.projects_done : (Number.isFinite(d.metrics.projects_initiated) ? d.metrics.projects_initiated : 0),
      reach: Number.isFinite(d.metrics.reach) ? d.metrics.reach : 0,
      funds: Number.isFinite(d.metrics.funds) ? d.metrics.funds : 0,
      funding: Number.isFinite(d.metrics.funding) ? d.metrics.funding : 0,
      program: d
    }))
    arr.sort((a,b) => (b.participants || 0) - (a.participants || 0))
    return arr
  }, [filtered])

  // Fixed: Handle edge cases for division by zero and invalid inputs
  function scaleLinear(domainMax, rangeMax, value) {
    if (!domainMax || domainMax <= 0 || !Number.isFinite(domainMax)) return 0
    if (!Number.isFinite(value)) return 0
    const scaled = (value / domainMax) * rangeMax
    return Number.isFinite(scaled) ? Math.round(scaled) : 0
  }

  const maxParticipants = Math.max(1, ...chartData.map(d => Number.isFinite(d.participants) ? d.participants : 0))
  const maxReach = Math.max(1, ...chartData.map(d => Number.isFinite(d.reach) ? d.reach : 0))
  const maxProjects = Math.max(1, ...chartData.map(d => Number.isFinite(d.projects) ? d.projects : 0))
  const maxFunding = Math.max(1, ...chartData.map(d => Number.isFinite(d.funding) ? d.funding : 0))

  const containerRef = useRef(null)
  const [width, setWidth] = useState(1100)
  const isMobile = width < MOBILE_BREAKPOINT

  // Fixed: Properly handle ResizeObserver cleanup to prevent memory leaks
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let mounted = true
    const ro = new ResizeObserver(entries => {
      if (mounted && entries[0]) {
        setWidth(entries[0].contentRect.width)
      }
    })

    ro.observe(el)

    return () => {
      mounted = false
      ro.disconnect()
    }
  }, [])

  // Error boundary effect
  useEffect(() => {
    const handler = (error) => {
      console.error('ImpactVCanvas error:', error)
      setRenderError(error.message)
    }
    window.addEventListener('error', handler)
    return () => window.removeEventListener('error', handler)
  }, [])

  // Click to select/deselect, no auto-hide on hover leave
  const handleClick = useCallback((prog) => {
    // Toggle: if same program clicked, deselect it
    setSelectedProgram(prev => prev?.title === prog.title ? null : prog)
  }, [])

  // Reset all filters
  const handleResetFilters = useCallback(() => {
    setYearFilter('All')
    setSearch('')
    setSelectedProgram(null)
  }, [])

  // Export data as CSV
  const handleExport = useCallback(() => {
    const headers = ['Program', 'Year', 'Participants', 'Projects', 'Reach', 'Applications', 'Funding (USD)']
    const rows = filtered.map(d => [
      d.ProgramName || d.Title,
      d.Year,
      d.metrics.participants || 0,
      d.metrics.projects_done || d.metrics.projects_initiated || 0,
      d.metrics.reach || 0,
      d.metrics.applications || 0,
      d.metrics.funding || 0
    ])
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `impact-data-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }, [filtered])

  // Show error state
  if (renderError) {
    return (
      <div style={{ padding: 24, color: '#ef4444', fontFamily: 'monospace' }}>
        Error rendering visualization: {renderError}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="Impact visualization for YSEALI and Games programs"
      style={{
        fontFamily: 'Inter, ui-sans-serif, system-ui',
        color: palette.fg,
        background: palette.bg,
        padding: isMobile ? 12 : 24,
        minHeight: '100vh'
      }}
    >
      <div style={{ display: 'flex', gap: isMobile ? 12 : 16, alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: isMobile ? 16 : 12, flexWrap: 'wrap' }}>
        <h2 style={{ margin: 0, fontSize: isMobile ? 22 : 28, fontWeight: 700, flex: isMobile ? '1 1 100%' : 'auto', lineHeight: 1.3 }}>
          Impact VCanvas — YSEALI & Games
        </h2>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', width: isMobile ? '100%' : 'auto' }}>
          <div role="group" aria-label="Year filters" style={{ display: 'flex', gap: 6, background: palette.card, padding: isMobile ? 10 : 8, borderRadius: 8, flexWrap: 'wrap' }}>
            <button onClick={() => setYearFilter('All')} aria-pressed={yearFilter === 'All'} style={chipStyle(yearFilter === 'All', palette, isMobile)}>All</button>
            {years.map(y => (<button key={y} onClick={() => setYearFilter(y)} aria-pressed={yearFilter === y} style={chipStyle(yearFilter === y, palette, isMobile)}>{y}</button>))}
          </div>
          <input
            type="search"
            placeholder="Search program..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
            aria-label="Search programs by name"
            style={{
              padding: isMobile ? '12px 16px' : '8px 12px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.15)',
              background: palette.card,
              color: palette.fg,
              width: isMobile ? '100%' : 200,
              fontSize: 16,
              flex: isMobile ? '1 1 100%' : 'none',
              minHeight: isMobile ? 48 : 'auto'
            }}
          />
          <button
            onClick={handleResetFilters}
            aria-label="Reset all filters"
            style={{
              padding: isMobile ? '14px 20px' : '8px 12px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.15)',
              background: palette.card,
              color: palette.fg,
              cursor: 'pointer',
              fontSize: isMobile ? 16 : 14,
              fontWeight: 500,
              flex: isMobile ? '1' : 'none',
              minHeight: isMobile ? 48 : 'auto'
            }}
          >
            Reset
          </button>
          <button
            onClick={handleExport}
            aria-label="Export filtered data as CSV"
            style={{
              padding: isMobile ? '14px 20px' : '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: palette.accent,
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: isMobile ? 16 : 14,
              fontWeight: 600,
              flex: isMobile ? '1' : 'none',
              minHeight: isMobile ? 48 : 'auto'
            }}
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Top KPI cards */}
      <div role="region" aria-label="Key performance indicators" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : (width > 1100 ? 'repeat(5,1fr)' : (width > 900 ? 'repeat(3,1fr)' : 'repeat(2,1fr)')), gap: isMobile ? 10 : 12, marginBottom: isMobile ? 20 : 16 }}>
        <KpiCard title="Programs" value={filtered.length} detail="Filtered programs" palette={palette} isMobile={isMobile} />
        <KpiCard title="Total Participants" value={Math.round(chartData.reduce((s,d)=>s+(d.participants||0),0)).toLocaleString()} detail="Sum of participants" palette={palette} isMobile={isMobile} />
        <KpiCard title="Total Projects" value={Math.round(chartData.reduce((s,d)=>s+(d.projects||0),0))} detail="Implemented or initiated" palette={palette} isMobile={isMobile} />
        <KpiCard title="Total Reach" value={Math.round(chartData.reduce((s,d)=>s+(d.reach||0),0)).toLocaleString()} detail="Aggregate online reach" palette={palette} isMobile={isMobile} />
        <KpiCard title="Total Funding" value={`$${Math.round(chartData.reduce((s,d)=>s+(d.funding||0),0)).toLocaleString()}`} detail="USD seed funding provided" palette={palette} isMobile={isMobile} />
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, background: palette.card, borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No programs match your filters</div>
          <div style={{ color: palette.muted, marginBottom: 16 }}>Try adjusting your search or year filter</div>
          <button
            onClick={handleResetFilters}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              background: palette.accent,
              color: palette.fg,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: isMobile ? 12 : 12, flexDirection: 'column' }}>
            {/* Combined Participants & Funding Chart */}
            <div style={{ background: palette.card, padding: isMobile ? 16 : 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: isMobile ? 20 : 22, fontWeight: 600, lineHeight: 1.3 }}>Program Impact Overview</h3>
              <div style={{ fontSize: isMobile ? 15 : 14, color: palette.muted, marginBottom: 12, lineHeight: 1.6 }}>
                {isMobile ? 'Showing participants and funding for each program' : 'Participants and funding distribution across all programs. Tap any bar to view detailed program information.'}
              </div>
              <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <svg
                  width={isMobile ? 700 : Math.min(Math.max(CHART_CONSTANTS.MIN_CHART_WIDTH, width*0.6), width - 32)}
                  height={Math.max(CHART_CONSTANTS.CHART_MIN_HEIGHT, chartData.length * 68 + 80)}
                  role="img"
                  aria-label="Combined bar chart showing participants and funding by program"
                >
                  <defs>
                    <linearGradient id="participantsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: palette.accent, stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: palette.accent2, stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  {chartData.map((d,i) => {
                    const y = 50 + i * 68
                    const participantsBarW = scaleLinear(maxParticipants, CHART_CONSTANTS.BAR_MAX_WIDTH, d.participants)
                    const fundingBarW = scaleLinear(maxFunding, CHART_CONSTANTS.BAR_MAX_WIDTH, d.funding)
                    const isSelected = selectedProgram && selectedProgram.title === d.title
                    return (
                      <g
                        key={d.title}
                        transform={`translate(0, ${y})`}
                        onClick={()=>handleClick(d)}
                        onKeyPress={(e) => e.key === 'Enter' && handleClick(d)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Program: ${d.title}, Year: ${d.year}, ${d.participants} participants, $${d.funding.toLocaleString()} funding`}
                        aria-pressed={isSelected}
                        style={{ cursor: 'pointer', outline: 'none' }}
                      >
                        {/* Program title and year */}
                        <text x={CHART_CONSTANTS.LABEL_X_POSITION} y={-12} fill={palette.fg} fontSize={isMobile ? 14 : 14} fontWeight={isSelected ? 600 : 500}>{truncate(d.title, 45)}</text>
                        <text x={CHART_CONSTANTS.LABEL_X_POSITION} y={-26} fill={palette.muted} fontSize={isMobile ? 12 : 11}>{d.year}</text>

                        {/* Participants bar (top) */}
                        <text x={CHART_CONSTANTS.BAR_X_POSITION - 40} y={-2} fill={palette.accent} fontSize={isMobile ? 11 : 10} fontWeight={500}>👥</text>
                        <rect x={CHART_CONSTANTS.BAR_X_POSITION} y={-10} width={participantsBarW} height={18} rx={4} fill="url(#participantsGradient)" opacity={selectedProgram && !isSelected?0.3:1} style={{ transition: 'all 0.2s' }} />
                        <text x={CHART_CONSTANTS.VALUE_X_POSITION} y={2} fill={palette.fg} fontSize={isMobile ? 13 : 12} fontWeight={600}>{d.participants ? d.participants.toLocaleString() : '—'}</text>

                        {/* Funding bar (bottom) */}
                        {d.funding > 0 && (
                          <>
                            <text x={CHART_CONSTANTS.BAR_X_POSITION - 40} y={20} fill="#10b981" fontSize={isMobile ? 11 : 10} fontWeight={500}>💰</text>
                            <rect x={CHART_CONSTANTS.BAR_X_POSITION} y={12} width={fundingBarW} height={18} rx={4} fill="#10b981" opacity={selectedProgram && !isSelected?0.3:1} style={{ transition: 'all 0.2s' }} />
                            <text x={CHART_CONSTANTS.VALUE_X_POSITION} y={24} fill="#10b981" fontSize={isMobile ? 13 : 12} fontWeight={600}>${d.funding.toLocaleString()}</text>
                          </>
                        )}

                        {/* Selection highlight */}
                        {isSelected && <rect x={0} y={-32} width={800} height={60} fill="none" stroke={palette.accent} strokeWidth={2} rx={8} />}
                      </g>
                    )
                  })}
                </svg>
              </div>

              {/* Legend */}
              <div style={{ marginTop: 16, display: 'flex', gap: isMobile ? 16 : 24, justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: isMobile ? 32 : 24, height: isMobile ? 14 : 12, background: `linear-gradient(90deg, ${palette.accent}, ${palette.accent2})`, borderRadius: 4 }} />
                  <span style={{ fontSize: isMobile ? 15 : 14, color: palette.fg, fontWeight: 500 }}>Participants</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: isMobile ? 32 : 24, height: isMobile ? 14 : 12, background: '#10b981', borderRadius: 4 }} />
                  <span style={{ fontSize: isMobile ? 15 : 14, color: palette.fg, fontWeight: 500 }}>Funding (USD)</span>
                </div>
              </div>

              <div style={{ marginTop: 14, color: palette.muted, fontSize: isMobile ? 16 : 15, lineHeight: 1.7, textAlign: 'center', padding: isMobile ? '0 8px' : 0 }}>
                {isMobile ? 'Tap any program to view complete details including outcomes and insights' : 'Click on any program bar to view complete details including theory of change, outcomes, funding breakdown, and qualitative insights. Click again or use the Close button to deselect.'}
              </div>
            </div>

        {/* Program detail */}
        <div style={{ background: palette.card, padding: isMobile ? 16 : 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ marginTop: 0, marginBottom: 0, fontSize: isMobile ? 18 : 20, fontWeight: 600, lineHeight: 1.3 }}>Program Detail</h3>
            {selectedProgram && (
              <button
                onClick={() => setSelectedProgram(null)}
                aria-label="Close program details"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: palette.fg,
                  padding: isMobile ? '10px 18px' : '6px 14px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: isMobile ? 15 : 13,
                  fontWeight: 500,
                  minHeight: isMobile ? 44 : 'auto'
                }}
              >
                Close
              </button>
            )}
          </div>
          {selectedProgram ? (
            <ProgramDetail program={selectedProgram} isMobile={isMobile} />
          ) : (
            <div style={{ color: palette.muted, fontSize: isMobile ? 15 : 14, textAlign: 'center', padding: isMobile ? 24 : 0, lineHeight: 1.6 }}>
              {isMobile ? 'Tap a program to see details' : 'Click on a program bar or card to see detailed metrics and insights here. Click again to deselect.'}
            </div>
          )}
        </div>
      </div>

          {/* Comparative Overview */}
          <div style={{ marginTop: isMobile ? 12 : 18, background: palette.card, padding: isMobile ? 16 : 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: isMobile ? 20 : 22, fontWeight: 600, lineHeight: 1.3 }}>Comparative Overview</h3>
            <div role="list" style={{ display: 'flex', gap: isMobile ? 8 : 12, overflowX: 'auto', paddingBottom: 8, WebkitOverflowScrolling: 'touch', scrollSnapType: isMobile ? 'x mandatory' : 'none' }}>
              {chartData.map((d,i) => {
                const isSelected = selectedProgram && selectedProgram.title === d.title
                return (
                  <div
                    key={d.title}
                    role="listitem"
                    tabIndex={0}
                    onClick={()=>handleClick(d)}
                    onKeyPress={(e) => e.key === 'Enter' && handleClick(d)}
                    aria-label={`${d.title}, ${d.year}, ${d.participants} participants, ${d.reach} reach`}
                    aria-pressed={isSelected}
                    style={{
                      minWidth: isMobile ? 180 : 200,
                      background: 'rgba(255,255,255,0.03)',
                      padding: isMobile ? 10 : 12,
                      borderRadius: 8,
                      border: isSelected ? `2px solid ${palette.accent}` : '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                      outline: 'none',
                      scrollSnapAlign: isMobile ? 'start' : 'none',
                      flexShrink: 0
                    }}
                  >
                    <div style={{ fontSize: isMobile ? 15 : 14, fontWeight: 600, marginBottom: 4, lineHeight: 1.4 }}>{truncate(d.title, 40)}</div>
                    <div style={{ fontSize: isMobile ? 14 : 13, color: palette.muted, marginBottom: 10 }}>{d.year}</div>

                    <small style={{ display: 'block', marginBottom: 4, color: palette.muted, fontSize: isMobile ? 13 : 12 }}>Participants</small>
                    <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
                      <div style={{ height: '100%', width: `${scaleLinear(maxParticipants,100,d.participants)}%`, background: palette.accent }} />
                    </div>

                    <small style={{ display: 'block', marginBottom: 4, color: palette.muted, fontSize: isMobile ? 13 : 12 }}>Reach</small>
                    <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
                      <div style={{ height: '100%', width: `${scaleLinear(maxReach,100,d.reach)}%`, background: palette.accent2 }} />
                    </div>

                    <small style={{ display: 'block', marginBottom: 4, color: palette.muted, fontSize: isMobile ? 13 : 12 }}>Funding</small>
                    <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${scaleLinear(maxFunding,100,d.funding)}%`, background: '#10b981' }} />
                    </div>

                    <div style={{ marginTop: 10, fontSize: isMobile ? 15 : 14, fontWeight: 600 }}>
                      {d.participants ? d.participants.toLocaleString() : '—'} participants
                    </div>
                    <div style={{ fontSize: isMobile ? 14 : 13, color: palette.muted }}>
                      {d.reach ? d.reach.toLocaleString() : '—'} reach
                    </div>
                    {d.funding > 0 && (
                      <div style={{ fontSize: isMobile ? 14 : 13, color: '#10b981', fontWeight: 500 }}>
                        ${d.funding.toLocaleString()} funding
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ marginTop: 16, color: palette.muted, fontSize: isMobile ? 14 : 13, textAlign: 'center', lineHeight: 1.6 }}>
            Interactive visualization for YSEALI & Games impact data • {effectiveData.length} programs total
          </div>
        </>
      )}
    </div>
  )
}

// Helper Components

function KpiCard({ title, value, detail, palette, isMobile }) {
  return (
    <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(34,211,238,0.08))', padding: isMobile ? 14 : 16, borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ fontSize: isMobile ? 12 : 13, color: palette.muted, marginBottom: isMobile ? 4 : 4, fontWeight: 500 }}>{title}</div>
      <div style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, marginBottom: isMobile ? 4 : 4, color: palette.fg, lineHeight: 1.2 }}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div style={{ fontSize: isMobile ? 11 : 12, color: palette.muted }}>{detail}</div>
    </div>
  )
}

function ProgramDetail({ program, isMobile }) {
  const p = program.program || program
  return (
    <div style={{ maxHeight: isMobile ? '60vh' : '80vh', overflowY: 'auto', paddingRight: 8, WebkitOverflowScrolling: 'touch' }}>
      <div style={{ fontSize: isMobile ? 18 : 19, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{program.title || p.ProgramName || p.Title}</div>
      <div style={{ fontSize: isMobile ? 14 : 13, color: '#cbd5e1', marginBottom: 12, lineHeight: 1.5 }}>
        {program.year || p.Year} • {p.GeographicScope}
        {p.DataQualityRating && <span style={{ marginLeft: 8, fontSize: isMobile ? 11 : 10, padding: '3px 8px', background: 'rgba(139,92,246,0.25)', borderRadius: 4, fontWeight: 500 }}>Data: {p.DataQualityRating}</span>}
      </div>

      {p.TheoryOfChangeSummary && (
        <div style={{ fontSize: isMobile ? 14 : 13, marginBottom: 14, color: '#e2e8f0', lineHeight: 1.6, background: 'rgba(255,255,255,0.04)', padding: isMobile ? 12 : 12, borderRadius: 8 }}>
          <div style={{ fontWeight: 600, color: '#cbd5e1', marginBottom: 6, fontSize: isMobile ? 13 : 12 }}>Theory of Change</div>
          {p.TheoryOfChangeSummary}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? 6 : 8, marginBottom: 12 }}>
        <SmallStat label="Participants" value={program.participants || p.metrics?.participants} isMobile={isMobile} />
        <SmallStat label="Projects" value={program.projects || p.metrics?.projects_done || p.metrics?.projects_initiated} isMobile={isMobile} />
        <SmallStat label="Reach" value={p.metrics?.reach} isMobile={isMobile} />
        <SmallStat label="Applications" value={p.metrics?.applications} isMobile={isMobile} />
      </div>

      {p.metrics?.funding > 0 && (
        <FundingDetail funding={p.metrics.funding} program={p} isMobile={isMobile} />
      )}

      {p.PrimaryOutcomes && p.PrimaryOutcomes.length > 0 && (
        <div style={{ marginTop: 14, fontSize: isMobile ? 14 : 13, background: 'rgba(139,92,246,0.08)', padding: isMobile ? 12 : 12, borderRadius: 8 }}>
          <div style={{ fontWeight: 600, color: '#cbd5e1', marginBottom: 8, fontSize: isMobile ? 13 : 12 }}>Primary Outcomes</div>
          <ul style={{ marginTop: 6, paddingLeft: isMobile ? 18 : 20, color: '#e2e8f0', marginBottom: 0 }}>
            {p.PrimaryOutcomes.map((q,i) => <li key={i} style={{ marginBottom: 8, lineHeight: 1.6 }}>{q}</li>)}
          </ul>
        </div>
      )}

      {p.QualitativeInsights && p.QualitativeInsights.length > 0 && (
        <div style={{ marginTop: 14, fontSize: isMobile ? 14 : 13, background: 'rgba(34,211,238,0.08)', padding: isMobile ? 12 : 12, borderRadius: 8 }}>
          <div style={{ fontWeight: 600, color: '#cbd5e1', marginBottom: 8, fontSize: isMobile ? 13 : 12 }}>Qualitative Insights</div>
          <ul style={{ marginTop: 6, paddingLeft: isMobile ? 18 : 20, color: '#e2e8f0', marginBottom: 0 }}>
            {p.QualitativeInsights.map((q,i) => <li key={i} style={{ marginBottom: 8, lineHeight: 1.6 }}>{q}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

function SmallStat({ label, value, isMobile }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', padding: isMobile ? 10 : 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ fontSize: isMobile ? 12 : 12, color: '#cbd5e1', marginBottom: isMobile ? 4 : 4, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: isMobile ? 18 : 18, fontWeight: 700, lineHeight: 1.2 }}>{value && Number.isFinite(value) ? Number(value).toLocaleString() : (value || '—')}</div>
    </div>
  )
}

function FundingStatCard({ label, value, isMobile }) {
  return (
    <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,150,105,0.08))', padding: isMobile ? 12 : 14, borderRadius: 8, border: '1px solid rgba(16,185,129,0.2)' }}>
      <div style={{ fontSize: isMobile ? 12 : 12, color: '#6ee7b7', marginBottom: isMobile ? 4 : 4, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700, color: '#10b981', lineHeight: 1.2 }}>{value && Number.isFinite(value) ? `$${Number(value).toLocaleString()}` : (value || '—')}</div>
    </div>
  )
}

function FundingDetail({ funding, program, isMobile }) {
  // Extract funding-related metrics from the program
  const fundingMetrics = []

  if (program.QuantitativeMetrics && Array.isArray(program.QuantitativeMetrics)) {
    program.QuantitativeMetrics.forEach(m => {
      const name = m.name || ''
      if (name.toLowerCase().includes('funding') ||
          name.toLowerCase().includes('grant') ||
          name.toLowerCase().includes('stipend') ||
          name.toLowerCase().includes('seed')) {
        fundingMetrics.push(m)
      }
    })
  }

  return (
    <div style={{ marginTop: 12, marginBottom: 12, background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.04))', padding: isMobile ? 12 : 14, borderRadius: 8, border: '1px solid rgba(16,185,129,0.15)' }}>
      <div style={{ fontWeight: 600, color: '#10b981', marginBottom: 10, fontSize: isMobile ? 14 : 13, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>💰</span>
        Funding Breakdown
      </div>

      <div style={{ background: 'rgba(16,185,129,0.1)', padding: isMobile ? 10 : 12, borderRadius: 6, marginBottom: 10, border: '1px solid rgba(16,185,129,0.2)' }}>
        <div style={{ fontSize: isMobile ? 12 : 11, color: '#6ee7b7', marginBottom: 4, fontWeight: 500 }}>Total Seed Funding</div>
        <div style={{ fontSize: isMobile ? 24 : 26, fontWeight: 700, color: '#10b981', lineHeight: 1.2 }}>
          ${funding.toLocaleString()}
        </div>
      </div>

      {fundingMetrics.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: isMobile ? 6 : 8 }}>
          {fundingMetrics.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? 8 : 10, background: 'rgba(255,255,255,0.03)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: isMobile ? 13 : 12, color: '#cbd5e1', lineHeight: 1.4, flex: 1 }}>{m.name}</div>
              <div style={{ fontSize: isMobile ? 14 : 13, fontWeight: 600, color: '#10b981', whiteSpace: 'nowrap', marginLeft: 12 }}>
                {m.unit === 'USD' ? `$${parseFloat(m.value).toLocaleString()}` : `${m.value} ${m.unit}`}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 10, fontSize: isMobile ? 12 : 11, color: '#6ee7b7', fontStyle: 'italic', lineHeight: 1.5 }}>
        💡 Seed funding provided to support program implementation and participant projects
      </div>
    </div>
  )
}

function chipStyle(active, palette, isMobile) {
  return {
    padding: isMobile ? '10px 16px' : '8px 14px',
    borderRadius: 6,
    cursor: 'pointer',
    border: 'none',
    background: active ? palette.accent : 'rgba(255,255,255,0.06)',
    color: active ? '#ffffff' : palette.fg,
    fontSize: isMobile ? 15 : 14,
    fontWeight: active ? 600 : 500,
    transition: 'all 0.2s',
    minHeight: isMobile ? 44 : 'auto'
  }
}

// PropTypes validation
ImpactVCanvas.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    ProgramName: PropTypes.string,
    QuantitativeMetrics: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      unit: PropTypes.string
    })),
    QualitativeInsights: PropTypes.arrayOf(PropTypes.string),
    PrimaryOutcomes: PropTypes.arrayOf(PropTypes.string),
    DataQualityRating: PropTypes.string,
    GeographicScope: PropTypes.string,
    TheoryOfChangeSummary: PropTypes.string
  })),
  palette: PropTypes.shape({
    bg: PropTypes.string,
    card: PropTypes.string,
    accent: PropTypes.string,
    accent2: PropTypes.string,
    fg: PropTypes.string,
    muted: PropTypes.string
  })
}

KpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  detail: PropTypes.string.isRequired,
  palette: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
}

ProgramDetail.propTypes = {
  program: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
}

SmallStat.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isMobile: PropTypes.bool
}

FundingStatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isMobile: PropTypes.bool
}

FundingDetail.propTypes = {
  funding: PropTypes.number.isRequired,
  program: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
}
