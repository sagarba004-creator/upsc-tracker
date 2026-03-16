import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';


// ── Tests Master Data ─────────────────────────────────────────
const TESTS_MASTER = {
  "gs_prelims": [
    {
      "code": "PT-2101",
      "name": "Polity Sectional Test",
      "marks": 100.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2102",
      "name": "Polity Sectional Test",
      "marks": 100.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2103",
      "name": "Geography Sectional Test",
      "marks": 100.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2104",
      "name": "Geography Sectional Test",
      "marks": 100.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2105",
      "name": "Polity Full length Test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2106",
      "name": "Geography Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2107",
      "name": "Economy Sectional test",
      "marks": 100.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2109",
      "name": "Economy Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2110",
      "name": "Environment Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "CAPT-2112",
      "name": "June CA Test",
      "marks": 100.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2113",
      "name": "Ancient History Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2115",
      "name": "Medieval History Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2116",
      "name": "Art and Culture Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2118",
      "name": "Modern History Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2119",
      "name": "History Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "CAPT-2121",
      "name": "Polity + Geo Revision test + July CA",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2122",
      "name": "Anc & Med + Art & Culture + Economy Revision test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2124",
      "name": "Environment + History Revision test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2125",
      "name": "Polity + Geography + Economy Revision test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "CAPT-2127",
      "name": "August 2025+Sept 2025 CA",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2128",
      "name": "Prelims Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "CAPT-2130",
      "name": "Oct 2025+ Nov 2025 CA",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2131",
      "name": "Prelims Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "CAPT-2132",
      "name": "Dec 2025+ Jan 2025 CA test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2133",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2135",
      "name": "Prelims GS  Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2136",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2138",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2140",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2141",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2143",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2144",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2146",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2147",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2148",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2149",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2150",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2151",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "PT-2152",
      "name": "Prelims GS Full length test with CA till date",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "<35/100",
      "name": "0.33",
      "marks": "Need to Work",
      "type": "LEEP"
    },
    {
      "code": "<50/100",
      "name": "0.5",
      "marks": "Average",
      "type": "LEEP"
    },
    {
      "code": ">50/100",
      "name": "0.75",
      "marks": "Good",
      "type": "LEEP"
    },
    {
      "code": ">60/100",
      "name": "1.0",
      "marks": "Excellent",
      "type": "LEEP"
    },
    {
      "code": "ES GSPT-01",
      "name": "Indian Economy till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-02",
      "name": "Ancient India till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-03",
      "name": "Indian Economy till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-04",
      "name": "Ancient India till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-05",
      "name": "Entire Week Targets including May CA (No CSAT)",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-06",
      "name": "Ancient India till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-07",
      "name": "Indian Economy till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-08",
      "name": "Indian Economy till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-09",
      "name": "Medieval India till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-10",
      "name": "Entire Week Targets including June CA (No CSAT)",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-11",
      "name": "Medieval India till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-12",
      "name": "Medieval India till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-13",
      "name": "Indian Polity till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-14",
      "name": "Art and Culture till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-15",
      "name": "Entire Week Targets including July CA",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-17",
      "name": "Indian Polity till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-18",
      "name": "Art and Culture till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-19",
      "name": "Indian Polity till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-20",
      "name": "Art and Culture till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-21",
      "name": "Indian Polity till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-22",
      "name": "Entire Week Targets including August CA",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-24",
      "name": "Indian Polity till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-25",
      "name": "Art and Culture till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-26",
      "name": "Indian Polity till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-27",
      "name": "Art and Culture till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-28",
      "name": "Entire Week Targets including September CA",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-30",
      "name": "Indian Polity till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-31",
      "name": "Modern India Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-32",
      "name": "Geography Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-33",
      "name": "Modern India Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-34",
      "name": "Geography Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-35",
      "name": "Entire Week Targets including October CA",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-37",
      "name": "Modern India Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-38",
      "name": "Geography Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-39",
      "name": "Modern India Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-40",
      "name": "Geography Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-41",
      "name": "Entire Week Targets including November CA",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-43",
      "name": "Geography Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-44",
      "name": "Environment Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-45",
      "name": "Geography Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-46",
      "name": "Environment Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-47",
      "name": "Entire Week Targets including December CA",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-49",
      "name": "Geography Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-50",
      "name": "Environment Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-51",
      "name": "Environment Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-52",
      "name": "Indian Economy till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-53",
      "name": "Entire Week Targets including January CA",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-55",
      "name": "Indian Economy Survey and Budget",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-56",
      "name": "CSAT till completed targets so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-57",
      "name": "Entire Week Targets including February CA",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-59",
      "name": "Complete Ancient History",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-60",
      "name": "Complete Medieval History",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-61",
      "name": "Entire Week Targets including CA (May 24 + June 24)",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-63",
      "name": "Complete Indian Polity",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-64",
      "name": "Complete Indian Polity",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-65",
      "name": "Geography Previous Day Targets",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-66",
      "name": "Science and Technology Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-67",
      "name": "Geography Previous Day Targets",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-68",
      "name": "Entire Week Targets including CA (July 24 + August 24)",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-69",
      "name": "Geography Previous Day Targets",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-70",
      "name": "Complete Geography",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-71",
      "name": "Indian Economy Previous Day Targets",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-72",
      "name": "Indian Economy Previous Day Targets",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-73",
      "name": "Entire Week Targets including CA (September 24 + October 24)",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-75",
      "name": "Art & Culture Previous Day Targets",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-76",
      "name": "Complete Art & Culture",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-77",
      "name": "Environment Previous Day Targets",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-78",
      "name": "Environment Previous Day Targets",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-79",
      "name": "GS FLT including CA (November 24 + December 24)",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-81",
      "name": "Complete Environment",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-82",
      "name": "Modern History Previous Day Targets",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-83",
      "name": "Complete Modern India",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-84",
      "name": "GS FLT including CA (January 25 + February 2025)",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-87",
      "name": "GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-88",
      "name": "GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-90",
      "name": "GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-92",
      "name": "GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-93",
      "name": "GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-95",
      "name": "GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-96",
      "name": "GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-97",
      "name": "GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-98",
      "name": "GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-100",
      "name": "GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-101",
      "name": "GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-103",
      "name": "GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-105",
      "name": "Bonus GS FLT",
      "marks": 200.0,
      "type": "EDGE"
    }
  ],
  "csat_prelims": [
    {
      "code": "CSPT-2108",
      "name": "CSAT topics of the week based test",
      "marks": 100.0,
      "type": "LEEP"
    },
    {
      "code": "CSPT-2111",
      "name": "CSAT topics of the week based test",
      "marks": 100.0,
      "type": "LEEP"
    },
    {
      "code": "CSPT-2114",
      "name": "CSAT topics of the week based test",
      "marks": 100.0,
      "type": "LEEP"
    },
    {
      "code": "CSPT-2117",
      "name": "CSAT topics of the week based test",
      "marks": 100.0,
      "type": "LEEP"
    },
    {
      "code": "CSPT-2120",
      "name": "CSAT topics of the week based test",
      "marks": 100.0,
      "type": "LEEP"
    },
    {
      "code": "CSPT-2123",
      "name": "CSAT topics of the week based test",
      "marks": 100.0,
      "type": "LEEP"
    },
    {
      "code": "CSPT-2126",
      "name": "CSAT Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "CSPT-2129",
      "name": "CSAT Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "CSPT-2134",
      "name": "CSAT Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "CSPT- 2137",
      "name": "CSAT Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "CSPT- 2139",
      "name": "CSAT Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "CSPT-2142",
      "name": "CSAT Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "CSPT-2145",
      "name": "CSAT Full length test",
      "marks": 200.0,
      "type": "LEEP"
    },
    {
      "code": "ES CSPT-16",
      "name": "CSAT Targets Completed So Far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-23",
      "name": "CSAT Targets Completed So Far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-29",
      "name": "CSAT Targets Completed So Far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-36",
      "name": "CSAT Targets Completed So Far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-42",
      "name": "CSAT Targets Completed So Far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES GSPT-43",
      "name": "Geography Targets completed so far",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-48",
      "name": "CSAT Targets Completed So Far",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-54",
      "name": "CSAT Targets Completed So Far",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-62",
      "name": "CSAT Targets Completed So Far",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-74",
      "name": "CSAT Targets completed so far",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-80",
      "name": "CSAT - Targets of Previous Day",
      "marks": 100.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-85",
      "name": "CSAT FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-86",
      "name": "CSAT FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-89",
      "name": "CSAT FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-91",
      "name": "CSAT FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-94",
      "name": "CSAT FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-99",
      "name": "CSAT FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-102",
      "name": "CSAT FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-104",
      "name": "CSAT FLT",
      "marks": 200.0,
      "type": "EDGE"
    },
    {
      "code": "ES CSPT-106",
      "name": "Bonus CSAT FLT",
      "marks": 200.0,
      "type": "EDGE"
    }
  ],
  "mains": [
    {
      "code": "MT2101",
      "name": "Polity Sectional Test",
      "questions": 10.0,
      "type": "LEEP"
    },
    {
      "code": "MT2102",
      "name": "Polity Sectional Test",
      "questions": 10.0,
      "type": "LEEP"
    },
    {
      "code": "MT2103",
      "name": "Geography sectional test",
      "questions": 10.0,
      "type": "LEEP"
    },
    {
      "code": "MT2104",
      "name": "Geography test",
      "questions": 10.0,
      "type": "LEEP"
    },
    {
      "code": "MT2105",
      "name": "Economy test",
      "questions": 10.0,
      "type": "LEEP"
    },
    {
      "code": "MT2106",
      "name": "Post- Independent India test",
      "questions": 10.0,
      "type": "LEEP"
    },
    {
      "code": "MT2107",
      "name": "Environment test",
      "questions": 10.0,
      "type": "LEEP"
    },
    {
      "code": "MT2108",
      "name": "Art & Culture + Modern History",
      "questions": 10.0,
      "type": "LEEP"
    },
    {
      "code": "MT2109",
      "name": "Environment+ History+ Society",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT2110",
      "name": "World History + Polity + Governance",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT2111",
      "name": "GS II",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT2112",
      "name": "GS III",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT2113",
      "name": "GS IV",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2114",
      "name": "Indian Constitution-I",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2115",
      "name": "Complete Geography",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2116",
      "name": "Essay I",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2117",
      "name": "Complete History, Society",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2118",
      "name": "Governance, Social Justice, International Relations",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2119",
      "name": "Essay 2",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2120",
      "name": "Economy, Agriculture, Infrastructure, Investment",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2121",
      "name": "Science and Technology, Internal Security, Disaster Management",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2122",
      "name": "Ethics, Intergrity & Aptitude- Part A",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2123",
      "name": "Essay 3",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2124",
      "name": "Ethics, Intergrity & Aptitude- Part B",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2125",
      "name": "Essay 4",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2126",
      "name": "GS 1 Complete",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2127",
      "name": "GS 2 Complete",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2128",
      "name": "Essay 5",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2129",
      "name": "GS 3 Complete",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2130",
      "name": "GS 4 Complete",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2131",
      "name": "Essay 6",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2132",
      "name": "GS 1",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2133",
      "name": "GS 2",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2134",
      "name": "GS 3",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "MT-2135",
      "name": "GS 4",
      "questions": 20.0,
      "type": "LEEP"
    },
    {
      "code": "ESMT 01",
      "name": "Art & Culture",
      "questions": 10.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 02",
      "name": "Modern History",
      "questions": 10.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 03",
      "name": "Art & Culture + History( Modern, Post Independence + World)",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 04",
      "name": "Society",
      "questions": 10.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 05",
      "name": "Geography",
      "questions": 10.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 06",
      "name": "Society + Geography",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 07",
      "name": "Mentioned Syllabus",
      "questions": 10.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 08",
      "name": "Polity + Governance",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 09",
      "name": "GS 1",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 10",
      "name": "Mentioned Syllabus",
      "questions": 10.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 11",
      "name": "Social Justice + Internaional Relations",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 12",
      "name": "GS 1",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 13",
      "name": "Mentioned Syllabus",
      "questions": 10.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 14",
      "name": "Indian Economy",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 15",
      "name": "GS 2",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 16",
      "name": "Mentioned Syllabus",
      "questions": 10.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 17",
      "name": "Science & Tech + Environment",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 18",
      "name": "Essay",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 19",
      "name": "Mentioned Syllabus",
      "questions": 10.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 20",
      "name": "GS 2",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 21",
      "name": "GS 3 (ISC & DM)",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 22",
      "name": "Mentioned Syllabus",
      "questions": 10.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 23",
      "name": "GS 4 Part A",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 24",
      "name": "GS 4 Part B",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 25",
      "name": "GS 1",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 26",
      "name": "Essay",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 27",
      "name": "GS 2",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 28",
      "name": "GS 3",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 29",
      "name": "GS 4",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 30",
      "name": "Essay",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 31",
      "name": "GS 1",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 32",
      "name": "Essay",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 33",
      "name": "GS 2",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 34",
      "name": "GS 3",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 35",
      "name": "Essay",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 36",
      "name": "GS 1",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 37",
      "name": "GS 2",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 38",
      "name": "GS 3",
      "questions": 20.0,
      "type": "EDGE"
    },
    {
      "code": "ESMT 39",
      "name": "GS 4",
      "questions": 20.0,
      "type": "EDGE"
    }
  ],
  "cmt_gs": [
    {
      "code": "CMT-Indus Valley Civiliz",
      "name": "Indus Valley Civilization",
      "subject": "1. Ancient History",
      "type": "CMT"
    },
    {
      "code": "CMT-Vedic Age",
      "name": "Vedic Age",
      "subject": "1. Ancient History",
      "type": "CMT"
    },
    {
      "code": "CMT-Buddhism and Jainism",
      "name": "Buddhism and Jainism",
      "subject": "1. Ancient History",
      "type": "CMT"
    },
    {
      "code": "CMT-Mauryas",
      "name": "Mauryas",
      "subject": "1. Ancient History",
      "type": "CMT"
    },
    {
      "code": "CMT-Sangam Literature",
      "name": "Sangam Literature",
      "subject": "1. Ancient History",
      "type": "CMT"
    },
    {
      "code": "CMT-Gupta Literature",
      "name": "Gupta Literature",
      "subject": "1. Ancient History",
      "type": "CMT"
    },
    {
      "code": "CMT-Early medieval Regio",
      "name": "Early medieval Regional configuration (600-1200 CE)",
      "subject": "2. Medieval History",
      "type": "CMT"
    },
    {
      "code": "CMT-Delhi Sultanate admi",
      "name": "Delhi Sultanate administration and keywords with society",
      "subject": "2. Medieval History",
      "type": "CMT"
    },
    {
      "code": "CMT-Vijayanagar culture ",
      "name": "Vijayanagar culture and rulers",
      "subject": "2. Medieval History",
      "type": "CMT"
    },
    {
      "code": "CMT-Bahamani culture onl",
      "name": "Bahamani culture only",
      "subject": "2. Medieval History",
      "type": "CMT"
    },
    {
      "code": "CMT-Mughals policies and",
      "name": "Mughals policies and culture",
      "subject": "2. Medieval History",
      "type": "CMT"
    },
    {
      "code": "CMT-Bhakti and Sufi",
      "name": "Bhakti and Sufi",
      "subject": "2. Medieval History",
      "type": "CMT"
    },
    {
      "code": "CMT-Indian Architecture",
      "name": "Indian Architecture",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Sculpture",
      "name": "Sculpture",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Coins in Ancient and",
      "name": "Coins in Ancient and Med India",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Paintings",
      "name": "Paintings",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Dance forms",
      "name": "Dance forms",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Music",
      "name": "Music",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Religion and Philoso",
      "name": "Religion and Philosophy",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Literature",
      "name": "Literature",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Language",
      "name": "Language",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Theatre and Puppetry",
      "name": "Theatre and Puppetry",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Circus and Martial A",
      "name": "Circus and Martial Arts",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Handicrafts",
      "name": "Handicrafts",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Cinema",
      "name": "Cinema",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Fairs and Festivals",
      "name": "Fairs and Festivals",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Science and technolo",
      "name": "Science and technology",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Awards and Instituti",
      "name": "Awards and Institutions",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Law and Culture",
      "name": "Law and Culture",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-UNESCO list",
      "name": "UNESCO list",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-India through the ey",
      "name": "India through the eyes of Travellers",
      "subject": "3. Art & Culture",
      "type": "CMT"
    },
    {
      "code": "CMT-Advent of Europeans",
      "name": "Advent of Europeans",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Expansion and Consol",
      "name": "Expansion and Consolidation of British Rule in India",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Resentments against ",
      "name": "Resentments against British Rule",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Revolt of 1857",
      "name": "Revolt of 1857",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Socio-Religious Refo",
      "name": "Socio-Religious Reforms",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Revenue Policies of ",
      "name": "Revenue Policies of British Rule",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-INC : foundation and",
      "name": "INC : foundation and moderate phase",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Partition of Bengal ",
      "name": "Partition of Bengal and Extremist phase",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Revolutionary Nation",
      "name": "Revolutionary Nationalism PHASE 1 (1907-1917)",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-First World War and ",
      "name": "First World War and Nationalist response",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Emergence of Gandhi",
      "name": "Emergence of Gandhi",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Non Cooperation and ",
      "name": "Non Cooperation and Khilafat Movement",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Emergence of new for",
      "name": "Emergence of new forces (Swarajists, Socialist, Revolutionary etc)",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Simon Commission and",
      "name": "Simon Commission and Nehru report",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Civil Disobedience a",
      "name": "Civil Disobedience and RTC",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-GOI Act 1935 and Con",
      "name": "GOI Act 1935 and Congress rule in provinces",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-WW 2, Quit India, IN",
      "name": "WW 2, Quit India, INA",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Post War",
      "name": "Post War",
      "subject": "4. Modern History",
      "type": "CMT"
    },
    {
      "code": "CMT-Interior of Earth",
      "name": "Interior of Earth",
      "subject": "5. Geography",
      "type": "CMT"
    },
    {
      "code": "CMT-Geomorphic processes",
      "name": "Geomorphic processes",
      "subject": "5. Geography",
      "type": "CMT"
    },
    {
      "code": "CMT-Atmosphere , Heat ba",
      "name": "Atmosphere , Heat balance, circulation",
      "subject": "5. Geography",
      "type": "CMT"
    },
    {
      "code": "CMT-World climate",
      "name": "World climate",
      "subject": "5. Geography",
      "type": "CMT"
    },
    {
      "code": "CMT-Oceanography",
      "name": "Oceanography",
      "subject": "5. Geography",
      "type": "CMT"
    },
    {
      "code": "CMT-Location, Physiograp",
      "name": "Location, Physiography",
      "subject": "5. Geography",
      "type": "CMT"
    },
    {
      "code": "CMT-Drainage",
      "name": "Drainage",
      "subject": "5. Geography",
      "type": "CMT"
    },
    {
      "code": "CMT-Climate",
      "name": "Climate",
      "subject": "5. Geography",
      "type": "CMT"
    },
    {
      "code": "CMT-Soil",
      "name": "Soil",
      "subject": "5. Geography",
      "type": "CMT"
    },
    {
      "code": "CMT-Minerals: Critical ,",
      "name": "Minerals: Critical , Rare earth, Distribution in India",
      "subject": "5. Geography",
      "type": "CMT"
    },
    {
      "code": "CMT-Historical Backgroun",
      "name": "Historical Background",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Making of Indian Con",
      "name": "Making of Indian Constitution",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Salient Features",
      "name": "Salient Features",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Preamble",
      "name": "Preamble",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Union and its territ",
      "name": "Union and its territories",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Citizenship",
      "name": "Citizenship",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Fundamental Rights",
      "name": "Fundamental Rights",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Amendment",
      "name": "Amendment",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Basic Structure",
      "name": "Basic Structure",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Parliamentary system",
      "name": "Parliamentary system",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Federal system",
      "name": "Federal system",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Centre-State relatio",
      "name": "Centre-State relations",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Inter-State relation",
      "name": "Inter-State relations",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Emergency",
      "name": "Emergency",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-President",
      "name": "President",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Vice-President",
      "name": "Vice-President",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Prime Minister",
      "name": "Prime Minister",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Council of Ministers",
      "name": "Council of Ministers and Cabinet Committees",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Parliament and its c",
      "name": "Parliament and its committees",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Judiciary",
      "name": "Judiciary",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Governor and State G",
      "name": "Governor and State Gov",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Local Gov- Panchayat",
      "name": "Local Gov- Panchayat , Municipalities",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Constitutional bodie",
      "name": "Constitutional bodies",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Non constitutional b",
      "name": "Non constitutional bodies",
      "subject": "6. Indian Polity",
      "type": "CMT"
    },
    {
      "code": "CMT-Basics and Features ",
      "name": "Basics and Features of Indian Economy",
      "subject": "7. Indian Economy",
      "type": "CMT"
    },
    {
      "code": "CMT-National Income Acco",
      "name": "National Income Accounting",
      "subject": "7. Indian Economy",
      "type": "CMT"
    },
    {
      "code": "CMT-Money and Banking in",
      "name": "Money and Banking in India",
      "subject": "7. Indian Economy",
      "type": "CMT"
    },
    {
      "code": "CMT-Financial Market in ",
      "name": "Financial Market in India",
      "subject": "7. Indian Economy",
      "type": "CMT"
    },
    {
      "code": "CMT-Budget / Public Fina",
      "name": "Budget / Public Finance in India",
      "subject": "7. Indian Economy",
      "type": "CMT"
    },
    {
      "code": "CMT-Inflation",
      "name": "Inflation",
      "subject": "7. Indian Economy",
      "type": "CMT"
    },
    {
      "code": "CMT-Agriculture and alli",
      "name": "Agriculture and allied activities",
      "subject": "7. Indian Economy",
      "type": "CMT"
    },
    {
      "code": "CMT-External Sector and ",
      "name": "External Sector and International Trade",
      "subject": "7. Indian Economy",
      "type": "CMT"
    },
    {
      "code": "CMT-Ecology basics",
      "name": "Ecology basics",
      "subject": "8. Environment",
      "type": "CMT"
    },
    {
      "code": "CMT-Pollution",
      "name": "Pollution",
      "subject": "8. Environment",
      "type": "CMT"
    },
    {
      "code": "CMT-Energy",
      "name": "Energy",
      "subject": "8. Environment",
      "type": "CMT"
    },
    {
      "code": "CMT-Climate change and I",
      "name": "Climate change and International Institutions/conventions, Laws",
      "subject": "8. Environment",
      "type": "CMT"
    },
    {
      "code": "CMT-Wildlife ,Biodiversi",
      "name": "Wildlife ,Biodiversity, protected areas, species, National Laws",
      "subject": "8. Environment",
      "type": "CMT"
    },
    {
      "code": "CMT-General Science",
      "name": "General Science",
      "subject": "9. Science & Tech",
      "type": "CMT"
    },
    {
      "code": "CMT-Biotechnology",
      "name": "Biotechnology",
      "subject": "9. Science & Tech",
      "type": "CMT"
    },
    {
      "code": "CMT-Health and diseases",
      "name": "Health and diseases",
      "subject": "9. Science & Tech",
      "type": "CMT"
    },
    {
      "code": "CMT-ICT",
      "name": "ICT",
      "subject": "9. Science & Tech",
      "type": "CMT"
    },
    {
      "code": "CMT-Space technology",
      "name": "Space technology",
      "subject": "9. Science & Tech",
      "type": "CMT"
    },
    {
      "code": "CMT-Defence technology",
      "name": "Defence technology",
      "subject": "9. Science & Tech",
      "type": "CMT"
    },
    {
      "code": "CMT-Energy (New and rene",
      "name": "Energy (New and renewables)",
      "subject": "9. Science & Tech",
      "type": "CMT"
    },
    {
      "code": "CMT-Misc eg, nobel prize",
      "name": "Misc eg, nobel prizes",
      "subject": "9. Science & Tech",
      "type": "CMT"
    }
  ],
  "cmt_csat": [
    {
      "code": "CMT-Percentage",
      "name": "Percentage",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Ratio and Proportion",
      "name": "Ratio and Proportion",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Profit and Loss",
      "name": "Profit and Loss",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Compound Interest",
      "name": "Compound Interest",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Data Interpretation",
      "name": "Data Interpretation",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Age and Partnership",
      "name": "Age and Partnership",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Time and Work",
      "name": "Time and Work",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Time, Speed, and Dis",
      "name": "Time, Speed, and Distance",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Pipes and Cistern",
      "name": "Pipes and Cistern",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Boats and Stream",
      "name": "Boats and Stream",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Probability",
      "name": "Probability",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Mixtures and Allegat",
      "name": "Mixtures and Allegations",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Number System",
      "name": "Number System",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Average",
      "name": "Average",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Mensuration",
      "name": "Mensuration",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-HCF and LCM",
      "name": "HCF and LCM",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Alphanumeric Series",
      "name": "Alphanumeric Series",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Coding and Decoding",
      "name": "Coding and Decoding",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Continuous Letter Se",
      "name": "Continuous Letter Series",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Analogy",
      "name": "Analogy",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Direction Sense",
      "name": "Direction Sense",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Blood Relation",
      "name": "Blood Relation",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Ranking and Order",
      "name": "Ranking and Order",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Syllogism",
      "name": "Syllogism",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Sitting Arrangement ",
      "name": "Sitting Arrangement Puzzles",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Clock",
      "name": "Clock",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Calendar",
      "name": "Calendar",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Dice",
      "name": "Dice",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Counting Figures",
      "name": "Counting Figures",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Images",
      "name": "Images",
      "subject": "10. CSAT",
      "type": "CMT"
    },
    {
      "code": "CMT-Analytical Reasoning",
      "name": "Analytical Reasoning",
      "subject": "10. CSAT",
      "type": "CMT"
    }
  ],
  "awp": [
    {
      "code": "AWP-Art and Culture",
      "name": "Art and Culture",
      "type": "AWP"
    },
    {
      "code": "AWP-Modern History",
      "name": "Modern History",
      "type": "AWP"
    },
    {
      "code": "AWP-Post-Independence",
      "name": "Post-Independence",
      "type": "AWP"
    },
    {
      "code": "AWP-World History",
      "name": "World History",
      "type": "AWP"
    },
    {
      "code": "AWP-Geography",
      "name": "Geography",
      "type": "AWP"
    },
    {
      "code": "AWP-Society",
      "name": "Society",
      "type": "AWP"
    },
    {
      "code": "AWP-Polity",
      "name": "Polity",
      "type": "AWP"
    },
    {
      "code": "AWP-Governance",
      "name": "Governance",
      "type": "AWP"
    },
    {
      "code": "AWP-International Relati",
      "name": "International Relations",
      "type": "AWP"
    },
    {
      "code": "AWP-Economy",
      "name": "Economy",
      "type": "AWP"
    },
    {
      "code": "AWP-Social Justice",
      "name": "Social Justice",
      "type": "AWP"
    },
    {
      "code": "AWP-Environment",
      "name": "Environment",
      "type": "AWP"
    },
    {
      "code": "AWP-Internal Security",
      "name": "Internal Security",
      "type": "AWP"
    },
    {
      "code": "AWP-Disaster Management",
      "name": "Disaster Management",
      "type": "AWP"
    },
    {
      "code": "AWP-Science and Tech",
      "name": "Science and Tech",
      "type": "AWP"
    },
    {
      "code": "AWP-Ethics",
      "name": "Ethics",
      "type": "AWP"
    },
    {
      "code": "AWP-Ethics Case studies",
      "name": "Ethics Case studies",
      "type": "AWP"
    },
    {
      "code": "AWP-Essay",
      "name": "Essay",
      "type": "AWP"
    }
  ]
};

