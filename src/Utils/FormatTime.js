export const FormatTime = (timestamp, type) => {
  // Chuyển đổi timestamp thành đối tượng Date
  const date = new Date(timestamp);

  // Lấy các thành phần của ngày và giờ
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Định dạng các thành phần ngày và giờ thành chuỗi
  const dayStr = day < 10 ? `0${day}` : day;
  const monthStr = month < 10 ? `0${month}` : month;
  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  // Định dạng chuỗi kết quả theo yêu cầu của type
  if (type === 1) {
    return `${dayStr}/${monthStr}/${year} ${hoursStr}:${minutesStr}`;
  } else if (type === 2) {
    return `${hoursStr}:${minutesStr}`;
  } else {
    throw new Error(
      'Invalid type parameter. Use 1 for "ngày/tháng/năm giờ:phút" format and 2 for "giờ:phút" format.'
    );
  }
};

export const FormatDateJsonPro = (date, type = 0) => {
  if (date === "" || date === "1900-01-01T00:00:00") return "";
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    dayNumber = "" + d.getUTCDay(),
    year = d.getFullYear(),
    h = d.getHours() - 7,
    m = d.getMinutes(),
    s = d.getSeconds();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (month.toString().length < 2) month = "0" + month;
  if (day.toString().length < 2) day = "0" + day;
  if (h.toString().length < 2) h = "0" + h;
  if (m.toString().length < 2) m = "0" + m;

  if (s.toString().length < 2) s = "0" + s;

  if (date === undefined) return "";

  if (type === 0) {
    return [month, day, year].join("/") + " " + [h, m, s].join(":");
  }
  if (type === 1) {
    return [month, day, year].join("/") + " 00:00:00";
  }
  if (type === 2) {
    return [month, day, year].join("/") + " 23:59:59";
  }
  if (type === 3) {
    return [month, day, year].join("/");
  }
  if (type === 4) return [year, month, day].join("-");

  if (type === 6) return { year: year, month: month };

  if (type === 7) return [day, month, year].join("/");

  if (type === 8) return [month, year].join("-");

  if (type === 9) return [year, month].join("-");

  if (type === 5) return [h, m].join(":") + " " + [day, month, year].join("/");

  if (type === 10) {
    return [day, month, year].join("/") + " " + [h, m, s].join(":");
  }
  if (type === 11) {
    return [day, month].join("/");
  }
  if (type === 12) {
    return ["Ngày", day, "tháng", month, "năm", year].join(" ");
  }
  if (type === 13) {
    return [year, month, day, h, m, s].join("");
  }
  if (type === 14) {
    return [day, "/", month].join("");
  }
  if (type === 15) return [year, month, day].join("-") + " " + [h, m].join(":");

  if (type === 16) return [year, month, day].join("-");

  if (type === 17) return [h, m].join(":");
  if (type === 18)
    return (
      [day, month, year.toString().substring(2)].join("") +
      "" +
      [h, m, s].join("")
    );
  if (type === 19) {
    return (
      [day, month, year.toString().substring(2)].join("/") +
      " " +
      [h, m].join(":")
    );
  }
  if (type === 20) {
    let d1 = new Date(),
      month1 = "" + (d1.getMonth() + 1),
      day1 = "" + d1.getDate(),
      year1 = d1.getFullYear(),
      h1 = d1.getHours(),
      m1 = d1.getMinutes();

    if (month1.toString().length < 2) month1 = "0" + month1;
    if (day1.toString().length < 2) day1 = "0" + day1;
    if (h1.toString().length < 2) h1 = "0" + h1;
    if (m1.toString().length < 2) m1 = "0" + m1;

    return [year1, month1, day1].join("-") + " " + [h1, m1].join(":");
  }
  if (type === 21) {
    return [day, month, year].join("/") + " " + [h, m].join(":");
  }
};

