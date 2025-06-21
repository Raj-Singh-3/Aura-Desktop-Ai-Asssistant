// src/components/Alarms/AlarmManager.jsx
import React, { useState } from 'react';

const AlarmManager = ({ setBotStatus }) => {
  const [alarms, setAlarms] = useState([]);
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');

  const setAlarm = () => {
    if (!time || !label) {
      alert('Please provide both time and label.');
      setBotStatus('Time or label missing for alarm.');
      return;
    }

    const newAlarm = { id: Date.now(), time, label };
    setAlarms([...alarms, newAlarm]);
    setTime('');
    setLabel('');
    setBotStatus(`Alarm set for ${time}`);
  };

  const deleteAlarm = (id) => {
    const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
    setAlarms(updatedAlarms);
    setBotStatus('Alarm deleted');
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-[#667eea] mb-4">⏰ Alarm & Reminders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[#a0a0ff] mb-2">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea]"
          />
        </div>
        <div>
          <label className="block text-[#a0a0ff] mb-2">Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Standup Meeting"
            className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea]"
          />
        </div>
      </div>

      <button
        onClick={setAlarm}
        className="mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#4ecdc4] to-[#44a08d] text-white hover:shadow-lg transition-all"
      >
        ⏰ Set Alarm
      </button>

      <div className="max-h-80 overflow-y-auto mt-4 space-y-3">
        {alarms.length === 0 ? (
          <p className="text-white/70 italic">No alarms set yet...</p>
        ) : (
          alarms.map((alarm) => (
            <div
              key={alarm.id}
              className="flex justify-between items-center bg-white/10 border border-white/20 rounded-lg p-4"
            >
              <div>
                <div className="text-white text-lg font-semibold">{alarm.time}</div>
                <div className="text-[#a0a0ff]">{alarm.label}</div>
              </div>
              <button
                onClick={() => deleteAlarm(alarm.id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlarmManager;
