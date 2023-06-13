import { getDatabase, ref, onValue } from "firebase/database";
export const database = getDatabase();
export const allEvents = {};

const reff = ref(database, "calendarData");

onValue(reff, (snapshot) => {
  const data = snapshot.val();
  for (var key in data) {
    allEvents[key] = data[key];
  }
  console.log(allEvents);
});
