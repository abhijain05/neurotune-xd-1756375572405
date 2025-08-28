sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV"
], function(Controller, JSONModel, MessageToast, MessageBox, Export, ExportTypeCSV) {
	"use strict";

	return Controller.extend("converted.productsetupwizardview.controller.ProductSetupWizardView", {
		onInit: function() {
			// Load mock data for products and categories.  This assumes these JSON files exist
			var oProductModel = new JSONModel();
			oProductModel.loadData("model/mockData/products.json");
			this.getView().setModel(oProductModel, "products");

			var oCategoriesModel = new JSONModel();
			oCategoriesModel.loadData("model/mockData/categories.json");
			this.getView().setModel(oCategoriesModel, "categories");

			var oSpecificationsModel = new JSONModel();
			oSpecificationsModel.loadData("model/mockData/specifications.json");
			this.getView().setModel(oSpecificationsModel, "specifications");


		},

		onGetData: function() {
			MessageToast.show("GET DATA functionality would be implemented here (e.g., fetching data from a backend service).");
		},

		onExit: function() {
			MessageToast.show("Exiting...");
			// Add any cleanup logic here if necessary
		},

		onExportToCSV: function() {
			var oTable = this.getView().byId("specificationsTable");
			var aData = oTable.getModel("specifications").getData();
			var sCsvContent = this._convertToCSV(aData);
			var oBlob = new Blob([sCsvContent], { type: 'text/csv' });
			var sUrl = URL.createObjectURL(oBlob);
			var oLink = document.createElement('a');
			oLink.href = sUrl;
			oLink.download = 'product_specifications.csv';
			oLink.click();
			URL.revokeObjectURL(sUrl);
		},

		_convertToCSV: function(aData) {
			if (!aData || aData.length === 0) return '';
			var aHeaders = Object.keys(aData[0]);
			var sCsv = aHeaders.join(',') + '\n';
			aData.forEach(function(row) {
				var aValues = aHeaders.map(function(header) {
					return '"' + (row[header] || '').toString().replace(/"/g, '""') + '"';
				});
				sCsv += aValues.join(',') + '\n';
			});
			return sCsv;
		}
	});
});
