export type SolarFaqItem = {
  question: string;
  answer?: string;
  paragraphs?: string[];
  listIntro?: string;
  bullets?: string[];
  closing?: string;
};

export const SOLAR_FAQ: SolarFaqItem[] = [
  {
    question: "How can I compare the various solar systems available in Australia?",
    paragraphs: [
      "It is easy for Australian consumers to access a comprehensive comparison of solar products and packages from a wide range of reputable suppliers with Utility Choice. All solar retailers compared on Utility Choice have current CEC accreditation, and all solar products displayed on the platform meet relevant international standards.",
      "That's not all! You can also complete the sign-up process and pay your deposit within a single platform—connecting you with the ideal solar solution in just minutes. Once finalized and confirmed, all that's left is to select a date for installation.",
    ],
    listIntro: "Getting started with your solar comparison and connection journey through Utility Choice is simple:",
    bullets: [
      "Visit www.utilitychoice.com.au and click on Solar.",
      "Enter your address and a few details about the solar solution you need.",
      "Compare the available packages in your area.",
      "Choose the solar system that best suits you.",
      "Complete the online application and pay a small deposit.",
      "Receive a call within 48 hours from the selected installer to confirm your order and schedule the installation.",
    ],
  },
  {
    question: "Is investing in solar power a smart choice?",
    paragraphs: [
      "Absolutely! Now is the perfect time to switch to solar energy, benefiting both the environment and your finances. Solar technology has rapidly evolved, providing clean and efficient power solutions for homes and businesses. As countries worldwide work to lower their carbon footprint, adopting solar energy allows you to contribute to reducing climate change impacts.",
      "Beyond its environmental benefits, solar power can also offer significant financial advantages. By using solar energy, you rely less on traditional electricity sources, potentially lowering your quarterly energy bills. While the upfront investment in solar may seem high, the long-term savings and benefits make it a worthwhile investment.",
    ],
  },
  {
    question: "How does a solar photovoltaic (PV) system function?",
    paragraphs: [
      "A solar photovoltaic (PV) system generates electricity using silicon-based solar panels installed on the roof of a home or commercial building. These panels absorb sunlight and convert it into direct current (DC) electricity. One or more inverters then transform this DC power into alternating current (AC), which is the same type of electricity supplied by the grid. Once converted, the solar energy can be used immediately to power household appliances or stored in a battery for later use, depending on your energy consumption needs.",
      "Australian consumers have access to a wide range of solar packages from various manufacturers, suppliers, and installers. Some common types include:",
    ],
    bullets: [
      "**String Inverter Systems** – These systems connect one inverter to one or two arrays (or 'strings') of solar panels on the roof. They are generally more affordable and easier to install but may experience efficiency losses due to shading or excessive heat. Modern string inverters come with Hybrid and Grid-Tied options, featuring Wi-Fi connectivity and a range of functions to enhance performance.",
      "**Micro Inverter Systems** – These systems use smaller inverters attached individually to each solar panel, optimizing energy output and overall system efficiency. Unlike string inverters, micro inverters ensure that if one panel is shaded, the rest continue to operate at peak efficiency. While they offer better energy performance, micro inverter systems are typically more expensive than other options.",
    ],
  },
  {
    question: "What are the various solar system sizes available in Australia?",
    paragraphs: [
      "In Australia, solar panel systems come in various sizes, catering to different energy needs, from small homes to large commercial properties.",
    ],
    bullets: [
      "**3kW System** – Ideal for small homes or limited roof space, generating around 12 kWh daily.",
      "**4.3kW System** – Suitable for medium-sized households, producing approximately 17.2 kWh per day.",
      "**5kW System** – A popular choice for average Australian homes with 3-4 occupants, offering about 20 kWh daily.",
      "**6.1kW System** – Designed for higher energy consumption homes, generating roughly 24.4 kWh per day.",
      "**6.6kW System** – Provides around 26.4 kWh daily, offering great return on investment for energy-intensive households.",
      "**8kW System** – Suitable for larger residential properties or small commercial buildings, producing around 32 kWh per day.",
      "**8.3kW System** – A slightly more powerful option, generating approximately 33.2 kWh daily.",
      "**9kW System** – Tailored for extensive residential or small commercial use, producing around 36 kWh per day.",
      "**9.6kW System** – Steps up capacity for high-energy needs, generating about 38.4 kWh daily.",
      "**10kW System** – A commercial-grade solution, offering around 40 kWh per day, ideal for businesses or large homes.",
      "**10.5kW System** – Generates approximately 42 kWh daily, bridging the gap between residential and commercial needs.",
      "**12kW System** – Suitable for large residential estates or commercial properties, with a daily generation of about 48 kWh.",
      "**13kW – 15kW Systems** (including 13.2kW, 13.3kW, 13.28kW, 14kW) – Designed for larger commercial or industrial applications, producing between 52 to 60 kWh per day.",
    ],
    closing: "Choosing the right solar system depends on factors like energy consumption, roof space, budget, and long-term energy goals. Solar power helps reduce electricity bills while supporting a cleaner environment.",
  },
  {
    question: "Which company offers the top solar energy products in Australia?",
    paragraphs: [
      "Australia has a competitive solar market with numerous reputable providers offering high-quality solar energy products. Some of the best solar retailers and manufacturers in the country include:",
    ],
    bullets: [
      "**SunPower** – Known for its high-efficiency panels and long-term performance warranties.",
      "**LG Solar** – Offers premium solar panels with excellent durability and efficiency.",
      "**Trina Solar** – A well-regarded brand providing cost-effective and reliable solar solutions.",
      "**Jinko Solar** – One of the largest solar manufacturers globally, known for affordability and quality.",
      "**Canadian Solar** – A trusted name in the industry with a strong reputation for high-performance panels.",
      "**Fronius** – A leading inverter brand offering efficient energy conversion and smart monitoring systems.",
      "**SMA** – Known for its high-quality solar inverters with strong performance and durability.",
      "**Enphase Energy** – Specializes in microinverters that optimize energy production at the panel level.",
      "**Tesla** – Offers advanced solar battery solutions like the Powerwall for energy storage.",
      "**GoodWe** – A reliable inverter manufacturer with competitive pricing and high efficiency.",
    ],
    closing: "To find the best solar energy products, it's essential to compare various brands, system sizes, warranties, and installer options. Utility Choice provides an easy way to compare different solar packages online, helping you choose the best option for your energy needs.",
  },
  {
    question: "What is a solar feed-in tariff (FiT)?",
    paragraphs: [
      "A solar feed-in tariff (FiT) is a payment you receive from your energy provider for the excess electricity your solar system generates and exports back to the grid. When your solar panels produce more energy than your household consumes, the surplus power is fed into the electricity network, and you get credited for it on your energy bill.",
      "Feed-in tariff rates vary depending on your location, electricity retailer, and state regulations. Some states offer government-mandated FiTs, while others allow retailers to set their own rates. Choosing the right energy plan with a competitive FiT can help maximize your solar savings.",
    ],
  },
  {
    question: "Is it possible to use solar power during a blackout?",
    answer: "To keep using solar energy during a grid blackout, a reliable battery storage system is essential. While all batteries offer backup power, it's important to remember that their capacity is limited. During an outage, prioritizing essential appliances like the fridge, a few power outlets, and lights is crucial. High-energy-consuming devices such as air conditioners, heaters, and pool filters should be avoided to conserve power.",
  },
  {
    question: "Are solar batteries worth it?",
    paragraphs: [
      "The feasibility of integrating a solar battery into your system depends on multiple factors, including your length of stay at the property, commitment to sustainability, and financial resources. From an environmental perspective, solar batteries enable homes and businesses to maximize their reliance on renewable energy, minimizing grid usage until stored power runs out. Additionally, they provide backup power during grid outages, though it's best to reserve usage for essential appliances.",
      "Financially, the immediate benefits of a solar battery are less certain due to the high upfront cost and extended return on investment. Battery prices and storage capacities vary significantly across Australia, and factors such as household energy consumption, state tariffs, and grid sale limitations can impact the overall savings.",
      "However, in the long run, the case for solar batteries strengthens, depending on the product chosen. Recent studies indicate that in certain states, some solar batteries can pay for themselves before their warranty period expires (as of August 2023).",
    ],
  },
  {
    question: "Is my roof big enough or suitable for a solar system?",
    answer: "The suitability of your roof depends on its size, orientation, shading, and structural integrity. Ideally, north-facing roofs receive the most sunlight in Australia. However, east- and west-facing panels can also generate significant power. A solar installer can assess your roof and recommend the best system size for your space.",
  },
  {
    question: "How much does a solar system cost in Australia?",
    answer: "Solar system costs vary based on size, quality, and brand. A standard 6.6kW system costs between $4,500 and $10,000 after rebates. Larger systems or those with battery storage will cost more.",
  },
  {
    question: "What government rebates and incentives are available for solar in Australia?",
    answer: "The Australian government offers the Small-scale Renewable Energy Scheme (SRES), which provides Small-scale Technology Certificates (STCs) that reduce the upfront cost of solar. Some states also have additional incentives.",
  },
  {
    question: "How long does it take to install a solar system?",
    answer: "A standard residential solar installation typically takes one day. However, larger or more complex systems may take longer. Permits and approvals can add a few weeks to the process.",
  },
  {
    question: "Will solar panels reduce my electricity bill?",
    answer: "Yes! A well-sized solar system can significantly reduce your electricity bills by generating free power during the day. The savings depend on your energy usage, solar system size, and feed-in tariff rates.",
  },
  {
    question: "How do I maintain my solar panels?",
    answer: "Solar panels require minimal maintenance. Cleaning them occasionally to remove dirt and debris can improve efficiency. Regular inspections ensure optimal performance. Most systems come with long-term warranties.",
  },
  {
    question: "Can I add a battery to my existing solar system?",
    answer: "Yes, you can add a battery to store excess solar energy for later use. However, you may need to upgrade your inverter or add a hybrid inverter for compatibility.",
  },
  {
    question: "How much energy can a solar system generate?",
    paragraphs: [
      "The amount of energy a solar system generates depends on several factors, including its size, panel efficiency, location, and weather conditions.",
    ],
    bullets: [
      "**System Size & Output**: A common 6.6kW solar system in Australia typically generates between 24 to 27 kWh per day under optimal conditions. Larger systems, such as 10kW, can produce 40 kWh or more per day.",
      "**Location Impact**: Solar generation varies by region. For example, a 6.6kW system in Sydney may generate around 25 kWh per day, while the same system in Perth could produce slightly more due to higher sunshine hours.",
      "**Weather Conditions**: Solar panels perform best under clear, sunny skies. Cloudy or rainy weather can reduce output significantly, although panels still generate some electricity.",
      "**Seasonal Variations**: Energy generation is higher in summer due to longer daylight hours, while winter months may see reduced production.",
    ],
    closing: "To maximize solar output, it's essential to install panels in a location with minimal shading and an optimal tilt angle for your region.",
  },
  {
    question: "Will solar panels work during a power outage?",
    paragraphs: [
      "Standard grid-connected solar systems do not function during a blackout unless they are paired with a battery backup system. This is because most solar inverters are designed to shut down when they detect a grid failure, ensuring that no electricity is sent back to the grid, which could pose a safety hazard to repair crews. However, if you have a solar battery system with blackout protection , your stored solar energy can be used to power essential appliances during an outage.",
    ],
    bullets: [
      "**Battery Backup Systems**: A battery, such as a Tesla Powerwall or LG Chem, can store excess solar energy for use at night or during power outages. However, not all batteries provide full home backup; many systems only support essential circuits.",
      "**Prioritizing Essential Appliances**: If using a battery during a blackout, you should prioritize running critical appliances like refrigerators, lighting, and basic power points. High-energy devices such as air conditioners and pool pumps can drain the battery quickly.",
    ],
    closing: "If blackout protection is important for you, make sure to discuss battery storage options with your solar provider before installation.",
  },
  {
    question: "How long do solar panels last?",
    paragraphs: [
      "Solar panels are built to be durable and **can last 25 to 30 years** or more. However, their efficiency slightly decreases over time.",
    ],
    bullets: [
      "**Performance Over Time**: Most quality solar panels degrade at a rate of about **0.5% per year**, meaning after 25 years, they should still operate at around **87.5% of their original efficiency**.",
      "**Manufacturer Warranties**: Most panels come with a **25-year performance warranty**, ensuring they maintain a certain efficiency level. Many also have a **10 to 15-year product warranty**, covering manufacturing defects.",
      "**Maintenance & Longevity**: While solar panels are designed to withstand harsh weather conditions, regular maintenance, such as cleaning and inspections, can help extend their lifespan.",
    ],
    closing: "Overall, investing in high-quality panels from reputable brands ensures long-term reliability and efficiency.",
  },
  {
    question: "What happens on cloudy or rainy days?",
    paragraphs: [
      "Solar panels still generate electricity on cloudy and rainy days, but at **a reduced rate** compared to sunny conditions.",
    ],
    bullets: [
      "**Impact of Clouds**: On overcast days, solar panels may produce **10-30% of their usual output**, depending on cloud thickness and light diffusion.",
      "**Rain Benefits**: While rain reduces sunlight, it can also **help clean dust and debris** off the panels, improving efficiency once the skies clear.",
      "**Battery Storage Solutions**: If you have a battery, it can store excess energy from sunny periods to be used on cloudy or rainy days, reducing reliance on grid electricity.",
    ],
    closing: "Even with some weather-related reductions, solar systems in Australia still provide substantial energy savings year-round.",
  },
  {
    question: "What size solar system do I need?",
    paragraphs: [
      "The right system size depends on **your energy consumption, household size, and future energy needs**.",
    ],
    bullets: [
      "**Small Households (2–3 people)**: A 3kW to 5kW system may be sufficient, generating around **12–20 kWh per day**.",
      "**Medium Households (3–5 people)**: A 6.6kW system is the most common choice, producing **24–27 kWh per day**, which covers typical daily usage.",
      "**Large Households (5+ people) or High Usage Homes**: An 8kW to 10kW system or larger may be needed to meet higher energy demands.",
    ],
    closing: "If you plan to add an electric vehicle (EV) charger or battery in the future, it's worth considering a slightly larger system.",
  },
  {
    question: "Do solar panels increase property value?",
    paragraphs: [
      "Yes! Studies show that **homes with solar panels are more attractive to buyers** and can increase property value.",
    ],
    bullets: [
      "**Lower Electricity Bills**: Buyers are willing to pay more for homes with lower ongoing electricity costs.",
      "**Green Appeal**: Many buyers prefer energy-efficient and sustainable homes, making solar a valuable selling point.",
      "**Higher Marketability**: A solar-equipped home can sell faster than a non-solar home, especially in areas with high electricity rates.",
    ],
    closing: "While the exact value increase varies, solar is generally a **worthwhile investment** for homeowners.",
  },
  {
    question: "Can I go off-grid with solar panels?",
    paragraphs: [
      "Going off-grid is possible but requires a **large solar system and battery storage** to meet your energy needs 24/7.",
    ],
    bullets: [
      "**Solar Panel Size**: Off-grid systems often require **10kW+** of solar panels to generate enough power year-round.",
      "**Battery Capacity**: A **large battery bank** is needed to store energy for nighttime and cloudy days.",
      "**Backup Generator**: Many off-grid homes use a **backup generator** to provide power during extended bad weather periods.",
    ],
    closing: "While off-grid solar can provide energy independence, it involves **higher upfront costs** and careful planning.",
  },
  {
    question: "Are all solar panels the same?",
    paragraphs: [
      "No, solar panels differ in **efficiency, durability, and warranty**.",
    ],
    bullets: [
      "**Monocrystalline vs. Polycrystalline**: Monocrystalline panels are more efficient but cost more, while polycrystalline panels are slightly less efficient but more affordable.",
      "**Tier 1 vs. Tier 2 Brands**: Tier 1 brands (e.g., SunPower, LG, REC) offer higher quality, better warranties, and superior efficiency.",
      "**Warranty Length**: Premium panels come with **25-year performance warranties**, while budget brands may offer shorter coverage.",
    ],
    closing: "Choosing high-quality panels ensures **better long-term performance and reliability**.",
  },
];
