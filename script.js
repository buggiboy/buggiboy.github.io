document.addEventListener("DOMContentLoaded", () => {
  // Fetch GitHub Projects Dynamically
  const fetchGitHubProjects = async () => {
    const username = "buggiboy";
    const url = `https://api.github.com/users/${username}/repos`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }

      const repos = await response.json();
      const projectsContainer = document.querySelector("#projects");
      projectsContainer.innerHTML = ""; // Clear any existing content

      repos.forEach(repo => {
        const projectElement = document.createElement("div");
        projectElement.className = "project";
        projectElement.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        projectsContainer.appendChild(projectElement);
      });
    } catch (error) {
      console.error("Error fetching GitHub projects:", error);
    }
  };

  // Initialize Snake Game
  const initializeSnakeGame = () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const box = 32;

    let snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };

    let direction;
    let food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };

    document.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
      if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
      if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
      if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    });

    const draw = () => {
      ctx.fillStyle = "lightgreen";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
      }

      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, box, box);

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (direction === "LEFT") snakeX -= box;
      if (direction === "UP") snakeY -= box;
      if (direction === "RIGHT") snakeX += box;
      if (direction === "DOWN") snakeY += box;

      if (snakeX === food.x && snakeY === food.y) {
        food = {
          x: Math.floor(Math.random() * 17 + 1) * box,
          y: Math.floor(Math.random() * 15 + 3) * box
        };
      } else {
        snake.pop();
      }

      const newHead = { x: snakeX, y: snakeY };

      if (
        snakeX < box ||
        snakeX > 17 * box ||
        snakeY < 3 * box ||
        snakeY > 17 * box ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        clearInterval(game);
        alert("Game Over!");
      }

      snake.unshift(newHead);
    };

    const game = setInterval(draw, 100);
  };

  fetchGitHubProjects();
  initializeSnakeGame();
});