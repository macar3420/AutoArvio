/**
 * Adds Honda reviews to app/src/main/assets/catalog/reviews.json.
 * Generations that ended before 2000 get one line.
 * Later cars use Moottori's Civic, Jazz and CR-V lists, plus road tests that were opened.
 * Engine rows are not edited.
 */
import fs from "fs";

const gensPath = "app/src/main/assets/catalog/generations.json";
const reviewsPath = "app/src/main/assets/catalog/reviews.json";

const gens = JSON.parse(fs.readFileSync(gensPath, "utf8")).generations.filter((g) =>
  g.id.startsWith("honda-"),
);
const doc = JSON.parse(fs.readFileSync(reviewsPath, "utf8"));

const UC = "https://moottori.fi/tyyppiviat/honda-civic/";
const UJ = "https://moottori.fi/tyyppiviat/honda-jazz/";
const UR = "https://moottori.fi/tyyppiviat/honda-cr-v/";

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

const takataCivic8 =
  "For the eighth-generation Civic, built about November 2008 to January 2011, Moottori records a Takata passenger-airbag inflator that can throw metal fragments. A related window is 4 July 2008 to 4 January 2010. The inflator is replaced free of charge. Inclusion is a VIN question, not a claim that every Civic of those years still has the original part.";

const fuelPump =
  "A fuel-pump campaign for cars built January 2018 to December 2019, ADAC April 2021, says the engine can stall and then not restart. A second campaign, 6FE, started 1 September 2020: the pump rotor can distort, touch the housing and stop the engine while driving. Both name the Civic and the CR-V. Inclusion is a VIN question.";

function oldReview(g) {
  const span = `${g.yearFrom}–${g.yearTo}`;
  return pack(g, {
    summary: `Honda ${g.code} (${span}), from before 2000. This pass does not write these up. Faults recorded for later Hondas are not copied onto this car.`,
    ai: "Nothing is inferred from the Civic, Jazz or CR-V notes.",
    costs: "No consumption figure is attached.",
    recalls: "No recall was opened for this pre-2000 Honda in this pass.",
  });
}

