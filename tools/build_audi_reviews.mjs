/**
 * Adds Audi reviews to app/src/main/assets/catalog/reviews.json.
 * Generations that ended before 2000 get one line.
 * Later chassis get notes from Moottori's fault lists and, where opened, a road test.
 * Engine rows are not edited.
 */
import fs from "fs";

const gensPath = "app/src/main/assets/catalog/generations.json";
const reviewsPath = "app/src/main/assets/catalog/reviews.json";

const gens = JSON.parse(fs.readFileSync(gensPath, "utf8")).generations.filter((g) =>
  g.id.startsWith("audi-"),
);
const doc = JSON.parse(fs.readFileSync(reviewsPath, "utf8"));

const UA3 = "https://moottori.fi/tyyppiviat/audi-a3/";
const UA4 = "https://moottori.fi/tyyppiviat/audi-a4/";
const UA6 = "https://moottori.fi/tyyppiviat/audi-a6/";

function src(title, text, url) {
  return { source: "Moottori", title, text, url };
}

function isOld(g) {
  return g.yearTo != null && g.yearTo < 2000;
}

function pack(g, o) {
  return {
    generationId: g.id,
    ratingOutOfFive: o.rating ?? null,
    scopeNote: o.scope || null,
    summary: o.summary,
    reddit: [],
    published: o.published || [],
    web: [],
    aiReading: o.ai,
    runningCosts: o.costs,
    recalls: o.recalls,
  };
}

const ea189 =
  "The EA189 campaign, started 4 May 2016 and recorded by Traficom, covers four-cylinder diesels of 1.6 or 2.0 litres built after late 2007, model years 2008–2015. Moottori names the A3, Q3, TT, A4, A5, A6 and Q5. The software recognised a test bench, so on-road emissions were higher than the official figure. A 2.0-litre car needs a software update. A 1.6 also needs an air guide. Finland's count on that campaign is 16,205 cars. It is not a 3.0 TDI item and not a petrol item. Inclusion is a VIN question.";

const auxPump =
  "On some 2.0 TFSI cars the extra coolant pump can overheat after moisture reaches the electronics, with a fire risk. Traficom, June 2018, names the A4, A5 and A6, and the Finnish count on that campaign is 37 cars. A separate 2017 campaign for the A4, A5, A6 and Q5 updates the software so the pump shuts off if it fails, and replaces the pump only if it already has. ADAC also lists a 2.0 TFSI water pump that can overheat.";

const rearAxle =
  "A rear-axle follow-up, finished 2 November 2022, names the A4, A5, A6, A7, A8, Q5, Q7, Q8 and e-tron. After an earlier nut campaign, toe or camber may be wrong, so the rear tyres can wear quickly and the car can feel different. Affected cars are measured and corrected. Inclusion is a VIN question.";

const dmf =
  "Moottori notes that in Finland the dual-mass flywheel on diesel Audis often does not last the life of the engine. That is an observation, not a count of cars.";

function oldReview(g) {
  const span = `${g.yearFrom}–${g.yearTo}`;
  return pack(g, {
    summary: `Audi ${g.code} (${span}), from before 2000. This pass does not write these up. Faults recorded for later Audis are not copied onto this car.`,
    ai: "Nothing is inferred from the A3, A4 or A6 notes.",
    costs: "No consumption figure is attached.",
    recalls: "No recall was opened for this pre-2000 Audi in this pass.",
  });
}

