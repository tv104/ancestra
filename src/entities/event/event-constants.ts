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
    color: "var(--color-event-birth)",
    icon: "👶",
  },
  death: {
    label: "Deaths",
    color: "var(--color-event-death)",
    icon: "🪦",
  },
  baptism: {
    label: "Baptisms",
    color: "var(--color-event-baptism)",
    icon: "⛪",
  },
  church_event_witness: {
    label: "Baptism/Marriage Witnesses",
    color: "var(--color-event-church_event_witness)",
    icon: "👁️",
  },
  marriage: {
    label: "Marriages",
    color: "var(--color-event-marriage)",
    icon: "💍",
  },
  jail_entry: {
    label: "Jail Entries",
    color: "var(--color-event-jail_entry)",
    icon: "👮‍♂️",
  },
  toll: {
    label: "Tolls",
    color: "var(--color-event-toll)",
    icon: "⛵",
  },
  maritime_enlistment: {
    label: "Maritime Enlistments",
    color: "var(--color-event-maritime_enlistment)",
    icon: "⚓",
  },
  maritime_discharge: {
    label: "Maritime Discharges",
    color: "var(--color-event-maritime_discharge)",
    icon: "🏠",
  },
  maritime_death: {
    label: "Maritime Deaths",
    color: "var(--color-event-maritime_death)",
    icon: "🪦",
  },
  medical: {
    label: "Medical",
    color: "var(--color-event-medical)",
    icon: "💉",
  },
  military_enlistment: {
    label: "Military Enlistments",
    color: "var(--color-event-military_enlistment)",
    icon: "🎖️",
  },
  military_discharge: {
    label: "Military Discharges",
    color: "var(--color-event-military_discharge)",
    icon: "🎖️",
  },
  citizenship: {
    label: "Citizenships",
    color: "var(--color-event-citizenship)",
    icon: "🏛️",
  },
  church_membership: {
    label: "Church Memberships",
    color: "var(--color-event-church_membership)",
    icon: "⛪",
  },
  other: {
    label: "Other",
    color: "var(--color-event-other)",
    icon: "📜",
  },
  notarial_entry: {
    label: "Notarial Entries",
    color: "var(--color-event-notarial_entry)",
    icon: "📃",
  },
  university: {
    label: "University",
    color: "var(--color-event-university)",
    icon: "🎓",
  },
} as const;