function civicReview(g) {
  const id = g.id;
  if (id.endsWith("-vi")) {
    return pack(g, {
      summary:
        "This is the sixth-generation Civic, 1995–2001. Moottori's generation sections start at the next Civic, so the seventh-generation bushes and the later Takata dates are not copied here.",
      published: [
        src(
          "Honda Civic -tyyppiviat",
          "The page's own generation blocks begin with the seventh generation, 2001–2006, and the eighth, 2005–2012. The sixth generation is not given those inspection notes.",
          UC,
        ),
      ],
      ai: "A 1990s Civic that was still sold in 2000 is not the car in the 2008 airbag window.",
      costs: "No fuel figure is attached.",
      recalls: "No sixth-generation campaign was separated out on the page used here.",
    });
  }
  if (id.endsWith("-vii")) {
    return pack(g, {
      summary:
        "The seventh-generation Civic, 2001–2005, is the early-2000s car. German inspection notes are worn bushes in the rear suspension and the front arms, brake discs that wear quickly, and suspension joints on cars over 11 years old. The Takata dates on the same page are the next generation.",
      published: [
        src(
          "Honda Civic -tyyppiviat",
          "Seventh generation, 2001–2006: rear-axle rubber bushes, front-arm bushes, brake discs that wear fast, and joints on cars older than 11 years. Recalls named for this generation are the dipped-beam switch, Traficom 2004, and a starter-motor wire, ADAC 2001.",
          UC,
        ),
      ],
      ai: "Wear items on an old Civic, not a count of engine failures. The airbag window that starts in 2008 is a different car.",
      costs: "No fuel figure is attached. Brake discs are the wear item the page names.",
      recalls: "Dipped-beam switch, Traficom 2004. Starter-motor wire, ADAC 2001.",
    });
  }
  if (id.includes("viii")) {
    return pack(g, {
      summary:
        "The eighth-generation Civic runs from 2006 to 2011 in this catalog, including the facelift. Moottori's owner notes are a diesel auxiliary-belt tensioner, brake discs that wear quickly, a cracked exhaust manifold on the 1.4, and an electric power-steering connector that was recalled in 2006. The airbag item is the Takata inflator on cars built around 2008–2011.",
      scope:
        "The diesel belt tensioner is the diesel. The 1.4 manifold note is that petrol. A Type R of these years is a separate catalog row.",
      published: [
        src(
          "Honda Civic -tyyppiviat",
          "Eighth generation, 2005–2012 on the page: lights, engine-management faults at inspection, and brake pads worn on the faster models. Owner reports add the diesel belt tensioner, the 2006 power-steering connector check, fast-wearing brake discs, and a cracked manifold on the 1.4. Takata passenger-airbag inflators are dated November 2008 to January 2011, and 4 July 2008 to 4 January 2010.",
          UC,
        ),
      ],
      ai: "The airbag campaign is the safety item, and it has build dates. The belt tensioner is the diesel, not every eighth-generation car.",
      costs: "No fuel figure is attached.",
      recalls: takataCivic8 + " Electric power-steering connector, 2006.",
    });
  }
  if (id.includes("ix")) {
    return pack(g, {
      summary:
        "The ninth-generation Civic, 2012–2017, has few owner reports on Moottori's page. German inspection calls it reliable, with some light faults, worn brake pads and remarks on the exhaust. The clutch on the sportier versions wears faster if the car is driven hard. An ABS-module campaign covers cars built February to April 2016, including the Type R and the Tourer.",
      scope: "The Type R is its own row. The clutch note is the sportier models, not a claim about every 1.6 or 1.8.",
      published: [
        src(
          "Honda Civic -tyyppiviat",
          "Ninth generation: few owner reports. Clutch wear on the sportiest models with a hard driving style. Passenger airbag in 2013 and individual ABS faults in 2016. Infotainment connection trouble, panel fit, and rattles are also listed. German inspection: reliable, some lights, worn pads, exhaust.",
          UC,
        ),
      ],
      ai: "Few reports is not the same thing as a measured failure rate. The ABS campaign is a four-month build window.",
      costs: "No fuel figure is attached.",
      recalls:
        "ABS module contaminated in production, cars built February–April 2016. Brakes can lock in a full stop and the brake assist can fail. The check is about two hours and free. Passenger-airbag inflator campaigns in 2013 also name the Civic. Check the VIN.",
    });
  }
  if (id.endsWith("-x")) {
    return pack(g, {
      rating: 4,
      summary:
        "The tenth-generation Civic, 2017–2022, has few owner reports. Moottori lists wind and rattles, panel fit, infotainment dropouts, and moisture in the rear lamps and the parking sensors. An AutoBild 100,000 km test scored it 2+ on a scale where 1 is best, after an air-conditioning fault and light rust in the body structure.",
      scope:
        "The fuel-pump campaigns below are cars built in 2018–2019 and a later rotor campaign. A Type R of this generation is a separate row, and the AutoBild car is not identified as one.",
      published: [
        src(
          "Honda Civic -tyyppiviat",
          "Tenth generation: no significant volume of owner reports yet, when the page was compiled. Noises, panel fit, infotainment, moisture in the rear lights and parking sensors. AutoBild's 100,000 km test: air-conditioning fault and slight rust in the body structure, score 2+. The car is not in the ADAC breakdown report for this generation. German inspection for the ninth and tenth generations mentions lights, bulbs and headlamp aim, worn pads and the exhaust, and still calls the car durable.",
          UC,
        ),
      ],
      ai: "A 2+ endurance score means the test car was not trouble-free, and it is still one car. The fuel pump is a campaign with build dates, not a description of every tenth-generation Civic.",
      costs: "No fuel figure is attached.",
      recalls: fuelPump + " Airbag inflator 6NA, from 12 January 2021, can over-pressurise. Passenger-airbag campaigns from 2019 also name the Civic.",
    });
  }
  return pack(g, {
    rating: 4,
    summary:
      "The eleventh-generation Civic is the current one, and in Europe Moottori's test found only the e:HEV hybrid. The writer praises the way it drives and the space, and the stated minus is that there is no other powertrain. Town driving in that test went under 4.5 l/100 km. The brochure figure printed with the test is 5.0 l/100 km WLTP.",
    scope:
      "There is no 0–100 km/h time in the passage used here, so none is added. A Type R is a different engine and does not use 5.0 l/100 km. The hybrid-controller campaign is this hybrid, not the Type R.",
    published: [
      src(
        "Koeajo: Honda Civic e:HEV",
        "The European car in the test is only the e:HEV. The petrol engine is a 2.0-litre, 105 kW (143 hp) and 186 Nm, and it mostly runs as a generator. System output is 135 kW. Above about 80 km/h the petrol engine can drive the wheels directly. Calm mixed town use was under 4.5 l/100 km. WLTP combined use is printed as 5.0 l/100 km. Prices were not set when the article was written. Equipment levels named are Elegance, Sport and Advance.",
        "https://moottori.fi/koeajo/koeajo-honda-civic-ehev-jarkahtamatta-kohti-parempaa/",
      ),
      src(
        "Honda Civic -tyyppiviat",
        "A driver-seat height mechanism can have a bad weld, campaign started 20 April 2023. The hybrid engine controller can reset when the petrol engine stops and the car runs on the battery, campaign started 31 July 2023. The software is updated.",
        UC,
      ),
    ],
    ai: "The driving praise is a first test, and the writer leaves ride and tyre noise for a later Finnish drive. The two 2023 campaigns are the safety items, both fixed in software or by replacing the seat mechanism, and both are a VIN question.",
    costs:
      "Brochure use in the test is 5.0 l/100 km WLTP. The same test saw under 4.5 l/100 km in calm town driving. The car cannot be plugged in.",
    recalls:
      "Driver-seat height adjuster, from 20 April 2023. Hybrid engine-controller software, from 31 July 2023. The 2018–2019 fuel-pump window is the previous Civic.",
  });
}

