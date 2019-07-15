# guncelDovizKurlari
Bu proje, bir <i>“Güncel Döviz Kurları Web Uygulaması”</i>dır. <strong><i>Node.js/Express</i></strong> ile yazılmış olup, lokal bilgisayarımızda çalıştırabiliyoruz. Uygulaması, kök dizinine (root directory) gelen bir “get request” için arka planda <a href="https://api.canlidoviz.com/web/items?marketId=1&type=0" target="_blank">buradaki</a> adrese bir “get request” gönderiyor ve cevap olarak geri dönen JSON Stringini parse ediyor. Sonrasında kullanıcıya şekildeki gibi bir HTML sayfasını response olarak gönderiyor.

![](https://github.com/shrgrl/guncelDovizKurlari/blob/master/img.JPG)

Kullanıcı <i>select</i> listesinden bir döviz kuru seçtiğinde ekranın sağ tarafında ilgili kura ait bilgiler görüntüleniyor. Kullanıcı eğer isterse, yine ekranın sağında yer alan bir buton sayesinde döviz kurlarını yenileyebiliyor.
