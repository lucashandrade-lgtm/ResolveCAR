import propertiesData from "./mock/properties.json";
import rulesData from "./mock/rules.json";
import sourcesData from "./mock/sources.json";
import timelineData from "./mock/timeline.json";
import analysisData from "./mock/analysis.json";
import communicationsData from "./mock/communications.json";
import type { Analysis, Communication, PropertyCase, Rule, Source, TimelineEvent } from "./types";

export const properties = propertiesData as unknown as PropertyCase[];
export const rules = rulesData as unknown as Rule[];
export const sources = sourcesData as unknown as Source[];
export const timeline = timelineData as unknown as TimelineEvent[];
export const analyses = analysisData as unknown as Analysis[];
export const communications = communicationsData as unknown as Communication[];

export function getCase(id: string) {
  return properties.find((item) => item.id === id);
}

export function getAnalysis(propertyId: string) {
  return analyses.find((item) => item.propertyId === propertyId);
}

export function getRules(ids: string[]) {
  return ids.map((id) => rules.find((rule) => rule.id === id)).filter(Boolean) as Rule[];
}

export function getCommunication(propertyId: string) {
  return communications.find((item) => item.propertyId === propertyId);
}