function typeRReview(g) {
  const id = g.id;
  if (id.endsWith("ep3")) {
    return pack(g, {
      summary:
        "The EP3 is the 2001–2005 Civic Type R. Moottori's seventh-generation notes are the ordinary Civic: suspension bushes and brake discs. No Type R engine fault is named on that page, so none is added.",
      scope: "The later Takata dates and the diesel belt note are other Civics.",
      published: [
        src(
          "Honda Civic -tyyppiviat",
          "The seventh-generation block does not single out the Type R. The ABS campaign that names the Type R is dated 2016, which is a later car.",
          UC,
        ),
      ],
      ai: "A missing Type R fault is left missing.",
      costs: "No fuel figure is attached.",
      recalls: "Dipped-beam switch, Traficom 2004, names the Civic of that era. Check whether this car is in it.",
    });
  }
  if (id.endsWith("fn2")) {
    return pack(g, {
      summary:
        "The FN2 is the 2007–2011 Civic Type R, on the eighth-generation Civic. The Takata passenger-airbag window Moottori gives for that Civic is about November 2008 to January 2011. The diesel belt tensioner on the same page is not this petrol engine.",
      scope: "Power-steering connector recall of 2006 is the early eighth-generation Civic, so a 2007 Type R should be checked rather than assumed clear.",
      published: [
        src(
          "Honda Civic -tyyppiviat",
          "Eighth-generation Takata dates are November 2008 to January 2011, and 4 July 2008 to 4 January 2010. The 2006 recall is the electric power-steering connector.",
          UC,
        ),
      ],
      ai: "The airbag campaign is the item that can include this car. It is not a statement about the engine.",
      costs: "No fuel figure is attached.",
      recalls: takataCivic8,
    });
  }
  if (id.endsWith("fk2")) {
    return pack(g, {
      summary:
        "The FK2 is the 2015–2017 Civic Type R. Moottori names the Type R in an ABS-module campaign for cars built February to April 2016: contamination can make the brakes lock in a full stop, and the brake assist can fail.",
      scope: "The ordinary ninth-generation clutch note is not a substitute for this car's own record. The hybrid Civic's litres are a different generation.",
      published: [
        src(
          "Honda Civic -tyyppiviat",
          "ABS module, build window February–April 2016, names the Civic, the Tourer and the Type R. The module is checked and updated. About two hours, free of charge.",
          UC,
        ),
      ],
      ai: "A four-month build window, not every FK2.",
      costs: "No fuel figure is attached.",
      recalls: "ABS module, cars built February–April 2016. Check the VIN.",
    });
  }
  if (id.endsWith("fk8")) {
    return pack(g, {
      summary:
        "The FK8 is the 2017–2021 Civic Type R. The fuel-pump campaigns on Moottori's Civic page can include a car built in 2018 or 2019. The AutoBild 100,000 km score on that page is not identified as a Type R, so it is not used as this car's score.",
      scope: "The tenth-generation rattle and panel-fit notes are owner reports on the ordinary Civic.",
      published: [
        src(
          "Honda Civic -tyyppiviat",
          "Fuel pump, cars built January 2018 to December 2019, and campaign 6FE from 1 September 2020, in which the rotor can distort and stop the engine. Both are on the Civic page.",
          UC,
        ),
      ],
      ai: "The pump can stop the engine while driving. That is why it is a campaign, and why it still depends on the build date.",
      costs: "No fuel figure is attached.",
      recalls: fuelPump,
    });
  }
  return pack(g, {
    summary:
      "The FL5 is the current Civic Type R. Moottori's Civic e:HEV test says the European Civic line it drove had only the hybrid, so that test's 5.0 l/100 km is not this car. A driver-seat campaign started in April 2023 names the Civic.",
    scope: "The hybrid-controller reset is the e:HEV, not the Type R.",
    published: [
      src(
        "Honda Civic -tyyppiviat",
        "Driver-seat height mechanism, a weld fault, campaign started 20 April 2023. The mechanism is replaced. The July 2023 software campaign is the hybrid, when the petrol engine stops and the car runs on the battery.",
        UC,
      ),
    ],
    ai: "No Type R road test was opened, so no power figure is invented.",
    costs: "No fuel figure is attached.",
    recalls: "Driver-seat height adjuster, from 20 April 2023, if this car is in the campaign. Check the VIN.",
  });
}

