<template>
    <main>
      <section class="team-section">
        <div class="container">
          <div class="section-title">
            <h2>Наша команда</h2>
            <p>Профессионалы своего дела, которые делают Dark Horse одним из лучших ММА</p>
          </div>
          <div class="team-grid">
            <div v-for="member in teamMembers" :key="member.name" class="team-member">
              <img :src="member.image" :alt="member.name" class="member-image" />
              <div class="member-info">
                <h3 class="member-name">{{ member.name }}</h3>
                <p class="member-role">{{ member.role }}</p>
                <p class="member-description">{{ member.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    name: 'Team',
    data() {
      return {
        teamMembers: [
          {
            name: 'Имам Магомедов',
            role: 'CEO',
            description: 'Основатель и руководитель Dark Horse MMA',
            image: '/team/Dana_White_London_2015.jpg',
          },
          {
            name: 'Аслан Кадилаев',
            role: 'Менеджер',
            description: 'Опытный менеджер в сфере ММА',
            image: '/team/Dana_White_London_2015.jpg',
          },
          {
            name: 'Гаджи Баширов',
            role: 'Администратор',
            description: 'Администратор Dark Horse MMA',
            image: '/team/Dana_White_London_2015.jpg',
          },
          {
            name: 'Мухаммад Мирзоев',
            role: 'Главный тренер',
            description: 'Мастер спорта международного класса по борьбе, более 15 лет опыта тренерской работы',
            image: '/team/Dana_White_London_2015.jpg',
          },
          {
            name: 'Долгат Абдулаев',
            role: 'Тренер по ударной технике',
            description: '',
            image: '/team/Dana_White_London_2015.jpg',
          },
          {
            name: 'Алиев Махач',
            role: 'Тренер по Муай Тай',
            description: '',
            image: '/team/Dana_White_London_2015.jpg',
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .team-section {
    padding: 60px 0;
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 50px;
  }
  
  .section-title h2 {
    font-size: 2.5em;
    color: var(--primary-color);
    margin-bottom: 20px;
  }
  
  .section-title p {
    font-size: 1.2em;
    color: var(--text-color);
    max-width: 800px;
    margin: 0 auto;
  }
  
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
    padding: 20px;
  }
  
  .team-member {
    background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
  }
  
  .team-member:hover {
    transform: translateY(-5px);
  }
  
  .member-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-bottom: 2px solid var(--accent-color);
  }
  
  .member-info {
    padding: 20px;
    text-align: center;
  }
  
  .member-name {
    font-size: 1.5em;
    color: var(--primary-color);
    margin-bottom: 10px;
  }
  
  .member-role {
    font-size: 1.1em;
    color: #888;
    margin-bottom: 15px;
  }
  
  .member-description {
    font-size: 1em;
    color: var(--text-color);
    margin-bottom: 20px;
  }
  
  @media (max-width: 768px) {
    .team-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 10px;
    }
  
    .section-title h2 {
      font-size: 2em;
    }
  
    .section-title p {
      font-size: 1em;
      padding: 0 20px;
    }
  
    .member-image {
      height: 250px;
    }
  
    .member-name {
      font-size: 1.3em;
    }
  
    .member-role {
      font-size: 1em;
    }
  
    .member-description {
      font-size: 0.9em;
    }
  }
  </style>