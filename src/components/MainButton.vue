<template id="button-component">
  <v-button class="main-button box-border-important" :class="'align-' + align" :disabled="disabled" @click="handleClick">
    <slot></slot>
  </v-button>
</template>

<script lang="ts">
export default {
	template: "#button-component",
	components: {},
	props: {
		icon: {
			type: String,
			required: false,
			default: null,
		},
		align: {
			type: String,
			required: false,
			default: "left",
			validator(value: string) {
				return ["left", "center"].indexOf(value as string) !== -1;
			},
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		handleClick() {
			this.$emit("click");
		},
	},
};
</script>

<style scoped>
  .main-button {
    display: flex;
    align-items: center;
    background: #0054AC;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
    font-size: 13px;
    padding: 0 12px;
    height: 40px;
  }

  .main-button.align-left {
    justify-content: flex-start;
  }

  .main-button.align-center {
    justify-content: center;
  }
  
  .main-button:hover {
    background-color: rgb(0, 84, 172);
  }

  .main-button:disabled {
    background-color: #C6C6C6;
    cursor: not-allowed;
  }

  .main-button:disabled:hover {
    background-color: #C6C6C6;
  }
  
  .main-button svg {
    margin-right: 12px;
  }
</style>
