import { supabase } from "./supabase";

const DT_NAME = "study-record";

export const getAllRecords = async () => {
  const records = await supabase.from(DT_NAME).select("*");
  return records;
};

export const addDbRecord = async (newRecord) => {
  const res = await supabase.from(DT_NAME).upsert(newRecord).select();
  return res.data[0];
};

export const deleteDbRecord = async (id) => {
  await supabase.from(DT_NAME).delete().eq("id", id);
};
