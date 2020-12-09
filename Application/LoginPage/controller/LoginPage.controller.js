sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";
    var base;
    var foto;
    var idDeger;
    var path;
    return Controller.extend("SapUI5Tutorial.Application.LoginPage.controller.LoginPage", {
        onInit: function() {
            this.dizi = [];
            this.getView().byId("editBtn").setVisible(false)
            this.getView().byId("deleteBtn").setVisible(false)
            oModel.setProperty("/kisi", {})
        },
        onPress: function(oEvent) {
            if (this.getView().byId("nameInput").getValue("") == "" && this.getView().byId("surnameInput").getValue("") == "" && this.getView().byId("phoneInput").getValue("") == "" && this.getView().byId("fileUploader").getValue("") == "") {
                sap.m.MessageToast.show("Boş kayıt yapılamaz.")
            } else {
                var model = oModel.getProperty("/kisi");
                this.dizi.push({
                    "ad": model.ad,
                    "soyad": model.soyad,
                    "telefon": model.telefon,
                    "fotoğraf": foto,
                    "İd": Math.floor(Math.random() * 1000)
                })
                oModel.setProperty("/kisiler", this.dizi);
                oModel.setProperty("/kisi", {})
            }
        },
        onSelect: function(oEvent) {
            path = oEvent.getParameters().listItem.getBindingContextPath();
            this.getView().byId("nameInput").setValue(oModel.getProperty(path).ad);
            this.getView().byId("surnameInput").setValue(oModel.getProperty(path).soyad);
            this.getView().byId("phoneInput").setValue(oModel.getProperty(path).telefon);
            idDeger = oModel.getProperty(path).İd;
            this.getView().byId("editBtn").setVisible(true)
            this.getView().byId("deleteBtn").setVisible(true)
            this.getView().byId("saveBtn").setVisible(false)
        },
        onChange: function(oEvent) {
            var aFiles = oEvent.getParameters().files;
            var currentFile = aFiles[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                foto = e.target.result
            };
            reader.readAsDataURL(currentFile)
        },
        onEdit: function(oEvent) {
            var adinput2 = oModel.getProperty("/kisi/ad")
            var soyadinput2 = oModel.getProperty("/kisi/soyad")
            var telefoninput2 = oModel.getProperty("/kisi/telefon")
            var a = this.dizi.find(b => b.İd == idDeger);
            a.ad = adinput2;
            a.soyad = soyadinput2;
            a.telefon = telefoninput2;
            a.fotoğraf = foto;
            oModel.setProperty("/kisiler", this.dizi);
            oModel.setProperty("/kisi", {})
            this.getView().byId("editBtn").setVisible(false)
            this.getView().byId("deleteBtn").setVisible(false)
            this.getView().byId("saveBtn").setVisible(true)
        },
        onDelete: function(oEvent) {
            this.dizi = this.dizi.filter(b => b.İd != idDeger);
            oModel.setProperty("/kisiler", this.dizi);
            oModel.setProperty("/kisi", {})
            this.getView().byId("editBtn").setVisible(false)
            this.getView().byId("deleteBtn").setVisible(false)
            this.getView().byId("saveBtn").setVisible(true)
        }
    })
})