export const mergeArrays = (contacts, presents) => {
  const map = new Map();
  [
    ...contacts,
    ...presents.map((p) => ({
      _id: p.contactID,
      present: p.present,
      message1_recorder: p.message1_recorder,
      message2_recorder: p.message2_recorder,
    })),
  ].forEach((obj) => {
    if (map.has(obj._id)) {
      // اگر آبجکت قبلاً وجود دارد، ویژگی‌های جدید را ترکیب کن
      map.set(obj._id, { ...map.get(obj._id), ...obj });
    } else {
      // در غیر این صورت، آبجکت را اضافه کن
      map.set(obj._id, obj);
    }
  });

  return Array.from(map.values());
};