function a3Review(g) {
  const code = g.code;
  if (code === "8L") {
    return pack(g, {
      summary:
        "The 8L is the first A3, 1996–2003, so cars registered after 2000 are still this generation. Moottori's owner notes are a failing air-mass meter, most often on the diesel, coolant leaks, a TDI turbo and a timing belt that must be changed on the stated interval, and a 1.8 turbo that was a favourite to tune and is often worn out because of that.",
      scope: "Window regulators, the climate control, and loose front-seat mounts on older three-door cars are also listed. The later DSG and EA189 notes are not this car.",
      published: [
        src(
          "Audi A3 -tyyppiviat",
          "8L, 1996–2003: air-mass meter, usually the diesel, up to 2003. Coolant leaks up to 2003. TDI turbo and timing belt are called fault-prone, and the belt interval has to be kept. The 1.8 turbo is described as a tuner's favourite and therefore often worn out. Electric windows and the climate control play up. Early three-door cars can have loose front-seat mounts.",
          UA3,
        ),
      ],
      ai: "The belt interval is the maintenance item. A tuned 1.8 is a different car from a standard one, which is the point of that sentence.",
      costs: "No fuel figure is attached. Missing the timing-belt interval is the cost the page is warning about.",
      recalls: "Rear suspension ball joints, VOSA 2001. Cooling-fan short, Traficom and ADAC 2003. Seat belts, VOSA, for 1997–1999.",
    });
  }
  if (code === "8P") {
    return pack(g, {
      summary:
        "The 8P is the second A3, 2003–2013. Moottori records cracks and leaks in the common-rail pipes of 2.0 TDI engines from 2010–2012, a DSG that jerks on cars built September 2008 to July 2009 and needs a software update, and a clutch breather that can destroy the dual-mass flywheel on manual 2.0 TDI cars built October 2003 to June 2005.",
      scope:
        "A line on the same page names cylinder-head faults on early 2.0 TDI engines with the code BKD. That is the older pump-injector diesel, so it belongs with this generation's early cars, not with the later 8V. The 1.2 and 1.4 chain note is written under the 8V.",
      published: [
        src(
          "Audi A3 -tyyppiviat",
          "8P, 2003–2013: common-rail pipe cracks on diesels from 2010–2012. DSG jerking, September 2008 to July 2009, fixed by software. Side-curtain airbags, model year 2006. Clutch-breather fault, October 2003 to June 2005, which can damage the dual-mass flywheel. ADAC roadside items for the older cars include a stuck EGR valve, engine damage up to 2009, a diesel turbo up to 2008, and diesel injectors in 2006–2008. An oil-pump or low-oil-pressure line is on the A4 page for diesels up to 2008, not restated here as an A3 percentage.",
          UA3,
        ),
      ],
      ai: "The DSG update and the common-rail pipes are dated. They are not a claim that every 8P jerks or leaks.",
      costs: "No fuel figure is attached. The flywheel is the expensive clutch-side job the recall is trying to prevent.",
      recalls:
        "Magnetic clutch return spring, cars finished March–August 2011, can leave current on, overheat and is listed with a fire risk, ADAC February 2018. DSG software, Traficom, VOSA and ADAC 2009. Dual-mass flywheel fire risk, VOSA and ADAC 2006. " +
        ea189,
    });
  }
  if (code === "8V" || code === "8V e-tron") {
    const phev = code.includes("e-tron");
    return pack(g, {
      rating: phev ? null : 4,
      summary: phev
        ? "The A3 Sportback e-tron is the plug-in of the 8V, 2014–2020. It is not the later TFSI e and not a full electric car. The 1.4 TFSI chain note matters only if this car was built before the February 2015 change from a chain to a belt. No electric range is copied from another Audi."
        : "The 8V is the 2012–2020 A3. Moottori quotes ADAC calling it very reliable, with no standout roadside fault. The ownership notes are elsewhere: a timing chain on the 1.2 and 1.4 TFSI until production of February 2015, when a belt replaced it, oil use on the larger TFSI engines, and an S tronic whose clutch plates AutoBild puts at about 150,000 km.",
      scope: phev
        ? "Diesel flywheel notes are not this petrol plug-in. The chain sentence is the 1.4, and only before the belt change."
        : "The chain sentence is the 1.2 and 1.4 TFSI, not a 2.0. S tronic clutch wear is the automatic. A manual diesel is the flywheel item. An S3 or RS3 does not inherit the small-petrol chain.",
      published: [
        src(
          "Audi A3 -tyyppiviat",
          "8V, 2012–2020: ADAC calls it very reliable. Owner reports name an MMI system that can crash and is fixed by software, creaking belt buckles, a clunking Magnetic Ride option, turbo sealing, slight oil leaks on 1.8 and 2.0 engines, and oil consumption on the larger TFSI units. The 1.2 and 1.4 TFSI chain can fail, and from February 2015 production the chain was replaced by a belt. AutoBild says S tronic clutch plates need replacing at about 150,000 km, about 1,400 euros in Germany, and that a jerk when pulling away can be a software update if the clutches are not already worn.",
          UA3,
        ),
      ],
      ai: "Reliable in the breakdown statistics and expensive at the clutch or the small-petrol chain can both be true. The chain has a build-date cutoff. The 150,000 km clutch figure is AutoBild's, not a rule for every car.",
      costs: phev
        ? "No energy figure is attached. Use the specification row."
        : "The S tronic clutch job is the cost AutoBild names, about 1,400 euros in Germany. No fuel figure is attached. " + dmf,
      recalls: phev
        ? "High-voltage fuse, campaign 93N8, finished 23 January 2023, names the A3 and the Q3. " + ea189
        : "Front three-point belts, campaign started 20 October 2022, both front belts replaced. Windscreen glue on some 8V, B9 and F5 cars from a 29 August 2017 batch, ADAC May 2018. Rear-seat rail weld, 8V and Q2, weeks 22–31 of 2018. " + ea189,
    });
  }
  return pack(g, {
    summary:
      "The 8Y is the A3 from 2020. Moottori's chain, S tronic and oil-use notes are written for the 8V, and they are not copied here. A front-belt campaign started 20 October 2022 does name the A3.",
    scope:
      code === "8Y TFSI e"
        ? "This row is the plug-in. The 8V e-tron's range is a different generation and is not used."
        : "An S3 or RS3 of this generation is not the 1.4 TFSI of the previous A3.",
    published: [
      src(
        "Audi A3 -tyyppiviat",
        "The detailed owner list is headed 8V, 8P and 8L. The 8Y is not given those chain or clutch sentences. The newer recall block names an A3 front-belt campaign started 20 October 2022, caused by the supplier's process, with both front belts replaced.",
        UA3,
      ),
    ],
    ai: "Leaving the 8V chain off the 8Y is deliberate. The page does not say the new car inherited it.",
    costs: "No consumption figure is attached.",
    recalls:
      "Front three-point belts, from 20 October 2022. " +
      (code === "8Y TFSI e"
        ? "High-voltage fuse campaign 93N8 names the A3 and the Q3 and was finished 23 January 2023."
        : "The EA189 diesel update ends with the 2015 model year, so it is not this generation."),
  });
}

