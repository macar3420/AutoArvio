/**
 * Adds BMW reviews to app/src/main/assets/catalog/reviews.json.
 * Current volume cars get sourced notes. Older generations get a short line.
 * Engine rows are not edited.
 */
import fs from "fs";

const gensPath = "app/src/main/assets/catalog/generations.json";
const reviewsPath = "app/src/main/assets/catalog/reviews.json";

const gens = JSON.parse(fs.readFileSync(gensPath, "utf8")).generations.filter((g) =>
  g.id.startsWith("bmw-"),
);
const doc = JSON.parse(fs.readFileSync(reviewsPath, "utf8"));

const REAL = new Set([
  "bmw-318-g20-g21",
  "bmw-320-g20-g21",
  "bmw-320d-g20-g21",
  "bmw-330-g20-g21",
  "bmw-330e-g20-g21",
  "bmw-m340i-g20-g21",
  "bmw-i4-g26",
  "bmw-i4-m50-g26-m50",
  "bmw-i5-g60",
  "bmw-520-g60-g61",
  "bmw-530-g60-g61",
  "bmw-530e-g60-g61",
  "bmw-540-g60-g61",
  "bmw-x1-u11",
  "bmw-x1-xdrive25e-u11",
  "bmw-x5-g05",
  "bmw-x5-xdrive45e-g05",
  "bmw-x5-m-f95",
]);

function isOld(g) {
  return g.yearTo != null && g.yearTo < 2000;
}

function familyOf(id) {
  if (id.includes("g20") || id.includes("g21")) return "g20";
  if (id.startsWith("bmw-i4")) return "i4";
  if (id.startsWith("bmw-i5") || id.includes("g60")) return "g60";
  if (id.startsWith("bmw-x5")) return "x5";
  if (id.startsWith("bmw-x1-")) return "x1";
  return null;
}

function oldReview(g) {
  const span = g.yearTo == null ? String(g.yearFrom) : `${g.yearFrom}–${g.yearTo}`;
  return {
    generationId: g.id,
    ratingOutOfFive: null,
    scopeNote: null,
    summary: `BMW ${g.code} (${span}), from before 2000. This pass does not write these up. Faults recorded for later BMW generations are not copied onto this car.`,
    reddit: [],
    published: [],
    web: [],
    aiReading:
      "Nothing is inferred from the E46 and later notes. A pre-2000 BMW still depends on the engine and the service history.",
    runningCosts: "No consumption figure is attached.",
    recalls: "No recall was opened for this pre-2000 generation in this pass.",
  };
}

function currentShort(g) {
  const span = g.yearTo == null ? `${g.yearFrom} onward` : `${g.yearFrom}–${g.yearTo}`;
  return {
    generationId: g.id,
    ratingOutOfFive: null,
    scopeNote: null,
    summary: `Current BMW ${g.code} (${span}). A full Reddit and road-test pass for this exact model is not in this version. The sourced BMW write-ups so far are the 3 Series, the i4, the i5, the X1 and the X5.`,
    reddit: [],
    published: [],
    web: [],
    aiReading:
      "Nothing is inferred from the other BMW reviews. Use the specification rows on this page for this engine.",
    runningCosts: "Not gathered for this model in this pass.",
    recalls: "Not looked up for this model in this pass.",
  };
}

const g20RedditDiesel = [
  {
    source: "r/BMW",
    title: "G20 3 Series B47",
    text: "Buyers comparing a G20 320d and a 330e ask about the B47 diesel. Replies treat the EGR cooler as the item to check, and one owner of an older car with the same engine says a coolant loss was fixed under the EGR recall, with no other repair up to 200,000 km. That is a pattern of reports, not a rate.",
    url: "https://www.reddit.com/r/BMW/comments/1plitcc/g20_3_series_201920_b47/",
  },
  {
    source: "r/BmwTech",
    title: "G20 320d losing coolant",
    text: "One 2019 320d xDrive at about 100,000 km is described as losing coolant quickly, with a rough cold start on some mornings. The owner asks whether the EGR cooler is leaking. A reply suggests looking inside the cooler before assuming a head gasket. One car.",
    url: "https://www.reddit.com/r/BmwTech/comments/1pn2qcu/bmw_g20_320d_b47_losing_coolant_fast_3l100km/",
  },
];

const g20Published330e = {
  source: "Moottori",
  title: "Koeajo: BMW 330e A",
  text: "The 14 August 2019 test of the first G20 330e praises how easy and how good to drive it is, and how little the petrol and electric parts interrupt each other. The minuses are a smaller boot and small delays in the gearbox. The tested car is rear-wheel drive. The petrol engine is the 2.0-litre from the 320i, 184 hp, with a system output quoted as 292 hp when the extra boost is used. The battery in that test is 12.0 kWh, under the rear seat. Electric range is given as 59–66 km on the old NEDC cycle, not WLTP. On-board charging is 3.7 kW, and 80 percent is quoted as 2.4 hours. Later 330e cars are not this specification.",
  url: "https://moottori.fi/koeajo/koeajo-bmw-330e-a-olisiko-lataushybridista-arkisportiksi/",
};

function g20Review(g) {
  const id = g.id;
  const diesel = id.includes("320d");
  const phev = id.includes("330e");
  const six = id.includes("m340i");
  const real = REAL.has(id);
  let scope =
    "Moottori's test opened here is the 2019 330e plug-in. Its battery, range and charging figures belong to that car, not automatically to every G20 engine.";
  if (!real) {
    scope =
      "This badge is carried over from older BMW names. It is not written up here as its own current engine. " +
      scope;
  } else if (diesel) {
    scope =
      "This row is the 320d diesel. The road test below is the petrol plug-in 330e, so its litre figure and battery do not apply. The Reddit notes are the ones that discuss the B47 diesel.";
  } else if (six) {
    scope =
      "This row is the six-cylinder M340i. The road test below is the four-cylinder plug-in 330e and does not describe this engine.";
  } else if (!phev) {
    scope =
      "This row is not the 330e. The driving notes from that test are about the G20 body. The consumption and battery figures are not.";
  }
  return {
    generationId: id,
    ratingOutOfFive: phev ? 4 : 3,
    scopeNote: scope,
    summary: diesel
      ? "The G20 320d is the diesel most Finnish buyers mean by a current 3 Series. Owners on Reddit talk about the EGR cooler and coolant loss more than about a timing chain. The car itself is the same rear-drive generation Moottori found easy to drive in 330e form."
      : phev
        ? "The G20 330e is the plug-in 3 Series. Moottori's early test liked the way it drove and disliked the boot and small gearbox delays. That test's electric range is an NEDC number from 2019, with a 12 kWh battery and slow 3.7 kW charging."
        : "The G20 is the current 3 Series generation in this catalog, sold as a saloon and a Touring. The sourced road test is the plug-in 330e, which Moottori found easy and good to drive, with a smaller boot than the pure petrol car.",
    reddit: diesel ? g20RedditDiesel : [],
    published: [g20Published330e],
    web: [],
    aiReading: diesel
      ? "The diesel posts and the 330e road test are about one generation and two different engines. The repeated diesel topic is coolant and the EGR cooler, including cars covered by a recall, not a claim that every 320d fails. Check the VIN with a BMW dealer before treating a recall as already done. The 2019 plug-in numbers should not be used as this car's fuel use."
      : "The 2019 test is a real drive of an early 330e, and several of its figures were later changed on newer cars. It supports a judgement of the G20 as a driver's car with a tight boot in plug-in form. It does not support a reliability percentage.",
    runningCosts: phev
      ? "In the 2019 test the stated combined use is 1.7 l/100 km WLTP, which assumes regular charging. Charging was only 3.7 kW. If this car is a later 330e, use the specification row on this page rather than that charging figure."
      : diesel
        ? "No diesel consumption figure is copied from the plug-in test. A 320d that is only used for short trips is the case owners associate with a clogged particulate filter, which is a use pattern, not a measured failure rate."
        : "Use the specification row on this page. The 1.7 l/100 km figure in the 330e test is not this engine.",
    recalls: diesel
      ? "Reddit and BMW paperwork point to EGR cooler campaigns on many B47 diesels. Whether this vehicle is included is a VIN question. Moottori's 3 Series list also names G20 campaigns for a left front seat belt (from 22 September 2022), tie rods (from 8 June 2020) and brake discs (from 10 February 2021)."
      : phev
        ? "Moottori's 3 Series list names two 2020 high-voltage battery campaigns for some G20 plug-in cars: a cell fault that can short while charging, including when parked. It also names a left front seat belt campaign from 22 September 2022, tie rods from 8 June 2020, and brake discs from 10 February 2021. Inclusion is a VIN question."
        : "Moottori's 3 Series list names G20 campaigns for a left front seat belt (from 22 September 2022), tie rods (from 8 June 2020) and brake discs (from 10 February 2021). A February 2023 body-controller campaign can leave the automatic door lock off if the controller was replaced and not reset. Inclusion is a VIN question.",
  };
}

