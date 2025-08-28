sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device"
], function(UIComponent, Device) {
	"use strict";

	return UIComponent.extend("converted.productsetupwizardview.Component", {
		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and sets up the models
		 */
		init: function() {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(new sap.ui.model.json.JSONModel({
				isTouch: Device.support.touch,
				isNoTouch: !Device.support.touch,
				isDesktop: Device.system.desktop,
				isNoDesktop: !Device.system.desktop,
				isTablet: Device.system.tablet,
				isNoTablet: !Device.system.tablet,
				isPhone: Device.system.phone,
				isNoPhone: !Device.system.phone,
				listMode: sap.ui.Device.support.touch ? "None" : "SingleSelectMaster",
				searchSupported: Device.support.search
			}), "device");

			// initialize the router
			this.getRouter().initialize();
		}
	});
});