function a4Review(g) {
  const code = g.code;
  if (code === "B5" || code === "B6" || code === "B6/B7" || code === "B7") {
    return pack(g, {
      summary:
        code === "B5"
          ? "The B5 is the first A4, 1994–2002. Moottori's generation-by-generation owner list starts at the later B8, so the 1.8 TFSI oil note is not this car. What the page does list for the early years is front-suspension ball joints that can wear and break, a lower arm, and a fuel pump."
          : `The ${code} is the A4 generation of the early and mid 2000s. ADAC's roadside list names a failed oil pump or low oil pressure on diesels up to 2008, a failed diesel injection pump through 2009, a clogged particulate filter, and a failed diesel turbo around 2007–2008. The 1.8 TFSI oil-consumption note on the same page is the next body, the B8.`,
      scope:
        "An S4 or RS4 of these years is not the four-cylinder diesel. The EA189 update starts with the 2008 model year, so only a very late car in this group can be in it.",
      published: [
        src(
          "Audi A4 -tyyppiviat",
          "Older recalls include front ball joints that wear and can break, ADAC 2004, a lower arm and a fuel pump, Traficom 2004, and an injection-pump fault on the 2.7 and 3.0 TDI, ADAC and VOSA 2005. Roadside items up to about 2011 include a loose engine undertray, ignition coils, a fuel pump, engine damage, a blocked diesel particulate filter, a diesel injection pump, a diesel turbo, a stuck EGR valve, and a failed oil pump or low oil pressure on diesels up to 2008.",
          UA4,
        ),
      ],
      ai: "The oil-pump line is the one buyers mean on an early 2.0 TDI, and the page dates it to diesels up to 2008. It is not given as a percentage, and it is not the B8 petrol's oil use.",
      costs: "No fuel figure is attached. Low oil pressure is the diesel item that can become an engine.",
      recalls:
        "Front ball joints, ADAC 2004. Lower control arm and fuel pump, Traficom 2004. Driver-airbag inflator campaigns from 2020 and 2021 name older A4, Cabriolet, A6, A8 and TT cars with a Takata or NADI inflator. Check the VIN.",
    });
  }
  if (code === "B8") {
    return pack(g, {
      summary:
        "The B8 is the 2007–2016 A4, and the Allroad of those years. Moottori, citing AutoBild, calls high oil consumption on the 1.8 TFSI a common problem. Other owner reports are water in the wiring, damp LED tail lamps, coolant hoses that come off and can overheat the engine, an EGR cooler leak that can lead to engine damage, a manual gearbox that baulks, a seven-speed DSG park lock that sticks, and TDI clutches and flywheels that wear quickly.",
      scope:
        "The 1.8 TFSI oil note is that petrol engine, not a diesel and not the S4 or RS4. The 'few cases' of 2.0 TFSI oil use are written under the next body, the B9. " +
        ea189,
      published: [
        src(
          "Audi A4 -tyyppiviat",
          "B8, 2007–2015 on the page: 1.8 TFSI oil consumption is called a common problem. Hard starting from a battery that is too small. Water in the wiring and a short. LED tail lamps that mist up. Poorly clipped coolant hoses and engines damaged by overheating. An EGR-cooler leak that can lead to engine damage. A manual gearbox that baulks. A seven-speed DSG park lock that sticks. TDI clutch and dual-mass flywheel wear, and a lack of power on TDIs. Alloy wheels that came loose and that Audi replaced free of charge.",
          UA4,
        ),
      ],
      ai: "On this one engine, the 1.8 TFSI, the page uses the word common. The other items are owner reports. Neither is a share of all B8 cars.",
      costs: "Oil is the running cost the page names for the 1.8 TFSI. No litres-per-100 km figure is attached. " + dmf,
      recalls: ea189 + " A 3.0 TDI brake-booster campaign, ADAC and Traficom 2014, says oil vapour in the diaphragm can make the pedal harder.",
    });
  }
  return pack(g, {
    rating: 4,
    summary:
      "The B9 is the A4 from 2015. ADAC calls it very reliable and clearly better than the average car, with no standout roadside fault. Owners have reported a few cases of high oil use on the 2.0 TFSI, which is not the same wording the page uses for the older 1.8. An AutoBild 100,000 km test of a 2.0 TFSI scored 1, the top of that scale, and complained only of a jerky S tronic and leaves packed between the radiators.",
    scope:
      "The 1.8 TFSI 'common' oil note is the B8. A few 2.0 TFSI cases are this generation. An S4 or RS4 is a different engine. The Allroad shares this body.",
    published: [
      src(
        "Audi A4 -tyyppiviat",
        "B9, from 2015: ADAC says very reliable, clearly above average, no particular roadside items. A few owner cases of high 2.0 TFSI oil use. iPhone connection trouble. AutoBild's 100,000 km test gave a 2.0 TFSI a score of 1. The complaints were a jerky S tronic and leaves between the intercooler and the radiator. Shock-absorber forks can fail from a casting fault, 17 cars, Traficom 9 May 2019. Front seat backs can fold in a heavy rear impact because of a weld, model year 2017. B&O speaker trims can fall off, 254 cars.",
        UA4,
      ),
    ],
    ai: "The breakdown record and the endurance-test score describe a solid car. The oil line is explicitly 'a few cases', so it should not be told as the B8 story again. The S tronic jerk is the same complaint as on the test car.",
    costs: "No fuel figure is attached. " + dmf,
    recalls:
      auxPump +
      " Rear-arm nuts from 25 June 2021, then the alignment check finished 2 November 2022. Swivelling towbar, from 7 June 2021. Belt-starter generator, from June and November 2020, can take in moisture and is listed with a fire risk even when parked. That is the mild-hybrid hardware, not every B9. Passenger airbag housing, campaign started 1 February 2023, names the A4, A4 Cabriolet, RS4, A6 and RS6.",
  });
}

function a5Review(g) {
  const current = g.code === "F5";
  return pack(g, {
    summary: current
      ? "The F5 is the A5 from 2016, coupe and Sportback. It shares the B9 A4's campaigns: the extra coolant pump on the 2.0 TFSI, the windscreen glue, and the rear-axle check. The B8 A4's 1.8 TFSI oil note is the previous platform and is not copied as this car's fault."
      : `The ${g.code} is the first A5 generation, from 2007. It sits on the B8 A4 platform, so the B8 notes apply: 1.8 TFSI oil use called common, EGR-cooler leaks, coolant hoses, and TDI clutch and flywheel wear. A Sportback is the 8TA body of the same years.`,
    scope: "An S5 or RS5 does not inherit the 1.8 TFSI oil note or the EA189 diesel update.",
    published: [
      src(
        "Audi A4 -tyyppiviat",
        current
          ? "The B9 block and the recalls name the A5 with the A4: shock forks, screen glue, speaker trims, the 2.0 TFSI extra coolant pump, and the rear-axle check that also names the A5."
          : "The B8 owner list is the platform this A5 uses. Campaigns that name the A5 with the A4 include the extra coolant pump and, for the 3.0 TDI, the brake-booster vacuum pipe.",
        UA4,
      ),
    ],
    ai: "The A5 is treated as the A4 of the same years, which is what the recall lists do. The engine still has to match.",
    costs: "No fuel figure is attached.",
    recalls: current
      ? auxPump + " " + rearAxle
      : ea189 + " 3.0 TDI brake booster, ADAC and Traficom 2014, harder pedal from oil vapour in the diaphragm.",
  });
}

