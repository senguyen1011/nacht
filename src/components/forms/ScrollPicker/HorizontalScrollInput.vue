<script setup lang="ts">
import { ref } from "vue";
import { getScrollProperties, mod, ScrollInputProps, inputSizes } from "../../lib/";

const props = withDefaults(defineProps<ScrollInputProps>(), {
  size: "md",
  options: () => [],
});
const scrollRef = ref<HTMLDivElement>();
const listRef = ref<HTMLLIElement>();
const optionRefs = ref<HTMLLIElement[]>([]);
const activeInd = ref<number>(0);
const theme = ref({
  height: `var(--${inputSizes[props.size].height})`,
  fontSize: `var(--${inputSizes[props.size].fontSize})`,
  lineHeight: `var(--${inputSizes[props.size].lineHeight})`,
});

function handleScroll() {
  const { scrollWidth, scrollLeft } = getScrollProperties(scrollRef.value!);
  const { marginLeft } = getScrollProperties(listRef.value!)
  activeInd.value = Math.floor(
    (scrollLeft / ((scrollWidth - marginLeft * 2) - 2)) * props.options.length,
  );
}

function handleClick(direction: 1 | -1) {
  activeInd.value = mod(activeInd.value + direction, props.options.length);
  const option = optionRefs.value[activeInd.value];
  option.scrollIntoView({ behavior: "smooth", inline: "center" });
}
</script>

<template>
  <div class="horizontal-scroll-container">
    <input
      type="hidden"
      :name="props.name"
      :value="props.options[activeInd]"
    />
    <Button
      class="left"
      size="sm"
      width="icon"
      variant="ghost"
      @click="handleClick(-1)"
    >
      <Icon name="chevronLeft" />
    </Button>
    <Button
      class="right"
      size="sm"
      width="icon"
      variant="ghost"
      @click="handleClick(1)"
    >
      <Icon name="chevronRight" />
    </Button>
    <div
      class="scroll-container"
      ref="scrollRef"
      @scroll="handleScroll"
    >
      <ul ref="listRef">
        <li
          v-for="option in props.options"
          :key="option"
          ref="optionRefs"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.horizontal-scroll-container {
  position: relative;
  width: 100%;
  padding-top: var(--size-2);
  padding-bottom: var(--size-2);
}

.horizontal-scroll-container::before,
.horizontal-scroll-container::after {
  content: "";
  position: absolute;
  top: 0;
  height: 100%;
  width: 45%;
  pointer-events: none;
}

.horizontal-scroll-container::before {
  left: 0;
  background: linear-gradient(to right, var(--sage-1), var(--sage-a1));
}

.horizontal-scroll-container::after {
  right: 0;
  background: linear-gradient(to left, var(--sage-1), var(--sage-a1));
}
.scroll-container {
  width: 100%;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
}
.scroll-container::-webkit-scrollbar {
  display: none;
}


ul {
  display: flex;
  width: 100%;
  height: 100%;
  margin-left: 40%;
  margin-right: 40%;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  font-size: v-bind("theme.fontSize");
  line-height: v-bind("theme.lineHeight");
  white-space: nowrap;
}

li {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  scroll-snap-align: center;
}

button {
  position: absolute;
  z-index: 1;
}
button.left {
  left: 0;
}
button.right {
  right: 0;
}
</style>
