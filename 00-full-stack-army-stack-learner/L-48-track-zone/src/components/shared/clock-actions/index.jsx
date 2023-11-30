import { useState } from 'react';

const defaultOffset = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

const ClockActions = ({ local = false, clock, updateClock }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'offset') {
      value = parseInt(value) * 60;
    }
    updateClock({ [name]: value });
  };

  return (
    <div>
      <button onClick={() => setIsEdit((p) => !p)}>Edit</button>
      {local ? <button>Create</button> : <button>Delete</button>}
      {isEdit && (
        <div>
          <input type='text' name='title' value={clock.title} onChange={handleChange} />
          <select name='timezone' value={clock.timezone} onChange={handleChange}>
            <option value='GMT'>GMT</option>
            <option value='UTC'>UTC</option>
            <option value='PST'>PST</option>
            <option value='EST'>EST</option>
            <option value='EDT'>EDT</option>
            <option value='BST'>BST</option>
            <option value='MST'>MST</option>
          </select>
          {(clock.timezone === 'GMT' || clock.timezone === 'UTC') && (
            <select name='offset' value={clock.offset / 60} onChange={handleChange}>
              {defaultOffset.map((item, i) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
};

export default ClockActions;
