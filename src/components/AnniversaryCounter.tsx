import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Heart, Flame } from 'lucide-react';

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
    // Start date: July 21, 2023
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
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel rounded-3xl p-6 sm:p-8 text-center border-amber-300/30 relative overflow-hidden"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-amber-300" />
          <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
            Nuestro Tiempo Juntos
          </span>
          <Flame className="w-5 h-5 text-rose-400" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
          Desde el <span className="gold-gradient-text">21 de Julio de 2023</span>
        </h3>

        {/* Counter Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-2xl p-3 sm:p-4 border border-rose-500/30 text-center relative group hover:border-amber-300/50 transition-colors"
            >
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-amber-200 group-hover:scale-110 transition-transform">
                {unit.value < 10 ? `0${unit.value}` : unit.value}
              </span>
              <span className="text-[11px] sm:text-xs text-rose-200/80 font-light uppercase tracking-wider">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-rose-200/90 font-cursive text-lg sm:text-xl">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span>Y contando cada segundo de este amor...</span>
        </div>
      </motion.div>
    </div>
  );
};
