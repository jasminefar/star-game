document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const basket = document.getElementById('basket');
    let basketPosition = gameContainer.clientWidth / 2 - basket.clientWidth / 2;
    let score = 0;

    // Move the basket
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && basketPosition > 0) {
            basketPosition -= 20;
        } else if (e.key === 'ArrowRight' && basketPosition < gameContainer.clientWidth - basket.clientWidth) {
            basketPosition += 20;
        }
        basket.style.left = `${basketPosition}px`;
    });

    // Create falling stars
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * (gameContainer.clientWidth - 20)}px`;
        star.style.top = '0px';
        gameContainer.appendChild(star);
        moveStar(star);
    }

    // Move the stars
    function moveStar(star) {
        let starInterval = setInterval(() => {
            star.style.top = `${parseInt(star.style.top) + 5}px`;
            if (parseInt(star.style.top) > gameContainer.clientHeight) {
                clearInterval(starInterval);
                gameContainer.removeChild(star);
            } else if (isCaught(star)) {
                clearInterval(starInterval);
                gameContainer.removeChild(star);
                score++;
                console.log('Score:', score);
            }
        }, 50);
    }

    // Check if the star is caught
    function isCaught(star) {
        const starRect = star.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();
        return (
            starRect.bottom >= basketRect.top &&
            starRect.left >= basketRect.left &&
            starRect.right <= basketRect.right
        );
    }

    // Add CSS for stars
    const style = document.createElement('style');
    style.innerHTML = `
        .star {
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: #ff0;
            border-radius: 50%;
        }
    `;
    document.head.appendChild(style);

    // Start the game
    setInterval(createStar, 1000);
});