function jazzReview(g) {
  const id = g.id;
  if (id.endsWith("-i")) {
    return pack(g, {
      summary:
        "The first Jazz, 2002–2008, is the car Moottori's older recalls point at: a parking-brake lever that may not lock, so the car can roll if it is not in gear, and a fuel-pump relay. German comments on the later GE call that car better than this one.",
      published: [
        src(
          "Honda Jazz -tyyppiviat",
          "Parking-brake lever, ADAC and VOSA 2009 and Traficom 2009: the lock can fail. Fuel-pump relay, Traficom 2007, inspect and replace if needed. The GE of 2008–2015 is described as better built than its predecessor.",
          UJ,
        ),
      ],
      ai: "The parking brake is the safety item, and it is a campaign, not a rate.",
      costs: "No fuel figure is attached. Brake discs and brake pipes are the inspection wear the page names for older Jazz cars.",
      recalls: "Parking-brake lever, Traficom 2009. Fuel-pump relay, Traficom 2007.",
    });
  }
  if (id === "honda-jazz-ii" || id === "honda-jazz-ii-fl") {
    return pack(g, {
      rating: 4,
      summary:
        "The second-generation Jazz, 2008–2015 in this catalog, is the GE. Moottori says owner reports are few: odd automatic-gearbox and trip-computer cases. A 1.3 hybrid scored 1, the top mark, in an AutoBild 100,000 km test, with rust protection the only complaint. Motorway noise is the comfort note.",
      scope:
        "The score 1 is the 1.3 hybrid, not every petrol Jazz. A CVT that can select reverse as the car pulls away is a 2012 recall, not the hybrid's fuel use.",
      published: [
        src(
          "Honda Jazz -tyyppiviat",
          "GE, 2008–2015: motorway noise, a light switch that can make dipped and main beam hard to select, and very few owner reports. The 1.3 hybrid scored 1 in AutoBild's 100,000 km test. Rust protection was the complaint. German inspection calls the GE better than the previous Jazz, and apart from brake discs and pipes one of the best cars in the class. ADAC calls the GK reliable, with no standout roadside fault.",
          UJ,
        ),
      ],
      ai: "The endurance score is one hybrid. The class-leading inspection comment is the German record, and it still names rusty brake pipes and discs.",
      costs: "No fuel figure is attached. Brake discs and pipes are the wear the page names.",
      recalls:
        "Takata passenger airbag, Jazz II, cars built November 2008 to January 2011, metal fragments if the inflator ruptures. A further window is 4 July 2008 to 4 January 2010. CVT controller, ADAC and KBA 2012, can fail to select a gear or can select reverse when pulling away. Light-switch plug, Traficom 2011, can overheat and the lights can go out. Brake-pedal pin, Traficom 2010.",
    });
  }
  if (id === "honda-jazz-iii") {
    return pack(g, {
      summary:
        "The third-generation Jazz, 2015–2020, is not in the latest ADAC breakdown report. The owner note Moottori prints is that the rear brakes can stick. A rear-belt batch dated August to September 2019 sits at the end of this generation.",
      scope: "The 1.3 hybrid's endurance score is the previous Jazz. The current e:HEV litres are the next one.",
      published: [
        src(
          "Honda Jazz -tyyppiviat",
          "Jazz III, 2015–2019 on the page: rear brakes can stick. Not in the latest ADAC breakdown statistics. A rear-belt emergency lock that may not work is dated 1 August 2019 to 1 September 2019, ADAC October 2020.",
          UJ,
        ),
      ],
      ai: "One owner sentence about rear brakes, plus a one-month belt batch. That is the whole third-generation list used here.",
      costs: "No fuel figure is attached.",
      recalls: "Rear seat-belt retractor, cars built 1 August 2019 to 1 September 2019. Check the VIN.",
    });
  }
  return pack(g, {
    rating: 4,
    summary:
      "The fourth-generation Jazz is the current hybrid. Moottori's facelift test praises the view out, the way it drives, the powertrain and the space, and names interior noise as the minus.",
    scope:
      "The figures are the e:HEV Advance Sport in that test. A Crosstar is the same generation with different equipment, not a different motor unless the specification row says so.",
    published: [
      src(
        "Koeajo: Honda Jazz e:HEV",
        "The test car is the e:HEV Advance Sport: a 1,498 cm³ four-cylinder, 90 kW (122 hp) and 253 Nm, continuously variable transmission, front-wheel drive. WLTP use is 4.7 l/100 km and CO₂ is 106 g/km. 0 to 100 km/h is 9.6 seconds and top speed 175 km/h. Length is 4,089 mm and the boot is 304 litres. The car weighs 1,242 kg. Towing is 500 kg. Euro NCAP is given as 5 stars in 2023. Warranty is 3 years or 100,000 km, and the hybrid system 5 years or 100,000 km. Price from 28,325 euros, the test car 31,641.",
        "https://moottori.fi/koeajo/koeajo-honda-jazz-ehev-pieni-suuri-tayshybridi/",
      ),
    ],
    ai: "The test is a facelift of this generation, not a different car. Interior noise is the complaint. No long fault list is attached, because the Jazz page's detailed notes stop at the previous generation.",
    costs:
      "Brochure use for the tested car is 4.7 l/100 km WLTP. Warranty in the article is 3 years or 100,000 km, and 5 years or 100,000 km for the hybrid system.",
    recalls:
      "Wide-camera software, campaign started 22 March 2023: the camera picture may not reach the driver aids. A rear-belt campaign started 12 January 2021 also names the Jazz. Check the VIN.",
  });
}