function a6Review(g) {
  const code = g.code;
  if (code === "C5") {
    return pack(g, {
      summary:
        "The C5 is the A6 from 1997 to 2005, including the first Allroad. Inspection notes are play in the steering joints, the front axle, brake pipes and hoses, driveshaft boots, track-rod ends, and oil leaks from the engine and transmission. Front ball joints can wear and fail.",
      scope: "An S6 or RS6 of this generation is not the diesel the later EA189 campaign covers. That campaign starts with the 2008 model year.",
      published: [
        src(
          "Audi A6 -tyyppiviat",
          "C5, 1997–2005: play in steering joints, front-axle bearings, brake pipes and hoses, driveshaft boots, track-rod ends, and oil leaks. Older recalls add front ball joints, ADAC 2004 and VOSA 1999, a lower arm and a fuel pump, Traficom 2004, and a throttle that can ice up below minus 15 degrees on the 1998–1999 2.8 V6.",
          UA6,
        ),
      ],
      ai: "This is wear on a heavily used executive car, which the same page says is typical because these cars cover a lot of kilometres. It is not the C6 oil-pressure story.",
      costs: "No fuel figure is attached. Suspension and brake pipes are the inspection items.",
      recalls: "Front ball joints, ADAC 2004. Driver-airbag inflators from 2020–2021 name older A6 cars with a three-spoke wheel or a Takata NADI inflator. Check the VIN.",
    });
  }
  if (code === "C6") {
    return pack(g, {
      summary:
        "The C6 is the 2004–2011 A6. ADAC's roadside list names a stuck EGR valve for 2007–2011, engine damage or low oil pressure on diesels from 2007–2010, a clogged particulate filter, and a failed diesel turbo around 2007–2008. The page also says the Multitronic gearbox, which had been fault-prone, is more reliable in the next A6 than in this one, with faults still turning up one car at a time.",
      scope: "Low oil pressure is the diesel item. An S6 or RS6 is not that diesel. The EA189 update covers the 2.0 TDI from model year 2008, not a 3.0 TDI.",
      published: [
        src(
          "Audi A6 -tyyppiviat",
          "C6, 2004–2011: brake hoses can perish, springs break, dampers leak, front-arm and anti-roll-bar bushes wear, brake discs wear on high-mileage cars, and the engine leaks oil. Roadside items include a stuck EGR valve, low oil pressure or engine damage on 2007–2010 diesels, a blocked particulate filter, a diesel turbo, a flat battery, engine-control electrical faults, a stuck ignition switch and a stuck electric parking brake.",
          UA6,
        ),
      ],
      ai: "The diesel oil-pressure line matches the same years as the A4's oil-pump note. The page does not give a percentage. Multitronic faults are described as individual cases, including on the newer car.",
      costs: "No fuel figure is attached. Suspension bushes are what high mileage shows up as on this car.",
      recalls: ea189 + " Boot-lid motor, ADAC, VOSA and Traficom 2007. Injection pump on the 2.7 and 3.0 TDI is listed without a model year on the A6 page.",
    });
  }
  if (code === "C7") {
    return pack(g, {
      rating: 4,
      summary:
        "The C7 is the 2011–2018 A6. ADAC calls it reliable, with few faults, even though the cars cover a very high mileage. An A6 Avant and an S6 passed Auto Motor und Sport's 100,000 km test cleanly. A 2.0 TDI of 130 kW developed an exhaust-manifold gasket leak in AutoBild's 100,000 km test. Optional full-LED headlights can cost up to 2,500 euros if they fail.",
      scope:
        "The manifold leak is that 2.0 TDI test car. A 3.0 TDI has its own notes: a brake booster on cars built March–December 2012, and individual turbo failures from overheating. An S6 or RS6 is named in a later turbo-oil-strainer campaign, not in the 2.0 TDI test.",
      published: [
        src(
          "Audi A6 -tyyppiviat",
          "C7, 2011–2018: reliable despite very high mileage. Avant and S6 completed the Auto Motor und Sport 100,000 km test properly. The 177 hp 2.0 TDI leaked at the exhaust-manifold gasket in AutoBild's test. Weight and mileage show up as worn bushes and joints. Full-LED headlights can cost up to 2,500 euros to repair. Multitronic is more reliable than in the previous A6, with faults still seen one car at a time. High-mileage wear, an MMI screen that plays up, and rear pads that wear faster on cars with adaptive cruise are the inspection notes for the related 4G years.",
          UA6,
        ),
      ],
      ai: "Two endurance tests and a clean breakdown record are the positive side. The manifold gasket is one test car. LED headlight cost is a parts price, not a failure rate.",
      costs: "No fuel figure is attached. The headline repair price on the page is the LED headlight, up to 2,500 euros. " + dmf,
      recalls:
        "3.0 TDI brake booster, March–December 2012 production. Fuel leak from the high-pressure pipes on the 3.0 V6 petrol, ADAC and KBA 2015. Engine software that type-approval authorities had not accepted, model years 2008–2018, names the C7 A6, the 4G A7 and the D4 A8, ADAC November 2018. " +
        ea189,
    });
  }
  if (code === "C8 e-tron") {
    return pack(g, {
      rating: 4,
      summary:
        "The A6 e-tron is a different car from the combustion A6, with its own body and with rear-wheel drive on the tested Performance version. Moottori's Avant test praises the air suspension, the quiet and the way it drives, and measured 18.5 kWh/100 km on a sunny spring trip against a stated 15.4.",
      scope:
        "The test car is the rear-drive Performance, 270 kW. The 210 kW version, the four-wheel-drive cars and any S6 are different outputs. The combustion C8's fuel campaigns do not apply.",
      published: [
        src(
          "Koeajo: Audi A6 Avant e-tron Performance",
          "The test car is rear-wheel drive, 270 kW and 565 Nm. The battery is 94.9 kWh net and 100 kWh gross. AC charging is 11 kW and DC is 270 kW, on the left side only. Stated use is 15.4 kWh/100 km and range 616 km. The test saw 18.5 kWh/100 km and calls a range over 500 km realistic in those conditions. 0 to 100 km/h is 5.4 seconds. The boot is 502 litres and the car weighs 2,260 kg. Euro NCAP is given as 5 stars in 2025. Price from 66,990 euros. The battery warranty is 8 years or 160,000 km. The car warranty is 2 years. The writer says it is more comfortable than an EQE and level with an i5 to drive.",
          "https://moottori.fi/koeajo/koeajo-audi-a6-avant-e-tron-performance-sahkoistyminen-ja-vaihto-takavetoon/",
        ),
      ],
      ai: "The test is one version in spring weather. Winter use is not in that figure. It is not a review of the petrol A6, which the same article says is a different structure.",
      costs:
        "Brochure use for the tested car is 15.4 kWh/100 km and the road figure in the test was 18.5. DC charging is 270 kW. The battery warranty is 8 years or 160,000 km.",
      recalls: "The combustion A6 fuel-sensor and ECU campaigns are not applied to this electric car.",
    });
  }
  if (code === "C8 TFSI e") {
    return pack(g, {
      summary:
        "This is the plug-in combustion A6, not the A6 e-tron. Moottori's electric test says the two cars do not share a body. The e-tron's 15.4 kWh and 616 km are not copied here.",
      scope: "No electric range is stated, because the opened test is a different car.",
      published: [
        src(
          "Koeajo: Audi A6 Avant e-tron Performance",
          "The article's point for this row is the warning: the electric A6 e-tron and the combustion A6 are different cars, including the structure. Figures from the electric test are not used.",
          "https://moottori.fi/koeajo/koeajo-audi-a6-avant-e-tron-performance-sahkoistyminen-ja-vaihto-takavetoon/",
        ),
      ],
      ai: "Keeping the two A6s apart is the whole point of that article.",
      costs: "No consumption figure is attached. Use the specification row.",
      recalls:
        "A fuel-level sensor campaign started 20 January 2023 names the A6 and A7: the sender can stick and the gauge can read high, so the car can run out with no warning. An engine-controller campaign started 10 June 2022 names the A6 and can let the engine stall. " +
        rearAxle,
    });
  }
  return pack(g, {
    summary:
      "The C8 is the A6 from 2018, still the combustion car. It is not the A6 e-tron. Campaigns that name the A6 in these years are a fuel-level sender that can stick, an engine controller that can stall the engine, a turbo oil strainer on the S6 and RS6, and a rear-axle alignment check.",
    scope:
      "The e-tron's energy figures stay on the electric page. An S6 or RS6 is the turbo-oil-strainer campaign, not the ordinary 2.0 TDI story from the C7.",
    published: [
      src(
        "Audi A6 -tyyppiviat",
        "From 2022–2023: the A6 and A7 fuel sender can stick in the vent pipe and the range display can lie, campaign started 20 January 2023. An A6 engine controller with parts that are out of specification can make the engine run badly or stall, campaign started 10 June 2022. The S6, S7, S8, RS6 and RS7 need a coarser turbo oil strainer because deposits can starve the turbo, campaign finished 31 January 2023. The rear-axle check names the A6.",
        UA6,
      ),
    ],
    ai: "These are dated campaigns with a VIN check, not a description of how every C8 drives. No road-test score was opened for the combustion C8 in this pass.",
    costs: "No fuel figure is attached.",
    recalls: rearAxle + " " + auxPump,
  });
}

