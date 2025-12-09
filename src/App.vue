<template>
	<div class="v-application v-application--is-ltr theme--light">
		<v-container fluid>
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
</style>
