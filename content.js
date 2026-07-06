window.LEARNING_CONTENT = {
  lessons: [
    {
      id: "physical",
      title: "The cloud is a physical machine",
      headline: "AI begins with buildings, chips, heat and electricity.",
      body: "An AI model may feel weightless, but every prompt is processed in a data centre. The useful computing load is only part of facility demand: cooling, power conversion, networking, storage, lighting and security all consume electricity. AI facilities are unusually power-dense because accelerators exchange data at very high speed and release concentrated heat.",
      analogy: "Think of a data centre as a busy restaurant. The servers do the cooking, but the whole restaurant also needs refrigerators, ventilation, lighting and electrical equipment. The total bill is larger than the energy used by the ovens alone.",
      bridge: "Before following the electricity through the building, learn what the computing side and the supporting side each do.",
      keyTerms: [
        { term: "Prompt", meaning: "The instruction or question you give an AI system." },
        { term: "Token", meaning: "A small piece of text the model reads or writes. A token may be a whole short word, part of a word, or punctuation." },
        { term: "Accelerator", meaning: "A specialised chip, such as a GPU, designed to perform many AI calculations quickly." },
        { term: "IT power", meaning: "Electricity used directly by servers, AI chips, storage and networking." },
        { term: "PUE", meaning: "A ratio comparing all facility electricity with the electricity used by IT equipment." }
      ],
      model: "Prompt → tokens → accelerator computation → electrical losses + heat → cooling → grid demand.",
      equation: "Facility power = IT power × PUE",
      workedExample: "If IT equipment draws 100 MW and PUE = 1.20, total facility demand is 120 MW. The 20 MW difference supports cooling and other infrastructure.",
      systemMap: ["Utility grid", "Substation + transformer", "Switchgear + UPS", "Power distribution", "AI racks", "Heat removal"],
      metrics: [
        { value: "65 homes", label: "Possible peak-power equivalent of one advanced rack by 2027" },
        { value: "100–130 kW", label: "Illustrative current high-density AI rack range" },
        { value: "PUE 1.2", label: "Means 20% additional facility power above the IT load" }
      ],
      expertNote: "PUE is a facility-efficiency ratio, not a full environmental score. It does not reveal the carbon intensity of electricity, water use, chip manufacturing or whether servers are productively utilised.",
      takeaways: [
        "Power (MW) is an instantaneous rate; energy (MWh or TWh) accumulates that rate over time.",
        "Training creates model weights; inference repeatedly uses them. At scale, aggregate inference can dominate lifetime compute.",
        "Rack density shifts the engineering challenge from total building area to local power delivery and heat flux."
      ]
    },
    {
      id: "demand",
      title: "Why electricity demand is rising",
      headline: "Efficiency per task can fall while system demand climbs.",
      body: "Hardware, quantisation, model architecture and serving software can reduce joules per token. Yet adoption, longer contexts, reasoning models, image and video generation, and autonomous agents expand both the number and complexity of tasks. The rebound effect appears when lower cost and better performance stimulate enough new use to offset efficiency gains.",
      analogy: "Cars can become more fuel-efficient while total fuel use still rises if many more people drive, take longer trips, or buy larger vehicles. AI demand behaves in a similar way.",
      bridge: "Total demand depends on how often AI is used, how much work each use requires, and how efficiently the hardware performs that work.",
      keyTerms: [
        { term: "Task", meaning: "One unit of AI work, such as answering a question, creating an image or analysing a document." },
        { term: "Tokens per task", meaning: "The amount of text an AI reads and produces during one task. Longer input and output usually require more computation." },
        { term: "Joule", meaning: "A unit of energy. Joules per token describes the energy needed to process one token." },
        { term: "Quantisation", meaning: "Representing model numbers with fewer bits so computation and memory use can fall." },
        { term: "Rebound effect", meaning: "Efficiency makes a service cheaper or easier, which encourages more use and offsets some savings." }
      ],
      model: "Annual energy = tasks × tokens per task × joules per token ÷ 3.6 × 10¹⁵ joules/TWh.",
      equation: "Demand growth ≈ activity growth × intensity change × efficiency change",
      workedExample: "If task volume grows 10×, average task intensity grows 3×, and efficiency improves 5×, total energy still grows 6×: 10 × 3 ÷ 5 = 6.",
      systemMap: ["Users + applications", "Requests", "Tokens / task", "Compute operations", "Energy / operation", "Annual TWh"],
      metrics: [
        { value: "≈50%", label: "Growth in AI-focused data-centre electricity use during 2025" },
        { value: "3×", label: "Projected AI-focused electricity growth from 2025 to 2030" },
        { value: "485→950 TWh", label: "IEA central outlook for all data centres, 2025–2030" }
      ],
      expertNote: "A per-query estimate cannot be multiplied blindly into a global forecast. Model size, batch size, hardware utilisation, output length, cooling, location and workload mix vary substantially.",
      takeaways: [
        "Separate activity, task intensity and technical efficiency before judging demand.",
        "A 485-to-950 TWh increase over five years implies roughly a 14% compound annual growth rate.",
        "Scenario ranges matter because future models, applications and efficiency are deeply uncertain."
      ]
    },
    {
      id: "bottlenecks",
      title: "The bottleneck is bigger than electricity",
      headline: "The slowest critical component determines deployment speed.",
      body: "A data centre campus is a coupled infrastructure project. It needs land, permits, fibre, chips, memory, transformers, switchgear, generation, transmission, skilled labour and community acceptance. A nominally adequate power system may still lack deliverable capacity at the exact node and date requested.",
      analogy: "A journey is limited by the slowest required connection. A fast train does not help if the bridge ahead is unfinished. Likewise, available chips do not help if the substation or permit is years late.",
      bridge: "A data centre is not one object. It is a chain of interdependent projects, and every critical link must be ready.",
      keyTerms: [
        { term: "Grid connection", meaning: "The physical equipment, studies and contracts that let a site draw electricity from the network." },
        { term: "Transmission", meaning: "The high-voltage network that moves large amounts of electricity over long distances." },
        { term: "Substation", meaning: "A site that switches electricity and changes voltage so power can enter a local area or facility." },
        { term: "Transformer", meaning: "Equipment that raises or lowers electrical voltage." },
        { term: "Nodal capacity", meaning: "Power that is actually available at a specific location on the grid, not merely somewhere in the wider region." }
      ],
      model: "Deployable capacity = minimum of site, chips, grid connection, generation, equipment, finance and permits.",
      equation: "Time to service = max(lead time of every critical-path component)",
      workedExample: "A 1 GW campus completed in 24 months creates no usable capacity if its transmission upgrade arrives in year five. Announced capacity must therefore be discounted by execution risk and timing.",
      systemMap: ["Generation fleet", "Transmission", "Substation", "Interconnection study", "Local distribution", "Data-centre campus"],
      metrics: [
        { value: "1–2 years", label: "Possible data-centre construction horizon" },
        { value: "Many years", label: "Typical scale of major grid and generation lead times" },
        { value: "Nodal", label: "Capacity must exist at the right place, voltage and time" }
      ],
      expertNote: "Generation adequacy and connection availability are different questions. A region can have enough annual energy yet lack firm capacity, transmission headroom, fault-current capability or local substation capacity.",
      takeaways: [
        "Connection queues contain speculative and competing projects; queue size is not delivered capacity.",
        "Transformers and turbines are not interchangeable commodities: voltage, rating, frequency and technical specifications matter.",
        "Flexibility in location, construction phasing and operating schedule can convert a hard constraint into a manageable one."
      ]
    },
    {
      id: "power",
      title: "How data centres get power",
      headline: "Power portfolios optimise speed, firmness, cost and emissions.",
      body: "Grid supply remains the foundation for most facilities. Corporate PPAs can finance renewable generation, but contractual matching does not necessarily mean the data centre is physically powered by that generator every hour. Batteries manage short-duration fluctuations and backup transitions. Firm generation, transmission and demand flexibility cover longer gaps.",
      analogy: "Reliable power is like planning transport for an important event: a main route, a reserved service, a backup vehicle and contingency time each solve a different risk. One option rarely covers everything.",
      bridge: "Separate energy from reliability. A resource can produce plenty of electricity over a year but still be unavailable during the particular hour the data centre needs it.",
      keyTerms: [
        { term: "PPA", meaning: "A long-term contract to buy electricity or its financial and environmental attributes." },
        { term: "Firm power", meaning: "Supply expected to be available when required, within defined conditions." },
        { term: "Dependable capacity", meaning: "The portion of installed generation that planners expect to be available at a time of need." },
        { term: "UPS", meaning: "An uninterruptible power supply that responds instantly during a disturbance, often using batteries." },
        { term: "Redundancy", meaning: "Extra equipment that keeps the facility operating when a component fails or needs maintenance." }
      ],
      model: "Reliable supply = grid + contracted clean energy + firm capacity + storage + backup + controllable load.",
      equation: "Required installed capacity = peak load ÷ dependable-capacity fraction",
      workedExample: "If a 1 GW load relies on a fleet with 75% dependable availability, it needs about 1.33 GW before reserve margin: 1 ÷ 0.75 = 1.33.",
      systemMap: ["Grid imports", "Renewable PPA", "Firm generation", "Battery / UPS", "Backup generators", "Flexible workload"],
      metrics: [
        { value: "≈40%", label: "Tech share of corporate renewable PPAs signed in 2025" },
        { value: "20–25 GW", label: "Potential data-centre battery capacity by 2030" },
        { value: "+30–70%", label: "Possible onsite generation oversizing for high reliability" }
      ],
      expertNote: "Energy matching and capacity adequacy are not equivalent. A yearly renewable purchase can balance annual MWh while the facility still draws fossil-heavy grid power during specific hours.",
      takeaways: [
        "UPS batteries bridge milliseconds to minutes; energy storage duration determines which problem a battery can solve.",
        "N+1 redundancy means one extra critical component; 2N means a complete independent second system.",
        "Carbon-free energy measured hourly is a stricter target than annual renewable-energy matching."
      ]
    },
    {
      id: "two-way",
      title: "AI can also improve energy systems",
      headline: "The net effect depends on additionality, adoption and verification.",
      body: "AI can improve forecasting, predictive maintenance, industrial control, building operation and grid utilisation. The technical potential is not the realised outcome: organisations need sensors, interoperable data, skilled teams, cybersecurity controls and incentives to act on model outputs. Savings should be measured against a credible counterfactual.",
      analogy: "A weather forecast creates no benefit by itself. Someone must use it to change a plan, and then compare the result with what would probably have happened without the forecast.",
      bridge: "AI creates a recommendation or control signal. Energy is saved only when that output changes a physical decision and the improvement is measured honestly.",
      keyTerms: [
        { term: "Baseline", meaning: "The reference level of energy use before an intervention, adjusted when conditions change." },
        { term: "Counterfactual", meaning: "An estimate of what would have happened without the AI intervention." },
        { term: "Additionality", meaning: "Evidence that the improvement happened because of the intervention and was not going to happen anyway." },
        { term: "Measurement and verification", meaning: "A structured process for calculating savings using measured data and a credible baseline." },
        { term: "Model drift", meaning: "A decline in model performance because real-world patterns change over time." }
      ],
      model: "Net energy effect = AI energy use − verified energy avoided − enabled clean-energy gains.",
      equation: "Verified saving = baseline consumption − measured consumption ± adjustment factors",
      workedExample: "If a process used 100 GWh in a weather-normalised baseline and uses 92 GWh after AI control, verified gross savings are 8 GWh. Subtract the AI system's own energy and check whether production changed.",
      systemMap: ["Sensors", "Data platform", "AI forecast / control", "Human or automated action", "Physical system", "Measurement + verification"],
      metrics: [
        { value: ">13 EJ", label: "Potential savings from documented AI use cases by 2035" },
        { value: "≈3,611 TWh", label: "Electricity-equivalent scale of 13 EJ" },
        { value: "≈10%", label: "Global electricity use covered by open-data policies" }
      ],
      expertNote: "Potential savings are not directly comparable with data-centre electricity without checking energy form, geography, timing and causality. One exajoule equals about 277.8 TWh, but conversion does not make unlike scenarios equivalent.",
      takeaways: [
        "Forecast accuracy creates value only if operators can change dispatch, maintenance or consumption.",
        "Additionality asks whether the improvement would have happened without the AI intervention.",
        "Cybersecurity and model drift turn AI deployment into an ongoing operational discipline, not a one-time installation."
      ]
    }
  ],
  numbers: [
    { value: "950", unit: "TWh", title: "Data-centre demand in 2030", note: "IEA central projection, nearly twice the 485 TWh used in 2025." },
    { value: "≈14", unit: "% CAGR", title: "Implied annual growth", note: "The compound annual rate connecting 485 TWh to 950 TWh over five years." },
    { value: "≈108", unit: "GW", title: "Average 2030 load", note: "950 TWh divided by 8,760 hours; actual peak capacity must be higher." },
    { value: "13", unit: "EJ", title: "Potential energy savings", note: "About 3,611 TWh equivalent, but across multiple fuels and end uses." }
  ],
  flashcards: [
    { q: "What does PUE measure, and what does it omit?", a: "PUE = total facility energy ÷ IT equipment energy. It captures facility overhead but omits electricity carbon intensity, water, embodied emissions and useful server utilisation." },
    { q: "Convert a constant 1 GW load into annual electricity.", a: "1 GW × 8,760 hours = 8.76 TWh per year. At a 90% load factor, it is 7.884 TWh." },
    { q: "How can demand rise when joules per token fall?", a: "Task count, tokens per task and richer modalities can grow faster than efficiency. Analyse activity × intensity ÷ efficiency." },
    { q: "What CAGR connects 485 TWh in 2025 to 950 TWh in 2030?", a: "About 14.4% per year: (950 ÷ 485)^(1/5) − 1." },
    { q: "Why is annual renewable matching not the same as 24/7 clean power?", a: "Annual MWh can balance while hourly production and consumption occur at different times and locations." },
    { q: "Distinguish generation adequacy from grid connection availability.", a: "Adequacy asks whether enough power exists in the system; connection availability asks whether it can physically reach this site at the required voltage and time." },
    { q: "What do N+1 and 2N mean?", a: "N+1 adds one spare critical component. 2N duplicates the complete required system for stronger fault tolerance at higher cost." },
    { q: "Why can a PPA be valuable without physically powering the facility?", a: "It can provide long-term revenue certainty that finances generation and transfers price attributes, while physical electricity still flows through the shared grid." },
    { q: "What is dependable capacity?", a: "The portion of installed capacity expected to be available during system need, after accounting for outages, variability and operational constraints." },
    { q: "Why are TWh and GW not interchangeable?", a: "GW is a rate of power at a moment; TWh is accumulated energy. Converting requires a time period and load or capacity factor." },
    { q: "Convert 13 EJ to TWh.", a: "Multiply by 277.78: 13 EJ ≈ 3,611 TWh." },
    { q: "What is additionality in an AI-for-energy project?", a: "Evidence that the claimed saving or clean-energy gain would not have occurred without the intervention." },
    { q: "What is a counterfactual baseline?", a: "An estimate of what energy use would have been without the project, adjusted for factors such as weather, output and occupancy." },
    { q: "Why can higher rack power improve facility efficiency but worsen local engineering?", a: "Dense racks can reduce space and communication losses, yet sharply increase local electrical and cooling requirements." },
    { q: "State the net-impact equation.", a: "Net energy effect = AI energy used − verified energy avoided − enabled clean-energy gains, with boundaries and time periods stated explicitly." }
  ],
  glossary: [
    { term: "Additionality", category: "Impact", definition: "The extent to which an outcome occurred because of an intervention and would not otherwise have happened.", formula: "Claimed impact must exceed the counterfactual." },
    { term: "Availability", category: "Reliability", definition: "The share of time equipment is capable of operating. High availability requires redundancy, maintenance and rapid recovery.", formula: "Availability = uptime ÷ total time" },
    { term: "Capacity factor", category: "Power", definition: "Actual energy output divided by the energy that would be produced at full rated power over the same period.", formula: "CF = MWh generated ÷ (MW rated × hours)" },
    { term: "CAGR", category: "Economics", definition: "Compound annual growth rate: the constant yearly rate connecting a starting and ending value.", formula: "CAGR = (end ÷ start)^(1/years) − 1" },
    { term: "Carbon intensity", category: "Impact", definition: "Greenhouse-gas emissions per unit of electricity or useful output. It varies by grid, hour and accounting method.", formula: "gCO₂e per kWh" },
    { term: "Counterfactual", category: "Impact", definition: "A defensible estimate of what would have happened without the AI system or energy intervention.", formula: "Impact = observed result − counterfactual result" },
    { term: "Accelerator", category: "Compute", definition: "A specialised processor, such as a GPU, designed to perform many calculations in parallel. AI models use accelerators because matrix operations can be processed much faster than on a general-purpose CPU.", formula: "Performance and energy may be compared per operation or per token" },
    { term: "Baseline", category: "Impact", definition: "The reference estimate of energy use without an intervention. A good baseline adjusts for changes such as weather, production volume and occupancy.", formula: "Saving = adjusted baseline − measured use" },
    { term: "Data centre", category: "Compute", definition: "A facility combining IT equipment with power conversion, cooling, networking, storage, security and backup systems.", formula: "" },
    { term: "Dependable capacity", category: "Reliability", definition: "The capacity expected to be available when needed after accounting for outages, variability and constraints.", formula: "Installed MW × dependable fraction" },
    { term: "EJ", category: "Units", definition: "Exajoule, a unit of energy equal to 10¹⁸ joules. One EJ is about 277.78 TWh.", formula: "1 EJ = 277.78 TWh" },
    { term: "Firm power", category: "Reliability", definition: "Electricity supply that can be relied upon during specified periods, subject to contractual and technical conditions.", formula: "" },
    { term: "Grid connection", category: "Grid", definition: "The equipment, studies, contracts and network capacity needed to inject or withdraw power at a specific node.", formula: "" },
    { term: "High-bandwidth memory", category: "Compute", definition: "Memory placed close to accelerators to move large volumes of data quickly; a key performance and supply-chain constraint.", formula: "Bandwidth commonly expressed in GB/s or TB/s" },
    { term: "Inference", category: "Compute", definition: "Using trained model weights to generate a prediction, token, image or action.", formula: "Energy ≈ tokens × joules/token" },
    { term: "Joule", category: "Units", definition: "The standard unit of energy. A watt is one joule used each second.", formula: "1 watt = 1 joule/second" },
    { term: "Latency", category: "Compute", definition: "Delay between a request and response. Low-latency services can reduce batching efficiency and increase resource needs.", formula: "Usually measured in ms" },
    { term: "Load factor", category: "Power", definition: "Average electrical load divided by peak load over a period.", formula: "Load factor = average MW ÷ peak MW" },
    { term: "N+1 / 2N", category: "Reliability", definition: "Redundancy designs. N+1 adds one spare unit; 2N provides a full independent duplicate system.", formula: "" },
    { term: "PPA", category: "Economics", definition: "Power purchase agreement: a long-term contract defining price, volume, duration and environmental attributes.", formula: "" },
    { term: "Prompt", category: "Compute", definition: "The input or instruction given to an AI system. A prompt can contain text, images, audio or other structured information.", formula: "" },
    { term: "Power density", category: "Compute", definition: "Electrical power concentrated in an area, room or rack. High density intensifies cable, transformer and cooling requirements.", formula: "kW per rack or W/m²" },
    { term: "PUE", category: "Efficiency", definition: "Power usage effectiveness, the standard ratio of whole-facility energy to IT-equipment energy. Lower is better; 1.0 is the theoretical floor.", formula: "PUE = facility energy ÷ IT energy" },
    { term: "Rack", category: "Compute", definition: "A standard enclosure holding servers, accelerators, networking and power equipment. AI racks can exceed 100 kW.", formula: "Power measured in kW/rack" },
    { term: "Rebound effect", category: "Economics", definition: "Efficiency reduces cost or friction, stimulates additional use, and offsets part or all of the expected energy saving.", formula: "Net saving < engineering saving" },
    { term: "TWh", category: "Units", definition: "Terawatt-hour, a unit of energy equal to one billion kilowatt-hours.", formula: "1 TWh = 10⁹ kWh = 3.6 PJ" },
    { term: "Token", category: "Compute", definition: "A small unit of information processed by a language model. In text it may be a short word, part of a word, a number or punctuation. More input and output tokens generally require more computation.", formula: "Task energy ≈ tokens × energy per token" },
    { term: "Training", category: "Compute", definition: "The computational process that adjusts a model's internal parameters using examples. It creates or updates the model that inference later uses.", formula: "" },
    { term: "UPS", category: "Reliability", definition: "Uninterruptible power supply that bridges disturbances and the transition to backup power while conditioning electricity.", formula: "" },
    { term: "Utilisation", category: "Efficiency", definition: "The fraction of available computing capacity doing useful work. Low utilisation can waste embodied and operational resources.", formula: "Useful compute time ÷ available compute time" }
  ],
  confusablePairs: [
    { a: "PUE", b: "Utilisation", difference: "PUE measures facility overhead: total facility energy divided by IT energy. Utilisation measures how much available computing capacity is doing useful work." },
    { a: "TWh", b: "Joule", difference: "A joule is a small unit of energy. A TWh is a huge electricity-system unit used for annual demand." },
    { a: "Training", b: "Inference", difference: "Training creates or updates model weights. Inference uses the trained model to produce outputs." },
    { a: "PPA", b: "Firm power", difference: "A PPA is a contract for electricity or attributes. Firm power is supply expected to be available when needed." },
    { a: "Capacity factor", b: "Load factor", difference: "Capacity factor compares actual output to maximum possible generation. Load factor compares average load to peak load." },
    { a: "Carbon intensity", b: "Additionality", difference: "Carbon intensity measures emissions per unit of output. Additionality asks whether an outcome happened because of the intervention." },
    { a: "Counterfactual", b: "Baseline", difference: "A baseline is the reference energy use. A counterfactual is the broader estimate of what would have happened without the intervention." },
    { a: "Grid connection", b: "Dependable capacity", difference: "Grid connection is the physical and contractual link to the network. Dependable capacity is the portion of capacity expected to be available when needed." },
    { a: "Token", b: "Prompt", difference: "A prompt is the input you give an AI system. Tokens are the small units the model reads or writes." },
    { a: "Rack", b: "Power density", difference: "A rack is the physical enclosure. Power density describes how much power is concentrated in a rack or area." }
  ],
  quiz: [
    { question: "A facility has 80 MW of IT load and PUE 1.25. What is total facility demand?", answers: ["64 MW", "80 MW", "100 MW", "125 MW"], correct: 2, explanation: "Facility demand = IT demand × PUE = 80 × 1.25 = 100 MW." },
    { question: "A constant 500 MW load uses how much energy in one year?", answers: ["0.5 TWh", "4.38 TWh", "8.76 TWh", "43.8 TWh"], correct: 1, explanation: "0.5 GW × 8,760 hours = 4,380 GWh = 4.38 TWh." },
    { question: "What is the approximate CAGR from 485 TWh to 950 TWh over five years?", answers: ["4%", "8%", "14%", "28%"], correct: 2, explanation: "(950/485)^(1/5) − 1 is approximately 14.4%." },
    { question: "Which statement about PUE is correct?", answers: ["It measures grid carbon intensity", "It measures facility overhead relative to IT energy", "It measures useful AI outputs", "It includes chip manufacturing emissions"], correct: 1, explanation: "PUE compares total facility energy with IT-equipment energy; it does not capture carbon or useful work." },
    { question: "Task volume rises 8×, task intensity rises 2× and efficiency improves 4×. Total energy changes by:", answers: ["Falls 2×", "Stays flat", "Rises 2×", "Rises 4×"], correct: 3, explanation: "8 × 2 ÷ 4 = 4, so total energy rises fourfold." },
    { question: "Why can a region have enough annual electricity but no capacity for a new data centre?", answers: ["TWh and fibre are identical", "Local transmission or substation capacity may be constrained", "Annual electricity guarantees hourly delivery", "Data centres do not connect to grids"], correct: 1, explanation: "Energy adequacy does not guarantee deliverability at a specific network node and time." },
    { question: "What does N+1 redundancy mean?", answers: ["No backup equipment", "One complete duplicate facility", "One extra critical component beyond the required number", "One hour of battery storage"], correct: 2, explanation: "N is the required equipment count; +1 provides one spare unit." },
    { question: "A 1 GW load served by capacity with a 75% dependable fraction requires approximately:", answers: ["0.75 GW", "1.0 GW", "1.33 GW", "1.75 GW"], correct: 2, explanation: "Required installed capacity = 1 ÷ 0.75 = 1.33 GW, before additional reserves." },
    { question: "Why does an annual renewable PPA not prove 24/7 carbon-free operation?", answers: ["PPAs cannot finance generation", "Generation and load may occur in different hours and places", "Renewables always run continuously", "Data centres only operate annually"], correct: 1, explanation: "Annual matching does not resolve hourly and locational mismatches." },
    { question: "Which resource is best suited to bridge a millisecond-scale power interruption?", answers: ["A new transmission line", "A UPS", "A five-year PPA", "A permitting reform"], correct: 1, explanation: "A UPS responds essentially instantly and bridges the transition to longer-duration backup." },
    { question: "Thirteen EJ is approximately how many TWh?", answers: ["47 TWh", "278 TWh", "1,300 TWh", "3,611 TWh"], correct: 3, explanation: "13 × 277.78 ≈ 3,611 TWh." },
    { question: "What is required to claim verified AI energy savings?", answers: ["Only a model accuracy score", "A credible baseline, measurement and adjustment for external factors", "Only lower electricity prices", "A larger data centre"], correct: 1, explanation: "Savings require comparison with a credible counterfactual and adjustment for changes such as production or weather." },
    { question: "Which metric best captures how fully computing hardware is doing useful work?", answers: ["PUE", "Carbon intensity", "Utilisation", "Capacity factor of a wind farm"], correct: 2, explanation: "Utilisation measures useful compute activity relative to available computing capacity." },
    { question: "Which is the strongest expert interpretation of the 950 TWh projection?", answers: ["It is a guaranteed outcome", "It is a central scenario shaped by uncertain activity, efficiency and deployment", "It means peak demand is exactly 950 GW", "It includes all energy saved by AI"], correct: 1, explanation: "The figure is a scenario, not certainty, and TWh measures energy rather than instantaneous power." },
    { question: "What is the most complete net-impact framing?", answers: ["AI electricity alone", "Efficiency gains alone", "AI energy used minus verified avoided energy and enabled clean-energy gains", "The number of AI users"], correct: 2, explanation: "A defensible net assessment states boundaries and compares AI's use with verified system benefits." }
  ]
};
