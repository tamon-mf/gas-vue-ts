<template>
<div class="box">
  <div class="title66 main-text-color font-bold">マスター連携</div>
  <main-button icon="document" @click="handleGetData">
    マスター
		</main-button>
</div>
</template>


<script>
import MainButton from "../components/MainButton.vue";

export default {
	components: {
		MainButton,
	},
	methods: {
		async handleGetData() {
			await TprReportService.fetchAndWriteTradingPartnerDataToSheet(params);
		},
	},
};
</script>


<style scoped>
</style>
