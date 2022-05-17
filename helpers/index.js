import cookie from "cookie"

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export const formatMoney = (val, decimal = 0, currency = '$') => {
  if(val === undefined) return '';
  
  let num = typeof val === 'string' ? parseFloat(val) : val;

  var parts = num.toFixed(decimal).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (currency || '') + parts.join(".");
}

export function shortWalletAddr(address) {
  if(address) 
      return address.slice(0,5) + "..." + address.slice(-4)
  return '';
}

export function timeRemaining(time) {
  const now = new Date();
  const newTime = new Date(time)
  let timeDiff = newTime.getTime() - now.getTime()
  if(timeDiff < 0)
    return "0 days"
  return secondsToDhms(timeDiff / 1000)
}

export function dayRemaining(time) {
  const now = new Date();
  const newTime = new Date(time)
  let timeDiff = newTime.getTime() - now.getTime()
  if(timeDiff < 0)
    return "0 days"
    
  const d = Math.ceil(timeDiff / 1000 / (3600*24));

  return d + " days"
}

export const convertUnixTime = (unix)  => {
  let a = new Date(unix * 1000),
      year = a.getFullYear(),
      months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
      month = a.getMonth(),
      date = a.getDate(),
      hour = a.getHours(),
      min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
      sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  return `${month +1}/${date}/${year}, ${hour}:${min}:${sec}`;
}



export function secondsToDhms(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600*24));
  const h = Math.floor(seconds % (3600*24) / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);
  
  let sDisplay = s > 0 ? s + "s" : "";
  let mDisplay = m > 0 ? m + "m" : "";
  if( m > 0 && s > 0 ) mDisplay += " "
  let hDisplay = h > 0 ? h + "h" : "";
  if( h > 0 && (m > 0 || s > 0) ) hDisplay += " "
  let dDisplay = d > 0 ? d + "d" : "";
  if( d > 0 && (h > 0 || m > 0 || s > 0) ) dDisplay += " "
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

export const date2normal = (date) =>  {
  const cTime = new Date(date)
  
  return (cTime.getMonth() + 1) + "/" + cTime.getDate() + "/" + cTime.getFullYear()
}



const make2digits = (val) => {
  return ('0' + val).slice(-2)
}

export const time2str = (date) =>  {
  if(date === undefined) return '';
  const cTime = new Date(date)    
  const hour = cTime.getHours();
  
  return make2digits(hour % 12 === 0 ? 12 : hour) + ":" + make2digits(cTime.getMinutes()) + " " + (hour < 12 ? 'AM' : 'PM')
}

export const datetime2normal = (date) =>  {
  return date2normal(date) + "" + time2str(date)
}


