import Vue from 'vue'

//#region Error Events
export function ERR(msg)
{
    Vue.notify({
        group: 'Barayand',
        title: 'Error occurred',
        text: msg,
        type:"error"
      })
}
export function ERRFILEFORMAT()
{
  ERR('فرمت فایل انتخابی نامعتبر است');
}
export function ERRFILESIZE(allowsize = "")
{
  ERR(`حجم فایل انتخابی نباید بیشتر از ${allowsize} باشد`);
}
//#endregion

//#region Checker Events
/**
 * @param {any} file - user selected file
 * @param {number} maxw - allow max width size
 * @param {number} maxh - allow max height size
 * @param {number} minw - allow min width size
 * @param {number} minh - allow min height size
 * @param {number} asr - allow aspect ratio
*/
export function CHKIMAGESIZE(file,maxw = 0,maxh = 0,minw = 0,minh = 0,asr = 0)
{
        var _URL = window.URL || window.webkitURL;
        var img = new Image();
        img.onload = function() {
            //alert(this.width + " " + this.height);
            // console.log(img.src);
            if(maxw > 0 && this.width > maxw)
            {
              ERR(`عرض عکس نباید بیشتر از ${maxw}px باشد`);
              return false;
            }
            else if(maxh > 0 && this.height > maxh)
            {
              ERR(`ارتفاع عکس نباید بیشتر از ${maxh}px باشد`);
              return false;
            }
            else if(minw > 0 && this.width < minw)
            {
              ERR(`عرض عکس نباید کمتر از ${minw}px باشد`);
              return false;
            }
            else if(minh > 0 && this.height < minh)
            {
              ERR(`ارتفاع عکس نباید کمتر از ${minh}px باشد`);
              return false;
            }
            return true;
            var ratio = Math.min(maxw / this.width, maxh / this.height);
           
            
        };
 
        img.src = _URL.createObjectURL(file);

}
//#endregion

//#region Success Events
export function OK(msg)
{
    Vue.notify({
        group: 'Barayand',
        title: 'Successfull',
        text: msg,
        type:"success"
      })
}
//#endregion
export function resultChk(d)
{
   
    if(d.status)
    {
        OK(d.msg);
    }
    else
    {
      console.error(d);
        ERR(d.msg);
    }
    return d.status;
}