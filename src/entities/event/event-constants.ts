export const EVENT_NAMES = [
  "baptism",
  "birth",
  "church_event_witness",
  "church_membership",
  "citizenship",
  "death",
  "jail_entry",
  "maritime_death",
  "maritime_discharge",
  "maritime_enlistment",
  "marriage",
  "medical",
  "military_discharge",
  "military_enlistment",
  "notarial_entry",
  "other",
  "toll",
  "university",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

export const EVENT_TYPE_CONFIG: Record<
EventName,
{
  label: string;
  icon: string;
  color: string;
}
> = {
  birth: {
    label: "Births",
    color: "#10b981",
    icon: "👶",
  },
  death: {
    label: "Deaths",
    color: "#ef4444",
    icon: "🪦",
  },
  baptism: {
    label: "Baptisms",
    color: "#8b5cf6 ",
    icon: "⛪",
  },
  church_event_witness: {
    label: "Baptism/Marriage Witnesses",
    color: "#a78bfa",
    icon: "👁️",
  },
  marriage: {
    label: "Marriages",
    color: "#8b5cf6 ",
    icon: "💍",
  },
  jail_entry: {
    label: "Jail Entries",
    color: "#a16207 ",
    icon: "👮‍♂️",
  },
  toll: {
    label: "Tolls",
    color: "#60a5fa",
    icon: "⛵",
  },
  maritime_enlistment: {
    label: "Maritime Enlistments",
    color: "#2563eb",
    icon: "⚓",
  },
  maritime_discharge: {
    label: "Maritime Discharges",
    color: "#2563eb",
    icon: "🏠",
  },
  maritime_death: {
    label: "Maritime Deaths",
    color: "#ef4444",
    icon: "🪦",
  },
  medical: {
    label: "Medical",
    color: "#a16207",
    icon: "💉",
  },
  military_enlistment: {
    label: "Military Enlistments",
    color: "#a16207",
    icon: "🪖",
  },
  military_discharge: {
    label: "Military Discharges",
    color: "#a16207",
    icon: "🎖️",
  },
  citizenship: {
    label: "Citizenships",
    color: "#8b5cf6 ",
    icon: "🏛️",
  },
  church_membership: {
    label: "Church Memberships",
    color: "#8b5cf6 ",
    icon: "⛪",
  },
  other: {
    label: "Other",
    color: "#a16207 ",
    icon: "📜",
  },
  notarial_entry: {
    label: "Notarial Entries",
    color: "#a16207",
    icon: "📃",
  },
  university: {
    label: "University",
    color: "#a16207 ",
    icon: "🎓",
  },
} as const;