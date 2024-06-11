<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getScrollProperties, inputSizes, mod, ScrollInputProps } from "../../lib/";

const props = withDefaults(defineProps<ScrollInputProps>(), {
  size: "md",
  options: () => [],
});
const emit = defineEmits(['onChange'])
const listRef = ref<HTMLUListElement>();
const value = ref<any>(props.options[0]);
const optionsVisible = ref<string[]>([
  ...props.options.slice(-2),
  ...props.options.slice(0, 3),
]);
const nextInd = ref<number>(3);
const prevInd = ref<number>(props.options.length - 3);
const theme = ref({
  height: `var(--${inputSizes[props.size].height})`,
  fontSize: `var(--${inputSizes[props.size].fontSize})`,
  lineHeight: `var(--${inputSizes[props.size].lineHeight})`,
});

onMounted(() => {
  const list: HTMLUListElement = listRef.value!;
  const { scrollHeight, paddingTop } = getScrollProperties(list);
  list.scrollTop = (scrollHeight - paddingTop * 2) / 2;
});

function handleScroll() {
  const list: HTMLUListElement = listRef.value!;
  const { scrollHeight, scrollTop, paddingTop } = getScrollProperties(list);
  const currentInd: number = Math.floor(
    (scrollTop / (scrollHeight - paddingTop * 2)) * optionsVisible.value.length,
  );
  if (currentInd > 2) {
    optionsVisible.value.push(props.options[nextInd.value]);
    optionsVisible.value.shift();
    nextInd.value = mod(nextInd.value + 1, props.options.length);
    prevInd.value = mod(prevInd.value + 1, props.options.length);
  } else if (currentInd < 2) {
    optionsVisible.value.unshift(props.options[prevInd.value]);
    optionsVisible.value.pop();
    prevInd.value = mod(prevInd.value - 1, props.options.length);
    nextInd.value = mod(nextInd.value - 1, props.options.length);
  }
  value.value = optionsVisible.value[2];
  emit('onChange', value.value)
}
</script>

<template>
  <div class="scroll-container">
    <input
      type="hidden"
      :name="props.name"
      :value="value"
    />
    <ul
      ref="listRef"
      @scroll="handleScroll"
    >
      <li
        v-for="option in optionsVisible"
        :key="option"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.scroll-container {
  position: relative;
  width: 100%;
}

.scroll-container::before,
.scroll-container::after {
  content: "";
  position: absolute;
  height: calc(v-bind("theme.height") * 0.75);
  width: 100%;
  pointer-events: none;
}

.scroll-container::before {
  top: 0;
  background: linear-gradient(to bottom, var(--sage-1), var(--sage-a1));
}
.scroll-container::after {
  bottom: 0;
  background: linear-gradient(to top, var(--sage-1), var(--sage-a1));
}

ul {
  max-height: calc(2 * v-bind("theme.height"));
  padding: v-bind("theme.height") 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  font-size: v-bind("theme.fontSize");
  line-height: v-bind("theme.lineHeight");
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -ms-overflow-style: none;
}

ul::-webkit-scrollbar {
  display: none;
}

li {
  display: flex;
  justify-content: center;
  align-items: center;
  height: v-bind("theme.height");
  scroll-snap-align: center;
}
</style>