function crvReview(g) {
  const id = g.id;
  if (id.endsWith("-i")) {
    return pack(g, {
      summary:
        "The first CR-V, 1997–2001, is not the car German inspection calls one of the most reliable SUVs. That comment on Moottori's page is aimed at the fourth generation. For the early years the page names brakes, suspension and, on the oldest cars, ball-joint seals and track-rod ends.",
      published: [
        src(
          "Honda CR-V -tyyppiviat",
          "The 'especially good, no real weak point' lines are under the fourth generation. Older inspection notes on the same page include the front axle for 2001, brakes, suspension, track-rod ends on cars over seven years old, and leaking ball-joint seals on the oldest cars. The chassis is still described as surprisingly durable for an SUV.",
          UR,
        ),
      ],
      ai: "Do not give the first CR-V the fourth generation's inspection praise, and do not give it the 2018 fuel-pump campaign.",
      costs: "No fuel figure is attached.",
      recalls: "No first-generation campaign was separated out on the page used here.",
    });
  }
  if (id === "honda-cr-v-ii" || id === "honda-cr-v-ii-fl") {
    return pack(g, {
      summary:
        "The second-generation CR-V, 2002–2006, sits in the years where Moottori's inspection notes are brakes, suspension and steering joints. The Takata window and the 2018 fuel pump are later cars.",
      published: [
        src(
          "Honda CR-V -tyyppiviat",
          "Inspection years that overlap this generation include the service brake, suspension and steering joints. Track-rod ends are named on cars over seven years old. The chassis is described as surprisingly durable even at high mileage.",
          UR,
        ),
      ],
      ai: "Durability here is an inspection comment about the suspension, not a promise about a diesel pump.",
      costs: "No fuel figure is attached.",
      recalls: "Fuel return hose, Traficom 2010, and a diesel-pump leak, Traficom 2011, are on the CR-V page without this generation's name. Check the VIN before applying them.",
    });
  }
  if (id === "honda-cr-v-iii" || id === "honda-cr-v-iii-fl") {
    return pack(g, {
      summary:
        "The third-generation CR-V, 2007–2012, is the one Moottori dates for a Takata passenger airbag: cars built November 2008 to January 2011. The i-CTDI and i-DTEC diesels are also named on a later inflator campaign. A window-switch housing can fill with water and short.",
      scope: "The 2.2 diesel brake-disc mix-up is dated 2013, which is the next CR-V.",
      published: [
        src(
          "Honda CR-V -tyyppiviat",
          "CR-V III, November 2008 to January 2011: Takata passenger-airbag inflator, metal fragments, free replacement. A February 2018 campaign names the CR-V, the i-CTDI and the i-DTEC for an over-pressurised passenger inflator. Window master switch, Traficom 2012: water can sit in the housing and short the switch.",
          UR,
        ),
      ],
      ai: "The airbag work is the item to confirm with a dealer. The page does not turn it into a share of cars that failed.",
      costs: "No fuel figure is attached.",
      recalls:
        "Takata passenger airbag, CR-V III, November 2008 to January 2011. Passenger inflator, campaign started 23 February 2018, names i-CTDI and i-DTEC as well. Window switch, Traficom 2012.",
    });
  }
  if (id === "honda-cr-v-iv" || id === "honda-cr-v-iv-fl") {
    return pack(g, {
      rating: 4,
      summary:
        "The fourth-generation CR-V, 2012–2018, is the one German inspection calls especially good, with no real weak point, and one of the most reliable cars on the market. Owner complaints on the page are finish, rattles, parking sensors, and a braked towing limit of 1.7 tonnes on the manual i-VTEC.",
      scope:
        "A 2.2 diesel of 2013 can have the wrong front brake discs, 16-inch parts where 17-inch parts belong. That is the diesel of that year, not every petrol CR-V. The 2018 fuel pump is the next generation.",
      published: [
        src(
          "Honda CR-V -tyyppiviat",
          "Fourth generation: German sources call it especially good, with no essential weak point, and among the most reliable cars on the market. A new model with no significant inspection faults. Owner notes: weak finish and rattles, parking sensors in the rear bumper, and a 1.7-tonne braked towing limit on the manual i-VTEC. The 2.2 diesel of 2013 had front discs for 16-inch wheels fitted where 17-inch discs belong.",
          UR,
        ),
      ],
      ai: "The reliability lines are inspection comments, not a workshop survey of engines. The brake-disc campaign is one diesel year.",
      costs: "No fuel figure is attached. Towing of 1.7 tonnes is the manual i-VTEC figure the page gives, not necessarily the automatic.",
      recalls:
        "Front brake discs on the 2013 2.2 diesel, Traficom and ADAC 2014. Brake booster, ADAC 2013, pedal effort can rise. Adaptive-cruise software, Traficom 2015, can brake for an obstacle that is not there.",
    });
  }
  if (id === "honda-cr-v-v") {
    return pack(g, {
      summary:
        "The fifth-generation CR-V, 2018–2023, shares the fuel-pump campaigns with the Civic: cars built in 2018–2019 can stall and not restart, and a later rotor fault can stop the pump while driving. Owner notes that cover this generation and the one before it are parking sensors, a rear wiper, and the air-conditioning compressor.",
      scope: "The current sixth-generation plug-in range is not this car. No 82 km figure is copied back onto it.",
      published: [
        src(
          "Honda CR-V -tyyppiviat",
          "Fuel pump, build window January 2018 to December 2019. Campaign 6FE, from 1 September 2020, rotor can distort and the pump can stop. Window master switch 6WW, from 15 February 2021, spilled liquid inside the switch. Owner notes for the fourth and fifth generations: parking sensors, rear wiper, air-conditioning compressor, stone chips. The page says there were no recalls in the September 2021 to October 2023 slice for the fourth and fifth generations, which is a different statement from the earlier pump campaigns.",
          UR,
        ),
      ],
      ai: "The pump can stop the engine on the move. That is a build-date campaign. The 'no recalls in 2021–2023' line does not cancel the 2018–2020 campaigns.",
      costs: "No fuel figure is attached.",
      recalls: fuelPump + " Window switch 6WW, from 15 February 2021.",
    });
  }
  return pack(g, {
    rating: 4,
    summary:
      "The sixth-generation CR-V is sold as a full hybrid and as a plug-in. Moottori's test says the full hybrid's battery is 1.06 kWh, so electric running is a few kilometres, with a stated 5.9 l/100 km and a 57-litre tank. The plug-in has a 17.7 kWh battery and about 82 km of electric range.",
    scope:
      "The 82 km and the 17.7 kWh battery are the e:PHEV. The 5.9 l/100 km and the 1.06 kWh battery are the e:HEV. The boot is 39 litres larger on the plug-in because that battery sits under the rear seat rather than in the boot.",
    published: [
      src(
        "Koeajo: Honda CR-V",
        "The e:HEV battery is 1.06 kWh. The tank is 57 litres, the stated total range 966 km, and WLTP use 5.9 l/100 km. Four-wheel drive is offered. The e:PHEV uses the same powertrain layout with a 17.7 kWh battery, about 82 km electric, a 46.5-litre tank and a stated total range of 828 km. The plug-in boot is 39 litres larger. Prices in the article start at 51,841 euros for the front-drive e:HEV Elegance, 58,031 for four-wheel drive, and 59,976 for the Advance Tech e:PHEV. Steering is called accurate but number than a Civic or a ZR-V.",
        "https://moottori.fi/koeajo/koeajo-honda-cr-v-ladattava-akku-ja-muita-pienia-parannuksia/",
      ),
    ],
    ai: "Two batteries, two ranges. Using the plug-in kilometres for the full hybrid would contradict the test.",
    costs:
      "Full-hybrid brochure use is 5.9 l/100 km. Plug-in electric range in the test is about 82 km from 17.7 kWh, which holds only if it is charged. Price for the tested plug-in trim starts at 59,976 euros.",
    recalls: "The 2018–2019 fuel-pump window is the previous CR-V. No sixth-generation campaign was opened in this pass.",
  });
}

