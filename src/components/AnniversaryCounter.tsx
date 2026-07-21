import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const AnniversaryCounter: React.FC = () => {
  const [elapsed, setElapsed] = useState({
    years: 3,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date('2023-07-21T00:00:00');

    const updateCounter = () => {
      const now = new Date();
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setElapsed({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Años', value: elapsed.years },
    { label: 'Meses', value: elapsed.months },
    { label: 'Días', value: elapsed.days },
    { label: 'Horas', value: elapsed.hours },
    { label: 'Minutos', value: elapsed.minutes },
    { label: 'Segundos', value: elapsed.seconds },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-4">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="bg-white rounded-xl p-3 text-center border border-ink-900/10 shadow-sm"
          >
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-ink-900">
              {unit.value < 10 ? `0${unit.value}` : unit.value}
            </span>
            <span className="text-[10px] sm:text-xs text-ink-500 font-mono uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