function i4Review(g) {
  const m50 = g.id.includes("m50");
  return {
    generationId: g.id,
    ratingOutOfFive: 4,
    scopeNote: m50
      ? "Figures below are from Moottori's i4 M50 test. The cheaper rear-drive i4 is a different motor and a different range."
      : "Moottori's longer driving piece is the standard i4, quoted there at 250 kW. The M50 test is a different, heavier, four-wheel-drive car. Its range and power are not copied onto this row.",
    summary: m50
      ? "The i4 M50 is the fast four-wheel-drive version of BMW's electric 4 Series. Moottori's test car had 400 kW, an 81.3 kWh net battery, 205 kW fast charging and a stated 509 km WLTP range."
      : "The i4 is an electric car on the same basic structure as BMW's petrol 3 and 4 Series, not a dedicated electric platform. Moottori's test liked the motor and the way it drives, and named space as the weak point.",
    reddit: [],
    published: [
      m50
        ? {
            source: "Moottori",
            title: "Koeajo: BMW i4 M50 xDrive",
            text: "Manu Tuppurainen's test gives the M50 as 400 kW and 795 Nm, battery 83.9 kWh gross and 81.3 kWh net, 11 kW AC and 205 kW DC. Stated use is 18.0 kWh/100 km and range 509 km. 0 to 100 km/h is 3.9 seconds. The boot is 470 litres and the car weighs 2,290 kg. Euro NCAP is given as 4 stars in 2022. The battery warranty is 8 years or 160,000 km. The car warranty is 2 years. Price from 67,810 euros, the test car 87,161.",
            url: "https://moottori.fi/koeajo/koeajo-bmw-i4-m50-xdrive-suosiolle-on-syynsa/",
          }
        : {
            source: "Moottori",
            title: "Koeajo: BMW i4 – erinomainen kompromisseista huolimatta",
            text: "The test says the base i4 has 250 kW, and that the powertrain is smooth even by electric-car standards. Steering and pedal feel are praised, and the suspension is comfortable enough for daily use without being vague. The stated weakness is space: the structure is shared with the petrol cars, and a lighter dedicated electric car would feel sharper. The writer still calls it the electric BMW people hoped for.",
            url: "https://moottori.fi/koeajo/koeajo-bmw-i4-erinomainen-kompromisseista-huolimatta/",
          },
    ],
    web: [],
    aiReading:
      "Both Moottori pieces describe a good driver's electric car whose compromise is packaging, not a list of breakdowns. There is no long owner record in the sources opened for this pass, so the 4/5 reading is about the tests, not about ten-year reliability.",
    runningCosts: m50
      ? "Stated use on the M50 test is 18.0 kWh/100 km WLTP. Home charging in that spec is 11 kW and fast charging 205 kW. The battery warranty is 8 years or 160,000 km. The car itself is warranted for 2 years."
      : "Use the specification row for this version's range. The M50's 18.0 kWh/100 km figure is a different car.",
    recalls:
      "Moottori's 3 Series list names the i4 in a high-voltage campaign started 19 April 2023. A cell-supervision connector may be unlocked. Drive power can drop to zero, with a warning on the dash. Affected cars get that circuit replaced. Inclusion is a VIN question.",
  };
}

function g60Review(g) {
  const i5 = g.id.startsWith("bmw-i5");
  const real = REAL.has(g.id);
  return {
    generationId: g.id,
    ratingOutOfFive: i5 ? 4 : null,
    scopeNote: i5
      ? "This is the electric i5. Moottori's test car is the four-wheel-drive M60, not the rear-drive eDrive40, which the same article says goes further on a charge."
      : real
        ? "This is a combustion or plug-in 5 Series on the G60 body. The road test opened here is the electric i5 M60. Its kWh figures and electric range do not belong to this engine. The comments on size and ergonomics do."
        : "This badge is not treated as its own current 5 Series engine. The only G60 road test opened here is the electric i5 M60.",
    summary: i5
      ? "The i5 is the electric 5 Series. In Moottori's test the M60 is quiet and strong, with a real winter road use of 23–24 kWh/100 km and a practical range a bit over 360 km, against a stated 455 km WLTP."
      : "The G60 is the current 5 Series. It is a large car, about five metres long in the i5 test. A sourced diesel or petrol drive of this generation was not the piece used here.",
    reddit: [],
    published: [
      {
        source: "Moottori",
        title: "Koeajo: BMW i5 – keskijohdon sähköistymisaika",
        text: "Aake Kinnunen's test of the i5 M60 lists 442 kW, a battery of about 81–84 kWh, 22 kW AC and 205 kW DC. Stated use is 18.5 kWh/100 km and range 455 km. On a light-frost road trip the car used 23–24 kWh/100 km and still showed a bit more than 360 km of practical range. Length is 5,060 mm, boot 490 litres, weight 2,380 kg. 0 to 100 km/h is 3.8 seconds. Euro NCAP is given as 5 stars in 2023. The battery warranty is 8 years or 160,000 km. At the time of the article the 5 Series on sale was the i5, from 75,400 euros for the rear-drive car and 104,500 for the M60. The minuses named are driving on a slippery surface and sensor tuning. Ergonomics and the electric powertrain are the pluses.",
        url: "https://moottori.fi/koeajo/koeajo-bmw-i5-keskijohdon-sahkoistymisaika/",
      },
    ],
    web: [],
    aiReading: i5
      ? "The test supports a long-distance electric car that uses more in Finnish winter than the brochure, and that is heavy and very fast in M60 form. It does not say anything about workshop visits."
      : "Do not read the i5's energy use as this engine's fuel use. The shared point is the size of the current 5 Series and the ergonomics praised in that test.",
    runningCosts: i5
      ? "Brochure use for the tested M60 is 18.5 kWh/100 km. The same test saw 23–24 kWh/100 km on the road in light frost. Fast charging is 205 kW and the test car could charge at 22 kW AC. Battery warranty is 8 years or 160,000 km."
      : "Not taken from the i5 test. Use the specification row for this engine.",
    recalls: "No safety recall for the G60 or i5 turned up in the sources used here.",
  };
}

function x1Review(g) {
  return {
    generationId: g.id,
    ratingOutOfFive: 3,
    scopeNote:
      "The test is the plug-in X1 xDrive30e, a 1.5-litre three-cylinder plus an electric motor. A petrol, diesel or electric iX1 on this generation is a different drivetrain, and the 0.9 l/100 km figure does not transfer.",
    summary:
      "The U11 is the current X1. Moottori's plug-in test liked the way it drives, the space and the driving position, and disliked the electric range, a sharp ride, and the logic of the screen.",
    reddit: [],
    published: [
      {
        source: "Moottori",
        title: "Koeajo: BMW X1 xDrive30e",
        text: "The 2 December 2023 test gives the xDrive30e a system output of 240 kW and 477 Nm, from a 1,499 cm³ three-cylinder and an electric motor. The battery is 16.3 kWh gross and 14.2 kWh net. AC charging is 7.4 kW. Stated use is 0.9 l/100 km and electric range 89 km WLTP. 0 to 100 km/h is 5.6 seconds. The boot is 490 litres. Euro NCAP is given as 5 stars in 2022. The hybrid system warranty is 6 years or 100,000 km, and the car warranty is 2 years. Price from 56,169 euros, the test car 70,095. Electric range, the ride and the infotainment are the named minuses.",
        url: "https://moottori.fi/koeajo/koeajo-bmw-x1-xdrive30e-kolmas-sukupolvi-toden-sanoo/",
      },
    ],
    web: [],
    aiReading:
      "This is one plug-in version of the new X1, not a survey of every U11. The 89 km figure is the brochure range in the test, and electric range is also listed as a weakness, so real electric kilometres should be expected to be lower. No owner-fault thread was opened for this model in this pass.",
    runningCosts:
      "The plug-in brochure figure is 0.9 l/100 km if the 14.2 kWh battery is charged. Charging in the test is 7.4 kW. The hybrid-system warranty is shorter than a full electric-car battery warranty: 6 years or 100,000 km in that article.",
    recalls: "No safety recall for the U11 X1 turned up in the sources used here.",
  };
}

function x5Review(g) {
  const is45 = g.id.includes("45e");
  return {
    generationId: g.id,
    ratingOutOfFive: 3,
    scopeNote: is45
      ? "This row is the earlier xDrive45e. Moottori has a separate test whose headline complaint is slow charging. The figures below are from the later xDrive50e test and are not this car's battery or range."
      : "The Finnish test opened here is the later plug-in xDrive50e. A petrol X5 or the X5 M does not share its litre figure or its electric range.",
    summary: is45
      ? "The G05 xDrive45e is the earlier plug-in X5, with a straight six and a large battery. Moottori's piece on it is titled around having to be patient while it charges. The newer 50e test is a different specification."
      : "The G05 is the current X5 generation. Moottori's winter test of the xDrive50e praises the pace, the cabin and the finish, and complains about thirst and about how little equipment is standard for the price.",
    reddit: [],
    published: [
      is45
        ? {
            source: "Moottori",
            title: "Koeajo: BMW X5 xDrive45e",
            text: "The headline summary is a straight six, a large plug-in battery, and one of BMW's best bodies, with slow charging and consumption as the complaints. Detailed figures from that test were not copied here.",
            url: "https://moottori.fi/koeajo/koeajo-karsivallisille-bmw-x5-xdrive45e/",
          }
        : {
            source: "Moottori",
            title: "Koeajo: BMW X5 – polanteita aamiaiseksi",
            text: "The test car is the xDrive50e: a 3.0-litre straight six with 313 hp, plus 197 hp and 280 Nm from the electric motor, 489 hp and 700 Nm combined. The battery is 25.7 kWh. Electric range is stated as 94–110 km. AC charging is 7.4 kW. Stated use is 0.8–1.1 l/100 km. 0 to 100 km/h is 4.8 seconds. The boot is 500 litres and the car weighs 2,495 kg. Price from 99,508 euros, the test car above 118,000, with option packs called out as expensive. Euro NCAP is printed as 5 stars in 2017. The battery warranty is 8 years or 160,000 km.",
            url: "https://moottori.fi/koeajo/koeajo-bmw-x5-polanteita-aamiaiseksi-ja-kelirikkoa-lounaaksi/",
          },
    ],
    web: [],
    aiReading:
      "The X5 tests describe a heavy, fast, expensive family SUV. The plug-in brochure consumption only holds if it is charged. Slow charging is the specific complaint on the earlier 45e. Nothing here is a breakdown statistic.",
    runningCosts: is45
      ? "Treat charging time as the ownership issue named in the 45e test. Do not use the 50e's 94–110 km range for this earlier car."
      : "Brochure use for the tested 50e is under 1.1 l/100 km with charging. The article lists consumption as a minus when it is not driven as a plug-in. AC charging is 7.4 kW. Price in the test starts just under 100,000 euros before options.",
    recalls:
      "A driver-airbag inflator campaign started 22 March 2023, recorded by Traficom on Moottori's 3 Series list, names the X5 and the X5 M among other BMWs. The propellant can degrade with age. Inclusion is a VIN question. The diesel EGR campaign Moottori dates to 2010–2017 ends before this generation.",
  };
}

