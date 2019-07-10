// kullandigimiz moduleler 
var request = require('request'); 
var bodyParser = require('body-parser'); 
var express = require('express'); 	

var app=express()
app.use(bodyParser.urlencoded({extended:true}));//Middleware
var kurlar; //Global olarK tanımladık, post methodunda da tanımlı olsun diye
app.get('/',function(req,res){ //linkten döviz bilgileri isteyeceğiz
    var url="https://api.canlidoviz.com/web/items?marketId=1&type=0";
	request(url,function(error,response,body){
    	if(!error&&(response.statusCode==200))
    	{
            kurlar=JSON.parse(body); //JSON'u normal stringe dönüştürdük
			
            var getWebsite = '<!DOCTYPE html><html><head><meta name="viewport"'+ 
							 'content="width=device-width, initial-scale=1">'+
                             '<style> * {box-sizing: border-box;} .column {'+ 
							 'float: left;width: 50%;padding: 10px;height: 850px;}'+
                             '.row:after {content: "";display: table;clear: both;}</style></head>'+
                             '<body><div class="row"><div class="column"'+ 
							 //select optionlar degistiği zaman değerler değişsin diye ve server'dan değerler cekeceğimiz için post methodu kullandık.
							 'style="background-color:#ecddf3;"><h3>Kurlar</h3><form action="/" method="POST">'+
                             '<select name="kurlar" size="18" onchange="this.form.submit()">' 
            var sayac = 0
            while(sayac<kurlar.length){ //Listbox değerlerini linkten gelen bilgilerle elde ediyoruz
                getWebsite=getWebsite+'<option value='+sayac+'>'+kurlar[sayac].name+'</option>'
                sayac++                
            }
            getWebsite=getWebsite+'</select></form></div><div class="column" style="background-color:#ecddf3;">'+
                                  '<br><br><h3>Kur İsmi :</h3><h3>Alış :</h3><h3>Satış :</h3><h3>Yüzde Değişim :</h3>'+
								  //butona tıkladığımız zaman get methodunu cagırmamız lazım(linkten gelen bilgileri yenilemek için)
								  //Bu yüzden buton bir form html etiketi içinde yazdık. Formun submit özelliği olduğu için
								  //Yani Submit, client-server arasındaki iletişimi kurması için. server-client(get), client-server(post)
                                  '<h3>Döviz Kodu :</h3><br><form action="/" method="GET">'+
								  '<button type="button" onclick="this.form.submit()">Kurları Yenile</button></form></div></div>'+
                                  '</body></html>'
            res.send(getWebsite)                                 
		}
		else
            res.send('There is no valid response from the  API.');//Can only be called once
    });
});
app.post('/',function(req,res){ //client tarafından gelen post requestler için
    var indis = req.body.kurlar; //Burada body-parser ile değer cektik.
    var getWebsite = '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<style> * {box-sizing: border-box;} .column { float: left;width: 50%;padding: 10px;height: 850px;}'+
    '.row:after {content: "";display: table;clear: both;}</style></head>'+
    '<body><div class="row"><div class="column" style="background-color:#ecddf3;">'+
	'<h3>Kurlar</h3><form action="/" method="POST">'+
    '<select name="kurlar" size="18" onchange="this.form.submit()">' 
    var sayac = 0
    while(sayac<kurlar.length){
    getWebsite=getWebsite+'<option value='+sayac+'>'+kurlar[sayac].name+'</option>'
    sayac++                
    }
    var alis = Number(kurlar[indis].buyPrice).toFixed(4);
    var satis = Number(kurlar[indis].sellPrice).toFixed(4);
    getWebsite=getWebsite+'</select></form></div><div class="column" style="background-color:#ecddf3;">'+
    '<br><br><h3>Kur İsmi :'+kurlar[indis].name+'</h3><h3>Alış : '+alis+'</h3><h3>'+
	'Satış : '+satis+'</h3><h3>Yüzde Değişim :<font  color="red">'+kurlar[indis].dailyChangePercentage+'</font></h3>'+
    '<h3>Döviz Kodu :'+kurlar[indis].code+'</h3><br><form action="/" method="GET">'+
	'<button type="button" onclick="this.form.submit()">Kurları Yenile</button></form></div></div>'+
    '</body></html>'
    res.send(getWebsite)                                 
});    
app.listen(3000,function(){console.log('Web Server is running at http://127.0.0.1:3000/')})