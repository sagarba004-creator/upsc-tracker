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
    { "code": "AWP-Art and Culture",         "name": "Art and Culture",         "paper": "GS Paper 1", "weight": 0.025,  "target": 10,  "type": "AWP" },
    { "code": "AWP-Modern History",          "name": "Modern History",          "paper": "GS Paper 1", "weight": 0.025,  "target": 10,  "type": "AWP" },
    { "code": "AWP-Post-Independence",       "name": "Post-Independence",       "paper": "GS Paper 1", "weight": 0.025,  "target": 10,  "type": "AWP" },
    { "code": "AWP-World History",           "name": "World History",           "paper": "GS Paper 1", "weight": 0.025,  "target": 10,  "type": "AWP" },
    { "code": "AWP-Geography",               "name": "Geography",               "paper": "GS Paper 1", "weight": 0.025,  "target": 10,  "type": "AWP" },
    { "code": "AWP-Society",                 "name": "Society",                 "paper": "GS Paper 1", "weight": 0.025,  "target": 10,  "type": "AWP" },
    { "code": "AWP-Polity",                  "name": "Polity",                  "paper": "GS Paper 2", "weight": 0.04375,"target": 15,  "type": "AWP" },
    { "code": "AWP-Governance",              "name": "Governance",              "paper": "GS Paper 2", "weight": 0.04375,"target": 15,  "type": "AWP" },
    { "code": "AWP-International Relati",    "name": "International Relations", "paper": "GS Paper 2", "weight": 0.04375,"target": 15,  "type": "AWP" },
    { "code": "AWP-Social Justice",          "name": "Social Justice",          "paper": "GS Paper 2", "weight": 0.04375,"target": 15,  "type": "AWP" },
    { "code": "AWP-Economy",                 "name": "Economy",                 "paper": "GS Paper 3", "weight": 0.035,  "target": 15,  "type": "AWP" },
    { "code": "AWP-Environment",             "name": "Environment",             "paper": "GS Paper 3", "weight": 0.035,  "target": 15,  "type": "AWP" },
    { "code": "AWP-Internal Security",       "name": "Internal Security",       "paper": "GS Paper 3", "weight": 0.035,  "target": 15,  "type": "AWP" },
    { "code": "AWP-Disaster Management",     "name": "Disaster Management",     "paper": "GS Paper 3", "weight": 0.035,  "target": 15,  "type": "AWP" },
    { "code": "AWP-Science and Tech",        "name": "Science and Tech",        "paper": "GS Paper 3", "weight": 0.035,  "target": 15,  "type": "AWP" },
    { "code": "AWP-Ethics",                  "name": "Ethics",                  "paper": "GS Paper 4", "weight": 0.0875, "target": 20,  "type": "AWP" },
    { "code": "AWP-Ethics Case studies",     "name": "Ethics Case studies",     "paper": "GS Paper 4", "weight": 0.0875, "target": 20,  "type": "AWP" },
    { "code": "AWP-Essay",                   "name": "Essay",                   "paper": "Essay",      "weight": 0.15,   "target": 10,  "type": "AWP" },
    { "code": "AWP-Optional",                "name": "Optional",                "paper": "Optional",   "weight": 0.175,  "target": 100, "type": "AWP" }
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
            {tab === 'home'    && <HomeTab    dashboard={dashboard} consistency={consistency} user={user} onTabChange={setTab} />}
            {tab === 'subjects'&& <SubjectsTab dashboard={dashboard} user={user} onUpdate={loadDashboard} gsSummary={dashboard?.gs_summary} />}
            {tab === 'daily'   && <DailyTab   dashboard={dashboard} user={user} onUpdate={loadDashboard} consistency={consistency} />}
            {tab === 'tests'   && <TestsTab   user={user} />}
          </>
        )}
      </div>

      <nav style={{
        display:'flex', justifyContent:'space-around', alignItems:'center',
        background:'#fff', borderTop:'1px solid #E5E7EB',
        padding:'6px 0 10px', position:'fixed', bottom:0, left:0, right:0,
        zIndex:100, boxShadow:'0 -2px 8px rgba(0,0,0,0.06)'
      }}>
        {[
          { key: 'home',     icon: '🏠', label: 'Home' },
          { key: 'subjects', icon: '📚', label: 'Subjects' },
          { key: 'daily',    icon: '📅', label: 'Daily' },
          { key: 'tests',    icon: '📝', label: 'Tests' },
        ].map(t => {
          const isActive = tab === t.key;
          const COLOR = { home:'#2E7D32', subjects:'#1565C0', daily:'#E65100', tests:'#6A1B9A' };
          const c = COLOR[t.key] || '#1B3A6B';
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                display:'flex', flexDirection:'column', alignItems:'center', gap:2,
                background:'none', border:'none', cursor:'pointer',
                padding:'4px 16px', borderRadius:12,
                color: isActive ? c : '#9CA3AF',
                transition:'all 0.15s',
                position:'relative'
              }}>
              {isActive && (
                <div style={{
                  position:'absolute', top:-6, left:'50%', transform:'translateX(-50%)',
                  width:32, height:3, borderRadius:99, background:c
                }}/>
              )}
              <span style={{ fontSize:22, filter: isActive ? 'none' : 'grayscale(60%) opacity(0.6)' }}>
                {t.icon}
              </span>
              <span style={{ fontSize:10, fontWeight: isActive ? 800 : 500 }}>
                {t.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// ── Home Tab ──────────────────────────────────────────────
function HomeTab({ dashboard, consistency, user, onTabChange }) {
  if (!dashboard) return null;

  const proficiency  = dashboard.proficiency_score  || 0;
  const readiness    = dashboard.exam_readiness      || 0;
  const consistency_score = consistency?.overall?.consistency_score || 0;

  // Success Probability = weighted average of all 3
  const successProb = Math.round(
    proficiency    * 0.40 +
    readiness      * 0.35 +
    consistency_score * 0.25
  );

  const GS_COL = {
    'GS Paper 1': '#2E7D32',
    'GS Paper 2': '#1565C0',
    'GS Paper 3': '#E65100',
    'GS Paper 4': '#6A1B9A',
    'Essay':      '#00838F',
    'CSAT':       '#C62828',
    'Optional':   '#37474F',
  };
  const PAPER_ORDER = ['GS Paper 1','GS Paper 2','GS Paper 3','GS Paper 4','Essay','CSAT','Optional'];

  function meterColor(pct) {
    if (pct >= 70) return '#2E7D32';
    if (pct >= 50) return '#F57C00';
    if (pct >= 30) return '#E65100';
    return '#C62828';
  }

  function PillarCard({ title, score, color, icon, children }) {
    return (
      <div style={{ background:'#fff', borderRadius:14, padding:'14px 16px',
        boxShadow:'0 2px 10px rgba(0,0,0,0.07)', borderTop:`4px solid ${color}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:18 }}>{icon}</span>
            <span style={{ fontSize:14, fontWeight:700, color:'#1A1A2E' }}>{title}</span>
          </div>
          <span style={{ fontSize:22, fontWeight:800, color }}>
            {score}<span style={{ fontSize:12, fontWeight:500, color:'#9CA3AF' }}>%</span>
          </span>
        </div>
        <div className="progress-bar-wrap" style={{ height:8, marginBottom: children ? 12 : 0 }}>
          <div className="progress-bar-fill" style={{ width:`${score}%`, background:color, borderRadius:99 }} />
        </div>
        {children}
      </div>
    );
  }

  // Group subjects by paper for proficiency breakdown
  const paperMap = {};
  dashboard.gs_summary?.forEach(g => { paperMap[g.gs_paper] = g.pct; });

  return (
    <>
      {/* ── Success Probability Meter ── */}
      <div style={{
        background: `linear-gradient(135deg, ${meterColor(successProb)}, ${meterColor(successProb)}CC)`,
        borderRadius:16, padding:'20px', marginBottom:14, color:'#fff',
        boxShadow:'0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontSize:12, opacity:0.85, marginBottom:4, fontWeight:500 }}>
              🎯 Success Probability
            </div>
            <div style={{ fontSize:52, fontWeight:900, lineHeight:1 }}>
              {successProb}<span style={{ fontSize:22 }}>%</span>
            </div>
            <div style={{ fontSize:12, opacity:0.8, marginTop:6 }}>
              {successProb >= 70 ? '🔥 Excellent trajectory' :
               successProb >= 50 ? '📈 Good progress' :
               successProb >= 30 ? '⚠️ Needs more effort' : '🚨 Critical — take action'}
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:11, opacity:0.75, marginBottom:4 }}>
              {user.name}
            </div>
            <div style={{ fontSize:11, opacity:0.75 }}>
              Target: {user.target_year || '—'}
            </div>
            <div style={{ fontSize:11, opacity:0.75, marginTop:2 }}>
              Batch: {user.batch || '—'}
            </div>
          </div>
        </div>

        {/* 3 pillars breakdown */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:16 }}>
          {[
            { label:'Proficiency', val:proficiency,       wt:'40%' },
            { label:'Readiness',   val:readiness,         wt:'35%' },
            { label:'Consistency', val:consistency_score, wt:'25%' },
          ].map(p => (
            <div key={p.label} style={{
              background:'rgba(255,255,255,0.2)', borderRadius:10,
              padding:'10px 8px', textAlign:'center'
            }}>
              <div style={{ fontSize:20, fontWeight:800 }}>{p.val}%</div>
              <div style={{ fontSize:10, opacity:0.9, marginTop:2 }}>{p.label}</div>
              <div style={{ fontSize:9, opacity:0.7 }}>weight: {p.wt}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pre / Mains Success Probability ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
        {[
          { label:'📘 Prelims Success', value: dashboard?.pre_success||0,   color:'#1565C0', bg:'#E3F0FF', bar:'#2563EB' },
          { label:'📗 Mains Success',   value: dashboard?.mains_success||0, color:'#065F46', bg:'#D1FAE5', bar:'#059669' },
        ].map(m => (
          <div key={m.label} style={{ background:m.bg, borderRadius:14, padding:'14px',
            boxShadow:'0 1px 6px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize:10, color:m.color, fontWeight:700, marginBottom:4, opacity:0.8 }}>{m.label}</div>
            <div style={{ fontSize:28, fontWeight:900, color:m.color, lineHeight:1 }}>{m.value}<span style={{ fontSize:14 }}>%</span></div>
            <div style={{ background:'rgba(0,0,0,0.08)', borderRadius:99, height:5, marginTop:8 }}>
              <div style={{ width:`${m.value}%`, height:5, background:m.bar, borderRadius:99, transition:'width 0.5s' }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Subject Proficiency ── */}
      <div
        onClick={() => onTabChange && onTabChange('subjects')}
        style={{ cursor:'pointer' }}>
        <PillarCard title="Subject Proficiency" score={proficiency} color="#1B3A6B" icon="📚">
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {/* Prelims bar */}
            {(() => {
              const prePct = dashboard?.pre_proficiency || 0;
              return (
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:'#1565C0' }}>📘 Prelims</span>
                    <span style={{ fontSize:13, fontWeight:800, color:'#1565C0' }}>{prePct}%</span>
                  </div>
                  <div className="progress-bar-wrap" style={{ height:8, borderRadius:99 }}>
                    <div className="progress-bar-fill" style={{ width:`${prePct}%`, background:'#1565C0', borderRadius:99 }} />
                  </div>
                </div>
              );
            })()}
            {/* Mains bar */}
            {(() => {
              const mainsPct = dashboard?.mains_proficiency || 0;
              return (
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:'#E65100' }}>📗 Mains</span>
                    <span style={{ fontSize:13, fontWeight:800, color:'#E65100' }}>{mainsPct}%</span>
                  </div>
                  <div className="progress-bar-wrap" style={{ height:8, borderRadius:99 }}>
                    <div className="progress-bar-fill" style={{ width:`${mainsPct}%`, background:'#E65100', borderRadius:99 }} />
                  </div>
                </div>
              );
            })()}
            <div style={{ fontSize:11, color:'#9CA3AF', textAlign:'center', marginTop:2 }}>
              Tap to view subjects →
            </div>
          </div>
        </PillarCard>
      </div>

      {/* ── Exam Readiness ── */}
      <PillarCard title="Exam Readiness" score={readiness} color="#E65100" icon="📝">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
          {[
            { label:'LEEP Prelims', wt:'15%', color:'#1565C0' },
            { label:'EDGE Prelims', wt:'22.5%', color:'#2E7D32' },
            { label:'LEEP Mains',   wt:'15%', color:'#1565C0' },
            { label:'EDGE Mains',   wt:'22.5%', color:'#2E7D32' },
            { label:'CMTs',         wt:'5%',  color:'#6A1B9A' },
            { label:'AWP',          wt:'20%', color:'#E65100' },
          ].map(t => (
            <div key={t.label} style={{
              background:`${t.color}15`, borderRadius:8, padding:'8px 10px',
              border:`1px solid ${t.color}30`
            }}>
              <div style={{ fontSize:12, fontWeight:600, color:t.color }}>{t.label}</div>
              <div style={{ fontSize:10, color:'#9CA3AF', marginTop:1 }}>Weight: {t.wt}</div>
            </div>
          ))}
        </div>
      </PillarCard>

      {/* ── Consistency Score ── */}
      <PillarCard title="Consistency Score" score={consistency_score} color="#00838F" icon="🔥">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
          {[
            { label:'This Week',    val: consistency?.weekly?.consistency_score  || 0, sub: `${consistency?.weekly?.consistency_pct||0}% days` },
            { label:'This Month',   val: consistency?.monthly?.consistency_score || 0, sub: `${consistency?.monthly?.consistency_pct||0}% days` },
            { label:'Overall',      val: consistency?.overall?.consistency_score || 0, sub: `${consistency?.overall?.logged_days||0} days` },
          ].map(c => (
            <div key={c.label} style={{ textAlign:'center', background:'#F0FDFD', borderRadius:10, padding:'10px 6px' }}>
              <div style={{ fontSize:20, fontWeight:800, color:'#00838F' }}>{c.val}%</div>
              <div style={{ fontSize:10, color:'#4B5563', fontWeight:600, marginTop:2 }}>{c.label}</div>
              <div style={{ fontSize:9, color:'#9CA3AF', marginTop:1 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* 30-day heatmap mini */}
        {consistency?.heatmap && (
          <div style={{ marginTop:12 }}>
            <div style={{ fontSize:11, color:'#6B7280', marginBottom:6 }}>30-day activity</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:3 }}>
              {consistency.heatmap.map(d => {
                const s  = d.score;
                const bg = s === null ? '#F0F0F0' : s >= 70 ? '#00695C' : s >= 40 ? '#4DB6AC' : '#B2DFDB';
                return (
                  <div key={d.date} style={{
                    width:14, height:14, borderRadius:3, background:bg
                  }} title={`${d.date}: ${s !== null ? s+'%' : 'No log'}`} />
                );
              })}
            </div>
          </div>
        )}
      </PillarCard>

      {/* ── Mentor Feedback ── */}
      {dashboard?.feedback?.length > 0 && (
        <div className="card">
          <div className="card-title">💬 Mentor Feedback</div>
          {dashboard.feedback.slice(0,3).map((f,i) => (
            <div key={i} style={{ padding:'10px', background:'#F0FDF4', borderRadius:8,
              marginBottom:8, borderLeft:'3px solid #16A34A' }}>
              <div style={{ fontSize:13, color:'#1E293B' }}>{f.note}</div>
              <div style={{ fontSize:10, color:'#64748B', marginTop:4 }}>{f.created_date}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}


// ── Subjects Tab ──────────────────────────────────────────────
const CHAPTER_WEIGHTS = {"Ancient India": {"1. Pre-Historic India": {"pre": 9.1}, "2. Harappan Civilization / Bronze Age": {"pre": 9.1}, "3. The Vedic Age": {"pre": 9.1}, "4. The Mahajanapadas": {"pre": 18.2}, "5. The Maurya Empire": {"pre": 15.2}, "6. The Guptas and the Vakatakas": {"pre": 24.1}, "7. Post-Harsha Period & Regional Kingdoms": {"pre": 15.2}}, "Medieval History": {"1. Early Medieval India: Age of Regional Configurations (c. 600\u20131200 CE)": {"pre": 13.2}, "2. Early Medieval India: States of South India": {"pre": 4.7}, "3. Delhi Sultanate": {"pre": 15.5}, "4. Vijayanagara and Bahmani Kingdoms": {"pre": 17.8}, "5. The Mughal Empire": {"pre": 10.9}, "6. Society, Economy & Culture in Medieval India": {"pre": 8.5}, "7. Decline of the Mughal Empire": {"pre": 0.8}, "8. Advent of Europeans & Early Modern India": {"pre": 28.6}}, "Art and Culture": {"1. Indian Architecture": {"pre": 25.8, "mains": 28.8}, "2. Legendary Cities of Ancient & Medieval India": {"pre": 0.9, "mains": 0.8}, "3. Indian Sculpture and Pottery": {"pre": 1.8, "mains": 10.1}, "4. Edicts and Inscriptions": {"pre": 0.9, "mains": 0.8}, "5. Coins in Ancient and Medieval India": {"pre": 0.9, "mains": 0.8}, "6. Indian Paintings": {"pre": 3.6, "mains": 0.8}, "7. Indian Handicrafts": {"pre": 1.8, "mains": 0.8}, "8. UNESCO World Heritage Sites in India": {"pre": 0.9, "mains": 0.8}, "9. Indian Music": {"pre": 4.5, "mains": 0.8}, "10. Indian Dance Forms": {"pre": 5.5, "mains": 2.3}, "11. Indian Theatre": {"pre": 0.9, "mains": 0.8}, "12. Indian Puppetry": {"pre": 0.9, "mains": 0.8}, "13. Indian Circus": {"pre": 0.9, "mains": 0.8}, "14. Martial Arts in India": {"pre": 0.9, "mains": 0.8}, "15. UNESCO Intangible Cultural Heritage": {"pre": 0.9, "mains": 0.8}, "16. Tribal Culture in India": {"pre": 4.5, "mains": 0.8}, "17. Trade, Traders and Cultural Exchange": {"pre": 0.9, "mains": 0.8}, "18. Languages in India": {"pre": 2.7, "mains": 0.8}, "19. Religion in India": {"pre": 0.9, "mains": 4.7}, "20. Bhakti and Sufi Movements": {"pre": 5.5, "mains": 12.4}, "21. Buddhism and Jainism": {"pre": 12.7, "mains": 0.8}, "22. Indian Literature": {"pre": 9.1, "mains": 12.4}, "23. Education in Ancient and Medieval India": {"pre": 0.9, "mains": 7.0}, "24. Indian Schools of Philosophy": {"pre": 2.7, "mains": 0.8}, "25. Science and Technology through the Ages": {"pre": 1.8, "mains": 0.8}, "26. Indian Cinema": {"pre": 0.9, "mains": 0.8}, "27. Fairs and Festivals in India": {"pre": 0.9, "mains": 0.8}, "28. Awards and Honours": {"pre": 0.9, "mains": 0.8}, "29. Calendars in India": {"pre": 0.9, "mains": 0.8}, "30. Law and Culture": {"pre": 0.9, "mains": 0.8}, "31. Indian Culture Abroad": {"pre": 0.9, "mains": 0.8}, "32. India Through the Eyes of Foreign Travellers": {"pre": 0.9, "mains": 2.3}, "33. Cultural Institutions in India": {"pre": 0.9, "mains": 0.8}}, "Indian Society": {"1. Salient Features of Indian Society": {"mains": 4.0}, "2. Caste System & Dalit Identity": {"mains": 5.9}, "3. Diversity of India": {"mains": 5.0}, "4. Family, Marriage & Kinship": {"mains": 4.0}, "5. Scheduled Tribes & Tribal Society": {"mains": 5.9}, "6. Role of Women & Gender Issues": {"mains": 11.9}, "7. Population Issues & Demographics": {"mains": 4.0}, "8. Migration": {"mains": 2.0}, "9. Urbanisation & Smart Cities": {"mains": 12.9}, "10. Poverty, Deprivation & Human Development": {"mains": 6.9}, "11. Effects of Globalisation on Indian Society": {"mains": 15.6}, "12. Social Empowerment, Affirmative Action & Reforms": {"mains": 9.9}, "13. Communalism": {"mains": 2.0}, "14. Secularism \u2014 Indian Model": {"mains": 5.0}, "15. Regionalism": {"mains": 5.0}}, "Modern History": {"1. Sources for the History of Modern India": {"pre": 0.6, "mains": 2.0}, "2. Major Approaches to the History of Modern India": {"pre": 0.6, "mains": 2.0}, "3. Advent of the Europeans in India": {"pre": 2.3, "mains": 2.0}, "4. India on the Eve of British Conquest": {"pre": 2.3, "mains": 5.9}, "5. Expansion and Consolidation of British Power in India": {"pre": 2.9, "mains": 2.0}, "6. People's Resistance Against British Before 1857": {"pre": 2.9, "mains": 5.9}, "7. The Revolt of 1857": {"pre": 6.9, "mains": 2.0}, "8. Socio-Religious Reform Movements \u2014 General Features": {"pre": 1.7, "mains": 2.0}, "9. A General Survey of Socio-Cultural Reform Movements & Reformers": {"pre": 4.6, "mains": 9.8}, "10. Beginning of Modern Nationalism in India": {"pre": 1.1, "mains": 3.9}, "11. Indian National Congress \u2014 Foundation and the Moderate Phase": {"pre": 5.2, "mains": 3.9}, "12. Era of Militant Nationalism (1905\u20131909)": {"pre": 2.9, "mains": 2.0}, "13. First Phase of Revolutionary Activities (1907\u20131917)": {"pre": 2.3, "mains": 2.0}, "14. First World War and Nationalist Response": {"pre": 1.7, "mains": 2.0}, "15. Emergence of Gandhi": {"pre": 4.6, "mains": 2.0}, "16. Non-Cooperation Movement and Khilafat Movement": {"pre": 7.5, "mains": 11.1}, "17. Emergence of Swarajists, Socialist Ideas, Revolutionary Activities & Other New Forces": {"pre": 2.9, "mains": 2.0}, "18. Simon Commission and the Civil Disobedience Movement": {"pre": 8.0, "mains": 2.0}, "19. Constitutional Developments (1919\u20131935)": {"pre": 6.3, "mains": 3.9}, "20. Nationalist Response in the Wake of World War II": {"pre": 4.6, "mains": 5.9}, "21. Quit India Movement and Other Events (1940\u20131947)": {"pre": 8.0, "mains": 5.9}, "22. Constitutional, Administrative & Judicial Developments": {"pre": 2.9, "mains": 2.0}, "23. Economic Impact of British Rule in India": {"pre": 2.9, "mains": 7.8}, "24. Development of Education": {"pre": 3.4, "mains": 2.0}, "25. Peasant Movements": {"pre": 2.9, "mains": 2.0}, "26. Tribal Movements": {"pre": 2.3, "mains": 2.0}, "27. Workers' Movements": {"pre": 1.7, "mains": 2.0}, "28. Growth of Press in Modern India": {"pre": 4.0, "mains": 2.0}}, "Post Independent History": {"1. Independence and Partition of India": {"mains": 1.0}, "2. Consolidation as a Nation": {"mains": 10.0}, "3. Growth of Nationalism in the Princely States": {"mains": 1.0}, "4. India's Foreign Policy": {"mains": 21.0}, "5. Integration of Princely States": {"mains": 10.0}, "6. First General Elections": {"mains": 1.0}, "7. Planning and Economic Development": {"mains": 1.0}, "8. Evolution of Party System": {"mains": 1.0}, "9. Panchayati Raj and Local Government": {"mains": 1.0}, "10. Emergency and After": {"mains": 1.0}, "11. India After Independence \u2014 Major Developments": {"mains": 52.0}}, "World History": {"1. The Modern World": {"mains": 1.0}, "2. The Age of Revolutions": {"mains": 1.0}, "3. The American Revolution": {"mains": 12.0}, "4. The French Revolution": {"mains": 6.0}, "5. The Industrial Revolution": {"mains": 17.0}, "6. Nationalism in Europe": {"mains": 1.0}, "7. Unification of Italy": {"mains": 1.0}, "8. Unification of Germany": {"mains": 1.0}, "9. The Russian Revolution": {"mains": 1.0}, "10. The Rise of Socialism": {"mains": 6.0}, "11. The Rise of Fascism": {"mains": 1.0}, "12. The Rise of Nazism": {"mains": 6.0}, "13. Imperialism and Colonialism": {"mains": 6.0}, "14. The First World War": {"mains": 17.0}, "15. The Second World War": {"mains": 1.0}, "16. The Cold War": {"mains": 1.0}, "17. The Chinese Revolution": {"mains": 1.0}, "18. Decolonization in Asia and Africa": {"mains": 17.0}, "19. The United Nations": {"mains": 1.0}, "20. The Disintegration of the Soviet Union": {"mains": 1.0}, "21. The Contemporary World": {"mains": 1.0}}, "Geography": {"W01. Geography as a Discipline": {"pre": 0.3, "mains": 0.9}, "W02. The Origin and Evolution of the Earth": {"pre": 0.7, "mains": 0.9}, "W03. Interior of the Earth": {"pre": 1.0, "mains": 1.8}, "W04. Distribution of Oceans and Continents": {"pre": 2.4, "mains": 4.4}, "W05. Minerals and Rocks": {"pre": 1.0, "mains": 0.9}, "W06. Geomorphic Processes": {"pre": 1.4, "mains": 1.8}, "W07. Landforms and Their Evolution": {"pre": 1.4, "mains": 1.8}, "W08. Composition and Structure of Atmosphere": {"pre": 1.0, "mains": 1.8}, "W09. Solar Radiation, Heat Balance and Temperature": {"pre": 1.4, "mains": 1.8}, "W10. Atmospheric Circulation and Weather Systems": {"pre": 1.0, "mains": 2.7}, "W11. Water in the Atmosphere": {"pre": 0.7, "mains": 0.9}, "W12. World Climate and Climate Change": {"pre": 1.7, "mains": 2.7}, "W13. Water (Oceans)": {"pre": 2.4, "mains": 3.5}, "W14. Movements of Ocean Water": {"pre": 2.4, "mains": 2.7}, "W15. Life on the Earth": {"pre": 0.7, "mains": 0.9}, "W16. Biodiversity and Conservation": {"pre": 0.7, "mains": 0.9}, "W17. Mapping (World)": {"pre": 16.1, "mains": 0.9}, "I01. India \u2014 Location": {"pre": 1.7, "mains": 0.9}, "I02. Structure and Physiography": {"pre": 3.5, "mains": 2.7}, "I03. Drainage System": {"pre": 10.8, "mains": 1.8}, "I04. Climate": {"pre": 2.4, "mains": 2.7}, "I05. Natural Vegetation": {"pre": 1.4, "mains": 1.8}, "I06. Soils": {"pre": 1.0, "mains": 0.9}, "I07. Natural Hazards and Disasters": {"pre": 1.4, "mains": 2.7}, "I08. Mapping (India)": {"pre": 9.1, "mains": 0.9}, "H01. Human Geography \u2014 Nature and Scope": {"pre": 0.3, "mains": 0.9}, "H02. The World Population \u2014 Distribution, Density and Growth": {"pre": 0.7, "mains": 1.8}, "H03. Population Composition": {"pre": 0.3, "mains": 0.9}, "H04. Human Development": {"pre": 0.3, "mains": 0.9}, "H05. Primary Activities": {"pre": 4.5, "mains": 3.5}, "H06. Secondary Activities": {"pre": 2.8, "mains": 3.5}, "H07. Tertiary and Quaternary Activities": {"pre": 1.0, "mains": 0.9}, "H08. Transport and Communication": {"pre": 2.4, "mains": 1.8}, "H09. International Trade": {"pre": 1.0, "mains": 0.9}, "H10. Human Settlements": {"pre": 0.7, "mains": 1.8}, "E01. Population \u2014 Distribution, Density, Growth and Composition": {"pre": 0.3, "mains": 0.9}, "E02. Migration \u2014 Types, Causes and Consequences": {"pre": 0.3, "mains": 0.9}, "E03. Human Development": {"pre": 0.3, "mains": 0.9}, "E04. Human Settlements": {"pre": 0.3, "mains": 0.9}, "E05. Land Resources and Agriculture": {"pre": 4.5, "mains": 3.5}, "E06. Water Resources": {"pre": 1.7, "mains": 9.0}, "E07. Mineral and Energy Resources": {"pre": 2.4, "mains": 6.2}, "E08. Manufacturing Industries": {"pre": 5.2, "mains": 3.5}, "E09. Planning and Sustainable Development in Indian Context": {"pre": 0.7, "mains": 1.8}, "E10. Transport and Communication": {"pre": 1.0, "mains": 1.8}, "E11. International Trade": {"pre": 0.7, "mains": 1.8}, "E12. Geographical Perspective on Selected Issues and Problems": {"pre": 1.0, "mains": 6.2}}, "Indian Polity": {"I-01. Historical Background": {"pre": 2.0, "mains": 0.7}, "I-02. Making of the Constitution": {"pre": 1.4, "mains": 0.7}, "I-03. Concept of the Constitution": {"pre": 1.0, "mains": 0.7}, "I-04. Salient Features of the Constitution": {"pre": 2.7, "mains": 1.4}, "I-05. Preamble of the Constitution": {"pre": 2.0, "mains": 0.7}, "I-06. Union and Its Territory": {"pre": 1.4, "mains": 0.7}, "I-07. Citizenship": {"pre": 1.7, "mains": 0.7}, "I-08. Fundamental Rights": {"pre": 6.4, "mains": 4.8}, "I-09. Directive Principles of State Policy": {"pre": 2.7, "mains": 1.4}, "I-10. Fundamental Duties": {"pre": 2.0, "mains": 0.7}, "I-11. Amendment of the Constitution": {"pre": 2.7, "mains": 2.0}, "I-12. Basic Structure of the Constitution": {"pre": 1.4, "mains": 2.0}, "II-01. Parliamentary System": {"pre": 2.0, "mains": 1.4}, "II-02. Federal System": {"pre": 2.7, "mains": 2.0}, "II-03. Centre\u2013State Relations": {"pre": 1.7, "mains": 4.7}, "II-04. Inter-State Relations": {"pre": 1.0, "mains": 0.7}, "II-05. Emergency Provisions": {"pre": 1.4, "mains": 2.0}, "III-E1. President": {"pre": 3.4, "mains": 1.4}, "III-E2. Vice-President": {"pre": 1.0, "mains": 0.7}, "III-E3. Prime Minister": {"pre": 1.4, "mains": 0.7}, "III-E4. Central Council of Ministers": {"pre": 1.4, "mains": 0.7}, "III-E5. Cabinet Committees": {"pre": 0.7, "mains": 0.7}, "III-L1. Parliament": {"pre": 4.1, "mains": 3.4}, "III-L2. Parliamentary Committees": {"pre": 1.7, "mains": 2.7}, "III-L3. Parliamentary Forums": {"pre": 0.3, "mains": 0.7}, "III-J1. Supreme Court": {"pre": 6.1, "mains": 3.4}, "III-J2. Judicial Review": {"pre": 4.1, "mains": 2.0}, "III-J3. Judicial Activism": {"pre": 2.7, "mains": 2.0}, "III-J4. Public Interest Litigation": {"pre": 1.7, "mains": 1.4}, "IV-01. Governor": {"pre": 2.7, "mains": 0.7}, "IV-02. Chief Minister": {"pre": 0.7, "mains": 0.7}, "IV-03. State Council of Ministers": {"pre": 0.3, "mains": 0.7}, "IV-04. State Legislature": {"pre": 1.4, "mains": 1.4}, "IV-05. High Court": {"pre": 2.0, "mains": 0.7}, "IV-06. Subordinate Courts": {"pre": 0.7, "mains": 0.7}, "V-01. Panchayati Raj": {"pre": 2.0, "mains": 4.7}, "V-02. Municipalities": {"pre": 0.7, "mains": 1.4}, "VI-01. Union Territories": {"pre": 0.7, "mains": 0.7}, "VI-02. Special Status of Jammu and Kashmir": {"pre": 1.0, "mains": 1.4}, "VI-03. Scheduled and Tribal Areas": {"pre": 0.7, "mains": 0.7}, "VII-01. Election Commission": {"pre": 1.7, "mains": 2.0}, "VII-02. Union Public Service Commission": {"pre": 1.4, "mains": 0.7}, "VII-03. State Public Service Commission": {"pre": 0.3, "mains": 0.7}, "VII-04. Finance Commission": {"pre": 1.0, "mains": 2.7}, "VII-05. National Commission for SCs": {"pre": 0.7, "mains": 0.7}, "VII-06. National Commission for STs": {"pre": 0.3, "mains": 0.7}, "VII-07. National Commission for BCs": {"pre": 0.3, "mains": 0.7}, "VII-08. Special Officer for Linguistic Minorities": {"pre": 0.3, "mains": 0.7}, "VII-09. Comptroller and Auditor General": {"pre": 0.7, "mains": 2.0}, "VIII-01. NITI Aayog": {"pre": 0.7, "mains": 0.7}, "VIII-02. National Human Rights Commission": {"pre": 0.7, "mains": 1.4}, "VIII-03. State Human Rights Commission": {"pre": 0.3, "mains": 0.7}, "VIII-04. Central Information Commission": {"pre": 0.7, "mains": 0.7}, "VIII-05. State Information Commission": {"pre": 0.3, "mains": 0.7}, "VIII-06. Central Vigilance Commission": {"pre": 0.3, "mains": 0.7}, "VIII-07. Central Bureau of Investigation": {"pre": 0.7, "mains": 0.7}, "VIII-08. Lokpal and Lokayuktas": {"pre": 0.7, "mains": 0.7}, "IX-01. Tribunals": {"pre": 1.0, "mains": 2.0}, "IX-02. National Company Law Tribunal": {"pre": 0.3, "mains": 0.7}, "IX-03. Goods and Services Tax Council": {"pre": 0.3, "mains": 1.4}, "IX-04. Official Language": {"pre": 0.3, "mains": 0.7}, "IX-05. Public Services": {"pre": 0.3, "mains": 0.7}, "IX-06. Rights and Liabilities of the Government": {"pre": 0.3, "mains": 0.7}, "IX-07. Attorney General of India": {"pre": 0.3, "mains": 1.4}, "IX-08. Advocate General of State": {"pre": 0.3, "mains": 0.7}, "X-01. Political Parties": {"pre": 1.4, "mains": 1.4}, "X-02. Anti-Defection Law": {"pre": 1.0, "mains": 0.7}, "X-03. Elections": {"pre": 2.0, "mains": 2.0}, "X-04. Electoral Reforms": {"pre": 1.4, "mains": 2.0}, "X-05. Voting Behaviour": {"pre": 0.7, "mains": 0.7}, "X-06. Regional Parties": {"pre": 0.7, "mains": 0.7}, "X-07. Coalition Government": {"pre": 0.3, "mains": 0.7}, "X-08. National Integration": {"pre": 0.3, "mains": 0.7}, "XI-01. Comparison of Constitutions": {"pre": 0.3, "mains": 4.7}}, "Governance": {"1. Government Policies and Interventions": {"mains": 6.0}, "2. Policy Formulation and Implementation": {"mains": 10.0}, "3. Development Processes and Role of NGOs": {"mains": 13.0}, "4. Self-Help Groups and Civil Society Organizations": {"mains": 13.0}, "5. Pressure Groups and Informal Associations": {"mains": 9.0}, "6. Governance and Accountability": {"mains": 11.0}, "7. Citizen Charters": {"mains": 6.0}, "8. Transparency and Accountability": {"mains": 5.0}, "9. E-Governance": {"mains": 11.0}, "10. Social Audit": {"mains": 3.0}, "11. Good Governance": {"mains": 13.0}}, "Social Justice": {"1. Welfare Schemes for Vulnerable Sections": {"mains": 13.0}, "2. Mechanisms for Protection of Vulnerable Sections": {"mains": 9.0}, "3. Issues Related to Poverty": {"mains": 11.0}, "4. Issues Related to Hunger and Malnutrition": {"mains": 7.0}, "5. Issues Related to Health": {"mains": 15.0}, "6. Issues Related to Education": {"mains": 11.0}, "7. Issues Related to Human Resources": {"mains": 4.0}, "8. Issues Related to Women": {"mains": 15.0}, "9. Issues Related to Children": {"mains": 7.0}, "10. Issues Related to SC/ST": {"mains": 1.0}, "11. Issues Related to Minorities": {"mains": 1.0}, "12. Issues Related to Elderly and Disabled": {"mains": 6.0}}, "International Relations": {"1. India and Its Neighbourhood": {"mains": 25.0}, "2. India and Superpowers (P5+1)": {"mains": 7.0}, "3. Other Bilateral Relations": {"mains": 9.0}, "4. Regional Groupings and Agreements": {"mains": 18.0}, "5. Global Institutions": {"mains": 17.0}, "6. International Treaties and Agreements": {"mains": 5.0}, "7. Diaspora": {"mains": 5.0}, "8. Effects of Policies and Politics of Developed and Developing Countries": {"mains": 7.0}, "9. Important International Events": {"mains": 7.0}}, "Indian Economy": {"1. National Income": {"pre": 2.1, "mains": 1.5}, "2. Economic Growth versus Economic Development": {"pre": 1.8, "mains": 1.5}, "3. Poverty, Inequality and Unemployment": {"pre": 2.6, "mains": 6.6}, "4. Inflation": {"pre": 2.1, "mains": 2.9}, "5. Population and Demographic Dividend": {"pre": 1.6, "mains": 1.5}, "6. Skill Development": {"pre": 0.8, "mains": 1.5}, "7. Unemployment and Labour Reforms": {"pre": 2.1, "mains": 5.1}, "8. Care Economy and Gender Transformative Approach": {"pre": 0.5, "mains": 0.7}, "9. Sustainable Development and Climate Change": {"pre": 0.5, "mains": 1.5}, "10. Indian Tax Structure": {"pre": 7.4, "mains": 3.7}, "11. Public Finance": {"pre": 5.3, "mains": 4.4}, "12. Economic Planning in India": {"pre": 2.1, "mains": 1.5}, "13. Money Demand and Money Supply": {"pre": 4.7, "mains": 0.7}, "14. Banking Sector in India": {"pre": 7.4, "mains": 0.7}, "15. Financial Market": {"pre": 3.7, "mains": 0.7}, "16. Technology and Finance": {"pre": 1.6, "mains": 0.7}, "17. Co-operative Sector in Indian Economy": {"pre": 0.8, "mains": 0.7}, "18. Insurance Sector of India": {"pre": 2.1, "mains": 0.7}, "19. India's Booming Gig and Platform Economy": {"pre": 1.1, "mains": 0.7}, "20. Indian Industry": {"pre": 2.6, "mains": 5.1}, "21. MSME Sector": {"pre": 1.6, "mains": 1.5}, "22. Food Processing Industry in India": {"pre": 1.1, "mains": 3.7}, "23. Service Sector": {"pre": 1.3, "mains": 0.7}, "24. Infrastructure": {"pre": 1.8, "mains": 7.4}, "25. Power and Energy Sector of India": {"pre": 1.3, "mains": 2.9}, "26. Investment Models": {"pre": 1.6, "mains": 2.2}, "27. Health and Education": {"pre": 0.8, "mains": 0.7}, "28. Balance of Payments": {"pre": 4.7, "mains": 2.2}, "29. India's Foreign Exchange and Foreign Trade": {"pre": 9.2, "mains": 1.5}, "30. International Economic Institutions": {"pre": 7.4, "mains": 1.5}, "31. Agriculture and Allied Sectors in India": {"pre": 5.3, "mains": 13.5}, "32. Food Security and Food Management": {"pre": 3.9, "mains": 5.9}, "33. Land Reforms in India": {"pre": 3.2, "mains": 5.1}, "34. Irrigation in India": {"pre": 3.9, "mains": 8.8}}, "Environment": {"1. Environment, Habitat and Ecosystem": {"pre": 2.6, "mains": 2.1}, "2. Ecology \u2014 Principles and Organizations": {"pre": 2.6, "mains": 2.1}, "3. Functions of an Ecosystem": {"pre": 3.2, "mains": 2.1}, "4. Energy Flow through an Ecosystem": {"pre": 3.9, "mains": 2.1}, "5. Biogeochemical (Nutrient) Cycles": {"pre": 2.6, "mains": 2.1}, "6. Natural Ecosystems": {"pre": 1.9, "mains": 2.1}, "7. Wetland Ecosystem": {"pre": 2.6, "mains": 4.2}, "8. Evolution of the Biosphere": {"pre": 1.6, "mains": 2.1}, "9. Biodiversity and Its Loss": {"pre": 5.8, "mains": 2.1}, "10. Biodiversity Conservation": {"pre": 4.8, "mains": 2.1}, "11. Wildlife Conservation": {"pre": 6.4, "mains": 2.1}, "12. Global Environmental Issues and Environmental Degradation": {"pre": 3.2, "mains": 6.2}, "13. Air Pollution": {"pre": 4.8, "mains": 6.2}, "14. Water Pollution and Marine Pollution": {"pre": 4.5, "mains": 6.2}, "15. Radioactive Pollution": {"pre": 1.3, "mains": 2.1}, "16. Solid Wastes": {"pre": 2.6, "mains": 2.1}, "17. Hazardous Waste": {"pre": 1.9, "mains": 2.1}, "18. E-Waste or Electronic Waste": {"pre": 2.3, "mains": 2.1}, "19. Land Degradation": {"pre": 2.6, "mains": 2.1}, "20. Global Warming and Climate Change": {"pre": 7.1, "mains": 8.3}, "21. International Environmental Conventions, NGOs and Laws": {"pre": 9.5, "mains": 8.3}, "22. National Environmental Legislations": {"pre": 4.8, "mains": 4.2}, "23. Green Revolution, Sustainable and Modern Agricultural Practices": {"pre": 3.9, "mains": 4.2}, "24. Sources of Energy": {"pre": 4.5, "mains": 10.3}, "25. Water Conservation": {"pre": 3.2, "mains": 8.3}, "26. Protected Area Network": {"pre": 5.8, "mains": 2.1}}, "Science and Technology": {"1. Information and Communication Technology (ICT)": {"pre": 9.4, "mains": 10.2}, "2. Artificial Intelligence and Emerging Technologies": {"pre": 7.3, "mains": 8.2}, "3. Robotics and Automation": {"pre": 2.6, "mains": 4.1}, "4. Space Technology": {"pre": 14.7, "mains": 12.3}, "5. Defence Technology": {"pre": 4.2, "mains": 2.0}, "6. Achievements of India in Science and Technology": {"pre": 6.8, "mains": 4.1}, "7. Biotechnology": {"pre": 10.5, "mains": 6.1}, "8. Nanotechnology": {"pre": 4.2, "mains": 6.1}, "9. Health and Medical Technology": {"pre": 11.5, "mains": 12.2}, "10. Agriculture and Food Technology": {"pre": 7.3, "mains": 6.1}, "11. Nuclear Technology": {"pre": 6.3, "mains": 4.1}, "12. Energy Technology": {"pre": 7.9, "mains": 10.2}, "13. Environmental and Climate Technology": {"pre": 4.2, "mains": 4.1}, "14. Intellectual Property Rights (IPR) and Technology Policy": {"pre": 3.1, "mains": 10.2}}, "Internal Security": {"1. Cyber Security and Role of Social Media": {"mains": 20.0}, "2. Security Challenges and Their Management in Border Areas": {"mains": 19.0}, "3. Terrorism \u2014 Role of External State and Non-State Actors": {"mains": 16.0}, "4. Left-Wing Extremism \u2014 A War Upon the State": {"mains": 11.0}, "5. Internal Security": {"mains": 8.0}, "6. Insurgency in the North-East": {"mains": 6.0}, "7. Linkages between Development and Spread of Extremism": {"mains": 5.0}, "8. Organised Crime": {"mains": 5.0}, "9. Contemporary Issues in Internal Security": {"mains": 5.0}, "10. Jammu and Kashmir Militancy": {"mains": 3.0}, "11. Communal Violence": {"mains": 1.0}, "12. Security Forces and Their Mandate": {"mains": 1.0}}, "Disaster Management": {"1. Disaster Mitigation, Response and Recovery": {"mains": 38.0}, "2. Disaster Risk, Vulnerability and Preparedness": {"mains": 25.0}, "3. Disaster Management \u2014 Concepts, Types and Framework": {"mains": 13.0}, "4. Institutional Mechanisms and Governance in Disaster Management": {"mains": 12.0}, "5. Technology, Community Participation and Disaster Risk Reduction": {"mains": 12.0}}, "Ethics Theory": {"1. Contributions of Moral Thinkers and Philosophers": {"mains": 27.0}, "2. Public / Civil Service Values and Ethics in Public Administration": {"mains": 22.0}, "3. Probity in Governance": {"mains": 20.0}, "4. Ethics and Human Interface": {"mains": 15.0}, "5. Emotional Intelligence": {"mains": 7.0}, "6. Attitude": {"mains": 6.0}, "7. Aptitude and Foundational Values for Civil Service": {"mains": 3.0}}, "Ethics Case Studies": {"1. Integrity and Whistleblowing": {"mains": 12.7}, "2. Conflict of Interest and Corruption": {"mains": 12.7}, "3. Crisis Management and Disaster Response": {"mains": 11.8}, "4. Corporate Ethics and Business Dilemmas": {"mains": 10.8}, "5. Environmental Ethics": {"mains": 8.8}, "6. Social Justice and Welfare": {"mains": 8.8}, "7. Law Enforcement and Security Ethics": {"mains": 8.8}, "8. Workplace Harassment and Gender Justice": {"mains": 8.8}, "9. Public Safety and Professional Ethics": {"mains": 6.9}, "10. Civil Service Values and Political Interference": {"mains": 5.9}, "11. Media Ethics and Transparency": {"mains": 2.0}, "12. Healthcare and Research Ethics": {"mains": 2.0}}};

const CHAPTER_SECTIONS = {
  "Geography": {
    "World Physical Geography": ["W01.","W02.","W03.","W04.","W05.","W06.","W07.","W08.","W09.","W10.","W11.","W12.","W13.","W14.","W15.","W16.","W17."],
    "Indian Geography":         ["I01.","I02.","I03.","I04.","I05.","I06.","I07.","I08."],
    "Human Geography":          ["H01.","H02.","H03.","H04.","H05.","H06.","H07.","H08.","H09.","H10."],
    "Economic Geography":       ["E01.","E02.","E03.","E04.","E05.","E06.","E07.","E08.","E09.","E10.","E11.","E12."],
  }
};

const PYQ_YEAR_DATA = {"Ancient India": {"pre": {"2005": 1, "2006": 3, "2011": 3, "2012": 2, "2013": 1, "2014": 1, "2016": 2, "2017": 1, "2019": 2, "2020": 6, "2021": 2, "2022": 2, "2023": 2, "2025": 5}, "mains": {}}, "Medieval History": {"pre": {"2005": 1, "2006": 6, "2008": 1, "2009": 1, "2010": 2, "2014": 2, "2015": 4, "2016": 3, "2019": 2, "2020": 1, "2021": 4, "2022": 5, "2023": 2, "2024": 1}, "mains": {}}, "Art and Culture": {"pre": {"2005": 1, "2006": 12, "2007": 1, "2008": 6, "2009": 12, "2010": 3, "2011": 1, "2012": 7, "2013": 10, "2014": 17, "2015": 2, "2016": 6, "2017": 5, "2018": 8, "2019": 6, "2020": 4, "2021": 8, "2022": 6, "2023": 7, "2024": 7, "2025": 3}, "mains": {"2013": 3, "2014": 4, "2015": 2, "2016": 2, "2017": 1, "2018": 3, "2019": 1, "2020": 4, "2021": 1, "2022": 3, "2023": 1, "2024": 2, "2025": 3}}, "Indian Society": {"pre": {}, "mains": {"2013": 5, "2014": 4, "2015": 7, "2016": 8, "2017": 6, "2018": 7, "2019": 6, "2020": 6, "2021": 6, "2022": 6, "2023": 5, "2024": 9, "2025": 8}}, "Modern History": {"pre": {"2005": 21, "2006": 8, "2007": 11, "2008": 12, "2009": 12, "2010": 9, "2011": 8, "2012": 12, "2013": 6, "2014": 5, "2015": 8, "2016": 6, "2017": 7, "2018": 13, "2019": 6, "2020": 8, "2021": 8, "2022": 3, "2023": 2, "2024": 3, "2025": 7}, "mains": {"2013": 4, "2014": 3, "2015": 3, "2016": 3, "2017": 4, "2018": 2, "2019": 3, "2020": 3, "2021": 3, "2022": 3, "2023": 2, "2024": 2, "2025": 2}}, "Post Independent History": {"pre": {}, "mains": {"2013": 3, "2021": 1, "2022": 1, "2025": 4}}, "World History": {"pre": {}, "mains": {"2013": 4, "2014": 2, "2015": 2, "2016": 1, "2017": 1, "2019": 1, "2021": 1, "2023": 1, "2024": 1, "2025": 1}}, "Geography": {"pre": {"2005": 19, "2006": 14, "2007": 19, "2008": 17, "2009": 12, "2010": 19, "2011": 12, "2012": 10, "2013": 8, "2014": 11, "2015": 8, "2016": 3, "2017": 7, "2018": 7, "2019": 9, "2020": 9, "2021": 10, "2022": 8, "2023": 12, "2024": 12, "2025": 17}, "mains": {"2013": 8, "2014": 10, "2015": 8, "2016": 10, "2017": 9, "2018": 9, "2019": 8, "2020": 9, "2021": 8, "2022": 8, "2023": 7, "2024": 6, "2025": 7}}, "Indian Polity": {"pre": {"2005": 9, "2006": 10, "2007": 12, "2008": 10, "2009": 11, "2010": 7, "2011": 6, "2012": 15, "2013": 14, "2014": 10, "2015": 12, "2016": 9, "2017": 20, "2018": 14, "2019": 13, "2020": 14, "2021": 15, "2022": 10, "2023": 13, "2024": 14, "2025": 15}, "mains": {"2013": 9, "2014": 8, "2015": 8, "2016": 9, "2017": 9, "2018": 11, "2019": 8, "2020": 9, "2021": 9, "2022": 9, "2023": 8, "2024": 10, "2025": 10}}, "Governance": {"pre": {}, "mains": {"2013": 9, "2014": 8, "2015": 7, "2016": 5, "2017": 5, "2018": 3, "2019": 6, "2020": 6, "2021": 5, "2022": 4, "2023": 6, "2024": 5, "2025": 8}}, "Social Justice": {"pre": {}, "mains": {"2013": 1, "2014": 1, "2015": 4, "2017": 4, "2019": 2, "2020": 3, "2021": 4, "2022": 3, "2023": 2, "2024": 3, "2025": 7}}, "International Relations": {"pre": {}, "mains": {"2013": 6, "2014": 4, "2015": 3, "2016": 4, "2017": 4, "2018": 4, "2019": 4, "2020": 4, "2021": 4, "2022": 3, "2023": 4, "2024": 5, "2025": 5}}, "Indian Economy": {"pre": {"2005": 9, "2006": 12, "2007": 10, "2008": 15, "2009": 13, "2010": 32, "2011": 27, "2012": 16, "2013": 22, "2014": 11, "2015": 20, "2016": 28, "2017": 27, "2018": 25, "2019": 28, "2020": 20, "2021": 15, "2022": 19, "2023": 16, "2024": 16, "2025": 16}, "mains": {"2013": 12, "2014": 10, "2015": 11, "2016": 12, "2017": 12, "2018": 7, "2019": 7, "2020": 9, "2021": 7, "2022": 6, "2023": 8, "2024": 12, "2025": 15}}, "Environment": {"pre": {"2005": 4, "2006": 3, "2007": 5, "2008": 12, "2009": 9, "2010": 19, "2011": 19, "2012": 20, "2013": 17, "2014": 24, "2015": 19, "2016": 17, "2017": 14, "2018": 12, "2019": 18, "2020": 18, "2021": 15, "2022": 17, "2023": 18, "2024": 19, "2025": 9}, "mains": {"2013": 4, "2014": 2, "2015": 2, "2016": 2, "2017": 3, "2018": 4, "2019": 2, "2020": 4, "2021": 3, "2022": 6, "2023": 4, "2024": 4, "2025": 5}}, "Science and Technology": {"pre": {"2005": 3, "2006": 5, "2007": 7, "2008": 6, "2009": 5, "2010": 9, "2011": 12, "2012": 9, "2013": 15, "2014": 10, "2015": 7, "2016": 7, "2017": 8, "2018": 13, "2019": 11, "2020": 11, "2021": 11, "2022": 14, "2023": 9, "2024": 6, "2025": 13}, "mains": {"2013": 5, "2014": 4, "2015": 4, "2016": 4, "2017": 4, "2018": 4, "2019": 3, "2020": 5, "2021": 3, "2022": 7, "2023": 4, "2024": 3, "2025": 5}}, "Internal Security": {"pre": {}, "mains": {"2013": 5, "2014": 4, "2015": 5, "2016": 5, "2017": 4, "2018": 5, "2019": 5, "2020": 4, "2021": 4, "2022": 5, "2023": 4, "2024": 4, "2025": 5}}, "Disaster Management": {"pre": {}, "mains": {"2013": 1, "2014": 1, "2015": 1, "2016": 2, "2017": 1, "2018": 1, "2019": 2, "2020": 1, "2021": 2, "2022": 2, "2024": 2}}, "Ethics Theory": {"pre": {}, "mains": {"2013": 9, "2014": 10, "2015": 10, "2016": 12, "2017": 11, "2018": 11, "2019": 12, "2020": 12, "2021": 10, "2022": 12, "2023": 10, "2024": 13, "2025": 9}}, "Ethics Case Studies": {"pre": {}, "mains": {"2013": 5, "2014": 7, "2015": 6, "2016": 6, "2017": 6, "2018": 6, "2019": 6, "2020": 6, "2021": 6, "2022": 6, "2023": 6, "2024": 6, "2025": 6}}};

function SubjectsTab({ dashboard, user, onUpdate, gsSummary }) {
  const [localData, setLocalData] = useState(null);
  const [saving, setSaving]       = useState('');
  const [view, setView]           = useState(null); // null | { paper } | { paper, subject }
  const [selectedPaper, setSelectedPaper] = useState('All');
  const [openChapter, setOpenChapter] = useState(null);
  const [openTrend, setOpenTrend] = useState(null);   // subject name with open trend
  const [trendMode, setTrendMode] = useState('pre');  // 'pre' | 'mains'

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

  // Task definitions — function so it can use gs_paper context
  function getTaskDefs(gs_paper) {
    if (gs_paper === 'Optional') return [
      { key:'reading',     label:'📖 Reading',    wtKey:'reading_wt'   },
      { key:'short_notes', label:'📝 Notes',      wtKey:'notes_wt'     },
      { key:'pyq_mains',   label:'📋 PYQ Mains',  wtKey:'pyq_mains_wt' },
      { key:'revision1',   label:'🔁 Revision 1', wtKey:'rev1_wt'      },
      { key:'revision2',   label:'🔁 Revision 2', wtKey:'rev2_wt'      },
      { key:'revision3',   label:'🔁 Revision 3', wtKey:'rev3_wt'      },
    ];
    if (gs_paper === 'Essay') return [
      { key:'reading',     label:'Class/Brainstorm', emoji:'🧠', wtKey:'reading_wt'    },
      { key:'pyq_mains',   label:'Mains PYQ',        emoji:'📌', wtKey:'pyq_mains_wt'  },
      { key:'short_notes', label:'Sh. Notes',         emoji:'📝', wtKey:'notes_wt'      },
      { key:'revision1',   label:'Set 1',             emoji:'✏️', wtKey:'rev1_wt'       },
      { key:'revision2',   label:'Set 2',             emoji:'✏️', wtKey:'rev2_wt'       },
      { key:'revision3',   label:'Set 3',             emoji:'✏️', wtKey:'rev3_wt'       },
    ];
    return [
      { key:'reading',     label:'Study/Reading', emoji:'📖', wtKey:'reading_wt'    },
      { key:'short_notes', label:'Short Notes',   emoji:'📝', wtKey:'notes_wt'      },
      { key:'pyq_prelims', label:'PYQ Pre',       emoji:'📋', wtKey:'pyq_pre_wt'    },
      { key:'pyq_mains',   label:'PYQ Mains',     emoji:'📌', wtKey:'pyq_mains_wt'  },
      { key:'revision1',   label:'Revision 1',    emoji:'🔁', wtKey:'rev1_wt'       },
      { key:'revision2',   label:'Revision 2',    emoji:'🔂', wtKey:'rev2_wt'       },
      { key:'revision3',   label:'Revision 3',    emoji:'📚', wtKey:'rev3_wt'       },
    ];
  }

  // Get active tasks for a chapter — only show tasks with weight > 0
  function getChapterTasks(ch, gs_paper) {
    return getTaskDefs(gs_paper).filter(t => Number(ch[t.wtKey] || 0) > 0);
  }

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
  const studentOptional = (user?.optional || '').trim().toLowerCase();
  const grouped = {};
  data.subjects.forEach(s => {
    if (s.gs_paper === 'Optional') {
      if (!studentOptional) return;
      // "Psychology Paper 1".toLowerCase().startsWith("psychology") → true
      const subjectLower = (s.subject || '').trim().toLowerCase();
      if (!subjectLower.startsWith(studentOptional) && !subjectLower.includes(studentOptional)) return;
    }
    if (!grouped[s.gs_paper]) grouped[s.gs_paper] = [];
    grouped[s.gs_paper].push(s);
  });

  // Include Optional if student has optional set (show even if 0% progress)
  const paperOrder = ['GS Paper 1','GS Paper 2','GS Paper 3','GS Paper 4','Essay','CSAT',
    ...(studentOptional ? ['Optional'] : [])];

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
          <button onClick={() => { setView(null); setOpenChapter(null); }}
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

        {/* Essay subject-level heatmap dropdown */}
        {subj.gs_paper === 'Essay' && (
          <EssayHeatmap subject={subj.subject} chapters={subj.chapters} />
        )}

        {/* Chapter pills grid */}
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {/* Chapter list — grouped by section if applicable */}
          {(() => {
            const sections = CHAPTER_SECTIONS[subj.subject];

            const renderCh = (ch) => {
              const pct    = Math.round(ch.score * 100);
              const isOpen = openChapter === ch.chapter;
              const dotCol = pct>=70 ? col.pill : pct>=40 ? '#F57C00' : '#BDBDBD';
              return (
                <div key={ch.chapter}>
                  <div onClick={() => setOpenChapter(isOpen ? null : ch.chapter)}
                    style={{
                      display:'flex', alignItems:'center', gap:10,
                      background: isOpen ? col.bg : '#fff',
                      border:`1.5px solid ${isOpen ? col.pill : '#E8E8E8'}`,
                      borderRadius: isOpen ? '12px 12px 0 0' : 12,
                      padding:'10px 14px', cursor:'pointer', transition:'all 0.15s'
                    }}>
                    <div style={{ width:10, height:10, borderRadius:'50%', background:dotCol, flexShrink:0 }} />
                    <span style={{ flex:1, fontSize:14, fontWeight:500 }}>{ch.chapter}</span>
                    {(() => {
                      const wts = (CHAPTER_WEIGHTS[subj.subject] || {})[ch.chapter];
                      const exam = subj.exam_type || 'both';
                      if (!wts) return null;
                      return (
                        <div style={{ display:'flex', gap:3, flexShrink:0 }}>
                          {(exam === 'pre' || exam === 'both') && wts.pre && (
                            <span style={{ background:'#EEF4FF', color:'#1565C0',
                              border:'1px solid #90CAF9', fontSize:9, fontWeight:800,
                              padding:'2px 7px', borderRadius:99, whiteSpace:'nowrap' }}>
                              P {wts.pre}%
                            </span>
                          )}
                          {(exam === 'mains' || exam === 'both') && wts.mains && (
                            <span style={{ background:'#FFF3E0', color:'#E65100',
                              border:'1px solid #FFCC80', fontSize:9, fontWeight:800,
                              padding:'2px 7px', borderRadius:99, whiteSpace:'nowrap' }}>
                              M {wts.mains}%
                            </span>
                          )}
                        </div>
                      );
                    })()}
                    <span style={{
                      background: pct>=70?col.bg: pct>=40?'#FFF3E0':'#F5F5F5',
                      color: pct>=70?col.text: pct>=40?'#E65100':'#9CA3AF',
                      border:`1px solid ${pct>=70?col.pill: pct>=40?'#FB8C00':'#E0E0E0'}`,
                      padding:'3px 10px', borderRadius:99, fontSize:12, fontWeight:700, flexShrink:0
                    }}>{pct}%</span>
                    <span style={{ color: isOpen?col.text:'#D1D5DB', fontSize:11,
                      transform: isOpen?'rotate(180deg)':'none', transition:'transform 0.2s' }}>▼</span>
                  </div>
                  {isOpen && (
                    <div style={{
                      border:`1.5px solid ${col.pill}`, borderTop:'none',
                      borderRadius:'0 0 12px 12px', background: col.light, padding:'12px'
                    }}>
                      {(() => {
                        const activeTasks = getChapterTasks(ch);
                        const cols = activeTasks.length <= 4 ? activeTasks.length : 4;
                        return (
                          <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap:6, marginBottom:12 }}>
                            {activeTasks.map(t => {
                              const val  = ch[t.key];
                              const done = val === 'Done';
                              const wt   = Math.round(Number(ch[t.wtKey] || 0) * 100);
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
                                    display:'flex', flexDirection:'column', alignItems:'center', gap:2
                                  }}>
                                  <span style={{ fontSize:15 }}>{busy ? '⏳' : done ? '☑️' : t.emoji}</span>
                                  <span style={{ fontSize:10, fontWeight:600, lineHeight:1.2, textAlign:'center',
                                    color: done ? '#fff' : '#6B7280' }}>
                                    {busy ? '...' : t.label}
                                  </span>
                                  <span style={{ fontSize:9, color: done ? 'rgba(255,255,255,0.7)' : '#9CA3AF' }}>
                                    {wt}%
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        );
                      })()}
                      {subj.gs_paper !== 'CSAT' && <MicroTopicHeatmap subject={subj.subject} chapter={ch.chapter} examType={subj.exam_type} />}
                    </div>
                  )}
                </div>
              );
            };

            if (!sections) {
              return subj.chapters.map(ch => renderCh(ch));
            }

            return Object.entries(sections).map(([sectionName, prefixes]) => {
              const sectionChapters = subj.chapters.filter(ch =>
                prefixes.some(p => ch.chapter.startsWith(p))
              );
              if (!sectionChapters.length) return null;
              return (
                <div key={sectionName} style={{ marginBottom:10 }}>
                  <div style={{
                    fontSize:10, fontWeight:800, color:'#9CA3AF',
                    letterSpacing:'0.1em', textTransform:'uppercase',
                    padding:'8px 2px 5px', borderBottom:'1.5px solid #F0F0F0',
                    marginBottom:6
                  }}>{sectionName}</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                    {sectionChapters.map(ch => renderCh(ch))}
                  </div>
                </div>
              );
            });
          })()}}
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
                {/* Subject name + badge + dominant % pill */}
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:4 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:sc.text, lineHeight:1.3, flex:1 }}>
                    {subj.subject}
                  </div>
                  {(() => {
                    const exam = subj.exam_type || 'both';
                    const domPct = exam==='pre' ? (subj.pre_pct||0) : exam==='mains' ? (subj.mains_pct||0) : (subj.completion_pct||0);
                    const pillColor = exam==='pre' ? '#1565C0' : exam==='mains' ? '#E65100' : sc.dot;
                    return (
                      <span style={{ background:pillColor, color:'#fff', fontSize:11, fontWeight:800,
                        padding:'3px 9px', borderRadius:99, marginLeft:6, flexShrink:0 }}>
                        {domPct}%
                      </span>
                    );
                  })()}
                </div>
                {/* Exam badge + chapter count */}
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
                  {(() => {
                    const exam = subj.exam_type || 'both';
                    const BADGES = { 'pre':{ label:'PRE', bg:'#1565C0' }, 'mains':{ label:'MAINS', bg:'#E65100' }, 'both':{ label:'P+M', bg:'#2E7D32' } };
                    const b = BADGES[exam] || BADGES['both'];
                    return <span style={{ background:b.bg, color:'#fff', fontSize:8, fontWeight:800, padding:'2px 5px', borderRadius:3 }}>{b.label}</span>;
                  })()}
                  <span style={{ fontSize:10, color:sc.text, opacity:0.6 }}>{subj.chapters.length} chapters</span>
                </div>
                {/* Progress bars */}
                {subj.exam_type === 'both' ? (
                  <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ fontSize:9, color:'#1565C0', fontWeight:700, width:14 }}>P</span>
                      <div style={{ flex:1, background:'rgba(0,0,0,0.1)', borderRadius:99, height:5 }}>
                        <div style={{ width:`${subj.pre_pct||0}%`, height:5, background:'#1565C0', borderRadius:99 }} />
                      </div>
                      <span style={{ fontSize:9, fontWeight:800, color:'#1565C0', width:22, textAlign:'right' }}>{subj.pre_pct||0}%</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <span style={{ fontSize:9, color:'#E65100', fontWeight:700, width:14 }}>M</span>
                      <div style={{ flex:1, background:'rgba(0,0,0,0.1)', borderRadius:99, height:5 }}>
                        <div style={{ width:`${subj.mains_pct||0}%`, height:5, background:'#E65100', borderRadius:99 }} />
                      </div>
                      <span style={{ fontSize:9, fontWeight:800, color:'#E65100', width:22, textAlign:'right' }}>{subj.mains_pct||0}%</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ flex:1, background:'rgba(0,0,0,0.1)', borderRadius:99, height:5 }}>
                      <div style={{ width:`${subj.exam_type==='pre' ? (subj.pre_pct||0) : (subj.mains_pct||0)}%`, height:5,
                        background: subj.exam_type==='pre' ? '#1565C0' : '#E65100', borderRadius:99 }} />
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

  // ── Home: Flat subject list ──
  // Paper label map
  const PAPER_LABEL = {
    'GS Paper 1':'GS1','GS Paper 2':'GS2','GS Paper 3':'GS3',
    'GS Paper 4':'GS4','Essay':'Essay','CSAT':'CSAT','Optional':'Opt'
  };
  const EXAM_BADGE = {
    'pre':   { label:'PRE',    bg:'#1565C0', color:'#fff' },
    'mains': { label:'MAINS',  bg:'#E65100', color:'#fff' },
    'both':  { label:'Pre+Mains', bg:'#2E7D32', color:'#fff' },
  };

  // Flat ordered subject list
  // Deduplicate by subject name (in case old sheet rows linger)
  const _seen = new Set();
  const SECTION_LABELS = [
    { key:'All',         label:'All Subjects' },
    { key:'GS Paper 1',  label:'GS 1 — History, Geography & Society' },
    { key:'GS Paper 2',  label:'GS 2 — Polity, Governance & IR' },
    { key:'GS Paper 3',  label:'GS 3 — Economy, Environment & S&T' },
    { key:'GS Paper 4',  label:'GS 4 — Ethics' },
    { key:'Essay',       label:'Essay' },
    { key:'CSAT',        label:'CSAT' },
    { key:'Optional',    label:'Optional' },
  ];
  const filteredPapers = selectedPaper === 'All' ? paperOrder : [selectedPaper];
  const allSubjects = filteredPapers.flatMap(p => grouped[p] || []).filter(s => {
    if (_seen.has(s.subject)) return false;
    _seen.add(s.subject);
    return true;
  });

  // TrendChart component inline
  function TrendChart({ subjectName, examType }) {
    const [mode, setMode] = React.useState(examType === 'mains' ? 'mains' : 'pre');
    const ydata = PYQ_YEAR_DATA[subjectName] || {};
    const srcData = examType === 'both'
      ? (mode === 'mains' ? (ydata.mains || {}) : (ydata.pre || {}))
      : (examType === 'mains' ? (ydata.mains || {}) : (ydata.pre || {}));
    const allYears = Object.keys(srcData).filter(y => srcData[y] > 0).map(Number).sort();
    if (!allYears.length) return (
      <div style={{fontSize:12,color:'#9CA3AF',padding:'8px 0',textAlign:'center'}}>
        No year-wise PYQ data available yet
      </div>
    );
    const maxVal = Math.max(1, ...allYears.map(y => srcData[y]||0));
    const barColor = mode === 'mains' ? '#E65100' : '#1565C0';
    const CHART_H = 70;
    return (
      <div style={{marginTop:8}}>
        {examType === 'both' && (
          <div style={{display:'flex',gap:6,marginBottom:8}}>
            {['pre','mains'].map(m => (
              <button key={m} onClick={e=>{e.stopPropagation();setMode(m);}}
                style={{padding:'3px 10px',borderRadius:99,border:'none',cursor:'pointer',fontSize:11,fontWeight:700,
                  background: mode===m ? (m==='mains'?'#E65100':'#1565C0') : '#F3F4F6',
                  color: mode===m ? '#fff' : '#6B7280'}}>
                {m==='pre'?'Prelims':'Mains'}
              </button>
            ))}
          </div>
        )}
        <div style={{overflowX:'auto'}}>
          <div style={{display:'flex',alignItems:'flex-end',gap:4,minWidth: allYears.length * 34, paddingBottom:4}}>
            {allYears.map(y => {
              const val = srcData[y] || 0;
              const barH = maxVal > 0 ? Math.max(6, Math.round((val/maxVal)*60)) : 6;
              return (
                <div key={y} style={{display:'flex',flexDirection:'column',alignItems:'center',flex:'1 0 30px'}}>
                  <div style={{fontSize:10,color:barColor,fontWeight:800,marginBottom:3,lineHeight:1}}>{val}</div>
                  <div style={{width:'100%',height:barH,background:barColor,borderRadius:'3px 3px 0 0'}}/>
                  <div style={{fontSize:9,color:'#6B7280',marginTop:5,fontWeight:600,whiteSpace:'nowrap'}}>{y}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{fontSize:10,color:'#9CA3AF',marginTop:4}}>
          Estimated {mode==='mains'?'Mains':'Prelims'} questions per year
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      {/* Collapsible sections — only shown in flat list view (not inside a subject) */}
      {!view && (() => {
        const optSubjects = (grouped['Optional'] || []).map(s => s.subject).join(' & ') || 'Optional Subject';
        const SECTIONS = [
          { key:'GS Paper 1', label:'General Studies 1', subtitle:'History, Geography, Society & Culture',           color:'#2E7D32', bg:'#E8F5E9', light:'#F1FBF2' },
          { key:'GS Paper 2', label:'General Studies 2', subtitle:'Polity, Governance, Social Justice & IR',         color:'#1565C0', bg:'#E3F0FF', light:'#EEF6FF' },
          { key:'GS Paper 3', label:'General Studies 3', subtitle:'Economy, Environment, S&T, ISC & Disaster Mgmt',  color:'#BF6000', bg:'#FFF3E0', light:'#FFF8F0' },
          { key:'GS Paper 4', label:'General Studies 4', subtitle:'Ethics, Integrity & Aptitude',                    color:'#6A1B9A', bg:'#F3E5FF', light:'#FAF0FF' },
          { key:'Essay',      label:'Essay',             subtitle:'Socio-Politico-Economic & Philosophical',          color:'#00695C', bg:'#E0F2F1', light:'#F0FAFA' },
          { key:'CSAT',       label:'CSAT',              subtitle:'Basic Numeracy, Reasoning & Reading Comprehension',color:'#1565C0', bg:'#E8EAF6', light:'#F3F4FC' },
          { key:'Optional',   label:'Optional',          subtitle: optSubjects,                                       color:'#7B3F00', bg:'#FFF8F0', light:'#FFFAF5' },
        ];
        return SECTIONS.map(sec => {
          const subjects = grouped[sec.key] || [];
          if (subjects.length === 0) return null;
          const isOpen = selectedPaper === sec.key;
          // Overall completion for this section
          const avgPct = subjects.length
            ? Math.round(subjects.reduce((sum, s) => sum + (s.completion_pct || 0), 0) / subjects.length * 100)
            : 0;
          return (
            <div key={sec.key} style={{ borderRadius:14, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.07)' }}>
              {/* Section header */}
              <div onClick={() => setSelectedPaper(isOpen ? '' : sec.key)}
                style={{
                  display:'flex', alignItems:'center', gap:10,
                  background: isOpen ? sec.color : sec.bg,
                  padding:'13px 16px', cursor:'pointer', transition:'all 0.2s'
                }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:800, color: isOpen ? '#fff' : sec.color }}>{sec.label}</div>
                  <div style={{ fontSize:11, color: isOpen ? 'rgba(255,255,255,0.75)' : '#9CA3AF', marginTop:1 }}>{sec.subtitle}</div>
                </div>
                <span style={{
                  fontSize:10, fontWeight:800, padding:'3px 9px', borderRadius:99,
                  background: isOpen ? 'rgba(255,255,255,0.2)' : sec.color + '20',
                  color: isOpen ? '#fff' : sec.color
                }}>{subjects.length} subjects</span>
                <span style={{
                  fontSize:10, fontWeight:800, padding:'3px 9px', borderRadius:99,
                  background: isOpen ? 'rgba(255,255,255,0.2)' : (avgPct >= 70 ? sec.color + '30' : '#F3F4F6'),
                  color: isOpen ? '#fff' : (avgPct >= 70 ? sec.color : '#9CA3AF')
                }}>{avgPct}%</span>
                <span style={{ color: isOpen ? '#fff' : sec.color, fontSize:12,
                  transform: isOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }}>▼</span>
              </div>
              {/* Subjects list inside section */}
              {isOpen && (
                <div style={{ background: sec.light, display:'flex', flexDirection:'column', gap:8, padding:'10px 10px' }}>
                  {subjects.map((subj, idx) => {
                    const col    = PAPER_COL[subj.gs_paper] || PAPER_COL['GS Paper 1'];
                    const exam   = subj.exam_type || 'both';
                    const badge  = EXAM_BADGE[exam] || EXAM_BADGE['both'];
                    const isOpenTrend2 = openTrend === subj.subject;
                    const hasPYQ = !!PYQ_YEAR_DATA[subj.subject];
                    return (
                      <div key={subj.subject} style={{
                        background:'#fff', borderRadius:12, padding:'12px 14px',
                        boxShadow:'0 1px 4px rgba(0,0,0,0.06)',
                        borderLeft:`4px solid ${sec.color}`
                      }}>
                        {/* Row 1: name + pills */}
                        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6,flexWrap:'wrap'}}>
                          <div style={{flex:1,fontSize:14,fontWeight:700,color:'#1B3A6B',cursor:'pointer',minWidth:100}}
                            onClick={() => { setView({ paper: subj.gs_paper, subject: subj.subject }); setOpenChapter(null); }}>
                            {subj.subject}
                          </div>
                          <span style={{background:badge.bg,color:badge.color,
                            fontSize:10,fontWeight:800,padding:'2px 7px',borderRadius:99,flexShrink:0}}>
                            {badge.label}
                          </span>
                        </div>
                        {/* Progress bar(s) */}
                        {exam === 'both' ? (
                          <div style={{display:'flex',flexDirection:'column',gap:4,marginBottom:6}}>
                            {[{label:'P',pct:(subj.pre_pct||0),color:'#1565C0'},{label:'M',pct:(subj.mains_pct||0),color:'#E65100'}].map(({label,pct,color})=>(
                              <div key={label} style={{display:'flex',alignItems:'center',gap:6}}>
                                <span style={{fontSize:9,fontWeight:800,color,width:10}}>{label}</span>
                                <div style={{flex:1,height:5,background:'#F0F0F0',borderRadius:99}}>
                                  <div style={{height:'100%',width:`${pct}%`,background:color,borderRadius:99,transition:'width 0.4s'}}/>
                                </div>
                                <span style={{fontSize:10,fontWeight:700,color,width:30,textAlign:'right'}}>{pct}%</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}>
                            <div style={{flex:1,height:6,background:'#F0F0F0',borderRadius:99}}>
                              <div style={{height:'100%',width:`${subj.completion_pct||0}%`,
                                background:exam==='mains'?'#E65100':'#1565C0',borderRadius:99,transition:'width 0.4s'}}/>
                            </div>
                            <span style={{fontSize:11,fontWeight:700,color:exam==='mains'?'#E65100':'#1565C0',width:35,textAlign:'right'}}>
                              {subj.completion_pct||0}%
                            </span>
                          </div>
                        )}
                        {/* PYQ Trend toggle */}
                        {hasPYQ && (
                          <div>
                            <button onClick={e=>{e.stopPropagation();setOpenTrend(isOpenTrend2?null:subj.subject);}}
                              style={{display:'flex',alignItems:'center',gap:5,padding:'4px 10px',
                                border:`1px solid ${sec.color}40`,borderRadius:99,background:isOpenTrend2?sec.color+'15':'#fff',
                                cursor:'pointer',fontSize:11,fontWeight:600,color:sec.color}}>
                              <span>📊</span> PYQ Trend
                            </button>
                            {isOpenTrend2 && (
                              <div style={{marginTop:8,padding:'8px 0'}}>
                                <TrendChart subjectName={subj.subject} examType={exam} />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        });
      })()}
      {false && allSubjects.map((subj, idx) => {
        const col     = PAPER_COL[subj.gs_paper] || PAPER_COL['GS Paper 1'];
        const sc      = SUBJ_COLORS[idx % SUBJ_COLORS.length];
        const exam    = subj.exam_type || 'both';
        const badge   = EXAM_BADGE[exam] || EXAM_BADGE['both'];
        const paperLbl = PAPER_LABEL[subj.gs_paper] || subj.gs_paper;
        const isOpen  = openTrend === subj.subject;
        const hasPYQ  = !!PYQ_YEAR_DATA[subj.subject];
        return (
          <div key={subj.subject} style={{
            background:'#fff', borderRadius:14, padding:'14px 16px',
            boxShadow:'0 2px 8px rgba(0,0,0,0.07)',
            borderLeft:`4px solid ${col.top}`
          }}>
            {/* Row 1: name + pills */}
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,flexWrap:'wrap'}}>
              <div style={{flex:1,fontSize:14,fontWeight:700,color:'#1B3A6B',cursor:'pointer',minWidth:100}}
                onClick={() => { setView({ paper: subj.gs_paper, subject: subj.subject }); setOpenChapter(null); }}>
                {subj.subject}
              </div>
              {/* Paper pill */}
              <span style={{background:col.bg,color:col.text,border:`1px solid ${col.pill}`,
                fontSize:10,fontWeight:800,padding:'2px 7px',borderRadius:99,flexShrink:0}}>
                {paperLbl}
              </span>
              {/* Exam type pill */}
              <span style={{background:badge.bg,color:badge.color,
                fontSize:10,fontWeight:800,padding:'2px 7px',borderRadius:99,flexShrink:0}}>
                {badge.label}
              </span>
            </div>
            {/* Row 2: progress bar(s) */}
            {exam === 'both' ? (
              <div style={{display:'flex',flexDirection:'column',gap:4,marginBottom:8}}
                onClick={() => { setView({ paper: subj.gs_paper, subject: subj.subject }); setOpenChapter(null); }}
                style2={{cursor:'pointer'}}>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <span style={{fontSize:9,fontWeight:700,color:'#1565C0',width:8}}>P</span>
                  <div style={{flex:1,background:'#E8EEF6',borderRadius:99,height:6}}>
                    <div style={{width:`${subj.pre_pct||0}%`,height:6,background:'#1565C0',borderRadius:99}}/>
                  </div>
                  <span style={{fontSize:10,fontWeight:800,color:'#1565C0',width:26,textAlign:'right'}}>{subj.pre_pct||0}%</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <span style={{fontSize:9,fontWeight:700,color:'#E65100',width:8}}>M</span>
                  <div style={{flex:1,background:'#F5ECE6',borderRadius:99,height:6}}>
                    <div style={{width:`${subj.mains_pct||0}%`,height:6,background:'#E65100',borderRadius:99}}/>
                  </div>
                  <span style={{fontSize:10,fontWeight:800,color:'#E65100',width:26,textAlign:'right'}}>{subj.mains_pct||0}%</span>
                </div>
              </div>
            ) : (
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8,cursor:'pointer'}}
                onClick={() => { setView({ paper: subj.gs_paper, subject: subj.subject }); setOpenChapter(null); }}>
                <div style={{flex:1,background: exam==='pre'?'#E8EEF6':'#F5ECE6',borderRadius:99,height:7}}>
                  <div style={{width:`${exam==='pre'?(subj.pre_pct||0):(subj.mains_pct||0)}%`,height:7,
                    background: exam==='pre'?'#1565C0':'#E65100',borderRadius:99}}/>
                </div>
                <span style={{fontSize:11,fontWeight:800,color: exam==='pre'?'#1565C0':'#E65100',width:28,textAlign:'right'}}>
                  {exam==='pre'?(subj.pre_pct||0):(subj.mains_pct||0)}%
                </span>
              </div>
            )}
            {/* Row 3: trend toggle */}
            {hasPYQ && (
              <div>
                <button onClick={e=>{e.stopPropagation();setOpenTrend(isOpen?null:subj.subject);}}
                  style={{background:'none',border:'1px solid #E5E7EB',borderRadius:8,
                    padding:'4px 10px',fontSize:11,cursor:'pointer',color:'#6B7280',
                    display:'flex',alignItems:'center',gap:4}}>
                  📊 {isOpen ? 'Hide' : 'PYQ Trend'}
                </button>
                {isOpen && (
                  <TrendChart subjectName={subj.subject} examType={exam} />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}


// ── Essay Subject-Level Heatmap ──────────────────────────────
function EssayHeatmap({ subject, chapters }) {
  const [open, setOpen] = useState(false);

  // Gather all topics from all chapters
  const allTopics = chapters.flatMap(ch =>
    (ch.micro_topics || []).map(t => ({ ...t, chapter: ch.chapter }))
  );

  const priorityConfig = {
    'High':     { bg:'#C62828', color:'#fff', label:'HIGH' },
    'Med-High': { bg:'#D97706', color:'#fff', label:'MED-H' },
    'Medium':   { bg:'#A08000', color:'#fff', label:'MED' },
    'Low':      { bg:'#388E3C', color:'#fff', label:'LOW' },
  };

  return (
    <div style={{ marginBottom:10 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width:'100%', display:'flex', alignItems:'center',
          justifyContent:'space-between', padding:'8px 12px',
          background:'#F8F9FA', border:'1.5px solid #E0E6EF',
          borderRadius: open ? '8px 8px 0 0' : 8,
          cursor:'pointer', transition:'all 0.2s'
        }}>
        <span style={{ fontSize:12, fontWeight:700, color:'#4B5563' }}>
          🔥 Heatmap {allTopics.length > 0 ? `(${allTopics.length})` : ''}
        </span>
        <span style={{ fontSize:11, color:'#9CA3AF', transform: open ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }}>▼</span>
      </button>
      {open && (
        <div style={{ border:'1.5px solid #E0E6EF', borderTop:'none', borderRadius:'0 0 8px 8px', padding:10, background:'#FAFAFA' }}>
          {allTopics.length === 0 ? (
            <div style={{ fontSize:11, color:'#9CA3AF', fontStyle:'italic' }}>No topics defined yet</div>
          ) : (
            chapters.map(ch => {
              const topics = ch.micro_topics || [];
              if (!topics.length) return null;
              return (
                <div key={ch.chapter} style={{ marginBottom:10 }}>
                  <div style={{ fontSize:10, fontWeight:700, color:'#6B7280', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.05em' }}>
                    {ch.chapter}
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                    {topics.map((t, i) => {
                      const cfg = priorityConfig[t.pyq_priority] || priorityConfig['Medium'];
                      return (
                        <div key={i} style={{
                          background:`${cfg.bg}18`, border:`1.5px solid ${cfg.bg}`,
                          borderLeft:`4px solid ${cfg.bg}`, borderRadius:6,
                          padding:'5px 8px', fontSize:11, color:'#1A1A2E',
                          lineHeight:1.4, flex:'1 1 160px'
                        }}>
                          <span style={{ display:'inline-block', background:cfg.bg, color:cfg.color,
                            fontSize:8, fontWeight:700, padding:'1px 4px', borderRadius:3, marginRight:5 }}>
                            {cfg.label}
                          </span>
                          {t.micro_topic}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

// ── Micro Topic Heatmap ──────────────────────────────────────
function MicroTopicHeatmap({ subject, chapter, examType }) {
  const [topics, setTopics]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen]       = useState(false);
  const [mode, setMode]       = useState('pre'); // 'pre' | 'mains' for both subjects

  useEffect(() => {
    setLoading(true);
    setTopics(null);
    api('getMicroTopics', { subject, chapter })
      .then(data => {
        if (Array.isArray(data)) setTopics(data);
        else if (data && typeof data === 'object') setTopics(Object.values(data));
        else setTopics([]);
      })
      .catch(err => { console.error('Micro-topics error:', err); setTopics([]); })
      .finally(() => setLoading(false));
  }, [subject, chapter]);

  const priorityConfig = {
    'High':     { bg:'#C62828', color:'#fff', label:'HIGH' },
    'Med-High': { bg:'#D97706', color:'#fff', label:'MED-H' },
    'Medium':   { bg:'#A08000', color:'#fff', label:'MED' },
    'Low':      { bg:'#388E3C', color:'#fff', label:'LOW' },
  };

  const isBoth = examType === 'both';
  // For both subjects, filter by exam_type field; for pre/mains only, show all
  const filtered = !topics ? [] : isBoth
    ? topics.filter(t => (t.exam_type || 'pre') === mode)
    : topics;
  const count = filtered.length;

  return (
    <div style={{ marginTop:4 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width:'100%', display:'flex', alignItems:'center',
          justifyContent:'space-between', padding:'8px 10px',
          background:'#F8F9FA', border:'1.5px solid #E0E6EF',
          borderRadius: open ? '8px 8px 0 0' : 8,
          cursor:'pointer', transition:'all 0.2s'
        }}>
        <span style={{ fontSize:12, fontWeight:700, color:'#4B5563' }}>
          🔥 PYQ Heatmap {!loading && count > 0 ? `(${count})` : ''}
        </span>
        <span style={{ fontSize:11, color:'#9CA3AF', transform: open ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }}>▼</span>
      </button>

      {open && (
        <div style={{
          border:'1.5px solid #E0E6EF', borderTop:'none',
          borderRadius:'0 0 8px 8px', padding:'10px',
          background:'#FAFAFA'
        }}>
          {/* Pre/Mains toggle for both subjects */}
          {isBoth && (
            <div style={{ display:'flex', gap:6, marginBottom:10 }}>
              {['pre','mains'].map(m => (
                <button key={m} onClick={() => setMode(m)}
                  style={{ padding:'3px 12px', borderRadius:99, border:'none', cursor:'pointer',
                    fontSize:11, fontWeight:700,
                    background: mode===m ? (m==='mains'?'#E65100':'#1565C0') : '#F3F4F6',
                    color: mode===m ? '#fff' : '#6B7280' }}>
                  {m === 'pre' ? 'Prelims' : 'Mains'}
                </button>
              ))}
            </div>
          )}
          {loading ? (
            <div style={{ fontSize:11, color:'#9CA3AF', textAlign:'center', padding:'8px' }}>⏳ Loading...</div>
          ) : count === 0 ? (
            <div style={{ fontSize:11, color:'#9CA3AF', fontStyle:'italic', padding:'4px' }}>
              No PYQ topics for this chapter
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {filtered.map((t, i) => {
                const cfg = priorityConfig[t.pyq_priority] || priorityConfig['Low'];
                const years = t.pyq_years ? t.pyq_years.match(/\d{4}/g) || [] : [];
                return (
                  <div key={i} style={{
                    background:`${cfg.bg}12`,
                    border:`1px solid ${cfg.bg}50`,
                    borderLeft:`4px solid ${cfg.bg}`,
                    borderRadius:6, padding:'7px 10px',
                    fontSize:12, color:'#1A1A2E', lineHeight:1.4
                  }}>
                    <div style={{ display:'flex', alignItems:'flex-start', gap:6, marginBottom: years.length ? 4 : 0 }}>
                      <span style={{
                        display:'inline-block', background:cfg.bg, color:cfg.color,
                        fontSize:8, fontWeight:700, padding:'2px 5px',
                        borderRadius:3, flexShrink:0, marginTop:1
                      }}>{cfg.label}</span>
                      <span style={{ flex:1 }}>{t.micro_topic}</span>
                    </div>
                    {years.length > 0 && (
                      <div style={{ display:'flex', flexWrap:'wrap', gap:3, marginLeft:24 }}>
                        {years.map(y => (
                          <span key={y} style={{
                            background: cfg.bg + '20',
                            border: `1px solid ${cfg.bg}60`,
                            color: cfg.bg,
                            fontSize:9, fontWeight:700, padding:'1px 5px', borderRadius:4
                          }}>{y}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
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
  // Date picker — default to today in IST
  const todayIST = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }); // yyyy-MM-dd
  const [selectedDate, setSelectedDate] = useState(todayIST);
  const [vals, setVals] = useState({
    editorials_mins: '', current_affairs_mins: '', static_mins: '', csat_mins: '',
  });
  const [loadingDate, setLoadingDate] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [isEdit, setIsEdit]   = useState(false); // true if entry exists for this date

  const TASKS_DAILY = [
    { key: 'editorials_mins',      label: '📰 Editorials',      optimal: dashboard?.config?.editorials_optimal_mins || 20 },
    { key: 'current_affairs_mins', label: '🗞️ Current Affairs', optimal: dashboard?.config?.current_affairs_optimal_mins || 60 },
    { key: 'static_mins',          label: '📚 Static (GS+Opt)', optimal: dashboard?.config?.static_optimal_mins || 150 },
    { key: 'csat_mins',            label: '🔢 CSAT',            optimal: dashboard?.config?.csat_optimal_mins || 30 },
  ];

  // Load existing entry whenever date changes
  useEffect(() => {
    async function loadEntry() {
      setLoadingDate(true);
      try {
        const entry = await api('getDailyLog', { phone: user.phone, date: selectedDate });
        if (entry) {
          setVals({
            editorials_mins:      entry.editorials_mins      || '',
            current_affairs_mins: entry.current_affairs_mins || '',
            static_mins:          entry.static_mins          || '',
            csat_mins:            entry.csat_mins            || '',
          });
          setIsEdit(true);
        } else {
          setVals({ editorials_mins: '', current_affairs_mins: '', static_mins: '', csat_mins: '' });
          setIsEdit(false);
        }
      } catch { setVals({ editorials_mins: '', current_affairs_mins: '', static_mins: '', csat_mins: '' }); setIsEdit(false); }
      finally { setLoadingDate(false); }
    }
    loadEntry();
  }, [selectedDate, user.phone]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api('logDailyTask', { phone: user.phone, date: selectedDate, ...vals });
      await onUpdate(true);
      setSaved(true);
      setIsEdit(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  }

  // Total score for the selected day
  const totalPct = Math.min(100, Math.round(
    TASKS_DAILY.reduce((sum, t) => {
      const val = Number(vals[t.key]) || 0;
      return sum + Math.min(val / t.optimal, 1) * (100 / TASKS_DAILY.length);
    }, 0)
  ));
  const isToday  = selectedDate === todayIST;
  const isFuture = selectedDate > todayIST;

  return (
    <>
      <div className="card">
        {/* Header with date picker */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div className="card-title" style={{ marginBottom: 0 }}>
            {isToday ? "📅 Today's Study Log" : `📅 Log for ${selectedDate}`}
          </div>
          {isEdit && !isToday && (
            <span style={{ fontSize: 11, background: '#E3F0FF', color: '#1565C0',
              padding: '3px 8px', borderRadius: 99, fontWeight: 600 }}>Editing</span>
          )}
        </div>

        {/* Date selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <button onClick={() => {
            const d = new Date(selectedDate); d.setDate(d.getDate() - 1);
            setSelectedDate(d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }));
          }} style={{ background: '#F3F4F6', border: 'none', borderRadius: 8, padding: '7px 12px',
            fontSize: 16, cursor: 'pointer', fontWeight: 700 }}>‹</button>
          <input type="date" value={selectedDate} max={todayIST}
            onChange={e => setSelectedDate(e.target.value)}
            style={{ flex: 1, padding: '8px 10px', border: '1.5px solid #E0E6EF',
              borderRadius: 8, fontSize: 14, textAlign: 'center', background: '#FAFAFA' }} />
          <button onClick={() => {
            if (selectedDate < todayIST) {
              const d = new Date(selectedDate); d.setDate(d.getDate() + 1);
              setSelectedDate(d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }));
            }
          }} style={{ background: '#F3F4F6', border: 'none', borderRadius: 8, padding: '7px 12px',
            fontSize: 16, cursor: 'pointer', fontWeight: 700,
            opacity: selectedDate >= todayIST ? 0.3 : 1 }}>›</button>
          {!isToday && (
            <button onClick={() => setSelectedDate(todayIST)}
              style={{ background: '#E3F0FF', border: 'none', borderRadius: 8, padding: '7px 10px',
                fontSize: 12, cursor: 'pointer', color: '#1565C0', fontWeight: 600 }}>Today</button>
          )}
        </div>

        {loadingDate ? (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <span className="spinner spinner-dark" style={{ width: 24, height: 24, display: 'inline-block' }} />
          </div>
        ) : isFuture ? (
          <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: 13, padding: 16 }}>
            Can't log future dates
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {TASKS_DAILY.map(t => {
              const val = Number(vals[t.key]) || 0;
              const pct = Math.min(100, Math.round((val / t.optimal) * 100));
              return (
                <div key={t.key} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <label style={{ fontSize: 14, fontWeight: 500 }}>{t.label}</label>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>Target: {t.optimal} min</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <input type="number" min="0" max="600" className="input-field"
                      style={{ width: 90, flexShrink: 0 }} placeholder="0"
                      value={vals[t.key]}
                      onChange={e => setVals(v => ({ ...v, [t.key]: e.target.value }))} />
                    <div style={{ flex: 1 }}>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar-fill" style={{
                          width: `${pct}%`,
                          background: pct >= 100 ? '#2E7D32' : pct >= 60 ? '#F5A623' : '#E65100'
                        }} />
                      </div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{pct}% of target</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* All-targets-met indicator */}
            {totalPct >= 100 && (
              <div style={{ background: '#E8F5E9', border: '1.5px solid #2E7D32', borderRadius: 8,
                padding: '8px 12px', marginBottom: 12, fontSize: 13, color: '#2E7D32', fontWeight: 600 }}>
                ✅ All targets met — this day counts towards your consistency!
              </div>
            )}

            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? <span className="spinner" /> : saved ? '✓ Saved!' : isEdit ? 'Update Log' : 'Save Log'}
            </button>
          </form>
        )}
      </div>

      {/* Heatmap */}
      {consistency && (
        <div className="card">
          <div className="card-title">🔥 30-Day Activity</div>
          <div className="heatmap">
            {consistency.heatmap.map(d => {
              const s = d.score;
              const q = d.qualifying;
              const bg = s === null ? '#F0F0F0' : q ? '#1B5E20' : s >= 60 ? '#F5A623' : '#FECACA';
              return (
                <div key={d.date} className="heatmap-cell"
                  style={{ background: bg, color: s !== null && (q || s >= 60) ? '#fff' : '#999',
                    cursor: 'pointer' }}
                  title={`${d.date}: ${s !== null ? s + '% daily score' + (q ? ' ✅ Qualifying' : '') : 'No log'}`}
                  onClick={() => setSelectedDate(d.date)}>
                  {s !== null ? s : ''}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 10, alignItems: 'center', fontSize: 11, color: '#6B7280', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, background: '#1B5E20', borderRadius: 3 }} />
              <span>Qualifying (100%)</span>
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, background: '#F5A623', borderRadius: 3 }} />
              <span>Partial</span>
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, background: '#FECACA', borderRadius: 3 }} />
              <span>Low</span>
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, background: '#F0F0F0', borderRadius: 3 }} />
              <span>No log</span>
            </div>
          </div>
          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 8 }}>
            Tap any cell to edit that day's log
          </div>
        </div>
      )}

      {/* Consistency scores */}
      {consistency && (
        <div className="card">
          <div className="card-title">📊 Consistency Score</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>
            Target: 6 qualifying days/week until {consistency.overall.exam_end_date} · {consistency.overall.total_weeks} weeks total
          </div>

          {/* Compensation banner */}
          {(() => {
            const used = consistency.overall.comp_weeks_used || 0;
            const remaining = consistency.overall.comp_weeks_remaining ?? consistency.overall.max_comp_weeks;
            const max = consistency.overall.max_comp_weeks || 6;
            if (used === 0) return null;
            const exhausted = remaining === 0;
            return (
              <div style={{
                background: exhausted ? '#FEE2E2' : '#FFF7ED',
                border: `1.5px solid ${exhausted ? '#EF4444' : '#F59E0B'}`,
                borderRadius: 8, padding: '8px 12px', marginBottom: 12,
                fontSize: 12, color: exhausted ? '#B91C1C' : '#92400E'
              }}>
                {exhausted
                  ? `⚠️ All ${max} compensation weeks used — missed weeks now penalise your score`
                  : `🔄 ${used} of ${max} compensation weeks used · ${remaining} remaining`}
              </div>
            );
          })()}

          {/* Current week status */}
          {(() => {
            const s = consistency.weekly.status;
            if (!s || s === 'FULL') return null;
            const cfg = {
              COMPENSATED:        { bg:'#EFF6FF', border:'#3B82F6', color:'#1D4ED8', text:'🔄 Compensation week — full credit applied' },
              PARTIAL:            { bg:'#FFF7ED', border:'#F59E0B', color:'#92400E', text:'⚡ Partial week — log more days or compensate' },
              PARTIAL_OVER_BUDGET:{ bg:'#FEE2E2', border:'#EF4444', color:'#B91C1C', text:'❌ Partial week — compensation budget exhausted' },
              MISSED:             { bg:'#FEE2E2', border:'#EF4444', color:'#B91C1C', text:'❌ No logs this week' },
            };
            const c = cfg[s]; if (!c) return null;
            return (
              <div style={{ background:c.bg, border:`1.5px solid ${c.border}`, borderRadius:8,
                padding:'7px 12px', marginBottom:12, fontSize:12, color:c.color, fontWeight:600 }}>
                {c.text}
              </div>
            );
          })()}

          <div className="stat-grid">
            <div className="stat-box">
              <div className="val" style={{ color: '#1565C0' }}>{Math.min(100, consistency.weekly.consistency_pct)}%</div>
              <div className="lbl">This Week</div>
              <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>{consistency.weekly.qualifying_days}/6 days</div>
            </div>
            <div className="stat-box">
              <div className="val" style={{ color: '#E65100' }}>{Math.min(100, consistency.monthly.consistency_pct)}%</div>
              <div className="lbl">This Month</div>
              <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>{consistency.monthly.qualifying_days}/{consistency.monthly.target_days} days</div>
            </div>
            <div className="stat-box">
              <div className="val" style={{ color: '#2E7D32' }}>{consistency.overall.consistency_pct}%</div>
              <div className="lbl">Overall</div>
              <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>{consistency.overall.qualifying_days}/{consistency.overall.target_days} days</div>
            </div>
            <div className="stat-box">
              <div className="val" style={{ color: '#6A1B9A' }}>{Math.min(100, consistency.overall.on_track_pct)}%</div>
              <div className="lbl">On Track</div>
              <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>vs target so far</div>
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

  const ESSAY_CODES = new Set(["MT-2116","MT-2119","MT-2123","MT-2125","MT-2128","MT-2131","ESMT 18","ESMT 26","ESMT 30","ESMT 32","ESMT 35"]);
  function selectTest(code) {
    const list = (TESTS_MASTER[adding.category] || []).filter(t => t.type === adding.series);
    const found = list.find(t => t.code === code);
    if (found) {
      let marksTotal = found.marks || 0;
      // For mains tests: derive marks from questions if not set
      if (adding.category === 'mains' && !marksTotal) {
        const q = found.questions || 20;
        marksTotal = ESSAY_CODES.has(code) ? 250 : (q <= 10 ? 125 : 250);
      }
      setForm(f => ({ ...f, test_code: found.code, test_name: found.name, marks_total: marksTotal }));
    }
  }

  async function saveTest(e) {
    e.preventDefault(); setSaving(true);
    try {
      const testType = adding.series === 'CMT' ? 'cmt' : adding.series === 'AWP' ? 'awp' : adding.category;
      const action = adding.editRowId ? 'updateTestScore' : 'logTestScore';
      await api(action, { phone: user.phone, test_type: testType, row_id: adding.editRowId || undefined, ...form });
      await loadScores(); setAdding(null); setForm({});
    } catch { alert('Failed to save. Please try again.'); }
    finally { setSaving(false); }
  }

  async function deleteTest(testType, rowId) {
    if (!window.confirm('Delete this test entry?')) return;
    try {
      await api('deleteTestScore', { phone: user.phone, test_type: testType, row_id: rowId });
      await loadScores();
    } catch { alert('Failed to delete. Please try again.'); }
  }

  function startEdit(sec, series, entry) {
    setAdding({ category: sec.key, series, cmtKey: sec.cmtKey, editRowId: entry.row_id });
    setForm({
      test_code: entry.test_code, test_name: entry.test_name,
      marks_total: entry.marks_total, marks_scored: entry.marks_scored,
      attempted: entry.attempted, chapter: entry.chapter,
      mastery_status: entry.mastery_status, subject_name: entry.subject_name,
      cmt_subject: entry.subject || '',
      questions_attempted: entry.questions_attempted,
      answers_written: entry.answers_written,
      // For CMT: don't pre-fill marks_total — the form derives correct value from section
      marks_total: series === 'CMT' ? undefined : entry.marks_total,
      correct_responses:   entry.correct_responses,
      incorrect_responses: entry.incorrect_responses,
    });
  }

  if (loading) return <div style={{ textAlign:'center', padding:60 }}><div className="spinner spinner-dark" style={{ width:30, height:30, margin:'0 auto' }}/></div>;

  const SECTIONS = [
    { key:'gs_prelims',   label:'📝 GS Prelims Tests',      scoreKey:'prelims', hasCMT:true,  cmtKey:'cmt_gs',   hasScore:true },
    { key:'csat_prelims', label:'📝 CSAT Prelims Tests',    scoreKey:'csat',    hasCMT:true,  cmtKey:'cmt_csat', hasScore:true },
    { key:'mains',        label:'📋 Mains Tests',           scoreKey:'mains',   hasCMT:false, cmtKey:null,       hasAWP:true,  hasScore:true },
  ];

  return (
    <>
      {SECTIONS.map(sec => (
        <TestSection key={sec.key} section={sec} scores={scores}
          onAdd={(series, preSubject) => { setAdding({ category: sec.key, series, cmtKey: sec.cmtKey }); setForm(preSubject ? { subject_name: preSubject } : {}); }}
          onEdit={(series, entry) => startEdit(sec, series, entry)}
          onDelete={(series, entry) => {
            const testType = series === 'CMT' ? 'cmt' : series === 'AWP' ? 'awp' : sec.key;
            deleteTest(testType, entry.row_id);
          }}
        />
      ))}

      {adding && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center' }}
          onClick={e => e.target===e.currentTarget && setAdding(null)}>
          <div style={{ background:'#fff', borderRadius:18, padding:24, width:'92%', maxWidth:480, maxHeight:'90vh', overflowY:'auto' }}>

            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <div style={{ flex:1, fontWeight:700, fontSize:16 }}>
                {adding.editRowId
                  ? (adding.series === 'CMT' ? 'Edit CMT Entry' : 'Edit Score')
                  : (adding.series === 'CMT' ? 'Add CMT Entry' : 'Add Score')}
              </div>
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
                  {(() => {
                    // Build unique subject list from CMT master
                    const cmtList = TESTS_MASTER[adding.cmtKey] || [];
                    const subjects = [...new Set(cmtList.map(c => c.subject).filter(Boolean))];
                    const selectedSubj = form.cmt_subject || '';
                    const filteredChapters = selectedSubj
                      ? cmtList.filter(c => c.subject === selectedSubj)
                      : cmtList;
                    return (
                      <>
                        <div className="input-group">
                          <label>Select Subject</label>
                          <select className="input-field" required value={selectedSubj}
                            onChange={e => setForm(f => ({ ...f, cmt_subject: e.target.value, chapter: '' }))}>
                            <option value="">— Choose a subject —</option>
                            {subjects.map(s => (
                              <option key={s} value={s}>{s.replace(/^\d+\.\s*/, '')}</option>
                            ))}
                          </select>
                        </div>
                        <div className="input-group">
                          <label>Select Chapter</label>
                          <select className="input-field" required value={form.chapter||''}
                            onChange={e => setForm(f => ({ ...f, chapter: e.target.value }))}
                            disabled={!selectedSubj}>
                            <option value="">— {selectedSubj ? 'Choose a chapter' : 'Select subject first'} —</option>
                            {filteredChapters.map(c => (
                              <option key={c.name} value={c.name}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      </>
                    );
                  })()}
                  {(() => {
                    const isCsat    = adding.cmtKey === 'cmt_csat';
                    const maxMarks  = isCsat ? 50 : 40;
                    const threshPct = isCsat ? 0.50 : 0.65; // 50% for CSAT, 65% for GS
                    const threshold = Math.round(maxMarks * threshPct);
                    const scored    = Number(form.marks_scored) || 0;
                    return (
                      <div className="input-group">
                        <label>Score (out of {maxMarks})</label>
                        <input className="input-field" type="number" min="0" max={maxMarks} required
                          placeholder={`Enter marks scored (max ${maxMarks})`}
                          value={form.marks_scored||''}
                          onChange={e => {
                            const score = Number(e.target.value);
                            const status = score >= threshold ? 'Mastered' : score > 0 ? 'Concerned' : 'Not Attempted';
                            setForm(f => ({ ...f, marks_scored: e.target.value, marks_total: maxMarks, mastery_status: status }));
                          }} />
                        {form.marks_scored !== '' && form.marks_scored !== undefined && (
                          <div style={{ marginTop: 6, fontSize: 12,
                            color: scored >= threshold ? '#2E7D32' : '#E65100', fontWeight: 600 }}>
                            {scored >= threshold
                              ? `✅ ${Math.round(scored/maxMarks*100)}% — Full credit`
                              : `⚠️ ${Math.round(scored/maxMarks*100)}% — Partial credit (need ≥${threshold}/${maxMarks} for full)`}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </>
              )}

              {adding.series === 'AWP' && (() => {
                const subj = TESTS_MASTER.awp.find(s => s.name === form.subject_name);
                const target = subj ? subj.target : null;
                const written = Number(form.answers_written) || 0;
                const pct = target ? Math.round((written / target) * 100) : 0;
                return (
                  <>
                    <div className="input-group">
                      <label>Select Subject</label>
                      <select className="input-field" required value={form.subject_name||''}
                        onChange={e => setForm(f => ({ ...f, subject_name: e.target.value, answers_written: '' }))}>
                        <option value="">— Choose a subject —</option>
                        {(TESTS_MASTER.awp||[]).map(s => (
                          <option key={s.name} value={s.name}>
                            {s.name} (Target: {s.target} answers)
                          </option>
                        ))}
                      </select>
                    </div>
                    {subj && (
                      <div style={{ background:'#F0F4FF', borderRadius:8, padding:'8px 12px', marginBottom:12, fontSize:12, color:'#1B3A6B' }}>
                        <strong>{subj.paper}</strong> · Weight: {(subj.weight*100).toFixed(2)}% · Target: <strong>{subj.target} answers</strong>
                      </div>
                    )}
                    <div className="input-group">
                      <label>Answers Written Today</label>
                      <input className="input-field" type="number" min="1"
                        max={target ? target : 999} required
                        placeholder="How many answers did you write today?"
                        value={form.answers_written||''}
                        onChange={e => setForm(f => ({ ...f, answers_written: Number(e.target.value) }))} />
                      {target && written > 0 && (
                        <div style={{ marginTop:6, fontSize:12, color: pct >= 100 ? '#2E7D32' : '#1565C0', fontWeight:600 }}>
                          {written} answers logged · {pct >= 100 ? `✅ Target reached!` : `${pct}% of target (${target - written} more to go)`}
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}

              {adding.series !== 'CMT' && adding.series !== 'AWP' && (
                <>
                  <div className="input-group">
                    <label>Select Test</label>
                    <select className="input-field" required value={form.test_code||''}
                      onChange={e => selectTest(e.target.value)}>
                      <option value="">— Choose a test —</option>
                      {(TESTS_MASTER[adding.category]||[]).filter(t => t.type===adding.series).map(t => {
                        const existingScores = scores?.[adding.category==='gs_prelims'?'prelims':adding.category==='csat_prelims'?'csat':'mains'] || [];
                        const alreadyDone = !adding.editRowId && existingScores.some(r => r.test_code === t.code);
                        return (
                          <option key={t.code} value={t.code} disabled={alreadyDone}>
                            {alreadyDone ? '✓ ' : ''}{t.code} — {t.name.length>45 ? t.name.slice(0,45)+'…' : t.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {form.test_code && (
                    <div style={{ background:'#EAF2FB', borderRadius:10, padding:'10px 14px', marginBottom:14, fontSize:13, color:'#1565C0' }}>
                      <strong>{form.test_code}</strong> — {form.test_name}<br/>
                      <span style={{ opacity:0.8 }}>Total: {form.marks_total}</span>
                    </div>
                  )}
                  {(() => {
                    // Scoring rules:
                    // GS:   2 marks/Q, -2/3 per wrong  → marksPerQ=2,   penaltyPerQ=2/3
                    // CSAT: 2.5 marks/Q, -2.5/3 per wrong → marksPerQ=2.5, penaltyPerQ=2.5/3
                    const isCSAT      = adding.category === 'csat_prelims';
                    const marksPerQ   = isCSAT ? 2.5 : 2;
                    const penaltyPerQ = marksPerQ / 3;
                    const totalMarks  = Number(form.marks_total) || 0;
                    const totalQ      = totalMarks > 0 ? Math.round(totalMarks / marksPerQ) : '?';
                    const correct     = Number(form.correct_responses) || 0;
                    const incorrect   = Number(form.incorrect_responses) || 0;
                    const calcScore   = correct > 0 || incorrect > 0
                      ? Math.max(0, correct * marksPerQ - incorrect * penaltyPerQ)
                      : null;
                    const thresh      = isCSAT ? 0.45 : 0.60;
                    const threshLabel = isCSAT ? '45%' : '60%';
                    const pct         = calcScore !== null && totalMarks > 0 ? calcScore / totalMarks : null;
                    return (
                      <>
                        <div style={{ display:'flex', gap:10, marginBottom:4 }}>
                          <div className="input-group" style={{ flex:1 }}>
                            <label>✅ Correct</label>
                            <input className="input-field" type="number" min="0" max={totalQ} required
                              placeholder="0"
                              value={form.correct_responses||''}
                              onChange={e => {
                                const c = Number(e.target.value);
                                const inc = Number(form.incorrect_responses)||0;
                                const sc = Math.max(0, c * marksPerQ - inc * penaltyPerQ);
                                setForm(f => ({ ...f, correct_responses: e.target.value, marks_scored: Math.round(sc * 100) / 100 }));
                              }} />
                          </div>
                          <div className="input-group" style={{ flex:1 }}>
                            <label>❌ Incorrect</label>
                            <input className="input-field" type="number" min="0" max={totalQ} required
                              placeholder="0"
                              value={form.incorrect_responses||''}
                              onChange={e => {
                                const inc = Number(e.target.value);
                                const c = Number(form.correct_responses)||0;
                                const sc = Math.max(0, c * marksPerQ - inc * penaltyPerQ);
                                setForm(f => ({ ...f, incorrect_responses: e.target.value, marks_scored: Math.round(sc * 100) / 100 }));
                              }} />
                          </div>
                        </div>
                        {calcScore !== null && (
                          <div style={{ background: pct >= thresh ? '#E8F5E9' : '#FFF3E0',
                            border: `1.5px solid ${pct >= thresh ? '#2E7D32' : '#E65100'}`,
                            borderRadius:8, padding:'8px 12px', marginBottom:8, fontSize:13 }}>
                            <div style={{ fontWeight:700, color: pct >= thresh ? '#2E7D32' : '#E65100' }}>
                              Score: {calcScore.toFixed(2)} / {totalMarks}
                              {' '}{pct >= thresh ? '✅ Full credit' : `⚠️ Need ≥${threshLabel}`}
                            </div>
                            <div style={{ fontSize:11, color:'#6B7280', marginTop:3 }}>
                              ({correct} × {marksPerQ}) − ({incorrect} × {penaltyPerQ.toFixed(2)}) = {calcScore.toFixed(2)}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
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
const editBtnStyle = { background:'#EAF2FB', border:'none', borderRadius:6, padding:'4px 8px', fontSize:13, cursor:'pointer', color:'#1565C0', lineHeight:1 };
const deleteBtnStyle = { background:'#FDEBEE', border:'none', borderRadius:6, padding:'4px 8px', fontSize:13, cursor:'pointer', color:'#B00020', lineHeight:1 };

function TestSection({ section, scores, onAdd, onEdit, onDelete }) {
  const [activeSeries, setActiveSeries] = useState('LEEP');
  const series = section.hasAWP ? ['LEEP','EDGE','AWP'] : section.hasCMT ? ['LEEP','EDGE','CMT'] : ['LEEP','EDGE'];

  const allEntries = scores?.[section.scoreKey] || [];
  const cmtEntries = scores?.cmt || [];
  const awpEntries = scores?.awp || [];

  // Deduplicate by test_code — keep latest row_id per code
  function dedupe(entries) {
    const map = new Map();
    entries.forEach(r => {
      const key = r.test_code || r.chapter || r.subject_name || String(Math.random());
      if (!map.has(key) || (r.row_id > map.get(key).row_id)) map.set(key, r);
    });
    return Array.from(map.values());
  }

  const rawFiltered = activeSeries === 'CMT'
    ? cmtEntries.filter(r => { const cmtList = TESTS_MASTER[section.cmtKey]||[]; return cmtList.some(c => c.name === r.chapter); })
    : activeSeries === 'AWP' ? awpEntries
    : allEntries.filter(r => {
        if (r.test_label) return r.test_label === activeSeries;
        if (activeSeries === 'EDGE') return String(r.test_code||'').startsWith('ES');
        return !String(r.test_code||'').startsWith('ES');
      });
  const filtered = dedupe(rawFiltered);

  return (
    <div className="card">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <div className="card-title" style={{ marginBottom:0 }}>{section.label}</div>
      </div>

      {section.isCMT ? (
        <>
          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:12 }}>
            <button className="btn btn-sm btn-saffron" onClick={() => onAdd('CMT')}>+ Add</button>
          </div>
          {dedupe(scores?.cmt||[]).length ? dedupe(scores?.cmt||[]).map((r,i) => {
            // Derive correct max marks from section: CSAT CMT = 50, GS CMT = 40
            const maxMarks  = section.cmtKey === 'cmt_csat' ? 50 : 40;
            const threshPct = section.cmtKey === 'cmt_csat' ? 0.50 : 0.65;
            const scored    = Number(r.marks_scored || 0);
            // Use stored marks_total if correct, otherwise use derived value
            const displayMax = (Number(r.marks_total) === maxMarks || !r.marks_total) ? maxMarks : Number(r.marks_total);
            const pct  = Math.round(scored / displayMax * 100);
            const full = scored >= displayMax * threshPct;
            return (
              <div key={i} style={{ borderBottom:'1px solid #F0F0F0', padding:'8px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:'#1B3A6B' }}>{r.chapter}</div>
                  {r.subject && <div style={{ fontSize:11, color:'#6B7280', marginTop:1 }}>{r.subject}</div>}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:15, fontWeight:700, color: full ? '#2E7D32' : '#E65100' }}>
                      {scored}<span style={{ fontSize:11, color:'#6B7280' }}>/{maxMarks}</span>
                    </div>
                    <div style={{ fontSize:11, color: full ? '#2E7D32' : '#E65100' }}>
                      {full ? '✅' : '⚠️'}
                    </div>
                  </div>
                  <button onClick={() => onEdit('CMT', r)} style={editBtnStyle}>✏️</button>
                  <button onClick={() => onDelete('CMT', r)} style={deleteBtnStyle}>🗑</button>
                </div>
              </div>
            );
          }) : <div style={{ color:'#6B7280', fontSize:13 }}>No entries yet</div>}
        </>
      ) : (
        <>
          <div style={{ display:'flex', gap:6, marginBottom:12 }}>
            {series.map(s => {
              const colors = { LEEP:'#1565C0', EDGE:'#2E7D32', CMT:'#6A1B9A', AWP:'#E65100' };
              const active = activeSeries === s;
              return (
                <button key={s} onClick={() => setActiveSeries(s)}
                  style={{ padding:'5px 14px', borderRadius:99, border:'1.5px solid',
                    borderColor: active ? colors[s] : '#E0E6EF', background: active ? colors[s] : '#fff',
                    color: active ? '#fff' : '#6B7280', fontWeight:600, fontSize:12, cursor:'pointer' }}>
                  {s}
                </button>
              );
            })}
            <button className="btn btn-sm btn-saffron" style={{ marginLeft:'auto' }} onClick={() => onAdd(activeSeries)}>+ Add</button>
          </div>

          {activeSeries === 'AWP' ? (() => {
            // Accumulate all answers_written per subject across all entries
            const writtenMap = {};
            awpEntries.forEach(r => {
              if (r.subject_name) writtenMap[r.subject_name] = (writtenMap[r.subject_name]||0) + (Number(r.answers_written)||0);
            });
            const hasAny = awpEntries.length > 0;
            return (
              <div>
                {!hasAny && (
                  <div style={{ color:'#6B7280', fontSize:13, padding:'8px 0' }}>
                    No AWP entries yet — tap + Log on any subject to start
                  </div>
                )}
                {TESTS_MASTER.awp.map(subj => {
                  const written = writtenMap[subj.name] || 0;
                  const pct = Math.min(100, Math.round((written / subj.target) * 100));
                  const done = pct >= 100;
                  if (!hasAny && written === 0) return null;
                  return (
                    <div key={subj.name} style={{ borderBottom:'1px solid #F0F0F0', padding:'10px 0' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:13, fontWeight:600, color:'#1B3A6B' }}>{subj.name}</div>
                          <div style={{ fontSize:11, color:'#6B7280' }}>{subj.paper} · {(subj.weight*100).toFixed(2)}% wt</div>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
                          <div style={{ textAlign:'right' }}>
                            <div style={{ fontSize:14, fontWeight:700, color: done?'#2E7D32':'#E65100' }}>
                              {written}<span style={{ fontSize:11, color:'#6B7280' }}>/{subj.target}</span>
                            </div>
                            <div style={{ fontSize:10, color: done?'#2E7D32':'#9CA3AF' }}>{done?'✅':''}</div>
                          </div>
                          <button
                            onClick={() => onAdd('AWP', subj.name)}
                            style={{ background:'#FFF3E0', border:'none', borderRadius:6, padding:'4px 8px', fontSize:12, cursor:'pointer', color:'#E65100', fontWeight:600 }}>
                            + Log
                          </button>
                        </div>
                      </div>
                      <div style={{ background:'#F0F0F0', borderRadius:99, height:4 }}>
                        <div style={{ width:`${pct}%`, height:4, background: done?'#2E7D32':'#E65100', borderRadius:99 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })() : filtered.length ? filtered.map((r, i) => (
            <div key={i} style={{ borderBottom:'1px solid #F0F0F0', padding:'10px 0' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:8 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:'#1B3A6B' }}>
                    {activeSeries === 'CMT' ? r.chapter : r.test_code}
                  </div>
                  {activeSeries !== 'CMT' && (
                    <div style={{ fontSize:11, color:'#6B7280', marginTop:1 }}>{r.test_name}</div>
                  )}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
                  {activeSeries === 'CMT' ? (() => {
                    const maxM = section.cmtKey === 'cmt_csat' ? 50 : 40;
                    const thr  = section.cmtKey === 'cmt_csat' ? 0.50 : 0.65;
                    const sc   = Number(r.marks_scored||0);
                    const fp   = Math.round(sc/maxM*100);
                    const fl   = sc >= maxM * thr;
                    return (
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontSize:15, fontWeight:700, color: fl?'#2E7D32':'#E65100' }}>
                          {sc}<span style={{ fontSize:11, color:'#6B7280' }}>/{maxM}</span>
                        </div>
                        <div style={{ fontSize:11, color: fl?'#2E7D32':'#E65100' }}>{fl?'✅':'⚠️'}</div>
                      </div>
                    );
                  })() : section.hasScore ? (() => {
                    const isCSAT  = section.key === 'csat_prelims';
                    const scored  = Number(r.marks_scored) || 0;
                    const total   = Number(r.marks_total) || 0;
                    const pct     = total > 0 ? Math.round(scored / total * 100) : 0;
                    const thresh  = isCSAT ? 45 : 60;
                    const correct   = (r.correct_responses !== undefined && r.correct_responses !== '') ? Number(r.correct_responses) : null;
                    const incorrect = (r.incorrect_responses !== undefined && r.incorrect_responses !== '') ? Number(r.incorrect_responses) : null;
                    return (
                      <div style={{ textAlign:'right' }}>
                        {correct !== null && (
                          <div style={{ fontSize:11, marginBottom:2, display:'flex', gap:6, justifyContent:'flex-end' }}>
                            <span style={{ color:'#2E7D32', fontWeight:700 }}>✅{correct}</span>
                            <span style={{ color:'#B00020', fontWeight:700 }}>❌{incorrect}</span>
                          </div>
                        )}
                        <div style={{ fontSize:15, fontWeight:700, color: pct >= thresh ? '#2E7D32' : pct >= thresh*0.75 ? '#E65100' : '#B00020' }}>
                          {Number.isInteger(scored) ? scored : scored.toFixed(2)}
                          <span style={{ fontSize:11, color:'#6B7280' }}>/{total}</span>
                        </div>

                      </div>
                    );
                  })() : (
                    <span className={`pill ${r.attempted==='Yes'?'pill-green':'pill-orange'}`}>
                      {r.attempted==='Yes'?'Done':'Not Done'}
                    </span>
                  )}
                  <button onClick={() => onEdit(activeSeries, r)} style={editBtnStyle} title="Edit">✏️</button>
                  <button onClick={() => onDelete(activeSeries, r)} style={deleteBtnStyle} title="Delete">🗑</button>
                </div>
              </div>
            </div>
          )) : (
            <div style={{ color:'#6B7280', fontSize:13, padding:'8px 0' }}>No {activeSeries} entries yet</div>
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