const U3 = "https://moottori.fi/tyyppiviat/bmw-3-sarja/";
const U5 = "https://moottori.fi/tyyppiviat/bmw-5-sarja/";
const U1 = "https://moottori.fi/tyyppiviat/bmw-1-sarja/";
const UX1 = "https://moottori.fi/tyyppiviat/bmw-x1/";

function src(title, text, url) {
  return { source: "Moottori", title, text, url };
}

function isCopiedBadge(g) {
  const m = g.modelId.replace("bmw-", "");
  const c = g.code;
  if (m === "315" || m === "324") return true;
  if (m === "m340i" && c !== "G20/G21") return true;
  if ((m === "318is" || m === "320is") && g.yearFrom >= 2005) return true;
  if (m === "340" && c !== "F30/F31") return true;
  if (m === "335" && c !== "E90/E91/E92" && c !== "F30/F31") return true;
  if (m === "m550d" && c !== "F10/F11" && c !== "G30/G31") return true;
  if (m === "114" && c === "E81/E87") return true;
  if (m === "m135i" && c === "E81/E87") return true;
  if (m === "760" && c === "E38") return true;
  if (m === "518" && (c === "E39" || c.startsWith("G60"))) return true;
  return false;
}

function pack(g, o) {
  const copied = isCopiedBadge(g);
  const extra = copied
    ? `This name is listed on every generation of the series. The sources used here do not describe it as its own engine of the ${g.code}. `
    : "";
  return {
    generationId: g.id,
    ratingOutOfFive: copied ? null : o.rating ?? null,
    scopeNote: (extra + (o.scope || "")).trim(),
    summary: o.summary,
    reddit: o.reddit || [],
    published: o.published || [],
    web: [],
    aiReading: o.ai,
    runningCosts: o.costs,
    recalls: o.recalls,
  };
}

const egrCampaign =
  "Moottori records an EGR-module campaign for certain diesels, four-cylinders built March 2011 to March 2017 and six-cylinders built August 2010 to January 2017. It names the 3, 4, 5, 6 and 7 Series and the X3, X4, X5 and X6. Coolant can collect in the module and, with soot and oil, can in rare cases ignite. The check is free. It covers cars in that window, not every diesel of these series.";

const airbagSdi =
  "A driver-airbag inflator campaign started 22 March 2023, recorded by Traficom, names the 1, 2, 3, 4, 5 and 6 Series, the X5, X5 M, X6 and X6 M, and the M3 and M4. The propellant can degrade with age. Affected cars get a new driver airbag module. Inclusion is a VIN question.";

const flexDisc =
  "A 2017 campaign named by Traficom and ADAC replaces the driveshaft flex disc on affected 1, 3, 5, 6 and 7 Series, X1 and Z4 cars. Inclusion is a VIN question.";

function e36Review(g) {
  return pack(g, {
    summary:
      "The E36 is the 1990s 3 Series, listed here through 2000. Moottori's compiled 3 Series notes used here start at the next generation, the E46, so the later fault lists are not copied onto this car.",
    scope: "Badges such as the M340i on this list belong to much later 3 Series.",
    published: [
      src(
        "BMW 3-sarja -tyyppiviat",
        "The generation sections on this list start at the E46, dated 1998–2005. The E36 is not given that generation's airbag, suspension or diesel notes.",
        U3,
      ),
    ],
    ai: "Do not treat an E46 or E90 fault as an E36 fault.",
    costs: "No consumption figure is attached.",
    recalls: "No E36 campaign was opened in this pass.",
  });
}

function e46Review(g) {
  const diesel = g.modelId === "bmw-320d";
  const m3 = g.modelId === "bmw-m3";
  return pack(g, {
    summary: m3
      ? "The E46 M3 is the high-performance 3 Series of 1998–2006, not the four-cylinder diesel. Moottori's M3 item for this era is a possible bearing failure from a dirty oil pump, listed as ADAC 2005."
      : diesel
        ? "The E46 320d is the diesel of the 1998–2006 3 Series. Moottori's owner notes for E46 diesels are turbo damage, and a separate injection-pump note for the 330d. The timing-chain complaint on the same page is for the next generation, the E90."
        : "The E46 is the 3 Series from 1998 to 2006, which is the early-2000s used car. Moottori's list for this body is suspension and brakes at inspection, a steering lock, and diesel items that belong to the diesel engines only.",
    scope: m3
      ? "The diesel turbo and 330d pump notes are other engines. The driver-airbag campaign does name the E46, including a check that the module was replaced."
      : diesel
        ? "The 330d pump note is a different diesel. The E90 chain note is not this engine."
        : "Turbo damage and the 330d pump are the diesel engines of this generation, not a petrol 316, 318, 320, 323, 325, 328 or 330.",
    published: [
      src(
        "BMW 3-sarja -tyyppiviat",
        "For the E46, dated there 1998–2005, owner reports include weak straight-line stability on the original run-flat tyres, a steering wheel that shakes, rare strut-bearing faults that can jam the steering, uneven running traced to the cruise control, turbo damage on diesels and injection-pump faults on the 330d, a cracked rear suspension arm on older cars, and cooling and fuel-line faults on the 2002–2003 320i. The 316i and 318i are listed with a breather pipe that can freeze. The driver airbag campaign covers E46 cars built about July 1999 to January 2003, together with the E39 and the E53 X5.",
        U3,
      ),
    ],
    ai: "These are recorded campaigns and owner reports for the E46, not a failure rate. The chain problem buyers associate with a BMW diesel starts, in this source, with the E90.",
    costs: "Inspection notes for the E46 are the suspension, brake pipes and the handbrake. No fuel figure is attached.",
    recalls:
      "Traficom, January 2017, on the driver airbag module for the E46, E39 and E53. The work is described as about one hour and free. Check that it was done. An ignition-switch campaign is also listed, Traficom 2008.",
  });
}

function e90Review(g) {
  const diesel = g.modelId === "bmw-320d";
  return pack(g, {
    summary: diesel
      ? "The E90 320d is the 2.0 diesel of the 2005–2013 3 Series. Moottori records owners of that diesel, from the end of 2007, complaining that the timing chain is noisy or stretched. The page says BMW treated it as a comfort issue. The repair is quoted at 14 hours, and BMW recommended a replacement engine."
      : "The E90 generation is the 2005–2013 3 Series, including the touring and the coupe under this code. The timing-chain complaint Moottori records is the 2.0 diesel from the end of 2007, not every engine. Straight-six petrols have a separate VANOS-bolt campaign.",
    scope: diesel
      ? "A 2006–2007 turbo note is also listed for the 320d. The VANOS-bolt campaign is the straight-six petrols, not this diesel."
      : "Do not apply the 320d chain note to a petrol 318, 320, 325, 328 or 330. The 335i is the turbo straight six of this generation and is not the diesel.",
    published: [
      src(
        "BMW 3-sarja -tyyppiviat",
        "E90, dated 2005–2011 on the list: owners of the 2.0 diesel from the end of 2007 report a noisy or stretched timing chain, with a 14-hour repair and a BMW recommendation of a replacement engine. The 320d is also listed with turbo faults for 2006–2007. Straight-six petrols: VANOS mounting bolts can break, the engine light comes on, and continued driving can damage the engine, ADAC 2014. A battery main cable on cars built March 2007 to July 2011 can leave the car unable to unlock or start, Traficom 16 May 2018. The 320i and 328i are listed with a brake vacuum pump, ADAC 2013.",
        U3,
      ),
    ],
    ai: "The chain is a pattern of reports on the late E90 four-cylinder diesel, not a percentage of cars and not a petrol-engine fault. A rattle after a cold start or an engine light is the symptom the page names.",
    costs: diesel
      ? "The page quotes 14 hours for the chain, which is the cost risk. No fuel figure is attached."
      : "No fuel figure is attached. Inspection notes for the E90 are brake hoses on older cars, the handbrake on automatics, steering joints and oil leaks.",
    recalls:
      "Battery main cable, cars built March 2007 to July 2011, Traficom 16 May 2018. VANOS bolts on the straight-six petrols, ADAC 2014. Ignition switch, Traficom 2008. Steering rack, Traficom 2011. Check the VIN rather than assuming each campaign includes this car.",
  });
}

