import { unix2date } from "@/utils/dateConversion";

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

  {
    label: "نام رویداد",
    value: (publisher) => publisher.eventName || "------",
    sortKey: "eventName",
  },
  {
    label: "تاریخ",
    value: (publisher) => unix2date(publisher.date) || "------",
    sortKey: "date",
  },
  {
    label: "مدرسه",
    value: (publisher) => publisher.group || "------",
    sortKey: "group",
  },
  // {
  //   label: "سطح",
  //   value: (publisher) => publisher.group2,
  //   sortKey: "group2",
  // },
];

export const breakpoints = [
  { maxWidth: 650, columns: tableColumns.length },
  { maxWidth: 450, columns: tableColumns.length - 1 },
  { maxWidth: 1, columns: 2 },
];
