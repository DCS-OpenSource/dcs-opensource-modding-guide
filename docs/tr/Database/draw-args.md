# Ayrılmış Draw Arg'lar

!!! Warning
    Bu liste tamamlanmış değildir; ekleyecek daha fazla bilginiz varsa lütfen bildirin.

    TF-51 kaynak alınmıştır; FC3'e özel arg'ları **hesaba katmaz**.

| **Arg** | **Kullanım** | **Değerler** |
|---------|--------------|--------------|
| 0 | Tail/Nose wheel toplama | 0: teker yukarı, 1: teker aşağı |
| 1 | Tail/Nose wheel süspansiyonu | 0: uzamış, 1: sıkışmış |
| 2 | Tail/Nose wheel yönlendirme | -1: sol, 0: düz, 1: sağ (tailwheel uçaklarda ters çevirin) |
| 3 | Sol iniş takımı açılması | 0: teker yukarı, 1: teker aşağı |
| 4 | Sol iniş takımı süspansiyon sıkışması | |
| 5 | Sağ iniş takımı açılması | |
| 6 | Sağ iniş takımı süspansiyon sıkışması | |
| 7 | N/A | |
| 8 | N/A | |
| 9 | N/A | |
| 10 | Flap açılması | |
| 11 | Sağ aileron hareketi | |
| 12 | Sol aileron hareketi | |
| 16 | Elevator hareketi | |
| 17 | Rudder hareketi | |
| 26 | Bomba bölmesi açılması | 0: kapalı, 1: açık |
| 37 | Helikopter ana rotor kontrolü | EFM içinde arg 40'ı döndürmek için sürülür |
| 38 | Canopy | 0: kapalı, 1: görünmez |
| 39 | Pilot baş dönüşü | -1: sola bakış, 1: sağa bakış |
| 40 | Helikopter ana rotor | Yalnızca görsel; EFM içinde arg 37'yi sürün |
| 41 | Helikopter kuyruk rotoru | Yalnızca görsel; EFM içinde arg 42'yi sürün |
| 42 | Helikopter kuyruk rotor kontrolü | EFM içinde arg 41'i döndürmek için sürülür |
| 50 | Pilot görünürlüğü | 0: görünür, 1: görünmez |
| 51 | Mürettebat #2 görünürlüğü | 0: görünür, 1: görünmez |
| 52 | Mürettebat #3 görünürlüğü | 0: görünür, 1: görünmez |
| 53 | Mürettebat #4 görünürlüğü | 0: görünür, 1: görünmez |
| 54 | Mürettebat #5 görünürlüğü | 0: görünür, 1: görünmez |
| 55 | Mürettebat #6 görünürlüğü | 0: görünür, 1: görünmez |
| 56 | Mürettebat #7 görünürlüğü | 0: görünür, 1: görünmez |
| 76 | Tail/Nose wheel yönlendirme | -1: tam sol dönüş, 1: tam sağ dönüş |
| 99 | Pilot baş eğimi | -1: aşağı bakış, 1: yukarı bakış |
| 101 | Tail/Nose wheel dönüşü | 0-1: artış ileri yöndür |
| 102 | Sağ teker dönüşü | 0-1: artış ileri yöndür |
| 103 | Sol teker dönüşü | 0-1: artış ileri yöndür |
| 109 | Bail out sırasında düşen kaçış kapağı / canopy | 0.9 görünür/kapalı, 1 gizli/açık |
| 114 | Canopy görünürlüğü | 0: görünür, 1: görünmez |
| 115 | Sağ teker kapağı | 0: kapalı, 1: açık |
| 116 | Sol teker kapağı | 0: kapalı, 1: açık |
| 370 | Prop 1 dönüşü (ayrılmış) | ANİMASYON VERMEYİN, 370-374 "NEW PROP BLUR" İÇİN AYRILMIŞTIR |
| 371 | Prop 2 dönüşü (ayrılmış) | "NEW PROP BLUR" KULLANILDIĞINDA DCS BU ARG'LARI OTOMATİK AYARLAR |
| 372 | Prop 3 dönüşü (ayrılmış) | -- |
| 373 | Prop 4 dönüşü (ayrılmış) | -- |
| 380 | Propeller 1 hasarı | Yalnızca frame 100'de görünür |
| 381 | Propeller 2 hasarı | Yalnızca frame 100'de görünür |
| 382 | Propeller 3 hasarı | Yalnızca frame 100'de görünür |
| 383 | Propeller 4 hasarı | Yalnızca frame 100'de görünür |
| 413 | Prop 1 pitch | 0 (fine) ile 1 (feathered) |
| 414 | Prop 2 pitch | 0 (fine) ile 1 (feathered) |
| 415 | Prop 3 pitch | 0 (fine) ile 1 (feathered) |
| 416 | Prop 4 pitch | 0 (fine) ile 1 (feathered) |
| 407 | Prop dönüşü | -1 ile 1: iki tur |
| 408 | Prop dönüşü | -1 ile 1: iki tur |
| 409 | Prop dönüşü | -1 ile 1: iki tur |
| 410 | Prop dönüşü | -1 ile 1: iki tur |
| 459 | Pilot ölümü | 0-1 (ölü) |
| 460 | Bombardier ölümü | 0-1 (ölü) |
| 461 | Engineer ölümü | 0-1 (ölü) |
| 462 | Navigator ölümü | 0-1 (ölü) |
| 463 | Midupper gunner ölümü | 0-1 (ölü) |
| 464 | Tail gunner ölümü | 0-1 (ölü) |
| 443 | Dinamik side/bort numaraları ilk hane | alfanümerik 0-9A-Z şeridinde; -0.1: boş, 0: "0", 1.0: "A", 3.6 (evet!): "Z". Değer mission editor üzerinden ayarlanır |
| 444 | Dinamik side/bort numaraları ikinci hane | alfanümerik 0-9A-Z şeridinde; -0.1: boş, 0: "0", 1.0: "A", 3.6 (evet!): "Z". Değer mission editor üzerinden ayarlanır |
| 445 | Dinamik side/bort numaraları üçüncü hane | alfanümerik 0-9A-Z şeridinde; -0.1: boş, 0: "0", 1.0: "A", 3.6 (evet!): "Z". Değer mission editor üzerinden ayarlanır |
| 475 | Prop 1 görünürlüğü | 0 göster, 1-100 gizli; DCS tarafından "new prop blur" diskiyle değiştirilir |
| 476 | Prop 2 görünürlüğü | 0 göster, 1-100 gizli; DCS tarafından "new prop blur" diskiyle değiştirilir |
| 477 | Prop 3 görünürlüğü | 0 göster, 1-100 gizli; DCS tarafından "new prop blur" diskiyle değiştirilir |
| 478 | Prop 4 görünürlüğü | 0 göster, 1-100 gizli; DCS tarafından "new prop blur" diskiyle değiştirilir |