function f30Review(g) {
  const diesel = g.modelId === "bmw-320d";
  return pack(g, {
    summary: diesel
      ? "The F30 320d is the diesel of the 2011–2019 3 Series. Moottori says the timing chain on the 316d, 318d and 320d can still be the problem if the engine rattles after a cold start or the engine light comes on. The same page says this generation has no standout item in the breakdown statistics."
      : "The F30 and F31 are the 2011–2019 3 Series. Moottori's breakdown note says this generation has no standout roadside fault. The diesel EGR campaign and the 320d chain note are diesel items, not a petrol 318, 320, 328, 330 or 340.",
    scope: diesel
      ? "The EGR campaign below is also this diesel if the build date falls in the window. Short-trip use is listed as a way the particulate filter clogs. That is a use pattern, not a rate."
      : "A 340i is the six-cylinder petrol of the F30. It does not inherit the 320d chain note.",
    published: [
      src(
        "BMW 3-sarja -tyyppiviat",
        "F30, 2011–2019: the breakdown list says the newer generation has no significant roadside faults. Under owner reports, the timing chain on the 316d, 318d and 320d can still fail, heard as a rattle after a cold start or seen as an engine light. The EGR module on diesels in the 2011–2017 window can collect coolant and, rarely, ignite. Early F30 cars had a brake-booster and steering campaign that the page says is already done. Door seals can shrink. A diesel particulate filter can clog when the car is used only for short trips.",
        U3,
      ),
    ],
    ai: "Two diesel items are doing different jobs. The chain is an owner-reported pattern on the four-cylinder diesels. The EGR item is a manufacturer campaign for cars built in a dated window. Neither is a count of how many F30s fail.",
    costs: diesel
      ? "The expensive diesel job named here is the chain, by the same 14-hour pattern Moottori gives for this engine family on the 1 Series page. No fuel figure is attached."
      : "No fuel figure is attached. German inspection notes for the F30 are suspension, the handbrake, emissions, headlights, oil leaks and brakes.",
    recalls: egrCampaign + " " + flexDisc + " Early F30 brake-booster vacuum pump and electric steering, Traficom 2013, campaign finished 2016.",
  });
}

function f30PhevReview(g) {
  return pack(g, {
    summary:
      "This is the plug-in 330e of the previous 3 Series, the F30, not the G20 car Moottori tested in 2019. That test's 12 kWh battery, NEDC range and 3.7 kW charging do not belong to this row, and they are not copied here.",
    scope: "The EGR and timing-chain notes for the F30 are the diesels. This row is the petrol plug-in.",
    published: [
      src(
        "BMW 3-sarja -tyyppiviat",
        "The F30 section is the fault list used for this body. It does not quote a battery size or an electric range for the 330e. Those figures are left off rather than taken from the later G20 test.",
        U3,
      ),
    ],
    ai: "A missing electric-range figure is better than the G20's figure on the wrong car.",
    costs: "No consumption figure is attached. Use the specification row for this version.",
    recalls:
      "The diesel EGR campaign does not apply to this petrol plug-in. " + flexDisc,
  });
}

function gtReview(g) {
  return pack(g, {
    summary:
      "The F34 is the 3 Series Gran Turismo, built alongside the F30. Moottori notes that a 320d xDrive GT scored 2 in an AutoBild 100,000 km test, on a scale where 1 is best and 5 is worst. The page does not list what was replaced.",
    scope:
      "That score is a 320d xDrive GT. This row is the 318 or 320 Gran Turismo badge, so the score is the diesel car, not automatically this engine.",
    published: [
      src(
        "BMW 3-sarja -tyyppiviat",
        "The page says the BMW 320d xDrive GT received a good score of 2 in AutoBild's 100,000 km endurance test, and that a buyer should confirm the recall work at a BMW dealer.",
        U3,
      ),
    ],
    ai: "One endurance-test score, without a list of repairs, is not a reliability rate for every Gran Turismo.",
    costs: "No fuel figure is attached.",
    recalls: egrCampaign + " The chain note for the F30 316d, 318d and 320d is the diesel, if this car is the diesel.",
  });
}

function e87Review(g) {
  return pack(g, {
    summary:
      "The E81 and E87 are the first 1 Series, 2004–2011, still rear-wheel drive. Moottori's older breakdown list for the 1 Series includes ignition coils, a jumped timing chain on petrols up to 2010, and fuel pumps. The long N47 diesel-chain note on the same page is written under the later F20, and it says the reports are mainly about the earlier model.",
    scope:
      "A 135i is the six-cylinder petrol of this generation. The 114 and the M135i name belong to the next 1 Series. The diesel chain is the 118d and 120d, not every petrol.",
    published: [
      src(
        "BMW 1-sarja -tyyppiviat",
        "Older roadside faults include a failed ignition coil through 2012, a VANOS adjuster, a jumped chain on petrols up to 2010, and a failed fuel pump. The 118d and 120d had an alternator-bolt recall in 2006 that could stop the water pump and overheat the engine. The 118d injector bracket can crack, ADAC 2007. A diesel fuel-filter heater on the E82 and E87 can short, Traficom 2011.",
        U1,
      ),
    ],
    ai: "The first 1 Series shares the era of the E90 diesel chain, and the page points the diesel-chain reports at the earlier model rather than at the post-2015 cars. It still does not give a percentage.",
    costs: "No fuel figure is attached. The alternator-bolt fault is the one that can lead to an overheated engine if the belt is slack.",
    recalls:
      "Alternator mounting bolt on the 118d and 120d hatch, ADAC 2006. Fuel-filter heater on E82 and E87 diesels, Traficom 2011. Side airbag and belt pretensioner wiring, VOSA 2009. " + flexDisc,
  });
}

function f20Review(g) {
  const smallPetrol = g.modelId === "bmw-114" || g.modelId === "bmw-116";
  const i125 = g.modelId === "bmw-125";
  return pack(g, {
    summary: i125
      ? "The F20 125i uses the N20 petrol, and Moottori's 1 Series list says that engine's camshaft can fail in a way that stops the brake booster. The diesel chain and the diesel EGR fire note are different engines."
      : smallPetrol
        ? "The F20 is the second 1 Series, 2011–2019, still rear-wheel drive. Moottori says the timing chain on the 114i and 116i, and on the N47 diesel, can jump and damage the engine. A revised tensioner was meant to help. From 2015 the chain reports decreased but did not disappear. The chain is at the back of the engine, and the job is quoted at up to 14 hours."
        : "The F20 and F21 are the 2011–2019 1 Series. Moottori says the F-generation has few roadside faults, and then lists the chain on the small petrols and the N47 diesel, an EGR fire risk on the diesel, and a brake-booster campaign on the first cars.",
    scope: i125
      ? "Do not apply the 116i or N47 chain note to this N20 car. The camshaft item is the one the page attaches to the 125i."
      : "The N20 camshaft note is the 125i. The 1.5-litre three-cylinder, shared with Mini, is listed with crankshaft thrust-bearing faults on cars built up to April 2015.",
    published: [
      src(
        "BMW 1-sarja -tyyppiviat",
        "Under F20, F21, F22 and F23 owner reports: the 114i and 116i chain, and the N47 diesel chain, can jump. The chain sits at the back of the engine and the work is quoted at up to 14 hours. The N20 in the 125i can lose the brake booster if the camshaft fails. Diesel EGR coolant can reach the exhaust and, in the worst case, start a fire. The 125d turbo can leak oil. The first F-series 1 and 2 Series had a brake-booster vacuum-pump campaign. The tailgate can rust. ADAC is quoted as having few fault reports on the then-new F model.",
        U1,
      ),
    ],
    ai: "The chain is the expensive item, and the page itself says it eased after 2015 without going away. A cold rattle or an engine light is the symptom to listen for on the engines the page names, not on every F20.",
    costs: "The chain job is the cost the page names, up to 14 hours, because of where the chain sits. No fuel figure is attached.",
    recalls:
      "Brake-booster vacuum pump on the first F-series 1 and 2 Series. Electric power-steering controller, cars built 18 July 2011 to 9 June 2016, ADAC 2016. Steering rack on the F20, Traficom 2011, campaign finished. " +
      egrCampaign,
  });
}

function f40Review(g) {
  return pack(g, {
    summary:
      "The F40 is the 1 Series from 2019, and it is front-wheel drive, unlike the E87 and the F20. Moottori's compiled 1 Series page used here is about those earlier rear-drive cars, so their chain and EGR notes are not copied onto this generation.",
    scope: "A separate road test of the F40 was not opened in this pass. The M135i of this generation is all-wheel drive, not the old rear-drive M135i.",
    published: [
      src(
        "BMW 1-sarja -tyyppiviat",
        "The detailed owner list is headed as the F20 and F21. The chain, N20 and EGR paragraphs there are not applied to the F40.",
        U1,
      ),
    ],
    ai: "Leaving the old chain note off the F40 is deliberate. The page does not say the front-drive car inherited it.",
    costs: "No consumption figure is attached.",
    recalls: airbagSdi,
  });
}

function f22Review(g) {
  return pack(g, {
    summary:
      "The F22 and F23 are the 2 Series coupe and convertible, 2014–2021, and Moottori files them with the F20 1 Series. The chain, EGR and first-batch brake-booster notes on that page are the ones that name this pair of bodies.",
    scope:
      "An M240i is the six-cylinder petrol. It is not the 116i, and it is not the N47 diesel. The 225xe Active Tourer is a different car, on the F45 code.",
    published: [
      src(
        "BMW 1-sarja -tyyppiviat",
        "The owner-report heading is 1 Series and 2 Series, F20, F21, F22 and F23. It includes the chain on the 114i, 116i and N47 diesel, the N20 camshaft on the 125i, diesel EGR fire risk, and the brake-booster campaign on the first F-series 1 and 2 Series.",
        U1,
      ),
    ],
    ai: "The 2 Series coupe of this era is mechanically the 1 Series generation, which is why the same page covers it. The fault still has to match the engine.",
    costs: "No fuel figure is attached. The chain job, where the page applies it, is quoted at up to 14 hours.",
    recalls: "First-batch F-series brake booster, as on the 1 Series page. " + egrCampaign + " " + airbagSdi,
  });
}