function a7Review(g) {
  const phev = g.code.includes("TFSI");
  const older = g.code === "4G";
  return pack(g, {
    summary: phev
      ? "This is the plug-in A7. The A6 e-tron's battery figures are a different car and are not copied here. A fuel-sender campaign names the A7 with the A6."
      : older
        ? "The 4G is the first A7, 2010–2018, on the C7 A6 platform. ADAC's clean breakdown note for that A6 generation is the closest record. The unapproved-software campaign names the 4G A7 with the C7 A6 and the D4 A8."
        : "The 4K is the A7 from 2018. It shares the current A6's fuel-sender campaign and the rear-axle check. The S7 and RS7 are named in the turbo oil-strainer campaign. No electric figure is taken from the A6 e-tron.",
    scope: "An RS7 is not the 2.0 TDI, and it is not the plug-in.",
    published: [
      src(
        "Audi A6 -tyyppiviat",
        "The A7 is named with the A6 on the fuel-sender campaign started 20 January 2023, on the software campaign of November 2018 for the 4G, and on the turbo oil strainer for the S7 and RS7. A 3.0 TFSI fuel-rail leak names the A6, A7 and Q7, 7 cars, Traficom 18 February 2019.",
        UA6,
      ),
    ],
    ai: "The A7 page in this pass is the A6 list, because that is where Moottori names the A7. A separate drive was not opened.",
    costs: "No consumption figure is attached.",
    recalls: older
      ? "Engine software not accepted by the authorities, model years 2008–2018, ADAC November 2018. 3.0 TFSI fuel rail, 7 cars, Traficom 18 February 2019."
      : "Fuel-level sender, from 20 January 2023. " + rearAxle,
  });
}

function a8Review(g) {
  const code = g.code;
  return pack(g, {
    summary:
      code === "D2"
        ? "The D2 is the first A8, 1994–2002. A later software campaign for the A8 is the D4, so it is not applied here. Driver-airbag inflator campaigns do name older A8 cars."
        : code === "D4"
          ? "The D4 is the 2010–2017 A8. The campaign about engine software the authorities had not accepted names the D4 together with the C7 A6 and the 4G A7, for model years 2008–2018."
          : code === "D5"
            ? "The D5 is the A8 from 2017. The rear-axle check names the A8. The S8 is named in the turbo oil-strainer campaign with the S6 and RS6. A road test was not opened."
            : "The D3 is the 2002–2009 A8. The D4 software campaign is the next car. No separate fault list was opened, so the A6 C6 diesel notes are not copied across.",
    scope: "An S8 is the performance engine. The ordinary diesel campaigns are not assumed to be its.",
    published: [
      src(
        "Audi A6 -tyyppiviat",
        "The A8 is named on the driver-airbag inflator campaigns, on the D4 software campaign of November 2018, on the rear-axle check, and the S8 is named on the turbo oil strainer finished 31 January 2023.",
        UA6,
      ),
    ],
    ai: "Only the campaigns that name the A8 are written. The A6's 2.0 TDI test is not an A8 review.",
    costs: "No fuel figure is attached.",
    recalls:
      code === "D5"
        ? rearAxle + " S8 turbo oil strainer, if this car is the S8."
        : "Driver-airbag inflator work from 2020–2021 names the A8 among older Audis with the affected wheel or inflator. Check the VIN.",
  });
}

