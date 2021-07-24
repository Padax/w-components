const DateTime={
  format:function(d){
    let year=d.getFullYear();
    let month=d.getMonth()+1;
    let date=d.getDate();
    return year+"-"+(month>9?month:"0"+month)+"-"+(date>9?date:"0"+date);
  }
};
export default DateTime;