function g42Review(g) {
  return pack(g, {
    summary:
      "The G42 is the current 2 Series coupe, from 2021. It is not the F22. Moottori's chain and EGR list for the F22 is not copied here. A body-controller campaign started 15 February 2023 does name the G42.",
    scope: "If the body controller was replaced in a workshop and not reset, the automatic door lock can stay off. That is the campaign, not a description of how the car drives.",
    published: [
      src(
        "BMW 3-sarja -tyyppiviat",
        "The February 2023 campaign names the 2 Series G42 together with the G20, G21, G22, G23 and the M3 and M4. A replaced body controller that was not reset can disable the automatic door lock, which matters in a second impact. Affected cars are checked and reset.",
        U3,
      ),
    ],
    ai: "This is a workshop-reset campaign for cars that already had the controller replaced, not a claim that every G42 is unlocked.",
    costs: "No consumption figure is attached.",
    recalls: airbagSdi,
  });
}

function activeTourerReview(g) {
  const u06 = g.code === "U06";
  return pack(g, {
    summary: u06
      ? "The U06 225xe is the current plug-in 2 Series Active Tourer. It is not the 330e, and the 3 Series plug-in battery and range are not copied here. A road test of this exact car was not opened in this pass."
      : "The F45 225xe is the previous plug-in Active Tourer, 2016–2021. It is a front-drive people-mover, not the rear-drive F22 coupe. The G20 330e figures are a different car and are not copied here.",
    scope: "No electric range is stated, because none was taken from another BMW plug-in.",
    ai: "These two rows exist so the plug-in 2 Series is not given a 3 Series review.",
    costs: "No consumption figure is attached. Use the specification row.",
    recalls: u06
      ? "The F20-era chain note is not this car. " + airbagSdi
      : "The first-batch F-series brake-booster note on the 1 Series page is the early F cars, not automatically a 2016 Active Tourer. " + airbagSdi,
  });
}

function e39Review(g) {
  return pack(g, {
    summary:
      "The E39 is the 5 Series from 1995 to 2003, so cars registered after 2000 are still this generation. Moottori says the straight-six petrol is otherwise solid but the VANOS system plays up with age. The older 525td and 525tds heads suffered overheating. The later common-rail diesels are described as clearly tougher. Fuel pumps are named for 1997–1998.",
    scope:
      "The E60 timing-chain note is the next 5 Series, not this one. Electrical glitches on the list include the speedometer and the climate control.",
    published: [
      src(
        "BMW 5-sarja -tyyppiviat",
        "E39, dated 1995–2004: failed fuel pumps in 1997–1998, electrical glitches such as the speedometer and the climate control, VANOS trouble on the straight-six petrol as it ages, and overheating cylinder heads on the 525td and 525tds. The later common-rail diesels are described as much tougher. The driver-airbag campaign also names the E39 with the E46 and the E53 X5.",
        U5,
      ),
    ],
    ai: "The useful split on this page is the old swirl-chamber diesels versus the later common-rail diesels, and VANOS on an ageing six. Neither is a failure rate.",
    costs: "No fuel figure is attached. The page also notes that 5 Series cars are driven about 50 percent more than the average car, which raises the chance of wear.",
    recalls:
      "Driver airbag module, with the E46 and E53, Traficom January 2017. Rear shock mounting, Vosa and ADAC 2006. Rear axle mounting, Traficom and Vosa 2008.",
  });
}

function e60Review(g) {
  const diesel = g.modelId === "bmw-520" || g.modelId === "bmw-m550d";
  const is520 = g.modelId === "bmw-520";
  return pack(g, {
    summary: is520
      ? "The E60 is the 2003–2010 5 Series. The catalog has one 520 badge. Moottori's chain note for this generation is the 520d 2.0 diesel from the end of 2007: owners report a noisy or stretched chain, BMW called it a comfort issue, the repair is quoted at 14 hours, and BMW recommended a replacement engine. A petrol 520i does not share that note."
      : "The E60 and E61 are the 2003–2010 5 Series. Inspection notes are steering joints, brakes, the handbrake, brake hoses, gearbox oil leaks and the exhaust. The chain complaint is the 520d from the end of 2007. Six-cylinder diesels up to the 2006 model year are listed with an injector that can come loose and damage the engine.",
    scope: is520
      ? "If this car is the petrol 520i, ignore the chain paragraph. The diesel fuel-filter recall is also a diesel item."
      : diesel
        ? "This is not the 520d chain car."
        : "The 520d chain and the six-cylinder diesel injector are other engines.",
    published: [
      src(
        "BMW 5-sarja -tyyppiviat",
        "E60, 2003–2010: a six-cylinder diesel injector can come loose and damage the engine, up to the 2006 model year. Diesels had a fuel-filter contact fault that can empty the battery and is listed with an engine-bay fire risk, a recall, ADAC and AutoBild 2013. The 520d 2.0 diesel from the end of 2007 has the same chain complaint as the E90, with a 14-hour repair. Roadside items include a failed turbo on 2006–2008 diesels and a failed fuel pump on 2006–2011 diesels.",
        U5,
      ),
    ],
    ai: "The E60 diesel story in this source is the injector on the early six-cylinder and the chain on the later 520d. They are not the same fault, and neither is given as a percentage.",
    costs: "The chain, where it applies, is the 14-hour job. No fuel figure is attached.",
    recalls:
      "Diesel fuel-filter contact, ADAC 2013, with the fire risk the page names. Battery cover that can short if fitted wrong. Various electrical faults are listed without a single part name.",
  });
}

function f10Review(g) {
  const is520 = g.modelId === "bmw-520";
  const m550 = g.modelId === "bmw-m550d";
  return pack(g, {
    summary: m550
      ? "The F10 M550d is the triple-turbo diesel of the 2010–2017 5 Series. Moottori lists a specific item: the chain tensioner can break because of an installation fault and cause high oil use, KBA 2015. The ordinary 520d chain note is a different engine."
      : is520
        ? "The F10 is the 2010–2017 5 Series. Moottori's test of a 520d xDrive, written as the generation was about to be replaced, calls it calm and isolated, with vague steering, and gives the diesel as 190 hp and 400 Nm."
        : "The F10 and F11 are the 2010–2017 5 Series. Moottori's own drive was a 520d xDrive. The body is described as quiet and large, with steering that no longer tells the driver much about the road. Suspension wear is the ownership note, because the front axle has many joints.",
    scope: is520
      ? "The test car is the diesel 520d xDrive. A petrol 520 of this generation does not use 4.9 l/100 km from that test. The M550d tensioner is a different engine."
      : m550
        ? "Do not apply the 520d test's fuel figure to the M550d."
        : "The 4.9 l/100 km figure is the tested 520d xDrive on the old NEDC cycle, not this engine.",
    published: [
      src(
        "Koeajo: Vielä kerran vanha vitonen – BMW 520dA xDrive",
        "The test car is a four-cylinder diesel, 1,995 cm³, 140 kW (190 hp), 400 Nm, eight-speed automatic, xDrive. 0 to 100 km/h is 7.9 seconds. Stated use is 4.9 l/100 km NEDC. The test car cost 58,626 euros. The writer praises how stable it is in slush and how much quieter it is than earlier 5 Series, and criticises the vague steering and the sheer size.",
        "https://moottori.fi/koeajo/koeajo-bmw-520da-xdrive/",
      ),
      src(
        "BMW 5-sarja -tyyppiviat",
        "F10 and F11 are described as otherwise reliable, with the timing chain named as a 2011 roadside item. Owner reports add a parking brake that can stay powered and flatten the battery, fixed by software, VANOS bolts on six-cylinder petrols, diesel EGR fire risk, steering-rack oil leaks, chain-tensioner installation errors, and front suspension with 11 joints per wheel that wear and are expensive.",
        U5,
      ),
    ],
    ai: "The road test is one 520d xDrive. The fault page is a list of campaigns and wear points, and it still calls the F10 reliable apart from the chain item. Those two statements sit side by side. Neither is a failure rate.",
    costs: is520
      ? "The test quotes 4.9 l/100 km NEDC for the 520d xDrive, and 58,626 euros for that car. NEDC is the old cycle."
      : "Do not use the 520d test's 4.9 l/100 km for this engine. Suspension work is the cost the fault page emphasises.",
    recalls: (m550
      ? "M550d chain tensioner, installation fault, high oil use, KBA 2015. "
      : "ADAC names the timing chain as a 2011 roadside item on the F10 and F11, and otherwise calls the car reliable. ") + egrCampaign + " VANOS bolts on six-cylinder petrols up to 2011, ADAC 2014. " + flexDisc,
  });
}

