import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const opts = {
	// theme: {
	// 	themes: {
	// 		light: {
	// 			primary: colors.blue.darken2,
	// 			secondary: colors.grey.darken2,
	// 			accent: colors.shades.black,
	// 			error: colors.red.accent3,
	// 			warning: colors.amber.darken2,
	// 			info: colors.blue.lighten5,
	// 			success: colors.green.accent3,
	// 		},
	// 	},
	// },
};

export default new Vuetify(opts);
