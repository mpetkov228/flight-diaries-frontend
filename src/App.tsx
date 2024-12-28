import { useState, useEffect } from "react";

import { DiaryEntry } from "./types";
import diaryService from "./services/diaryService";

const App = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getEntries()
      .then(data => setDiaries(data));
  }, []);

  const clearForm = () => {
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry = {
      date,
      visibility,
      weather,
      comment
    };
    diaryService.createEntry(newEntry)
      .then(data => setDiaries(diaries.concat(data)));
    
    clearForm();
  };

  return (
    <div>
      <h3>Add a new entry</h3>
      <form onSubmit={entryCreation}>
        <div>
          date 
          <input 
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility 
          <input 
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather 
          <input 
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment 
          <input 
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
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