function hrvReview(g) {
  const current = g.id.endsWith("-iii");
  return pack(g, {
    summary: current
      ? "The third-generation HR-V is the current one, from 2021. Moottori's e:Ny1 test says that electric car looks like an HR-V and shares little with it, so the e:Ny1's 412 km and 68.8 kWh battery are not copied here."
      : g.id.endsWith("-i")
        ? "The first HR-V, 1999–2006, has no fault page in the sources opened here. CR-V airbag dates and Jazz brake notes are not copied onto it."
        : "The second-generation HR-V, 2015–2021, has no fault page in the sources opened here. The CR-V's fuel-pump campaigns name the CR-V, not the HR-V.",
    scope: "A separate HR-V road test was not opened, so no fuel figure is invented.",
    published: current
      ? [
          src(
            "Koeajo: Honda e:Ny1",
            "The article says the e:Ny1 is easiest to compare with the HR-V, and that despite the look and the size the cars have little in common. e:Ny1 figures are not used for the HR-V.",
            "https://moottori.fi/koeajo/koeajo-honda-eny1-sahkomalliston-uusintalahto-on-uskollinen-merkilleen/",
          ),
        ]
      : [],
    ai: "Leaving the HR-V off the CR-V list is deliberate. The pages name the model they mean.",
    costs: "No consumption figure is attached.",
    recalls: "No HR-V campaign was opened in this pass.",
  });
}

