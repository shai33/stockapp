export const getCurrentDate = (offset) => {
    let date = new Date();
    let previousDay = new Date(date.setDate(date.getDate() + offset));

    return previousDay.toISOString().slice(0,10);
};
export const calcDayHours = (offsetHrs, offsetMins) => {
    let date = new Date();
    let previousHour = new Date(date.setHours(date.getHours() + offsetHrs, offsetMins));
    
    return previousHour.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
};
export const calcWeekDays = (offset) => {
  let date = new Date();
  let previousDay = new Date(date.setDate(date.getDate() + offset));
  
  return previousDay.toLocaleString('en-US', { month: 'short', day: 'numeric' })
};
export const calcMonthDays = (offsetDays) => {
    let date = new Date();
    let previousDay = new Date(date.setMonth(date.getMonth(), offsetDays));
    
    return previousDay.toLocaleString('en-US', { month: 'short', day: 'numeric' })
};
export const calcYearDays = (offsetMonth, offsetDays) => {
  let date = new Date();
  let previousDay = new Date(date.setFullYear(date.getFullYear(), date.getMonth() + offsetMonth, offsetDays));
  
  return previousDay.toLocaleString('en-US', { month: 'short', year: 'numeric' })
};

