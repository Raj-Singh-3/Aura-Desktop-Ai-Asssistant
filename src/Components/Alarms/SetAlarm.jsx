// // src/components/Alarms/AlarmManager.jsx
// import React, { useState } from 'react';

// const AlarmManager = ({ setBotStatus }) => {
//   const [alarms, setAlarms] = useState([]);
//   const [time, setTime] = useState('');
//   const [label, setLabel] = useState('');

//   const setAlarm = () => {
//     if (!time || !label) {
//       alert('Please provide both time and label.');
//       setBotStatus('Time or label missing for alarm.');
//       return;
//     }

//     const newAlarm = { id: Date.now(), time, label };
//     setAlarms([...alarms, newAlarm]);
//     setTime('');
//     setLabel('');
//     setBotStatus(`Alarm set for ${time}`);
//   };

//   const deleteAlarm = (id) => {
//     const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
//     setAlarms(updatedAlarms);
//     setBotStatus('Alarm deleted');
//   };

//   return (
//     <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-6">
//       <h2 className="text-xl font-semibold text-[#667eea] mb-4">⏰ Alarm & Reminders</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <div>
//           <label className="block text-[#a0a0ff] mb-2">Time</label>
//           <input
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea]"
//           />
//         </div>
//         <div>
//           <label className="block text-[#a0a0ff] mb-2">Label</label>
//           <input
//             type="text"
//             value={label}
//             onChange={(e) => setLabel(e.target.value)}
//             placeholder="e.g. Standup Meeting"
//             className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea]"
//           />
//         </div>
//       </div>

//       <button
//         onClick={setAlarm}
//         className="mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#4ecdc4] to-[#44a08d] text-white hover:shadow-lg transition-all"
//       >
//         ⏰ Set Alarm
//       </button>

//       <div className="max-h-80 overflow-y-auto mt-4 space-y-3">
//         {alarms.length === 0 ? (
//           <p className="text-white/70 italic">No alarms set yet...</p>
//         ) : (
//           alarms.map((alarm) => (
//             <div
//               key={alarm.id}
//               className="flex justify-between items-center bg-white/10 border border-white/20 rounded-lg p-4"
//             >
//               <div>
//                 <div className="text-white text-lg font-semibold">{alarm.time}</div>
//                 <div className="text-[#a0a0ff]">{alarm.label}</div>
//               </div>
//               <button
//                 onClick={() => deleteAlarm(alarm.id)}
//                 className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
//               >
//                 🗑️
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AlarmManager;
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Plus,
  Trash2,
  Edit3,
  Bell,
  AlarmClock,
  Calendar,
} from "lucide-react";

const SetAlarm = ({ voiceCommand }) => {
  const [alarms, setAlarms] = useState([]);
  const [newAlarm, setNewAlarm] = useState({
    time: "",
    date: "",
    label: "",
    repeat: "none",
    sound: "default",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (voiceCommand && voiceCommand.trim()) {
      processVoiceCommand(voiceCommand);
    }
  }, [voiceCommand]);

  // Check if any alarm should ring
  useEffect(() => {
    alarms.forEach((alarm) => {
      const now = currentTime;
      const [alarmHour, alarmMinute] = alarm.time.split(":").map(Number);
      const alarmDate = new Date(alarm.date);
      alarmDate.setHours(alarmHour, alarmMinute, 0, 0);

      if (
        alarm.isActive &&
        !alarm.triggered &&
        now.toISOString().slice(0, 16) === alarmDate.toISOString().slice(0, 16)
      ) {
        alert(`⏰ Alarm: ${alarm.label || "Unnamed Alarm"} is ringing!`);
        alarm.triggered = true;
        setAlarms([...alarms]);
      }
    });
  }, [currentTime]);

  const processVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();

    if (
      lowerCommand.includes("set alarm") ||
      lowerCommand.includes("create alarm")
    ) {
      const timeMatch =
        command.match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i) ||
        command.match(/(\d{1,2})\s*(am|pm)/i);

      if (timeMatch) {
        let hour = parseInt(timeMatch[1]);
        const minute = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
        const period = timeMatch[3] || timeMatch[2];

        if (period && period.toLowerCase() === "pm" && hour !== 12) {
          hour += 12;
        } else if (period && period.toLowerCase() === "am" && hour === 12) {
          hour = 0;
        }

        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        setNewAlarm((prev) => ({ ...prev, time: timeString }));
        setIsCreating(true);
      }

      const labelMatch = command.match(/for (.+?)(?:\s+at|\s+in|\s*$)/i);
      if (labelMatch) {
        setNewAlarm((prev) => ({ ...prev, label: labelMatch[1] }));
      }
    }
  };

  const addAlarm = () => {
    if (!newAlarm.time) return;

    const alarm = {
      id: Date.now(),
      ...newAlarm,
      date: newAlarm.date || new Date().toISOString().split("T")[0],
      isActive: true,
      triggered: false,
    };

    setAlarms((prev) => [...prev, alarm]);
    setNewAlarm({
      time: "",
      date: "",
      label: "",
      repeat: "none",
      sound: "default",
    });
    setIsCreating(false);
  };

  const deleteAlarm = (id) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
  };

  return (
    <div className="p-4 text-white h-full overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <AlarmClock className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold">Set Alarms</h2>
      </div>

      <AnimatePresence>
        {alarms.map((alarm) => (
          <motion.div
            key={alarm.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-between items-center bg-cyan-800/40 p-4 rounded-xl mb-2"
          >
            <div>
              <h3 className="text-lg font-semibold">
                {alarm.label || "No Label"}
              </h3>
              <p className="text-sm">
                {alarm.date} at {alarm.time}
              </p>
            </div>
            <button
              onClick={() => deleteAlarm(alarm.id)}
              className="text-red-400 hover:text-red-600"
            >
              <Trash2 />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {!isCreating ? (
        <button
          onClick={() => setIsCreating(true)}
          className="mt-4 flex items-center gap-2 text-cyan-400 border border-cyan-400 px-4 py-2 rounded-full hover:bg-cyan-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add New Alarm
        </button>
      ) : (
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm">Label</label>
            <input
              type="text"
              value={newAlarm.label}
              onChange={(e) =>
                setNewAlarm({ ...newAlarm, label: e.target.value })
              }
              className="w-full p-2 bg-slate-800 border border-slate-600 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Time</label>
            <input
              type="time"
              value={newAlarm.time}
              onChange={(e) =>
                setNewAlarm({ ...newAlarm, time: e.target.value })
              }
              className="w-full p-2 bg-slate-800 border border-slate-600 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Date</label>
            <input
              type="date"
              value={newAlarm.date}
              onChange={(e) =>
                setNewAlarm({ ...newAlarm, date: e.target.value })
              }
              className="w-full p-2 bg-slate-800 border border-slate-600 rounded"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={addAlarm}
              className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetAlarm;
