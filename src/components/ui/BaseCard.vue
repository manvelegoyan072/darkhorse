<template>
  <div 
    class="base-card" 
    :class="[
      `elevation-${elevation}`,
      { 
        'hover-effect': hoverEffect,
        'no-padding': noPadding,
        [colorVariant]: colorVariant
      }
    ]"
  >
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    
    <div class="card-body" :class="{ 'has-header': $slots.header, 'has-footer': $slots.footer }">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  elevation: {
    type: Number,
    default: 1,
    validator: (value) => value >= 0 && value <= 3
  },
  hoverEffect: {
    type: Boolean,
    default: false
  },
  noPadding: {
    type: Boolean,
    default: false
  },
  colorVariant: {
    type: String,
    default: '',
    validator: (value) => ['', 'primary', 'secondary', 'accent', 'dark'].includes(value)
  }
});
</script>

<style scoped>
.base-card {
  border-radius: 12px;
  background-color: var(--bg-color);
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Elevation levels */
.elevation-0 {
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.elevation-1 {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.elevation-2 {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.elevation-3 {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Hover effect */
.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

/* Color variants */
.primary {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

.secondary {
  background-color: var(--secondary-color);
  color: var(--text-color);
}

.accent {
  background-color: var(--accent-color);
  color: var(--bg-color);
}

.dark {
  background-color: #1a1a1a;
  color: var(--text-color);
}

/* Card sections */
.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 600;
}

.card-body {
  padding: 20px;
}

.card-body.has-header {
  padding-top: 15px;
}

.card-body.has-footer {
  padding-bottom: 15px;
}

.no-padding .card-body {
  padding: 0;
}

.card-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-body {
    padding: 15px;
  }
  
  .card-header, 
  .card-footer {
    padding: 12px 15px;
  }
}
</style> 