function g30Review(g) {
  const is520 = g.modelId === "bmw-520";
  const phev = g.modelId === "bmw-530e";
  const m550 = g.modelId === "bmw-m550d";
  return pack(g, {
    rating: is520 ? 4 : null,
    summary: is520
      ? "The G30 is the 2016–2023 5 Series. Moottori's facelift test of the 520d praises the powertrain and the driving position and names the steering as the thing that was not fixed. The same fault page says the 520d chain can still be the problem if the engine rattles after a cold start or the engine light comes on."
      : phev
        ? "The G30 530e is the plug-in of the previous 5 Series. Moottori's facelift article says a plug-in was offered as the four-cylinder 530e and, later, the six-cylinder 545e xDrive. The i5's battery figures are the next generation and are not copied here."
        : m550
          ? "The G30 M550d is the diesel performance 5 Series of this generation. Moottori's chain sentence on the G30 page is written for the 520d, not for this engine. A NOx-catalyst software campaign does name the M550d xDrive of the previous F10, which is a different car."
          : "The G30 and G31 are the 2016–2023 5 Series. The road test opened here is the facelift 520d. Its steering complaint is about the body. Its fuel use is the diesel's.",
    scope: is520
      ? "The test car is the 520d xDrive with the 48-volt mild hybrid. A petrol 520 does not share that fuel use. The chain sentence is this diesel."
      : "The 520d chain sentence and the 520d test's fuel use stay on the 520 row.",
    published: [
      src(
        "Koeajo: BMW 520d sai piristetyn maskin, mutta yksi asia jäi korjaamatta",
        "The facelift test says every ordinary four- and six-cylinder 5 Series gained a 48-volt mild hybrid. On the 520d the electric motor adds 8 kW (11 hp) while accelerating. The 520d xDrive is called civilised, quick enough and very economical. The steering is called remote and unnecessarily heavy. The article does not print a litres-per-100 km figure in the passage used here, so none is invented.",
        "https://moottori.fi/koeajo/koeajo-bmw-520d-sai-piristetyn-maskin-mutta-yksi-asia-jai-korjaamatta/",
      ),
      src(
        "BMW 5-sarja -tyyppiviat",
        "G30 and G31: a 540i xDrive Touring scored 3 in AutoBild's 100,000 km test, on a scale where 1 is best. The steering rack was replaced and the VANOS system played up. A four-cylinder turbo 528i scored 1+. The 520d chain can still fail, with a cold rattle or an engine light as the sign. An OBD-software campaign started 2 March 2022 names G30 and G31 cars with the B47 diesel, and also the G01 X3 and G02 X4, because a bad update can stall the engine.",
        U5,
      ),
    ],
    ai: "The facelift 520d is praised as a powertrain and criticised for its steering. The chain line is specifically the 520d, and it is a symptom to check, not a rate. The 540i endurance test is one car.",
    costs: is520
      ? "The facelift article promises the 48-volt system and calls the 520d very economical, without a litres figure in the passage used here. An earlier news piece on the same 520d said the 48-volt system can cut use by 0.3 l/100 km and that the diesel stays at 190 hp."
      : "No fuel figure is copied from the 520d test.",
    recalls: (phev
      ? "Two 2020 high-voltage battery campaigns name the G30 and G31 plug-in: a cell fault that can short while charging, including when the car is parked. "
      : "") +
      "OBD software on B47 diesels, from 2 March 2022, can stall the engine. Brake-disc rivet campaigns from 10 February 2021 name the G30 and G31. Front belt check, Traficom September 2017, also names the G32. " +
      (is520 ? "The 520d chain is the owner-reported item on this page. " : ""),
  });
}

function fourSeriesReview(g) {
  const g2x = g.code.startsWith("G22");
  return pack(g, {
    summary: g2x
      ? "The G22, G23 and G26 are the current petrol and diesel 4 Series, from 2020. They are not the i4. The i4's battery and range are a different car. A body-controller campaign started 15 February 2023 names the G22 and G23."
      : "The F32, F33 and F36 are the 2013–2020 4 Series. Moottori groups their owner reports with the F30 3 Series: door seals that shrink, a diesel particulate filter that clogs on short trips, and faster wear if the car is lowered. The diesel EGR campaign names the 4 Series.",
    scope: g2x
      ? "An M440i is the six-cylinder petrol of this body. It does not use the i4's kWh figures."
      : "The chain note for the F30 diesels is the 316d, 318d and 320d. It is not automatically a 420, 428, 430 or 435.",
    published: [
      g2x
        ? src(
            "BMW 3-sarja -tyyppiviat",
            "The February 2023 body-controller campaign names the 4 Series G22, G23 and G24 with the G20 and the G42. A controller that was replaced and not reset can leave the automatic door lock off.",
            U3,
          )
        : src(
            "BMW 3-sarja -tyyppiviat",
            "Owner reports are headed as the F30, F31 and F80 3 Series and the F32 4 Series, 2012–2019. They name shrinking door seals, a clogged diesel particulate filter on short trips, and faster bush and hub wear on a lowered car.",
            U3,
          ),
    ],
    ai: g2x
      ? "The current 4 Series shares its body-controller campaign with the 3 Series. It does not share the i4's battery."
      : "Treat the F32 as the F30's coupe for the faults the page actually groups together. Do not add the E90 chain on top.",
    costs: "No fuel figure is attached.",
    recalls: g2x ? airbagSdi : egrCampaign + " " + airbagSdi,
  });
}

function sixSeriesReview(g) {
  const e63 = g.code.startsWith("E63");
  const g32 = g.code === "G32";
  return pack(g, {
    summary: e63
      ? "The E63 and E64 are the 2003–2010 6 Series coupe and convertible. The diesel EGR campaign Moottori dates from 2010 does not cover this generation. A road test was not opened, so no fault is invented."
      : g32
        ? "The G32 is the 6 Series Gran Turismo, 2017–2023. A front-belt campaign, Traficom September 2017, names the G32 together with the G30 and G31. The i5 figures are not this car's."
        : "The F06, F12 and F13 are the 2011–2018 6 Series. They fall in the years of the diesel EGR campaign, which names the 6 Series. A separate road test was not opened.",
    scope: "An M6 is the motorsport model of the older 6 Series, not the diesel the EGR campaign is about.",
    ai: "Where a campaign does not name this generation, it is left off.",
    costs: "No fuel figure is attached.",
    recalls: e63
      ? airbagSdi
      : egrCampaign + " " + airbagSdi + (g32 ? " Front seat belts, Traficom September 2017, name the G32." : ""),
  });
}

function sevenSeriesReview(g) {
  const code = g.code;
  const early = code === "E38" || code.startsWith("E65");
  const g70 = code === "G70";
  const i7 = g.modelId === "bmw-i7";
  return pack(g, {
    summary: i7
      ? "The i7 is the electric G70. Moottori's 3 Series list names it in the same high-voltage campaign as the i4: a cell-supervision connector may be unlocked, and drive power can drop to zero with a warning. The i5's road-test figures are not copied here."
      : g70
        ? "The G70 is the current 7 Series, from 2022. The diesel EGR window Moottori dates to 2010–2017 does not cover it. A road test of the petrol G70 was not opened in this pass."
        : early
          ? `The ${code} is a 7 Series that runs into the 2000s. A separate fault page for the 7 Series was not opened, so the later diesel EGR campaign is not applied to the E38, and it is applied to an E65 only if the car is a late diesel inside the dated window.`
          : `The ${code} is a 7 Series inside the years of Moottori's diesel EGR campaign, which names the 7 Series. That campaign is the diesel item. A road test was not opened for this body.`,
    scope: i7
      ? "Combustion 7 Series rows do not use this battery campaign as their fault."
      : "The flex-disc campaign of 2017 names the 7 Series among several lines. Inclusion is a VIN question, not a claim that every 7 Series needs the joint.",
    published: i7
      ? [
          src(
            "BMW 3-sarja -tyyppiviat",
            "The 19 April 2023 campaign names the i7 (G70) with the i4, the iX1 and the iX3. A cell-supervision cable bridge may be unlocked. Power can drop to zero, with a check-control message. The circuit is replaced on affected cars.",
            U3,
          ),
        ]
      : [],
    ai: "The 7 Series pages say which campaign names the car. They do not invent a driving impression.",
    costs: "No consumption figure is attached.",
    recalls: i7
      ? "Cell-supervision circuit, campaign started 19 April 2023. Inclusion is a VIN question."
      : early
        ? flexDisc + " " + airbagSdi
        : egrCampaign + " " + flexDisc + " " + airbagSdi,
  });
}

function eightSeriesReview(g) {
  return pack(g, {
    summary:
      "The G14, G15 and G16 are the current 8 Series, from 2018. A road test was not opened in this pass, and the diesel EGR window ends before this generation, so that campaign is not applied.",
    scope: "The M850i is the eight-cylinder petrol of this body. The M8 is a separate catalog row.",
    ai: "No fault is added from the 6 Series or the 5 Series.",
    costs: "No consumption figure is attached.",
    recalls: "No campaign opened in this pass names the G14, G15 or G16 specifically.",
  });
}

function i3Review(g) {
  return pack(g, {
    summary:
      "The i3, chassis I01, is BMW's carbon-bodied city electric, built from 2013 to 2022. The i3s is the sharper version of the same car. A high-voltage campaign that names an i3 sedan is the Chinese G28 3 Series, not this I01, so it is not applied here.",
    scope: "A range-extender i3 is a different powertrain from the pure electric car. No range figure is copied from another BMW electric.",
    published: [
      src(
        "BMW 5-sarja -tyyppiviat",
        "A passenger-airbag campaign for cars built July to December 2016 names the i3 and the i8 together with the 2, 4, 5 and 6 Series and the F48 X1. The inflator material can keep the bags from opening as designed. The work is free.",
        U5,
      ),
    ],
    ai: "The I01 and the later G28 i3 sedan share a name and not a body. The battery campaign for the G28 is left off this page on purpose.",
    costs: "No energy figure is attached.",
    recalls: "Passenger airbags, cars built July–December 2016, ADAC February 2017. Check the VIN.",
  });
}

function i8Review(g) {
  return pack(g, {
    summary:
      "The i8 is the plug-in sports car, I12 coupe and I15 roadster, built from 2014 to 2020. The same 2016 passenger-airbag campaign that names the i3 also names the i8. No performance or battery figure is copied from the i4.",
    scope: "This is not an i4 and not an M car.",
    published: [
      src(
        "BMW 5-sarja -tyyppiviat",
        "The passenger-airbag campaign for cars built July to December 2016 names the i8 with the i3, the 2, 4, 5 and 6 Series and the F48 X1.",
        U5,
      ),
    ],
    ai: "One named campaign, no invented driving notes.",
    costs: "No consumption figure is attached.",
    recalls: "Passenger airbags on cars built July–December 2016. Inclusion is a VIN question.",
  });
}

function ixReview(g) {
  return pack(g, {
    summary:
      "The iX, chassis I20, is BMW's large dedicated electric SUV, from 2021. It is not the iX1, the iX3 or the i4, and their battery figures are not copied here. A road test was not opened in this pass.",
    scope: "The cell-supervision campaign that names the i4, iX1 and iX3 does not name the iX in the list used here, so it is not applied.",
    ai: "A different electric BMW's range is not a stand-in.",
    costs: "No energy figure is attached. Use the specification row.",
    recalls: "No campaign opened in this pass names the I20 iX.",
  });
}

