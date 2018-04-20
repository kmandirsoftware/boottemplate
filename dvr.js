var request = require("request")

module.exports = {
   process: function(res,receiver,cb) {
      var url = "https://grasshopper-client.dishanywhere.com:8443/grasshopper/dvr?receiverid="+receiver+"&type=raw&key=8da463b562553bacb4a73ec451d27927";
      console.log(url);
      //res.end(JSON.stringify(receiver));

   request({
       url: url
   }, function (error, response, body) {
           var dvrdata = [];
           var i=0;

       if (!error && response.statusCode === 200) {
           var info = JSON.parse(body);
           //console.log(info.req_pack.xml_file.pvr_list.pvr_record) // Print the json response
           info.req_pack.xml_file.pvr_list.pvr_record.forEach(function(key) {
               dvrdata[i]={};
               dvrdata[i].svc_name = key.svc_name;
               dvrdata[i].es_id = key.es_id;
               dvrdata[i].event_name = key.event_name;
               dvrdata[i].network_affiliate = key.network_affiliate;
               if(key.mediaview[0]){
                 dvrdata[i].url= key.mediaview[0].program_logo;
               }else{
                 dvrdata[i].url="";
               }
               i++;
           });
         cb(null,res,dvrdata);
       }
         //console.log(dvrdata);

   })
  }
}
