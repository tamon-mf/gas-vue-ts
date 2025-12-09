<template>
	<div class="box">
		<div class="title66 main-text-color font-bold">マスター連携</div>
		<v-btn
			@click="handleGetData"
			:disabled="isLoading"
			:loading="isLoading"
			color="primary"
		>
			マスター
		</v-btn>
		<v-simple-table v-if="data.length > 0">
			<template v-slot:default>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in data" :key="item.id">
						<td>{{ item.id }}</td>
						<td>{{ item.name }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</div>
</template>

<script lang="ts">
import type { Device } from "../../server/modules/mockModule";
import GoogleScriptUtils from "../utils/googleScriptUtils";

export default {
	components: {},
	data() {
		return {
			isLoading: false,
			data: [] as Device[],
		};
	},
	methods: {
		async handleGetData() {
			try {
				this.isLoading = true;

				const data =
					await GoogleScriptUtils.runAsync<Device[]>("serverFunction");
				console.log("API Response:", data);
				this.data = data;
			} catch (error: unknown) {
				console.error("Error fetching data:", error);
			} finally {
				this.isLoading = false;
			}
		},
	},
};
</script>

<style scoped>
</style>