function ix1Review(g) {
  return pack(g, {
    summary:
      "The iX1 is the electric U11, not the plug-in xDrive30e. Moottori's X1 test, including 0.9 l/100 km and 89 km of electric range, is the petrol plug-in and does not belong on this row.",
    scope: "The cell-supervision campaign that names the iX1 is the item that does belong here.",
    published: [
      src(
        "BMW 3-sarja -tyyppiviat",
        "The 19 April 2023 campaign names the iX1 (U11) with the i4, the i7 and the iX3. A cell-supervision connector may be unlocked. Drive power can drop to zero, with a warning. Affected cars get the circuit replaced.",
        U3,
      ),
    ],
    ai: "Do not read the plug-in X1 test as a review of the iX1. The shared fact in the sources opened here is the battery-monitor campaign.",
    costs: "No energy figure is attached. Use the specification row.",
    recalls: "Cell-supervision circuit, campaign started 19 April 2023. Inclusion is a VIN question.",
  });
}

function ix3Review(g) {
  return pack(g, {
    summary:
      "The iX3, chassis G08, is the electric X3 from 2020. It is not the plug-in X3 xDrive30e, and it is not the i4. Moottori names it in the same cell-supervision campaign as the i4 and the iX1.",
    scope: "The B47 software campaign that names the petrol-and-diesel G01 X3 is a diesel item and is not this electric car.",
    published: [
      src(
        "BMW 3-sarja -tyyppiviat",
        "The 19 April 2023 campaign names the iX3 (G08). A cell-supervision connector may be unlocked and drive power can drop to zero, with a warning. The circuit is replaced on affected cars.",
        U3,
      ),
    ],
    ai: "The campaign is the sourced item. No range is borrowed from the i4 test.",
    costs: "No energy figure is attached.",
    recalls: "Cell-supervision circuit, campaign started 19 April 2023. Inclusion is a VIN question.",
  });
}

function x1OldReview(g) {
  const f48 = g.code === "F48";
  const phev = g.modelId.includes("xdrive25e");
  return pack(g, {
    summary: f48
      ? "The F48 is the second X1, 2015–2022, and the first front-drive one. Moottori says owner reports are few, and that an AutoBild 100,000 km test scored it 1-, close to the top of a scale where 1 is best. The diesel EGR fire campaign is the serious item, not a chain."
      : "The E84 is the first X1, 2009–2015, rear-drive based. Moottori says the timing chain is the diesel problem on this generation: a loud rattle after a cold start, or an engine light. An AutoBild 100,000 km test still scored the E84 as very reliable. The chain note is not transferred onto the later F48.",
    scope: phev
      ? "This row is the plug-in xDrive25e of the F48. The chain note is the previous E84 diesel. Two 2020 high-voltage battery campaigns are the plug-in item."
      : f48
        ? "The E84 chain sentence is the previous generation. Moottori says so explicitly."
        : "A manual diesel of this generation is listed with a clutch that shudders. The brake-booster campaign is the petrol cars of 2012–2013.",
    published: [
      src(
        "BMW X1 -tyyppiviat",
        f48
          ? "F48 from 2015: few owner reports, AutoBild score 1- after 100,000 km. Listed campaigns include EGR fire risk, tail lamps that can come loose, a passenger-airbag dash panel that may need replacing, a dual-clutch connector that can leave the car unable to restart, a driveshaft flex disc that the page calls cheap to replace, and a glass roof that creaks in the cold."
          : "E84, 2009–2015: AutoBild scored it very reliable over 100,000 km. The diesel chain is named as this generation's problem. Petrol cars of 2012–2013 had a brake-booster vacuum-pump campaign. Manual diesels are listed with a clutch that shudders. A battery main cable, the same 2007–2011 window as the E90, can leave the car unable to unlock or start.",
        UX1,
      ),
    ],
    ai: f48
      ? "The F48 page is the opposite of the E84 diesel page: few reports, a strong endurance score, and a list of recalls rather than a chain."
      : "Reliable in one endurance test and a known diesel chain can both be true. The page says both, and it limits the chain to this generation's diesels.",
    costs: f48
      ? "No fuel figure is attached. The flex disc is the item the page calls inexpensive."
      : "The chain is the expensive diesel job. No fuel figure is attached.",
    recalls: f48
      ? (phev
          ? "High-voltage battery campaigns of 11 August 2020 and 23 September 2020 name plug-in BMWs, including a cell fault that can short while charging. "
          : "") +
        "Seat-belt bolts, F48, campaign started 10 November 2021. Front-belt retractor, campaign started 9 March 2022, also names the F48. Tail-lamp bracket, Traficom 25 January 2019. Dual-clutch connector, ADAC October 2017. " +
        egrCampaign
      : "Battery main cable, build window March 2007 to July 2011, Traficom 16 May 2018. Brake-booster vacuum pump on 2012–2013 petrols. " + flexDisc,
  });
}

function xFamilyReview(g) {
  const code = g.code;
  const name = code.startsWith("F97") || code.startsWith("F98") || code.includes(" M")
    ? "M version"
    : "generation";
  const dieselYears = !code.startsWith("E") && !code.startsWith("G0") && !code.startsWith("G45") && !code.startsWith("F9");
  const isG01 = code === "G01" || code === "G02";
  const phev = g.modelId.includes("xdrive30e");
  let summary;
  if (code === "E83") {
    summary =
      "The E83 is the first X3, 2003–2010, from the E46 era. A separate X3 fault page was not opened. The diesel EGR campaign Moottori dates from 2010–2011 is not applied to this generation.";
  } else if (code === "E53") {
    summary =
      "The E53 is the first X5, 1999–2006. The driver-airbag campaign that covers the E46 and the E39 also names the E53. Later X5 plug-in figures are not this car's.";
  } else if (code === "E70" || code === "E71") {
    summary = `The ${code} is the second-generation X5 or the first X6, running to about 2014. A dedicated page was not opened. A late diesel can fall inside the six-cylinder EGR window that starts in August 2010. Nothing else is added.`;
  } else if (code === "F15" || code === "F16" || code === "F25" || code === "F26") {
    summary = `The ${code} sits in the years of Moottori's diesel EGR campaign, which names the X3, X4, X5 and X6. That is the diesel item. A road test of this body was not opened, so no fuel figure is copied from the current X5.`;
  } else if (isG01) {
    summary = phev
      ? "This is the plug-in X3 of the G01 generation. The iX3's battery campaign is a different car. An OBD-software campaign names the G01 when it has the B47 diesel, which is not this plug-in."
      : `The ${code} is the X3 or X4 generation still listed as current beside the newer electric iX3. An OBD-software campaign started 2 March 2022 names the G01 and G02 when they have the B47 diesel: a bad update can stall the engine. The current X5 plug-in figures are not this car's.`;
  } else if (code.startsWith("F8") || code.startsWith("F9") || code.includes(" M")) {
    summary = `This is the ${name} of the X3, X4, X5 or X6, code ${code}. The volume diesel chain and the X5 xDrive50e range are not this car's. The March 2023 driver-airbag campaign names the X5 M and the X6 M where the model is one of those.`;
  } else {
    summary = `BMW ${code}. A separate road test was not opened for this body, so no fuel figure and no fault are invented from another BMW.`;
  }
  return pack(g, {
    summary,
    scope: "Figures from the G05 xDrive50e test stay on the G05 page.",
    published: isG01
      ? [
          src(
            "BMW 5-sarja -tyyppiviat",
            "The OBD-software campaign started 2 March 2022 names G01 X3 and G02 X4 cars with the B47 engine, together with the G30 and G31. A misread sensor can stall the engine. Affected cars are reprogrammed.",
            U5,
          ),
        ]
      : code === "E53"
        ? [
            src(
              "BMW 3-sarja -tyyppiviat",
              "The driver-airbag module campaign, Traficom January 2017, names the E53 X5 together with the E46 and the E39.",
              U3,
            ),
          ]
        : [],
    ai: "This page only repeats a campaign that names the chassis. It does not borrow the current X5's litres or electric range.",
    costs: "No consumption figure is attached.",
    recalls:
      (code === "E53"
        ? "Driver airbag module, Traficom January 2017, with the E46 and the E39. "
        : "") +
      (dieselYears || code === "E70" || code === "E71" ? egrCampaign + " " : "") +
      (code.startsWith("F15") || code.startsWith("F16") || code.startsWith("F8") || code.startsWith("F9") || code.startsWith("G06") || code.startsWith("G07")
        ? airbagSdi + " "
        : "") +
      (isG01 ? "B47 OBD software, from 2 March 2022, can stall the engine. It is the diesel, not the plug-in. " : ""),
  });
}

function x2Review(g) {
  const f39 = g.code === "F39";
  return pack(g, {
    summary: f39
      ? "The F39 is the first X2, 2018–2023, a coupe-roof version of the F48 X1. A front-belt retractor campaign started 9 March 2022 names the F39. The F48 chain note is not copied here, because Moottori already keeps that chain on the E84."
      : "The U10 is the current X2, from 2023, including the electric iX2 in this catalog. The iX1's battery figures and the plug-in X1's 89 km range are not copied here. A road test was not opened.",
    scope: f39
      ? "The belt campaign also names the F48 X1, the F46, the G20 and the F80 M3."
      : "The cell-supervision campaign names the iX1, not the iX2, in the list used here.",
    published: f39
      ? [
          src(
            "BMW 1-sarja -tyyppiviat",
            "The campaign started 9 March 2022 names the F39 X2. The micro gas generator in the front belt retractor may be damaged. Restraint can be weaker, and a spark outside the tube is not ruled out. Belts are checked and replaced if needed.",
            U1,
          ),
        ]
      : [],
    ai: "The X2 is kept separate from the X1 road test so the plug-in litres do not spread to a car that was not tested.",
    costs: "No consumption figure is attached.",
    recalls: f39
      ? "Front belt retractor, campaign started 9 March 2022."
      : "No campaign opened in this pass names the U10.",
  });
}

