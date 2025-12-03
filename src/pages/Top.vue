<template>
<div class="box">
  <div class="title66 main-text-color font-bold">マスター連携</div>
  <main-button icon="document" @click="handleGetData">
    マスター
		</main-button>
</div>
</template>


<script lang="ts">
import MainButton from "../components/MainButton.vue";
import TprReportService from "../services/tprReportService";

export default {
	components: {
		MainButton,
	},
	methods: {
		async handleGetData() {
			const params = {
				monthlyDate: "2025-01-01",
				journalId: 1,
				approvalStatuses: ["approved", "rejected"],
				departmentIds: [1, 2, 3],
				projectId: 1,
				counterpartyId: 1,
			};

			const result =
				await TprReportService.fetchAndWriteTradingPartnerDataToSheet(params);
			if (result) {
				alert("マスター連携が成功しました");
			} else {
				alert("マスター連携が失敗しました");
			}
		},
	},
};
</script>


<style scoped>
</style>
