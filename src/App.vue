<template>
	<!-- Note: <v-app> is not used because it is not compatible with Google Apps Script. -->
	<div class="v-application v-application--is-ltr theme--light h-100">
		<v-container>
			<Top/>
		</v-container>
	</div>
</template>

<script lang="ts">
import Top from "./pages/Top.vue";
export default {
	components: {
		Top,
	},
};
</script>

<style scoped>
.h-100 {
	height: 100vh;
}
</style>