function zReview(g) {
  return pack(g, {
    summary:
      g.code.startsWith("G29")
        ? "The G29 is the current Z4, from 2018, and it shares its platform with the Toyota Supra. A road test was not opened. The 2017 flex-disc campaign names the Z4 among other BMWs, which on dates is the previous Z4 as much as this one, so inclusion stays a VIN question."
        : `The ${g.code} is a Z3 or Z4 from the 2000s or the 2010s. A road test was not opened, so no engine fault is invented. The 2017 flex-disc campaign is the item that names the Z4.`,
    scope: "An M roadster is not the ordinary four-cylinder, and it does not inherit the E90 diesel chain.",
    ai: "The Z cars are in the catalog as their own generations. The only shared campaign the sources name is the flex disc.",
    costs: "No fuel figure is attached.",
    recalls: flexDisc,
  });
}

function mCarReview(g) {
  const code = g.code;
  let summary =
    `This is the M car on code ${code}. The volume diesel chain and the plug-in litres from the ordinary BMW of the same years are not this engine.`;
  let recalls = airbagSdi;
  let published = [];
  if (code === "E90/E92") {
    summary =
      "The E90 and E92 M3 use the V8 of that generation, not the 320d diesel. Moottori lists a possible bearing failure from a dirty oil pump, ADAC 2005, and a dual-clutch gearbox recall. The 320d chain is a different engine.";
    published = [
      src(
        "BMW 3-sarja -tyyppiviat",
        "Under the E90, the M3 is listed with a possible bearing failure from a dirty oil pump, ADAC 2005, and with a dual-clutch gearbox recall in the owner reports.",
        U3,
      ),
    ];
    recalls = "M3 oil-pump bearing item, ADAC 2005. Dual-clutch software, Traficom and ADAC 2008, is listed on the E90 recall block. " + airbagSdi;
  } else if (code === "F80") {
    summary =
      "The F80 is the M3 of the F30 era, 2014–2018. Moottori groups its inspection notes with the F30, and a front-belt campaign names the F80. The 320d chain is not this engine.";
    published = [
      src(
        "BMW 1-sarja -tyyppiviat",
        "A front-belt retractor campaign started 9 March 2022 names the F80 M3 together with the F21, the F48 and the G20.",
        U1,
      ),
    ];
  } else if (code === "G80" || code.startsWith("G82")) {
    summary =
      "The G80 M3 and the G82 M4 are the current M cars. A body-controller campaign started 15 February 2023 names them, and a left front belt campaign names the G80. They do not inherit the 320d's EGR notes.";
    published = [
      src(
        "BMW 3-sarja -tyyppiviat",
        "The February 2023 body-controller campaign names the M3 G80 and G81 and the M4 G82 and G83. A replaced controller that was not reset can leave the automatic door lock off. A separate left front belt campaign from 22 September 2022 names the G80.",
        U3,
      ),
    ];
  } else if (code === "E82 1M") {
    summary =
      "The 1M is the limited E82 coupe, 2011–2012, not an ordinary 118 or 120. The N47 diesel chain on the 1 Series page is not this engine. A road test was not opened.";
    recalls = "No diesel EGR campaign is applied to this petrol M car.";
  } else if (code === "F90" || code === "G90" || code === "F10" || code === "E60") {
    summary =
      "This is an M5, code " + code + ". It is not the 520d, and the 520d chain and the 520d fuel figures are not applied. A road test of this M5 was not opened in this pass.";
    recalls = code === "F90" || code === "E60" ? airbagSdi : "No campaign opened in this pass names this M5 specifically.";
  }
  return pack(g, {
    summary,
    scope: "Read the ordinary generation's page for the volume engines. This page is only the M car.",
    published,
    ai: "M engines have their own failure patterns in owner culture. Only the ones Moottori's pages name are written here.",
    costs: "No fuel figure is attached.",
    recalls,
  });
}

function xmReview(g) {
  return pack(g, {
    summary:
      "The XM, code G09, is the plug-in M SUV from 2022. The X5 xDrive50e's range and the older diesel EGR campaign are not this car. A road test was not opened in this pass.",
    scope: "Do not use the X5 50e test as an XM review.",
    ai: "No performance figure is invented.",
    costs: "No consumption figure is attached.",
    recalls: "No campaign opened in this pass names the XM.",
  });
}

function x7Review(g) {
  return pack(g, {
    summary:
      "The G07 is the X7, from 2019. It is not the X5, and the xDrive50e figures stay on the X5 page. The diesel EGR window ends in 2017, so that campaign is not applied. A road test was not opened.",
    scope: "A driver-airbag campaign names the X5 and the X6, not the X7, in the list used here.",
    ai: "The X7 is its own model. Sharing a platform with the X5 is not a reason to copy the plug-in test.",
    costs: "No consumption figure is attached.",
    recalls: "No campaign opened in this pass names the G07.",
  });
}

function route(g) {
  if (isOld(g)) return oldReview(g);
  if (g.code === "E36") return e36Review(g);
  if (g.code === "G20/G21") return g20Review(g);
  if (g.code === "G26" || g.code === "G26 M50") return i4Review(g);
  if (g.code === "G60" || g.code === "G60/G61") return g60Review(g);
  if (g.code === "U11" && g.modelId === "bmw-ix1") return ix1Review(g);
  if (g.code === "U11") return x1Review(g);
  if (g.code === "G05") return x5Review(g);
  const table = {
    "E81/E87": e87Review,
    "F20/F21": f20Review,
    F40: f40Review,
    "F22/F23": f22Review,
    G42: g42Review,
    F45: activeTourerReview,
    U06: activeTourerReview,
    E46: e46Review,
    "E90/E91/E92": e90Review,
    "F30/F31": f30Review,
    "F30/F31 LCI": f30PhevReview,
    F34: gtReview,
    "F32/F33/F36": fourSeriesReview,
    "G22/G23/G26": fourSeriesReview,
    E39: e39Review,
    "E60/E61": e60Review,
    "F10/F11": f10Review,
    "G30/G31": g30Review,
    F07: (x) =>
      pack(x, {
        summary:
          "The F07 is the 5 Series Gran Turismo, 2009–2017. It is not the G30 and not the G32. Moottori's F10 fault notes are the closest 5 Series of the same years, and the diesel EGR campaign names the 5 Series. A separate GT road test was not opened.",
        scope: "Do not use the later 520d facelift test, which is the G30.",
        ai: "The Gran Turismo is a different body from the F10 saloon. Only the campaign that names the 5 Series is shared.",
        costs: "No fuel figure is attached.",
        recalls: egrCampaign + " " + flexDisc,
      }),
    "E63/E64": sixSeriesReview,
    "F06/F12/F13": sixSeriesReview,
    G32: sixSeriesReview,
    E38: sevenSeriesReview,
    "E65/E66": sevenSeriesReview,
    "F01/F02": sevenSeriesReview,
    "G11/G12": sevenSeriesReview,
    G70: sevenSeriesReview,
    "G14/G15/G16": eightSeriesReview,
    I01: i3Review,
    "I01 s": i3Review,
    "I12/I15": i8Review,
    I20: ixReview,
    G08: ix3Review,
    E84: x1OldReview,
    F48: x1OldReview,
    F39: x2Review,
    U10: x2Review,
    E83: xFamilyReview,
    F25: xFamilyReview,
    G01: xFamilyReview,
    F26: xFamilyReview,
    G02: xFamilyReview,
    E53: xFamilyReview,
    E70: xFamilyReview,
    F15: xFamilyReview,
    E71: xFamilyReview,
    F16: xFamilyReview,
    G06: xFamilyReview,
    G07: x7Review,
    "E36/7": zReview,
    "E36/7 M": zReview,
    "E85/E86": zReview,
    "E85/E86 M": zReview,
    E89: zReview,
    G29: zReview,
    "E82 1M": mCarReview,
    "E90/E92": mCarReview,
    F80: mCarReview,
    G80: mCarReview,
    "F82/F83": mCarReview,
    "G82/G83": mCarReview,
    F87: mCarReview,
    G87: mCarReview,
    E60: mCarReview,
    F10: mCarReview,
    F90: mCarReview,
    G90: mCarReview,
    "F91/F92/F93": mCarReview,
    "E70 M": mCarReview,
    F85: mCarReview,
    F95: mCarReview,
    "E71 M": mCarReview,
    F86: mCarReview,
    F96: mCarReview,
    F97: mCarReview,
    "F97 LCI": mCarReview,
    F98: mCarReview,
    G09: xmReview,
  };
  const fn = table[g.code];
  if (!fn) throw new Error("No BMW review for " + g.code + " (" + g.id + ")");
  return fn(g);
}

const bmwReviews = gens.map((g) => route(g));

doc.reviews = [
  ...doc.reviews.filter((r) => !r.generationId.startsWith("bmw-")),
  ...bmwReviews,
];
doc.note =
  "Aion, then BMW. Only BMW generations that ended before 2000 stay a one-line note. From the E36 onward each chassis has a sourced note. Engine rows were not changed.";

fs.writeFileSync(reviewsPath, JSON.stringify(doc, null, 2) + "\n");
const kinds = { pre2000: 0, later: 0 };
for (const g of gens) {
  if (isOld(g)) kinds.pre2000++;
  else kinds.later++;
}
console.log(kinds, "total", gens.length);
