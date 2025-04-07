<template>
    <section class="mission-section">
      <div class="container">
        <div class="section-title">
          <h2>Наша миссия</h2>
        </div>
        <div class="mission-content">
          <p class="mission-text">Dark Horse MMA - это профессиональное агентство, специализирующееся на развитии карьеры бойцов ММА. Мы предоставляем полный спектр услуг: от тренировочного процесса до организации боев и медиа-сопровождения.</p>
          <p class="mission-text">Наша цель - помочь талантливым спортсменам достичь вершин в мире смешанных единоборств, обеспечивая их всесторонней поддержкой и профессиональным менеджментом.</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'MissionSection',
  };
  </script>
  
  <style scoped>
  .mission-section {
    padding: 80px 0;
    background-color: var(--bg-color);
  }
  
  .mission-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .mission-text {
    font-size: 1.2em;
    margin-bottom: 30px;
    color: var(--text-color);
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .section-title h2 {
    color: var(--primary-color);
    font-size: 2.5em;
  }
  </style>