function q5Review(g) {
  const phev = g.code.includes("TFSI");
  const old = g.code === "8R";
  return pack(g, {
    summary: phev
      ? "This is the plug-in Q5. The rear-axle check names the Q5. No electric range is copied from the Q4 e-tron, which is a different car."
      : old
        ? "The 8R is the first Q5, 2008–2017. It is on the B8 A4 platform, so the B8 notes are the ones that fit: 1.8 TFSI oil use, TDI flywheels, and the EA189 update for a 1.6 or 2.0 diesel of model years 2008–2015. The SQ5 is not that four-cylinder diesel."
        : "The FY is the Q5 from 2017, and the Sportback is the same generation. The extra coolant-pump campaign names the Q5 with the A4, A5 and A6. The rear-axle check names the Q5. The B8 oil note is the previous car.",
    scope: "An SQ5 does not inherit the EA189 diesel update or the 1.8 TFSI oil note.",
    published: [
      src(
        "Audi A4 -tyyppiviat",
        "The Q5 is named with the A4 and A5 on the auxiliary-heater element campaign, 6,603 cars, started 19 February 2018, and with the A4, A5 and A6 on the extra coolant-pump software. The rear-axle check names the Q5. The EA189 text names the Q5 for the 1.6 and 2.0 diesels of 2008–2015.",
        UA4,
      ),
    ],
    ai: "The Q5 is reviewed from the A4 page because that is where the campaigns name it. A separate Q5 road test was not opened.",
    costs: "No fuel figure is attached.",
    recalls: old ? ea189 : auxPump + " " + rearAxle,
  });
}

function q3Review(g) {
  const phev = g.code.includes("TFSI");
  return pack(g, {
    summary: phev
      ? "This is the plug-in Q3. A high-voltage fuse campaign names the Q3 with the A3. The Q4 e-tron's range is a different car and is not copied here."
      : g.code === "8U"
        ? "The 8U is the first Q3, 2011–2018. The EA189 update names the Q3 for 1.6 and 2.0 diesels of model years 2008–2015. An RS Q3 is not that diesel."
        : "The F3 is the Q3 from 2018. The 8V A3 chain note is not copied onto it. The EA189 window ends with the 2015 model year.",
    scope: "An RS Q3 is the five-cylinder petrol. It is not the EA189 diesel.",
    published: [
      src(
        "Audi A3 -tyyppiviat",
        "The EA189 paragraph names the Q3 with the A3, TT, A4, A5, A6 and Q5. The high-voltage fuse campaign 93N8 names the A3 and the Q3 and was finished 23 January 2023.",
        UA3,
      ),
    ],
    ai: "No Q3 driving impression was opened, so none is invented from the A3.",
    costs: "No fuel figure is attached.",
    recalls: g.code === "8U" ? ea189 : phev ? "High-voltage fuse, campaign 93N8, finished 23 January 2023." : "The EA189 update does not cover this later Q3.",
  });
}

function q7Review(g) {
  const phev = g.code.includes("TFSI");
  const first = g.code === "4L";
  return pack(g, {
    summary: first
      ? "The 4L is the first Q7, 2005–2015. A separate Q7 fault page was not opened. The 3.0 TDI brake-booster note and the EA189 update are not automatically this V6 or V8. No air-suspension failure rate is invented."
      : phev
        ? "This is the plug-in Q7 or Q8. The rear-axle check names the Q7 and the Q8. The Q8 e-tron's battery figures are a different car."
        : "The 4M is the Q7 from 2015, and the same code covers the Q8, SQ7, SQ8 and RS Q8 in this catalog. The rear-axle check names the Q7 and Q8. A 3.0 TFSI fuel-rail campaign names the Q7, 7 cars. An RS Q8 is not that V6.",
    scope: "Plug-in range stays on the TFSI e rows only when a test is actually opened. None was opened here.",
    published: [
      src(
        "Audi A6 -tyyppiviat",
        "A 3.0 TFSI fuel-rail leak names the A6, A7 and Q7, 7 cars, Traficom 18 February 2019. The rear-axle check names the Q7 and the Q8 with the A4, A5, A6, A7, A8 and e-tron.",
        UA6,
      ),
    ],
    ai: "Seven cars on a fuel-rail campaign is the scale the page gives. It is not a reason to call every Q7 a leaker.",
    costs: "No fuel figure is attached.",
    recalls: first
      ? "No 4L-specific campaign was opened in this pass."
      : rearAxle + " 3.0 TFSI fuel rail, Q7, 7 cars, Traficom 18 February 2019.",
  });
}

function q2Review(g) {
  return pack(g, {
    summary:
      "The GA is the Q2 from 2016. A windscreen-glue campaign that names the A3, A4 and A5 also names the Q2, including the rear glass. A rear-seat rail weld names the Q2 with the 8V A3. An SQ2 is not the diesel those A3 notes describe.",
    scope: "The 8V A3 chain is not copied onto the Q2. The glue campaign says no problems were known and the cars could be driven.",
    published: [
      src(
        "Audi A3 -tyyppiviat",
        "Windscreen glue, a batch dated 29 August 2017, names the 8V A3, B9 A4 and F5 A5, and for the Q2 the rear glass as well. ADAC May 2018 says no problems were known. Rear-seat rail weld, weeks 22–31 of 2018, names the 8V and the Q2. Rear-seat back, 14 cars, Traficom 30 November 2018, names the A3 and the Q2.",
        UA3,
      ),
    ],
    ai: "The Q2's sourced items are small campaigns, not a reliability score.",
    costs: "No fuel figure is attached.",
    recalls: "Screen glue and rear-seat frame, as on the A3 page. The work is free.",
  });
}

function a1Review(g) {
  return pack(g, {
    summary:
      g.code === "8X"
        ? "The 8X is the first A1, 2010–2018. It shares the small Volkswagen-group petrols of that era. The A3 page's chain note is written for the A3 1.2 and 1.4 TFSI, not stated as an A1 campaign, so it is not copied here as if Moottori had tested this car."
        : "The GB is the A1 from 2018. The 8V A3 fault list is not copied onto it. A separate A1 page was not opened in this pass.",
    scope: "No S1 is in this catalog generation list. Nothing is added from the S3.",
    ai: "A missing A1 fault page is left empty rather than filled from the A3.",
    costs: "No fuel figure is attached.",
    recalls: "No A1-specific campaign was opened in this pass.",
  });
}

