<template>
  <button 
    :class="[
      'base-button', 
      `variant-${variant}`,
      `size-${size}`,
      { 'full-width': fullWidth, 'is-loading': loading }
    ]"
    :disabled="disabled || loading"
    :type="type"
  >
    <span v-if="loading" class="loader"></span>
    <span class="button-content" :class="{ 'hidden': loading }">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'text', 'accent', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

/* Size variants */
.size-small {
  padding: 6px 12px;
  font-size: 0.85rem;
}

.size-medium {
  padding: 10px 18px;
  font-size: 1rem;
}

.size-large {
  padding: 14px 24px;
  font-size: 1.1rem;
}

/* Style variants */
.variant-primary {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

.variant-primary:hover:not(:disabled) {
  background-color: var(--primary-color-dark, #cc5500);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.variant-secondary {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.variant-secondary:hover:not(:disabled) {
  background-color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.variant-accent {
  background-color: var(--accent-color);
  color: var(--bg-color);
}

.variant-accent:hover:not(:disabled) {
  filter: brightness(110%);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.variant-text {
  background-color: transparent;
  color: var(--text-color);
  padding-left: 6px;
  padding-right: 6px;
}

.variant-text:hover:not(:disabled) {
  color: var(--accent-color);
  background-color: rgba(255, 255, 255, 0.05);
}

.variant-danger {
  background-color: #dc3545;
  color: white;
}

.variant-danger:hover:not(:disabled) {
  background-color: #bd2130;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* States */
.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.full-width {
  width: 100%;
}

/* Loading state */
.loader {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: currentColor;
  animation: spin 0.8s linear infinite;
  position: absolute;
}

.button-content.hidden {
  visibility: hidden;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .size-large {
    padding: 12px 20px;
  }
}

@media (max-width: 480px) {
  .base-button.full-width {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style> 