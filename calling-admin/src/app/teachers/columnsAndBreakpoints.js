export const tableColumns = [
  {
    label: "نام",
    value: (publisher) => publisher.lastName || "------",
    sortKey: "lastName",
  },
  {
    label: "رمز عبور",
    value: (publisher) => publisher.phone || "------",
    sortKey: "phone",
  },
];

export const breakpoints = [
  { maxWidth: 350, columns: tableColumns.length },
  { maxWidth: 330, columns: tableColumns.length - 1 },
  { maxWidth: 300, columns: tableColumns.length - 2 },
  // { maxWidth: 400, columns: tableColumns.length - 3 },
  // { maxWidth: 700, columns: tableColumns.length - 4 },
  { maxWidth: 0, columns: 2 },
];

//////////////////////////////////////////////////////////

export const _tableColumns = [
  {
    label: "پیگیر",
    value: (publisher) =>
      (publisher.follower
        ? JSON.parse(publisher.follower).follower
        : publisher.follower) || "------",
    sortKey: "follower",
  },
  {
    label: "نام",
    value: (publisher) => publisher.lastName || "------",
    sortKey: "lastName",
  },
  {
    label: "مدرسه",
    value: (publisher) => publisher.group || "------",
    sortKey: "group",
  },
  {
    label: "سطح",
    value: (publisher) => publisher.group2 || "------",
    sortKey: "group2",
  },
];