const GS_COLORS = {
  'GS Paper 1': { bg: '#E8F5E9', text: '#2E7D32', bar: '#2E7D32' },
  'GS Paper 2': { bg: '#E3F0FF', text: '#1565C0', bar: '#1565C0' },
  'GS Paper 3': { bg: '#FFF3E0', text: '#E65100', bar: '#E65100' },
  'GS Paper 4': { bg: '#F3E5FF', text: '#6A1B9A', bar: '#6A1B9A' },
};

const TASKS = [
  { key: 'reading',     label: 'Reading' },
  { key: 'short_notes', label: 'Notes' },
  { key: 'pyq_prelims', label: 'PYQ Pre' },
  { key: 'pyq_mains',   label: 'PYQ Mains' },
  { key: 'revision1',   label: 'Rev 1' },
  { key: 'revision2',   label: 'Rev 2' },
  { key: 'revision3',   label: 'Rev 3' },
];

export default function StudentApp({ user, onLogout }) {
  const [tab, setTab]           = useState('home');
  const [dashboard, setDashboard] = useState(null);
  const [consistency, setConsistency] = useState(null);
  const [loading, setLoading]   = useState(true);

  const loadDashboard = useCallback(async (silent=false) => {
    try {
      if (!silent) setLoading(true);
      const [dash, cons] = await Promise.all([
        api('getStudentDashboard', { phone: user.phone }),
        api('getConsistency', { phone: user.phone }),
      ]);
      setDashboard(dash);
      setConsistency(cons);
    } catch (e) { console.error(e); }
    finally { if (!silent) setLoading(false); }
  }, [user.phone]);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  return (
    <div className="app-shell">
      <div className="topbar">
        <div>
          <div className="topbar h1" style={{ fontSize: 17, fontWeight: 700 }}>🎯 UPSC Tracker</div>
          <div className="sub">{user.name} · {user.batch || 'No batch'}</div>
        </div>
        <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: 8, padding: '6px 12px', fontSize: 13, cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div className="page">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
            <div className="spinner spinner-dark" style={{ width: 36, height: 36 }} />
          </div>
        ) : (
          <>
            {tab === 'home'    && <HomeTab    dashboard={dashboard} consistency={consistency} user={user} />}
            {tab === 'subjects'&& <SubjectsTab dashboard={dashboard} user={user} onUpdate={loadDashboard} />}
            {tab === 'daily'   && <DailyTab   dashboard={dashboard} user={user} onUpdate={loadDashboard} consistency={consistency} />}
            {tab === 'tests'   && <TestsTab   user={user} />}
          </>
        )}
      </div>

      <nav className="bottom-nav">
        {[
          { key: 'home',     icon: '🏠', label: 'Home' },
          { key: 'subjects', icon: '📚', label: 'Subjects' },
          { key: 'daily',    icon: '📅', label: 'Daily' },
          { key: 'tests',    icon: '📝', label: 'Tests' },
        ].map(t => (
          <button key={t.key} className={tab === t.key ? 'active' : ''} onClick={() => setTab(t.key)}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

// ── Home Tab ──────────────────────────────────────────────────
function HomeTab({ dashboard, consistency, user }) {
  if (!dashboard) return null;
  const overall = dashboard.gs_summary.reduce((s, g) => s + g.pct, 0) / (dashboard.gs_summary.length || 1);

  return (
    <>
      {/* Overall */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #1B3A6B, #0D2040)', color: '#fff' }}>
        <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 6 }}>Overall Progress</div>
        <div style={{ fontSize: 42, fontWeight: 800, lineHeight: 1 }}>{Math.round(overall)}%</div>
        <div style={{ marginTop: 12 }}>
          <div className="progress-bar-wrap" style={{ background: 'rgba(255,255,255,0.2)', height: 10 }}>
            <div className="progress-bar-fill" style={{ width: `${overall}%`, background: '#F5A623' }} />
          </div>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.65 }}>
          Target Year: {user.target_year || '—'} · Optional: {user.optional || '—'}
        </div>
      </div>

      {/* GS Papers */}
      <div className="card">
        <div className="card-title">GS Papers</div>
        {dashboard.gs_summary.map(g => {
          const col = GS_COLORS[g.gs_paper] || { bg: '#F5F5F5', text: '#333', bar: '#333' };
          return (
            <div key={g.gs_paper} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: col.text }}>{g.gs_paper}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: col.text }}>{g.pct}%</span>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${g.pct}%`, background: col.bar }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Consistency snapshot */}
      {consistency && (
        <div className="card">
          <div className="card-title">Consistency</div>
          <div className="stat-grid">
            <div className="stat-box">
              <div className="val">{consistency.weekly.consistency_pct}%</div>
              <div className="lbl">This Week</div>
            </div>
            <div className="stat-box">
              <div className="val">{consistency.monthly.consistency_pct}%</div>
              <div className="lbl">This Month</div>
            </div>
            <div className="stat-box">
              <div className="val">{consistency.overall.consistency_pct}%</div>
              <div className="lbl">Overall</div>
            </div>
            <div className="stat-box">
              <div className="val">{consistency.overall.avg_score}</div>
              <div className="lbl">Avg Score</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Subjects Tab ──────────────────────────────────────────────
function SubjectsTab({ dashboard, user, onUpdate }) {
  const [localData, setLocalData] = useState(null);
  const [saving, setSaving]       = useState('');
  const [view, setView]           = useState(null); // null | { paper } | { paper, subject }
  const [openChapter, setOpenChapter] = useState(null);

  React.useEffect(() => {
    if (dashboard) setLocalData(JSON.parse(JSON.stringify(dashboard)));
  }, [dashboard]);

  const data = localData || dashboard;
  if (!data) return null;

  // Paper color palette
  const PAPER_COL = {
    'GS Paper 1': { top:'#2E7D32', bg:'#E8F5E9', text:'#2E7D32', pill:'#43A047', light:'#F1FBF2' },
    'GS Paper 2': { top:'#1565C0', bg:'#E3F0FF', text:'#1565C0', pill:'#1976D2', light:'#EEF6FF' },
    'GS Paper 3': { top:'#E65100', bg:'#FFF3E0', text:'#E65100', pill:'#F57C00', light:'#FFF8F0' },
    'GS Paper 4': { top:'#6A1B9A', bg:'#F3E5FF', text:'#6A1B9A', pill:'#7B1FA2', light:'#FAF0FF' },
    'Essay':      { top:'#00838F', bg:'#E0F7FA', text:'#00838F', pill:'#00ACC1', light:'#F0FDFF' },
    'CSAT':       { top:'#C62828', bg:'#FFEBEE', text:'#C62828', pill:'#E53935', light:'#FFF5F5' },
  };

  // Subject pill colors — cycle through vibrant palette
  const SUBJ_COLORS = [
    { bg:'#E3F2FD', text:'#1565C0', dot:'#1976D2' },
    { bg:'#E8F5E9', text:'#2E7D32', dot:'#388E3C' },
    { bg:'#FFF3E0', text:'#E65100', dot:'#F57C00' },
    { bg:'#F3E5F5', text:'#6A1B9A', dot:'#7B1FA2' },
    { bg:'#FCE4EC', text:'#AD1457', dot:'#C2185B' },
    { bg:'#E0F2F1', text:'#00695C', dot:'#00796B' },
    { bg:'#FFF9C4', text:'#F57F17', dot:'#F9A825' },
    { bg:'#EDE7F6', text:'#4527A0', dot:'#512DA8' },
  ];

  const TASKS = [
    { key:'reading',     label:'Reading',   emoji:'📖' },
    { key:'short_notes', label:'Notes',     emoji:'📝' },
    { key:'pyq_prelims', label:'PYQ Pre',   emoji:'📋' },
    { key:'pyq_mains',   label:'PYQ Mains', emoji:'📌' },
    { key:'revision1',   label:'Rev 1',     emoji:'🔁' },
    { key:'revision2',   label:'Rev 2',     emoji:'🔂' },
    { key:'revision3',   label:'Rev 3',     emoji:'✅' },
  ];

  async function toggleTask(subject, chapter, field, current) {
    const newVal = current === 'Done' ? 'Not Done' : 'Done';
    const key = `${subject}||${chapter}||${field}`;
    setSaving(key);
    setLocalData(prev => {
      if (!prev) return prev;
      const updated = JSON.parse(JSON.stringify(prev));
      const subj = updated.subjects.find(s => s.subject === subject);
      if (!subj) return prev;
      const ch = subj.chapters.find(c => c.chapter === chapter);
      if (!ch) return prev;
      ch[field] = newVal;
      const fixedW = { reading:0.20, short_notes:0.20, pyq_prelims:0.15,
        pyq_mains:0.15, revision1:0.10, revision2:0.10, revision3:0.10 };
      ch.score = Object.entries(fixedW).reduce((s,[k,w]) => s+(ch[k]==='Done'?w:0), 0);
      const totalWt = subj.chapters.reduce((s,c) => s+c.weightage, 0);
      const earned  = subj.chapters.reduce((s,c) => s+c.weightage*c.score, 0);
      subj.completion_pct = totalWt>0 ? Math.round((earned/totalWt)*100) : 0;
      return updated;
    });
    try {
      await api('updateProgress', { phone: user.phone, subject, chapter, field, value: newVal });
      onUpdate(true).catch(()=>{});
    } catch {
      setLocalData(null);
      alert('Failed to save. Please try again.');
    } finally { setSaving(''); }
  }

  // Group by gs_paper
  const grouped = {};
  data.subjects.forEach(s => {
    if (!grouped[s.gs_paper]) grouped[s.gs_paper] = [];
    grouped[s.gs_paper].push(s);
  });

  const paperOrder = ['GS Paper 1','GS Paper 2','GS Paper 3','GS Paper 4','Essay','CSAT'];

  // ── Subject view: chapter pills + inline tasks ──
  if (view?.subject) {
    const col  = PAPER_COL[view.paper] || PAPER_COL['GS Paper 1'];
    const subj = data.subjects.find(s => s.subject === view.subject);
    if (!subj) return null;

    return (
      <div>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16,
          background:col.bg, borderRadius:12, padding:'12px 14px' }}>
          <button onClick={() => { setView({ paper: view.paper }); setOpenChapter(null); }}
            style={{ background:'none', border:'none', color:col.text, fontSize:22,
              cursor:'pointer', padding:0, lineHeight:1, flexShrink:0 }}>←</button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, color:col.text, opacity:0.7, fontWeight:500 }}>{view.paper}</div>
            <div style={{ fontSize:16, fontWeight:700, color:col.text }}>{view.subject}</div>
          </div>
          <div style={{ background:col.pill, color:'#fff',
            padding:'6px 14px', borderRadius:99, fontSize:15, fontWeight:800 }}>
            {subj.completion_pct}%
          </div>
        </div>

        {/* Chapter pills grid */}
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {subj.chapters.map((ch, idx) => {
            const pct    = Math.round(ch.score * 100);
            const isOpen = openChapter === ch.chapter;
            const dotCol = pct>=70 ? col.pill : pct>=40 ? '#F57C00' : '#BDBDBD';
            return (
              <div key={ch.chapter}>
                {/* Chapter pill */}
                <div onClick={() => setOpenChapter(isOpen ? null : ch.chapter)}
                  style={{
                    display:'flex', alignItems:'center', gap:10,
                    background: isOpen ? col.bg : '#fff',
                    border:`1.5px solid ${isOpen ? col.pill : '#E8E8E8'}`,
                    borderRadius: isOpen ? '12px 12px 0 0' : 12,
                    padding:'10px 14px', cursor:'pointer',
                    transition:'all 0.15s'
                  }}>
                  <div style={{ width:10, height:10, borderRadius:'50%',
                    background:dotCol, flexShrink:0 }} />
                  <span style={{ flex:1, fontSize:14, fontWeight:500 }}>{ch.chapter}</span>
                  <span style={{
                    background: pct>=70?col.bg: pct>=40?'#FFF3E0':'#F5F5F5',
                    color: pct>=70?col.text: pct>=40?'#E65100':'#9CA3AF',
                    border:`1px solid ${pct>=70?col.pill: pct>=40?'#FB8C00':'#E0E0E0'}`,
                    padding:'3px 10px', borderRadius:99, fontSize:12, fontWeight:700, flexShrink:0
                  }}>{pct}%</span>
                  <span style={{ color: isOpen?col.text:'#D1D5DB', fontSize:11,
                    transform: isOpen?'rotate(180deg)':'none', transition:'transform 0.2s' }}>▼</span>
                </div>

                {/* Inline tasks */}
                {isOpen && (
                  <div style={{
                    border:`1.5px solid ${col.pill}`, borderTop:'none',
                    borderRadius:'0 0 12px 12px',
                    background: col.light, padding:'12px'
                  }}>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6 }}>
                      {TASKS.map(t => {
                        const val  = ch[t.key];
                        const done = val === 'Done';
                        const busy = saving === `${subj.subject}||${ch.chapter}||${t.key}`;
                        return (
                          <button key={t.key}
                            onClick={() => toggleTask(subj.subject, ch.chapter, t.key, val)}
                            disabled={busy}
                            style={{
                              padding:'8px 4px', borderRadius:10,
                              border:`1.5px solid ${done ? col.pill : '#E0E6EF'}`,
                              background: done ? col.pill : '#fff',
                              cursor:'pointer', transition:'all 0.15s',
                              display:'flex', flexDirection:'column',
                              alignItems:'center', gap:3
                            }}>
                            <span style={{ fontSize:15 }}>
                              {busy ? '⏳' : done ? '✅' : t.emoji}
                            </span>
                            <span style={{ fontSize:10, fontWeight:600, lineHeight:1.2, textAlign:'center',
                              color: done ? '#fff' : '#6B7280' }}>
                              {t.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Paper view: subject pills ──
  if (view?.paper) {
    const col      = PAPER_COL[view.paper] || PAPER_COL['GS Paper 1'];
    const subjects = grouped[view.paper] || [];

    return (
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16,
          background:col.bg, borderRadius:12, padding:'12px 14px' }}>
          <button onClick={() => setView(null)}
            style={{ background:'none', border:'none', color:col.text,
              fontSize:22, cursor:'pointer', padding:0, lineHeight:1 }}>←</button>
          <div style={{ fontSize:17, fontWeight:800, color:col.text }}>{view.paper}</div>
        </div>

        {/* Subject pills — colourful grid */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
          {subjects.map((subj, idx) => {
            const sc  = SUBJ_COLORS[idx % SUBJ_COLORS.length];
            const pct = subj.completion_pct;
            return (
              <div key={subj.subject}
                onClick={() => { setView({ paper:view.paper, subject:subj.subject }); setOpenChapter(null); }}
                style={{
                  background: sc.bg,
                  border:`1.5px solid ${sc.dot}`,
                  borderRadius:12, padding:'12px 16px',
                  cursor:'pointer', minWidth:140, flex:'1 1 140px',
                  transition:'box-shadow 0.15s',
                  boxShadow:'0 2px 6px rgba(0,0,0,0.08)'
                }}>
                <div style={{ fontSize:14, fontWeight:700, color:sc.text, marginBottom:8 }}>
                  {subj.subject}
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:11, color:sc.text, opacity:0.7 }}>
                    {subj.chapters.length} chapters
                  </span>
                  <span style={{
                    background: sc.dot, color:'#fff',
                    padding:'3px 10px', borderRadius:99,
                    fontSize:13, fontWeight:800
                  }}>{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Home: Paper cards ──
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
      {paperOrder.filter(p => grouped[p]).map(paper => {
        const col     = PAPER_COL[paper] || PAPER_COL['GS Paper 1'];
        const subjects = grouped[paper] || [];
        const overall  = subjects.length
          ? Math.round(subjects.reduce((s,sub) => s+sub.completion_pct, 0) / subjects.length)
          : 0;

        return (
          <div key={paper} onClick={() => setView({ paper })}
            style={{
              background:'#fff', borderRadius:14, padding:'16px',
              boxShadow:'0 2px 10px rgba(0,0,0,0.08)', cursor:'pointer',
              borderLeft:`5px solid ${col.top}`
            }}>
            {/* Paper header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <div style={{ fontSize:16, fontWeight:800, color:col.top }}>{paper}</div>
              <span style={{
                background:col.bg, color:col.text,
                border:`1.5px solid ${col.pill}`,
                padding:'5px 16px', borderRadius:99, fontSize:16, fontWeight:800
              }}>{overall}%</span>
            </div>

            {/* Subject pills */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {subjects.map((sub, idx) => {
                const sc  = SUBJ_COLORS[idx % SUBJ_COLORS.length];
                const pct = sub.completion_pct;
                return (
                  <div key={sub.subject}
                    onClick={e => { e.stopPropagation(); setView({ paper, subject: sub.subject }); setOpenChapter(null); }}
                    style={{
                      display:'flex', alignItems:'center', gap:6,
                      background: sc.bg, border:`1.5px solid ${sc.dot}`,
                      borderRadius:99, padding:'5px 12px', cursor:'pointer'
                    }}>
                    <span style={{ fontSize:12, fontWeight:600, color:sc.text }}>{sub.subject}</span>
                    <span style={{
                      background:sc.dot, color:'#fff',
                      borderRadius:99, padding:'1px 8px',
                      fontSize:11, fontWeight:800
                    }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}


// ── BreadCrumb ────────────────────────────────────────────────
function BreadCrumb({ items, onBack, color }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:14, flexWrap:'wrap' }}>
      <button onClick={() => onBack(0)}
        style={{ background:'none', border:'none', color:'#6B7280', fontSize:13, cursor:'pointer', padding:0 }}>
        Subjects
      </button>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span style={{ color:'#D1D5DB', fontSize:12 }}>›</span>
          <button onClick={() => i < items.length-1 ? onBack(i+1) : null}
            style={{
              background:'none', border:'none', cursor: i < items.length-1 ? 'pointer' : 'default',
              color: i === items.length-1 ? color : '#6B7280',
              fontWeight: i === items.length-1 ? 700 : 400,
              fontSize:13, padding:0
            }}>
            {item.length > 22 ? item.slice(0,22)+'…' : item}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}


// ── Daily Tab ─────────────────────────────────────────────────
function DailyTab({ dashboard, user, onUpdate, consistency }) {
  const today = dashboard?.today_log;
  const [vals, setVals] = useState({
    editorials_mins:      today?.editorials_mins      || '',
    current_affairs_mins: today?.current_affairs_mins || '',
    static_mins:          today?.static_mins          || '',
    csat_mins:            today?.csat_mins            || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  const TASKS_DAILY = [
    { key: 'editorials_mins',      label: '📰 Editorials',      optimal: dashboard?.config?.editorials_optimal_mins || 20, unit: 'min' },
    { key: 'current_affairs_mins', label: '🗞️ Current Affairs', optimal: dashboard?.config?.current_affairs_optimal_mins || 60, unit: 'min' },
    { key: 'static_mins',          label: '📚 Static (GS+Opt)', optimal: dashboard?.config?.static_optimal_mins || 150, unit: 'min' },
    { key: 'csat_mins',            label: '🔢 CSAT',            optimal: dashboard?.config?.csat_optimal_mins || 30, unit: 'min' },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api('logDailyTask', { phone: user.phone, ...vals });
      await onUpdate(true);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) { alert('Failed to save'); }
    finally { setSaving(false); }
  }

  return (
    <>
      <div className="card">
        <div className="card-title">📅 Today's Study Log</div>
        <form onSubmit={handleSubmit}>
          {TASKS_DAILY.map(t => {
            const val = Number(vals[t.key]) || 0;
            const pct = Math.min(100, Math.round((val / t.optimal) * 100));
            return (
              <div key={t.key} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: 14, fontWeight: 500 }}>{t.label}</label>
                  <span style={{ fontSize: 12, color: '#6B7280' }}>Optimal: {t.optimal} min</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <input
                    type="number" min="0" max="600"
                    className="input-field"
                    style={{ width: 90, flexShrink: 0 }}
                    placeholder="0"
                    value={vals[t.key]}
                    onChange={e => setVals(v => ({ ...v, [t.key]: e.target.value }))}
                  />
                  <div style={{ flex: 1 }}>
                    <div className="progress-bar-wrap">
                      <div className="progress-bar-fill" style={{
                        width: `${pct}%`,
                        background: pct >= 100 ? '#2E7D32' : pct >= 60 ? '#F5A623' : '#E65100'
                      }} />
                    </div>
                    <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>{pct}% of optimal</div>
                  </div>
                </div>
              </div>
            );
          })}
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? <span className="spinner" /> : saved ? '✓ Saved!' : 'Save Today\'s Log'}
          </button>
        </form>
      </div>

      {/* Heatmap */}
      {consistency && (
        <div className="card">
          <div className="card-title">🔥 30-Day Activity</div>
          <div className="heatmap">
            {consistency.heatmap.map(d => {
              const s = d.score;
              const bg = s === null ? '#F0F0F0' : s >= 80 ? '#1B5E20' : s >= 60 ? '#388E3C' : s >= 40 ? '#81C784' : '#C8E6C9';
              return (
                <div key={d.date} className="heatmap-cell" style={{ background: bg, color: s !== null && s >= 60 ? '#fff' : '#999' }}
                  title={`${d.date}: ${s !== null ? s + '%' : 'No log'}`}>
                  {s !== null ? s : ''}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, alignItems: 'center', fontSize: 11, color: '#6B7280' }}>
            <span>Less</span>
            {['#F0F0F0','#C8E6C9','#81C784','#388E3C','#1B5E20'].map(c => (
              <div key={c} style={{ width: 14, height: 14, background: c, borderRadius: 3 }} />
            ))}
            <span>More</span>
          </div>
        </div>
      )}

      {/* Consistency scores */}
      {consistency && (
        <div className="card">
          <div className="card-title">📊 Consistency Score</div>
          <div className="stat-grid">
            <div className="stat-box">
              <div className="val" style={{ color: '#1565C0' }}>{consistency.weekly.consistency_pct}%</div>
              <div className="lbl">This Week</div>
            </div>
            <div className="stat-box">
              <div className="val" style={{ color: '#E65100' }}>{consistency.monthly.consistency_pct}%</div>
              <div className="lbl">This Month</div>
            </div>
            <div className="stat-box">
              <div className="val" style={{ color: '#2E7D32' }}>{consistency.overall.consistency_pct}%</div>
              <div className="lbl">Overall</div>
            </div>
            <div className="stat-box">
              <div className="val" style={{ color: '#6A1B9A' }}>{consistency.overall.logged_days}</div>
              <div className="lbl">Days Logged</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Tests Tab ─────────────────────────────────────────────────
function TestsTab({ user }) {
  const [scores, setScores]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding]   = useState(null);
  const [form, setForm]       = useState({});
  const [saving, setSaving]   = useState(false);

  const loadScores = () =>
    api('getTestScores', { phone: user.phone })
      .then(setScores).catch(console.error).finally(() => setLoading(false));

  useEffect(() => { loadScores(); }, [user.phone]);

  function selectTest(code) {
    const list = (TESTS_MASTER[adding.category] || []).filter(t => t.type === adding.series);
    const found = list.find(t => t.code === code);
    if (found) setForm(f => ({ ...f, test_code: found.code, test_name: found.name, marks_total: found.marks || found.questions || '' }));
  }

  async function saveTest(e) {
    e.preventDefault(); setSaving(true);
    try {
      const testType = adding.series === 'CMT' ? 'cmt' : adding.series === 'AWP' ? 'awp' : adding.category;
      await api('logTestScore', { phone: user.phone, test_type: testType, ...form });
      await loadScores(); setAdding(null); setForm({});
    } catch { alert('Failed to save. Please try again.'); }
    finally { setSaving(false); }
  }

  if (loading) return <div style={{ textAlign:'center', padding:60 }}><div className="spinner spinner-dark" style={{ width:30, height:30, margin:'0 auto' }}/></div>;

  const SECTIONS = [
    { key:'gs_prelims',   label:'📝 GS Prelims Tests',      scoreKey:'prelims', hasCMT:true,  cmtKey:'cmt_gs'   },
    { key:'csat_prelims', label:'📝 CSAT Prelims Tests',    scoreKey:'csat',    hasCMT:true,  cmtKey:'cmt_csat' },
    { key:'mains',        label:'📋 Mains Tests',           scoreKey:'mains',   hasCMT:false, cmtKey:null, hasAWP:true },
  ];

  return (
    <>
      {SECTIONS.map(sec => (
        <TestSection key={sec.key} section={sec} scores={scores}
          onAdd={(series) => { setAdding({ category: sec.key, series, cmtKey: sec.cmtKey }); setForm({}); }} />
      ))}

      {adding && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:200, display:'flex', alignItems:'flex-end' }}
          onClick={e => e.target===e.currentTarget && setAdding(null)}>
          <div style={{ background:'#fff', borderRadius:'18px 18px 0 0', padding:24, width:'100%', maxWidth:480, margin:'0 auto', maxHeight:'85vh', overflowY:'auto' }}>

            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <div style={{ flex:1, fontWeight:700, fontSize:16 }}>
                {adding.category==='cmt' ? 'Add CMT Entry' : 'Add Score'}
              </div>
              {adding.series === 'AWP' && (
                <>
                  <div className="input-group">
                    <label>Select Subject</label>
                    <select className="input-field" required value={form.subject_name||''}
                      onChange={e => setForm(f => ({ ...f, subject_name: e.target.value }))}>
                      <option value="">— Choose a subject —</option>
                      {(TESTS_MASTER.awp||[]).map(s => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Questions Attempted</label>
                    <select className="input-field" required value={form.questions_attempted||''}
                      onChange={e => setForm(f => ({ ...f, questions_attempted: Number(e.target.value) }))}>
                      <option value="">— Select —</option>
                      <option value="10">10 Questions (10% Mastery)</option>
                      <option value="20">20 Questions (30% Mastery)</option>
                      <option value="30">30 Questions (70% Mastery)</option>
                      <option value="40">40 Questions (100% Mastery)</option>
                    </select>
                  </div>
                </>
              )}

              {adding.series !== 'CMT' && adding.series !== 'AWP' && (
                <span style={{ background: adding.series==='LEEP'?'#E3F0FF':'#E8F5E9',
                  color: adding.series==='LEEP'?'#1565C0':'#2E7D32',
                  padding:'4px 12px', borderRadius:99, fontSize:13, fontWeight:700 }}>
                  {adding.series}
                </span>
              )}
            </div>

            <form onSubmit={saveTest}>
              {adding.series === 'CMT' && (
                <>
                  <div className="input-group">
                    <label>Select Chapter</label>
                    <select className="input-field" required value={form.chapter||''}
                      onChange={e => setForm(f => ({ ...f, chapter: e.target.value }))}>
                      <option value="">— Choose a chapter —</option>
                      {(TESTS_MASTER[adding.cmtKey]||[]).map(c => (
                        <option key={c.name} value={c.name}>
                          {c.subject ? `[${c.subject.replace(/^\d+\.\s*/,'')}] ` : ''}{c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Mastery Status</label>
                    <select className="input-field" required value={form.mastery_status||''}
                      onChange={e => setForm(f => ({ ...f, mastery_status: e.target.value }))}>
                      <option value="">— Select —</option>
                      <option value="Mastered">✅ Mastered (&gt;65%)</option>
                      <option value="Concerned">⚠️ Concerned</option>
                      <option value="Not Attempted">🔴 Not Attempted</option>
                    </select>
                  </div>
                </>
              )}

              {adding.series === 'AWP' && (
                <>
                  <div className="input-group">
                    <label>Select Subject</label>
                    <select className="input-field" required value={form.subject_name||''}
                      onChange={e => setForm(f => ({ ...f, subject_name: e.target.value }))}>
                      <option value="">— Choose a subject —</option>
                      {(TESTS_MASTER.awp||[]).map(s => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Questions Attempted</label>
                    <select className="input-field" required value={form.questions_attempted||''}
                      onChange={e => setForm(f => ({ ...f, questions_attempted: Number(e.target.value) }))}>
                      <option value="">— Select —</option>
                      <option value="10">10 Questions (10% Mastery)</option>
                      <option value="20">20 Questions (30% Mastery)</option>
                      <option value="30">30 Questions (70% Mastery)</option>
                      <option value="40">40 Questions (100% Mastery)</option>
                    </select>
                  </div>
                </>
              )}

              {adding.series !== 'CMT' && adding.series !== 'AWP' && (
                <>
                  <div className="input-group">
                    <label>Select Test</label>
                    <select className="input-field" required value={form.test_code||''}
                      onChange={e => selectTest(e.target.value)}>
                      <option value="">— Choose a test —</option>
                      {(TESTS_MASTER[adding.category]||[]).filter(t => t.type===adding.series).map(t => (
                        <option key={t.code} value={t.code}>
                          {t.code} — {t.name.length>45 ? t.name.slice(0,45)+'…' : t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {form.test_code && (
                    <div style={{ background:'#EAF2FB', borderRadius:10, padding:'10px 14px', marginBottom:14, fontSize:13, color:'#1565C0' }}>
                      <strong>{form.test_code}</strong> — {form.test_name}<br/>
                      <span style={{ opacity:0.8 }}>Total: {form.marks_total}</span>
                    </div>
                  )}
                  {adding.category !== 'mains' && adding.series !== 'CMT' && adding.series !== 'AWP' ? (
                    <div className="input-group">
                      <label>Marks Scored (out of {form.marks_total||'?'})</label>
                      <input className="input-field" type="number" min="0" max={form.marks_total||9999} required
                        value={form.marks_scored||''} onChange={e => setForm(f => ({ ...f, marks_scored: e.target.value }))} />
                    </div>
                  ) : (
                    <div className="input-group">
                      <label>Attempted?</label>
                      <select className="input-field" value={form.attempted||'Yes'}
                        onChange={e => setForm(f => ({ ...f, attempted: e.target.value }))}>
                        <option value="Yes">Yes — Attempted</option>
                        <option value="Not Done">Not Done</option>
                      </select>
                    </div>
                  )}
                </>
              )}

              <div style={{ display:'flex', gap:10 }}>
                <button type="button" className="btn btn-outline" onClick={() => { setAdding(null); setForm({}); }}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <span className="spinner"/> : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// ── Test Section Component ────────────────────────────────────
function TestSection({ section, scores, onAdd }) {
  const [activeSeries, setActiveSeries] = useState('LEEP');
  const series = section.hasAWP ? ['LEEP','EDGE','AWP'] : section.hasCMT ? ['LEEP','EDGE','CMT'] : ['LEEP','EDGE'];

  const allEntries = scores?.[section.scoreKey] || [];
  const cmtEntries = scores?.cmt || [];
  const awpEntries = scores?.awp || [];
  const filtered = activeSeries === 'CMT'
    ? cmtEntries.filter(r => {
        const cmtList = TESTS_MASTER[section.cmtKey] || [];
        return cmtList.some(c => c.name === r.chapter);
      })
    : activeSeries === 'AWP'
    ? awpEntries
    : allEntries.filter(r => {
        if (r.test_label) return r.test_label === activeSeries;
        if (activeSeries === 'EDGE') return String(r.test_code||'').startsWith('ES');
        return !String(r.test_code||'').startsWith('ES');
      });

  return (
    <div className="card">
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <div className="card-title" style={{ marginBottom:0 }}>{section.label}</div>
      </div>

      {/* CMT — no LEEP/EDGE, just add button */}
      {section.isCMT ? (
        <>
          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:12 }}>
            <button className="btn btn-sm btn-saffron" onClick={() => onAdd('CMT')}>+ Add</button>
          </div>
          {(scores?.cmt||[]).length ? (scores.cmt||[]).map((r,i) => (
            <div key={i} style={{ borderBottom:'1px solid #F0F0F0', padding:'8px 0',
              display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:14, fontWeight:500 }}>{r.chapter}</span>
              <span className={`pill ${r.mastery_status==='Mastered'?'pill-green':
                r.mastery_status==='Concerned'?'pill-orange':'pill-blue'}`}>
                {r.mastery_status}
              </span>
            </div>
          )) : <div style={{ color:'#6B7280', fontSize:13 }}>No entries yet</div>}
        </>
      ) : (
        <>
          {/* LEEP / EDGE toggle */}
          <div style={{ display:'flex', gap:6, marginBottom:12 }}>
            {series.map(s => {
              const colors = { LEEP:'#1565C0', EDGE:'#2E7D32', CMT:'#6A1B9A', AWP:'#E65100' };
              const active = activeSeries === s;
              return (
                <button key={s} onClick={() => setActiveSeries(s)}
                  style={{ padding:'5px 14px', borderRadius:99, border:'1.5px solid',
                    borderColor: active ? colors[s] : '#E0E6EF',
                    background: active ? colors[s] : '#fff',
                    color: active ? '#fff' : '#6B7280',
                    fontWeight:600, fontSize:12, cursor:'pointer' }}>
                  {s}
                </button>
              );
            })}
            <button className="btn btn-sm btn-saffron" style={{ marginLeft:'auto' }}
              onClick={() => onAdd(activeSeries)}>
              + Add
            </button>
          </div>

          {/* Entries */}
          {filtered.length ? filtered.map((r, i) => (
            <div key={i} style={{ borderBottom:'1px solid #F0F0F0', padding:'8px 0' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:500 }}>
                    {activeSeries === 'CMT' ? r.chapter : activeSeries === 'AWP' ? r.subject_name : r.test_code}
                  </div>
                  {activeSeries !== 'CMT' && activeSeries !== 'AWP' && (
                    <div style={{ fontSize:11, color:'#6B7280', marginTop:1 }}>{r.test_name}</div>
                  )}
                </div>
                {activeSeries === 'CMT' ? (
                  <span className={`pill ${r.mastery_status==='Mastered'?'pill-green':r.mastery_status==='Concerned'?'pill-orange':'pill-blue'}`}>
                    {r.mastery_status}
                  </span>
                ) : activeSeries === 'AWP' ? (
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:15, fontWeight:700, color:'#E65100' }}>{r.questions_attempted}Q</div>
                    <div style={{ fontSize:11, color:'#6B7280' }}>
                      {r.questions_attempted>=40?'100%':r.questions_attempted>=30?'70%':r.questions_attempted>=20?'30%':r.questions_attempted>=10?'10%':'0%'}
                    </div>
                  </div>
                ) : section.hasScore ? (
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:16, fontWeight:700, color:'#1B3A6B' }}>
                      {r.marks_scored}<span style={{ fontSize:11, color:'#6B7280' }}>/{r.marks_total}</span>
                    </div>
                    <div style={{ fontSize:11, color: getScoreColor(r.marks_scored, r.marks_total) }}>
                      {r.marks_total > 0 ? Math.round(r.marks_scored/r.marks_total*100) : 0}%
                    </div>
                  </div>
                ) : (
                  <span className={`pill ${r.attempted==='Yes'?'pill-green':'pill-orange'}`}>
                    {r.attempted==='Yes'?'Done':'Not Done'}
                  </span>
                )}
              </div>
            </div>
          )) : (
            <div style={{ color:'#6B7280', fontSize:13, padding:'8px 0' }}>
              No {activeSeries} entries yet
            </div>
          )}
        </>
      )}
    </div>
  );
}

function getScoreColor(scored, total) {
  if (!total) return '#6B7280';
  const pct = (scored / total) * 100;
  if (pct >= 60) return '#2E7D32';
  if (pct >= 40) return '#E65100';
  return '#B00020';
}