function ttReview(g) {
  return pack(g, {
    summary:
      g.code === "8N"
        ? "The 8N is the first TT, 1998–2006. Driver-airbag campaigns name the TT with older A4, A6 and A8 cars. The later EA189 diesel update is not this generation's main engine."
        : g.code === "8J"
          ? "The 8J is the second TT, 2006–2014, including the TTS and the TT RS. The EA189 update names the TT for a 2.0 TDI of model years 2008–2015. A TTS or TT RS petrol is not that diesel."
          : "The 8S is the third TT, 2014–2023. The EA189 window ends with the 2015 model year, so only an early diesel can be in it. A TTS or TT RS is not given the A3's 1.4 chain.",
    scope: "The TT RS five-cylinder is not the 2.0 TDI.",
    published: [
      src(
        "Audi A3 -tyyppiviat",
        "The EA189 paragraph names the TT with the A3, Q3, A4, A5, A6 and Q5, for 1.6 and 2.0 diesels of model years 2008–2015.",
        UA3,
      ),
    ],
    ai: "The TT's sourced diesel item is the emissions update, not a breakdown rate.",
    costs: "No fuel figure is attached.",
    recalls:
      g.code === "8N"
        ? "Driver-airbag inflator campaigns from 2020–2021 name the TT among older Audis. Check the VIN."
        : ea189,
  });
}

function a2Review(g) {
  return pack(g, {
    summary:
      "The A2, code 8Z, is the aluminium small Audi built from 1999 to 2005. A fault page for it was not opened, and the A3's later DSG and EA189 notes are not copied onto it.",
    ai: "The A2 is a different car from the A3 of the same years. No fault is invented to fill the page.",
    costs: "No fuel figure is attached.",
    recalls: "No A2 campaign was opened in this pass.",
  });
}

function r8Review(g) {
  return pack(g, {
    summary:
      g.code === "Typ 42"
        ? "The first R8, 2006–2015, is a mid-engine petrol sports car. The diesel campaigns on the A4 and A6 pages do not apply. A road test was not opened, so no power figure is invented."
        : "The second R8, 2015–2023, is the same kind of car with a later body. Diesel and TFSI-pump campaigns from the saloons are not applied. No performance figure is copied from the e-tron GT.",
    scope: "This is not an RS e-tron GT and not an RS6.",
    ai: "Leaving the R8 without a borrowed fault list is the point.",
    costs: "No fuel figure is attached.",
    recalls: "No R8 campaign was opened in this pass.",
  });
}

function q4Review(g) {
  return pack(g, {
    rating: 4,
    summary:
      "The Q4 e-tron is Audi's smaller electric SUV, on the group MEB platform. Moottori's test of the updated 45 e-tron likes it as one of the better cars on that platform and thinks the price is the catch.",
    scope:
      "The figures are the 45 e-tron, 210 kW, four-wheel drive, 77 kWh net. A rear-drive Q4 or the Sportback is a different range. They are not the Q8 e-tron's figures.",
    published: [
      src(
        "Koeajo: Audi Q4 e-tron",
        "The tested Q4 45 e-tron is four-wheel drive, 210 kW and 679 Nm. The battery is 82 kWh gross and 77 kWh net. AC charging is 11 kW and DC is 175 kW. Stated use is 17.3 kWh/100 km and range 503 km. 0 to 100 km/h is 6.6 seconds. The boot is 520 litres and the car weighs 2,235 kg. Euro NCAP is given as 5 stars in 2021. Price from 58,490 euros. The battery warranty is 8 years or 160,000 km. The car warranty is 2 years. The writer says a few options take it past 70,000 euros.",
        "https://moottori.fi/koeajo/koeajo-audi-q4-e-tron-entista-pidemmalle-ja-entista-paremmin/",
      ),
    ],
    ai: "The praise is for the updated car on the shared electric platform, and the complaint is price. There is no long owner record in the test.",
    costs:
      "Stated use is 17.3 kWh/100 km. DC charging in this spec is 175 kW. The battery warranty is 8 years or 160,000 km.",
    recalls: "No Q4 campaign was opened in the A3, A4 or A6 lists used here.",
  });
}

function q8eReview(g) {
  return pack(g, {
    rating: 3,
    summary:
      "The Q8 e-tron is the facelift of Audi's first large electric SUV. Moottori praises the space, the comfort and the package, and names the weight, the consumption and the standard seats as the minuses.",
    scope:
      "The figures are the 50 quattro, with a 95 kWh gross and 89 kWh usable battery. The article says the line also includes 114 kWh. The original e-tron, before this rename, is a different catalog row.",
    published: [
      src(
        "Koeajo: Audi Q8 e-tron",
        "The test car is the 50 quattro. The front motor is 115 kW and the rear motor 172 kW, 250 kW and 664 Nm combined. The battery is 95 kWh theoretical and 89 kWh usable. AC charging is 11 kW and DC is 150 kW. Stated range is 486 km and stated use 20.4 kWh/100 km. 0 to 100 km/h is 6.0 seconds. The boot is 569 litres and the car weighs 2,585 kg. Price from 74,990 euros, the test car 75,630. The battery warranty is 8 years or 160,000 km. The car warranty is 2 years. The article says the earlier batteries were 71 and 95 kWh and that the facelift cars are 95 and 114 kWh.",
        "https://moottori.fi/koeajo/koeajo-audi-q8-e-tron-sahkoautojen-perus-premiumia/",
      ),
    ],
    ai: "A heavy, quiet, expensive electric SUV. The consumption complaint is the test's own, so the brochure range should be read with that in mind. No fault statistic is included.",
    costs:
      "Stated use for the tested 50 is 20.4 kWh/100 km. DC charging is 150 kW. Price in the test starts at 74,990 euros.",
    recalls: rearAxle,
  });
}