export const parseTimeSql = (time, type) => {
  const date = new Date(time);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Định dạng các thành phần ngày và giờ thành chuỗi
  const dayStr = day < 10 ? `0${day}` : day;
  const monthStr = month < 10 ? `0${month}` : month;
  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  if (type === 1) {
    return `${dayStr}/${monthStr}/${year} ${hoursStr}:${minutesStr}`;
  } else if (type === 2) {
    return `${hoursStr}:${minutesStr}`;
  } else {
    throw new Error(
      'Invalid type parameter. Use 1 for "ngày/tháng/năm giờ:phút" format and 2 for "giờ:phút" format.'
    );
  }
};

export const FormatDate = (datetime) => {
  try {
    // Chuyển chuỗi thời gian thành đối tượng Date mà không thay đổi múi giờ
    const date = new Date(datetime);

    // Kiểm tra xem đối tượng Date có hợp lệ không
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    // Lấy các phần của ngày và giờ theo giờ UTC để đảm bảo chính xác
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch (error) {
    console.error("Error converting date:", error.message);
    return datetime;
  }
};

export const FormatDateJson = (date, key = 0) => {
  if (date === undefined) {
    let data = "";
    return data;
  }

  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear(),
    h = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  // 0 Lấy Tháng/ngày/năm Giờ:phut:Giây
  // 2 Lấy năm/Tháng
  // 3 Lấy ngày/tháng/năm Giờ:phut:Giây
  // 4 Lấy Tháng/Năm
  // 5 Lấy ngày/tháng/năm
  // 6 Lấy ngày/tháng

  if (key === 0) return [month, day, year].join("/") + " " + [h, m].join(":");
  else if (key === 2) return [year, month].join("-");
  else if (key === 3)
    return [day, month, year].join("/") + " " + [h, m].join(":");
  else if (key === 4) return [month, year].join("-");
  else if (key === 5) return [day, month, year].join("/");
  else if (key === 6) return [day, month].join("-");
  else if (key === 7) return [year, month, day].join("-");
  else if (key === 8)
    return [year, month, day].join("-") + " " + [h, m, s].join(":");
  else if (key === 9) return [day, month].join("/");
  else return [month, day, year].join("/");
};

export function dateTimeFormat(dateTimeString, type) {
  if (typeof dateTimeString !== "string") {
    console.error("Invalid dateTimeString:", dateTimeString);
    return ""; // hoặc giá trị mặc định khác
  }

  // Tách chuỗi thời gian thành ngày và giờ
  const [datePart, timePart] = dateTimeString.split(" ");

  // Tách phần ngày thành năm, tháng, ngày
  const [year, month, day] = datePart.split("-");

  let formattedDateTime;

  // Xác định định dạng đầu ra dựa trên giá trị của type
  switch (type) {
    case 1:
      // Định dạng ngày/tháng/năm giờ:phút:giây
      formattedDateTime = `${day}/${month}/${year} ${timePart}`;
      break;
    case 2:
      // Định dạng ngày/tháng/năm giờ:phút
      formattedDateTime = `${day}/${month}/${year} ${timePart.slice(0, 5)}`;
      break;
    case 3:
      // Định dạng ngày/tháng/năm
      formattedDateTime = `${day}/${month}/${year}`;
      break;
    default:
      // Định dạng mặc định nếu type không hợp lệ
      formattedDateTime = `${day}/${month}/${year} ${timePart}`;
      break;
  }

  return formattedDateTime;
}
// Ví dụ sử dụng
// const timestamp = 1718821492732;
// const type1 = 1;
// const type2 = 2;
import { format } from "date-fns";
import moment from "moment/moment";

export const parseTimeBE = (time, type) => {
  const date = new Date(time);
  if (type === 1) {
    return format(date, "dd/MM/yyyy HH:mm");
  } else if (type === 2) {
    return format(date, "HH:mm");
  } else {
    throw new Error("sai định dạng");
  }
};

const todayNow = new Date(Date.now());
export const todayLogin = moment(todayNow).format("YYYY/MM/DD");