function otherReview(g) {
  const id = g.id;
  if (id.startsWith("honda-accord")) {
    return pack(g, {
      summary: `The Accord in this row is ${g.code}, ${g.yearFrom}–${g.yearTo}. No Accord fault page was opened, so Civic airbags, the Jazz parking brake and the CR-V fuel pump are not copied onto it.`,
      ai: "An Accord of these years is not a Civic of the same years.",
      costs: "No fuel figure is attached.",
      recalls: "No Accord campaign was opened in this pass.",
    });
  }
  if (id.includes("prelude-vi")) {
    return pack(g, {
      summary:
        "The new Prelude is listed from 2026. No Finnish test was opened, so no power figure and no fault are invented.",
      ai: "A catalog year is not a road test.",
      costs: "No consumption figure is attached.",
      recalls: "No campaign was opened.",
    });
  }
  if (id.includes("prelude-v")) {
    return pack(g, {
      summary:
        "The fifth-generation Prelude, 1997–2001, is the last of the old coupes. No Prelude fault page was opened. The new Prelude listed from 2026 is a different car.",
      ai: "No engine fault is invented for a coupe this age.",
      costs: "No fuel figure is attached.",
      recalls: "No Prelude campaign was opened in this pass.",
    });
  }
  if (id.includes("zr-v")) {
    return pack(g, {
      rating: 4,
      summary:
        "The ZR-V sits between the HR-V and the CR-V. Moottori says the hybrid and the dashboard come from the Civic, the floor from the CR-V, and the hybrid itself is enough and smooth. Its own brochure use is 5.8 l/100 km, not the Civic's 5.0.",
      scope: "System output is 135 kW, the same headline figure as the Civic, but the consumption and the size are this car's.",
      published: [
        src(
          "Koeajo: Honda ZR-V e:HEV",
          "Length is 4,568 mm, wheelbase 2,657 mm, boot 380 litres, weight 1,604 kg. The petrol engine is 1,993 cm³, 105 kW (143 hp) and 186 Nm. The hybrid battery is 1.05 kWh. System output is 135 kW. 0 to 100 km/h is 7.9 seconds and top speed 173 km/h. WLTP use is 5.8 l/100 km and CO₂ is 131 g/km. Braked towing is 750 kg. The front axle and the nose are from the Civic, the floor from the CR-V.",
          "https://moottori.fi/koeajo/koeajo-honda-z-rv-ehev-valikoko-ei-ole-mikaan-valiinputoaja/",
        ),
      ],
      ai: "Shared parts with the Civic are what the test says. Shared fuel use is not. The Civic's 5.0 l/100 km stays on the Civic page.",
      costs: "Brochure use is 5.8 l/100 km WLTP. The hybrid battery in the test is 1.05 kWh, so this is not a plug-in.",
      recalls: "No ZR-V campaign was opened in this pass.",
    });
  }
  if (id.includes("e-ny1")) {
    return pack(g, {
      summary:
        "The e:Ny1 is Honda's electric crossover, not the small Honda e and not the HR-V it resembles. Moottori gives it a 68.8 kWh battery, 150 kW, and 412 km WLTP, with DC charging that peaks at 78 kW.",
      scope: "Usable capacity in the test is 61.8 kWh. The 412 km figure is WLTP, not a winter road figure. The article says Euro NCAP had not tested it.",
      published: [
        src(
          "Koeajo: Honda e:Ny1",
          "One front motor, 150 kW and 310 Nm. Battery 68.8 kWh theoretical and 61.8 kWh usable. AC charging is 11 kW and DC peaks at 78 kW. 10 to 80 percent is given as 45 minutes. WLTP range is 412 km and stated use 18.2 kWh/100 km. 0 to 100 km/h is 7.6 seconds and top speed 160 km/h. Length is 4,387 mm, boot 361 litres, weight 1,733 kg. Euro NCAP is printed as not tested. Warranty is 3 years or 100,000 km, and the battery 8 years or 160,000 km. The article says that despite looking like an HR-V the cars share little.",
          "https://moottori.fi/koeajo/koeajo-honda-eny1-sahkomalliston-uusintalahto-on-uskollinen-merkilleen/",
        ),
      ],
      ai: "The charging note is the useful one: peak power is modest, and Honda's point in the test is a flat curve rather than a high peak. 45 minutes for 10–80 percent is the article's figure.",
      costs:
        "Stated use is 18.2 kWh/100 km. DC charging peaks at 78 kW. The battery warranty is 8 years or 160,000 km.",
      recalls: "No e:Ny1 campaign was opened in this pass.",
    });
  }
  if (id.endsWith("honda-e-e") || id.includes("-e-e")) {
    return pack(g, {
      summary:
        "The Honda e is the small rear-drive city car, sold from 2020 to 2024. The e:Ny1's 412 km and 68.8 kWh battery are a different, larger car and are not copied here. No Honda e road test was opened in this pass.",
      scope: "Do not use the e:Ny1 figures for range or charging.",
      ai: "A missing test is left missing.",
      costs: "No energy figure is attached.",
      recalls: "No Honda e campaign was opened in this pass.",
    });
  }
  if (id.includes("insight")) {
    return pack(g, {
      summary:
        "The Insight in this catalog is the 2009–2014 car. A Jazz 1.3 hybrid's perfect AutoBild score is a different model and is not used here. No Insight fault page was opened.",
      ai: "Similar hybrid badges are not the same car.",
      costs: "No fuel figure is attached.",
      recalls: "No Insight campaign was opened in this pass.",
    });
  }
  if (id.includes("cr-z")) {
    return pack(g, {
      summary:
        "The CR-Z is the small hybrid coupe, 2010–2016. No fault page was opened. The Jazz hybrid's endurance score and the Civic's airbag dates are not copied onto it.",
      ai: "No engine fault is invented.",
      costs: "No fuel figure is attached.",
      recalls: "No CR-Z campaign was opened in this pass.",
    });
  }
  if (id.includes("fr-v")) {
    return pack(g, {
      summary:
        "The FR-V is the six-seat compact Honda, 2004–2009. No fault page was opened, so Jazz and Civic recalls are not copied onto it.",
      ai: "A people-mover of these years is not a Jazz.",
      costs: "No fuel figure is attached.",
      recalls: "No FR-V campaign was opened in this pass.",
    });
  }
  throw new Error("No Honda review for " + g.id);
}

function route(g) {
  if (isOld(g)) return oldReview(g);
  if (g.modelId === "honda-civic") return civicReview(g);
  if (g.modelId === "honda-civic-type-r") return typeRReview(g);
  if (g.modelId === "honda-jazz") return jazzReview(g);
  if (g.modelId === "honda-cr-v") return crvReview(g);
  if (g.modelId === "honda-hr-v") return hrvReview(g);
  return otherReview(g);
}

const hondaReviews = gens.map((g) => route(g));
doc.reviews = [
  ...doc.reviews.filter((r) => !r.generationId.startsWith("honda-")),
  ...hondaReviews,
];
doc.note =
  "Aion, BMW, Audi, then Honda. Honda generations that ended before 2000 stay a one-line note. Later cars use Moottori's Civic, Jazz and CR-V lists and the road tests that were opened. Engine rows were not changed.";

fs.writeFileSync(reviewsPath, JSON.stringify(doc, null, 2) + "\n");
const kinds = { pre2000: 0, later: 0 };
for (const g of gens) {
  if (isOld(g)) kinds.pre2000++;
  else kinds.later++;
}
console.log(kinds, "total", gens.length);
