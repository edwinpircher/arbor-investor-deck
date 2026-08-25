<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentSlideNo, go, slides, total } = useNav()

const slideOptions = computed(() => {
  const list = []
  const rawSlides = slides.value || []
  const count = total.value || rawSlides.length || 11

  for (let i = 1; i <= count; i++) {
    const rawSlide = rawSlides[i - 1]
    let title = rawSlide?.meta?.slide?.title || rawSlide?.title || ''
    if (!title || i === 1) {
      if (i === 1) title = 'Cover'
      else title = `Slide ${i}`
    }
    list.push({
      no: i,
      label: `${i} ${title}`
    })
  }
  return list
})

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const val = parseInt(target.value, 10)
  if (val && !isNaN(val)) {
    go(val)
  }
}
</script>

<template>
  <div class="fixed top-3 right-4 z-[9999] flex items-center gap-2 pointer-events-auto select-none">
    <div class="relative bg-slate-900/90 border border-slate-700/80 backdrop-blur-md rounded-lg shadow-lg px-2.5 py-1 flex items-center text-xs text-slate-200">
      <select
        :value="currentSlideNo"
        @change="onChange"
        class="bg-transparent text-slate-100 font-semibold cursor-pointer outline-none pr-5 py-0.5 appearance-none text-xs"
        aria-label="Slide Navigation Dropdown"
      >
        <option
          v-for="opt in slideOptions"
          :key="opt.no"
          :value="opt.no"
          class="bg-slate-800 text-slate-100 py-1"
        >
          {{ opt.label }}
        </option>
      </select>
      <div class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
        ▼
      </div>
    </div>
  </div>
</template>

<style>
/* Hide Slidev built-in Goto dialog */
#slidev-goto-dialog {
  display: none !important;
}
</style>