function etronOriginalReview(g) {
  return pack(g, {
    summary:
      "This is the original e-tron, 2018–2022, before Audi renamed the facelift Q8 e-tron. Moottori's Q8 test says the earlier batteries were 71 and 95 kWh gross. The facelift's 89 kWh usable figure and 486 km range are not copied onto this row.",
    scope: "The rear-axle campaign names the e-tron as well as the later Q8.",
    published: [
      src(
        "Koeajo: Audi Q8 e-tron",
        "The article identifies the original e-tron as Audi's first volume electric SUV, from the end of 2018, and says the pre-facelift batteries were 71 and 95 kWh. The driving figures in the article are the later 50 quattro and are not repeated here.",
        "https://moottori.fi/koeajo/koeajo-audi-q8-e-tron-sahkoautojen-perus-premiumia/",
      ),
    ],
    ai: "Using the facelift's range for the 2018 car would be the mistake the article is warning about when it separates the two batteries.",
    costs: "No energy figure is attached. The later 20.4 kWh/100 km is the Q8 e-tron 50.",
    recalls: rearAxle,
  });
}

function gtReview(g) {
  const rs = g.modelId.includes("rs-");
  return pack(g, {
    rating: rs ? null : 4,
    summary: rs
      ? "The RS e-tron GT is the faster version of the e-tron GT. Moottori's test car is the quattro, not this RS, and the article only says the RS costs about 40,000 euros more. The quattro's 350 kW and 463 km are not copied onto this row."
      : "The e-tron GT quattro is the four-door electric car Audi bases on the Porsche Taycan. Moottori's first drive praises the way it hides its weight and criticises how fast the options add up.",
    scope: rs
      ? "Read the quattro's figures as the other car."
      : "Peak power in the test is 390 kW for short periods. The continuous figure given is 350 kW. A later update may differ.",
    published: [
      src(
        "Maistiainen: Audi e-tron GT quattro",
        rs
          ? "The article says the RS e-tron GT costs about 40,000 euros more than the quattro and does not give the RS its own battery or range in the passage used here."
          : "The test car is the quattro, 350 kW (476 hp) and 630 Nm, with 390 kW available briefly. 0 to 100 km/h is 4.1 seconds with overboost. The battery is 85 kWh net and 93 kWh gross. Stated range is 463 km, and the trip computer showed about 400 km when the car was collected. AC charging is 11 kW. DC charging is given as up to 270 kW, and 5 to 80 percent as 23 minutes in the best case. Price from about 106,000 euros. The test car had 35,000 euros of options. The car weighs a bit over 2.2 tonnes.",
        "https://moottori.fi/koeajo/maistiainen-audi-e-tron-gt-quattro-lahes-500-sahkohevosta/",
      ),
    ],
    ai: "This is a first drive, not a long owner record. The range on the computer was already below the brochure before the test started.",
    costs: rs
      ? "No energy figure is attached."
      : "Brochure range is 463 km and the car arrived showing about 400 km. Fast charging is quoted at up to 270 kW. The options on the test car were 35,000 euros.",
    recalls: "No e-tron GT campaign was opened in the lists used here.",
  });
}

function cabrioletReview(g) {
  return pack(g, {
    summary:
      "The Audi Cabriolet, type 8G, was built from 1991 to 2000. It is the last of the 1990s open Audis in this catalog. Moottori's A4 and A6 notes used here start from the later saloons, so those diesel and TFSI faults are not copied onto this car.",
    published: [
      src(
        "Audi A4 -tyyppiviat",
        "Driver-airbag campaigns name an Audi Cabriolet together with older A4, A6, A8 and TT cars. The B8 and B9 fault sections are later cars.",
        UA4,
      ),
    ],
    ai: "The airbag campaigns are the item that actually names this body. Everything else from a modern A4 stays off the page.",
    costs: "No fuel figure is attached.",
    recalls: "Driver-airbag inflator, campaigns opened in 2020 and 2021, for cars of that era with the named inflator. Check the VIN.",
  });
}

function route(g) {
  if (isOld(g)) return oldReview(g);
  const table = {
    "Typ 8G": cabrioletReview,
    B5: a4Review,
    B6: a4Review,
    "B6/B7": a4Review,
    B7: a4Review,
    B8: a4Review,
    B9: a4Review,
    "8L": a3Review,
    "8P": a3Review,
    "8V": a3Review,
    "8V e-tron": a3Review,
    "8Y": a3Review,
    "8Y TFSI e": a3Review,
    C5: a6Review,
    C6: a6Review,
    C7: a6Review,
    C8: a6Review,
    "C8 TFSI e": a6Review,
    "C8 e-tron": a6Review,
    "4G": a7Review,
    "4K": a7Review,
    "4K TFSI e": a7Review,
    D2: a8Review,
    D3: a8Review,
    D4: a8Review,
    D5: a8Review,
    "8R": q5Review,
    FY: q5Review,
    "FY TFSI e": q5Review,
    "8U": q3Review,
    F3: q3Review,
    "F3 TFSI e": q3Review,
    "4L": q7Review,
    "4M": q7Review,
    "4M TFSI e": q7Review,
    GA: q2Review,
    "8X": a1Review,
    GB: a1Review,
    "8N": ttReview,
    "8J": ttReview,
    "8S": ttReview,
    "8Z": a2Review,
    "Typ 42": r8Review,
    "4S": r8Review,
    "8T": a5Review,
    "8TA": a5Review,
    F5: a5Review,
    F4: q4Review,
    GE: q8eReview,
    GEN1: etronOriginalReview,
    FW: gtReview,
  };
  const fn = table[g.code];
  if (!fn) throw new Error("No Audi review for " + g.code + " (" + g.id + ")");
  return fn(g);
}

const audiReviews = gens.map((g) => route(g));
doc.reviews = [...doc.reviews.filter((r) => !r.generationId.startsWith("audi-")), ...audiReviews];
doc.note =
  "Aion, BMW, then Audi. Audi generations that ended before 2000 stay a one-line note. Later chassis use Moottori's fault lists and the road tests that were opened. Engine rows were not changed.";

fs.writeFileSync(reviewsPath, JSON.stringify(doc, null, 2) + "\n");
const kinds = { pre2000: 0, later: 0 };
for (const g of gens) {
  if (isOld(g)) kinds.pre2000++;
  else kinds.later++;
}
console.log(kinds, "total", gens.length);
