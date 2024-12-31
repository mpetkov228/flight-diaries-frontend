import { useState, useEffect } from "react";

import { DiaryEntry } from "./types";
import diaryService from "./services/diaryService";

const App = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState('');

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

  const visibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value);
  };

  const weatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value);
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
      .then(data => setDiaries(diaries.concat(data)))
      .catch(error => {
        const issues = error.response.data.error[0];
        setError(`Error: Incorrect ${issues.path[0]}: ${issues.received}`);
      });
    
    setTimeout(() => {
      setError('');
    }, 5000);
    
    clearForm();
  };

  const errorStyle = {
    color: 'red',
    margin: 5
  };


  return (
    <div>
      <h3>Add a new entry</h3>
      {error !== '' ? <div style={errorStyle}>{error}</div> : null}
      <form onSubmit={entryCreation}>
        <div>
          date 
          <input 
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility 
          great <input type="radio" value="great" name="visibility" onChange={visibilityChange} />
          good <input type="radio" value="good" name="visibility" onChange={visibilityChange} />
          ok <input type="radio" value="ok" name="visibility" onChange={visibilityChange} />
          poor <input type="radio" value="poor" name="visibility" onChange={visibilityChange} />
        </div>
        <div>
          weather 
          sunny <input type="radio" value="sunny" name="weather" onChange={weatherChange} />
          rainy <input type="radio" value="rainy" name="weather" onChange={weatherChange} />
          cloudy <input type="radio" value="cloudy" name="weather" onChange={weatherChange} />
          stormy <input type="radio" value="stormy" name="weather" onChange={weatherChange} />
          windy <input type="radio" value="windy" name="weather" onChange={weatherChange} />
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
