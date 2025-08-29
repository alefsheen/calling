export const tableColumns = [
  {
    label: "",
    value: (publisher) => (
      <></>
      // <img
      //   src={`${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}/${publisher.barcode}.jpg`}
      //   alt={publisher.name}
      //   className="w-12 h-12 rounded-full  object-cover border-2 border-teal-400"
      //   onError={(e) => {
      //     e.target.onerror = null; // prevent infinite loop if fallback also fails
      //     e.target.src = "/placeholder.png"; // fallback image
      //   }}
      // />
    ),
  },
  // {
  //   label: "فعال",
  //   value: (publisher) => publisher.active,
  //   sortKey: "active",
  // },
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
    label: "شماره همراه",
    value: (publisher) => publisher.phone || "------",
    sortKey: "phone",
  },
  {
    label: "سطح",
    value: (publisher) => publisher.group2 || "------",
    sortKey: "group2",
  },
  {
    label: "تماس پدر",
    value: (publisher) => publisher.phone_f || "------",
    sortKey: "phone_f",
  },
  {
    label: "تماس مادر",
    value: (publisher) => publisher.phone_m || "------",
    sortKey: "phone_m",
  },
  {
    label: "تماس منزل",
    value: (publisher) => publisher.phone_h || "------",
    sortKey: "phone_h",
  },
  {
    label: "کد ملی",
    value: (publisher) => publisher.melli || "------",
    sortKey: "melli",
  },
  {
    label: "نام پدر",
    value: (publisher) => publisher.father || "------",
    sortKey: "father",
  },
];

export const breakpoints = [
  { maxWidth: 1250, columns: tableColumns.length },
  { maxWidth: 1150, columns: tableColumns.length - 1 },
  { maxWidth: 1050, columns: tableColumns.length - 2 },
  { maxWidth: 950, columns: tableColumns.length - 3 },
  { maxWidth: 850, columns: tableColumns.length - 4 },
  { maxWidth: 750, columns: tableColumns.length - 5 },
  { maxWidth: 550, columns: tableColumns.length - 6 },
  { maxWidth: 450, columns: tableColumns.length - 7 },
  { maxWidth: 1, columns: 2 },
];
