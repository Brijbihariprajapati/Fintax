/** Edit this list to show or hide open roles on the Careers page. */
export const CAREER_POSITIONS = [
  {
    id: "accountant",
    title: "Accountant",
    location: "Lalitpur, Nepal",
    type: "Full-time",
    active: true,
  },
  {
    id: "tax-advisor",
    title: "Tax Advisor",
    location: "Lalitpur, Nepal",
    type: "Full-time",
    active: true,
  },
  {
    id: "audit-support",
    title: "Audit Support Specialist",
    location: "Lalitpur, Nepal",
    type: "Full-time",
    active: true,
  },
  {
    id: "payroll",
    title: "Payroll Administrator",
    location: "Remote / Nepal",
    type: "Full-time",
    active: true,
  },
  {
    id: "general",
    title: "General Application",
    location: "Australia, Nepal, India, Dubai",
    type: "Open",
    active: true,
  },
];

export const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
];

export const COUNTRY_OPTIONS = ["Australia", "Nepal", "India", "Dubai"];

export function getActivePositions() {
  return CAREER_POSITIONS.filter((p) => p.active);
}
