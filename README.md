# Quiz App — Aplicación Web Full-Stack (HTML, CSS, JS + API REST)

Aplicación web con autenticación de usuario, puntuación, ranking global y diseño 100% responsive.  
Incluye registro, login con tokens JWT, preguntas dinámicas desde una API, pantalla de puntuación y tabla de ranking.

Este proyecto forma parte de mi portfolio como Ingeniera de Software.

## Características principales

### Autenticación completa
- Registro y login de usuarios
- Envío de credenciales al backend
- Token JWT almacenado en `localStorage`
- Redirecciones según autenticación

### Juego de Quiz totalmente interactivo
- Preguntas obtenidas desde API REST (https://opentdb.com/api.php?amount=10)
- Validación automática en cliente
- Botones de respuesta dinámicos
- Control de estado y avance de preguntas

### Ranking global
- Score enviado al backend
- Visualización de ranking de usuarios
- Lista actualizada desde API REST

### UI moderna y totalmente responsive
- Diseño adaptado a móvil, tablet y escritorio
- Botones accesibles
- Contenedores flexibles
- Animaciones suaves

---

## 🧩 Arquitectura Frontend

El proyecto está dividido en páginas independientes:
/src
├── index.html → Login / Registro
├── start.html → Menú inicial
├── quiz.html → Juego (preguntas)
├── score.html → Resultado final
├── ranking.html → Tabla de puntuación
├── script.js → Lógica principal del Quiz
└── style.css → Estilos (responsive)
## 🛠️ Tecnologías utilizadas

### Frontend
| Tecnología | Uso |
| **HTML5** | Estructura de todas las pantallas |
| **CSS** | Diseño + responsive + UI |
| **JavaScript (ES6)** | Lógica del juego, API requests |
| **LocalStorage** | Token, puntuación final |

### Backend
| Endpoint | Descripción |
| `/auth/register` | Registro de nuevos usuarios |
| `/auth/login` | Login, devuelve JWT |
| `/quiz/question` | Obtención de preguntas |
| `/quiz/score` | Envío de puntuación |
| `/ranking/ranking` | Obtener ranking global |

---

