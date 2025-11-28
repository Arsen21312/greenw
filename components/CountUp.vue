<template>
  <span ref="elementRef" :class="className" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  to: {
    type: Number,
    required: true,
  },
  from: {
    type: Number,
    default: 0,
  },
  direction: {
    type: String,
    default: 'up',
  },
  delay: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 1.2,
  },
  className: {
    type: String,
    default: '',
  },
  startWhen: {
    type: Boolean,
    default: true,
  },
  separator: {
    type: String,
    default: ' ',
  },
})

const emit = defineEmits(['start', 'end'])

const elementRef = ref(null)
const currentValue = ref(props.direction === 'down' ? props.to : props.from)
const isInView = ref(false)
const animationId = ref(null)
const hasStarted = ref(false)

let observer = null
let velocity = 0
let startTime = 0

const damping = computed(() => 20 + 40 * (1 / props.duration))
const stiffness = computed(() => 100 * (1 / props.duration))

const formatNumber = (value) => {
  const formatter = new Intl.NumberFormat('ru-RU', {
    useGrouping: props.separator !== '',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  const formatted = formatter.format(Math.round(value))
  return props.separator !== ''
    ? formatted.replace(/\u00a0/g, props.separator)
    : formatted
}

const updateDisplay = () => {
  if (elementRef.value) {
    elementRef.value.textContent = formatNumber(currentValue.value)
  }
}

const cancelAnimation = () => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
    animationId.value = null
  }
}

const springAnimation = (timestamp) => {
  if (!startTime) startTime = timestamp

  const target = props.direction === 'down' ? props.from : props.to
  const current = currentValue.value
  const displacement = target - current
  const springForce = displacement * stiffness.value
  const dampingForce = velocity * damping.value
  const acceleration = springForce - dampingForce

  velocity += acceleration * 0.016
  currentValue.value += velocity * 0.016
  updateDisplay()

  if (Math.abs(displacement) > 0.01 || Math.abs(velocity) > 0.01) {
    animationId.value = requestAnimationFrame(springAnimation)
  } else {
    currentValue.value = target
    updateDisplay()
    cancelAnimation()
    emit('end')
  }
}

const startAnimation = () => {
  if (hasStarted.value || !isInView.value || !props.startWhen) return

  hasStarted.value = true
  emit('start')

  setTimeout(() => {
    startTime = 0
    velocity = 0
    animationId.value = requestAnimationFrame(springAnimation)
  }, props.delay * 1000)
}

const setupObserver = () => {
  if (!elementRef.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isInView.value = true
        startAnimation()
      }
    },
    { threshold: 0, rootMargin: '0px' }
  )

  observer.observe(elementRef.value)
}

const resetState = () => {
  cancelAnimation()
  hasStarted.value = false
  currentValue.value = props.direction === 'down' ? props.to : props.from
  updateDisplay()
}

watch(
  () => [props.from, props.to, props.direction],
  () => {
    resetState()
  }
)

watch(
  () => props.startWhen,
  (value) => {
    if (value && isInView.value && !hasStarted.value) {
      startAnimation()
    }
  }
)

watch(
  () => props.separator,
  () => {
    updateDisplay()
  }
)

onMounted(() => {
  updateDisplay()
  setupObserver()
})

onUnmounted(() => {
  cancelAnimation()
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>
