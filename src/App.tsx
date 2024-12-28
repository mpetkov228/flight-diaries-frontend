import { useState, useEffect } from "react";
import axios from "axios";

import { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries')
      .then(response => setDiaries(response.data));
  }, []);

  return (
    <div>
      <h3>Add a new entry</h3>
      <form>
        <div>
          date <input />
        </div>
        <div>
          visibility <input />
        </div>
        <div>
          weather <input />
        </div>
        <div>
          comment <input />
        </div>
        <button type="submit">add</button>
      </form>
      <h3>Diary entries</h3>
      {diaries.map(entry => 
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <div>
            visibility: {entry.visibility}
          </div>
          <div>
            weather: {entry.weather}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
