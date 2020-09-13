export default (context, inject) => {
  const format_time = date => {
    var datetime = new Date(date);

    return datetime.toLocaleString("en-GB");
  };

  const time_diff = date => {
    var response = {
      dayFlag: false,
      minuteFlag: false,
      hourFlag: false,
      time: null
    };

    var time = new Date(date);
    var now = new Date();

    var difference = (time.getTime() - now.getTime()) / 1000;
    difference /= 60 * 60;

    if (Math.abs(Math.round(difference)) >= 24) {
      difference /= 24;
      response.dayFlag = true;
      response.hourFlag = false;
      response.minuteFlag = false;
    } else if (Math.abs(Math.round(difference)) < 1) {
      difference *= 60;
      response.dayFlag = false;
      response.hourFlag = false;
      response.minuteFlag = true;
    } else {
      response.dayFlag = false;
      response.hourFlag = true;
      response.minuteFlag = false;
    }
    response.time = Math.abs(Math.round(difference));

    return response;
  };

  inject("format_time", format_time);
  inject("time_diff", time_diff);
};
